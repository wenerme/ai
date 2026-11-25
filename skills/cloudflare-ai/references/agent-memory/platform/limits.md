---
agent:
  instructions: "Use this search API to find relevant content across this site with keywords or natural-language queries, instead of crawling individual pages. Results are returned in Markdown."
  endpoint: "https://developers.cloudflare.com/.well-known/search?q={query}"
  method: "GET"
  documentation: "https://developers.cloudflare.com/ai-search/how-to/search-for-agents/"
description: Review Agent Memory platform limits, including message sizes, naming constraints, and API pagination limits.
title: Limits
image: https://developers.cloudflare.com/agent-memory/platform/limits/og.png?v=0c2b7a4aef988608
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/agent-memory/llms.txt
> Use this file to discover all available pages before exploring further.

# Limits

The following limits apply to Agent Memory operations.

| Feature | Limit |
| --- | --- |
| Messages per `ingest()` call | 500 |
| Message content size | 32 KB (32,768 bytes UTF-8) |
| Recall query size | 1 KB (1,024 bytes UTF-8) |
| Session ID length | 64 characters |
| Profile name length | 100 characters |
| Namespace name length | 32 characters |
| List API page size | 1 to 1,000 (default: 20) |

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/agent-memory/platform/limits/#page","headline":"Limits","description":"Review Agent Memory platform limits, including message sizes, naming constraints, and API pagination limits.","url":"https://developers.cloudflare.com/agent-memory/platform/limits/","inLanguage":"en","image":"https://developers.cloudflare.com/agent-memory/platform/limits/og.png?v=0c2b7a4aef988608","dateModified":"2026-06-03","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
