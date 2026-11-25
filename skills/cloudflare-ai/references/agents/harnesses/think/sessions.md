---
agent:
  instructions: "Use this search API to find relevant content across this site with keywords or natural-language queries, instead of crawling individual pages. Results are returned in Markdown."
  endpoint: "https://developers.cloudflare.com/.well-known/search?q={query}"
  method: "GET"
  documentation: "https://developers.cloudflare.com/ai-search/how-to/search-for-agents/"
description: How a Think agent stores its conversation, compacts it, evicts aged media, and keeps the provider's prompt cache warm.
title: Sessions
image: https://developers.cloudflare.com/agents/harnesses/think/sessions/og.png?v=5d6c7b41bcca63b6
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/agents/llms.txt
> Use this file to discover all available pages before exploring further.

# Sessions

Think stores each conversation in a session, in the agent's SQLite database, through the [`Sessions`](https://developers.cloudflare.com/agents/runtime/capabilities/sessions/) capability. Messages form a tree, so a regenerated answer is kept as a branch. This page covers the settings Think gives you over the session: compaction, storage, media eviction, and prompt caching. For the system prompt, refer to [Context](https://developers.cloudflare.com/agents/harnesses/think/context/).

## Compact long conversations

Compaction replaces a span of older messages with a summary, so a long conversation stays inside the model's context window. Think keeps the original messages, and applies the summary when it reads the conversation. Override `configureSession()` to set a compaction function and a threshold:

```js
import { Think, Session } from "@cloudflare/think";
import { createAI } from "agents/models/ai-sdk";
import { createCompactFunction } from "agents/sessions";
import { generateText } from "ai";

export class MyAgent extends Think {
	getModel() {
		return createAI({ binding: this.env.AI })(
			"@cf/deepseek-ai/deepseek-v4.1-flash-1017",
		);
	}

	configureSession(session) {
		return session
			.onCompaction(
				createCompactFunction({
					summarize: async (prompt) => {
						const { text } = await generateText({
							model: this.getModel(),
							prompt,
						});
						return text;
					},
					keepRecentTokens: 20_000,
				}),
			)
			.compactAfter(100_000);
	}
}
```

```ts
import { Think, Session } from "@cloudflare/think";
import { createAI } from "agents/models/ai-sdk";
import { createCompactFunction } from "agents/sessions";
import { generateText } from "ai";

export class MyAgent extends Think<Env> {
	getModel() {
		return createAI({ binding: this.env.AI })(
			"@cf/deepseek-ai/deepseek-v4.1-flash-1017",
		);
	}

	configureSession(session: Session) {
		return session
			.onCompaction(
				createCompactFunction({
					summarize: async (prompt) => {
						const { text } = await generateText({
							model: this.getModel(),
							prompt,
						});
						return text;
					},
					keepRecentTokens: 20_000,
				}),
			)
			.compactAfter(100_000);
	}
}
```

`compactAfter()` checks the size after each message is added. Set it well above the size of a summary plus the recent messages it keeps, or a compacted conversation that is still over the threshold compacts again on every message. `createCompactFunction()` comes from `agents/sessions`, which is experimental.

Compaction runs between turns. A single long, tool-heavy turn can still overflow the context window. To recover from that mid-turn, refer to [Context-window overflow recovery](https://developers.cloudflare.com/agents/harnesses/think/recovery/#context-window-overflow-recovery).

Annotate a `configureSession()` override with the `Session` type from `@cloudflare/think`.

## Message storage

Think splits a message larger than one SQLite row across several rows and reads it back whole, so it never cuts a stored message short. Your limit is the Durable Object's storage: check the size of what clients send, and keep files in the [workspace](https://developers.cloudflare.com/agents/harnesses/think/tools/#connect-a-workspace) with a reference to the file in the message.

At startup, Think loads a recent window of the conversation, bounded by `hydrationByteBudget` (32 MiB by default). The budget counts each row's stored bytes plus the attachment bytes it loads, so it bounds memory use, not storage.

## Media eviction

An image the model has already seen costs tokens again on every later turn. Once a message is older than `mediaEviction.keepRecentMessages` (8 by default), Think moves its media out of the conversation and leaves a marker in its place:

```txt
[evicted image/png, 812004 bytes; preserved at /workspace/attachments/evicted/msg_01H8-0.png]
```

The bytes are written to the workspace at that path, with their real type. The workspace `read` tool can read images, so when the model needs the image again, it reads the path from the marker. Eviction is visible to the model on purpose.

Set `mediaEviction = false` to keep aged media in the conversation.

## Prompt caching

Model providers cache a prompt up to the first byte that differs from an earlier request. Think keeps the start of the prompt stable: the system prompt is frozen (refer to [Context](https://developers.cloudflare.com/agents/harnesses/think/context/#what-the-model-is-sent)), and each turn's first request extends the previous one, unless one of these rewrites the history:

| Mechanism | What it rewrites | How often the prompt prefix changes |
| --- | --- | --- |
| Read-time truncation | Tool outputs over 500 characters and text over 10,000 characters in older messages | Once every 8 messages (about every 4 turns) |
| Media eviction | An aged file part becomes a marker | With the read-time truncation cutoff |
| Compaction | A span of older turns becomes one summary | Once per compaction |

Read-time truncation keeps at least the four most recent messages whole, and moves its cutoff in steps of `truncationStep` messages (8 by default). A cutoff that moved on every turn would rewrite the end of the cached prefix on every turn, which costs more than it saves. For a model with a small context window, cut more often:

```js
import { Think } from "@cloudflare/think";

export class SmallModelAgent extends Think {
	truncationStep = 1;
}
```

```ts
import { Think } from "@cloudflare/think";

export class SmallModelAgent extends Think<Env> {
	truncationStep = 1;
}
```

Set `truncationStep` to `Infinity` to turn read-time truncation off. Pair that with compaction, so the context stays bounded.

## Related resources

- [`Sessions`](https://developers.cloudflare.com/agents/runtime/capabilities/sessions/): the API Think's conversation storage is built on.
- [Context](https://developers.cloudflare.com/agents/harnesses/think/context/): the system prompt, built from context blocks.
- [Durable recovery](https://developers.cloudflare.com/agents/harnesses/think/recovery/): chat recovery and context-window overflow recovery.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/agents/harnesses/think/sessions/#page","headline":"Sessions","description":"How a Think agent stores its conversation, compacts it, evicts aged media, and keeps the provider's prompt cache warm.","url":"https://developers.cloudflare.com/agents/harnesses/think/sessions/","inLanguage":"en","image":"https://developers.cloudflare.com/agents/harnesses/think/sessions/og.png?v=5d6c7b41bcca63b6","dateModified":"2026-11-24","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
