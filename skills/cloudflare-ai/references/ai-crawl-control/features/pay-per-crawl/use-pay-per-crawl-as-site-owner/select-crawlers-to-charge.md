---
description: Choose which AI crawlers to charge for access.
title: Select crawlers to charge
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-crawl-control/llms.txt
> Use this file to discover all available pages before exploring further.

# Select crawlers to charge

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ai-crawl-control/features/pay-per-crawl/use-pay-per-crawl-as-site-owner/select-crawlers-to-charge/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

graph LR
A[Enable in<br>account settings] --> B[Set a pay per <br/>crawl price ]
B --> C[Select crawlers<br>to charge]:::highlight
C --> D[Monitor<br>activity]
D --> E[Manage<br>payouts]
classDef highlight fill:#F6821F,color:white

click A "/ai-crawl-control/features/pay-per-crawl/use-pay-per-crawl-as-site-owner/enable-in-account-settings/"
click B "/ai-crawl-control/features/pay-per-crawl/use-pay-per-crawl-as-site-owner/set-a-pay-per-crawl-price/"
click D "/ai-crawl-control/features/pay-per-crawl/use-pay-per-crawl-as-site-owner/monitor-activity/"
click E "/ai-crawl-control/features/pay-per-crawl/use-pay-per-crawl-as-site-owner/manage-payouts/"

Once you have enabled pay per crawl and set a price, you can specify which AI crawlers to charge for accessing your content.

1. Go to **AI Crawl Control**.
[Go to **AI Crawl Control** ↗](https://dash.cloudflare.com/?to=/:account/:zone/ai)
2. Go to the **Crawlers** tab.
3. For each crawler, choose an action from the **Actions** column:

  * **Charge**: Charge the set price for successful content access
  * **Allow**: Allow free access without charging
  * **Block**: Block access completely

Search Engine Crawlers and SEO

Use the **Category** column to identify which bots are **Search Engine Crawlers**. Setting these crawlers to **Block** or **Charge** may negatively impact your site's SEO performance, as search engines may not be able to properly index your content.

## Bulk actions

To configure multiple crawlers at once:

1. Use the filters (Name, Operator, Category) to narrow down the crawler list.
2. Select the crawlers you want to configure by checking their boxes.
3. Bulk action options will appear above the table.
4. Select the desired action and apply the changes.

For more information on managing AI crawlers, refer to [Manage AI crawlers](https://developers.cloudflare.com/ai-crawl-control/features/manage-ai-crawlers/).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-crawl-control/features/pay-per-crawl/use-pay-per-crawl-as-site-owner/select-crawlers-to-charge/#page","headline":"Select crawlers to charge · Cloudflare AI Crawl Control docs","description":"Choose which AI crawlers to charge for access.","url":"https://developers.cloudflare.com/ai-crawl-control/features/pay-per-crawl/use-pay-per-crawl-as-site-owner/select-crawlers-to-charge/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
