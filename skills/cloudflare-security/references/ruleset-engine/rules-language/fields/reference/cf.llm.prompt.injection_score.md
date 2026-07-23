---
description: A score from 1–99 that represents the likelihood that the LLM prompt in the request is trying to perform a prompt injection attack.
title: cf.llm.prompt.injection_score
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

# cf.llm.prompt.injection\_score

`cf.llm.prompt.injection_score` `Number`

A score from 1–99 that represents the likelihood that the LLM prompt in the request is trying to perform a prompt injection attack.

A low score (for example, below `20`) indicates that there is a high probability that the LLM prompt in the request is trying to perform a prompt injection attack.

The special score `100` indicates that Cloudflare did not score the request.

Requires a Cloudflare Enterprise plan. You must also enable [AI Security for Apps](https://developers.cloudflare.com/waf/detections/ai-security-for-apps/).

Categories:
* Request

Was this helpful?

YesNo

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.llm.prompt.injection_score/#page","headline":"cf.llm.prompt.injection_score · Cloudflare Ruleset Engine docs","description":"A score from 1–99 that represents the likelihood that the LLM prompt in the request is trying to perform a prompt injection attack.","url":"https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/cf.llm.prompt.injection_score/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
