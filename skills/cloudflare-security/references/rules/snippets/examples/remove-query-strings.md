---
description: Remove certain query strings from a request before passing to the origin.
title: Remove query strings before sending request to origin
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/rules/llms.txt
> Use this file to discover all available pages before exploring further.

# Remove query strings before sending request to origin

Remove certain query strings from a request before passing to the origin.

Last updated Oct 13, 2025|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/rules/snippets/examples/remove-query-strings/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

```js
export default {
	async fetch(request) {
		// Define the query strings you want to remove
		const queryStringsToRemove = ["utm_source", "utm_medium", "utm_campaign"];

		// Get the URL from the request
		const url = new URL(request.url);

		// Remove the specified query strings
		queryStringsToRemove.forEach((query) => {
			url.searchParams.delete(query);
		});

		// Create a new request with the modified URL
		const modifiedRequest = new Request(url, request);

		// Pass the modified request to the origin
		const response = await fetch(modifiedRequest);

		return response;
	},
};
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/rules/snippets/examples/remove-query-strings/#page","headline":"Remove query strings before sending request to origin · Cloudflare Rules docs","description":"Remove certain query strings from a request before passing to the origin.","url":"https://developers.cloudflare.com/rules/snippets/examples/remove-query-strings/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2025-10-13","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Request modification"]}
```
