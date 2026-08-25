---
description: Return a response based on the incoming request's URL, HTTP method, User Agent, IP address, ASN or device type.
title: Conditional response
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

# Conditional response

Return a response based on the incoming request's URL, HTTP method, User Agent, IP address, ASN or device type.

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/workers/examples/conditional-response/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

If you want to get started quickly, click on the button below.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/cloudflare/docs-examples/tree/main/workers/conditional-response)

This creates a repository in your GitHub account and deploys the application to Cloudflare Workers.

```js
export default {
	async fetch(request) {
		const BLOCKED_HOSTNAMES = ["nope.mywebsite.com", "bye.website.com"];
		// Return a new Response based on a URL's hostname
		const url = new URL(request.url);
		if (BLOCKED_HOSTNAMES.includes(url.hostname)) {
			return new Response("Blocked Host", { status: 403 });
		}
		// Block paths ending in .doc or .xml based on the URL's file extension
		const forbiddenExtRegExp = new RegExp(/\.(doc|xml)$/);
		if (forbiddenExtRegExp.test(url.pathname)) {
			return new Response("Blocked Extension", { status: 403 });
		}
		// On HTTP method
		if (request.method === "POST") {
			return new Response("Response for POST");
		}
		// On User Agent
		const userAgent = request.headers.get("User-Agent") || "";
		if (userAgent.includes("bot")) {
			return new Response("Block User Agent containing bot", { status: 403 });
		}
		// On Client's IP address
		const clientIP = request.headers.get("CF-Connecting-IP");
		if (clientIP === "1.2.3.4") {
			return new Response("Block the IP 1.2.3.4", { status: 403 });
		}
		// On ASN
		if (request.cf && request.cf.asn == 64512) {
			return new Response("Block the ASN 64512 response");
		}
		// On Device Type
		// Requires Enterprise "CF-Device-Type Header" zone setting or
		// Page Rule with "Cache By Device Type" setting applied.
		const device = request.headers.get("CF-Device-Type");
		if (device === "mobile") {
			return Response.redirect("https://mobile.example.com");
		}
		console.error(
			"Getting Client's IP address, device type, and ASN are not supported in playground. Must test on a live worker",
		);
		return fetch(request);
	},
};
```

```ts
export default {
	async fetch(request): Promise<Response> {
		const BLOCKED_HOSTNAMES = ["nope.mywebsite.com", "bye.website.com"];
		// Return a new Response based on a URL's hostname
		const url = new URL(request.url);
		if (BLOCKED_HOSTNAMES.includes(url.hostname)) {
			return new Response("Blocked Host", { status: 403 });
		}
		// Block paths ending in .doc or .xml based on the URL's file extension
		const forbiddenExtRegExp = new RegExp(/\.(doc|xml)$/);
		if (forbiddenExtRegExp.test(url.pathname)) {
			return new Response("Blocked Extension", { status: 403 });
		}
		// On HTTP method
		if (request.method === "POST") {
			return new Response("Response for POST");
		}
		// On User Agent
		const userAgent = request.headers.get("User-Agent") || "";
		if (userAgent.includes("bot")) {
			return new Response("Block User Agent containing bot", { status: 403 });
		}
		// On Client's IP address
		const clientIP = request.headers.get("CF-Connecting-IP");
		if (clientIP === "1.2.3.4") {
			return new Response("Block the IP 1.2.3.4", { status: 403 });
		}
		// On ASN
		if (request.cf && request.cf.asn == 64512) {
			return new Response("Block the ASN 64512 response");
		}
		// On Device Type
		// Requires Enterprise "CF-Device-Type Header" zone setting or
		// Page Rule with "Cache By Device Type" setting applied.
		const device = request.headers.get("CF-Device-Type");
		if (device === "mobile") {
			return Response.redirect("https://mobile.example.com");
		}
		console.error(
			"Getting Client's IP address, device type, and ASN are not supported in playground. Must test on a live worker",
		);
		return fetch(request);
	},
} satisfies ExportedHandler;
```

```py
import re
from workers import WorkerEntrypoint, Response, fetch
from urllib.parse import urlparse

class Default(WorkerEntrypoint):
    async def fetch(self, request):
        blocked_hostnames = ["nope.mywebsite.com", "bye.website.com"]
        url = urlparse(request.url)

        # Block on hostname
        if url.hostname in blocked_hostnames:
            return Response("Blocked Host", status=403)

        # On paths ending in .doc or .xml
        if re.search(r'\.(doc|xml)$', url.path):
            return Response("Blocked Extension", status=403)

        # On HTTP method
        if "POST" in request.method:
            return Response("Response for POST")

        # On User Agent
        user_agent = request.headers["User-Agent"] or ""
        if "bot" in user_agent:
            return Response("Block User Agent containing bot", status=403)

        # On Client's IP address
        client_ip = request.headers["CF-Connecting-IP"]
        if client_ip == "1.2.3.4":
            return Response("Block the IP 1.2.3.4", status=403)

        # On ASN
        if request.cf and request.cf.asn == 64512:
            return Response("Block the ASN 64512 response")

        # On Device Type
        # Requires Enterprise "CF-Device-Type Header" zone setting or
        # Page Rule with "Cache By Device Type" setting applied.
        device = request.headers["CF-Device-Type"]
        if device == "mobile":
            return Response.redirect("https://mobile.example.com")

        return fetch(request)
```

```ts
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";

const app = new Hono();

// Middleware to handle all conditions before reaching the main handler
app.use("*", async (c, next) => {
	const request = c.req.raw;
	const BLOCKED_HOSTNAMES = ["nope.mywebsite.com", "bye.website.com"];
	const hostname = new URL(c.req.url)?.hostname;

	// Return a new Response based on a URL's hostname
	if (BLOCKED_HOSTNAMES.includes(hostname)) {
		return c.text("Blocked Host", 403);
	}

	// Block paths ending in .doc or .xml based on the URL's file extension
	const forbiddenExtRegExp = new RegExp(/\.(doc|xml)$/);
	if (forbiddenExtRegExp.test(c.req.pathname)) {
		return c.text("Blocked Extension", 403);
	}

	// On User Agent
	const userAgent = c.req.header("User-Agent") || "";
	if (userAgent.includes("bot")) {
		return c.text("Block User Agent containing bot", 403);
	}

	// On Client's IP address
	const clientIP = c.req.header("CF-Connecting-IP");
	if (clientIP === "1.2.3.4") {
		return c.text("Block the IP 1.2.3.4", 403);
	}

	// On ASN
	if (request.cf && request.cf.asn === 64512) {
		return c.text("Block the ASN 64512 response");
	}

	// On Device Type
	// Requires Enterprise "CF-Device-Type Header" zone setting or
	// Page Rule with "Cache By Device Type" setting applied.
	const device = c.req.header("CF-Device-Type");
	if (device === "mobile") {
		return c.redirect("https://mobile.example.com");
	}

	// Continue to the next handler
	await next();
});

// Handle POST requests differently
app.post("*", (c) => {
	return c.text("Response for POST");
});

// Default handler for other methods
app.get("*", async (c) => {
	console.error(
		"Getting Client's IP address, device type, and ASN are not supported in playground. Must test on a live worker",
	);

	// Fetch the original request
	return fetch(c.req.raw);
});

export default app;
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/examples/conditional-response/#page","headline":"Conditional response · Cloudflare Workers docs","description":"Return a response based on the incoming request's URL, HTTP method, User Agent, IP address, ASN or device type.","url":"https://developers.cloudflare.com/workers/examples/conditional-response/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Middleware","JavaScript","TypeScript","Python"]}
```
