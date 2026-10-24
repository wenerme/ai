---
description: Provides the stable UUID from a valid Cloudflare clearance cookie.
title: http.request.clearance.uuid
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

# http.request.clearance.uuid

`http.request.clearance.uuid``String`

Provides the stable UUID from a valid Cloudflare clearance cookie.

Use this field as an Advanced Rate Limiting characteristic to keep the same request counter when Cloudflare refreshes the encrypted `cf_clearance` cookie value.

The value is an empty string when the request does not contain a valid clearance cookie. Use `http.request.clearance.uuid ne ""` in the counting expression to exclude those requests from the clearance counter.

Categories:
- Request
- Cloudflare

Was this helpful?

YesNo

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/http.request.clearance.uuid/#page","headline":"http.request.clearance.uuid","description":"Provides the stable UUID from a valid Cloudflare clearance cookie.","url":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/http.request.clearance.uuid/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
