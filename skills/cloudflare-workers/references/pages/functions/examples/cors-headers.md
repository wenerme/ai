---
description: A Pages Functions for appending CORS headers.
title: Adding CORS headers
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/pages/llms.txt
> Use this file to discover all available pages before exploring further.

# Adding CORS headers

A Pages Functions for appending CORS headers.

Last updated Apr 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/pages/functions/examples/cors-headers/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

This example is a snippet from our Cloudflare Pages Template repo.

```ts
// Respond to OPTIONS method
export const onRequestOptions: PagesFunction = async () => {
	return new Response(null, {
		status: 204,
		headers: {
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Headers": "*",
			"Access-Control-Allow-Methods": "GET, OPTIONS",
			"Access-Control-Max-Age": "86400",
		},
	});
};

// Set CORS to all /api responses
export const onRequest: PagesFunction = async (context) => {
	const response = await context.next();
	response.headers.set("Access-Control-Allow-Origin", "*");
	response.headers.set("Access-Control-Max-Age", "86400");
	return response;
};
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/pages/functions/examples/cors-headers/#page","headline":"Adding CORS headers · Cloudflare Pages docs","description":"A Pages Functions for appending CORS headers.","url":"https://developers.cloudflare.com/pages/functions/examples/cors-headers/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Headers"]}
```
