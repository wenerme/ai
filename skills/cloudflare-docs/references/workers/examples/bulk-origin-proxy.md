---
title: Bulk origin override
description: Resolve requests to your domain to a set of proxy third-party origin URLs.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

### Tags

[ Middleware ](https://developers.cloudflare.com/search/?tags=Middleware)[ JavaScript ](https://developers.cloudflare.com/search/?tags=JavaScript)[ TypeScript ](https://developers.cloudflare.com/search/?tags=TypeScript)[ Python ](https://developers.cloudflare.com/search/?tags=Python) 

### Agents toolkit

* Agent setup
* Copy as Markdown

Open the Markdown file in a new tab

Ask Claude about this page

Ask ChatGPT about this page

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/workers/examples/bulk-origin-proxy.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Bulk origin override

**Last reviewed:**  over 5 years ago 

Resolve requests to your domain to a set of proxy third-party origin URLs.

* [  JavaScript ](#tab-panel-9730)
* [  TypeScript ](#tab-panel-9731)
* [  Hono ](#tab-panel-9732)
* [  Python ](#tab-panel-9733)

JavaScript

```

export default {

  async fetch(request) {

    /**

     * An object with different URLs to fetch

     * @param {Object} ORIGINS

     */

    const ORIGINS = {

      "starwarsapi.yourdomain.com": "swapi.dev",

      "google.yourdomain.com": "www.google.com",

    };


    const url = new URL(request.url);


    // Check if incoming hostname is a key in the ORIGINS object

    if (url.hostname in ORIGINS) {

      const target = ORIGINS[url.hostname];

      url.hostname = target;

      // If it is, proxy request to that third party origin

      return fetch(url.toString(), request);

    }

    // Otherwise, process request as normal

    return fetch(request);

  },

};


```

Explain Code

TypeScript

```

export default {

  async fetch(request): Promise<Response> {

    /**

     * An object with different URLs to fetch

     * @param {Object} ORIGINS

     */

    const ORIGINS = {

      "starwarsapi.yourdomain.com": "swapi.dev",

      "google.yourdomain.com": "www.google.com",

    };


    const url = new URL(request.url);


    // Check if incoming hostname is a key in the ORIGINS object

    if (url.hostname in ORIGINS) {

      const target = ORIGINS[url.hostname];

      url.hostname = target;

      // If it is, proxy request to that third party origin

      return fetch(url.toString(), request);

    }

    // Otherwise, process request as normal

    return fetch(request);

  },

} satisfies ExportedHandler;


```

Explain Code

TypeScript

```

import { Hono } from "hono";

import { proxy } from "hono/proxy";


// An object with different URLs to fetch

const ORIGINS: Record<string, string> = {

  "starwarsapi.yourdomain.com": "swapi.dev",

  "google.yourdomain.com": "www.google.com",

};


const app = new Hono();


app.all("*", async (c) => {

  const url = new URL(c.req.url);


  // Check if incoming hostname is a key in the ORIGINS object

  if (url.hostname in ORIGINS) {

    const target = ORIGINS[url.hostname];

    url.hostname = target;


    // If it is, proxy request to that third party origin

    return proxy(url, c.req.raw);

  }


  // Otherwise, process request as normal

  return proxy(c.req.raw);

});


export default app;


```

Explain Code

Python

```

from workers import WorkerEntrypoint

from js import fetch, URL


class Default(WorkerEntrypoint):

    async def fetch(self, request):

        # A dict with different URLs to fetch

        ORIGINS = {

          "starwarsapi.yourdomain.com": "swapi.dev",

          "google.yourdomain.com": "www.google.com",

        }


        url = URL.new(request.url)


        # Check if incoming hostname is a key in the ORIGINS object

        if url.hostname in ORIGINS:

            url.hostname = ORIGINS[url.hostname]

            # If it is, proxy request to that third party origin

            return fetch(url.toString(), request)


        # Otherwise, process request as normal

        return fetch(request)


```

Explain Code

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/examples/","name":"Examples"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/examples/bulk-origin-proxy/","name":"Bulk origin override"}}]}
```
