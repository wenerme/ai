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

* [  JavaScript ](#tab-panel-9034)
* [  TypeScript ](#tab-panel-9035)
* [  Python ](#tab-panel-9036)
* [  Hono ](#tab-panel-9037)

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

[Run Worker in Playground](https://workers.cloudflare.com/playground#LYVwNgLglgDghgJwgegGYHsHALQBM4RwDcABAEbogB2+CAngLzbPYZb6HbW5QDGU2AAyCALAE4RwgIyCArGLEAuFizbAOcLjT4Dh4yYJnyxAWABQAYXRUIAUxvYAIlADOMdC6jRrikmrwExCRUcMC2DABEUDS2AB4AdABWLhGkqFBg9qHhUTEJyRHmVjb2ENgAKnQwtr5wMDBgfARQ1siJcABucC68CLAQANTA6Ljgtubmce5IJLi2qHDgECQA3mYkJN10VLx+thC8ABYAFAi2AI4gti4QAJSr6xskyABUL49PLyQASrYNcLxbCQAAZnYZ2YEkADuXkOJAghyBhw8yzolGhrjhEHQJBc9lwJDOl2uEBc8PQHw2L2QlN41huhNs4KBDBIEUOEAgMBcimQyDioQatnidOAqTMlLOEBACComyhcC8ewOJzB6DsABpGcSbrciI8AL4aswGojmFTMNQaLQ8fhCUQSaRyBRFax2BzONweLwtKi+fwaUghMKRMKEDSpPwZLIhiJkMDoMiFSxu0oVKo1Tb1Rq8ZqtZLWCZmFYRYCKqgAfWGo0yEUUuTm+RSBvNFqtgRtOnt+idxmY5iAA)

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
