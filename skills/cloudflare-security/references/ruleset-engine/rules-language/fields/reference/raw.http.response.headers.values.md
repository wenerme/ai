---
description: The values of the headers in the HTTP response without any transformation.
title: raw.http.response.headers.values
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

# raw.http.response.headers.values

`raw.http.response.headers.values` `Array<String>`

The values of the headers in the HTTP response without any transformation.

This is the raw field version of the [http.response.headers.values](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/http.response.headers.values/) field. Raw fields, prefixed with `raw.`, preserve original response values for later evaluations. These fields are immutable during the entire request evaluation workflow, and they are not affected by the actions of previously matched rules.

Example value:

```txt
Example 1: ["application/json"]
Example 2: ["This header value is longer than 10 bytes"]
```

Example usage:

```txt
# Example 1: Check for specific header value.
any(raw.http.response.headers.values[*] == "application/json")

# Example 2: Match requests according to the specified operator and the length/size entered for the header value.
any(len(raw.http.response.headers.values[*])[*] gt 10)
```

Categories:
* Response
* Headers
* Raw fields

Was this helpful?

YesNo

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/raw.http.response.headers.values/#page","headline":"raw.http.response.headers.values · Cloudflare Ruleset Engine docs","description":"The values of the headers in the HTTP response without any transformation.","url":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/raw.http.response.headers.values/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
