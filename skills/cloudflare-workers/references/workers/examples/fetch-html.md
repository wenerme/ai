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

* [  JavaScript ](#tab-panel-12524)
* [  TypeScript ](#tab-panel-12525)
* [  Python ](#tab-panel-12526)
* [  Hono ](#tab-panel-12527)

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

[Run Worker in Playground](https://workers.cloudflare.com/playground#LYVwNgLglgDghgJwgegGYHsHALQBM4RwDcABAEbogB2+CAngLzbPYZb6HbW5QDGU2AAwBWAIwB2AMwBOSZMEzRALhYs2wDnC40+AkRJlyF00QFgAUAGF0VCAFNb2ACJQAzjHSuo0G0pLq8AmISKjhgOwYAIigaOwAPADoAK1dI0lQoMAcwiOjYxJTIi2tbBwhsABU6GDs-OBgYMD4CKBtkJLgANzhXXgRYCABqYHRccDsLC3iPJBJcO1Q4cAgSAG9zEhIeuipefzsIXgALAAoEOwBHEDtXCABKNY3NkmQAKlen59eSACU7RrgvDsJAABucRvYQSQAO7eI4kCBHYFHTwrOiUGFueEQdAkVwOXAkc5XG4QVwI9CfTavZBU3g2W5EuwQ4EMEiRI4QCAwVxKZDIeJhRp2BL04BpcxU84QEAIKhbaFwbz7Q6ncHoewAGiZJNudyITwAvprzIaiBZVMx1JptDx+EIxFJZPJFMUbPZHC53J5vK0qH4AppSKFwlFwoRNGl-JlsqHImQwOgyEUrO6ypVqrUtg0mrwWm0UjZJuZVpFgEqqAB9EZjLKRJR5eYFVKGi2W61BW26B0GZ3GUTMCxAA)

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
