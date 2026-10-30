---
description: Store one validated value in a Durable Object with the State capability, and sync it to useAgent clients in real time with WebSockets.
title: State
image: https://developers.cloudflare.com/agents/runtime/capabilities/state/og.png?v=549cf73d1f6fc698
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/agents/llms.txt
> Use this file to discover all available pages before exploring further.

# State

Last updated Oct 29, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/agents/runtime/capabilities/state/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

`State` from `agents/state` stores one JSON value in the Durable Object's SQLite database. It loads the value on first read, caches it in memory, validates every change, and calls you back after each one. Combine it with [`WebSockets`](https://developers.cloudflare.com/agents/runtime/capabilities/websockets/) to sync the value with connected clients.

## Install the capability

```js
import { DurableObject } from "cloudflare:workers";
import { Lifecycle } from "agents/lifecycle";
import { State } from "agents/state";

export class SettingsAgent extends DurableObject {
	settings = new State({
		initialState: { theme: "light", notifications: true },
	});
	lifecycle = Lifecycle.install(this).use(this.settings);

	async onRequest(request) {
		if (request.method === "PUT") {
			this.settings.set(await request.json());
		}
		return Response.json(this.settings.get());
	}
}
```

```ts
import { DurableObject } from "cloudflare:workers";
import { Lifecycle } from "agents/lifecycle";
import { State } from "agents/state";

type Settings = { theme: "light" | "dark"; notifications: boolean };

export class SettingsAgent extends DurableObject<Env> {
	readonly settings = new State<Settings>({
		initialState: { theme: "light", notifications: true },
	});
	readonly lifecycle = Lifecycle.install(this).use(this.settings);

	async onRequest(request: Request): Promise<Response> {
		if (request.method === "PUT") {
			this.settings.set(await request.json<Settings>());
		}
		return Response.json(this.settings.get());
	}
}
```

| Method | Description |
| --- | --- |
| `get()` | Returns the current value, or `undefined` when nothing is stored |
| `set(next, source?)` | Validates and stores `next`, then calls `onChanged`. `source` defaults to `"server"` |

`set()` writes synchronously and throws when the validator rejects the change. The capability ID is `"state"`, so install one `State` per Durable Object. To store several values, put them in one object or use your own tables.

## Options

| Option | Description |
| --- | --- |
| `initialState` | Stored on first read when no value exists |
| `validateStateChange` | `(next, source) => void`. Throw to reject a change before it is stored. It must be synchronous |
| `onChanged` | `(state, source) => void` or a promise. Runs after a change is stored. A failure does not undo the write |

## Know where a change came from

Both hooks receive a `StateChangeSource`. It is `"server"` for changes your own code makes, or the `Connection` that sent the change from a client:

```js
import { DurableObject } from "cloudflare:workers";
import { Lifecycle } from "agents/lifecycle";
import { State } from "agents/state";

export class DocAgent extends DurableObject {
	doc = new State({
		initialState: { title: "Untitled" },
		validateStateChange: (next, source) => {
			if (source !== "server" && next.lockedBy !== undefined) {
				throw new Error("Only the server can lock a document");
			}
		},
		onChanged: (state, source) => {
			const who = source === "server" ? "server" : source.id;
			console.log(`${who} changed the title to ${state.title}`);
		},
	});
	lifecycle = Lifecycle.install(this).use(this.doc);
}
```

```ts
import { DurableObject } from "cloudflare:workers";
import { Lifecycle } from "agents/lifecycle";
import { State, type StateChangeSource } from "agents/state";

type Doc = { title: string; lockedBy?: string };

export class DocAgent extends DurableObject<Env> {
	readonly doc = new State<Doc>({
		initialState: { title: "Untitled" },
		validateStateChange: (next: Doc, source: StateChangeSource) => {
			if (source !== "server" && next.lockedBy !== undefined) {
				throw new Error("Only the server can lock a document");
			}
		},
		onChanged: (state: Doc, source: StateChangeSource) => {
			const who = source === "server" ? "server" : source.id;
			console.log(`${who} changed the title to ${state.title}`);
		},
	});
	readonly lifecycle = Lifecycle.install(this).use(this.doc);
}
```

## Sync state with clients

Pass the same `State` instance to `WebSockets` and to the Lifecycle. Call `broadcastState(source)` from `onChanged` to tell the other clients about each change:

```js
import { DurableObject } from "cloudflare:workers";
import { Lifecycle } from "agents/lifecycle";
import { routeAgentRequest } from "agents/routing";
import { State } from "agents/state";
import { WebSockets } from "agents/websockets";

export class CounterAgent extends DurableObject {
	state = new State({
		initialState: { count: 0 },
		validateStateChange: (next) => {
			if (!Number.isSafeInteger(next.count) || next.count < 0) {
				throw new Error("count must be a non-negative integer");
			}
		},
		onChanged: (_state, source) => this.webSockets.broadcastState(source),
	});
	webSockets = new WebSockets({ state: this.state });
	lifecycle = Lifecycle.install(this).use(this.state).use(this.webSockets);
}

export default {
	async fetch(request, env) {
		return (
			(await routeAgentRequest(request, env)) ??
			new Response("Not found", { status: 404 })
		);
	},
};
```

```ts
import { DurableObject } from "cloudflare:workers";
import { Lifecycle } from "agents/lifecycle";
import { routeAgentRequest } from "agents/routing";
import { State } from "agents/state";
import { WebSockets } from "agents/websockets";

type Counter = { count: number };

export class CounterAgent extends DurableObject<Env> {
	readonly state: State<Counter> = new State<Counter>({
		initialState: { count: 0 },
		validateStateChange: (next) => {
			if (!Number.isSafeInteger(next.count) || next.count < 0) {
				throw new Error("count must be a non-negative integer");
			}
		},
		onChanged: (_state, source) => this.webSockets.broadcastState(source),
	});
	readonly webSockets: WebSockets = new WebSockets({ state: this.state });
	readonly lifecycle = Lifecycle.install(this)
		.use(this.state)
		.use(this.webSockets);
}

export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		return (
			(await routeAgentRequest(request, env)) ??
			new Response("Not found", { status: 404 })
		);
	},
} satisfies ExportedHandler<Env>;
```

The `state` and `webSockets` fields refer to each other, so give them explicit types.

On connect, `WebSockets` sends each client its identity frame and then the current value. When a client calls `setState()`, the change goes through `validateStateChange` with the connection as `source`. A rejected change is logged on the server, and the client receives a generic error. `broadcastState(source)` sends the new value to every connection except `source`, which already has it.

Read and update the value from React with [`useAgent`](https://developers.cloudflare.com/agents/agent-class/communication-channels/chat/client-sdk/):

```tsx
import { useAgent } from "agents/react";

export function Counter() {
	const agent = useAgent<{ count: number }>({
		agent: "CounterAgent",
		name: "demo",
	});
	const count = agent.state?.count ?? 0;
	return (
		<button onClick={() => agent.setState({ count: count + 1 })}>
			{count}
		</button>
	);
}
```

To refuse state changes from some connections, use [readonly connections](https://developers.cloudflare.com/agents/runtime/capabilities/websockets/#readonly-connections). A readonly connection still receives the state.

`connection.setState()` is a different feature. It stores a value on one connection and never syncs it to other clients.

## Storage

`State` stores its value in the `cf_agents_state` table. Every change rewrites the whole value, so keep large or relational data in your own tables.

## On the Agent class

The [`Agent` class](https://developers.cloudflare.com/agents/agent-class/) installs a `State` and a `WebSockets` wired together. Its `initialState`, `this.state`, `this.setState()`, `validateStateChange()`, and `onStateChanged()` call them, and it broadcasts each change for you. For more information, refer to [Store and sync state](https://developers.cloudflare.com/agents/agent-class/state/).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/agents/runtime/capabilities/state/#page","headline":"State","description":"Store one validated value in a Durable Object with the State capability, and sync it to useAgent clients in real time with WebSockets.","url":"https://developers.cloudflare.com/agents/runtime/capabilities/state/","inLanguage":"en","image":"https://developers.cloudflare.com/agents/runtime/capabilities/state/og.png?v=549cf73d1f6fc698","dateModified":"2026-10-29","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
