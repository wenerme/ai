---
description: Enable Pay Per Crawl in your account settings.
title: Enable in account settings
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-crawl-control/llms.txt
> Use this file to discover all available pages before exploring further.

# Enable in account settings

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ai-crawl-control/features/pay-per-crawl/use-pay-per-crawl-as-site-owner/enable-in-account-settings/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

graph LR
A[Enable in<br>account settings]:::highlight --> B[Set a pay per <br/>crawl price ]
B --> C[Select crawlers<br>to charge]
C --> D[Monitor<br>activity]
D --> E[Manage<br>payouts]
classDef highlight fill:#F6821F,color:white

click B "/ai-crawl-control/features/pay-per-crawl/use-pay-per-crawl-as-site-owner/set-a-pay-per-crawl-price/"
click C "/ai-crawl-control/features/pay-per-crawl/use-pay-per-crawl-as-site-owner/select-crawlers-to-charge/"
click D "/ai-crawl-control/features/pay-per-crawl/use-pay-per-crawl-as-site-owner/monitor-activity/"
click E "/ai-crawl-control/features/pay-per-crawl/use-pay-per-crawl-as-site-owner/manage-payouts/"

## Prerequisites

To configure pay per crawl, you must have the following:

* **Cloudflare account**: You need an active Cloudflare account with domains added
* **Domain on Cloudflare**: Your domain must be using Cloudflare's nameservers, or have DNS records managed by Cloudflare
* **Administrator access**: You need Administrator or Super Administrator permissions for account-level configuration

## Configure domain access

An Administrator or Super Administrator with access to all domains must select which domains should show the pay per crawl controls:

1. In the Cloudflare dashboard, go to **Manage Account** \> **Settings**.
[Go to **Configurations** ↗](https://dash.cloudflare.com/?to=/:account/configurations)
2. Select **Pay Per Crawl**.
3. In the **Domain Access** table, select which domains will have pay per crawl configurations visible.
4. Set the **Visibility** to **Visible** for each domain you want to configure.

Visibility vs Security

Setting a domain to **Visible** will not affect security rules. This only makes the pay per crawl configuration controls accessible to domain-level administrators.

After completing these steps, domain administrators can set a pay per crawl price and enable pay per crawl for their specific domains.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-crawl-control/features/pay-per-crawl/use-pay-per-crawl-as-site-owner/enable-in-account-settings/#page","headline":"Enable in account settings · Cloudflare AI Crawl Control docs","description":"Enable Pay Per Crawl in your account settings.","url":"https://developers.cloudflare.com/ai-crawl-control/features/pay-per-crawl/use-pay-per-crawl-as-site-owner/enable-in-account-settings/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
