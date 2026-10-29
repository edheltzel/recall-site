---
title: "Usage: CLI and MCP"
description: Everyday Recall commands and the MCP tools agents use.
---

## CLI at a glance

```bash
recall "kubernetes auth"          # search your memory (hybrid)
recall onboard                    # seed your L0 identity tier
recall dump "Session Title"       # save this session
recall add decision "Use X" ...   # record a decision
recall decision list              # decisions with status and confidence
recall pin decisions 42           # pin a record to high importance
recall prune                      # preview stale records for removal
recall stats                      # what's stored
recall doctor                     # health check
```

Decisions can be marked superseded or reverted with `recall decision supersede` / `recall decision revert`. Importance is managed with `recall pin`, `recall unpin`, and `recall importance backfill`.

### Ambient capture for custom harnesses

```bash
recall capture --contract 1 --harness acme-agent --event turn_end --text "raw turn"
```

`--event` is `turn_end` or `session_end`. Prove a write with `recall search "<unique phrase>" -t messages`. See the [capture adapter guide](https://github.com/edheltzel/Recall/blob/main/docs/CAPTURE_ADAPTER.md).

Full flag list: [CLI reference](https://github.com/edheltzel/Recall/blob/main/docs/cli-reference.md).

## MCP tools

The `recall-memory` MCP server exposes:

| Tool | Use |
| --- | --- |
| `memory_search` | Keyword (FTS5) search; supports `table` and `bias_type` |
| `memory_hybrid_search` | Keyword + semantic search |
| `memory_recall` | Recent context: LoA entries, decisions, breadcrumbs |
| `context_for_agent` | Context to load before spawning a sub-agent |
| `memory_add` | Record a decision, learning, or breadcrumb |
| `memory_stats` | Database overview |
| `loa_show` | Show a Library of Alexandria entry |
| `memory_dump` | Persist a supplied conversation session into SQLite |
| `decision_update` | Mark a decision superseded or reverted |

Details: [MCP tools](https://github.com/edheltzel/Recall/blob/main/docs/mcp-tools.md).

## Configuration

- `RECALL_DB_PATH`: custom database location (the install root stays `~/.agents/Recall`).
- `JEV_RECALL_KEY`: enables optional Jev scoring (environment or `~/.env`; a non-blank environment value wins).
- `~/.agents/Recall/config.json` (optional): point query, extraction, or cluster steps at a harness. Install never writes this file; without it, local search and extractors are used.
