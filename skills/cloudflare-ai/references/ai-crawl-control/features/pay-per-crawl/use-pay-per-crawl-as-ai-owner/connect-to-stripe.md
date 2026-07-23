---
description: Connect your Stripe account for Pay Per Crawl payments.
title: Connect Stripe
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-crawl-control/llms.txt
> Use this file to discover all available pages before exploring further.

# Connect Stripe

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ai-crawl-control/features/pay-per-crawl/use-pay-per-crawl-as-ai-owner/connect-to-stripe/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

graph LR
A[Set up your<br>Cloudflare Account] --> B[Verify your<br>AI crawler]
B --> C[Discover<br>payable content]
C --> D[Connect to<br>Stripe]:::highlight
D --> E[Crawl pages]
classDef highlight fill:#F6821F,color:white

Connect your Cloudflare account to Stripe to process payments. Pay per crawl uses Stripe to process payments between AI crawler owners and site owners.

1. In the Cloudflare dashboard, go to **Manage Account** \> **Settings**.
[Go to **Configurations** ↗](https://dash.cloudflare.com/?to=/:account/configurations)
2. Go to the **Pay Per Crawl** tab.
3. From **Connect to Stripe**, select **Connect**.
4. Select **Continue to Stripe**.
5. Follow the on-screen instructions to connect your Cloudflare account to a Stripe account.
Use a non-personal email address
Cloudflare recommends using a dedicated email to manage your pay per crawl account (for example, `aicrawler@company.com`).

When you successfully connect Stripe to your account, you will see a green tick ✅ next to **Stripe connection**.

Spending limits

Cloudflare is not responsible for configuring spending limits. Ensure you have configured a maximum spending limit on your AI crawler.

## Billing

Charges are recorded upon successful delivery of content that is requested with valid [crawler price headers](https://developers.cloudflare.com/ai-crawl-control/features/pay-per-crawl/use-pay-per-crawl-as-ai-owner/crawl-pages/#21-include-payment-headers).

Invoices are created and managed via Stripe. Crawlers are responsible for setting and enforcing their own spending limits.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-crawl-control/features/pay-per-crawl/use-pay-per-crawl-as-ai-owner/connect-to-stripe/#page","headline":"Connect Stripe · Cloudflare AI Crawl Control docs","description":"Connect your Stripe account for Pay Per Crawl payments.","url":"https://developers.cloudflare.com/ai-crawl-control/features/pay-per-crawl/use-pay-per-crawl-as-ai-owner/connect-to-stripe/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Stripe"]}
```
