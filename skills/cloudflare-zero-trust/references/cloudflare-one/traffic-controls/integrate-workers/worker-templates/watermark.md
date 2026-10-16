---
description: Add a visible user watermark to HTML responses using the Gateway Forward action and HTMLRewriter.
title: Watermark HTML pages
image: https://developers.cloudflare.com/cloudflare-one/traffic-controls/integrate-workers/worker-templates/watermark/og.png?v=f537b3bf444ad2e7
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt
> Use this file to discover all available pages before exploring further.

# Watermark HTML pages

Last updated Oct 15, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/cloudflare-one/traffic-controls/integrate-workers/worker-templates/watermark/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Public beta

The Gateway Forward action is available in public beta on all Zero Trust plans. Workers usage is subject to [Workers pricing](https://developers.cloudflare.com/workers/platform/pricing/).

Add a visible user label to HTML pages from an application you control. The Worker retrieves [Gateway identity](https://developers.cloudflare.com/cloudflare-one/traffic-controls/integrate-workers/available-context/#identity) and streams the response through [HTMLRewriter](https://developers.cloudflare.com/workers/runtime-apis/html-rewriter/).

## Configure the Worker

In your Worker project, install [`@cloudflare/zt-types` ↗︎](https://www.npmjs.com/package/@cloudflare/zt-types) version `2026.10.1` or later as a development dependency:

npmyarnpnpmbun

```
npm i -D @cloudflare/zt-types
```

```
yarn add -D @cloudflare/zt-types
```

```
pnpm add -D @cloudflare/zt-types
```

```
bun add -d @cloudflare/zt-types
```

Keep the `import type` declarations for `GatewayMiddlewareContext` and `GatewayMiddlewareNext` in `src/index.ts`. They describe the [Gateway context and continuation](https://developers.cloudflare.com/cloudflare-one/traffic-controls/integrate-workers/available-context/#typescript-types) and are removed when TypeScript compiles. Import the runtime `WorkerEntrypoint` class from `cloudflare:workers`.

Use this script as `src/index.ts` in the [Worker project](https://developers.cloudflare.com/cloudflare-one/traffic-controls/integrate-workers/forward-traffic/#set-up-forward). It needs no bindings.

*src/index.jsjs*

```js
import { WorkerEntrypoint } from "cloudflare:workers";

function escapeHtml(text) {
	return text
		.replaceAll("&", "&amp;")
		.replaceAll("<", "&lt;")
		.replaceAll(">", "&gt;")
		.replaceAll('"', "&quot;")
		.replaceAll("'", "&#39;");
}

export class GatewayMiddleware extends WorkerEntrypoint {
	async handle(request, context, next) {
		const response = await next(request);
		const contentType = response.headers.get("content-type") ?? "";
		if (
			request.method !== "GET" ||
			response.status !== 200 ||
			response.headers.has("content-encoding") ||
			!response.body ||
			!/^text\/html\b/i.test(contentType)
		) {
			return response;
		}
		const identity = await context.identity().catch(() => null);
		const label = escapeHtml(identity?.email ?? "Unidentified user");
		const headers = new Headers(response.headers);
		for (const name of [
			"content-length",
			"etag",
			"content-md5",
			"digest",
			"content-digest",
			"repr-digest",
		]) {
			headers.delete(name);
		}
		headers.set("cache-control", "private, no-store");
		const rewritten = new HTMLRewriter()
			.on("body", {
				element(element) {
					element.prepend(
						`<aside style="position:fixed;bottom:1rem;right:1rem;z-index:2147483647;pointer-events:none">Viewed by ${label}</aside>`,
						{ html: true },
					);
				},
			})
			.transform(
				new Response(response.body, { status: response.status, headers }),
			);
		return rewritten;
	}
}
```

*src/index.tsts*

```ts
import { WorkerEntrypoint } from "cloudflare:workers";
import type {
	GatewayMiddlewareContext,
	GatewayMiddlewareNext,
} from "@cloudflare/zt-types";

function escapeHtml(text: string): string {
	return text
		.replaceAll("&", "&amp;")
		.replaceAll("<", "&lt;")
		.replaceAll(">", "&gt;")
		.replaceAll('"', "&quot;")
		.replaceAll("'", "&#39;");
}

export class GatewayMiddleware extends WorkerEntrypoint {
	async handle(
		request: Request,
		context: GatewayMiddlewareContext,
		next: GatewayMiddlewareNext,
	): Promise<Response> {
		const response = await next(request);
		const contentType = response.headers.get("content-type") ?? "";
		if (
			request.method !== "GET" ||
			response.status !== 200 ||
			response.headers.has("content-encoding") ||
			!response.body ||
			!/^text\/html\b/i.test(contentType)
		) {
			return response;
		}
		const identity = await context.identity().catch(() => null);
		const label = escapeHtml(identity?.email ?? "Unidentified user");
		const headers = new Headers(response.headers);
		for (const name of [
			"content-length",
			"etag",
			"content-md5",
			"digest",
			"content-digest",
			"repr-digest",
		]) {
			headers.delete(name);
		}
		headers.set("cache-control", "private, no-store");
		const rewritten = new HTMLRewriter()
			.on("body", {
				element(element) {
					element.prepend(
						`<aside style="position:fixed;bottom:1rem;right:1rem;z-index:2147483647;pointer-events:none">Viewed by ${label}</aside>`,
						{ html: true },
					);
				},
			})
			.transform(
				new Response(response.body, { status: response.status, headers }),
			);
		return rewritten;
	}
}
```

The script escapes the user label before inserting it into HTML. It removes stale length and integrity headers and marks the personalized response as non-cacheable. Other response headers, including Content Security Policy, are preserved.

This template deliberately allows anonymous traffic. It uses `Unidentified user` when identity is `null` or Gateway cannot retrieve identity.

## Forward and test

Deploy the Worker and [create a Forward policy](https://developers.cloudflare.com/cloudflare-one/traffic-controls/integrate-workers/forward-traffic/#set-up-forward) for your test application's HTML pages and a test user group. Visit the page and confirm that the label contains your Gateway identity email. Test an image or JSON endpoint and confirm its body is unchanged.

A page's Content Security Policy can prevent the inline style from being applied. The label will still be inserted, but its appearance depends on the page. Configure styling in your own application rather than weakening its security policy. Client-side rendering can also remove injected elements.

This template changes uncompressed HTML with a `200` response only. Configure your test origin to serve uncompressed HTML. It does not watermark PDF files, images, or other binary downloads, and a visible label can be removed by the user. Test authentication flows and application rendering before widening the policy scope.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/traffic-controls/integrate-workers/worker-templates/watermark/#page","headline":"Watermark HTML pages","description":"Add a visible user watermark to HTML responses using the Gateway Forward action and HTMLRewriter.","url":"https://developers.cloudflare.com/cloudflare-one/traffic-controls/integrate-workers/worker-templates/watermark/","inLanguage":"en","image":"https://developers.cloudflare.com/cloudflare-one/traffic-controls/integrate-workers/worker-templates/watermark/og.png?v=f537b3bf444ad2e7","dateModified":"2026-10-15","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
