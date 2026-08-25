---
description: Convert timestamp to hexadecimal format and send it as a custom header to the origin.
title: Send timestamp to origin as a custom header
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/rules/llms.txt
> Use this file to discover all available pages before exploring further.

# Send timestamp to origin as a custom header

Convert timestamp to hexadecimal format and send it as a custom header to the origin.

Last updated Oct 13, 2025|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/rules/snippets/examples/send-timestamp-to-origin/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

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

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/rules/snippets/examples/send-timestamp-to-origin/#page","headline":"Send timestamp to origin as a custom header · Cloudflare Rules docs","description":"Convert timestamp to hexadecimal format and send it as a custom header to the origin.","url":"https://developers.cloudflare.com/rules/snippets/examples/send-timestamp-to-origin/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2025-10-13","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Headers","Request modification"]}
```
