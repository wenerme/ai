---
description: Answers to common Pay Per Crawl questions.
title: Pay Per Crawl FAQ
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-crawl-control/llms.txt
> Use this file to discover all available pages before exploring further.

# Pay Per Crawl FAQ

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ai-crawl-control/features/pay-per-crawl/faq/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

## Frequently asked questions for site owners

### Can I set different prices for different AI crawlers?

No. Pay per crawl allows you to configure different actions (Block, Charge, or Allow) for each crawler, but you can only set a single price that applies to all crawlers configured with the "Charge" option.

## Frequently asked questions for AI bot operators

### Will I be charged for re-crawling the same page?

Yes. Every time your AI crawler accesses content on a website protected with pay per crawl, it will incur the cost set by the site owner. You should implement mechanisms within your crawler to track expenditure and enforce any spending limits you want to set.

Some paths are always free to crawl. These paths are: `/robots.txt`, `/sitemap.xml`, `/security.txt`, `/.well-known/security.txt`, `/crawlers.json`.

### Am I charged for error responses?

No. Charging events are only triggered for successful HTTP response codes. Error responses are not billed, even if you have sent the `crawler-exact-price` or `crawler-max-price` headers.

### What user agent should I use?

Use the standard user agents associated with your AI crawler that you have onboarded to Cloudflare and identified through Web Bot Auth.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-crawl-control/features/pay-per-crawl/faq/#page","headline":"Pay Per Crawl FAQ · Cloudflare AI Crawl Control docs","description":"Answers to common Pay Per Crawl questions.","url":"https://developers.cloudflare.com/ai-crawl-control/features/pay-per-crawl/faq/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
