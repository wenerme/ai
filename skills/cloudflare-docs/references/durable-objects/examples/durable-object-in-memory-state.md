---
title: Durable Object in-memory state
description: Create a Durable Object that stores the last location it was accessed from in-memory.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

# Durable Object in-memory state

**Last reviewed:**  over 2 years ago 

Create a Durable Object that stores the last location it was accessed from in-memory.

This example shows you how Durable Objects are stateful, meaning in-memory state can be retained between requests. After a brief period of inactivity, the Durable Object will be evicted, and all in-memory state will be lost. The next request will reconstruct the object, but instead of showing the city of the previous request, it will display a message indicating that the object has been reinitialized. If you need your applications state to survive eviction, write the state to storage by using the [Storage API](https://developers.cloudflare.com/durable-objects/api/sqlite-storage-api/), or by storing your data elsewhere.

* [  JavaScript ](#tab-panel-6954)
* [  Python ](#tab-panel-6955)

JavaScript

```

import { DurableObject } from "cloudflare:workers";


// Worker

export default {

  async fetch(request, env) {

    return await handleRequest(request, env);

  },

};


async function handleRequest(request, env) {

  let stub = env.LOCATION.getByName("A");

  // Forward the request to the remote Durable Object.

  let resp = await stub.fetch(request);

  // Return the response to the client.

  return new Response(await resp.text());

}


// Durable Object

export class Location extends DurableObject {

  constructor(state, env) {

    super(state, env);

    // Upon construction, you do not have a location to provide.

    // This value will be updated as people access the Durable Object.

    // When the Durable Object is evicted from memory, this will be reset.

    this.location = null;

  }


  // Handle HTTP requests from clients.

  async fetch(request) {

    let response = null;


    if (this.location == null) {

      response = new String(`

This is the first request, you called the constructor, so this.location was null.

You will set this.location to be your city: (${request.cf.city}). Try reloading the page.`);

    } else {

      response = new String(`

The Durable Object was already loaded and running because it recently handled a request.


Previous Location: ${this.location}

New Location: ${request.cf.city}`);

    }


    // You set the new location to be the new city.

    this.location = request.cf.city;

    console.log(response);

    return new Response(response);

  }

}


```

Explain Code

Python

```

from workers import DurableObject, Response, WorkerEntrypoint


# Worker

class Default(WorkerEntrypoint):

  async def fetch(self, request):

    return await handle_request(request, self.env)


async def handle_request(request, env):

  stub = env.LOCATION.getByName("A")

  # Forward the request to the remote Durable Object.

  resp = await stub.fetch(request)

  # Return the response to the client.

  return Response(await resp.text())


# Durable Object

class Location(DurableObject):

  def __init__(self, ctx, env):

    super().__init__(ctx, env)

    # Upon construction, you do not have a location to provide.

    # This value will be updated as people access the Durable Object.

    # When the Durable Object is evicted from memory, this will be reset.

    self.location = None


  # Handle HTTP requests from clients.

  async def fetch(self, request):

    response = None


    if self.location is None:

      response = f"""

This is the first request, you called the constructor, so this.location was null.

You will set this.location to be your city: ({request.js_object.cf.city}). Try reloading the page."""

    else:

      response = f"""

The Durable Object was already loaded and running because it recently handled a request.


Previous Location: {self.location}

New Location: {request.js_object.cf.city}"""


    # You set the new location to be the new city.

    self.location = request.js_object.cf.city

    print(response)

    return Response(response)


```

Explain Code

Finally, configure your Wrangler file to include a Durable Object [binding](https://developers.cloudflare.com/durable-objects/get-started/#4-configure-durable-object-bindings) and [migration](https://developers.cloudflare.com/durable-objects/reference/durable-objects-migrations/) based on the namespace and class name chosen previously.

* [  wrangler.jsonc ](#tab-panel-6956)
* [  wrangler.toml ](#tab-panel-6957)

JSONC

```

{

  "$schema": "./node_modules/wrangler/config-schema.json",

  "name": "durable-object-in-memory-state",

  "main": "src/index.ts",

  "durable_objects": {

    "bindings": [

      {

        "name": "LOCATION",

        "class_name": "Location"

      }

    ]

  },

  "migrations": [

    {

      "tag": "v1",

      "new_sqlite_classes": [

        "Location"

      ]

    }

  ]

}


```

Explain Code

TOML

```

"$schema" = "./node_modules/wrangler/config-schema.json"

name = "durable-object-in-memory-state"

main = "src/index.ts"


[[durable_objects.bindings]]

name = "LOCATION"

class_name = "Location"


[[migrations]]

tag = "v1"

new_sqlite_classes = [ "Location" ]


```

Explain Code

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/durable-objects/","name":"Durable Objects"}},{"@type":"ListItem","position":3,"item":{"@id":"/durable-objects/examples/","name":"Examples"}},{"@type":"ListItem","position":4,"item":{"@id":"/durable-objects/examples/durable-object-in-memory-state/","name":"Durable Object in-memory state"}}]}
```
