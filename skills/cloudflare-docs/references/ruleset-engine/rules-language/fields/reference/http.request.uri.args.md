---
title: http.request.uri.args
description: The HTTP URI arguments associated with a request represented as a Map (associative array).
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ruleset-engine/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

#  http.request.uri.args 

`http.request.uri.args` ` Map<Array<String>> ` 

The HTTP URI arguments associated with a request represented as a Map (associative array).

When an argument repeats, the array contains multiple items in the order they appear in the request.

The values are not pre-processed and retain the original case used in the request.

* **Decoding**: No decoding performed
* **Non-ASCII**: Preserved

Example value:

```

{"search": ["red+apples"]}


```

Example usage:

```

any(http.request.uri.args["search"][*] == "red+apples")


```

Categories: 
* Request
* URI

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/http.request.uri.args/#page","headline":"http.request.uri.args · Cloudflare Ruleset Engine docs","description":"The HTTP URI arguments associated with a request represented as a Map (associative array).","url":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/http.request.uri.args/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ruleset-engine/","name":"Ruleset Engine"}},{"@type":"ListItem","position":3,"item":{"@id":"/ruleset-engine/rules-language/","name":"Rules language"}},{"@type":"ListItem","position":4,"item":{"@id":"/ruleset-engine/rules-language/fields/","name":"Fields"}},{"@type":"ListItem","position":5,"item":{"@id":"/ruleset-engine/rules-language/fields/reference/","name":"Fields reference"}}]}
```
