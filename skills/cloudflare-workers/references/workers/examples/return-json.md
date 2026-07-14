---
title: Return JSON
description: Return JSON directly from a Worker script, useful for building APIs and middleware.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop)

# Return JSON

Return JSON directly from a Worker script, useful for building APIs and middleware.

If you want to get started quickly, click on the button below.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/cloudflare/docs-examples/tree/main/workers/return-json)

This creates a repository in your GitHub account and deploys the application to Cloudflare Workers.

* [  JavaScript ](#tab-panel-12486)
* [  TypeScript ](#tab-panel-12487)
* [  Python ](#tab-panel-12488)
* [  Rust ](#tab-panel-12489)
* [  Hono ](#tab-panel-12490)

**JavaScript**

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

[Run Worker in Playground](https://workers.cloudflare.com/playground#LYVwNgLglgDghgJwgegGYHsHALQBM4RwDcABAEbogB2+CAngLzbPYZb6HbW5QDGU2AAwA2AIwB2QQGYALIIkyAnAC4WLNsA5wuNPgJETpchYoCwAKADC6KhACmt7ABEoAZxjpXUaDeUkNeATEJFRwwHYMAERQNHYAHgB0AFaukaSoUGAOYRHRsYkpkRbWtg4Q2AAqdDB2fnAwMGB8BFA2yElwAG5wrrwIsBAA1MDouOB2FhbxHkgkuHaocOAQJADe5iQkPXRUvP52ELwAFgAUCHYAjiB2rhAAlGsbmyS8NrdzQSQMj8-PR3ZgMDoPyRADumDAuEiABonpsAL5EcxwkjnCAgBBUEgAJRuHiorjsyVcNhOWjuSIRsMRFjUzA0Wh0PH4QjEklk8nESmKNnsjhc7k83laVD8AS0pFC4Si4UIWjS-ky2WlkTIQLIRSsvLKlWqtS2DSavBabRSNkm5lWkWAcBiAH0RmMspFlHl5gVUvDaXSGUEmXpWYYOSZmBYgA)

**TypeScript**

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

**Python**

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

**TypeScript**

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

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/examples/return-json/#page","headline":"Return JSON · Cloudflare Workers docs","description":"Return JSON directly from a Worker script, useful for building APIs and middleware.","url":"https://developers.cloudflare.com/workers/examples/return-json/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["JSON","JavaScript","TypeScript","Python","Rust"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/examples/","name":"Examples"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/examples/return-json/","name":"Return JSON"}}]}
```
