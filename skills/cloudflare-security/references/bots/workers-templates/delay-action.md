---
description: Use a Worker to add configurable delays to requests with low bot scores.
title: Delay action
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/bots/llms.txt
> Use this file to discover all available pages before exploring further.

# Delay action

Last updated May 5, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/bots/workers-templates/delay-action/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Customers with a Bot Management and a [Workers](https://developers.cloudflare.com/workers/) subscription can use the template below to introduce a delay to requests that are likely from bots.

The template sets a minimum and maximum delay, and delays requests where the bot score is less than 30 and the URI path starts with `/exampleURI`.

```js
// Configurable Variables
const PATH_START = "/exampleURI";
const DELAY_FROM = 5; // in seconds
const DELAY_TO = 10; // in seconds

export default {
	async fetch(request, env, ctx) {
		const url = new URL(request.url);
		const botScore = request.cf.botManagement.score;

		if (url.pathname.startsWith(PATH_START) && botScore < 30) {
			// Random delay between DELAY_FROM and DELAY_TO seconds
			const delay =
				Math.floor(Math.random() * (DELAY_TO - DELAY_FROM + 1)) + DELAY_FROM;
			await new Promise((resolve) => setTimeout(resolve, delay * 1000));

			// Fetch the original request
			return fetch(request);
		}

		// Fetch the original request without delay
		return fetch(request);
	},
};
```

```ts
// Configurable Variables
const PATH_START = '/exampleURI';
const DELAY_FROM = 5; // in seconds
const DELAY_TO = 10; // in seconds

export default {
  async fetch(request, env, ctx): Promise<Response> {
    const url = new URL(request.url);
    const botScore = request.cf.botManagement.score

    if (url.pathname.startsWith(PATH_START) && botScore < 30) {
      // Random delay between DELAY_FROM and DELAY_TO seconds
      const delay = Math.floor(Math.random() * (DELAY_TO - DELAY_FROM + 1)) + DELAY_FROM;
      await new Promise(resolve => setTimeout(resolve, delay * 1000));

      // Fetch the original request
      return fetch(request);
    }

    // Fetch the original request without delay
    return fetch(request);
  },
} satisfies ExportedHandler<Env>;
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/bots/workers-templates/delay-action/#page","headline":"Delay action · Cloudflare bot solutions docs","description":"Use a Worker to add configurable delays to requests with low bot scores.","url":"https://developers.cloudflare.com/bots/workers-templates/delay-action/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["TypeScript","JavaScript"]}
```
