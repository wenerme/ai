---
title: Accessing the Cloudflare Object
description: Access custom Cloudflare properties and control how Cloudflare features are applied to every request.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

### Tags

[ JavaScript ](https://developers.cloudflare.com/search/?tags=JavaScript)[ TypeScript ](https://developers.cloudflare.com/search/?tags=TypeScript)[ Python ](https://developers.cloudflare.com/search/?tags=Python) 

### Agents toolkit

* Agent setup
* Copy as Markdown

Open the Markdown file in a new tab

Ask Claude about this page

Ask ChatGPT about this page

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/workers/examples/accessing-the-cloudflare-object.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Accessing the Cloudflare Object

**Last reviewed:**  about 4 years ago 

Access custom Cloudflare properties and control how Cloudflare features are applied to every request.

If you want to get started quickly, click on the button below.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/cloudflare/docs-examples/tree/main/workers/accessing-the-cloudflare-object)

This creates a repository in your GitHub account and deploys the application to Cloudflare Workers.

* [  JavaScript ](#tab-panel-9702)
* [  TypeScript ](#tab-panel-9703)
* [  Hono ](#tab-panel-9704)
* [  Python ](#tab-panel-9705)

JavaScript

```

export default {

  async fetch(req) {

    const data =

      req.cf !== undefined

        ? req.cf

        : { error: "The `cf` object is not available inside the preview." };


    return new Response(JSON.stringify(data, null, 2), {

      headers: {

        "content-type": "application/json;charset=UTF-8",

      },

    });

  },

};


```

Explain Code

TypeScript

```

export default {

  async fetch(req): Promise<Response> {

    const data =

      req.cf !== undefined

        ? req.cf

        : { error: "The `cf` object is not available inside the preview." };


    return new Response(JSON.stringify(data, null, 2), {

      headers: {

        "content-type": "application/json;charset=UTF-8",

      },

    });

  },

} satisfies ExportedHandler;


```

Explain Code

TypeScript

```

import { Hono } from "hono";


const app = new Hono();


app.get("*", async (c) => {

  // Access the raw request to get the cf object

  const req = c.req.raw;


  // Check if the cf object is available

  const data =

    req.cf !== undefined

      ? req.cf

      : { error: "The `cf` object is not available inside the preview." };


  // Return the data formatted with 2-space indentation

  return c.json(data);

});


export default app;


```

Explain Code

Python

```

import json

from workers import Response, WorkerEntrypoint

from js import JSON


class Default(WorkerEntrypoint):

  async def fetch(self, request):

    error = json.dumps({ "error": "The `cf` object is not available inside the preview." })

    data = request.cf if request.cf is not None else error

    headers = {"content-type":"application/json"}

    return Response(JSON.stringify(data, None, 2), headers=headers)


```

Explain Code

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/examples/","name":"Examples"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/examples/accessing-the-cloudflare-object/","name":"Accessing the Cloudflare Object"}}]}
```
