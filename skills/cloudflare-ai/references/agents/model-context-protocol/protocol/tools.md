---
description: Define, register, and manage MCP tools that expose server-side functions for AI agents to call.
title: Tools
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/agents/llms.txt
> Use this file to discover all available pages before exploring further.

# Tools

Last updated Aug 18, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/agents/model-context-protocol/protocol/tools/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

MCP tools are functions that an [MCP server](https://developers.cloudflare.com/agents/model-context-protocol/) exposes for clients to call. An LLM can invoke a tool to look up data, run a calculation, or call an API. The MCP server executes the tool and returns its result.

Use `@modelcontextprotocol/server` for a stateless `createMcpHandler` server. `McpAgent` is deprecated and feature-frozen. Existing `McpAgent` routes must keep using `@modelcontextprotocol/sdk` only while they migrate.

Experimental WebMCP adapter

The Agents SDK also includes the experimental `agents/experimental/webmcp` adapter for bridging `McpAgent` tools to Chrome's native `navigator.modelContext` API. This API is under active development and may change between releases.

### [WebMCP example](https://github.com/cloudflare/agents/tree/main/examples/webmcp)

Bridge MCP tools from a Cloudflare McpAgent into Chrome's experimental WebMCP API.

## Defining tools

Use `server.registerTool()` to register a tool on a stateless `McpServer` instance. Each tool has a name, a description, an input schema defined with a schema library like [Zod ↗](https://zod.dev) or [Valibot ↗](https://valibot.dev), and a handler function.

```js
import { McpServer } from "@modelcontextprotocol/server";
import { z } from "zod";

function createServer() {
	const server = new McpServer({ name: "Math", version: "1.0.0" });

	server.registerTool(
		"add",
		{
			description: "Add two numbers together",
			inputSchema: { a: z.number(), b: z.number() },
		},
		async ({ a, b }) => ({
			content: [{ type: "text", text: String(a + b) }],
		}),
	);

	return server;
}
```

```ts
import { McpServer } from "@modelcontextprotocol/server";
import { z } from "zod";

function createServer() {
	const server = new McpServer({ name: "Math", version: "1.0.0" });

	server.registerTool(
		"add",
		{
			description: "Add two numbers together",
			inputSchema: { a: z.number(), b: z.number() },
		},
		async ({ a, b }) => ({
			content: [{ type: "text", text: String(a + b) }],
		}),
	);

	return server;
}
```

The tool handler receives the validated input and must return an object with a `content` array. Each content item has a `type` (typically `"text"`) and the corresponding data.

## Tool results

Tool results are returned as an array of content parts. The most common type is `text`, but you can also return images and embedded resources.

```js
server.registerTool(
	"lookup",
	{
		description: "Look up a user by ID",
		inputSchema: { userId: z.string() },
	},
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

```ts
server.registerTool(
	"lookup",
	{
		description: "Look up a user by ID",
		inputSchema: { userId: z.string() },
	},
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

Set `isError: true` to signal that the tool call failed. The LLM receives the error message and can decide how to proceed.

## Tool descriptions

The `description` parameter is critical — it is what the LLM reads to decide whether and when to call your tool. Write descriptions that are:

* **Specific** about what the tool does: "Get the current weather for a city" is better than "Weather tool"
* **Clear about inputs**: "Requires a city name as a string" helps the LLM format the call correctly
* **Honest about limitations**: "Only supports US cities" prevents the LLM from calling it with unsupported inputs

## Input validation with Zod

Tool inputs are defined as Zod schemas and validated automatically before the handler runs. Use Zod's `.describe()` method to give the LLM context about each parameter.

```js
server.registerTool(
	"search",
	{
		description: "Search for documents by query",
		inputSchema: {
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
	},
	async ({ query, limit, category }) => {
		const results = await searchIndex(query, { limit, category });
		return {
			content: [{ type: "text", text: JSON.stringify(results) }],
		};
	},
);
```

```ts
server.registerTool(
	"search",
	{
		description: "Search for documents by query",
		inputSchema: {
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
	},
	async ({ query, limit, category }) => {
		const results = await searchIndex(query, { limit, category });
		return {
			content: [{ type: "text", text: JSON.stringify(results) }],
		};
	},
);
```

## Using tools with `createMcpHandler`

For stateless MCP servers, define tools inside a factory function and pass the server to [createMcpHandler](https://developers.cloudflare.com/agents/model-context-protocol/apis/handler-api/):

```js
import { createMcpHandler } from "agents/mcp/server";
import { McpServer } from "@modelcontextprotocol/server";
import { z } from "zod";

function createServer() {
	const server = new McpServer({ name: "My Tools", version: "1.0.0" });

	server.registerTool(
		"ping",
		{ description: "Check if the server is alive", inputSchema: {} },
		async () => ({
			content: [{ type: "text", text: "pong" }],
		}),
	);

	return server;
}

export default {
	fetch(request, env, ctx) {
		return createMcpHandler(createServer)(request, env, ctx);
	},
};
```

```ts
import { createMcpHandler } from "agents/mcp/server";
import { McpServer } from "@modelcontextprotocol/server";
import { z } from "zod";

function createServer() {
	const server = new McpServer({ name: "My Tools", version: "1.0.0" });

	server.registerTool(
		"ping",
		{ description: "Check if the server is alive", inputSchema: {} },
		async () => ({
			content: [{ type: "text", text: "pong" }],
		}),
	);

	return server;
}

export default {
	fetch(request, env, ctx) {
		return createMcpHandler(createServer)(request, env, ctx);
	},
} satisfies ExportedHandler;
```

## Using tools with `McpAgent`

This section applies only to existing legacy routes during migration. Define their tools in the `init()` method of an [McpAgent](https://developers.cloudflare.com/agents/model-context-protocol/apis/agent-api/). Tools have access to the agent instance through `this`, so they can read and write state.

```js
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

```ts
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

## Next steps

### [Build a remote MCP server](https://developers.cloudflare.com/agents/model-context-protocol/guides/remote-mcp-server/)

Step-by-step guide to deploying an MCP server on Cloudflare.

### [createMcpHandler API](https://developers.cloudflare.com/agents/model-context-protocol/apis/handler-api/)

Reference for stateless MCP servers.

### [McpAgent API](https://developers.cloudflare.com/agents/model-context-protocol/apis/agent-api/)

Reference for stateful MCP servers.

### [MCP authorization](https://developers.cloudflare.com/agents/model-context-protocol/protocol/authorization/)

Add OAuth authentication to your MCP server.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/agents/model-context-protocol/protocol/tools/#page","headline":"Tools · Cloudflare Agents docs","description":"Define, register, and manage MCP tools that expose server-side functions for AI agents to call.","url":"https://developers.cloudflare.com/agents/model-context-protocol/protocol/tools/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-18","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["MCP"]}
```
