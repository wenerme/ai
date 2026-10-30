---
description: Inspect D1 query volume, latency, and storage size via the dashboard or GraphQL Analytics API.
title: Metrics and analytics
image: https://developers.cloudflare.com/d1/observability/metrics-analytics/og.png?v=ebbea2eb8fd63786
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/d1/llms.txt
> Use this file to discover all available pages before exploring further.

# Metrics and analytics

Last updated Oct 30, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/d1/observability/metrics-analytics/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

D1 exposes database analytics that allow you to inspect query volume, query latency, and storage size across all and/or each database in your account.

The metrics displayed in the [Cloudflare dashboard ↗︎](https://dash.cloudflare.com/) charts are queried from Cloudflare’s [GraphQL Analytics API](https://developers.cloudflare.com/analytics/graphql-api/). You can access the metrics [programmatically](#query-via-the-graphql-api) via GraphQL or HTTP client.

## Metrics

D1 currently exports the below metrics:

| Metric | GraphQL Field Name | Description |
| --- | --- | --- |
| Read Queries (qps) | `readQueries` | The number of read queries issued against a database. This is the raw number of read queries, and is not used for billing. |
| Write Queries (qps) | `writeQueries` | The number of write queries issued against a database. This is the raw number of write queries, and is not used for billing. |
| Rows read (count) | `rowsRead` | The number of rows read (scanned) across your queries. See [Pricing](https://developers.cloudflare.com/d1/platform/pricing/) for more details on how rows are counted. |
| Rows written (count) | `rowsWritten` | The number of rows written across your queries. |
| Query Response (bytes) | `queryBatchResponseBytes` | The total response size of the serialized query response, including any/all column names, rows and metadata. Reported in bytes. |
| Query Latency (ms) | `queryBatchTimeMs` | The total query response time, including response serialization, on the server-side. Reported in milliseconds. |
| Storage (Bytes) | `databaseSizeBytes` | Maximum size of a database. Reported in bytes. |

Metrics can be queried (and are retained) for the past 31 days.

### Row counts

D1 returns the number of rows read, rows written (or both) in response to each individual query via [the Workers Binding API](https://developers.cloudflare.com/d1/worker-api/return-object/).

Row counts are a precise count of how many rows were read (scanned) or written by that query. Inspect row counts to understand the performance and cost of a given query, including whether you can reduce the rows read [using indexes](https://developers.cloudflare.com/d1/best-practices/use-indexes/). Use query counts to understand the total volume of traffic against your databases and to discern which databases are actively in-use.

Refer to the [Pricing documentation](https://developers.cloudflare.com/d1/platform/pricing/) for more details on how rows are counted.

## View metrics in the dashboard

Per-database analytics for D1 are available in the Cloudflare dashboard. To view current and historical metrics for a database:

1. In the Cloudflare dashboard, go to the **D1** page. [Go to **D1 SQL database** ↗](https://dash.cloudflare.com/?to=/:account/workers/d1)
2. Select an existing D1 database.
3. Select the **Metrics** tab.

You can optionally select a time window to query. This defaults to the last 24 hours.

## Query via the GraphQL API

You can programmatically query analytics for your D1 databases via the [GraphQL Analytics API](https://developers.cloudflare.com/analytics/graphql-api/). This API queries the same datasets as the Cloudflare dashboard, and supports GraphQL [introspection](https://developers.cloudflare.com/analytics/graphql-api/features/discovery/introspection/).

D1's GraphQL datasets require an `accountTag` filter with your Cloudflare account ID and include:

- `d1AnalyticsAdaptiveGroups`
- `d1StorageAdaptiveGroups`
- `d1QueriesAdaptiveGroups`

### Examples

To query the sum of `readQueries`, `writeQueries` for a given `$databaseId`, grouping by `databaseId` and `date`:

```graphql
query D1ObservabilitySampleQuery(
	$accountTag: string!
	$start: Date
	$end: Date
	$databaseId: string
) {
	viewer {
		accounts(filter: { accountTag: $accountTag }) {
			d1AnalyticsAdaptiveGroups(
				limit: 10000
				filter: { date_geq: $start, date_leq: $end, databaseId: $databaseId }
				orderBy: [date_DESC]
			) {
				sum {
					readQueries
					writeQueries
				}
				dimensions {
					date
					databaseId
				}
			}
		}
	}
}
```

To query both the average `queryBatchTimeMs` and the 90th percentile `queryBatchTimeMs` per database:

```graphql
query D1ObservabilitySampleQuery2(
	$accountTag: string!
	$start: Date
	$end: Date
	$databaseId: string
) {
	viewer {
		accounts(filter: { accountTag: $accountId }) {
			d1AnalyticsAdaptiveGroups(
				limit: 10000
				filter: { date_geq: $start, date_leq: $end, databaseId: $databaseId }
				orderBy: [date_DESC]
			) {
				quantiles {
					queryBatchTimeMsP90
				}
				dimensions {
					date
					databaseId
				}
			}
		}
	}
}
```

To query your account-wide `readQueries` and `writeQueries`:

```graphql
query D1ObservabilitySampleQuery3(
	$accountTag: string!
	$start: Date
	$end: Date
	$databaseId: string
) {
	viewer {
		accounts(filter: { accountTag: $accountTag }) {
			d1AnalyticsAdaptiveGroups(
				limit: 10000
				filter: { date_geq: $start, date_leq: $end, databaseId: $databaseId }
			) {
				sum {
					readQueries
					writeQueries
				}
			}
		}
	}
}
```

## Query `insights`

D1 provides metrics that let you understand and debug query performance. You can access these via GraphQL's `d1QueriesAdaptiveGroups` or `wrangler d1 insights` command.

D1 captures your query strings to make it easier to analyze metrics across query executions. [Bound parameters](https://developers.cloudflare.com/d1/worker-api/prepared-statements/#guidance) are not captured to remove any sensitive information.

Note

`wrangler d1 insights` is an experimental Wrangler command. Its options and output may change.

Run `wrangler d1 insights --help` to view current options.

`wrangler d1 insights` reads data from the GraphQL Analytics API. If you use an API token, the token must have the **Account Analytics Read** permission.

Pass a database name, binding, or ID to get the top queries for that database. Leave it out to run account-wide and get the top queries across every D1 database in your account:

```sh
# Top queries for one database
npx wrangler d1 insights <database_name_or_id>

# Top queries across every D1 database in the account
npx wrangler d1 insights
```

When run account-wide, each result also includes a `databaseId` field with the ID of the database that ran the query. To find the name of that database, run `npx wrangler d1 info <database_id>`.

| Option | Description |
| --- | --- |
| `--time-period` | Fetch data from now to the provided time period, for example `30m`, `12h` or `7d` (default: `1d`, maximum: `31d`). |
| `--sort-type` | The operation you want to sort insights by. Select between `sum` and `avg` (default: `sum`). |
| `--sort-by` | The field you want to sort insights by. Select between `time`, `reads`, `writes`, and `count` (default: `time`). |
| `--sort-direction` | The sort direction. Select between `ASC` and `DESC` (default: `DESC`). |
| `--json` | A boolean value to specify whether to return the result as clean JSON (default: `false`). |
| `--limit` | The maximum number of queries to be fetched. When run account-wide, this limit applies across all databases (default: `5`). |

<details>

<summary>

To find the top 3 queries across all databases in your account by execution count:

</summary>

```sh
npx wrangler d1 insights --sort-type=sum --sort-by=count --limit=3 --json
```

```sh
[
  {
    "query": "SELECT \"Order\".Id, \"Order\".CustomerId, \"Order\".OrderDate,\n            SUM(OrderDetail.UnitPrice * OrderDetail.Quantity) AS TotalAmount\n          FROM \"Order\"\n          JOIN OrderDetail ON OrderDetail.OrderId = \"Order\".Id\n          GROUP BY \"Order\".Id\n          ORDER BY \"Order\".Id DESC\n          LIMIT ?",
    "avgRowsRead": 1244521,
    "totalRowsRead": 11040145791,
    "avgRowsWritten": 0,
    "totalRowsWritten": 0,
    "avgDurationMs": 259.2086358584151,
    "totalDurationMs": 2299439.8087000004,
    "numberOfTimesRun": 8871,
    "queryEfficiency": 1.6070439952399358e-05,
    "databaseId": "7c9e2b14-3f6a-4d8e-9b21-5a0c8f3e6d47"
  },
  {
    "query": "SELECT * FROM \"Order\" WHERE OrderDate BETWEEN ? AND ?",
    "avgRowsRead": 16818,
    "totalRowsRead": 148553394,
    "avgRowsWritten": 0,
    "totalRowsWritten": 0,
    "avgDurationMs": 5.4971649382995595,
    "totalDurationMs": 48556.45790000001,
    "numberOfTimesRun": 8833,
    "queryEfficiency": 0.019146152931383043,
    "databaseId": "2e4f6a81-9c3d-4b7e-a512-8d0f3c6b9e15"
  },
  {
    "query": "SELECT * FROM Customer WHERE Id = ?",
    "avgRowsRead": 1,
    "totalRowsRead": 8714,
    "avgRowsWritten": 0,
    "totalRowsWritten": 0,
    "avgDurationMs": 0.318006288730778,
    "totalDurationMs": 2771.1067999999996,
    "numberOfTimesRun": 8714,
    "queryEfficiency": 1,
    "databaseId": "b5d18e3a-6f29-4c04-8e7b-1a9c2d5f7e60"
  }
]
```

Each result includes the <code>databaseId</code> of the database that ran the query.

</details>

<details>

<summary>

To find top 3 queries by average execution time:

</summary>

```sh
npx wrangler d1 insights <database_name> --sort-type=avg --sort-by=time --limit=3
```

```sh
⛅️ wrangler 3.95.0
-------------------

-------------------
🚧 `wrangler d1 insights` is an experimental command.
🚧 Flags for this command, their descriptions, and output may change between wrangler versions.
-------------------

[
  {
    "query": "SELECT * From Customers",
    "avgRowsRead": 0,
    "totalRowsRead": 0,
    "avgRowsWritten": 0,
    "totalRowsWritten": 0,
    "avgDurationMs": 1.0225,
    "totalDurationMs": 1.0225,
    "numberOfTimesRun": 1,
    "queryEfficiency": 0
  },
  {
    "query": "SELECT tbl_name as name,\n                   (SELECT ncol FROM pragma_table_list(tbl_name)) as num_columns\n            FROM sqlite_master\n            WHERE TYPE = \"table\"\n              AND tbl_name NOT LIKE \"sqlite_%\"\n              AND tbl_name NOT LIKE \"d1_%\"\n              AND tbl_name NOT LIKE \"_cf_%\"\n            ORDER BY tbl_name ASC;",
    "avgRowsRead": 2,
    "totalRowsRead": 4,
    "avgRowsWritten": 0,
    "totalRowsWritten": 0,
    "avgDurationMs": 0.49505,
    "totalDurationMs": 0.9901,
    "numberOfTimesRun": 2,
    "queryEfficiency": 0
  },
  {
    "query": "SELECT * FROM Customers",
    "avgRowsRead": 4,
    "totalRowsRead": 4,
    "avgRowsWritten": 0,
    "totalRowsWritten": 0,
    "avgDurationMs": 0.1873,
    "totalDurationMs": 0.1873,
    "numberOfTimesRun": 1,
    "queryEfficiency": 1
  }
]
```

</details>

<details>

<summary>

To find the top 3 queries across all databases in your account by rows written in the last 7 days:

</summary>

```sh
npx wrangler d1 insights --sort-type=sum --sort-by=writes --limit=3 --time-period=7d --json
```

```sh
[
  {
    "query": "INSERT INTO OrderDetail (Id, OrderId, ProductId, UnitPrice, Quantity, Discount) VALUES (?, ?, ?, ?, ?, ?)",
    "avgRowsRead": 0,
    "totalRowsRead": 0,
    "avgRowsWritten": 3,
    "totalRowsWritten": 453720,
    "avgDurationMs": 0.41,
    "totalDurationMs": 62008.4,
    "numberOfTimesRun": 151240,
    "queryEfficiency": 0,
    "databaseId": "7c9e2b14-3f6a-4d8e-9b21-5a0c8f3e6d47"
  },
  {
    "query": "INSERT INTO \"Order\" (Id, CustomerId, EmployeeId, OrderDate, ShipVia, Freight) VALUES (?, ?, ?, ?, ?, ?)",
    "avgRowsRead": 0,
    "totalRowsRead": 0,
    "avgRowsWritten": 1,
    "totalRowsWritten": 48906,
    "avgDurationMs": 0.38,
    "totalDurationMs": 18584.28,
    "numberOfTimesRun": 48906,
    "queryEfficiency": 0,
    "databaseId": "7c9e2b14-3f6a-4d8e-9b21-5a0c8f3e6d47"
  },
  {
    "query": "UPDATE Product SET UnitsInStock = UnitsInStock - ? WHERE Id = ?",
    "avgRowsRead": 1,
    "totalRowsRead": 37118,
    "avgRowsWritten": 1,
    "totalRowsWritten": 37118,
    "avgDurationMs": 0.29,
    "totalDurationMs": 10764.22,
    "numberOfTimesRun": 37118,
    "queryEfficiency": 0,
    "databaseId": "2e4f6a81-9c3d-4b7e-a512-8d0f3c6b9e15"
  }
]
```

Each result includes the <code>databaseId</code> of the database that ran the query.

</details>

Note

The quantity `queryEfficiency` measures how efficient your query was. It is calculated as: the number of rows returned divided by the number of rows read.

Generally, you should try to get `queryEfficiency` as close to `1` as possible. Refer to [Use indexes](https://developers.cloudflare.com/d1/best-practices/use-indexes/) for more information on efficient querying.

To find the databases and queries that cost the most in your account, and to learn how to fix them, refer to [Find slow and expensive queries](https://developers.cloudflare.com/d1/observability/find-expensive-queries/).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/d1/observability/metrics-analytics/#page","headline":"Metrics and analytics","description":"Inspect D1 query volume, latency, and storage size via the dashboard or GraphQL Analytics API.","url":"https://developers.cloudflare.com/d1/observability/metrics-analytics/","inLanguage":"en","image":"https://developers.cloudflare.com/d1/observability/metrics-analytics/og.png?v=ebbea2eb8fd63786","dateModified":"2026-10-30","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
