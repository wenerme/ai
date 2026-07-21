---
description: Create a request header transform rule (part of Transform Rules) to remove the `cf-connecting-ip` HTTP header from the request.
title: Remove a request header
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/rules/llms.txt
> Use this file to discover all available pages before exploring further.

#  Remove a request header

Create a request header transform rule (part of Transform Rules) to remove the `cf-connecting-ip` HTTP header from the request.

Last updated Oct 13, 2025 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/rules/transform/examples/remove-request-header/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

The following request header transform rule removes the `cf-connecting-ip` header from the HTTP request:

Text in **Expression Editor**:

```txt
starts_with(http.request.uri.path, "/private/")
```

Selected operation under **Modify request header**: _Remove_

**Header name**: `cf-connecting-ip`

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/rules/transform/examples/remove-request-header/#page","headline":"Remove a request header · Cloudflare Rules docs","description":"Create a request header transform rule (part of Transform Rules) to remove the cf-connecting-ip HTTP header from the request.","url":"https://developers.cloudflare.com/rules/transform/examples/remove-request-header/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2025-10-13","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Request modification"]}
```
