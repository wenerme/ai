---
description: Create a request header transform rule to add an `X-Source` HTTP header to the request with a static value (`Cloudflare`).
title: Add request header with a static value
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/rules/llms.txt
> Use this file to discover all available pages before exploring further.

#  Add request header with a static value

Create a request header transform rule to add an `X-Source` HTTP header to the request with a static value (`Cloudflare`).

Last updated Oct 13, 2025 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/rules/transform/examples/add-request-header-static-value/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

The following request header transform rule adds a header named `X-Source` with a static value (`Cloudflare`) to the HTTP request:

Text in **Expression Editor**:

```txt
starts_with(http.request.uri.path, "/en/")
```

Selected operation under **Modify request header**: _Set static_

**Header name**: `X-Source`

**Value**: `Cloudflare`

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/rules/transform/examples/add-request-header-static-value/#page","headline":"Add request header with a static value · Cloudflare Rules docs","description":"Create a request header transform rule to add an X-Source HTTP header to the request with a static value (Cloudflare).","url":"https://developers.cloudflare.com/rules/transform/examples/add-request-header-static-value/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2025-10-13","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Request modification"]}
```
