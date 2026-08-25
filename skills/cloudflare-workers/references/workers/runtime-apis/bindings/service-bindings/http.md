---
description: Facilitate Worker-to-Worker communication by forwarding Request objects.
title: HTTP
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

# HTTP

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/workers/runtime-apis/bindings/service-bindings/http/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Worker A that declares a Service binding to Worker B can forward a [Request](https://developers.cloudflare.com/workers/runtime-apis/request/) object to Worker B, by calling the `fetch()` method that is exposed on the binding object.

For example, consider the following Worker that implements a [fetch() handler](https://developers.cloudflare.com/workers/runtime-apis/handlers/fetch/):

```jsonc
{
	"$schema": "./node_modules/wrangler/config-schema.json",
	"name": "worker_b",
	"main": "./src/workerB.js"
}
```

```toml
"$schema" = "./node_modules/wrangler/config-schema.json"
name = "worker_b"
main = "./src/workerB.js"
```

```js
export default {
  async fetch(request, env, ctx) {
    return new Response("Hello World!");
  }
}
```

The following Worker declares a binding to the Worker above:

```jsonc
{
	"$schema": "./node_modules/wrangler/config-schema.json",
	"name": "worker_a",
	"main": "./src/workerA.js",
	"services": [
		{
			"binding": "WORKER_B",
			"service": "worker_b"
		}
	]
}
```

```toml
"$schema" = "./node_modules/wrangler/config-schema.json"
name = "worker_a"
main = "./src/workerA.js"

[[services]]
binding = "WORKER_B"
service = "worker_b"
```

And then can forward a request to it:

```js
export default {
	async fetch(request, env) {
		return await env.WORKER_B.fetch(request);
	},
};
```

Note

If you construct a new request manually, rather than forwarding an existing one, ensure that you provide a valid and fully-qualified URL with a hostname. For example:

```js
export default {
  async fetch(request, env) {
    // provide a valid URL
    let newRequest = new Request("https://valid-url.com", { method: "GET" });
    let response = await env.WORKER_B.fetch(newRequest);
    return response;
  }
};
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/runtime-apis/bindings/service-bindings/http/#page","headline":"Service bindings - HTTP · Cloudflare Workers docs","description":"Facilitate Worker-to-Worker communication by forwarding Request objects.","url":"https://developers.cloudflare.com/workers/runtime-apis/bindings/service-bindings/http/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
