---
description: Set per-customer CPU time and subrequest limits on user Workers in Workers for Platforms.
title: Custom limits
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-for-platforms/llms.txt
> Use this file to discover all available pages before exploring further.

# Custom limits

Last updated Apr 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/cloudflare-for-platforms/workers-for-platforms/configuration/custom-limits/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Custom limits allow you to programmatically enforce limits on your customers' Workers' resource usage. You can set limits for the maximum CPU time and number of subrequests per invocation. If a user Worker hits either of these limits, the user Worker will immediately throw an exception.

## Set Custom limits

Custom limits can be set in the dynamic dispatch Worker:

```js
export default {
	async fetch(request, env) {
		try {
			// parse the URL, read the subdomain
			let workerName = new URL(request.url).host.split(".")[0];
			let userWorker = env.dispatcher.get(
				workerName,
				{},
				{
					// set limits
					limits: { cpuMs: 10, subRequests: 5 },
				},
			);
			return await userWorker.fetch(request);
		} catch (e) {
			if (e.message.startsWith("Worker not found")) {
				// we tried to get a worker that doesn't exist in our dispatch namespace
				return new Response("", { status: 404 });
			}
			return new Response(e.message, { status: 500 });
		}
	},
};
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-for-platforms/workers-for-platforms/configuration/custom-limits/#page","headline":"Custom limits · Cloudflare for Platforms docs","description":"Set per-customer CPU time and subrequest limits on user Workers in Workers for Platforms.","url":"https://developers.cloudflare.com/cloudflare-for-platforms/workers-for-platforms/configuration/custom-limits/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
