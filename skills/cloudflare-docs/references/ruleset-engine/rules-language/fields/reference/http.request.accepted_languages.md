---
title: http.request.accepted_languages
description: List of language tags provided in the [`Accept-Language`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Accept-Language) HTTP request header.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

#  http.request.accepted\_languages 

`http.request.accepted_languages` ` Array<String> ` 

List of language tags provided in the [Accept-Language](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Accept-Language) HTTP request header.

Language tags are sorted by weight (`;q=<weight>`, with a default weight of `1`) in descending order.

If the HTTP header is not present in the request or is empty, `http.request.accepted_languages[0]` will return a "[missing value](https://developers.cloudflare.com/ruleset-engine/rules-language/values/#notes)", which the [concat()](https://developers.cloudflare.com/ruleset-engine/rules-language/functions/#concat) function will handle as an empty string.

If the HTTP header includes the language tag `*` it will not be stored in the array.

**Note**: This field is only available in [Transform Rules](https://developers.cloudflare.com/rules/transform/).

Example usage:

```

# Example 1: Request with header "Accept-Language: fr-CH, fr;q=0.8, en;q=0.9, de;q=0.7, *;q=0.5".

# In this case:

http.request.accepted_languages[0] ==> "fr-CH"

http.request.accepted_languages    ==> ["fr-CH", "en", "fr", "de"]


# Example 2: Request without an `Accept-Language` HTTP header and a URI of "https://www.example.com/my-path".

# In this case:

concat("/", http.request.accepted_languages[0], http.request.uri.path) ==> "//my-path"


```

Categories: 
* Request
* Headers

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ruleset-engine/","name":"Ruleset Engine"}},{"@type":"ListItem","position":3,"item":{"@id":"/ruleset-engine/rules-language/","name":"Rules language"}},{"@type":"ListItem","position":4,"item":{"@id":"/ruleset-engine/rules-language/fields/","name":"Fields"}},{"@type":"ListItem","position":5,"item":{"@id":"/ruleset-engine/rules-language/fields/reference/","name":"Fields reference"}}]}
```
