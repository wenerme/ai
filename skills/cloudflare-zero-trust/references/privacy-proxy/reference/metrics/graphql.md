---
description: Query Privacy Proxy request, connection, and authentication metrics using the Cloudflare GraphQL Analytics API.
title: GraphQL Analytics API
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/privacy-proxy/llms.txt
> Use this file to discover all available pages before exploring further.

# GraphQL Analytics API

Last updated Apr 21, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/privacy-proxy/reference/metrics/graphql/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Privacy Proxy exposes metrics through Cloudflare's [GraphQL Analytics API](https://developers.cloudflare.com/analytics/graphql-api/). All metrics are queryable through a single endpoint:

```txt
POST https://api.cloudflare.com/client/v4/graphql
```

Before you begin, you will need:

- **API token** — Create a token with *Account Analytics* read permissions. For more information, refer to our Analytics API token documentation: [Configure an Analytics API token](https://developers.cloudflare.com/analytics/graphql-api/getting-started/authentication/api-token-auth/).
- **Account ID** — Your Cloudflare account ID, passed as `accountTag` in queries. For more information, refer to [Find account and zone IDs](https://developers.cloudflare.com/fundamentals/account/find-account-and-zone-ids/).

---

## Making a request

The following example shows how to query your Privacy Proxy metrics daily request volume using curl. Replace the placeholder values with your own.

```bash
curl https://api.cloudflare.com/client/v4/graphql \
  --header "Authorization: Bearer <API_TOKEN>" \
  --header "Content-Type: application/json" \
  --data '{
    "query": "query DailyRequestVolume($accountTag: String!, $startDate: Date!, $endDate: Date!) { viewer { accounts(filter: { accountTag: $accountTag }) { privacyProxyRequestMetricsAdaptiveGroups(filter: { date_geq: $startDate, date_leq: $endDate }, limit: 10000, orderBy: [date_ASC]) { count dimensions { date } } } } }",
    "variables": {
      "accountTag": "<YOUR_ACCOUNT_TAG>",
      "startDate": "2026-04-04",
      "endDate": "2026-04-06"
    }
  }'
```

---

## Available nodes

Four GraphQL nodes are available. All four return aggregate data only — no raw per-connection records are exposed.

1. `privacyProxyRequestMetricsAdaptiveGroups` — Query aggregate request volume and error rates, filterable by time, location, endpoint, status code, and proxy status dimensions.
2. `privacyProxyIngressConnMetricsAdaptiveGroups` — Query client-to-proxy connection counts, bytes transferred, and latency percentiles, filterable by time, location, endpoint, and transport dimensions.
3. `privacyProxyEgressConnMetricsAdaptiveGroups` — Query proxy-to-origin connection counts, bytes transferred, and latency percentiles, filterable by time, location, endpoint, and transport dimensions.
4. `privacyProxyAuthMetricsAdaptiveGroups` — Query authentication attempt counts, filterable by time, location, endpoint, auth method, and auth result dimensions.

Adaptive sampling

Requests are sampled.

---

## Schema

<details>

<summary>

Metrics

</summary>

<details>

<summary>

Sum fields

</summary>

| Field | Type | Description | Node |
| --- | --- | --- | --- |
| <code>bytesSentToClient</code> | <code>uint64</code> | Total bytes sent from the proxy back to the client. | Ingress connection |
| <code>bytesRecvdFromClient</code> | <code>uint64</code> | Total bytes received by the proxy from the client. | Ingress connection |
| <code>bytesSentToOrigin</code> | <code>uint64</code> | Total bytes sent from the proxy to the upstream origin. | Egress connection |
| <code>bytesRecvdFromOrigin</code> | <code>uint64</code> | Total bytes received by the proxy from the upstream origin. | Egress connection |
| <code>packetsSentToClient</code> | <code>uint64</code> | Total packets sent from the proxy back to the client. | Ingress connection |
| <code>packetsRecvdFromClient</code> | <code>uint64</code> | Total packets received by the proxy from the client. | Ingress connection |
| <code>packetsSentToOrigin</code> | <code>uint64</code> | Total packets sent from the proxy to the upstream origin. | Egress connection |
| <code>packetsRecvdFromOrigin</code> | <code>uint64</code> | Total packets received by the proxy from the upstream origin. | Egress connection |

</details>

<details>

<summary>

Count fields

</summary>

All four nodes expose a <code>count</code> field that returns the total number of sampled events (requests, connections, or auth attempts) matching the query filter.

</details>

<details>

<summary>

Quantile fields

</summary>

| Field | Type | Description | Node |
| --- | --- | --- | --- |
| <code>durationMsP50</code> | <code>float64</code> | Median lifetime of a connection, in milliseconds. | Ingress and egress connection |
| <code>durationMsP95</code> | <code>float64</code> | 95th percentile connection lifetime, in milliseconds. | Ingress and egress connection |
| <code>durationMsP99</code> | <code>float64</code> | 99th percentile connection lifetime, in milliseconds. | Ingress and egress connection |
| <code>handshakeDurationUsP50</code> | <code>float64</code> | Median TCP+TLS/QUIC handshake time, in microseconds. | Ingress and egress connection |
| <code>handshakeDurationUsP95</code> | <code>float64</code> | 95th percentile handshake time, in microseconds. | Ingress and egress connection |
| <code>handshakeDurationUsP99</code> | <code>float64</code> | 99th percentile handshake time, in microseconds. | Ingress and egress connection |
| <code>connectRequestHandlingDurationUsP50</code> | <code>float64</code> | Median time to handle a CONNECT request, in microseconds. *Not yet available.* | Request |
| <code>connectRequestHandlingDurationUsP95</code> | <code>float64</code> | 95th percentile time to handle a CONNECT request, in microseconds. *Not yet available.* | Request |
| <code>connectRequestHandlingDurationUsP99</code> | <code>float64</code> | 99th percentile time to handle a CONNECT request, in microseconds. *Not yet available.* | Request |
| <code>connectTunnelSetupDurationUsP50</code> | <code>float64</code> | Median time to establish a tunnel after receiving a CONNECT request, in microseconds. *Not yet available.* | Request |
| <code>connectTunnelSetupDurationUsP95</code> | <code>float64</code> | 95th percentile tunnel setup time, in microseconds. *Not yet available.* | Request |
| <code>connectTunnelSetupDurationUsP99</code> | <code>float64</code> | 99th percentile tunnel setup time, in microseconds. *Not yet available.* | Request |

</details>

</details>

<details>

<summary>

Dimensions

</summary>

<details>

<summary>

All nodes

</summary>

| Field | Type | Description |
| --- | --- | --- |
| <code>date</code> | <code>Date</code> | Calendar date (day granularity). |
| <code>datetimeMinute</code> | <code>Time</code> | Timestamp truncated to the minute. |
| <code>datetimeFiveMinutes</code> | <code>Time</code> | Timestamp truncated to five-minute intervals. |
| <code>datetimeFifteenMinutes</code> | <code>Time</code> | Timestamp truncated to fifteen-minute intervals. |
| <code>datetimeHour</code> | <code>Time</code> | Timestamp truncated to the hour. |
| <code>coloCode</code> | <code>string</code> | Cloudflare data center that handled the request. |
| <code>endpoint</code> | <code>string</code> | The appId that generated traffic. |

All timestamp dimensions refer to the end of each connection or request, not the start.

</details>

<details>

<summary>

Request node only

</summary>

| Field | Type | Description |
| --- | --- | --- |
| <code>statusCode</code> | <code>uint16</code> | HTTP status code returned by the proxy to the client. |
| <code>proxyStatus</code> | <code>string</code> | Proxy-level error classification. <code>null</code> when no proxy-level error occurred. Refer to <a href="https://developers.cloudflare.com/privacy-proxy/reference/proxy-status/">proxy status reference</a> for possible values. |
| <code>tunnelType</code> | <code>string</code> | Tunnel protocol used (<code>connect-tcp</code>, <code>connect-udp</code>, <code>connect-ip</code>). *Not yet available.* |

</details>

<details>

<summary>

Ingress connection node only

</summary>

| Field | Type | Description |
| --- | --- | --- |
| <code>transport</code> | <code>string</code> | Transport protocol on the client-to-proxy connection (<code>tcp</code>, <code>quic</code>). |
| <code>tlsVersion</code> | <code>string</code> | TLS version negotiated on the client-to-proxy connection. *Not yet available.* |

</details>

<details>

<summary>

Egress connection node only

</summary>

| Field | Type | Description |
| --- | --- | --- |
| <code>transport</code> | <code>string</code> | Transport protocol on the proxy-to-origin connection (<code>tcp</code>, <code>quic</code>). |

</details>

<details>

<summary>

Auth node only

</summary>

| Field | Type | Description |
| --- | --- | --- |
| <code>authMethod</code> | <code>string</code> | Authentication method used (for example, <code>Token</code>, <code>Psk</code>). |
| <code>authResult</code> | <code>string</code> | Authentication outcome (<code>success</code>, <code>failure</code>). |

</details>

</details>

<details>

<summary>

Arguments

</summary>

All four nodes share the same argument signature.

- <code>filter</code> required — Filters your data. <code>accountTag</code> is always required inside the filter.
- <code>limit</code> optional — Maximum number of records to return.
- <code>orderBy</code> optional — Sort order for results.

</details>

---

## Sample queries

<details>

<summary>

privacyProxyRequestMetricsAdaptiveGroups node

</summary>

<details>

<summary>

Request volume overview

</summary>

Get a high-level view of daily request volume over a date range.

```graphql
query DailyRequestVolume(
  $accountTag: String!
  $startDate: Date!
  $endDate: Date!
) {
  viewer {
    accounts(filter: { accountTag: $accountTag }) {
      privacyProxyRequestMetricsAdaptiveGroups(
        filter: {
          date_geq: $startDate
          date_leq: $endDate
        }
        limit: 10000
        orderBy: [date_ASC]
      ) {
        count
        dimensions {
          date
        }
      }
    }
  }
}
```

```json
{
  "accountTag": "<YOUR_ACCOUNT_TAG>",
  "startDate": "2026-04-04",
  "endDate": "2026-04-06"
}
```

</details>

<details>

<summary>

Error breakdown by status code and proxy status

</summary>

Identify which HTTP status codes and proxy-level errors are occurring to pinpoint the source of failures.

```graphql
query ErrorBreakdown(
  $accountTag: String!
  $start: Time!
  $end: Time!
) {
  viewer {
    accounts(filter: { accountTag: $accountTag }) {
      privacyProxyRequestMetricsAdaptiveGroups(
        filter: {
          datetimeFifteenMinutes_geq: $start
          datetimeFifteenMinutes_leq: $end
          statusCode_geq: 400
        }
        limit: 10000
        orderBy: [datetimeFifteenMinutes_ASC]
      ) {
        count
        dimensions {
          datetimeFifteenMinutes
          statusCode
          proxyStatus
        }
      }
    }
  }
}
```

```json
{
  "accountTag": "<YOUR_ACCOUNT_TAG>",
  "start": "2026-04-04T00:00:00Z",
  "end": "2026-04-06T23:59:59Z"
}
```

</details>

<details>

<summary>

Top proxy errors by frequency

</summary>

Rank the most frequent proxy error types to prioritize investigation.

```graphql
query TopProxyErrors(
  $accountTag: String!
  $start: Date!
  $end: Date!
) {
  viewer {
    accounts(filter: { accountTag: $accountTag }) {
      privacyProxyRequestMetricsAdaptiveGroups(
        filter: {
          date_geq: $start
          date_leq: $end
          proxyStatus_neq: ""
        }
        limit: 10000
        orderBy: [count_DESC]
      ) {
        count
        dimensions {
          proxyStatus
          statusCode
        }
      }
    }
  }
}
```

```json
{
  "accountTag": "<YOUR_ACCOUNT_TAG>",
  "start": "2026-04-04",
  "end": "2026-04-06"
}
```

</details>

<details>

<summary>

Tunnel type distribution

</summary>

Monitor the mix of <code>connect-tcp</code>, <code>connect-udp</code>, and <code>connect-ip</code> over time to understand how clients are connecting.

```graphql
query TunnelTypeDistribution(
  $accountTag: String!
  $startDate: Date!
  $endDate: Date!
) {
  viewer {
    accounts(filter: { accountTag: $accountTag }) {
      privacyProxyRequestMetricsAdaptiveGroups(
        filter: {
          date_geq: $startDate
          date_leq: $endDate
        }
        limit: 10000
        orderBy: [date_ASC]
      ) {
        count
        dimensions {
          date
          tunnelType
        }
      }
    }
  }
}
```

```json
{
  "accountTag": "<YOUR_ACCOUNT_TAG>",
  "startDate": "2026-04-04",
  "endDate": "2026-04-06"
}
```

</details>

</details>

<details>

<summary>

privacyProxyIngressConnMetricsAdaptiveGroups node

</summary>

<details>

<summary>

Connection volume and ingress bytes overview

</summary>

Get a high-level view of daily ingress connection count and bytes transferred.

```graphql
query IngressTrafficOverview(
  $accountTag: String!
  $startDate: Date!
  $endDate: Date!
) {
  viewer {
    accounts(filter: { accountTag: $accountTag }) {
      privacyProxyIngressConnMetricsAdaptiveGroups(
        filter: {
          date_geq: $startDate
          date_leq: $endDate
        }
        limit: 10000
        orderBy: [date_ASC]
      ) {
        count
        sum {
          bytesSentToClient
          bytesRecvdFromClient
        }
        dimensions {
          date
        }
      }
    }
  }
}
```

```json
{
  "accountTag": "<YOUR_ACCOUNT_TAG>",
  "startDate": "2026-04-04",
  "endDate": "2026-04-06"
}
```

</details>

<details>

<summary>

Connection duration by data center

</summary>

Compare client-to-proxy connection duration across data centers to identify regions with long-lived or stalled connections.

```graphql
query IngressDurationByColo(
  $accountTag: String!
  $startDate: Date!
  $endDate: Date!
) {
  viewer {
    accounts(filter: { accountTag: $accountTag }) {
      privacyProxyIngressConnMetricsAdaptiveGroups(
        filter: {
          date_geq: $startDate
          date_leq: $endDate
        }
        limit: 10000
        orderBy: [quantiles_durationMsP50_DESC]
      ) {
        quantiles {
          durationMsP50
          durationMsP95
          durationMsP99
        }
        dimensions {
          coloCode
        }
      }
    }
  }
}
```

```json
{
  "accountTag": "<YOUR_ACCOUNT_TAG>",
  "startDate": "2026-04-04",
  "endDate": "2026-04-06"
}
```

</details>

<details>

<summary>

Protocol and TLS version distribution

</summary>

Understanding which transport protocols (QUIC versus TCP) and TLS versions your clients use helps you plan deprecations, detect misconfigured clients, and verify that traffic meets your security requirements.

```graphql
query IngressProtocolDistribution(
  $accountTag: String!
  $start: Time!
  $end: Time!
) {
  viewer {
    accounts(filter: { accountTag: $accountTag }) {
      privacyProxyIngressConnMetricsAdaptiveGroups(
        filter: {
          datetimeFifteenMinutes_geq: $start
          datetimeFifteenMinutes_leq: $end
        }
        limit: 10000
        orderBy: [datetimeFifteenMinutes_ASC]
      ) {
        count
        dimensions {
          datetimeFifteenMinutes
          transport
          tlsVersion
        }
      }
    }
  }
}
```

```json
{
  "accountTag": "<YOUR_ACCOUNT_TAG>",
  "start": "2026-04-04T00:00:00Z",
  "end": "2026-04-06T23:59:59Z"
}
```

</details>

</details>

<details>

<summary>

privacyProxyEgressConnMetricsAdaptiveGroups node

</summary>

<details>

<summary>

Egress bytes overview

</summary>

Get a high-level view of daily bytes flowing between the proxy and the upstream origin.

```graphql
query EgressBytesOverview(
  $accountTag: String!
  $startDate: Date!
  $endDate: Date!
) {
  viewer {
    accounts(filter: { accountTag: $accountTag }) {
      privacyProxyEgressConnMetricsAdaptiveGroups(
        filter: {
          date_geq: $startDate
          date_leq: $endDate
        }
        limit: 10000
        orderBy: [date_ASC]
      ) {
        count
        sum {
          bytesSentToOrigin
          bytesRecvdFromOrigin
        }
        dimensions {
          date
        }
      }
    }
  }
}
```

```json
{
  "accountTag": "<YOUR_ACCOUNT_TAG>",
  "startDate": "2026-04-04",
  "endDate": "2026-04-06"
}
```

</details>

<details>

<summary>

Proxy-to-origin latency by data center

</summary>

Compare proxy-to-origin handshake times across data centers to identify regions with degraded origin reachability.

```graphql
query EgressLatencyByColo(
  $accountTag: String!
  $startDate: Date!
  $endDate: Date!
) {
  viewer {
    accounts(filter: { accountTag: $accountTag }) {
      privacyProxyEgressConnMetricsAdaptiveGroups(
        filter: {
          date_geq: $startDate
          date_leq: $endDate
        }
        limit: 10000
        orderBy: [quantiles_handshakeDurationUsP50_DESC]
      ) {
        quantiles {
          handshakeDurationUsP50
          handshakeDurationUsP95
          handshakeDurationUsP99
        }
        dimensions {
          coloCode
        }
      }
    }
  }
}
```

```json
{
  "accountTag": "<YOUR_ACCOUNT_TAG>",
  "startDate": "2026-04-04",
  "endDate": "2026-04-06"
}
```

</details>

<details>

<summary>

Egress performance trend

</summary>

Track proxy-to-origin handshake latency at fine granularity over a specific time window.

```graphql
query EgressPerformanceTrend(
  $accountTag: String!
  $start: Time!
  $end: Time!
) {
  viewer {
    accounts(filter: { accountTag: $accountTag }) {
      privacyProxyEgressConnMetricsAdaptiveGroups(
        filter: {
          datetimeFiveMinutes_geq: $start
          datetimeFiveMinutes_leq: $end
        }
        limit: 10000
        orderBy: [datetimeFiveMinutes_ASC]
      ) {
        quantiles {
          handshakeDurationUsP50
          handshakeDurationUsP95
          handshakeDurationUsP99
        }
        count
        dimensions {
          datetimeFiveMinutes
        }
      }
    }
  }
}
```

```json
{
  "accountTag": "<YOUR_ACCOUNT_TAG>",
  "start": "2026-04-04T08:00:00Z",
  "end": "2026-04-06T14:00:00Z"
}
```

</details>

</details>

<details>

<summary>

privacyProxyAuthMetricsAdaptiveGroups node

</summary>

<details>

<summary>

Auth volume by method

</summary>

Track daily authentication volume per method to understand adoption and spot anomalies.

```graphql
query AuthVolumeByMethod(
  $accountTag: String!
  $startDate: Date!
  $endDate: Date!
) {
  viewer {
    accounts(filter: { accountTag: $accountTag }) {
      privacyProxyAuthMetricsAdaptiveGroups(
        filter: {
          date_geq: $startDate
          date_leq: $endDate
        }
        limit: 10000
        orderBy: [date_ASC]
      ) {
        count
        dimensions {
          date
          authMethod
        }
      }
    }
  }
}
```

```json
{
  "accountTag": "<YOUR_ACCOUNT_TAG>",
  "startDate": "2026-04-04",
  "endDate": "2026-04-06"
}
```

</details>

<details>

<summary>

Auth failure spike detection

</summary>

Detect surges in authentication failures and identify which auth method is failing.

```graphql
query AuthFailureSpike(
  $accountTag: String!
  $start: Time!
  $end: Time!
) {
  viewer {
    accounts(filter: { accountTag: $accountTag }) {
      privacyProxyAuthMetricsAdaptiveGroups(
        filter: {
          datetimeMinute_geq: $start
          datetimeMinute_leq: $end
          authResult: "failure"
        }
        limit: 10000
        orderBy: [datetimeFiveMinutes_ASC]
      ) {
        count
        dimensions {
          datetimeFiveMinutes
          authMethod
        }
      }
    }
  }
}
```

```json
{
  "accountTag": "<YOUR_ACCOUNT_TAG>",
  "start": "2026-04-04T10:00:00Z",
  "end": "2026-04-06T14:00:00Z"
}
```

</details>

<details>

<summary>

Auth success rate

</summary>

Compare hourly success versus failure counts to compute auth success rate and spot degradation trends.

```graphql
query AuthSuccessRate(
  $accountTag: String!
  $start: Time!
  $end: Time!
) {
  viewer {
    accounts(filter: { accountTag: $accountTag }) {
      privacyProxyAuthMetricsAdaptiveGroups(
        filter: {
          datetimeHour_geq: $start
          datetimeHour_leq: $end
        }
        limit: 10000
        orderBy: [datetimeHour_ASC]
      ) {
        count
        dimensions {
          datetimeHour
          authResult
        }
      }
    }
  }
}
```

```json
{
  "accountTag": "<YOUR_ACCOUNT_TAG>",
  "start": "2026-04-04T00:00:00Z",
  "end": "2026-04-06T23:59:59Z"
}
```

</details>

</details>

---

## Related resources

- [GraphQL Analytics API — getting started](https://developers.cloudflare.com/analytics/graphql-api/getting-started/)
- [GraphQL Analytics API — filtering](https://developers.cloudflare.com/analytics/graphql-api/features/filtering/)
- [Proxy status reference](https://developers.cloudflare.com/privacy-proxy/reference/proxy-status/) — All possible `proxyStatus` values and their meanings.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/privacy-proxy/reference/metrics/graphql/#page","headline":"GraphQL Analytics API · Cloudflare Privacy Proxy docs","description":"Query Privacy Proxy request, connection, and authentication metrics using the Cloudflare GraphQL Analytics API.","url":"https://developers.cloudflare.com/privacy-proxy/reference/metrics/graphql/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
