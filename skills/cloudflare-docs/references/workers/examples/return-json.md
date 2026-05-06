---
title: Return JSON
description: Return JSON directly from a Worker script, useful for building APIs and middleware.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

### Tags

[ JSON ](https://developers.cloudflare.com/search/?tags=JSON)[ JavaScript ](https://developers.cloudflare.com/search/?tags=JavaScript)[ TypeScript ](https://developers.cloudflare.com/search/?tags=TypeScript)[ Python ](https://developers.cloudflare.com/search/?tags=Python)[ Rust ](https://developers.cloudflare.com/search/?tags=Rust) 

# Return JSON

**Last reviewed:**  over 2 years ago 

Return JSON directly from a Worker script, useful for building APIs and middleware.

If you want to get started quickly, click on the button below.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/cloudflare/docs-examples/tree/main/workers/return-json)

This creates a repository in your GitHub account and deploys the application to Cloudflare Workers.

* [  JavaScript ](#tab-panel-9109)
* [  TypeScript ](#tab-panel-9110)
* [  Python ](#tab-panel-9111)
* [  Rust ](#tab-panel-9112)
* [  Hono ](#tab-panel-9113)

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

[Run Worker in Playground](https://workers.cloudflare.com/playground#LYVwNgLglgDghgJwgegGYHsHALQBM4RwDcABAEbogB2+CAngLzbPYZb6HbW5QDGU2AAwB2AMziAHADYALKOGCArAC4WLNsA5wuNPgJHjR0uQsUBYAFABhdFQgBTO9gAiUAM4x0bqNFvKSGngExCRUcMD2DABEUDT2AB4AdABWblGkqFBgjuGRMXFJqVGWNnaOENgAKnQw9v5wMDBgfARQtsjJcABucG68CLAQANTA6Ljg9paWCZ5IJLj2qHDgECQA3hYkJL10VLwB9hC8ABYAFAj2AI4g9m4QAJTrm1skvLZ388EkDE8vL8f2MBgdD+KIAd0wYFwUQANM8tgBfIgWeEkC4QEAIKgkABKt08VDc9hSblspy092RiLhSMsamYGi0Oh4-CEYkksnkShKtgcTlcHi8PjaVH8gS0pDCEWiEUIWnSASyOWlUTIwLIxWsvPKVRqdW2jWavFa7VStimFjWUWAcFiAH1RuNslFlPkFoU0gi6fTGcFmXo2YZjFzFMxLEA)

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
