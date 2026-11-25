---
agent:
  instructions: "Use this search API to find relevant content across this site with keywords or natural-language queries, instead of crawling individual pages. Results are returned in Markdown."
  endpoint: "https://developers.cloudflare.com/.well-known/search?q={query}"
  method: "GET"
  documentation: "https://developers.cloudflare.com/ai-search/how-to/search-for-agents/"
description: Flag or block harmful prompts and prompt injection, and check eligible model responses for unsafe content across providers.
title: Guardrails
image: https://developers.cloudflare.com/ai-gateway/features/guardrails/og.png?v=07473cabdd119dd9
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-gateway/llms.txt
> Use this file to discover all available pages before exploring further.

# Guardrails

AI Gateway Guardrails checks traffic between your application and your [model providers](https://developers.cloudflare.com/ai-gateway/usage/providers/). Guardrails uses [`@cf/meta/llama-guard-3-8b`](https://developers.cloudflare.com/workers-ai/models/llama-guard-3-8b/) to check for content hazards (`S1` to `S14`). It uses `@cf/meta/prompt-guard-2-86m` to check prompts for [prompt injection ↗︎](https://www.cloudflare.com/learning/ai/prompt-injection/) (`P1`).

Configure one policy per gateway and apply it to supported traffic across providers, including OpenAI, Anthropic, DeepSeek, and Workers AI. Set the action for each supported category to **Flag**, **Block**, or **Ignore**.

Use [AI Gateway Logs](https://developers.cloudflare.com/ai-gateway/observability/logging/) to review evaluations for logged requests. Prompt and response bodies are available only when payloads are stored.

## Video demo

## How Guardrails work

Guardrails applies your configured policy in three steps:

1. **Intercept traffic**: AI Gateway proxies requests and responses between your application and its model provider.
2. **Evaluate prompts and responses**:
   - **User prompts**: Guardrails checks prompts for content hazards and prompt injection. If a prompt matches a category set to **Block**, it does not reach the model provider.
   - **Model responses**: Guardrails checks eligible response text for content hazards. It skips responses from embedding and unknown model types. For streaming requests, the REST API evaluates responses without enforcing the response policy. Gateway endpoints buffer streamed responses for evaluation and return a single non-streamed payload.
3. **Apply configured actions**: **Flag** marks a match for review without blocking it. **Ignore** takes no action for that category. A block returns error code `2016` for a prompt or `2017` for a response.

For setup steps, [hazard categories](https://developers.cloudflare.com/ai-gateway/features/guardrails/usage-considerations/#hazard-categories), [supported model types](https://developers.cloudflare.com/ai-gateway/features/guardrails/supported-model-types/), and [streaming behavior](https://developers.cloudflare.com/ai-gateway/features/guardrails/usage-considerations/#streaming-behavior), refer to [Set up Guardrails](https://developers.cloudflare.com/ai-gateway/features/guardrails/set-up-guardrail/).

## Related resources

- [Cloudflare Learning Center: How to prevent misuse of AI ↗︎](https://www.cloudflare.com/learning/ai/ai-misuse/)
- [Cloudflare Learning Center: How to prevent prompt injection ↗︎](https://www.cloudflare.com/learning/ai/prompt-injection/)
- [Cloudflare Learning Center: What is AI security? ↗︎](https://www.cloudflare.com/learning/ai/what-is-ai-security/)
- [Cloudflare Learning Center: What are the OWASP Top 10 risks for LLMs? ↗︎](https://www.cloudflare.com/learning/ai/owasp-top-10-risks-for-llms/)
- [Cloudflare Blog: Guardrails launch announcement ↗︎](https://blog.cloudflare.com/guardrails-in-ai-gateway/)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/ai-gateway/features/guardrails/#page","headline":"Guardrails","description":"Flag or block harmful prompts and prompt injection, and check eligible model responses for unsafe content across providers.","url":"https://developers.cloudflare.com/ai-gateway/features/guardrails/","inLanguage":"en","image":"https://developers.cloudflare.com/ai-gateway/features/guardrails/og.png?v=07473cabdd119dd9","dateModified":"2026-11-20","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["AI"]}
```
