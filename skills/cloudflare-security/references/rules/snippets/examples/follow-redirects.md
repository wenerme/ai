---
description: Modify the fetch request to follow redirects from the origin, ensuring the client receives the final response.
title: Follow redirects from the origin
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/rules/llms.txt
> Use this file to discover all available pages before exploring further.

# Follow redirects from the origin

Modify the fetch request to follow redirects from the origin, ensuring the client receives the final response.

Last updated Oct 13, 2025|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/rules/snippets/examples/follow-redirects/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

```js
export default {
	async fetch(request) {
		// Define fetch options to follow redirects
		const fetchOptions = {
			redirect: "follow", // Ensure fetch follows redirects automatically. Each subrequest in a redirect chain counts against the subrequest limit.
		};

		// Make the fetch request to the origin
		const response = await fetch(request, fetchOptions);

		// Log the final URL after redirects (optional, for debugging)
		console.log(`Final URL after redirects: ${response.url}`);

		// Return the final response to the client
		return response;
	},
};
```

This template is ready for use and should fit most redirect-following scenarios.

It ensures the Snippet transparently follows redirects issued by the origin server. The `redirect: "follow"` option of the [Fetch API](https://developers.cloudflare.com/workers/runtime-apis/fetch/) ensures automatic handling of `3xx` redirects, returning the final response. If the origin response is not a redirect, the original content is returned.

Note

Snippets have a [maximum number of subrequests per invocation](https://developers.cloudflare.com/rules/snippets/#availability) which depends on your plan. If the origin server issues multiple redirects, each redirect subrequest will count towards this limit. When the number of subrequests exceeds the limit for your Cloudflare plan, you will receive a [1202 error](https://developers.cloudflare.com/rules/snippets/errors/#error-1202-snippets-exceeded-subrequests-limit). Ensure your origin configuration minimizes unnecessary redirects.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/rules/snippets/examples/follow-redirects/#page","headline":"Follow redirects from the origin · Cloudflare Rules docs","description":"Modify the fetch request to follow redirects from the origin, ensuring the client receives the final response.","url":"https://developers.cloudflare.com/rules/snippets/examples/follow-redirects/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2025-10-13","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Redirects"]}
```
