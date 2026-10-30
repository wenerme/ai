---
description: Route HTTP requests and WebSocket upgrades from your Worker to a named Durable Object with routeAgentRequest(), and choose how to name your agents.
title: Routing
image: https://developers.cloudflare.com/agents/runtime/routing/og.png?v=4f8fb7776b8e581c
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/agents/llms.txt
> Use this file to discover all available pages before exploring further.

# Routing

Last updated Oct 29, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/agents/runtime/routing/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Each agent is a named [Durable Object](https://developers.cloudflare.com/durable-objects/). Routing is how a request in your Worker reaches the right one. `routeAgentRequest()` reads the Durable Object binding and the object's name from the URL, and forwards the request to that object. Inside the object, the [Lifecycle](https://developers.cloudflare.com/agents/runtime/lifecycle/) takes over and offers the request to its capabilities, then to your `onRequest()` hook.

```txt
routeAgentRequest(request, env)            Worker
└─ stub.fetch(request)                     picks the object from the URL
   └─ Lifecycle                            Durable Object
      ├─ startup, on a cold object
      ├─ capabilities, in registration order
      └─ host onRequest()
```

## Route requests from a Worker

`routeAgentRequest()` works with any Durable Object that installs the Lifecycle. Import it from `agents/routing`, or from `agents`:

*src/index.jsjs*

```js
import { DurableObject } from "cloudflare:workers";
import { Lifecycle } from "agents/lifecycle";
import { routeAgentRequest } from "agents/routing";

export class MyAgent extends DurableObject {
	lifecycle = Lifecycle.install(this);

	onRequest(request) {
		return new Response(`Hello from ${this.lifecycle.name}`);
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
import { DurableObject } from "cloudflare:workers";
import { Lifecycle } from "agents/lifecycle";
import { routeAgentRequest } from "agents/routing";

export class MyAgent extends DurableObject<Env> {
	readonly lifecycle = Lifecycle.install(this);

	onRequest(request: Request): Response {
		return new Response(`Hello from ${this.lifecycle.name}`);
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

Bind the class as a SQLite-backed Durable Object:

```jsonc
{
	"durable_objects": {
		"bindings": [{ "name": "MyAgent", "class_name": "MyAgent" }],
	},
	"migrations": [{ "tag": "v1", "new_sqlite_classes": ["MyAgent"] }],
}
```

```toml
[[durable_objects.bindings]]
name = "MyAgent"
class_name = "MyAgent"

[[migrations]]
tag = "v1"
new_sqlite_classes = [ "MyAgent" ]
```

`routeAgentRequest()` handles both HTTP requests and WebSocket upgrades. It returns:

- `null` when the path does not start with the prefix, so your Worker can handle other routes.
- A `400` response when the path matches the prefix but no Durable Object binding matches.
- The object's response otherwise.

## URL shape

The default URL shape is `/agents/:binding/:name`:

```txt
https://example.com/agents/my-agent/alice/settings
                           └──┬───┘ └─┬─┘└───┬──┘
                           binding  name   sub-path
```

- **`:binding`** is the name of a Durable Object binding in `env`, in kebab case. The binding `MyAgent` and the binding `MY_AGENT` both become `my-agent`. `ChatRoom` becomes `chat-room`.
- **`:name`** is the object's name. The router addresses the object with `idFromName(name)`, and the object reads it as `lifecycle.name`.
- **The sub-path** is anything after the name. The object receives the full URL, so `onRequest()` can route on `/settings`.

To change the `agents` segment, pass the [`prefix` option](https://developers.cloudflare.com/agents/runtime/routing/options/#prefix).

## Several agent classes

Export each class and bind each one. `routeAgentRequest()` finds the binding from the URL, so one call routes to all of them:

*src/index.jsjs*

```js
import { routeAgentRequest } from "agents/routing";

export { ChatRoom } from "./chat-room";
export { UserProfile } from "./user-profile";

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
import { routeAgentRequest } from "agents/routing";

export { ChatRoom } from "./chat-room";
export { UserProfile } from "./user-profile";

export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		return (
			(await routeAgentRequest(request, env)) ??
			new Response("Not found", { status: 404 })
		);
	},
} satisfies ExportedHandler<Env>;
```

```jsonc
{
	"durable_objects": {
		"bindings": [
			{ "name": "ChatRoom", "class_name": "ChatRoom" },
			{ "name": "UserProfile", "class_name": "UserProfile" },
		],
	},
	"migrations": [
		{ "tag": "v1", "new_sqlite_classes": ["ChatRoom", "UserProfile"] },
	],
}
```

```toml
[[durable_objects.bindings]]
name = "ChatRoom"
class_name = "ChatRoom"

[[durable_objects.bindings]]
name = "UserProfile"
class_name = "UserProfile"

[[migrations]]
tag = "v1"
new_sqlite_classes = [ "ChatRoom", "UserProfile" ]
```

Requests to `/agents/chat-room/...` reach `ChatRoom`, and requests to `/agents/user-profile/...` reach `UserProfile`.

## Name your agents

The name decides which object handles a request. Each name is its own object, with its own storage, alarm, and connections. Pick names that match how the data is shared:

| Pattern | Name | Example URL |
| --- | --- | --- |
| One per user | The user ID | `/agents/user-profile/user-abc123` |
| One per resource | A room or document ID | `/agents/chat-room/general` |
| One per task | A generated ID | `/agents/report/report-2026-10-29` |
| A singleton | A fixed name | `/agents/app-config/default` |

Use a name that clients cannot guess when the object holds private data, and check who is calling before you route. For more information, refer to [Authentication](https://developers.cloudflare.com/agents/runtime/routing/authentication/).

The Lifecycle requires named objects. Startup fails for an object created with `newUniqueId()` or `idFromString()`, or with a name longer than 1,024 bytes.

## Handle sub-paths

The object receives the full URL. Match the end of the path in `onRequest()`:

```js
import { DurableObject } from "cloudflare:workers";
import { Lifecycle } from "agents/lifecycle";

export class UserProfile extends DurableObject {
	lifecycle = Lifecycle.install(this);

	async onRequest(request) {
		const url = new URL(request.url);

		if (request.method === "GET" && url.pathname.endsWith("/settings")) {
			return Response.json((await this.ctx.storage.get("settings")) ?? {});
		}

		if (request.method === "PUT" && url.pathname.endsWith("/settings")) {
			await this.ctx.storage.put("settings", await request.json());
			return new Response(null, { status: 204 });
		}

		return new Response("Not found", { status: 404 });
	}
}
```

```ts
import { DurableObject } from "cloudflare:workers";
import { Lifecycle } from "agents/lifecycle";

export class UserProfile extends DurableObject<Env> {
	readonly lifecycle = Lifecycle.install(this);

	async onRequest(request: Request): Promise<Response> {
		const url = new URL(request.url);

		if (request.method === "GET" && url.pathname.endsWith("/settings")) {
			return Response.json((await this.ctx.storage.get("settings")) ?? {});
		}

		if (request.method === "PUT" && url.pathname.endsWith("/settings")) {
			await this.ctx.storage.put("settings", await request.json());
			return new Response(null, { status: 204 });
		}

		return new Response("Not found", { status: 404 });
	}
}
```

## Next steps

- [Routing options](https://developers.cloudflare.com/agents/runtime/routing/options/) covers CORS, placement, startup props, and retries.
- [Authentication](https://developers.cloudflare.com/agents/runtime/routing/authentication/) checks callers in the Worker, before a request reaches the object.
- [Custom routing](https://developers.cloudflare.com/agents/runtime/routing/custom-routing/) reaches objects without the default URL shape, including over RPC.
- [HTTP and Server-Sent Events](https://developers.cloudflare.com/agents/runtime/routing/http-sse/) handles requests in `onRequest()` and streams responses.
- [Request dispatch](https://developers.cloudflare.com/agents/runtime/lifecycle/#request-dispatch) describes what happens to the request inside the object.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/agents/runtime/routing/#page","headline":"Routing","description":"Route HTTP requests and WebSocket upgrades from your Worker to a named Durable Object with routeAgentRequest(), and choose how to name your agents.","url":"https://developers.cloudflare.com/agents/runtime/routing/","inLanguage":"en","image":"https://developers.cloudflare.com/agents/runtime/routing/og.png?v=4f8fb7776b8e581c","dateModified":"2026-10-29","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
