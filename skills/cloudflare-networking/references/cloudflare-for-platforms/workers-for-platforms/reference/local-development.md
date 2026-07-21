---
description: Test your dynamic dispatch Worker locally while connecting to deployed user Workers in a Workers for Platforms namespace.
title: Local development
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-for-platforms/llms.txt
> Use this file to discover all available pages before exploring further.

#  Local development

Last updated Jun 25, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/cloudflare-for-platforms/workers-for-platforms/reference/local-development/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

Test changes to your [dynamic dispatch Worker](https://developers.cloudflare.com/cloudflare-for-platforms/workers-for-platforms/how-workers-for-platforms-works/#dynamic-dispatch-worker) by running the dynamic dispatch Worker locally but connecting it to user Workers that have been deployed to Cloudflare.

Note

Consider using a staging namespace to test changes safely before deploying to production.

This is helpful when:

* **Testing routing changes** and validating that updates continue to work with deployed User Workers
* **Adding new middleware** like authentication, rate limiting, or logging to the dynamic dispatch Worker
* **Debugging issues** in the dynamic dispatcher that may be impacting deployed User Workers

### How to use remote dispatch namespaces

In the dynamic dispatch Worker's Wrangler file, configure the [dispatch namespace binding](https://developers.cloudflare.com/workers/wrangler/configuration/#dispatch-namespace-bindings-workers-for-platforms) to connect to the remote namespace by setting [remote = true](https://developers.cloudflare.com/workers/local-development/#remote-bindings):

```jsonc
{
  "dispatch_namespaces": [
    {
      "binding": "DISPATCH_NAMESPACE",
      "namespace": "production",
      "remote": true
		}
  ]
}
```

```toml
[[dispatch_namespaces]]
binding = "DISPATCH_NAMESPACE"
namespace = "production"
remote = true
```

This tells your dispatch Worker that's running locally to connect to the remote `production` namespace. When you run `wrangler dev`, your Dispatch Worker will route requests to the User Workers deployed in that namespace.

For more information about remote bindings during local development, refer to [remote bindings documentation](https://developers.cloudflare.com/workers/local-development/#remote-bindings).

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-for-platforms/workers-for-platforms/reference/local-development/#page","headline":"Local development · Cloudflare for Platforms docs","description":"Test your dynamic dispatch Worker locally while connecting to deployed user Workers in a Workers for Platforms namespace.","url":"https://developers.cloudflare.com/cloudflare-for-platforms/workers-for-platforms/reference/local-development/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-06-25","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
