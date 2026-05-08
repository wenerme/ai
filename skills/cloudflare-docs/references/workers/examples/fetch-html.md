---
title: Fetch HTML
description: Send a request to a remote server, read HTML from the response, and serve that HTML.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

### Tags

[ JavaScript ](https://developers.cloudflare.com/search/?tags=JavaScript)[ TypeScript ](https://developers.cloudflare.com/search/?tags=TypeScript)[ Python ](https://developers.cloudflare.com/search/?tags=Python) 

# Fetch HTML

**Last reviewed:**  over 2 years ago 

Send a request to a remote server, read HTML from the response, and serve that HTML.

If you want to get started quickly, click on the button below.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/cloudflare/docs-examples/tree/main/workers/fetch-html)

This creates a repository in your GitHub account and deploys the application to Cloudflare Workers.

* [  JavaScript ](#tab-panel-9289)
* [  TypeScript ](#tab-panel-9290)
* [  Python ](#tab-panel-9291)
* [  Hono ](#tab-panel-9292)

JavaScript

```

export default {

  async fetch(request) {

    /**

     * Replace `remote` with the host you wish to send requests to

     */

    const remote = "https://example.com";


    return await fetch(remote, request);

  },

};


```

[Run Worker in Playground](https://workers.cloudflare.com/playground#LYVwNgLglgDghgJwgegGYHsHALQBM4RwDcABAEbogB2+CAngLzbPYZb6HbW5QDGU2AAwAWAOwA2AJwBGAEwAOAMziArLIBcLFm2Ac4XGnwEiJMhcrUBYAFABhdFQgBTR9gAiUAM4x0nqNAd1Eh08AmISKjhgJwYAIigaJwAPADoAK09Y0lQoMBcomPjE1IzYm3tHFwhsABU6GCcguBgYMD4CKAdkNLgANzhPXgRYCABqYHRccCcbG2SfJBJcJ1Q4cAgSAG9rEhIBuipeYKcIXgALAAoEJwBHECdPCABKLZ3dkmQAKk+398+SABKTlacF4ThIAANrhNnBCSAB3fxnEgQM7gs6+DZ0SgIrzIiDoEieFy4EjXO4PCCeFHoX67T7IOm8ByPMlOGHghgkWJnCAQGCedTIZDJKKtJwpZnALLWOnXCAgBBUPbwuD+Y6nS7Q9DOAA0bIpjyeRDeAF9ddZTUQbFpmDo9AYePwhGIpHIlKpZOUHM5XB5vL5-J0qEEQnpSJFonFooQ9Flgrl8lHYmQwOgyGU7D6qrV6o09i02rwOl0Mg5ZtZNrFgGqqAB9CZTPKxdRFZYlTKmm22+1hR1GF2md0WWTMGxAA)

TypeScript

```

export default {

  async fetch(request: Request): Promise<Response> {

    /**

     * Replace `remote` with the host you wish to send requests to

     */

    const remote = "https://example.com";


    return await fetch(remote, request);

  },

};


```

Python

```

from workers import WorkerEntrypoint

from js import fetch


class Default(WorkerEntrypoint):

    async def fetch(self, request):

        # Replace `remote` with the host you wish to send requests to

        remote = "https://example.com"

        return await fetch(remote, request)


```

TypeScript

```

import { Hono } from "hono";


const app = new Hono();


app.all("*", async (c) => {

  /**

   * Replace `remote` with the host you wish to send requests to

   */

  const remote = "https://example.com";


  // Forward the request to the remote server

  return await fetch(remote, c.req.raw);

});


export default app;


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/examples/","name":"Examples"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/examples/fetch-html/","name":"Fetch HTML"}}]}
```
