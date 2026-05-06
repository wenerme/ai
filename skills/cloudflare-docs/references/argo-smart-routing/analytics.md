---
title: Analytics
description: View latency improvements and response time data for Argo Smart Routing.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/argo-smart-routing/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

### Tags

[ Analytics ](https://developers.cloudflare.com/search/?tags=Analytics) 

# Analytics

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

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/argo-smart-routing/","name":"Argo Smart Routing"}},{"@type":"ListItem","position":3,"item":{"@id":"/argo-smart-routing/analytics/","name":"Analytics"}}]}
```
