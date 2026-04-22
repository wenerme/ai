---
title: Cloudflare Privacy Gateway
description: Privacy Gateway is a managed Oblivious HTTP (OHTTP) relay service that hides client IP addresses from application backends.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/privacy-gateway/index.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Cloudflare Privacy Gateway

Implements the Oblivious HTTP IETF standard to improve client privacy.

 Enterprise-only 

[Privacy Gateway ↗](https://blog.cloudflare.com/building-privacy-into-internet-standards-and-how-to-make-your-app-more-private-today/) is a managed service deployed on Cloudflare’s global network that implements part of the [Oblivious HTTP (OHTTP) IETF ↗](https://www.ietf.org/archive/id/draft-thomson-http-oblivious-01.html) standard. The goal of Privacy Gateway and Oblivious HTTP is to hide the client's IP address when interacting with an application backend.

OHTTP introduces a trusted third party between client and server, called a relay, whose purpose is to forward encrypted requests and responses between client and server. These messages are encrypted between client and server such that the relay learns nothing of the application data, beyond the length of the encrypted message and the server the client is interacting with.

---

## Availability

Privacy Gateway is currently in closed beta – available to select privacy-oriented companies and partners. If you are interested, [contact us ↗](https://www.cloudflare.com/lp/privacy-edge/).

---

## Features

###  Get started 

Learn how to set up Privacy Gateway for your application.

[ Get started ](https://developers.cloudflare.com/privacy-gateway/get-started/) 

###  Legal 

Learn about the different parties and data shared in Privacy Gateway.

[ Learn more ](https://developers.cloudflare.com/privacy-gateway/reference/legal/) 

###  Metrics 

Learn about how to query Privacy Gateway metrics.

[ Learn more ](https://developers.cloudflare.com/privacy-gateway/reference/metrics/) 

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/privacy-gateway/","name":"Privacy Gateway"}}]}
```
