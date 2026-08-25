---
description: Query Workers KV operations and storage metrics via the dashboard or the GraphQL Analytics API.
title: Metrics and analytics
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/kv/llms.txt
> Use this file to discover all available pages before exploring further.

# Metrics and analytics

Last updated Apr 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/kv/observability/metrics-analytics/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

KV exposes analytics that allow you to inspect requests and storage across all namespaces in your account.

The metrics displayed in the [Cloudflare dashboard ↗](https://dash.cloudflare.com/) charts are queried from Cloudflare’s [GraphQL Analytics API](https://developers.cloudflare.com/analytics/graphql-api/). You can access the metrics [programmatically](#query-via-the-graphql-api) via GraphQL or HTTP client.

## Metrics

KV currently exposes the below metrics:

| Dataset    | GraphQL Dataset Name       | Description                                                         |
| ---------- | -------------------------- | ------------------------------------------------------------------- |
| Operations | kvOperationsAdaptiveGroups | This dataset consists of the operations made to your KV namespaces. |
| Storage    | kvStorageAdaptiveGroups    | This dataset consists of the storage details of your KV namespaces. |

Metrics can be queried (and are retained) for the past 31 days.

## View metrics in the dashboard

Per-namespace analytics for KV are available in the Cloudflare dashboard. To view current and historical metrics for a database:

1. In the Cloudflare dashboard, go to the **Workers KV** page.
[Go to **Workers KV** ↗](https://dash.cloudflare.com/?to=/:account/workers/kv/namespaces)
2. Select an existing namespace.
3. Select the **Metrics** tab.

You can optionally select a time window to query. This defaults to the last 24 hours.

## Query via the GraphQL API

You can programmatically query analytics for your KV namespaces via the [GraphQL Analytics API](https://developers.cloudflare.com/analytics/graphql-api/). This API queries the same datasets as the Cloudflare dashboard, and supports GraphQL [introspection](https://developers.cloudflare.com/analytics/graphql-api/features/discovery/introspection/).

To get started using the [GraphQL Analytics API](https://developers.cloudflare.com/analytics/graphql-api/), follow the documentation to setup [Authentication for the GraphQL Analytics API](https://developers.cloudflare.com/analytics/graphql-api/getting-started/authentication/).

To use the GraphQL API to retrieve KV's datasets, you must provide the `accountTag` filter with your Cloudflare Account ID. The GraphQL datasets for KV include:

* `kvOperationsAdaptiveGroups`
* `kvStorageAdaptiveGroups`

### Examples

The following are common GraphQL queries that you can use to retrieve information about KV analytics. These queries make use of variables `$accountTag`, `$date_geq`, `$date_leq`, and `$namespaceId`, which should be set as GraphQL variables or replaced in line. These variables should look similar to these:

```json
{
	"accountTag": "<YOUR_ACCOUNT_ID>",
	"namespaceId": "<YOUR_KV_NAMESPACE_ID>",
	"date_geq": "2024-07-15",
	"date_leq": "2024-07-30"
}
```

#### Operations

To query the sum of read, write, delete, and list operations for a given `namespaceId` and for a given date range (`start` and `end`), grouped by `date` and `actionType`:

```graphql
query KvOperationsSample(
	$accountTag: string!
	$namespaceId: string
	$start: Date
	$end: Date
) {
	viewer {
		accounts(filter: { accountTag: $accountTag }) {
			kvOperationsAdaptiveGroups(
				filter: { namespaceId: $namespaceId, date_geq: $start, date_leq: $end }
				limit: 10000
				orderBy: [date_DESC]
			) {
				sum {
					requests
				}
				dimensions {
					date
					actionType
				}
			}
		}
	}
}
```

To query the distribution of the latency for read operations for a given `namespaceId` within a given date range (`start`, `end`):

```graphql
query KvOperationsSample2(
	$accountTag: string!
	$namespaceId: string
	$start: Date
	$end: Date
) {
	viewer {
		accounts(filter: { accountTag: $accountTag }) {
			kvOperationsAdaptiveGroups(
				filter: {
					namespaceId: $namespaceId
					date_geq: $start
					date_leq: $end
					actionType: "read"
				}
				limit: 10000
			) {
				sum {
					requests
				}
				dimensions {
					actionType
				}
				quantiles {
					latencyMsP25
					latencyMsP50
					latencyMsP75
					latencyMsP90
					latencyMsP99
					latencyMsP999
				}
			}
		}
	}
}
```

To query your account-wide read, write, delete, and list operations across all KV namespaces:

```graphql
query KvOperationsAllSample($accountTag: string!, $start: Date, $end: Date) {
	viewer {
		accounts(filter: { accountTag: $accountTag }) {
			kvOperationsAdaptiveGroups(
				filter: { date_geq: $start, date_leq: $end }
				limit: 10000
			) {
				sum {
					requests
				}
				dimensions {
					actionType
				}
			}
		}
	}
}
```

#### Storage

To query the storage details (`keyCount` and `byteCount`) of a KV namespace for every day of a given date range:

```graphql
query Viewer(
	$accountTag: string!
	$namespaceId: string
	$start: Date
	$end: Date
) {
	viewer {
		accounts(filter: { accountTag: $accountTag }) {
			kvStorageAdaptiveGroups(
				filter: { date_geq: $start, date_leq: $end, namespaceId: $namespaceId }
				limit: 10000
				orderBy: [date_DESC]
			) {
				max {
					keyCount
					byteCount
				}
				dimensions {
					date
				}
			}
		}
	}
}
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/kv/observability/metrics-analytics/#page","headline":"Metrics and analytics · Cloudflare Workers KV docs","description":"Query Workers KV operations and storage metrics via the dashboard or the GraphQL Analytics API.","url":"https://developers.cloudflare.com/kv/observability/metrics-analytics/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
