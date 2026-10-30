---
description: Build and host AI agents on Cloudflare. Run an agent harness in a Durable Object, add capabilities such as state, WebSockets, and scheduling with the Agents SDK Lifecycle, and give the agent tools.
title: Build Agents on Cloudflare
image: https://developers.cloudflare.com/agents/og.png?v=5f3790c1b824e669
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/agents/llms.txt
> Use this file to discover all available pages before exploring further.

# Build Agents on Cloudflare

Last updated Oct 29, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/agents/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Build and host AI agents on Cloudflare. Connect chat, voice, email, Slack, and webhooks to a durable agent, and give it tools such as a workspace, a browser, web search, MCP servers, and payments.

When you host agents on Cloudflare, each agent has a durable identity, local SQL storage, real-time connections, scheduled work, and recoverable execution.

Deploy once and Cloudflare runs your agents across its global network, scaling to tens of millions of instances. No infrastructure to manage, no sessions to reconstruct, no state to externalize.

[Chat](https://developers.cloudflare.com/agents/agent-class/communication-channels/chat/) [Email](https://developers.cloudflare.com/agents/agent-class/communication-channels/email/) [Voice](https://developers.cloudflare.com/agents/agent-class/communication-channels/voice/) [Slack](https://developers.cloudflare.com/agents/agent-class/communication-channels/slack/) [Webhook](https://developers.cloudflare.com/agents/agent-class/communication-channels/webhooks/)

Runtime

The Lifecycle provides hooks for Capabilities to schedule durable work.

[Lifecycle](https://developers.cloudflare.com/agents/runtime/lifecycle/)

[State](https://developers.cloudflare.com/agents/runtime/capabilities/state/) [WebSockets](https://developers.cloudflare.com/agents/runtime/capabilities/websockets/) [Scheduler](https://developers.cloudflare.com/agents/runtime/capabilities/scheduler/) [MCP client](https://developers.cloudflare.com/agents/runtime/capabilities/mcp-client-manager/)

Harnesses

[Pi](https://developers.cloudflare.com/agents/harnesses/pi/) [OpenCode](https://developers.cloudflare.com/agents/harnesses/opencode/) [Think](https://developers.cloudflare.com/agents/harnesses/think/)

[Workspace](https://developers.cloudflare.com/agents/tools/filesystem/) [Sandbox](https://developers.cloudflare.com/agents/tools/sandbox/) [Browser](https://developers.cloudflare.com/agents/tools/browser/) [Web fetch](https://developers.cloudflare.com/agents/tools/web-fetch/) [Web search](https://developers.cloudflare.com/agents/tools/web-search/) [MCP servers](https://developers.cloudflare.com/agents/tools/mcp/) [AI Search](https://developers.cloudflare.com/agents/tools/ai-search/) [Payments](https://developers.cloudflare.com/agents/tools/payments/)

[ObservabilityLogs · metrics · traces](https://developers.cloudflare.com/agents/runtime/observability/)

Agents on Cloudflare are composed from four parts:

- **The runtime is a Durable Object, the Lifecycle, and capabilities.** Each agent is a [Durable Object](https://developers.cloudflare.com/durable-objects/), and [routing](https://developers.cloudflare.com/agents/runtime/routing/) sends each request to the right one. The Agents SDK [Lifecycle](https://developers.cloudflare.com/agents/runtime/lifecycle/) runs inside the Durable Object, handles its requests, alarms, and WebSocket events, and starts the [capabilities](https://developers.cloudflare.com/agents/runtime/capabilities/) you add to it with `.use()`. Capabilities include [`WebSockets`](https://developers.cloudflare.com/agents/runtime/capabilities/websockets/), [`State`](https://developers.cloudflare.com/agents/runtime/capabilities/state/), [`Scheduler`](https://developers.cloudflare.com/agents/runtime/capabilities/scheduler/), and [`MCPClientManager`](https://developers.cloudflare.com/agents/runtime/capabilities/mcp-client-manager/).
- **The harness is the capability that runs the agent loop.** A harness calls models, runs tools, handles tool results, streams responses, and decides whether to continue. It is the unit of compute for an agent, and the Agents SDK exists to make harnesses run well on Cloudflare. Use the [Pi harness](https://developers.cloudflare.com/agents/harnesses/pi/), which runs the [Pi ↗︎](https://pi.dev/) agent loop durably and keeps a run going after the object is evicted.
- **Tools** let the agent act. For a durable file system and code execution, give the agent a [workspace](https://developers.cloudflare.com/agents/tools/filesystem/) from Cloudflare Computer. The Agents SDK also includes [web fetch](https://developers.cloudflare.com/agents/tools/web-fetch/), [web search](https://developers.cloudflare.com/agents/tools/web-search/), [browser automation](https://developers.cloudflare.com/agents/tools/browser/), [sandboxed code execution](https://developers.cloudflare.com/agents/tools/sandbox/), [AI Search](https://developers.cloudflare.com/agents/tools/ai-search/), [MCP servers](https://developers.cloudflare.com/agents/tools/mcp/), [payments](https://developers.cloudflare.com/agents/tools/payments/), and [Code Mode](https://developers.cloudflare.com/agents/tools/codemode/).
- **Communication channels** define how users and systems reach your agent, such as [chat](https://developers.cloudflare.com/agents/agent-class/communication-channels/chat/), [voice](https://developers.cloudflare.com/agents/agent-class/communication-channels/voice/), [email](https://developers.cloudflare.com/agents/agent-class/communication-channels/email/), [Slack](https://developers.cloudflare.com/agents/agent-class/communication-channels/slack/), [webhooks](https://developers.cloudflare.com/agents/agent-class/communication-channels/webhooks/), and other event sources. These guides use the [`Agent` class](https://developers.cloudflare.com/agents/agent-class/), a preset Durable Object with the Lifecycle and a set of capabilities already installed.

Agents publish structured events, such as state changes, schedules, and MCP connections, that you can use for [observability](https://developers.cloudflare.com/agents/runtime/observability/).

### Get started

Build your first agent with the Pi harness. The [Pi harness](https://developers.cloudflare.com/agents/harnesses/pi/) runs the [Pi ↗︎](https://pi.dev/) agent loop durably in a Durable Object. It uses the Lifecycle's job queue to schedule future work, so a run continues after the object is evicted. No API keys are required. The examples use [Workers AI](https://developers.cloudflare.com/workers-ai/) through the `AI` binding.

npmyarnpnpmbun

```
npm i agents @earendil-works/pi-durable @earendil-works/pi-ai @earendil-works/chord
```

```
yarn add agents @earendil-works/pi-durable @earendil-works/pi-ai @earendil-works/chord
```

```
pnpm add agents @earendil-works/pi-durable @earendil-works/pi-ai @earendil-works/chord
```

```
bun add agents @earendil-works/pi-durable @earendil-works/pi-ai @earendil-works/chord
```

The Pi packages are optional peer dependencies of `agents`, at `~1.4.0`. Pi Durable is experimental and its API can change in minor releases, so each `agents` release supports one Pi minor version. Install the versions your package manager resolves for `agents`.

To start from a complete app with a browser UI, a Cloudflare Computer workspace, and code execution, deploy the Pi harness example:

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/cloudflare/agents/tree/main/examples/next/harnesses/pi)

To build it step by step, follow [Build your first Durable Agent](https://developers.cloudflare.com/agents/getting-started/quick-start/). To learn the Lifecycle, [`State`](https://developers.cloudflare.com/agents/runtime/capabilities/state/), and [`WebSockets`](https://developers.cloudflare.com/agents/runtime/capabilities/websockets/) without a model, refer to [Learn the runtime](https://developers.cloudflare.com/agents/getting-started/learn-the-runtime/). To add the Lifecycle to a Worker you already have, refer to [Add to an existing project](https://developers.cloudflare.com/agents/getting-started/add-to-existing-project/).

### Example agents

The Pi agent runs on the Pi harness. The other examples build on the [`Agent` class](https://developers.cloudflare.com/agents/agent-class/) preset.

[Pi agent](https://developers.cloudflare.com/agents/harnesses/pi/)

Build an agent on the Pi harness, with tools, sessions, and recovery after eviction.

[Chat agent](https://developers.cloudflare.com/agents/examples/chat-agent/)

Build a streaming AI chat agent with tools and human-in-the-loop approvals.

[Slack agent](https://developers.cloudflare.com/agents/examples/slack-agent/)

Build an agent that responds to Slack messages, mentions, and commands.

[Voice agent](https://developers.cloudflare.com/agents/examples/voice-agent/)

Build a real-time voice agent with speech-to-text and text-to-speech.

[Browser agent](https://developers.cloudflare.com/agents/examples/browser-agent/)

Build an agent that can inspect pages, capture screenshots, and use browser tools.

[Email agent](https://developers.cloudflare.com/agents/examples/email-agent/)

Build an agent that sends, receives, routes, and replies to email.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/agents/#page","headline":"Build Agents on Cloudflare","description":"Build and host AI agents on Cloudflare. Run an agent harness in a Durable Object, add capabilities such as state, WebSockets, and scheduling with the Agents SDK Lifecycle, and give the agent tools.","url":"https://developers.cloudflare.com/agents/","inLanguage":"en","image":"https://developers.cloudflare.com/agents/og.png?v=5f3790c1b824e669","dateModified":"2026-10-29","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["AI"]}
```
