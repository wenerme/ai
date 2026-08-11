---
description: How Cloudflare encrypts and processes HTTP requests across its global network.
title: Default HTTP Privacy
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/data-localization/llms.txt
> Use this file to discover all available pages before exploring further.

# Default HTTP Privacy

Last updated May 5, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/data-localization/regional-services/http-requests/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Cloudflare runs one of the largest global anycast networks in the world — a network architecture where traffic is automatically routed to the nearest available data center. All current data center locations are accessible on the [network map ↗](https://www.cloudflare.com/network/).

Within Cloudflare data centers, and between the Cloudflare network and your origin server, traffic is encrypted during transit. You can select which [encryption mode](https://developers.cloudflare.com/ssl/origin-configuration/ssl-modes/) (controlling how strictly Cloudflare validates your server's certificate) and which [cipher suites](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/cipher-suites/) (the specific encryption algorithms used for the connection) to use.

Additionally, all request and response processing within a Cloudflare data center occurs in memory — traffic content is handled by automated systems and is not written to disk, except for eligible content for caching or Cache Rules you have configured. Automated controls prevent Cloudflare personnel from accessing traffic content in the processing pipeline. All cache disks are encrypted at rest (meaning data is encrypted when stored on disk, in addition to being encrypted during transmission).

![HTTP requests flow](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=6136,height=4012,format=webp/_astro/http-requests-flow.BQhq9Ov4.png)

At a high level, when an end user's device connects to any Cloudflare data center, the request is processed in the following way:

1. Certain types of requests that can be used for cyber attacks are immediately dropped based on the addressing information (layer 3 / network layer).
2. Next, the encrypted request is decrypted (TLS termination) and inspected by the Cloudflare security and performance products you have configured — for example, Configuration Rules, WAF Custom Rules, and Rate Limiting Rules — applied in the order defined by the [traffic sequence ↗](https://blog.cloudflare.com/traffic-sequence-which-product-runs-first/). This process enables the detection and prevention of a variety of cyber attacks, including application-layer (layer 7) DDoS attacks, automated bot traffic, credential stuffing (attackers using stolen username/password combinations), and SQL injection (attackers inserting malicious database commands into web requests), among others.
3. The inspected request is then passed to the caching layer. If a cached copy of the requested content is available, it is served directly to the user. If not, the request is forwarded to your origin server. Traffic between the Cloudflare data center and your origin server is encrypted, unless you have configured a different encryption mode.
4. When the response arrives from your origin server, any static and eligible content is cached onto encrypted disks. The response then passes back through your configured security and performance products before being returned to the user.

By default, Cloudflare performs TLS termination (decryption of HTTPS traffic) in every data center globally — wherever the end user connects to a website or application behind Cloudflare. Customers who need to restrict where decryption occurs can configure [Regional Services](https://developers.cloudflare.com/data-localization/regional-services/) to specify which regions handle TLS termination and traffic processing.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/data-localization/regional-services/http-requests/#page","headline":"Default HTTP Privacy · Cloudflare Data Localization Suite docs","description":"How Cloudflare encrypts and processes HTTP requests across its global network.","url":"https://developers.cloudflare.com/data-localization/regional-services/http-requests/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["TLS","Privacy"]}
```
