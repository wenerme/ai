---
description: Route requests to a different origin, prepend a directory to the URL path, and remove specific segments.
title: Change origin and modify paths
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/rules/llms.txt
> Use this file to discover all available pages before exploring further.

# Change origin and modify paths

Reroute a request to a different origin and modify the URL path.

Last updated Oct 13, 2025|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/rules/snippets/examples/route-and-rewrite/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

This example demonstrates how to use Cloudflare Snippets to:

* Reroute incoming requests to a different origin.
* Prepend a directory to the URL path.
* Remove specific segments from the URL path.

```js
export default {
	async fetch(request) {
		// Clone the original request to create a new request object
		const newRequest = new Request(request);

		// Add a header to identify a rerouted request at the new origin
		newRequest.headers.set("X-Rerouted", "1");

		// Clone and parse the original URL
		const url = new URL(request.url);

		// Step 1: Reroute to a different origin
		url.hostname = "example.com"; // Change the hostname to the new origin

		// Step 2: Append a directory to the path
		url.pathname = `/new-path${url.pathname}`; // Prepend "/new-path" to the current path

		// Step 3: Remove a specific segment from the path
		url.pathname = url.pathname.replace("/remove-me", ""); // Rewrite `/remove-me/something` to `/something`

		// Fetch the modified request from the updated URL
		return await fetch(url, newRequest);
	},
};
```

This configuration will perform the following rewrites:

| Request URL                       | URL after rewrite                |
| --------------------------------- | -------------------------------- |
| https://subdomain.example.com/foo | https://example.com/new-path/foo |
| https://example.com/remove-me/bar | https://example.com/new-path/bar |
| https://example.net/remove-me     | https://example.com/new-path     |

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/rules/snippets/examples/route-and-rewrite/#page","headline":"Change origin and modify paths · Cloudflare Rules docs","description":"Route requests to a different origin, prepend a directory to the URL path, and remove specific segments.","url":"https://developers.cloudflare.com/rules/snippets/examples/route-and-rewrite/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2025-10-13","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["URL rewrite"]}
```
