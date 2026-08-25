---
description: Set caching levels to control query string behavior.
title: Caching levels
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cache/llms.txt
> Use this file to discover all available pages before exploring further.

# Caching levels

Last updated Apr 16, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/cache/how-to/set-caching-levels/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Caching levels determine how much of your website’s static content Cloudflare should cache. Cloudflare’s CDN caches static content according to the levels below.

* **No Query String**: Delivers resources from cache when there is no query string. Example URL: `example.com/pic.jpg`
* **Ignore Query String**: Delivers the same resource to everyone independent of the query string. Example URL: `example.com/pic.jpg?ignore=this-query-string`
* **Standard (Default)**: Delivers a different resource each time the query string changes. Example URL: `example.com/pic.jpg?with=query`

You can adjust the caching level from the dashboard under **Caching** \> **Configuration** \> **Caching level**.

Note

Ignore Query String only disregards the query string for static file extensions. For example, Cloudflare serves the `style.css` resource to requests for either `style.css?this` or `style.css?that`.

## API Caching level values

If you are using the API to change the cache level, the values will differ from those shown in the dashboard. Refer to the table below to see how the API values map to the values shown in the dashboard.

| Dashboard           | API        |
| ------------------- | ---------- |
| No Query String     | Basic      |
| Ignore Query String | Simplified |
| Standard (Default)  | Aggressive |

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cache/how-to/set-caching-levels/#page","headline":"Caching levels · Cloudflare Cache (CDN) docs","description":"Set caching levels to control query string behavior.","url":"https://developers.cloudflare.com/cache/how-to/set-caching-levels/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
