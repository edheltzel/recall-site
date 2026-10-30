---
title: Install guide
description: Install Recall from a source checkout, or with gap sync on a GAP-managed machine, then verify it and seed your identity.
---

Recall installs from a permanent source checkout. It is **not published to npm**. The `recall-memory` package on npm is an unrelated project.

## Prerequisites

- macOS 13+ (Apple Silicon or Intel), or Linux (Ubuntu 22.04+, Debian 12+)
- [Bun](https://bun.sh) 1.0+. Recall uses `bun:sqlite` and Bun-native hooks.
- Node.js 18+ and npm, for global linking
- At least one [supported coding agent](/docs/hosts/)
- Optional: [Ollama](https://ollama.ai) with `qwen3-embedding:0.6b`, for semantic search
- Optional: [Fabric](https://github.com/danielmiessler/fabric), for Curated Library of Alexandria entries

## Install from source (canonical)

Clone into a permanent directory, not `/tmp`. `bun link` symlinks back to this clone, so deleting the clone breaks `recall`.

```bash
git clone https://github.com/edheltzel/Recall.git
cd Recall
./packaging/install.sh
```

**Claude Code users:** complete the plugin attach in the [Claude integration guide](https://github.com/edheltzel/Recall/blob/main/docs/CLAUDE_INTEGRATION.md#install-preferred) *before* you run the installer. The plugin owns the skills and MCP; the installer owns the lifecycle hooks.

The installer does the following:

1. Backs up existing config and the database to `~/.agents/Recall/backups/`.
2. Runs `bun install` and builds.
3. Links `recall` and `recall-mcp`.
4. Initializes the database.
5. Wires MCP and the installer-owned hooks.
6. Refreshes detected OpenCode and Pi integrations, and adds Grok's capture hook.
7. Schedules quarterly aging.

It is idempotent: re-running it repairs links and registrations.

### Installer flags

| Flag | Purpose |
| --- | --- |
| `--yes`, `-y` | Non-interactive; configure all detected agents |
| `--no-gum` | Use the plain bash interface |
| `--skip-age-cron` | Remove the managed quarterly `recall age` schedule |
| `--db-path PATH` | Use a custom database path |

Restart each configured agent after the install so it loads the plugin, extension, or hooks.

## Install with GAP

On a machine that is already managed by [GAP](https://github.com/edheltzel/GAP), Recall is a pinned component:

```bash
gap sync
```

`gap sync` fetches the locked Recall commit into GAP's store, runs `./packaging/install.sh` there, and `gap doctor` runs `recall doctor`. GAP does not install itself; set up GAP first. Without GAP, use the source install above.

## Other attach paths

Codex, Pi, and omp prefer their native plugin or package. Cursor uses the snippets in `templates/cursor/`. A local-tarball install with `recall install` is also supported. See [Supported hosts](/docs/hosts/) and the [full installation guide](https://github.com/edheltzel/Recall/blob/main/docs/installation.md).

## Verify

```bash
which recall recall-mcp   # both should resolve
recall stats              # record counts (zeros on a fresh install)
recall doctor             # full health check
```

`recall doctor` is the authoritative health check.

## Seed your identity

```bash
recall onboard                 # 7-question interview
recall onboard --print --yes   # preview only
```

This writes the L0 identity file, `~/.agents/Recall/MEMORY/identity.md` on a new install. Without it, L0 is empty at session start. Separate values with `|`, not `,`. Use `--project` to write `./.atlas-recall/identity.md` instead. Files over 1200 characters are truncated when they load.

## Update

```bash
recall update --check   # version check only
recall update           # pull, rebuild, migrate, re-register hooks
```

`recall update` forwards to `./packaging/update.sh`, which accepts the same flags. Exit your agents first. Inside Claude Code, `/do-recall-update` prints the current and latest versions. On a GAP machine, the pin moves with `gap pin` / `gap sync`.

## Uninstall

```bash
./packaging/uninstall.sh --dry-run   # preview, touch nothing
./packaging/uninstall.sh             # surgical remove; keeps ~/.agents/Recall/ (DB + backups)
./packaging/uninstall.sh --purge     # also destroy runtime and DBs (confirmed; snapshots identity/distilled first)
```
