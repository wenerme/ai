---
description: Save a bounded copy of a Gateway-proxied attachment to a private R2 bucket in the background.
title: Capture a downloaded file
image: https://developers.cloudflare.com/cloudflare-one/traffic-controls/integrate-workers/worker-templates/download-capture/og.png?v=a1cb3c2208f07088
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt
> Use this file to discover all available pages before exploring further.

# Capture a downloaded file

Last updated Oct 15, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/cloudflare-one/traffic-controls/integrate-workers/worker-templates/download-capture/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Public beta

The Gateway Forward action is available in public beta on all Zero Trust plans. Workers usage is subject to [Workers pricing](https://developers.cloudflare.com/workers/platform/pricing/).

Save a copy of a downloaded attachment to R2 while returning the original response to the user. This script captures complete files up to 25 MiB and skips larger files. It detects attachments using `Content-Disposition`.

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

[Create a private R2 bucket](https://developers.cloudflare.com/r2/buckets/create-buckets/) named `gateway-downloads`. Add this binding to the [Worker configuration](https://developers.cloudflare.com/cloudflare-one/traffic-controls/integrate-workers/forward-traffic/#set-up-forward):

```jsonc
{
  "$schema": "./node_modules/wrangler/config-schema.json",
  "r2_buckets": [
    {
      "binding": "CAPTURES",
      "bucket_name": "gateway-downloads"
    }
  ]
}
```

```toml
[[r2_buckets]]
binding = "CAPTURES"
bucket_name = "gateway-downloads"
```

Use this script as `src/index.ts`:

*src/index.jsjs*

```js
import { WorkerEntrypoint } from "cloudflare:workers";

const LIMIT = 25 * 1024 * 1024;

async function readBounded(body) {
	const reader = body.getReader();
	const chunks = [];
	let size = 0;
	try {
		while (true) {
			const { done, value } = await reader.read();
			if (done) break;
			size += value.byteLength;
			if (size > LIMIT) {
				void reader.cancel().catch(() => {});
				return null;
			}
			chunks.push(value);
		}
	} finally {
		reader.releaseLock();
	}
	const bytes = new Uint8Array(size);
	let offset = 0;
	for (const chunk of chunks) {
		bytes.set(chunk, offset);
		offset += chunk.byteLength;
	}
	return bytes.buffer;
}

export class GatewayMiddleware extends WorkerEntrypoint {
	async handle(request, context, next) {
		const response = await next(request);
		const disposition = response.headers.get("content-disposition") ?? "";
		if (
			request.method === "GET" &&
			response.status === 200 &&
			!response.headers.has("content-encoding") &&
			/^attachment\b/i.test(disposition) &&
			response.body
		) {
			const copy = response.clone();
			this.ctx.waitUntil(
				this.capture(copy).catch(() =>
					console.error("Download capture failed"),
				),
			);
		}
		return response;
	}

	async capture(response) {
		const bytes = await readBounded(response.body);
		if (bytes === null) {
			console.log("Download capture skipped: file exceeds limit");
			return;
		}
		await this.env.CAPTURES.put(crypto.randomUUID(), bytes, {
			httpMetadata: { contentType: "application/octet-stream" },
		});
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

interface Env {
	CAPTURES: R2Bucket;
}
const LIMIT = 25 * 1024 * 1024;

async function readBounded(
	body: ReadableStream<Uint8Array>,
): Promise<ArrayBuffer | null> {
	const reader = body.getReader();
	const chunks: Uint8Array[] = [];
	let size = 0;
	try {
		while (true) {
			const { done, value } = await reader.read();
			if (done) break;
			size += value.byteLength;
			if (size > LIMIT) {
				void reader.cancel().catch(() => {});
				return null;
			}
			chunks.push(value);
		}
	} finally {
		reader.releaseLock();
	}
	const bytes = new Uint8Array(size);
	let offset = 0;
	for (const chunk of chunks) {
		bytes.set(chunk, offset);
		offset += chunk.byteLength;
	}
	return bytes.buffer;
}

export class GatewayMiddleware extends WorkerEntrypoint<Env> {
	async handle(
		request: Request,
		context: GatewayMiddlewareContext,
		next: GatewayMiddlewareNext,
	): Promise<Response> {
		const response = await next(request);
		const disposition = response.headers.get("content-disposition") ?? "";
		if (
			request.method === "GET" &&
			response.status === 200 &&
			!response.headers.has("content-encoding") &&
			/^attachment\b/i.test(disposition) &&
			response.body
		) {
			const copy = response.clone();
			this.ctx.waitUntil(
				this.capture(copy).catch(() =>
					console.error("Download capture failed"),
				),
			);
		}
		return response;
	}

	async capture(response: Response): Promise<void> {
		const bytes = await readBounded(response.body!);
		if (bytes === null) {
			console.log("Download capture skipped: file exceeds limit");
			return;
		}
		await this.env.CAPTURES.put(crypto.randomUUID(), bytes, {
			httpMetadata: { contentType: "application/octet-stream" },
		});
	}
}
```

The reader counts actual streamed bytes instead of trusting `Content-Length`. It supplies R2 with an `ArrayBuffer` whose size is known, rather than an arbitrary stream. Random object keys avoid using untrusted filenames as storage paths.

## Forward and test

Deploy the Worker and [create a Forward policy](https://developers.cloudflare.com/cloudflare-one/traffic-controls/integrate-workers/forward-traffic/#set-up-forward) for a controlled download host and path, with **HTTP Method** `GET` and a test user group.

Download a small attachment through Gateway. Confirm that the browser download and the R2 object have identical contents. Download a file larger than 25 MiB and confirm that the user still receives it while the Worker logs that capture was skipped.

Cloning can buffer data when the two consumers run at different speeds. Capture also allocates memory for the bounded file. Keep the policy narrow, avoid high-volume parallel downloads, and test against [Workers memory limits](https://developers.cloudflare.com/workers/platform/limits/#memory). A slow transfer or failed background write can leave no captured object. Use a dedicated capture pipeline when retention must be guaranteed.

This example captures complete, uncompressed attachment responses with status `200`. It skips range responses and bodies with `Content-Encoding`. The copy is taken before Gateway's final response inspection, so a file later blocked by Gateway can still be stored in R2. Keep the bucket private, apply [retention rules](https://developers.cloudflare.com/r2/buckets/object-lifecycles/), and treat captured objects as untrusted files.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/traffic-controls/integrate-workers/worker-templates/download-capture/#page","headline":"Capture a downloaded file","description":"Save a bounded copy of a Gateway-proxied attachment to a private R2 bucket in the background.","url":"https://developers.cloudflare.com/cloudflare-one/traffic-controls/integrate-workers/worker-templates/download-capture/","inLanguage":"en","image":"https://developers.cloudflare.com/cloudflare-one/traffic-controls/integrate-workers/worker-templates/download-capture/og.png?v=a1cb3c2208f07088","dateModified":"2026-10-15","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
