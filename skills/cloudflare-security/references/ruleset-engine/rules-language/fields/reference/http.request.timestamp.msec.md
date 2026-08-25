---
description: The millisecond when Cloudflare received the request, between 0–999.
title: http.request.timestamp.msec
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

# http.request.timestamp.msec

`http.request.timestamp.msec` `Integer`

The millisecond when Cloudflare received the request, between 0–999.

To obtain the complete timestamp, use both [http.request.timestamp.sec](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/http.request.timestamp.sec/) and [http.request.timestamp.msec](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/http.request.timestamp.msec/) fields.

Example value:

```txt
857
```

Categories:
* Request

Was this helpful?

YesNo

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/http.request.timestamp.msec/#page","headline":"http.request.timestamp.msec · Cloudflare Ruleset Engine docs","description":"The millisecond when Cloudflare received the request, between 0–999.","url":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/http.request.timestamp.msec/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
