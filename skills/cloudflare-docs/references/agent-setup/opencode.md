---
title: OpenCode + Cloudflare
description: Open-source terminal agent with a rich TUI that works with 75+ LLMs. Made by Anomaly.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

[Skip to content](#%5Ftop) 

[ All agents](https://developers.cloudflare.com/agent-setup/) 

![OpenCode icon](https://developers.cloudflare.com/icons/agents/opencode/light.svg) ![OpenCode icon](https://developers.cloudflare.com/icons/agents/opencode/dark.svg) 

#  OpenCode + Cloudflare

 Anomaly 

Open-source terminal agent with a rich TUI that works with 75+ LLM providers, including Cloudflare Workers AI. Made by Anomaly and used internally at Cloudflare for 

[CI-native AI code review](https://blog.cloudflare.com/ai-code-review/)

.

TerminalStandaloneExtensionOpen Source

[ Skills ↗](https://github.com/cloudflare/skills)[ MCP Server ↗](https://github.com/cloudflare/mcp)[ OpenCode Docs ↗](https://opencode.ai/docs) 

## Quick start

1. **Install OpenCode**  
Install OpenCode. For npm, Homebrew, Bun, Scoop, or Windows options, see the [OpenCode install guide ↗](https://opencode.ai/docs/).  
Terminal window  
```  
curl -fsSL https://opencode.ai/install | bash  
```
2. **Install Cloudflare Skills**  
Terminal window  
```  
npx skills add https://github.com/cloudflare/skills  
```
3. **Add Cloudflare MCP servers**  
Add MCP servers to `.opencode.jsonc`. For a full list of available Cloudflare MCP servers, refer to the repository on [GitHub ↗](https://github.com/cloudflare/mcp-server-cloudflare).  
```  
{  
  "mcp": {  
    "cloudflare": { "type": "remote", "url": "https://mcp.cloudflare.com/mcp", "enabled": true },  
    "cloudflare-docs": { "type": "remote", "url": "https://docs.mcp.cloudflare.com/mcp", "enabled": true }  
  }  
}  
```
4. **Launch OpenCode**  
Start OpenCode from the root of your project, where `wrangler.jsonc` lives (if it already exists).  
Terminal window  
```  
opencode  
```
5. **Try a prompt**  
For example:  
```  
Set up GitHub Actions to auto-deploy this Worker to Cloudflare.  
```

## Cloudflare platform access

Expand any section to learn more.

Cloudflare Skills 

Persistent platform context that teaches the agent how Cloudflare works.

Skills are instructions the agent loads on demand. The [cloudflare/skills](https://github.com/cloudflare/skills)bundle covers every layer of the platform — so the agent knows your conventions without you re-explaining them.

* agents-sdk Build AI agents on Cloudflare Workers using the Agents SDK. Load when creating stateful agents, durable workflows, real-time WebSocket apps, scheduled tasks, MCP servers, chat applications, voice agents, or browser automation. Covers Agent class, state management, callable RPC, Workflows, durable execution, queues, retries, observability, and React hooks. Biases towards retrieval from Cloudflare docs over pre-trained knowledge.
* cloudflare Comprehensive Cloudflare platform skill covering Workers, Pages, storage (KV, D1, R2), AI (Workers AI, Vectorize, Agents SDK), networking (Tunnel, Spectrum), security (WAF, DDoS), and infrastructure-as-code (Terraform, Pulumi). Use for any Cloudflare development task. Biases towards retrieval from Cloudflare docs over pre-trained knowledge.
* cloudflare-email-service Send and receive transactional emails with Cloudflare Email Service (Email Sending + Email Routing). Use when building email sending (Workers binding or REST API), email routing, Agents SDK email handling, or integrating email into any app — Workers, Node.js, Python, Go, etc. Also use for email deliverability, SPF/DKIM/DMARC, wrangler email setup, MCP email tools, or when a coding agent needs to send emails. Even for simple requests like "add email to my Worker" — this skill has critical config details.
* durable-objects Create and review Cloudflare Durable Objects. Use when building stateful coordination (chat rooms, multiplayer games, booking systems), implementing RPC methods, SQLite storage, alarms, WebSockets, or reviewing DO code for best practices. Covers Workers integration, wrangler config, and testing with Vitest. Biases towards retrieval from Cloudflare docs over pre-trained knowledge.
* sandbox-sdk Build sandboxed applications for secure code execution. Load when building AI code execution, code interpreters, CI/CD systems, interactive dev environments, or executing untrusted code. Covers Sandbox SDK lifecycle, commands, files, code interpreter, and preview URLs. Biases towards retrieval from Cloudflare docs over pre-trained knowledge.
* web-perf Analyzes web performance using Chrome DevTools MCP. Measures Core Web Vitals (LCP, INP, CLS) and supplementary metrics (FCP, TBT, Speed Index), identifies render-blocking resources, network dependency chains, layout shifts, caching issues, and accessibility gaps. Use when asked to audit, profile, debug, or optimize page load performance, Lighthouse scores, or site speed. Biases towards retrieval from current documentation over pre-trained knowledge.
* workers-best-practices Reviews and authors Cloudflare Workers code against production best practices. Load when writing new Workers, reviewing Worker code, configuring wrangler.jsonc, or checking for common Workers anti-patterns (streaming, floating promises, global state, secrets, bindings, observability). Biases towards retrieval from Cloudflare docs over pre-trained knowledge.
* wrangler Cloudflare Workers CLI for deploying, developing, and managing Workers, KV, R2, D1, Vectorize, Hyperdrive, Workers AI, Containers, Queues, Workflows, Pipelines, and Secrets Store. Load before running wrangler commands to ensure correct syntax and best practices. Biases towards retrieval from Cloudflare docs over pre-trained knowledge.

MCP servers 

Live access to the Cloudflare API, docs, and observability.

MCP servers provide typed tools to call into Cloudflare at runtime. There are two options: [Code Mode](https://developers.cloudflare.com/agents/api-reference/codemode/) — a single server that covers the entire Cloudflare API (2,500+ endpoints in \~1,000 tokens) — or a set of focused, domain-specific servers hosted in the [cloudflare/mcp-server-cloudflare](https://github.com/cloudflare/mcp-server-cloudflare)repo. The full catalog is also in the [MCP servers for Cloudflare](https://developers.cloudflare.com/agents/model-context-protocol/mcp-servers-for-cloudflare/)docs.

* Code mode API code mode Broad access to the full Cloudflare API via code execution, with minimal token overhead https://mcp.cloudflare.com/mcp
* AI Gateway server Search your logs, get details about the prompts and responses https://ai-gateway.mcp.cloudflare.com/mcp
* Audit Logs server Query audit logs and generate reports for review https://auditlogs.mcp.cloudflare.com/mcp
* Workers Bindings server Build Workers applications with storage, AI, and compute primitives https://bindings.mcp.cloudflare.com/mcp
* Browser rendering server Fetch web pages, convert them to markdown and take screenshots https://browser.mcp.cloudflare.com/mcp
* Workers Builds server Get insights and manage your Cloudflare Workers Builds https://builds.mcp.cloudflare.com/mcp
* Cloudflare One CASB server Quickly identify any security misconfigurations for SaaS applications to safeguard users & data https://casb.mcp.cloudflare.com/mcp
* Container server Spin up a sandbox development environment https://containers.mcp.cloudflare.com/mcp
* Digital Experience Monitoring server Get quick insight on critical applications for your organization https://dex.mcp.cloudflare.com/mcp
* DNS Analytics server Optimize DNS performance and debug issues based on current set up https://dns-analytics.mcp.cloudflare.com/mcp
* Documentation server Get up to date reference information on Cloudflare https://docs.mcp.cloudflare.com/mcp
* GraphQL server Get analytics data using Cloudflare’s GraphQL API https://graphql.mcp.cloudflare.com/mcp
* Logpush server Get quick summaries for Logpush job health https://logs.mcp.cloudflare.com/mcp
* Observability server Debug and get insight into your application's logs and analytics https://observability.mcp.cloudflare.com/mcp
* Radar server Get global Internet traffic insights, trends, URL scans, and other utilities https://radar.mcp.cloudflare.com/mcp

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

For a full overview of how these docs are structured for agents, refer to the [AI tooling guide](https://developers.cloudflare.com/style-guide/ai-tooling/).

## Example prompts

“Create a Cloudflare Workers application that serves as a backend API server.” “Add a D1 database to my Worker and create a users table with CRUD endpoints.” “Build an image upload service using R2 pre-signed URLs.” “Set up a KV namespace and use it for session storage in my Worker.” “Show me how to use Hyperdrive to connect my Worker to an existing Postgres database.” “Create an AI chat agent using the Cloudflare Agents SDK that maintains conversation history.” “Build a Workers AI chatbot with streaming responses.” “Build a WebSocket-based pub/sub app using Durable Objects with hibernation.” “Add a cron trigger to my Worker that runs every hour.” “Add rate limiting and bot protection to my API endpoints.” “Set up GitHub Actions to auto-deploy this Worker to Cloudflare.” “Create separate staging and production environments for my Worker.” “Generate Vitest tests for my Worker.” “Check my deployment logs for errors and suggest fixes.” “Deploy this project to Cloudflare Workers with a custom domain.” 

## Tips

* The Cloudflare API MCP server uses Code Mode — OpenCode writes JavaScript to reach any of 2,500+ endpoints in \~1,000 tokens.
* OpenCode supports 75+ LLMs — you can use Cloudflare Workers AI as the model provider for a fully Cloudflare-native workflow.
* Use OpenCode's plan agent (Tab key) to break down complex Workers projects before coding — pair it with `/cloudflare:build-agent` or `/cloudflare:build-mcp` slash commands.

## FAQ

Should I use Skills, the MCP server, Wrangler CLI, or all of them? 

All three. Skills provide persistent Cloudflare expertise so OpenCode knows when to reach for Durable Objects vs KV, how to structure a Workers project, and when to call CLI vs API. The Cloudflare API MCP server handles platform operations (DNS, WAF, Zero Trust, R2 buckets). Wrangler handles local dev, deploys, and Workers-specific commands. The bundled `wrangler` Skill teaches OpenCode which to use.

How do I connect OpenCode to Cloudflare? 

The first time OpenCode calls a Cloudflare tool, you will be redirected to authorize via OAuth and choose permissions.

Can I use Workers AI as the model provider in OpenCode? 

Yes. OpenCode supports 75+ model providers, including Cloudflare Workers AI. Configure your model in `.opencode.jsonc`.

Is OpenCode open source? 

Yes. OpenCode is fully open source and available at [github.com/anomalyco/opencode](https://github.com/anomalyco/opencode).

## Troubleshooting

MCP server connection fails 

Verify the MCP configuration in `.opencode.jsonc` uses `"type": "remote"`with the correct URL. Run `opencode mcp list` to check connected servers.

Getting outdated information about Cloudflare products 

Enable the [Cloudflare docs MCP server](https://github.com/cloudflare/mcp-server-cloudflare) so the agent can fetch current documentation at runtime. If you prefer not to use the MCP server, point the agent directly at [developers.cloudflare.com/llms.txt](https://developers.cloudflare.com/llms.txt) for a directory of every product, or `developers.cloudflare.com/<product>/llms.txt`for a product-specific index.

## Build agents on Cloudflare

Also worth knowing 

Cloudflare is not just a deploy target for agents, it is a full stack for building your own.

[ Agents SDK Stateful AI agents with state, scheduling, RPC, email, streaming chat — and the Code Mode SDK for token-efficient tool use. Learn more → ](https://developers.cloudflare.com/agents/) [ Build an MCP server Ship a remote MCP server on Workers with OAuth, durable state, and streamable HTTP transport. Learn more → ](https://developers.cloudflare.com/agents/model-context-protocol/) [ Workers AI Run open-source LLMs, embedding models, and image models at the edge. Use it as your agent's model provider. Learn more → ](https://developers.cloudflare.com/workers-ai/) [ Worker Loader Load user-generated code into isolated Workers on demand. The secure sandbox behind Code Mode. Learn more → ](https://developers.cloudflare.com/workers/runtime-apis/bindings/worker-loader/) 

## Other agents

[ ![Claude Code icon](https://developers.cloudflare.com/icons/agents/claude/light.svg) ![Claude Code icon](https://developers.cloudflare.com/icons/agents/claude/dark.svg) Claude Code Anthropic Terminal-based coding agent that understands your codebase, runs commands, edits files, and manages git. Made by Anthropic. ](https://developers.cloudflare.com/agent-setup/claude-code/)[ ![Codex icon](https://developers.cloudflare.com/icons/agents/codex/light.svg) ![Codex icon](https://developers.cloudflare.com/icons/agents/codex/dark.svg) Codex OpenAI Lightweight open-source terminal agent that reads and writes files, runs commands, and browses the web in a sandbox. Made by OpenAI. ](https://developers.cloudflare.com/agent-setup/codex/)[ ![Cursor icon](https://developers.cloudflare.com/icons/agents/cursor/light.svg) ![Cursor icon](https://developers.cloudflare.com/icons/agents/cursor/dark.svg) Cursor Cursor AI-first IDE built on VS Code with multi-file Composer edits and background agents. Made by Cursor. ](https://developers.cloudflare.com/agent-setup/cursor/)[ ![GitHub Copilot icon](https://developers.cloudflare.com/icons/agents/copilot/light.svg) ![GitHub Copilot icon](https://developers.cloudflare.com/icons/agents/copilot/dark.svg) GitHub Copilot GitHub Editor extension and CLI with agent mode, workspace context, and native PR integration. Made by GitHub. ](https://developers.cloudflare.com/agent-setup/github-copilot/)[ ![Windsurf icon](https://developers.cloudflare.com/icons/agents/windsurf/light.svg) ![Windsurf icon](https://developers.cloudflare.com/icons/agents/windsurf/dark.svg) Windsurf Cognition Agentic IDE with Cascade context and Flows for multi-step tasks. Made by Cognition. ](https://developers.cloudflare.com/agent-setup/windsurf/) 