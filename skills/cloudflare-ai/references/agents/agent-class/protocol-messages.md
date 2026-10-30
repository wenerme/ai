---
description: Turn off the identity, state, and MCP protocol frames an Agent sends to WebSocket clients, for binary or minimal clients.
title: Protocol messages
image: https://developers.cloudflare.com/agents/agent-class/protocol-messages/og.png?v=c964d35f5aa8e9cf
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/agents/llms.txt
> Use this file to discover all available pages before exploring further.

# Protocol messages

Last updated Oct 29, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/agents/agent-class/protocol-messages/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

When a client connects, an Agent sends it JSON protocol frames: its identity (`cf_agent_identity`), its state (`cf_agent_state`), and its MCP servers (`cf_agent_mcp_servers`). It sends state and MCP frames again whenever they change. `useAgent` and `AgentClient` read these frames for you.

Some clients cannot handle JSON text frames, such as IoT devices or MQTT clients. Return `false` from `shouldSendProtocolMessages()` to turn the frames off for them:

```js
import { Agent } from "agents";

export class DeviceAgent extends Agent {
	shouldSendProtocolMessages(_connection, ctx) {
		return ctx.request.headers.get("Sec-WebSocket-Protocol") !== "mqtt";
	}
}
```

```ts
import { Agent, type Connection, type ConnectionContext } from "agents";

export class DeviceAgent extends Agent<Env> {
	shouldSendProtocolMessages(_connection: Connection, ctx: ConnectionContext) {
		return ctx.request.headers.get("Sec-WebSocket-Protocol") !== "mqtt";
	}
}
```

The decision is made once, when the connection is accepted, and survives hibernation. A connection without protocol frames still sends and receives your own messages, receives `this.broadcast()`, and can call `@callable()` methods. `isConnectionProtocolEnabled(connection)` returns the current setting.

This uses the `protocol` option of the `WebSockets` capability. For more information, refer to [Control the protocol per connection](https://developers.cloudflare.com/agents/runtime/capabilities/websockets/#control-the-protocol-per-connection).

### [Readonly connections](https://developers.cloudflare.com/agents/agent-class/readonly-connections/)

Let a connection receive state without changing it.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/agents/agent-class/protocol-messages/#page","headline":"Protocol messages","description":"Turn off the identity, state, and MCP protocol frames an Agent sends to WebSocket clients, for binary or minimal clients.","url":"https://developers.cloudflare.com/agents/agent-class/protocol-messages/","inLanguage":"en","image":"https://developers.cloudflare.com/agents/agent-class/protocol-messages/og.png?v=c964d35f5aa8e9cf","dateModified":"2026-10-29","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
