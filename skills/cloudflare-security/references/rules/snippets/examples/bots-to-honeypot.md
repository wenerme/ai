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

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/rules/snippets/examples/bots-to-honeypot/#page","headline":"Send suspect bots to a honeypot · Cloudflare Rules docs","description":"Use the bot score field to send bots to a honeypot.","url":"https://developers.cloudflare.com/rules/snippets/examples/bots-to-honeypot/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2025-10-13","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Redirects"]}
```
