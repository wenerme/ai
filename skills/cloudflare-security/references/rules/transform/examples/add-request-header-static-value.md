---
title: Add request header with a static value
description: Create a request header transform rule to add an `X-Source` HTTP header to the request with a static value (`Cloudflare`).
image: https://developers.cloudflare.com/og-docs.png
---

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/rules/llms.txt
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop)

# Add request header with a static value

Create a request header transform rule to add an `X-Source` HTTP header to the request with a static value (`Cloudflare`).

The following request header transform rule adds a header named `X-Source` with a static value (`Cloudflare`) to the HTTP request:

Text in **Expression Editor**:

```txt
starts_with(http.request.uri.path, "/en/")
```

Selected operation under **Modify request header**: _Set static_

**Header name**: `X-Source`

**Value**: `Cloudflare`

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/rules/transform/examples/add-request-header-static-value/#page","headline":"Add request header with a static value · Cloudflare Rules docs","description":"Create a request header transform rule to add an X-Source HTTP header to the request with a static value (Cloudflare).","url":"https://developers.cloudflare.com/rules/transform/examples/add-request-header-static-value/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2025-10-13","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Request modification"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/rules/","name":"Rules"}},{"@type":"ListItem","position":3,"item":{"@id":"/rules/transform/","name":"Transform Rules"}},{"@type":"ListItem","position":4,"item":{"@id":"/rules/transform/examples/","name":"Transform Rules examples"}},{"@type":"ListItem","position":5,"item":{"@id":"/rules/transform/examples/add-request-header-static-value/","name":"Add request header with a static value"}}]}
```
