---
title: Observe customer usage and billing
description: Track usage across tenants for billing, optimization, and insights.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/use-cases/saas/usage-analytics.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Observe customer usage and billing

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

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/use-cases/","name":"Use cases"}},{"@type":"ListItem","position":3,"item":{"@id":"/use-cases/saas/","name":"SaaS platforms"}},{"@type":"ListItem","position":4,"item":{"@id":"/use-cases/saas/usage-analytics/","name":"Observe customer usage and billing"}}]}
```
