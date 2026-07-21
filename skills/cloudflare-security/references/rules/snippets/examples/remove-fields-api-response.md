---
description: If origin responds with `JSON`, parse the response and delete fields to return a modified response.
title: Remove fields from API response
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/rules/llms.txt
> Use this file to discover all available pages before exploring further.

#  Remove fields from API response

If origin responds with `JSON`, parse the response and delete fields to return a modified response.

Last updated Oct 13, 2025 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/rules/snippets/examples/remove-fields-api-response/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

```js
export default {
	async fetch(request) {
		// Send original request to the origin
		const response = await fetch(request);
		// Check if origin responded with JSON
		try {
			// Parse API response as JSON
			var api_response = response.json();
			// Specify the fields you want to delete. For example, to delete "botManagement" array from parsed JSON:
			delete api_response.botManagement;
			// Serve modified API response
			return Response.json(api_response);
		} catch (err) {
			// On failure, serve unmodified origin's response
			return response;
		}
	},
};
```

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/rules/snippets/examples/remove-fields-api-response/#page","headline":"Remove fields from API response · Cloudflare Rules docs","description":"If origin responds with JSON, parse the response and delete fields to return a modified response.","url":"https://developers.cloudflare.com/rules/snippets/examples/remove-fields-api-response/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2025-10-13","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Response modification"]}
```
