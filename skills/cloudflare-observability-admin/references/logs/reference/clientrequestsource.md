---
description: Understand ClientRequestSource field values in logs.
title: ClientRequestSource field
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/logs/llms.txt
> Use this file to discover all available pages before exploring further.

# ClientRequestSource field

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/logs/reference/clientrequestsource/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

The possible values for the `ClientRequestSource` field are the following:

| Value | Request source     | Description                                                                                                                             |
| ----- | ------------------ | --------------------------------------------------------------------------------------------------------------------------------------- |
| 0     | unknown            | Should never happen.                                                                                                                    |
| 1     | eyeball            | A request from an end user. If you want to count requests made the Cloudflare Edge, the query should filter on requestSource=eyeball.   |
| 2     | purge              | A request made by Cloudflare's purge system.                                                                                            |
| 3     | alwaysOnline       | A request made by Cloudflare's Always Online crawler.                                                                                   |
| 4     | healthcheck        | A request made by Cloudflare's Health Check system.                                                                                     |
| 5     | edgeWorkerFetch    | A fetch request made from an edge Worker.                                                                                               |
| 6     | edgeWorkerCacheAPI | A cache API call made from an edge Worker.                                                                                              |
| 7     | edgeWorkerKV       | A KV call made from an edge Worker.                                                                                                     |
| 8     | imageResizing      | Requests made by Cloudflare's Image Resizing product.                                                                                   |
| 9     | orangeToOrange     | A request that comes from another orange clouded zone.                                                                                  |
| 10    | sslDetector        | A request made by Cloudflare's [SSL Detector system ↗](https://blog.cloudflare.com/ssl-tls-recommender/).                               |
| 11    | earlyHintsCache    | An [Early Hint request ↗](https://blog.cloudflare.com/early-hints/).                                                                    |
| 12    | inBrowserChallenge | An end user request caused by a Cloudflare security product (Challenges, JavaScript Detections). These requests never reach the origin. |

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/logs/reference/clientrequestsource/#page","headline":"ClientRequestSource field · Cloudflare Logs docs","description":"Understand ClientRequestSource field values in logs.","url":"https://developers.cloudflare.com/logs/reference/clientrequestsource/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
