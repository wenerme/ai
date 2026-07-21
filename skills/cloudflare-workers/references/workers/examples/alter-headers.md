---
description: Example of how to add, change, or delete headers sent in a request or returned in a response.
title: Alter headers
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

#  Alter headers

Example of how to add, change, or delete headers sent in a request or returned in a response.

Last updated Apr 23, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/workers/examples/alter-headers/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

If you want to get started quickly, click on the button below.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/cloudflare/docs-examples/tree/main/workers/alter-headers)

This creates a repository in your GitHub account and deploys the application to Cloudflare Workers.

```js
export default {
	async fetch(request) {
		const response = await fetch("https://example.com");

		// Clone the response so that it's no longer immutable
		const newResponse = new Response(response.body, response);

		// Add a custom header with a value
		newResponse.headers.append(
			"x-workers-hello",
			"Hello from Cloudflare Workers",
		);

		// Delete headers
		newResponse.headers.delete("x-header-to-delete");
		newResponse.headers.delete("x-header2-to-delete");

		// Adjust the value for an existing header
		newResponse.headers.set("x-header-to-change", "NewValue");

		return newResponse;
	},
};
```

```ts
export default {
	async fetch(request): Promise<Response> {
		const response = await fetch(request);

		// Clone the response so that it's no longer immutable
		const newResponse = new Response(response.body, response);

		// Add a custom header with a value
		newResponse.headers.append(
			"x-workers-hello",
			"Hello from Cloudflare Workers",
		);

		// Delete headers
		newResponse.headers.delete("x-header-to-delete");
		newResponse.headers.delete("x-header2-to-delete");

		// Adjust the value for an existing header
		newResponse.headers.set("x-header-to-change", "NewValue");

		return newResponse;
	},
} satisfies ExportedHandler;
```

```py
from workers import Response, fetch, WorkerEntrypoint

class Default(WorkerEntrypoint):
  async def fetch(self, request):
      response = await fetch("https://example.com")

      # Grab the response headers so they can be modified
      new_headers = response.headers

      # Add a custom header with a value
      new_headers["x-workers-hello"] = "Hello from Cloudflare Workers"

      # Delete headers
      if "x-header-to-delete" in new_headers:
          del new_headers["x-header-to-delete"]
      if "x-header2-to-delete" in new_headers:
          del new_headers["x-header2-to-delete"]

      # Adjust the value for an existing header
      new_headers["x-header-to-change"] = "NewValue"

      return Response(response.body, headers=new_headers)
```

```ts
import { Hono } from 'hono';

const app = new Hono();

app.use('*', async (c, next) => {
  // Process the request with the next middleware/handler
  await next();

  // After the response is generated, we can modify its headers

  // Add a custom header with a value
  c.res.headers.append(
    "x-workers-hello",
    "Hello from Cloudflare Workers with Hono"
  );

  // Delete headers
  c.res.headers.delete("x-header-to-delete");
  c.res.headers.delete("x-header2-to-delete");

  // Adjust the value for an existing header
  c.res.headers.set("x-header-to-change", "NewValue");
});

app.get('*', async (c) => {
  // Fetch content from example.com
  const response = await fetch("https://example.com");

  // Return the response body with original headers
  // (our middleware will modify the headers before sending)
  return new Response(response.body, {
    headers: response.headers
  });
});

export default app;
```

You can also use the [custom-headers-example template ↗](https://github.com/kristianfreeman/custom-headers-example) to deploy this code to your custom domain.

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/examples/alter-headers/#page","headline":"Alter headers · Cloudflare Workers docs","description":"Example of how to add, change, or delete headers sent in a request or returned in a response.","url":"https://developers.cloudflare.com/workers/examples/alter-headers/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Headers","Middleware","JavaScript","TypeScript","Python"]}
```
