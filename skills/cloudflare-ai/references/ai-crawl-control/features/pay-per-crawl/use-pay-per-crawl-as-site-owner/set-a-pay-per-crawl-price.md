---
description: Configure the price charged per AI crawl.
title: Set a pay per crawl price
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-crawl-control/llms.txt
> Use this file to discover all available pages before exploring further.

# Set a pay per crawl price

Last updated Jul 28, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ai-crawl-control/features/pay-per-crawl/use-pay-per-crawl-as-site-owner/set-a-pay-per-crawl-price/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

graph LR
A[Enable in<br>account settings] --> B[Set a pay per <br/>crawl price ]:::highlight
B --> C[Select crawlers<br>to charge]
C --> D[Monitor<br>activity]
D --> E[Manage<br>payouts]
classDef highlight fill:#F6821F,color:white

click A "/ai-crawl-control/features/pay-per-crawl/use-pay-per-crawl-as-site-owner/enable-in-account-settings/"
click C "/ai-crawl-control/features/pay-per-crawl/use-pay-per-crawl-as-site-owner/select-crawlers-to-charge/"
click D "/ai-crawl-control/features/pay-per-crawl/use-pay-per-crawl-as-site-owner/monitor-activity/"
click E "/ai-crawl-control/features/pay-per-crawl/use-pay-per-crawl-as-site-owner/manage-payouts/"

Once your domain's visibility is set to **Visible** in Account Settings, you can set a pay per crawl price and enable pay per crawl for that domain.

1. Go to **AI Crawl Control**.
[Go to **AI Crawl Control** ↗](https://dash.cloudflare.com/?to=/:account/:zone/ai)
2. Go to the **Payments** tab.
3. In the **Pay Per Crawl** card, select **Enable**.
4. Set your default per crawl price. This is the amount charged for each successful content retrieval (HTTP 200 response) by an AI crawler.

  * (Optional) To set different prices for different content, select **Enable dynamic pricing**. Refer to [Advanced configuration](https://developers.cloudflare.com/ai-crawl-control/features/pay-per-crawl/use-pay-per-crawl-as-site-owner/advanced-configuration/) for details.
5. Select **Save**.

After enabling and setting a price, the domain's status in Account Settings will change to **Enabled**.

Pricing considerations

The minimum price is $0.001 USD per crawl. Consider your content value and expected crawler volume when setting your price.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-crawl-control/features/pay-per-crawl/use-pay-per-crawl-as-site-owner/set-a-pay-per-crawl-price/#page","headline":"Set a pay per crawl price · Cloudflare AI Crawl Control docs","description":"Configure the price charged per AI crawl.","url":"https://developers.cloudflare.com/ai-crawl-control/features/pay-per-crawl/use-pay-per-crawl-as-site-owner/set-a-pay-per-crawl-price/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-07-28","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
