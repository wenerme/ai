---
title: http.response.headers.names
description: The names of the headers in the HTTP response.
image: https://developers.cloudflare.com/og-docs.png
---

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ruleset-engine/llms.txt
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop)

#  http.response.headers.names

`http.response.headers.names` ` Array<String> `

The names of the headers in the HTTP response.

The names are not pre-processed and retain the original case used in the response.

The order of header names is not guaranteed but will match [http.response.headers.values](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/http.response.headers.values/).

Duplicate headers are listed multiple times.

* **Decoding**: No decoding performed
* **Whitespace**: Preserved
* **Non-ASCII**: Preserved

**Note**: The availability of HTTP response fields depends on the exact Cloudflare feature and your Cloudflare plan.

Example value:

```txt
["content-type"]
```

Example usage:

```txt
any(http.response.headers.names[*] == "content-type")
```

Categories:
* Response
* Headers

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/http.response.headers.names/#page","headline":"http.response.headers.names · Cloudflare Ruleset Engine docs","description":"The names of the headers in the HTTP response.","url":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/http.response.headers.names/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ruleset-engine/","name":"Ruleset Engine"}},{"@type":"ListItem","position":3,"item":{"@id":"/ruleset-engine/rules-language/","name":"Rules language"}},{"@type":"ListItem","position":4,"item":{"@id":"/ruleset-engine/rules-language/fields/","name":"Fields"}},{"@type":"ListItem","position":5,"item":{"@id":"/ruleset-engine/rules-language/fields/reference/","name":"Fields reference"}}]}
```
