---
description: The HTTP URI arguments associated with a request represented as a Map (associative array).
title: http.request.uri.args
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

# http.request.uri.args

`http.request.uri.args` `Map<Array<String>>`

The HTTP URI arguments associated with a request represented as a Map (associative array).

When an argument repeats, the array contains multiple items in the order they appear in the request.

The values are not pre-processed and retain the original case used in the request.

* **Decoding**: No decoding performed
* **Non-ASCII**: Preserved

Example value:

```txt
{"search": ["red+apples"]}
```

Example usage:

```txt
any(http.request.uri.args["search"][*] == "red+apples")
```

Categories:
* Request
* URI

Was this helpful?

YesNo

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/http.request.uri.args/#page","headline":"http.request.uri.args · Cloudflare Ruleset Engine docs","description":"The HTTP URI arguments associated with a request represented as a Map (associative array).","url":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/http.request.uri.args/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
