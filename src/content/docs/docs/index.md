---
title: Overview
description: Recall is persistent memory for coding agents. It is one local SQLite database that captures sessions, ranks what matters, and injects it at session start.
---

**Persistent memory for agents.**

Coding agents forget everything when a session ends. Recall remembers. It is a retrieval-first memory layer: every session lands in one searchable SQLite database, the most important records are ranked, and on hosts that support session-start context, those records are injected when the next session begins. Decisions carry confidence, an importance score, and a lifecycle, and all of it is shared across the coding agents you use.

## The loop

- **Capture.** Host lifecycle adapters save session progress automatically. On Claude Code, a `Stop` hook extracts each turn in the background, and a `PreCompact` hook flushes in-flight messages before compaction.
- **Distill.** An extraction pipeline turns conversations into decisions, learnings, breadcrumbs, and Library of Alexandria entries, and stores them in one SQLite + FTS5 file. Every record carries an importance score from 1 to 10.
- **Inject at session start.** Supported hosts load an L0 identity tier and an L1 tier of the top 12 records by importance. Deeper records stay on disk, and your agent pulls them on demand through MCP search.

[How the loop works →](/docs/core-loop/)

## Why local

- One SQLite file at `~/.agents/Recall/recall.db` (WAL mode, `0600` permissions). No vector database, graph database, or agent server.
- Keyword and hybrid retrieval need no API key and do not phone home. Optional Ollama embeddings stay local.
- Optional Jev scoring is off unless `JEV_RECALL_KEY` is set. When it is set, scrubbed extracted candidates are sent to TypeSafe for scoring.

## What ships

- `recall`: the CLI.
- `recall-mcp`: the MCP server, registered as `recall-memory`, with nine tools.
- Nine `do-recall-*` agent skills.
- Lifecycle hooks and plugins for supported hosts.

Recall requires [Bun](https://bun.sh). It is stable on Claude Code. Other hosts vary; see [Supported hosts](/docs/hosts/).

## Next

- [Install guide](/docs/install/)
- [Core loop](/docs/core-loop/)
- [Usage: CLI and MCP](/docs/usage/)
- [Configuration](/docs/configuration/)
- [Supported hosts](/docs/hosts/)
- [Troubleshooting](/docs/troubleshooting/)

The canonical, full documentation lives in the [Recall repository](https://github.com/edheltzel/Recall#documentation).
