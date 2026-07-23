---
description: Use the [bot score field](/workers/runtime-apis/request/#incomingrequestcfproperties) to send bots to a honeypot.
title: Send suspect bots to a honeypot
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/rules/llms.txt
> Use this file to discover all available pages before exploring further.

# Send suspect bots to a honeypot

Use the [bot score field](https://developers.cloudflare.com/workers/runtime-apis/request/#incomingrequestcfproperties) to send bots to a honeypot.

Last updated Oct 13, 2025|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/rules/snippets/examples/bots-to-honeypot/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

```js
export default {
	async fetch(request) {
		const response = await fetch(request);

		// Clone the response so that it is no longer immutable
		const newResponse = new Response(response.body, response);

		if (request.cf.botManagement.score < 30) {
			const honeypot = "https://example.com/";
			return await fetch(honeypot, request);
		} else {
			return newResponse;
		}
	},
};
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/rules/snippets/examples/bots-to-honeypot/#page","headline":"Send suspect bots to a honeypot · Cloudflare Rules docs","description":"Use the bot score field to send bots to a honeypot.","url":"https://developers.cloudflare.com/rules/snippets/examples/bots-to-honeypot/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2025-10-13","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Redirects"]}
```
