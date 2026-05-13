---
title: Respond with another site
description: Respond to the Worker request with the response from another website (example.com in this example).
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

### Tags

[ Middleware ](https://developers.cloudflare.com/search/?tags=Middleware)[ JavaScript ](https://developers.cloudflare.com/search/?tags=JavaScript)[ TypeScript ](https://developers.cloudflare.com/search/?tags=TypeScript)[ Python ](https://developers.cloudflare.com/search/?tags=Python) 

# Respond with another site

**Last reviewed:**  over 5 years ago 

Respond to the Worker request with the response from another website (example.com in this example).

If you want to get started quickly, click on the button below.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/cloudflare/docs-examples/tree/main/workers/respond-with-another-site)

This creates a repository in your GitHub account and deploys the application to Cloudflare Workers.

* [  JavaScript ](#tab-panel-9396)
* [  TypeScript ](#tab-panel-9397)
* [  Python ](#tab-panel-9398)

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

[Run Worker in Playground](https://workers.cloudflare.com/playground#LYVwNgLglgDghgJwgegGYHsHALQBM4RwDcABAEbogB2+CAngLzbPYZb6HbW5QDGU2AAwBmAEwA2ABzCALJICMAdhEAuFizbAOcLjT4CRE6XKUiAsACgAwuioQApnewARKAGcY6N1Gi2VJTTwCYhIqOGB7BgAiKBp7AA8AOgArNyjSVCgwR3DImLik1KjLGztHCGwAFToYe384GBgwPgIoW2RkuAA3ODdeBFgIAGpgdFxwe0tLBM8kElx7VDhwCBIAbwsSEl66Kl4A+wheAAsACgR7AEcQezcIAEp1za2A6l5fKhIAWUPjsYA5dAQACCYDA6AA7vZcOcrjc7o8Ni8XhcICAEJ8qPYISQAEq3TxUNz2U4AAx+ED+uBIABI1hdrrcIIkIpSxgBfUJA7ZgyHQxKkgA0T2RyLuBBAbn8MkEAFZBc9RSRjvY4AsEFKRUqXqDwRD-FEAOIAUUqUQV2pI7ItovZ9yIiqtjuQyBIAHkqGA6CQTZUSAz4RA3CQIZgANYhnzHEiU9wkGAIdDxOiJR1QVAkWGMu4s35jEgAQgYDBIRtNUUeqPRnwpVMBIN5UJhAaZ9sdVYxByOZ1JxwgEBgUpdCXCTXsiV46GApLbW2tFnZREs6mYmm0uh4-CEYiksgUymEJVsDicrg8Xh8bSo-kC2lIYQi0VZauC6QCWRyj6iZHBZGK1mPcoqhqOptkaZpeFadpUlsKYLDWKJgDgWIAH1RnGbIohUfIFkKNJ2WXFc12CDd9G3Iw91MYRmEsIA)

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
