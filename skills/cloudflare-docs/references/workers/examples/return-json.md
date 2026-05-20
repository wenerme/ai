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

**Last reviewed:**  over 2 years ago 

Return JSON directly from a Worker script, useful for building APIs and middleware.

If you want to get started quickly, click on the button below.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/cloudflare/docs-examples/tree/main/workers/return-json)

This creates a repository in your GitHub account and deploys the application to Cloudflare Workers.

* [  JavaScript ](#tab-panel-9538)
* [  TypeScript ](#tab-panel-9539)
* [  Python ](#tab-panel-9540)
* [  Rust ](#tab-panel-9541)
* [  Hono ](#tab-panel-9542)

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

[Run Worker in Playground](https://workers.cloudflare.com/playground#LYVwNgLglgDghgJwgegGYHsHALQBM4RwDcABAEbogB2+CAngLzbPYZb6HbW5QDGU2AAwB2AGwjRARgBMATlHyAXCxZtgHOFxp8BEiTPnyAsACgAwuioQAplewARKAGcY6J1GiXFJNXgLESKjhgawYAIigaawAPADoAKycw0lQoMFtg0IiouMSw0wsrWwhsABU6GGtvOBgYMD4CKEtkeLgANzgnXgRYCABqYHRccGtTUxjXJBJca1Q4cAgSAG8TEhJOuipeH2sIXgALAAoEawBHEGsnCABKZdW1kl5LK+n-EgY7h4f96zAwdG8YQA7pgwLgwgAae5rAC+RBM0JIJwgIAQVBIACVLq4qE5rAknJZDhprvDYVC4aYVMw1BotDx+EIxPo5ApRAVLDY7I4XG4PE0qN5fBpSEEQuEQoQNMkfGkMuKwmR-mR8uZOcUyhUqutavVeI1molLGMTEswsA4JEAPqDYbpMKKbIzXJJGFU6m0-z0nRM8RiAxs5imIA)

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
