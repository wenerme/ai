---
title: Codemode
description: Let LLMs write and execute JavaScript to orchestrate multiple tool calls in a secure sandbox using Codemode.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/agents/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

### Tags

[ AI ](https://developers.cloudflare.com/search/?tags=AI) 

# Codemode

Beta 

Codemode lets LLMs write and execute code that orchestrates your tools, instead of calling them one at a time. Inspired by [CodeAct ↗](https://machinelearning.apple.com/research/codeact), it works because LLMs are better at writing code than making individual tool calls — they have seen millions of lines of real-world code but only contrived tool-calling examples.

The `@cloudflare/codemode` package generates TypeScript type definitions from your tools, gives the LLM a single "write code" tool, and executes the generated JavaScript in a secure, isolated Worker sandbox.

Warning

Codemode is experimental and may have breaking changes in future releases. Use with caution in production.

## When to use Codemode

Codemode is most useful when the LLM needs to:

* **Chain multiple tool calls** with logic between them (conditionals, loops, error handling)
* **Compose results** from different tools before returning
* **Work with MCP servers** that expose many fine-grained operations
* **Perform multi-step workflows** that would require many round-trips with standard tool calling

For simple, single tool calls, standard AI SDK tool calling is simpler and sufficient.

## Installation

Terminal window

```

npm install @cloudflare/codemode


```

If you use `@cloudflare/codemode/ai`, also install the `ai` and `zod` peer dependencies:

Terminal window

```

npm install ai zod


```

## Quick start

### 1\. Define your tools

Use the standard AI SDK `tool()` function:

* [  JavaScript ](#tab-panel-3456)
* [  TypeScript ](#tab-panel-3457)

JavaScript

```

import { tool } from "ai";

import { z } from "zod";


const tools = {

  getWeather: tool({

    description: "Get weather for a location",

    inputSchema: z.object({ location: z.string() }),

    execute: async ({ location }) => `Weather in ${location}: 72°F, sunny`,

  }),

  sendEmail: tool({

    description: "Send an email",

    inputSchema: z.object({

      to: z.string(),

      subject: z.string(),

      body: z.string(),

    }),

    execute: async ({ to, subject, body }) => `Email sent to ${to}`,

  }),

};


```

TypeScript

```

import { tool } from "ai";

import { z } from "zod";


const tools = {

  getWeather: tool({

    description: "Get weather for a location",

    inputSchema: z.object({ location: z.string() }),

    execute: async ({ location }) => `Weather in ${location}: 72°F, sunny`,

  }),

  sendEmail: tool({

    description: "Send an email",

    inputSchema: z.object({

      to: z.string(),

      subject: z.string(),

      body: z.string(),

    }),

    execute: async ({ to, subject, body }) => `Email sent to ${to}`,

  }),

};


```

### 2\. Create the codemode tool

`createCodeTool` takes your tools and an executor, and returns a single AI SDK tool:

* [  JavaScript ](#tab-panel-3448)
* [  TypeScript ](#tab-panel-3449)

JavaScript

```

import { createCodeTool } from "@cloudflare/codemode/ai";

import { DynamicWorkerExecutor } from "@cloudflare/codemode";


const executor = new DynamicWorkerExecutor({

  loader: env.LOADER,

});


const codemode = createCodeTool({ tools, executor });


```

TypeScript

```

import { createCodeTool } from "@cloudflare/codemode/ai";

import { DynamicWorkerExecutor } from "@cloudflare/codemode";


const executor = new DynamicWorkerExecutor({

  loader: env.LOADER,

});


const codemode = createCodeTool({ tools, executor });


```

### 3\. Use with streamText

Pass the codemode tool to `streamText` or `generateText` like any other tool. You choose the model:

* [  JavaScript ](#tab-panel-3452)
* [  TypeScript ](#tab-panel-3453)

JavaScript

```

import { streamText } from "ai";


const result = streamText({

  model,

  system: "You are a helpful assistant.",

  messages,

  tools: { codemode },

});


```

TypeScript

```

import { streamText } from "ai";


const result = streamText({

  model,

  system: "You are a helpful assistant.",

  messages,

  tools: { codemode },

});


```

When the LLM decides to use codemode, it writes an async arrow function like:

JavaScript

```

async () => {

  const weather = await codemode.getWeather({ location: "London" });

  if (weather.includes("sunny")) {

    await codemode.sendEmail({

      to: "team@example.com",

      subject: "Nice day!",

      body: `It's ${weather}`,

    });

  }

  return { weather, notified: true };

};


```

The code runs in an isolated Worker sandbox, tool calls are dispatched back to the host via Workers RPC, and the result is returned to the LLM.

## Configuration

### Wrangler bindings

Add a `worker_loaders` binding to your `wrangler.jsonc`. This is the only binding required:

* [  wrangler.jsonc ](#tab-panel-3446)
* [  wrangler.toml ](#tab-panel-3447)

JSONC

```

{

  "$schema": "./node_modules/wrangler/config-schema.json",

  "worker_loaders": [

    {

      "binding": "LOADER"

    }

  ],

  "compatibility_flags": [

    "nodejs_compat"

  ]

}


```

TOML

```

worker_loaders = [{ binding = "LOADER" }]

compatibility_flags = ["nodejs_compat"]


```

## How it works

1. `createCodeTool` generates TypeScript type definitions from your tools and builds a description the LLM can read.
2. The LLM writes an async arrow function that calls `codemode.toolName(args)`.
3. The code is normalized via AST parsing (acorn) and sent to the executor.
4. `DynamicWorkerExecutor` spins up an isolated Worker via `WorkerLoader`.
5. Inside the sandbox, a `Proxy` intercepts `codemode.*` calls and routes them back to the host via Workers RPC (`ToolDispatcher extends RpcTarget`).
6. Console output (`console.log`, `console.warn`, `console.error`) is captured and returned in the result.

### Network isolation

External `fetch()` and `connect()` are blocked by default — enforced at the Workers runtime level via `globalOutbound: null`. Sandboxed code can only interact with the host through `codemode.*` tool calls.

To allow controlled outbound access, pass a `Fetcher`:

* [  JavaScript ](#tab-panel-3450)
* [  TypeScript ](#tab-panel-3451)

JavaScript

```

const executor = new DynamicWorkerExecutor({

  loader: env.LOADER,

  globalOutbound: null, // default — fully isolated

  // globalOutbound: env.MY_OUTBOUND_SERVICE  // route through a Fetcher

});


```

TypeScript

```

const executor = new DynamicWorkerExecutor({

  loader: env.LOADER,

  globalOutbound: null, // default — fully isolated

  // globalOutbound: env.MY_OUTBOUND_SERVICE  // route through a Fetcher

});


```

## Using with an Agent

The typical pattern is to create the executor and codemode tool inside an Agent's message handler:

* [  JavaScript ](#tab-panel-3468)
* [  TypeScript ](#tab-panel-3469)

JavaScript

```

import { Agent } from "agents";

import { createCodeTool } from "@cloudflare/codemode/ai";

import { DynamicWorkerExecutor } from "@cloudflare/codemode";

import { streamText, convertToModelMessages, stepCountIs } from "ai";


export class MyAgent extends Agent {

  async onChatMessage() {

    const executor = new DynamicWorkerExecutor({

      loader: this.env.LOADER,

    });


    const codemode = createCodeTool({

      tools: myTools,

      executor,

    });


    const result = streamText({

      model,

      system: "You are a helpful assistant.",

      messages: await convertToModelMessages(this.state.messages),

      tools: { codemode },

      stopWhen: stepCountIs(10),

    });


    // Stream response back to client...

  }

}


```

TypeScript

```

import { Agent } from "agents";

import { createCodeTool } from "@cloudflare/codemode/ai";

import { DynamicWorkerExecutor } from "@cloudflare/codemode";

import { streamText, convertToModelMessages, stepCountIs } from "ai";


export class MyAgent extends Agent<Env, State> {

  async onChatMessage() {

    const executor = new DynamicWorkerExecutor({

      loader: this.env.LOADER,

    });


    const codemode = createCodeTool({

      tools: myTools,

      executor,

    });


    const result = streamText({

      model,

      system: "You are a helpful assistant.",

      messages: await convertToModelMessages(this.state.messages),

      tools: { codemode },

      stopWhen: stepCountIs(10),

    });


    // Stream response back to client...

  }

}


```

### With MCP tools

MCP tools work the same way — merge them into the tool set:

* [  JavaScript ](#tab-panel-3454)
* [  TypeScript ](#tab-panel-3455)

JavaScript

```

const codemode = createCodeTool({

  tools: {

    ...myTools,

    ...this.mcp.getAITools(),

  },

  executor,

});


```

TypeScript

```

const codemode = createCodeTool({

  tools: {

    ...myTools,

    ...this.mcp.getAITools(),

  },

  executor,

});


```

Tool names with hyphens or dots (common in MCP) are automatically sanitized to valid JavaScript identifiers (for example, `my-server.list-items` becomes `my_server_list_items`).

### Browser executor with dynamic client tools

If your tools live in the browser instead of the Agent, build codemode from those browser-side functions and register it with your client tool layer. This keeps the server generic while running generated code in an iframe sandbox on the page.

**Server:**

* [  JavaScript ](#tab-panel-3462)
* [  TypeScript ](#tab-panel-3463)

JavaScript

```

import { AIChatAgent, createToolsFromClientSchemas } from "@cloudflare/ai-chat";

import { convertToModelMessages, stepCountIs, streamText } from "ai";


export class BrowserCodemodeAgent extends AIChatAgent {

  async onChatMessage(_onFinish, options) {

    const result = streamText({

      model: this.env.MODEL,

      messages: await convertToModelMessages(this.messages),

      tools: createToolsFromClientSchemas(options?.clientTools),

      stopWhen: stepCountIs(10),

    });


    return result.toUIMessageStreamResponse();

  }

}


```

TypeScript

```

import { AIChatAgent, createToolsFromClientSchemas } from "@cloudflare/ai-chat";

import { convertToModelMessages, stepCountIs, streamText } from "ai";


export class BrowserCodemodeAgent extends AIChatAgent<Env> {

  async onChatMessage(_onFinish, options) {

    const result = streamText({

      model: this.env.MODEL,

      messages: await convertToModelMessages(this.messages),

      tools: createToolsFromClientSchemas(options?.clientTools),

      stopWhen: stepCountIs(10),

    });


    return result.toUIMessageStreamResponse();

  }

}


```

**Client:**

* [  JavaScript ](#tab-panel-3472)
* [  TypeScript ](#tab-panel-3473)

JavaScript

```

import { useAgent } from "agents/react";

import { useAgentChat } from "@cloudflare/ai-chat/react";

import {

  IframeSandboxExecutor,

  createBrowserCodeTool,

} from "@cloudflare/codemode/browser";


const codemode = createBrowserCodeTool({

  tools: {

    getPageTitle: {

      description: "Get the current page title",

      inputSchema: { type: "object", properties: {}, required: [] },

      execute: async () => ({ title: document.title }),

    },

  },

  executor: new IframeSandboxExecutor(),

});


const agent = useAgent({ agent: "BrowserCodemodeAgent" });

const tools = {

  codemode: {

    description: codemode.description,

    parameters: codemode.inputSchema,

    execute: codemode.execute,

  },

};


const { messages, sendMessage } = useAgentChat({ agent, tools });


```

TypeScript

```

import { useAgent } from "agents/react";

import { useAgentChat, type AITool } from "@cloudflare/ai-chat/react";

import {

  IframeSandboxExecutor,

  createBrowserCodeTool,

} from "@cloudflare/codemode/browser";


const codemode = createBrowserCodeTool({

  tools: {

    getPageTitle: {

      description: "Get the current page title",

      inputSchema: { type: "object", properties: {}, required: [] },

      execute: async () => ({ title: document.title }),

    },

  },

  executor: new IframeSandboxExecutor(),

});


const agent = useAgent({ agent: "BrowserCodemodeAgent" });

const tools: Record<string, AITool> = {

  codemode: {

    description: codemode.description,

    parameters: codemode.inputSchema,

    execute: codemode.execute,

  },

};


const { messages, sendMessage } = useAgentChat({ agent, tools });


```

This pattern is useful when the browser owns the tool surface at runtime, the page exposes client-side capabilities that only the browser can run, or you want codemode's typed code-generation prompt without routing tool execution through the server.

If you need approval-gated tools, use the standard `needsApproval` and `useAgentChat` approval flow described in [Human in the Loop](https://developers.cloudflare.com/agents/concepts/human-in-the-loop/). Codemode excludes tools with `needsApproval` instead of pausing execution for approval.

## MCP server wrappers

The `@cloudflare/codemode/mcp` export provides two functions that wrap MCP servers with Code Mode.

### `codeMcpServer`

Wraps an existing MCP server with a single `code` tool. Each upstream tool becomes a typed `codemode.*` method inside the sandbox:

* [  JavaScript ](#tab-panel-3458)
* [  TypeScript ](#tab-panel-3459)

JavaScript

```

import { codeMcpServer } from "@cloudflare/codemode/mcp";

import { DynamicWorkerExecutor } from "@cloudflare/codemode";


const executor = new DynamicWorkerExecutor({ loader: env.LOADER });

const server = await codeMcpServer({ server: upstreamMcp, executor });


```

TypeScript

```

import { codeMcpServer } from "@cloudflare/codemode/mcp";

import { DynamicWorkerExecutor } from "@cloudflare/codemode";


const executor = new DynamicWorkerExecutor({ loader: env.LOADER });

const server = await codeMcpServer({ server: upstreamMcp, executor });


```

### `openApiMcpServer`

Creates an MCP server with `search` and `execute` tools from an OpenAPI spec. All `$ref` pointers are resolved before being passed to the sandbox, and the host-side `request` handler keeps authentication out of the sandbox:

* [  JavaScript ](#tab-panel-3470)
* [  TypeScript ](#tab-panel-3471)

JavaScript

```

import { openApiMcpServer } from "@cloudflare/codemode/mcp";

import { DynamicWorkerExecutor } from "@cloudflare/codemode";


const executor = new DynamicWorkerExecutor({ loader: env.LOADER });

const server = openApiMcpServer({

  spec: openApiSpec,

  executor,

  request: async ({ method, path, query, body }) => {

    // Runs on the host — add auth headers here

    const res = await fetch(`https://api.example.com${path}`, {

      method,

      headers: { Authorization: `Bearer ${token}` },

      body: body ? JSON.stringify(body) : undefined,

    });

    return res.json();

  },

});


```

TypeScript

```

import { openApiMcpServer } from "@cloudflare/codemode/mcp";

import { DynamicWorkerExecutor } from "@cloudflare/codemode";


const executor = new DynamicWorkerExecutor({ loader: env.LOADER });

const server = openApiMcpServer({

  spec: openApiSpec,

  executor,

  request: async ({ method, path, query, body }) => {

    // Runs on the host — add auth headers here

    const res = await fetch(`https://api.example.com${path}`, {

      method,

      headers: { Authorization: `Bearer ${token}` },

      body: body ? JSON.stringify(body) : undefined,

    });

    return res.json();

  },

});


```

## The Executor interface

The `Executor` interface is deliberately minimal — implement it to run code in any sandbox:

TypeScript

```

interface Executor {

  execute(

    code: string,

    fns: Record<string, (...args: unknown[]) => Promise<unknown>>,

  ): Promise<ExecuteResult>;

}


interface ExecuteResult {

  result: unknown;

  error?: string;

  logs?: string[];

}


```

`DynamicWorkerExecutor` is the built-in Cloudflare Workers implementation. You can build your own for Node VM, QuickJS, containers, or any other sandbox.

## API reference

### `createCodeTool(options)`

Returns an AI SDK compatible `Tool`.

| Option      | Type                       | Default        | Description                                                  |
| ----------- | -------------------------- | -------------- | ------------------------------------------------------------ |
| tools       | ToolSet \| ToolDescriptors | required       | Your tools (AI SDK tool() or raw descriptors)                |
| executor    | Executor                   | required       | Where to run the generated code                              |
| description | string                     | auto-generated | Custom tool description. Use \\{\\{types\\}\\} for type defs |

### `DynamicWorkerExecutor`

Executes code in an isolated Cloudflare Worker via `WorkerLoader`.

| Option         | Type                   | Default  | Description                                                                         |
| -------------- | ---------------------- | -------- | ----------------------------------------------------------------------------------- |
| loader         | WorkerLoader           | required | Worker Loader binding from env.LOADER                                               |
| timeout        | number                 | 30000    | Execution timeout in ms                                                             |
| globalOutbound | Fetcher \| null        | null     | Network access control. null \= blocked, Fetcher \= routed                          |
| modules        | Record<string, string> | —        | Custom ES modules available in the sandbox. Keys are specifiers, values are source. |

Code and tool names are normalized and sanitized internally — you do not need to call `normalizeCode()` or `sanitizeToolName()` before passing them to `execute()`.

### `IframeSandboxExecutor`

Executes code in a sandboxed browser iframe. Import it from `@cloudflare/codemode/browser`.

| Option  | Type   | Default                                                       | Description                                                              |
| ------- | ------ | ------------------------------------------------------------- | ------------------------------------------------------------------------ |
| timeout | number | 30000                                                         | Execution timeout in ms. Cannot preempt tight synchronous browser loops. |
| csp     | string | default-src 'none'; script-src 'unsafe-inline' 'unsafe-eval'; | Content Security Policy applied to the sandbox iframe document.          |

### `generateTypes(tools)`

Generates TypeScript type definitions from your tools. Used internally by `createCodeTool` but exported for custom use (for example, displaying types in a frontend).

* [  JavaScript ](#tab-panel-3464)
* [  TypeScript ](#tab-panel-3465)

JavaScript

```

import { generateTypes } from "@cloudflare/codemode/ai";


const types = generateTypes(myTools);

// Returns:

// type CreateProjectInput = { name: string; description?: string }

// declare const codemode: {

//   createProject: (input: CreateProjectInput) => Promise<unknown>;

// }


```

TypeScript

```

import { generateTypes } from "@cloudflare/codemode/ai";


const types = generateTypes(myTools);

// Returns:

// type CreateProjectInput = { name: string; description?: string }

// declare const codemode: {

//   createProject: (input: CreateProjectInput) => Promise<unknown>;

// }


```

For JSON Schema inputs that do not depend on the AI SDK, use the main entry point:

* [  JavaScript ](#tab-panel-3460)
* [  TypeScript ](#tab-panel-3461)

JavaScript

```

import { generateTypesFromJsonSchema } from "@cloudflare/codemode";


const types = generateTypesFromJsonSchema(jsonSchemaToolDescriptors);


```

TypeScript

```

import { generateTypesFromJsonSchema } from "@cloudflare/codemode";


const types = generateTypesFromJsonSchema(jsonSchemaToolDescriptors);


```

### `sanitizeToolName(name)`

Converts tool names into valid JavaScript identifiers.

* [  JavaScript ](#tab-panel-3466)
* [  TypeScript ](#tab-panel-3467)

JavaScript

```

import { sanitizeToolName } from "@cloudflare/codemode";


sanitizeToolName("get-weather"); // "get_weather"

sanitizeToolName("3d-render"); // "_3d_render"

sanitizeToolName("delete"); // "delete_"


```

TypeScript

```

import { sanitizeToolName } from "@cloudflare/codemode";


sanitizeToolName("get-weather"); // "get_weather"

sanitizeToolName("3d-render"); // "_3d_render"

sanitizeToolName("delete"); // "delete_"


```

## Security considerations

* Code runs in **isolated Worker sandboxes** — each execution gets its own Worker instance.
* External network access (`fetch`, `connect`) is **blocked by default** at the runtime level.
* Tool calls are dispatched via Workers RPC, not network requests.
* Execution has a configurable **timeout** (default 30 seconds).
* Console output is captured separately and does not leak to the host.
* Browser iframe execution runs in a sandboxed iframe with a restrictive CSP by default. It uses nonce-scoped internal messages, but its timeout cannot preempt tight synchronous loops like `while (true) {}` because those block the browser event loop.

## Current limitations

* **Tool approval (`needsApproval`) is not supported yet.** Codemode excludes approval-required tools instead of pausing execution for approval. Use those tools through standard AI SDK tool calling instead.
* Requires Cloudflare Workers environment for `DynamicWorkerExecutor`.
* Limited to JavaScript execution.
* LLM code quality depends on prompt engineering and model capability.

## Related resources

[ Codemode example ](https://github.com/cloudflare/agents/tree/main/examples/codemode) Full working example — a project management assistant using codemode with SQLite. 

[ Using AI Models ](https://developers.cloudflare.com/agents/api-reference/using-ai-models/) Use AI models with your Agent. 

[ MCP Client ](https://developers.cloudflare.com/agents/api-reference/mcp-client-api/) Connect to MCP servers and use their tools with codemode. 

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/agents/","name":"Agents"}},{"@type":"ListItem","position":3,"item":{"@id":"/agents/api-reference/","name":"API Reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/agents/api-reference/codemode/","name":"Codemode"}}]}
```
