---
description: Evaluate AI Gateway prompts and responses for harmful content and enforce safety policies across providers.
title: Guardrails
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-gateway/llms.txt
> Use this file to discover all available pages before exploring further.

# Guardrails

Last updated Jun 5, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ai-gateway/features/guardrails/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Guardrails help you deploy AI applications safely by intercepting and evaluating both user prompts and model responses for harmful content. Acting as a proxy between your application and [model providers](https://developers.cloudflare.com/ai-gateway/usage/providers/) (such as OpenAI, Anthropic, DeepSeek, and others), AI Gateway's Guardrails ensure a consistent and secure experience across your entire AI ecosystem.

Guardrails proactively monitor interactions between users and AI models, giving you:

* **Consistent moderation**: Uniform moderation layer that works across models and providers.
* **Enhanced safety and user trust**: Proactively protect users from harmful or inappropriate interactions.
* **Flexibility and control over allowed content**: Specify which categories to monitor and choose between flagging or outright blocking.
* **Auditing and compliance capabilities**: Receive updates on evolving regulatory requirements with logs of user prompts, model responses, and enforced guardrails.

## Video demo

## How Guardrails work

AI Gateway inspects all interactions in real time by evaluating content against predefined safety parameters. Guardrails work by:

1. Intercepting interactions: AI Gateway proxies requests and responses, sitting between the user and the AI model.
2. Inspecting content:

  * User prompts: AI Gateway checks prompts against safety parameters (for example, violence, hate, or sexual content). Based on your settings, prompts can be flagged or blocked before reaching the model.
  * Model responses: Once processed, the AI model response is inspected. If hazardous content is detected, it can be flagged or blocked before being delivered to the user.
3. Applying actions: Depending on your configuration, flagged content is logged for review, while blocked content is prevented from proceeding.

## Related resource

* [Cloudflare Blog: Keep AI interactions secure and risk-free with Guardrails in AI Gateway ↗](https://blog.cloudflare.com/guardrails-in-ai-gateway/)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/ai-gateway/features/guardrails/#page","headline":"Guardrails · Cloudflare AI Gateway docs","description":"Evaluate AI Gateway prompts and responses for harmful content and enforce safety policies across providers.","url":"https://developers.cloudflare.com/ai-gateway/features/guardrails/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-06-05","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["AI"]}
```
