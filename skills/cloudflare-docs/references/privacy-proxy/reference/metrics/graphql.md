---
title: GraphQL Analytics API
description: Query Privacy Proxy request, connection, and authentication metrics using the Cloudflare GraphQL Analytics API.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

# GraphQL Analytics API

Privacy Proxy exposes metrics through Cloudflare's [GraphQL Analytics API](https://developers.cloudflare.com/analytics/graphql-api/). All metrics are queryable through a single endpoint:

```

POST https://api.cloudflare.com/client/v4/graphql


```

Before you begin, you will need:

* **API token** — Create a token with _Account Analytics_ read permissions. For more information, refer to our Analytics API token documentation: [Configure an Analytics API token](https://developers.cloudflare.com/analytics/graphql-api/getting-started/authentication/api-token-auth/).
* **Account ID** — Your Cloudflare account ID, passed as `accountTag` in queries. For more information, refer to [Find account and zone IDs](https://developers.cloudflare.com/fundamentals/account/find-account-and-zone-ids/).

---

## Making a request

The following example shows how to query your Privacy Proxy metrics daily request volume using curl. Replace the placeholder values with your own.

Terminal window

```

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

Explain Code

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

Metrics

Sum fields

| Field                  | Type   | Description                                                   | Node               |
| ---------------------- | ------ | ------------------------------------------------------------- | ------------------ |
| bytesSentToClient      | uint64 | Total bytes sent from the proxy back to the client.           | Ingress connection |
| bytesRecvdFromClient   | uint64 | Total bytes received by the proxy from the client.            | Ingress connection |
| bytesSentToOrigin      | uint64 | Total bytes sent from the proxy to the upstream origin.       | Egress connection  |
| bytesRecvdFromOrigin   | uint64 | Total bytes received by the proxy from the upstream origin.   | Egress connection  |
| packetsSentToClient    | uint64 | Total packets sent from the proxy back to the client.         | Ingress connection |
| packetsRecvdFromClient | uint64 | Total packets received by the proxy from the client.          | Ingress connection |
| packetsSentToOrigin    | uint64 | Total packets sent from the proxy to the upstream origin.     | Egress connection  |
| packetsRecvdFromOrigin | uint64 | Total packets received by the proxy from the upstream origin. | Egress connection  |

Count fields

All four nodes expose a `count` field that returns the total number of sampled events (requests, connections, or auth attempts) matching the query filter.

Quantile fields

| Field                               | Type    | Description                                                                                                | Node                          |
| ----------------------------------- | ------- | ---------------------------------------------------------------------------------------------------------- | ----------------------------- |
| durationMsP50                       | float64 | Median lifetime of a connection, in milliseconds.                                                          | Ingress and egress connection |
| durationMsP95                       | float64 | 95th percentile connection lifetime, in milliseconds.                                                      | Ingress and egress connection |
| durationMsP99                       | float64 | 99th percentile connection lifetime, in milliseconds.                                                      | Ingress and egress connection |
| handshakeDurationUsP50              | float64 | Median TCP+TLS/QUIC handshake time, in microseconds.                                                       | Ingress and egress connection |
| handshakeDurationUsP95              | float64 | 95th percentile handshake time, in microseconds.                                                           | Ingress and egress connection |
| handshakeDurationUsP99              | float64 | 99th percentile handshake time, in microseconds.                                                           | Ingress and egress connection |
| connectRequestHandlingDurationUsP50 | float64 | Median time to handle a CONNECT request, in microseconds. _Not yet available._                             | Request                       |
| connectRequestHandlingDurationUsP95 | float64 | 95th percentile time to handle a CONNECT request, in microseconds. _Not yet available._                    | Request                       |
| connectRequestHandlingDurationUsP99 | float64 | 99th percentile time to handle a CONNECT request, in microseconds. _Not yet available._                    | Request                       |
| connectTunnelSetupDurationUsP50     | float64 | Median time to establish a tunnel after receiving a CONNECT request, in microseconds. _Not yet available._ | Request                       |
| connectTunnelSetupDurationUsP95     | float64 | 95th percentile tunnel setup time, in microseconds. _Not yet available._                                   | Request                       |
| connectTunnelSetupDurationUsP99     | float64 | 99th percentile tunnel setup time, in microseconds. _Not yet available._                                   | Request                       |

Dimensions

All nodes

| Field                  | Type   | Description                                      |
| ---------------------- | ------ | ------------------------------------------------ |
| date                   | Date   | Calendar date (day granularity).                 |
| datetimeMinute         | Time   | Timestamp truncated to the minute.               |
| datetimeFiveMinutes    | Time   | Timestamp truncated to five-minute intervals.    |
| datetimeFifteenMinutes | Time   | Timestamp truncated to fifteen-minute intervals. |
| datetimeHour           | Time   | Timestamp truncated to the hour.                 |
| coloCode               | string | Cloudflare data center that handled the request. |
| endpoint               | string | The appId that generated traffic.                |

All timestamp dimensions refer to the end of each connection or request, not the start.

Request node only

| Field       | Type   | Description                                                                                                                                                                                                |
| ----------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| statusCode  | uint16 | HTTP status code returned by the proxy to the client.                                                                                                                                                      |
| proxyStatus | string | Proxy-level error classification. null when no proxy-level error occurred. Refer to [proxy status reference](https://developers.cloudflare.com/privacy-proxy/reference/proxy-status/) for possible values. |
| tunnelType  | string | Tunnel protocol used (connect-tcp, connect-udp, connect-ip). _Not yet available._                                                                                                                          |

Ingress connection node only

| Field      | Type   | Description                                                                    |
| ---------- | ------ | ------------------------------------------------------------------------------ |
| transport  | string | Transport protocol on the client-to-proxy connection (tcp, quic).              |
| tlsVersion | string | TLS version negotiated on the client-to-proxy connection. _Not yet available._ |

Egress connection node only

| Field     | Type   | Description                                                       |
| --------- | ------ | ----------------------------------------------------------------- |
| transport | string | Transport protocol on the proxy-to-origin connection (tcp, quic). |

Auth node only

| Field      | Type   | Description                                           |
| ---------- | ------ | ----------------------------------------------------- |
| authMethod | string | Authentication method used (for example, Token, Psk). |
| authResult | string | Authentication outcome (success, failure).            |

Arguments

All four nodes share the same argument signature.

* `filter` required — Filters your data. `accountTag` is always required inside the filter.
* `limit` optional — Maximum number of records to return.
* `orderBy` optional — Sort order for results.

---

## Sample queries

privacyProxyRequestMetricsAdaptiveGroups node

Request volume overview

Get a high-level view of daily request volume over a date range.

```

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

Explain Code

```

{

  "accountTag": "<YOUR_ACCOUNT_TAG>",

  "startDate": "2026-04-04",

  "endDate": "2026-04-06"

}


```

Error breakdown by status code and proxy status

Identify which HTTP status codes and proxy-level errors are occurring to pinpoint the source of failures.

```

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

Explain Code

```

{

  "accountTag": "<YOUR_ACCOUNT_TAG>",

  "start": "2026-04-04T00:00:00Z",

  "end": "2026-04-06T23:59:59Z"

}


```

Top proxy errors by frequency

Rank the most frequent proxy error types to prioritize investigation.

```

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

Explain Code

```

{

  "accountTag": "<YOUR_ACCOUNT_TAG>",

  "start": "2026-04-04",

  "end": "2026-04-06"

}


```

Tunnel type distribution

Monitor the mix of `connect-tcp`, `connect-udp`, and `connect-ip` over time to understand how clients are connecting.

```

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

Explain Code

```

{

  "accountTag": "<YOUR_ACCOUNT_TAG>",

  "startDate": "2026-04-04",

  "endDate": "2026-04-06"

}


```

privacyProxyIngressConnMetricsAdaptiveGroups node

Connection volume and ingress bytes overview

Get a high-level view of daily ingress connection count and bytes transferred.

```

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

Explain Code

```

{

  "accountTag": "<YOUR_ACCOUNT_TAG>",

  "startDate": "2026-04-04",

  "endDate": "2026-04-06"

}


```

Connection duration by data center

Compare client-to-proxy connection duration across data centers to identify regions with long-lived or stalled connections.

```

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

Explain Code

```

{

  "accountTag": "<YOUR_ACCOUNT_TAG>",

  "startDate": "2026-04-04",

  "endDate": "2026-04-06"

}


```

Protocol and TLS version distribution

Understanding which transport protocols (QUIC versus TCP) and TLS versions your clients use helps you plan deprecations, detect misconfigured clients, and verify that traffic meets your security requirements.

```

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

Explain Code

```

{

  "accountTag": "<YOUR_ACCOUNT_TAG>",

  "start": "2026-04-04T00:00:00Z",

  "end": "2026-04-06T23:59:59Z"

}


```

privacyProxyEgressConnMetricsAdaptiveGroups node

Egress bytes overview

Get a high-level view of daily bytes flowing between the proxy and the upstream origin.

```

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

Explain Code

```

{

  "accountTag": "<YOUR_ACCOUNT_TAG>",

  "startDate": "2026-04-04",

  "endDate": "2026-04-06"

}


```

Proxy-to-origin latency by data center

Compare proxy-to-origin handshake times across data centers to identify regions with degraded origin reachability.

```

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

Explain Code

```

{

  "accountTag": "<YOUR_ACCOUNT_TAG>",

  "startDate": "2026-04-04",

  "endDate": "2026-04-06"

}


```

Egress performance trend

Track proxy-to-origin handshake latency at fine granularity over a specific time window.

```

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

Explain Code

```

{

  "accountTag": "<YOUR_ACCOUNT_TAG>",

  "start": "2026-04-04T08:00:00Z",

  "end": "2026-04-06T14:00:00Z"

}


```

privacyProxyAuthMetricsAdaptiveGroups node

Auth volume by method

Track daily authentication volume per method to understand adoption and spot anomalies.

```

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

Explain Code

```

{

  "accountTag": "<YOUR_ACCOUNT_TAG>",

  "startDate": "2026-04-04",

  "endDate": "2026-04-06"

}


```

Auth failure spike detection

Detect surges in authentication failures and identify which auth method is failing.

```

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

Explain Code

```

{

  "accountTag": "<YOUR_ACCOUNT_TAG>",

  "start": "2026-04-04T10:00:00Z",

  "end": "2026-04-06T14:00:00Z"

}


```

Auth success rate

Compare hourly success versus failure counts to compute auth success rate and spot degradation trends.

```

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

Explain Code

```

{

  "accountTag": "<YOUR_ACCOUNT_TAG>",

  "start": "2026-04-04T00:00:00Z",

  "end": "2026-04-06T23:59:59Z"

}


```

---

## Related resources

* [GraphQL Analytics API — getting started](https://developers.cloudflare.com/analytics/graphql-api/getting-started/)
* [GraphQL Analytics API — filtering](https://developers.cloudflare.com/analytics/graphql-api/features/filtering/)
* [Proxy status reference](https://developers.cloudflare.com/privacy-proxy/reference/proxy-status/) — All possible `proxyStatus` values and their meanings.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/privacy-proxy/","name":"Privacy Proxy"}},{"@type":"ListItem","position":3,"item":{"@id":"/privacy-proxy/reference/","name":"Reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/privacy-proxy/reference/metrics/","name":"Observability"}},{"@type":"ListItem","position":5,"item":{"@id":"/privacy-proxy/reference/metrics/graphql/","name":"GraphQL Analytics API"}}]}
```
