---
description: Access custom Cloudflare properties and control how Cloudflare features are applied to every request.
title: Accessing the Cloudflare Object
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

# Accessing the Cloudflare Object

Access custom Cloudflare properties and control how Cloudflare features are applied to every request.

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/workers/examples/accessing-the-cloudflare-object/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

If you want to get started quickly, click on the button below.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/cloudflare/docs-examples/tree/main/workers/accessing-the-cloudflare-object)

This creates a repository in your GitHub account and deploys the application to Cloudflare Workers.

```js
export default {
	async fetch(req) {
		const data =
			req.cf !== undefined
				? req.cf
				: { error: "The `cf` object is not available inside the preview." };

		return new Response(JSON.stringify(data, null, 2), {
			headers: {
				"content-type": "application/json;charset=UTF-8",
			},
		});
	},
};
```

```ts
export default {
	async fetch(req): Promise<Response> {
		const data =
			req.cf !== undefined
				? req.cf
				: { error: "The `cf` object is not available inside the preview." };

		return new Response(JSON.stringify(data, null, 2), {
			headers: {
				"content-type": "application/json;charset=UTF-8",
			},
		});
	},
} satisfies ExportedHandler;
```

```ts
import { Hono } from "hono";

const app = new Hono();

app.get("*", async (c) => {
	// Access the raw request to get the cf object
	const req = c.req.raw;

	// Check if the cf object is available
	const data =
		req.cf !== undefined
			? req.cf
			: { error: "The `cf` object is not available inside the preview." };

	// Return the data formatted with 2-space indentation
	return c.json(data);
});

export default app;
```

```py
import json
from workers import Response, WorkerEntrypoint
from js import JSON

class Default(WorkerEntrypoint):
	async def fetch(self, request):
		error = json.dumps({ "error": "The `cf` object is not available inside the preview." })
		data = request.cf if request.cf is not None else error
		headers = {"content-type":"application/json"}
		return Response(JSON.stringify(data, None, 2), headers=headers)
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/examples/accessing-the-cloudflare-object/#page","headline":"Accessing the Cloudflare Object · Cloudflare Workers docs","description":"Access custom Cloudflare properties and control how Cloudflare features are applied to every request.","url":"https://developers.cloudflare.com/workers/examples/accessing-the-cloudflare-object/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["JavaScript","TypeScript","Python"]}
```
