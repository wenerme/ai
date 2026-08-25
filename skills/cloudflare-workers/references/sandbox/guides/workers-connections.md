---
description: Access KV, R2, Durable Objects, and other bindings from a sandbox.
title: Connect to Workers bindings
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/sandbox/llms.txt
> Use this file to discover all available pages before exploring further.

# Connect to Workers bindings

Last updated Apr 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/sandbox/guides/workers-connections/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Sandboxes can access [Workers bindings](https://developers.cloudflare.com/workers/runtime-apis/bindings/) — KV, R2, D1, Durable Objects, and others — through [outbound handlers](https://developers.cloudflare.com/sandbox/guides/outbound-traffic/#define-outbound-handlers). An outbound handler intercepts HTTP requests from the sandbox and runs inside the Workers runtime, where all of your configured bindings are available.

The sandbox makes a plain HTTP request to a virtual hostname (for example, `http://my.kv/some-key`), and the outbound handler resolves it using the bound resource. No SDK or client library is required inside the sandbox.

## Use bindings in outbound handlers

Define an `outboundByHost` handler for each virtual hostname. The `env` argument gives you access to every binding declared in your Wrangler configuration.

```js
export class MySandbox extends Sandbox {}

MySandbox.outboundByHost = {
	"my.kv": async (request, env, ctx) => {
		const url = new URL(request.url);
		const key = url.pathname.slice(1);
		const value = await env.KV.get(key);
		return new Response(value ?? "", { status: value ? 200 : 404 });
	},
	"my.r2": async (request, env, ctx) => {
		const url = new URL(request.url);
		// Scope access to this sandbox's ID
		const path = `${ctx.containerId}${url.pathname}`;
		const object = await env.R2.get(path);
		return new Response(object?.body ?? null, { status: object ? 200 : 404 });
	},
};
```

```ts
export class MySandbox extends Sandbox {}

MySandbox.outboundByHost = {
	"my.kv": async (request: Request, env: Env, ctx: OutboundHandlerContext) => {
		const url = new URL(request.url);
		const key = url.pathname.slice(1);
		const value = await env.KV.get(key);
		return new Response(value ?? "", { status: value ? 200 : 404 });
	},
	"my.r2": async (request: Request, env: Env, ctx: OutboundHandlerContext) => {
		const url = new URL(request.url);
		// Scope access to this sandbox's ID
		const path = `${ctx.containerId}${url.pathname}`;
		const object = await env.R2.get(path);
		return new Response(object?.body ?? null, { status: object ? 200 : 404 });
	},
};
```

The sandbox calls `http://my.kv/some-key` and the handler resolves it using the KV binding. A call to `http://my.r2/file.png` reads from R2, scoped to the current sandbox instance.

Note

You can use `ctx.containerId` to apply different rules per sandbox instance — for example, to look up per-instance configuration from KV.

## Access Durable Object state

The `ctx` argument exposes `containerId`, which lets you interact with the sandbox's own Durable Object from an outbound handler.

```js
export class MySandbox extends Sandbox {}

MySandbox.outboundByHost = {
	"get-state.do": async (request, env, ctx) => {
		const id = env.MY_SANDBOX.idFromString(ctx.containerId);
		const stub = env.MY_SANDBOX.get(id);
		// Assumes getStateForKey is defined on your DO
		return stub.getStateForKey(request.body);
	},
};
```

```ts
export class MySandbox extends Sandbox {}

MySandbox.outboundByHost = {
	"get-state.do": async (
		request: Request,
		env: Env,
		ctx: { containerId: string },
	) => {
		const id = env.MY_SANDBOX.idFromString(ctx.containerId);
		const stub = env.MY_SANDBOX.get(id);
		// Assumes getStateForKey is defined on your DO
		return stub.getStateForKey(request.body);
	},
};
```

## Related resources

* [Handle outbound traffic](https://developers.cloudflare.com/sandbox/guides/outbound-traffic/) — Block, allow, and intercept all outbound HTTP from a sandbox
* [Sandbox options](https://developers.cloudflare.com/sandbox/configuration/sandbox-options/) — Configure sandbox behavior
* [Environment variables](https://developers.cloudflare.com/sandbox/configuration/environment-variables/) — Configure secrets and environment variables

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/sandbox/guides/workers-connections/#page","headline":"Connect to Workers bindings · Cloudflare Sandbox SDK docs","description":"Access KV, R2, Durable Objects, and other bindings from a sandbox.","url":"https://developers.cloudflare.com/sandbox/guides/workers-connections/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
