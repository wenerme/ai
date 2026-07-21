---
description: Use AI Crawl Control alongside bot management.
title: AI Crawl Control with Cloudflare Bots
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-crawl-control/llms.txt
> Use this file to discover all available pages before exploring further.

#  AI Crawl Control with Cloudflare Bots

Last updated Jul 1, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/ai-crawl-control/configuration/ai-crawl-control-with-bots/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

AI Crawl Control works alongside other Cloudflare products, such as Cloudflare [bot solutions](https://developers.cloudflare.com/bots/). Bot solutions identifies traffic matching patterns of known bots, and can challenge or block the bots as you wish.

## Order of precedence

* AI Crawl Control's AI crawler blocking uses [WAF custom rules](https://developers.cloudflare.com/waf/custom-rules/), which take place before Cloudflare bot solutions.
* AI Crawl Control's pay per crawl takes place after Cloudflare bot solutions.

graph LR
A[Traffic] --> B[WAF custom rules<br>AI Crawl Control: Crawler blocks]
B --> C[Cloudflare<br>Bot Solutions]
C --> D[AI Crawl Control:<br>Pay Per Crawl]
classDef highlight fill:#F6821F,color:white

For more information on how Cloudflare classifies bot traffic, refer to [AI bots](https://developers.cloudflare.com/bots/concepts/bot/#ai-bots).

## Examples

Consider the following examples.

### Bot rule which blocks all AI bots vs pay per crawl

You may have both of the following enabled:

* A selection of AI crawlers to be charged through AI Crawl Control's pay per crawl
* Bot configuration option to [Block AI Bots](https://developers.cloudflare.com/bots/get-started/bot-fight-mode/#block-ai-bots).

Since pay per crawl happens after bot solutions, you need to first turn off **Block AI Bots** to ensure pay per crawl works as intended.

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-crawl-control/configuration/ai-crawl-control-with-bots/#page","headline":"AI Crawl Control with Cloudflare Bots · Cloudflare AI Crawl Control docs","description":"Use AI Crawl Control alongside bot management.","url":"https://developers.cloudflare.com/ai-crawl-control/configuration/ai-crawl-control-with-bots/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-07-01","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
