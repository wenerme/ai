---
title: Durable Object Time To Live
description: Use the Durable Objects Alarms API to implement a Time To Live (TTL) for Durable Object instances.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

### Agents toolkit

* Agent setup
* Copy as Markdown

Open the Markdown file in a new tab

Ask Claude about this page

Ask ChatGPT about this page

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/durable-objects/examples/durable-object-ttl.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Durable Object Time To Live

**Last reviewed:**  over 1 year ago 

Implement a Time To Live (TTL) for Durable Object instances.

A common feature request for Durable Objects is a Time To Live (TTL) for Durable Object instances. Durable Objects give developers the tools to implement a custom TTL in only a few lines of code. This example demonstrates how to implement a TTL making use of `alarms`. While this TTL will be extended upon every new request to the Durable Object, this can be customized based on a particular use case.

Be careful when calling `setAlarm` in the Durable Object class constructor

In this example the TTL is extended upon every new fetch request to the Durable Object. It might be tempting to instead extend the TTL in the constructor of the Durable Object. This is not advised because the Durable Object's constructor will be called before invoking the alarm handler if the alarm wakes the Durable Object up from hibernation. This approach will naively result in the constructor continually extending the TTL without running the alarm handler. If you must call `setAlarm` in the Durable Object class constructor be sure to check that there is no alarm previously set.

* [  JavaScript ](#tab-panel-6904)
* [  TypeScript ](#tab-panel-6905)
* [  Python ](#tab-panel-6906)

JavaScript

```

import { DurableObject } from "cloudflare:workers";


// Durable Object

export class MyDurableObject extends DurableObject {

  // Time To Live (TTL) in milliseconds

  timeToLiveMs = 1000;


  constructor(ctx, env) {

    super(ctx, env);

  }


  async fetch(_request) {

    // Extend the TTL immediately following every fetch request to a Durable Object.

    await this.ctx.storage.setAlarm(Date.now() + this.timeToLiveMs);

    ...

   }


  async alarm() {

    await this.ctx.storage.deleteAll();

  }

}


// Worker

export default {

  async fetch(request, env) {

    const stub = env.MY_DURABLE_OBJECT.getByName("foo");

    return await stub.fetch(request);

  },

};


```

Explain Code

TypeScript

```

import { DurableObject } from "cloudflare:workers";


export interface Env {

  MY_DURABLE_OBJECT: DurableObjectNamespace<MyDurableObject>;

}


// Durable Object

export class MyDurableObject extends DurableObject {

  // Time To Live (TTL) in milliseconds

  timeToLiveMs = 1000;


  constructor(ctx: DurableObjectState, env: Env) {

    super(ctx, env);

  }


  async fetch(_request: Request) {

    // Extend the TTL immediately following every fetch request to a Durable Object.

    await this.ctx.storage.setAlarm(Date.now() + this.timeToLiveMs);

    ...

   }


  async alarm() {

    await this.ctx.storage.deleteAll();

  }

}


// Worker

export default {

  async fetch(request, env) {

    const stub = env.MY_DURABLE_OBJECT.getByName("foo");

    return await stub.fetch(request);

  },

} satisfies ExportedHandler<Env>;


```

Explain Code

Python

```

from workers import DurableObject, Response, WorkerEntrypoint

import time


# Durable Object

class MyDurableObject(DurableObject):

  # Time To Live (TTL) in milliseconds

  timeToLiveMs = 1000


  def __init__(self, ctx, env):

    super().__init__(ctx, env)


  async def fetch(self, _request):

    # Extend the TTL immediately following every fetch request to a Durable Object.

    await self.ctx.storage.setAlarm(int(time.time() * 1000) + self.timeToLiveMs)

    ...


  async def alarm(self):

    await self.ctx.storage.deleteAll()


# Worker

class Default(WorkerEntrypoint):

  async def fetch(self, request):

    stub = self.env.MY_DURABLE_OBJECT.getByName("foo")

    return await stub.fetch(request)


```

Explain Code

To test and deploy this example, configure your Wrangler file to include a Durable Object [binding](https://developers.cloudflare.com/durable-objects/get-started/#4-configure-durable-object-bindings) and [migration](https://developers.cloudflare.com/durable-objects/reference/durable-objects-migrations/) based on the namespace and class name chosen previously.

* [  wrangler.jsonc ](#tab-panel-6907)
* [  wrangler.toml ](#tab-panel-6908)

JSONC

```

{

  "$schema": "./node_modules/wrangler/config-schema.json",

  "name": "durable-object-ttl",

  "main": "src/index.ts",

  "durable_objects": {

    "bindings": [

      {

        "name": "MY_DURABLE_OBJECT",

        "class_name": "MyDurableObject"

      }

    ]

  },

  "migrations": [

    {

      "tag": "v1",

      "new_sqlite_classes": [

        "MyDurableObject"

      ]

    }

  ]

}


```

Explain Code

TOML

```

"$schema" = "./node_modules/wrangler/config-schema.json"

name = "durable-object-ttl"

main = "src/index.ts"


[[durable_objects.bindings]]

name = "MY_DURABLE_OBJECT"

class_name = "MyDurableObject"


[[migrations]]

tag = "v1"

new_sqlite_classes = [ "MyDurableObject" ]


```

Explain Code

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/durable-objects/","name":"Durable Objects"}},{"@type":"ListItem","position":3,"item":{"@id":"/durable-objects/examples/","name":"Examples"}},{"@type":"ListItem","position":4,"item":{"@id":"/durable-objects/examples/durable-object-ttl/","name":"Durable Object Time To Live"}}]}
```
