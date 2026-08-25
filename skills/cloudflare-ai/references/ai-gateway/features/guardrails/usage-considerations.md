---
description: Understand latency, availability, language support, and Workers AI usage when enabling AI Gateway Guardrails.
title: Usage considerations
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-gateway/llms.txt
> Use this file to discover all available pages before exploring further.

# Usage considerations

Last updated Aug 13, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ai-gateway/features/guardrails/usage-considerations/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Guardrails currently uses [Llama Guard 3 8B ↗](https://ai.meta.com/research/publications/llama-guard-llm-based-input-output-safeguard-for-human-ai-conversations/) on [Workers AI](https://developers.cloudflare.com/workers-ai/) to perform content evaluations. The underlying model may be updated in the future, and we will reflect those changes within Guardrails.

Since Guardrails runs on Workers AI, enabling it incurs usage on Workers AI. You can monitor usage through the Workers AI Dashboard.

## Hazard categories

Guardrails evaluate content against the following hazard categories. Each category is identified by a code that appears in your Guardrail configuration and in AI Gateway Logs. You can independently set each category to **Flag**, **Ignore**, or **Block** for prompts and responses.

Guardrails evaluate categories `S1` through `S13`, a subset of the [Llama Guard 3 ↗ ↗](https://ai.meta.com/research/publications/llama-guard-llm-based-input-output-safeguard-for-human-ai-conversations/) hazard categories, using the [@cf/meta/llama-guard-3-8b](https://developers.cloudflare.com/workers-ai/models/llama-guard-3-8b/) model on Workers AI. The Llama Guard 3 category `S14` (Code interpreter abuse) is not evaluated by Guardrails. Category `P1` is prompt injection, evaluated separately by the `@cf/meta/prompt-guard-2-86m` model.

These codes also appear in the `guardrails` property of the AI Gateway REST API, where you configure each category's action programmatically. See the [create](https://developers.cloudflare.com/api/resources/ai%5Fgateway/methods/create/) and [update](https://developers.cloudflare.com/api/resources/ai%5Fgateway/methods/update/) methods.

| Code | Category                  |
| ---- | ------------------------- |
| S1   | Violent Crimes            |
| S2   | Non-Violent Crimes        |
| S3   | Sex-Related Crimes        |
| S4   | Child Sexual Exploitation |
| S5   | Defamation                |
| S6   | Specialized Advice        |
| S7   | Privacy                   |
| S8   | Intellectual Property     |
| S9   | Indiscriminate Weapons    |
| S10  | Hate                      |
| S11  | Suicide & Self-Harm       |
| S12  | Sexual Content            |
| S13  | Elections                 |
| P1   | Prompt Injection          |

## Additional considerations

* **Model availability**: If at least one hazard category is set to `block`, but AI Gateway is unable to receive a response from Workers AI, the request will be blocked. Conversely, if a hazard category is set to `flag` and AI Gateway cannot obtain a response from Workers AI, the request will proceed without evaluation. This approach prioritizes availability, allowing requests to continue even when content evaluation is not possible.
* **Latency impact**: Enabling Guardrails introduces additional latency to requests. Typically, evaluations using Llama Guard 3 8B on Workers AI add approximately 500 milliseconds per request. However, larger requests may experience increased latency, though this increase is not linear. Consider this when balancing safety and performance.
* **Handling long content**: When evaluating long prompts or responses, Guardrails automatically segments the content into smaller chunks, processing each through separate Guardrail requests. This approach ensures comprehensive moderation but may result in increased latency for longer inputs.
* **Supported languages**: Llama Guard 3.3 8B supports content safety classification in the following languages: English, French, German, Hindi, Italian, Portuguese, Spanish, and Thai.
* **Streaming support**: Streaming is not supported when using Guardrails.

Note

Llama Guard is provided as-is without any representations, warranties, or guarantees. Any rules or examples contained in blogs, developer docs, or other reference materials are provided for informational purposes only. You acknowledge and understand that you are responsible for the results and outcomes of your use of AI Gateway.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-gateway/features/guardrails/usage-considerations/#page","headline":"Usage considerations · Cloudflare AI Gateway docs","description":"Understand latency, availability, language support, and Workers AI usage when enabling AI Gateway Guardrails.","url":"https://developers.cloudflare.com/ai-gateway/features/guardrails/usage-considerations/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-13","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
