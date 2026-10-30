---
title: Core loop
description: How Recall captures sessions, distills them into SQLite, and injects memory at session start.
---

Recall has a **write path**, which captures where a host exposes a lifecycle surface, and a **read path**, which injects where a host supports session-start context. Claude Code is the reference implementation. Other hosts support a subset of the loop; see [Supported hosts](/docs/hosts/).

## Capture

At the end of every turn, a `Stop` hook runs `RecallExtract.ts` in the background, so the session never blocks. It checks `.extraction_tracker.json` and re-extracts only when the conversation has grown meaningfully, so capture is incremental rather than happening only when the session exits. Before Claude compacts its context, a `PreCompact` hook flushes in-flight messages to SQLite.

Codex, Grok, omp, and Pi (on shutdown) write raw text through the public `recall capture` door. JCode uses it only when text is supplied. OpenCode drops markdown that batch extraction picks up. An optional cron job, `RecallBatchExtract.ts`, sweeps up sessions the hooks missed.

## Distill

The pipeline:

1. Filters noise such as tool results.
2. Dedupes.
3. Runs the automatic-capture extractor: `claude-cli` by default, then `ollama`. Sessions over 120K characters are chunked.
4. Applies a quality gate that rejects weak extractions.

The results are decisions, learnings, breadcrumbs, and Library of Alexandria entries, each with an importance score from 1 to 10. Decisions also carry a confidence level and a supersede/revert lifecycle.

SQLite is the only query surface. Recall also mirrors write-only, human-readable markdown such as `DISTILLED.md` and `HOT_RECALL.md`.

If `JEV_RECALL_KEY` is set, structured extraction sends candidates to Jev, which keeps each one, demotes it (to importance 3), or drops it. Without a key, or if Jev fails, every parsed row is written.

## Inject at session start

A `SessionStart` hook (`RecallStart.ts`, the same assembler as `recall start`) injects two tiers:

- **L0 identity:** your global or project `identity.md`, always on. Seed it with `recall onboard`.
- **L1 top records:** the top 12 records by importance, with 4 slots reserved for curated Library of Alexandria entries.

L2 and L3 stay on disk. During the session, the agent searches them through MCP (`memory_search`, `memory_hybrid_search`, `memory_recall`, `context_for_agent`) and records new decisions, learnings, and breadcrumbs with `memory_add`. Use `recall pin` to push a record into L1.

## Search

| Strategy | Command | How it works |
| --- | --- | --- |
| Hybrid (default) | `recall "query"` | FTS5 + embeddings merged with Reciprocal Rank Fusion (k=60); falls back to keyword search without Ollama |
| Keyword | `recall search "query"` | FTS5; `-t` hard-filters a type, `--bias-type` boosts one |
| Semantic | `recall semantic "query"` | Ollama embeddings, cosine similarity |
