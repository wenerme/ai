---
description: Restrict WebSocket clients to view-only access so they receive Agent state without changing it.
title: Readonly connections
image: https://developers.cloudflare.com/agents/agent-class/readonly-connections/og.png?v=070be9463b8b07b0
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/agents/llms.txt
> Use this file to discover all available pages before exploring further.

# Readonly connections

Last updated Oct 29, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/agents/agent-class/readonly-connections/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

A readonly connection receives state updates but cannot change state. The `Agent` class uses the [readonly support in the `WebSockets` capability](https://developers.cloudflare.com/agents/runtime/capabilities/websockets/#readonly-connections) and adds methods for it.

```js
import { Agent, callable, getCurrentAgent } from "agents";

export class DocAgent extends Agent {
	initialState = { text: "" };

	shouldConnectionBeReadonly(_connection, ctx) {
		return new URL(ctx.request.url).searchParams.get("mode") === "view";
	}

	@callable()
	async edit(text) {
		// Throws "Connection is readonly" for a readonly caller.
		this.setState({ text });
	}

	@callable()
	async promote() {
		const { connection } = getCurrentAgent();
		if (connection) this.setConnectionReadonly(connection, false);
	}
}
```

```ts
import {
	Agent,
	callable,
	getCurrentAgent,
	type Connection,
	type ConnectionContext,
} from "agents";

type Doc = { text: string };

export class DocAgent extends Agent<Env, Doc> {
	initialState: Doc = { text: "" };

	shouldConnectionBeReadonly(_connection: Connection, ctx: ConnectionContext) {
		return new URL(ctx.request.url).searchParams.get("mode") === "view";
	}

	@callable()
	async edit(text: string) {
		// Throws "Connection is readonly" for a readonly caller.
		this.setState({ text });
	}

	@callable()
	async promote() {
		const { connection } = getCurrentAgent();
		if (connection) this.setConnectionReadonly(connection, false);
	}
}
```

| Agent method | Description |
| --- | --- |
| `shouldConnectionBeReadonly(connection, ctx)` | Decides when a connection is accepted. Defaults to `false` |
| `setConnectionReadonly(connection, readonly?)` | Changes it later. Pass `false` to make the connection writable |
| `isConnectionReadonly(connection)` | Returns whether the connection is readonly |

On the client, a refused write calls `onStateUpdateError` in `useAgent` or `AgentClient`.

## What readonly blocks

Readonly is enforced inside `setState()`. It blocks client-side `setState()` calls and any `@callable()` method that calls `this.setState()`. It does not block anything else. A callable that does work before it writes state still does that work for a readonly caller, so write state first, or check `isConnectionReadonly()` before side effects.

Do not trust a query parameter on its own to decide who can write. Check the user in your Worker before you route the request. For more information, refer to [Authentication](https://developers.cloudflare.com/agents/runtime/routing/authentication/).

### [WebSockets capability](https://developers.cloudflare.com/agents/runtime/capabilities/websockets/#readonly-connections)

How readonly connections work on any Durable Object.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/agents/agent-class/readonly-connections/#page","headline":"Readonly connections","description":"Restrict WebSocket clients to view-only access so they receive Agent state without changing it.","url":"https://developers.cloudflare.com/agents/agent-class/readonly-connections/","inLanguage":"en","image":"https://developers.cloudflare.com/agents/agent-class/readonly-connections/og.png?v=070be9463b8b07b0","dateModified":"2026-10-29","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
