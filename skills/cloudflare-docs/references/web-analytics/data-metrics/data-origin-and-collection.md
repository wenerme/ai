---
title: Data origin and collection
description: Web Analytics relies on the performance.getEntriesByType('navigation') object to collect metrics about page load performance. If Navigation Timing Level 2 is not supported, then performance.timing (Level 1) is used.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/web-analytics/data-metrics/data-origin-and-collection.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Data origin and collection

Web Analytics relies on the `performance.getEntriesByType('navigation')` object to collect metrics about page load performance. If Navigation Timing Level 2 is not supported, then [performance.timing (Level 1) ↗](https://developer.mozilla.org/en-US/docs/Web/API/Performance/timing) is used.

Refer to the [W3C Processing Model ↗](https://www.w3.org/TR/navigation-timing-2/#processing-model) for a visual depiction of the sequence of timing events for web page loads.

## Data collection and reporting

Web Analytics collects the minimum amount of information - timing metrics - to show customers how their websites perform. Cloudflare does not track individual end users across our customers’ Internet properties.

The Web Analytics performance beacon loads from `https://static.cloudflareinsights.com/beacon.min.js`. You may need to update your [Content Security Policy (CSP)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) settings to load this script.

Beacon data is sent to `https://<yourdomainname>/cdn-cgi/rum` for sites proxied through Cloudflare or `https://cloudflareinsights.com/cdn-cgi/rum` for sites not proxied through Cloudflare. Core Web Vital metrics are reported when the `visibilityState` is hidden for the first time after the page load event is triggered.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/web-analytics/","name":"Cloudflare Web Analytics"}},{"@type":"ListItem","position":3,"item":{"@id":"/web-analytics/data-metrics/","name":"Data and metrics"}},{"@type":"ListItem","position":4,"item":{"@id":"/web-analytics/data-metrics/data-origin-and-collection/","name":"Data origin and collection"}}]}
```
