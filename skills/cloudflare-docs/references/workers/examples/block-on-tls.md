---
title: Block on TLS
description: Inspects the incoming request's TLS version and blocks if under TLSv1.2.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

### Tags

[ Security ](https://developers.cloudflare.com/search/?tags=Security)[ Middleware ](https://developers.cloudflare.com/search/?tags=Middleware)[ JavaScript ](https://developers.cloudflare.com/search/?tags=JavaScript)[ TypeScript ](https://developers.cloudflare.com/search/?tags=TypeScript)[ Python ](https://developers.cloudflare.com/search/?tags=Python) 

# Block on TLS

**Last reviewed:**  about 4 years ago 

Inspects the incoming request's TLS version and blocks if under TLSv1.2.

* [  JavaScript ](#tab-panel-8710)
* [  TypeScript ](#tab-panel-8711)
* [  Hono ](#tab-panel-8712)
* [  Python ](#tab-panel-8713)

JavaScript

```

export default {

  async fetch(request) {

    try {

      const tlsVersion = request.cf.tlsVersion;

      // Allow only TLS versions 1.2 and 1.3

      if (tlsVersion !== "TLSv1.2" && tlsVersion !== "TLSv1.3") {

        return new Response("Please use TLS version 1.2 or higher.", {

          status: 403,

        });

      }

      return fetch(request);

    } catch (err) {

      console.error(

        "request.cf does not exist in the previewer, only in production",

      );

      return new Response(`Error in workers script ${err.message}`, {

        status: 500,

      });

    }

  },

};


```

TypeScript

```

export default {

  async fetch(request): Promise<Response> {

    try {

      const tlsVersion = request.cf.tlsVersion;

      // Allow only TLS versions 1.2 and 1.3

      if (tlsVersion !== "TLSv1.2" && tlsVersion !== "TLSv1.3") {

        return new Response("Please use TLS version 1.2 or higher.", {

          status: 403,

        });

      }

      return fetch(request);

    } catch (err) {

      console.error(

        "request.cf does not exist in the previewer, only in production",

      );

      return new Response(`Error in workers script ${err.message}`, {

        status: 500,

      });

    }

  },

} satisfies ExportedHandler;


```

TypeScript

```

import { Hono } from "hono";


const app = new Hono();


// Middleware to check TLS version

app.use("*", async (c, next) => {

  // Access the raw request to get the cf object with TLS info

  const request = c.req.raw;

  const tlsVersion = request.cf?.tlsVersion;


  // Allow only TLS versions 1.2 and 1.3

  if (tlsVersion !== "TLSv1.2" && tlsVersion !== "TLSv1.3") {

    return c.text("Please use TLS version 1.2 or higher.", 403);

  }


  await next();


});


app.onError((err, c) => {

    console.error(

      "request.cf does not exist in the previewer, only in production",

    );

    return c.text(`Error in workers script: ${err.message}`, 500);

});


app.get("/", async (c) => {

  return c.text(`TLS Version: ${c.req.raw.cf.tlsVersion}`);

});


export default app;


```

Python

```

from workers import WorkerEntrypoint, Response, fetch


class Default(WorkerEntrypoint):

    async def fetch(self, request):

        tls_version = request.cf.tlsVersion

        if tls_version not in ("TLSv1.2", "TLSv1.3"):

            return Response("Please use TLS version 1.2 or higher.", status=403)

        return fetch(request)


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/examples/","name":"Examples"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/examples/block-on-tls/","name":"Block on TLS"}}]}
```
