---
description: Configure routeAgentRequest() with a URL prefix, CORS headers, jurisdiction and location hints, startup props, and retries for transient Durable Object errors.
title: Routing options
image: https://developers.cloudflare.com/agents/runtime/routing/options/og.png?v=308c6973569a3737
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/agents/llms.txt
> Use this file to discover all available pages before exploring further.

# Routing options

Last updated Oct 29, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/agents/runtime/routing/options/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Pass options to [`routeAgentRequest()`](https://developers.cloudflare.com/agents/runtime/routing/) as the third argument. Their type is `AgentOptions`, exported from `agents/routing`:

| Option | Type | Description |
| --- | --- | --- |
| `prefix` | `string` | URL segments before the binding and name. Defaults to `agents`. |
| `cors` | `boolean \| HeadersInit` | Adds CORS headers to matched responses and answers matched `OPTIONS` preflight requests. |
| `jurisdiction` | `DurableObjectJurisdiction` | Creates objects in a [jurisdiction](https://developers.cloudflare.com/durable-objects/reference/data-location/), such as `"eu"`. |
| `locationHint` | `DurableObjectLocationHint` | Hints where to create objects, such as `"enam"`. |
| `props` | `object` | JSON-serializable values passed to `onStart(props)` when the request starts the object. |
| `routingRetry` | `false \| RoutingRetryOptions` | Retries transient Durable Object errors. Enabled by default. |
| `onBeforeConnect` | `(request, route) => Response \| Request \| void` | Runs in the Worker before a WebSocket upgrade is forwarded. |
| `onBeforeRequest` | `(request, route) => Response \| Request \| void` | Runs in the Worker before an HTTP request is forwarded. |

`onBeforeConnect` and `onBeforeRequest` are covered in [Authentication](https://developers.cloudflare.com/agents/runtime/routing/authentication/).

## Prefix

`prefix` replaces the `agents` segment. It can contain several segments:

```js
import { routeAgentRequest } from "agents/routing";

export default {
	async fetch(request, env) {
		// Matches /api/v1/my-agent/alice
		return (
			(await routeAgentRequest(request, env, { prefix: "api/v1" })) ??
			new Response("Not found", { status: 404 })
		);
	},
};
```

```ts
import { routeAgentRequest } from "agents/routing";

export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		// Matches /api/v1/my-agent/alice
		return (
			(await routeAgentRequest(request, env, { prefix: "api/v1" })) ??
			new Response("Not found", { status: 404 })
		);
	},
} satisfies ExportedHandler<Env>;
```

`useAgent` and `AgentClient` build `/agents/...` paths. With another prefix, pass the full path as their `basePath` option, such as `basePath: "api/v1/my-agent/alice"`.

## CORS

Set `cors: true` when your frontend runs on another origin. It adds these headers to every matched HTTP response:

- `Access-Control-Allow-Origin: *`
- `Access-Control-Allow-Methods: GET, POST, HEAD, OPTIONS`
- `Access-Control-Allow-Headers: *`
- `Access-Control-Max-Age: 86400`

For credentialed requests, pass your own headers with a specific origin:

```js
import { routeAgentRequest } from "agents/routing";

export default {
	async fetch(request, env) {
		return (
			(await routeAgentRequest(request, env, {
				cors: {
					"Access-Control-Allow-Origin": "https://app.example.com",
					"Access-Control-Allow-Methods": "GET, POST, OPTIONS",
					"Access-Control-Allow-Headers": "Content-Type, Authorization",
					"Access-Control-Allow-Credentials": "true",
				},
			})) ?? new Response("Not found", { status: 404 })
		);
	},
};
```

```ts
import { routeAgentRequest } from "agents/routing";

export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		return (
			(await routeAgentRequest(request, env, {
				cors: {
					"Access-Control-Allow-Origin": "https://app.example.com",
					"Access-Control-Allow-Methods": "GET, POST, OPTIONS",
					"Access-Control-Allow-Headers": "Content-Type, Authorization",
					"Access-Control-Allow-Credentials": "true",
				},
			})) ?? new Response("Not found", { status: 404 })
		);
	},
} satisfies ExportedHandler<Env>;
```

Matched `OPTIONS` requests get the CORS headers without reaching the object. Responses that `onBeforeRequest` returns also get them. WebSocket upgrade responses never do.

## Placement

`jurisdiction` and `locationHint` apply to every object the call routes to:

```js
import { routeAgentRequest } from "agents/routing";

export default {
	async fetch(request, env) {
		return (
			(await routeAgentRequest(request, env, {
				jurisdiction: "eu",
				locationHint: "weur",
			})) ?? new Response("Not found", { status: 404 })
		);
	},
};
```

```ts
import { routeAgentRequest } from "agents/routing";

export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		return (
			(await routeAgentRequest(request, env, {
				jurisdiction: "eu",
				locationHint: "weur",
			})) ?? new Response("Not found", { status: 404 })
		);
	},
} satisfies ExportedHandler<Env>;
```

An object in a jurisdiction has a different ID from an object with the same name outside it. Use the same `jurisdiction` every time you route to an object. The location hint only applies when the object is first created. For the available values, refer to [Data location](https://developers.cloudflare.com/durable-objects/reference/data-location/).

## Props

`props` passes values from the Worker to the object's startup. Each capability's `onStart()` hook and the host's `onStart(props)` receive them. Type them with the second type argument of `Lifecycle.install()`:

```js
import { DurableObject } from "cloudflare:workers";
import { Lifecycle } from "agents/lifecycle";
import { routeAgentRequest } from "agents/routing";

export class MyAgent extends DurableObject {
	lifecycle = Lifecycle.install(this);
	#plan = "free";

	onStart(props) {
		this.#plan = props?.plan ?? "free";
	}

	onRequest() {
		return Response.json({ plan: this.#plan });
	}
}

export default {
	async fetch(request, env) {
		const userId = request.headers.get("x-user-id") ?? "anonymous";
		return (
			(await routeAgentRequest(request, env, {
				props: { userId, plan: "pro" },
			})) ?? new Response("Not found", { status: 404 })
		);
	},
};
```

```ts
import { DurableObject } from "cloudflare:workers";
import { Lifecycle } from "agents/lifecycle";
import { routeAgentRequest } from "agents/routing";

type Props = { userId: string; plan: "free" | "pro" };

export class MyAgent extends DurableObject<Env> {
	readonly lifecycle = Lifecycle.install<Env, Props>(this);
	#plan: Props["plan"] = "free";

	onStart(props?: Props): void {
		this.#plan = props?.plan ?? "free";
	}

	onRequest(): Response {
		return Response.json({ plan: this.#plan });
	}
}

export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		const userId = request.headers.get("x-user-id") ?? "anonymous";
		return (
			(await routeAgentRequest(request, env, {
				props: { userId, plan: "pro" },
			})) ?? new Response("Not found", { status: 404 })
		);
	},
} satisfies ExportedHandler<Env>;
```

Props only reach a cold object. A warm object has already run startup and ignores them. Do not keep anything in props that you need on every request. Store it, or send it with each request.

The same props go to whichever object the URL matches. To start an object over RPC with props, call `lifecycle.start(props)`. For more information, refer to [Call an object over RPC](https://developers.cloudflare.com/agents/runtime/routing/custom-routing/#call-an-object-over-rpc).

## Retries

`routingRetry` retries Durable Object errors that the platform marks as retryable and not caused by overload. It backs off exponentially, with jitter. Its type is `RoutingRetryOptions`:

| Field | Default | Description |
| --- | --- | --- |
| `maxAttempts` | `3` | Attempts, including the first |
| `baseDelayMs` | `100` | Base delay for the backoff, in milliseconds |
| `maxDelayMs` | `800` | Maximum delay between attempts, in milliseconds |
| `onRetry` | None | Called before each retry with the error, attempt number, and delay |

```js
import { routeAgentRequest } from "agents/routing";

export default {
	async fetch(request, env) {
		return (
			(await routeAgentRequest(request, env, {
				routingRetry: {
					maxAttempts: 5,
					onRetry: ({ attempt, delayMs, name }) => {
						console.warn(
							`Retrying ${name}, attempt ${attempt} in ${delayMs} ms`,
						);
					},
				},
			})) ?? new Response("Not found", { status: 404 })
		);
	},
};
```

```ts
import { routeAgentRequest } from "agents/routing";

export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		return (
			(await routeAgentRequest(request, env, {
				routingRetry: {
					maxAttempts: 5,
					onRetry: ({ attempt, delayMs, name }) => {
						console.warn(
							`Retrying ${name}, attempt ${attempt} in ${delayMs} ms`,
						);
					},
				},
			})) ?? new Response("Not found", { status: 404 })
		);
	},
} satisfies ExportedHandler<Env>;
```

Pass `routingRetry: false` to turn retries off.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/agents/runtime/routing/options/#page","headline":"Routing options","description":"Configure routeAgentRequest() with a URL prefix, CORS headers, jurisdiction and location hints, startup props, and retries for transient Durable Object errors.","url":"https://developers.cloudflare.com/agents/runtime/routing/options/","inLanguage":"en","image":"https://developers.cloudflare.com/agents/runtime/routing/options/og.png?v=308c6973569a3737","dateModified":"2026-10-29","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
