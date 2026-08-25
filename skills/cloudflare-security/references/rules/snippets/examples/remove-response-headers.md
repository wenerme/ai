---
description: Remove from response all headers that start with a certain name.
title: Remove response headers
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/rules/llms.txt
> Use this file to discover all available pages before exploring further.

# Remove response headers

Remove from response all headers that start with a certain name.

Last updated Oct 13, 2025|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/rules/snippets/examples/remove-response-headers/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

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

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/rules/snippets/examples/remove-response-headers/#page","headline":"Remove response headers · Cloudflare Rules docs","description":"Remove from response all headers that start with a certain name.","url":"https://developers.cloudflare.com/rules/snippets/examples/remove-response-headers/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2025-10-13","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Response modification"]}
```
