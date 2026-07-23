---
description: If response to the original request is not `200 OK` or a redirect, send to another origin.
title: Route to a different origin based on origin response
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/rules/llms.txt
> Use this file to discover all available pages before exploring further.

# Route to a different origin based on origin response

If response to the original request is not `200 OK` or a redirect, send to another origin.

Last updated Oct 13, 2025|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/rules/snippets/examples/serve-different-origin/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

```js
export default {
	async fetch(request) {
		// Send original request to the origin
		const response = await fetch(request);

		// If response is not 200 OK or a redirect, send to another origin
		if (!response.ok && !response.redirected) {
			// First, clone the original request to construct a new request
			const newRequest = new Request(request);
			// Add a header to identify a re-routed request at the new origin
			newRequest.headers.set("X-Rerouted", "1");
			// Clone the original URL
			const url = new URL(request.url);
			// Send request to a different origin / hostname
			url.hostname = "example.com";
			// Serve response to the new request from the origin
			return await fetch(url, newRequest);
		}

		// If response is 200 OK or a redirect, serve it
		return response;
	},
};
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/rules/snippets/examples/serve-different-origin/#page","headline":"Route to a different origin based on origin response · Cloudflare Rules docs","description":"If response to the original request is not 200 OK or a redirect, send to another origin.","url":"https://developers.cloudflare.com/rules/snippets/examples/serve-different-origin/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2025-10-13","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Redirects"]}
```
