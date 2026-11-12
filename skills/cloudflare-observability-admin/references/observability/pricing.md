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

Last updated Nov 11, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/observability/pricing/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Note

This pricing takes effect on December 1, 2026. Log Explorer (Legacy) has separate pricing. For details, refer to [Log Explorer (Legacy)](#log-explorer-legacy).

Cloudflare Observability charges for two things:

- **Ingestion**: data coming in. You pay once for each GB when Cloudflare receives it.
- **Storage**: data being kept. You pay for each GB for as long as you can query it. Storage is measured in GB-month.

## Included products

The following products share one ingestion allowance and one storage allowance per account:

- [Cloudflare Traces](https://developers.cloudflare.com/observability/traces/)
- [Workers Logs](https://developers.cloudflare.com/workers/observability/logs/workers-logs/)
- [Workers Traces](https://developers.cloudflare.com/workers/observability/traces/)
- [Containers logs](https://developers.cloudflare.com/containers/faq/#how-do-container-logs-work)
- [R2 Data Access Logs](https://developers.cloudflare.com/r2/buckets/data-access-logs/)
- [AI Gateway logs](https://developers.cloudflare.com/ai-gateway/observability/logging/)
- [Issues](https://developers.cloudflare.com/workers/observability/issues/)

To check the price and retention for each dataset, refer to [Datasets](https://developers.cloudflare.com/observability/logs/datasets/).

## Plans

Each plan includes a set amount of ingestion and storage. On Paid, Cloudflare bills usage beyond that amount. The following table compares the plans:

| Allowance or rate | Free | Paid |
| --- | --- | --- |
| Included ingestion | 0.5 GB per day | 50 GB per billing cycle |
| Included storage | Seven days of retention | 10 GB-month per billing cycle |
| Extra ingestion | Not available | $0.25 per GB |
| Extra storage | Not metered | $0.10 per GB-month |

You will be able to view your current ingestion and storage usage, remaining allowances, and estimated charges in **Billable Usage**.

### When you reach your allowance

On Free, Cloudflare stops ingesting new data when you reach the daily limit. Ingestion resumes when the allowance resets at 00:00 UTC. Data you already sent stays queryable until its seven-day retention period ends.

On Paid, Cloudflare keeps ingesting and storing data. Usage beyond your allowance is billed at the rates in the plans table.

The Paid ingestion and storage allowances are separate. Unused ingestion allowance does not cover storage, and unused storage allowance does not cover ingestion. Unused allowances do not carry over to the next billing cycle.

## How usage is measured

### Ingestion

Ingestion is the total size of the events Cloudflare receives. Each event includes:

- The event body
- Attributes Cloudflare adds automatically (default enriched attributes)
- Custom attributes you add

Cloudflare measures the uncompressed size. Events that Cloudflare drops do not count.

Tip

To lower ingestion and storage, sample your data so Cloudflare stores only a share of events.

### Storage

Storage measures how much data you keep and for how long. One GB-month is 1 GB kept for 30 days.

Logs and traces in the shared allowance are kept for seven days by default. Cloudflare plans to add configurable retention periods of 30, 90, and 365 days.

If you ingest data at a steady rate, your storage is approximately:

> **Storage (GB-month) ≈ GB ingested per billing cycle x 7 / 30**

With seven-day retention, this formula gives the following results:

- Each GB you ingest adds about 0.23 GB-month of storage.
- The 10 GB-month storage allowance covers about 43 GB of ingestion.
- On Paid, storage charges start at about 43 GB ingested, before ingestion charges start at 50 GB.

<details>

<summary>

How Cloudflare calculates storage exactly

</summary>

Each day, Cloudflare records the largest amount of queryable data in your account. At the end of the billing cycle, it calculates:

> **GB-month = sum of each day's maximum queryable GB / 30**

Data stops counting toward storage when it is no longer queryable. Data ingested near the end of one billing cycle can count toward storage in the next.

</details>

## Pricing example

A Paid account ingests 75 GB at a steady rate during one billing cycle. Its storage is 75 x 7 / 30 = 17.5 GB-month. The account pays only for usage beyond the included amounts:

| Usage | Calculation | Additional charge |
| --- | --- | --- |
| Ingestion | (75 GB - 50 GB included) x $0.25 | $6.25 |
| Storage | (17.5 GB-month - 10 GB-month included) x $0.10 | $0.75 |
| Total | $6.25 + $0.75 | $7.00 |

## Existing customers

For existing Workers Observability customers, the switch date depends on your plan:

| Plan | When this pricing applies |
| --- | --- |
| Free, Pro, and Business | Automatically, December 1, 2026 |
| Enterprise | At your next contract renewal |

Enterprise accounts keep their existing contract terms until renewal.

For Free, Pro, and Business accounts, Cloudflare does not charge for usage before December 1, 2026. Ingestion charges apply only to data received on or after that date. On Paid, data already stored on December 1 starts counting toward storage from that date.

## Log Explorer (Legacy)

Log Explorer datasets keep every event in full. They do not use the shared allowances in [Plans](#plans). Log Explorer datasets have the following pricing:

| Ingestion | Retention | Queries |
| --- | --- | --- |
| $1 per GB ingested | 30 days | No charge |

For usage estimates, monitoring, and deactivation, refer to [Pricing and managing usage](https://developers.cloudflare.com/observability/logs/log-explorer/pricing/).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/observability/pricing/#page","headline":"Pricing","description":"Understand Cloudflare Observability ingestion and storage pricing.","url":"https://developers.cloudflare.com/observability/pricing/","inLanguage":"en","image":"https://developers.cloudflare.com/observability/pricing/og.png?v=6b4ce7ba6d5bba9b","dateModified":"2026-11-11","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
