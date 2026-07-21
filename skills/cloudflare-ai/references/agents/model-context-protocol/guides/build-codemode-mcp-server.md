---
description: Replace an MCP server's individual tools with one sandboxed Code Mode tool on Cloudflare Workers.
title: Build a single-tool Code Mode MCP server
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/agents/llms.txt
> Use this file to discover all available pages before exploring further.

#  Build a single-tool Code Mode MCP server

Last updated Jun 24, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/agents/model-context-protocol/guides/build-codemode-mcp-server/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

Use `codeMcpServer()` to wrap an existing Model Context Protocol (MCP) server. MCP clients receive one `code` tool instead of every upstream tool.

The `code` tool contains generated type definitions for the upstream tools. Model-written JavaScript can call several tools, process their results, and return one focused value.

Caution

Code Mode is experimental and may have breaking changes. Use caution in production.

## Prerequisites

You need a Cloudflare Workers project and an existing `McpServer`.

## Wrap the server

1. Install Code Mode and the MCP dependencies:
 npm  yarn  pnpm  bun
```
npm i @cloudflare/codemode agents @modelcontextprotocol/sdk zod
```
```
yarn add @cloudflare/codemode agents @modelcontextprotocol/sdk zod
```
```
pnpm add @cloudflare/codemode agents @modelcontextprotocol/sdk zod
```
```
bun add @cloudflare/codemode agents @modelcontextprotocol/sdk zod
```
2. Add a Worker Loader binding and the `nodejs_compat` compatibility flag:
```jsonc
{
  "$schema": "./node_modules/wrangler/config-schema.json",
  "name": "codemode-mcp-server",
  "main": "src/server.ts",
  // Set this to today's date
  "compatibility_date": "2026-07-21",
  "compatibility_flags": [
    "nodejs_compat"
  ],
  "worker_loaders": [
    {
      "binding": "LOADER"
    }
  ]
}
```
```toml
name = "codemode-mcp-server"
main = "src/server.ts"
# Set this to today's date
compatibility_date = "2026-07-21"
compatibility_flags = ["nodejs_compat"]
[[worker_loaders]]
binding = "LOADER"
```
3. Create the upstream server and pass it to `codeMcpServer()`:
```js
import { DynamicWorkerExecutor } from "@cloudflare/codemode";
import { codeMcpServer } from "@cloudflare/codemode/mcp";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { createMcpHandler } from "agents/mcp";
import { z } from "zod";
function createOrderServer() {
	const server = new McpServer({
		name: "orders",
		version: "1.0.0",
	});
	server.registerTool(
		"get_order",
		{
			description: "Get an order by ID",
			inputSchema: {
				orderId: z.string().describe("Order ID"),
			},
		},
		async ({ orderId }) => ({
			structuredContent: {
				id: orderId,
				status: "processing",
			},
			content: [
				{
					type: "text",
					text: JSON.stringify({ id: orderId, status: "processing" }),
				},
			],
		}),
	);
	return server;
}
export default {
	async fetch(request, env, ctx) {
		const upstream = createOrderServer();
		const executor = new DynamicWorkerExecutor({ loader: env.LOADER });
		const server = await codeMcpServer({
			server: upstream,
			executor,
		});
		return createMcpHandler(server, { route: "/mcp" })(request, env, ctx);
	},
};
```
```ts
import { DynamicWorkerExecutor } from "@cloudflare/codemode";
import { codeMcpServer } from "@cloudflare/codemode/mcp";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { createMcpHandler } from "agents/mcp";
import { z } from "zod";
function createOrderServer() {
	const server = new McpServer({
		name: "orders",
		version: "1.0.0",
	});
	server.registerTool(
		"get_order",
		{
			description: "Get an order by ID",
			inputSchema: {
				orderId: z.string().describe("Order ID"),
			},
		},
		async ({ orderId }) => ({
			structuredContent: {
				id: orderId,
				status: "processing",
			},
			content: [
				{
					type: "text",
					text: JSON.stringify({ id: orderId, status: "processing" }),
				},
			],
		}),
	);
	return server;
}
export default {
	async fetch(request, env, ctx): Promise<Response> {
		const upstream = createOrderServer();
		const executor = new DynamicWorkerExecutor({ loader: env.LOADER });
		const server = await codeMcpServer({
			server: upstream,
			executor,
		});
		return createMcpHandler(server, { route: "/mcp" })(
			request,
			env,
			ctx,
		);
	},
} satisfies ExportedHandler<Env>;
```
4. Deploy the Worker:
 npm  yarn  pnpm
```
npx wrangler deploy
```
```
yarn wrangler deploy
```
```
pnpm wrangler deploy
```
5. In an MCP client, connect to `https://<YOUR_WORKER>.<YOUR_SUBDOMAIN>.workers.dev/mcp`. Verify that the server exposes one tool named `code`.

The model can use the generated `codemode` namespace inside the `code` tool:

```js
async () => {
	const order = await codemode.get_order({ orderId: "order-123" });
	return { id: order.id, status: order.status };
};
```

When an upstream tool returns `structuredContent`, Code Mode exposes that value directly. Text-only content is joined and parsed as JSON when possible. Upstream MCP errors become exceptions that model-written code can catch. Mixed text and binary content remains in its MCP result structure.

If you provide a custom `description`, use `{{types}}` where the generated TypeScript declarations should appear. Use `{{example}}` where the SDK should insert an example call based on the first upstream MCP tool. Both placeholders are optional.

## Protect upstream operations

`codeMcpServer()` does not provide durable approval for each upstream tool call. It invokes upstream handlers from inside the outer `code` tool.

Enforce authorization and any required per-operation approval in each upstream handler before applying side effects. Do not include credentials in tool results.

`DynamicWorkerExecutor` blocks external `fetch()` and `connect()` calls by default. Generated code can reach external systems only through the upstream MCP tools.

## Limit results

Model-written code can select, map, aggregate, or paginate upstream data before returning. This prevents large intermediate results from entering the model context.

The publisher limits the final MCP response to approximately 6,000 estimated tokens. A larger response is cut off and includes a `--- TRUNCATED ---` marker. This does not reduce work already performed by upstream tools.

To publish an OpenAPI service with separate `search` and `execute` tools, refer to [Build a search and execute MCP server](https://developers.cloudflare.com/agents/model-context-protocol/guides/build-codemode-openapi-mcp-server/).

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/agents/model-context-protocol/guides/build-codemode-mcp-server/#page","headline":"Build a single-tool Code Mode MCP server · Cloudflare Agents docs","description":"Replace an MCP server's individual tools with one sandboxed Code Mode tool on Cloudflare Workers.","url":"https://developers.cloudflare.com/agents/model-context-protocol/guides/build-codemode-mcp-server/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-06-24","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["AI","MCP"]}
```
