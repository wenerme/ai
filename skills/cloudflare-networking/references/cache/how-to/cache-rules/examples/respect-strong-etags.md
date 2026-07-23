---
description: Respect Strong ETags
title: Respect Strong ETags
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cache/llms.txt
> Use this file to discover all available pages before exploring further.

# Respect Strong ETags

Respect Strong ETags

Last updated Oct 13, 2025|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/cache/how-to/cache-rules/examples/respect-strong-etags/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

[Create a cache rule](https://developers.cloudflare.com/cache/how-to/cache-rules/create-dashboard/) to respect strong ETags for any hostname containing `example.com`:

* **When incoming requests match**: Custom filter expression

  * Using the Expression Builder:
  `Hostname contains "example.com"`
  * Using the Expression Editor:
  `(http.host contains "example.com")`
* **Then**:

  * **Cache eligibility**: Eligible for cache
  * **Setting**: Respect strong ETags
    * **Use strong ETag headers**: On

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cache/how-to/cache-rules/examples/respect-strong-etags/#page","headline":"Respect Strong ETags · Cloudflare Cache (CDN) docs","description":"Respect Strong ETags","url":"https://developers.cloudflare.com/cache/how-to/cache-rules/examples/respect-strong-etags/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2025-10-13","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
