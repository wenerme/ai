---
title: Tools
description: Define, register, and manage MCP tools that expose server-side functions for AI agents to call.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/agents/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

### Tags

[ MCP ](https://developers.cloudflare.com/search/?tags=MCP) 

# Tools

MCP tools are functions that an [MCP server](https://developers.cloudflare.com/agents/model-context-protocol/) exposes for clients to call. When an LLM decides it needs to take an action — look up data, run a calculation, call an API — it invokes a tool. The MCP server executes the tool and returns the result.

Tools are defined using the `@modelcontextprotocol/sdk` package. The Agents SDK handles transport and lifecycle; the tool definitions are the same regardless of whether you use [createMcpHandler](https://developers.cloudflare.com/agents/api-reference/mcp-handler-api/) or [McpAgent](https://developers.cloudflare.com/agents/api-reference/mcp-agent-api/).

## Defining tools

Use `server.tool()` to register a tool on an `McpServer` instance. Each tool has a name, a description (used by the LLM to decide when to call it), an input schema defined with [Zod ↗](https://zod.dev), and a handler function.

* [  JavaScript ](#tab-panel-4074)
* [  TypeScript ](#tab-panel-4075)

JavaScript

```

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

import { z } from "zod";


function createServer() {

  const server = new McpServer({ name: "Math", version: "1.0.0" });


  server.tool(

    "add",

    "Add two numbers together",

    { a: z.number(), b: z.number() },

    async ({ a, b }) => ({

      content: [{ type: "text", text: String(a + b) }],

    }),

  );


  return server;

}


```

Explain Code

TypeScript

```

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

import { z } from "zod";


function createServer() {

  const server = new McpServer({ name: "Math", version: "1.0.0" });


  server.tool(

    "add",

    "Add two numbers together",

    { a: z.number(), b: z.number() },

    async ({ a, b }) => ({

      content: [{ type: "text", text: String(a + b) }],

    }),

  );


  return server;

}


```

Explain Code

The tool handler receives the validated input and must return an object with a `content` array. Each content item has a `type` (typically `"text"`) and the corresponding data.

## Tool results

Tool results are returned as an array of content parts. The most common type is `text`, but you can also return images and embedded resources.

* [  JavaScript ](#tab-panel-4076)
* [  TypeScript ](#tab-panel-4077)

JavaScript

```

server.tool(

  "lookup",

  "Look up a user by ID",

  { userId: z.string() },

  async ({ userId }) => {

    const user = await db.getUser(userId);


    if (!user) {

      return {

        isError: true,

        content: [{ type: "text", text: `User ${userId} not found` }],

      };

    }


    return {

      content: [{ type: "text", text: JSON.stringify(user, null, 2) }],

    };

  },

);


```

Explain Code

TypeScript

```

server.tool(

  "lookup",

  "Look up a user by ID",

  { userId: z.string() },

  async ({ userId }) => {

    const user = await db.getUser(userId);


    if (!user) {

      return {

        isError: true,

        content: [{ type: "text", text: `User ${userId} not found` }],

      };

    }


    return {

      content: [{ type: "text", text: JSON.stringify(user, null, 2) }],

    };

  },

);


```

Explain Code

Set `isError: true` to signal that the tool call failed. The LLM receives the error message and can decide how to proceed.

## Tool descriptions

The `description` parameter is critical — it is what the LLM reads to decide whether and when to call your tool. Write descriptions that are:

* **Specific** about what the tool does: "Get the current weather for a city" is better than "Weather tool"
* **Clear about inputs**: "Requires a city name as a string" helps the LLM format the call correctly
* **Honest about limitations**: "Only supports US cities" prevents the LLM from calling it with unsupported inputs

## Input validation with Zod

Tool inputs are defined as Zod schemas and validated automatically before the handler runs. Use Zod's `.describe()` method to give the LLM context about each parameter.

* [  JavaScript ](#tab-panel-4080)
* [  TypeScript ](#tab-panel-4081)

JavaScript

```

server.tool(

  "search",

  "Search for documents by query",

  {

    query: z.string().describe("The search query"),

    limit: z

      .number()

      .min(1)

      .max(100)

      .default(10)

      .describe("Maximum number of results to return"),

    category: z

      .enum(["docs", "blog", "api"])

      .optional()

      .describe("Filter by content category"),

  },

  async ({ query, limit, category }) => {

    const results = await searchIndex(query, { limit, category });

    return {

      content: [{ type: "text", text: JSON.stringify(results) }],

    };

  },

);


```

Explain Code

TypeScript

```

server.tool(

  "search",

  "Search for documents by query",

  {

    query: z.string().describe("The search query"),

    limit: z

      .number()

      .min(1)

      .max(100)

      .default(10)

      .describe("Maximum number of results to return"),

    category: z

      .enum(["docs", "blog", "api"])

      .optional()

      .describe("Filter by content category"),

  },

  async ({ query, limit, category }) => {

    const results = await searchIndex(query, { limit, category });

    return {

      content: [{ type: "text", text: JSON.stringify(results) }],

    };

  },

);


```

Explain Code

## Using tools with `createMcpHandler`

For stateless MCP servers, define tools inside a factory function and pass the server to [createMcpHandler](https://developers.cloudflare.com/agents/api-reference/mcp-handler-api/):

* [  JavaScript ](#tab-panel-4078)
* [  TypeScript ](#tab-panel-4079)

JavaScript

```

import { createMcpHandler } from "agents/mcp";

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

import { z } from "zod";


function createServer() {

  const server = new McpServer({ name: "My Tools", version: "1.0.0" });


  server.tool("ping", "Check if the server is alive", {}, async () => ({

    content: [{ type: "text", text: "pong" }],

  }));


  return server;

}


export default {

  fetch: (request, env, ctx) => {

    const server = createServer();

    return createMcpHandler(server)(request, env, ctx);

  },

};


```

Explain Code

TypeScript

```

import { createMcpHandler } from "agents/mcp";

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

import { z } from "zod";


function createServer() {

  const server = new McpServer({ name: "My Tools", version: "1.0.0" });


  server.tool("ping", "Check if the server is alive", {}, async () => ({

    content: [{ type: "text", text: "pong" }],

  }));


  return server;

}


export default {

  fetch: (request: Request, env: Env, ctx: ExecutionContext) => {

    const server = createServer();

    return createMcpHandler(server)(request, env, ctx);

  },

} satisfies ExportedHandler<Env>;


```

Explain Code

## Using tools with `McpAgent`

For stateful MCP servers, define tools in the `init()` method of an [McpAgent](https://developers.cloudflare.com/agents/api-reference/mcp-agent-api/). Tools have access to the agent instance via `this`, which means they can read and write state.

* [  JavaScript ](#tab-panel-4082)
* [  TypeScript ](#tab-panel-4083)

JavaScript

```

import { McpAgent } from "agents/mcp";

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

import { z } from "zod";


export class MyMCP extends McpAgent {

  server = new McpServer({ name: "Stateful Tools", version: "1.0.0" });


  async init() {

    this.server.tool(

      "incrementCounter",

      "Increment and return a counter",

      {},

      async () => {

        const count = (this.state?.count ?? 0) + 1;

        this.setState({ count });

        return {

          content: [{ type: "text", text: `Counter: ${count}` }],

        };

      },

    );

  }

}


```

Explain Code

TypeScript

```

import { McpAgent } from "agents/mcp";

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

import { z } from "zod";


export class MyMCP extends McpAgent {

  server = new McpServer({ name: "Stateful Tools", version: "1.0.0" });


  async init() {

    this.server.tool(

      "incrementCounter",

      "Increment and return a counter",

      {},

      async () => {

        const count = (this.state?.count ?? 0) + 1;

        this.setState({ count });

        return {

          content: [{ type: "text", text: `Counter: ${count}` }],

        };

      },

    );

  }

}


```

Explain Code

## Next steps

[ Build a remote MCP server ](https://developers.cloudflare.com/agents/guides/remote-mcp-server/) Step-by-step guide to deploying an MCP server on Cloudflare. 

[ createMcpHandler API ](https://developers.cloudflare.com/agents/api-reference/mcp-handler-api/) Reference for stateless MCP servers. 

[ McpAgent API ](https://developers.cloudflare.com/agents/api-reference/mcp-agent-api/) Reference for stateful MCP servers. 

[ MCP authorization ](https://developers.cloudflare.com/agents/model-context-protocol/authorization/) Add OAuth authentication to your MCP server. 

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/agents/","name":"Agents"}},{"@type":"ListItem","position":3,"item":{"@id":"/agents/model-context-protocol/","name":"Model Context Protocol (MCP)"}},{"@type":"ListItem","position":4,"item":{"@id":"/agents/model-context-protocol/tools/","name":"Tools"}}]}
```
