---
description: Terminal-based coding agent that understands your codebase, runs commands, edits files, and manages git. Made by Anthropic.
title: Claude Code + Cloudflare
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/agent-setup/llms.txt
> Use this file to discover all available pages before exploring further.

[ All agents ](https://developers.cloudflare.com/agent-setup/)

![Claude Code icon](https://developers.cloudflare.com/icons/agents/claude/light.svg) ![Claude Code icon](https://developers.cloudflare.com/icons/agents/claude/dark.svg)

#  Claude Code + Cloudflare

 Anthropic

 Terminal-based coding agent that understands your codebase, runs commands, edits files, and manages git. Made by Anthropic.

TerminalStandaloneCloudExtension

[ Cloudflare Skills ↗ ](https://github.com/cloudflare/skills)[ Cloudflare Code Mode API MCP ↗ ](https://github.com/cloudflare/mcp)[ Cloudflare Domain Specific MCPs ↗ ](https://github.com/cloudflare/mcp-server-cloudflare)[ Claude Code Docs ↗ ](https://docs.anthropic.com/en/docs/claude-code)

## Quick start

1. **Install Claude Code**
Install the Claude Code CLI. For Windows, Homebrew, WinGet, or npm, see the [Claude Code setup guide ↗](https://docs.anthropic.com/en/docs/claude-code/setup).
```bash
curl -fsSL https://claude.ai/install.sh | bash
```
2. **Launch Claude Code in your project**
Start Claude Code from the root of your project, where `wrangler.jsonc` lives (if it already exists).
```bash
claude
```
3. **Install the Cloudflare plugin**
In Claude Code, run these two slash commands. This installs Cloudflare Skills and registers the Cloudflare MCP servers.
```txt
/plugin marketplace add cloudflare/skills
/plugin install cloudflare@cloudflare
```
4. **Try a prompt**
For example:
```txt
Check my Workers deployment logs for errors and suggest fixes.
```

## Cloudflare platform access

Expand any section to learn more.

Cloudflare Skills

Persistent platform context that teaches the agent how Cloudflare works.

Skills are instructions the agent loads on demand. The [cloudflare/skills ](https://github.com/cloudflare/skills) bundle covers every layer of the platform — so the agent knows your conventions without you re-explaining them.

MCP servers

Live access to the Cloudflare API, docs, and observability.

MCP servers provide typed tools to call into Cloudflare at runtime. There are two options: [Code Mode](https://blog.cloudflare.com/code-mode-mcp/) — a single server that covers the entire Cloudflare API (2,500+ endpoints in \~1,000 tokens) — or a set of focused, domain-specific servers hosted in the [cloudflare/mcp-server-cloudflare ](https://github.com/cloudflare/mcp-server-cloudflare) repo. The full catalog is also in the [MCP servers for Cloudflare ](https://developers.cloudflare.com/agents/model-context-protocol/cloudflare/servers-for-cloudflare/) docs.

Wrangler CLI

Local dev, deploys, and Workers-specific commands.

Use [Wrangler](https://developers.cloudflare.com/workers/wrangler/) for local development, deploys, and product-specific commands like `wrangler d1 migrations apply` or `wrangler tail`. The bundled **wrangler** Skill teaches the agent when to reach for it.

What’s next

The unified `cf` CLI is in technical preview — a next-generation CLI that covers every Cloudflare product with consistent verbs and ergonomic output for agents. Try it with `npx cf`. [Read the announcement →](https://blog.cloudflare.com/cf-cli-local-explorer/)

Agent-friendly docs

Token-efficient references optimized for agents.

Append `/index.md` to any Cloudflare docs URL for a clean markdown version. Every top-level product section also has its own `llms.txt` — a page index sized for a single context window. A few useful ones:

* [developers.cloudflare.com/llms.txt](https://developers.cloudflare.com/llms.txt) — directory of every Cloudflare product.
* [developers.cloudflare.com/workers/llms.txt](https://developers.cloudflare.com/workers/llms.txt)
* [developers.cloudflare.com/agents/llms.txt](https://developers.cloudflare.com/agents/llms.txt)
* [developers.cloudflare.com/r2/llms.txt](https://developers.cloudflare.com/r2/llms.txt)
* [developers.cloudflare.com/d1/llms.txt](https://developers.cloudflare.com/d1/llms.txt)

For a full overview of how these docs are structured for agents, refer to the [Docs for Agents guide](https://developers.cloudflare.com/docs-for-agents/).

## Example prompts

“Build an AI chat agent using the Cloudflare Agents SDK with persistent conversation history stored in D1.” “Create a RAG pipeline using Vectorize and Workers AI to answer questions over my documentation.” “Set up AI Gateway to route requests across OpenAI and Workers AI with automatic fallback and cost tracking.” “Build a serverless AI inference endpoint on Workers AI with streaming responses.” “Deploy a full-stack React app to Cloudflare Pages with a Workers API backend and D1 database.” “Add a D1 database to my Worker and create a users table with full CRUD endpoints.” “Build an image upload and transformation service using R2 and Cloudflare Images.” “Add real-time collaboration to my app using Durable Objects with WebSocket hibernation.” “Set up a KV namespace for edge-cached session storage in my Worker.” “Add a cron trigger to my Worker that processes a job queue every hour.” “Deploy a globally distributed REST API on Workers with automatic scaling and zero cold starts.” “Connect my Worker to an existing Postgres database using Hyperdrive for connection pooling.” “Add mTLS authentication and schema validation to protect my API endpoints.” “Set up rate limiting and WAF rules to block abuse on my public API.” “Build a multi-tenant SaaS backend where each customer gets an isolated D1 database.” “Set up custom domains with automatic SSL for my SaaS customers using SSL for SaaS.” “Use Workers for Platforms to let my customers deploy their own code in isolated environments.” “Add bot protection and rate limiting to my login and checkout endpoints.” “Set up WAF rules to block SQL injection and XSS attacks on my application.” “Configure Zero Trust access policies to protect my internal staging environment.” “Configure caching rules and cache TTLs to reduce origin load for my e-commerce store.” “Set up a Waiting Room to handle flash sale traffic spikes without dropping requests.” “Optimize my Worker to serve WebP images with responsive resizing using Cloudflare Images.” “Check my Workers deployment logs for errors and suggest fixes.” “Set up GitHub Actions to deploy this Worker to staging and production on Cloudflare.” “Create a Logpush job to stream Workers analytics to my data warehouse.”

## Tips

* The Skills plugin includes a wrangler Skill — Claude knows when to reach for `npx wrangler deploy`, `wrangler d1 migrations apply`, and other CLI commands automatically.
* Try the `/cloudflare:build-agent` slash command to scaffold a complete Agents SDK project, or `/cloudflare:build-mcp` for a remote MCP server.
* The Cloudflare API MCP server uses Code Mode — Claude writes JavaScript against a TypeScript API to hit any of 2,500+ endpoints in \~1,000 tokens.
* Claude Code works best from the root of your Workers project where `wrangler.jsonc` lives — this is what the agent uses to understand your bindings.
* Use `claude mcp list` to verify Cloudflare servers are connected. For CI/CD, skip OAuth by passing a Cloudflare API token as a bearer token instead.
* For more information on installing additional MCP servers, or when to use Code Mode versus traditional MCP servers, refer to the [Cloudflare MCP server repository ↗](https://github.com/cloudflare/mcp-server-cloudflare).

## FAQ

Should I use Skills, the MCP server, Wrangler CLI, or all of them?

All three — and the Skills plugin configures them together. Skills give Claude persistent Cloudflare knowledge (when to use Durable Objects vs KV, what a good Workers project layout looks like). The Cloudflare API MCP server handles platform operations (DNS, WAF, R2 buckets, Zero Trust). Wrangler runs local dev and Workers-specific commands. The `wrangler` Skill teaches Claude when to reach for which.

How do I give Claude Code access to my Cloudflare account?

The first time Claude calls a Cloudflare tool, you will be redirected to authorize via OAuth and choose what permissions to grant.

Can Claude Code deploy to existing Workers projects?

Yes. Run Claude Code from your existing project directory where `wrangler.jsonc` is located, and it will understand your project configuration and deploy accordingly.

What does Code Mode mean for MCP?

Code Mode is how the Cloudflare API MCP server fits all 2,500+ API endpoints into \~1,000 tokens. Instead of exposing every endpoint as a separate tool, it exposes two — `search()` and `execute()` — and Claude writes JavaScript to call them. [Learn more about Code Mode ↗](https://blog.cloudflare.com/code-mode-mcp/).

## Troubleshooting

MCP server connection fails or times out

Run `claude mcp list` to verify the server is registered. Try removing and re-adding: `claude mcp remove cloudflare` then re-add it. Ensure you have `npx` and `mcp-remote` available.

Claude cannot authenticate with Cloudflare

The MCP server uses OAuth. When prompted, complete the authorization flow in your browser. For CI/CD, create a Cloudflare API token and pass it as a bearer token instead.

Getting outdated information about Cloudflare products

Enable the [Cloudflare docs MCP server](https://github.com/cloudflare/mcp-server-cloudflare) so the agent can fetch current documentation at runtime. If you prefer not to use the MCP server, point the agent directly at [developers.cloudflare.com/llms.txt](https://developers.cloudflare.com/llms.txt) for a directory of every product, or `developers.cloudflare.com/<product>/llms.txt`for a product-specific index.

## Build agents on Cloudflare

Also worth knowing

Cloudflare is not just a deploy target for agents, it is a full stack for building your own.

[ Agents SDK Stateful AI agents with state, scheduling, RPC, email, streaming chat — and the Code Mode SDK for token-efficient tool use. Learn more → ](https://developers.cloudflare.com/agents/) [ Build an MCP server Ship a remote MCP server on Workers with OAuth, durable state, and streamable HTTP transport. Learn more → ](https://developers.cloudflare.com/agents/model-context-protocol/) [ Workers AI Run open-source LLMs, embedding models, and image models at the edge. Use it as your agent's model provider. Learn more → ](https://developers.cloudflare.com/workers-ai/) [ Worker Loader Load user-generated code into isolated Workers on demand. The secure sandbox behind Code Mode. Learn more → ](https://developers.cloudflare.com/workers/runtime-apis/bindings/worker-loader/)

## Other agents

[ ![Codex icon](https://developers.cloudflare.com/icons/agents/codex/light.svg) ![Codex icon](https://developers.cloudflare.com/icons/agents/codex/dark.svg) Codex OpenAI Lightweight open-source terminal agent that reads and writes files, runs commands, and browses the web in a sandbox. Made by OpenAI. ](https://developers.cloudflare.com/agent-setup/codex/)[ ![Cursor icon](https://developers.cloudflare.com/icons/agents/cursor/light.svg) ![Cursor icon](https://developers.cloudflare.com/icons/agents/cursor/dark.svg) Cursor Cursor AI-first IDE built on VS Code with multi-file Composer edits and background agents. Made by Cursor. ](https://developers.cloudflare.com/agent-setup/cursor/)[ ![GitHub Copilot icon](https://developers.cloudflare.com/icons/agents/copilot/light.svg) ![GitHub Copilot icon](https://developers.cloudflare.com/icons/agents/copilot/dark.svg) GitHub Copilot GitHub Editor extension and CLI with agent mode, workspace context, and native PR integration. Made by GitHub. ](https://developers.cloudflare.com/agent-setup/github-copilot/)[ ![OpenCode icon](https://developers.cloudflare.com/icons/agents/opencode/light.svg) ![OpenCode icon](https://developers.cloudflare.com/icons/agents/opencode/dark.svg) OpenCode Anomaly Open-source terminal agent with a rich TUI that works with 75+ LLMs. Made by Anomaly. ](https://developers.cloudflare.com/agent-setup/opencode/)[ ![Windsurf icon](https://developers.cloudflare.com/icons/agents/windsurf/light.svg) ![Windsurf icon](https://developers.cloudflare.com/icons/agents/windsurf/dark.svg) Windsurf Cognition Agentic IDE with Cascade context and Flows for multi-step tasks. Made by Cognition. ](https://developers.cloudflare.com/agent-setup/windsurf/)

Was this helpful?

YesNo

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/agent-setup/claude-code/#page","headline":"Claude Code + Cloudflare · Agent setup docs","description":"Terminal-based coding agent that understands your codebase, runs commands, edits files, and manages git. Made by Anthropic.","url":"https://developers.cloudflare.com/agent-setup/claude-code/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-27","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
