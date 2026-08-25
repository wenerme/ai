---
description: The names of the headers in the HTTP request.
title: http.request.headers.names
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

# http.request.headers.names

`http.request.headers.names` `Array<String>`

The names of the headers in the HTTP request.

The names are not pre-processed and retain the original case used in the request.

The order of header names is not guaranteed but will match [http.request.headers.values](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/http.request.headers.values/).

Duplicate headers are listed multiple times.

* **Decoding**: No decoding performed
* **Whitespace**: Preserved
* **Non-ASCII**: Preserved

When the HTTP request contains too many headers, this field may not contain the names of all of the headers sent in the HTTP request. In this situation, the [http.request.headers.truncated](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/http.request.headers.truncated/) field will be set to `true`.

**Note**: In HTTP/2, the names of HTTP headers are always in lowercase. Recent versions of the `curl` tool [enable HTTP/2 by default](https://curl.se/docs/manpage.html#--http2) for HTTPS connections.

Example value:

```txt
["content-type"]
```

Example usage:

```txt
any(http.request.headers.names[*] == "content-type")
```

Categories:
* Request
* Headers

Was this helpful?

YesNo

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/http.request.headers.names/#page","headline":"http.request.headers.names · Cloudflare Ruleset Engine docs","description":"The names of the headers in the HTTP request.","url":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/http.request.headers.names/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
