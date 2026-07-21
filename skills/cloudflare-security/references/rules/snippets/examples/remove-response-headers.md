---
description: Remove from response all headers that start with a certain name.
title: Remove response headers
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/rules/llms.txt
> Use this file to discover all available pages before exploring further.

#  Remove response headers

Remove from response all headers that start with a certain name.

Last updated Oct 13, 2025 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/rules/snippets/examples/remove-response-headers/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

```js
export default {
	async fetch(request) {
		// Define the prefix of the headers you want to remove
		const headerPrefix = "x-header-";

		// Receive response from the origin
		const response = await fetch(request);

		// Create a new Headers object to modify response headers
		const newHeaders = new Headers(response.headers);

		// Remove headers that start with the specified prefix
		for (const [key] of newHeaders.entries()) {
			if (key.startsWith(headerPrefix)) {
				newHeaders.delete(key);
			}
		}

		// Return the modified response with updated headers
		return new Response(response.body, {
			status: response.status,
			headers: newHeaders,
		});
	},
};
```

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/rules/snippets/examples/remove-response-headers/#page","headline":"Remove response headers · Cloudflare Rules docs","description":"Remove from response all headers that start with a certain name.","url":"https://developers.cloudflare.com/rules/snippets/examples/remove-response-headers/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2025-10-13","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Response modification"]}
```
