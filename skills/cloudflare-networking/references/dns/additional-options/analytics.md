---
description: View DNS query analytics and configure Logpush for DNS logs.
title: Analytics and logs
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/dns/llms.txt
> Use this file to discover all available pages before exploring further.

# Analytics and logs

Last updated Aug 14, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/dns/additional-options/analytics/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

When you use Cloudflare DNS, you can access data about DNS queries through a variety of sources.

---

## Analytics

DNS analytics allow you to evaluate data about DNS queries to your zone.

You can [use the dashboard](#view-on-the-dashboard) to get insights quickly based on a [predefined set of dimensions](#available-dimensions), or [use the API](#explore-with-the-api) to have access to all fields available in the GraphQL DNS analytics schemas.

When using GraphQL, you also have the option to get data for DNS queries across all zones within a given Cloudflare account.

### Availability and limits

|                                 | Free   | Pro     | Business | Enterprise |
| ------------------------------- | ------ | ------- | -------- | ---------- |
| Availability                    | Yes    | Yes     | Yes      | Yes        |
| Maximum time interval (zone)    | 7 days | 31 days | 31 days  | 62 days    |
| Maximum time interval (account) | 7 days | 7 days  | 7 days   | 62 days    |
| Historical data (zone)          | 8 days | 31 days | 31 days  | 62 days    |
| Historical data (account)       | 8 days | 8 days  | 8 days   | 62 days    |

### View on the dashboard

For a quick summary, view your DNS analytics on the dashboard:

[Go to **Analytics** ↗](https://dash.cloudflare.com/?to=/:account/:zone/dns/analytics)

The DNS analytics dashboard contains [four main panels](#panels). The filters and time frame that you specify at the top of the page apply to all of them.

#### Available dimensions

* Query name
* Query type (same as DNS record type)
* Response code
* Data center
* Source IP
* Destination IP
* Protocol
* IP version

#### Panels

* **Query overview**: the number of queries and their distribution over time. This information is segmented by each of the [available dimensions](#available-dimensions) and the graph displays the top five values. You can select the dimensions through the different tabs above the graph and quickly filter for or exclude a certain value from the results by hovering over it and selecting **Filter** or **Exclude**.
* **Query statistics**: an overview of query metrics based on your filters and selected time frame. Namely, **Total queries**, **Average queries per second**, and **Average processing time**. The average processing time is displayed in milliseconds and includes upstream queries in the case of [flattened CNAME records](https://developers.cloudflare.com/dns/cname-flattening/).
Note
Processing time is different from response time. Response time would have to include information that is not available to Cloudflare, such as how long the query takes from the client to the resolver and from the resolver to Cloudflare (as your authoritative DNS provider).
* **DNS queries by data center**: a map indicating which Cloudflare data centers have handled DNS queries to your zone in the selected time period. You can also find a list of the ten top results and quickly filter for or exclude a certain data center from the results by hovering over it and selecting **Filter** or **Exclude**.
* **Queries by source**: a breakdown of the top five, ten, or fifteen results - based on your selection - and grouped by the [available dimensions](#available-dimensions).

### Explore with the API

For more detailed metrics, use the [GraphQL API](https://developers.cloudflare.com/analytics/graphql-api/). Refer to the GraphQL Analytics API documentation for guidance on how to [get started](https://developers.cloudflare.com/analytics/graphql-api/getting-started/).

The DNS analytics has two [schemas](https://developers.cloudflare.com/analytics/graphql-api/getting-started/querying-basics/):

* `dnsAnalyticsAdaptive`: Retrieve information about individual DNS queries.
* `dnsAnalyticsAdaptiveGroups`: Get reports on aggregate information only.

To get account-level data, you can set up queries similar to the following:

Get the last 10,000 queries resulting in NXDOMAIN

```graphql
query GetLastNXDOMAINResponses {
  viewer {
    accounts(filter: { accountTag: "83a4527361bcdec24566fd7f837b6de5" }) {
      dnsAnalyticsAdaptive(
        limit: 10000
        filter: {
          date_geq: "2025-06-16",
          responseCode: "NXDOMAIN",
          date_leq: "2025-06-18"
        }
        orderBy: [datetime_DESC]
      ) {
        zoneTag
        queryName
        responseCode
        queryType
        datetime
      }
    }
  }
}
```

Get the overall query count per account

```graphql
query GetTotalDNSQueryCount {
  viewer {
    accounts(filter: { accountTag: "83a4527361bcdec24566fd7f837b6de5" }) {
      dnsAnalyticsAdaptiveGroups(
        filter: {
          date_geq: "2025-05-01"
          date_leq: "2025-05-30"
        }
        limit: 1
      ) {
        count
      }
    }
  }
}
```

---

## Logs

Logs let Enterprise customers view [detailed information](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/zone/dns%5Flogs/) about individual DNS queries.

For help setting up Logpush, refer to [Logpush](https://developers.cloudflare.com/logs/logpush/) documentation.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/dns/additional-options/analytics/#page","headline":"Analytics and logs · Cloudflare DNS docs","description":"View DNS query analytics and configure Logpush for DNS logs.","url":"https://developers.cloudflare.com/dns/additional-options/analytics/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-14","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Analytics","GraphQL"]}
```
