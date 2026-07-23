---
description: Create a response header transform rule to add a `set-cookie` HTTP header to the response with a static value (`cookiename=value`).
title: Add a response header with a static value
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/rules/llms.txt
> Use this file to discover all available pages before exploring further.

# Add a response header with a static value

Create a response header transform rule to add a `set-cookie` HTTP header to the response with a static value (`cookiename=value`).

Last updated Oct 13, 2025|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/rules/transform/examples/add-response-header-static-value/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

The following response header transform rule adds a header named `set-cookie` with a static value (`cookiename=value`) to the HTTP response:

Text in **Expression Editor**:

```txt
starts_with(http.request.uri.path, "/en/")
```

Selected operation under **Modify response header**: _Add_

**Header name**: `set-cookie`

**Value**: `cookiename=value`

This rule would keep any existing `set-cookie` headers already present in the HTTP response.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/rules/transform/examples/add-response-header-static-value/#page","headline":"Add a response header with a static value · Cloudflare Rules docs","description":"Create a response header transform rule to add a set-cookie HTTP header to the response with a static value (cookiename=value).","url":"https://developers.cloudflare.com/rules/transform/examples/add-response-header-static-value/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2025-10-13","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Response modification"]}
```
