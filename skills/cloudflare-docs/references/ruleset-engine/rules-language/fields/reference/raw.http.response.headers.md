---
title: raw.http.response.headers
description: The HTTP response headers without any transformation represented as a Map (or associative array).
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/fields/index.yaml) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

#  raw.http.response.headers 

`raw.http.response.headers` ` Map<Array<String>> ` 

The HTTP response headers without any transformation represented as a Map (or associative array).

This is the raw field version of the [http.response.headers](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/http.response.headers/) field. Raw fields, prefixed with `raw.`, preserve original response values for later evaluations. These fields are immutable during the entire request evaluation workflow, and they are not affected by the actions of previously matched rules.

Example value:

```

{"server": ["nginx"]}


```

Example usage:

```

any(raw.http.response.headers["server"][*] == "nginx")


```

Categories: 
* Response
* Headers
* Raw fields

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ruleset-engine/","name":"Ruleset Engine"}},{"@type":"ListItem","position":3,"item":{"@id":"/ruleset-engine/rules-language/","name":"Rules language"}},{"@type":"ListItem","position":4,"item":{"@id":"/ruleset-engine/rules-language/fields/","name":"Fields"}},{"@type":"ListItem","position":5,"item":{"@id":"/ruleset-engine/rules-language/fields/reference/","name":"Fields reference"}}]}
```
