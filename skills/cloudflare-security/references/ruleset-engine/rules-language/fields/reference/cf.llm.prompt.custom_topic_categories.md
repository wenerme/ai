---
description: A map of custom topic labels to relevance scores (1–99) for the LLM prompt in the request.
title: cf.llm.prompt.custom_topic_categories
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

#  cf.llm.prompt.custom\_topic\_categories

`cf.llm.prompt.custom_topic_categories` ` Map<Number> `

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

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.llm.prompt.custom_topic_categories/#page","headline":"cf.llm.prompt.custom_topic_categories · Cloudflare Ruleset Engine docs","description":"A map of custom topic labels to relevance scores (1–99) for the LLM prompt in the request.","url":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.llm.prompt.custom_topic_categories/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
