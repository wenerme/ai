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

**Last reviewed:**  about 4 years ago 

Redirect requests from one URL to another or from one set of URLs to another set.

If you want to get started quickly, click on the button below.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/cloudflare/docs-examples/tree/main/workers/redirect)

This creates a repository in your GitHub account and deploys the application to Cloudflare Workers.

## Redirect all requests to one URL

* [  JavaScript ](#tab-panel-9527)
* [  TypeScript ](#tab-panel-9528)
* [  Python ](#tab-panel-9529)
* [  Rust ](#tab-panel-9530)
* [  Hono ](#tab-panel-9531)

JavaScript

```

export default {

  async fetch(request) {

    const destinationURL = "https://example.com";

    const statusCode = 301;

    return Response.redirect(destinationURL, statusCode);

  },

};


```

[Run Worker in Playground](https://workers.cloudflare.com/playground#LYVwNgLglgDghgJwgegGYHsHALQBM4RwDcABAEbogB2+CAngLzbPYZb6HbW5QDGU2AAwBOAKwBmABxjRwyQBZhALhYs2wDnC40+AkROmjZC4QFgAUAGF0VCAFNb2ACJQAzjHSuo0G0pLq8AmISKjhgOwYAIigaOwAPADoAK1dI0lQoMAcwiOjYxJTIi2tbBwhsABU6GDs-OBgYMD4CKBtkJLgANzhXXgRYCABqYHRccDsLC3iPJBJcO1Q4cAgSAG9zEhIeuipefzsIXgALAAoEOwBHEDtXCABKNY3Nkl4bW7mb6FCfKgBVACUADIkBgkSJHCAQGCuJTIZDxMKNOwJV7ANJPTavKjvW4EECuazzEEkcSCACMRAxJHOEBACCoJH+Nw82OR5x4514EBO81uMRaNgBgIANCRcbSCaM7HdKZsAL7C8xyogWVTMdSabQ8fhCMRSGRyRTFGz2RwudyebytKh+AKaUihcJRcKETRpfyZbJOyJkMDoMhFKwmsqVaq1LYNJq8AVUdquGyTcyrSLAOAxAD6IzGWUiSjy8wKqTlqrVGqCWt0uoMBpMzAsQA)

TypeScript

```

export default {

  async fetch(request): Promise<Response> {

    const destinationURL = "https://example.com";

    const statusCode = 301;

    return Response.redirect(destinationURL, statusCode);

  },

} satisfies ExportedHandler;


```

Python

```

from workers import WorkerEntrypoint, Response


class Default(WorkerEntrypoint):

    def fetch(self, request):

        destinationURL = "https://example.com"

        statusCode = 301

        return Response.redirect(destinationURL, statusCode)


```

```

use worker::*;


#[event(fetch)]

async fn fetch(_req: Request, _env: Env, _ctx: Context) -> Result<Response> {

    let destination_url = Url::parse("https://example.com")?;

    let status_code = 301;

    Response::redirect_with_status(destination_url, status_code)

}


```

TypeScript

```

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

* [  JavaScript ](#tab-panel-9522)
* [  TypeScript ](#tab-panel-9523)
* [  Python ](#tab-panel-9524)
* [  Rust ](#tab-panel-9525)
* [  Hono ](#tab-panel-9526)

JavaScript

```

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

TypeScript

```

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

Python

```

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

```

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

TypeScript

```

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
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/examples/","name":"Examples"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/examples/redirect/","name":"Redirect"}}]}
```
