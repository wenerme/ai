---
description: Understand agent harnesses — the loop that controls planning, tool use, and response flow.
title: Harnesses
image: https://developers.cloudflare.com/agents/harnesses/og.png?v=778bde13a1780844
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/agents/llms.txt
> Use this file to discover all available pages before exploring further.

# Harnesses

Last updated Oct 27, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/agents/harnesses/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

A harness is the loop that makes an agent behave like an agent instead of a single model call.

It is responsible for the turn-by-turn work around the model: building the prompt, loading memory, selecting tools, handling tool results, streaming responses, persisting messages, and deciding whether the agent should continue or stop.

To build a new agent, start with the [Pi harness](https://developers.cloudflare.com/agents/harnesses/pi/), which runs Pi Durable in a Durable Object. You can also run [OpenCode](https://developers.cloudflare.com/agents/harnesses/opencode/), or build the loop yourself on top of the [Agents SDK runtime](https://developers.cloudflare.com/agents/agent-class/).

## How harnesses fit

Harnesses sit on top of the Agents SDK runtime:

- **The runtime** gives the agent durable infrastructure: the [`Agent` class](https://developers.cloudflare.com/agents/agent-class/internals/), [state](https://developers.cloudflare.com/agents/agent-class/state/), [sessions](https://developers.cloudflare.com/agents/runtime/lifecycle/sessions/), [routing](https://developers.cloudflare.com/agents/agent-class/routing/), [WebSockets](https://developers.cloudflare.com/agents/agent-class/websockets/), [scheduling](https://developers.cloudflare.com/agents/agent-class/schedule-tasks/), [fibers](https://developers.cloudflare.com/agents/agent-class/durable-execution/), and [observability](https://developers.cloudflare.com/agents/runtime/operations/observability/).
- **The harness** gives the agent behavior: model calls, prompt construction, tool selection, stream handling, memory strategy, and lifecycle hooks.

The runtime answers “where does this agent live and how does it stay durable?” The harness answers “what does this agent do on each turn?”

## Choose an approach

Use Pi when you want [Pi Durable ↗︎](https://earendil.com/posts/pi-durable/) to own the agent loop, transcript, and recovery. This is the recommended starting point for a new agent. `PiHarness` runs Pi in a Durable Object and wakes it after eviction. You choose the transport.

Use a build-your-own harness when you need full control over the model call, message format, tool loop, or UI protocol. This is the right approach when you want to compose low-level APIs directly from the Agents SDK.

Use OpenCode (experimental) when you want OpenCode 2.0's sessions, tools, and plugin system. `OpenCodeHarness` runs [OpenCode's Workerd SDK ↗︎](https://opencode.ai/v2/docs/build/sdk/cloudflare/) inside a plain Durable Object.

## Current harnesses

### [Pi](https://developers.cloudflare.com/agents/harnesses/pi/)

Run Pi Durable sessions in a Durable Object, with storage in SQLite and recovery after eviction.

### [OpenCode (experimental)](https://developers.cloudflare.com/agents/harnesses/opencode/)

Run OpenCode 2.0 in a plain Durable Object, with Workers AI models, bundled plugins, and durable sessions.

## What a harness usually owns

A harness usually owns:

- **Prompt construction** — system prompts, memory, retrieved context, and per-turn instructions.
- **Model execution** — the call to Workers AI, OpenAI, Anthropic, Gemini, or another provider.
- **Tool orchestration** — server tools, client tools, MCP tools, approval flows, and continuation after tool results.
- **Message persistence** — how user, assistant, and tool messages are saved and replayed.
- **Streaming and recovery** — how responses stream to clients and resume after disconnects or Durable Object eviction.
- **Extension points** — hooks before and after turns, steps, tool calls, and recovery events.

## Related resources

### [Agents SDK runtime](https://developers.cloudflare.com/agents/agent-class/)

Build your own harness directly on the Agent class.

### [Sessions](https://developers.cloudflare.com/agents/runtime/lifecycle/sessions/)

Store conversation context and memory across turns.

### [Durable execution with fibers](https://developers.cloudflare.com/agents/agent-class/durable-execution/)

Recover long-running agent work after Durable Object eviction.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/agents/harnesses/#page","headline":"Harnesses","description":"Understand agent harnesses — the loop that controls planning, tool use, and response flow.","url":"https://developers.cloudflare.com/agents/harnesses/","inLanguage":"en","image":"https://developers.cloudflare.com/agents/harnesses/og.png?v=778bde13a1780844","dateModified":"2026-10-27","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
