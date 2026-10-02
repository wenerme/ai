---
description: Ground AI agents and applications with real-time web search results from Ceramic.ai, Exa, and Linkup through AI Gateway.
title: Cloudflare Web Search API
image: https://developers.cloudflare.com/web-search/og.png?v=698c83104f2059c1
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/web-search/llms.txt
> Use this file to discover all available pages before exploring further.

# Cloudflare Web Search API

Last updated Oct 2, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/web-search/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Give your agents real-time web context with a single API call.

Available in open beta

Web Search API lets your AI agents and applications search the Internet and ground their responses in live information. Instead of guessing URLs or relying on a model's training cutoff, your agent sends a search query and receives structured results — titles, URLs, and descriptions — that you can pass straight into a model's context.

Web Search API runs through [AI Gateway](https://developers.cloudflare.com/ai-gateway/), so every search gets the same logging, analytics, billing, and access controls as your model inference requests. You can call it from any backend with the REST API, or from a Worker with the AI binding.

[How to use](https://developers.cloudflare.com/web-search/how-to-use/) [Browse providers](https://developers.cloudflare.com/web-search/providers/)

---

## Features

[Multiple search providers](https://developers.cloudflare.com/web-search/providers/)

Choose between Ceramic.ai, Exa, and Linkup with a single `provider` parameter. All providers return results in the same format, so you can switch without changing your code.

View providers

[Unified Billing](https://developers.cloudflare.com/ai-gateway/features/unified-billing/)

Pay for searches with your AI Gateway credits at each provider's list API price, with no additional markup. You can also bring your own provider API key.

Learn about Unified Billing

[Observability](https://developers.cloudflare.com/ai-gateway/observability/logging/)

Search requests appear in your AI Gateway logs and analytics alongside your model inference requests.

View logging

[Responsible crawling](https://developers.cloudflare.com/web-search/about/#crawler-standards)

Every provider commits to Cloudflare's [verified bot](https://developers.cloudflare.com/bots/concepts/bot/verified-bots/) requirements and returns a link to the source of every result.

Learn more

---

## Related products

[AI Gateway](https://developers.cloudflare.com/ai-gateway/)

Observe and control your AI applications with analytics, caching, rate limiting, and model fallback.

[Workers AI](https://developers.cloudflare.com/workers-ai/)

Run machine learning models, powered by serverless GPUs, on Cloudflare's global network.

[Agents](https://developers.cloudflare.com/agents/)

Build AI-powered agents that can perform tasks, persist state, browse the web, and communicate in real time.

---

## More resources

### [Developer Discord](https://discord.cloudflare.com)

Connect with the Workers community on Discord to ask questions, show what you are building, and discuss the platform with other developers.

### [Use cases](https://developers.cloudflare.com/use-cases/ai/)

Learn how you can build and deploy ambitious AI applications to Cloudflare's global network.

### [@CloudflareDev](https://x.com/cloudflaredev)

Follow @CloudflareDev on Twitter to learn about product announcements, and what is new in Cloudflare Workers.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/web-search/#page","headline":"Cloudflare Web Search API","description":"Ground AI agents and applications with real-time web search results from Ceramic.ai, Exa, and Linkup through AI Gateway.","url":"https://developers.cloudflare.com/web-search/","inLanguage":"en","image":"https://developers.cloudflare.com/web-search/og.png?v=698c83104f2059c1","dateModified":"2026-10-02","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["AI"]}
```
