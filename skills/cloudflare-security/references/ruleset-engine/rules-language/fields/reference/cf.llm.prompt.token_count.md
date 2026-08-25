---
description: An estimated token count for the LLM prompt in the request.
title: cf.llm.prompt.token_count
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

# cf.llm.prompt.token\_count

`cf.llm.prompt.token_count` `Number`

An estimated token count for the LLM prompt in the request.

The count is calculated using a general-purpose tokenizer and may not exactly match the count reported by your LLM provider.

Requires a Cloudflare Enterprise plan. You must also enable [AI Security for Apps](https://developers.cloudflare.com/waf/detections/ai-security-for-apps/).

Example usage:

```txt
# Matches requests where the estimated token count exceeds 4,000:
(cf.llm.prompt.token_count gt 4000)
```

Categories:
* Request

Was this helpful?

YesNo

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.llm.prompt.token_count/#page","headline":"cf.llm.prompt.token_count · Cloudflare Ruleset Engine docs","description":"An estimated token count for the LLM prompt in the request.","url":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.llm.prompt.token_count/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
