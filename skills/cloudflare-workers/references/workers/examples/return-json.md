---
description: Return JSON directly from a Worker script, useful for building APIs and middleware.
title: Return JSON
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

#  Return JSON

Return JSON directly from a Worker script, useful for building APIs and middleware.

Last updated Apr 23, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/workers/examples/return-json/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

If you want to get started quickly, click on the button below.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/cloudflare/docs-examples/tree/main/workers/return-json)

This creates a repository in your GitHub account and deploys the application to Cloudflare Workers.

```js
export default {
  async fetch(request) {
    const data = {
      hello: "world",
    };

    return Response.json(data);
  },
};
```

```ts
export default {
	async fetch(request): Promise<Response> {
		const data = {
			hello: "world",
		};

		return Response.json(data);
	},
} satisfies ExportedHandler;
```

```py
from workers import WorkerEntrypoint, Response
import json

class Default(WorkerEntrypoint):
    def fetch(self, request):
        data = json.dumps({"hello": "world"})
        headers = {"content-type": "application/json"}
        return Response(data, headers=headers)
```

```rs
use serde::{Deserialize, Serialize};
use worker::*;

#[derive(Deserialize, Serialize, Debug)]
struct Json {
    hello: String,
}

#[event(fetch)]
async fn fetch(_req: Request, _env: Env, _ctx: Context) -> Result<Response> {
    let data = Json {
        hello: String::from("world"),
    };
    Response::from_json(&data)
}
```

```ts
import { Hono } from "hono";

const app = new Hono();

app.get("*", (c) => {
	const data = {
		hello: "world",
	};

	return c.json(data);
});

export default app;
```

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/examples/return-json/#page","headline":"Return JSON · Cloudflare Workers docs","description":"Return JSON directly from a Worker script, useful for building APIs and middleware.","url":"https://developers.cloudflare.com/workers/examples/return-json/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["JSON","JavaScript","TypeScript","Python","Rust"]}
```
