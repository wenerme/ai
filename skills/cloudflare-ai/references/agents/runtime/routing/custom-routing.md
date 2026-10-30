---
description: Reach a Lifecycle Durable Object without the default /agents/:binding/:name URL. Pick the object on the server, forward requests with getByName(), and call it over RPC.
title: Custom routing
image: https://developers.cloudflare.com/agents/runtime/routing/custom-routing/og.png?v=8511eedb77882078
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/agents/llms.txt
> Use this file to discover all available pages before exploring further.

# Custom routing

Last updated Oct 29, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/agents/runtime/routing/custom-routing/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

`routeAgentRequest()` is optional. Any request that reaches a Lifecycle Durable Object through `fetch()` goes through the [Lifecycle](https://developers.cloudflare.com/agents/runtime/lifecycle/), however your Worker found the object. Use custom routing when you want your own URLs, or when the server, not the client, decides which object a request goes to.

## Forward a request to a named object

Get a stub by name and call `fetch()`:

*src/index.jsjs*

```js
export default {
	async fetch(request, env) {
		const url = new URL(request.url);

		// /chat/:room goes to the ChatRoom object named :room.
		const room = url.pathname.match(/^\/chat\/([^/]+)/)?.[1];
		if (room) {
			return env.ChatRoom.getByName(decodeURIComponent(room)).fetch(request);
		}

		return new Response("Not found", { status: 404 });
	},
};
```

*src/index.tsts*

```ts
export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		const url = new URL(request.url);

		// /chat/:room goes to the ChatRoom object named :room.
		const room = url.pathname.match(/^\/chat\/([^/]+)/)?.[1];
		if (room) {
			return env.ChatRoom.getByName(decodeURIComponent(room)).fetch(request);
		}

		return new Response("Not found", { status: 404 });
	},
} satisfies ExportedHandler<Env>;
```

The forwarded request starts the object if it is cold, then reaches its capabilities and `onRequest()`. WebSocket upgrades work the same way, so the [`WebSockets` capability](https://developers.cloudflare.com/agents/runtime/capabilities/websockets/) accepts them.

For placement, address the object the same way `routeAgentRequest()` does:

```js
const namespace = env.ChatRoom.jurisdiction("eu");
const stub = namespace.get(namespace.idFromName("general"), {
	locationHint: "weur",
});
const response = await stub.fetch(request);
```

```ts
const namespace = env.ChatRoom.jurisdiction("eu");
const stub = namespace.get(namespace.idFromName("general"), {
	locationHint: "weur",
});
const response = await stub.fetch(request);
```

The [`props` routing option](https://developers.cloudflare.com/agents/runtime/routing/options/#props) only works through `routeAgentRequest()`. For a forwarded request, send the values with the request, or call the object over RPC.

## Choose the object on the server

When the object depends on who is calling, choose its name from the session. The client connects to a fixed path and never sees or sends the name:

*src/index.jsjs*

```js
import { routeAgentRequest } from "agents/routing";

async function getUserId(request) {
	// Read the user from your session cookie or token.
	return request.headers.get("x-user-id");
}

export default {
	async fetch(request, env) {
		const url = new URL(request.url);

		if (url.pathname === "/me") {
			const userId = await getUserId(request);
			if (!userId) return new Response("Unauthorized", { status: 401 });
			return env.UserAgent.getByName(userId).fetch(request);
		}

		return (
			(await routeAgentRequest(request, env)) ??
			new Response("Not found", { status: 404 })
		);
	},
};
```

*src/index.tsts*

```ts
import { routeAgentRequest } from "agents/routing";

async function getUserId(request: Request): Promise<string | null> {
	// Read the user from your session cookie or token.
	return request.headers.get("x-user-id");
}

export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		const url = new URL(request.url);

		if (url.pathname === "/me") {
			const userId = await getUserId(request);
			if (!userId) return new Response("Unauthorized", { status: 401 });
			return env.UserAgent.getByName(userId).fetch(request);
		}

		return (
			(await routeAgentRequest(request, env)) ??
			new Response("Not found", { status: 404 })
		);
	},
} satisfies ExportedHandler<Env>;
```

Connect the client to that path with `basePath`. The `agent` option is still required, but it is not used to build the URL:

```tsx
import { useAgent } from "agents/react";

export function Profile() {
	const agent = useAgent({
		agent: "UserAgent",
		basePath: "me",
		onIdentity: (name, agentType) => {
			console.log(`Connected to ${agentType} ${name}`);
		},
	});

	return <p>{agent.identified ? agent.name : "Connecting..."}</p>;
}
```

The [`WebSockets` capability](https://developers.cloudflare.com/agents/runtime/capabilities/websockets/) sends an identity frame when a client connects, so `agent.name` and `onIdentity` report the name the server chose. If the identity changes when the client reconnects, for example after the user signs in as someone else, `onIdentityChange` runs.

The identity frame includes the object's name. If the name is private, such as an internal user ID, do not send it. Set `protocol: false` on `WebSockets`, and send your own frames from `onConnect`. For more information, refer to [Control the protocol per connection](https://developers.cloudflare.com/agents/runtime/capabilities/websockets/#control-the-protocol-per-connection).

## Call an object over RPC

Public methods on a Durable Object are [RPC methods](https://developers.cloudflare.com/durable-objects/best-practices/create-durable-object-stubs-and-send-requests/). Call them from your Worker, or from another Durable Object, with a stub:

*src/index.jsjs*

```js
import { DurableObject } from "cloudflare:workers";
import { Lifecycle } from "agents/lifecycle";
import { Scheduler } from "agents/schedules";

export class UserAgent extends DurableObject {
	scheduler = new Scheduler({ callbacks: {} });
	lifecycle = Lifecycle.install(this).use(this.scheduler);

	async pendingReminders(props) {
		await this.lifecycle.start(props);
		return (await this.scheduler.list()).length;
	}
}

export default {
	async fetch(request, env) {
		const agents = env.UserAgent;
		const count = await agents
			.getByName("alice")
			.pendingReminders({ userId: "alice" });
		return Response.json({ count });
	},
};
```

*src/index.tsts*

```ts
import { DurableObject } from "cloudflare:workers";
import { Lifecycle } from "agents/lifecycle";
import { Scheduler } from "agents/schedules";

type Props = { userId: string };

export class UserAgent extends DurableObject<Env> {
	readonly scheduler = new Scheduler({ callbacks: {} });
	readonly lifecycle = Lifecycle.install<Env, Props>(this).use(this.scheduler);

	async pendingReminders(props?: Props): Promise<number> {
		await this.lifecycle.start(props);
		return (await this.scheduler.list()).length;
	}
}

export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		const agents = env.UserAgent as DurableObjectNamespace<UserAgent>;
		const count = await agents
			.getByName("alice")
			.pendingReminders({ userId: "alice" });
		return Response.json({ count });
	},
} satisfies ExportedHandler<Env>;
```

RPC calls do not go through `fetch()`, so they do not start the [Lifecycle](https://developers.cloudflare.com/agents/runtime/lifecycle/). Call `await this.lifecycle.start()` at the top of each RPC method that uses a capability, or anything `onStart()` sets up.

The props you pass to `start()` only apply if this call starts the object. For more information, refer to [Start the Lifecycle](https://developers.cloudflare.com/agents/runtime/lifecycle/#start-the-lifecycle).

`getAgentByName()` from `agents` starts the object for you, but it only works with the `Agent` class. On a plain Durable Object, use `getByName()` and `lifecycle.start()`.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/agents/runtime/routing/custom-routing/#page","headline":"Custom routing","description":"Reach a Lifecycle Durable Object without the default /agents/:binding/:name URL. Pick the object on the server, forward requests with getByName(), and call it over RPC.","url":"https://developers.cloudflare.com/agents/runtime/routing/custom-routing/","inLanguage":"en","image":"https://developers.cloudflare.com/agents/runtime/routing/custom-routing/og.png?v=8511eedb77882078","dateModified":"2026-10-29","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
