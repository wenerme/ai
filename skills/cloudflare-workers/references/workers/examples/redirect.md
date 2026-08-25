---
description: Redirect requests from one URL to another or from one set of URLs to another set.
title: Redirect
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

# Redirect

Redirect requests from one URL to another or from one set of URLs to another set.

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/workers/examples/redirect/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

If you want to get started quickly, click on the button below.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/cloudflare/docs-examples/tree/main/workers/redirect)

This creates a repository in your GitHub account and deploys the application to Cloudflare Workers.

## Redirect all requests to one URL

```js
export default {
  async fetch(request) {
    const destinationURL = "https://example.com";
    const statusCode = 301;
    return Response.redirect(destinationURL, statusCode);
  },
};
```

```ts
export default {
	async fetch(request): Promise<Response> {
		const destinationURL = "https://example.com";
		const statusCode = 301;
		return Response.redirect(destinationURL, statusCode);
	},
} satisfies ExportedHandler;
```

```py
from workers import WorkerEntrypoint, Response

class Default(WorkerEntrypoint):
    def fetch(self, request):
        destinationURL = "https://example.com"
        statusCode = 301
        return Response.redirect(destinationURL, statusCode)
```

```rs
use worker::*;

#[event(fetch)]
async fn fetch(_req: Request, _env: Env, _ctx: Context) -> Result<Response> {
    let destination_url = Url::parse("https://example.com")?;
    let status_code = 301;
    Response::redirect_with_status(destination_url, status_code)
}
```

```ts
import { Hono } from "hono";

const app = new Hono();

app.all("*", (c) => {
	const destinationURL = "https://example.com";
	const statusCode = 301;
	return c.redirect(destinationURL, statusCode);
});

export default app;
```

## Redirect requests from one domain to another

```js
export default {
	async fetch(request) {
		const base = "https://example.com";
		const statusCode = 301;

		const url = new URL(request.url);
		const { pathname, search } = url;

		const destinationURL = `${base}${pathname}${search}`;
		console.log(destinationURL);

		return Response.redirect(destinationURL, statusCode);
	},
};
```

```ts
export default {
	async fetch(request): Promise<Response> {
		const base = "https://example.com";
		const statusCode = 301;

		const url = new URL(request.url);
		const { pathname, search } = url;

		const destinationURL = `${base}${pathname}${search}`;
		console.log(destinationURL);

		return Response.redirect(destinationURL, statusCode);
	},
} satisfies ExportedHandler;
```

```py
from workers import WorkerEntrypoint, Response
from urllib.parse import urlparse

class Default(WorkerEntrypoint):
    async def fetch(self, request):
        base = "https://example.com"
        statusCode = 301

        url = urlparse(request.url)

        destinationURL = f'{base}{url.path}{url.query}'
        print(destinationURL)

        return Response.redirect(destinationURL, statusCode)
```

```rs
use worker::*;

#[event(fetch)]
async fn fetch(req: Request, _env: Env, _ctx: Context) -> Result<Response> {
    let mut base = Url::parse("https://example.com")?;
    let status_code = 301;

    let url = req.url()?;

    base.set_path(url.path());
    base.set_query(url.query());

    console_log!("{:?}", base.to_string());

    Response::redirect_with_status(base, status_code)
}
```

```ts
import { Hono } from "hono";

const app = new Hono();

app.all("*", (c) => {
	const base = "https://example.com";
	const statusCode = 301;

	const { pathname, search } = new URL(c.req.url);

	const destinationURL = `${base}${pathname}${search}`;
	console.log(destinationURL);

	return c.redirect(destinationURL, statusCode);
});

export default app;
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/examples/redirect/#page","headline":"Redirect · Cloudflare Workers docs","description":"Redirect requests from one URL to another or from one set of URLs to another set.","url":"https://developers.cloudflare.com/workers/examples/redirect/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Middleware","Redirects","JavaScript","TypeScript","Python","Rust"]}
```
