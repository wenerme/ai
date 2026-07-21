---
description: Origin Cache Control
title: Origin Cache Control
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cache/llms.txt
> Use this file to discover all available pages before exploring further.

#  Origin Cache Control

Origin Cache Control

Last updated Oct 13, 2025 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/cache/how-to/cache-rules/examples/origin-cache-control/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

[Create a cache rule](https://developers.cloudflare.com/cache/how-to/cache-rules/create-dashboard/) to determine edge cache behavior for any hostname containing `example.com`:

* **When incoming requests match**: Custom filter expression

  * Using the Expression Builder:
  `Hostname contains "example.com"`
  * Using the Expression Editor:
  `(http.host contains "example.com")`
* **Then**:

  * **Cache eligibility**: Eligible for cache
  * **Setting**: Origin Cache Control
    * **Enable Origin Cache Control**: Off

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cache/how-to/cache-rules/examples/origin-cache-control/#page","headline":"Origin Cache Control · Cloudflare Cache (CDN) docs","description":"Origin Cache Control","url":"https://developers.cloudflare.com/cache/how-to/cache-rules/examples/origin-cache-control/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2025-10-13","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
