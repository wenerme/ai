---
name: claude-code-docs
description: "Use when answering questions about Claude Code CLI features, configuration, hooks, skills, MCP, permissions, settings, sub-agents, teams, plugins, keybindings, IDE integration, CI/CD setup, troubleshooting, or any Claude Code usage topic."
---

# Claude Code Documentation

Official Claude Code documentation reference (docs sourced from [ericbuess/claude-code-docs](https://github.com/ericbuess/claude-code-docs)).

CRITICAL: When the user asks about Claude Code, grep the `references/` directory for relevant keywords before answering. Do NOT guess — always ground answers in the actual docs.

## Topic Index

### Getting Started
| Topic | File | Keywords |
|-------|------|----------|
| Overview | overview.md | what is claude code, introduction |
| Quickstart | quickstart.md | install, getting started |
| Setup | setup.md | configuration, first run |
| How it works | how-claude-code-works.md | architecture, agentic loop |
| Features | features-overview.md | capabilities, feature list |

### Configuration & Settings
| Topic | File | Keywords |
|-------|------|----------|
| Settings | settings.md | settings.json, config files, scopes |
| Memory | memory.md | CLAUDE.md, project memory |
| Permissions | permissions.md | allow, deny, sandbox |
| Sandboxing | sandboxing.md | filesystem, network sandbox |
| Model config | model-config.md | model selection, provider |
| Terminal config | terminal-config.md | terminal setup, shell |
| Network config | network-config.md | proxy, firewall |
| Server settings | server-managed-settings.md | managed, enterprise |

### Core Features
| Topic | File | Keywords |
|-------|------|----------|
| Interactive mode | interactive-mode.md | slash commands, UI |
| Fast mode | fast-mode.md | /fast, speed |
| Output styles | output-styles.md | markdown, verbose |
| CLI reference | cli-reference.md | flags, arguments, commands |
| Keybindings | keybindings.md | shortcuts, hotkeys |
| Checkpointing | checkpointing.md | checkpoint, restore |

### Extensibility
| Topic | File | Keywords |
|-------|------|----------|
| Hooks | hooks.md | hook events, lifecycle |
| Hooks guide | hooks-guide.md | hook examples, patterns |
| Skills | skills.md | SKILL.md, slash commands |
| MCP | mcp.md | model context protocol, servers |
| Plugins | plugins.md | plugin system |
| Plugins reference | plugins-reference.md | plugin API |
| Plugin marketplaces | plugin-marketplaces.md | discover, install plugins |
| Discover plugins | discover-plugins.md | browse plugins |

### Agents & Teams
| Topic | File | Keywords |
|-------|------|----------|
| Sub-agents | sub-agents.md | subagent, agent tool |
| Agent teams | agent-teams.md | team, swarm, multi-agent |

### IDE Integration
| Topic | File | Keywords |
|-------|------|----------|
| VS Code | vs-code.md | vscode extension |
| JetBrains | jetbrains.md | intellij, webstorm |
| Desktop app | desktop.md | standalone app |
| Desktop quickstart | desktop-quickstart.md | desktop setup |
| Chrome | chrome.md | browser extension |
| Statusline | statusline.md | status bar, statusline |
| Web | claude-code-on-the-web.md | web interface |

### CI/CD & Automation
| Topic | File | Keywords |
|-------|------|----------|
| GitHub Actions | github-actions.md | workflow, CI |
| GitLab CI/CD | gitlab-ci-cd.md | gitlab runner |
| Headless mode | headless.md | non-interactive, scripting |
| Remote control | remote-control.md | remote, API control |

### Auth & Providers
| Topic | File | Keywords |
|-------|------|----------|
| Authentication | authentication.md | login, API key, OAuth |
| Amazon Bedrock | amazon-bedrock.md | AWS, bedrock |
| Google Vertex AI | google-vertex-ai.md | GCP, vertex |
| Microsoft Foundry | microsoft-foundry.md | Azure |
| LLM Gateway | llm-gateway.md | gateway, proxy |

### Security & Compliance
| Topic | File | Keywords |
|-------|------|----------|
| Security | security.md | security model |
| Data usage | data-usage.md | privacy, data handling |
| Zero data retention | zero-data-retention.md | ZDR |
| Legal | legal-and-compliance.md | terms, compliance |
| Costs | costs.md | pricing, tokens, usage |
| Monitoring | monitoring-usage.md | track usage |
| Analytics | analytics.md | telemetry |

### Troubleshooting
| Topic | File | Keywords |
|-------|------|----------|
| Troubleshooting | troubleshooting.md | errors, common issues |
| Best practices | best-practices.md | tips, recommendations |
| Common workflows | common-workflows.md | patterns, recipes |
| Changelog | changelog.md | versions, releases, what's new |

## How to use

```bash
# Find docs about a topic
grep -ril "keyword" references/

# Read a specific doc
cat references/hooks.md
```
