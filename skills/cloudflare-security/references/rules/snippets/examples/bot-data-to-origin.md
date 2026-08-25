---
description: Send [Bots](/bots/) information to your origin. Refer to [Bot Management variables](/bots/reference/bot-management-variables/) for a full list of available fields.
title: Send Bot Management information to origin
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/rules/llms.txt
> Use this file to discover all available pages before exploring further.

# Send Bot Management information to origin

Send [Bots](https://developers.cloudflare.com/bots/) information to your origin. Refer to [Bot Management variables](https://developers.cloudflare.com/bots/reference/bot-management-variables/) for a full list of available fields.

Last updated Mar 16, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/rules/snippets/examples/bot-data-to-origin/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

```js
export default {
	async fetch(request) {
		// Clone the original request to construct a new request
		const newRequest = new Request(request);
		// Set Bot Management headers on a new request to the origin: https://developers.cloudflare.com/bots/reference/bot-management-variables/#workers-variables
		newRequest.headers.set("bot-score", request.cf.botManagement.score); // bot score (integer)
		newRequest.headers.set(
			"verified-bot",
			request.cf.botManagement.verifiedBot,
		); // verified bot (boolean)
		newRequest.headers.set("ja4", request.cf.botManagement.ja4); // JA4 fingerprint hash (string)
		// Serve response to the new request from the origin
		return await fetch(newRequest);
	},
};
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/rules/snippets/examples/bot-data-to-origin/#page","headline":"Send Bot Management information to origin · Cloudflare Rules docs","description":"Send Bots information to your origin. Refer to Bot Management variables for a full list of available fields.","url":"https://developers.cloudflare.com/rules/snippets/examples/bot-data-to-origin/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-03-16","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Headers","Request modification"]}
```
