---
description: Access KV, R2, Durable Objects, and other bindings from a container.
title: Connect to Workers and Bindings
image: https://developers.cloudflare.com/containers/configuration/workers-connections/og.png?v=157257af7f1fb147
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/containers/llms.txt
> Use this file to discover all available pages before exploring further.

# Connect to Workers and Bindings

Last updated Nov 9, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/containers/configuration/workers-connections/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Containers can access [Workers bindings](https://developers.cloudflare.com/workers/runtime-apis/bindings/) — KV, R2, D1, Durable Objects, and others — through [outbound intercepts](https://developers.cloudflare.com/containers/configuration/outbound-traffic/#define-outbound-handlers). An intercept sends HTTP requests from the container to a `WorkerEntrypoint` in your Worker. The entrypoint runs inside the Workers runtime, where all of your configured bindings are available.

The container makes a plain HTTP request to a virtual hostname (for example, `http://my.kv/some-key`), and the entrypoint resolves it using the bound resource. No SDK or client library is required inside the container.

## Use bindings in an entrypoint

Define a `WorkerEntrypoint` for each virtual hostname. `this.env` gives you access to every binding declared in your Wrangler configuration. Pass per-instance values, such as the Durable Object ID, in `props`. `ctx.exports` requires a [compatibility date](https://developers.cloudflare.com/workers/configuration/compatibility-dates/) of `2025-11-17` or later, or the `enable_ctx_exports` compatibility flag.

```js
import { DurableObject, WorkerEntrypoint } from "cloudflare:workers";

export class KvGateway extends WorkerEntrypoint {
	async fetch(request) {
		const key = new URL(request.url).pathname.slice(1);
		const value = await this.env.KV.get(key);
		return new Response(value);
	}
}

export class R2Gateway extends WorkerEntrypoint {
	async fetch(request) {
		const url = new URL(request.url);
		// Scope access to this container's ID
		const path = `${this.ctx.props.containerId}${url.pathname}`;
		const object = await this.env.R2.get(path);
		return new Response(object?.body ?? null, { status: object ? 200 : 404 });
	}
}

export class MyContainer extends DurableObject {
	async startContainer() {
		const container = this.ctx.container;
		if (container.running) return;

		const props = { containerId: this.ctx.id.toString() };
		await container.interceptOutboundHttp(
			"my.kv",
			this.ctx.exports.KvGateway({ props }),
		);
		await container.interceptOutboundHttp(
			"my.r2",
			this.ctx.exports.R2Gateway({ props }),
		);

		container.start({ image: container.images.base, enableInternet: false });
	}
}
```

```ts
import { DurableObject, WorkerEntrypoint } from "cloudflare:workers";

type Props = { containerId: string };

export class KvGateway extends WorkerEntrypoint<Env, Props> {
	async fetch(request: Request): Promise<Response> {
		const key = new URL(request.url).pathname.slice(1);
		const value = await this.env.KV.get(key);
		return new Response(value);
	}
}

export class R2Gateway extends WorkerEntrypoint<Env, Props> {
	async fetch(request: Request): Promise<Response> {
		const url = new URL(request.url);
		// Scope access to this container's ID
		const path = `${this.ctx.props.containerId}${url.pathname}`;
		const object = await this.env.R2.get(path);
		return new Response(object?.body ?? null, { status: object ? 200 : 404 });
	}
}

export class MyContainer extends DurableObject<Env> {
	async startContainer(): Promise<void> {
		const container = this.ctx.container!;
		if (container.running) return;

		const props = { containerId: this.ctx.id.toString() };
		await container.interceptOutboundHttp(
			"my.kv",
			this.ctx.exports.KvGateway({ props }),
		);
		await container.interceptOutboundHttp(
			"my.r2",
			this.ctx.exports.R2Gateway({ props }),
		);

		container.start({ image: container.images.base, enableInternet: false });
	}
}
```

The container calls `http://my.kv/some-key` and the entrypoint resolves it using the KV binding. A call to `http://my.r2/file.png` reads from R2, scoped to the current container instance.

An intercept lasts until the container stops. Register intercepts each time you start the container.

Note

Use `props` to apply different rules per container instance — for example, to look up per-instance configuration from KV.

## Access Durable Object state

Pass the Durable Object ID in `props` to call the container's own Durable Object from an entrypoint.

```ts
export class StateGateway extends WorkerEntrypoint<Env, Props> {
	async fetch(request: Request): Promise<Response> {
		const id = this.env.MY_CONTAINER.idFromString(this.ctx.props.containerId);
		const stub = this.env.MY_CONTAINER.get(id);
		// Assumes getStateForKey is defined on your Durable Object
		return Response.json(await stub.getStateForKey(await request.text()));
	}
}
```

## Related resources

- [Handle outbound traffic](https://developers.cloudflare.com/containers/configuration/outbound-traffic/) — Block, allow, and intercept outbound HTTP from a container
- [Environment variables and secrets](https://developers.cloudflare.com/containers/configuration/environment-variables/) — Configure secrets and environment variables
- [Durable Object Container API](https://developers.cloudflare.com/containers/api/durable-object-container/) — Full `ctx.container` API reference

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/containers/configuration/workers-connections/#page","headline":"Connect to Workers and Bindings","description":"Access KV, R2, Durable Objects, and other bindings from a container.","url":"https://developers.cloudflare.com/containers/configuration/workers-connections/","inLanguage":"en","image":"https://developers.cloudflare.com/containers/configuration/workers-connections/og.png?v=157257af7f1fb147","dateModified":"2026-11-09","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
