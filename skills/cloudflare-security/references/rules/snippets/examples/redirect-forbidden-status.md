---
description: If origin responded with `403 Forbidden` error code, redirect to different page.
title: Redirect 403 Forbidden to a different page
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/rules/llms.txt
> Use this file to discover all available pages before exploring further.

# Redirect 403 Forbidden to a different page

If origin responded with `403 Forbidden` error code, redirect to different page.

Last updated Oct 13, 2025|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/rules/snippets/examples/redirect-forbidden-status/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

```js
export default {
	async fetch(request) {
		// Send original request to the origin
		const response = await fetch(request);
		// Check if origin responded with 403 status code
		if (response.status == 403) {
			// If so, redirect to this URL
			const destinationURL = "https://example.com";
			// With this status code
			const statusCode = 301;
			// Serve redirect
			return Response.redirect(destinationURL, statusCode);
		}
		// Otherwise, serve origin's response
		else {
			return response;
		}
	},
};
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/rules/snippets/examples/redirect-forbidden-status/#page","headline":"Redirect 403 Forbidden to a different page · Cloudflare Rules docs","description":"If origin responded with 403 Forbidden error code, redirect to different page.","url":"https://developers.cloudflare.com/rules/snippets/examples/redirect-forbidden-status/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2025-10-13","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Redirects"]}
```
