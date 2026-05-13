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

* [  JavaScript ](#tab-panel-9329)
* [  TypeScript ](#tab-panel-9330)
* [  Python ](#tab-panel-9331)
* [  Hono ](#tab-panel-9332)

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

[Run Worker in Playground](https://workers.cloudflare.com/playground#LYVwNgLglgDghgJwgegGYHsHALQBM4RwDcABAEbogB2+CAngLzbPYZb6HbW5QDGU2AAwBWABwAWAEwB2YeIBss+QC4WLNsA5wuNPgJESZcxcPkBYAFABhdFQgBTO9gAiUAM4x0bqNFvKSGngExCRUcMD2DABEUDT2AB4AdABWblGkqFBgjuGRMXFJqVGWNnaOENgAKnQw9v5wMDBgfARQtsjJcABucG68CLAQANTA6Ljg9paWCZ5IJLj2qHDgECQA3hYkJL10VLwB9hC8ABYAFAj2AI4g9m4QAJTrm1skyABUb88vbyQASvZNOC8ewkAAGF1GDlBJAA7j5jiQIMcQccvKs6JRYe4ERB0CQ3I5cCQLtdbhA3Ij0F8tm9kNTeLY7sT7JCQQwSFFjhAIDA3MpkMgEuEmvZEgzgOkLNSLhAQAgqNsYXAfAcjmcIegHAAaZmku73IjPAC+WosRqIljUzA0Wh0PH4QjEUlkCiUJVsDicrg8Xh8bSo-kCWlIYQi0QihC06QCWRyYaiZDA6DIxWsHvKVRqdW2jWavFa7VStimFjWUWAyqoAH1RuNslFlPkFoU0kbLVabcE7XpHYYXSZ5MxLEA)

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
