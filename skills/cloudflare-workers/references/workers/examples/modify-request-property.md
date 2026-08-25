---
description: Create a modified request with edited properties based off of an incoming request.
title: Modify request property
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

# Modify request property

Create a modified request with edited properties based off of an incoming request.

Last updated Jul 6, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/workers/examples/modify-request-property/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

If you want to get started quickly, click on the button below.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/cloudflare/docs-examples/tree/main/workers/modify-request-property)

This creates a repository in your GitHub account and deploys the application to Cloudflare Workers.

```js
export default {
	async fetch(request) {
		/**
		 * Example someHost is set up to return raw JSON
		 * @param {string} someUrl the URL to send the request to, since we are setting hostname too only path is applied
		 * @param {string} someHost the host the request will resolve too
		 */
		const someHost = "example.com";
		const someUrl = "https://foo.example.com/api.js";

		/**
		 * The best practice is to only assign new RequestInit properties
		 * on the request object using either a method or the constructor
		 */
		const newRequestInit = {
			// Change method
			method: "POST",
			// Change body
			body: JSON.stringify({ bar: "foo" }),
			// Change the redirect mode.
			redirect: "follow",
			// Change headers, note this method will erase existing headers
			headers: {
				"Content-Type": "application/json",
			},
			// Change a Cloudflare feature on the outbound response
			cf: { apps: false },
		};

		// Change just the host
		const url = new URL(someUrl);

		url.hostname = someHost;

		// Best practice is to always use the original request to construct the new request
		// to clone all the attributes. Applying the URL also requires a constructor
		// since once a Request has been constructed, its URL is immutable.
		const newRequest = new Request(
			url.toString(),
			new Request(request, newRequestInit),
		);

		// Set headers using method
		newRequest.headers.set("X-Example", "bar");
		newRequest.headers.set("Content-Type", "application/json");
		try {
			return await fetch(newRequest);
		} catch (e) {
			return new Response(JSON.stringify({ error: e.message }), {
				status: 500,
			});
		}
	},
};
```

```ts
export default {
	async fetch(request): Promise<Response> {
		/**
		 * Example someHost is set up to return raw JSON
		 * @param {string} someUrl the URL to send the request to, since we are setting hostname too only path is applied
		 * @param {string} someHost the host the request will resolve too
		 */
		const someHost = "example.com";
		const someUrl = "https://foo.example.com/api.js";

		/**
		 * The best practice is to only assign new RequestInit properties
		 * on the request object using either a method or the constructor
		 */
		const newRequestInit = {
			// Change method
			method: "POST",
			// Change body
			body: JSON.stringify({ bar: "foo" }),
			// Change the redirect mode.
			redirect: "follow",
			// Change headers, note this method will erase existing headers
			headers: {
				"Content-Type": "application/json",
			},
			// Change a Cloudflare feature on the outbound response
			cf: { apps: false },
		};

		// Change just the host
		const url = new URL(someUrl);

		url.hostname = someHost;

		// Best practice is to always use the original request to construct the new request
		// to clone all the attributes. Applying the URL also requires a constructor
		// since once a Request has been constructed, its URL is immutable.
		const newRequest = new Request(
			url.toString(),
			new Request(request, newRequestInit),
		);

		// Set headers using method
		newRequest.headers.set("X-Example", "bar");
		newRequest.headers.set("Content-Type", "application/json");
		try {
			return await fetch(newRequest);
		} catch (e) {
			return new Response(JSON.stringify({ error: e.message }), {
				status: 500,
			});
		}
	},
} satisfies ExportedHandler;
```

```py
import json
from workers import WorkerEntrypoint, Response, fetch
from js import Request
from urllib.parse import urlparse

class Default(WorkerEntrypoint):
    async def fetch(self, request):
        some_host = "example.com"
        some_url = "https://foo.example.com/api.js"

        # The best practice is to only assign new_request_init properties
        # on the request object using either a method or the constructor
        new_request_init = {
            "method": "POST", # Change method
            "body": json.dumps({"bar": "foo"}), # Change body
            "redirect": "follow", # Change the redirect mode
            # Change headers, note this method will erase existing headers
            "headers": {
                "Content-Type": "application/json",
            },
						#  Change a Cloudflare feature on the outbound response
            "cf": {"apps": False},
        }

        # Change just the host
        parsed = urlparse(some_url)
        new_url = parsed._replace(netloc=some_host).geturl()

        # Best practice is to always use the original request to construct the new request
        # to clone all the attributes. Applying the URL also requires a constructor
        # since once a Request has been constructed, its URL is immutable.
        org_request = Request.new(request, new_request_init)
        new_request = Request.new(new_url, org_request)

        new_request.headers["X-Example"] = "bar"
        new_request.headers["Content-Type"] = "application/json"

        try:
            return await fetch(new_request)
        except Exception as e:
            return Response.join({"error": str(e)}, status=500)
```

```ts
import { Hono } from "hono";

const app = new Hono();

app.all("*", async (c) => {
	/**
	 * Example someHost is set up to return raw JSON
	 */
	const someHost = "example.com";
	const someUrl = "https://foo.example.com/api.js";

	// Create a URL object to modify the hostname
	const url = new URL(someUrl);
	url.hostname = someHost;

	// Create a new request
	// First create a clone of the original request with the new properties
	const requestClone = new Request(c.req.raw, {
		// Change method
		method: "POST",
		// Change body
		body: JSON.stringify({ bar: "foo" }),
		// Change the redirect mode
		redirect: "follow" as RequestRedirect,
		// Change headers, note this method will erase existing headers
		headers: {
			"Content-Type": "application/json",
			"X-Example": "bar",
		},
		// Change a Cloudflare feature on the outbound response
		cf: { apps: false },
	});

	// Then create a new request with the modified URL
	const newRequest = new Request(url.toString(), requestClone);

	// Send the modified request
	const response = await fetch(newRequest);

	// Return the response
	return response;
});

// Handle errors
app.onError((err, c) => {
	return err.getResponse();
});

export default app;
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/examples/modify-request-property/#page","headline":"Modify request property · Cloudflare Workers docs","description":"Create a modified request with edited properties based off of an incoming request.","url":"https://developers.cloudflare.com/workers/examples/modify-request-property/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-07-06","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Middleware","Headers","JavaScript","TypeScript","Python"]}
```
