---
title: raw.http.response.headers.values
description: The values of the headers in the HTTP response without any transformation.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

#  raw.http.response.headers.values 

`raw.http.response.headers.values` ` Array<String> ` 

The values of the headers in the HTTP response without any transformation.

This is the raw field version of the [http.response.headers.values](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/http.response.headers.values/) field. Raw fields, prefixed with `raw.`, preserve original response values for later evaluations. These fields are immutable during the entire request evaluation workflow, and they are not affected by the actions of previously matched rules.

Example value:

```

Example 1: ["application/json"]

Example 2: ["This header value is longer than 10 bytes"]


```

Example usage:

```

# Example 1: Check for specific header value.

any(raw.http.response.headers.values[*] == "application/json")


# Example 2: Match requests according to the specified operator and the length/size entered for the header value.

any(len(raw.http.response.headers.values[*])[*] gt 10)


```

Categories: 
* Response
* Headers
* Raw fields

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ruleset-engine/","name":"Ruleset Engine"}},{"@type":"ListItem","position":3,"item":{"@id":"/ruleset-engine/rules-language/","name":"Rules language"}},{"@type":"ListItem","position":4,"item":{"@id":"/ruleset-engine/rules-language/fields/","name":"Fields"}},{"@type":"ListItem","position":5,"item":{"@id":"/ruleset-engine/rules-language/fields/reference/","name":"Fields reference"}}]}
```
