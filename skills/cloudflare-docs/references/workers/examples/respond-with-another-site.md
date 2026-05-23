---
title: Respond with another site
description: Respond to the Worker request with the response from another website (example.com in this example).
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Respond with another site

**Last reviewed:**  over 5 years ago 

Respond to the Worker request with the response from another website (example.com in this example).

If you want to get started quickly, click on the button below.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/cloudflare/docs-examples/tree/main/workers/respond-with-another-site)

This creates a repository in your GitHub account and deploys the application to Cloudflare Workers.

* [  JavaScript ](#tab-panel-9568)
* [  TypeScript ](#tab-panel-9569)
* [  Python ](#tab-panel-9570)

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

[Run Worker in Playground](https://workers.cloudflare.com/playground#LYVwNgLglgDghgJwgegGYHsHALQBM4RwDcABAEbogB2+CAngLzbPYZb6HbW5QDGU2AAwAWAMwAOcYNEBWKTMEAuFizbAOcLjT4CREqbPmCAsACgAwuioQAptewARKAGcY6Z1GhXFJNXgLEJFRwwDYMAERQNDYAHgB0AFbO4aSoUGB2IWGR0fFJ4WaW1nYQ2AAqdDA2PnAwMGB8BFBWyAlwAG5wzrwIsBAA1MDouOA2ZmaxbkgkuDaocOAQJADepiQkXXRUvL42ELwAFgAUCDYAjiA2zhAAlCtr677UvF5UJACyewfDAHLoEABBMBgdAAdxsuBO50u1zuq0ej1OEBACDeVBsoJIACUrm4qM4bEcAAafCDfXAkAAky1OFyuEDioTJwwAvkF-htgWCIXEiQAae4IhHXAggZw+YSCGR8h5CkgHGxwWYIcWCuWPIEg0E+cIAcQAomVwjL1SQWSahSybkRZWbbchkCQAPJUMB0EgGsokWkwiDOEigzAAawDngOJDJLhIMAQ6BidDitqgqBIULp10ZX2GJAAhAwGCQ9YbwnckSi3qTyX9AVzwZCffTrbay6jdvtjkSDhAIDBxQ7YiF6jY4rx0MAiU31ubTCyiGYVMw1BotDx+EIxJJpHIpSYLFZbPYnK53J5mlQfH4NKRgqEIkylQEUr50plb+EyCCyAU98V7BUqjUdQNLwTQtEkVjjKYyzhMAcBRAA+kMIwZOEig5LMeTJCy84LkuAQrjo676FuRjMGYQA)

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
