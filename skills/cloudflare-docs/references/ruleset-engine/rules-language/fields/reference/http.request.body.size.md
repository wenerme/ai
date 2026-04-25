---
title: http.request.body.size
description: The total size of the HTTP request body (in bytes).
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

#  http.request.body.size 

`http.request.body.size` ` Number ` 

The total size of the HTTP request body (in bytes).

This field may have a value larger than the one returned by `len(http.request.body.raw)`, since the [http.request.body.raw](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/http.request.body.raw/) field only considers the request body up to a maximum size that varies according to your Cloudflare plan.

Requires a Cloudflare Enterprise plan.

Categories: 
* Request
* Body

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ruleset-engine/","name":"Ruleset Engine"}},{"@type":"ListItem","position":3,"item":{"@id":"/ruleset-engine/rules-language/","name":"Rules language"}},{"@type":"ListItem","position":4,"item":{"@id":"/ruleset-engine/rules-language/fields/","name":"Fields"}},{"@type":"ListItem","position":5,"item":{"@id":"/ruleset-engine/rules-language/fields/reference/","name":"Fields reference"}}]}
```
