---
description: Example of how to use Queues to batch data and store it in an R2 bucket.
title: Use Queues to store data in R2
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/queues/llms.txt
> Use this file to discover all available pages before exploring further.

# Use Queues to store data in R2

Example of how to use Queues to batch data and store it in an R2 bucket.

Last updated Apr 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/queues/examples/send-errors-to-r2/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

The following Worker will catch JavaScript errors and send them to a queue. The same Worker will receive those errors in batches and store them to a log file in an R2 bucket.

```jsonc
{
	"$schema": "./node_modules/wrangler/config-schema.json",
	"name": "my-worker",
	"queues": {
		"producers": [
			{
				"queue": "my-queue",
				"binding": "ERROR_QUEUE"
			}
		],
		"consumers": [
			{
				"queue": "my-queue",
				"max_batch_size": 100,
				"max_batch_timeout": 30
			}
		]
	},
	"r2_buckets": [
		{
			"bucket_name": "my-bucket",
			"binding": "ERROR_BUCKET"
		}
	]
}
```

```toml
"$schema" = "./node_modules/wrangler/config-schema.json"
name = "my-worker"

[[queues.producers]]
queue = "my-queue"
binding = "ERROR_QUEUE"

[[queues.consumers]]
queue = "my-queue"
max_batch_size = 100
max_batch_timeout = 30

[[r2_buckets]]
bucket_name = "my-bucket"
binding = "ERROR_BUCKET"
```

```ts
interface ErrorMessage {
	message: string;
	stack?: string;
}

interface Env {
	readonly ERROR_QUEUE: Queue<ErrorMessage>;
	readonly ERROR_BUCKET: R2Bucket;
}

export default {
  async fetch(req, env, ctx): Promise<Response> {
    try {
      return doRequest(req);
    } catch (e) {
      const error: ErrorMessage = {
        message: e instanceof Error ? e.message : String(e),
        stack: e instanceof Error ? e.stack : undefined,
      };
      await env.ERROR_QUEUE.send(error);
      return new Response(error.message, { status: 500 });
    }
  },
  async queue(batch, env, ctx): Promise<void> {
    let file = "";
    for (const message of batch.messages) {
      const error = message.body;
      file += error.stack ?? error.message;
      file += "\r\n";
    }
    await env.ERROR_BUCKET.put(`errors/${Date.now()}.log`, file);
  },
} satisfies ExportedHandler<Env, ErrorMessage>;

function doRequest(request: Request): Response {
  if (Math.random() > 0.5) {
    return new Response("Success!");
  }
  throw new Error("Failed!");
}
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/queues/examples/send-errors-to-r2/#page","headline":"Cloudflare Queues - Queues & R2 · Cloudflare Queues docs","description":"Example of how to use Queues to batch data and store it in an R2 bucket.","url":"https://developers.cloudflare.com/queues/examples/send-errors-to-r2/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
