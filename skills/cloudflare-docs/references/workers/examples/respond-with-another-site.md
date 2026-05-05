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

* [  JavaScript ](#tab-panel-9203)
* [  TypeScript ](#tab-panel-9204)
* [  Python ](#tab-panel-9205)

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

[Run Worker in Playground](https://workers.cloudflare.com/playground#LYVwNgLglgDghgJwgegGYHsHALQBM4RwDcABAEbogB2+CAngLzbPYZb6HbW5QDGU2AAwAOAKwBGAEwA2YdPEjRALhYs2wDnC40+AxVNnzFAWABQAYXRUIAU2vYAIlADOMdM6jQrSkurwFiEio4YBsGACIoGhsADwA6ACtncNJUKDA7ELDI6Pik8LNLazsIbAAVOhgbHzgYGDA+AigrZAS4ADc4Z14EWAgAamB0XHAbMzNYtyQSXBtUOHAIEgBvUxISLroqXl8bCF4ACwAKBBsARxAbZwgAShW19d9qXi8qEgBZPYPhgDl0CAAgmAwOgAO42XAnc6Xa53VaPR6nCAgBBvKg2UEkABKVzcVGcNiOAANPhBvrgSAASZanC5XCBxUJk4YAXyC-w2wLBELiRIANPcEQjrgQQM4fAAWQSiPkPIUkA42OCzBDiwXyx5AkGgnzhADiAFEyuFZRqSCzTUKWTciHLzXbkMgSAB5KhgOgkQ1lEi0mEQZwkUGYADWgc8BxIZJcJBgCHQMTocTtUFQJChdOujK+wxIAEIGAwSPqjeE7kiUW9SeS-oCueDIb76Ta7eXUbt9sciQcIBAYOLHbEQvUbHFeOhgETm+sLaYWUQzKpmOpNNoePwhGIDHIFGJClZbPYnK53J5mlQfH5NKRgqEIkzlQEUr50plb+EyCCyAULPuSuVKtUGx1A0vBNC0SRWOMpjLOEwBwFEAD6QwjBk4RKDksx5MkLILouy4BKuugbhIMjboozBmEAA)

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
