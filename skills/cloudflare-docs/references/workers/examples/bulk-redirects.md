---
title: Bulk redirects
description: Redirect requests to certain URLs based on a mapped object to the request's URL.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

### Tags

[ Middleware ](https://developers.cloudflare.com/search/?tags=Middleware)[ Redirects ](https://developers.cloudflare.com/search/?tags=Redirects)[ JavaScript ](https://developers.cloudflare.com/search/?tags=JavaScript)[ TypeScript ](https://developers.cloudflare.com/search/?tags=TypeScript)[ Python ](https://developers.cloudflare.com/search/?tags=Python) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/workers/examples/bulk-redirects.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Bulk redirects

**Last reviewed:**  about 4 years ago 

Redirect requests to certain URLs based on a mapped object to the request's URL.

* [  JavaScript ](#tab-panel-7217)
* [  TypeScript ](#tab-panel-7218)
* [  Python ](#tab-panel-7219)
* [  Hono ](#tab-panel-7220)

JavaScript

```

export default {

  async fetch(request) {

    const externalHostname = "examples.cloudflareworkers.com";


    const redirectMap = new Map([

      ["/bulk1", "https://" + externalHostname + "/redirect2"],

      ["/bulk2", "https://" + externalHostname + "/redirect3"],

      ["/bulk3", "https://" + externalHostname + "/redirect4"],

      ["/bulk4", "https://google.com"],

    ]);


    const requestURL = new URL(request.url);

    const path = requestURL.pathname;

    const location = redirectMap.get(path);


    if (location) {

      return Response.redirect(location, 301);

    }

    // If request not in map, return the original request

    return fetch(request);

  },

};


```

TypeScript

```

export default {

  async fetch(request): Promise<Response> {

    const externalHostname = "examples.cloudflareworkers.com";


    const redirectMap = new Map([

      ["/bulk1", "https://" + externalHostname + "/redirect2"],

      ["/bulk2", "https://" + externalHostname + "/redirect3"],

      ["/bulk3", "https://" + externalHostname + "/redirect4"],

      ["/bulk4", "https://google.com"],

    ]);


    const requestURL = new URL(request.url);

    const path = requestURL.pathname;

    const location = redirectMap.get(path);


    if (location) {

      return Response.redirect(location, 301);

    }

    // If request not in map, return the original request

    return fetch(request);

  },

} satisfies ExportedHandler;


```

Python

```

from workers import WorkerEntrypoint, Response, fetch

from urllib.parse import urlparse


class Default(WorkerEntrypoint):

    async def fetch(self, request):

        external_hostname = "examples.cloudflareworkers.com"


        redirect_map = {

          "/bulk1": "https://" + external_hostname + "/redirect2",

          "/bulk2": "https://" + external_hostname + "/redirect3",

          "/bulk3": "https://" + external_hostname + "/redirect4",

          "/bulk4": "https://google.com",

          }


        url = urlparse(request.url)

        location = redirect_map.get(url.path, None)


        if location:

            return Response.redirect(location, 301)


        # If request not in map, return the original request

        return fetch(request)


```

TypeScript

```

import { Hono } from "hono";


const app = new Hono();


// Configure your redirects

const externalHostname = "examples.cloudflareworkers.com";


const redirectMap = new Map([

  ["/bulk1", `https://${externalHostname}/redirect2`],

  ["/bulk2", `https://${externalHostname}/redirect3`],

  ["/bulk3", `https://${externalHostname}/redirect4`],

  ["/bulk4", "https://google.com"],

]);


// Middleware to handle redirects

app.use("*", async (c, next) => {

  const path = c.req.path;

  const location = redirectMap.get(path);


  if (location) {

    // If path is in our redirect map, perform the redirect

    return c.redirect(location, 301);

  }


  // Otherwise, continue to the next handler

  await next();

});


// Default handler for requests that don't match any redirects

app.all("*", async (c) => {

  // Pass through to origin

  return fetch(c.req.raw);

});


export default app;


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/examples/","name":"Examples"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/examples/bulk-redirects/","name":"Bulk redirects"}}]}
```
