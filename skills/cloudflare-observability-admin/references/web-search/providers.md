---
description: Compare Web Search API providers Ceramic.ai, Exa, and Linkup, including Zero Data Retention terms and list API pricing.
title: Providers
image: https://developers.cloudflare.com/web-search/providers/og.png?v=5d5d95a471b9c663
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/web-search/llms.txt
> Use this file to discover all available pages before exploring further.

# Providers

Last updated Oct 2, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/web-search/providers/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Web Search API supports the following search providers. Set the `provider` parameter in your request to choose one. If you do not set a provider, Web Search API uses Ceramic.ai as default.

When you pay with [AI Gateway credits](https://developers.cloudflare.com/ai-gateway/features/unified-billing/), each search is billed at the provider's list API price, with no additional markup. If you [bring your own key](https://developers.cloudflare.com/web-search/how-to-use/#bring-your-own-key-byok), the provider bills you directly under your own agreement with them.

## [Ceramic.ai ↗︎](https://ceramic.ai/)

Ceramic.ai is the default provider for Web Search API. Ceramic.ai runs its own independent web index of more than 40 billion pages, designed for AI agents and LLM applications rather than human search.

Ceramic.ai focuses on low-latency, low-cost search, which makes it a good fit for agents that run many searches per task, for grounding chatbot answers in current information, and for checking model output against live web sources. Results include long descriptions of each page, up to 8,000 characters.

| Property | Value |
| --- | --- |
| `provider` | `ceramic` |
| Zero Data Retention | Yes |
| Price | $0.25 per 1,000 requests |
| Documentation | [Ceramic.ai documentation ↗︎](https://docs.ceramic.ai/) |
| Terms | [Terms of service ↗︎](https://ceramic.ai/terms-of-service) |

## [Exa ↗︎](https://exa.ai/)

Exa is a search engine built for AI, with its own index that combines traditional keyword search with embeddings-based search. Web Search API uses the [Exa Search API ↗︎](https://exa.ai/docs/reference/search).

Requests use Exa's `auto` search type, a balanced mode that Exa optimizes for both result quality and speed. Each result includes highlights — the text snippets from the page that are most relevant to your query — returned as the result description. Exa is a good fit when you want to pass concise, query-relevant excerpts straight into a model's context.

| Property | Value |
| --- | --- |
| `provider` | `exa` |
| Zero Data Retention | Yes |
| Price | $7.00 per 1,000 requests |
| Search mode | `auto` search type, with page highlights returned as the result description |
| Documentation | [Exa Search API documentation ↗︎](https://exa.ai/docs/reference/search) |
| Terms | [Exa Zero Data Retention ↗︎](https://exa.ai/docs/admin/security/zero-data-retention) |

## [Linkup ↗︎](https://www.linkup.so/)

Linkup provides web search built for AI applications, returning sourced results with text snippets from across the web. Web Search API uses the [Linkup Search API ↗︎](https://docs.linkup.so/pages/documentation/endpoints/search/overview).

Requests use Linkup's `fast` search depth with raw search results, so Linkup returns results without generating an answer. This makes Linkup a good fit for agent tool calls that need quick, cited results from trusted sources.

| Property | Value |
| --- | --- |
| `provider` | `linkup` |
| Zero Data Retention | Yes |
| Price | $5.00 per 1,000 requests |
| Search mode | `fast` search depth |
| Documentation | [Linkup documentation ↗︎](https://docs.linkup.so/) |
| Terms | [Terms of use ↗︎](https://www.linkup.so/terms-of-use) |

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/web-search/providers/#page","headline":"Providers","description":"Compare Web Search API providers Ceramic.ai, Exa, and Linkup, including Zero Data Retention terms and list API pricing.","url":"https://developers.cloudflare.com/web-search/providers/","inLanguage":"en","image":"https://developers.cloudflare.com/web-search/providers/og.png?v=5d5d95a471b9c663","dateModified":"2026-10-02","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["AI"]}
```
