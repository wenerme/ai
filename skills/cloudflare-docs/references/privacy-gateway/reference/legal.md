---
title: Legal
description: Privacy Gateway is a managed gateway service deployed on Cloudflare’s global network that implements the Oblivious HTTP IETF standard to improve client privacy when connecting to an application backend.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/privacy-gateway/reference/legal.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Legal

Privacy Gateway is a managed gateway service deployed on Cloudflare’s global network that implements the Oblivious HTTP IETF standard to improve client privacy when connecting to an application backend.

OHTTP introduces a trusted third party (Cloudflare in this case), called a relay, between client and server. The relay’s purpose is to forward requests from client to server, and likewise to forward responses from server to client. These messages are encrypted between client and server such that the relay learns nothing of the application data, beyond the server the client is interacting with.

The Privacy Gateway service follows [Cloudflare’s privacy policy ↗](https://www.cloudflare.com/privacypolicy/).

## What Cloudflare sees

While Cloudflare will never see the contents of the encrypted application HTTP request proxied through the Privacy Gateway service – because the client will first connect to the OHTTP relay server operated in Cloudflare’s global network– Cloudflare will see the following information: the connecting device’s IP address, the application service they are using, including its DNS name and IP address, and metadata associated with the request, including the type of browser, device operating system, hardware configuration, and timestamp of the request ("Privacy Gateway Logs").

## What Cloudflare stores

Cloudflare retains the Privacy Gateway Logs information for the most recent quarter plus one month (approximately 124 days).

## What Privacy Gateway customers see

* The application content of requests.
* The IP address and associated metadata of the Cloudflare Privacy Gateway server the request came from.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/privacy-gateway/","name":"Privacy Gateway"}},{"@type":"ListItem","position":3,"item":{"@id":"/privacy-gateway/reference/","name":"Reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/privacy-gateway/reference/legal/","name":"Legal"}}]}
```
