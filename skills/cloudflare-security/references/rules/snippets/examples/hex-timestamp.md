---
description: Add a custom header to requests sent to the origin server with the current timestamp in hexadecimal format for debugging, tracking, or custom routing purposes.
title: Add HEX timestamp to a request header
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/rules/llms.txt
> Use this file to discover all available pages before exploring further.

#  Add HEX timestamp to a request header

Add a custom header to requests sent to the origin server with the current timestamp in hexadecimal format.

Last updated Oct 13, 2025 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/rules/snippets/examples/hex-timestamp/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

```js
export default {
	async fetch(request) {
		// Get the current timestamp
		const timestamp = Date.now();

		// Convert the timestamp to hexadecimal format
		const hexTimestamp = timestamp.toString(16);

		// Clone the request and add the custom header
		const modifiedRequest = new Request(request, {
			headers: new Headers(request.headers),
		});
		modifiedRequest.headers.set("X-Hex-Timestamp", hexTimestamp);

		// Log the custom header for debugging
		console.log(`X-Hex-Timestamp: ${hexTimestamp}`);

		// Pass the modified request to the origin
		const response = await fetch(modifiedRequest);

		return response;
	},
};
```

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/rules/snippets/examples/hex-timestamp/#page","headline":"Add HEX timestamp to a request header · Cloudflare Rules docs","description":"Add a custom header to requests sent to the origin server with the current timestamp in hexadecimal format for debugging, tracking, or custom routing purposes.","url":"https://developers.cloudflare.com/rules/snippets/examples/hex-timestamp/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2025-10-13","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Headers","Request modification"]}
```
