---
description: Redirect a response based on the country code in the header of a visitor.
title: Country code redirect
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

#  Country code redirect

Redirect a response based on the country code in the header of a visitor.

Last updated Apr 23, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/workers/examples/country-code-redirect/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

If you want to get started quickly, click on the button below.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/cloudflare/docs-examples/tree/main/workers/country-code-redirect)

This creates a repository in your GitHub account and deploys the application to Cloudflare Workers.

```js
export default {
	async fetch(request) {
		/**
		 * A map of the URLs to redirect to
		 * @param {Object} countryMap
		 */
		const countryMap = {
			US: "https://example.com/us",
			EU: "https://example.com/eu",
		};

		// Use the cf object to obtain the country of the request
		// more on the cf object: https://developers.cloudflare.com/workers/runtime-apis/request#incomingrequestcfproperties
		const country = request.cf.country;

		if (country != null && country in countryMap) {
			const url = countryMap[country];
			// Remove this logging statement from your final output.
			console.log(
				`Based on ${country}-based request, your user would go to ${url}.`,
			);
			return Response.redirect(url);
		} else {
			return fetch("https://example.com", request);
		}
	},
};
```

```ts
export default {
	async fetch(request): Promise<Response> {
		/**
		 * A map of the URLs to redirect to
		 * @param {Object} countryMap
		 */
		const countryMap = {
			US: "https://example.com/us",
			EU: "https://example.com/eu",
		};

		// Use the cf object to obtain the country of the request
		// more on the cf object: https://developers.cloudflare.com/workers/runtime-apis/request#incomingrequestcfproperties
		const country = request.cf.country;

		if (country != null && country in countryMap) {
			const url = countryMap[country];
			return Response.redirect(url);
		} else {
			return fetch(request);
		}
	},
} satisfies ExportedHandler;
```

```py
from workers import WorkerEntrypoint, Response, fetch

class Default(WorkerEntrypoint):
    async def fetch(self, request):
        countries = {
            "US": "https://example.com/us",
            "EU": "https://example.com/eu",
        }

        # Use the cf object to obtain the country of the request
        # more on the cf object: https://developers.cloudflare.com/workers/runtime-apis/request#incomingrequestcfproperties
        country = request.cf.country

        if country and country in countries:
            url = countries[country]
            return Response.redirect(url)

        return fetch("https://example.com", request)
```

```ts
import { Hono } from 'hono';

// Define the RequestWithCf interface to add Cloudflare-specific properties
interface RequestWithCf extends Request {
  cf: {
    country: string;
    // Other CF properties can be added as needed
  };
}

const app = new Hono();

app.get('*', async (c) => {
  /**
   * A map of the URLs to redirect to
   */
  const countryMap: Record<string, string> = {
    US: "https://example.com/us",
    EU: "https://example.com/eu",
  };

  // Cast the raw request to include Cloudflare-specific properties
  const request = c.req.raw as RequestWithCf;

  // Use the cf object to obtain the country of the request
  // more on the cf object: https://developers.cloudflare.com/workers/runtime-apis/request#incomingrequestcfproperties
  const country = request.cf.country;

  if (country != null && country in countryMap) {
    const url = countryMap[country];
    // Redirect using Hono's redirect helper
    return c.redirect(url);
  } else {
    // Default fallback
    return fetch("https://example.com", request);
  }
});

export default app;
```

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/examples/country-code-redirect/#page","headline":"Country code redirect · Cloudflare Workers docs","description":"Redirect a response based on the country code in the header of a visitor.","url":"https://developers.cloudflare.com/workers/examples/country-code-redirect/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Redirects","Geolocation","JavaScript","TypeScript","Python"]}
```
