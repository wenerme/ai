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

* [  JavaScript ](#tab-panel-9532)
* [  TypeScript ](#tab-panel-9533)
* [  Python ](#tab-panel-9534)

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

[Run Worker in Playground](https://workers.cloudflare.com/playground#LYVwNgLglgDghgJwgegGYHsHALQBM4RwDcABAEbogB2+CAngLzbPYZb6HbW5QDGU2AAwAOAOwAWQaOEA2cQCZh8gFwsWbYBzhcafASIlTZCpQFgAUAGF0VCAFNb2ACJQAzjHSuo0G8pIa8AmISKjhgOwYAIigaOwAPADoAK1dI0lQoMAcwiOjYxJTIi2tbBwhsABU6GDs-OBgYMD4CKBtkJLgANzhXXgRYCABqYHRccDsLC3iPJBJcO1Q4cAgSAG9zEhIeuipefzsIXgALAAoEOwBHEDtXCABKNY3N-2peHyoSAFkDo9GAOXQEAAgmAwOgAO52XBnS7XW4PdbPZ7nCAgBAfKh2cEkABKNw8VFcdhOAANvhBfrgSAASVbnK43CAJcIU0YAXxCgK2oIhUISJIANI8kUjbgQQK4-JIAKwCp4ikhHOxweYISXChXPEFg8F+SIAcQAohVInLNSQ2WaRWy7kR5Rb7chkCQAPJUMB0EhGiokelwiCuEjgzAAayD3iOJApbhIMAQ6DidAS9qgqBIMIZt2ZP1GJAAhAwGCQDcbIg8UWiPuTKQDgTzIdC-YzbfaK+j9odTiSjhAIDBJU74mFGnYErx0MASS3NpbzGyiBY1MwNFodDx+EIxJJpHJFPJijZ7I4XO5PN5WlQ-AEtKRQuEoiyVUE0v5Mtl75EyGCyEUrIeypU1S1FsDRNLwLRtCkNiTOYqyRMAcAxAA+iMYxZJEyh5PMBSpGyi5LiuQRrnom6GDuJjyMwFhAA)

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
