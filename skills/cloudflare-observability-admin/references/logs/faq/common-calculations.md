---
description: Learn more about calculating bytes served by the origin and bandwidth usage.
title: Common calculations FAQ
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/logs/llms.txt
> Use this file to discover all available pages before exploring further.

# Common calculations FAQ

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/logs/faq/common-calculations/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

[❮ Back to FAQ](https://developers.cloudflare.com/logs/faq/)

### How can I calculate bytes served by the origin from Cloudflare Logs?

The best way to calculate bytes served by the origin is to use the `CacheResponseBytes` field in Cloudflare Logs, and to filter only requests that come from the origin. Make sure to filter out `OriginResponseStatus` values `0` and `304`, which indicate a revalidated response.

### How do I calculate bandwidth usage for my zone?

Bandwidth (or data transfer) can be calculated by adding the `EdgeResponseBytes` field in HTTP request logs. There are some types of requests that are not factored into bandwidth calculations. In order to only include relevant requests in calculations, add the filter `ClientRequestSource = 'eyeball'`.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/logs/faq/common-calculations/#page","headline":"Common calculations FAQ · Cloudflare Logs docs","description":"Learn more about calculating bytes served by the origin and bandwidth usage.","url":"https://developers.cloudflare.com/logs/faq/common-calculations/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
