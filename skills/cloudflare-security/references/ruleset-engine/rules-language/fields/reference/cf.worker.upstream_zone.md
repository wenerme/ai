---
description: Identifies whether a request comes from a worker or not.
title: cf.worker.upstream_zone
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

# cf.worker.upstream\_zone

`cf.worker.upstream_zone` `String`

Identifies whether a request comes from a worker or not.

When a request comes from a worker, this field will hold the name of the zone for that worker. Otherwise, `cf.worker.upstream_zone` is empty.

Categories:
* Request

Was this helpful?

YesNo

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.worker.upstream_zone/#page","headline":"cf.worker.upstream_zone · Cloudflare Ruleset Engine docs","description":"Identifies whether a request comes from a worker or not.","url":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.worker.upstream_zone/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
