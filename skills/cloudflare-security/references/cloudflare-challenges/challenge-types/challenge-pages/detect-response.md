---
description: Use the cf-mitigated header to identify challenge page responses in fetch and XHR requests.
title: Detect a Challenge Page response
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-challenges/llms.txt
> Use this file to discover all available pages before exploring further.

# Detect a Challenge Page response

Last updated May 5, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/cloudflare-challenges/challenge-types/challenge-pages/detect-response/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

When a request encounters a Cloudflare Challenge Page instead of the originally anticipated response, the Challenge Page response (regardless of the Challenge Page type) will have the `cf-mitigated` header present and set to `challenge`. This header can be leveraged to detect if a response was challenged when making fetch/XHR requests. This header provides a reliable way to identify whether a response is a Challenge or not, enabling a web application to take appropriate action based on the result. For example, a front-end application encountering a response from the backend may check the presence of this header value to handle cases where Challenge Pages encountered unexpectedly.

Note

Regardless of the requested resource-type, the content-type of a challenge will be `text/html`.

For the `cf-mitigated` header, `challenge` is the only valid value. The header is set for all Challenge Page types.

To illustrate, here is a JavaScript code snippet that demonstrates how to use the `cf-mitigated` header to detect whether a response was challenged:

```js
fetch("/my-api-endpoint").then((response) => {
	if (response.headers.get("cf-mitigated") === "challenge") {
		// Handle challenged response
	} else {
		// Process response as usual
	}
});
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-challenges/challenge-types/challenge-pages/detect-response/#page","headline":"Detect a Challenge Page response · Cloudflare challenges docs","description":"Use the cf-mitigated header to identify challenge page responses in fetch and XHR requests.","url":"https://developers.cloudflare.com/cloudflare-challenges/challenge-types/challenge-pages/detect-response/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Headers","JavaScript"]}
```
