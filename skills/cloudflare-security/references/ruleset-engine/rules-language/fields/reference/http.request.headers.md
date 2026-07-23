---
description: The HTTP request headers represented as a Map (or associative array).
title: http.request.headers
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

# http.request.headers

`http.request.headers` `Map<Array<String>>`

The HTTP request headers represented as a Map (or associative array).

The keys of the associative array are the names of HTTP request headers converted to lowercase.

When there are repeating headers, the array includes them in the order they appear in the request.

The request header values are not pre-processed and retain the original case used in the request.

* **Decoding**: No decoding performed
* **Whitespace**: Preserved
* **Non-ASCII**: Preserved

When the HTTP request contains too many headers, this field may not contain all of the headers sent in the HTTP request. In this situation, the [http.request.headers.truncated](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/http.request.headers.truncated/) field will be set to `true`.

Example value:

```txt
{"content-type": ["application/json"]}
```

Example usage:

```txt
any(http.request.headers["content-type"][*] == "application/json")
```

Categories:
* Request
* Headers

Was this helpful?

YesNo

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/http.request.headers/#page","headline":"http.request.headers · Cloudflare Ruleset Engine docs","description":"The HTTP request headers represented as a Map (or associative array).","url":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/http.request.headers/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
