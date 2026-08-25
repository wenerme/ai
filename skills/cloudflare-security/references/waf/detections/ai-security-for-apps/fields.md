---
description: Fields available for AI Security for Apps detections in rule expressions.
title: AI Security for Apps fields
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/waf/llms.txt
> Use this file to discover all available pages before exploring further.

# AI Security for Apps fields

Last updated Apr 16, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/waf/detections/ai-security-for-apps/fields/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

When enabled, AI Security for Apps populates the following fields:

| Field                                                                                                                                                                                                            | Description                                                                                                                                                                                                                                                                       |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| LLM PII detected [cf.llm.prompt.pii\_detected](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.llm.prompt.pii%5Fdetected/) Boolean                                           | Indicates whether any personally identifiable information (PII) has been detected in the LLM prompt included in the request.                                                                                                                                                      |
| LLM PII categories [cf.llm.prompt.pii\_categories](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.llm.prompt.pii%5Fcategories/) Array<String>                               | Array of string values with the personally identifiable information (PII) categories found in the LLM prompt included in the request.[Category list](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.llm.prompt.pii%5Fcategories/)            |
| LLM Content detected [cf.llm.prompt.detected](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.llm.prompt.detected/) Boolean                                                  | Indicates whether Cloudflare detected an LLM prompt in the incoming request.                                                                                                                                                                                                      |
| LLM Unsafe topic detected [cf.llm.prompt.unsafe\_topic\_detected](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.llm.prompt.unsafe%5Ftopic%5Fdetected/) Boolean             | Indicates whether the incoming request includes any unsafe topic category in the LLM prompt.                                                                                                                                                                                      |
| LLM Unsafe topic categories [cf.llm.prompt.unsafe\_topic\_categories](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.llm.prompt.unsafe%5Ftopic%5Fcategories/) Array<String> | Array of string values with the type of unsafe topics detected in the LLM prompt.[Category list](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.llm.prompt.unsafe%5Ftopic%5Fcategories/)                                                     |
| LLM Injection score [cf.llm.prompt.injection\_score](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.llm.prompt.injection%5Fscore/) Number                                   | A score from 1–99 that represents the likelihood that the LLM prompt in the request is trying to perform a prompt injection attack. Lower scores indicate higher risk.                                                                                                            |
| LLM Token count [cf.llm.prompt.token\_count](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.llm.prompt.token%5Fcount/) Number                                               | An estimated token count for the LLM prompt in the request. Refer to [Token counting](https://developers.cloudflare.com/waf/detections/ai-security-for-apps/token-counting/) for details.                                                                                         |
| LLM Custom topic categories [cf.llm.prompt.custom\_topic\_categories](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.llm.prompt.custom%5Ftopic%5Fcategories/) Map<Number>   | A map of custom topic labels to relevance scores (1–99). Lower scores indicate the prompt is more relevant to that topic. Only populated when [custom topics](https://developers.cloudflare.com/waf/detections/ai-security-for-apps/unsafe-topics/#custom-topics) are configured. |

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/waf/detections/ai-security-for-apps/fields/#page","headline":"AI Security for Apps fields · Cloudflare Web Application Firewall (WAF) docs","description":"Fields available for AI Security for Apps detections in rule expressions.","url":"https://developers.cloudflare.com/waf/detections/ai-security-for-apps/fields/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["AI"]}
```
