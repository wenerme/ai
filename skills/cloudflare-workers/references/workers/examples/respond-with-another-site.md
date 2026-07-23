---
description: Respond to the Worker request with the response from another website (example.com in this example).
title: Respond with another site
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

# Respond with another site

Respond to the Worker request with the response from another website (example.com in this example).

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/workers/examples/respond-with-another-site/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

If you want to get started quickly, click on the button below.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/cloudflare/docs-examples/tree/main/workers/respond-with-another-site)

This creates a repository in your GitHub account and deploys the application to Cloudflare Workers.

```js
export default {
  async fetch(request) {
    function MethodNotAllowed(request) {
      return new Response(`Method ${request.method} not allowed.`, {
        status: 405,
        headers: {
          Allow: "GET",
        },
      });
    }
    // Only GET requests work with this proxy.
    if (request.method !== "GET") return MethodNotAllowed(request);
    return fetch(`https://example.com`);
  },
};
```

```ts
export default {
	async fetch(request): Promise<Response> {
		function MethodNotAllowed(request) {
			return new Response(`Method ${request.method} not allowed.`, {
				status: 405,
				headers: {
					Allow: "GET",
				},
			});
		}
		// Only GET requests work with this proxy.
		if (request.method !== "GET") return MethodNotAllowed(request);
		return fetch(`https://example.com`);
	},
} satisfies ExportedHandler;
```

```py
from workers import WorkerEntrypoint, Response, fetch

class Default(WorkerEntrypoint):
    def fetch(self, request):
        def method_not_allowed(request):
            msg = f'Method {request.method} not allowed.'
            headers = {"Allow": "GET"}
            return Response(msg, headers=headers, status=405)

        # Only GET requests work with this proxy.
        if request.method != "GET":
            return method_not_allowed(request)

        return fetch("https://example.com")
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/examples/respond-with-another-site/#page","headline":"Respond with another site · Cloudflare Workers docs","description":"Respond to the Worker request with the response from another website (example.com in this example).","url":"https://developers.cloudflare.com/workers/examples/respond-with-another-site/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Middleware","JavaScript","TypeScript","Python"]}
```
