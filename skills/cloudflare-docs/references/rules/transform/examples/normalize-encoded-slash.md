---
title: Normalize encoded slashes in URL path
description: Create a URL rewrite rule (part of Transform Rules) to normalize encoded forward slashes (`%2F`) in the request path to standard slashes (`/`).
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

### Tags

[ URL rewrite ](https://developers.cloudflare.com/search/?tags=URL%20rewrite) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/rules/transform/examples/normalize-encoded-slash.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Normalize encoded slashes in URL path

Create a URL rewrite rule (part of Transform Rules) to normalize encoded forward slashes (`%2F`) in the request path to standard slashes (`/`).

Different web servers and applications handle encoded forward slashes (`%2F`) in URLs differently. Cloudflare follows [RFC 3986 ↗](https://datatracker.ietf.org/doc/html/rfc3986), which specifies that `%2F` **should not** be automatically normalized to `/` because `/` is a reserved character in URLs, and decoding it might change the intended meaning of the path.

However, many origin servers **do** automatically decode `%2F` into `/` when processing requests. If your origin server behaves this way, you may want to apply the same normalization at Cloudflare’s edge to ensure consistency in request handling, rule evaluation, and logging.

## How to normalize `%2F`

To normalize encoded forward slashes (`%2F`) to standard slashes (`/`) in the request path before [subsequent](https://developers.cloudflare.com/ruleset-engine/reference/phases-list/) rule evaluation, create a new URL rewrite rule and define a dynamic URL path rewrite using [url\_decode()](https://developers.cloudflare.com/ruleset-engine/rules-language/functions/#url%5Fdecode) function:

Text in **Expression Editor**:

```

(lower(raw.http.request.full_uri) wildcard "*%2f*")


```

Text after **Path** \> **Rewrite to** \> _Dynamic_:

```

url_decode(http.request.uri.path)


```

This transformation ensures that `%2F` is always treated as `/` in the request path. This is particularly useful when setting up rules that depend on URL path matching, as it prevents discrepancies caused by differing normalization behaviors.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/rules/","name":"Rules"}},{"@type":"ListItem","position":3,"item":{"@id":"/rules/transform/","name":"Transform Rules"}},{"@type":"ListItem","position":4,"item":{"@id":"/rules/transform/examples/","name":"Transform Rules examples"}},{"@type":"ListItem","position":5,"item":{"@id":"/rules/transform/examples/normalize-encoded-slash/","name":"Normalize encoded slashes in URL path"}}]}
```
