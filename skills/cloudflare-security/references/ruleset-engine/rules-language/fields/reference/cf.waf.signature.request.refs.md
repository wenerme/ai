---
description: An array containing up to 10 Refs for attack signatures that matched the request.
title: cf.waf.signature.request.refs
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

# cf.waf.signature.request.refs

`cf.waf.signature.request.refs` `Array<String>`

An array containing up to 10 Refs for attack signatures that matched the request.

Each Ref is the same value as the corresponding Cloudflare Managed Rules public Rule ID.

Available to customers with [Attack Signature Detection](https://developers.cloudflare.com/waf/detections/attack-signature-detection/) in Security Analytics and Custom Rules. Contact your Cloudflare account team to request Early Access.

Example value:

```txt
["d68f8101f6e14e25aefcaea69c530a29"]
```

Example usage:

```txt
any(cf.waf.signature.request.refs[*] eq "d68f8101f6e14e25aefcaea69c530a29")
```

Categories:
* Request

Was this helpful?

YesNo

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.waf.signature.request.refs/#page","headline":"cf.waf.signature.request.refs · Cloudflare Ruleset Engine docs","description":"An array containing up to 10 Refs for attack signatures that matched the request.","url":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.waf.signature.request.refs/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
