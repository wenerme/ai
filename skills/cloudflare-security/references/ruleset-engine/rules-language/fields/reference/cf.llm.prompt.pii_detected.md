---
description: Indicates whether any personally identifiable information (PII) has been detected in the LLM prompt included in the request.
title: cf.llm.prompt.pii_detected
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

# cf.llm.prompt.pii\_detected

`cf.llm.prompt.pii_detected` `Boolean`

Indicates whether any personally identifiable information (PII) has been detected in the LLM prompt included in the request.

Equivalent to checking if the [cf.llm.prompt.pii\_categories](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.llm.prompt.pii%5Fcategories/) field is not empty.

Requires a Cloudflare Enterprise plan. You must also enable [AI Security for Apps](https://developers.cloudflare.com/waf/detections/ai-security-for-apps/).

Categories:
* Request

Was this helpful?

YesNo

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.llm.prompt.pii_detected/#page","headline":"cf.llm.prompt.pii_detected · Cloudflare Ruleset Engine docs","description":"Indicates whether any personally identifiable information (PII) has been detected in the LLM prompt included in the request.","url":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.llm.prompt.pii_detected/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
