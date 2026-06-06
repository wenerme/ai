---
title: Client tools
description: Browser-side tools, approval flows, auto-continuation, message concurrency, and multi-tab broadcast for Think agents.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/agents/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Client tools

Think supports tools that execute in the browser. The client sends serializable tool schemas in the chat request body, Think merges them with server tools, and when the LLM calls a client tool, the call is routed to the client for execution.

## Defining client tools

For dynamic client-side tools, pass `tools` to `useAgentChat`. Tools with an `execute` function are registered with the server as client-executed tools:

* [  JavaScript ](#tab-panel-5096)
* [  TypeScript ](#tab-panel-5097)

JavaScript

```

const { messages, sendMessage } = useAgentChat({

  agent,

  tools: {

    getUserTimezone: {

      description: "Get the user's timezone from their browser",

      parameters: {},

      execute: async () => {

        return Intl.DateTimeFormat().resolvedOptions().timeZone;

      },

    },

    getClipboard: {

      description: "Read text from the user's clipboard",

      parameters: {},

      execute: async () => {

        return navigator.clipboard.readText();

      },

    },

  },

});


```

TypeScript

```

const { messages, sendMessage } = useAgentChat({

  agent,

  tools: {

    getUserTimezone: {

      description: "Get the user's timezone from their browser",

      parameters: {},

      execute: async () => {

        return Intl.DateTimeFormat().resolvedOptions().timeZone;

      },

    },

    getClipboard: {

      description: "Read text from the user's clipboard",

      parameters: {},

      execute: async () => {

        return navigator.clipboard.readText();

      },

    },

  },

});


```

Client tools are tools without an `execute` function on the server — they only have a schema. When the LLM produces a tool call for one, Think routes it to the client.

For most apps, prefer defining tools on the server and using `onToolCall` for browser-only execution. The `tools` option is most useful for SDKs or platforms where the browser decides the available tool surface at runtime.

## Approval flow

Handle browser-side tool execution on the client with `onToolCall`:

* [  JavaScript ](#tab-panel-5094)
* [  TypeScript ](#tab-panel-5095)

JavaScript

```

useAgentChat({

  agent,

  onToolCall: async ({ toolCall, addToolOutput }) => {

    if (toolCall.toolName === "read") {

      const result = await readFromBrowser(toolCall.input);

      addToolOutput({

        toolCallId: toolCall.toolCallId,

        output: result,

      });

    }

  },

});


```

TypeScript

```

useAgentChat({

  agent,

  onToolCall: async ({ toolCall, addToolOutput }) => {

    if (toolCall.toolName === "read") {

      const result = await readFromBrowser(toolCall.input);

      addToolOutput({

        toolCallId: toolCall.toolCallId,

        output: result,

      });

    }

  },

});


```

## Auto-continuation

After a client tool result is received, Think automatically continues the conversation without a new user message. The continuation turn has `continuation: true` in the `TurnContext`, which you can use in `beforeTurn` to adjust model or tool selection.

When a turn produces several client tool calls at once, Think waits for **all** of their results before starting a single continuation, instead of starting one continuation per result. An immediate resume request that arrives while a continuation is already pending attaches to that pending continuation rather than starting a duplicate, and server-side `needsApproval` continuations resume reliably once the approval is recorded.

## Survive restarts while waiting for a human

A Durable Object can be evicted at any time, including while a turn is paused on an approval prompt or a client-side tool call. Because `Think` enables [chatRecovery](https://developers.cloudflare.com/agents/harnesses/think/recovery/) by default, the SDK treats such a turn as waiting on the human, not stuck. It parks the turn instead of failing it, and the user's eventual approval or tool result resumes the conversation.

For which interactions are exempt from recovery budgets, refer to [Turns waiting on a human are not sealed](https://developers.cloudflare.com/agents/communication-channels/chat/chat-agents/#turns-waiting-on-a-human-are-not-sealed).

## Message concurrency

The `messageConcurrency` property controls how overlapping user submits behave when a chat turn is already active.

| Strategy                                      | Behavior                                                                                                                            |
| --------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| "queue"                                       | Queue every submit and process them in order. Default.                                                                              |
| "latest"                                      | Keep only the latest overlapping submission; superseded submissions still persist their user messages but do not start a model turn |
| "merge"                                       | Queue overlapping submissions, then collapse their trailing user messages into one combined turn before the latest queued turn runs |
| "drop"                                        | Ignore overlapping submits entirely. Messages are not persisted.                                                                    |
| { strategy: "debounce", debounceMs?: number } | Trailing-edge latest with a quiet window (default 750ms).                                                                           |

* [  JavaScript ](#tab-panel-5092)
* [  TypeScript ](#tab-panel-5093)

JavaScript

```

import { Think } from "@cloudflare/think";


export class SearchAgent extends Think {

  messageConcurrency = "latest";

  getModel() {

    /* ... */

  }

}


```

TypeScript

```

import { Think } from "@cloudflare/think";

import type { MessageConcurrency } from "@cloudflare/think";


export class SearchAgent extends Think<Env> {

  override messageConcurrency: MessageConcurrency = "latest";

  getModel() {

    /* ... */

  }

}


```

## Multi-tab broadcast

Think broadcasts streaming responses to all connected WebSocket clients. When multiple browser tabs are connected to the same agent, all tabs see the streamed response in real time. Tool call states (pending, result, approval) are broadcast to all tabs.

Programmatic `chat()` turns and `clearMessages()` also broadcast message updates to connected `useAgentChat` clients, so browser clients stay in sync without reconnecting.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/agents/","name":"Agents"}},{"@type":"ListItem","position":3,"item":{"@id":"/agents/harnesses/","name":"Harnesses"}},{"@type":"ListItem","position":4,"item":{"@id":"/agents/harnesses/think/","name":"Think"}},{"@type":"ListItem","position":5,"item":{"@id":"/agents/harnesses/think/client-tools/","name":"Client tools"}}]}
```
