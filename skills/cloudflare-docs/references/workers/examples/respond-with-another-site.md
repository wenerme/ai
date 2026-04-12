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

* [  JavaScript ](#tab-panel-7487)
* [  TypeScript ](#tab-panel-7488)
* [  Python ](#tab-panel-7489)

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

[Run Worker in Playground](https://workers.cloudflare.com/playground#LYVwNgLglgDghgJwgegGYHsHALQBM4RwDcABAEbogB2+CAngLzbPYZb6HbW5QDGU2AAwBWACwAmCQA4A7AE4AzADY5ALhYs2wDnC40+AkROnzlcgLAAoAMLoqEAKb3sAESgBnGOndRod1SRaeATEJFRwwA4MAERQNA4AHgB0AFbu0aSoUGBOEVGx8clp0Va29k4Q2AAqdDAOAXAwMGB8BFB2yClwAG5w7rwIsBAA1MDouOAOVlaJXkgkuA6ocOAQJADeliQkfXRUvIEOELwAFgAUCA4AjiAO7hAAlBtb24HUvH5UJACyRyfjADl0BAAIJgMDoADuDlwF2ut3uT02r1elwgIAQXyoDkhJAASncvFR3A4zgADX4Qf64EgAEnWlxudwgSUiVPGAF8wsCduCoTCkmSADTPFEo+4EEDuAKiERCl5ikgnBxwRYIaWixWvMEQyEBaIAcQAolVovKtSQOeaxRyHkQFZaHchkCQAPJUMB0EjGqokRkIiDuEiQzAAa2DvhOJCpHhIMAQ6ASdCSDqgqBIcKZ91Zf3GJAAhAwGCRDSbok80RivpTqUDQXzobD-cy7Q7K5jDsdzmSThAIDBpc7EhFmg4krx0MAya3tlbLByiFYNMwtDo9Dx+EIxJJxLJFCpSnZHM43J5vL52lQAkEdKRwpEYmzVSEMoFsrkH9EyBCyCUbEeKmqWp6h2JoWl4NoOjSOxpksdZomAOA4gAfTGCYcmiVQCkWIp0g5Jdl1XEJ1wMLdjF3UwVGYKwgA)

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

Explain Code

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

Explain Code

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/examples/","name":"Examples"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/examples/respond-with-another-site/","name":"Respond with another site"}}]}
```
