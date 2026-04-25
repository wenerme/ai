---
title: raw.http.request.uri.args.values
description: The raw values of arguments in the HTTP URI query string.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

#  raw.http.request.uri.args.values 

`raw.http.request.uri.args.values` ` Array<String> ` 

The raw values of arguments in the HTTP URI query string.

This is the raw field version of the [http.request.uri.args.values](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/http.request.uri.args.values/) field. Raw fields, prefixed with `raw.`, preserve original request values for later evaluations. These fields are immutable during the entire request evaluation workflow, and they are not affected by the actions of previously matched rules.

Categories: 
* Request
* URI
* Raw fields

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ruleset-engine/","name":"Ruleset Engine"}},{"@type":"ListItem","position":3,"item":{"@id":"/ruleset-engine/rules-language/","name":"Rules language"}},{"@type":"ListItem","position":4,"item":{"@id":"/ruleset-engine/rules-language/fields/","name":"Fields"}},{"@type":"ListItem","position":5,"item":{"@id":"/ruleset-engine/rules-language/fields/reference/","name":"Fields reference"}}]}
```
