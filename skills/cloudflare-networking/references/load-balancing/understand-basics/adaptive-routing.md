---
description: Route traffic based on origin health and latency.
title: Adaptive routing
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/load-balancing/llms.txt
> Use this file to discover all available pages before exploring further.

# Adaptive routing

Last updated Jul 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/load-balancing/understand-basics/adaptive-routing/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Adaptive routing controls features that modify the routing of requests to pools and endpoints in response to dynamic conditions, such as during the interval between active health monitoring requests.

Zero-downtime failover will trigger a single retry only if there is another healthy endpoint in the pool and a [521, 522, 523, 525 or 526 error code](https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-5xx-errors/error-521/) is occurring. No other error codes will trigger a zero-downtime failover operation.

## Failover across pools

When there are no healthy endpoints in the same pool, failover across pools extend the zero-downtime failover of requests to healthy endpoints in alternate pools according to the failover order defined by traffic and endpoint steering.

Geo-steering limitation

When using [geo-steering](https://developers.cloudflare.com/load-balancing/understand-basics/traffic-steering/steering-policies/geo-steering/), failover across pools only considers pools within the same geographic grouping. If your NA pool becomes unhealthy, traffic will **not** automatically fail over to your EU pool — it will go to the global fallback pool instead.

To enable cross-region failover, include the desired fallback pool as an additional pool within each region's pool list.

### Enable failover across pools

1. In the Cloudflare dashboard, go to the **Load Balancing** page.
[Go to **Load Balancing** ↗](https://dash.cloudflare.com/?to=/:account/load-balancing)
2. Navigate to your Load Balancers and select **Edit**.
3. From **Adaptive Routing**, enable **Failover across pools**.

## HTTP/2 GOAWAY handling

When an origin sends a GOAWAY frame, Cloudflare stops sending new requests on that connection but does not mark the endpoint as unhealthy. Safe-to-retry requests (typically GET) are automatically retried on a new connection. Non-idempotent requests (such as POST or PUT) may not be retried unless the request was not yet sent on the closing connection.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/load-balancing/understand-basics/adaptive-routing/#page","headline":"Adaptive routing · Cloudflare Load Balancing docs","description":"Route traffic based on origin health and latency.","url":"https://developers.cloudflare.com/load-balancing/understand-basics/adaptive-routing/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-07-23","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
