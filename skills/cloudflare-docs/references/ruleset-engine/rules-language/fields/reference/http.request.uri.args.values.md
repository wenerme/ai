---
title: http.request.uri.args.values
description: The values of arguments in the HTTP URI query string.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

#  http.request.uri.args.values 

`http.request.uri.args.values` ` Array<String> ` 

The values of arguments in the HTTP URI query string.

The values are not pre-processed and retain the original case used in the request. They are in the same order as in the request.

Duplicated values are listed multiple times.

* **Decoding**: No decoding performed
* **Non-ASCII**: Preserved

Example value:

```

["red+apples"]


```

Example usage:

```

any(http.request.uri.args.values[*] == "red+apples")


```

Categories: 
* Request
* URI

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ruleset-engine/","name":"Ruleset Engine"}},{"@type":"ListItem","position":3,"item":{"@id":"/ruleset-engine/rules-language/","name":"Rules language"}},{"@type":"ListItem","position":4,"item":{"@id":"/ruleset-engine/rules-language/fields/","name":"Fields"}},{"@type":"ListItem","position":5,"item":{"@id":"/ruleset-engine/rules-language/fields/reference/","name":"Fields reference"}}]}
```
