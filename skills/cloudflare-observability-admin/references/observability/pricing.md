---
description: Understand Cloudflare Observability ingestion and storage pricing.
title: Pricing
image: https://developers.cloudflare.com/observability/pricing/og.png?v=6b4ce7ba6d5bba9b
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/observability/llms.txt
> Use this file to discover all available pages before exploring further.

# Pricing

Last updated Oct 2, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/observability/pricing/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Beginning December 1, 2026, all Cloudflare logs and traces will use the same pricing model. Unsampled security datasets have a different price point of $1 per GB ingested and include 30-day retention. Queries, dashboards, alerts, and analytics do not incur additional charge.

Refer to [Datasets](https://developers.cloudflare.com/observability/logs/datasets/) to review the price point and retention for each dataset.

## Included in the new Observability pricing

The following logs and traces share account-level ingestion and storage allowances:

- [Cloudflare Traces](https://developers.cloudflare.com/observability/traces/)
- [Workers Logs](https://developers.cloudflare.com/workers/observability/logs/workers-logs/)
- [Workers Traces](https://developers.cloudflare.com/workers/observability/traces/)
- [Containers logs](https://developers.cloudflare.com/containers/faq/#how-do-container-logs-work)
- [R2 Data Access Logs](https://developers.cloudflare.com/r2/buckets/data-access-logs/)
- [AI Gateway logs](https://developers.cloudflare.com/ai-gateway/observability/logging/)
- [Issues](https://developers.cloudflare.com/workers/observability/issues/)

### Plans

| Plan | Included ingestion | Included storage | Additional ingestion | Additional storage |
| --- | --- | --- | --- | --- |
| Free | 0.5 GB per day | Seven-day retention included | Not available | Not separately metered |
| Paid | 50 GB per billing cycle | 12 GB-month per billing cycle | $0.25 per GB | $0.10 per GB-month |

Enterprise accounts move to this pricing when their contract renews. Until then, existing contract terms apply.

Paid usage continues automatically after an allowance is exhausted. Ingestion and storage are separate meters, so unused ingestion allowance cannot be applied to storage or the reverse. Allowances do not roll over between billing cycles.

You will be able to view your current ingestion and storage usage, remaining allowances, and estimated charges in **Billable Usage**.

On Free, Cloudflare stops ingesting new data when the account reaches its daily limit. Ingestion resumes when the allowance resets at 00:00 UTC. Stored data remains queryable for its seven-day retention period.

### How usage is measured

#### Ingestion

Ingestion includes the event body, the default enriched attributes, and custom attributes. Ingestion is pre-compression and does not include dropped events. Sampling data before storage reduces both ingestion and storage usage.

#### Storage

Storage is measured in GB-month using the maximum amount of queryable data stored each day:

> **GB-month = sum of each day's maximum queryable GB / 30**

For example, 1 GB that remains queryable for 30 days contributes 1 GB-month. Data stops contributing to storage usage when it is no longer queryable.

### Example

Suppose a Paid account uses 75 GB of ingestion and 20 GB-month of storage during one billing cycle:

| Usage | Calculation | Additional charge |
| --- | --- | --- |
| Ingestion | (75 GB - 50 GB included) x $0.25 | $6.25 |
| Storage | (20 GB-month - 12 GB-month included) x $0.10 | $0.80 |
| Total | $6.25 + $0.80 | $7.05 |

### Longer retention

Logs and traces in the shared allowance have a default seven-day retention. Unsampled security datasets include 30-day retention. Cloudflare plans to add configurable 30, 90, and 365-day retention periods in the future.

### Existing customers

Existing Workers Observability customers on Free, Pro, and Business plans automatically move to this pricing on December 1, 2026. Ingestion charges apply only to data received on or after that date. Enterprise accounts move at contract renewal.

For Paid accounts, data retained on December 1 begins contributing to storage usage from that date. Usage before December 1 is not charged retroactively.

## Unsampled security datasets (legacy Log Explorer)

Unsampled security datasets are the datasets previously available in Log Explorer. They preserve complete event fidelity and use a different ingestion price point. Their usage does not consume the pooled allowances in [Plans](#plans).

| Ingestion | Retention | Queries |
| --- | --- | --- |
| $1 per GB ingested | 30 days | No additional charge |

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/observability/pricing/#page","headline":"Pricing","description":"Understand Cloudflare Observability ingestion and storage pricing.","url":"https://developers.cloudflare.com/observability/pricing/","inLanguage":"en","image":"https://developers.cloudflare.com/observability/pricing/og.png?v=6b4ce7ba6d5bba9b","dateModified":"2026-10-02","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
