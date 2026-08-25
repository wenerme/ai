---
description: Authenticate requests with mutual TLS certificates.
title: Mutual TLS (mTLS)
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt
> Use this file to discover all available pages before exploring further.

# Mutual TLS (mTLS)

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/learning-paths/application-security/default-traffic-security/mtls/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Mutual TLS (mTLS) authentication uses client certificates to ensure traffic between client and server is bidirectionally secure and trusted. mTLS also allows requests that do not authenticate via an identity provider — such as Internet-of-things (IoT) devices — to demonstrate they can reach a given resource.

![mTLS sequence diagram](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=900,height=1256,format=webp/_astro/api-shield-call-sequence.DjXyNgan.png)

Support includes [gRPC ↗](https://grpc.io/docs/what-is-grpc/introduction/)\-based APIs, which use binary formats such as protocol buffers rather than JSON.

## Creating a mTLS rule

1. In the Cloudflare dashboard, go to **Client Certificates** page.
[Go to **Client Certificates** ↗](https://dash.cloudflare.com/?to=/:account/:zone/ssl-tls/client-certificates)
2. Select **Create a mTLS rule**.
3. In **Custom rules**, several rule parameters have already been filled in. Enter the URI path you want to protect in **Value**.
4. (Optional) Add a `Hostname` field and enter the mTLS-enabled hostnames you wish to protect in **Value**.
5. In **Choose action**, select `Block`.
6. Select **Deploy** to make the rule active.

Once you have deployed your mTLS rule, any requests without a [valid client certificate](https://developers.cloudflare.com/ssl/client-certificates/) will be blocked.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/learning-paths/application-security/default-traffic-security/mtls/#page","headline":"Mutual TLS (mTLS) · Cloudflare Learning Paths","description":"Authenticate requests with mutual TLS certificates.","url":"https://developers.cloudflare.com/learning-paths/application-security/default-traffic-security/mtls/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
