---
description: Authenticate WebSocket connections to Cloudflare Agents across domains using signed tokens.
title: Cross-domain authentication
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/agents/llms.txt
> Use this file to discover all available pages before exploring further.

# Cross-domain authentication

Last updated Aug 17, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/agents/runtime/operations/cross-domain-authentication/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

When your Agents are deployed, to keep things secure, send a token from the client, then verify it on the server. This guide covers authentication patterns for WebSocket connections to agents.

## WebSocket authentication

WebSockets are not HTTP, so the handshake is limited when making cross-domain connections.

You cannot send:

* Custom headers during the upgrade
* `Authorization: Bearer ...` on connect

You can:

* Put a signed, short-lived token in the connection URL as query parameters
* Verify the token in your server's connect path

Note

Never place raw secrets in URLs. Use a JWT or a signed token that expires quickly, and is scoped to the user or room.

### Same origin

If the client and server share the origin, the browser will send cookies during the WebSocket handshake. Session-based auth can work here. Prefer HTTP-only cookies.

### Cross origin

Cross-origin cookie behavior depends on the cookie's domain and `SameSite` attributes, whether the two origins are same-site, and browser third-party cookie policy. If you cannot rely on a cookie, pass a short-lived credential in the URL query and verify it on the server.

## Usage examples

### Static authentication

```js
import { useAgent } from "agents/react";

function ChatComponent() {
	const agent = useAgent({
		agent: "my-agent",
		query: {
			token: "demo-token-123",
			userId: "demo-user",
		},
	});

	// Use agent to make calls, access state, etc.
}
```

```ts
import { useAgent } from "agents/react";

function ChatComponent() {
	const agent = useAgent({
		agent: "my-agent",
		query: {
			token: "demo-token-123",
			userId: "demo-user",
		},
	});

	// Use agent to make calls, access state, etc.
}
```

### Async authentication

Build query values right before connect. Use Suspense for async setup.

```js
import { useAgent } from "agents/react";
import { Suspense, useCallback } from "react";

function ChatComponent() {
	const asyncQuery = useCallback(async () => {
		const [token, user] = await Promise.all([getAuthToken(), getCurrentUser()]);
		return {
			token,
			userId: user.id,
			timestamp: Date.now().toString(),
		};
	}, []);

	const agent = useAgent({
		agent: "my-agent",
		query: asyncQuery,
	});

	// Use agent to make calls, access state, etc.
}

function App() {
	return (
		<Suspense fallback={<div>Authenticating...</div>}>
			<ChatComponent />
		</Suspense>
	);
}
```

```tsx
import { useAgent } from "agents/react";
import { Suspense, useCallback } from "react";

function ChatComponent() {
	const asyncQuery = useCallback(async () => {
		const [token, user] = await Promise.all([getAuthToken(), getCurrentUser()]);
		return {
			token,
			userId: user.id,
			timestamp: Date.now().toString(),
		};
	}, []);

	const agent = useAgent({
		agent: "my-agent",
		query: asyncQuery,
	});

	// Use agent to make calls, access state, etc.
}

function App() {
	return (
		<Suspense fallback={<div>Authenticating...</div>}>
			<ChatComponent />
		</Suspense>
	);
}
```

### JWT refresh pattern

`useAgent` resolves an async query before connecting and reevaluates it when reconnecting. Return a fresh, short-lived application token each time:

```js
import { useAgent } from "agents/react";
import { useCallback } from "react";

function useJWTAgent(agentName) {
	const asyncQuery = useCallback(async () => {
		return { token: await getShortLivedAccessToken() };
	}, []);

	return useAgent({
		agent: agentName,
		query: asyncQuery,
	});
}
```

```ts
import { useAgent } from "agents/react";
import { useCallback } from "react";

declare function getShortLivedAccessToken(): Promise<string>;

function useJWTAgent(agentName: string) {
	const asyncQuery = useCallback(async () => {
		return { token: await getShortLivedAccessToken() };
	}, []);

	return useAgent({
		agent: agentName,
		query: asyncQuery,
	});
}
```

## Cross-domain authentication

Pass credentials in the URL when connecting to another host, then verify on the server.

### Static cross-domain auth

```js
import { useAgent } from "agents/react";

function StaticCrossDomainAuth() {
	const agent = useAgent({
		agent: "my-agent",
		host: "https://my-agent.example.workers.dev",
		query: {
			token: "demo-token-123",
			userId: "demo-user",
		},
	});

	// Use agent to make calls, access state, etc.
}
```

```ts
import { useAgent } from "agents/react";

function StaticCrossDomainAuth() {
	const agent = useAgent({
		agent: "my-agent",
		host: "https://my-agent.example.workers.dev",
		query: {
			token: "demo-token-123",
			userId: "demo-user",
		},
	});

	// Use agent to make calls, access state, etc.
}
```

### Async cross-domain auth

```js
import { useAgent } from "agents/react";
import { useCallback } from "react";

function AsyncCrossDomainAuth() {
	const asyncQuery = useCallback(async () => {
		const [token, user] = await Promise.all([getAuthToken(), getCurrentUser()]);
		return {
			token,
			userId: user.id,
			timestamp: Date.now().toString(),
		};
	}, []);

	const agent = useAgent({
		agent: "my-agent",
		host: "https://my-agent.example.workers.dev",
		query: asyncQuery,
	});

	// Use agent to make calls, access state, etc.
}
```

```ts
import { useAgent } from "agents/react";
import { useCallback } from "react";

function AsyncCrossDomainAuth() {
	const asyncQuery = useCallback(async () => {
		const [token, user] = await Promise.all([getAuthToken(), getCurrentUser()]);
		return {
			token,
			userId: user.id,
			timestamp: Date.now().toString(),
		};
	}, []);

	const agent = useAgent({
		agent: "my-agent",
		host: "https://my-agent.example.workers.dev",
		query: asyncQuery,
	});

	// Use agent to make calls, access state, etc.
}
```

## Server-side verification

On the server side, verify the token in the `onConnect` handler:

```js
import { Agent, Connection, ConnectionContext } from "agents";

export class SecureAgent extends Agent {
	async onConnect(connection, ctx) {
		const url = new URL(ctx.request.url);
		const token = url.searchParams.get("token");
		const userId = url.searchParams.get("userId");

		// Verify the token
		if (!token || !(await this.verifyToken(token, userId))) {
			connection.close(4001, "Unauthorized");
			return;
		}

		// Store user info on the connection state
		connection.setState({ userId, authenticated: true });
	}

	async verifyToken(token, userId) {
		// Implement your token verification logic
		// For example, verify a JWT signature, check expiration, etc.
		try {
			const payload = await verifyJWT(token, this.env.JWT_SECRET);
			return payload.sub === userId && payload.exp > Date.now() / 1000;
		} catch {
			return false;
		}
	}

	async onMessage(connection, message) {
		// Check if connection is authenticated
		if (!connection.state?.authenticated) {
			connection.send(JSON.stringify({ error: "Not authenticated" }));
			return;
		}

		// Process message for authenticated user
		const userId = connection.state.userId;
		// ...
	}
}
```

```ts
import { Agent, Connection, ConnectionContext } from "agents";

export class SecureAgent extends Agent {
	async onConnect(connection: Connection, ctx: ConnectionContext) {
		const url = new URL(ctx.request.url);
		const token = url.searchParams.get("token");
		const userId = url.searchParams.get("userId");

		// Verify the token
		if (!token || !(await this.verifyToken(token, userId))) {
			connection.close(4001, "Unauthorized");
			return;
		}

		// Store user info on the connection state
		connection.setState({ userId, authenticated: true });
	}

	private async verifyToken(token: string, userId: string): Promise<boolean> {
		// Implement your token verification logic
		// For example, verify a JWT signature, check expiration, etc.
		try {
			const payload = await verifyJWT(token, this.env.JWT_SECRET);
			return payload.sub === userId && payload.exp > Date.now() / 1000;
		} catch {
			return false;
		}
	}

	async onMessage(connection: Connection, message: string) {
		// Check if connection is authenticated
		if (!connection.state?.authenticated) {
			connection.send(JSON.stringify({ error: "Not authenticated" }));
			return;
		}

		// Process message for authenticated user
		const userId = connection.state.userId;
		// ...
	}
}
```

## Best practices

1. **Use short-lived tokens** \- Tokens in URLs may be logged. Keep expiration times short (minutes, not hours).
2. **Scope tokens appropriately** \- Include the agent name or instance in the token claims to prevent token reuse across agents.
3. **Validate on every connection** \- Always verify tokens in `onConnect`, not just once.
4. **Use HTTPS** \- Always use secure WebSocket connections (`wss://`) in production.
5. **Rotate secrets** \- Regularly rotate your JWT signing keys or token secrets.
6. **Log authentication failures** \- Track failed authentication attempts for security monitoring.

## Next steps

### [Routing](https://developers.cloudflare.com/agents/runtime/communication/routing/)

Routing and authentication hooks.

### [WebSockets](https://developers.cloudflare.com/agents/runtime/communication/websockets/)

Real-time bidirectional communication.

### [GitHub OAuth agent example](https://github.com/cloudflare/agents/tree/main/examples/auth-agent)

Protect an app built with Agents using GitHub OAuth, HTTP-only cookies, and server-owned Durable Object routing.

### [Agents API](https://developers.cloudflare.com/agents/runtime/agents-api/)

Complete API reference for the Agents SDK.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/agents/runtime/operations/cross-domain-authentication/#page","headline":"Cross-domain authentication · Cloudflare Agents docs","description":"Authenticate WebSocket connections to Cloudflare Agents across domains using signed tokens.","url":"https://developers.cloudflare.com/agents/runtime/operations/cross-domain-authentication/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
