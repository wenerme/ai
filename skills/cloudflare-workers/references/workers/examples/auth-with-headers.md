---
description: Allow or deny a request based on a known pre-shared key in a header. This is not meant to replace the WebCrypto API.
title: Auth with headers
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

# Auth with headers

Allow or deny a request based on a known pre-shared key in a header. This is not meant to replace the WebCrypto API.

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/workers/examples/auth-with-headers/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Caution when using in production

The example code contains a generic header key and value of `X-Custom-PSK` and `mypresharedkey`. To best protect your resources, change the header key and value in the Workers editor before saving your code.

```js
export default {
	async fetch(request) {
		/**
		 * @param {string} PRESHARED_AUTH_HEADER_KEY Custom header to check for key
		 * @param {string} PRESHARED_AUTH_HEADER_VALUE Hard coded key value
		 */
		const PRESHARED_AUTH_HEADER_KEY = "X-Custom-PSK";
		const PRESHARED_AUTH_HEADER_VALUE = "mypresharedkey";
		const psk = request.headers.get(PRESHARED_AUTH_HEADER_KEY);

		if (psk === PRESHARED_AUTH_HEADER_VALUE) {
			// Correct preshared header key supplied. Fetch request from origin.
			return fetch(request);
		}

		// Incorrect key supplied. Reject the request.
		return new Response("Sorry, you have supplied an invalid key.", {
			status: 403,
		});
	},
};
```

```ts
export default {
	async fetch(request): Promise<Response> {
		/**
		 * @param {string} PRESHARED_AUTH_HEADER_KEY Custom header to check for key
		 * @param {string} PRESHARED_AUTH_HEADER_VALUE Hard coded key value
		 */
		const PRESHARED_AUTH_HEADER_KEY = "X-Custom-PSK";
		const PRESHARED_AUTH_HEADER_VALUE = "mypresharedkey";
		const psk = request.headers.get(PRESHARED_AUTH_HEADER_KEY);

		if (psk === PRESHARED_AUTH_HEADER_VALUE) {
			// Correct preshared header key supplied. Fetch request from origin.
			return fetch(request);
		}

		// Incorrect key supplied. Reject the request.
		return new Response("Sorry, you have supplied an invalid key.", {
			status: 403,
		});
	},
} satisfies ExportedHandler;
```

```py
from workers import WorkerEntrypoint, Response, fetch

class Default(WorkerEntrypoint):
    async def fetch(self, request):
        PRESHARED_AUTH_HEADER_KEY = "X-Custom-PSK"
        PRESHARED_AUTH_HEADER_VALUE = "mypresharedkey"

        psk = request.headers[PRESHARED_AUTH_HEADER_KEY]

        if psk == PRESHARED_AUTH_HEADER_VALUE:
            # Correct preshared header key supplied. Fetch request from origin.
            return fetch(request)

        # Incorrect key supplied. Reject the request.
        return Response("Sorry, you have supplied an invalid key.", status=403)
```

```ts
import { Hono } from 'hono';

const app = new Hono();

// Add authentication middleware
app.use('*', async (c, next) => {
  /**
   * Define authentication constants
   */
  const PRESHARED_AUTH_HEADER_KEY = "X-Custom-PSK";
  const PRESHARED_AUTH_HEADER_VALUE = "mypresharedkey";

  // Get the pre-shared key from the request header
  const psk = c.req.header(PRESHARED_AUTH_HEADER_KEY);

  if (psk === PRESHARED_AUTH_HEADER_VALUE) {
    // Correct preshared header key supplied. Continue to the next handler.
    await next();
  } else {
    // Incorrect key supplied. Reject the request.
    return c.text("Sorry, you have supplied an invalid key.", 403);
  }
});

// Handle all authenticated requests by passing through to origin
app.all('*', async (c) => {
  return fetch(c.req.raw);
});

export default app;
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/examples/auth-with-headers/#page","headline":"Auth with headers · Cloudflare Workers docs","description":"Allow or deny a request based on a known pre-shared key in a header. This is not meant to replace the WebCrypto API.","url":"https://developers.cloudflare.com/workers/examples/auth-with-headers/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Authentication","WebCrypto","JavaScript","TypeScript","Python"]}
```
