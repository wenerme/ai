---
description: The names of the arguments in the HTTP URI query string.
title: http.request.uri.args.names
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

# http.request.uri.args.names

`http.request.uri.args.names` `Array<String>`

The names of the arguments in the HTTP URI query string.

When a name repeats, the array contains multiple items in the order that they appear in the request.

The names are not pre-processed and retain the original case used in the request.

* **Decoding**: No decoding performed
* **Non-ASCII**: Preserved

Example value:

```txt
["search"]
```

Example usage:

```txt
any(http.request.uri.args.names[*] == "search")
```

Categories:
* Request
* URI

Was this helpful?

YesNo

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/http.request.uri.args.names/#page","headline":"http.request.uri.args.names · Cloudflare Ruleset Engine docs","description":"The names of the arguments in the HTTP URI query string.","url":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/http.request.uri.args.names/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
