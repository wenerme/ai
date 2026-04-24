---
title: Pricing
description: Workers Analytics Engine is priced based on two metrics — data points written, and read queries.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

### Agents toolkit

* Agent setup
* Copy as Markdown

Open the Markdown file in a new tab

Ask Claude about this page

Ask ChatGPT about this page

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/analytics/analytics-engine/pricing.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Pricing

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

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/analytics/","name":"Analytics"}},{"@type":"ListItem","position":3,"item":{"@id":"/analytics/analytics-engine/","name":"Workers Analytics Engine"}},{"@type":"ListItem","position":4,"item":{"@id":"/analytics/analytics-engine/pricing/","name":"Pricing"}}]}
```
