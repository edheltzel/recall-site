---
title: Core loop
description: How Recall captures, distills, and injects memory across sessions.
---

Recall has a **write path** (capture where a host exposes a lifecycle surface) and a **read path** (inject where a host supports session-start context). The Claude Code lifecycle is the reference implementation.

## 1. Inject at session start

A `SessionStart` hook injects two tiers:

- **L0 identity:** your global or project-local `identity.md`, always on.
- **L1 top records:** the top 12 records by importance, with 4 slots reserved for curated Library of Alexandria entries.

L2/L3 stay on disk and are fetched on demand via MCP.

## 2. During the session

The agent searches memory through MCP tools (`memory_search`, `memory_hybrid_search`, `memory_recall`, `context_for_agent`) and records decisions, learnings, and breadcrumbs with `memory_add`.

## 3. Capture at the end of every turn

A `Stop` hook runs `RecallExtract.ts` in the background. It checks `.extraction_tracker.json` and only re-extracts when the conversation has grown meaningfully, so capture is incremental. Before Claude compacts context, a `PreCompact` hook flushes in-flight messages to SQLite.

Other hosts write raw text through the public `recall capture` door (Codex, Grok, omp, Pi shutdown, and JCode when text is supplied). OpenCode uses a markdown drop picked up by batch extraction.

## 4. Distill

The extraction pipeline filters noise, dedupes, and runs the Automatic-capture Extractor (default `claude-cli`, then `ollama`; sessions over 120K chars are chunked). A quality gate rejects low-quality extractions. Results are written to SQLite (the only query surface) and mirrored to write-only markdown under `~/.agents/Recall/MEMORY/` (`DISTILLED.md`, `HOT_RECALL.md`, and others).

If `JEV_RECALL_KEY` resolves, structured extraction sends candidates to Jev, which keeps, demotes (importance 3), or drops each. Without a key, or on a Jev failure, every parsed row is written.

## 5. Batch catch-up (optional)

A cron job (`RecallBatchExtract.ts`) sweeps sessions the Stop hook missed and ingests OpenCode and Pi session drops.

## Search

| Strategy | Command | How it works |
| --- | --- | --- |
| Hybrid (default) | `recall "query"` | FTS5 + embeddings merged with Reciprocal Rank Fusion (k=60); falls back to keyword if Ollama is unavailable |
| Keyword | `recall search "query"` | FTS5 full-text; `-t` hard-filters a type, `--bias-type` boosts one |
| Semantic | `recall semantic "query"` | Ollama embeddings, cosine similarity |

Details: [architecture](https://github.com/edheltzel/Recall/blob/main/docs/architecture.md).
