---
description: Require client certificates to authenticate API requests with mutual TLS.
title: Mutual TLS (mTLS)
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/api-shield/llms.txt
> Use this file to discover all available pages before exploring further.

# Mutual TLS (mTLS)

Last updated May 6, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/api-shield/security/mtls/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Note

While API Shield is not required to use mTLS, many teams may use mTLS to protect their APIs.

[Mutual TLS (mTLS)](https://www.cloudflare.com/learning/access-management/what-is-mutual-tls/) authentication is a common security practice that uses client certificates to ensure traffic between client and server is bidirectionally secure and trusted. mTLS also allows requests that do not authenticate via an identity provider — such as Internet-of-things (IoT) devices — to demonstrate they can reach a given resource.

Use mTLS when you need to verify the identity of API clients, such as mobile applications, IoT devices, or services that connect to your API.

![mTLS sequence diagram](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=900,height=1256,format=webp/_astro/api-shield-call-sequence.DjXyNgan.png)

mTLS also supports [gRPC ↗](https://grpc.io/docs/what-is-grpc/introduction/)\-based APIs, which use binary formats such as protocol buffers rather than JSON.

## Setup

To set up mTLS for one or more hosts using the dashboard, refer to [Configure mTLS](https://developers.cloudflare.com/api-shield/security/mtls/configure/).

## Availability

All Cloudflare plans can set up mTLS with a Cloudflare-managed certificate authority (CA). Enterprise customers can [upload up to five non-Cloudflare CAs](https://developers.cloudflare.com/ssl/client-certificates/byo-ca/). For higher limits, contact your account team.

## Limitations

When using Yubikeys, the browser may prompt for unlocking the key due to a problem in Yubikey's PKCS#11 library.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/api-shield/security/mtls/#page","headline":"Mutual TLS (mTLS) · Cloudflare API Shield docs","description":"Require client certificates to authenticate API requests with mutual TLS.","url":"https://developers.cloudflare.com/api-shield/security/mtls/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-05-06","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["mTLS"]}
```
