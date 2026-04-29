---
title: http.request.uri.args.names
description: The names of the arguments in the HTTP URI query string.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ruleset-engine/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

#  http.request.uri.args.names 

`http.request.uri.args.names` ` Array<String> ` 

The names of the arguments in the HTTP URI query string.

When a name repeats, the array contains multiple items in the order that they appear in the request.

The names are not pre-processed and retain the original case used in the request.

* **Decoding**: No decoding performed
* **Non-ASCII**: Preserved

Example value:

```

["search"]


```

Example usage:

```

any(http.request.uri.args.names[*] == "search")


```

Categories: 
* Request
* URI

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ruleset-engine/","name":"Ruleset Engine"}},{"@type":"ListItem","position":3,"item":{"@id":"/ruleset-engine/rules-language/","name":"Rules language"}},{"@type":"ListItem","position":4,"item":{"@id":"/ruleset-engine/rules-language/fields/","name":"Fields"}},{"@type":"ListItem","position":5,"item":{"@id":"/ruleset-engine/rules-language/fields/reference/","name":"Fields reference"}}]}
```
