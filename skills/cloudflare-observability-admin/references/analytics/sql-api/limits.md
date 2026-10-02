---
description: Review SQL API query and request limits.
title: Limits
image: https://developers.cloudflare.com/analytics/sql-api/limits/og.png?v=decb1da875bf878f
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/analytics/llms.txt
> Use this file to discover all available pages before exploring further.

# Limits

Last updated Oct 2, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/analytics/sql-api/limits/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

The following limits apply to SQL API queries:

| Limit | Value |
| --- | --- |
| SQL statements per request | 1 |
| SQL statement length | 10 KiB |
| Parser nesting depth | 10 |
| Datasets per statement | 1 |
| Accounts per statement | 1 |
| Minimum time constraint | A lower timestamp bound is required. |
| `ORDER BY` | Requires `LIMIT`, except for Workers Analytics Engine datasets. |
| `LIMIT` and `OFFSET` | Non-negative integer literals. `OFFSET` normally requires `LIMIT`. |

The lower timestamp bound and tenancy scope can be supplied in SQL or through the JSON request fields.

Dataset-specific limits can restrict field availability, the number of selected fields, historical retention, query duration, and the maximum number of returned rows. These limits depend on the dataset, your plan, and the account or zone being queried. A dataset-specific maximum page size rejects an explicit `LIMIT` above the maximum. It does not add a limit to a query that omits one.

The API also applies request-rate, concurrency, queue, execution-time, and resource-consumption limits. Cloudflare can adjust these operational limits to protect service availability.

When a request exceeds a rate or resource limit, the API returns HTTP `429`, `507`, or `503`. Reduce the requested time range or returned row count before retrying. Honor the `Retry-After` response header when it is present.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/analytics/sql-api/limits/#page","headline":"Limits","description":"Review SQL API query and request limits.","url":"https://developers.cloudflare.com/analytics/sql-api/limits/","inLanguage":"en","image":"https://developers.cloudflare.com/analytics/sql-api/limits/og.png?v=decb1da875bf878f","dateModified":"2026-10-02","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
