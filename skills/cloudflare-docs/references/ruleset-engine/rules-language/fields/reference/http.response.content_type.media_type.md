---
title: http.response.content_type.media_type
description: The lowercased content type (including subtype and suffix) without any extra parameters, based on the response's `Content-Type` header.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/fields/index.yaml) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

#  http.response.content\_type.media\_type 

`http.response.content_type.media_type` ` String ` 

The lowercased content type (including subtype and suffix) without any extra parameters, based on the response's `Content-Type` header.

The field value will not include parameters such as `charset`.

Example values:

| Content-Type header                   | Field value       |
| ------------------------------------- | ----------------- |
| text/html                             | "text/html"       |
| text/html; charset=utf-8              | "text/html"       |
| text/html+extra                       | "text/html+extra" |
| text/html+extra; charset=utf-8        | "text/html+extra" |
| text/HTML                             | "text/html"       |
| text/html; charset=utf-8; other=value | "text/html"       |

**Note**: The availability of HTTP response fields depends on the exact Cloudflare feature and your Cloudflare plan.

Categories: 
* Response
* Headers

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ruleset-engine/","name":"Ruleset Engine"}},{"@type":"ListItem","position":3,"item":{"@id":"/ruleset-engine/rules-language/","name":"Rules language"}},{"@type":"ListItem","position":4,"item":{"@id":"/ruleset-engine/rules-language/fields/","name":"Fields"}},{"@type":"ListItem","position":5,"item":{"@id":"/ruleset-engine/rules-language/fields/reference/","name":"Fields reference"}}]}
```
