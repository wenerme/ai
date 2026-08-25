---
description: The HTTP response headers represented as a Map (or associative array).
title: http.response.headers
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

# http.response.headers

`http.response.headers` `Map<Array<String>>`

The HTTP response headers represented as a Map (or associative array).

When there are repeating headers, the array includes them in the order they appear in the response. The keys convert to lowercase.

* **Decoding**: No decoding performed
* **Whitespace**: Preserved
* **Non-ASCII**: Preserved

**Note**: The availability of HTTP response fields depends on the exact Cloudflare feature and your Cloudflare plan.

Example value:

```txt
{"server": ["nginx"]}
```

Example usage:

```txt
any(http.response.headers["server"][*] == "nginx")
```

Categories:
* Response
* Headers

Was this helpful?

YesNo

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/http.response.headers/#page","headline":"http.response.headers · Cloudflare Ruleset Engine docs","description":"The HTTP response headers represented as a Map (or associative array).","url":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/http.response.headers/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
