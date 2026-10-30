---
description: How agents store and recall information, including read-only context, writable short-form memory, searchable knowledge, and on-demand skills.
title: Conversation state and memory
image: https://developers.cloudflare.com/agents/concepts/conversation-state-and-memory/og.png?v=52ce156c479b4e08
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/agents/llms.txt
> Use this file to discover all available pages before exploring further.

# Conversation state and memory

Last updated Oct 29, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/agents/concepts/conversation-state-and-memory/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Agents need memory to be useful over time. Without it, every conversation starts from zero. The agent forgets who the user is, what it learned, and what it was doing. Memory is what turns a stateless LLM call into a persistent, context-aware agent.

The [Session API](https://developers.cloudflare.com/agents/runtime/capabilities/sessions/) provides the memory layer for agents built on the Cloudflare Agents SDK. It manages two kinds of memory: **conversation history** (the messages and tool calls that make up a session) and **context memory** (persistent blocks injected into the system prompt that the agent can read, write, and search).

Use this page when you need more than simple synced state or flat chat history. For small UI state, use [Store and sync state](https://developers.cloudflare.com/agents/agent-class/state/). For basic chat persistence, `AIChatAgent` stores messages for you. For opinionated long-term memory, Think builds on Session and context blocks.

Experimental

The Session memory APIs currently use `agents/experimental/memory/session`. The concepts are stable, but import paths and details may change before graduation.

## Conversation history

The most fundamental type of memory is the conversation itself: the messages between the user and the agent, the tool calls the agent made, and the results it received. The Session stores all of this in a tree-structured message history backed by a Session Provider, defaulting to SQLite.

```js
import { Session } from "agents/experimental/memory/session";

// Append messages as the conversation progresses
await session.appendMessage({
	id: `user-${crypto.randomUUID()}`,
	role: "user",
	parts: [{ type: "text", text: "What's the status of the deployment?" }],
});

// Read the full conversation history
const history = await session.getHistory();
```

```ts
import { Session } from "agents/experimental/memory/session";

// Append messages as the conversation progresses
await session.appendMessage({
	id: `user-${crypto.randomUUID()}`,
	role: "user",
	parts: [{ type: "text", text: "What's the status of the deployment?" }],
});

// Read the full conversation history
const history = await session.getHistory();
```

Conversation history persists across Durable Object hibernation and eviction. When the agent wakes up, the full history is available in SQLite. It does not need to be replayed or reconstructed.

Messages are stored in a tree structure via `parent_id`, which enables branching conversations. When you `appendMessage` with a `parentId` that already has children, you create a branch, useful for features like response regeneration. `getHistory(leafId)` walks any chosen path through the tree.

The Session also provides full-text search across the conversation history:

```js
const results = await session.search("deployment Friday", { limit: 10 });
```

```ts
const results = await session.search("deployment Friday", { limit: 10 });
```

As conversations grow long, [compaction](#compaction) summarizes older messages to keep the context window manageable without losing the underlying data.

## Context memory

Context memory is persistent information injected into the system prompt, separate from the conversation history. It gives the agent access to identity, instructions, learned facts, knowledge bases, and reference material across every turn.

The Session API supports four types of context memory, each suited to different kinds of information. The type is determined by the **provider** backing the context block. The Session detects the provider's capabilities automatically.

### Read-only context

This is your traditional system prompt: the agent's identity, personality, and instructions. You might write it directly in your codebase, load it from a `SOUL.md` file in R2, or fetch it from an API. The content is injected into the system prompt and the agent cannot modify it.

A coding assistant might have a soul that defines its personality and constraints:

```js
import { Session } from "agents/experimental/memory/session";

const session = Session.create(this).withContext("soul", {
	provider: {
		get: async () =>
			"You are a senior TypeScript engineer. You write concise, " +
			"well-tested code. You prefer composition over inheritance. " +
			"When you are unsure, you say so rather than guessing.",
	},
});
```

```ts
import { Session } from "agents/experimental/memory/session";

const session = Session.create(this).withContext("soul", {
	provider: {
		get: async () =>
			"You are a senior TypeScript engineer. You write concise, " +
			"well-tested code. You prefer composition over inheritance. " +
			"When you are unsure, you say so rather than guessing.",
	},
});
```

Or load it from R2 so you can update the agent's personality without redeploying:

```js
const session = Session.create(this).withContext("soul", {
	provider: {
		get: async () => {
			const obj = await env.CONFIG_BUCKET.get("soul.md");
			return obj ? obj.text() : "You are a helpful assistant.";
		},
	},
});
```

```ts
const session = Session.create(this).withContext("soul", {
	provider: {
		get: async () => {
			const obj = await env.CONFIG_BUCKET.get("soul.md");
			return obj ? obj.text() : "You are a helpful assistant.";
		},
	},
});
```

Read-only blocks are defined by providing an object with only a `get()` method. No tools are generated. The content appears in the system prompt and the agent has no way to change it.

### Writable short-form context

Think of this as a scratchpad the agent maintains for itself, a place to jot down things it needs to remember. Like how Claude Code keeps a todo list of tasks to work through, or how a customer support agent might track what it has learned about the user during the conversation.

```js
const session = Session.create(this)
	.withContext("memory", {
		description: "Important facts learned during conversation",
		maxTokens: 1100,
	})
	.withContext("todos", {
		description: "Task list, track what needs to be done and what is complete",
		maxTokens: 2000,
	});
```

```ts
const session = Session.create(this)
	.withContext("memory", {
		description: "Important facts learned during conversation",
		maxTokens: 1100,
	})
	.withContext("todos", {
		description: "Task list, track what needs to be done and what is complete",
		maxTokens: 2000,
	});
```

When you omit the `provider` option in the builder, the Session auto-wires to a SQLite-backed writable provider. The agent gets a `set_context` tool that lets it replace or append content to these blocks. Token limits are enforced, so the agent cannot write more than the `maxTokens` budget allows.

The system prompt renders writable blocks with a token usage indicator so the agent knows how much space it has left:

```txt
══════════════════════════════════════════════
MEMORY (Important facts learned during conversation) [45% — 495/1100 tokens] [writable]
══════════════════════════════════════════════
User prefers dark mode.
User's project uses React and TypeScript.
Deployment target is Cloudflare Workers.

══════════════════════════════════════════════
TODOS (Task list) [12% — 240/2000 tokens] [writable]
══════════════════════════════════════════════
- [x] Set up project scaffolding
- [ ] Add authentication middleware
- [ ] Write integration tests
```

The content persists across messages and survives hibernation. It is always visible in the system prompt, so the agent sees it on every turn without needing to fetch anything.

### Searchable context

When you have a large body of information (a knowledge base, documentation, logs, accumulated notes) you do not want to stuff it all into the system prompt. Searchable context keeps a summary in the system prompt (for example, "42 entries indexed") and lets the agent retrieve specific entries when it needs them.

You provide a provider with a `search()` method. How that search works is entirely up to you: full-text search, vector search via [Vectorize](https://developers.cloudflare.com/vectorize/), a call to an external API, or anything else. The Session does not care about the implementation, only that the provider has a `search()` method.

The built-in `AgentSearchProvider` uses Durable Object SQLite with FTS5 as default:

```js
import { AgentSearchProvider } from "agents/experimental/memory/session";

const session = Session.create(this).withContext("knowledge", {
	description:
		"Searchable knowledge base, search for relevant information before answering",
	provider: new AgentSearchProvider(this),
});
```

```ts
import { AgentSearchProvider } from "agents/experimental/memory/session";

const session = Session.create(this).withContext("knowledge", {
	description:
		"Searchable knowledge base, search for relevant information before answering",
	provider: new AgentSearchProvider(this),
});
```

But you can implement your own provider backed by any search mechanism:

```js
const session = Session.create(this).withContext("knowledge", {
	description: "Searchable knowledge base",
	provider: {
		get: async () => "Product documentation and FAQs",
		search: async (query) => {
			// Use Vectorize, an external API, whatever you need
			const results = await env.VECTORIZE_INDEX.query(
				await generateEmbedding(query),
				{ topK: 5 },
			);
			return results.matches.map((m) => m.metadata.text).join("\n\n");
		},
		set: async (key, content) => {
			// Index new content
		},
	},
});
```

```ts
const session = Session.create(this).withContext("knowledge", {
	description: "Searchable knowledge base",
	provider: {
		get: async () => "Product documentation and FAQs",
		search: async (query) => {
			// Use Vectorize, an external API, whatever you need
			const results = await env.VECTORIZE_INDEX.query(
				await generateEmbedding(query),
				{ topK: 5 },
			);
			return results.matches.map((m) => m.metadata.text).join("\n\n");
		},
		set: async (key, content) => {
			// Index new content
		},
	},
});
```

The agent gets a `search_context` tool for querying and a `set_context` tool for indexing new entries. It decides what to search for, and you decide how the search works.

This is the right choice when the agent needs to find specific pieces of information from a large collection, rather than loading entire documents.

### On-demand skills

Some context is too large to keep in every prompt: runbooks, reference guides, templates, and scripts. [Agent Skills](https://developers.cloudflare.com/agents/skills/) cover this case. The agent sees a short catalog of skill names and descriptions, and loads a full skill with the `activate_skill` tool only when a task needs it.

Refer to [Agent Skills](https://developers.cloudflare.com/agents/concepts/agent-skills/) for how the format works. Skills are files, not memory blocks. Store them in the agent's [Computer Workspace](https://developers.cloudflare.com/agents/skills/sources/computer/), in [R2](https://developers.cloudflare.com/agents/skills/sources/r2/), or [in code](https://developers.cloudflare.com/agents/skills/sources/code/).

| Aspect | Skills | Writable context | Searchable context |
| --- | --- | --- | --- |
| **In system prompt** | Names and descriptions only | Full content | Entry count only |
| **Loaded** | Whole skill, on demand | Always | Top matching chunks, on demand |
| **Best for** | Procedures, references, scripts | Facts, preferences | Large knowledge bases |

## How agents interact with memory

The Session automatically generates tools based on the provider types of your context blocks. You pass these tools to your LLM alongside your own application-specific tools:

```js
const sessionTools = await session.tools();
const allTools = { ...sessionTools, ...myApplicationTools };

const result = streamText({
	model: myModel,
	system: await session.freezeSystemPrompt(),
	messages: await convertToModelMessages(await session.getHistory()),
	tools: allTools,
});
```

```ts
const sessionTools = await session.tools();
const allTools = { ...sessionTools, ...myApplicationTools };

const result = streamText({
	model: myModel,
	system: await session.freezeSystemPrompt(),
	messages: await convertToModelMessages(await session.getHistory()),
	tools: allTools,
});
```

### Generated tools

The Session generates tools dynamically based on what provider types are present:

| Tool | Generated when | What it does |
| --- | --- | --- |
| **`set_context`** | Any writable or search block exists | Writes content to a named block. For writable blocks, replaces or appends. For search blocks, writes a keyed entry. |
| **`search_context`** | Any search block exists | Full-text search within a searchable block. Returns the top results ranked by relevance. |
| **`session_search`** | Using `SessionManager` | Searches across all sessions (cross-conversation search). |

The tools include descriptions and parameter schemas that tell the LLM which blocks are available and what they are for. The agent decides when and how to use them based on the conversation.

For the full tool signatures and all Session methods, refer to the [Session API reference](https://developers.cloudflare.com/agents/runtime/capabilities/sessions/).

## The system prompt

Context blocks are assembled into a structured system prompt with clear headers and metadata. Each block gets a labeled section with tags indicating its type and capacity:

```txt
══════════════════════════════════════════════
SOUL (Identity) [readonly]
══════════════════════════════════════════════
You are a helpful coding assistant who speaks concisely.

══════════════════════════════════════════════
MEMORY (Important facts) [45% — 495/1100 tokens] [writable]
══════════════════════════════════════════════
User prefers dark mode.
User's project uses React and TypeScript.

══════════════════════════════════════════════
KNOWLEDGE (Searchable knowledge base) [searchable]
══════════════════════════════════════════════
12 entries indexed.
```

The tags (`[readonly]`, `[writable]`, `[searchable]`) tell the LLM what kind of interaction is possible with each block. Token budgets show the agent how much space remains in writable blocks, helping it manage its own memory.

## Gotchas

### Prompt caching

LLM providers (Anthropic, OpenAI, and others) cache the system prompt prefix. When consecutive requests share the same system prompt, the provider can skip re-processing that prefix, reducing both latency and cost. Breaking the cache (by changing the system prompt) throws away this benefit.

The Session API is designed to work with prompt caching:

- **`freezeSystemPrompt()`** renders the system prompt from all context blocks on the first call, then returns the cached value on subsequent calls. The prompt does not change between turns, even when the agent writes to memory via `set_context`.
- **`withCachedPrompt()`** persists the frozen prompt to storage, so it survives Durable Object hibernation and eviction. When the agent wakes up, it loads the same prompt without re-fetching from all providers.

When the agent uses `set_context` to update a writable block, the underlying provider is updated immediately (the data is saved), but the frozen system prompt is **not** re-rendered. The LLM sees the update on its next turn only if you explicitly call `refreshSystemPrompt()`, which you typically do between conversation turns, not mid-turn.

This means the system prompt stays stable throughout a multi-step tool-use turn, preserving the provider's prefix cache across every step.

```js
const session = Session.create(this)
	.withContext("soul", {
		provider: { get: async () => "You are a helpful assistant." },
	})
	.withContext("memory", { description: "Learned facts", maxTokens: 1100 })
	.withCachedPrompt(); // Persist the frozen prompt across hibernation

// During a conversation turn:
const system = await session.freezeSystemPrompt(); // Same value every call
const tools = await session.tools();

// ... agent calls set_context to update memory ...
// The frozen prompt is NOT changed, prefix cache stays warm

// Between turns (optional, if you want the agent to see its own updates):
await session.refreshSystemPrompt();
```

```ts
const session = Session.create(this)
	.withContext("soul", {
		provider: { get: async () => "You are a helpful assistant." },
	})
	.withContext("memory", { description: "Learned facts", maxTokens: 1100 })
	.withCachedPrompt(); // Persist the frozen prompt across hibernation

// During a conversation turn:
const system = await session.freezeSystemPrompt(); // Same value every call
const tools = await session.tools();

// ... agent calls set_context to update memory ...
// The frozen prompt is NOT changed, prefix cache stays warm

// Between turns (optional, if you want the agent to see its own updates):
await session.refreshSystemPrompt();
```

### Compaction

Long conversations eventually exceed the LLM's context window. Compaction addresses this at two levels: **macro-compaction** summarizes ranges of older messages, and **micro-compaction** truncates individual messages that are too large.

#### Macro-compaction

Macro-compaction summarizes older messages, but it never deletes the originals.

It uses **overlays**: a summary is stored in a separate table, keyed by the message range it covers. When `getHistory()` is called, overlays are applied transparently at read time. The compacted range is replaced by a synthetic summary message. The underlying messages remain in SQLite, preserving the full conversation for audit, search, and branching.

```txt
Messages:  [1] [2] [3] [4] [5] [6] [7] [8] [9] [10]
                    ↓ compaction ↓
Overlay:   [1] [2] [SUMMARY of 3-7]           [8] [9] [10]
                                                ↑ tail protected
```

The key points:

- **Non-destructive**, original messages are never deleted. The full conversation is always available in the database.
- **Iterative**, when the conversation grows again and triggers another compaction, the existing summary is passed to the LLM to update, not replaced from scratch.
- **Boundary-aware**, compaction boundaries are shifted to avoid splitting tool call / tool result pairs.
- **Configurable**, `protectHead` preserves the first N messages (usually the system context), and `tailTokenBudget` keeps the most recent messages intact.

```js
import { createCompactFunction } from "agents/experimental/memory/utils/compaction-helpers";

const session = Session.create(this)
	.withContext("memory", { maxTokens: 1100 })
	.onCompaction(
		createCompactFunction({
			summarize: (prompt) =>
				generateText({ model: myModel, prompt }).then((r) => r.text),
			protectHead: 3,
			tailTokenBudget: 20000,
			minTailMessages: 2,
		}),
	)
	.compactAfter(100_000); // Auto-compact when token estimate exceeds threshold
```

```ts
import { createCompactFunction } from "agents/experimental/memory/utils/compaction-helpers";

const session = Session.create(this)
	.withContext("memory", { maxTokens: 1100 })
	.onCompaction(
		createCompactFunction({
			summarize: (prompt) =>
				generateText({ model: myModel, prompt }).then((r) => r.text),
			protectHead: 3,
			tailTokenBudget: 20000,
			minTailMessages: 2,
		}),
	)
	.compactAfter(100_000); // Auto-compact when token estimate exceeds threshold
```

Auto-compaction triggers after `appendMessage()` when the estimated token count exceeds the threshold. Compaction failure is non-fatal, the message is already saved.

#### Micro-compaction

Micro-compaction works at the individual message level rather than across ranges. It handles two problems:

**Read-time truncation**: `truncateOlderMessages()` shortens tool outputs and long text in older messages before sending them to the LLM. Recent messages (last 4 by default) are kept intact. This operates on a copy, stored messages are not mutated.

```js
import { truncateOlderMessages } from "agents/experimental/memory/utils";

const history = await session.getHistory();
const truncated = truncateOlderMessages(history);
// Pass truncated history to the LLM
```

```ts
import { truncateOlderMessages } from "agents/experimental/memory/utils";

const history = await session.getHistory();
const truncated = truncateOlderMessages(history);
// Pass truncated history to the LLM
```

**Row size enforcement**: when a message is persisted (typically an assistant message with large tool outputs), it is checked against the SQLite row size limit. Oversized tool outputs are replaced with a preview and a note suggesting the tool be re-run. This prevents individual messages from exceeding storage limits while preserving the conversation flow.

## Related

### [Session API reference](https://developers.cloudflare.com/agents/runtime/capabilities/sessions/)

Full API reference for Session, covering messages, context blocks, compaction, search, tools, and custom providers.

### [Store and sync state](https://developers.cloudflare.com/agents/agent-class/state/)

setState() for simpler key-value persistence and real-time sync.

### [Think](https://developers.cloudflare.com/agents/harnesses/think/)

Opinionated chat agent with built-in Session integration via configureSession().

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/agents/concepts/conversation-state-and-memory/#page","headline":"Conversation state and memory","description":"How agents store and recall information, including read-only context, writable short-form memory, searchable knowledge, and on-demand skills.","url":"https://developers.cloudflare.com/agents/concepts/conversation-state-and-memory/","inLanguage":"en","image":"https://developers.cloudflare.com/agents/concepts/conversation-state-and-memory/og.png?v=52ce156c479b4e08","dateModified":"2026-10-29","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["AI"]}
```
