---
title: http.host
description: The hostname used in the full request URI.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

#  http.host 

`http.host` ` String ` 

The hostname used in the full request URI.

The `http.host` field contains the `Host` header from the original request.

If you have configured [Origin Rules](https://developers.cloudflare.com/rules/origin-rules/) that change the hostname, they will not be reflected in the `http.host` field value.

Example value:

```

"www.example.org"


```

Categories: 
* Request
* URI

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ruleset-engine/","name":"Ruleset Engine"}},{"@type":"ListItem","position":3,"item":{"@id":"/ruleset-engine/rules-language/","name":"Rules language"}},{"@type":"ListItem","position":4,"item":{"@id":"/ruleset-engine/rules-language/fields/","name":"Fields"}},{"@type":"ListItem","position":5,"item":{"@id":"/ruleset-engine/rules-language/fields/reference/","name":"Fields reference"}}]}
```
