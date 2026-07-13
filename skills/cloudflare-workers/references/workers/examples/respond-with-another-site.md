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

Respond to the Worker request with the response from another website (example.com in this example).

If you want to get started quickly, click on the button below.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/cloudflare/docs-examples/tree/main/workers/respond-with-another-site)

This creates a repository in your GitHub account and deploys the application to Cloudflare Workers.

* [  JavaScript ](#tab-panel-12344)
* [  TypeScript ](#tab-panel-12345)
* [  Python ](#tab-panel-12346)

**JavaScript**

```js
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

[Run Worker in Playground](https://workers.cloudflare.com/playground#LYVwNgLglgDghgJwgegGYHsHALQBM4RwDcABAEbogB2+CAngLzbPYZb6HbW5QDGU2AAwBOYSMEA2YQEZhAdgBMALhYs2wDnC40+AkWLFTZigLAAoAMLoqEAKY3sAESgBnGOhdRo1pSXV4CYhIqOGBbBgAiKBpbAA8AOgArFwjSVCgwe1DwqJiE5IjzKxt7CGwAFToYW184GBgwPgIoa2REuAA3OBdeBFgIAGpgdFxwW3NzOPckElxbVDhwCBIAbzMSEm66Kl4-WwheAAsACgRbAEcQWxcIAEpV9Y2-al5vKhIAWX3DkYA5dAgAEEwGB0AB3Wy4U4XK43e5rJ5PM4QEAId5UWxgkgAJWu7ioLlsxwABl8ID9cCQACQrM6Xa4QeJhckjAC+wQBmxB4Mh8WJABoHojETcCCAXL4ACyCACs-MewpIh1scDmCAlQsVT2BoLBvgiAHEAKLlCLyrUkVnm4Ws25EBWWh3IZAkADyVDAdBIxvKJDpsIgLhIYMwAGtg15DiRya4SDAEOhYnR4g6oKgSND6Tcmd8RiQAIQMBgkQ0miL3ZGo95kin-IHciFQ-0Mu0OytovYHE7Ew4QCAwCXOuKhBq2eK8dDAYmtjZWsysojmVTMdSabQ8fhCUTiIzyBRFax2BzONweLwtKi+fyaUghMKRZmqwKpPwZLL3iJkUFkQqWQ+lCoqhqTZ6kaXhmlaZJrAmMwVgiYA4GiAB9YZRkyCIlFyOZ8hSVkl2XVdAnXXQtwMSQZD3ZhzCAA)

**TypeScript**

```ts
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

**Python**

```py
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
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/examples/respond-with-another-site/#page","headline":"Respond with another site · Cloudflare Workers docs","description":"Respond to the Worker request with the response from another website (example.com in this example).","url":"https://developers.cloudflare.com/workers/examples/respond-with-another-site/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Middleware","JavaScript","TypeScript","Python"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/examples/","name":"Examples"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/examples/respond-with-another-site/","name":"Respond with another site"}}]}
```
