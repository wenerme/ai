---
description: Build and host AI agents on Cloudflare. Start with the Pi harness, which runs a durable model loop with tools in a Durable Object, and add state, real-time connections, and scheduled tasks with the Agents SDK.
title: Build Agents on Cloudflare
image: https://developers.cloudflare.com/agents/og.png?v=5f3790c1b824e669
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/agents/llms.txt
> Use this file to discover all available pages before exploring further.

# Build Agents on Cloudflare

Last updated Oct 27, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/agents/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Build and host Agents on Cloudflare, connect chat, voice, email, Slack, and webhooks to a durable agent runtime with Browser, Sandbox, AI Search, MCP, Payments, and other MCP tools.

When you host agents on Cloudflare, each agent session has a durable identity, local SQL storage, real-time connections, scheduled work, and recoverable execution.

Deploy once and Cloudflare runs your agents across its global network, scaling to tens of millions of instances. No infrastructure to manage, no sessions to reconstruct, no state to externalize.

[Chat](https://developers.cloudflare.com/agents/agent-class/communication-channels/chat/) [Email](https://developers.cloudflare.com/agents/agent-class/communication-channels/email/) [Voice](https://developers.cloudflare.com/agents/agent-class/communication-channels/voice/) [Slack](https://developers.cloudflare.com/agents/agent-class/communication-channels/slack/) [Webhook](https://developers.cloudflare.com/agents/agent-class/communication-channels/webhooks/)

Agent harness

Controls planning, tool use, and response flow.

[Pi harness](https://developers.cloudflare.com/agents/harnesses/pi/) [Build-your-own agent](https://developers.cloudflare.com/agents/agent-class/)

Agents SDK runtime

Durable identity, state, connections, scheduling, and recovery.

[Agent class](https://developers.cloudflare.com/agents/agent-class/)

[State](https://developers.cloudflare.com/agents/agent-class/state/) [Sessions](https://developers.cloudflare.com/agents/runtime/lifecycle/sessions/) [Routing](https://developers.cloudflare.com/agents/agent-class/routing/) [WebSockets](https://developers.cloudflare.com/agents/agent-class/websockets/) [Scheduling](https://developers.cloudflare.com/agents/agent-class/schedule-tasks/) [Fibers](https://developers.cloudflare.com/agents/agent-class/durable-execution/)

[Sandbox](https://developers.cloudflare.com/agents/tools/sandbox/) [MCP](https://developers.cloudflare.com/agents/tools/mcp/) [Browser](https://developers.cloudflare.com/agents/tools/browser/) [AI Search](https://developers.cloudflare.com/agents/tools/ai-search/) [Payments](https://developers.cloudflare.com/agents/tools/payments/)

[ObservabilityLogs · metrics · traces](https://developers.cloudflare.com/agents/runtime/operations/observability/)

Agents on Cloudflare are composed from four parts:

- **Communication channels** define how users and systems reach your agent, such as [chat](https://developers.cloudflare.com/agents/agent-class/communication-channels/chat/), [voice](https://developers.cloudflare.com/agents/agent-class/communication-channels/voice/), [email](https://developers.cloudflare.com/agents/agent-class/communication-channels/email/), [Slack](https://developers.cloudflare.com/agents/agent-class/communication-channels/slack/), [webhooks](https://developers.cloudflare.com/agents/agent-class/communication-channels/webhooks/), and other event sources.
- **The agent harness** defines the loop: how the agent calls models, selects tools, handles tool results, streams responses, and decides whether to continue. Use the [Pi harness](https://developers.cloudflare.com/agents/harnesses/pi/) to run Pi Durable in a Durable Object, or build your own loop directly on the [Agents SDK runtime](https://developers.cloudflare.com/agents/agent-class/).
- **The Agents SDK runtime** provides durable infrastructure: the [`Agent` class](https://developers.cloudflare.com/agents/agent-class/internals/), [state](https://developers.cloudflare.com/agents/agent-class/state/), [sessions](https://developers.cloudflare.com/agents/runtime/lifecycle/sessions/), [routing](https://developers.cloudflare.com/agents/agent-class/routing/), [WebSockets](https://developers.cloudflare.com/agents/agent-class/websockets/), [scheduling](https://developers.cloudflare.com/agents/agent-class/schedule-tasks/), [fibers](https://developers.cloudflare.com/agents/agent-class/durable-execution/), and [observability](https://developers.cloudflare.com/agents/runtime/operations/observability/).
- **Tools** give the agent capabilities: [browser automation](https://developers.cloudflare.com/agents/tools/browser/), [sandboxed code execution](https://developers.cloudflare.com/agents/tools/sandbox/), [AI Search](https://developers.cloudflare.com/agents/tools/ai-search/), [MCP tools](https://developers.cloudflare.com/agents/tools/mcp/), and [payments](https://developers.cloudflare.com/agents/tools/payments/). [Code Mode](https://developers.cloudflare.com/agents/tools/codemode/) lets models discover and orchestrate multiple tools by writing code.

### Get started

Build your agent with the [Pi harness](https://developers.cloudflare.com/agents/harnesses/pi/). [Pi Durable ↗︎](https://earendil.com/posts/pi-durable/) runs the agent loop, including the transcript, model calls, tools, and retries, inside a Durable Object. `PiHarness` from the Agents SDK stores Pi's state in the object's SQLite database and resumes the run after an eviction. No API keys are required. The examples use [Workers AI](https://developers.cloudflare.com/workers-ai/) through the `AI` binding.

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

The [Pi harness guide](https://developers.cloudflare.com/agents/harnesses/pi/) builds a first agent in one file. To start from a complete app with a browser UI, a durable filesystem, and code execution, deploy the Pi harness example:

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/cloudflare/agents/tree/main/examples/next/harnesses/pi)

### Example agents

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
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/agents/#page","headline":"Build Agents on Cloudflare","description":"Build and host AI agents on Cloudflare. Start with the Pi harness, which runs a durable model loop with tools in a Durable Object, and add state, real-time connections, and scheduled tasks with the Agents SDK.","url":"https://developers.cloudflare.com/agents/","inLanguage":"en","image":"https://developers.cloudflare.com/agents/og.png?v=5f3790c1b824e669","dateModified":"2026-10-27","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["AI"]}
```
