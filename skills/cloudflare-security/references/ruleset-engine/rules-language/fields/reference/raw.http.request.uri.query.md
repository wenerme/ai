---
description: The entire query string without the `?` delimiter and without any transformation.
title: raw.http.request.uri.query
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

# raw.http.request.uri.query

`raw.http.request.uri.query` `String`

The entire query string without the `?` delimiter and without any transformation.

This is the raw field version of the [http.request.uri.query](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/http.request.uri.query/) field. Raw fields, prefixed with `raw.`, preserve original request values for later evaluations. These fields are immutable during the entire request evaluation workflow, and they are not affected by the actions of previously matched rules.

**Note**: This raw field may include some basic normalization done by Cloudflare's HTTP server. However, this can change in the future.

Categories:
* Request
* URI
* Raw fields

Was this helpful?

YesNo

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/raw.http.request.uri.query/#page","headline":"raw.http.request.uri.query · Cloudflare Ruleset Engine docs","description":"The entire query string without the ? delimiter and without any transformation.","url":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/raw.http.request.uri.query/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
