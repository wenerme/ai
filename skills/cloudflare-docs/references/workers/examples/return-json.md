---
title: Return JSON
description: Return JSON directly from a Worker script, useful for building APIs and middleware.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

### Tags

[ JSON ](https://developers.cloudflare.com/search/?tags=JSON)[ JavaScript ](https://developers.cloudflare.com/search/?tags=JavaScript)[ TypeScript ](https://developers.cloudflare.com/search/?tags=TypeScript)[ Python ](https://developers.cloudflare.com/search/?tags=Python)[ Rust ](https://developers.cloudflare.com/search/?tags=Rust) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/workers/examples/return-json.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Return JSON

**Last reviewed:**  about 2 years ago 

Return JSON directly from a Worker script, useful for building APIs and middleware.

If you want to get started quickly, click on the button below.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/cloudflare/docs-examples/tree/main/workers/return-json)

This creates a repository in your GitHub account and deploys the application to Cloudflare Workers.

* [  JavaScript ](#tab-panel-7371)
* [  TypeScript ](#tab-panel-7372)
* [  Python ](#tab-panel-7373)
* [  Rust ](#tab-panel-7374)
* [  Hono ](#tab-panel-7375)

JavaScript

```

export default {

  async fetch(request) {

    const data = {

      hello: "world",

    };


    return Response.json(data);

  },

};


```

[Run Worker in Playground](https://workers.cloudflare.com/playground#LYVwNgLglgDghgJwgegGYHsHALQBM4RwDcABAEbogB2+CAngLzbPYZb6HbW5QDGU2AAwA2QQA4xw4QEYRATjEAuFizbAOcLjT4CR4yTPliAsACgAwuioQAptewARKAGcY6Z1GhXFJNXgLEJFRwwDYMAERQNDYAHgB0AFbO4aSoUGB2IWGR0fFJ4WaW1nYQ2AAqdDA2PnAwMGB8BFBWyAlwAG5wzrwIsBAA1MDouOA2ZmaxbkgkuDaocOAQJADepiQkXXRUvL42ELwAFgAUCDYAjiA2zhAAlCtr6yS8VtczASQM94+PBzZgYOgfOEAO6YMC4cIAGge6wAvkRTDCSKcICAEFQSAAlK5uKjOGyJZxWI4aG4IuHQ+FmFTMNQaLQ8fhCUQSKSyYQKQpWWz2JyudyeZpUHx+DSkYKhCKhQgaFK+dKZSXhMgAsgFCzckrlSrVDZ1Bq8JotJJWcamZbhYBwKIAfSGIwy4UUOVmeWSsOpNLpAQZOmZ+jZRmYZiAA)

TypeScript

```

export default {

  async fetch(request): Promise<Response> {

    const data = {

      hello: "world",

    };


    return Response.json(data);

  },

} satisfies ExportedHandler;


```

Python

```

from workers import WorkerEntrypoint, Response

import json


class Default(WorkerEntrypoint):

    def fetch(self, request):

        data = json.dumps({"hello": "world"})

        headers = {"content-type": "application/json"}

        return Response(data, headers=headers)


```

```

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

TypeScript

```

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
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/examples/","name":"Examples"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/examples/return-json/","name":"Return JSON"}}]}
```
