---
description: Learn the runtime under every agent. Build a counter on a Durable Object with the Agents SDK Lifecycle, add durable state and WebSockets, then connect a client that stays in sync.
title: Learn the runtime
image: https://developers.cloudflare.com/agents/getting-started/learn-the-runtime/og.png?v=f3a922910ac4962f
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/agents/llms.txt
> Use this file to discover all available pages before exploring further.

# Learn the runtime

Last updated Oct 29, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/agents/getting-started/learn-the-runtime/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

An agent on Cloudflare runs in a [Durable Object](https://developers.cloudflare.com/durable-objects/). The Agents SDK [Lifecycle](https://developers.cloudflare.com/agents/runtime/lifecycle/) runs inside that Durable Object and starts the capabilities you add to it. A harness, such as the Pi harness in [Build your first Durable Agent](https://developers.cloudflare.com/agents/getting-started/quick-start/), is one of those capabilities.

This guide leaves the harness out so you can see the runtime on its own. You build a counter on a Durable Object and add two capabilities, [`State`](https://developers.cloudflare.com/agents/runtime/capabilities/state/) and [`WebSockets`](https://developers.cloudflare.com/agents/runtime/capabilities/websockets/). Then you call it over HTTP and connect a client that stays in sync over WebSockets. Everything here works the same way on an object that also runs a harness.

## Prerequisites

- A [Cloudflare account ↗︎](https://dash.cloudflare.com/sign-up)
- Node.js 22 or later

## Create a project

1. Create a Worker project:npmyarnpnpm

   ```
   npm create cloudflare@latest -- my-agent --type=hello-world --lang=ts
   ```

   ```
   yarn create cloudflare my-agent --type=hello-world --lang=ts
   ```

   ```
   pnpm create cloudflare@latest my-agent --type=hello-world --lang=ts
   ```

2. Go to the project directory and install the Agents SDK:

   ```sh
   cd my-agent
   ```

   npmyarnpnpmbun

   ```
   npm i agents
   ```

   ```
   yarn add agents
   ```

   ```
   pnpm add agents
   ```

   ```
   bun add agents
   ```

## Configure Wrangler

Add a SQLite-backed Durable Object to your Wrangler configuration file:

```jsonc
{
	"name": "my-agent",
	"main": "src/index.ts",
	"upload_source_maps": true,
	// Set this to today's date
	"compatibility_date": "2026-10-30",
	"compatibility_flags": ["nodejs_compat"],
	"durable_objects": {
		"bindings": [{ "name": "Counter", "class_name": "Counter" }],
	},
	"exports": {
		"Counter": { "type": "durable-object", "storage": "sqlite" },
	},
}
```

```toml
name = "my-agent"
main = "src/index.ts"
upload_source_maps = true
# Set this to today's date
compatibility_date = "2026-10-30"
compatibility_flags = [ "nodejs_compat" ]

[[durable_objects.bindings]]
name = "Counter"
class_name = "Counter"

[exports.Counter]
type = "durable-object"
storage = "sqlite"
```

- `name` in the binding becomes the property on `env`, for example `env.Counter`.
- `class_name` must match the exported class name.

- `exports` declares the class with `"storage": "sqlite"`. The [Lifecycle](https://developers.cloudflare.com/agents/runtime/lifecycle/) and its capabilities store their data in each object's SQLite database. Refer to [Durable Object class exports](https://developers.cloudflare.com/durable-objects/reference/durable-objects-migrations/).
- The `agents` package requires the `nodejs_compat` flag.

## Write the agent

Replace `src/index.ts`:

*src/index.jsjs*

```js
import { DurableObject, RpcTarget } from "cloudflare:workers";
import { routeAgentRequest } from "agents";
import { Lifecycle } from "agents/lifecycle";
import { State } from "agents/state";
import { WebSockets } from "agents/websockets";

export class Counter extends DurableObject {
	// Durable state, stored in the object's SQLite database
	state = new State({
		initialState: { count: 0 },
		onChanged: (_state, source) => this.webSockets.broadcastState(source),
	});

	// WebSocket connections. Each client receives the state, and can
	// call the methods on CounterMethods.
	webSockets = new WebSockets({
		state: this.state,
		callables: new CounterMethods(this),
	});

	// The lifecycle starts each capability inside the Durable Object
	lifecycle = Lifecycle.install(this).use(this.state).use(this.webSockets);

	increment() {
		const count = (this.state.get()?.count ?? 0) + 1;
		this.state.set({ count });
		return count;
	}

	onRequest(request) {
		if (request.method === "POST") {
			return Response.json({ count: this.increment() });
		}
		return Response.json(this.state.get());
	}
}

// The methods that clients can call over a WebSocket
class CounterMethods extends RpcTarget {
	#counter;

	constructor(counter) {
		super();
		this.#counter = counter;
	}

	increment() {
		return this.#counter.increment();
	}

	reset() {
		this.#counter.state.set({ count: 0 });
	}
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

*src/index.tsts*

```ts
import { DurableObject, RpcTarget } from "cloudflare:workers";
import { routeAgentRequest } from "agents";
import { Lifecycle } from "agents/lifecycle";
import { State } from "agents/state";
import { WebSockets } from "agents/websockets";

export type CounterState = { count: number };

export class Counter extends DurableObject<Env> {
	// Durable state, stored in the object's SQLite database
	readonly state: State<CounterState> = new State({
		initialState: { count: 0 },
		onChanged: (_state, source) => this.webSockets.broadcastState(source),
	});

	// WebSocket connections. Each client receives the state, and can
	// call the methods on CounterMethods.
	readonly webSockets: WebSockets = new WebSockets({
		state: this.state,
		callables: new CounterMethods(this),
	});

	// The lifecycle starts each capability inside the Durable Object
	readonly lifecycle = Lifecycle.install(this)
		.use(this.state)
		.use(this.webSockets);

	increment(): number {
		const count = (this.state.get()?.count ?? 0) + 1;
		this.state.set({ count });
		return count;
	}

	onRequest(request: Request): Response {
		if (request.method === "POST") {
			return Response.json({ count: this.increment() });
		}
		return Response.json(this.state.get());
	}
}

// The methods that clients can call over a WebSocket
class CounterMethods extends RpcTarget {
	readonly #counter: Counter;

	constructor(counter: Counter) {
		super();
		this.#counter = counter;
	}

	increment(): number {
		return this.#counter.increment();
	}

	reset(): void {
		this.#counter.state.set({ count: 0 });
	}
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

Here is what each part does:

- `Counter` extends the platform `DurableObject`. Each named instance is one agent, with its own SQLite database.
- [`State`](https://developers.cloudflare.com/agents/runtime/capabilities/state/) stores one JSON value in that database. `get()` reads it and `set()` writes it. `onChanged` runs after every change, and here it sends the new value to every connected client.
- [`WebSockets`](https://developers.cloudflare.com/agents/runtime/capabilities/websockets/) accepts WebSocket connections. With `state`, each client receives the current value when it connects and every time it changes. `callables` lists the methods clients can call.
- `Lifecycle.install(this)` takes over the object's `fetch`, `alarm`, and WebSocket handlers, and `.use()` adds each capability. Do not define `fetch()` or `alarm()` on the class yourself. Use `onRequest()`, `onStart()`, and `onAlarm()` instead.
- `onRequest()` handles HTTP requests that no capability handled. A `POST` increments the counter, and a `GET` returns the state.
- `routeAgentRequest()` sends requests for `/agents/counter/:name` to the `Counter` instance called `:name`.

Generate types for the `Env` interface:

```sh
npx wrangler types
```

## Run the agent locally

1. Start the development server:

   ```sh
   npx wrangler dev
   ```

2. In another terminal, increment the counter called `demo`:

   ```sh
   curl -X POST http://localhost:8787/agents/counter/demo
   ```

   ```json
   { "count": 1 }
   ```

3. Read the state of a different counter. Each name is a separate agent:

   ```sh
   curl http://localhost:8787/agents/counter/other
   ```

   ```json
   { "count": 0 }
   ```

## Connect a client

`AgentClient` from `agents/client` opens a WebSocket to an agent, keeps a copy of its state, and calls its methods. Create `client.mjs` in the project directory:

*client.mjsjs*

```js
import { AgentClient } from "agents/client";

const counter = new AgentClient({
	agent: "Counter",
	name: "demo",
	host: "localhost:8787",
	onStateUpdate: (state) => console.log("count is now", state.count),
});

await counter.ready;
await counter.stub.increment();
await counter.stub.increment();
counter.close();
```

With the development server running, run it:

```sh
node client.mjs
```

```txt
count is now 1
count is now 2
count is now 3
```

The first line is the state the client receives when it connects. The other two are the broadcasts after each `increment()`. Every client connected to `demo` receives the same updates, including changes made over HTTP.

In a React app, use the `useAgent` hook from `agents/react`. `agent.state` updates when the agent's state changes:

```tsx
import { useAgent } from "agents/react";
import type { CounterState } from "./index";

export function CounterView() {
	const agent = useAgent<CounterState>({ agent: "Counter", name: "demo" });

	return (
		<div>
			<p>{agent.state?.count ?? 0}</p>
			<button onClick={() => agent.stub.increment()}>+</button>
			<button onClick={() => agent.stub.reset()}>Reset</button>
		</div>
	);
}
```

Clients can also replace the state directly with `agent.setState()`. To check or refuse those changes, pass `validateStateChange` to [`State`](https://developers.cloudflare.com/agents/runtime/capabilities/state/), or mark connections read-only with the `readonly` option on [`WebSockets`](https://developers.cloudflare.com/agents/runtime/capabilities/websockets/).

## How it works

```
flowchart LR
    A["Client"] <-->|WebSocket| B["Counter<br/>(Durable Object)"]
    C["curl"] -->|HTTP| B
    B --> D["SQLite<br/>(State)"]

```

- **One agent per name.** `/agents/counter/demo` and `/agents/counter/other` are two Durable Object instances, each with its own database.
- **Durable state.** [`State`](https://developers.cloudflare.com/agents/runtime/capabilities/state/) writes every change to SQLite, so the count survives restarts, deploys, and eviction from memory.
- **Real-time sync.** Every client connected to the same agent receives each change.
- **Hibernation.** WebSocket connections use the [WebSocket Hibernation API](https://developers.cloudflare.com/durable-objects/best-practices/websockets/), so an idle agent leaves memory while its clients stay connected. When a message arrives, the Lifecycle starts again before it handles the message.

## Deploy to Cloudflare

```sh
npx wrangler deploy
```

Your agent is now running on Cloudflare's global network. To call it, replace `localhost:8787` with your `workers.dev` URL. A deployed Worker uses HTTPS and WSS.

## Troubleshooting

### Requests to `/agents/...` return 404

- Export the Durable Object class from your Worker's main module.
- Check that `class_name` in the binding and the key in `exports` match the exported class name.
- The default route is `/agents/{binding}/{name}`, with the binding name in kebab case. A binding called `Counter` is reached at `/agents/counter/...`, and `MyAgent` at `/agents/my-agent/...`.

### The object cannot determine its name

The Lifecycle needs the Durable Object's name. Address the object with `getByName()`, `idFromName()`, or `routeAgentRequest()`. Objects created with `newUniqueId()` or `idFromString()` do not have a name.

### `onRequest()` or a capability never runs

Remove any `fetch()`, `alarm()`, `webSocketMessage()`, `webSocketClose()`, or `webSocketError()` method from the class. The Lifecycle only installs a handler that the class does not already define.

## Next steps

- [Build your first Durable Agent](https://developers.cloudflare.com/agents/getting-started/quick-start/): run the Pi harness on the same lifecycle.
- [Pi harness](https://developers.cloudflare.com/agents/harnesses/pi/): add tools, sessions, and a browser UI to a Pi agent.
- [Add to an existing project](https://developers.cloudflare.com/agents/getting-started/add-to-existing-project/): add the Lifecycle to a Durable Object you already have.
- [Lifecycle](https://developers.cloudflare.com/agents/runtime/lifecycle/): the request path, the job queue, and how to write your own capability.
- [Scheduler](https://developers.cloudflare.com/agents/runtime/capabilities/scheduler/): run work later, on an interval, or on a cron schedule.
- [Testing your Agents](https://developers.cloudflare.com/agents/getting-started/testing-your-agent/): write tests with Vitest and the Workers test pool.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/agents/getting-started/learn-the-runtime/#page","headline":"Learn the runtime","description":"Learn the runtime under every agent. Build a counter on a Durable Object with the Agents SDK Lifecycle, add durable state and WebSockets, then connect a client that stays in sync.","url":"https://developers.cloudflare.com/agents/getting-started/learn-the-runtime/","inLanguage":"en","image":"https://developers.cloudflare.com/agents/getting-started/learn-the-runtime/og.png?v=f3a922910ac4962f","dateModified":"2026-10-29","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
