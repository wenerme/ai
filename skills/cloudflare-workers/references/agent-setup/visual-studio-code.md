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
Connect my Worker to an existing Postgres database using Hyperdrive for connection pooling.
```

For a screenshot-by-screenshot walkthrough — including the OAuth authorization page, verifying the server is running, and using natural language to create and delete DNS records — refer to the [detailed walkthrough](https://developers.cloudflare.com/agent-setup/visual-studio-code/detailed-walkthrough/).

## Cloudflare platform access

Expand any section to learn more.

Cloudflare Skills

Persistent platform context that teaches the agent how Cloudflare works.

Skills are instructions the agent loads on demand. The [cloudflare/skills](https://github.com/cloudflare/skills) bundle covers every layer of the platform — so the agent knows your conventions without you re-explaining them.

* agents-sdkBuild AI agents on Cloudflare Workers using the Agents SDK. Load when creating stateful agents, durable workflows, real-time WebSocket apps, scheduled tasks, MCP servers, chat applications, voice agents, or browser automation. Covers Agent class, state management, callable RPC, Workflows, durable execution, queues, retries, observability, and React hooks. Biases towards retrieval from Cloudflare docs over pre-trained knowledge.
* cloudflareComprehensive Cloudflare platform skill covering Workers, Pages, storage (KV, D1, R2), AI (Workers AI, Vectorize, Agents SDK), feature flags (Flagship), networking (Tunnel, Spectrum), security (WAF, DDoS), and infrastructure-as-code (Terraform, Pulumi). Use for any Cloudflare development task. Biases towards retrieval from Cloudflare docs over pre-trained knowledge.
* cloudflare-email-serviceSend and receive transactional emails with Cloudflare Email Service (Email Sending + Email Routing). Use when building email sending (Workers binding or REST API), email routing, Agents SDK email handling, or integrating email into any app — Workers, Node.js, Python, Go, etc. Also use for email deliverability, SPF/DKIM/DMARC, wrangler email setup, MCP email tools, or when a coding agent needs to send emails. Even for simple requests like "add email to my Worker" — this skill has critical config details.
* cloudflare-one"Guides Cloudflare One Zero Trust and SASE work across Access, Gateway, WARP, Tunnel, Cloudflare WAN, DLP, CASB, device posture, and identity. Use when designing, configuring, troubleshooting, or reviewing Cloudflare One deployments. Retrieval-first: use current Cloudflare docs/API schemas instead of embedded product docs."
* cloudflare-one-migrationsPlans migrations from Zscaler ZIA/ZPA, Palo Alto, legacy VPN, SWG, or SASE stacks to Cloudflare One. Use for migration assessments, policy mapping, rollout plans, and parity/gap analysis.
* durable-objectsCreate and review Cloudflare Durable Objects. Use when building stateful coordination (chat rooms, multiplayer games, booking systems), implementing RPC methods, SQLite storage, alarms, WebSockets, or reviewing DO code for best practices. Covers Workers integration, wrangler config, and testing with Vitest. Biases towards retrieval from Cloudflare docs over pre-trained knowledge.
* sandbox-migrate-to-nextUse when porting a Cloudflare Sandbox app from stable @cloudflare/sandbox to @cloudflare/sandbox@next (Sandbox SDK 1.0 preview), or when the user asks to migrate or upgrade to Sandbox 1.0 / @next. Not for day-to-day stable work (sandbox-stable) or new @next apps (sandbox-next).
* sandbox-nextUse when building or changing Cloudflare Sandbox apps on @cloudflare/sandbox@next (Sandbox SDK 1.0 preview)—code execution, AI runners, interpreters, CI-like jobs, terminals, files, mounts, tunnels, preview URLs, lifecycle, or errors. Not for the default stable package (use sandbox-stable) or for porting stable to @next (use sandbox-migrate-to-next).
* sandbox-stableUse when building or changing Cloudflare Sandbox apps on the current stable @cloudflare/sandbox package (default npm tag)—commands, sessions, files, ports, tunnels, terminals, bridge, production, or deprecated-API cleanup while staying on stable. Not for @cloudflare/sandbox@next (use sandbox-next) or for porting to 1.0 (use sandbox-migrate-to-next).
* turnstile-spinSet up Cloudflare Turnstile end-to-end in a project. Scan the codebase, create the widget via the Cloudflare API, embed it where user requests need bot verification (form submissions, SPA actions, API endpoints, download links, comment or vote submissions, etc.), wire canonical server-side siteverify in the customer's existing backend, validate, and persist the skill. Load this when a user asks to add Turnstile, set up CAPTCHA, protect a form or endpoint from bots, or fix a Turnstile integration. Mirrors developers.cloudflare.com/turnstile/spin.
* web-perfAnalyzes web performance using Chrome DevTools MCP. Measures Core Web Vitals (LCP, INP, CLS) and supplementary metrics (FCP, TBT, Speed Index), identifies render-blocking resources, network dependency chains, layout shifts, caching issues, and accessibility gaps. Use when asked to audit, profile, debug, or optimize page load performance, Lighthouse scores, or site speed. Biases towards retrieval from current documentation over pre-trained knowledge.
* workers-best-practicesReviews and authors Cloudflare Workers code against production best practices. Load when writing new Workers, reviewing Worker code, configuring wrangler.jsonc, or checking for common Workers anti-patterns (streaming, floating promises, global state, secrets, bindings, observability). Biases towards retrieval from Cloudflare docs over pre-trained knowledge.
* wranglerCloudflare Workers CLI for deploying, developing, and managing Workers, KV, R2, D1, Vectorize, Hyperdrive, Workers AI, Containers, Queues, Workflows, Pipelines, and Secrets Store. Load before running wrangler commands to ensure correct syntax and best practices. Biases towards retrieval from Cloudflare docs over pre-trained knowledge.

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
Set up AI Gateway to route requests across OpenAI and Workers AI with automatic fallback and cost tracking.
```

```txt
Build an AI chat agent using the Cloudflare Agents SDK with persistent conversation history stored in D1.
```

```txt
Build a multi-tenant SaaS backend where each customer gets an isolated D1 database.
```

```txt
Set up GitHub Actions to deploy this Worker to staging and production on Cloudflare.
```

```txt
Use Workers for Platforms to let my customers deploy their own code in isolated environments.
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
