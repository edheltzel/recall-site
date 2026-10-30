---
title: Configuration
description: Where Recall keeps memory, the environment variables it reads, and what happens at session start.
---

## Where memory lives

Recall has one install root, `~/.agents/Recall`. It cannot be relocated.

| Path | What it is |
| --- | --- |
| `~/.agents/Recall/recall.db` | SQLite database (WAL, `0600`); the only query surface |
| `~/.agents/Recall/MEMORY/identity.md` | Canonical L0 identity file |
| `~/.agents/Recall/MEMORY/` | Write-only markdown mirror (`DISTILLED.md`, `HOT_RECALL.md`, and others) |
| `~/.agents/Recall/shared/hooks/` | Canonical lifecycle hooks |
| `~/.agents/Recall/shared/skills/` | Canonical `do-recall-*` skills |
| `~/.agents/Recall/backups/` | Install, update, and export snapshots |

`recall path` (or `recall path --json`) prints every resolved path on your machine. To move an existing database, run `recall migrate --to /new/path/recall.db` (add `--dry-run` to preview).

## Environment variables

| Variable | Default | Purpose |
| --- | --- | --- |
| `RECALL_DB_PATH` | `~/.agents/Recall/recall.db` | Database location; moves the DB only, not the install root (legacy `MEM_DB_PATH` is still honored) |
| `RECALL_IDENTITY_PATH` | — | Override the L0 identity file |
| `OLLAMA_URL` | `http://localhost:11434` | Ollama for embeddings and the `ollama` extractor |
| `EMBEDDING_MODEL` | `qwen3-embedding:0.6b` | Embedding model (1024-dim) |
| `Recall_OLLAMA_MODEL` | `qwen2.5:3b` | Ollama extraction model |
| `RECALL_FABRIC_MODEL` | `claude-haiku-4-5` | Fabric model for Curated LoA |
| `JEV_RECALL_KEY` | unset | Optional Jev scoring (environment or `~/.env`; a non-blank environment value wins) |
| `RECALL_NO_GUM` | `0` | `1` uses the plain bash installer UI |

## Optional `config.json`

`~/.agents/Recall/config.json` can point the query, extraction, or cluster steps at a harness. The install never writes this file. If it is missing, Recall uses its default local search and extractors.

## Session start

On Claude Code, `SessionStart` runs `RecallStart.ts`, which injects L0 identity plus L1, the top 12 records by importance. It also runs `RecallTelosSync.ts`, which imports PAI TELOS files when that directory exists and exits immediately otherwise. Codex injects through its plugin. Pi has beta before-agent context. Cursor runs `recall start --format cursor` (beta). Grok, OpenCode, omp, and JCode do not inject automatically. If L0 is empty, run `recall onboard`.
