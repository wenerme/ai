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

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.llm.prompt.pii_detected/#page","headline":"cf.llm.prompt.pii_detected · Cloudflare Ruleset Engine docs","description":"Indicates whether any personally identifiable information (PII) has been detected in the LLM prompt included in the request.","url":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.llm.prompt.pii_detected/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
