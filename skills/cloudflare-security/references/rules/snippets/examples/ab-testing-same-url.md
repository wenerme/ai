---
description: Set up an A/B test by controlling what response is served based on cookies.
title: A/B testing with same-URL direct access
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/rules/llms.txt
> Use this file to discover all available pages before exploring further.

#  A/B testing with same-URL direct access

Set up an A/B test by controlling what response is served based on cookies.

Last updated Oct 13, 2025 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/rules/snippets/examples/ab-testing-same-url/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

This version passes through requests for `/test/*` and `/control/*` URI paths to the origin server, bypassing random assignment.

```js
const NAME = "myExampleABTest";

export default {
	async fetch(request) {
		// Clone the original URL
		const url = new URL(request.url);

		// Enable Passthrough to allow direct access to control and test routes.
		if (url.pathname.startsWith("/control") || url.pathname.startsWith("/test"))
			return fetch(request);

		// Determine which group this requester is in.
		const cookie = request.headers.get("cookie");

		if (cookie && cookie.includes(`${NAME}=control`)) {
			url.pathname = "/control" + url.pathname;
		} else if (cookie && cookie.includes(`${NAME}=test`)) {
			url.pathname = "/test" + url.pathname;
		} else {
			// If there is no cookie, this is a new client. Choose a group and set the cookie.
			const group = Math.random() < 0.5 ? "test" : "control"; // 50/50 split
			if (group === "control") {
				url.pathname = "/control" + url.pathname;
			} else {
				url.pathname = "/test" + url.pathname;
			}
			// Reconstruct response to avoid immutability
			let response = await fetch(url);
			response = new Response(response.body, response);
			// Set cookie to enable persistent A/B sessions.
			response.headers.append("Set-Cookie", `${NAME}=${group}; path=/`);
			return response;
		}
		return fetch(url);
	},
};
```

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/rules/snippets/examples/ab-testing-same-url/#page","headline":"A/B testing with same-URL direct access · Cloudflare Rules docs","description":"Set up an A/B test by controlling what response is served based on cookies.","url":"https://developers.cloudflare.com/rules/snippets/examples/ab-testing-same-url/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2025-10-13","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["A/B testing","Cookies","URL rewrite"]}
```
