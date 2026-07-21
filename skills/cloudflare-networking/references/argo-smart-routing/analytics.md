---
description: View latency improvements and response time data for Argo Smart Routing.
title: Analytics
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/argo-smart-routing/llms.txt
> Use this file to discover all available pages before exploring further.

#  Analytics

Last updated May 5, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/argo-smart-routing/analytics/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

Cloudflare provides analytics to show the performance benefits of Argo Smart Routing.

You can access Argo analytics for your domain in the [Cloudflare dashboard ↗](https://dash.cloudflare.com/) at **Analytics** \> **Performance**. For information on all analytics in the dashboard, refer to [Analytics](https://developers.cloudflare.com/analytics/).

## How it works

Analytics collects data based on the time-to-first-byte (TTFB) from your origin to the Cloudflare network. TTFB is the delay between when Cloudflare sends a request to your server and when it receives the first byte in response. Argo Smart Routing optimizes your server's network transit time to minimize this delay.

Note

Detailed performance data within **Origin Performance (Argo)** will only display if Argo has routed at least 500 origin requests within the last 48 hours.

## Types of analytics

The dashboard displays two different views for performance data:

* **Origin Response Time**: A histogram shows response time from your origin to the Cloudflare network. The blue bars show time-to-first-byte (TTFB) without Argo, while the orange bars show TTFB where Argo found a Smart Route.
* **Geography**: A map shows the improvement in response time at each Cloudflare data center.

  * A negative value indicates that requests from that location would not have benefited from Argo Smart Routing, so instead would have been routed directly.

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/argo-smart-routing/analytics/#page","headline":"Analytics · Cloudflare Argo Smart Routing docs","description":"View latency improvements and response time data for Argo Smart Routing.","url":"https://developers.cloudflare.com/argo-smart-routing/analytics/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Analytics"]}
```
