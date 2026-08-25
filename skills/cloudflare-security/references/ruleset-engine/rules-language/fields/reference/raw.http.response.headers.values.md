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

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/raw.http.response.headers.values/#page","headline":"raw.http.response.headers.values · Cloudflare Ruleset Engine docs","description":"The values of the headers in the HTTP response without any transformation.","url":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/raw.http.response.headers.values/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
