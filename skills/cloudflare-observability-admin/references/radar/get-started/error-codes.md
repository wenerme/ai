---
agent:
  instructions: "Use this search API to find relevant content across this site with keywords or natural-language queries, instead of crawling individual pages. Results are returned in Markdown."
  endpoint: "https://developers.cloudflare.com/.well-known/search?q={query}"
  method: "GET"
  documentation: "https://developers.cloudflare.com/ai-search/how-to/search-for-agents/"
description: Reference table of Cloudflare Radar API error codes and their corresponding HTTP status codes.
title: Radar API error codes
image: https://developers.cloudflare.com/radar/get-started/error-codes/og.png?v=1d1e4fb786d412d7
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/radar/llms.txt
> Use this file to discover all available pages before exploring further.

# Radar API error codes

| Error Code | HTTP Status Code | Description |
| --- | --- | --- |
| `2000` | 500 | Internal Error |
| `2001` | 400 | Input Validation Error |
| `2002` | 422 | Query is above max cost |
| `1015` | 429 | Too many requests |
| `7003` | 404 | Not found |

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/radar/get-started/error-codes/#page","headline":"Radar API error codes","description":"Reference table of Cloudflare Radar API error codes and their corresponding HTTP status codes.","url":"https://developers.cloudflare.com/radar/get-started/error-codes/","inLanguage":"en","image":"https://developers.cloudflare.com/radar/get-started/error-codes/og.png?v=1d1e4fb786d412d7","dateModified":"2026-04-20","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
