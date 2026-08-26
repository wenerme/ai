---
description: Review GraphQL Analytics API query limits.
title: Limits
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/analytics/llms.txt
> Use this file to discover all available pages before exploring further.

# Limits

Last updated Aug 25, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/analytics/graphql-api/limits/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Cloudflare GraphQL API exposes more than 70 datasets representing products with different configurations and data availability for different zones and accounts plans.

To support this variety of products, Cloudflare GraphQL API has three layers of limits:

* global limits
* user limits
* node (dataset) limits

## Global limits

These limits are applied to every query for every plan:

* A zone-scoped query can include up to **10 zones**
* An account-scoped query can include only **1 account**

Additionally, there is a limited number of queries you can make per request. The total number of queries in a request is equal to the number of zone/account scopes, multiplied by the number of nodes to which they are applied.

## User limits

Cloudflare GraphQL API limits the number of GraphQL requests each user can send. The default quota is **300 GraphQL queries over 5-minute window**. It allows a user to run at least **1 query every second** or do a burst of 300 queries and then wait 5 minutes before issuing another query.

That rate limit is applied in addition to the [general rate limits enforced by the Cloudflare API](https://developers.cloudflare.com/fundamentals/api/reference/limits/).

### Account-based rate limiting

If you query analytics across many zones or accounts, you can opt into **account-based rate limiting**, where limits apply per account and per zone instead of per user or API token. Because each account and zone has its own budget, a single user or token can make far more requests overall, and limit increases can be applied per resource and take effect quickly.

To learn how to enable it and the query requirements, refer to [Account-based rate limiting](https://developers.cloudflare.com/analytics/graphql-api/account-based-rate-limiting/).

## Node limits and availability

Each data node has its limits, such as:

* how far back in time can data be requested,
* the maximum time period (in seconds) that can be requested in one query,
* the maximum number of fields that can be requested in one query,
* the maximum number of records that can be returned in one query.

Node limits are tied to requested `zoneTag` or `accountTag`. Higher plans have access to a greater selection of datasets or fields, and can query over broader historical intervals.

To get exact boundaries and availability for your zone(s) or account, please refer to [settings](https://developers.cloudflare.com/analytics/graphql-api/features/discovery/settings/).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/analytics/graphql-api/limits/#page","headline":"GraphQL API - Limits · Cloudflare Analytics docs","description":"Review GraphQL Analytics API query limits.","url":"https://developers.cloudflare.com/analytics/graphql-api/limits/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-25","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
