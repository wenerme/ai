---
description: Workers Analytics Engine is priced based on two metrics — data points written, and read queries.
title: Pricing
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/analytics/llms.txt
> Use this file to discover all available pages before exploring further.

# Pricing

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/analytics/analytics-engine/pricing/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Workers Analytics Engine is priced based on two metrics — data points written, and read queries.

| Plan             | Data points written                                            | Read queries                                                 |
| ---------------- | -------------------------------------------------------------- | ------------------------------------------------------------ |
| **Workers Paid** | 10 million included per month  (+$0.25 per additional million) | 1 million included per month (+$1.00 per additional million) |
| **Workers Free** | 100,000 included per day                                       | 10,000 included per day                                      |

Pricing availability

Currently, you will not be billed for your use of Workers Analytics Engine. Pricing information here is shared in advance, so that you can estimate what your costs will be once Cloudflare starts billing for usage in the coming months.

If you are an Enterprise customer, contact your account team for information about Workers Analytics Engine pricing and billing.

### Data points written

Every time you call [writeDataPoint()](https://developers.cloudflare.com/analytics/analytics-engine/get-started/#2-write-data-points-from-your-worker) in a Worker, this counts as one data point written.

Each data point written costs the same amount. There is no extra cost to add dimensions or cardinality, and no additional cost for writing more data in a single data point.

### Read queries

Every time you post to Workers Analytics Engine's [SQL API](https://developers.cloudflare.com/analytics/analytics-engine/sql-api/), this counts as one read query.

Each read query costs the same amount. There is no extra cost for more or less complex queries, and no extra cost for reading only a few rows of data versus many rows of data.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/analytics/analytics-engine/pricing/#page","headline":"Workers Analytics Engine — Pricing · Cloudflare Analytics docs","description":"Workers Analytics Engine is priced based on two metrics — data points written, and read queries.","url":"https://developers.cloudflare.com/analytics/analytics-engine/pricing/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
