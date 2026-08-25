---
description: Interpret Lighthouse scores and Core Web Vitals from Observatory tests.
title: Understand test results
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/speed/llms.txt
> Use this file to discover all available pages before exploring further.

# Understand test results

Last updated Apr 16, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/speed/observatory/test-results/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

The test result page shows you how your website performed regarding several key industry metrics. Some of these metrics are presented for synthetic tests and the real user monitoring, and others only apply to synthetic tests or only to real user monitoring.

## Synthetic tests and real user monitoring metrics

These metrics are presented for the synthetic tests and they are also collected as part of the real user data.

| Metric                                                                    | Definition                                                                                                                            |
| ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| Time to First Byte ([TTFB ↗](https://web.dev/ttfb/))                      | Measures the time between the request for a resource and when the first byte of a response begins to arrive.                          |
| First Contentful Paint ([FCP ↗](https://web.dev/first-contentful-paint/)) | Measures the time from when the page starts loading to when any part of the page's content is rendered on the screen.                 |
| Largest Contentful Paint ([LCP ↗](https://web.dev/lcp/))                  | CP reports the render time of the largest image or text block visible within the viewport.                                            |
| Cumulative Layout Shift ([CLS ↗](https://web.dev/cls/))                   | Measures the largest burst of layout shift scores for every unexpected layout shift that occurs during the entire lifespan of a page. |

## Synthetic tests metrics

These metrics result from the synthetic tests.

| Metric                                              | Definition                                                                                                                                                                              |
| --------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Time to Interactive ([TTI ↗](https://web.dev/tti/)) | Measures the time from when the page starts loading to when its main sub-resources have loaded and it is capable of reliably responding to user input quickly.                          |
| Total Blocking Time ([TBT ↗](https://web.dev/tbt/)) | Measures the total amount of time between First Contentful Paint (FCP) and Time to Interactive (TTI) where the main thread was blocked for long enough to prevent input responsiveness. |
| [Speed index ↗](https://web.dev/speed-index/)       | Measures how quickly content is visually displayed during page load.                                                                                                                    |

## Real user monitoring metrics

These metrics are collected as part of the real user data, as they require real user interaction with a page.

| Metric                                                    | Definition                                                                                                                 |
| --------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| Interaction to Next Paint ([INP ↗](https://web.dev/inp/)) | Aims to represent a page's overall responsiveness by measuring all click, tap, and keyboard interactions made with a page. |

Refer to [Data and metrics](https://developers.cloudflare.com/web-analytics/data-metrics/) for more information about the metrics you can find in the Real User Monitoring dashboard. You can find details about [Core Web Vitals](https://developers.cloudflare.com/web-analytics/data-metrics/core-web-vitals/), the debug view and the data collected.

## Network monitoring metrics

| Metric                                                       | Definition                                                                                                        |
| ------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------- |
| Wait Time                                                    | Measures the time spent waiting for the server to send back the first byte of a response after a request is made. |
| Load Time                                                    | Measures the total time it takes for a web page to fully load in a user’s browser from the network.               |
| Time to First Byte ([TTFB ↗](https://web.dev/articles/ttfb)) | Measures the duration between initiating a web page request and receiving the first byte from the server.         |
| Server Response Time                                         | Measures the time it takes for a server to respond to a request from a user's browser.                            |
| Connect Time                                                 | Measures the time taken to establish a connection between the user's browser and the web server.                  |
| TLS Time                                                     | Measures the time required to complete the TLS/SSL handshake between the user's browser and the web server.       |

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/speed/observatory/test-results/#page","headline":"Understand test results · Cloudflare Speed docs","description":"Interpret Lighthouse scores and Core Web Vitals from Observatory tests.","url":"https://developers.cloudflare.com/speed/observatory/test-results/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
