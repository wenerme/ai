---
description: Sort GraphQL Analytics API query results.
title: Sorting
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/analytics/llms.txt
> Use this file to discover all available pages before exploring further.

# Sorting

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/analytics/graphql-api/features/sorting/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

You can specify the order of the query result elements using the `orderBy` argument. By default, the results are sorted by the primary key of a dataset (table). If you specify another field to sort on, the primary key is also used in the sorting key, allowing results to remain consistent for pagination.

The default order for an aggregated dataset is by the fields on which the aggregated data is grouped. If you specify a different order, the aggregation group is appended to your specified ordering.

Note

Ordering within nested structures is not supported.

## Examples

### Raw data sorting

```graphql
firewallEventsAdaptive (orderBy: [clientCountryName_ASC]) {
    clientCountryName
}
```

### Raw data sorting using multiple fields

```graphql
firewallEventsAdaptive (orderBy: [clientCountryName_ASC, datetime_DESC]) {
    clientCountryName
    datetime
}
```

### Group sorting by aggregation function

```graphql
httpRequests1hGroups (orderBy: [sum_bytes_DESC]){
    sum {
        bytes
        requests
    }
    dimensions {
        datetime
    }
}
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/analytics/graphql-api/features/sorting/#page","headline":"Sorting · Cloudflare Analytics docs","description":"Sort GraphQL Analytics API query results.","url":"https://developers.cloudflare.com/analytics/graphql-api/features/sorting/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
