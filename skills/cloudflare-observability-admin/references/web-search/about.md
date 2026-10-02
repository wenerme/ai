---
description: Learn how Web Search API grounds AI agents in live web data, how it integrates with AI Gateway, and the crawling standards that search providers follow.
title: About Web Search API
image: https://developers.cloudflare.com/web-search/about/og.png?v=ba4b309ce28e5d04
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/web-search/llms.txt
> Use this file to discover all available pages before exploring further.

# About Web Search API

Last updated Oct 2, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/web-search/about/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

AI models are only as good as the context you give them. Models are trained and then frozen at a point in time, so they only know about information that existed before their knowledge cutoff date. This makes it difficult to work with models on recent events, changing APIs, or fast-moving news.

Without web search, an agent that needs live information usually guesses the URL of a page and fetches it directly. When the guess is wrong, the request returns a `404 Not Found` and the agent has to try again.

Web Search API gives your agents a better option. Like a person starting with a search engine, your agent sends a query and receives a list of relevant, up-to-date results. You can inject those results into the model's context so its response is grounded in live information.

## How it works

When you send a search request, Web Search API:

1. Routes the request through the AI Gateway you specify.
2. Forwards the query to the search provider you choose — Ceramic.ai, Exa, or Linkup. If you do not set a provider, Web Search API uses Ceramic.ai as default.
3. Normalizes the provider's response into a consistent format, with a URL, title, and optional description, image, favicon, and last-modified date for each result.
4. Records the request in your AI Gateway logs and bills it to your account.

Because every provider returns the same result format, you can switch providers by changing a single parameter.

## AI Gateway integration

Web Search API is built on [AI Gateway](https://developers.cloudflare.com/ai-gateway/), which acts as the control plane for your AI applications. Every search request goes through a gateway, which gives you:

- **Observability** — Search requests appear in your gateway's [logs](https://developers.cloudflare.com/ai-gateway/observability/logging/) and [analytics](https://developers.cloudflare.com/ai-gateway/observability/analytics/) alongside your model inference requests.
- **Unified Billing** — Searches draw down from your [AI Gateway credit balance](https://developers.cloudflare.com/ai-gateway/features/unified-billing/). You pay each provider's list API price, with no additional markup. For rates, refer to [Providers](https://developers.cloudflare.com/web-search/providers/).
- **Bring your own key (BYOK)** — If you already have an account with a search provider, you can [store your provider API key](https://developers.cloudflare.com/ai-gateway/configuration/bring-your-own-keys/) on your gateway. The provider bills you directly.
- **Access control** — Control which providers your gateway can use and who can send requests.

## Crawler standards

Cloudflare believes that crawlers should be honest and transparent, and should respect the rules and preferences that site owners set. Site owners should have meaningful visibility into and control over how their content is used.

Every Web Search API provider has committed to meet the following standards:

- **Verified bot compliance** — The crawler the provider uses must meet Cloudflare's published requirements for [verified bots](https://developers.cloudflare.com/bots/concepts/bot/verified-bots/). This includes identifying the crawler and respecting `robots.txt`.
- **Source attribution** — Every search result must include a link to the location of the crawled content.

When you use Web Search API, your agents consume search results from operators that give site owners transparency, control, and visibility over how their content is crawled.

## Related resources

- [How to use Web Search API](https://developers.cloudflare.com/web-search/how-to-use/)
- [Providers and pricing](https://developers.cloudflare.com/web-search/providers/)
- [AI Gateway](https://developers.cloudflare.com/ai-gateway/)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/web-search/about/#page","headline":"About Web Search API","description":"Learn how Web Search API grounds AI agents in live web data, how it integrates with AI Gateway, and the crawling standards that search providers follow.","url":"https://developers.cloudflare.com/web-search/about/","inLanguage":"en","image":"https://developers.cloudflare.com/web-search/about/og.png?v=ba4b309ce28e5d04","dateModified":"2026-10-02","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["AI"]}
```
