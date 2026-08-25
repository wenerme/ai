---
description: Review AI Crawl Control terminology definitions.
title: Glossary
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-crawl-control/llms.txt
> Use this file to discover all available pages before exploring further.

# Glossary

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ai-crawl-control/reference/glossary/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Review the definitions for terms used across Cloudflare's AI Crawl Control documentation.

| Term               | Definition                                                                                                                                                                                                                                                  |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| AI crawler         | A bot which scrapes content from websites in support of an AI model, including by scraping content for indexing, retrieval augmented generation, or training.                                                                                               |
| canonical URL      | The preferred version of a web page, specified by a <link rel="canonical"> HTML tag in the page's <head> section. When multiple URLs serve the same or similar content, the canonical URL tells search engines and crawlers which version is authoritative. |
| category           | A classification describing a crawler's stated purpose: "AI Crawler", "AI Search", "AI Assistant", or "Search Engine". One category per crawler.                                                                                                            |
| Content Signals    | An emerging IETF standard for expressing AI content preferences via HTTP headers or metadata. Aims to replace non-standard vendor signals. Refer to contentsignals.org.                                                                                     |
| crawl              | A single HTTP request from a bot to access a page on your site.                                                                                                                                                                                             |
| crawler            | A specific bot operated by a company to access web content. One operator (like OpenAI) may run multiple crawlers (GPTBot, ChatGPT-User).                                                                                                                    |
| In-band pricing    | Pricing transmitted in HTTP response headers alongside content. In Pay Per Crawl, the origin sets prices via the crawler-price header.                                                                                                                      |
| Merchant of Record | The entity who facilitates "buying and selling". For pay per crawl, Cloudflare is the merchant of record.                                                                                                                                                   |
| operator           | The company or organization that owns and operates an AI crawler. Examples include OpenAI, Microsoft, Google, ByteDance, Anthropic, and Meta. In AI Crawl Control, crawlers are grouped by their operators.                                                 |
| Referrer           | The site a user was on before visiting your domain, tracked via the HTTP Referer header. In AI Crawl Control, referrer data shows traffic arriving from AI platforms like ChatGPT or Perplexity.                                                            |
| robots.txt         | A text file at the root of a website that instructs crawlers which pages they should or should not access. Compliance is voluntary. AI Crawl Control helps monitor which crawlers violate your robots.txt rules.                                            |

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-crawl-control/reference/glossary/#page","headline":"Glossary · Cloudflare AI Crawl Control docs","description":"Review AI Crawl Control terminology definitions.","url":"https://developers.cloudflare.com/ai-crawl-control/reference/glossary/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
