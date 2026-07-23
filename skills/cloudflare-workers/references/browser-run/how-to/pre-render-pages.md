---
description: Use Browser Run to render JavaScript-heavy pages and return crawler-ready HTML from a Worker.
title: Pre-render pages for crawlers
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/browser-run/llms.txt
> Use this file to discover all available pages before exploring further.

# Pre-render pages for crawlers

Last updated Jun 12, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/browser-run/how-to/pre-render-pages/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Pre-rendering generates the final HTML for a page before returning it to a client. For JavaScript-heavy applications, this means loading the page in a browser, waiting for client-side JavaScript to run, and returning the rendered HTML instead of the initial app shell.

Pre-rendering is useful when search crawlers, social preview bots, AI indexing jobs, or partner integrations need HTML content that your application normally creates in the browser. With [Cloudflare Browser Run](https://developers.cloudflare.com/browser-run/) and [Cloudflare Workers](https://developers.cloudflare.com/workers/), you can render a public URL in managed headless Chrome and return the rendered HTML.

In this tutorial, you will:

* Add a Browser Run binding to a Worker
* Create a minimal pre-rendering endpoint
* Restrict which hostnames the Worker can render
* Test the endpoint locally with remote mode

## Prerequisites

To follow this tutorial, you need:

* A Cloudflare account
* A Worker project that uses TypeScript
* A public URL to pre-render

The page you pre-render can run anywhere. The Worker in this tutorial only acts as the pre-rendering service that calls Browser Run.

## 1\. Configure Browser Run

Add a Browser Run binding to your Wrangler configuration:

```jsonc
{
  "$schema": "./node_modules/wrangler/config-schema.json",
  "name": "my-prerender-worker",
  "main": "src/index.ts",
  // Set this to today's date
  "compatibility_date": "2026-07-22",
  "browser": {
    "binding": "BROWSER"
  }
}
```

```toml
name = "my-prerender-worker"
main = "src/index.ts"
# Set this to today's date
compatibility_date = "2026-07-22"

[browser]
binding = "BROWSER"
```

Caution

Using the `.quickAction()` method for Browser Run Quick Actions requires a `compatibility_date` of `2026-03-24` or later.

## 2\. Add the pre-rendering Worker

Replace the contents of `src/index.ts` with the following Worker. Update `ALLOWED_HOSTNAMES` to include the hostnames that your Worker can pre-render.

```js
// Only render pages you control. This prevents the Worker from becoming
// an open browser-rendering proxy for arbitrary websites.
const ALLOWED_HOSTNAMES = new Set(["example.com", "www.example.com"]);

const getTargetUrl = (request) => {
	const requestUrl = new URL(request.url);
	const target = requestUrl.searchParams.get("url");

	if (!target) {
		throw new Error("Missing url query parameter");
	}

	const targetUrl = new URL(target);

	// Only render HTTP(S) pages. Other protocols are not valid web pages.
	if (!["http:", "https:"].includes(targetUrl.protocol)) {
		throw new Error("Only HTTP and HTTPS URLs are allowed");
	}

	if (!ALLOWED_HOSTNAMES.has(targetUrl.hostname)) {
		throw new Error("This hostname is not allowed");
	}

	return targetUrl;
};

const renderHtml = async (env, targetUrl) => {
	// The /content Quick Actions endpoint loads the page in Browser Run and returns
	// a JSON envelope containing the rendered HTML in the result field.
	const response = await env.BROWSER.quickAction("content", {
		url: targetUrl.toString(),
		gotoOptions: {
			waitUntil: "networkidle2",
			timeout: 30000,
		},
		// If your page has a specific readiness signal, use waitForSelector
		// instead of relying only on network activity.
		// waitForSelector: { selector: "[data-prerender-ready='true']", timeout: 30000 },
	});

	if (!response.ok) {
		const detail = (await response.text()).slice(0, 500);
		throw new Error(`Browser Run failed with ${response.status}: ${detail}`);
	}

	const data = await response.json();

	if (!data.success || typeof data.result !== "string") {
		throw new Error("Browser Run returned an unsuccessful response");
	}

	return data.result;
};

export default {
	async fetch(request, env) {
		try {
			// Read and validate the URL before sending it to Browser Run.
			const targetUrl = getTargetUrl(request);
			const html = await renderHtml(env, targetUrl);

			// Return the rendered HTML to the crawler or integration.
			return new Response(html, {
				headers: {
					"content-type": "text/html; charset=utf-8",
				},
			});
		} catch (error) {
			return Response.json(
				{ error: error instanceof Error ? error.message : "Unknown error" },
				{ status: 400 },
			);
		}
	},
};
```

```typescript
interface Env {
	BROWSER: BrowserRun;
}

// Only render pages you control. This prevents the Worker from becoming
// an open browser-rendering proxy for arbitrary websites.
const ALLOWED_HOSTNAMES = new Set(["example.com", "www.example.com"]);

const getTargetUrl = (request: Request) => {
	const requestUrl = new URL(request.url);
	const target = requestUrl.searchParams.get("url");

	if (!target) {
		throw new Error("Missing url query parameter");
	}

	const targetUrl = new URL(target);

	// Only render HTTP(S) pages. Other protocols are not valid web pages.
	if (!["http:", "https:"].includes(targetUrl.protocol)) {
		throw new Error("Only HTTP and HTTPS URLs are allowed");
	}

	if (!ALLOWED_HOSTNAMES.has(targetUrl.hostname)) {
		throw new Error("This hostname is not allowed");
	}

	return targetUrl;
};

const renderHtml = async (env: Env, targetUrl: URL) => {
	// The /content Quick Actions endpoint loads the page in Browser Run and returns
	// a JSON envelope containing the rendered HTML in the result field.
	const response = await env.BROWSER.quickAction("content", {
		url: targetUrl.toString(),
		gotoOptions: {
			waitUntil: "networkidle2",
			timeout: 30000,
		},
		// If your page has a specific readiness signal, use waitForSelector
		// instead of relying only on network activity.
		// waitForSelector: { selector: "[data-prerender-ready='true']", timeout: 30000 },
	});

	if (!response.ok) {
		const detail = (await response.text()).slice(0, 500);
		throw new Error(`Browser Run failed with ${response.status}: ${detail}`);
	}

	const data = (await response.json()) as {
		success: boolean;
		result?: string;
	};

	if (!data.success || typeof data.result !== "string") {
		throw new Error("Browser Run returned an unsuccessful response");
	}

	return data.result;
};

export default {
	async fetch(request, env): Promise<Response> {
		try {
			// Read and validate the URL before sending it to Browser Run.
			const targetUrl = getTargetUrl(request);
			const html = await renderHtml(env, targetUrl);

			// Return the rendered HTML to the crawler or integration.
			return new Response(html, {
				headers: {
					"content-type": "text/html; charset=utf-8",
				},
			});
		} catch (error) {
			return Response.json(
				{ error: error instanceof Error ? error.message : "Unknown error" },
				{ status: 400 },
			);
		}
	},
} satisfies ExportedHandler<Env>;
```

The Worker accepts a `url` query parameter, validates the hostname, asks Browser Run to render that URL, and returns the rendered HTML.

The `waitUntil: "networkidle2"` option waits until the page has no more than two network connections for at least 500 ms. This is often enough for client-rendered pages. If your page needs a more specific readiness signal, pass `waitForSelector` to the same Quick Actions payload to wait for an element that only appears after your content has loaded. For more information, refer to [Browser Run Quick Actions timeouts](https://developers.cloudflare.com/browser-run/reference/timeouts/).

## 3\. Test pre-rendering

1. Start your Worker in remote mode:
npmyarnpnpm
```
npx wrangler dev --remote
```
```
yarn wrangler dev --remote
```
```
pnpm wrangler dev --remote
```
The `.quickAction()` method is not yet supported in local development mode. Use `wrangler dev --remote` when testing Browser Run Quick Actions locally.
2. In another terminal, request a rendered page:
```bash
curl "http://localhost:8787/?url=https://example.com/"
```
The response should contain the rendered HTML for the target page.

## 4\. Deploy

1. Deploy the Worker after local validation:
npmyarnpnpm
```
npx wrangler deploy
```
```
yarn wrangler deploy
```
```
pnpm wrangler deploy
```
2. After deployment, request a rendered page from your Worker URL:
```bash
curl "https://<YOUR_WORKER_HOSTNAME>/?url=https://example.com/"
```

## Production considerations

* Render only hostnames that you control
* Use a Worker as the first point of contact when you need edge routing
* Call Browser Run only for crawler or integration requests
* Cache rendered HTML if you expect repeated crawler requests
* Revalidate cached HTML when source content changes

Cache rendered HTML

This tutorial renders pages on demand to keep the implementation minimal. For production traffic, consider caching rendered HTML with the [Cache API](https://developers.cloudflare.com/workers/runtime-apis/cache/) or another storage product.

## Related resources

* [Browser Run /content endpoint](https://developers.cloudflare.com/browser-run/quick-actions/content-endpoint/)
* [Browser Run Quick Actions timeouts](https://developers.cloudflare.com/browser-run/reference/timeouts/)
* [Browser Run limits](https://developers.cloudflare.com/browser-run/limits/)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/browser-run/how-to/pre-render-pages/#page","headline":"Pre-render pages for crawlers · Cloudflare Browser Run docs","description":"Use Browser Run to render JavaScript-heavy pages and return crawler-ready HTML from a Worker.","url":"https://developers.cloudflare.com/browser-run/how-to/pre-render-pages/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-06-12","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
