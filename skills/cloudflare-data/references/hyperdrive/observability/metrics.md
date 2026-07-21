---
description: Inspect query volume, latency, cache hit ratios, and connection pool sizes for your Hyperdrive configurations.
title: Metrics and analytics
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/hyperdrive/llms.txt
> Use this file to discover all available pages before exploring further.

#  Metrics and analytics

Last updated May 28, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/hyperdrive/observability/metrics/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

Hyperdrive exposes analytics that allow you to inspect query volume, query latency, cache hit ratios, and connection pool metrics for each Hyperdrive configuration in your account.

## Metrics

Hyperdrive currently exports metrics via the `hyperdriveQueriesAdaptiveGroups` and `hyperdrivePoolSizesAdaptiveGroups` GraphQL datasets.

### Query metrics

The `hyperdriveQueriesAdaptiveGroups` dataset contains the following metrics:

| Metric             | GraphQL Field Name | Description                                                                                                                                                                                 |
| ------------------ | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Queries            | count              | The number of queries issued against your Hyperdrive in the given time period.                                                                                                              |
| Cache Status       | cacheStatus        | Whether the query was cached or not. Can be one of disabled, hit, miss, uncacheable, multiplestatements, notaquery, oversizedquery, oversizedresult, parseerror, transaction, and volatile. |
| Query Bytes        | queryBytes         | The size of your queries, in bytes.                                                                                                                                                         |
| Result Bytes       | resultBytes        | The size of your query _results_, in bytes.                                                                                                                                                 |
| Connection Latency | connectionLatency  | The time (in milliseconds) required to establish new connections from Hyperdrive to your database, as measured from your Hyperdrive connection pool(s).                                     |
| Query Latency      | queryLatency       | The time (in milliseconds) required to query (and receive results) from your database, as measured from your Hyperdrive connection pool(s).                                                 |
| Event Status       | eventStatus        | Whether a query responded successfully (complete) or failed (error).                                                                                                                        |

The `volatile` cache status indicates the query contains a PostgreSQL function categorized as `STABLE` or `VOLATILE` (for example, `NOW()`, `RANDOM()`). Refer to [Query caching](https://developers.cloudflare.com/hyperdrive/concepts/query-caching/) for details on which functions affect cacheability.

### Pool size metrics

The `hyperdrivePoolSizesAdaptiveGroups` dataset contains the following connection pool metrics:

| Metric                | GraphQL Field Name     | Description                                                       |
| --------------------- | ---------------------- | ----------------------------------------------------------------- |
| Avg. open connections | avg.currentPoolSize    | Average number of connections currently open in the pool.         |
| Avg. available slots  | avg.availablePoolSlots | Average number of pool connections available for checkout.        |
| Avg. waiting clients  | avg.waitingClients     | Average number of clients waiting for a connection from the pool. |
| Pool size maximum     | max.maxPoolSize        | Configured maximum size of the connection pool.                   |
| Peak open connections | max.currentPoolSize    | Peak number of connections open in the pool.                      |
| Peak waiting clients  | max.waitingClients     | Peak number of clients waiting for a connection from the pool.    |

Connection contention appears as a spike in waiting clients, or when open connections consistently approach the pool size maximum. If your open connections regularly approach this limit, consider [increasing your Hyperdrive connection limit](https://developers.cloudflare.com/hyperdrive/platform/limits/#request-a-limit-increase).

Metrics can be queried (and are retained) for the past 31 days.

## View metrics in the dashboard

Per-database analytics for Hyperdrive are available in the Cloudflare dashboard. To view current and historical metrics for a Hyperdrive configuration:

1. In the Cloudflare dashboard, go to the **Hyperdrive** page.
[ Go to **Hyperdrive** ↗ ](https://dash.cloudflare.com/?to=/:account/workers/hyperdrive)
2. Select an existing Hyperdrive configuration.
3. Select the **Metrics** tab.

You can optionally select a time window to query. This defaults to the last 24 hours.

The dashboard includes a **Pool connections** chart, which displays waiting connections, open connections, and the pool size maximum. You can use the location selector to filter by specific Cloudflare locations.

## Query via the GraphQL API

You can programmatically query analytics for your Hyperdrive configurations via the [GraphQL Analytics API](https://developers.cloudflare.com/analytics/graphql-api/). This API queries the same datasets as the Cloudflare dashboard, and supports GraphQL [introspection](https://developers.cloudflare.com/analytics/graphql-api/features/discovery/introspection/).

Hyperdrive's GraphQL datasets require an `accountTag` filter with your Cloudflare account ID. Hyperdrive exposes the `hyperdriveQueriesAdaptiveGroups` and `hyperdrivePoolSizesAdaptiveGroups` datasets.

## Write GraphQL queries

Examples of how to explore your Hyperdrive metrics.

### Get the number of queries handled via your Hyperdrive config by cache status

```graphql
query HyperdriveQueries(
	$accountTag: string!
	$configId: string!
	$datetimeStart: Time!
	$datetimeEnd: Time!
) {
	viewer {
		accounts(filter: { accountTag: $accountTag }) {
			hyperdriveQueriesAdaptiveGroups(
				limit: 10000
				filter: {
					configId: $configId
					datetime_geq: $datetimeStart
					datetime_leq: $datetimeEnd
				}
			) {
				count
				dimensions {
					cacheStatus
				}
			}
		}
	}
}
```

### Get the average query and connection latency for queries handled via your Hyperdrive config within a range of time, excluding queries that failed due to an error

```graphql
query AverageHyperdriveLatencies(
	$accountTag: string!
	$configId: string!
	$datetimeStart: Time!
	$datetimeEnd: Time!
) {
	viewer {
		accounts(filter: { accountTag: $accountTag }) {
			hyperdriveQueriesAdaptiveGroups(
				limit: 10000
				filter: {
					configId: $configId
					eventStatus: "complete"
					datetime_geq: $datetimeStart
					datetime_leq: $datetimeEnd
				}
			) {
				avg {
					connectionLatency
					queryLatency
				}
			}
		}
	}
}
```

### Get the total amount of query and result bytes flowing through your Hyperdrive config

```graphql
query HyperdriveQueryAndResultBytesForSuccessfulQueries(
	$accountTag: string!
	$configId: string!
	$datetimeStart: Date!
	$datetimeEnd: Date!
) {
	viewer {
		accounts(filter: { accountTag: $accountTag }) {
			hyperdriveQueriesAdaptiveGroups(
				limit: 10000
				filter: {
					configId: $configId
					datetime_geq: $datetimeStart
					datetime_leq: $datetimeEnd
				}
			) {
				sum {
					queryBytes
					resultBytes
				}
			}
		}
	}
}
```

### Get the pool size metrics for your Hyperdrive config

```graphql
query HyperdrivePoolSizes(
	$accountTag: string!
	$configId: string!
	$datetimeStart: Time!
	$datetimeEnd: Time!
) {
	viewer {
		accounts(filter: { accountTag: $accountTag }) {
			hyperdrivePoolSizesAdaptiveGroups(
				limit: 10000
				filter: {
					configId: $configId
					datetime_geq: $datetimeStart
					datetime_leq: $datetimeEnd
				}
			) {
				avg {
					currentPoolSize
					availablePoolSlots
					waitingClients
				}
				max {
					maxPoolSize
					currentPoolSize
					waitingClients
				}
				dimensions {
					coloCode
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
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/hyperdrive/observability/metrics/#page","headline":"Metrics and analytics · Cloudflare Hyperdrive docs","description":"Inspect query volume, latency, cache hit ratios, and connection pool sizes for your Hyperdrive configurations.","url":"https://developers.cloudflare.com/hyperdrive/observability/metrics/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-05-28","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
