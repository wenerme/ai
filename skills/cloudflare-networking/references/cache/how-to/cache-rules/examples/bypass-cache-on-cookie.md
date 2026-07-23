---
description: Bypass Cache on Cookie
title: Bypass Cache on Cookie
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cache/llms.txt
> Use this file to discover all available pages before exploring further.

# Bypass Cache on Cookie

Bypass Cache on Cookie

Last updated Apr 16, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/cache/how-to/cache-rules/examples/bypass-cache-on-cookie/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Note

If you are migrating from Page Rules and you want to keep Page Rules behavior, you need to create two specific rules before creating this rule. For more details refer to [Migration from Page Rules](https://developers.cloudflare.com/cache/how-to/cache-rules/page-rules-migration/).

[Create a cache rule](https://developers.cloudflare.com/cache/how-to/cache-rules/create-dashboard/) to bypass cache for requests containing cookie `test_cookie` for any hostname containing `example.com`:

* **When incoming requests match**: Custom filter expression

  * Using the Expression Builder:
  `Hostname contains "example.com" AND Cookie contains "test-cookie"`
  * Using the Expression Editor:
  `(http.host contains "example.com" and http.cookie contains "test-cookie")`
* **Then**:

  * **Cache eligibility**: Bypass cache

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cache/how-to/cache-rules/examples/bypass-cache-on-cookie/#page","headline":"Bypass Cache on Cookie · Cloudflare Cache (CDN) docs","description":"Bypass Cache on Cookie","url":"https://developers.cloudflare.com/cache/how-to/cache-rules/examples/bypass-cache-on-cookie/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Cookies"]}
```
