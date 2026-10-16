---
description: Capture a public webpage in an independent browser and save the screenshot to R2 without awaiting it in the user's response.
title: Capture a screenshot
image: https://developers.cloudflare.com/cloudflare-one/traffic-controls/integrate-workers/worker-templates/screenshot/og.png?v=ef93e509655fa540
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt
> Use this file to discover all available pages before exploring further.

# Capture a screenshot

Last updated Oct 15, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/cloudflare-one/traffic-controls/integrate-workers/worker-templates/screenshot/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Public beta

The Gateway Forward action is available in public beta on all Zero Trust plans. Workers usage is subject to [Workers pricing](https://developers.cloudflare.com/workers/platform/pricing/).

Use [Browser Run](https://developers.cloudflare.com/browser-run/) to capture a screenshot after a selected request. Save the image in R2 while returning the original response to the user.

The browser makes an independent visit to a fixed public URL. It does not inherit the user's cookies, authorization, Gateway session, or egress configuration. The result is a screenshot of the public page, rather than an exact capture of what the user saw. Use this template for a public page you control.

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

[Create a private R2 bucket](https://developers.cloudflare.com/r2/buckets/create-buckets/) named `gateway-screenshots`, then add browser and R2 bindings to the [Worker configuration](https://developers.cloudflare.com/cloudflare-one/traffic-controls/integrate-workers/forward-traffic/#set-up-forward):

```jsonc
{
  "$schema": "./node_modules/wrangler/config-schema.json",
  "browser": {
    "binding": "BROWSER"
  },
  "r2_buckets": [
    {
      "binding": "CAPTURES",
      "bucket_name": "gateway-screenshots"
    }
  ]
}
```

```toml
[browser]
binding = "BROWSER"

[[r2_buckets]]
binding = "CAPTURES"
bucket_name = "gateway-screenshots"
```

The browser binding's `quickAction()` method requires a compatibility date of `2026-03-24` or later. Refer to [Browser Run configuration](https://developers.cloudflare.com/browser-run/reference/wrangler/).

Replace `https://example.com/` with a public test page you control. The local browser interface includes only the Quick Action used here.

*src/index.jsjs*

```js
import { WorkerEntrypoint } from "cloudflare:workers";

const PAGE = "https://example.com/";

export class GatewayMiddleware extends WorkerEntrypoint {
	async handle(request, context, next) {
		const response = await next(request);
		const url = new URL(request.url);
		if (
			request.method === "GET" &&
			url.origin + url.pathname === PAGE &&
			response.ok
		) {
			this.ctx.waitUntil(
				this.capture().catch(() => console.error("Screenshot capture failed")),
			);
		}
		return response;
	}

	async capture() {
		const image = await this.env.BROWSER.quickAction("screenshot", {
			url: PAGE,
			viewport: { width: 1280, height: 720 },
			gotoOptions: { timeout: 10_000 },
		});
		if (!image.ok) {
			await image.body?.cancel();
			throw new Error("Screenshot request failed");
		}
		await this.env.CAPTURES.put(
			`${crypto.randomUUID()}.png`,
			await image.arrayBuffer(),
			{
				httpMetadata: { contentType: "image/png" },
			},
		);
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

const PAGE = "https://example.com/";

interface Env {
	CAPTURES: R2Bucket;
	BROWSER: {
		quickAction(
			action: "screenshot",
			options: {
				url: string;
				viewport: { width: number; height: number };
				gotoOptions: { timeout: number };
			},
		): Promise<Response>;
	};
}

export class GatewayMiddleware extends WorkerEntrypoint<Env> {
	async handle(
		request: Request,
		context: GatewayMiddlewareContext,
		next: GatewayMiddlewareNext,
	): Promise<Response> {
		const response = await next(request);
		const url = new URL(request.url);
		if (
			request.method === "GET" &&
			url.origin + url.pathname === PAGE &&
			response.ok
		) {
			this.ctx.waitUntil(
				this.capture().catch(() => console.error("Screenshot capture failed")),
			);
		}
		return response;
	}

	async capture(): Promise<void> {
		const image = await this.env.BROWSER.quickAction("screenshot", {
			url: PAGE,
			viewport: { width: 1280, height: 720 },
			gotoOptions: { timeout: 10_000 },
		});
		if (!image.ok) {
			await image.body?.cancel();
			throw new Error("Screenshot request failed");
		}
		await this.env.CAPTURES.put(
			`${crypto.randomUUID()}.png`,
			await image.arrayBuffer(),
			{
				httpMetadata: { contentType: "image/png" },
			},
		);
	}
}
```

The script uses a fixed browser destination and does not copy query parameters or session credentials from the user's request. The viewport limits the image to a regular viewport screenshot.

## Forward and test

Deploy the Worker and [create a Forward policy](https://developers.cloudflare.com/cloudflare-one/traffic-controls/integrate-workers/forward-traffic/#set-up-forward) for the test page's **Host**, **URL Path**, and **HTTP Method** `GET`, scoped to your test user group.

Visit the page through Gateway. Confirm that the page loads normally and a PNG object appears in R2. Open the object to check the screenshot. Browser Run Quick Actions require a remote browser binding. They cannot be validated entirely with local emulation.

Screenshots consume [Browser Run usage](https://developers.cloudflare.com/browser-run/pricing/). Scope or sample captures to control volume. Browser queueing, navigation, and the R2 write must fit within [background execution limits](https://developers.cloudflare.com/workers/platform/limits/#duration). Use Queues or Workflows for reliable captures of slow pages.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/traffic-controls/integrate-workers/worker-templates/screenshot/#page","headline":"Capture a screenshot","description":"Capture a public webpage in an independent browser and save the screenshot to R2 without awaiting it in the user's response.","url":"https://developers.cloudflare.com/cloudflare-one/traffic-controls/integrate-workers/worker-templates/screenshot/","inLanguage":"en","image":"https://developers.cloudflare.com/cloudflare-one/traffic-controls/integrate-workers/worker-templates/screenshot/og.png?v=ef93e509655fa540","dateModified":"2026-10-15","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
