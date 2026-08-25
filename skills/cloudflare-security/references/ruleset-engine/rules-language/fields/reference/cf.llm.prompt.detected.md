---
description: Indicates whether Cloudflare detected an LLM prompt in the incoming request.
title: cf.llm.prompt.detected
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

# cf.llm.prompt.detected

`cf.llm.prompt.detected` `Boolean`

Indicates whether Cloudflare detected an LLM prompt in the incoming request.

When a prompt is not present, the other LLM-related fields will have default values.

Requires a Cloudflare Enterprise plan. You must also enable [AI Security for Apps](https://developers.cloudflare.com/waf/detections/ai-security-for-apps/).

Categories:
* Request

Was this helpful?

YesNo

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.llm.prompt.detected/#page","headline":"cf.llm.prompt.detected · Cloudflare Ruleset Engine docs","description":"Indicates whether Cloudflare detected an LLM prompt in the incoming request.","url":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.llm.prompt.detected/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
