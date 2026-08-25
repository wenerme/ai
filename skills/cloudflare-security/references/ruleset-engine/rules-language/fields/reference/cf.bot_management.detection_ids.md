---
description: List of IDs that correlate to the Bot Management heuristic detections made on a request.
title: cf.bot_management.detection_ids
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

# cf.bot\_management.detection\_ids

`cf.bot_management.detection_ids` `Array<Number>`

List of IDs that correlate to the Bot Management heuristic detections made on a request.

Use this field to explicitly match a specific heuristic or to exclude a heuristic in a rule. You can have multiple heuristic detections on the same request.

Requires a Cloudflare Enterprise plan with [Bot Management](https://developers.cloudflare.com/bots/plans/bm-subscription/) enabled.

Example usage:

```txt
any(cf.bot_management.detection_ids[*] eq 33554817)
```

Categories:
* Request
* Bots

Was this helpful?

YesNo

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.bot_management.detection_ids/#page","headline":"cf.bot_management.detection_ids · Cloudflare Ruleset Engine docs","description":"List of IDs that correlate to the Bot Management heuristic detections made on a request.","url":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.bot_management.detection_ids/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
