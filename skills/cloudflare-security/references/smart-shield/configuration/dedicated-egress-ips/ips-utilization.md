---
description: Monitor dedicated egress IP capacity and concurrent connections with GraphQL.
title: IPs utilization
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/smart-shield/llms.txt
> Use this file to discover all available pages before exploring further.

#  IPs utilization

Last updated Apr 17, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/smart-shield/configuration/dedicated-egress-ips/ips-utilization/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

Use the [GraphQL API](https://developers.cloudflare.com/analytics/graphql-api/) to get aggregate data and monitor your dedicated IPs capacity (formerly known as Aegis).

Each Dedicated CDN Egress IP can support 40,000 concurrent connections per origin IP port. For example, if you have one dedicated IP and two origins (A and B), this single IP can support 40,000 concurrent connections to origin A, while simultaneously supporting 40,000 concurrent connections to origin B.

Refer to the [GraphQL Analytics API documentation](https://developers.cloudflare.com/analytics/graphql-api/getting-started/) for further guidance, or consider the [example](#example) below for a quickstart.

## GraphQL schema

The specific schema to get Dedicated CDN Egress IPs data is called `aegisIpUtilizationAdaptiveGroups`.

You can get average (`avg`) or maximum (`max`) utilization values (in percentage), and use the following dimensions:

* `datetimeFiveMinutes` ` time `

  * Timestamp truncated to five minutes. For example, `2025-01-10T00:05:00Z`.
* `popName` ` string `

  * The Cloudflare point of presence (PoP). For example, `sjc`.
* `egressIp` ` string `

  * Your assigned Dedicated CDN Egress IP. For example, `192.0.2.1`.
* `origin` ` string `

  * Origin IP and port. For example, `203.0.113.150:443`.
* `popUtilizationKey` ` string `

  * The Cloudflare point of presence (PoP), the Dedicated CDN Egress IP, and the origin IP and port. For example, `sjc 192.0.2.1 203.0.113.150:443`.

## Example

Refer to the query below to learn how to get average utilization and maximum utilization by point of presence, and filter the results.

You can also select the button at the bottom to use this query for your account via the [Cloudflare GraphQL API Explorer ↗](https://graphql.cloudflare.com/explorer). Make sure to provide your account ID and timestamps, and replace the placeholders for `popName`, `egressIp`, and `origin` as needed.

```graphql
query AegisIpUtilizationQuery(
  $accountTag: string
  $datetimeStart: string
  $datetimeEnd: string
) {
  viewer {
    utilization: accounts(filter: { accountTag: $accountTag }) {
      avgByPopUtilization: aegisIpUtilizationAdaptiveGroups(
        limit: 100
        filter: {
          datetimeFiveMinutes_geq: $datetimeStart
          datetimeFiveMinutes_leq: $datetimeEnd
        }
        orderBy: [datetimeFiveMinutes_ASC]
      ) {
        avg {
          utilization
        }
        dimensions {
          datetimeFiveMinutes
          popUtilizationKey
        }
      }

      maxByPopUtilization: aegisIpUtilizationAdaptiveGroups(
        limit: 100
        filter: {
          datetimeFiveMinutes_geq: $datetimeStart
          datetimeFiveMinutes_leq: $datetimeEnd
        }
        orderBy: [datetimeFiveMinutes_ASC]
      ) {
        max {
          utilization
        }
        dimensions {
          datetimeFiveMinutes
          popUtilizationKey
        }
      }

      filterPopUtilization: aegisIpUtilizationAdaptiveGroups(
        limit: 100
        filter: {
          datetimeFiveMinutes_geq: $datetimeStart
          datetimeFiveMinutes_leq: $datetimeEnd
          popName: "<CLOUDFLARE_POP>"
        }
        orderBy: [datetimeFiveMinutes_ASC]
      ) {
        max {
          utilization
        }
        dimensions {
          datetimeFiveMinutes
          popUtilizationKey
        }
      }

      filterIPUtilization: aegisIpUtilizationAdaptiveGroups(
        limit: 100
        filter: {
          datetimeFiveMinutes_geq: $datetimeStart
          datetimeFiveMinutes_leq: $datetimeEnd
          egressIp: "<YOUR_EGRESS_IP>"
        }
        orderBy: [datetimeFiveMinutes_ASC]
      ) {
        max {
          utilization
        }
        dimensions {
          datetimeFiveMinutes
          popUtilizationKey
        }
      }

      filterOriginUtilization: aegisIpUtilizationAdaptiveGroups(
        limit: 100
        filter: {
          datetimeFiveMinutes_geq: $datetimeStart
          datetimeFiveMinutes_leq: $datetimeEnd
          origin: "<ORIGIN_IP_AND_PORT>"
        }
        orderBy: [datetimeFiveMinutes_ASC]
      ) {
        max {
          utilization
        }
        dimensions {
          datetimeFiveMinutes
          popUtilizationKey
        }
      }
    }
  }
}
```

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/smart-shield/configuration/dedicated-egress-ips/ips-utilization/#page","headline":"IPs utilization · Cloudflare Smart Shield docs","description":"Monitor dedicated egress IP capacity and concurrent connections with GraphQL.","url":"https://developers.cloudflare.com/smart-shield/configuration/dedicated-egress-ips/ips-utilization/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["GraphQL"]}
```
