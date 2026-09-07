---
description: Free, open-source code editor with native Model Context Protocol (MCP) client support and Copilot Chat integration. Made by Microsoft.
title: Visual Studio Code + Cloudflare
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/agent-setup/llms.txt
> Use this file to discover all available pages before exploring further.

[All agents](https://developers.cloudflare.com/agent-setup/)

![](https://developers.cloudflare.com/icons/agents/visual-studio-code/light.svg)![](https://developers.cloudflare.com/icons/agents/visual-studio-code/dark.svg)

Microsoft

# Visual Studio Code + Cloudflare

Free, open-source code editor with native Model Context Protocol (MCP) client support and Copilot Chat integration. Made by Microsoft.

IDETerminalStandaloneExtensionOpen Source

[Cloudflare Skills](https://github.com/cloudflare/skills)·[Cloudflare Code Mode API MCP](https://github.com/cloudflare/mcp)·[Cloudflare Domain Specific MCPs](https://github.com/cloudflare/mcp-server-cloudflare)·[Visual Studio Code Docs](https://code.visualstudio.com/docs)

## Quick start

1. **Install Visual Studio Code and GitHub Copilot**
Install [Visual Studio Code ↗](https://code.visualstudio.com/) and make sure it is fully up to date. Then install the [GitHub Copilot extension ↗](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot) and sign in with a GitHub account. The Copilot free tier is enough to try this.
2. **Configure the Cloudflare MCP server**
Create `.vscode/mcp.json` inside your workspace folder:
```json
{
  "servers": {
    "cloudflare-api": {
      "type": "http",
      "url": "https://mcp.cloudflare.com/mcp"
    }
  }
}
```
Visual Studio Code uses `servers` as the root key. Configurations copied from Cursor or Claude Desktop use `mcpServers` and will silently do nothing here. For domain-specific MCP servers, refer to [mcp-server-cloudflare ↗](https://github.com/cloudflare/mcp-server-cloudflare). For the full Cloudflare API MCP server (Code Mode), refer to [cloudflare/mcp ↗](https://github.com/cloudflare/mcp).
3. **Start the server and authorize**
After you save `mcp.json`, Visual Studio Code shows a **Start** CodeLens on the `cloudflare-api` server definition. Select it and complete the OAuth flow to authorize the Cloudflare MCP server against your account. Start with a demo account until you are comfortable with the scope you grant.
4. **Try a prompt**
Open Copilot Chat (**Ctrl+Shift+I** / **Cmd+Shift+I**), switch to agent mode, and try a prompt — for example:
```txt
Add real-time collaboration to my app using Durable Objects with WebSocket hibernation.
```

For a screenshot-by-screenshot walkthrough — including the OAuth authorization page, verifying the server is running, and using natural language to create and delete DNS records — refer to the [detailed walkthrough](https://developers.cloudflare.com/agent-setup/visual-studio-code/detailed-walkthrough/).

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
Configure Zero Trust access policies to protect my internal staging environment.
```

```txt
Set up AI Gateway to route requests across OpenAI and Workers AI with automatic fallback and cost tracking.
```

```txt
Configure caching rules and cache TTLs to reduce origin load for my e-commerce store.
```

```txt
Build a serverless AI inference endpoint on Workers AI with streaming responses.
```

```txt
Set up GitHub Actions to deploy this Worker to staging and production on Cloudflare.
```

## Tips

* The Cloudflare API MCP server uses Code Mode — the agent writes JavaScript against a typed API to reach any of 2,500+ endpoints in \~1,000 tokens. That is why you see only three tools registered, not thousands.
* Visual Studio Code's MCP configuration uses `servers` as the root key. Configurations copied from other agents (Cursor, Claude Desktop) use `mcpServers` and will not work in Visual Studio Code.
* Scope the OAuth grant to a single account, and start with **Read only** or a **Custom** permission set before granting **Full access**.
* Revoke the grant at any time from the Cloudflare dashboard under **My Profile → Access Management → Connected Applications**.

## FAQ

Why does the MCP server only show three tools?

The Cloudflare API specification is roughly two million tokens, which is far too large to hand an agent directly. The Cloudflare MCP server uses a code-execution pattern: the agent gets a tool to search the API spec and a tool to execute calls, and the spec stays server-side. Three tools is the correct, healthy state.

Does this only work with Visual Studio Code?

No. The same server URL (`https://mcp.cloudflare.com/mcp`) works in Claude Code, Cursor, Claude Desktop, or any MCP-capable client. Visual Studio Code is one option among many.

Can I use a Cloudflare API token instead of OAuth?

Yes. You can pass a Cloudflare API token as a bearer credential, which makes sense for CI/CD or shared automation. For interactive editor use, OAuth is the recommended path. API tokens using Client IP Address Filtering are not supported.

Do I need GitHub Copilot to use MCP in Visual Studio Code?

Copilot Chat is the MCP client used in this guide, so yes — you need Copilot (or another MCP-capable extension) to actually drive the server. Visual Studio Code itself provides the MCP configuration and lifecycle, but the chat UI comes from Copilot.

## Troubleshooting

Chat throws 'Cannot read properties of undefined'

The Visual Studio Code build and the Copilot extension are out of sync. Update Visual Studio Code from the blue button in the title bar, let it restart, and try again.

Writes fail with API error 10000, but reads work

The OAuth grant is read-only even though you intended to grant full access. This can happen if you authorize more than once — subsequent flows can silently come through with a reduced scope. Revoke the application under **My Profile → Access Management → Connected Applications** in the Cloudflare dashboard, sign out of the MCP session in Visual Studio Code (the account icon at the bottom of the activity bar), then start the server again.

No Start button appears in mcp.json

Check the root key in the JSON. Visual Studio Code requires `servers`, not `mcpServers`. Also confirm the file is at `.vscode/mcp.json` inside the open folder, not at the folder root.

The agent suggests creating an API token to work around an error

Decline. If authentication is broken, the fix is the OAuth grant, not pasting a bearer token into a chat window. Follow the API error 10000 troubleshooting steps to re-grant cleanly.

401 errors in the Visual Studio Code logs

Expected behavior until you select **Allow in this Session** in the Copilot Chat authorization prompt.

## Build agents on Cloudflare

Cloudflare is not just a deploy target for agents, it is a full stack for building your own.

[Agents SDKStateful AI agents with state, scheduling, RPC, email, streaming chat — and the Code Mode SDK for token-efficient tool use.Learn more](https://developers.cloudflare.com/agents/)[Build an MCP serverShip a remote MCP server on Workers with OAuth, durable state, and streamable HTTP transport.Learn more](https://developers.cloudflare.com/agents/model-context-protocol/)[Workers AIRun open-source LLMs, embedding models, and image models at the edge. Use it as your agent's model provider.Learn more](https://developers.cloudflare.com/workers-ai/)[Worker LoaderLoad user-generated code into isolated Workers on demand. The secure sandbox behind Code Mode.Learn more](https://developers.cloudflare.com/workers/runtime-apis/bindings/worker-loader/)

## Other agents

[![](https://developers.cloudflare.com/icons/agents/claude/light.svg)![](https://developers.cloudflare.com/icons/agents/claude/dark.svg)AnthropicClaude CodeTerminal-based coding agent that understands your codebase, runs commands, edits files, and manages git. Made by Anthropic.View guide](https://developers.cloudflare.com/agent-setup/claude-code/)[![](https://developers.cloudflare.com/icons/agents/codex/light.svg)![](https://developers.cloudflare.com/icons/agents/codex/dark.svg)OpenAICodexOpenAI coding agent available as a terminal CLI and desktop app. It reads and writes files, runs commands, and browses the web in a sandbox.View guide](https://developers.cloudflare.com/agent-setup/codex/)[![](https://developers.cloudflare.com/icons/agents/cursor/light.svg)![](https://developers.cloudflare.com/icons/agents/cursor/dark.svg)CursorCursorAI-first IDE built on VS Code with multi-file Composer edits and background agents. Made by Cursor.View guide](https://developers.cloudflare.com/agent-setup/cursor/)[![](https://developers.cloudflare.com/icons/agents/copilot/light.svg)![](https://developers.cloudflare.com/icons/agents/copilot/dark.svg)GitHubGitHub CopilotEditor extension and CLI with agent mode, workspace context, and native PR integration. Made by GitHub.View guide](https://developers.cloudflare.com/agent-setup/github-copilot/)[![](https://developers.cloudflare.com/icons/agents/opencode/light.svg)![](https://developers.cloudflare.com/icons/agents/opencode/dark.svg)AnomalyOpenCodeOpen-source terminal agent with a rich TUI that works with 75+ LLMs. Made by Anomaly.View guide](https://developers.cloudflare.com/agent-setup/opencode/)[![](https://developers.cloudflare.com/icons/agents/windsurf/light.svg)![](https://developers.cloudflare.com/icons/agents/windsurf/dark.svg)CognitionWindsurfAgentic IDE with Cascade context and Flows for multi-step tasks. Made by Cognition.View guide](https://developers.cloudflare.com/agent-setup/windsurf/)[![](https://developers.cloudflare.com/icons/agents/bionic/light.svg)![](https://developers.cloudflare.com/icons/agents/bionic/dark.svg)LM StudioBionicPowerful agent for coding and work. Natively local, with open models in the cloud. By LM Studio.View guide](https://developers.cloudflare.com/agent-setup/bionic/)

Was this helpful?

YesNo

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/agent-setup/visual-studio-code/#page","headline":"Visual Studio Code + Cloudflare · Agent setup docs","description":"Free, open-source code editor with native Model Context Protocol (MCP) client support and Copilot Chat integration. Made by Microsoft.","url":"https://developers.cloudflare.com/agent-setup/visual-studio-code/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-07-27","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
