---
description: The total size of the HTTP request body (in bytes).
title: http.request.body.size
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

# http.request.body.size

`http.request.body.size` `Number`

The total size of the HTTP request body (in bytes).

This field may have a value larger than the one returned by `len(http.request.body.raw)`, since the [http.request.body.raw](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/http.request.body.raw/) field only considers the request body up to a maximum size that varies according to your Cloudflare plan.

Requires a Cloudflare Enterprise plan.

Categories:
* Request
* Body

Was this helpful?

YesNo

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/http.request.body.size/#page","headline":"http.request.body.size · Cloudflare Ruleset Engine docs","description":"The total size of the HTTP request body (in bytes).","url":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/http.request.body.size/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
