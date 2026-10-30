---
description: Accept WebSocket connections on an Agent with onConnect() and onMessage(), broadcast to clients, tag connections, and control hibernation.
title: WebSockets
image: https://developers.cloudflare.com/agents/agent-class/websockets/og.png?v=b59d4260b0dd4fe9
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/agents/llms.txt
> Use this file to discover all available pages before exploring further.

# WebSockets

Last updated Oct 29, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/agents/agent-class/websockets/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

The `Agent` class installs the [`WebSockets` capability](https://developers.cloudflare.com/agents/runtime/capabilities/websockets/) and calls your `onConnect()`, `onMessage()`, `onClose()`, and `onError()` methods. Connections hibernate when idle, and `useAgent` and `AgentClient` from the [client SDK](https://developers.cloudflare.com/agents/agent-class/communication-channels/chat/client-sdk/) connect to it. This page covers the `Agent` methods. For connection state, tags, readonly connections, and transports, refer to the [`WebSockets` capability](https://developers.cloudflare.com/agents/runtime/capabilities/websockets/).

## Handle connections

```js
import { Agent } from "agents";

export class ChatAgent extends Agent {
	getConnectionTags(_connection, ctx) {
		const room = new URL(ctx.request.url).searchParams.get("room");
		return room ? [`room:${room}`] : [];
	}

	onConnect(connection, ctx) {
		connection.setState({ joinedAt: Date.now() });
		connection.send(JSON.stringify({ type: "welcome", id: connection.id }));
	}

	onMessage(connection, message) {
		// Send to everyone except the sender.
		this.broadcast(String(message), [connection.id]);
	}

	onClose(connection) {
		this.broadcast(JSON.stringify({ type: "left", id: connection.id }));
	}
}
```

```ts
import {
	Agent,
	type Connection,
	type ConnectionContext,
	type WSMessage,
} from "agents";

export class ChatAgent extends Agent<Env> {
	getConnectionTags(_connection: Connection, ctx: ConnectionContext): string[] {
		const room = new URL(ctx.request.url).searchParams.get("room");
		return room ? [`room:${room}`] : [];
	}

	onConnect(connection: Connection, ctx: ConnectionContext) {
		connection.setState({ joinedAt: Date.now() });
		connection.send(JSON.stringify({ type: "welcome", id: connection.id }));
	}

	onMessage(connection: Connection, message: WSMessage) {
		// Send to everyone except the sender.
		this.broadcast(String(message), [connection.id]);
	}

	onClose(connection: Connection) {
		this.broadcast(JSON.stringify({ type: "left", id: connection.id }));
	}
}
```

Route requests to the Agent with [`routeAgentRequest()`](https://developers.cloudflare.com/agents/agent-class/routing/), and check who is calling first. For more information, refer to [Authentication](https://developers.cloudflare.com/agents/runtime/routing/authentication/).

## Agent methods

| Agent method | What it does |
| --- | --- |
| `onConnect(connection, ctx)` | Runs after a client connects. `ctx.request` is the upgrade request |
| `onMessage(connection, message)` | Runs for each message that is not an Agents protocol frame |
| `onClose(connection, code, reason, wasClean)` | Runs when a connection closes |
| `onError(connection, error)` | Runs when a connection fails. The default logs and rethrows |
| `getConnectionTags(connection, ctx)` | Tags a connection when it is accepted |
| `broadcast(message, without?)` | Sends to every connection, except the IDs in `without` |
| `getConnections(tag?)`, `getConnection(id)` | Finds open connections |
| `shouldSendProtocolMessages(connection, ctx)` | Return `false` to turn off identity, state, and MCP frames for a connection |

These methods map to the `WebSockets` capability's handlers and options. For the `Connection` object, refer to [Connections](https://developers.cloudflare.com/agents/runtime/capabilities/websockets/#connections).

## Hibernation

An idle Agent hibernates while its WebSocket connections stay open. A message wakes it, and `onMessage()` runs as usual. Keep anything you need after a wake in `this.state`, `connection.state`, or SQLite, not in class fields. To keep the Agent in memory instead, set `static options = { hibernate: false }`.

## Next steps

### [WebSockets capability](https://developers.cloudflare.com/agents/runtime/capabilities/websockets/)

Connection state, tags, readonly connections, protocol frames, and transports.

### [Callable methods](https://developers.cloudflare.com/agents/agent-class/callable-methods/)

Let clients call methods on the Agent over WebSockets.

### [State](https://developers.cloudflare.com/agents/agent-class/state/)

Sync one value with every connected client.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/agents/agent-class/websockets/#page","headline":"WebSockets","description":"Accept WebSocket connections on an Agent with onConnect() and onMessage(), broadcast to clients, tag connections, and control hibernation.","url":"https://developers.cloudflare.com/agents/agent-class/websockets/","inLanguage":"en","image":"https://developers.cloudflare.com/agents/agent-class/websockets/og.png?v=b59d4260b0dd4fe9","dateModified":"2026-10-29","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
