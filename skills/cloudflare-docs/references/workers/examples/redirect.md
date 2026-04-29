---
title: Redirect
description: Redirect requests from one URL to another or from one set of URLs to another set.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

### Tags

[ Middleware ](https://developers.cloudflare.com/search/?tags=Middleware)[ Redirects ](https://developers.cloudflare.com/search/?tags=Redirects)[ JavaScript ](https://developers.cloudflare.com/search/?tags=JavaScript)[ TypeScript ](https://developers.cloudflare.com/search/?tags=TypeScript)[ Python ](https://developers.cloudflare.com/search/?tags=Python)[ Rust ](https://developers.cloudflare.com/search/?tags=Rust) 

# Redirect

**Last reviewed:**  about 4 years ago 

Redirect requests from one URL to another or from one set of URLs to another set.

If you want to get started quickly, click on the button below.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/cloudflare/docs-examples/tree/main/workers/redirect)

This creates a repository in your GitHub account and deploys the application to Cloudflare Workers.

## Redirect all requests to one URL

* [  JavaScript ](#tab-panel-8801)
* [  TypeScript ](#tab-panel-8802)
* [  Python ](#tab-panel-8803)
* [  Rust ](#tab-panel-8804)
* [  Hono ](#tab-panel-8805)

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

[Run Worker in Playground](https://workers.cloudflare.com/playground#LYVwNgLglgDghgJwgegGYHsHALQBM4RwDcABAEbogB2+CAngLzbPYZb6HbW5QDGU2AAwBGYQCYALAE4pEwVPkAuFizbAOcLjT4CR46bPnyAsACgAwuioQAptewARKAGcY6Z1GhXFJNXgLEJFRwwDYMAERQNDYAHgB0AFbO4aSoUGB2IWGR0fFJ4WaW1nYQ2AAqdDA2PnAwMGB8BFBWyAlwAG5wzrwIsBAA1MDouOA2ZmaxbkgkuDaocOAQJADepiQkXXRUvL42ELwAFgAUCDYAjiA2zhAAlCtr6yS8VtczV9DBXlQAqgBKADIkBgkcIHCAQGDORTIZCxEL1GxxZ7AFIPdbPKiva4EEDOSyzIEkADMIiIaJIpwgIAQVBIvyubkxiNOPFOvAgR1m1yiTSsf3+ABoSNiqXjhjYbmT1gBfAWmaVEMwqZhqDRaHj8ISiSQyOQKKSFKy2exOVzuTzNKg+PwaUjBUIRUKEDQpXzpTIO8JkMDoMgFCxGkrlSrVDZ1Bq8XlUVrOKzjUzLcLAOBRAD6QxGGXCihyszyyWlSuVqoC6p0Wv0uqMUmYZiAA)

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

Explain Code

## Redirect requests from one domain to another

* [  JavaScript ](#tab-panel-8796)
* [  TypeScript ](#tab-panel-8797)
* [  Python ](#tab-panel-8798)
* [  Rust ](#tab-panel-8799)
* [  Hono ](#tab-panel-8800)

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

Explain Code

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

Explain Code

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

Explain Code

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

Explain Code

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

Explain Code

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/examples/","name":"Examples"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/examples/redirect/","name":"Redirect"}}]}
```
