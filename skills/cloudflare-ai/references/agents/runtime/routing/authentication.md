---
description: Check who is calling in your Worker before routeAgentRequest() forwards an HTTP request or WebSocket upgrade to an agent, and limit each user to their own agents.
title: Authentication
image: https://developers.cloudflare.com/agents/runtime/routing/authentication/og.png?v=d760732458c235b5
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/agents/llms.txt
> Use this file to discover all available pages before exploring further.

# Authentication

Last updated Oct 29, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/agents/runtime/routing/authentication/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Anyone who knows an agent's URL can send it requests. Check the caller in your Worker, before the request reaches the Durable Object. The object then only sees requests you have already allowed.

## Use the routing hooks

`routeAgentRequest()` runs `onBeforeConnect` before it forwards a WebSocket upgrade, and `onBeforeRequest` before it forwards an HTTP request. Both run in the Worker. Each hook can:

- Return a `Response` to reject the request.
- Return a new `Request` to replace it, for example to add a header the object trusts.
- Return nothing to forward the request unchanged.

The `route` argument holds the matched binding name as `className`, and the object's `name`:

*src/index.jsjs*

```js
import { routeAgentRequest } from "agents/routing";

async function authenticate(request, env) {
	// Verify a session cookie, a JWT, or an API key here.
	const token = request.headers.get("Authorization");
	return token ? { id: "user-123" } : null;
}

export default {
	async fetch(request, env) {
		const check = async (req, route) => {
			const user = await authenticate(req, env);
			if (!user) {
				return new Response("Unauthorized", { status: 401 });
			}
			// Each user can only reach the agent named after them.
			if (route.name !== user.id) {
				return new Response("Forbidden", { status: 403 });
			}
			const forwarded = new Request(req);
			forwarded.headers.set("x-user-id", user.id);
			return forwarded;
		};

		return (
			(await routeAgentRequest(request, env, {
				onBeforeConnect: check,
				onBeforeRequest: check,
			})) ?? new Response("Not found", { status: 404 })
		);
	},
};
```

*src/index.tsts*

```ts
import { routeAgentRequest } from "agents/routing";

type User = { id: string };

async function authenticate(request: Request, env: Env): Promise<User | null> {
	// Verify a session cookie, a JWT, or an API key here.
	const token = request.headers.get("Authorization");
	return token ? { id: "user-123" } : null;
}

export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		const check = async (req: Request, route: { name: string }) => {
			const user = await authenticate(req, env);
			if (!user) {
				return new Response("Unauthorized", { status: 401 });
			}
			// Each user can only reach the agent named after them.
			if (route.name !== user.id) {
				return new Response("Forbidden", { status: 403 });
			}
			const forwarded = new Request(req);
			forwarded.headers.set("x-user-id", user.id);
			return forwarded;
		};

		return (
			(await routeAgentRequest(request, env, {
				onBeforeConnect: check,
				onBeforeRequest: check,
			})) ?? new Response("Not found", { status: 404 })
		);
	},
} satisfies ExportedHandler<Env>;
```

Browsers cannot set an `Authorization` header on a WebSocket upgrade. For WebSocket clients, read a token from a cookie or a query parameter in `onBeforeConnect`. `useAgent` and `AgentClient` accept a `query` option for this.

A header you add in the hook is only trustworthy if clients cannot reach the object any other way. Route every request to the object through the same check.

## Check before routing

You can also check the request before you call `routeAgentRequest()`. This works for any route, including ones `routeAgentRequest()` does not handle:

*src/index.jsjs*

```js
import { routeAgentRequest } from "agents/routing";

async function authenticate(request) {
	const token = request.headers.get("Authorization");
	return token ? { id: "user-123" } : null;
}

export default {
	async fetch(request, env) {
		const url = new URL(request.url);

		if (url.pathname.startsWith("/agents/")) {
			const user = await authenticate(request);
			if (!user) {
				return new Response("Unauthorized", { status: 401 });
			}
			// /agents/:binding/:name — the name is the fourth segment.
			const name = url.pathname.split("/")[3];
			if (name !== user.id) {
				return new Response("Forbidden", { status: 403 });
			}
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

async function authenticate(request: Request): Promise<{ id: string } | null> {
	const token = request.headers.get("Authorization");
	return token ? { id: "user-123" } : null;
}

export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		const url = new URL(request.url);

		if (url.pathname.startsWith("/agents/")) {
			const user = await authenticate(request);
			if (!user) {
				return new Response("Unauthorized", { status: 401 });
			}
			// /agents/:binding/:name — the name is the fourth segment.
			const name = url.pathname.split("/")[3];
			if (name !== user.id) {
				return new Response("Forbidden", { status: 403 });
			}
		}

		return (
			(await routeAgentRequest(request, env)) ??
			new Response("Not found", { status: 404 })
		);
	},
} satisfies ExportedHandler<Env>;
```

## Pick the name on the server

Instead of checking the name the client sent, you can choose it yourself from the session. The client then never names the object. For more information, refer to [Custom routing](https://developers.cloudflare.com/agents/runtime/routing/custom-routing/#choose-the-object-on-the-server).

## Restrict what a connection can do

Authentication decides who reaches the object. Inside the object, the [`WebSockets` capability](https://developers.cloudflare.com/agents/runtime/capabilities/websockets/) can still limit each connection. For example, make viewers' connections [readonly](https://developers.cloudflare.com/agents/runtime/capabilities/websockets/#readonly-connections), so they receive state but cannot change it.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/agents/runtime/routing/authentication/#page","headline":"Authentication","description":"Check who is calling in your Worker before routeAgentRequest() forwards an HTTP request or WebSocket upgrade to an agent, and limit each user to their own agents.","url":"https://developers.cloudflare.com/agents/runtime/routing/authentication/","inLanguage":"en","image":"https://developers.cloudflare.com/agents/runtime/routing/authentication/og.png?v=d760732458c235b5","dateModified":"2026-10-29","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
