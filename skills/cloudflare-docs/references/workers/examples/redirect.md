---
title: Redirect
description: Redirect requests from one URL to another or from one set of URLs to another set.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

### Tags

[ Middleware ](https://developers.cloudflare.com/search/?tags=Middleware)[ Redirects ](https://developers.cloudflare.com/search/?tags=Redirects)[ JavaScript ](https://developers.cloudflare.com/search/?tags=JavaScript)[ TypeScript ](https://developers.cloudflare.com/search/?tags=TypeScript)[ Python ](https://developers.cloudflare.com/search/?tags=Python)[ Rust ](https://developers.cloudflare.com/search/?tags=Rust) 

### Agents toolkit

* Agent setup
* Copy as Markdown

Open the Markdown file in a new tab

Ask Claude about this page

Ask ChatGPT about this page

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/workers/examples/redirect.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Redirect

**Last reviewed:**  about 4 years ago 

Redirect requests from one URL to another or from one set of URLs to another set.

If you want to get started quickly, click on the button below.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/cloudflare/docs-examples/tree/main/workers/redirect)

This creates a repository in your GitHub account and deploys the application to Cloudflare Workers.

## Redirect all requests to one URL

* [  JavaScript ](#tab-panel-9855)
* [  TypeScript ](#tab-panel-9856)
* [  Python ](#tab-panel-9857)
* [  Rust ](#tab-panel-9858)
* [  Hono ](#tab-panel-9859)

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

[Run Worker in Playground](https://workers.cloudflare.com/playground#LYVwNgLglgDghgJwgegGYHsHALQBM4RwDcABAEbogB2+CAngLzbPYZb6HbW5QDGU2AAwBGABwBmAEyjJAdgCsI8QC4WLNsA5wuNPgJETpcxcPEBYAFABhdFQgBTO9gAiUAM4x0bqNFvKSGngExCRUcMD2DABEUDT2AB4AdABWblGkqFBgjuGRMXFJqVGWNnaOENgAKnQw9v5wMDBgfARQtsjJcABucG68CLAQANTA6Ljg9paWCZ5IJLj2qHDgECQA3hYkJL10VLwB9hC8ABYAFAj2AI4g9m4QAJTrm1skvLZ387fQYb5UAKoAJQAMiQGCQoscIBAYG5lMhkAlwk17Ik3sB0s8tm8qB87gQQG4bAtQSRxCIiJiSBcICAEFQSADbp4cSiLjwLrwIKcFndYq1bICgQAaEh4mmEsb2e4UrYAXyFFllREsamYGi0Oh4-CEYikMgUShKtgcTlcHi8PjaVH8gS0pDCEWiEUIWnSASyOUdUTIYHQZGK1mN5SqNTq20azV4-KoHTctimFjWUWAcFiAH1RuNslFlPkFoU0rKVar1cFNXodYZ9SZxMxLEA)

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

* [  JavaScript ](#tab-panel-9850)
* [  TypeScript ](#tab-panel-9851)
* [  Python ](#tab-panel-9852)
* [  Rust ](#tab-panel-9853)
* [  Hono ](#tab-panel-9854)

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
