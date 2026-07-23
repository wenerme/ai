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

Last updated Apr 16, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/load-balancing/understand-basics/adaptive-routing/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Adaptive routing controls features that modify the routing of requests to pools and endpoints in response to dynamic conditions, such as during the interval between active health monitoring requests.

Zero-downtime failover will trigger a single retry only if there is another healthy endpoint in the pool and a [521, 522, 523, 525 or 526 error code](https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-5xx-errors/error-521/) is occurring. No other error codes will trigger a zero-downtime failover operation.

## Failover across pools

When there are no healthy endpoints in the same pool, failover across pools extend the zero-downtime failover of requests to healthy endpoints in alternate pools according to the failover order defined by traffic and endpoint steering.

### Enable failover across pools

1. In the Cloudflare dashboard, go to the **Load Balancing** page.
[Go to **Load Balancing** ↗](https://dash.cloudflare.com/?to=/:account/load-balancing)
2. Navigate to your Load Balancers and select **Edit**.
3. From **Adaptive Routing**, enable **Failover across pools**.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/load-balancing/understand-basics/adaptive-routing/#page","headline":"Adaptive routing · Cloudflare Load Balancing docs","description":"Route traffic based on origin health and latency.","url":"https://developers.cloudflare.com/load-balancing/understand-basics/adaptive-routing/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
