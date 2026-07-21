---
description: Adjust [Cross-Origin Resource Sharing (CORS)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) headers and handle preflight requests.
title: Define CORS headers
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/rules/llms.txt
> Use this file to discover all available pages before exploring further.

#  Define CORS headers

Adjust [Cross-Origin Resource Sharing (CORS)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) headers and handle preflight requests.

Last updated Oct 13, 2025 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/rules/snippets/examples/define-cors-headers/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

```js
// Define CORS headers
const corsHeaders = {
	"Access-Control-Allow-Origin": "*", // Replace * with your allowed origin(s)
	"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS", // Adjust allowed methods as needed
	"Access-Control-Allow-Headers": "Content-Type, Authorization", // Adjust allowed headers as needed
	"Access-Control-Max-Age": "86400", // Adjust max age (in seconds) as needed
};

export default {
	async fetch(request) {
		// Make a copy of the request to modify its headers
		const modifiedRequest = new Request(request);

		// Handle preflight requests (OPTIONS)
		if (request.method === "OPTIONS") {
			return new Response(null, {
				headers: {
					...corsHeaders,
				},
				status: 200, // Respond with OK status for preflight requests
			});
		}

		// Pass the modified request through to the origin
		const response = await fetch(modifiedRequest);

		// Make a copy of the response to modify its headers
		const modifiedResponse = new Response(response.body, response);

		// Set CORS headers on the response
		Object.keys(corsHeaders).forEach((header) => {
			modifiedResponse.headers.set(header, corsHeaders[header]);
		});

		return modifiedResponse;
	},
};
```

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/rules/snippets/examples/define-cors-headers/#page","headline":"Define CORS headers · Cloudflare Rules docs","description":"Adjust Cross-Origin Resource Sharing (CORS) headers and handle preflight requests.","url":"https://developers.cloudflare.com/rules/snippets/examples/define-cors-headers/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2025-10-13","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Headers","Request modification","Response modification"]}
```
