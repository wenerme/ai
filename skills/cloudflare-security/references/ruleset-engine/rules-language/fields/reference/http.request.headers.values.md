---
description: The values of the headers in the HTTP request.
title: http.request.headers.values
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

# http.request.headers.values

`http.request.headers.values` `Array<String>`

The values of the headers in the HTTP request.

The values are not pre-processed and retain the original case used in the request.

The order of header values is not guaranteed but will match [http.request.headers.names](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/http.request.headers.names/).

Duplicate headers are listed multiple times.

* **Decoding**: No decoding performed
* **Whitespace**: Preserved
* **Non-ASCII**: Preserved

When the HTTP request contains too many headers, this field may not contain the values of all of the headers sent in the HTTP request. In this situation, the [http.request.headers.truncated](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/http.request.headers.truncated/) field will be set to `true`.

**Note**: In HTTP/2, the names of HTTP headers are always in lowercase. Recent versions of the `curl` tool [enable HTTP/2 by default](https://curl.se/docs/manpage.html#--http2) for HTTPS connections.

Example value:

```txt
Example 1: ["application/json"]
Example 2: ["This header value is longer than 10 bytes"]
```

Example usage:

```txt
# Example 1: Check for specific header value.
any(http.request.headers.values[*] == "application/json")

# Example 2: Match requests according to the specified operator and the length/size entered for the header value.
any(len(http.request.headers.values[*])[*] gt 10)
```

Categories:
* Request
* Headers

Was this helpful?

YesNo

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/http.request.headers.values/#page","headline":"http.request.headers.values · Cloudflare Ruleset Engine docs","description":"The values of the headers in the HTTP request.","url":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/http.request.headers.values/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
