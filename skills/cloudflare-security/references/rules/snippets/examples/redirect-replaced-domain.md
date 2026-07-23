---
description: Redirect all requests from one domain to another domain.
title: Redirect from one domain to another
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/rules/llms.txt
> Use this file to discover all available pages before exploring further.

# Redirect from one domain to another

Redirect all requests from one domain to another domain.

Last updated Oct 13, 2025|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/rules/snippets/examples/redirect-replaced-domain/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

```js
export default {
	async fetch(request) {
		// Define variables to use in the response redirect.
		const base = "https://example.com";
		const statusCode = 301;

		// Clone the original URL.
		const url = new URL(request.url);

		// Define a "pathname" and "search" variables, extracting their values from the cloned URL.
		const { pathname, search } = url;

		// Define the destination URL using the variables you declared previously.
		const destinationURL = `${base}${pathname}${search}`;
		console.log(destinationURL);

		// Respond with the redirect.
		return Response.redirect(destinationURL, statusCode);
	},
};
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/rules/snippets/examples/redirect-replaced-domain/#page","headline":"Redirect from one domain to another · Cloudflare Rules docs","description":"Redirect all requests from one domain to another domain.","url":"https://developers.cloudflare.com/rules/snippets/examples/redirect-replaced-domain/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2025-10-13","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Redirects"]}
```
