---
description: How Web Analytics collects data from visitor browsers.
title: Data origin and collection
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/web-analytics/llms.txt
> Use this file to discover all available pages before exploring further.

#  Data origin and collection

Last updated Apr 17, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/web-analytics/data-metrics/data-origin-and-collection/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

Web Analytics relies on the `performance.getEntriesByType('navigation')` object to collect metrics about page load performance. If Navigation Timing Level 2 is not supported, then [performance.timing (Level 1) ↗](https://developer.mozilla.org/en-US/docs/Web/API/Performance/timing) is used.

Refer to the [W3C Processing Model ↗](https://www.w3.org/TR/navigation-timing-2/#processing-model) for a visual depiction of the sequence of timing events for web page loads.

## Data collection and reporting

Web Analytics collects the minimum amount of information - timing metrics - to show customers how their websites perform. Cloudflare does not track individual end users across our customers’ Internet properties.

The Web Analytics performance beacon loads from `https://static.cloudflareinsights.com/beacon.min.js`. You may need to update your [Content Security Policy (CSP)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) settings to load this script.

Beacon data is sent to `https://<yourdomainname>/cdn-cgi/rum` for sites proxied through Cloudflare or `https://cloudflareinsights.com/cdn-cgi/rum` for sites not proxied through Cloudflare. Core Web Vital metrics are reported when the `visibilityState` is hidden for the first time after the page load event is triggered.

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/web-analytics/data-metrics/data-origin-and-collection/#page","headline":"Data origin and collection · Cloudflare Web Analytics docs","description":"How Web Analytics collects data from visitor browsers.","url":"https://developers.cloudflare.com/web-analytics/data-metrics/data-origin-and-collection/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Privacy"]}
```
