---
description: Dynamically set a cookie expiration and test group.
title: Append dates to cookies to use with A/B testing
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/rules/llms.txt
> Use this file to discover all available pages before exploring further.

# Append dates to cookies to use with A/B testing

Dynamically set a cookie expiration and test group.

Last updated Oct 13, 2025|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/rules/snippets/examples/append-dates-to-cookies/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

```js
export default {
	async fetch(request) {
		const response = await fetch(request);

		// Clone the response so that it is no longer immutable
		const newResponse = new Response(response.body, response);

		// Define the dynamic expiry time. 24 h * 60 m * 60 s * 1000 ms = 86,400,000 ms
		const expiry = new Date(Date.now() + 7 * 86400000).toUTCString();
		// Define the group variable. "A" if the request header "userGroup" is "premium", "B" if otherwise.
		const group = request.headers.get("userGroup") == "premium" ? "A" : "B";

		// Append the custom header with the values
		newResponse.headers.append(
			"Set-Cookie",
			`testGroup=${group}; Expires=${expiry}; Path=/`,
		);

		return newResponse;
	},
};
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/rules/snippets/examples/append-dates-to-cookies/#page","headline":"Append dates to cookies to use with A/B testing · Cloudflare Rules docs","description":"Dynamically set a cookie expiration and test group.","url":"https://developers.cloudflare.com/rules/snippets/examples/append-dates-to-cookies/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2025-10-13","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["A/B testing","Cookies"]}
```
