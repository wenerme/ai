---
description: Indicates whether the incoming request comes from an identified Enterprise-only cloud-based corporate proxy or secure web gateway.
title: cf.bot_management.corporate_proxy
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

# cf.bot\_management.corporate\_proxy

`cf.bot_management.corporate_proxy` `Boolean`

Indicates whether the incoming request comes from an identified Enterprise-only cloud-based corporate proxy or secure web gateway.

Requires a Cloudflare Enterprise plan with [Bot Management](https://developers.cloudflare.com/bots/plans/bm-subscription/) enabled.

Example usage:

```txt
not cf.bot_management.verified_bot
and not cf.bot_management.static_resource
and not cf.bot_management.corporate_proxy
and cf.bot_management.score lt 30
```

Categories:
* Request
* Bots

Was this helpful?

YesNo

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.bot_management.corporate_proxy/#page","headline":"cf.bot_management.corporate_proxy · Cloudflare Ruleset Engine docs","description":"Indicates whether the incoming request comes from an identified Enterprise-only cloud-based corporate proxy or secure web gateway.","url":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.bot_management.corporate_proxy/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
