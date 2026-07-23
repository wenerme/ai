---
description: Store, retrieve, and remove assets from cache programmatically. Use this template to optimize performance and implement custom caching strategies.
title: Custom cache
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/rules/llms.txt
> Use this file to discover all available pages before exploring further.

# Custom cache

Control cache programmatically. Use this template to optimize performance and implement custom caching strategies.

Last updated Oct 13, 2025|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/rules/snippets/examples/custom-cache/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

```js
// Define configurable cache duration in seconds (default: 30 days)
const CACHE_DURATION_SECONDS = 30 * 24 * 60 * 60;

// Define which parts of the request to include in the cache key
const USE_PATH = true; // Include path in the cache key
const USE_QUERY_STRING = true; // Include query string in the cache key
const INCLUDE_HEADERS = ["User-Agent"]; // Headers to include in the cache key

export default {
	async fetch(request, env, ctx) {
		// Generate a custom cache key based on user preferences
		const cacheKey = createCacheKey(request);
		console.log(`Retrieving cache for: ${cacheKey.url}.`);

		// Access the default Cache API
		const cache = caches.default;

		// Attempt to retrieve the cached response
		let response = await cache.match(cacheKey);

		if (!response) {
			// Cache miss: Fetch the asset from the origin
			console.log(`Cache miss for: ${cacheKey.url}. Fetching from origin...`);
			response = await fetch(request);

			// Wrap the origin response for caching
			response = new Response(response.body, response);

			// Set Cache-Control headers to define the TTL
			response.headers.set(
				"Cache-Control",
				`s-maxage=${CACHE_DURATION_SECONDS}`,
			);
			response.headers.set("x-snippets-cache", "stored");

			// Store the response in the cache
			await cache.put(cacheKey, response.clone());
		} else {
			// Cache hit: Return the cached response
			console.log(`Cache hit for: ${cacheKey.url}.`);
			response = new Response(response.body, response);
			response.headers.set("x-snippets-cache", "hit");

			// Optionally check if the cache should expire based on age
			const ageHeader = response.headers.get("Age");
			if (ageHeader && parseInt(ageHeader, 10) > CACHE_DURATION_SECONDS) {
				console.log(
					`Cache expired for: ${cacheKey.url}. Deleting cached response...`,
				);
				await cache.delete(cacheKey);
				response.headers.set("x-snippets-cache", "deleted");
			}
		}

		// Return the response to the client
		return response;
	},
};

/**
 * Function to create a custom cache key based on request properties
 * @param {Request} request - The incoming request object
 * @returns {Request} - A valid cache key based on the URL
 */
function createCacheKey(request) {
	const url = new URL(request.url); // Use the request's base URL
	const cacheKey = new URL(url.origin); // Start with the origin (scheme + hostname)

	// Optionally include the path
	if (USE_PATH) {
		cacheKey.pathname = url.pathname;
	}

	// Optionally include the query string
	if (USE_QUERY_STRING) {
		cacheKey.search = url.search;
	}

	// Optionally include specific headers
	if (INCLUDE_HEADERS.length > 0) {
		const headerParts = INCLUDE_HEADERS.map(
			(header) => `${header}=${request.headers.get(header) || ""}`,
		).join("&");
		cacheKey.searchParams.append("headers", headerParts);
	}

	// Return the constructed URL as the cache key
	return new Request(cacheKey.toString(), {
		method: "GET",
	});
}
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/rules/snippets/examples/custom-cache/#page","headline":"Custom cache · Cloudflare Rules docs","description":"Store, retrieve, and remove assets from cache programmatically. Use this template to optimize performance and implement custom caching strategies.","url":"https://developers.cloudflare.com/rules/snippets/examples/custom-cache/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2025-10-13","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Caching"]}
```
