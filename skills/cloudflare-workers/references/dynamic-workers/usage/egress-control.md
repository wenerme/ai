---
description: Restrict, intercept, and audit outbound network access for dynamic Workers.
title: Egress control
image: https://developers.cloudflare.com/dynamic-workers/usage/egress-control/og.png?v=5cc81b2003e8ce38
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/dynamic-workers/llms.txt
> Use this file to discover all available pages before exploring further.

# Egress control

Last updated Oct 12, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/dynamic-workers/usage/egress-control/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

When you run untrusted or AI-generated code in a dynamic Worker, you need to control what it can access on the network. Common requirements include:

- Block all outbound access so the dynamic Worker can only use the [bindings](https://developers.cloudflare.com/dynamic-workers/usage/bindings/) you provide.
- Restrict outbound requests to a specific set of allowed destinations.
- Inject credentials into outbound requests without exposing secrets to the dynamic Worker.
- Log or audit every outbound request for observability.

The `globalOutbound` option in the `WorkerCode` object returned by `get()` or passed to `load()` controls all of this. It intercepts every `fetch()` and `connect()` call the dynamic Worker makes.

## Block all outbound access

Set `globalOutbound` to `null` to fully isolate the dynamic Worker from the network:

```js
return {
	mainModule: "index.js",
	modules: { "index.js": code },
	globalOutbound: null,
};
```

Any `fetch()` or `connect()` call from the dynamic Worker throws an exception.

In this mode, you can still give the Dynamic Worker direct access to specific resources and services using [bindings](https://developers.cloudflare.com/dynamic-workers/usage/bindings/). This is the most secure way to design your sandbox: block the Internet, then provide specific capabilities through bindings.

If you need compatibility with existing HTTP client libraries running inside your Dynamic Worker sandbox, blocking `fetch()` may not be feasible. In that case, intercept requests instead.

## Intercept outbound requests

To intercept outbound requests, define a `WorkerEntrypoint` class in the loader Worker that acts as a gateway. Every `fetch()` and `connect()` call the dynamic Worker makes goes through this gateway instead of hitting the network directly. Pass the gateway to the dynamic Worker with `globalOutbound` and `ctx.exports`:

```js
import { WorkerEntrypoint } from "cloudflare:workers";

export class HttpGateway extends WorkerEntrypoint {
	async fetch(request) {
		// Every outbound fetch() from the dynamic Worker arrives here.
		// Inspect, modify, block, or forward the request.
		return fetch(request);
	}
}

export default {
	async fetch(request, env, ctx) {
		const worker = env.LOADER.get("my-worker", async () => {
			return {
				compatibilityDate: "$today",
				mainModule: "index.js",
				modules: { "index.js": code },

				// Pass the gateway as a service binding.
				// The dynamic Worker's fetch() and connect() calls
				// are routed through HttpGateway instead of going
				// to the network directly.
				globalOutbound: ctx.exports.HttpGateway,
			};
		});

		return worker.getEntrypoint().fetch(request);
	},
};
```

From here, you can add any logic to the gateway, such as restricting destinations, injecting credentials, or logging requests.

## Inject credentials

A common pattern is attaching credentials to outbound requests so the dynamic Worker never sees the secret. Similar to [custom bindings](https://developers.cloudflare.com/dynamic-workers/usage/bindings/#custom-bindings-with-dynamic-workers), you can use [`ctx.props`](https://developers.cloudflare.com/workers/runtime-apis/context/#props) to pass per-tenant or per-request context to the gateway.

The dynamic Worker calls `fetch()` normally. `HttpGateway` intercepts the request, attaches the token from the loader Worker's environment, and forwards it. The dynamic Worker never has access to `API_TOKEN`.

```js
import { WorkerEntrypoint } from "cloudflare:workers";

export class HttpGateway extends WorkerEntrypoint {
	async fetch(request) {
		let url = new URL(request.url);
		const headers = new Headers(request.headers);

		// For requests to api.example.com, inject credentials.
		if (url.hostname === "api.example.com") {
			headers.set("Authorization", `Bearer ${this.env.API_TOKEN}`);
			headers.set("X-Tenant-Id", this.ctx.props.tenantId);
		}

		return fetch(request, { headers });
	}
}

export default {
	async fetch(request, env, ctx) {
		const tenantId = getTenantFromRequest(request);

		const worker = env.LOADER.get(`tenant:${tenantId}`, async () => {
			return {
				mainModule: "index.js",
				modules: {
					"index.js": `
						export default {
							async fetch() {
								const resp = await fetch("https://api.example.com/data");
								return new Response(await resp.text());
							},
						};
					`,
				},
				globalOutbound: ctx.exports.HttpGateway({
					props: { tenantId },
				}),
			};
		});

		return worker.getEntrypoint().fetch(request);
	},
};
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/dynamic-workers/usage/egress-control/#page","headline":"Egress control","description":"Restrict, intercept, and audit outbound network access for dynamic Workers.","url":"https://developers.cloudflare.com/dynamic-workers/usage/egress-control/","inLanguage":"en","image":"https://developers.cloudflare.com/dynamic-workers/usage/egress-control/og.png?v=5cc81b2003e8ce38","dateModified":"2026-10-12","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
