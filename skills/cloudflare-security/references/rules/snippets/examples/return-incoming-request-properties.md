---
description: Respond with information about the incoming request provided by Cloudflare’s global network.
title: Return information about the incoming request
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/rules/llms.txt
> Use this file to discover all available pages before exploring further.

# Return information about the incoming request

Respond with information about the incoming request provided by Cloudflare’s global network.

Last updated Oct 13, 2025|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/rules/snippets/examples/return-incoming-request-properties/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

```js
export default {
	async fetch(request) {
		// For any request, respond with JSON object containing all incoming request properties provided by Cloudflare network
		return Response.json(request.cf, {
			// Add new header to identify request was served by Snippets
			headers: {
				"x-snippets-hello": "Hello from Cloudflare Snippets",
			},
		});
	},
};
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/rules/snippets/examples/return-incoming-request-properties/#page","headline":"Return information about the incoming request · Cloudflare Rules docs","description":"Respond with information about the incoming request provided by Cloudflare’s global network.","url":"https://developers.cloudflare.com/rules/snippets/examples/return-incoming-request-properties/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2025-10-13","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Logging","Response modification"]}
```
