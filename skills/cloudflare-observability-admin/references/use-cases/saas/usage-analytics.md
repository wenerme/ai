---
description: Track usage across tenants for billing, optimization, and insights.
title: Observe customer usage and billing
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/use-cases/llms.txt
> Use this file to discover all available pages before exploring further.

#  Observe customer usage and billing

Last updated Apr 24, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/use-cases/saas/usage-analytics/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

Usage-based billing and per-tenant performance monitoring require detailed analytics broken down by customer. Cloudflare Workers Analytics Engine tracks request counts, latency, and bytes per tenant ID, while Logpush exports detailed logs for compliance and audit trails.

## Solutions

### Workers Analytics Engine

Store and query time-series analytics data from Workers. [Learn more about Workers Analytics Engine](https://developers.cloudflare.com/analytics/analytics-engine/).

* **Per-tenant metrics** \- Track request counts, latency, and bytes transferred broken down by tenant ID
* **Billing data** \- Query usage data per customer to power usage-based billing calculations
* **Performance insights** \- Identify which tenants are generating the most load or experiencing the most errors

### Logpush

Stream logs from Cloudflare products to external destinations. [Learn more about Logpush](https://developers.cloudflare.com/logs/).

* **Compliance logging** \- Export detailed logs to your Security Information and Event Management (SIEM) system or data warehouse for audit trails and enterprise compliance

## Get started

1. [Workers Analytics Engine get started](https://developers.cloudflare.com/analytics/analytics-engine/get-started/)
2. [Configure Logpush](https://developers.cloudflare.com/logs/logpush/)

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/use-cases/saas/usage-analytics/#page","headline":"Observe customer usage and billing · Cloudflare use cases","description":"Track usage across tenants for billing, optimization, and insights.","url":"https://developers.cloudflare.com/use-cases/saas/usage-analytics/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-24","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
