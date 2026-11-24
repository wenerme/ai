---
agent:
  instructions: "This site offers a search API that returns relevant content across the entire site. Use the search endpoint to find information instead of crawling individual pages."
  search: "https://developers.cloudflare.com/.well-known/search?q={query}"
description: Build a Think agent's system prompt from context blocks, give the model memory it can write and knowledge it can search, and keep the prompt cache warm.
title: Context
image: https://developers.cloudflare.com/agents/harnesses/think/context/og.png?v=5b19dd477d781ffc
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/agents/llms.txt
> Use this file to discover all available pages before exploring further.

# Context

Context is how a Think agent builds up what the model is told besides the conversation: who the agent is, what it has learned about the user, what it can look up. You declare labelled blocks, and Think renders them into the system prompt, saves what the model writes to them, and keeps the prompt the same from turn to turn, so the provider's prompt cache keeps working.

Experimental

Context is experimental, and only Think uses it. Its API may change between releases. This page describes `@cloudflare/think` v0.24.0.

Most agents need [skills](https://developers.cloudflare.com/agents/skills/) more than context. Use skills for instructions and references that only some tasks need: the model loads them on demand, and they follow an open format other agents read too. Use context for the few things the model should see on every turn, and for memory the agent writes itself.

## Declare blocks

Return blocks from `configureContext()`, in the order they appear in the prompt:

*src/server.jsjs*

```js
import { Think } from "@cloudflare/think";
import { AgentSearchProvider } from "agents/context";

export class MyAgent extends Think {
	configureContext() {
		return [
			{
				label: "soul",
				provider: { get: async () => "You are a concise coding assistant." },
			},
			{
				label: "memory",
				description: "Facts about the user worth keeping",
				maxTokens: 1_000,
			},
			{
				label: "knowledge",
				description: "Product documentation. Search before answering.",
				provider: new AgentSearchProvider(this),
			},
			{
				label: "environment",
				provider: {
					get: async () => `Today is ${new Date().toDateString()}.`,
				},
				whenChanged: "remind",
			},
		];
	}
}
```

*src/server.tsts*

```ts
import { Think } from "@cloudflare/think";
import { AgentSearchProvider, type ContextConfig } from "agents/context";

export class MyAgent extends Think<Env> {
	configureContext(): ContextConfig[] {
		return [
			{
				label: "soul",
				provider: { get: async () => "You are a concise coding assistant." },
			},
			{
				label: "memory",
				description: "Facts about the user worth keeping",
				maxTokens: 1_000,
			},
			{
				label: "knowledge",
				description: "Product documentation. Search before answering.",
				provider: new AgentSearchProvider(this),
			},
			{
				label: "environment",
				provider: {
					get: async () => `Today is ${new Date().toDateString()}.`,
				},
				whenChanged: "remind",
			},
		];
	}
}
```

Each block renders as its own section of the system prompt, below the instructions from your `getSystemPrompt()` override, with a header that names it and says what the model can do with it. Without an override, the blocks are the whole system prompt, and Think's default `getSystemPrompt()` text is used only when there are no blocks:

```txt
══════════════════════════════════════════════
MEMORY (Facts about the user worth keeping) [45% — 450/1000 tokens] [writable]
══════════════════════════════════════════════
User prefers dark mode.
User's project uses React and TypeScript.
```

## Providers

A block's provider is where its value lives. What the provider can do decides what the block is:

| Provider has | Block | The prompt shows | The model gets |
| --- | --- | --- | --- |
| `get()` | Read-only | The full text | Nothing to change it |
| `get()` and `set(content)` | Writable | The full text and its budget | `set_context` |
| `get()`, `search(query)`, and `set` | Searchable | A summary, such as a count | `search_context`, `set_context` |
| No provider | Writable | The full text and its budget | `set_context` |

A block with no provider is stored in the agent's SQLite database, so the `memory` block in the example is memory the agent keeps for itself with no extra code. `maxTokens` limits what the model can write to it. `AgentSearchProvider` searches with SQLite full-text search. A provider of your own can read from R2 or an API, or search [Vectorize](https://developers.cloudflare.com/vectorize/). Providers are checked by shape, so any object with the right methods works.

Think adds `set_context` and `search_context` to the turn's tools when a block needs them. Your code can change blocks through `this.context`:

```js
await this.context.appendToBlock("memory", `Timezone: ${timezone}`);
```

```ts
await this.context.appendToBlock("memory", `Timezone: ${timezone}`);
```

## What the model is sent

The system prompt is at the start of every request, so any change to it loses the provider's prompt cache. Think avoids that:

- On the first turn, Think renders every block and stores the result. Every later request starts with that same text, even after a block changes or the object restarts.
- When the model writes to a block, Think saves the new value at once but leaves the prompt as it was. The model already knows what it wrote, because the tool call is in the transcript.
- While a block declared `whenChanged: "remind"` differs from the stored prompt, Think adds its current value to the last user message of each request, after the history.
- A refresh renders every block again and stores the new prompt. Think refreshes after a compaction and when history is cleared, where the cache is lost anyway. To refresh at another moment, call `this.context.refreshSystemPrompt()`.

```txt
system:    frozen prompt (unchanged)
user:      What should I work on?
assistant: ...
user:      What day is it?
           + environment changed: "Today is Tuesday."
```

Think does not store a reminder. It adds it to the newest user message of every request until a refresh, so the previous user message changes from one request to the next, and the provider's cache ends there. Declare as reminders only the blocks the model needs to see change during a conversation, such as the date or the state of a workspace.

To configure compaction and the other settings that shape the conversation part of the request, refer to [Sessions](https://developers.cloudflare.com/agents/harnesses/think/sessions/).

## Skills and context

Think's [skills](https://developers.cloudflare.com/agents/skills/) use a context block. The skill catalog is a block declared `whenChanged: "remind"`, so a skill added mid-conversation reaches the model as a reminder, and the prompt is not rebuilt. What a skill loads comes back as a tool result in the session, not in context.

## Related

- [Skills](https://developers.cloudflare.com/agents/skills/): instructions and references the model loads on demand
- [Sessions](https://developers.cloudflare.com/agents/harnesses/think/sessions/): compaction, storage, and prompt caching for Think's conversation
- [Configuration](https://developers.cloudflare.com/agents/harnesses/think/configuration/): `configureContext()` with the other overrides

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/agents/harnesses/think/context/#page","headline":"Context","description":"Build a Think agent's system prompt from context blocks, give the model memory it can write and knowledge it can search, and keep the prompt cache warm.","url":"https://developers.cloudflare.com/agents/harnesses/think/context/","inLanguage":"en","image":"https://developers.cloudflare.com/agents/harnesses/think/context/og.png?v=5b19dd477d781ffc","dateModified":"2026-11-24","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
