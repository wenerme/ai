---
description: K2 pricing for data produced, data consumed, and data retained.
title: Pricing
image: https://developers.cloudflare.com/k2/platform/pricing/og.png?v=d6262c6af7b70b40
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/k2/llms.txt
> Use this file to discover all available pages before exploring further.

# Pricing

Last updated Oct 6, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/k2/platform/pricing/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Pricing availability

K2 is in public beta and billing is not enabled at this time. We will provide at least 30 days notice before billing begins. Pricing may change and is shared in advance so that you can estimate what your costs will be once Cloudflare starts billing for usage.

K2 is available on the [Workers Paid plan](https://developers.cloudflare.com/workers/platform/pricing/). K2 charges based on three dimensions:

- **Data produced**: The volume of data written to streams.
- **Data consumed**: The volume of data read from streams by consumers.
- **Data retained**: The volume of data stored in streams.

All three dimensions are measured in uncompressed bytes: the size of your records before any compression, such as gzip compression of an HTTP request body.

## K2 pricing

|  | Workers Paid <sup>[1](#user-content-fn-1)</sup> |
| --- | --- |
| **Data produced** | $0.04 / GB |
| **Data consumed** | $0.04 / GB |
| **Data retained** | $0.02 / GB / month |

### Data produced

Data produced is the volume of records written to a stream, through the [HTTP API or a Workers binding](https://developers.cloudflare.com/k2/features/produce/).

### Data consumed

Data consumed is the volume of records read from a stream through [subscriptions](https://developers.cloudflare.com/k2/features/consume/). Each subscription reads every record independently, so a stream with more subscriptions consumes more data.

### Data retained

Data retained is the volume of records stored in a stream, billed per GB per month. How much data a stream stores depends on how much you produce and on the stream's [retention period](https://developers.cloudflare.com/k2/configuration/#retention).

## Billing examples

### Example: one consumer

An application produces 100 GB of events per month to a stream. One subscription consumes every record, and the stream stores an average of 25 GB over the month.

| Dimension | Usage | Rate | Cost |
| --- | --- | --- | --- |
| Data produced | 100 GB | $0.04 / GB | $4.00 |
| Data consumed | 100 GB | $0.04 / GB | $4.00 |
| Data retained | 25 GB | $0.02 / GB / month | $0.50 |
| **Total** |  |  | **$8.50** |

### Example: fan-out to three consumers

The same stream is read by three subscriptions, for example an alerting system, an archiver, and an analytics pipeline. Each subscription consumes every record.

| Dimension | Usage | Rate | Cost |
| --- | --- | --- | --- |
| Data produced | 100 GB | $0.04 / GB | $4.00 |
| Data consumed | 300 GB (3 × 100 GB) | $0.04 / GB | $12.00 |
| Data retained | 25 GB | $0.02 / GB / month | $0.50 |
| **Total** |  |  | **$16.50** |

## Cloudflare billing policy

To learn more about how usage is billed, refer to [Cloudflare Billing Policy](https://developers.cloudflare.com/billing/understand/billing-policy/).

## Footnotes

1. K2 both bills and measures usage based on a gigabyte
    (1 GB = 1,000,000,000 bytes) and not a gibibyte (GiB).
   [↩](#user-content-fnref-1)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/k2/platform/pricing/#page","headline":"Pricing","description":"K2 pricing for data produced, data consumed, and data retained.","url":"https://developers.cloudflare.com/k2/platform/pricing/","inLanguage":"en","image":"https://developers.cloudflare.com/k2/platform/pricing/og.png?v=d6262c6af7b70b40","dateModified":"2026-10-06","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
