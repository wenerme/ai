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

**Last reviewed:**  over 4 years ago 

Redirect requests from one URL to another or from one set of URLs to another set.

If you want to get started quickly, click on the button below.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/cloudflare/docs-examples/tree/main/workers/redirect)

This creates a repository in your GitHub account and deploys the application to Cloudflare Workers.

## Redirect all requests to one URL

* [  JavaScript ](#tab-panel-11586)
* [  TypeScript ](#tab-panel-11587)
* [  Python ](#tab-panel-11588)
* [  Rust ](#tab-panel-11589)
* [  Hono ](#tab-panel-11590)

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

[Run Worker in Playground](https://workers.cloudflare.com/playground#LYVwNgLglgDghgJwgegGYHsHALQBM4RwDcABAEbogB2+CAngLzbPYZb6HbW5QDGU2AAwBOQQBYAbAGZBEgOxjJALhYs2wDnC40+AkeOmyFkgLAAoAMLoqEAKY3sAESgBnGOhdRo1pSXV4CYhIqOGBbBgAiKBpbAA8AOgArFwjSVCgwe1DwqJiE5IjzKxt7CGwAFToYW184GBgwPgIoa2REuAA3OBdeBFgIAGpgdFxwW3NzOPckElxbVDhwCBIAbzMSEm66Kl4-WwheAAsACgRbAEcQWxcIAEpV9Y2SXmsb2evoEO8qAFUAJQAMiQGCQIocIBAYC4lMhkHFQg1bPEXsBUo8Ni8qG8bgQQC4rHNgSQZABGIjokhnCAgBBUEh-a7uLFIs48M68CDHOY3aLNaz-AEAGhIOOp+JGtlu5I2AF9BWYZURzKpmOpNNoePwhKJJDJ5IoJEVrHYHM43B4vC0qL5-JpSCEwpEwoRNKk-Bkso6ImQwOgyIVLMbShUqjVNvVGrw+VQ2i5rBMzCsIsA4NEAPrDUaZCJKXJzfIpGXKlVqwIa3Tagx64wSZjmIA)

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

* [  JavaScript ](#tab-panel-11581)
* [  TypeScript ](#tab-panel-11582)
* [  Python ](#tab-panel-11583)
* [  Rust ](#tab-panel-11584)
* [  Hono ](#tab-panel-11585)

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
