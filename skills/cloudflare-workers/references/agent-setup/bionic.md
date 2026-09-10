---
description: Use LM Studio Bionic with Cloudflare projects, local codebases, and local or cloud-hosted open-source models.
title: LM Studio Bionic + Cloudflare
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/agent-setup/llms.txt
> Use this file to discover all available pages before exploring further.

[All agents](https://developers.cloudflare.com/agent-setup/)

![](https://developers.cloudflare.com/icons/agents/bionic/light.svg)![](https://developers.cloudflare.com/icons/agents/bionic/dark.svg)

LM Studio

# Bionic + Cloudflare

Powerful agent for coding and work. Natively local, with open models in the cloud. By LM Studio.

StandaloneCloud

[Cloudflare Code Mode API MCP](https://github.com/cloudflare/mcp)·[Cloudflare Domain Specific MCPs](https://github.com/cloudflare/mcp-server-cloudflare)·[Bionic Docs](https://lmstudio.ai/docs/bionic)

## Quick start

1. **Install LM Studio Bionic**
Download and install Bionic from the [LM Studio Bionic website ↗](https://lmstudio.ai/).
2. **Create a Code Project**
In Bionic, create a **Code Project**, then select the local directory that contains your Cloudflare project. If your project has a `wrangler.jsonc` file, select the directory that contains it.
3. **Add the Cloudflare MCP server**
In Bionic, add Cloudflare as a remote Model Context Protocol (MCP) server using the following URL:
```txt
https://mcp.cloudflare.com/mcp
```
4. **Try a prompt**
Ask Bionic to investigate a task, make changes, and run relevant tests. Review its diffs and command output before keeping changes.
For example:
```txt
Build an AI chat agent using the Cloudflare Agents SDK with persistent conversation history stored in D1.
```

## Cloudflare platform access

Expand any section to learn more.

Cloudflare Skills

Persistent platform context that teaches the agent how Cloudflare works.

Skills are instructions the agent loads on demand. The [cloudflare/skills](https://github.com/cloudflare/skills) bundle covers every layer of the platform — so the agent knows your conventions without you re-explaining them.

* agents-sdkBuild, debug, or review Cloudflare Agents SDK applications using the agents package.
* cloudflareDiscover and choose Cloudflare products for apps, APIs, AI agents, storage, networking, and security. Use for architecture and product selection, including when the user describes a need without naming a Cloudflare product; then find the relevant skill or documentation.
* cloudflare-email-serviceImplement or troubleshoot Cloudflare Email Sending and Email Routing integrations and their delivery configuration.
* cloudflare-oneDesign, configure, troubleshoot, or review Cloudflare One Zero Trust and SASE deployments. Use cloudflare-one-migrations for migration planning from other vendors.
* cloudflare-one-migrationsAssess and plan migrations from existing VPN, SWG, or SASE platforms to Cloudflare One, including policy mapping, parity gaps, and rollout.
* durable-objectsBuild, debug, or review Cloudflare Durable Objects code for persistent state and coordination.
* nextjs-on-cloudflareBuild, migrate, and deploy Next.js apps on Cloudflare Workers with vinext. Use when starting a Next.js project on Cloudflare, moving an existing app to Workers, choosing between vinext and OpenNext, or setting up vinext for Workers. For setup, migration, or deployment, install vinext's upstream skills with \`npx skills add cloudflare/vinext\` if missing, then read and follow the applicable skill and docs.
* sandbox-migrate-to-nextMigrate Cloudflare Sandbox apps from stable @cloudflare/sandbox to @cloudflare/sandbox@next (SDK 1.0 preview). Use sandbox-next for apps already on the preview.
* sandbox-nextBuild or maintain Cloudflare Sandbox apps on @cloudflare/sandbox@next (SDK 1.0 preview). Use sandbox-migrate-to-next when porting a stable app.
* sandbox-stableBuild or maintain Cloudflare Sandbox apps on the stable @cloudflare/sandbox package. Use sandbox-next for preview apps and sandbox-migrate-to-next for stable-to-preview migrations.
* turnstile-spinSet up, repair, or migrate to Cloudflare Turnstile bot verification in an existing frontend and backend, including server-side Siteverify.
* web-perfAudit, diagnose, or optimize website loading and interaction performance, Core Web Vitals, and Lighthouse performance scores.
* workers-best-practicesCloudflare Workers best practices for production applications. Use when writing, reviewing, or configuring Workers.
* wranglerRun or troubleshoot Wrangler CLI commands and configure Worker projects for local development, deployment, and Cloudflare resource management.

MCP servers

Live access to the Cloudflare API, docs, and observability.

MCP servers provide typed tools to call into Cloudflare at runtime. There are two options: [Code Mode](https://blog.cloudflare.com/code-mode-mcp/) — a single server that covers the entire Cloudflare API (2,500+ endpoints in \~1,000 tokens) — or a set of focused, domain-specific servers hosted in the [cloudflare/mcp-server-cloudflare](https://github.com/cloudflare/mcp-server-cloudflare) repo. The full catalog is also in the [MCP servers for Cloudflare](https://developers.cloudflare.com/agents/model-context-protocol/cloudflare/servers-for-cloudflare/) docs.

* Code mode APIcode modeBroad access to the full Cloudflare API via code execution, with minimal token overheadhttps://mcp.cloudflare.com/mcp
* Code Mode servercode modeBest when you want broad access across Cloudflare's APIs through code executionhttps://mcp.cloudflare.com/mcp
* AI Gateway serverSearch your logs, get details about the prompts and responseshttps://ai-gateway.mcp.cloudflare.com/mcp
* Audit Logs serverQuery audit logs and generate reports for reviewhttps://auditlogs.mcp.cloudflare.com/mcp
* AutoRAG serverSearch and query account AutoRAG instanceshttps://autorag.mcp.cloudflare.com/mcp
* Browser Run serverFetch web pages, convert them to markdown and take screenshotshttps://browser.mcp.cloudflare.com/mcp
* Cloudflare Blog serverSearch and read posts from the Cloudflare Bloghttps://blog.mcp.cloudflare.com/mcp
* Cloudflare One CASB serverQuickly identify any security misconfigurations for SaaS applications to safeguard users & datahttps://casb.mcp.cloudflare.com/mcp
* Container serverSpin up a sandbox development environmenthttps://containers.mcp.cloudflare.com/mcp
* Demo Day serverDemonstrate a minimal Cloudflare MCP serverhttps://demo-day.mcp.cloudflare.com/mcp
* Digital Experience Monitoring serverGet quick insight on critical applications for your organizationhttps://dex.mcp.cloudflare.com/mcp
* DNS Analytics serverOptimize DNS performance and debug issues based on current setuphttps://dns-analytics.mcp.cloudflare.com/mcp
* Documentation serverGet up-to-date reference information on Cloudflarehttps://docs.mcp.cloudflare.com/mcp
* Logpush serverGet quick summaries for Logpush job healthhttps://logs.mcp.cloudflare.com/mcp
* Observability serverDebug and get insight into your application's logs and analyticshttps://observability.mcp.cloudflare.com/mcp
* Radar serverExplore Cloudflare Radar internet insightshttps://radar.mcp.cloudflare.com/mcp
* Workers Bindings serverBuild Workers applications with storage, AI, and compute primitiveshttps://bindings.mcp.cloudflare.com/mcp
* Workers Builds serverGet insights and manage your Cloudflare Workers Buildshttps://builds.mcp.cloudflare.com/mcp

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

```txt
Set up GitHub Actions to deploy this Worker to staging and production on Cloudflare.
```

```txt
Optimize my Worker to serve WebP images with responsive resizing using Cloudflare Images.
```

```txt
Set up a Waiting Room to handle flash sale traffic spikes without dropping requests.
```

```txt
Add mTLS authentication and schema validation to protect my API endpoints.
```

```txt
Set up WAF rules to block SQL injection and XSS attacks on my application.
```

## Tips

* Use a **Code Project** for local Cloudflare source files. Use a **Work Project** for research, writing, and document tasks.
* Use the Cloudflare API MCP server for account resources and domain-specific servers for focused workflows.
* Review Bionic diffs and command output before keeping changes.

## FAQ

Should I use the MCP server, Wrangler CLI, or both?

Use both. The Cloudflare API MCP server handles Cloudflare account operations, such as DNS, WAF, R2, and Zero Trust. Wrangler handles local development, deployments, and migrations. In a Code Project, Bionic can run local shell commands, including Wrangler commands.

How do I give Bionic access to my Cloudflare account?

Add `[https://mcp.cloudflare.com/mcp ↗](https://mcp.cloudflare.com/mcp)` as a remote MCP server. When Bionic prompts you, complete the OAuth authorization flow in your browser and choose the permissions to grant.

Can Bionic deploy existing Workers projects?

Yes. Create a Code Project from the existing project directory where `wrangler.jsonc` is located. You can then ask Bionic to run the deployment command for that project.

What does Code Mode mean for MCP?

Code Mode is how the Cloudflare API MCP server fits all 2,500+ API endpoints into about 1,000 tokens. Instead of exposing every endpoint as a separate tool, it exposes `search()` and `execute()`. Bionic writes JavaScript to call them. For more information, refer to [Code Mode](https://blog.cloudflare.com/code-mode-mcp/).

## Troubleshooting

MCP server not connecting

Confirm that the server URL is `[https://mcp.cloudflare.com/mcp ↗](https://mcp.cloudflare.com/mcp)`. Remove and re-add the remote MCP server in Bionic, then try connecting again.

Getting outdated information about Cloudflare products

Add the Cloudflare documentation MCP server at `[https://docs.mcp.cloudflare.com/mcp ↗](https://docs.mcp.cloudflare.com/mcp)` so Bionic can retrieve current documentation. Alternatively, point Bionic to [developers.cloudflare.com/llms.txt](https://developers.cloudflare.com/llms.txt) for a directory of all products, or `developers.cloudflare.com/<product>/llms.txt`for a product-specific index.

MCP server authentication fails

Remove and re-add the MCP server. When Bionic prompts you, complete the OAuth authorization flow in your browser.

## Build agents on Cloudflare

Cloudflare is not just a deploy target for agents, it is a full stack for building your own.

[Agents SDKStateful AI agents with state, scheduling, RPC, email, streaming chat — and the Code Mode SDK for token-efficient tool use.Learn more](https://developers.cloudflare.com/agents/)[Build an MCP serverShip a remote MCP server on Workers with OAuth, durable state, and streamable HTTP transport.Learn more](https://developers.cloudflare.com/agents/model-context-protocol/)[Workers AIRun open-source LLMs, embedding models, and image models at the edge. Use it as your agent's model provider.Learn more](https://developers.cloudflare.com/workers-ai/)[Worker LoaderLoad user-generated code into isolated Workers on demand. The secure sandbox behind Code Mode.Learn more](https://developers.cloudflare.com/workers/runtime-apis/bindings/worker-loader/)

## Other agents

[![](https://developers.cloudflare.com/icons/agents/claude/light.svg)![](https://developers.cloudflare.com/icons/agents/claude/dark.svg)AnthropicClaude CodeTerminal-based coding agent that understands your codebase, runs commands, edits files, and manages git. Made by Anthropic.View guide](https://developers.cloudflare.com/agent-setup/claude-code/)[![](https://developers.cloudflare.com/icons/agents/codex/light.svg)![](https://developers.cloudflare.com/icons/agents/codex/dark.svg)OpenAICodexOpenAI coding agent available as a terminal CLI and desktop app. It reads and writes files, runs commands, and browses the web in a sandbox.View guide](https://developers.cloudflare.com/agent-setup/codex/)[![](https://developers.cloudflare.com/icons/agents/cursor/light.svg)![](https://developers.cloudflare.com/icons/agents/cursor/dark.svg)CursorCursorAI-first IDE built on VS Code with multi-file Composer edits and background agents. Made by Cursor.View guide](https://developers.cloudflare.com/agent-setup/cursor/)[![](https://developers.cloudflare.com/icons/agents/copilot/light.svg)![](https://developers.cloudflare.com/icons/agents/copilot/dark.svg)GitHubGitHub CopilotEditor extension and CLI with agent mode, workspace context, and native PR integration. Made by GitHub.View guide](https://developers.cloudflare.com/agent-setup/github-copilot/)[![](https://developers.cloudflare.com/icons/agents/opencode/light.svg)![](https://developers.cloudflare.com/icons/agents/opencode/dark.svg)AnomalyOpenCodeOpen-source terminal agent with a rich TUI that works with 75+ LLMs. Made by Anomaly.View guide](https://developers.cloudflare.com/agent-setup/opencode/)[![](https://developers.cloudflare.com/icons/agents/windsurf/light.svg)![](https://developers.cloudflare.com/icons/agents/windsurf/dark.svg)CognitionWindsurfAgentic IDE with Cascade context and Flows for multi-step tasks. Made by Cognition.View guide](https://developers.cloudflare.com/agent-setup/windsurf/)[![](https://developers.cloudflare.com/icons/agents/visual-studio-code/light.svg)![](https://developers.cloudflare.com/icons/agents/visual-studio-code/dark.svg)MicrosoftVisual Studio CodeFree, open-source code editor with native Model Context Protocol (MCP) client support and Copilot Chat integration. Made by Microsoft.View guide](https://developers.cloudflare.com/agent-setup/visual-studio-code/)[![](https://developers.cloudflare.com/icons/agents/command-code/light.svg)![](https://developers.cloudflare.com/icons/agents/command-code/dark.svg)Command CodeCommand CodeCommand Code is one of the most used coding agents for open models. It automatically learns your coding taste and self-improves as you work.View guide](https://developers.cloudflare.com/agent-setup/command-code/)

Was this helpful?

YesNo

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/agent-setup/bionic/#page","headline":"LM Studio Bionic + Cloudflare · Agent setup docs","description":"Use LM Studio Bionic with Cloudflare projects, local codebases, and local or cloud-hosted open-source models.","url":"https://developers.cloudflare.com/agent-setup/bionic/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-07-22","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
