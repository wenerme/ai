---
description: Send a POST request with JSON data. Use to share data with external servers.
title: Post JSON
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

#  Post JSON

Send a POST request with JSON data. Use to share data with external servers.

Last updated Jul 6, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/workers/examples/post-json/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

If you want to get started quickly, click on the button below.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/cloudflare/docs-examples/tree/main/workers/post-json)

This creates a repository in your GitHub account and deploys the application to Cloudflare Workers.

```js
export default {
	async fetch(request) {
		/**
		 * Example someHost is set up to take in a JSON request
		 * Replace url with the host you wish to send requests to
		 * @param {string} url the URL to send the request to
		 * @param {BodyInit} body the JSON data to send in the request
		 */
		const someHost = "https://examples.cloudflareworkers.com/demos";
		const url = someHost + "/requests/json";
		const body = {
			results: ["default data to send"],
			errors: null,
			msg: "I sent this to the fetch",
		};

		/**
		 * gatherResponse awaits and returns a response body as a string.
		 * Use await gatherResponse(..) in an async function to get the response body
		 * @param {Response} response
		 */
		async function gatherResponse(response) {
			const { headers } = response;
			const contentType = headers.get("content-type") || "";
			if (contentType.includes("application/json")) {
				return JSON.stringify(await response.json());
			} else if (contentType.includes("application/text")) {
				return response.text();
			} else if (contentType.includes("text/html")) {
				return response.text();
			} else {
				return response.text();
			}
		}

		const init = {
			body: JSON.stringify(body),
			method: "POST",
			headers: {
				"content-type": "application/json;charset=UTF-8",
			},
		};
		const response = await fetch(url, init);
		const results = await gatherResponse(response);
		return new Response(results, init);
	},
};
```

```ts
export default {
	async fetch(request): Promise<Response> {
		/**
		 * Example someHost is set up to take in a JSON request
		 * Replace url with the host you wish to send requests to
		 * @param {string} url the URL to send the request to
		 * @param {BodyInit} body the JSON data to send in the request
		 */
		const someHost = "https://examples.cloudflareworkers.com/demos";
		const url = someHost + "/requests/json";
		const body = {
			results: ["default data to send"],
			errors: null,
			msg: "I sent this to the fetch",
		};

		/**
		 * gatherResponse awaits and returns a response body as a string.
		 * Use await gatherResponse(..) in an async function to get the response body
		 * @param {Response} response
		 */
		async function gatherResponse(response) {
			const { headers } = response;
			const contentType = headers.get("content-type") || "";
			if (contentType.includes("application/json")) {
				return JSON.stringify(await response.json());
			} else if (contentType.includes("application/text")) {
				return response.text();
			} else if (contentType.includes("text/html")) {
				return response.text();
			} else {
				return response.text();
			}
		}

		const init = {
			body: JSON.stringify(body),
			method: "POST",
			headers: {
				"content-type": "application/json;charset=UTF-8",
			},
		};
		const response = await fetch(url, init);
		const results = await gatherResponse(response);
		return new Response(results, init);
	},
} satisfies ExportedHandler;
```

```py
import json
from workers import WorkerEntrypoint, Response, fetch

async def gather_response(response):
    headers = response.headers
    content_type = headers["content-type"] or ""

    if "application/json" in content_type:
        return (content_type, json.dumps(dict(await response.json())))
    return (content_type, await response.text())

class Default(WorkerEntrypoint):
    async def fetch(self, _request):
        url = "https://jsonplaceholder.typicode.com/todos/1"

        body = {
            "results": ["default data to send"],
            "errors": None,
            "msg": "I sent this to the fetch",
        }

        response = await fetch(
            url,
            method="POST",
            body=json.dumps(body),
            headers={"content-type": "application/json;charset=UTF-8"},
        )
        content_type, result = await gather_response(response)

        return Response(result, headers={"content-type": content_type})
```

```ts
import { Hono } from 'hono';

const app = new Hono();

app.get('*', async (c) => {
  /**
   * Example someHost is set up to take in a JSON request
   * Replace url with the host you wish to send requests to
   */
  const someHost = "https://examples.cloudflareworkers.com/demos";
  const url = someHost + "/requests/json";
  const body = {
    results: ["default data to send"],
    errors: null,
    msg: "I sent this to the fetch",
  };

  /**
   * gatherResponse awaits and returns a response body as a string.
   * Use await gatherResponse(..) in an async function to get the response body
   */
  async function gatherResponse(response: Response) {
    const { headers } = response;
    const contentType = headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
      return { contentType, result: JSON.stringify(await response.json()) };
    } else if (contentType.includes("application/text")) {
      return { contentType, result: await response.text() };
    } else if (contentType.includes("text/html")) {
      return { contentType, result: await response.text() };
    } else {
      return { contentType, result: await response.text() };
    }
  }

  const init = {
    body: JSON.stringify(body),
    method: "POST",
    headers: {
      "content-type": "application/json;charset=UTF-8",
    },
  };

  const response = await fetch(url, init);
  const { contentType, result } = await gatherResponse(response);

  return new Response(result, {
    headers: {
      "content-type": contentType,
    },
  });
});

export default app;
```

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/examples/post-json/#page","headline":"Post JSON · Cloudflare Workers docs","description":"Send a POST request with JSON data. Use to share data with external servers.","url":"https://developers.cloudflare.com/workers/examples/post-json/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-07-06","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["JSON","JavaScript","TypeScript","Python"]}
```
