---
description: Indicates whether the incoming request includes any unsafe topic category in the LLM prompt.
title: cf.llm.prompt.unsafe_topic_detected
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

#  cf.llm.prompt.unsafe\_topic\_detected

`cf.llm.prompt.unsafe_topic_detected` ` Boolean `

Indicates whether the incoming request includes any unsafe topic category in the LLM prompt.

Equivalent to checking if the [cf.llm.prompt.unsafe\_topic\_categories](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.llm.prompt.unsafe%5Ftopic%5Fcategories/) field is not empty.

Requires a Cloudflare Enterprise plan. You must also enable [AI Security for Apps](https://developers.cloudflare.com/waf/detections/ai-security-for-apps/).

Categories:
* Request

Was this helpful?

YesNo

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.llm.prompt.unsafe_topic_detected/#page","headline":"cf.llm.prompt.unsafe_topic_detected · Cloudflare Ruleset Engine docs","description":"Indicates whether the incoming request includes any unsafe topic category in the LLM prompt.","url":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.llm.prompt.unsafe_topic_detected/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
