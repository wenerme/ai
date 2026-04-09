---
title: Respond with another site
description: Respond to the Worker request with the response from another website (example.com in this example).
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

### Tags

[ Middleware ](https://developers.cloudflare.com/search/?tags=Middleware)[ JavaScript ](https://developers.cloudflare.com/search/?tags=JavaScript)[ TypeScript ](https://developers.cloudflare.com/search/?tags=TypeScript)[ Python ](https://developers.cloudflare.com/search/?tags=Python) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/workers/examples/respond-with-another-site.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Respond with another site

**Last reviewed:**  over 5 years ago 

Respond to the Worker request with the response from another website (example.com in this example).

If you want to get started quickly, click on the button below.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/cloudflare/docs-examples/tree/main/workers/respond-with-another-site)

This creates a repository in your GitHub account and deploys the application to Cloudflare Workers.

* [  JavaScript ](#tab-panel-7363)
* [  TypeScript ](#tab-panel-7364)
* [  Python ](#tab-panel-7365)

JavaScript

```

export default {

  async fetch(request) {

    function MethodNotAllowed(request) {

      return new Response(`Method ${request.method} not allowed.`, {

        status: 405,

        headers: {

          Allow: "GET",

        },

      });

    }

    // Only GET requests work with this proxy.

    if (request.method !== "GET") return MethodNotAllowed(request);

    return fetch(`https://example.com`);

  },

};


```

[Run Worker in Playground](https://workers.cloudflare.com/playground#LYVwNgLglgDghgJwgegGYHsHALQBM4RwDcABAEbogB2+CAngLzbPYZb6HbW5QDGU2AAwAWAMzCAjBIBso0dLEAuFizbAOcLjT4CR4qbPliAsACgAwuioQAptewARKAGcY6Z1GhXFJNXgLEJFRwwDYMAERQNDYAHgB0AFbO4aSoUGB2IWGR0fFJ4WaW1nYQ2AAqdDA2PnAwMGB8BFBWyAlwAG5wzrwIsBAA1MDouOA2ZmaxbkgkuDaocOAQJADepiQkXXRUvL42ELwAFgAUCDYAjiA2zhAAlCtr677UvF5UJACyewfDAHLoEABBMBgdAAdxsuBO50u1zuq0ej1OEBACDeVBsoJIACUrm4qM4bEcAAafCDfXAkAAky1OFyuEDioTJwwAvkF-htgWCIXEiQAae4IhHXAggZw+YSCACsfIeQpIBxscFmCHFgvljyBINBPnCAHEAKJlcKyjUkFmmoUsm5EOXmu3IZAkADyVDAdBIhrKJFpMIgzhIoMwAGtA54DiQyS4SDAEOgYnQ4naoKgSFC6ddGV9hiQAIQMBgkfVG8J3JEot6k8l-QFc8GQ330m128uo3b7Y5Eg4QCAwcWO2Iheo2OK8dDAInN9YW0wsohmFTMNQaLQ8fhCMSSGRyBSiQpWWz2JyudyeZpUHx+DSkYKhCJM5UBFK+dKZO-hMggsgFCwHkrlSpqg2OoGl4JoWiSKxxlMZZwmAOAogAfSGEYMnCRQclmPJkhZBdF2XAJVx0Dd9G3IxRGYMwgA)

TypeScript

```

export default {

  async fetch(request): Promise<Response> {

    function MethodNotAllowed(request) {

      return new Response(`Method ${request.method} not allowed.`, {

        status: 405,

        headers: {

          Allow: "GET",

        },

      });

    }

    // Only GET requests work with this proxy.

    if (request.method !== "GET") return MethodNotAllowed(request);

    return fetch(`https://example.com`);

  },

} satisfies ExportedHandler;


```

Python

```

from workers import WorkerEntrypoint, Response, fetch


class Default(WorkerEntrypoint):

    def fetch(self, request):

        def method_not_allowed(request):

            msg = f'Method {request.method} not allowed.'

            headers = {"Allow": "GET"}

            return Response(msg, headers=headers, status=405)


        # Only GET requests work with this proxy.

        if request.method != "GET":

            return method_not_allowed(request)


        return fetch("https://example.com")


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/examples/","name":"Examples"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/examples/respond-with-another-site/","name":"Respond with another site"}}]}
```
