---
description: Minimal, extensible agent harness that you can make your own. Made by Earendil.
title: Pi + Cloudflare
image: https://developers.cloudflare.com/agent-setup/pi/og.png?v=3206b9bcc264176d
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/agent-setup/llms.txt
> Use this file to discover all available pages before exploring further.

[All agents](https://developers.cloudflare.com/agent-setup/)

![](https://developers.cloudflare.com/icons/agents/pi/light.svg)![](https://developers.cloudflare.com/icons/agents/pi/dark.svg)

Earendil

# Pi + Cloudflare

Minimal, extensible agent harness that you can make your own. Made by Earendil.

TerminalStandaloneOpen Source

[Cloudflare Skills](https://github.com/cloudflare/skills)· [Cloudflare Code Mode API MCP](https://github.com/cloudflare/mcp)· [Cloudflare Domain Specific MCPs](https://github.com/cloudflare/mcp-server-cloudflare)· [Pi Docs](https://pi.dev/docs/latest)

## Quick start

1. **Install Pi**

   Install Pi on macOS or Linux. For Windows, npm, or Nix options, refer to the [Pi quickstart ↗︎](https://pi.dev/docs/latest/quickstart).

   ```bash
   curl -fsSL https://pi.dev/install.sh | sh
   ```

2. **Install Cloudflare Skills**

   ```bash
   npx skills add https://github.com/cloudflare/skills
   ```

3. **Add the Cloudflare MCP server**

   Register the Cloudflare MCP server in `~/.pi/agent/mcp.json`, then sign in through OAuth. For domain-specific MCP servers, refer to [mcp-server-cloudflare ↗︎](https://github.com/cloudflare/mcp-server-cloudflare). For the full Cloudflare API MCP server (Code Mode), refer to [cloudflare/mcp ↗︎](https://github.com/cloudflare/mcp).

   ```bash
   pi mcp add cloudflare --url https://mcp.cloudflare.com/mcp
   pi mcp login cloudflare
   ```

4. **Launch Pi**

   Start Pi from the root of your project, where `wrangler.jsonc` or `cloudflare.config.ts` lives (if either exists). If you have not connected a model provider yet, run `/login` inside Pi to connect a subscription or API key.

   ```bash
   pi
   ```

5. **Try a prompt**

   For example:

   ```txt
   Set up rate limiting and WAF rules to block abuse on my public API.
   ```

## Cloudflare platform access

Expand any section to learn more.

<details>

<summary>Cloudflare Skills

</summary>

Persistent platform context that teaches the agent how Cloudflare works.

Skills are instructions the agent loads on demand. The <a href="https://github.com/cloudflare/skills">cloudflare/skills</a> bundle covers every layer of the platform — so the agent knows your conventions without you re-explaining them.

- agents-sdkBuild, debug, or review Cloudflare Agents SDK applications using the agents package.
- basinBuild and troubleshoot Cloudflare Basin analytics workflows with Basin Pipelines, Basin Catalog, and Basin SQL. Use for streaming data into R2 Iceberg tables, managing catalogs, or querying those tables; also use for requests using the former Data Platform, Pipelines, R2 Data Catalog, or R2 SQL names.
- cf-cliCloudflare's official cf CLI (beta) for the public Cloudflare API and Workers projects. Use for finding and running Cloudflare commands from the terminal — sign-in and profiles, cf cli search, cf schema, cf deploy/dev/build, resource commands for DNS, zones, D1, KV, and R2 — and for choosing between cf and Wrangler in a project.
- cloudflareDiscover and choose Cloudflare products for apps, APIs, AI agents, storage, networking, and security. Use for architecture and product selection, including when the user describes a need without naming a Cloudflare product; then find the relevant skill or documentation.
- cloudflare-email-serviceImplement or troubleshoot Cloudflare Email Sending and Email Routing integrations and their delivery configuration.
- cloudflare-oneDesign, configure, troubleshoot, or review Cloudflare One Zero Trust and SASE deployments. Use cloudflare-one-migrations for migration planning from other vendors.
- cloudflare-one-migrationsAssess and plan migrations from existing VPN, SWG, or SASE platforms to Cloudflare One, including policy mapping, parity gaps, and rollout.
- durable-objectsBuild, debug, or review Cloudflare Durable Objects code for persistent state and coordination.
- gateway-workersBuild, debug, or review Cloudflare Workers invoked by the Forward action in Gateway HTTP policies, including the GatewayMiddleware entrypoint, Gateway types, context, and continuation.
- k2Build and troubleshoot Cloudflare K2 or K2 Streams durable logs. Use for stream setup, producing from Workers or HTTP, configuring retention and inputs, and consuming through subscriptions.
- nextjs-on-cloudflareBuild, migrate, and deploy Next.js apps on Cloudflare Workers with vinext. Use when starting a Next.js project on Cloudflare, moving an existing app to Workers, choosing between vinext and OpenNext, or setting up vinext for Workers. For setup, migration, or deployment, install vinext's upstream skills with \`npx skills add cloudflare/vinext\` if missing, then read and follow the applicable skill and docs.
- sandbox-migrate-to-nextMigrate Cloudflare Sandbox apps from stable @cloudflare/sandbox to @cloudflare/sandbox@next (SDK 1.0 preview). Use sandbox-next for apps already on the preview.
- sandbox-nextBuild or maintain Cloudflare Sandbox apps on @cloudflare/sandbox@next (SDK 1.0 preview). Use sandbox-migrate-to-next when porting a stable app.
- sandbox-stableBuild or maintain Cloudflare Sandbox apps on the stable @cloudflare/sandbox package. Use sandbox-next for preview apps and sandbox-migrate-to-next for stable-to-preview migrations.
- turnstile-spinSet up, repair, or migrate to Cloudflare Turnstile bot verification in an existing frontend and backend, including server-side Siteverify.
- web-perfAudit, diagnose, or optimize website loading and interaction performance, Core Web Vitals, and Lighthouse performance scores.
- workers-best-practicesCloudflare Workers best practices for production applications. Use when writing, reviewing, or configuring Workers.
- workers-profilingProfile or debug CPU usage and memory allocation in deployed Cloudflare Workers and Durable Objects. Then use this information to optimize your code.
- wranglerRun or troubleshoot Wrangler CLI commands in projects that have a wrangler.jsonc, wrangler.json, or wrangler.toml file, including local development, Previews, deployment, and resource management. For new projects and projects without a Wrangler configuration file, use the cf CLI instead.

</details>

<details>

<summary>MCP servers

</summary>

Live access to the Cloudflare API, docs, and observability.

MCP servers provide typed tools to call into Cloudflare at runtime. There are two options: <a href="https://blog.cloudflare.com/code-mode-mcp/">Code Mode</a> — a single server that covers the entire Cloudflare API (2,500+ endpoints in \~1,000 tokens) — or a set of focused, domain-specific servers hosted in the <a href="https://github.com/cloudflare/mcp-server-cloudflare">cloudflare/mcp-server-cloudflare</a> repo. The full catalog is also in the <a href="https://developers.cloudflare.com/agents/model-context-protocol/cloudflare/servers-for-cloudflare/">MCP servers for Cloudflare</a> docs.

- Cloudflare API MCP Servercode modeBest when you want broad access across Cloudflare's APIs through code executionhttps://mcp.cloudflare.com/mcp
- Code mode APIcode modeBroad access to the full Cloudflare API via code execution, with minimal token overheadhttps://mcp.cloudflare.com/mcp
- Browser Run serverFetch web pages, convert them to markdown and take screenshotshttps://browser.mcp.cloudflare.com/mcp
- Cloudflare Blog serverSearch and read posts from the Cloudflare Bloghttps://blog.mcp.cloudflare.com/mcp
- Cloudflare One CASB serverQuickly identify any security misconfigurations for SaaS applications to safeguard users &amp; datahttps://casb.mcp.cloudflare.com/mcp
- Container serverSpin up a sandbox development environmenthttps://containers.mcp.cloudflare.com/mcp
- Demo Day serverDemonstrate a minimal Cloudflare MCP serverhttps://demo-day.mcp.cloudflare.com/mcp
- Digital Experience Monitoring serverGet quick insight on critical applications for your organizationhttps://dex.mcp.cloudflare.com/mcp
- Documentation serverGet up-to-date reference information on Cloudflarehttps://docs.mcp.cloudflare.com/mcp

</details>

<details>

<summary>Wrangler CLI

</summary>

Local dev, deploys, and Workers-specific commands.

Use <a href="https://developers.cloudflare.com/workers/wrangler/">Wrangler</a> for local development, deploys, and product-specific commands like <code>wrangler d1 migrations apply</code> or <code>wrangler tail</code>. The bundled **wrangler** Skill teaches the agent when to reach for it.

Cloudflare CLI (beta)

The <a href="https://developers.cloudflare.com/cf/">Cloudflare CLI</a>, <code>cf</code>, covers the public Cloudflare API and prints JSON output. Install it with <code>npm install -g cf</code>, then follow <a href="https://developers.cloudflare.com/cf/agents/">Use cf with AI agents</a>.

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
Create a Logpush job to stream Workers analytics to my data warehouse.
```

```txt
Set up AI Gateway to route requests across OpenAI and Workers AI with automatic fallback and cost tracking.
```

```txt
Add real-time collaboration to my app using Durable Objects with WebSocket hibernation.
```

```txt
Build an AI chat agent using the Cloudflare Agents SDK with persistent conversation history stored in D1.
```

```txt
Build an image upload and transformation service using R2 and Cloudflare Images.
```

## Tips

- The Cloudflare API MCP server uses Code Mode. Pi writes JavaScript against a typed API to reach any of 2,500+ endpoints in \~1,000 tokens.
- Pi calls MCP tools from its own `codemode` tool by default. To declare the Cloudflare tools to the model directly, add the server with `--exposure direct`.
- Use `/mcp` inside Pi to check the connection, sign in, reconnect, or turn the Cloudflare server on or off. Run `/reload` after changing `mcp.json` outside a session.
- Pi has built-in providers for [Workers AI ↗︎](https://pi.dev/docs/latest/providers#cloudflare-workers-ai) and [AI Gateway](https://developers.cloudflare.com/ai-gateway/integrations/coding-agents/pi/), so you can keep the whole workflow on Cloudflare.

## FAQ

<details>

<summary>Should I use Skills, the MCP server, a CLI, or all of them?

</summary>

All three. Skills provide persistent Cloudflare expertise so Pi knows when to reach for Durable Objects vs KV, how to structure a Workers project, and when to call CLI vs API. The Cloudflare API MCP server handles platform operations (DNS, WAF, Zero Trust, R2 buckets). Wrangler handles local dev, deploys, and Workers-specific commands. The bundled <code>wrangler</code> Skill teaches Pi which to use. For tasks across the whole Cloudflare API, Pi can also use the <a href="https://developers.cloudflare.com/cf/">Cloudflare CLI</a>, <code>cf</code>.

</details>

<details>

<summary>Can Pi use the Cloudflare CLI?

</summary>

Yes. The <a href="https://developers.cloudflare.com/cf/">Cloudflare CLI</a>, <code>cf</code>, is in beta and covers the whole Cloudflare API and prints JSON output. Install it with <code>npm install -g cf</code>, sign in with <code>cf auth login</code>, and tell Pi to prefer it in <code>AGENTS.md</code> or <code>~/.pi/agent/AGENTS.md</code>. Refer to <a href="https://developers.cloudflare.com/cf/agents/">Use cf with AI agents</a>.

</details>

<details>

<summary>How do I connect Pi to my Cloudflare account?

</summary>

Run <code>pi mcp login cloudflare</code>, or run <code>/mcp login cloudflare</code> inside Pi. Pi opens the Cloudflare authorization page in your browser, where you choose permissions.

</details>

<details>

<summary>Can I use Workers AI as the model provider in Pi?

</summary>

Yes. Pi has built-in Cloudflare Workers AI and Cloudflare AI Gateway providers. Set <code>CLOUDFLARE_API_KEY</code> and <code>CLOUDFLARE_ACCOUNT_ID</code>, or run <code>/login</code> inside Pi. To route another provider through AI Gateway, refer to <a href="https://developers.cloudflare.com/ai-gateway/integrations/coding-agents/pi/">Pi with AI Gateway</a>.

</details>

<details>

<summary>Is Pi open source?

</summary>

Yes. Pi is open source under the MIT license and available at <a href="https://github.com/earendil-works/pi">github.com/earendil-works/pi ↗︎</a>.

</details>

## Troubleshooting

<details>

<summary>MCP server connection fails

</summary>

Run <code>pi mcp list</code> to connect to every configured server and print its state and errors. Inside Pi, <code>/mcp</code> shows the full connection error. Pi requires a streamable HTTP endpoint, so use <code>https://mcp.cloudflare.com/mcp</code> rather than an <code>/sse</code> URL.

</details>

<details>

<summary>MCP server authentication fails

</summary>

Run <code>pi mcp logout cloudflare</code>, then <code>pi mcp login cloudflare</code> and complete the OAuth flow in your browser. If the browser runs on another machine, such as over SSH, paste the redirected URL into Pi when prompted.

</details>

<details>

<summary>Getting outdated information about Cloudflare products

</summary>

Point the agent directly at <a href="https://developers.cloudflare.com/llms.txt">developers.cloudflare.com/llms.txt</a> for a directory of every product, or <code>developers.cloudflare.com/&lt;product&gt;/llms.txt</code> for a product-specific index.

</details>

## Build agents on Cloudflare

Cloudflare is not just a deploy target for agents, it is a full stack for building your own.

[Agents SDK Stateful AI agents with state, scheduling, RPC, email, streaming chat — and the Code Mode SDK for token-efficient tool use.Learn more](https://developers.cloudflare.com/agents/) [Build an MCP server Ship a remote MCP server on Workers with OAuth, durable state, and streamable HTTP transport.Learn more](https://developers.cloudflare.com/agents/model-context-protocol/) [Workers AI Run open-source LLMs, embedding models, and image models at the edge. Use it as your agent's model provider.Learn more](https://developers.cloudflare.com/workers-ai/) [Worker Loader Load user-generated code into isolated Workers on demand. The secure sandbox behind Code Mode.Learn more](https://developers.cloudflare.com/workers/runtime-apis/bindings/worker-loader/)

## Other agents

[![](https://developers.cloudflare.com/icons/agents/claude/light.svg)![](https://developers.cloudflare.com/icons/agents/claude/dark.svg) Anthropic<h3>Claude Code</h3>Terminal-based coding agent that understands your codebase, runs commands, edits files, and manages git. Made by Anthropic.View guide](https://developers.cloudflare.com/agent-setup/claude-code/) [![](https://developers.cloudflare.com/icons/agents/codex/light.svg)![](https://developers.cloudflare.com/icons/agents/codex/dark.svg) OpenAI<h3>Codex</h3>OpenAI coding agent available as a terminal CLI and desktop app. It reads and writes files, runs commands, and browses the web in a sandbox.View guide](https://developers.cloudflare.com/agent-setup/codex/) [![](https://developers.cloudflare.com/icons/agents/cursor/light.svg)![](https://developers.cloudflare.com/icons/agents/cursor/dark.svg) Cursor<h3>Cursor</h3>AI-first IDE built on VS Code with multi-file Composer edits and background agents. Made by Cursor.View guide](https://developers.cloudflare.com/agent-setup/cursor/) [![](https://developers.cloudflare.com/icons/agents/copilot/light.svg)![](https://developers.cloudflare.com/icons/agents/copilot/dark.svg) GitHub<h3>GitHub Copilot</h3>Editor extension and CLI with agent mode, workspace context, and native PR integration. Made by GitHub.View guide](https://developers.cloudflare.com/agent-setup/github-copilot/) [![](https://developers.cloudflare.com/icons/agents/opencode/light.svg)![](https://developers.cloudflare.com/icons/agents/opencode/dark.svg) Anomaly<h3>OpenCode</h3>Open-source terminal agent with a rich TUI that works with 75+ LLMs. Made by Anomaly.View guide](https://developers.cloudflare.com/agent-setup/opencode/) [![](https://developers.cloudflare.com/icons/agents/vibe/light.svg)![](https://developers.cloudflare.com/icons/agents/vibe/dark.svg) Mistral AI<h3>Vibe</h3>Coding agent for terminal, IDE, and cloud workflows that reads files, runs commands, writes code, and opens pull requests. Made by Mistral AI.View guide](https://developers.cloudflare.com/agent-setup/vibe/) [![](https://developers.cloudflare.com/icons/agents/devin/light.svg)![](https://developers.cloudflare.com/icons/agents/devin/dark.svg) Cognition<h3>Devin</h3>A full IDE with an agent manager built in — the command center for managing all your agents in one place. Made by Cognition.View guide](https://developers.cloudflare.com/agent-setup/devin/) [![](https://developers.cloudflare.com/icons/agents/visual-studio-code/light.svg)![](https://developers.cloudflare.com/icons/agents/visual-studio-code/dark.svg) Microsoft<h3>Visual Studio Code</h3>Free, open-source code editor with native Model Context Protocol (MCP) client support and Copilot Chat integration. Made by Microsoft.View guide](https://developers.cloudflare.com/agent-setup/visual-studio-code/) [![](https://developers.cloudflare.com/icons/agents/command-code/light.svg)![](https://developers.cloudflare.com/icons/agents/command-code/dark.svg) Command Code<h3>Command Code</h3>Command Code is one of the most used coding agents for open models. It automatically learns your coding taste and self-improves as you work.View guide](https://developers.cloudflare.com/agent-setup/command-code/) [![](https://developers.cloudflare.com/icons/agents/bionic/light.svg)![](https://developers.cloudflare.com/icons/agents/bionic/dark.svg) LM Studio<h3>Bionic</h3>Powerful agent for coding and work. Natively local, with open models in the cloud. By LM Studio.View guide](https://developers.cloudflare.com/agent-setup/bionic/) [![](https://developers.cloudflare.com/icons/agents/factory/light.svg)![](https://developers.cloudflare.com/icons/agents/factory/dark.svg) Factory<h3>Droid</h3>Model-agnostic coding agent that plans, edits files, runs commands, and automates CI, from the terminal, desktop app, or cloud. Made by Factory.View guide](https://developers.cloudflare.com/agent-setup/droid/)

Was this helpful?

YesNo

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/agent-setup/pi/#page","headline":"Pi + Cloudflare","description":"Minimal, extensible agent harness that you can make your own. Made by Earendil.","url":"https://developers.cloudflare.com/agent-setup/pi/","inLanguage":"en","image":"https://developers.cloudflare.com/agent-setup/pi/og.png?v=3206b9bcc264176d","dateModified":"2026-10-28","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
