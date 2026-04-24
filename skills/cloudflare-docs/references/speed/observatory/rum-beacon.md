---
title: RUM beacon for Web Analytics
description: Collect real user performance metrics with the RUM beacon.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

### Tags

[ Privacy ](https://developers.cloudflare.com/search/?tags=Privacy) 

### Agents toolkit

* Agent setup
* Copy as Markdown

Open the Markdown file in a new tab

Ask Claude about this page

Ask ChatGPT about this page

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/speed/observatory/rum-beacon.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# RUM beacon for Web Analytics

The RUM beacon is a JavaScript snippet that runs when a Cloudflare customer enables RUM through [Web Analytics](https://developers.cloudflare.com/web-analytics/) or [Observatory](https://developers.cloudflare.com/speed/observatory/). This script runs in users' browsers when they visit the customer's site, and its purpose is to collect performance-related data, for example, page load time, and send it to Cloudflare's systems for processing. This [data](https://developers.cloudflare.com/web-analytics/data-metrics/) is then presented to the customer, providing valuable insights into the website's performance and usage.

The RUM beacon script can be enabled into a webpage in two ways:

* **One-click setup**: For [sites proxied through Cloudflare](https://developers.cloudflare.com/web-analytics/get-started/#sites-proxied-through-cloudflare) that have Web Analytics enabled, the snippet can be _automatically_ injected into pages as the HTML response passes through Cloudflare's edge network to the browser by simply enabling the automatic injection option.
* **Manual setup**: Websites can _manually_ add the script by embedding a code snippet into their pages. Refer to the [Sites not proxied through Cloudflare section](https://developers.cloudflare.com/web-analytics/get-started/#sites-not-proxied-through-cloudflare), for more information about how to manually insert the snippet into your HTML.

## Data collection

Once downloaded to the browser, the RUM beacon script runs as JavaScript in the browser. It collects performance data from browser [APIs ↗](https://developer.mozilla.org/en-US/docs/Web/API/Performance%5FAPI) and sends this data to Cloudflare for processing.

The data collected from the browser is summarized in the table below:

| Field                | Example                                                                                                                | Description                                  | How it is collected                                                                                                                                                                                                                                                                                         |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| pageloadId           | 0c698922-8d60-40bf-85ac-7982b5f8034d                                                                                   | The unique ID for the page.                  | Generated in the browser code.                                                                                                                                                                                                                                                                              |
| referrer             | [https://cfrumtest.com/ ↗](https://cfrumtest.com/)                                                                     | The referring page URL.                      | If it is a multi-page application (MPA), then it is generated from [document.referrer ↗](https://developer.mozilla.org/en-US/docs/Web/API/Document/referrer). If it is a single-page application (SPA), then it is generated from a local in-memory variable in the beacon code which stores previous URLs. |
| startTime            | 1693488419352                                                                                                          | Baseline for performance-related timestamps. | [performance.timeOrigin ↗](https://developer.mozilla.org/en-US/docs/Web/API/Performance/timeOrigin)                                                                                                                                                                                                         |
| memory               | { totalJSHeapSize: 39973671, usedJSHeapSize: 39127515, jsHeapSizeLimit: 4294705152 }                                   | Measures memory heap size.                   | [performance.memory ↗](https://developer.mozilla.org/en-US/docs/Web/API/Performance/memory) (deprecated)                                                                                                                                                                                                    |
| timings              | Object of [PerformanceTiming ↗](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceTiming)                    | Timing data.                                 | [performance.timing ↗](https://developer.mozilla.org/en-US/docs/Web/API/Performance/timing) (deprecated, fallback when timingV2 is unavailable)                                                                                                                                                             |
| timingV2             | Array of [PerformanceNavigationTiming ↗](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceNavigationTiming) | Navigation timing data.                      | [performance.getEntriesByType("navigation") ↗](https://developer.mozilla.org/en-US/docs/Web/API/Performance/getEntriesByType)                                                                                                                                                                               |
| resources            | Array of [PerformanceResourceTiming ↗](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceResourceTiming)     | Resource timing data.                        | [performance.getEntriesByType("resource") ↗](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceResourceTiming)                                                                                                                                                                                    |
| firstPaint           | Array of [PerformancePaintTiming ↗](https://developer.mozilla.org/en-US/docs/Web/API/PerformancePaintTiming)           | Paint timing data.                           | [performance.getEntriesByType("paint") ↗](https://developer.mozilla.org/en-US/docs/Web/API/PerformancePaintTiming)                                                                                                                                                                                          |
| firstContentfulPaint | 209                                                                                                                    | First Contentful Paint metric.               | [web-vitals module ↗](https://www.npmjs.com/package/web-vitals) [1](#user-content-fn-1)                                                                                                                                                                                                                     |
| FCP                  | 209                                                                                                                    | First Contentful Paint metric.               | [web-vitals module ↗](https://www.npmjs.com/package/web-vitals) [1](#user-content-fn-1)                                                                                                                                                                                                                     |
| LCP                  | 209                                                                                                                    | Largest Contentful Paint metric.             | [web-vitals module ↗](https://www.npmjs.com/package/web-vitals) [1](#user-content-fn-1)                                                                                                                                                                                                                     |
| CLS                  | 0.001                                                                                                                  | Cumulative Layout Shift metric.              | [web-vitals module ↗](https://www.npmjs.com/package/web-vitals) [1](#user-content-fn-1)                                                                                                                                                                                                                     |
| TTFB                 | 0.03                                                                                                                   | Time to First Byte metric.                   | [web-vitals module ↗](https://www.npmjs.com/package/web-vitals) [1](#user-content-fn-1)                                                                                                                                                                                                                     |
| INP                  | 1.23                                                                                                                   | Interaction to Next Paint metric.            | [web-vitals module ↗](https://www.npmjs.com/package/web-vitals) [1](#user-content-fn-1)                                                                                                                                                                                                                     |
| landingPath          | [https://cfrumtest.com/ ↗](https://cfrumtest.com/)                                                                     | The landing page URL.                        | [performance.getEntriesByType("navigation") ↗](https://developer.mozilla.org/en-US/docs/Web/API/Performance/getEntriesByType)                                                                                                                                                                               |

## Data processing

RUM data is generally processed at the nearest Cloudflare data center based on how the incoming request is routed. This is determined by a number of factors including [Anycast ↗](https://www.cloudflare.com/en-gb/learning/cdn/glossary/anycast-network/) and [Unimog ↗](https://blog.cloudflare.com/unimog-cloudflares-edge-load-balancer/). Since RUM data does not use location services, it may be processed in a different country or region from where it originated. Although the RUM service receives the client/source IP address from the beacon as part of normal HTTP request handling process, it discards the IP address at the nearest Cloudflare data center and does not store it in core databases or logs.

## Privacy information

The RUM beacon script does not store any data in the browser or access any storage data, such as [cookies ↗](https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie), [localStorage ↗](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage), [sessionStorage ↗](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage), IP address, or [IndexedDB ↗](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB%5FAPI/Using%5FIndexedDB). The data we collect is performance data from the browser performance [APIs ↗](https://developer.mozilla.org/en-US/docs/Web/API/Performance%5FAPI). This performance data is ephemeral and only relates to the current webpage that is being viewed. If the user refreshes their browser, all the previous performance data is gone and new performance data starts being available. This data is not stored or accessed from anywhere on the device, it is only available as in-memory data.

## RUM excluding EEA/EU

Customers have the option to enable RUM globally or to limit its application to exclude users connecting to Cloudflare data centers in the EEA/EU. If the latter option is selected, the RUM beacon does not process performance data for users connecting to a Cloudflare data center located in the following countries (ISO codes): AT, BE, BG, HR, CY, CZ, DK, EE, FI, FR, DE, GR, HU, IS, IE, IT, LV, LI, LT, LU, MT, NL, NO, PL, PT, RO, SK, SI, ES, SE, CH, GB.

Free customers have RUM enabled automatically, with EU traffic excluded, and can switch it off if they prefer. Customers on other plans may enable RUM as needed.

![Enable RUM in the dashboard.](https://developers.cloudflare.com/_astro/enable-rum.BsPZ4NVP_Z4ELXQ.webp)

## Footnotes

1. The web-vitals module is an open-source module written by Google. It does not access any type of storage on the browser. [↩](#user-content-fnref-1) [↩2](#user-content-fnref-1-2) [↩3](#user-content-fnref-1-3) [↩4](#user-content-fnref-1-4) [↩5](#user-content-fnref-1-5) [↩6](#user-content-fnref-1-6)

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/speed/","name":"Speed"}},{"@type":"ListItem","position":3,"item":{"@id":"/speed/observatory/","name":"Observatory (beta)"}},{"@type":"ListItem","position":4,"item":{"@id":"/speed/observatory/rum-beacon/","name":"RUM beacon for Web Analytics"}}]}
```
