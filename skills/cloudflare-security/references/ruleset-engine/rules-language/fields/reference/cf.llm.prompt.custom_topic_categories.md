---
description: A map of custom topic labels to relevance scores (1–99) for the LLM prompt in the request.
title: cf.llm.prompt.custom_topic_categories
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

# cf.llm.prompt.custom\_topic\_categories

`cf.llm.prompt.custom_topic_categories` `Map<Number>`

A map of custom topic labels to relevance scores (1–99) for the LLM prompt in the request.

Lower scores indicate the prompt is more relevant to that topic. Only populated when [custom topics](https://developers.cloudflare.com/waf/detections/ai-security-for-apps/unsafe-topics/#custom-topics) are configured.

Requires a Cloudflare Enterprise plan. You must also enable [AI Security for Apps](https://developers.cloudflare.com/waf/detections/ai-security-for-apps/).

Example usage:

```txt
# Matches requests where the prompt is highly relevant to the "competitors" custom topic:
(cf.llm.prompt.custom_topic_categories["competitors"] lt 30)
```

Categories:
* Request

Was this helpful?

YesNo

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.llm.prompt.custom_topic_categories/#page","headline":"cf.llm.prompt.custom_topic_categories · Cloudflare Ruleset Engine docs","description":"A map of custom topic labels to relevance scores (1–99) for the LLM prompt in the request.","url":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.llm.prompt.custom_topic_categories/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
