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

Last updated Apr 16, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/waf/detections/ai-security-for-apps/fields/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

When enabled, AI Security for Apps populates the following fields:

| Field | Description |
| --- | --- |
| LLM PII detected <br> [`cf.llm.prompt.pii_detected`](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.llm.prompt.pii_detected/) <br> `Boolean` | Indicates whether any personally identifiable information (PII) has been detected in the LLM prompt included in the request. |
| LLM PII categories <br> [`cf.llm.prompt.pii_categories`](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.llm.prompt.pii_categories/) <br> `Array<String>` | Array of string values with the personally identifiable information (PII) categories found in the LLM prompt included in the request.<br>[Category list](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.llm.prompt.pii_categories/) |
| LLM Content detected <br> [`cf.llm.prompt.detected`](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.llm.prompt.detected/) <br> `Boolean` | Indicates whether Cloudflare detected an LLM prompt in the incoming request. |
| LLM Unsafe topic detected <br> [`cf.llm.prompt.unsafe_topic_detected`](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.llm.prompt.unsafe_topic_detected/) <br> `Boolean` | Indicates whether the incoming request includes any unsafe topic category in the LLM prompt. |
| LLM Unsafe topic categories <br> [`cf.llm.prompt.unsafe_topic_categories`](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.llm.prompt.unsafe_topic_categories/) <br> `Array<String>` | Array of string values with the type of unsafe topics detected in the LLM prompt.<br>[Category list](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.llm.prompt.unsafe_topic_categories/) |
| LLM Injection score <br> [`cf.llm.prompt.injection_score`](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.llm.prompt.injection_score/) <br> `Number` | A score from 1–99 that represents the likelihood that the LLM prompt in the request is trying to perform a prompt injection attack. Lower scores indicate higher risk. |
| LLM Token count <br> [`cf.llm.prompt.token_count`](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.llm.prompt.token_count/) <br> `Number` | An estimated token count for the LLM prompt in the request. Refer to [Token counting](https://developers.cloudflare.com/waf/detections/ai-security-for-apps/token-counting/) for details. |
| LLM Custom topic categories <br> [`cf.llm.prompt.custom_topic_categories`](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.llm.prompt.custom_topic_categories/) <br> `Map<Number>` | A map of custom topic labels to relevance scores (1–99). Lower scores indicate the prompt is more relevant to that topic. Only populated when [custom topics](https://developers.cloudflare.com/waf/detections/ai-security-for-apps/unsafe-topics/#custom-topics) are configured. |

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/waf/detections/ai-security-for-apps/fields/#page","headline":"AI Security for Apps fields","description":"Fields available for AI Security for Apps detections in rule expressions.","url":"https://developers.cloudflare.com/waf/detections/ai-security-for-apps/fields/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["AI"]}
```
