---
title: Mutual TLS (mTLS)
description: Mutual TLS (mTLS) authentication is a common security practice that uses client certificates to ensure traffic between client and server is bidirectionally secure and trusted. mTLS also allows requests that do not authenticate via an identity provider — such as Internet-of-things (IoT) devices — to demonstrate they can reach a given resource.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/api-shield/security/mtls/index.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Mutual TLS (mTLS)

Note

While API Shield is not required to use mTLS, many teams may use mTLS to protect their APIs.

[Mutual TLS (mTLS)](https://www.cloudflare.com/learning/access-management/what-is-mutual-tls/) authentication is a common security practice that uses client certificates to ensure traffic between client and server is bidirectionally secure and trusted. mTLS also allows requests that do not authenticate via an identity provider — such as Internet-of-things (IoT) devices — to demonstrate they can reach a given resource.

![mTLS sequence diagram](https://developers.cloudflare.com/_astro/api-shield-call-sequence.DjXyNgan_CJbMD.webp) 

Support includes [gRPC ↗](https://grpc.io/docs/what-is-grpc/introduction/)\-based APIs, which use binary formats such as protocol buffers rather than JSON.

## Setup

To set up mTLS for one or more hosts using the dashboard, refer to [Configure mTLS](https://developers.cloudflare.com/api-shield/security/mtls/configure/).

## Availability

All Cloudflare plans can set up mTLS with a Cloudflare-managed certificate authority (CA). Enterprise customers can [upload up to five non-Cloudflare CAs](https://developers.cloudflare.com/ssl/client-certificates/byo-ca/). For higher limits, contact your account team.

## Limitations

When using Yubikeys, the browser may prompt for unlocking the key due to a problem in Yubikey's PKCS#11 library.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/api-shield/","name":"API Shield"}},{"@type":"ListItem","position":3,"item":{"@id":"/api-shield/security/","name":"Security"}},{"@type":"ListItem","position":4,"item":{"@id":"/api-shield/security/mtls/","name":"Mutual TLS (mTLS)"}}]}
```
