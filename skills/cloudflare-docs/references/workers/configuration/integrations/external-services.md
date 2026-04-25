---
title: External Services
description: Connect Cloudflare Workers to external services using libraries, SDKs, and secure authentication.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

# External Services

Many external services provide libraries and SDKs to interact with their APIs. While many Node-compatible libraries work on Workers right out of the box, some, which implement `fs`, `http/net`, or access the browser `window` do not directly translate to the Workers runtime, which is v8-based.

## Authentication

If your service requires authentication, use Wrangler secrets to securely store your credentials. To do this, create a secret in your Cloudflare Workers project using the following [wrangler secret](https://developers.cloudflare.com/workers/wrangler/commands/general/#secret) command:

Terminal window

```

wrangler secret put SECRET_NAME


```

Then, retrieve the secret value in your code using the following code snippet:

JavaScript

```

const secretValue = env.SECRET_NAME;


```

Then use the secret value to authenticate with the external service. For example, if the external service requires an API key for authentication, include the secret in your library's configuration.

For services that require mTLS authentication, use [mTLS certificates](https://developers.cloudflare.com/workers/runtime-apis/bindings/mtls) to present a client certificate.

Use [Custom Domains](https://developers.cloudflare.com/workers/configuration/routing/custom-domains/) when communicating with external APIs, which treat your Worker as your core application.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/configuration/","name":"Configuration"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/configuration/integrations/","name":"Integrations"}},{"@type":"ListItem","position":5,"item":{"@id":"/workers/configuration/integrations/external-services/","name":"External Services"}}]}
```
