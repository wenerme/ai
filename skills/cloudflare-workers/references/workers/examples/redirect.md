---
title: Redirect
description: Redirect requests from one URL to another or from one set of URLs to another set.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop)

# Redirect

Redirect requests from one URL to another or from one set of URLs to another set.

If you want to get started quickly, click on the button below.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/cloudflare/docs-examples/tree/main/workers/redirect)

This creates a repository in your GitHub account and deploys the application to Cloudflare Workers.

## Redirect all requests to one URL

* [  JavaScript ](#tab-panel-12523)
* [  TypeScript ](#tab-panel-12524)
* [  Python ](#tab-panel-12525)
* [  Rust ](#tab-panel-12526)
* [  Hono ](#tab-panel-12527)

**JavaScript**

```js
export default {
  async fetch(request) {
    const destinationURL = "https://example.com";
    const statusCode = 301;
    return Response.redirect(destinationURL, statusCode);
  },
};
```

[Run Worker in Playground](https://workers.cloudflare.com/playground#LYVwNgLglgDghgJwgegGYHsHALQBM4RwDcABAEbogB2+CAngLzbPYZb6HbW5QDGU2AAwAOAMwA2YQHYArAE4AjACZRwgFwsWbYBzhcafASInT5y1QFgAUAGF0VCAFMH2ACJQAzjHQeo0e2ok2ngExCRUcMCODABEUDSOAB4AdABWHjGkqFBgzpHRcQkp6THWdg7OENgAKnQwjoFwMDBgfARQ9sipcABucB68CLAQANTA6LjgjtbWSd5IJLiOqHDgECQA3lYkJP10VLxBjhC8ABYAFAiOAI4gjh4QAJSb2zskvPYPi-fQEf5UAFUAEoAGRIDBIMVOEAgMA8amQyCSkRajmSH2AmVeOw+VC+DwIIA8diW4JIokECiI2JIVwgIAQVBIQPu3jxaKuPCuvAg5yWD3i7XswJBABoSAT6cSJo5HtSdgBfUVWBVEayaZjaXT6Hj8IRiSSyRQqYRlexOFzuLw+PwdKiBYK6UgRKKxKKEXSZII5PKumJkMDoMilWzmyo1OoNXbNVq8IVULoeewzKwbGLAODxAD640muRiakKS2KGQV6o1WtCOsM+pMRvMwmY1iAA)

**TypeScript**

```ts
export default {
  async fetch(request): Promise<Response> {
    const destinationURL = "https://example.com";
    const statusCode = 301;
    return Response.redirect(destinationURL, statusCode);
  },
} satisfies ExportedHandler;
```

**Python**

```py
from workers import WorkerEntrypoint, Response


class Default(WorkerEntrypoint):
    def fetch(self, request):
        destinationURL = "https://example.com"
        statusCode = 301
        return Response.redirect(destinationURL, statusCode)
```

```rs
use worker::*;


#[event(fetch)]
async fn fetch(_req: Request, _env: Env, _ctx: Context) -> Result<Response> {
    let destination_url = Url::parse("https://example.com")?;
    let status_code = 301;
    Response::redirect_with_status(destination_url, status_code)
}
```

**TypeScript**

```ts
import { Hono } from "hono";


const app = new Hono();


app.all("*", (c) => {
  const destinationURL = "https://example.com";
  const statusCode = 301;
  return c.redirect(destinationURL, statusCode);
});


export default app;
```

## Redirect requests from one domain to another

* [  JavaScript ](#tab-panel-12518)
* [  TypeScript ](#tab-panel-12519)
* [  Python ](#tab-panel-12520)
* [  Rust ](#tab-panel-12521)
* [  Hono ](#tab-panel-12522)

**JavaScript**

```js
export default {
  async fetch(request) {
    const base = "https://example.com";
    const statusCode = 301;


    const url = new URL(request.url);
    const { pathname, search } = url;


    const destinationURL = `${base}${pathname}${search}`;
    console.log(destinationURL);


    return Response.redirect(destinationURL, statusCode);
  },
};
```

**TypeScript**

```ts
export default {
  async fetch(request): Promise<Response> {
    const base = "https://example.com";
    const statusCode = 301;


    const url = new URL(request.url);
    const { pathname, search } = url;


    const destinationURL = `${base}${pathname}${search}`;
    console.log(destinationURL);


    return Response.redirect(destinationURL, statusCode);
  },
} satisfies ExportedHandler;
```

**Python**

```py
from workers import WorkerEntrypoint, Response
from urllib.parse import urlparse


class Default(WorkerEntrypoint):
    async def fetch(self, request):
        base = "https://example.com"
        statusCode = 301


        url = urlparse(request.url)


        destinationURL = f'{base}{url.path}{url.query}'
        print(destinationURL)


        return Response.redirect(destinationURL, statusCode)
```

```rs
use worker::*;


#[event(fetch)]
async fn fetch(req: Request, _env: Env, _ctx: Context) -> Result<Response> {
    let mut base = Url::parse("https://example.com")?;
    let status_code = 301;


    let url = req.url()?;


    base.set_path(url.path());
    base.set_query(url.query());


    console_log!("{:?}", base.to_string());


    Response::redirect_with_status(base, status_code)
}
```

**TypeScript**

```ts
import { Hono } from "hono";


const app = new Hono();


app.all("*", (c) => {
  const base = "https://example.com";
  const statusCode = 301;


  const { pathname, search } = new URL(c.req.url);


  const destinationURL = `${base}${pathname}${search}`;
  console.log(destinationURL);


  return c.redirect(destinationURL, statusCode);
});


export default app;
```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/examples/redirect/#page","headline":"Redirect · Cloudflare Workers docs","description":"Redirect requests from one URL to another or from one set of URLs to another set.","url":"https://developers.cloudflare.com/workers/examples/redirect/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Middleware","Redirects","JavaScript","TypeScript","Python","Rust"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/examples/","name":"Examples"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/examples/redirect/","name":"Redirect"}}]}
```
