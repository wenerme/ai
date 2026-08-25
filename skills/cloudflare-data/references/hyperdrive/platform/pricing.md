---
description: Hyperdrive pricing details for Free and Workers Paid plans.
title: Pricing
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/hyperdrive/llms.txt
> Use this file to discover all available pages before exploring further.

# Pricing

Last updated Jun 18, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/hyperdrive/platform/pricing/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Hyperdrive is included in both the Free and Paid [Workers plans](https://developers.cloudflare.com/workers/platform/pricing/).

|                                         | Free plan[1](#user-content-fn-1) | Paid plan |
| --------------------------------------- | -------------------------------- | --------- |
| Database queries[2](#user-content-fn-2) | 100,000 / day                    | Unlimited |

Footnotes

1: The Workers Free plan includes limited Hyperdrive usage. All limits reset daily at 00:00 UTC. If you exceed any one of these limits, further operations of that type will fail with an error.

2: Database queries refers to any database statement made via Hyperdrive, whether a query (`SELECT`), a modification (`INSERT`,`UPDATE`, or `DELETE`) or a schema change (`CREATE`, `ALTER`, `DROP`).

## Footnotes

1. The Workers Free plan includes limited Hyperdrive usage. All limits reset daily at 00:00 UTC. If you exceed any one of these limits, further operations of that type will fail with an error. [↩](#user-content-fnref-1)
2. Database queries refers to any database statement made via Hyperdrive, whether a query (`SELECT`), a modification (`INSERT`,`UPDATE`, or `DELETE`) or a schema change (`CREATE`, `ALTER`, `DROP`). [↩](#user-content-fnref-2)

Hyperdrive limits are automatically adjusted when subscribed to a Workers Paid plan. Hyperdrive's [connection pooling and query caching](https://developers.cloudflare.com/hyperdrive/concepts/how-hyperdrive-works/) are included in Workers Paid plan, so do not incur any additional charges.

## PlanetScale Postgres & MySQL

You can create PlanetScale Postgres and MySQL databases from Cloudflare and bill PlanetScale database usage through your Cloudflare account as a pay-as-you-go customer.

PlanetScale database usage is separate from Hyperdrive usage. When you create a PlanetScale database from the Cloudflare dashboard, PlanetScale usage appears on your Cloudflare invoice each billing period as a dollar total at PlanetScale's standard [pricing ↗](https://planetscale.com/pricing).

You can view per-database billing usage in the [PlanetScale dashboard ↗](https://planetscale.com/docs/billing#organization-usage-and-billing-page). To learn how PlanetScale databases work with Workers and Hyperdrive, refer to [PlanetScale Postgres and MySQL with Hyperdrive](https://developers.cloudflare.com/hyperdrive/planetscale/).

## Pricing FAQ

### Does connection pooling or query caching incur additional charges?

No. Hyperdrive's built-in cache and connection pooling are included within the stated plans above. There are no hidden limits other than those [published](https://developers.cloudflare.com/hyperdrive/platform/limits/).

### Are cached queries counted the same as uncached queries?

Yes, any query made through Hyperdrive, whether cached or uncached, whether query or mutation, is counted according to the limits above.

### Does Hyperdrive charge for data transfer / egress?

No.

Note

For questions about pricing, refer to the [pricing FAQs](https://developers.cloudflare.com/hyperdrive/reference/faq/#pricing).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/hyperdrive/platform/pricing/#page","headline":"Pricing · Cloudflare Hyperdrive docs","description":"Hyperdrive pricing details for Free and Workers Paid plans.","url":"https://developers.cloudflare.com/hyperdrive/platform/pricing/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-06-18","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
