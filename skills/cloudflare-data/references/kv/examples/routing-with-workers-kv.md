---
description: Example of how to use Workers KV to build a distributed application configuration store.
title: Route requests across various web servers
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/kv/llms.txt
> Use this file to discover all available pages before exploring further.

# Route requests across various web servers

Store routing data in Workers KV to route requests across various web servers with Workers

Last updated Jul 3, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/kv/examples/routing-with-workers-kv/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Using Workers KV to store routing data to route requests across various web servers with Workers is an ideal use case for Workers KV. Routing workloads can have high read volume, and Workers KV's low-latency reads can help ensure that routing decisions are made quickly and efficiently.

Routing can be helpful to route requests coming into a single Cloudflare Worker application to different web servers based on the request's path, hostname, or other request attributes.

In single-tenant applications, this can be used to route requests to various origin servers based on the business domain (for example, requests to `/admin` routed to administration server, `/store` routed to storefront server, `/api` routed to the API server).

In multi-tenant applications, requests can be routed to the tenant's respective origin resources (for example, requests to `tenantA.your-worker-hostname.com` routed to server for Tenant A, `tenantB.your-worker-hostname.com` routed to server for Tenant B).

Routing can also be used to implement [A/B testing](https://developers.cloudflare.com/reference-architecture/diagrams/serverless/a-b-testing-using-workers/), canary deployments, or [blue-green deployments ↗](https://en.wikipedia.org/wiki/Blue%E2%80%93green%5Fdeployment) for your own external applications. If you are looking to implement canary or blue-green deployments of applications built fully on Cloudflare Workers, see [Workers gradual deployments](https://developers.cloudflare.com/workers/versions-and-deployments/gradual-deployments/).

## Route requests with Workers KV

In this example, a multi-tenant e-Commerce application is built on Cloudflare Workers. Each storefront is a different tenant and has its own external web server. Our Cloudflare Worker is responsible for receiving all requests for all storefronts and routing requests to the correct origin web server according to the storefront ID.

For simplicity of demonstration, the storefront will be identified with a path element containing the storefront ID, where `https://<WORKER_HOSTNAME>/<STOREFRONT_ID>/...` is the URL pattern for the storefront. You may prefer to use subdomains to identify storefronts in a real-world scenario.

```js

// Example routing data stored in Workers KV:
// Key: "storefrontA" | Value: {"origin": "https://storefrontA-server.example.com"}
// Key: "storefrontB" | Value: {"origin": "https://storefrontB-server.example.com"}

interface Env {
ROUTING_CONFIG: KVNamespace;
}

export default {
  async fetch(request, env, ctx) {

    // Parse the URL to extract the storefront ID from the path
    const url = new URL(request.url);
    const pathParts = url.pathname.split('/').filter(part => part !== '');

    // Check if a storefront ID is provided in the path, otherwise return 400
    if (pathParts.length === 0) {
      return new Response('Welcome to our multi-tenant platform. Please specify a storefront ID in the URL path.', {
        status: 400,
        headers: { 'Content-Type': 'text/plain' }
      });
    }

    // Extract the storefront ID from the first path segment
    const storefrontId = pathParts[0];

    try {
      // Look up the storefront configuration in KV using env.ROUTING_CONFIG
      const storefrontConfig = await env.ROUTING_CONFIG.get<{
    			origin: string;
    		}>(storefrontId, {type: "json"});

      // If no configuration is found, return a 404
      if (!storefrontConfig) {
        return new Response(`Storefront "${storefrontId}" not found.`, {
          status: 404,
          headers: { 'Content-Type': 'text/plain' }
        });
      }

      // Construct the new URL for the origin server
      // Remove the storefront ID from the path when forwarding
      const newPathname = '/' + pathParts.slice(1).join('/');
      const originUrl = new URL(newPathname, storefrontConfig.origin);
      originUrl.search = url.search;

      // Create a new request to the origin server
      const originRequest = new Request(originUrl, {
        method: request.method,
        headers: request.headers,
        body: request.body,
        redirect: 'follow'
      });

      // Send the request to the origin server
      const response = await fetch(originRequest);

    		console.log(response.status)

      // Clone the response and add a custom header
      const modifiedResponse = new Response(response.body, response);
      modifiedResponse.headers.set('X-Served-By', 'Cloudflare Worker');
      modifiedResponse.headers.set('X-Storefront-ID', storefrontId);

      return modifiedResponse;

    } catch (error) {
      // Handle any errors
      console.error(`Error processing request for storefront ${storefrontId}:`, error);
      return new Response('An error occurred while processing your request.', {
        status: 500,
        headers: { 'Content-Type': 'text/plain' }
      });
    }

}
} satisfies ExportedHandler<Env>;
```

```json
{
	"$schema": "node_modules/wrangler/config-schema.json",
	"name": "<ENTER_WORKER_NAME>",
	"main": "src/index.ts",
	"compatibility_date": "2025-03-03",
	"observability": {
		"enabled": true
	},
	"kv_namespaces": [
		{
			"binding": "ROUTING_CONFIG",
			"id": "<YOUR_BINDING_ID>"
		}
	]
}
```

In this example, the Cloudflare Worker receives a request and extracts the storefront ID from the URL path. The storefront ID is used to look up the origin server URL from Workers KV using the `get()` method. The request is then forwarded to the origin server, and the response is modified to include custom headers before being returned to the client.

## Related resources

* [Rust support in Workers](https://developers.cloudflare.com/workers/languages/rust/).
* [Using KV in Workers](https://developers.cloudflare.com/kv/get-started/).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/kv/examples/routing-with-workers-kv/#page","headline":"Route requests across various web servers · Cloudflare Workers KV docs","description":"Example of how to use Workers KV to build a distributed application configuration store.","url":"https://developers.cloudflare.com/kv/examples/routing-with-workers-kv/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-07-03","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
