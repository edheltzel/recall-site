---
title: Supported hosts
description: Which coding agents Recall supports for MCP, capture, and injection.
---

Recall separates **MCP + skills**, **automatic capture**, and **automatic injection**. A host can support one without the others.

| Agent | MCP + skills | Automatic capture | Automatic injection | Status |
| --- | :---: | :---: | :---: | --- |
| Claude Code | ✅ | ✅ Stop and PreCompact | ✅ SessionStart L0/L1 | Stable |
| Pi | ✅ | ⚠ Beta shutdown capture | ⚠ Beta before-agent context | Native package |
| OpenCode | ✅ | ⚠ Beta `session.idle` | ❌ Not verified | Beta |
| Codex CLI | ✅ | ✅ Rollout hooks | ✅ `additionalContext` | Native plugin |
| Grok Build CLI | ✅ | ✅ Lifecycle hook | ❌ | Installer-managed |
| omp | Skills via installer; MCP separate | ✅ `session_stop` | Not installed | Unreleased |
| JCode | ✅ | ❌ | ❌ | MCP and skills only |
| Empryo | Skills via installer; MCP manual | ✅ via Claude Stop hook | ❌ | Through Claude install |
| Cursor | ✅ snippets | ⚠ Beta | ⚠ Beta `recall start --format cursor` | No marketplace plugin |
| Gemini CLI | ❌ | ❌ | ❌ | Not yet supported |

## Attach guides

- [Claude Code](https://github.com/edheltzel/Recall/blob/main/docs/CLAUDE_INTEGRATION.md)
- [Codex](https://github.com/edheltzel/Recall/blob/main/docs/CODEX_INTEGRATION.md)
- [Pi](https://github.com/edheltzel/Recall/blob/main/docs/PI_INTEGRATION.md)
- [omp](https://github.com/edheltzel/Recall/blob/main/docs/OMP_INTEGRATION.md)
- [Grok](https://github.com/edheltzel/Recall/blob/main/docs/GROK_INTEGRATION.md)
- [JCode](https://github.com/edheltzel/Recall/blob/main/docs/JCODE_INTEGRATION.md)
- Cursor: merge the repository's `templates/cursor/` snippets. The Cursor app's GUI PATH often lacks `~/.bun/bin`, so the hook is a no-op until `recall` is on that PATH.
