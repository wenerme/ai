---
description: Indicates whether the HTTP request contains too many headers.
title: http.request.headers.truncated
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

# http.request.headers.truncated

`http.request.headers.truncated` `Boolean`

Indicates whether the HTTP request contains too many headers.

When `true`, [http.request.headers](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/http.request.headers/), [http.request.headers.names](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/http.request.headers.names/), and [http.request.headers.values](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/http.request.headers.values/) may not contain all of the headers sent in the HTTP request.

Categories:
* Request
* Headers

Was this helpful?

YesNo

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/http.request.headers.truncated/#page","headline":"http.request.headers.truncated · Cloudflare Ruleset Engine docs","description":"Indicates whether the HTTP request contains too many headers.","url":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/http.request.headers.truncated/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
