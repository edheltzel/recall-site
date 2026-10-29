---
title: Install guide
description: Install Recall from a source checkout and attach it to your coding agents.
---

Recall installs from a permanent source checkout. It is **not** published to npm: the `recall-memory` package on npm is an unrelated project.

## Prerequisites

- macOS 13+ (Apple Silicon or Intel) or Linux (Ubuntu 22.04+, Debian 12+)
- [Bun](https://bun.sh) 1.0+ (Recall uses `bun:sqlite` and Bun-native hooks)
- Node.js and npm
- At least one supported coding agent ([hosts](/docs/hosts/))

## Install from source

Clone into a permanent directory, not `/tmp`. `bun link` symlinks back to this clone, so removing it breaks the `recall` command.

```bash
git clone https://github.com/edheltzel/Recall.git
cd Recall
./packaging/install.sh
```

Claude Code users: complete the plugin attach in the [Claude integration guide](https://github.com/edheltzel/Recall/blob/main/docs/CLAUDE_INTEGRATION.md#install-preferred) before running the installer.

The installer backs up existing config, runs `bun install`, builds, links `recall` and `recall-mcp`, initializes the database, wires MCP and installer-owned hooks, refreshes detected OpenCode, Pi, and Grok integrations, and schedules quarterly aging.

### Installer flags

| Flag | Purpose |
| --- | --- |
| `--yes`, `-y` | Non-interactive; configure all detected agents |
| `--no-gum` | Use the plain bash interface |
| `--skip-age-cron` | Remove the managed quarterly `recall age` schedule |
| `--db-path PATH` | Use a custom database path |

Restart each configured host after install.

## Verify

```bash
recall stats    # database overview
recall doctor   # health check
```

## Seed your identity

```bash
recall onboard
```

A 7-question interview that writes the L0 identity file (`~/.agents/Recall/MEMORY/identity.md` on a new install). Without it, L0 is empty at session start. Use `|` to separate values.

## Update

```bash
./packaging/update.sh --check   # version check only
./packaging/update.sh           # pull, build, migrate, re-register hooks
```

Inside Claude Code, `/do-recall-update` prints current vs. latest and the command to run.

## Uninstall

```bash
./packaging/uninstall.sh --dry-run   # preview
./packaging/uninstall.sh             # remove; keeps ~/.agents/Recall/ (DB + backups)
./packaging/uninstall.sh --purge     # also destroy runtime and DBs (confirmed)
```

A local-tarball install is also supported; see the [full installation guide](https://github.com/edheltzel/Recall/blob/main/docs/installation.md#local-tarball).
