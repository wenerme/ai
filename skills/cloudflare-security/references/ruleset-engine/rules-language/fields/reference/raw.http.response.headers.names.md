---
description: The names of the headers in the HTTP response without any transformation.
title: raw.http.response.headers.names
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

# raw.http.response.headers.names

`raw.http.response.headers.names` `Array<String>`

The names of the headers in the HTTP response without any transformation.

This is the raw field version of the [http.response.headers.names](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/http.response.headers.names/) field. Raw fields, prefixed with `raw.`, preserve original response values for later evaluations. These fields are immutable during the entire request evaluation workflow, and they are not affected by the actions of previously matched rules.

Example value:

```txt
["content-type"]
```

Example usage:

```txt
any(raw.http.response.headers.names[*] == "content-type")
```

Categories:
* Response
* Headers
* Raw fields

Was this helpful?

YesNo

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/raw.http.response.headers.names/#page","headline":"raw.http.response.headers.names · Cloudflare Ruleset Engine docs","description":"The names of the headers in the HTTP response without any transformation.","url":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/raw.http.response.headers.names/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
