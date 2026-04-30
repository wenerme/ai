---
title: Chat agents
description: Build AI chat interfaces with AIChatAgent and useAgentChat, including message persistence, streaming, and tool support.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/agents/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Chat agents

Build AI-powered chat interfaces with `AIChatAgent` and `useAgentChat`. Messages are automatically persisted to SQLite, streams resume on disconnect, and tool calls work across server and client.

## Overview

The `@cloudflare/ai-chat` package provides two main exports:

| Export       | Import                    | Purpose                                                        |
| ------------ | ------------------------- | -------------------------------------------------------------- |
| AIChatAgent  | @cloudflare/ai-chat       | Server-side agent class with message persistence and streaming |
| useAgentChat | @cloudflare/ai-chat/react | React hook for building chat UIs                               |

Built on the [AI SDK ↗](https://ai-sdk.dev) and Cloudflare Durable Objects, you get:

* **Automatic message persistence** — conversations stored in SQLite, survive restarts
* **Resumable streaming** — disconnected clients resume mid-stream without data loss
* **Real-time sync** — messages broadcast to all connected clients via WebSocket
* **Tool support** — server-side, client-side, and human-in-the-loop tool patterns
* **Data parts** — attach typed JSON (citations, progress, usage) to messages alongside text
* **Row size protection** — automatic compaction when messages approach SQLite limits

## Quick start

### Install

Terminal window

```

npm install @cloudflare/ai-chat agents ai


```

### Server

* [  JavaScript ](#tab-panel-2964)
* [  TypeScript ](#tab-panel-2965)

JavaScript

```

import { AIChatAgent } from "@cloudflare/ai-chat";

import { createWorkersAI } from "workers-ai-provider";

import { streamText, convertToModelMessages } from "ai";


export class ChatAgent extends AIChatAgent {

  async onChatMessage() {

    // Use any provider such as workers-ai-provider, openai, anthropic, google, etc.

    const workersai = createWorkersAI({ binding: this.env.AI });


    const result = streamText({

      model: workersai("@cf/zai-org/glm-4.7-flash"),

      messages: await convertToModelMessages(this.messages),

    });


    return result.toUIMessageStreamResponse();

  }

}


```

TypeScript

```

import { AIChatAgent } from "@cloudflare/ai-chat";

import { createWorkersAI } from "workers-ai-provider";

import { streamText, convertToModelMessages } from "ai";


export class ChatAgent extends AIChatAgent {

  async onChatMessage() {

    // Use any provider such as workers-ai-provider, openai, anthropic, google, etc.

    const workersai = createWorkersAI({ binding: this.env.AI });


    const result = streamText({

      model: workersai("@cf/zai-org/glm-4.7-flash"),

      messages: await convertToModelMessages(this.messages),

    });


    return result.toUIMessageStreamResponse();

  }

}


```

### Client

* [  JavaScript ](#tab-panel-2990)
* [  TypeScript ](#tab-panel-2991)

JavaScript

```

import { useAgent } from "agents/react";

import { useAgentChat } from "@cloudflare/ai-chat/react";


function Chat() {

  const agent = useAgent({ agent: "ChatAgent" });

  const { messages, sendMessage, status } = useAgentChat({ agent });


  return (

    <div>

      {messages.map((msg) => (

        <div key={msg.id}>

          <strong>{msg.role}:</strong>

          {msg.parts.map((part, i) =>

            part.type === "text" ? <span key={i}>{part.text}</span> : null,

          )}

        </div>

      ))}


      <form

        onSubmit={(e) => {

          e.preventDefault();

          const input = e.currentTarget.elements.namedItem("input");

          sendMessage({ text: input.value });

          input.value = "";

        }}

      >

        <input name="input" placeholder="Type a message..." />

        <button type="submit" disabled={status === "streaming"}>

          Send

        </button>

      </form>

    </div>

  );

}


```

TypeScript

```

import { useAgent } from "agents/react";

import { useAgentChat } from "@cloudflare/ai-chat/react";


function Chat() {

  const agent = useAgent({ agent: "ChatAgent" });

  const { messages, sendMessage, status } = useAgentChat({ agent });


  return (

    <div>

      {messages.map((msg) => (

        <div key={msg.id}>

          <strong>{msg.role}:</strong>

          {msg.parts.map((part, i) =>

            part.type === "text" ? <span key={i}>{part.text}</span> : null,

          )}

        </div>

      ))}


      <form

        onSubmit={(e) => {

          e.preventDefault();

          const input = e.currentTarget.elements.namedItem(

            "input",

          ) as HTMLInputElement;

          sendMessage({ text: input.value });

          input.value = "";

        }}

      >

        <input name="input" placeholder="Type a message..." />

        <button type="submit" disabled={status === "streaming"}>

          Send

        </button>

      </form>

    </div>

  );

}


```

### Wrangler configuration

JSONC

```

// wrangler.jsonc

{

  "ai": { "binding": "AI" },

  "durable_objects": {

    "bindings": [{ "name": "ChatAgent", "class_name": "ChatAgent" }],

  },

  "migrations": [{ "tag": "v1", "new_sqlite_classes": ["ChatAgent"] }],

}


```

The `new_sqlite_classes` migration is required — `AIChatAgent` uses SQLite for message persistence and stream chunk buffering.

## How it works

sequenceDiagram
    participant Client as Client (useAgentChat)
    participant Agent as AIChatAgent
    participant DB as SQLite

    Client->>Agent: CF_AGENT_USE_CHAT_REQUEST (WebSocket)
    Agent->>DB: Persist messages
    Agent->>Agent: onChatMessage()
    loop Streaming response
        Agent-->>Client: CF_AGENT_USE_CHAT_RESPONSE (chunks)
        Agent->>DB: Buffer chunks
    end
    Agent->>DB: Persist final message
    Agent-->>Client: CF_AGENT_CHAT_MESSAGES (broadcast to all clients)

1. The client sends a message via WebSocket
2. `AIChatAgent` persists messages to SQLite and calls your `onChatMessage` method
3. Your method returns a streaming `Response` (typically from `streamText`)
4. Chunks stream back over WebSocket in real-time
5. When the stream completes, the final message is persisted and broadcast to all connections

## Server API

### `AIChatAgent`

Extends `Agent` from the `agents` package. Manages conversation state, persistence, and streaming.

* [  JavaScript ](#tab-panel-2970)
* [  TypeScript ](#tab-panel-2971)

JavaScript

```

import { AIChatAgent } from "@cloudflare/ai-chat";


export class ChatAgent extends AIChatAgent {

  // Access current messages

  // this.messages: UIMessage[]


  // Limit stored messages (optional)

  maxPersistedMessages = 200;


  async onChatMessage(onFinish, options) {

    // onFinish: optional callback for streamText (cleanup is automatic)

    // options.abortSignal: cancel signal

    // options.body: custom data from client

    // Return a Response (streaming or plain text)

  }

}


```

TypeScript

```

import { AIChatAgent } from "@cloudflare/ai-chat";


export class ChatAgent extends AIChatAgent {

  // Access current messages

  // this.messages: UIMessage[]


  // Limit stored messages (optional)

  maxPersistedMessages = 200;


  async onChatMessage(onFinish?, options?) {

    // onFinish: optional callback for streamText (cleanup is automatic)

    // options.abortSignal: cancel signal

    // options.body: custom data from client

    // Return a Response (streaming or plain text)

  }

}


```

### `onChatMessage`

This is the main method you override. It receives the conversation context and should return a `Response`.

**Streaming response** (most common):

* [  JavaScript ](#tab-panel-2968)
* [  TypeScript ](#tab-panel-2969)

JavaScript

```

export class ChatAgent extends AIChatAgent {

  async onChatMessage() {

    const workersai = createWorkersAI({ binding: this.env.AI });


    const result = streamText({

      model: workersai("@cf/zai-org/glm-4.7-flash"),

      system: "You are a helpful assistant.",

      messages: await convertToModelMessages(this.messages),

    });


    return result.toUIMessageStreamResponse();

  }

}


```

TypeScript

```

export class ChatAgent extends AIChatAgent {

  async onChatMessage() {

    const workersai = createWorkersAI({ binding: this.env.AI });


    const result = streamText({

      model: workersai("@cf/zai-org/glm-4.7-flash"),

      system: "You are a helpful assistant.",

      messages: await convertToModelMessages(this.messages),

    });


    return result.toUIMessageStreamResponse();

  }

}


```

**Plain text response**:

TypeScript

```

export class ChatAgent extends AIChatAgent {

  async onChatMessage() {

    return new Response("Hello! I am a simple agent.", {

      headers: { "Content-Type": "text/plain" },

    });

  }

}


```

**Accessing custom body data and request ID**:

TypeScript

```

export class ChatAgent extends AIChatAgent {

  async onChatMessage(_onFinish, options) {

    const { timezone, userId } = options?.body ?? {};

    // Use these values in your LLM call or business logic


    // options.requestId — unique identifier for this chat request,

    // useful for logging and correlating events

    console.log("Request ID:", options?.requestId);

  }

}


```

### `this.messages`

The current conversation history, loaded from SQLite. This is an array of `UIMessage` objects from the AI SDK. Messages are automatically persisted after each interaction.

### `maxPersistedMessages`

Cap the number of messages stored in SQLite. When the limit is exceeded, the oldest messages are deleted. This controls storage only — it does not affect what is sent to the LLM.

* [  JavaScript ](#tab-panel-2962)
* [  TypeScript ](#tab-panel-2963)

JavaScript

```

export class ChatAgent extends AIChatAgent {

  maxPersistedMessages = 200;

}


```

TypeScript

```

export class ChatAgent extends AIChatAgent {

  maxPersistedMessages = 200;

}


```

To control what is sent to the model, use the AI SDK's `pruneMessages()`:

* [  JavaScript ](#tab-panel-2980)
* [  TypeScript ](#tab-panel-2981)

JavaScript

```

import { streamText, convertToModelMessages, pruneMessages } from "ai";


export class ChatAgent extends AIChatAgent {

  async onChatMessage() {

    const workersai = createWorkersAI({ binding: this.env.AI });


    const result = streamText({

      model: workersai("@cf/zai-org/glm-4.7-flash"),

      messages: pruneMessages({

        messages: await convertToModelMessages(this.messages),

        reasoning: "before-last-message",

        toolCalls: "before-last-2-messages",

      }),

    });


    return result.toUIMessageStreamResponse();

  }

}


```

TypeScript

```

import { streamText, convertToModelMessages, pruneMessages } from "ai";


export class ChatAgent extends AIChatAgent {

  async onChatMessage() {

    const workersai = createWorkersAI({ binding: this.env.AI });


    const result = streamText({

      model: workersai("@cf/zai-org/glm-4.7-flash"),

      messages: pruneMessages({

        messages: await convertToModelMessages(this.messages),

        reasoning: "before-last-message",

        toolCalls: "before-last-2-messages",

      }),

    });


    return result.toUIMessageStreamResponse();

  }

}


```

### `waitForMcpConnections`

Controls whether `AIChatAgent` waits for MCP server connections to settle before calling `onChatMessage`. This ensures `this.mcp.getAITools()` returns the full set of tools, especially after Durable Object hibernation when connections are being restored in the background.

| Value                | Behavior                                      |
| -------------------- | --------------------------------------------- |
| { timeout: 10\_000 } | Wait up to 10 seconds (default)               |
| { timeout: N }       | Wait up to N milliseconds                     |
| true                 | Wait indefinitely until all connections ready |
| false                | Do not wait (old behavior before 0.2.0)       |

* [  JavaScript ](#tab-panel-2974)
* [  TypeScript ](#tab-panel-2975)

JavaScript

```

export class ChatAgent extends AIChatAgent {

  // Default — waits up to 10 seconds

  // waitForMcpConnections = { timeout: 10_000 };


  // Wait forever

  waitForMcpConnections = true;


  // Disable waiting

  waitForMcpConnections = false;

}


```

TypeScript

```

export class ChatAgent extends AIChatAgent {

  // Default — waits up to 10 seconds

  // waitForMcpConnections = { timeout: 10_000 };


  // Wait forever

  waitForMcpConnections = true;


  // Disable waiting

  waitForMcpConnections = false;

}


```

For lower-level control, call `this.mcp.waitForConnections()` directly inside your `onChatMessage` instead.

### `messageConcurrency`

Controls how overlapping user submissions behave when a chat turn is already active or queued.

* [  JavaScript ](#tab-panel-2966)
* [  TypeScript ](#tab-panel-2967)

JavaScript

```

export class ChatAgent extends AIChatAgent {

  messageConcurrency = "queue";

}


```

TypeScript

```

export class ChatAgent extends AIChatAgent {

  messageConcurrency = "queue";

}


```

| Strategy                                      | Behavior                                                                                                                            |
| --------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| "queue" (default)                             | Queue every submission and process in order                                                                                         |
| "latest"                                      | Keep only the latest overlapping submission; superseded submissions still persist their user messages but do not start a model turn |
| "merge"                                       | Queue overlapping submissions, then collapse their trailing user messages into one combined turn before the latest queued turn runs |
| "drop"                                        | Ignore overlapping submissions entirely                                                                                             |
| { strategy: "debounce", debounceMs?: number } | Trailing-edge latest with a quiet window (default 750ms)                                                                            |

This setting only applies to `sendMessage()` submissions. Regenerations, tool continuations, approvals, clears, and programmatic `saveMessages()` calls keep their existing serialized behavior.

### `persistMessages` and `saveMessages`

`persistMessages` stores messages in SQLite and broadcasts the update to all connected clients, but does **not** trigger a model turn. Use it when you want to inject messages into the conversation without starting a new response.

`saveMessages` persists messages **and** triggers `onChatMessage()` for a new response. It waits for any active chat turn to finish before starting, so scheduled or programmatic messages never overlap an in-flight stream.

* [  JavaScript ](#tab-panel-2972)
* [  TypeScript ](#tab-panel-2973)

JavaScript

```

// Store messages without triggering a response

await this.persistMessages(messages);


// Store messages AND trigger onChatMessage

const { requestId, status } = await this.saveMessages(messages);


```

TypeScript

```

// Store messages without triggering a response

await this.persistMessages(messages);


// Store messages AND trigger onChatMessage

const { requestId, status } = await this.saveMessages(messages);


```

`saveMessages` accepts either an array of messages or a function that derives the next message list from the latest persisted `this.messages`. Use the function form to avoid stale baselines when multiple calls queue up:

* [  JavaScript ](#tab-panel-2976)
* [  TypeScript ](#tab-panel-2977)

JavaScript

```

await this.saveMessages((messages) => [

  ...messages,

  {

    id: crypto.randomUUID(),

    role: "user",

    parts: [{ type: "text", text: "Summarize the latest data" }],

    createdAt: new Date(),

  },

]);


```

TypeScript

```

await this.saveMessages((messages) => [

  ...messages,

  {

    id: crypto.randomUUID(),

    role: "user",

    parts: [{ type: "text", text: "Summarize the latest data" }],

    createdAt: new Date(),

  },

]);


```

`saveMessages` returns `{ requestId, status }` where `status` is `"completed"` if the turn ran, or `"skipped"` if the chat was cleared before it started.

### `onChatResponse`

Called after a chat turn completes and the assistant message has been persisted. The turn lock is released before this hook runs, so it is safe to call `saveMessages` from inside. Fires for all turn completion paths: WebSocket chat requests, `saveMessages`, and auto-continuation.

* [  JavaScript ](#tab-panel-2986)
* [  TypeScript ](#tab-panel-2987)

JavaScript

```

export class ChatAgent extends AIChatAgent {

  async onChatResponse(result) {

    if (result.status === "completed") {

      console.log("Turn completed:", result.requestId);

    }

    if (result.status === "error") {

      console.error("Turn failed:", result.error);

    }

  }

}


```

TypeScript

```

import type { ChatResponseResult } from "@cloudflare/ai-chat";


export class ChatAgent extends AIChatAgent {

  protected async onChatResponse(result: ChatResponseResult) {

    if (result.status === "completed") {

      console.log("Turn completed:", result.requestId);

    }

    if (result.status === "error") {

      console.error("Turn failed:", result.error);

    }

  }

}


```

The `ChatResponseResult` contains:

| Field        | Type                   | Description                                                       |                    |
| ------------ | ---------------------- | ----------------------------------------------------------------- | ------------------ |
| message      | UIMessage              | The finalized assistant message from this turn                    |                    |
| requestId    | string                 | The request ID associated with this turn                          |                    |
| continuation | boolean                | Whether this turn was a continuation of a previous assistant turn |                    |
| status       | "completed" \| "error" | "aborted"                                                         | How the turn ended |
| error        | string \| undefined    | Error message when status is "error"                              |                    |

Note

Responses triggered from inside `onChatResponse` (for example, via `saveMessages`) do not fire `onChatResponse` recursively.

### `sanitizeMessageForPersistence`

Override this method to apply custom transformations to messages before they are persisted to storage. This hook runs **after** the built-in sanitization (OpenAI metadata stripping, Anthropic provider-executed tool payload truncation, empty reasoning part filtering).

* [  JavaScript ](#tab-panel-2992)
* [  TypeScript ](#tab-panel-2993)

JavaScript

```

export class ChatAgent extends AIChatAgent {

  sanitizeMessageForPersistence(message) {

    return {

      ...message,

      parts: message.parts.map((part) => {

        if (

          "output" in part &&

          typeof part.output === "string" &&

          part.output.length > 1000

        ) {

          return { ...part, output: "[redacted]" };

        }

        return part;

      }),

    };

  }

}


```

TypeScript

```

export class ChatAgent extends AIChatAgent {

  protected sanitizeMessageForPersistence(message: UIMessage): UIMessage {

    return {

      ...message,

      parts: message.parts.map((part) => {

        if (

          "output" in part &&

          typeof part.output === "string" &&

          part.output.length > 1000

        ) {

          return { ...part, output: "[redacted]" };

        }

        return part;

      }),

    };

  }

}


```

### Turn lifecycle helpers

These methods help you coordinate programmatic turns and wait for pending interactions.

#### `hasPendingInteraction()`

Returns `true` when an assistant message is waiting on a client tool result or approval.

* [  JavaScript ](#tab-panel-2978)
* [  TypeScript ](#tab-panel-2979)

JavaScript

```

if (this.hasPendingInteraction()) {

  console.log("Waiting for user to approve or provide tool output");

}


```

TypeScript

```

if (this.hasPendingInteraction()) {

  console.log("Waiting for user to approve or provide tool output");

}


```

#### `waitUntilStable()`

Waits until the conversation is fully stable — no active stream, no pending client-tool interactions, and no queued continuation turns. Returns `true` when stable, or `false` if the timeout expires before a pending interaction resolves.

* [  JavaScript ](#tab-panel-2982)
* [  TypeScript ](#tab-panel-2983)

JavaScript

```

const stable = await this.waitUntilStable({ timeout: 30_000 });

if (stable) {

  console.log("All turns complete, safe to proceed");

}


```

TypeScript

```

const stable = await this.waitUntilStable({ timeout: 30_000 });

if (stable) {

  console.log("All turns complete, safe to proceed");

}


```

This is especially useful with `saveMessages` for server-driven flows:

* [  JavaScript ](#tab-panel-2984)
* [  TypeScript ](#tab-panel-2985)

JavaScript

```

await this.saveMessages((messages) => [...messages, syntheticUserMessage]);

await this.waitUntilStable({ timeout: 60_000 });

// The assistant has finished responding


```

TypeScript

```

await this.saveMessages((messages) => [...messages, syntheticUserMessage]);

await this.waitUntilStable({ timeout: 60_000 });

// The assistant has finished responding


```

#### `resetTurnState()`

Aborts the active turn and invalidates queued continuations. The built-in `CF_AGENT_CHAT_CLEAR` handler calls this automatically, but you can call it manually if needed.

### Lifecycle hooks

Override `onConnect` and `onClose` to add custom logic. Stream resumption and message sync are handled for you:

* [  JavaScript ](#tab-panel-2994)
* [  TypeScript ](#tab-panel-2995)

JavaScript

```

export class ChatAgent extends AIChatAgent {

  async onConnect(connection, ctx) {

    // Your custom logic (e.g., logging, auth checks)

    console.log("Client connected:", connection.id);

    // Stream resumption and message sync are handled automatically

  }


  async onClose(connection, code, reason, wasClean) {

    console.log("Client disconnected:", connection.id);

    // Connection cleanup is handled automatically

  }

}


```

TypeScript

```

export class ChatAgent extends AIChatAgent {

  async onConnect(connection, ctx) {

    // Your custom logic (e.g., logging, auth checks)

    console.log("Client connected:", connection.id);

    // Stream resumption and message sync are handled automatically

  }


  async onClose(connection, code, reason, wasClean) {

    console.log("Client disconnected:", connection.id);

    // Connection cleanup is handled automatically

  }

}


```

The `destroy()` method cancels any pending chat requests and cleans up stream state. It is called automatically when the Durable Object is evicted, but you can call it manually if needed.

### Request cancellation

When a user clicks "stop" in the chat UI, the client sends a `CF_AGENT_CHAT_REQUEST_CANCEL` message. The server propagates this to the `abortSignal` in `options`:

* [  JavaScript ](#tab-panel-2996)
* [  TypeScript ](#tab-panel-2997)

JavaScript

```

export class ChatAgent extends AIChatAgent {

  async onChatMessage(_onFinish, options) {

    const result = streamText({

      model: workersai("@cf/zai-org/glm-4.7-flash"),

      messages: await convertToModelMessages(this.messages),

      abortSignal: options?.abortSignal, // Pass through for cancellation

    });


    return result.toUIMessageStreamResponse();

  }

}


```

TypeScript

```

export class ChatAgent extends AIChatAgent {

  async onChatMessage(_onFinish, options) {

    const result = streamText({

      model: workersai("@cf/zai-org/glm-4.7-flash"),

      messages: await convertToModelMessages(this.messages),

      abortSignal: options?.abortSignal, // Pass through for cancellation

    });


    return result.toUIMessageStreamResponse();

  }

}


```

Warning

If you do not pass `abortSignal` to `streamText`, the LLM call will continue running in the background even after the user cancels. Always forward it when possible.

### Stream recovery

When a Durable Object is evicted mid-stream (code update, inactivity timeout, resource limit), the LLM connection is severed permanently and the in-memory streaming state is lost. `chatRecovery` wraps each chat turn in a [runFiber()](https://developers.cloudflare.com/agents/api-reference/durable-execution/), providing automatic `keepAlive` during streaming and a recovery hook on restart.

* [  JavaScript ](#tab-panel-2988)
* [  TypeScript ](#tab-panel-2989)

JavaScript

```

export class ChatAgent extends AIChatAgent {

  chatRecovery = true;

}


```

TypeScript

```

export class ChatAgent extends AIChatAgent {

  override chatRecovery = true;

}


```

When enabled, every `onChatMessage` call runs inside a fiber. If the agent is evicted mid-stream, the fiber row survives in SQLite. On the next activation, the framework detects the interrupted fiber, reconstructs the partial response from buffered stream chunks, and calls `onChatRecovery`.

#### `onChatRecovery`

Override to implement provider-specific recovery. The default behavior persists the partial response and schedules a continuation via `continueLastTurn()`.

* [  JavaScript ](#tab-panel-2998)
* [  TypeScript ](#tab-panel-2999)

JavaScript

```

export class ChatAgent extends AIChatAgent {

  chatRecovery = true;


  async onChatRecovery(ctx) {

    console.log(`Recovered ${ctx.partialText.length} chars of partial text`);


    // Default: persist partial + schedule continuation

    return {};

  }

}


```

TypeScript

```

import type { ChatRecoveryContext, ChatRecoveryOptions } from "@cloudflare/ai-chat";


export class ChatAgent extends AIChatAgent {

  override chatRecovery = true;


  override async onChatRecovery(

    ctx: ChatRecoveryContext,

  ): Promise<ChatRecoveryOptions> {

    console.log(`Recovered ${ctx.partialText.length} chars of partial text`);


    // Default: persist partial + schedule continuation

    return {};

  }

}


```

**`ChatRecoveryContext`:**

| Field           | Type                                 | Description                                                           |
| --------------- | ------------------------------------ | --------------------------------------------------------------------- |
| streamId        | string                               | ID of the interrupted stream                                          |
| requestId       | string                               | ID of the original chat request                                       |
| partialText     | string                               | Text generated before eviction                                        |
| partialParts    | MessagePart\[\]                      | Message parts (text, reasoning, tool calls) generated before eviction |
| recoveryData    | unknown \| null                      | Data from this.stash() — entirely user-controlled                     |
| messages        | ChatMessage\[\]                      | Full conversation history                                             |
| lastBody        | Record<string, unknown> \| undefined | The original request body                                             |
| lastClientTools | ClientToolSchema\[\] \| undefined    | Client tool schemas from the original request                         |

**`ChatRecoveryOptions`:**

| Field    | Default | Description                                       |
| -------- | ------- | ------------------------------------------------- |
| persist  | true    | Save the partial response as an assistant message |
| continue | true    | Schedule a continuation via continueLastTurn()    |

Common return values:

* `{}` — persist partial + auto-continue (default, works with providers that support assistant prefill)
* `{ continue: false }` — persist partial but do not auto-continue (handle continuation yourself)
* `{ persist: false, continue: false }` — handle everything yourself (for example, retrieve a completed response from the provider)

#### `continueLastTurn`

Appends to the last assistant message by re-calling `onChatMessage` with the saved request body. The response is streamed as a continuation — appended to the existing assistant message, not a new one. No synthetic user message is created.

TypeScript

```

protected continueLastTurn(body?: Record<string, unknown>): Promise<SaveMessagesResult>;


```

Called automatically by the default recovery path. Can also be called manually from scheduled callbacks or other entry points. The optional `body` parameter merges with the saved `_lastBody`.

#### Stashing recovery data

Use `this.stash()` inside `onChatMessage` to persist provider-specific data for recovery. The stash is stored in the fiber's SQLite row, separate from agent state, and available as `ctx.recoveryData` in `onChatRecovery`.

* [  JavaScript ](#tab-panel-3014)
* [  TypeScript ](#tab-panel-3015)

JavaScript

```

export class ChatAgent extends AIChatAgent {

  chatRecovery = true;


  async onChatMessage(_onFinish, options) {

    const result = streamText({

      model: openai("gpt-5.4"),

      messages: await convertToModelMessages(this.messages),

      providerOptions: { openai: { store: true } },

      includeRawChunks: true,

      onChunk: ({ chunk }) => {

        if (chunk.type === "raw") {

          const raw = chunk.rawValue;


          if (raw?.type === "response.created" && raw.response?.id) {

            this.stash({ responseId: raw.response.id });

          }

        }

      },

    });

    return result.toUIMessageStreamResponse();

  }

}


```

TypeScript

```

export class ChatAgent extends AIChatAgent {

  override chatRecovery = true;


  async onChatMessage(_onFinish, options) {

    const result = streamText({

      model: openai("gpt-5.4"),

      messages: await convertToModelMessages(this.messages),

      providerOptions: { openai: { store: true } },

      includeRawChunks: true,

      onChunk: ({ chunk }) => {

        if (chunk.type === "raw") {

          const raw = chunk.rawValue as {

            type?: string;

            response?: { id?: string };

          };

          if (raw?.type === "response.created" && raw.response?.id) {

            this.stash({ responseId: raw.response.id });

          }

        }

      },

    });

    return result.toUIMessageStreamResponse();

  }

}


```

#### Recovery strategies by provider

The right strategy depends on whether the provider supports assistant prefill and whether the response continues server-side after disconnection:

| Provider               | Strategy                                                   | Token cost |
| ---------------------- | ---------------------------------------------------------- | ---------- |
| Workers AI             | continueLastTurn() — model continues via assistant prefill | Low        |
| OpenAI (Responses API) | Retrieve completed response by ID — zero wasted tokens     | Zero       |
| Anthropic              | Persist partial, send a synthetic user message to continue | Medium     |

For how chat recovery fits into the broader long-running agents story, refer to [Long-running agents: Recovering interrupted LLM streams](https://developers.cloudflare.com/agents/concepts/long-running-agents/#recovering-interrupted-llm-streams). For the underlying fiber API, refer to [Durable Execution](https://developers.cloudflare.com/agents/api-reference/durable-execution/).

## Client API

### `useAgentChat`

React hook that connects to an `AIChatAgent` over WebSocket. Wraps the AI SDK's `useChat` with a native WebSocket transport.

* [  JavaScript ](#tab-panel-3002)
* [  TypeScript ](#tab-panel-3003)

JavaScript

```

import { useAgent } from "agents/react";

import { useAgentChat } from "@cloudflare/ai-chat/react";


function Chat() {

  const agent = useAgent({ agent: "ChatAgent" });

  const {

    messages,

    sendMessage,

    clearHistory,

    addToolOutput,

    addToolApprovalResponse,

    setMessages,

    status,

  } = useAgentChat({ agent });


  // ...

}


```

TypeScript

```

import { useAgent } from "agents/react";

import { useAgentChat } from "@cloudflare/ai-chat/react";


function Chat() {

  const agent = useAgent({ agent: "ChatAgent" });

  const {

    messages,

    sendMessage,

    clearHistory,

    addToolOutput,

    addToolApprovalResponse,

    setMessages,

    status,

  } = useAgentChat({ agent });


  // ...

}


```

### Options

| Option                      | Type                                        | Default  | Description                                                                                                          |
| --------------------------- | ------------------------------------------- | -------- | -------------------------------------------------------------------------------------------------------------------- |
| agent                       | ReturnType<typeof useAgent>                 | Required | Agent connection from useAgent                                                                                       |
| onToolCall                  | ({ toolCall, addToolOutput }) => void       | —        | Handle client-side tool execution                                                                                    |
| autoContinueAfterToolResult | boolean                                     | true     | Auto-continue conversation after client tool results and approvals                                                   |
| resume                      | boolean                                     | true     | Enable automatic stream resumption on reconnect                                                                      |
| body                        | object \| () => object                      | —        | Custom data sent with every request                                                                                  |
| prepareSendMessagesRequest  | (options) => { body?, headers? }            | —        | Advanced per-request customization                                                                                   |
| getInitialMessages          | (options) => Promise<UIMessage\[\]> or null | —        | Custom initial message loader. Set to null to skip the HTTP fetch entirely (useful when providing messages directly) |

### Return values

| Property                | Type                             | Description                                  |
| ----------------------- | -------------------------------- | -------------------------------------------- |
| messages                | UIMessage\[\]                    | Current conversation messages                |
| sendMessage             | (message) => void                | Send a message                               |
| clearHistory            | () => void                       | Clear conversation (client and server)       |
| addToolOutput           | ({ toolCallId, output }) => void | Provide output for a client-side tool        |
| addToolApprovalResponse | ({ id, approved }) => void       | Approve or reject a tool requiring approval  |
| setMessages             | (messages \| updater) => void    | Set messages directly (syncs to server)      |
| status                  | string                           | "idle", "submitted", "streaming", or "error" |

## Tools

`AIChatAgent` supports three tool patterns, all using the AI SDK's `tool()` function:

| Pattern     | Where it runs                | When to use                                   |
| ----------- | ---------------------------- | --------------------------------------------- |
| Server-side | Server (automatic)           | API calls, database queries, computations     |
| Client-side | Browser (via onToolCall)     | Geolocation, clipboard, camera, local storage |
| Approval    | Server (after user approval) | Payments, deletions, external actions         |

### Server-side tools

Tools with an `execute` function run automatically on the server:

* [  JavaScript ](#tab-panel-3018)
* [  TypeScript ](#tab-panel-3019)

JavaScript

```

import { streamText, convertToModelMessages, tool, stepCountIs } from "ai";

import { z } from "zod";

export class ChatAgent extends AIChatAgent {

  async onChatMessage() {

    const workersai = createWorkersAI({ binding: this.env.AI });


    const result = streamText({

      model: workersai("@cf/zai-org/glm-4.7-flash"),

      messages: await convertToModelMessages(this.messages),

      tools: {

        getWeather: tool({

          description: "Get weather for a city",

          inputSchema: z.object({ city: z.string() }),

          execute: async ({ city }) => {

            const data = await fetchWeather(city);

            return { temperature: data.temp, condition: data.condition };

          },

        }),

      },

      stopWhen: stepCountIs(5),

    });


    return result.toUIMessageStreamResponse();

  }

}


```

TypeScript

```

import { streamText, convertToModelMessages, tool, stepCountIs } from "ai";

import { z } from "zod";

export class ChatAgent extends AIChatAgent {

  async onChatMessage() {

    const workersai = createWorkersAI({ binding: this.env.AI });


    const result = streamText({

      model: workersai("@cf/zai-org/glm-4.7-flash"),

      messages: await convertToModelMessages(this.messages),

      tools: {

        getWeather: tool({

          description: "Get weather for a city",

          inputSchema: z.object({ city: z.string() }),

          execute: async ({ city }) => {

            const data = await fetchWeather(city);

            return { temperature: data.temp, condition: data.condition };

          },

        }),

      },

      stopWhen: stepCountIs(5),

    });


    return result.toUIMessageStreamResponse();

  }

}


```

### Client-side tools

Define a tool on the server without `execute`, then handle it on the client with `onToolCall`. Use this for tools that need browser APIs.

**Server:**

* [  JavaScript ](#tab-panel-3000)
* [  TypeScript ](#tab-panel-3001)

JavaScript

```

tools: {

  getLocation: tool({

    description: "Get the user's location from the browser",

    inputSchema: z.object({}),

    // No execute — the client handles it

  });

}


```

TypeScript

```

tools: {

  getLocation: tool({

    description: "Get the user's location from the browser",

    inputSchema: z.object({}),

    // No execute — the client handles it

  });

}


```

**Client:**

* [  JavaScript ](#tab-panel-3006)
* [  TypeScript ](#tab-panel-3007)

JavaScript

```

const { messages, sendMessage } = useAgentChat({

  agent,

  onToolCall: async ({ toolCall, addToolOutput }) => {

    if (toolCall.toolName === "getLocation") {

      const pos = await new Promise((resolve, reject) =>

        navigator.geolocation.getCurrentPosition(resolve, reject),

      );

      addToolOutput({

        toolCallId: toolCall.toolCallId,

        output: { lat: pos.coords.latitude, lng: pos.coords.longitude },

      });

    }

  },

});


```

TypeScript

```

const { messages, sendMessage } = useAgentChat({

  agent,

  onToolCall: async ({ toolCall, addToolOutput }) => {

    if (toolCall.toolName === "getLocation") {

      const pos = await new Promise((resolve, reject) =>

        navigator.geolocation.getCurrentPosition(resolve, reject),

      );

      addToolOutput({

        toolCallId: toolCall.toolCallId,

        output: { lat: pos.coords.latitude, lng: pos.coords.longitude },

      });

    }

  },

});


```

When the LLM invokes `getLocation`, the stream pauses. The `onToolCall` callback fires, your code provides the output, and the conversation continues.

### Tool approval (human-in-the-loop)

Use `needsApproval` for tools that require user confirmation before executing.

**Server:**

* [  JavaScript ](#tab-panel-3004)
* [  TypeScript ](#tab-panel-3005)

JavaScript

```

tools: {

  processPayment: tool({

    description: "Process a payment",

    inputSchema: z.object({

      amount: z.number(),

      recipient: z.string(),

    }),

    needsApproval: async ({ amount }) => amount > 100,

    execute: async ({ amount, recipient }) => charge(amount, recipient),

  });

}


```

TypeScript

```

tools: {

  processPayment: tool({

    description: "Process a payment",

    inputSchema: z.object({

      amount: z.number(),

      recipient: z.string(),

    }),

    needsApproval: async ({ amount }) => amount > 100,

    execute: async ({ amount, recipient }) => charge(amount, recipient),

  });

}


```

**Client:**

* [  JavaScript ](#tab-panel-3036)
* [  TypeScript ](#tab-panel-3037)

JavaScript

```

const { messages, addToolApprovalResponse } = useAgentChat({ agent });


// Render pending approvals from message parts

{

  messages.map((msg) =>

    msg.parts

      .filter(

        (part) => part.type === "tool" && part.state === "approval-required",

      )

      .map((part) => (

        <div key={part.toolCallId}>

          <p>Approve {part.toolName}?</p>

          <button

            onClick={() =>

              addToolApprovalResponse({

                id: part.toolCallId,

                approved: true,

              })

            }

          >

            Approve

          </button>

          <button

            onClick={() =>

              addToolApprovalResponse({

                id: part.toolCallId,

                approved: false,

              })

            }

          >

            Reject

          </button>

        </div>

      )),

  );

}


```

TypeScript

```

const { messages, addToolApprovalResponse } = useAgentChat({ agent });


// Render pending approvals from message parts

{

  messages.map((msg) =>

    msg.parts

      .filter(

        (part) => part.type === "tool" && part.state === "approval-required",

      )

      .map((part) => (

        <div key={part.toolCallId}>

          <p>Approve {part.toolName}?</p>

          <button

            onClick={() =>

              addToolApprovalResponse({

                id: part.toolCallId,

                approved: true,

              })

            }

          >

            Approve

          </button>

          <button

            onClick={() =>

              addToolApprovalResponse({

                id: part.toolCallId,

                approved: false,

              })

            }

          >

            Reject

          </button>

        </div>

      )),

  );

}


```

#### Custom denial messages with `addToolOutput`

When a user rejects a tool, `addToolApprovalResponse({ id, approved: false })` sets the tool state to `output-denied` with a generic message. To give the LLM a more specific reason for the denial, use `addToolOutput` with `state: "output-error"` instead:

* [  JavaScript ](#tab-panel-3008)
* [  TypeScript ](#tab-panel-3009)

JavaScript

```

const { addToolOutput } = useAgentChat({ agent });


// Reject with a custom error message

addToolOutput({

  toolCallId: part.toolCallId,

  state: "output-error",

  errorText: "User declined: insufficient budget for this quarter",

});


```

TypeScript

```

const { addToolOutput } = useAgentChat({ agent });


// Reject with a custom error message

addToolOutput({

  toolCallId: part.toolCallId,

  state: "output-error",

  errorText: "User declined: insufficient budget for this quarter",

});


```

This sends a `tool_result` to the LLM with your custom error text, so it can respond appropriately (for example, suggest an alternative or ask clarifying questions).

`addToolApprovalResponse` (with `approved: false`) auto-continues the conversation when `autoContinueAfterToolResult` is enabled (the default). `addToolOutput` with `state: "output-error"` does **not** auto-continue — call `sendMessage()` afterward if you want the LLM to respond to the error.

For more patterns, refer to [Human-in-the-loop](https://developers.cloudflare.com/agents/concepts/human-in-the-loop/).

## Custom request data

Include custom data with every chat request using the `body` option:

* [  JavaScript ](#tab-panel-3012)
* [  TypeScript ](#tab-panel-3013)

JavaScript

```

const { messages, sendMessage } = useAgentChat({

  agent,

  body: {

    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,

    userId: currentUser.id,

  },

});


```

TypeScript

```

const { messages, sendMessage } = useAgentChat({

  agent,

  body: {

    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,

    userId: currentUser.id,

  },

});


```

For dynamic values, use a function:

* [  JavaScript ](#tab-panel-3010)
* [  TypeScript ](#tab-panel-3011)

JavaScript

```

body: () => ({

  token: getAuthToken(),

  timestamp: Date.now(),

});


```

TypeScript

```

body: () => ({

  token: getAuthToken(),

  timestamp: Date.now(),

});


```

Access these fields on the server:

* [  JavaScript ](#tab-panel-3016)
* [  TypeScript ](#tab-panel-3017)

JavaScript

```

export class ChatAgent extends AIChatAgent {

  async onChatMessage(_onFinish, options) {

    const { timezone, userId } = options?.body ?? {};

    // ...

  }

}


```

TypeScript

```

export class ChatAgent extends AIChatAgent {

  async onChatMessage(_onFinish, options) {

    const { timezone, userId } = options?.body ?? {};

    // ...

  }

}


```

For advanced per-request customization (custom headers, different body per request), use `prepareSendMessagesRequest`:

* [  JavaScript ](#tab-panel-3020)
* [  TypeScript ](#tab-panel-3021)

JavaScript

```

const { messages, sendMessage } = useAgentChat({

  agent,

  prepareSendMessagesRequest: async ({ messages, trigger }) => ({

    headers: { Authorization: `Bearer ${await getToken()}` },

    body: { requestedAt: Date.now() },

  }),

});


```

TypeScript

```

const { messages, sendMessage } = useAgentChat({

  agent,

  prepareSendMessagesRequest: async ({ messages, trigger }) => ({

    headers: { Authorization: `Bearer ${await getToken()}` },

    body: { requestedAt: Date.now() },

  }),

});


```

## Data parts

Data parts let you attach typed JSON to messages alongside text — progress indicators, source citations, token usage, or any structured data your UI needs.

### Writing data parts (server)

Use `createUIMessageStream` with `writer.write()` to send data parts from the server:

* [  JavaScript ](#tab-panel-3042)
* [  TypeScript ](#tab-panel-3043)

JavaScript

```

import {

  streamText,

  convertToModelMessages,

  createUIMessageStream,

  createUIMessageStreamResponse,

} from "ai";


export class ChatAgent extends AIChatAgent {

  async onChatMessage() {

    const workersai = createWorkersAI({ binding: this.env.AI });


    const stream = createUIMessageStream({

      execute: async ({ writer }) => {

        const result = streamText({

          model: workersai("@cf/zai-org/glm-4.7-flash"),

          messages: await convertToModelMessages(this.messages),

        });


        // Merge the LLM stream

        writer.merge(result.toUIMessageStream());


        // Write a data part — persisted to message.parts

        writer.write({

          type: "data-sources",

          id: "src-1",

          data: { query: "agents", status: "searching", results: [] },

        });


        // Later: update the same part in-place (same type + id)

        writer.write({

          type: "data-sources",

          id: "src-1",

          data: {

            query: "agents",

            status: "found",

            results: ["Agents SDK docs", "Durable Objects guide"],

          },

        });

      },

    });


    return createUIMessageStreamResponse({ stream });

  }

}


```

TypeScript

```

import {

  streamText,

  convertToModelMessages,

  createUIMessageStream,

  createUIMessageStreamResponse,

} from "ai";


export class ChatAgent extends AIChatAgent {

  async onChatMessage() {

    const workersai = createWorkersAI({ binding: this.env.AI });


    const stream = createUIMessageStream({

      execute: async ({ writer }) => {

        const result = streamText({

          model: workersai("@cf/zai-org/glm-4.7-flash"),

          messages: await convertToModelMessages(this.messages),

        });


        // Merge the LLM stream

        writer.merge(result.toUIMessageStream());


        // Write a data part — persisted to message.parts

        writer.write({

          type: "data-sources",

          id: "src-1",

          data: { query: "agents", status: "searching", results: [] },

        });


        // Later: update the same part in-place (same type + id)

        writer.write({

          type: "data-sources",

          id: "src-1",

          data: {

            query: "agents",

            status: "found",

            results: ["Agents SDK docs", "Durable Objects guide"],

          },

        });

      },

    });


    return createUIMessageStreamResponse({ stream });

  }

}


```

### Three patterns

| Pattern            | How                                          | Persisted? | Use case                              |
| ------------------ | -------------------------------------------- | ---------- | ------------------------------------- |
| **Reconciliation** | Same type \+ id → updates in-place           | Yes        | Progressive state (searching → found) |
| **Append**         | No id, or different id → appends             | Yes        | Log entries, multiple citations       |
| **Transient**      | transient: true → not added to message.parts | No         | Ephemeral status (thinking indicator) |

Transient parts are broadcast to connected clients in real time but excluded from SQLite persistence and `message.parts`. Use the `onData` callback to consume them.

### Reading data parts (client)

Non-transient data parts appear in `message.parts`. Use the `UIMessage` generic to type them:

* [  JavaScript ](#tab-panel-3032)
* [  TypeScript ](#tab-panel-3033)

JavaScript

```

import { useAgentChat } from "@cloudflare/ai-chat/react";

const { messages } = useAgentChat({ agent });


// Typed access — no casts needed

for (const msg of messages) {

  for (const part of msg.parts) {

    if (part.type === "data-sources") {

      console.log(part.data.results); // string[]

    }

  }

}


```

TypeScript

```

import { useAgentChat } from "@cloudflare/ai-chat/react";

import type { UIMessage } from "ai";


type ChatMessage = UIMessage<

  unknown,

  {

    sources: { query: string; status: string; results: string[] };

    usage: { model: string; inputTokens: number; outputTokens: number };

  }

>;


const { messages } = useAgentChat<unknown, ChatMessage>({ agent });


// Typed access — no casts needed

for (const msg of messages) {

  for (const part of msg.parts) {

    if (part.type === "data-sources") {

      console.log(part.data.results); // string[]

    }

  }

}


```

### Transient parts with `onData`

Transient data parts are not in `message.parts`. Use the `onData` callback instead:

* [  JavaScript ](#tab-panel-3026)
* [  TypeScript ](#tab-panel-3027)

JavaScript

```

const [thinking, setThinking] = useState(false);


const { messages } = useAgentChat({

  agent,

  onData(part) {

    if (part.type === "data-thinking") {

      setThinking(true);

    }

  },

});


```

TypeScript

```

const [thinking, setThinking] = useState(false);


const { messages } = useAgentChat<unknown, ChatMessage>({

  agent,

  onData(part) {

    if (part.type === "data-thinking") {

      setThinking(true);

    }

  },

});


```

On the server, write transient parts with `transient: true`:

* [  JavaScript ](#tab-panel-3024)
* [  TypeScript ](#tab-panel-3025)

JavaScript

```

writer.write({

  transient: true,

  type: "data-thinking",

  data: { model: "glm-4.7-flash", startedAt: new Date().toISOString() },

});


```

TypeScript

```

writer.write({

  transient: true,

  type: "data-thinking",

  data: { model: "glm-4.7-flash", startedAt: new Date().toISOString() },

});


```

`onData` fires on all code paths — new messages, stream resumption, and cross-tab broadcasts.

## Resumable streaming

Streams automatically resume when a client disconnects and reconnects. No configuration is needed — it works out of the box.

When streaming is active:

1. All chunks are buffered in SQLite as they are generated
2. If the client disconnects, the server continues streaming and buffering
3. When the client reconnects, it receives all buffered chunks and resumes live streaming

Disable with `resume: false`:

* [  JavaScript ](#tab-panel-3022)
* [  TypeScript ](#tab-panel-3023)

JavaScript

```

const { messages } = useAgentChat({ agent, resume: false });


```

TypeScript

```

const { messages } = useAgentChat({ agent, resume: false });


```

## Storage management

### Row size protection

SQLite rows have a maximum size of 2 MB. When a message approaches this limit (for example, a tool returning a very large output), `AIChatAgent` automatically compacts the message:

1. **Tool output compaction** — Large tool outputs are replaced with an LLM-friendly summary that instructs the model to suggest re-running the tool
2. **Text truncation** — If the message is still too large after tool compaction, text parts are truncated with a note

Compacted messages include `metadata.compactedToolOutputs` so clients can detect and display this gracefully.

### Controlling LLM context vs storage

Storage (`maxPersistedMessages`) and LLM context are independent:

| Concern                         | Control              | Scope       |
| ------------------------------- | -------------------- | ----------- |
| How many messages SQLite stores | maxPersistedMessages | Persistence |
| What the model sees             | pruneMessages()      | LLM context |
| Row size limits                 | Automatic compaction | Per-message |

* [  JavaScript ](#tab-panel-3038)
* [  TypeScript ](#tab-panel-3039)

JavaScript

```

export class ChatAgent extends AIChatAgent {

  async onChatMessage() {

    const result = streamText({

      model: workersai("@cf/zai-org/glm-4.7-flash"),

      messages: pruneMessages({

        // LLM context limit

        messages: await convertToModelMessages(this.messages),

        reasoning: "before-last-message",

        toolCalls: "before-last-2-messages",

      }),

    });


    return result.toUIMessageStreamResponse();

  }

}


```

TypeScript

```

export class ChatAgent extends AIChatAgent {

  async onChatMessage() {

    const result = streamText({

      model: workersai("@cf/zai-org/glm-4.7-flash"),

      messages: pruneMessages({

        // LLM context limit

        messages: await convertToModelMessages(this.messages),

        reasoning: "before-last-message",

        toolCalls: "before-last-2-messages",

      }),

    });


    return result.toUIMessageStreamResponse();

  }

}


```

## Using different AI providers

`AIChatAgent` works with any AI SDK-compatible provider. The server code determines which model to use — the client does not need to change it manually.

### Workers AI (Cloudflare)

* [  JavaScript ](#tab-panel-3028)
* [  TypeScript ](#tab-panel-3029)

JavaScript

```

import { createWorkersAI } from "workers-ai-provider";


const workersai = createWorkersAI({ binding: this.env.AI });

const result = streamText({

  model: workersai("@cf/zai-org/glm-4.7-flash"),

  messages: await convertToModelMessages(this.messages),

});


```

TypeScript

```

import { createWorkersAI } from "workers-ai-provider";


const workersai = createWorkersAI({ binding: this.env.AI });

const result = streamText({

  model: workersai("@cf/zai-org/glm-4.7-flash"),

  messages: await convertToModelMessages(this.messages),

});


```

### OpenAI

* [  JavaScript ](#tab-panel-3030)
* [  TypeScript ](#tab-panel-3031)

JavaScript

```

import { createOpenAI } from "@ai-sdk/openai";


const openai = createOpenAI({ apiKey: this.env.OPENAI_API_KEY });

const result = streamText({

  model: openai.chat("gpt-4o"),

  messages: await convertToModelMessages(this.messages),

});


```

TypeScript

```

import { createOpenAI } from "@ai-sdk/openai";


const openai = createOpenAI({ apiKey: this.env.OPENAI_API_KEY });

const result = streamText({

  model: openai.chat("gpt-4o"),

  messages: await convertToModelMessages(this.messages),

});


```

### Anthropic

* [  JavaScript ](#tab-panel-3034)
* [  TypeScript ](#tab-panel-3035)

JavaScript

```

import { createAnthropic } from "@ai-sdk/anthropic";


const anthropic = createAnthropic({ apiKey: this.env.ANTHROPIC_API_KEY });

const result = streamText({

  model: anthropic("claude-sonnet-4-20250514"),

  messages: await convertToModelMessages(this.messages),

});


```

TypeScript

```

import { createAnthropic } from "@ai-sdk/anthropic";


const anthropic = createAnthropic({ apiKey: this.env.ANTHROPIC_API_KEY });

const result = streamText({

  model: anthropic("claude-sonnet-4-20250514"),

  messages: await convertToModelMessages(this.messages),

});


```

## Advanced patterns

Since `onChatMessage` gives you full control over the `streamText` call, you can use any AI SDK feature directly. The patterns below all work out of the box — no special `AIChatAgent` configuration is needed.

### Dynamic model and tool control

Use [prepareStep ↗](https://ai-sdk.dev/docs/agents/loop-control) to change the model, available tools, or system prompt between steps in a multi-step agent loop:

* [  JavaScript ](#tab-panel-3046)
* [  TypeScript ](#tab-panel-3047)

JavaScript

```

import { streamText, convertToModelMessages, tool, stepCountIs } from "ai";

import { z } from "zod";


export class ChatAgent extends AIChatAgent {

  async onChatMessage() {

    const result = streamText({

      model: cheapModel, // Default model for simple steps

      messages: await convertToModelMessages(this.messages),

      tools: {

        search: searchTool,

        analyze: analyzeTool,

        summarize: summarizeTool,

      },

      stopWhen: stepCountIs(10),

      prepareStep: async ({ stepNumber, messages }) => {

        // Phase 1: Search (steps 0-2)

        if (stepNumber <= 2) {

          return {

            activeTools: ["search"],

            toolChoice: "required", // Force tool use

          };

        }


        // Phase 2: Analyze with a stronger model (steps 3-5)

        if (stepNumber <= 5) {

          return {

            model: expensiveModel,

            activeTools: ["analyze"],

          };

        }


        // Phase 3: Summarize

        return { activeTools: ["summarize"] };

      },

    });


    return result.toUIMessageStreamResponse();

  }

}


```

TypeScript

```

import { streamText, convertToModelMessages, tool, stepCountIs } from "ai";

import { z } from "zod";


export class ChatAgent extends AIChatAgent {

  async onChatMessage() {

    const result = streamText({

      model: cheapModel, // Default model for simple steps

      messages: await convertToModelMessages(this.messages),

      tools: {

        search: searchTool,

        analyze: analyzeTool,

        summarize: summarizeTool,

      },

      stopWhen: stepCountIs(10),

      prepareStep: async ({ stepNumber, messages }) => {

        // Phase 1: Search (steps 0-2)

        if (stepNumber <= 2) {

          return {

            activeTools: ["search"],

            toolChoice: "required", // Force tool use

          };

        }


        // Phase 2: Analyze with a stronger model (steps 3-5)

        if (stepNumber <= 5) {

          return {

            model: expensiveModel,

            activeTools: ["analyze"],

          };

        }


        // Phase 3: Summarize

        return { activeTools: ["summarize"] };

      },

    });


    return result.toUIMessageStreamResponse();

  }

}


```

`prepareStep` runs before each step and can return overrides for `model`, `activeTools`, `toolChoice`, `system`, and `messages`. Use it to:

* **Switch models** — use a cheap model for simple steps, escalate for reasoning
* **Phase tools** — restrict which tools are available at each step
* **Manage context** — prune or transform messages to stay within token limits
* **Force tool calls** — use `toolChoice: { type: "tool", toolName: "search" }` to require a specific tool

### Language model middleware

Use [wrapLanguageModel ↗](https://ai-sdk.dev/docs/ai-sdk-core/middleware) to add guardrails, RAG, caching, or logging without modifying your chat logic:

* [  JavaScript ](#tab-panel-3044)
* [  TypeScript ](#tab-panel-3045)

JavaScript

```

import { streamText, convertToModelMessages, wrapLanguageModel } from "ai";

const guardrailMiddleware = {

  wrapGenerate: async ({ doGenerate }) => {

    const { text, ...rest } = await doGenerate();

    // Filter PII or sensitive content from the response

    const cleaned = text?.replace(/\b\d{3}-\d{2}-\d{4}\b/g, "[REDACTED]");

    return { text: cleaned, ...rest };

  },

};


export class ChatAgent extends AIChatAgent {

  async onChatMessage() {

    const model = wrapLanguageModel({

      model: baseModel,

      middleware: [guardrailMiddleware],

    });


    const result = streamText({

      model,

      messages: await convertToModelMessages(this.messages),

    });


    return result.toUIMessageStreamResponse();

  }

}


```

TypeScript

```

import { streamText, convertToModelMessages, wrapLanguageModel } from "ai";

import type { LanguageModelV3Middleware } from "@ai-sdk/provider";


const guardrailMiddleware: LanguageModelV3Middleware = {

  wrapGenerate: async ({ doGenerate }) => {

    const { text, ...rest } = await doGenerate();

    // Filter PII or sensitive content from the response

    const cleaned = text?.replace(/\b\d{3}-\d{2}-\d{4}\b/g, "[REDACTED]");

    return { text: cleaned, ...rest };

  },

};


export class ChatAgent extends AIChatAgent {

  async onChatMessage() {

    const model = wrapLanguageModel({

      model: baseModel,

      middleware: [guardrailMiddleware],

    });


    const result = streamText({

      model,

      messages: await convertToModelMessages(this.messages),

    });


    return result.toUIMessageStreamResponse();

  }

}


```

The AI SDK includes built-in middlewares:

* `extractReasoningMiddleware` — surface chain-of-thought from models like DeepSeek R1
* `defaultSettingsMiddleware` — apply default temperature, max tokens, etc.
* `simulateStreamingMiddleware` — add streaming to non-streaming models

Multiple middlewares compose in order: `middleware: [first, second]` applies as `first(second(model))`.

### Structured output

Use [generateObject ↗](https://ai-sdk.dev/docs/ai-sdk-core/generating-structured-data) inside tools for structured data extraction:

* [  JavaScript ](#tab-panel-3048)
* [  TypeScript ](#tab-panel-3049)

JavaScript

```

import {

  streamText,

  generateObject,

  convertToModelMessages,

  tool,

  stepCountIs,

} from "ai";

import { z } from "zod";


export class ChatAgent extends AIChatAgent {

  async onChatMessage() {

    const result = streamText({

      model: myModel,

      messages: await convertToModelMessages(this.messages),

      tools: {

        extractContactInfo: tool({

          description:

            "Extract structured contact information from the conversation",

          inputSchema: z.object({

            text: z.string().describe("The text to extract contact info from"),

          }),

          execute: async ({ text }) => {

            const { object } = await generateObject({

              model: myModel,

              schema: z.object({

                name: z.string(),

                email: z.string().email(),

                phone: z.string().optional(),

              }),

              prompt: `Extract contact information from: ${text}`,

            });

            return object;

          },

        }),

      },

      stopWhen: stepCountIs(5),

    });


    return result.toUIMessageStreamResponse();

  }

}


```

TypeScript

```

import {

  streamText,

  generateObject,

  convertToModelMessages,

  tool,

  stepCountIs,

} from "ai";

import { z } from "zod";


export class ChatAgent extends AIChatAgent {

  async onChatMessage() {

    const result = streamText({

      model: myModel,

      messages: await convertToModelMessages(this.messages),

      tools: {

        extractContactInfo: tool({

          description:

            "Extract structured contact information from the conversation",

          inputSchema: z.object({

            text: z.string().describe("The text to extract contact info from"),

          }),

          execute: async ({ text }) => {

            const { object } = await generateObject({

              model: myModel,

              schema: z.object({

                name: z.string(),

                email: z.string().email(),

                phone: z.string().optional(),

              }),

              prompt: `Extract contact information from: ${text}`,

            });

            return object;

          },

        }),

      },

      stopWhen: stepCountIs(5),

    });


    return result.toUIMessageStreamResponse();

  }

}


```

### Subagent delegation

Note

This section covers **in-process** subagents using the AI SDK's `ToolLoopAgent`. For **Durable Object sub-agents** with their own isolated storage and typed RPC, refer to [Sub-agents](https://developers.cloudflare.com/agents/api-reference/sub-agents/). For streaming full LLM turns through a child agent, refer to [Think: Sub-agent RPC](https://developers.cloudflare.com/agents/api-reference/think/#sub-agent-rpc-and-programmatic-turns).

Tools can delegate work to focused sub-calls with their own context. Use [ToolLoopAgent ↗](https://ai-sdk.dev/docs/reference/ai-sdk-core/tool-loop-agent) to define a reusable agent, then call it from a tool's `execute`:

* [  JavaScript ](#tab-panel-3050)
* [  TypeScript ](#tab-panel-3051)

JavaScript

```

import {

  ToolLoopAgent,

  streamText,

  convertToModelMessages,

  tool,

  stepCountIs,

} from "ai";

import { z } from "zod";


// Define a reusable research agent with its own tools and instructions

const researchAgent = new ToolLoopAgent({

  model: researchModel,

  instructions: "You are a research assistant. Be thorough and cite sources.",

  tools: { webSearch: webSearchTool },

  stopWhen: stepCountIs(10),

});


export class ChatAgent extends AIChatAgent {

  async onChatMessage() {

    const result = streamText({

      model: orchestratorModel,

      messages: await convertToModelMessages(this.messages),

      tools: {

        deepResearch: tool({

          description: "Research a topic in depth",

          inputSchema: z.object({

            topic: z.string().describe("The topic to research"),

          }),

          execute: async ({ topic }) => {

            const { text } = await researchAgent.generate({

              prompt: topic,

            });

            return { summary: text };

          },

        }),

      },

      stopWhen: stepCountIs(5),

    });


    return result.toUIMessageStreamResponse();

  }

}


```

TypeScript

```

import {

  ToolLoopAgent,

  streamText,

  convertToModelMessages,

  tool,

  stepCountIs,

} from "ai";

import { z } from "zod";


// Define a reusable research agent with its own tools and instructions

const researchAgent = new ToolLoopAgent({

  model: researchModel,

  instructions: "You are a research assistant. Be thorough and cite sources.",

  tools: { webSearch: webSearchTool },

  stopWhen: stepCountIs(10),

});


export class ChatAgent extends AIChatAgent {

  async onChatMessage() {

    const result = streamText({

      model: orchestratorModel,

      messages: await convertToModelMessages(this.messages),

      tools: {

        deepResearch: tool({

          description: "Research a topic in depth",

          inputSchema: z.object({

            topic: z.string().describe("The topic to research"),

          }),

          execute: async ({ topic }) => {

            const { text } = await researchAgent.generate({

              prompt: topic,

            });

            return { summary: text };

          },

        }),

      },

      stopWhen: stepCountIs(5),

    });


    return result.toUIMessageStreamResponse();

  }

}


```

The research agent runs in its own context — its token budget is separate from the orchestrator's. Only the summary goes back to the parent model.

Note

`ToolLoopAgent` is best suited for subagents, not as a replacement for `streamText` in `onChatMessage` itself. The main `onChatMessage` benefits from direct access to `this.env`, `this.messages`, and `options.body` — things that a pre-configured `ToolLoopAgent` instance cannot reference.

#### Streaming progress with preliminary results

By default, a tool part appears as loading until `execute` returns. Use an async generator (`async function*`) to stream progress updates to the client while the tool is still working:

* [  JavaScript ](#tab-panel-3040)
* [  TypeScript ](#tab-panel-3041)

JavaScript

```

deepResearch: tool({

  description: "Research a topic in depth",

  inputSchema: z.object({

    topic: z.string().describe("The topic to research"),

  }),

  async *execute({ topic }) {

    // Preliminary result — the client sees "searching" immediately

    yield { status: "searching", topic, summary: undefined };


    const { text } = await researchAgent.generate({ prompt: topic });


    // Final result — sent to the model for its next step

    yield { status: "done", topic, summary: text };

  },

});


```

TypeScript

```

deepResearch: tool({

  description: "Research a topic in depth",

  inputSchema: z.object({

    topic: z.string().describe("The topic to research"),

  }),

  async *execute({ topic }) {

    // Preliminary result — the client sees "searching" immediately

    yield { status: "searching", topic, summary: undefined };


    const { text } = await researchAgent.generate({ prompt: topic });


    // Final result — sent to the model for its next step

    yield { status: "done", topic, summary: text };

  },

});


```

Each `yield` updates the tool part on the client in real-time (with `preliminary: true`). The last yielded value becomes the final output that the model sees.

This pattern is useful when:

* A task requires exploring large amounts of information that would bloat the main context
* You want to show real-time progress for long-running tools
* You want to parallelize independent research (multiple tool calls run concurrently)
* You need different models or system prompts for different subtasks

For more, refer to the [AI SDK Agents docs ↗](https://ai-sdk.dev/docs/agents/overview), [Subagents ↗](https://ai-sdk.dev/docs/agents/subagents), and [Preliminary Tool Results ↗](https://ai-sdk.dev/docs/ai-sdk-core/tools-and-tool-calling#preliminary-tool-results).

## Multi-client sync

When multiple clients connect to the same agent instance, messages are automatically broadcast to all connections. If one client sends a message, all other connected clients receive the updated message list.

```

Client A ──── sendMessage("Hello") ────▶ AIChatAgent

                                              │

                                        persist + stream

                                              │

Client A ◀── CF_AGENT_USE_CHAT_RESPONSE ──────┤

Client B ◀── CF_AGENT_CHAT_MESSAGES ──────────┘


```

The originating client receives the streaming response. All other clients receive the final messages via a `CF_AGENT_CHAT_MESSAGES` broadcast.

## API reference

### Exports

| Import path               | Exports                                                                             |
| ------------------------- | ----------------------------------------------------------------------------------- |
| @cloudflare/ai-chat       | AIChatAgent, createToolsFromClientSchemas, ChatRecoveryContext, ChatRecoveryOptions |
| @cloudflare/ai-chat/react | useAgentChat                                                                        |
| @cloudflare/ai-chat/types | MessageType, OutgoingMessage, IncomingMessage                                       |

### WebSocket protocol

The chat protocol uses typed JSON messages over WebSocket:

| Message                            | Direction       | Purpose                     |
| ---------------------------------- | --------------- | --------------------------- |
| CF\_AGENT\_USE\_CHAT\_REQUEST      | Client → Server | Send a chat message         |
| CF\_AGENT\_USE\_CHAT\_RESPONSE     | Server → Client | Stream response chunks      |
| CF\_AGENT\_CHAT\_MESSAGES          | Server → Client | Broadcast updated messages  |
| CF\_AGENT\_CHAT\_CLEAR             | Bidirectional   | Clear conversation          |
| CF\_AGENT\_CHAT\_REQUEST\_CANCEL   | Client → Server | Cancel active stream        |
| CF\_AGENT\_TOOL\_RESULT            | Client → Server | Provide tool output         |
| CF\_AGENT\_TOOL\_APPROVAL          | Client → Server | Approve or reject a tool    |
| CF\_AGENT\_MESSAGE\_UPDATED        | Server → Client | Notify of message update    |
| CF\_AGENT\_STREAM\_RESUMING        | Server → Client | Notify of stream resumption |
| CF\_AGENT\_STREAM\_RESUME\_REQUEST | Client → Server | Request stream resume check |

## Deprecated APIs

The following APIs are deprecated and will emit a console warning when used. They will be removed in a future release.

| Deprecated                            | Replacement                                   | Notes                                           |
| ------------------------------------- | --------------------------------------------- | ----------------------------------------------- |
| addToolResult({ toolCallId, result }) | addToolOutput({ toolCallId, output })         | Renamed for consistency with AI SDK terminology |
| createToolsFromClientSchemas()        | Client tools are now registered automatically | No manual schema conversion needed              |
| extractClientToolSchemas()            | Client tools are now registered automatically | Schemas are sent with tool results              |
| detectToolsRequiringConfirmation()    | Use needsApproval on the tool definition      | Approval is now per-tool, not a global filter   |
| tools option on useAgentChat          | Define tools in onChatMessage on the server   | All tool definitions belong on the server       |
| toolsRequiringConfirmation option     | Use needsApproval on individual tools         | Per-tool approval replaces global list          |

If you are upgrading from an earlier version, replace deprecated calls with their replacements. The deprecated APIs still work but will be removed in a future major version.

## Next steps

[ Client SDK ](https://developers.cloudflare.com/agents/api-reference/client-sdk/) useAgent hook and AgentClient class. 

[ Human-in-the-loop ](https://developers.cloudflare.com/agents/concepts/human-in-the-loop/) Approval flows and manual intervention patterns. 

[ Build a chat agent ](https://developers.cloudflare.com/agents/getting-started/build-a-chat-agent/) Step-by-step tutorial for building your first chat agent. 

[ Durable execution ](https://developers.cloudflare.com/agents/api-reference/durable-execution/) runFiber(), stash(), and crash recovery for long-running work. 

[ Long-running agents ](https://developers.cloudflare.com/agents/concepts/long-running-agents/) Lifecycle, recovery patterns, and provider-specific strategies. 

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/agents/","name":"Agents"}},{"@type":"ListItem","position":3,"item":{"@id":"/agents/api-reference/","name":"API Reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/agents/api-reference/chat-agents/","name":"Chat agents"}}]}
```
