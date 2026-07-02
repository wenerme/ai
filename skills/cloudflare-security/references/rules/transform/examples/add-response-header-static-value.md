---
title: Add a response header with a static value
description: Create a response header transform rule to add a `set-cookie` HTTP header to the response with a static value (`cookiename=value`).
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/rules/llms.txt
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop)

# Add a response header with a static value

Create a response header transform rule to add a `set-cookie` HTTP header to the response with a static value (`cookiename=value`).

The following response header transform rule adds a header named `set-cookie` with a static value (`cookiename=value`) to the HTTP response:

Text in **Expression Editor**:

```txt
starts_with(http.request.uri.path, "/en/")
```

Selected operation under **Modify response header**: _Add_

**Header name**: `set-cookie`

**Value**: `cookiename=value`

This rule would keep any existing `set-cookie` headers already present in the HTTP response.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/rules/transform/examples/add-response-header-static-value/#page","headline":"Add a response header with a static value · Cloudflare Rules docs","description":"Create a response header transform rule to add a set-cookie HTTP header to the response with a static value (cookiename=value).","url":"https://developers.cloudflare.com/rules/transform/examples/add-response-header-static-value/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2025-10-13","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Response modification"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/rules/","name":"Rules"}},{"@type":"ListItem","position":3,"item":{"@id":"/rules/transform/","name":"Transform Rules"}},{"@type":"ListItem","position":4,"item":{"@id":"/rules/transform/examples/","name":"Transform Rules examples"}},{"@type":"ListItem","position":5,"item":{"@id":"/rules/transform/examples/add-response-header-static-value/","name":"Add a response header with a static value"}}]}
```
