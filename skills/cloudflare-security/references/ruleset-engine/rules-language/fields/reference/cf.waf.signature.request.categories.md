---
description: An array of categories associated with attack signatures that matched the request.
title: cf.waf.signature.request.categories
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

# cf.waf.signature.request.categories

`cf.waf.signature.request.categories` `Array<String>`

An array of categories associated with attack signatures that matched the request.

Available to customers with [Attack Signature Detection](https://developers.cloudflare.com/waf/detections/attack-signature-detection/) in Security Analytics and Custom Rules.

Contact your Cloudflare account team to request Early Access.

Example value:

```txt
["sqli", "cve-2025-55182"]
```

Example usage:

```txt
any(cf.waf.signature.request.categories[*] eq "sqli")
```

Categories:
* Request

Was this helpful?

YesNo

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.waf.signature.request.categories/#page","headline":"cf.waf.signature.request.categories · Cloudflare Ruleset Engine docs","description":"An array of categories associated with attack signatures that matched the request.","url":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.waf.signature.request.categories/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
