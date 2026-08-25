---
description: The attack score class of the current request, based on the WAF attack score.
title: cf.waf.score.class
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

# cf.waf.score.class

`cf.waf.score.class` `String`

The attack score class of the current request, based on the WAF attack score.

Can have one of the following values: `attack`, `likely_attack`, `likely_clean`, `clean`.

Requires a Cloudflare Business plan or above. You must also enable [attack score detection](https://developers.cloudflare.com/waf/detections/attack-score/).

Categories:
* Request

Was this helpful?

YesNo

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.waf.score.class/#page","headline":"cf.waf.score.class · Cloudflare Ruleset Engine docs","description":"The attack score class of the current request, based on the WAF attack score.","url":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.waf.score.class/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
