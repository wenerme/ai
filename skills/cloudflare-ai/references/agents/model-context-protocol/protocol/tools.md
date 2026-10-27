---
description: Define, register, and manage MCP tools that expose server-side functions for AI agents to call.
title: Tools
image: https://developers.cloudflare.com/agents/model-context-protocol/protocol/tools/og.png?v=95e31e7f8e5f6bfc
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/agents/llms.txt
> Use this file to discover all available pages before exploring further.

# Tools

Last updated Oct 27, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/agents/model-context-protocol/protocol/tools/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

MCP tools are functions that an [MCP server](https://developers.cloudflare.com/agents/model-context-protocol/) exposes for clients to call. An LLM can invoke a tool to look up data, run a calculation, or call an API. The MCP server executes the tool and returns its result.

Define tools on an `McpServer` from `@modelcontextprotocol/server` and serve it with [`createMcpHandler`](https://developers.cloudflare.com/agents/model-context-protocol/apis/handler-api/).

Experimental WebMCP adapter

The Agents SDK also includes the experimental `agents/experimental/webmcp` adapter for bridging tools from a remote MCP server to Chrome's native `navigator.modelContext` API. This API is under active development and may change between releases.

### [WebMCP example](https://github.com/cloudflare/agents/tree/main/examples/webmcp)

Bridge tools from a remote MCP server into Chrome's experimental WebMCP API.

## Define tools

Use `server.registerTool()` to register a tool on a stateless `McpServer` instance. Each tool has a name, a description, an input schema defined with a schema library like [Zod ↗︎](https://zod.dev) or [Valibot ↗︎](https://valibot.dev), and a handler function.

```js
import { McpServer } from "@modelcontextprotocol/server";
import { createMcpHandler } from "agents/mcp/server";
import { z } from "zod";

function createServer() {
	const server = new McpServer({ name: "Math", version: "1.0.0" });

	server.registerTool(
		"add",
		{
			description: "Add two numbers together",
			inputSchema: { a: z.number(), b: z.number() },
			outputSchema: { sum: z.number() },
		},
		async ({ a, b }) => {
			const result = { sum: a + b };
			return {
				structuredContent: result,
				content: [{ type: "text", text: JSON.stringify(result) }],
			};
		},
	);

	return server;
}

const handler = createMcpHandler(createServer);

export default {
	fetch(request, env, ctx) {
		return handler(request, env, ctx);
	},
};
```

```ts
import { McpServer } from "@modelcontextprotocol/server";
import { createMcpHandler } from "agents/mcp/server";
import { z } from "zod";

function createServer() {
	const server = new McpServer({ name: "Math", version: "1.0.0" });

	server.registerTool(
		"add",
		{
			description: "Add two numbers together",
			inputSchema: { a: z.number(), b: z.number() },
			outputSchema: { sum: z.number() },
		},
		async ({ a, b }) => {
			const result = { sum: a + b };
			return {
				structuredContent: result,
				content: [{ type: "text", text: JSON.stringify(result) }],
			};
		},
	);

	return server;
}

const handler = createMcpHandler(createServer);

export default {
	fetch(request, env, ctx) {
		return handler(request, env, ctx);
	},
} satisfies ExportedHandler<Env>;
```

The tool handler receives the validated input and must return an object with a `content` array. Each content item has a `type` (typically `"text"`) and the corresponding data.

## Tool results

Tool results are returned as an array of content parts. The most common type is `text`, but you can also return images and embedded resources.

```js
import { McpServer } from "@modelcontextprotocol/server";
import { createMcpHandler } from "agents/mcp/server";
import { env } from "cloudflare:workers";
import { z } from "zod";

function createServer() {
	const server = new McpServer({ name: "Users", version: "1.0.0" });

	server.registerTool(
		"lookup",
		{
			description: "Look up a user by ID",
			inputSchema: { userId: z.string() },
		},
		async ({ userId }) => {
			const user = await env.USERS.get(userId, "json");

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

	return server;
}

const handler = createMcpHandler(createServer);

export default {
	fetch(request, env, ctx) {
		return handler(request, env, ctx);
	},
};
```

```ts
import { McpServer } from "@modelcontextprotocol/server";
import { createMcpHandler } from "agents/mcp/server";
import { env } from "cloudflare:workers";
import { z } from "zod";

function createServer() {
	const server = new McpServer({ name: "Users", version: "1.0.0" });

	server.registerTool(
		"lookup",
		{
			description: "Look up a user by ID",
			inputSchema: { userId: z.string() },
		},
		async ({ userId }) => {
			const user = await env.USERS.get(userId, "json");

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

	return server;
}

const handler = createMcpHandler(createServer);

export default {
	fetch(request, env, ctx) {
		return handler(request, env, ctx);
	},
} satisfies ExportedHandler<Env>;
```

Set `isError: true` to signal that the tool call failed. The LLM receives the error message and can decide how to proceed.

## Tool descriptions

The `description` parameter is critical — it is what the LLM reads to decide whether and when to call your tool. Write descriptions that are:

- **Specific** about what the tool does: "Get the current weather for a city" is better than "Weather tool"
- **Clear about inputs**: "Requires a city name as a string" helps the LLM format the call correctly
- **Honest about limitations**: "Only supports US cities" prevents the LLM from calling it with unsupported inputs

## Input validation with Zod

Tool inputs are defined as Zod schemas and validated automatically before the handler runs. Use Zod's `.describe()` method to give the LLM context about each parameter.

```js
import { McpServer } from "@modelcontextprotocol/server";
import { createMcpHandler } from "agents/mcp/server";
import { z } from "zod";

const DOCUMENTS = [
	{ title: "Getting started", category: "docs" },
	{ title: "Release notes", category: "blog" },
	{ title: "REST reference", category: "api" },
];

function createServer() {
	const server = new McpServer({ name: "Search", version: "1.0.0" });

	server.registerTool(
		"search",
		{
			description: "Search for documents by title",
			inputSchema: {
				query: z.string().describe("Text to look for in document titles"),
				limit: z
					.number()
					.min(1)
					.max(100)
					.default(10)
					.describe("Maximum number of results to return"),
				category: z
					.enum(["docs", "blog", "api"])
					.optional()
					.describe("Only return documents in this category"),
			},
		},
		async ({ query, limit, category }) => {
			const results = DOCUMENTS.filter(
				(doc) =>
					doc.title.toLowerCase().includes(query.toLowerCase()) &&
					(!category || doc.category === category),
			).slice(0, limit);

			return {
				content: [{ type: "text", text: JSON.stringify(results) }],
			};
		},
	);

	return server;
}

const handler = createMcpHandler(createServer);

export default {
	fetch(request, env, ctx) {
		return handler(request, env, ctx);
	},
};
```

```ts
import { McpServer } from "@modelcontextprotocol/server";
import { createMcpHandler } from "agents/mcp/server";
import { z } from "zod";

const DOCUMENTS = [
	{ title: "Getting started", category: "docs" },
	{ title: "Release notes", category: "blog" },
	{ title: "REST reference", category: "api" },
];

function createServer() {
	const server = new McpServer({ name: "Search", version: "1.0.0" });

	server.registerTool(
		"search",
		{
			description: "Search for documents by title",
			inputSchema: {
				query: z.string().describe("Text to look for in document titles"),
				limit: z
					.number()
					.min(1)
					.max(100)
					.default(10)
					.describe("Maximum number of results to return"),
				category: z
					.enum(["docs", "blog", "api"])
					.optional()
					.describe("Only return documents in this category"),
			},
		},
		async ({ query, limit, category }) => {
			const results = DOCUMENTS.filter(
				(doc) =>
					doc.title.toLowerCase().includes(query.toLowerCase()) &&
					(!category || doc.category === category),
			).slice(0, limit);

			return {
				content: [{ type: "text", text: JSON.stringify(results) }],
			};
		},
	);

	return server;
}

const handler = createMcpHandler(createServer);

export default {
	fetch(request, env, ctx) {
		return handler(request, env, ctx);
	},
} satisfies ExportedHandler<Env>;
```

## Serve tools with `createMcpHandler`

For stateless MCP servers, define tools inside a factory function and pass the server to [`createMcpHandler`](https://developers.cloudflare.com/agents/model-context-protocol/apis/handler-api/):

```js
import { McpServer } from "@modelcontextprotocol/server";
import { createMcpHandler } from "agents/mcp/server";

function createServer() {
	const server = new McpServer({ name: "My Tools", version: "1.0.0" });

	server.registerTool(
		"ping",
		{ description: "Check if the server is alive" },
		async () => ({
			content: [{ type: "text", text: "pong" }],
		}),
	);

	return server;
}

const handler = createMcpHandler(createServer);

export default {
	fetch(request, env, ctx) {
		return handler(request, env, ctx);
	},
};
```

```ts
import { McpServer } from "@modelcontextprotocol/server";
import { createMcpHandler } from "agents/mcp/server";

function createServer() {
	const server = new McpServer({ name: "My Tools", version: "1.0.0" });

	server.registerTool(
		"ping",
		{ description: "Check if the server is alive" },
		async () => ({
			content: [{ type: "text", text: "pong" }],
		}),
	);

	return server;
}

const handler = createMcpHandler(createServer);

export default {
	fetch(request, env, ctx) {
		return handler(request, env, ctx);
	},
} satisfies ExportedHandler<Env>;
```

## Tools that need state

`createMcpHandler` builds a new server for every request, so a tool cannot keep data in memory between calls. Read and write a binding instead, using `env` from `cloudflare:workers`:

```js
import { McpServer } from "@modelcontextprotocol/server";
import { createMcpHandler, getMcpAuthContext } from "agents/mcp/server";
import { env } from "cloudflare:workers";

function createServer() {
	const server = new McpServer({ name: "Counter", version: "1.0.0" });

	server.registerTool(
		"incrementCounter",
		{ description: "Increment and return your counter" },
		async () => {
			// props are set by OAuthProvider. Without it, every caller shares "anonymous".
			const userId = String(getMcpAuthContext()?.props.userId ?? "anonymous");
			const count = Number((await env.COUNTERS.get(userId)) ?? 0) + 1;
			await env.COUNTERS.put(userId, String(count));
			return {
				content: [{ type: "text", text: `Counter: ${count}` }],
			};
		},
	);

	return server;
}

const handler = createMcpHandler(createServer);

export default {
	fetch(request, env, ctx) {
		return handler(request, env, ctx);
	},
};
```

```ts
import { McpServer } from "@modelcontextprotocol/server";
import { createMcpHandler, getMcpAuthContext } from "agents/mcp/server";
import { env } from "cloudflare:workers";

function createServer() {
	const server = new McpServer({ name: "Counter", version: "1.0.0" });

	server.registerTool(
		"incrementCounter",
		{ description: "Increment and return your counter" },
		async () => {
			// props are set by OAuthProvider. Without it, every caller shares "anonymous".
			const userId = String(getMcpAuthContext()?.props.userId ?? "anonymous");
			const count = Number((await env.COUNTERS.get(userId)) ?? 0) + 1;
			await env.COUNTERS.put(userId, String(count));
			return {
				content: [{ type: "text", text: `Counter: ${count}` }],
			};
		},
	);

	return server;
}

const handler = createMcpHandler(createServer);

export default {
	fetch(request, env, ctx) {
		return handler(request, env, ctx);
	},
} satisfies ExportedHandler<Env>;
```

To add `OAuthProvider` and per-user props, refer to [Authorization](https://developers.cloudflare.com/agents/model-context-protocol/protocol/authorization/). For data that needs transactions or per-user logic, call a Durable Object or an [Agent](https://developers.cloudflare.com/agents/) from the tool.

## Next steps

### [Build a remote MCP server](https://developers.cloudflare.com/agents/model-context-protocol/guides/remote-mcp-server/)

Step-by-step guide to deploying an MCP server on Cloudflare.

### [createMcpHandler API](https://developers.cloudflare.com/agents/model-context-protocol/apis/handler-api/)

Reference for stateless MCP servers.

### [MCP authorization](https://developers.cloudflare.com/agents/model-context-protocol/protocol/authorization/)

Add OAuth authentication to your MCP server.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/agents/model-context-protocol/protocol/tools/#page","headline":"Tools","description":"Define, register, and manage MCP tools that expose server-side functions for AI agents to call.","url":"https://developers.cloudflare.com/agents/model-context-protocol/protocol/tools/","inLanguage":"en","image":"https://developers.cloudflare.com/agents/model-context-protocol/protocol/tools/og.png?v=95e31e7f8e5f6bfc","dateModified":"2026-10-27","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["MCP"]}
```
