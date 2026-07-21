---
description: The values of arguments in the HTTP URI query string.
title: http.request.uri.args.values
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

#  http.request.uri.args.values

`http.request.uri.args.values` ` Array<String> `

The values of arguments in the HTTP URI query string.

The values are not pre-processed and retain the original case used in the request. They are in the same order as in the request.

Duplicated values are listed multiple times.

* **Decoding**: No decoding performed
* **Non-ASCII**: Preserved

Example value:

```txt
["red+apples"]
```

Example usage:

```txt
any(http.request.uri.args.values[*] == "red+apples")
```

Categories:
* Request
* URI

Was this helpful?

YesNo

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/http.request.uri.args.values/#page","headline":"http.request.uri.args.values · Cloudflare Ruleset Engine docs","description":"The values of arguments in the HTTP URI query string.","url":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/http.request.uri.args.values/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
