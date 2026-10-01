---
description: A distributed SQL engine for Basin Catalog
title: Basin SQL
image: https://developers.cloudflare.com/basin-sql/og.png?v=57df7a270078be5d
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/basin-sql/llms.txt
> Use this file to discover all available pages before exploring further.

# Basin SQL

Last updated Oct 1, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/basin-sql/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Query Apache Iceberg tables managed by Basin Catalog using SQL.

Basin SQL is Cloudflare's serverless, distributed, analytics query engine for querying [Apache Iceberg ↗︎](https://iceberg.apache.org/) tables stored in [Basin Catalog](https://developers.cloudflare.com/basin-catalog/). Basin SQL is designed to efficiently query large amounts of data by automatically utilizing file pruning, Cloudflare's distributed compute, and R2 object storage.

Basin SQL is now Generally Available

Basin SQL, formerly known as R2 SQL, is now Generally Available. Existing R2 SQL APIs continue to work and will be deprecated in the future.

To report bugs or give feedback, go to the [**#basin-sql Discord channel** ↗︎](https://discord.cloudflare.com/). If you are having issues with Wrangler, report issues in the [**Wrangler GitHub repository** ↗︎](https://github.com/cloudflare/workers-sdk/issues/new/choose).

npmyarnpnpm

```
npx wrangler basin sql query "YOUR_WAREHOUSE_NAME" "SELECT * FROM default.transactions LIMIT 10"
```

```
yarn wrangler basin sql query "YOUR_WAREHOUSE_NAME" "SELECT * FROM default.transactions LIMIT 10"
```

```
pnpm wrangler basin sql query "YOUR_WAREHOUSE_NAME" "SELECT * FROM default.transactions LIMIT 10"
```

Create an end-to-end data pipeline by following [this step by step guide](https://developers.cloudflare.com/basin-sql/get-started/), which shows you how to stream events into an Apache Iceberg table and query it with Basin SQL.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/basin-sql/#page","headline":"Basin SQL","description":"A distributed SQL engine for Basin Catalog","url":"https://developers.cloudflare.com/basin-sql/","inLanguage":"en","image":"https://developers.cloudflare.com/basin-sql/og.png?v=57df7a270078be5d","dateModified":"2026-10-01","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
