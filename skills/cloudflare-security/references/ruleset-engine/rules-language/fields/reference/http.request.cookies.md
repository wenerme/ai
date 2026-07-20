---
title: http.request.cookies
description: The `Cookie` HTTP header associated with a request represented as a Map (associative array).
image: https://developers.cloudflare.com/og-docs.png
---

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ruleset-engine/llms.txt
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop)

#  http.request.cookies

`http.request.cookies` ` Map<Array<String>> `

The `Cookie` HTTP header associated with a request represented as a Map (associative array).

Requires a Cloudflare Pro, Business, or Enterprise plan.

The cookie names are URL decoded. If two cookies have the same name after decoding, their value arrays are merged.

The cookie values are not pre-processed and retain the original case used in the request.

Example value:

```txt
{ "app": ["test"] }
```

Example usage:

```txt
any(http.request.cookies["app"][*] == "test")
```

Categories:
* Request
* Headers

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/http.request.cookies/#page","headline":"http.request.cookies · Cloudflare Ruleset Engine docs","description":"The Cookie HTTP header associated with a request represented as a Map (associative array).","url":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/http.request.cookies/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ruleset-engine/","name":"Ruleset Engine"}},{"@type":"ListItem","position":3,"item":{"@id":"/ruleset-engine/rules-language/","name":"Rules language"}},{"@type":"ListItem","position":4,"item":{"@id":"/ruleset-engine/rules-language/fields/","name":"Fields"}},{"@type":"ListItem","position":5,"item":{"@id":"/ruleset-engine/rules-language/fields/reference/","name":"Fields reference"}}]}
```
