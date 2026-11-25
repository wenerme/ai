---
agent:
  instructions: "Use this search API to find relevant content across this site with keywords or natural-language queries, instead of crawling individual pages. Results are returned in Markdown."
  endpoint: "https://developers.cloudflare.com/.well-known/search?q={query}"
  method: "GET"
  documentation: "https://developers.cloudflare.com/ai-search/how-to/search-for-agents/"
description: Cloudflare products and features supported on the China Network operated by JD Cloud.
title: Available products and features
image: https://developers.cloudflare.com/china-network/reference/available-products/og.png?v=f4dac81645ef67d5
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/china-network/llms.txt
> Use this file to discover all available pages before exploring further.

# Available products and features

The following products and features are available on the Cloudflare China Network operated by JD Cloud:

## Application Services

| Product/Feature | Description |
| --- | --- |
| [Authoritative DNS](https://developers.cloudflare.com/china-network/concepts/china-dns/) | Authoritative DNS resolution inside Mainland China. |
| [CDN/Cache](https://developers.cloudflare.com/cache/) | Core cache features. Static cache only. Does not support Cache Reserve or Tiered Cache. |
| [Image Transformations](https://developers.cloudflare.com/images/) | Optimize image format at the edge to fit a domain's layout. |
| [DDoS Protection](https://developers.cloudflare.com/ddos-protection/) | Layer 7 (application layer) protection against DDoS attacks such as HTTP flood attacks, WordPress Pingback attacks, HULK attacks, and LOIC attacks. |
| [Managed rules](https://developers.cloudflare.com/waf/managed-rules/) | Pre-configured OWASP rulesets and Cloudflare managed rulesets. |
| [Custom rules](https://developers.cloudflare.com/waf/custom-rules/) | Custom WAF rules. Supports uploaded content scanning and managed challenges. |
| [Rate limiting rules](https://developers.cloudflare.com/waf/rate-limiting-rules/) | Define rate limits for incoming requests matching an expression, and the action to take when those rate limits are reached. |
| [Content scanning](https://developers.cloudflare.com/waf/detections/malicious-uploads/) | Attempts to detect content objects, such as uploaded files, and scans them for malicious signatures like malware. |
| [Client-side security](https://developers.cloudflare.com/client-side-security/) (formerly Page Shield) | Simplifies external script management by tracking loaded resources like scripts and providing alerts when it detects new resources or malicious scripts. |
| [Bot Management](https://developers.cloudflare.com/bots/) | Provides bot identification and protection for a domain. Only supports certain Machine Learning (ML) models. |
| [Turnstile](https://developers.cloudflare.com/turnstile/get-started/) | Serves challenges and validates tokens through endpoints within Mainland China for accounts with access. A China Network subscription is not required. |
| [Argo Smart Routing](https://developers.cloudflare.com/argo-smart-routing/) | Layer 7 (application layer) traffic smart-routed more efficiently to origin. |
| [Rules](https://developers.cloudflare.com/rules/)<sup>[1](#user-content-fn-1)</sup> | Make adjustments to requests and responses, configure Cloudflare settings, and trigger specific actions for matching requests. |
| [Load Balancing](https://developers.cloudflare.com/load-balancing/additional-options/load-balancing-china/) | Maximize application performance and availability. |

## Developer Services

| Product/Feature | Description |
| --- | --- |
| [Workers](https://developers.cloudflare.com/workers/) | A serverless execution environment running on the Cloudflare global network. |
| [Workers KV](https://developers.cloudflare.com/kv/) | Configuration data, service routing metadata, personalization (A/B testing). |
| [R2](https://developers.cloudflare.com/r2/)<sup>[2](#user-content-fn-2)</sup> | Object storage for all your data. |
| [Assets](https://developers.cloudflare.com/workers/static-assets/) | Upload static assets (HTML, CSS, images and other files) as part of your Worker — Cloudflare will handle caching and serving them to web browsers. |
| [Environment variables](https://developers.cloudflare.com/workers/configuration/environment-variables/) | Attach text strings or JSON values to your Worker. |
| [Images](https://developers.cloudflare.com/images/optimization/binding/)<sup>[3](#user-content-fn-3)</sup> | Store, transform, optimize, and deliver images at scale. |
| [Rate Limiting](https://developers.cloudflare.com/workers/runtime-apis/bindings/rate-limit/) | Define rate limits and write code around them in your Worker. |
| [Secrets](https://developers.cloudflare.com/workers/configuration/secrets/) | Attach encrypted text values to your Worker. |
| [Service bindings](https://developers.cloudflare.com/workers/runtime-apis/bindings/service-bindings/) | Service bindings allow one Worker to call into another, without going through a publicly-accessible URL. |
| [Tail Workers](https://developers.cloudflare.com/workers/observability/logs/tail-workers/) | Receives information about the execution of other Workers. |
| [Version metadata](https://developers.cloudflare.com/workers/runtime-apis/bindings/version-metadata/) | Access metadata associated with a version from inside the Workers runtime. |
| [Workers for Platforms](https://developers.cloudflare.com/cloudflare-for-platforms/workers-for-platforms/) | Deploy custom code on behalf of your users or let your users directly deploy their own code to your platform, managing infrastructure. |

## Network Services

| Feature | Description |
| --- | --- |
| [IPv6](https://developers.cloudflare.com/network/ipv6-compatibility/) | All data centers have IPv6 support by default. |
| [SSL/TLS](https://developers.cloudflare.com/ssl/) | Customer Certificate, Dedicated Certificate, Universal Certificate, Custom, ACM (Dedicated), Universal SSL. |
| mTLS<sup>[4](#user-content-fn-4)</sup> | Mutual TLS authentication between clients and the Cloudflare edge, and between the Cloudflare edge and your origin. |
| [HTTP/3 (QUIC) ↗︎](https://www.cloudflare.com/learning/performance/what-is-http3/) | The latest version of the HTTP protocol to optimize page loading performance. |
| [WebSockets](https://developers.cloudflare.com/workers/runtime-apis/websockets/) | Real-time communication with Cloudflare Workers serverless functions. |

## Zero Trust Services

Refer to [Global Acceleration](https://developers.cloudflare.com/china-network/concepts/global-acceleration/) for more information.

## Other Services

| Feature | Description |
| --- | --- |
| [Instant Logs](https://developers.cloudflare.com/logs/instant-logs/) | Live Tail your Cloudflare HTTP logs in the Cloudflare dashboard. |
| [Logpush](https://developers.cloudflare.com/logs/logpush/) | Push your Cloudflare HTTP logs to a storage service. |

For more details or specific product features, refer to the [FAQ](https://developers.cloudflare.com/china-network/faq/#products-and-features) page or contact your account team.

## Footnotes

1. [Origin Rules](https://developers.cloudflare.com/rules/origin-rules/) require that China Network is enabled on the original zone (the one visitors are accessing). The target zone does not need to be on the China Network, but it must be accessible from Mainland China. Otherwise, visitors will receive a [1016 error](https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-1xxx-errors/error-1016/) along with an [HTTP 530 status code](https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-5xx-errors/error-530/). [↩](#user-content-fnref-1)
2. R2 buckets cannot be created within Mainland China and [custom domains](https://developers.cloudflare.com/r2/buckets/public-buckets/#add-your-domain-to-cloudflare) are not supported within Mainland China. However, R2 can be extended into Mainland China through [Global Acceleration](https://developers.cloudflare.com/china-network/concepts/global-acceleration/). [↩](#user-content-fnref-2)
3. Image Resizing works [within Workers](https://developers.cloudflare.com/images/optimization/transformations/transform-via-workers/), but may not be available [through URL format](https://developers.cloudflare.com/images/optimization/features/). [↩](#user-content-fnref-3)
4. mTLS on the China Network is supported in two configurations: client-to-edge, using [mTLS with Cloudflare Access](https://developers.cloudflare.com/cloudflare-one/access-controls/service-credentials/mutual-tls-authentication/) (including Client Certificate Forwarding); and edge-to-origin, using [Authenticated Origin Pulls](https://developers.cloudflare.com/ssl/origin-configuration/authenticated-origin-pull/). [↩](#user-content-fnref-4)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/china-network/reference/available-products/#page","headline":"Available products and features","description":"Cloudflare products and features supported on the China Network operated by JD Cloud.","url":"https://developers.cloudflare.com/china-network/reference/available-products/","inLanguage":"en","image":"https://developers.cloudflare.com/china-network/reference/available-products/og.png?v=f4dac81645ef67d5","dateModified":"2026-11-16","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
