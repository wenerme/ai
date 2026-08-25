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

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/http.request.headers/#page","headline":"http.request.headers · Cloudflare Ruleset Engine docs","description":"The HTTP request headers represented as a Map (or associative array).","url":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/http.request.headers/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
