---
description: Stream ReadableStream from Durable Objects.
title: Use ReadableStream with Durable Object and Workers
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/durable-objects/llms.txt
> Use this file to discover all available pages before exploring further.

#  Use ReadableStream with Durable Object and Workers

Stream ReadableStream from Durable Objects.

Last updated Apr 21, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/durable-objects/examples/readable-stream/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

This example demonstrates:

* A Worker receives a request, and forwards it to a Durable Object `my-id`.
* The Durable Object streams an incrementing number every second, until it receives `AbortSignal`.
* The Worker reads and logs the values from the stream.
* The Worker then cancels the stream after 5 values.

```js
import { DurableObject } from "cloudflare:workers";

// Send incremented counter value every second
async function* dataSource(signal) {
	let counter = 0;
	while (!signal.aborted) {
		yield counter++;
		await new Promise((resolve) => setTimeout(resolve, 1_000));
	}

	console.log("Data source cancelled");
}

export class MyDurableObject extends DurableObject {
	async fetch(request) {
		const abortController = new AbortController();

		const stream = new ReadableStream({
			async start(controller) {
				if (request.signal.aborted) {
					controller.close();
					abortController.abort();
					return;
				}

				for await (const value of dataSource(abortController.signal)) {
					controller.enqueue(new TextEncoder().encode(String(value)));
				}
			},
			cancel() {
				console.log("Stream cancelled");
				abortController.abort();
			},
		});

		const headers = new Headers({
			"Content-Type": "application/octet-stream",
		});

		return new Response(stream, { headers });
	}
}

export default {
	async fetch(request, env, ctx) {
		const stub = env.MY_DURABLE_OBJECT.getByName("foo");
		const response = await stub.fetch(request, { ...request });
		if (!response.ok || !response.body) {
			return new Response("Invalid response", { status: 500 });
		}

		const reader = response.body
			.pipeThrough(new TextDecoderStream())
			.getReader();

		let data = [];
		let i = 0;
		while (true) {
			// Cancel the stream after 5 messages
			if (i > 5) {
				reader.cancel();
				break;
			}
			const { value, done } = await reader.read();

			if (value) {
				console.log(`Got value ${value}`);
				data = [...data, value];
			}

			if (done) {
				break;
			}
			i++;
		}

		return Response.json(data);
	},
};
```

```ts
import { DurableObject } from 'cloudflare:workers';

// Send incremented counter value every second
async function* dataSource(signal: AbortSignal) {
    let counter = 0;
    while (!signal.aborted) {
        yield counter++;
        await new Promise((resolve) => setTimeout(resolve, 1_000));
    }

    console.log('Data source cancelled');
}

export class MyDurableObject extends DurableObject<Env> {
    async fetch(request: Request): Promise<Response> {
        const abortController = new AbortController();

        const stream = new ReadableStream({
            async start(controller) {
                if (request.signal.aborted) {
                    controller.close();
                    abortController.abort();
                    return;
                }

                for await (const value of dataSource(abortController.signal)) {
                    controller.enqueue(new TextEncoder().encode(String(value)));
                }
            },
            cancel() {
                console.log('Stream cancelled');
                abortController.abort();
            },
        });

        const headers = new Headers({
            'Content-Type': 'application/octet-stream',
        });

        return new Response(stream, { headers });
    }

}

export default {
    async fetch(request, env, ctx): Promise<Response> {
        const stub = env.MY_DURABLE_OBJECT.getByName("foo");
        const response = await stub.fetch(request, { ...request });
        if (!response.ok || !response.body) {
            return new Response('Invalid response', { status: 500 });
        }

        const reader = response.body.pipeThrough(new TextDecoderStream()).getReader();

        let data = [] as string[];
        let i = 0;
        while (true) {
            // Cancel the stream after 5 messages
            if (i > 5) {
                reader.cancel();
                break;
            }
            const { value, done } = await reader.read();

            if (value) {
                console.log(`Got value ${value}`);
                data = [...data, value];
            }

            if (done) {
                break;
            }
            i++;
        }

        return Response.json(data);
    },

} satisfies ExportedHandler<Env>;
```

Note

In a setup where a Durable Object returns a readable stream to a Worker, if the Worker cancels the Durable Object's readable stream, the cancellation propagates to the Durable Object.

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/durable-objects/examples/readable-stream/#page","headline":"Use ReadableStream with Durable Object and Workers · Cloudflare Durable Objects docs","description":"Stream ReadableStream from Durable Objects.","url":"https://developers.cloudflare.com/durable-objects/examples/readable-stream/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
