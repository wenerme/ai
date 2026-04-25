---
title: High-level metrics
description: Page views, visits, and other high-level metrics in Web Analytics.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

# High-level metrics

Understanding the key metrics in web analytics is essential for optimizing your website’s performance and user experience. Here are the high-level metrics tracked by Cloudflare Web Analytics:

* **Visits** \- A page view that originated from a different website or direct link. Cloudflare checks where the HTTP referer does not match the hostname. One visit can consist of multiple page views.
* **Page views** \- A successful HTTP response with a content-type of HTML.
* **Page load time** \- The total amount of time required to load the page.
* **[Core Web Vitals ↗](https://www.cloudflare.com/learning/performance/what-are-core-web-vitals/)** \- Higher-level metrics designed by Google to capture the user experience more completely.
![Web Analytics overview page](https://developers.cloudflare.com/_astro/dash-web_analytics-overview.Z0JtJyOL_5dwhM.webp) 

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/web-analytics/","name":"Cloudflare Web Analytics"}},{"@type":"ListItem","position":3,"item":{"@id":"/web-analytics/data-metrics/","name":"Data and metrics"}},{"@type":"ListItem","position":4,"item":{"@id":"/web-analytics/data-metrics/high-level-metrics/","name":"High-level metrics"}}]}
```
