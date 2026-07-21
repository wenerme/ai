---
description: Query Privacy Gateway traffic and performance data using the GraphQL Analytics API.
title: Privacy Gateway Metrics
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/privacy-gateway/llms.txt
> Use this file to discover all available pages before exploring further.

#  Privacy Gateway Metrics

Last updated Apr 21, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/privacy-gateway/reference/metrics/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

Privacy Gateway now supports enhanced monitoring through our GraphQL API, providing detailed insights into your gateway traffic and performance. To access these metrics, ensure you have:

* A relay gateway proxy implementation where Cloudflare acts as the oblivious relay party.
* An API token with Analytics Read permissions. We offer two GraphQL nodes to retrieve metrics: `ohttpMetricsAdaptive` and `ohttpMetricsAdaptiveGroups`. The first node provides comprehensive request data, while the second facilitates grouped analytics.

## ohttpMetricsAdaptive

The `ohttpMetricsAdaptive` node is designed for detailed insights into individual OHTTP requests with adaptive sampling. This node can help in understanding the performance and load on your server and client setup.

### Key Arguments

* `filter` required
  * Apply filters to narrow down your data set. `accountTag` is a required filter.
* `limit` optional
  * Specify the maximum number of records to return.
* `orderBy` optional
  * Choose how to sort your data, with options for various dimensions and metrics.

### Available Fields

* `bytesToClient` int optional
  * The number of bytes returned to the client.
* `bytesToGateway` int optional
  * Total bytes received from the client.
* `colo` string optional
  * Airport code of the Cloudflare data center that served the request.
* `datetime` Time optional
  * The date and time when the event was recorded.
* `gatewayStatusCode` int optional
  * Status code returned by the gateway.
* `relayStatusCode` int optional
  * Status code returned by the relay.

This node is useful for a granular view of traffic, helping you identify patterns, performance issues, or anomalies in your data flow.

## ohttpMetricsAdaptiveGroups

The `ohttpMetricsAdaptiveGroups` node allows for aggregated analysis of OHTTP request metrics with adaptive sampling. This node is particularly useful for identifying trends and patterns across different dimensions of your traffic and operations.

### Key Arguments

* `filter` required
  * Apply filters to narrow down your data set. `accountTag` is a required filter.
* `limit` optional
  * Specify the maximum number of records to return.
* `orderBy` optional
  * Choose how to sort your data, with options for various dimensions and metrics.

### Available Fields

* `count` int optional
  * The number of records that meet the criteria.
* `dimensions` optional
  * Specifies the grouping dimensions for your data.
* `sum` optional
  * Aggregated totals for various metrics, per dimension.

**Dimensions**

You can group your metrics by various dimensions to get a more segmented view of your data:

* `colo` string optional
  * The airport code of the Cloudflare data center.
* `date` Date optional
  * The date of OHTTP request metrics.
* `datetimeFifteenMinutes` Time optional
  * Timestamp truncated to fifteen minutes.
* `datetimeFiveMinutes` Time optional
  * Timestamp truncated to five minutes.
* `datetimeHour` Time optional
  * Timestamp truncated to the hour.
* `datetimeMinute` Time optional
  * Timestamp truncated to the minute.
* `endpoint` string optional
  * The appId that generated traffic.
* `gatewayStatusCode` int optional
  * Status code returned by the gateway.
* `relayStatusCode` int optional
  * Status code returned by the relay.

**Sum Fields**

Sum fields offer a cumulative view of various metrics over your selected time period:

* `bytesToClient` int optional
  * Total bytes sent from the gateway to the client.
* `bytesToGateway` int optional
  * Total bytes from the client to the gateway.
* `clientRequestErrors` int optional
  * Total number of client request errors.
* `gatewayResponseErrors` int optional
  * Total number of gateway response errors.

Utilize the ohttpMetricsAdaptiveGroups node to gain comprehensive, aggregated insights into your traffic patterns, helping you optimize performance and user experience.

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/privacy-gateway/reference/metrics/#page","headline":"Privacy Gateway Metrics · Cloudflare Privacy Gateway docs","description":"Query Privacy Gateway traffic and performance data using the GraphQL Analytics API.","url":"https://developers.cloudflare.com/privacy-gateway/reference/metrics/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
