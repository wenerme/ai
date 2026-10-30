---
description: Store durable conversation history in a Durable Object with the Sessions capability. Messages form a tree with branches, compaction, full-text search, streamed reads, and a change feed.
title: Sessions
image: https://developers.cloudflare.com/agents/runtime/capabilities/sessions/og.png?v=5d6c7b41bcca63b6
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/agents/llms.txt
> Use this file to discover all available pages before exploring further.

# Sessions

Last updated Oct 29, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/agents/runtime/capabilities/sessions/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

`Sessions` is the session store that underpins the [Think harness](https://developers.cloudflare.com/agents/harnesses/think/). You can also use it to store the conversation when you [build your own harness](https://developers.cloudflare.com/agents/runtime/capabilities/build-a-capability/).

Experimental

The `{props.name}` capability is experimental. Everything exported from `{props.module}` may change between releases.

`Sessions` from `agents/sessions` stores conversation history in the Durable Object's SQLite database. Messages form a tree, so a conversation can branch. Reads stream, so a long history does not have to fit in memory. Compaction replaces old messages with a summary at read time without deleting them, and full-text search finds messages by their text.

## Choose a session store

Your harness determines which conversation APIs to use:

| Starting point | Guidance |
| --- | --- |
| [Pi](https://developers.cloudflare.com/agents/harnesses/pi/) | Use Pi's session APIs. Pi stores its own transcript and does not require `Sessions`. |
| [OpenCode](https://developers.cloudflare.com/agents/harnesses/opencode/) | Use OpenCode's session APIs. OpenCode owns its conversation storage. |
| [Think](https://developers.cloudflare.com/agents/harnesses/think/) | `Sessions` is already installed. Start with Think's conversation APIs; use this reference for lower-level storage operations. |
| [`AIChatAgent`](https://developers.cloudflare.com/agents/agent-class/communication-channels/chat/chat-agents/) | `Sessions` is already installed. Start with the chat agent APIs; do not install a second copy. |
| Your own loop on a plain Durable Object | Install `Sessions` if you want its history, branching, search, and compaction APIs. You can also use your own storage. |

## Install the capability

For a plain Durable Object, construct `Sessions` and register it with Lifecycle:

*src/index.jsjs*

```js
import { DurableObject } from "cloudflare:workers";
import { Lifecycle } from "agents/lifecycle";
import { Sessions } from "agents/sessions";

export class ConversationAgent extends DurableObject {
	sessions = new Sessions();
	lifecycle = Lifecycle.install(this).use(this.sessions);
	session = this.sessions.session();

	async onRequest(request) {
		if (request.method === "POST") {
			const message = await request.json();
			const result = await this.session.appendMessage(message, {
				source: "client",
			});
			return Response.json(result, { status: result.inserted ? 201 : 200 });
		}

		return Response.json(await this.session.getRecentHistory(1024 * 1024));
	}
}
```

*src/index.tsts*

```ts
import { DurableObject } from "cloudflare:workers";
import { Lifecycle } from "agents/lifecycle";
import { Sessions, type SessionMessage } from "agents/sessions";

export class ConversationAgent extends DurableObject<Env> {
	readonly sessions = new Sessions();
	readonly lifecycle = Lifecycle.install(this).use(this.sessions);
	readonly session = this.sessions.session();

	async onRequest(request: Request): Promise<Response> {
		if (request.method === "POST") {
			const message = await request.json<SessionMessage>();
			const result = await this.session.appendMessage(message, {
				source: "client",
			});
			return Response.json(result, { status: result.inserted ? 201 : 200 });
		}

		return Response.json(await this.session.getRecentHistory(1024 * 1024));
	}
}
```

`sessions.session()` returns a handle to one conversation. Without an ID, it returns the default session, whose ID is an empty string. Use the default session when one Durable Object holds one conversation.

In a real application, validate the message shape before you append it. The `source: "client"` option is explained in [Untrusted input](#untrusted-input).

## Write messages

A `SessionMessage` has an `id`, a `role`, and an array of `parts`. The AI SDK's `UIMessage` has the same shape, so you can store AI SDK messages directly:

```js
async function saveUserMessage(session, text) {
	const result = await session.appendMessage({
		id: crypto.randomUUID(),
		role: "user",
		parts: [{ type: "text", text }],
	});
	// result.inserted is false when a message with this ID already existed.
	return result.message;
}
```

```ts
import type { Session } from "agents/sessions";

async function saveUserMessage(session: Session, text: string) {
	const result = await session.appendMessage({
		id: crypto.randomUUID(),
		role: "user",
		parts: [{ type: "text", text }],
	});
	// result.inserted is false when a message with this ID already existed.
	return result.message;
}
```

`appendMessage()` resolves to an `AppendResult` with `inserted` and the `message` as stored. Appending a message whose ID already exists does not store it again, so a retried append is safe.

The other write methods are:

| Method | Description |
| --- | --- |
| `updateMessage(message)` | Replaces a stored message. Resolves to the stored form, or `null` when the ID is not in the session |
| `upsertMessage(message)` | Updates the message if it exists, or appends it |
| `deleteMessages(ids)` | Deletes messages. A deleted message's children attach to its parent, so later history stays reachable |
| `clearMessages()` | Deletes every message in the session |

### Untrusted input

Pass `source: "client"` when a message comes from a client. The capability then removes metadata keys that only your server should set. List those keys when you construct the capability:

```js
import { Sessions } from "agents/sessions";

const sessions = new Sessions({
	reservedMetadataKeys: ["channel", "turnMetadata"],
});
```

```ts
import { Sessions } from "agents/sessions";

const sessions = new Sessions({
	reservedMetadataKeys: ["channel", "turnMetadata"],
});
```

`Sessions` does not limit message size. A message that does not fit in one SQLite row is split across extra rows and read back unchanged, so a single large write can use a large part of the Durable Object's storage. Check the size of anything a client sends before you append it.

Images, audio, PDFs, and other non-text parts that carry their bytes inline are stored outside the message row, and put back when you read. Identical payloads are stored once. `Sessions` is still not a file store: an application that handles files should keep them in [R2](https://developers.cloudflare.com/r2/) and put a reference in the message.

## Read history

Read history as a stream when it may be long. `history()` yields one message at a time, from the root to the latest message, and keeps only a small window in memory:

```js
async function countToolCalls(session) {
	let count = 0;
	for await (const message of session.history()) {
		count += message.parts.filter((part) =>
			part.type.startsWith("tool-"),
		).length;
	}
	return count;
}
```

```ts
import type { Session } from "agents/sessions";

async function countToolCalls(session: Session): Promise<number> {
	let count = 0;
	for await (const message of session.history()) {
		count += message.parts.filter((part) =>
			part.type.startsWith("tool-"),
		).length;
	}
	return count;
}
```

Pass `newestFirst: true` to read from the latest message backwards. Breaking out of the loop early leaves the older messages unread, so this is the cheapest way to find something recent.

The read methods are:

| Method | Description |
| --- | --- |
| `history(options?)` | Streams messages. Options: `leafId`, `newestFirst`, `signal` |
| `historyBatches(options?)` | Streams arrays of messages. Adds `batchSize` and `maxBatchBytes` |
| `getRecentHistory(maxBytes, options?)` | Returns the longest recent run of messages that fits in `maxBytes`, always including the latest message |
| `getHistory(options?)` | Returns the whole path as an array |
| `getMessage(id)` | Returns one message, or `null` |
| `getLatestLeaf()` | Returns the latest message |
| `getHistoryRowStats(leafId?)` | Returns the stored size and token estimate of each message, without loading content |

`getRecentHistory()` resolves to `{ messages, truncated, totalContentBytes }`. Its byte budget counts each message's full stored size, including split rows and attachments, so it bounds the memory a read takes. Use it to load a recent window during startup.

Avoid `getHistory()` for an unbounded conversation, because it loads every message into memory at once.

## Branches

A message can have more than one child. An append attaches to the latest message by default. Pass `parentId` to attach it somewhere else, or `null` to start a new root:

```
flowchart TB
    accTitle: Two replies branch from the same user message
    accDescr: An earlier message leads to user message u1. The original reply a1 and regenerated reply a2 are children of u1. A later user message u2 continues only the original branch.
    M["m1: Earlier message"] --> U["u1: User message"]
    U --> A["a1: Original reply"]
    U --> B["a2: Regenerated reply"]
    A --> F["u2: Follow-up"]

```

Append `a2` with `parentId: "u1"` to create an alternative reply. `getBranches("u1")` returns `a1` and `a2`. `getHistory({ leafId: "a2" })` returns the path `m1 → u1 → a2`. To continue the original reply with `u2`, append it with `parentId: "a1"`.

For example, regenerate a reply to a user message:

```js
async function regenerate(session, userMessageId, reply) {
	// Add a second reply to the same user message.
	await session.appendMessage(reply, { parentId: userMessageId });

	const replies = await session.getBranches(userMessageId);
	const path = await session.getHistory({ leafId: reply.id });
	return { replies, path };
}
```

```ts
import type { Session, SessionMessage } from "agents/sessions";

async function regenerate(
	session: Session,
	userMessageId: string,
	reply: SessionMessage,
) {
	// Add a second reply to the same user message.
	await session.appendMessage(reply, { parentId: userMessageId });

	const replies = await session.getBranches(userMessageId);
	const path = await session.getHistory({ leafId: reply.id });
	return { replies, path };
}
```

`getBranches(id)` returns a message's children. Every read method accepts `leafId` to read the path that ends at that message.

To copy a conversation into another Durable Object, read it with `history()` and write each message with `importMessage()`. It stores the message as is, with the parent and timestamp you pass, and does not send a change event:

```js
async function copy(source, destination) {
	let parentId = null;
	for await (const message of source.history()) {
		await destination.importMessage(message, {
			parentId,
			createdAt: message.createdAt?.getTime() ?? Date.now(),
		});
		parentId = message.id;
	}
}
```

```ts
import type { Session } from "agents/sessions";

async function copy(source: Session, destination: Session) {
	let parentId: string | null = null;
	for await (const message of source.history()) {
		await destination.importMessage(message, {
			parentId,
			createdAt: message.createdAt?.getTime() ?? Date.now(),
		});
		parentId = message.id;
	}
}
```

## Compaction

Compaction keeps a long conversation within a model's context window. It stores a summary that replaces a range of messages when you read. The original messages are not deleted.

`createCompactFunction()` builds a compaction function from a `summarize` callback. Register it with `onCompaction()`, and set the token count that triggers it with `compactAfter()`:

*src/index.jsjs*

```js
import { DurableObject } from "cloudflare:workers";
import { generateText } from "ai";
import { Lifecycle } from "agents/lifecycle";
import { createAI } from "agents/models/ai-sdk";
import { Sessions, createCompactFunction } from "agents/sessions";

export class ConversationAgent extends DurableObject {
	ai = createAI({ binding: this.env.AI });
	sessions = new Sessions();
	lifecycle = Lifecycle.install(this).use(this.sessions);
	session = this.sessions
		.session()
		.onCompaction(
			createCompactFunction({
				summarize: async (prompt) => {
					const { text } = await generateText({
						model: this.ai("@cf/zai-org/glm-5.3-flash"),
						prompt,
					});
					return text;
				},
				keepRecentTokens: 20_000,
			}),
		)
		.compactAfter(80_000);
}
```

*src/index.tsts*

```ts
import { DurableObject } from "cloudflare:workers";
import { generateText } from "ai";
import { Lifecycle } from "agents/lifecycle";
import { createAI } from "agents/models/ai-sdk";
import { Sessions, createCompactFunction } from "agents/sessions";

export class ConversationAgent extends DurableObject<Env> {
	readonly ai = createAI({ binding: this.env.AI });
	readonly sessions = new Sessions();
	readonly lifecycle = Lifecycle.install(this).use(this.sessions);
	readonly session = this.sessions
		.session()
		.onCompaction(
			createCompactFunction({
				summarize: async (prompt) => {
					const { text } = await generateText({
						model: this.ai("@cf/zai-org/glm-5.3-flash"),
						prompt,
					});
					return text;
				},
				keepRecentTokens: 20_000,
			}),
		)
		.compactAfter(80_000);
}
```

`keepRecentTokens` is how many tokens of recent messages to keep word for word, 20,000 by default. The first three messages are always kept, at least the last two are kept, and a tool call is never separated from its result.

`Sessions` stores a token estimate with each message, so checking the threshold never reads the conversation. If automatic compaction fails, it logs the error and leaves the conversation unchanged.

You can also compact on demand:

| Method | Description |
| --- | --- |
| `compact(leafId?)` | Runs the registered compaction function now |
| `addCompaction(summary, fromId, toId)` | Stores a summary you produced yourself for a range of messages |
| `getCompactions()` | Lists the stored summaries |

## Search

`search(query)` finds messages by their text:

```js
async function find(session, query) {
	const results = await session.search(query, { limit: 10 });
	return results.map(({ id, role, content }) => ({ id, role, content }));
}
```

```ts
import type { Session } from "agents/sessions";

async function find(session: Session, query: string) {
	const results = await session.search(query, { limit: 10 });
	return results.map(({ id, role, content }) => ({ id, role, content }));
}
```

The first `search()` call builds a full-text index of the messages already stored. After that, every write keeps the index up to date. An object that never searches never pays for an index. Only text parts are indexed.

## Observe changes

`sessions.subscribe()` reports every write in the current isolate, for every session. Each event has a `type` and a `sessionId`:

| Type | When |
| --- | --- |
| `append`, `update` | A message was written. The event carries the message |
| `delete`, `clear` | Messages were deleted |
| `compact` | `compact()` stored a summary |
| `compaction` | `addCompaction()` stored a summary |
| `import` | `importMessage()` stored a message |

`subscribe()` returns a function that unsubscribes.

To keep an in-memory array of messages in step with storage, use `session.mirror()`. It applies appends, updates, deletes, and clears to the array for you:

```js
import { DurableObject } from "cloudflare:workers";
import { Lifecycle } from "agents/lifecycle";
import { Sessions } from "agents/sessions";

export class ConversationAgent extends DurableObject {
	sessions = new Sessions();
	lifecycle = Lifecycle.install(this).use(this.sessions);
	session = this.sessions.session();
	messages = [];

	async onStart() {
		this.messages = (await this.session.getRecentHistory(1024 * 1024)).messages;
		this.session.mirror({
			get: () => this.messages,
			set: (messages) => {
				this.messages = messages;
			},
		});
	}
}
```

```ts
import { DurableObject } from "cloudflare:workers";
import { Lifecycle } from "agents/lifecycle";
import { Sessions, type SessionMessage } from "agents/sessions";

export class ConversationAgent extends DurableObject<Env> {
	readonly sessions = new Sessions();
	readonly lifecycle = Lifecycle.install(this).use(this.sessions);
	readonly session = this.sessions.session();
	messages: SessionMessage[] = [];

	async onStart(): Promise<void> {
		this.messages = (await this.session.getRecentHistory(1024 * 1024)).messages;
		this.session.mirror({
			get: () => this.messages,
			set: (messages) => {
				this.messages = messages;
			},
		});
	}
}
```

Pass `transform` to store a different shape, and `intercept` to handle an event yourself, such as reloading after a compaction or a branch. `mirror()` returns a function that stops mirroring.

The change feed is local to the isolate. It is not an event log across objects.

## Several sessions in one object

Pass an ID to `session()` to keep several conversations in one Durable Object:

```js
import { Sessions } from "agents/sessions";

const sessions = new Sessions();
const support = sessions.session("support");
const sales = sessions.session("sales");
```

```ts
import { Sessions } from "agents/sessions";

const sessions = new Sessions();
const support = sessions.session("support");
const sales = sessions.session("sales");
```

Handles are cached, so settings such as the compaction threshold stay in place across `session()` calls. There is no list of sessions. Keep your own directory if you need one.

For user-facing chat, prefer one Durable Object per conversation. Each conversation then has its own storage, fails on its own, and hibernates on its own. Use several sessions in one object for drafts, local branches, or your own namespaces.

## Storage

`Sessions` stores its data in tables whose names start with `cf_agents_session_`. Appending a text message writes one row, on an object that has never searched. Messages too large for one row, and inline media, use extra rows.

Errors come from the values you write. A message that cannot be serialized to JSON throws the `TypeError` from `JSON.stringify`. There is no error for a message that is too large.

## On the Agent class

Think and `AIChatAgent` use `Sessions` for their messages. To add `Sessions` to an [`Agent`](https://developers.cloudflare.com/agents/agent-class/), construct it as a field and install it with `this.lifecycle.use()` in the constructor.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/agents/runtime/capabilities/sessions/#page","headline":"Sessions","description":"Store durable conversation history in a Durable Object with the Sessions capability. Messages form a tree with branches, compaction, full-text search, streamed reads, and a change feed.","url":"https://developers.cloudflare.com/agents/runtime/capabilities/sessions/","inLanguage":"en","image":"https://developers.cloudflare.com/agents/runtime/capabilities/sessions/og.png?v=5d6c7b41bcca63b6","dateModified":"2026-10-29","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
