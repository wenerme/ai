---
description: Parse and transform large JSON request and response bodies using streaming.
title: Stream large JSON
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

# Stream large JSON

Parse and transform large JSON request and response bodies using streaming.

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/workers/examples/streaming-json/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Use the [Streams API](https://developers.cloudflare.com/workers/runtime-apis/streams/) to process JSON payloads that would exceed a Worker's 128 MB memory limit if fully buffered. Streaming allows you to parse and transform JSON data incrementally as it arrives. This is faster than buffering the entire payload into memory, as your Worker can start processing data incrementally, and allows your Worker to handle multi-gigabyte payloads or files within its memory limits.

The [@streamparser/json-whatwg ↗](https://www.npmjs.com/package/@streamparser/json-whatwg) library provides a streaming JSON parser compatible with the Web Streams API.

Install the dependency:

```sh
npm install @streamparser/json-whatwg
```

## Stream a JSON request body

This example parses a large JSON request body and extracts specific fields without loading the entire payload into memory.

```ts
import { JSONParser } from "@streamparser/json-whatwg";

export default {
	async fetch(request): Promise<Response> {
		const parser = new JSONParser({ paths: ["$.users.*"] });

		const users: string[] = [];

		// Pipe the request body through the JSON parser
		const reader = request.body
			.pipeThrough(parser)
			.getReader();

		// Process matching JSON values as they stream in
		while (true) {
			const { done, value } = await reader.read();
			if (done) break;
			// Extract only the name field from each user object
			if (value.value?.name) {
				users.push(value.value.name);
			}
		}

		return Response.json({ userNames: users });
	},
} satisfies ExportedHandler;
```

```js
import { JSONParser } from "@streamparser/json-whatwg";

export default {
	async fetch(request) {
		const parser = new JSONParser({ paths: ["$.users.*"] });

		const users = [];

		// Pipe the request body through the JSON parser
		const reader = request.body
			.pipeThrough(parser)
			.getReader();

		// Process matching JSON values as they stream in
		while (true) {
			const { done, value } = await reader.read();
			if (done) break;
			// Extract only the name field from each user object
			if (value.value?.name) {
				users.push(value.value.name);
			}
		}

		return Response.json({ userNames: users });
	},
};
```

## Stream and transform a JSON response

This example fetches a large JSON response from an upstream API, transforms specific fields, and streams the modified response to the client.

```ts
import { JSONParser } from "@streamparser/json-whatwg";

export default {
	async fetch(request): Promise<Response> {
		const response = await fetch("https://api.example.com/large-dataset.json");

		const parser = new JSONParser({ paths: ["$.items.*"] });

		const { readable, writable } = new TransformStream();
		const writer = writable.getWriter();
		const encoder = new TextEncoder();

		// Process the upstream response in the background
		(async () => {
			const reader = response.body
				.pipeThrough(parser)
				.getReader();

			await writer.write(encoder.encode('{"processedItems":['));
			let first = true;

			while (true) {
				const { done, value } = await reader.read();
				if (done) break;

				// Transform each item as it streams through
				const item = value.value;
				const transformed = {
					id: item.id,
					title: item.title.toUpperCase(),
					processed: true,
				};

				if (!first) await writer.write(encoder.encode(","));
				first = false;
				await writer.write(encoder.encode(JSON.stringify(transformed)));
			}

			await writer.write(encoder.encode("]}"));
			await writer.close();
		})();

		return new Response(readable, {
			headers: { "Content-Type": "application/json" },
		});
	},
} satisfies ExportedHandler;
```

```js
import { JSONParser } from "@streamparser/json-whatwg";

export default {
	async fetch(request) {
		const response = await fetch("https://api.example.com/large-dataset.json");

		const parser = new JSONParser({ paths: ["$.items.*"] });

		const { readable, writable } = new TransformStream();
		const writer = writable.getWriter();
		const encoder = new TextEncoder();

		// Process the upstream response in the background
		(async () => {
			const reader = response.body
				.pipeThrough(parser)
				.getReader();

			await writer.write(encoder.encode('{"processedItems":['));
			let first = true;

			while (true) {
				const { done, value } = await reader.read();
				if (done) break;

				// Transform each item as it streams through
				const item = value.value;
				const transformed = {
					id: item.id,
					title: item.title.toUpperCase(),
					processed: true,
				};

				if (!first) await writer.write(encoder.encode(","));
				first = false;
				await writer.write(encoder.encode(JSON.stringify(transformed)));
			}

			await writer.write(encoder.encode("]}"));
			await writer.close();
		})();

		return new Response(readable, {
			headers: { "Content-Type": "application/json" },
		});
	},
};
```

## Related resources

* [Streams API](https://developers.cloudflare.com/workers/runtime-apis/streams/) \- Learn more about streaming in Workers
* [TransformStream](https://developers.cloudflare.com/workers/runtime-apis/streams/transformstream/) \- Create custom stream transformations
* [@streamparser/json-whatwg ↗](https://www.npmjs.com/package/@streamparser/json-whatwg) \- Streaming JSON parser documentation

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/examples/streaming-json/#page","headline":"Stream large JSON · Cloudflare Workers docs","description":"Parse and transform large JSON request and response bodies using streaming.","url":"https://developers.cloudflare.com/workers/examples/streaming-json/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Middleware","JSON","JavaScript","TypeScript"]}
```
