---
title: Fetch HTML
description: Send a request to a remote server, read HTML from the response, and serve that HTML.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop)

# Fetch HTML

Send a request to a remote server, read HTML from the response, and serve that HTML.

If you want to get started quickly, click on the button below.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/cloudflare/docs-examples/tree/main/workers/fetch-html)

This creates a repository in your GitHub account and deploys the application to Cloudflare Workers.

* [  JavaScript ](#tab-panel-12007)
* [  TypeScript ](#tab-panel-12008)
* [  Python ](#tab-panel-12009)
* [  Hono ](#tab-panel-12010)

**JavaScript**

```js
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

[Run Worker in Playground](https://workers.cloudflare.com/playground#LYVwNgLglgDghgJwgegGYHsHALQBM4RwDcABAEbogB2+CAngLzbPYZb6HbW5QDGU2AAwAWAGwBWUcICMAJmGyAzLIBcLFm2Ac4XGnwEiJUuQuUBYAFABhdFQgBTO9gAiUAM4x0bqNFsqSmngExCRUcMD2DABEUDT2AB4AdABWblGkqFBgjuGRMXFJqVGWNnaOENgAKnQw9v5wMDBgfARQtsjJcABucG68CLAQANTA6Ljg9paWCZ5IJLj2qHDgECQA3hYkJL10VLwB9hC8ABYAFAj2AI4g9m4QAJTrm1skyABUb88vbyQASvZNOC8ewkAAGF1GDlBJAA7j5jiQIMcQccvKs6JRYe4ERB0CQ3I5cCQLtdbhA3Ij0F8tm9kNTeLY7sT7JCQQwSFFjhAIDA3CpkMgEuEmvZEgzgOkLNSLhAQAgqNsYXAfAcjmcIegHAAaZmku73IjPAC+WosRqIlnUzE02l0PH4QjEkhk8iUshKtgcTlcHi8PjaVH8gW0pDCEWiEUI2nSASyOXDUTIYHQZGK1k95SqNTq20azV4rXaqVsUwsayiwGVVAA+qNxtkoip8gtCmkjZarTbgnb9I6jC7TLJmJYgA)

**TypeScript**

```ts
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

**Python**

```py
from workers import WorkerEntrypoint
from js import fetch


class Default(WorkerEntrypoint):
    async def fetch(self, request):
        # Replace `remote` with the host you wish to send requests to
        remote = "https://example.com"
        return await fetch(remote, request)
```

**TypeScript**

```ts
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
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/examples/fetch-html/#page","headline":"Fetch HTML · Cloudflare Workers docs","description":"Send a request to a remote server, read HTML from the response, and serve that HTML.","url":"https://developers.cloudflare.com/workers/examples/fetch-html/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["JavaScript","TypeScript","Python"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/examples/","name":"Examples"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/examples/fetch-html/","name":"Fetch HTML"}}]}
```
