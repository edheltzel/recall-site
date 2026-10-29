---
title: Overview
description: Recall is a local, SQLite-backed persistent memory layer for coding agents.
---

Recall is a retrieval-first memory layer for coding agents. Sessions land in one local SQLite database, the most important records are ranked, and they are injected at session start on hosts that support it.

## What it does

- **Capture.** Host lifecycle adapters save session progress automatically. On Claude Code a `Stop` hook extracts each turn in the background, and a `PreCompact` hook flushes in-flight messages before compaction.
- **Distill.** Decisions, learnings, breadcrumbs, and Library of Alexandria entries go into one SQLite + FTS5 file at `~/.agents/Recall/recall.db`. Every record carries an importance score (1–10); decisions also carry confidence and a supersede/revert lifecycle.
- **Inject at session start.** Supported hosts load an L0 identity tier and an L1 tier of the top 12 records by importance, with 4 slots reserved for curated Library of Alexandria entries. Deeper records stay on disk and are pulled on demand through MCP search.

## Why local

- One SQLite file (WAL mode, `0600` permissions). Override the path with `RECALL_DB_PATH`.
- Keyword and hybrid retrieval need no API key and do not phone home. Optional Ollama embeddings stay local.
- Optional Jev scoring is off unless `JEV_RECALL_KEY` is set in the environment or `~/.env`. When set, scrubbed extracted candidates are sent to TypeSafe for scoring.

## Two binaries

Recall ships `recall` (CLI) and `recall-mcp` (MCP server, registered as `recall-memory`). It requires [Bun](https://bun.sh).

## Next

- [Install guide](/docs/install/)
- [Core loop](/docs/core-loop/)
- [Usage: CLI and MCP](/docs/usage/)
- [Supported hosts](/docs/hosts/)

The canonical, full documentation lives in the [Recall repository](https://github.com/edheltzel/Recall/blob/main/README.md).
