---
description: Given the cookie name, get the value of a cookie. You can also use cookies for A/B testing.
title: Cookie parsing
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

# Cookie parsing

Given the cookie name, get the value of a cookie. You can also use cookies for A/B testing.

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/workers/examples/extract-cookie-value/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

If you want to get started quickly, click on the button below.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/cloudflare/docs-examples/tree/main/workers/extract-cookie-value)

This creates a repository in your GitHub account and deploys the application to Cloudflare Workers.

```js
import { parse } from "cookie";
export default {
	async fetch(request) {
		// The name of the cookie
		const COOKIE_NAME = "__uid";
		const cookie = parse(request.headers.get("Cookie") || "");
		if (cookie[COOKIE_NAME] != null) {
			// Respond with the cookie value
			return new Response(cookie[COOKIE_NAME]);
		}
		return new Response("No cookie with name: " + COOKIE_NAME);
	},
};
```

```ts
import { parse } from "cookie";
export default {
	async fetch(request): Promise<Response> {
		// The name of the cookie
		const COOKIE_NAME = "__uid";
		const cookie = parse(request.headers.get("Cookie") || "");
		if (cookie[COOKIE_NAME] != null) {
			// Respond with the cookie value
			return new Response(cookie[COOKIE_NAME]);
		}
		return new Response("No cookie with name: " + COOKIE_NAME);
	},
} satisfies ExportedHandler;
```

```py
from http.cookies import SimpleCookie
from workers import WorkerEntrypoint, Response

class Default(WorkerEntrypoint):
    async def fetch(self, request):
        # Name of the cookie
        cookie_name = "__uid"

        cookies = SimpleCookie(request.headers["Cookie"] or "")

        if cookie_name in cookies:
            # Respond with cookie value
            return Response(cookies[cookie_name].value)

        return Response("No cookie with name: " + cookie_name)
```

```ts
import { Hono } from 'hono';
import { getCookie } from 'hono/cookie';

const app = new Hono();

app.get('*', (c) => {
  // The name of the cookie
  const COOKIE_NAME = "__uid";

  // Get the specific cookie value using Hono's cookie helper
  const cookieValue = getCookie(c, COOKIE_NAME);

  if (cookieValue) {
    // Respond with the cookie value
    return c.text(cookieValue);
  }

  return c.text("No cookie with name: " + COOKIE_NAME);
});

export default app;
```

External dependencies

This example requires the npm package [cookie ↗](https://www.npmjs.com/package/cookie) to be installed in your JavaScript project.

The Hono example uses the built-in cookie utilities provided by Hono, so no external dependencies are needed for that implementation.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/examples/extract-cookie-value/#page","headline":"Cookie parsing · Cloudflare Workers docs","description":"Given the cookie name, get the value of a cookie. You can also use cookies for A/B testing.","url":"https://developers.cloudflare.com/workers/examples/extract-cookie-value/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Headers","JavaScript","TypeScript","Python"]}
```
