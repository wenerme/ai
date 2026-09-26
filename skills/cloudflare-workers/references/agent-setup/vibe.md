---
description: Coding agent for terminal, IDE, and cloud workflows that reads files, runs commands, writes code, and opens pull requests. Made by Mistral AI.
title: Vibe + Cloudflare
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/agent-setup/llms.txt
> Use this file to discover all available pages before exploring further.

[All agents](https://developers.cloudflare.com/agent-setup/)

![](https://developers.cloudflare.com/icons/agents/vibe/light.svg)![](https://developers.cloudflare.com/icons/agents/vibe/dark.svg)

Mistral AI

# Vibe + Cloudflare

Coding agent for terminal, IDE, and cloud workflows that reads files, runs commands, writes code, and opens pull requests. Made by Mistral AI.

IDETerminalStandaloneCloudExtensionOpen Source

[Cloudflare Skills](https://github.com/cloudflare/skills)· [Cloudflare Code Mode API MCP](https://github.com/cloudflare/mcp)· [Cloudflare Domain Specific MCPs](https://github.com/cloudflare/mcp-server-cloudflare)· [CLI](https://docs.mistral.ai/vibe/code/cli/install-setup)· [Vibe Docs](https://docs.mistral.ai/vibe/code/overview)

## Quick start

1. **Install Vibe**

   Install the Vibe command-line interface (CLI) on macOS or Linux. For other installation methods, refer to the [Vibe installation guide ↗︎](https://docs.mistral.ai/vibe/code/cli/install-setup).

   ```bash
   curl -LsSf https://mistral.ai/vibe/install.sh | bash
   ```


2. **Set up Vibe**

   Complete the setup flow. Sign in with your Mistral account or enter an API key.

   ```bash
   vibe --setup
   ```


3. **Install Cloudflare Skills**

   From your project root, install Cloudflare Skills for the current project. Vibe discovers project Skills from `.agents/skills/`.npmyarnpnpm

   ```
   npx skills add cloudflare/skills --skill '*' --yes
   ```

   ```
   yarn dlx skills add cloudflare/skills --skill '*' --yes
   ```

   ```
   pnpx skills add cloudflare/skills --skill '*' --yes
   ```


4. **Add Cloudflare MCP servers**

   Add the Cloudflare Model Context Protocol (MCP) servers to `~/.vibe/config.toml`. Back up an existing file and preserve unrelated settings. Update entries that already exist instead of adding duplicates.

   The Cloudflare docs server is public. The other servers in this configuration require OAuth:

   ```toml
   [[mcp_servers]]
   name = "cloudflare"
   transport = "streamable-http"
   url = "https://mcp.cloudflare.com/mcp"

   [mcp_servers.auth]
   type = "oauth"
   scopes = []

   [[mcp_servers]]
   name = "cloudflare-docs"
   transport = "streamable-http"
   url = "https://docs.mcp.cloudflare.com/mcp"

   [[mcp_servers]]
   name = "cloudflare-bindings"
   transport = "streamable-http"
   url = "https://bindings.mcp.cloudflare.com/mcp"

   [mcp_servers.auth]
   type = "oauth"
   scopes = []

   [[mcp_servers]]
   name = "cloudflare-builds"
   transport = "streamable-http"
   url = "https://builds.mcp.cloudflare.com/mcp"

   [mcp_servers.auth]
   type = "oauth"
   scopes = []

   [[mcp_servers]]
   name = "cloudflare-observability"
   transport = "streamable-http"
   url = "https://observability.mcp.cloudflare.com/mcp"

   [mcp_servers.auth]
   type = "oauth"
   scopes = []
   ```

   For source and configuration details, refer to [cloudflare/mcp ↗︎](https://github.com/cloudflare/mcp) and [cloudflare/mcp-server-cloudflare ↗︎](https://github.com/cloudflare/mcp-server-cloudflare).
5. **Launch and authorize Vibe**

   Start Vibe from your project root. For an existing project, use the directory that contains `wrangler.jsonc`.

   ```bash
   vibe
   ```

   If Vibe is already running, enter `/reload` instead. Then enter `/mcp status` to check each server. Authorize the four servers that access your Cloudflare account:

   ```txt
   /mcp login cloudflare
   /mcp login cloudflare-bindings
   /mcp login cloudflare-builds
   /mcp login cloudflare-observability
   ```

   Complete each OAuth flow in your browser.
6. **Try a prompt**

   For example:

   ```txt
   Set up AI Gateway to route requests across OpenAI and Workers AI with automatic fallback and cost tracking.
   ```



## Cloudflare platform access

Expand any section to learn more.

<details>

<summary>Cloudflare Skills

</summary>

Persistent platform context that teaches the agent how Cloudflare works.

Skills are instructions the agent loads on demand. The <a href="https://github.com/cloudflare/skills">cloudflare/skills</a> bundle covers every layer of the platform — so the agent knows your conventions without you re-explaining them.

- agents-sdkBuild, debug, or review Cloudflare Agents SDK applications using the agents package.
- cloudflareDiscover and choose Cloudflare products for apps, APIs, AI agents, storage, networking, and security. Use for architecture and product selection, including when the user describes a need without naming a Cloudflare product; then find the relevant skill or documentation.
- cloudflare-email-serviceImplement or troubleshoot Cloudflare Email Sending and Email Routing integrations and their delivery configuration.
- cloudflare-oneDesign, configure, troubleshoot, or review Cloudflare One Zero Trust and SASE deployments. Use cloudflare-one-migrations for migration planning from other vendors.
- cloudflare-one-migrationsAssess and plan migrations from existing VPN, SWG, or SASE platforms to Cloudflare One, including policy mapping, parity gaps, and rollout.
- durable-objectsBuild, debug, or review Cloudflare Durable Objects code for persistent state and coordination.
- nextjs-on-cloudflareBuild, migrate, and deploy Next.js apps on Cloudflare Workers with vinext. Use when starting a Next.js project on Cloudflare, moving an existing app to Workers, choosing between vinext and OpenNext, or setting up vinext for Workers. For setup, migration, or deployment, install vinext's upstream skills with \`npx skills add cloudflare/vinext\` if missing, then read and follow the applicable skill and docs.
- sandbox-migrate-to-nextMigrate Cloudflare Sandbox apps from stable @cloudflare/sandbox to @cloudflare/sandbox@next (SDK 1.0 preview). Use sandbox-next for apps already on the preview.
- sandbox-nextBuild or maintain Cloudflare Sandbox apps on @cloudflare/sandbox@next (SDK 1.0 preview). Use sandbox-migrate-to-next when porting a stable app.
- sandbox-stableBuild or maintain Cloudflare Sandbox apps on the stable @cloudflare/sandbox package. Use sandbox-next for preview apps and sandbox-migrate-to-next for stable-to-preview migrations.
- turnstile-spinSet up, repair, or migrate to Cloudflare Turnstile bot verification in an existing frontend and backend, including server-side Siteverify.
- web-perfAudit, diagnose, or optimize website loading and interaction performance, Core Web Vitals, and Lighthouse performance scores.
- workers-best-practicesCloudflare Workers best practices for production applications. Use when writing, reviewing, or configuring Workers.
- wranglerRun or troubleshoot Wrangler CLI commands and configure Worker projects for local development, Previews, deployment, and Cloudflare resource management.

</details>

<details>

<summary>MCP servers

</summary>

Live access to the Cloudflare API, docs, and observability.

MCP servers provide typed tools to call into Cloudflare at runtime. There are two options: <a href="https://blog.cloudflare.com/code-mode-mcp/">Code Mode</a> — a single server that covers the entire Cloudflare API (2,500+ endpoints in \~1,000 tokens) — or a set of focused, domain-specific servers hosted in the <a href="https://github.com/cloudflare/mcp-server-cloudflare">cloudflare/mcp-server-cloudflare</a> repo. The full catalog is also in the <a href="https://developers.cloudflare.com/agents/model-context-protocol/cloudflare/servers-for-cloudflare/">MCP servers for Cloudflare</a> docs.

- Code mode APIcode modeBroad access to the full Cloudflare API via code execution, with minimal token overheadhttps://mcp.cloudflare.com/mcp
- Code Mode servercode modeBest when you want broad access across Cloudflare's APIs through code executionhttps://mcp.cloudflare.com/mcp
- AI Gateway serverSearch your logs, get details about the prompts and responseshttps://ai-gateway.mcp.cloudflare.com/mcp
- AutoRAG serverSearch and query account AutoRAG instanceshttps://autorag.mcp.cloudflare.com/mcp
- Browser Run serverFetch web pages, convert them to markdown and take screenshotshttps://browser.mcp.cloudflare.com/mcp
- Cloudflare Blog serverSearch and read posts from the Cloudflare Bloghttps://blog.mcp.cloudflare.com/mcp
- Cloudflare One CASB serverQuickly identify any security misconfigurations for SaaS applications to safeguard users &amp; datahttps://casb.mcp.cloudflare.com/mcp
- Container serverSpin up a sandbox development environmenthttps://containers.mcp.cloudflare.com/mcp
- Demo Day serverDemonstrate a minimal Cloudflare MCP serverhttps://demo-day.mcp.cloudflare.com/mcp
- Digital Experience Monitoring serverGet quick insight on critical applications for your organizationhttps://dex.mcp.cloudflare.com/mcp
- DNS Analytics serverOptimize DNS performance and debug issues based on current setuphttps://dns-analytics.mcp.cloudflare.com/mcp
- Documentation serverGet up-to-date reference information on Cloudflarehttps://docs.mcp.cloudflare.com/mcp
- Logpush serverGet quick summaries for Logpush job healthhttps://logs.mcp.cloudflare.com/mcp
- Observability serverDebug and get insight into your application's logs and analyticshttps://observability.mcp.cloudflare.com/mcp
- Radar serverExplore Cloudflare Radar internet insightshttps://radar.mcp.cloudflare.com/mcp
- Workers Bindings serverBuild Workers applications with storage, AI, and compute primitiveshttps://bindings.mcp.cloudflare.com/mcp
- Workers Builds serverGet insights and manage your Cloudflare Workers Buildshttps://builds.mcp.cloudflare.com/mcp

</details>

<details>

<summary>Wrangler CLI

</summary>

Local dev, deploys, and Workers-specific commands.

Use <a href="https://developers.cloudflare.com/workers/wrangler/">Wrangler</a> for local development, deploys, and product-specific commands like <code>wrangler d1 migrations apply</code> or <code>wrangler tail</code>. The bundled **wrangler** Skill teaches the agent when to reach for it.

What’s next

The unified <code>cf</code> CLI is in technical preview — a next-generation CLI that covers every Cloudflare product with consistent verbs and ergonomic output for agents. Try it with <code>npx cf</code>. <a href="https://blog.cloudflare.com/cf-cli-local-explorer/">Read the announcement →</a>

</details>

<details>

<summary>Agent-friendly docs

</summary>

Token-efficient references optimized for agents.

Append <code>/index.md</code> to any Cloudflare docs URL for a clean markdown version. Every top-level product section also has its own <code>llms.txt</code> — a page index sized for a single context window. A few useful ones:

- <a href="https://developers.cloudflare.com/llms.txt">developers.cloudflare.com/llms.txt</a> — directory of every Cloudflare product.
- <a href="https://developers.cloudflare.com/workers/llms.txt">developers.cloudflare.com/workers/llms.txt</a>
- <a href="https://developers.cloudflare.com/agents/llms.txt">developers.cloudflare.com/agents/llms.txt</a>
- <a href="https://developers.cloudflare.com/r2/llms.txt">developers.cloudflare.com/r2/llms.txt</a>
- <a href="https://developers.cloudflare.com/d1/llms.txt">developers.cloudflare.com/d1/llms.txt</a>

For a full overview of how these docs are structured for agents, refer to the <a href="https://developers.cloudflare.com/docs-for-agents/">Docs for Agents guide</a>.

</details>

## Example prompts

```txt
Build an AI chat agent using the Cloudflare Agents SDK with persistent conversation history stored in D1.
```

```txt
Deploy a full-stack React app to Cloudflare Pages with a Workers API backend and D1 database.
```

```txt
Optimize my Worker to serve WebP images with responsive resizing using Cloudflare Images.
```

```txt
Deploy a globally distributed REST API on Workers with automatic scaling and zero cold starts.
```

```txt
Add a cron trigger to my Worker that processes a job queue every hour.
```

## Tips

- The Cloudflare API MCP server uses Code Mode — Vibe writes JavaScript against a typed API to reach any of 2,500+ endpoints in \~1,000 tokens.
- Store project instructions in `AGENTS.md`. Vibe loads instructions from the project root and relevant subdirectories.
- Start Vibe with `vibe --agent plan` to inspect a project without modifying it.

## FAQ

<details>

<summary>Should I use Skills, MCP servers, Wrangler CLI, or all three?

</summary>

Use all three. Skills provide Cloudflare implementation guidance. MCP servers provide current documentation and authenticated API tools. Wrangler handles local development, deployments, and Workers-specific commands.

</details>

<details>

<summary>How do I give Vibe access to my Cloudflare account?

</summary>

Run <code>/mcp login &lt;name&gt;</code> for each server configured with OAuth, then complete the authorization flow in your browser. The <code>cloudflare-docs</code> server is public and does not require authentication.

</details>

<details>

<summary>Can I use another model provider with Vibe?

</summary>

Yes. Vibe supports Mistral-hosted models, compatible API providers, and local models. Configure models and providers in <code>~/.vibe/config.toml</code>.

</details>

<details>

<summary>Is Vibe open source?

</summary>

Yes. The Vibe CLI is available under the Apache 2.0 license in the <a href="https://github.com/mistralai/mistral-vibe">mistralai/mistral-vibe ↗︎</a> repository.

</details>

## Troubleshooting

<details>

<summary>MCP server not connecting

</summary>

Confirm that the entries in <code>~/.vibe/config.toml</code> match the quick start. Enter <code>/reload</code>, then enter <code>/mcp status</code>. If a server reports <code>needs_auth</code>, enter <code>/mcp login &lt;name&gt;</code>.

</details>

<details>

<summary>MCP server authentication fails

</summary>

Enter <code>/mcp logout &lt;name&gt;</code>, then enter <code>/mcp login &lt;name&gt;</code>. Complete the new authorization flow in your browser.

</details>

<details>

<summary>Cloudflare Skills are not available

</summary>

Enter <code>/reload</code> to reload Vibe configuration and Skills. If the Skills still do not load, confirm that the installer wrote them to the project <code>.agents/skills/</code> directory.

</details>

<details>

<summary>Getting outdated information about Cloudflare products

</summary>

Enter <code>/mcp status</code> and confirm that <code>cloudflare-docs</code> is connected. Alternatively, point Vibe to <a href="https://developers.cloudflare.com/llms.txt">developers.cloudflare.com/llms.txt</a> for a directory of all products. Use <code>developers.cloudflare.com/&lt;product&gt;/llms.txt</code> for a product-specific index.

</details>

## Build agents on Cloudflare

Cloudflare is not just a deploy target for agents, it is a full stack for building your own.

[Agents SDK Stateful AI agents with state, scheduling, RPC, email, streaming chat — and the Code Mode SDK for token-efficient tool use.Learn more](https://developers.cloudflare.com/agents/) [Build an MCP server Ship a remote MCP server on Workers with OAuth, durable state, and streamable HTTP transport.Learn more](https://developers.cloudflare.com/agents/model-context-protocol/) [Workers AI Run open-source LLMs, embedding models, and image models at the edge. Use it as your agent's model provider.Learn more](https://developers.cloudflare.com/workers-ai/) [Worker Loader Load user-generated code into isolated Workers on demand. The secure sandbox behind Code Mode.Learn more](https://developers.cloudflare.com/workers/runtime-apis/bindings/worker-loader/)

## Other agents

[![](https://developers.cloudflare.com/icons/agents/claude/light.svg)![](https://developers.cloudflare.com/icons/agents/claude/dark.svg) Anthropic<h3>Claude Code</h3>Terminal-based coding agent that understands your codebase, runs commands, edits files, and manages git. Made by Anthropic.View guide](https://developers.cloudflare.com/agent-setup/claude-code/) [![](https://developers.cloudflare.com/icons/agents/codex/light.svg)![](https://developers.cloudflare.com/icons/agents/codex/dark.svg) OpenAI<h3>Codex</h3>

OpenAI coding agent available as a terminal CLI and desktop app. It reads and writes files, runs commands, and browses the web in a sandbox.View guide](https://developers.cloudflare.com/agent-setup/codex/) [![](https://developers.cloudflare.com/icons/agents/cursor/light.svg)![](https://developers.cloudflare.com/icons/agents/cursor/dark.svg) Cursor<h3>Cursor</h3>

AI-first IDE built on VS Code with multi-file Composer edits and background agents. Made by Cursor.View guide](https://developers.cloudflare.com/agent-setup/cursor/) [![](https://developers.cloudflare.com/icons/agents/copilot/light.svg)![](https://developers.cloudflare.com/icons/agents/copilot/dark.svg) GitHub<h3>GitHub Copilot</h3>Editor extension and CLI with agent mode, workspace context, and native PR integration. Made by GitHub.View guide](https://developers.cloudflare.com/agent-setup/github-copilot/) [![](https://developers.cloudflare.com/icons/agents/opencode/light.svg)![](https://developers.cloudflare.com/icons/agents/opencode/dark.svg) Anomaly<h3>OpenCode</h3>

Open-source terminal agent with a rich TUI that works with 75+ LLMs. Made by Anomaly.View guide](https://developers.cloudflare.com/agent-setup/opencode/) [![](https://developers.cloudflare.com/icons/agents/devin/light.svg)![](https://developers.cloudflare.com/icons/agents/devin/dark.svg) Cognition<h3>Devin</h3>

A full IDE with an agent manager built in — the command center for managing all your agents in one place. Made by Cognition.View guide](https://developers.cloudflare.com/agent-setup/devin/) [![](https://developers.cloudflare.com/icons/agents/visual-studio-code/light.svg)![](https://developers.cloudflare.com/icons/agents/visual-studio-code/dark.svg) Microsoft<h3>Visual Studio Code</h3>Free, open-source code editor with native Model Context Protocol (MCP) client support and Copilot Chat integration. Made by Microsoft.View guide](https://developers.cloudflare.com/agent-setup/visual-studio-code/) [![](https://developers.cloudflare.com/icons/agents/command-code/light.svg)![](https://developers.cloudflare.com/icons/agents/command-code/dark.svg) Command Code<h3>Command Code</h3>Command Code is one of the most used coding agents for open models. It automatically learns your coding taste and self-improves as you work.View guide](https://developers.cloudflare.com/agent-setup/command-code/) [![](https://developers.cloudflare.com/icons/agents/bionic/light.svg)![](https://developers.cloudflare.com/icons/agents/bionic/dark.svg) LM Studio<h3>Bionic</h3>

Powerful agent for coding and work. Natively local, with open models in the cloud. By LM Studio.View guide](https://developers.cloudflare.com/agent-setup/bionic/)

Was this helpful?

YesNo

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/agent-setup/vibe/#page","headline":"Vibe + Cloudflare","description":"Coding agent for terminal, IDE, and cloud workflows that reads files, runs commands, writes code, and opens pull requests. Made by Mistral AI.","url":"https://developers.cloudflare.com/agent-setup/vibe/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-09-26","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
