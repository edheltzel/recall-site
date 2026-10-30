---
title: Troubleshooting
description: Fix common Recall problems, starting with recall doctor.
---

## Start with doctor

```bash
recall doctor        # database, MCP, hooks, tracker, CLI paths, Ollama
recall doctor --fix  # repair install / Claude MCP config drift
```

## Common issues

| Symptom | Fix |
| --- | --- |
| Database not found | `recall init` (safe to re-run) |
| L0 identity empty at session start | `recall onboard`; check the path with `recall path` |
| Identity truncated | Keep `identity.md` under 1200 characters; preview with `recall onboard --print` |
| `recall: command not found` | From the main checkout: `bun install && bun run build && bun link`; make sure `~/.bun/bin` is on PATH |
| MCP not connecting | `which recall-mcp`, `grep recall-memory ~/.claude/settings.json`, then restart the agent |
| Extraction not running | `grep RecallExtract ~/.claude/settings.json`, `which bun claude`; re-run `./packaging/install.sh` |
| Search misses records that `recall show` finds | `recall export --backup`, then `recall repair` (dry run), then `recall repair --execute` |
| No semantic results | Optional: `ollama pull qwen3-embedding:0.6b`; hybrid search falls back to keyword search |
| Linux Bun install needs unzip | `sudo apt-get install -y unzip`, then re-run the installer |
| Cursor hook does nothing | Put `recall` on the Cursor app's PATH |

## Recovery

- Restore a backup: `./packaging/install.sh list`, then `./packaging/install.sh restore [TIMESTAMP]`.
- A failed update writes `ROLLBACK.txt` into its backup directory. DB schema downgrades are not supported; restore the DB file from backup instead.

Full guide: [troubleshooting](https://github.com/edheltzel/Recall/blob/main/docs/troubleshooting.md).
