---
description: Cache TTL by status code
title: Cache TTL by status code
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cache/llms.txt
> Use this file to discover all available pages before exploring further.

# Cache TTL by status code

Cache TTL by status code

Last updated Oct 13, 2025|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/cache/how-to/cache-rules/examples/cache-ttl-by-status-code/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Note

If you are migrating from Page Rules and you want to keep Page Rules behavior, you need to create two specific rules before creating this rule. For more details refer to [Migration from Page Rules](https://developers.cloudflare.com/cache/how-to/cache-rules/page-rules-migration/).

[Create a cache rule](https://developers.cloudflare.com/cache/how-to/cache-rules/create-dashboard/) to cache responses with status code between `200` and `599` for one day for any hostname containing `example.com`:

* **When incoming requests match**: Custom filter expression

  * Using the Expression Builder:
  `Hostname contains "example.com"`
  * Using the Expression Editor:
  `(http.host contains "example.com")`
* **Then**:

  * **Cache eligibility**: Eligible for cache
  * **Setting**: Edge TTL
    * Use cache-control header if present, use default Cloudflare caching behavior if not
    * **Status code TTL**:
      * **Scope**: _Range_
      * **From**: _200_
      * **To**: _599_
      * **Duration**: _1 day_

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cache/how-to/cache-rules/examples/cache-ttl-by-status-code/#page","headline":"Cache TTL by status code · Cloudflare Cache (CDN) docs","description":"Cache TTL by status code","url":"https://developers.cloudflare.com/cache/how-to/cache-rules/examples/cache-ttl-by-status-code/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2025-10-13","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
