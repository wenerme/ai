---
description: Cloudflare provides Skills and MCP servers so your agent can seamlessly build on the Cloudflare platform. Pick an agent below to get started.
title: Agent setup
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

## Pick your agent

Select an agent to get step-by-step setup instructions.

Filter by workflow:

AllTerminalIDECloudExtension

[![Claude Code icon](https://developers.cloudflare.com/icons/agents/claude/light.svg)![Claude Code icon](https://developers.cloudflare.com/icons/agents/claude/dark.svg)Claude CodeAnthropicTerminal-based coding agent that understands your codebase, runs commands, edits files, and manages git. Made by Anthropic.TerminalStandaloneCloudExtensionFull codebase understandingTerminal command executionGit operationsMulti-file editingView guide →](https://developers.cloudflare.com/agent-setup/claude-code/)[![Codex icon](https://developers.cloudflare.com/icons/agents/codex/light.svg)![Codex icon](https://developers.cloudflare.com/icons/agents/codex/dark.svg)CodexOpenAIOpenAI coding agent available as a terminal CLI and desktop app. It reads and writes files, runs commands, and browses the web in a sandbox.TerminalStandaloneCloudExtensionOpen SourceFile read/write operationsCommand executionWeb browsingSandboxed environmentView guide →](https://developers.cloudflare.com/agent-setup/codex/)[![Cursor icon](https://developers.cloudflare.com/icons/agents/cursor/light.svg)![Cursor icon](https://developers.cloudflare.com/icons/agents/cursor/dark.svg)CursorCursorAI-first IDE built on VS Code with multi-file Composer edits and background agents. Made by Cursor.TerminalIDEStandaloneCloudMulti-file ComposerBackground agentsCodebase indexingTerminal integrationView guide →](https://developers.cloudflare.com/agent-setup/cursor/)[![GitHub Copilot icon](https://developers.cloudflare.com/icons/agents/copilot/light.svg)![GitHub Copilot icon](https://developers.cloudflare.com/icons/agents/copilot/dark.svg)GitHub CopilotGitHubEditor extension and CLI with agent mode, workspace context, and native PR integration. Made by GitHub.TerminalCloudExtensionAgent modeWorkspace contextCLI integrationPR summariesView guide →](https://developers.cloudflare.com/agent-setup/github-copilot/)[![OpenCode icon](https://developers.cloudflare.com/icons/agents/opencode/light.svg)![OpenCode icon](https://developers.cloudflare.com/icons/agents/opencode/dark.svg)OpenCodeAnomalyOpen-source terminal agent with a rich TUI that works with 75+ LLMs. Made by Anomaly.TerminalStandaloneExtensionOpen Source75+ model supportRich terminal TUIBuilt-in agents (build/plan)LSP integrationView guide →](https://developers.cloudflare.com/agent-setup/opencode/)[![Windsurf icon](https://developers.cloudflare.com/icons/agents/windsurf/light.svg)![Windsurf icon](https://developers.cloudflare.com/icons/agents/windsurf/dark.svg)WindsurfCognitionAgentic IDE with Cascade context and Flows for multi-step tasks. Made by Cognition.IDEStandaloneCascade context engineFlows automationDeep codebase searchCommand suggestionsView guide →](https://developers.cloudflare.com/agent-setup/windsurf/)[![Visual Studio Code icon](https://developers.cloudflare.com/icons/agents/visual-studio-code/light.svg)![Visual Studio Code icon](https://developers.cloudflare.com/icons/agents/visual-studio-code/dark.svg)Visual Studio CodeMicrosoftFree, open-source code editor with native Model Context Protocol (MCP) client support and Copilot Chat integration. Made by Microsoft.TerminalIDEStandaloneExtensionOpen SourceNative MCP clientCopilot Chat integrationTerminal integrationExtension ecosystemView guide →](https://developers.cloudflare.com/agent-setup/visual-studio-code/)[![Bionic icon](https://developers.cloudflare.com/icons/agents/bionic/light.svg)![Bionic icon](https://developers.cloudflare.com/icons/agents/bionic/dark.svg)BionicLM StudioPowerful agent for coding and work. Natively local, with open models in the cloud. By LM Studio.StandaloneCloudLocal, remote, and cloud modelsCode Projects for local codebasesRepository search and file editingGit and local shell toolsView guide →](https://developers.cloudflare.com/agent-setup/bionic/)

No agents match this filter.

Clear filter

## Compare agents

Capabilities, pricing, and context approaches compared.

| Agent↑                                                                                  | Terminal     | IDE            | Extension        | Cloud | Pricing | Model | Context | Open source |
| --------------------------------------------------------------------------------------- | ------------ | -------------- | ---------------- | ----- | ------- | ----- | ------- | ----------- |
| [Bionic](https://developers.cloudflare.com/agent-setup/bionic/)                         | Hybrid       | Multi-provider | —                |       |         |       |         |             |
| [Claude Code](https://developers.cloudflare.com/agent-setup/claude-code/)               | Subscription | Locked         | Project memory   |       |         |       |         |             |
| [Codex](https://developers.cloudflare.com/agent-setup/codex/)                           | Hybrid       | Locked         | Project memory   |       |         |       |         |             |
| [Cursor](https://developers.cloudflare.com/agent-setup/cursor/)                         | Subscription | Multi-provider | Indexed codebase |       |         |       |         |             |
| [GitHub Copilot](https://developers.cloudflare.com/agent-setup/github-copilot/)         | Subscription | Multi-provider | Indexed codebase |       |         |       |         |             |
| [OpenCode](https://developers.cloudflare.com/agent-setup/opencode/)                     | BYOK         | Multi-provider | Project memory   |       |         |       |         |             |
| [Visual Studio Code](https://developers.cloudflare.com/agent-setup/visual-studio-code/) | BYOK         | Multi-provider | Project memory   |       |         |       |         |             |
| [Windsurf](https://developers.cloudflare.com/agent-setup/windsurf/)                     | Subscription | Multi-provider | Indexed codebase |       |         |       |         |             |

Every agent listed supports Skills and MCP.

## Understanding agents

Common types, concepts, and tradeoffs.

### Workflow

Where the agent runs changes how you interact with it.

Terminal

Runs in a shell. Best for automation, scripting, and CI pipelines.

IDE

Full code editor with AI first-class. Visual diffs, multi-file edits.

Cloud

Hosted infrastructure. Ideal for async, long-running work.

Extension

Plugs into an existing editor. Lightest install, keeps your setup.

### Key concepts

The vocabulary you'll run into when comparing agents.

Skills

Reusable prompt packages that teach an agent about a specific domain. Think of them as plugins made of instructions plus slash commands.

MCP

The Model Context Protocol — a standard that lets agents call external tools and APIs. Connect an MCP server and the agent knows how to use it.

Model flexibility

Which foundation models you can use. **Locked**supports only the vendor's own models. **BYOK** (Bring Your Own Key) lets you bring your own API key. **Multi-provider**supports several providers out of the box.

Context

How the agent retains information about your project.**Session** only remembers the current conversation.**Project memory** persists across sessions.**Indexed codebase** builds a searchable index of your whole repository.

### Common tradeoffs

Decisions you'll make when picking an agent.

Cloudvs.Local

Cloud agents run on hosted infrastructure and read your code over the network. Local agents run on your own machine, with no code leaving it.

Proprietaryvs.Open source

Proprietary agents ship under a closed license you don't control. Open-source agents publish their source under an open license, so you can read, modify, or fork the code.

Locked modelvs.BYOK

Locked agents only work with the vendor's own proprietary models. BYOK agents let you bring your own API key and switch between providers and models.

Sessionvs.Indexed codebase

Session context resets when you close the conversation. An indexed codebase is built up front and persists, letting the agent retrieve any file in the repo on demand.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/agent-setup/#page","headline":"Agent setup · Agent setup docs","description":"Cloudflare provides Skills and MCP servers so your agent can seamlessly build on the Cloudflare platform. Pick an agent below to get started.","url":"https://developers.cloudflare.com/agent-setup/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
