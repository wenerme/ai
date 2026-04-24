---
title: Aggregate requests
description: Send two GET request to two urls and aggregates the responses into one response.
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

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/workers/examples/aggregate-requests.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Aggregate requests

**Last reviewed:**  about 4 years ago 

Send two GET request to two urls and aggregates the responses into one response.

If you want to get started quickly, click on the button below.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/cloudflare/docs-examples/tree/main/workers/aggregate-requests)

This creates a repository in your GitHub account and deploys the application to Cloudflare Workers.

* [  JavaScript ](#tab-panel-9706)
* [  TypeScript ](#tab-panel-9707)
* [  Hono ](#tab-panel-9708)
* [  Python ](#tab-panel-9709)

JavaScript

```

export default {

  async fetch(request) {

    // someHost is set up to return JSON responses

    const someHost = "https://jsonplaceholder.typicode.com";

    const url1 = someHost + "/todos/1";

    const url2 = someHost + "/todos/2";


    const responses = await Promise.all([fetch(url1), fetch(url2)]);

    const results = await Promise.all(responses.map((r) => r.json()));


    const options = {

      headers: { "content-type": "application/json;charset=UTF-8" },

    };

    return new Response(JSON.stringify(results), options);

  },

};


```

Explain Code

TypeScript

```

export default {

  async fetch(request) {

    // someHost is set up to return JSON responses

    const someHost = "https://jsonplaceholder.typicode.com";

    const url1 = someHost + "/todos/1";

    const url2 = someHost + "/todos/2";


    const responses = await Promise.all([fetch(url1), fetch(url2)]);

    const results = await Promise.all(responses.map((r) => r.json()));


    const options = {

      headers: { "content-type": "application/json;charset=UTF-8" },

    };

    return new Response(JSON.stringify(results), options);

  },

} satisfies ExportedHandler;


```

Explain Code

TypeScript

```

import { Hono } from "hono";


const app = new Hono();


app.get("*", async (c) => {

  // someHost is set up to return JSON responses

  const someHost = "https://jsonplaceholder.typicode.com";

  const url1 = someHost + "/todos/1";

  const url2 = someHost + "/todos/2";


  // Fetch both URLs concurrently

  const responses = await Promise.all([fetch(url1), fetch(url2)]);


  // Parse JSON responses concurrently

  const results = await Promise.all(responses.map((r) => r.json()));


  // Return aggregated results

  return c.json(results);

});


export default app;


```

Explain Code

Python

```

from workers import Response, fetch, WorkerEntrypoint

import asyncio

import json


class Default(WorkerEntrypoint):

  async def fetch(self, request):

    # some_host is set up to return JSON responses

    some_host = "https://jsonplaceholder.typicode.com"

    url1 = some_host + "/todos/1"

    url2 = some_host + "/todos/2"


    responses = await asyncio.gather(fetch(url1), fetch(url2))

    results = await asyncio.gather(*(r.json() for r in responses))


    headers = {"content-type": "application/json;charset=UTF-8"}

    return Response.json(results, headers=headers)


```

Explain Code

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/examples/","name":"Examples"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/examples/aggregate-requests/","name":"Aggregate requests"}}]}
```
