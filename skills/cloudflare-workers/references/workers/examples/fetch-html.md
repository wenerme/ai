---
description: Send a request to a remote server, read HTML from the response, and serve that HTML.
title: Fetch HTML
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

# Fetch HTML

Send a request to a remote server, read HTML from the response, and serve that HTML.

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/workers/examples/fetch-html/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

If you want to get started quickly, click on the button below.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/cloudflare/docs-examples/tree/main/workers/fetch-html)

This creates a repository in your GitHub account and deploys the application to Cloudflare Workers.

```js
export default {
  async fetch(request) {
    /**
     * Replace `remote` with the host you wish to send requests to
     */
    const remote = "https://example.com";

    return await fetch(remote, request);
  },
};
```

```ts
export default {
	async fetch(request: Request): Promise<Response> {
		/**
		 * Replace `remote` with the host you wish to send requests to
		 */
		const remote = "https://example.com";

		return await fetch(remote, request);
	},
};
```

```py
from workers import WorkerEntrypoint
from js import fetch

class Default(WorkerEntrypoint):
    async def fetch(self, request):
        # Replace `remote` with the host you wish to send requests to
        remote = "https://example.com"
        return await fetch(remote, request)
```

```ts
import { Hono } from "hono";

const app = new Hono();

app.all("*", async (c) => {
	/**
	 * Replace `remote` with the host you wish to send requests to
	 */
	const remote = "https://example.com";

	// Forward the request to the remote server
	return await fetch(remote, c.req.raw);
});

export default app;
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/examples/fetch-html/#page","headline":"Fetch HTML · Cloudflare Workers docs","description":"Send a request to a remote server, read HTML from the response, and serve that HTML.","url":"https://developers.cloudflare.com/workers/examples/fetch-html/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["JavaScript","TypeScript","Python"]}
```
