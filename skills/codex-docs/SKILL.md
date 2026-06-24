---
name: codex-docs
description: "USE THIS SKILL WHEN working with OpenAI Codex CLI, Codex App, or Codex Cloud: configuration (config.toml), approval modes, sandbox, execution policy, skills, AGENTS.md, slash commands, non-interactive/exec mode, multi-agent, MCP servers, GitHub Action, IDE extension, enterprise setup, or Codex SDK. Triggers on: codex, codex exec, codex cli, AGENTS.md (OpenAI), config.toml codex, codex skills, codex sandbox, codex rules."
---

# OpenAI Codex Documentation

Reference for [OpenAI Codex](https://developers.openai.com/codex/overview) — AI coding agent available as CLI, desktop app, cloud, and IDE extension.

- [Docs](https://developers.openai.com/codex/overview) | [GitHub](https://github.com/openai/codex) | [Changelog](https://developers.openai.com/codex/changelog)

CRITICAL: grep `references/` for detailed docs before answering.

## Quick Start

```bash
# Install
npm install -g @openai/codex

# Interactive mode
codex "Explain this codebase"

# Non-interactive (CI/scripts)
codex exec "Fix all lint errors"
codex exec --json "List all TODO comments"
```

## Key Concepts

| Concept | Description |
|---------|-------------|
| **Approval modes** | Auto, Read-only, Full Access — control what Codex can do |
| **Sandbox** | Filesystem/network isolation for safe execution |
| **Rules** | Starlark-based execution policies (`.codex/rules/`) |
| **Skills** | Task-specific capabilities (`.agents/skills/`) |
| **AGENTS.md** | Custom system prompts per repo/directory |
| **config.toml** | User/project config (`~/.codex/config.toml`) |
| **MCP** | Model Context Protocol server integration |
| **Multi-agent** | Spawn sub-agents for parallel work |

## Key Topics

### CLI
- `references/cli/features.md` — Interactive mode, sessions, model selection
- `references/cli/reference.md` — CLI command reference
- `references/cli/slash-commands.md` — `/model`, `/review`, `/plan`, `/permissions`, etc.
- `references/noninteractive.md` — `codex exec` for CI/scripts

### Configuration
- `references/config-basic.md` — config.toml basics
- `references/config-advanced.md` — Advanced configuration
- `references/config-reference.md` — Full config reference
- `references/config-sample.md` — Sample config file

### Security & Sandbox
- `references/concepts/sandboxing.md` — Sandbox modes
- `references/rules.md` — Execution policy rules (Starlark)
- `references/agent-approvals-security.md` — Approval system
- `references/security/` — Security setup, threat model, FAQ

### Customization
- `references/skills.md` — Agent Skills system
- `references/guides/agents-md.md` — AGENTS.md custom prompts
- `references/custom-prompts.md` — Custom prompts (deprecated, use skills)
- `references/prompting.md` — Prompting best practices

### App & IDE
- `references/app/` — Codex desktop app (features, automations, worktrees)
- `references/ide/` — VS Code extension (features, commands, settings)
- `references/cloud/` — Codex Cloud environments

### Integrations
- `references/mcp.md` — MCP server configuration
- `references/integrations/github.md` — GitHub integration
- `references/integrations/linear.md` — Linear integration
- `references/integrations/slack.md` — Slack integration
- `references/github-action.md` — GitHub Action for CI

### Enterprise
- `references/enterprise/admin-setup.md` — Admin setup
- `references/enterprise/managed-configuration.md` — Managed config
- `references/enterprise/governance.md` — Governance policies

## References

- `references/` — 64 doc files from developers.openai.com/codex
- `references/cli/` — CLI features, reference, slash commands
- `references/app/` — Desktop app docs
- `references/ide/` — IDE extension docs
- `references/security/` — Security & sandbox docs
- `references/enterprise/` — Enterprise administration
