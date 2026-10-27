---
description: Configure Streamable HTTP transport for remote MCP servers built with the Agents SDK.
title: Transport
image: https://developers.cloudflare.com/agents/model-context-protocol/protocol/transport/og.png?v=711c26a3dccb5280
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/agents/llms.txt
> Use this file to discover all available pages before exploring further.

# Transport

Last updated Oct 27, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/agents/model-context-protocol/protocol/transport/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

The Model Context Protocol (MCP) specification defines two standard [transport mechanisms ↗︎](https://modelcontextprotocol.io/specification/2025-06-18/basic/transports) for communication between clients and servers:

1. **stdio** — Communication over standard in and standard out, designed for local MCP connections.
2. **Streamable HTTP** — The standard transport method for remote MCP connections, [introduced ↗︎](https://modelcontextprotocol.io/specification/2025-03-26/basic/transports#streamable-http) in March 2025. It uses a single HTTP endpoint for bidirectional messaging.

Note

Server-Sent Events (SSE) was previously used for remote MCP connections but has been deprecated in favor of Streamable HTTP. `createMcpHandler` serves Streamable HTTP only.

MCP servers built with the [Agents SDK](https://developers.cloudflare.com/agents) use [`createMcpHandler`](https://developers.cloudflare.com/agents/model-context-protocol/apis/handler-api/) to handle Streamable HTTP transport.

## Implementing remote MCP transport

Use [`createMcpHandler`](https://developers.cloudflare.com/agents/model-context-protocol/apis/handler-api/) to create an MCP server that handles Streamable HTTP transport.

#### Get started quickly

You can use the "Deploy to Cloudflare" button to create a remote MCP server.

[![Deploy to Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/cloudflare/agents/tree/main/examples/mcp-worker)

#### Remote MCP server (without authentication)

Create an MCP server using `createMcpHandler`. View the [complete example on GitHub ↗︎](https://github.com/cloudflare/agents/tree/main/examples/mcp-worker).

```js
import { createMcpHandler } from "agents/mcp/server";
import { McpServer } from "@modelcontextprotocol/server";
import { z } from "zod";

function createServer() {
	const server = new McpServer({
		name: "My MCP Server",
		version: "1.0.0",
	});

	server.registerTool(
		"hello",
		{
			description: "Returns a greeting message",
			inputSchema: { name: z.string().optional() },
		},
		async ({ name }) => {
			return {
				content: [{ text: `Hello, ${name ?? "World"}!`, type: "text" }],
			};
		},
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
	const server = new McpServer({
		name: "My MCP Server",
		version: "1.0.0",
	});

	server.registerTool(
		"hello",
		{
			description: "Returns a greeting message",
			inputSchema: { name: z.string().optional() },
		},
		async ({ name }) => {
			return {
				content: [{ text: `Hello, ${name ?? "World"}!`, type: "text" }],
			};
		},
	);

	return server;
}

export default {
	fetch(request, env, ctx) {
		return createMcpHandler(createServer)(request, env, ctx);
	},
} satisfies ExportedHandler;
```

#### MCP server with authentication

To require OAuth, wrap the handler in an `OAuthResourceServer` from [Workers OAuth Provider ↗︎](https://github.com/cloudflare/workers-oauth-provider). It answers requests without a valid token with a `401` that points MCP clients at your authorization server. Refer to [Authorization](https://developers.cloudflare.com/agents/model-context-protocol/protocol/authorization/) for the authorization server and the full setup.

```js
import {
	OAuthResourceServer,
	insufficientScope,
} from "@cloudflare/workers-oauth-provider";
import { McpServer } from "@modelcontextprotocol/server";
import { createMcpHandler, getMcpAuthContext } from "agents/mcp/server";
import { env } from "cloudflare:workers";

function createServer() {
	const server = new McpServer({ name: "my-mcp-server", version: "1.0.0" });
	const props = getMcpAuthContext()?.props;

	server.registerTool(
		"whoami",
		{ description: "Return the signed-in user" },
		async () => ({
			content: [{ type: "text", text: props.userId }],
		}),
	);

	return server;
}

const mcpHandler = createMcpHandler(createServer);

export default new OAuthResourceServer({
	resourceMetadata: {
		resource: env.MCP_SERVER_URL, // tokens for any other resource are rejected
		authorization_servers: [env.AUTH_SERVER_URL],
	},
	requiredScopes: ["mcp:read"],
	validateToken: (env) => env.AUTH_SERVER.validateToken,
	handler: {
		fetch(request, env, ctx) {
			// requiredScopes is advertised, not enforced: check it here.
			if (!ctx.auth.scope.includes("mcp:read")) {
				return insufficientScope(ctx.auth, ["mcp:read"]);
			}
			return mcpHandler(request, env, ctx);
		},
	},
});
```

```ts
import {
	OAuthResourceServer,
	insufficientScope,
	type AuthorizationServerBinding,
} from "@cloudflare/workers-oauth-provider";
import { McpServer } from "@modelcontextprotocol/server";
import { createMcpHandler, getMcpAuthContext } from "agents/mcp/server";
import { env } from "cloudflare:workers";

type AuthProps = { userId: string };

interface Env {
	AUTH_SERVER: AuthorizationServerBinding<AuthProps>;
}

function createServer() {
	const server = new McpServer({ name: "my-mcp-server", version: "1.0.0" });
	const props = getMcpAuthContext()?.props as AuthProps;

	server.registerTool(
		"whoami",
		{ description: "Return the signed-in user" },
		async () => ({
			content: [{ type: "text", text: props.userId }],
		}),
	);

	return server;
}

const mcpHandler = createMcpHandler(createServer);

export default new OAuthResourceServer<Env, AuthProps>({
	resourceMetadata: {
		resource: env.MCP_SERVER_URL, // tokens for any other resource are rejected
		authorization_servers: [env.AUTH_SERVER_URL],
	},
	requiredScopes: ["mcp:read"],
	validateToken: (env) => env.AUTH_SERVER.validateToken,
	handler: {
		fetch(request, env, ctx) {
			// requiredScopes is advertised, not enforced: check it here.
			if (!ctx.auth.scope.includes("mcp:read")) {
				return insufficientScope(ctx.auth, ["mcp:read"]);
			}
			return mcpHandler(request, env, ctx);
		},
	},
});
```

### State without protocol sessions

The stateless handler has no MCP session. Keep data that must survive between requests in a Durable Object, D1, KV, or R2, keyed by the authenticated user rather than an MCP session ID.

To move an existing `McpAgent` server, refer to [Migrate to MCP SDK v2](https://developers.cloudflare.com/agents/model-context-protocol/guides/migrate-to-mcp-sdk-v2/). The deprecated API is documented in the [`McpAgent` reference](https://developers.cloudflare.com/agents/model-context-protocol/apis/agent-api/).

### Testing with MCP clients

Test your MCP server with a client that supports Streamable HTTP connections.

Follow [Test a Remote MCP Server](https://developers.cloudflare.com/agents/model-context-protocol/guides/test-remote-mcp-server/) for instructions for Claude Code, Cursor, Windsurf, and other MCP clients.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/agents/model-context-protocol/protocol/transport/#page","headline":"Transport","description":"Configure Streamable HTTP transport for remote MCP servers built with the Agents SDK.","url":"https://developers.cloudflare.com/agents/model-context-protocol/protocol/transport/","inLanguage":"en","image":"https://developers.cloudflare.com/agents/model-context-protocol/protocol/transport/og.png?v=711c26a3dccb5280","dateModified":"2026-10-27","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["MCP"]}
```
