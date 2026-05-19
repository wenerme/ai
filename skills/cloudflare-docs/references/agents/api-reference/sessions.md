---
title: Sessions
description: Persistent conversation storage with tree-structured messages, context blocks, compaction, full-text search, and AI-controllable tools.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/agents/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Sessions

The Session API provides persistent conversation storage for agents, with tree-structured messages (inspired by [Pi ↗](https://pi.dev)), context blocks, compaction, full-text search, and AI-controllable tools. It runs entirely on Durable Object SQLite — no external database needed.

Experimental

The Session API is under `agents/experimental/memory/session`. The API surface is stable but may evolve before graduating to the main package.

## Quick start

* [  JavaScript ](#tab-panel-3958)
* [  TypeScript ](#tab-panel-3959)

JavaScript

```

import { Agent } from "agents";

import { Session } from "agents/experimental/memory/session";


class MyAgent extends Agent {

  session = Session.create(this)

    .withContext("soul", {

      provider: { get: async () => "You are a helpful assistant." },

    })

    .withContext("memory", {

      description: "Learned facts about the user",

      maxTokens: 1100,

    })

    .withCachedPrompt();


  async onMessage(message) {

    await this.session.appendMessage(message);

    const history = this.session.getHistory();

    const system = await this.session.freezeSystemPrompt();

    const tools = await this.session.tools();

    // Pass history, system prompt, and tools to your LLM

  }

}


```

TypeScript

```

import { Agent } from "agents";

import { Session } from "agents/experimental/memory/session";


class MyAgent extends Agent {

  session = Session.create(this)

    .withContext("soul", {

      provider: { get: async () => "You are a helpful assistant." },

    })

    .withContext("memory", {

      description: "Learned facts about the user",

      maxTokens: 1100,

    })

    .withCachedPrompt();


  async onMessage(message: unknown) {

    await this.session.appendMessage(message);

    const history = this.session.getHistory();

    const system = await this.session.freezeSystemPrompt();

    const tools = await this.session.tools();

    // Pass history, system prompt, and tools to your LLM

  }

}


```

## Creating a session

### Builder API (recommended)

Use `Session.create(agent)` with a chainable builder. Context providers without an explicit `provider` option are auto-wired to SQLite.

* [  JavaScript ](#tab-panel-3944)
* [  TypeScript ](#tab-panel-3945)

JavaScript

```

const session = Session.create(this)

  .withContext("soul", { provider: { get: async () => "You are helpful." } })

  .withContext("memory", { description: "Learned facts", maxTokens: 1100 })

  .withCachedPrompt()

  .onCompaction(myCompactFn)

  .compactAfter(100_000);


```

TypeScript

```

const session = Session.create(this)

  .withContext("soul", { provider: { get: async () => "You are helpful." } })

  .withContext("memory", { description: "Learned facts", maxTokens: 1100 })

  .withCachedPrompt()

  .onCompaction(myCompactFn)

  .compactAfter(100_000);


```

### Direct constructor

For full control over providers:

* [  JavaScript ](#tab-panel-3954)
* [  TypeScript ](#tab-panel-3955)

JavaScript

```

import {

  Session,

  AgentSessionProvider,

  AgentContextProvider,

} from "agents/experimental/memory/session";


const session = new Session(new AgentSessionProvider(this), {

  context: [

    {

      label: "memory",

      description: "Notes",

      maxTokens: 500,

      provider: new AgentContextProvider(this, "memory"),

    },

    { label: "soul", provider: { get: async () => "You are helpful." } },

  ],

});


```

TypeScript

```

import {

  Session,

  AgentSessionProvider,

  AgentContextProvider,

} from "agents/experimental/memory/session";


const session = new Session(new AgentSessionProvider(this), {

  context: [

    {

      label: "memory",

      description: "Notes",

      maxTokens: 500,

      provider: new AgentContextProvider(this, "memory"),

    },

    { label: "soul", provider: { get: async () => "You are helpful." } },

  ],

});


```

### Builder methods

All builder methods return `this` for chaining. Order does not matter — providers are resolved lazily on first use.

| Method                        | Description                                                                                                |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------- |
| Session.create(agent)         | Static factory. agent is any object with a sql tagged template method (your Agent or Durable Object).      |
| .forSession(sessionId)        | Namespace this session by ID. Required for multi-session isolation when not using SessionManager.          |
| .withContext(label, options?) | Add a context block. Refer to [Context blocks](#context-blocks).                                           |
| .withCachedPrompt(provider?)  | Enable system prompt persistence. The prompt is frozen on first use and survives hibernation and eviction. |
| .onCompaction(fn)             | Register a compaction function. Refer to [Compaction](#compaction).                                        |
| .compactAfter(tokenThreshold) | Auto-compact when estimated token count exceeds the threshold. Requires .onCompaction().                   |

## Messages

Messages use the `SessionMessage` type — a minimal shape with `id`, `role`, `parts`, and optional `createdAt`. The AI SDK's `UIMessage` is structurally compatible and can be passed directly. The session stores messages in a tree structure via `parent_id`, enabling branching conversations.

* [  JavaScript ](#tab-panel-3952)
* [  TypeScript ](#tab-panel-3953)

JavaScript

```

// Append — auto-parents to the latest leaf unless parentId is specified

await session.appendMessage(message);

await session.appendMessage(message, parentId);


// Update an existing message (matched by message.id)

session.updateMessage(message);


// Delete specific messages

session.deleteMessages(["msg-1", "msg-2"]);


// Clear all messages and skill state

session.clearMessages();


```

TypeScript

```

// Append — auto-parents to the latest leaf unless parentId is specified

await session.appendMessage(message);

await session.appendMessage(message, parentId);


// Update an existing message (matched by message.id)

session.updateMessage(message);


// Delete specific messages

session.deleteMessages(["msg-1", "msg-2"]);


// Clear all messages and skill state

session.clearMessages();


```

Note

`appendMessage()` is `async` because it may trigger auto-compaction. The underlying SQLite write is synchronous. All other write methods (`updateMessage`, `deleteMessages`, `clearMessages`) are synchronous.

### Reading history

* [  JavaScript ](#tab-panel-3960)
* [  TypeScript ](#tab-panel-3961)

JavaScript

```

// Linear history from root to the latest leaf

const messages = session.getHistory();


// History to a specific leaf (for branching)

const branch = session.getHistory(leafId);


// Get a single message

const msg = session.getMessage("msg-1");


// Get the newest message

const latest = session.getLatestLeaf();


// Count messages in path

const count = session.getPathLength();


```

TypeScript

```

// Linear history from root to the latest leaf

const messages = session.getHistory();


// History to a specific leaf (for branching)

const branch = session.getHistory(leafId);


// Get a single message

const msg = session.getMessage("msg-1");


// Get the newest message

const latest = session.getLatestLeaf();


// Count messages in path

const count = session.getPathLength();


```

### Branching

Messages form a tree. When you `appendMessage` with a `parentId` that already has children, you create a branch. Use `getBranches()` to get all child messages branching from a given point:

* [  JavaScript ](#tab-panel-3946)
* [  TypeScript ](#tab-panel-3947)

JavaScript

```

// Get all child messages that branch from messageId

const branches = session.getBranches(messageId);


```

TypeScript

```

// Get all child messages that branch from messageId

const branches = session.getBranches(messageId);


```

This powers features like response regeneration — pass the user message ID to get both the original and regenerated responses. `getHistory(leafId)` walks the chosen path.

## Search

Full-text search over the conversation history using SQLite FTS5:

* [  JavaScript ](#tab-panel-3948)
* [  TypeScript ](#tab-panel-3949)

JavaScript

```

const results = session.search("deployment Friday", { limit: 10 });

// Returns: Array<{ id, role, content, createdAt? }>


```

TypeScript

```

const results = session.search("deployment Friday", { limit: 10 });

// Returns: Array<{ id, role, content, createdAt? }>


```

Uses porter stemming and unicode tokenization. The search covers all messages in the session.

## Context blocks

Context blocks are persistent key-value sections injected into the system prompt. Each block has a **label**, optional **description**, and a **provider** that determines its behavior.

### Provider types

There are four provider types, detected by duck-typing:

| Provider                    | Interface                   | Behavior                                                                                     | AI tool                                      |
| --------------------------- | --------------------------- | -------------------------------------------------------------------------------------------- | -------------------------------------------- |
| **ContextProvider**         | get()                       | Read-only block in system prompt                                                             | —                                            |
| **WritableContextProvider** | get() \+ set()              | Writable via AI                                                                              | set\_context                                 |
| **SkillProvider**           | get() \+ load() \+ set?()   | On-demand keyed documents. get() returns a metadata listing; load(key) fetches full content. | load\_context, unload\_context, set\_context |
| **SearchProvider**          | get() \+ search() \+ set?() | Full-text searchable entries. get() returns a summary; search(query) runs FTS5.              | search\_context, set\_context                |

### Built-in providers

**`AgentContextProvider`** — SQLite-backed writable context. This is the default when using the builder without an explicit provider.

* [  JavaScript ](#tab-panel-3950)
* [  TypeScript ](#tab-panel-3951)

JavaScript

```

import { AgentContextProvider } from "agents/experimental/memory/session";


new AgentContextProvider(this, "memory");


```

TypeScript

```

import { AgentContextProvider } from "agents/experimental/memory/session";


new AgentContextProvider(this, "memory");


```

**`R2SkillProvider`** — Cloudflare R2 bucket for on-demand document loading. Skills are listed in the system prompt as metadata; the model loads full content on demand via `load_context`.

* [  JavaScript ](#tab-panel-3956)
* [  TypeScript ](#tab-panel-3957)

JavaScript

```

import { R2SkillProvider } from "agents/experimental/memory/session";


Session.create(this).withContext("skills", {

  provider: new R2SkillProvider(env.SKILLS_BUCKET, { prefix: "skills/" }),

});


```

TypeScript

```

import { R2SkillProvider } from "agents/experimental/memory/session";


Session.create(this).withContext("skills", {

  provider: new R2SkillProvider(env.SKILLS_BUCKET, { prefix: "skills/" }),

});


```

**`AgentSearchProvider`** — SQLite FTS5 searchable context. Entries are indexed and searchable by the model via `search_context`.

* [  JavaScript ](#tab-panel-3962)
* [  TypeScript ](#tab-panel-3963)

JavaScript

```

import { AgentSearchProvider } from "agents/experimental/memory/session";


Session.create(this).withContext("knowledge", {

  description: "Searchable knowledge base",

  provider: new AgentSearchProvider(this),

});


```

TypeScript

```

import { AgentSearchProvider } from "agents/experimental/memory/session";


Session.create(this).withContext("knowledge", {

  description: "Searchable knowledge base",

  provider: new AgentSearchProvider(this),

});


```

### Adding and removing context at runtime

Blocks can be added and removed dynamically after initialization:

* [  JavaScript ](#tab-panel-3968)
* [  TypeScript ](#tab-panel-3969)

JavaScript

```

// Add a new block (auto-wires to SQLite if no provider given)

await session.addContext("extension-notes", {

  description: "From extension X",

  maxTokens: 500,

});


// Remove it

session.removeContext("extension-notes");


// Rebuild the system prompt to reflect changes

await session.refreshSystemPrompt();


```

TypeScript

```

// Add a new block (auto-wires to SQLite if no provider given)

await session.addContext("extension-notes", {

  description: "From extension X",

  maxTokens: 500,

});


// Remove it

session.removeContext("extension-notes");


// Rebuild the system prompt to reflect changes

await session.refreshSystemPrompt();


```

Note

`addContext` and `removeContext` do not automatically update the frozen system prompt. Call `refreshSystemPrompt()` afterward.

### Reading and writing context

* [  JavaScript ](#tab-panel-3970)
* [  TypeScript ](#tab-panel-3971)

JavaScript

```

// Read a single block

const block = session.getContextBlock("memory");

// { label, description?, content, tokens, maxTokens?, writable, isSkill, isSearchable }


// Read all blocks

const blocks = session.getContextBlocks();


// Replace content entirely

await session.replaceContextBlock("memory", "User likes coffee.");


// Append content

await session.appendContextBlock("memory", "\nUser prefers dark roast.");


```

TypeScript

```

// Read a single block

const block = session.getContextBlock("memory");

// { label, description?, content, tokens, maxTokens?, writable, isSkill, isSearchable }


// Read all blocks

const blocks = session.getContextBlocks();


// Replace content entirely

await session.replaceContextBlock("memory", "User likes coffee.");


// Append content

await session.appendContextBlock("memory", "\nUser prefers dark roast.");


```

### System prompt

The system prompt is built from all context blocks with headers and metadata:

```

══════════════════════════════════════════════

SOUL (Identity) [readonly]

══════════════════════════════════════════════

You are a helpful assistant.


══════════════════════════════════════════════

MEMORY (Learned facts) [45% — 495/1100 tokens]

══════════════════════════════════════════════

User likes coffee.

User prefers dark roast.


```

* [  JavaScript ](#tab-panel-3966)
* [  TypeScript ](#tab-panel-3967)

JavaScript

```

// Freeze — first call renders and persists; subsequent calls return cached value

const prompt = await session.freezeSystemPrompt();


// Refresh — re-render from current block state and persist

const updated = await session.refreshSystemPrompt();


```

TypeScript

```

// Freeze — first call renders and persists; subsequent calls return cached value

const prompt = await session.freezeSystemPrompt();


// Refresh — re-render from current block state and persist

const updated = await session.refreshSystemPrompt();


```

The frozen prompt survives Durable Object hibernation and eviction when `withCachedPrompt()` is enabled.

## AI tools

Session automatically generates tools based on the provider types of your context blocks. Pass these to your LLM alongside your own tools.

* [  JavaScript ](#tab-panel-3964)
* [  TypeScript ](#tab-panel-3965)

JavaScript

```

const tools = await session.tools();

const allTools = { ...tools, ...myTools };


```

TypeScript

```

const tools = await session.tools();

const allTools = { ...tools, ...myTools };


```

### set\_context

Generated when any writable block exists. Writes to regular blocks, skill blocks (keyed), or search blocks (keyed). Enforces `maxTokens` limits.

### load\_context

Generated when any skill block exists. Loads full content by key from a `SkillProvider`.

### unload\_context

Generated alongside `load_context`. Frees context space by unloading a previously loaded skill. The skill remains available for re-loading.

### search\_context

Generated when any search block exists. Full-text search within a searchable context block. Returns top 10 results by FTS5 rank.

### session\_search

Available on `SessionManager` only. Searches across all sessions.

## Compaction

Compaction summarizes older messages to keep conversations within token limits. Original messages are preserved in SQLite — the summary is a non-destructive overlay applied at read time.

### Setup

* [  JavaScript ](#tab-panel-3978)
* [  TypeScript ](#tab-panel-3979)

JavaScript

```

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

  .compactAfter(100_000);


```

TypeScript

```

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

  .compactAfter(100_000);


```

### How compaction works

1. **Protect head** — first N messages are never compacted (default 3)
2. **Protect tail** — walk backward from the end, accumulating tokens up to a budget (default 20K tokens)
3. **Align boundaries** — shift boundaries to avoid splitting tool call/result pairs
4. **Summarize middle** — send the middle section to an LLM with a structured format (Topic, Key Points, Current State, Open Items)
5. **Store overlay** — saved in the `assistant_compactions` table, keyed by `fromMessageId` and `toMessageId`
6. **Iterative** — on subsequent compactions, the existing summary is passed to the LLM to update rather than replace

When `getHistory()` is called, compaction overlays are applied transparently — the compacted range is replaced by a synthetic summary message.

### Manual compaction

* [  JavaScript ](#tab-panel-3972)
* [  TypeScript ](#tab-panel-3973)

JavaScript

```

const result = await session.compact();


// Or manage overlays directly

session.addCompaction("Summary of messages 1-50", "msg-1", "msg-50");

const overlays = session.getCompactions();


```

TypeScript

```

const result = await session.compact();


// Or manage overlays directly

session.addCompaction("Summary of messages 1-50", "msg-1", "msg-50");

const overlays = session.getCompactions();


```

### Auto-compaction

When `.compactAfter(threshold)` is set, `appendMessage()` checks the estimated token count after each write. If it exceeds the threshold, `compact()` is called automatically. Auto-compaction failure is non-fatal — the message is already saved.

Note

Token estimation is heuristic (not tiktoken). It uses `max(chars/4, words*1.3)` with 4 tokens per-message overhead. Tiktoken would add 80–120 MB heap overhead, which exceeds Cloudflare Workers' 128 MB limit.

## SessionManager

`SessionManager` is a registry for multiple named sessions within a single Durable Object. It provides lifecycle management, convenience methods, and cross-session search.

### Creating a SessionManager

* [  JavaScript ](#tab-panel-3976)
* [  TypeScript ](#tab-panel-3977)

JavaScript

```

import { SessionManager } from "agents/experimental/memory/session";


const manager = SessionManager.create(this)

  .withContext("soul", { provider: { get: async () => "You are helpful." } })

  .withContext("memory", { description: "Learned facts", maxTokens: 1100 })

  .withCachedPrompt()

  .onCompaction(myCompactFn)

  .compactAfter(100_000)

  .withSearchableHistory("history");


```

TypeScript

```

import { SessionManager } from "agents/experimental/memory/session";


const manager = SessionManager.create(this)

  .withContext("soul", { provider: { get: async () => "You are helpful." } })

  .withContext("memory", { description: "Learned facts", maxTokens: 1100 })

  .withCachedPrompt()

  .onCompaction(myCompactFn)

  .compactAfter(100_000)

  .withSearchableHistory("history");


```

Context blocks, prompt caching, and compaction settings are propagated to all sessions created through the manager. Provider keys are automatically namespaced by session ID.

### Builder methods

| Method                        | Description                                                                                             |
| ----------------------------- | ------------------------------------------------------------------------------------------------------- |
| SessionManager.create(agent)  | Static factory.                                                                                         |
| .withContext(label, options?) | Add context block template for all sessions.                                                            |
| .withCachedPrompt(provider?)  | Enable prompt persistence for all sessions.                                                             |
| .onCompaction(fn)             | Register compaction function for all sessions.                                                          |
| .compactAfter(tokenThreshold) | Auto-compact threshold for all sessions.                                                                |
| .withSearchableHistory(label) | Add a cross-session searchable history block. The model can search past conversations from any session. |

### Session lifecycle

* [  JavaScript ](#tab-panel-3986)
* [  TypeScript ](#tab-panel-3987)

JavaScript

```

// Create a new session

const info = manager.create("My Chat");


// Create with metadata

const info2 = manager.create("My Chat", {

  parentSessionId: "parent-id",

  model: "claude-sonnet-4-20250514",

  source: "web",

});


// Get session metadata (null if not found)

const session = manager.get(sessionId);


// List all sessions (ordered by updated_at DESC)

const sessions = manager.list();


// Rename

manager.rename(sessionId, "New Name");


// Delete (clears messages too)

manager.delete(sessionId);


```

TypeScript

```

// Create a new session

const info = manager.create("My Chat");


// Create with metadata

const info2 = manager.create("My Chat", {

  parentSessionId: "parent-id",

  model: "claude-sonnet-4-20250514",

  source: "web",

});


// Get session metadata (null if not found)

const session = manager.get(sessionId);


// List all sessions (ordered by updated_at DESC)

const sessions = manager.list();


// Rename

manager.rename(sessionId, "New Name");


// Delete (clears messages too)

manager.delete(sessionId);


```

### Accessing sessions

* [  JavaScript ](#tab-panel-3974)
* [  TypeScript ](#tab-panel-3975)

JavaScript

```

// Get or create the Session instance for an ID

// Lazy — creates on first access, caches for subsequent calls

const session = manager.getSession(sessionId);


```

TypeScript

```

// Get or create the Session instance for an ID

// Lazy — creates on first access, caches for subsequent calls

const session = manager.getSession(sessionId);


```

### Message convenience methods

These delegate to the underlying Session and update the session's `updated_at` timestamp:

* [  JavaScript ](#tab-panel-3988)
* [  TypeScript ](#tab-panel-3989)

JavaScript

```

// Append a single message

await manager.append(sessionId, message, parentId);


// Add or update (upsert)

await manager.upsert(sessionId, message, parentId);


// Batch append (auto-chains parent IDs)

await manager.appendAll(sessionId, messages, parentId);


// Read history

const history = manager.getHistory(sessionId, leafId);


// Message count

const count = manager.getMessageCount(sessionId);


// Clear messages

manager.clearMessages(sessionId);


// Delete specific messages

manager.deleteMessages(sessionId, ["msg-1"]);


```

TypeScript

```

// Append a single message

await manager.append(sessionId, message, parentId);


// Add or update (upsert)

await manager.upsert(sessionId, message, parentId);


// Batch append (auto-chains parent IDs)

await manager.appendAll(sessionId, messages, parentId);


// Read history

const history = manager.getHistory(sessionId, leafId);


// Message count

const count = manager.getMessageCount(sessionId);


// Clear messages

manager.clearMessages(sessionId);


// Delete specific messages

manager.deleteMessages(sessionId, ["msg-1"]);


```

### Forking

Fork a session at a specific message — copies history up to that point into a new session:

* [  JavaScript ](#tab-panel-3980)
* [  TypeScript ](#tab-panel-3981)

JavaScript

```

const forked = await manager.fork(sessionId, atMessageId, "Forked Chat");

// forked.parent_session_id === sessionId


```

TypeScript

```

const forked = await manager.fork(sessionId, atMessageId, "Forked Chat");

// forked.parent_session_id === sessionId


```

### Usage tracking

* [  JavaScript ](#tab-panel-3982)
* [  TypeScript ](#tab-panel-3983)

JavaScript

```

manager.addUsage(sessionId, inputTokens, outputTokens, cost);


```

TypeScript

```

manager.addUsage(sessionId, inputTokens, outputTokens, cost);


```

### Cross-session search

* [  JavaScript ](#tab-panel-3984)
* [  TypeScript ](#tab-panel-3985)

JavaScript

```

// Search across all sessions (FTS5)

const results = manager.search("deployment Friday", { limit: 20 });


// Get tools for the model (includes session_search)

const tools = manager.tools();


```

TypeScript

```

// Search across all sessions (FTS5)

const results = manager.search("deployment Friday", { limit: 20 });


// Get tools for the model (includes session_search)

const tools = manager.tools();


```

## Custom providers

Implement any of the four provider interfaces to plug in your own storage:

* [  JavaScript ](#tab-panel-3990)
* [  TypeScript ](#tab-panel-3991)

JavaScript

```

// Read-only context

const myProvider = {

  get: async () => "Static content here",

};


// Writable context (enables set_context tool)

const myWritable = {

  get: async () => fetchFromMyDB(),

  set: async (content) => saveToMyDB(content),

};


// Skill provider (enables load_context tool)

const mySkills = {

  get: async () => "- api-ref: API Reference\n- guide: User Guide",

  load: async (key) => fetchDocument(key),

  set: async (key, content, description) =>

    saveDocument(key, content, description),

};


// Search provider (enables search_context tool)

const mySearch = {

  get: async () => "42 entries indexed",

  search: async (query) => searchMyIndex(query),

  set: async (key, content) => indexContent(key, content),

};


```

TypeScript

```

// Read-only context

const myProvider: ContextProvider = {

  get: async () => "Static content here",

};


// Writable context (enables set_context tool)

const myWritable: WritableContextProvider = {

  get: async () => fetchFromMyDB(),

  set: async (content) => saveToMyDB(content),

};


// Skill provider (enables load_context tool)

const mySkills: SkillProvider = {

  get: async () => "- api-ref: API Reference\n- guide: User Guide",

  load: async (key) => fetchDocument(key),

  set: async (key, content, description) =>

    saveDocument(key, content, description),

};


// Search provider (enables search_context tool)

const mySearch: SearchProvider = {

  get: async () => "42 entries indexed",

  search: async (query) => searchMyIndex(query),

  set: async (key, content) => indexContent(key, content),

};


```

You can also implement `SessionProvider` to replace the SQLite storage entirely:

* [  JavaScript ](#tab-panel-3992)
* [  TypeScript ](#tab-panel-3993)

JavaScript

```

const myStorage = {

  getMessage(id) {

    /* ... */

  },

  getHistory(leafId) {

    /* ... */

  },

  getLatestLeaf() {

    /* ... */

  },

  getBranches(messageId) {

    /* ... */

  },

  getPathLength(leafId) {

    /* ... */

  },

  appendMessage(message, parentId) {

    /* ... */

  },

  updateMessage(message) {

    /* ... */

  },

  deleteMessages(messageIds) {

    /* ... */

  },

  clearMessages() {

    /* ... */

  },

  addCompaction(summary, fromId, toId) {

    /* ... */

  },

  getCompactions() {

    /* ... */

  },

  searchMessages(query, limit) {

    /* ... */

  },

};


```

TypeScript

```

const myStorage: SessionProvider = {

  getMessage(id) {

    /* ... */

  },

  getHistory(leafId?) {

    /* ... */

  },

  getLatestLeaf() {

    /* ... */

  },

  getBranches(messageId) {

    /* ... */

  },

  getPathLength(leafId?) {

    /* ... */

  },

  appendMessage(message, parentId?) {

    /* ... */

  },

  updateMessage(message) {

    /* ... */

  },

  deleteMessages(messageIds) {

    /* ... */

  },

  clearMessages() {

    /* ... */

  },

  addCompaction(summary, fromId, toId) {

    /* ... */

  },

  getCompactions() {

    /* ... */

  },

  searchMessages(query, limit) {

    /* ... */

  },

};


```

## Storage tables

All storage is in Durable Object SQLite. Tables are created lazily on first use.

| Table                                                 | Purpose                                                                                                   |
| ----------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| assistant\_messages                                   | Tree-structured messages with id, session\_id, parent\_id, role, content (JSON), created\_at              |
| assistant\_compactions                                | Compaction overlays with summary, from\_message\_id, to\_message\_id                                      |
| assistant\_fts                                        | FTS5 virtual table for message search (porter stemming, unicode tokenization)                             |
| assistant\_sessions                                   | Session registry (SessionManager only) with name, parent\_session\_id, model, source, token/cost counters |
| cf\_agents\_context\_blocks                           | Persistent context block storage (AgentContextProvider)                                                   |
| cf\_agents\_search\_entries / cf\_agents\_search\_fts | Searchable context entries and FTS5 index (AgentSearchProvider)                                           |

## Acknowledgments

* Session's tree-structured messages are inspired by [Pi ↗](https://pi.dev).
* Context blocks are inspired by [Letta AI memory blocks ↗](https://www.letta.com/blog/memory-blocks).
* Formatting of blocks is inspired by [Hermes Agent ↗](https://github.com/nousresearch/hermes-agent).

## Related

* [Think](https://developers.cloudflare.com/agents/api-reference/think/) — opinionated chat agent that uses Session for conversation storage via `configureSession()`
* [Chat agents](https://developers.cloudflare.com/agents/api-reference/chat-agents/) — `AIChatAgent` with its own message persistence layer
* [Store and sync state](https://developers.cloudflare.com/agents/api-reference/store-and-sync-state/) — `setState()` for simpler key-value persistence

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/agents/","name":"Agents"}},{"@type":"ListItem","position":3,"item":{"@id":"/agents/api-reference/","name":"API Reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/agents/api-reference/sessions/","name":"Sessions"}}]}
```
