---
title: Supported hosts
description: Which coding agents Recall supports for MCP and skills, automatic capture, and automatic injection.
---

Recall treats **MCP + skills**, **automatic capture**, and **automatic injection** as separate capabilities. A host can support one without the others.

| Agent | MCP + skills | Automatic capture | Automatic injection | Status |
| --- | :---: | :---: | :---: | --- |
| Claude Code | ✅ | ✅ Stop and PreCompact | ✅ SessionStart L0/L1 | Stable (reference) |
| Codex CLI | ✅ | ✅ Rollout hooks | ✅ `additionalContext` | Native plugin |
| Pi | ✅ | ⚠ Beta shutdown capture | ⚠ Beta before-agent context | Native package; MCP adapter separate |
| OpenCode | ✅ | ⚠ Beta `session.idle` | ❌ Not verified | Beta |
| Grok Build CLI | ✅ | ✅ Lifecycle hook | ❌ | Installer-managed |
| omp | Skills via installer; MCP separate | ✅ `session_stop` | ❌ Not installed | Unreleased |
| Empryo | Skills via installer; MCP manual | ✅ via Claude Stop hook | ❌ Not verified | Through the Claude install |
| Cursor | ✅ snippets | ⚠ Beta catalog | ⚠ Beta `recall start --format cursor` | No marketplace plugin |
| JCode | ✅ | ❌ | ❌ | MCP and skills only |
| Gemini CLI | ❌ | ❌ | ❌ | Not yet supported |

## Attach guides

- [Claude Code](https://github.com/edheltzel/Recall/blob/main/docs/CLAUDE_INTEGRATION.md): attach the plugin first, then run the installer for the hooks.
- [Codex](https://github.com/edheltzel/Recall/blob/main/docs/CODEX_INTEGRATION.md)
- [Pi](https://github.com/edheltzel/Recall/blob/main/docs/PI_INTEGRATION.md)
- [omp](https://github.com/edheltzel/Recall/blob/main/docs/OMP_INTEGRATION.md)
- [Grok](https://github.com/edheltzel/Recall/blob/main/docs/GROK_INTEGRATION.md): the installer is the only attach path.
- [Empryo](https://github.com/edheltzel/Recall/blob/main/docs/EMPRYO_INTEGRATION.md)
- [JCode](https://github.com/edheltzel/Recall/blob/main/docs/JCODE_INTEGRATION.md)
- Cursor: merge `templates/cursor/`. The Cursor app's GUI PATH often lacks `~/.bun/bin`, so the hook does nothing until `recall` is on that PATH.
