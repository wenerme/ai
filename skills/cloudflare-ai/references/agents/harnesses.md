---
description: Compare agent harnesses on Cloudflare by execution environment, recovery behavior, and persistent workspace integration.
title: Harnesses
image: https://developers.cloudflare.com/agents/harnesses/og.png?v=778bde13a1780844
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/agents/llms.txt
> Use this file to discover all available pages before exploring further.

# Harnesses

Last updated Nov 10, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/agents/harnesses/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

A harness is the loop that makes an agent behave like an agent instead of a single model call.

For what a harness does and how to choose one, refer to [Harness](https://developers.cloudflare.com/agents/concepts/harness/) in Concepts.

It is responsible for the turn-by-turn work around the model: building the prompt, loading memory, selecting tools, handling tool results, streaming responses, persisting messages, and deciding whether the agent should continue or stop.

Most people building new agents should start with the [Pi harness](https://developers.cloudflare.com/agents/harnesses/pi/). To explore other approaches, compare where each harness runs, how it recovers, and how it accesses files.

## How harnesses fit with the Agents SDK

Harnesses sit on top of the Agents SDK runtime:

- **The runtime** coordinates [startup and durable jobs](https://developers.cloudflare.com/agents/runtime/lifecycle/), [routing](https://developers.cloudflare.com/agents/runtime/routing/), and the [capabilities](https://developers.cloudflare.com/agents/runtime/capabilities/) you install. These can add WebSocket connections, shared state, scheduling, and MCP connections. Use [observability](https://developers.cloudflare.com/agents/runtime/observability/) to trace model calls and inspect runtime events.
- **The harness** gives the agent behavior: model calls, prompt construction, tool selection, stream handling, memory strategy, and lifecycle hooks.

The runtime answers “where does this agent live and how does it stay durable?” The harness answers “what does this agent do on each turn?”

Conversation storage depends on the harness. Pi and OpenCode manage their own transcripts. Claude Code and Codex keep their records in a SQLite-backed `HarnessStore`. Think and `AIChatAgent` install the SDK's `Sessions` capability. To find the APIs relevant to your agent, refer to [Choose capabilities](https://developers.cloudflare.com/agents/runtime/capabilities/#choose-capabilities).

## Compare harnesses

**Durability** means the harness saves agent progress and can resume work after a crash, restart, or deployment. For SDK integrations, [Lifecycle](https://developers.cloudflare.com/agents/runtime/lifecycle/) coordinates startup and recovery jobs.

[Cloudflare Computer](https://developers.cloudflare.com/agents/tools/filesystem/) provides persistent files and file tools for agents. Agents can return to files they created or edited across turns, even after a restart.

| Harness | Runs in | Durability | Cloudflare Computer |
| --- | --- | --- | --- |
| [Pi](https://developers.cloudflare.com/agents/harnesses/pi/) | Durable Objects via the Agents SDK | 🟢 Automatically resumes interrupted work | 🟢 Supported |
| [Flue ↗︎](https://flueframework.com/) | Durable Objects via the Agents SDK | 🟢 Automatically resumes interrupted work | 🟢 Supported |
| [OpenCode](https://developers.cloudflare.com/agents/harnesses/opencode/) | Durable Objects via the Agents SDK | 🟡 Resumes interrupted work | 🟡 Example plugin |
| [Claude Code](https://developers.cloudflare.com/agents/harnesses/claude-code/) (Experimental) | Linux container driven by a Durable Object via the Agents SDK | 🟡 Reattaches after object restart; container loss fails or retries the turn | 🔴 No built-in integration |
| [Codex](https://developers.cloudflare.com/agents/harnesses/codex/) (Experimental) | Linux container driven by a Durable Object via the Agents SDK | 🟡 Reattaches after object restart; container loss fails or retries the turn | 🔴 No built-in integration |
| [Think](https://developers.cloudflare.com/agents/harnesses/think/) (Experimental) | Durable Objects via the Agents SDK | 🟡 Continues from saved output | 🟢 Supported |
| [Nanocode](https://developers.cloudflare.com/agents/harnesses/nanocode/) (Pre-1.0) | Wasm in its own Durable Object host | 🟡 Resumes turns; some tools cannot recover | 🟡 Custom adapter needed |
| [Exo](https://developers.cloudflare.com/agents/harnesses/exo/) (Pre-1.0) | Wasm in Durable Objects + Linux sandbox | 🟡 Resumes turns; interrupted tools may fail | 🔴 No integration |
| [Self-modifying](https://developers.cloudflare.com/agents/harnesses/self-modifying/) (Experimental) | Durable Objects via the Agents SDK + Dynamic Workers | 🟡 Resumes turns; custom tools may rerun | 🟡 Workspace in example |
| [Coding agent CLIs without a harness](https://developers.cloudflare.com/sandbox/coding-agents/) | Linux sandbox | 🔴 No automatic recovery in these examples | 🔴 No integration |

## Choose an approach

Use [Pi](https://developers.cloudflare.com/agents/harnesses/pi/) when you want Pi Durable to own the loop, transcript, and recovery. Use [OpenCode](https://developers.cloudflare.com/agents/harnesses/opencode/) for OpenCode's sessions, tools, and plugins, or [Think](https://developers.cloudflare.com/agents/harnesses/think/) for an AI SDK chat agent with built-in Workspace tools.

Use [Flue ↗︎](https://flueframework.com/) for a TypeScript hooks API built on Pi, with automatic recovery and a [Cloudflare target ↗︎](https://flueframework.com/docs/guide/cloudflare-target/) that uses the Agents SDK.

Use [Claude Code](https://developers.cloudflare.com/agents/harnesses/claude-code/) or [Codex](https://developers.cloudflare.com/agents/harnesses/codex/) to run those CLIs with their native tools, plugins, and settings in a Linux container. A Durable Object stores sessions and coordinates recovery. Container loss fails the interrupted turn by default. Optional retry reruns it. Workspace recovery uses filesystem snapshots, so edits since the last snapshot can be lost.

[Build your own harness](https://developers.cloudflare.com/agents/harnesses/build-your-own/) when you need control over model calls, message formats, or tool execution. Compose it from the [Agents SDK runtime](https://developers.cloudflare.com/agents/runtime/) capabilities.

Explore the experimental [self-modifying](https://developers.cloudflare.com/agents/harnesses/self-modifying/) example for an agent that edits its own TypeScript harness.

[Nanocode](https://developers.cloudflare.com/agents/harnesses/nanocode/) and [Exo](https://developers.cloudflare.com/agents/harnesses/exo/) provide their own runtimes for running agents on Cloudflare.

## What a harness usually owns

A harness usually owns:

- **Prompt construction** — system prompts, memory, retrieved context, and per-turn instructions.
- **Model execution** — the call to Workers AI, OpenAI, Anthropic, Gemini, or another provider.
- **Tool orchestration** — server tools, client tools, MCP tools, approval flows, and continuation after tool results.
- **Message persistence** — how user, assistant, and tool messages are saved and replayed.
- **Streaming and recovery** — how responses stream to clients and resume after disconnects or Durable Object eviction.
- **Extension points** — hooks before and after turns, steps, tool calls, and recovery events.

## Related resources

### [Agents SDK runtime](https://developers.cloudflare.com/agents/runtime/)

Compose a harness on a Durable Object with Lifecycle and optional capabilities.

### [Sessions](https://developers.cloudflare.com/agents/runtime/capabilities/sessions/)

Store conversation context and memory across turns.

### [Durable execution with fibers](https://developers.cloudflare.com/agents/agent-class/durable-execution/)

Recover long-running agent work after Durable Object eviction.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/agents/harnesses/#page","headline":"Harnesses","description":"Compare agent harnesses on Cloudflare by execution environment, recovery behavior, and persistent workspace integration.","url":"https://developers.cloudflare.com/agents/harnesses/","inLanguage":"en","image":"https://developers.cloudflare.com/agents/harnesses/og.png?v=778bde13a1780844","dateModified":"2026-11-10","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
