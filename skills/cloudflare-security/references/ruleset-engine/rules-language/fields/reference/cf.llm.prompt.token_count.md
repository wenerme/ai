---
description: An estimated token count for the LLM prompt in the request.
title: cf.llm.prompt.token_count
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

#  cf.llm.prompt.token\_count

`cf.llm.prompt.token_count` ` Number `

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

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.llm.prompt.token_count/#page","headline":"cf.llm.prompt.token_count · Cloudflare Ruleset Engine docs","description":"An estimated token count for the LLM prompt in the request.","url":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.llm.prompt.token_count/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
