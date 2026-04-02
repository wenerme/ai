---
title: http.request.cookies
description: The `Cookie` HTTP header associated with a request represented as a Map (associative array).
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/fields/index.yaml) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

#  http.request.cookies 

`http.request.cookies` ` Map<Array<String>> ` 

The `Cookie` HTTP header associated with a request represented as a Map (associative array).

Requires a Cloudflare Pro, Business, or Enterprise plan.

The cookie names are URL decoded. If two cookies have the same name after decoding, their value arrays are merged.

The cookie values are not pre-processed and retain the original case used in the request.

Example value:

```

{ "app": ["test"] }


```

Example usage:

```

any(http.request.cookies["app"][*] == "test")


```

Categories: 
* Request
* Headers

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ruleset-engine/","name":"Ruleset Engine"}},{"@type":"ListItem","position":3,"item":{"@id":"/ruleset-engine/rules-language/","name":"Rules language"}},{"@type":"ListItem","position":4,"item":{"@id":"/ruleset-engine/rules-language/fields/","name":"Fields"}},{"@type":"ListItem","position":5,"item":{"@id":"/ruleset-engine/rules-language/fields/reference/","name":"Fields reference"}}]}
```
