---
description: Expose an MCP server or a large OpenAPI service to any MCP client through sandboxed, model-written code.
title: Build a Code Mode MCP server
image: https://developers.cloudflare.com/agents/model-context-protocol/guides/build-codemode-mcp-server/og.png?v=d8dd3a2a21aec4f4
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/agents/llms.txt
> Use this file to discover all available pages before exploring further.

# Build a Code Mode MCP server

Last updated Oct 27, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/agents/model-context-protocol/guides/build-codemode-mcp-server/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

A Code Mode MCP server lets any Model Context Protocol (MCP) client use model-written code without providing its own sandbox. Instead of advertising one tool per operation, the server exposes code execution as its tool interface and runs the generated JavaScript in an isolated Worker. Generated code can compose several operations and return only the final result, so tool definitions and intermediate data stay out of the model's context. For the design rationale, refer to [Code Mode: give agents an entire API in 1,000 tokens ↗︎](https://blog.cloudflare.com/code-mode-mcp/).

Caution

Code Mode is experimental and may have breaking changes. Use caution in production.

## Choose a pattern

| Pattern | MCP tools | Model-facing API | Use when |
| --- | --- | --- | --- |
| Single code tool | `code` | Typed methods for every upstream tool | You already have an MCP server with a manageable set of tools. |
| Search and execute | `search`, `execute` | OpenAPI document and request function | You have a large API whose complete schema should stay out of context. |

Use `codeMcpServer()` when an existing MCP server already defines the operations and schemas the model needs. Use `openApiMcpServer()` when a large OpenAPI catalog needs progressive discovery and a fixed model-context footprint.

Both functions currently return an SDK v1 server. Serve it with `createLegacyMcpHandler`, as shown in [Wrap an existing MCP server](#wrap-an-existing-mcp-server) and [Publish a large API with search and execute](#publish-a-large-api-with-search-and-execute).

## Wrap an existing MCP server

The single-tool pattern wraps an existing MCP server with `codeMcpServer()`. Instead of advertising each upstream tool separately, the server advertises one `code` tool.

The `code` tool description contains generated TypeScript definitions for every upstream tool. The model writes JavaScript against a `codemode` namespace:

```js
async () => {
	const projects = await codemode.list_projects({ status: "active" });
	const tasks = [];

	for (const project of projects) {
		tasks.push(...(await codemode.list_tasks({ projectId: project.id })));
	}

	return tasks.filter((task) => task.status === "blocked");
};
```

The MCP client makes one outer tool call. Inside the sandbox, the code can make dependent upstream calls, filter intermediate data, and return only the final result.

This pattern works well when the generated type declarations fit comfortably in the `code` tool description. The model receives those declarations when it loads the MCP tool.

You need a Cloudflare Workers project and an existing `McpServer`.

1. Install Code Mode and the MCP dependencies:npmyarnpnpmbun

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
     "upload_source_maps": true,
     // Set this to today's date
     "compatibility_date": "2026-10-27",
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
   upload_source_maps = true
   # Set this to today's date
   compatibility_date = "2026-10-27"
   compatibility_flags = ["nodejs_compat"]

   [[worker_loaders]]
   binding = "LOADER"
   ```

3. Create the upstream server and pass it to `codeMcpServer()`:

   *src/server.jsjs*



   ```js
   import { DynamicWorkerExecutor } from "@cloudflare/codemode";
   import { codeMcpServer } from "@cloudflare/codemode/mcp";
   import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
   import { createLegacyMcpHandler } from "agents/mcp";
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

   		return createLegacyMcpHandler(server, { route: "/mcp" })(request, env, ctx);
   	},
   };
   ```

   *src/server.tsts*



   ```ts
   import { DynamicWorkerExecutor } from "@cloudflare/codemode";
   import { codeMcpServer } from "@cloudflare/codemode/mcp";
   import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
   import { createLegacyMcpHandler } from "agents/mcp";
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

   		return createLegacyMcpHandler(server, { route: "/mcp" })(
   			request,
   			env,
   			ctx,
   		);
   	},
   } satisfies ExportedHandler<Env>;
   ```

4. Deploy the Worker:npmyarnpnpm

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

### Protect upstream operations

`codeMcpServer()` does not provide durable approval for each upstream tool call. It invokes upstream handlers from inside the outer `code` tool.

Enforce authorization and any required per-operation approval in each upstream handler before applying side effects. Do not include credentials in tool results.

## Publish a large API with search and execute

A large API can have thousands of operations. Including every operation in one tool description would still consume substantial context. The search-and-execute pattern separates capability discovery from authenticated API calls.

The server exposes two MCP tools:

- `search` runs generated code against an OpenAPI document. It returns only the operations, parameters, or schemas needed for the task.
- `execute` runs generated code with an authenticated request function. It can call the selected operations, compose responses, and return a focused result.

The complete OpenAPI document stays inside the sandbox. Only what the search code returns enters the model context.

Authentication stays in the host request callback. The generated code receives a request function, not the credential.

The [Cloudflare API MCP server](https://developers.cloudflare.com/agents/model-context-protocol/cloudflare/servers-for-cloudflare/) uses this pattern to expose the Cloudflare API through `search` and `execute`. For the design rationale and context savings, refer to [Code Mode: give agents an entire API in 1,000 tokens ↗︎](https://blog.cloudflare.com/code-mode-mcp/).

You need a Cloudflare Workers project, an OpenAPI 3.x document, and a host-side method for authenticating API requests.

1. Install Code Mode and the MCP dependencies:npmyarnpnpmbun

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
     "name": "openapi-codemode-mcp",
     "main": "src/server.ts",
     "upload_source_maps": true,
     // Set this to today's date
     "compatibility_date": "2026-10-27",
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
   name = "openapi-codemode-mcp"
   main = "src/server.ts"
   upload_source_maps = true
   # Set this to today's date
   compatibility_date = "2026-10-27"
   compatibility_flags = ["nodejs_compat"]

   [[worker_loaders]]
   binding = "LOADER"
   ```

3. Load the OpenAPI document on the host. Create the MCP server with an authenticated `request` function:

   *src/server.jsjs*



   ```js
   import { DynamicWorkerExecutor } from "@cloudflare/codemode";
   import { openApiMcpServer } from "@cloudflare/codemode/mcp";
   import { createLegacyMcpHandler } from "agents/mcp";

   const SPEC_URL = "https://api.example.com/openapi.json";
   const API_ORIGIN = "https://api.example.com";

   let specCache;

   async function loadSpec() {
   	if (specCache) return specCache;

   	const response = await fetch(SPEC_URL);
   	if (!response.ok) {
   		throw new Error(`OpenAPI request failed: ${response.status}`);
   	}

   	specCache = await response.json();
   	return specCache;
   }

   export default {
   	async fetch(request, env, ctx) {
   		const authorization = request.headers.get("Authorization");
   		if (!authorization?.startsWith("Bearer ")) {
   			return new Response("Bearer token required", { status: 401 });
   		}

   		const server = openApiMcpServer({
   			spec: await loadSpec(),
   			executor: new DynamicWorkerExecutor({ loader: env.LOADER }),
   			name: "example-api",
   			version: "1.0.0",
   			request: async (options) => {
   				if (!options.path.startsWith("/")) {
   					throw new Error("API path must start with a slash");
   				}

   				const url = new URL(`${API_ORIGIN}${options.path}`);
   				for (const [key, value] of Object.entries(options.query ?? {})) {
   					if (value !== undefined) {
   						url.searchParams.set(key, String(value));
   					}
   				}

   				const headers = { Authorization: authorization };
   				if (options.contentType) {
   					headers["Content-Type"] = options.contentType;
   				} else if (options.body !== undefined) {
   					headers["Content-Type"] = "application/json";
   				}

   				const response = await fetch(url, {
   					method: options.method,
   					headers,
   					body:
   						options.body === undefined
   							? undefined
   							: options.rawBody
   								? options.body
   								: JSON.stringify(options.body),
   				});

   				if (!response.ok) {
   					throw new Error(`API request failed: ${response.status}`);
   				}
   				if (response.status === 204) return null;

   				const responseType = response.headers.get("Content-Type") ?? "";
   				return responseType.includes("application/json")
   					? await response.json()
   					: await response.text();
   			},
   		});

   		return createLegacyMcpHandler(server, { route: "/mcp" })(request, env, ctx);
   	},
   };
   ```

   *src/server.tsts*



   ```ts
   import { DynamicWorkerExecutor } from "@cloudflare/codemode";
   import { openApiMcpServer } from "@cloudflare/codemode/mcp";
   import { createLegacyMcpHandler } from "agents/mcp";

   const SPEC_URL = "https://api.example.com/openapi.json";
   const API_ORIGIN = "https://api.example.com";

   let specCache: Record<string, unknown> | undefined;

   async function loadSpec(): Promise<Record<string, unknown>> {
   	if (specCache) return specCache;

   	const response = await fetch(SPEC_URL);
   	if (!response.ok) {
   		throw new Error(`OpenAPI request failed: ${response.status}`);
   	}

   	specCache = (await response.json()) as Record<string, unknown>;
   	return specCache;
   }

   export default {
   	async fetch(request, env, ctx): Promise<Response> {
   		const authorization = request.headers.get("Authorization");
   		if (!authorization?.startsWith("Bearer ")) {
   			return new Response("Bearer token required", { status: 401 });
   		}

   		const server = openApiMcpServer({
   			spec: await loadSpec(),
   			executor: new DynamicWorkerExecutor({ loader: env.LOADER }),
   			name: "example-api",
   			version: "1.0.0",
   			request: async (options) => {
   				if (!options.path.startsWith("/")) {
   					throw new Error("API path must start with a slash");
   				}

   				const url = new URL(`${API_ORIGIN}${options.path}`);
   				for (const [key, value] of Object.entries(options.query ?? {})) {
   					if (value !== undefined) {
   						url.searchParams.set(key, String(value));
   					}
   				}

   				const headers: Record<string, string> = { Authorization: authorization };
   				if (options.contentType) {
   					headers["Content-Type"] = options.contentType;
   				} else if (options.body !== undefined) {
   					headers["Content-Type"] = "application/json";
   				}

   				const response = await fetch(url, {
   					method: options.method,
   					headers,
   					body:
   						options.body === undefined
   							? undefined
   							: options.rawBody
   								? (options.body as string)
   								: JSON.stringify(options.body),
   				});

   				if (!response.ok) {
   					throw new Error(`API request failed: ${response.status}`);
   				}
   				if (response.status === 204) return null;

   				const responseType = response.headers.get("Content-Type") ?? "";
   				return responseType.includes("application/json")
   					? await response.json()
   					: await response.text();
   			},
   		});

   		return createLegacyMcpHandler(server, { route: "/mcp" })(
   			request,
   			env,
   			ctx,
   		);
   	},
   } satisfies ExportedHandler<Env>;
   ```

4. Deploy the Worker:npmyarnpnpm

   ```
   npx wrangler deploy
   ```

   ```
   yarn wrangler deploy
   ```

   ```
   pnpm wrangler deploy
   ```

5. In an MCP client, connect to `https://<YOUR_WORKER>.<YOUR_SUBDOMAIN>.workers.dev/mcp`. Include the bearer token required by your Worker.
6. List the MCP tools. Verify that the server exposes `search` and `execute`.

### Search the OpenAPI document

Call `search` before `execute`. Search code can inspect the document without making API requests:

```js
async () => {
	const spec = await codemode.spec();
	return Object.entries(spec.paths)
		.filter(([path]) => path.includes("/orders"))
		.map(([path, operations]) => ({
			path,
			methods: Object.keys(operations),
		}));
};
```

Local OpenAPI `$ref` values resolve inside the sandbox when code calls `codemode.spec()`. External references remain unresolved.

### Call the API

The `execute` tool includes the same `codemode.spec()` method and the host-provided `codemode.request()` method:

```js
async () => {
	const response = await codemode.request({
		method: "GET",
		path: "/orders",
		query: { status: "processing", limit: 20 },
	});

	return response.items.map(({ id, status }) => ({ id, status }));
};
```

The host callback receives `method`, `path`, optional `query`, optional `body`, optional `contentType`, and optional `rawBody` fields. For exact types, refer to the [`openApiMcpServer()` API](https://developers.cloudflare.com/agents/tools/codemode/api-reference/#openapimcpserver).

The `search` and `execute` tools use fixed example snippets. An optional `description` is appended to the `execute` tool description. This function does not use the `{{types}}` or `{{example}}` placeholders supported by [`codeMcpServer()`](#wrap-an-existing-mcp-server).

### Protect the API

The example reads the bearer token before creating the MCP server. Its request callback adds that token to outbound requests. The token never enters the sandbox.

`openApiMcpServer()` does not provide durable approval for each request inside `execute`. Enforce authorization and any required per-operation approval in the host callback before applying side effects. Validate paths instead of accepting arbitrary origins.

Do not include secrets in the OpenAPI document or API results. Both are available to model-written code.

## Sandbox and authorization boundary

Model-written code runs in an isolated Worker. `DynamicWorkerExecutor` blocks direct outbound `fetch()` and `connect()` calls by default, so generated code reaches external systems only through upstream MCP tools or the host-provided request callback.

Code execution does not replace authorization. Enforce permissions and any required approval inside upstream tool handlers or the host request callback before applying side effects. Do not expose credentials through tool results or OpenAPI documents.

## Limit results

Have model-written code select, map, aggregate, or paginate data before returning. The publisher limits final MCP responses to approximately 6,000 estimated tokens and marks truncated responses with `--- TRUNCATED ---`.

Truncation does not reduce API work already performed. Return focused identifiers, status fields, counts, and errors that support the model's next decision.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/agents/model-context-protocol/guides/build-codemode-mcp-server/#page","headline":"Build a Code Mode MCP server","description":"Expose an MCP server or a large OpenAPI service to any MCP client through sandboxed, model-written code.","url":"https://developers.cloudflare.com/agents/model-context-protocol/guides/build-codemode-mcp-server/","inLanguage":"en","image":"https://developers.cloudflare.com/agents/model-context-protocol/guides/build-codemode-mcp-server/og.png?v=d8dd3a2a21aec4f4","dateModified":"2026-10-27","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["AI","MCP"]}
```
