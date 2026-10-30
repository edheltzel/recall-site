---
title: "Usage: CLI and MCP"
description: Everyday Recall commands, the capture door for custom harnesses, and the MCP tools agents use.
---

## CLI at a glance

```bash
recall "kubernetes auth"          # search your memory (hybrid)
recall onboard                    # seed your L0 identity tier
recall dump "Session Title"       # save this session (+ Curated LoA via Fabric)
recall add decision "Use X" ...   # record a decision
recall decision list              # decisions with status and confidence
recall pin decisions 42           # pin a record to high importance
recall recent                     # recent records
recall prune                      # preview stale records for removal
recall stats                      # what's stored
recall path                       # where everything resolves on disk
recall doctor                     # health check
```

Mark decisions with `recall decision supersede` or `recall decision revert`. Manage importance with `recall pin`, `recall unpin`, and `recall importance backfill`.

## Ambient capture for custom harnesses

```bash
recall capture --contract 1 --harness acme-agent --event turn_end --text "raw turn"
```

- `--event` is `turn_end` or `session_end`.
- Text comes from `--text`, `--text-file`, or stdin. Stdin also accepts the JSON form.
- Invalid input exits non-zero and writes nothing.

To prove a write, run `recall search "<unique phrase>" -t messages`. See the [capture adapter guide](https://github.com/edheltzel/Recall/blob/main/docs/CAPTURE_ADAPTER.md).

## MCP tools

The `recall-memory` server (`recall-mcp`) exposes nine tools against the same database as the CLI:

| Tool | Use |
| --- | --- |
| `memory_search` | Keyword (FTS5) search; supports `table` and `bias_type` |
| `memory_hybrid_search` | Keyword + semantic search |
| `memory_recall` | Recent context: LoA entries, decisions, breadcrumbs |
| `context_for_agent` | Context to load before spawning a sub-agent |
| `memory_add` | Record a decision, learning, or breadcrumb |
| `memory_stats` | Database overview |
| `loa_show` | Show a Library of Alexandria entry |
| `memory_dump` | Persist a supplied conversation session |
| `decision_update` | Mark a decision superseded or reverted |

In Claude Code, the nine skills are invoked as `/do-recall-<name>`.

Full references: the [CLI reference](https://github.com/edheltzel/Recall/blob/main/docs/cli-reference.md), [MCP tools](https://github.com/edheltzel/Recall/blob/main/docs/mcp-tools.md), and [agent skills](https://github.com/edheltzel/Recall/blob/main/docs/agent-skills.md).
