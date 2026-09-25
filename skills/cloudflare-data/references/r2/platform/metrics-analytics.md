---
description: View R2 storage, operations, and bandwidth usage metrics.
title: Metrics and analytics
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/r2/llms.txt
> Use this file to discover all available pages before exploring further.

# Metrics and analytics

Last updated Sep 24, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/r2/platform/metrics-analytics/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

[R2](https://developers.cloudflare.com/r2/) exposes analytics for requests, storage, and bandwidth usage across your buckets.

The metrics displayed for a bucket in the [Cloudflare dashboard ↗︎](https://dash.cloudflare.com/) are queried from Cloudflare's [GraphQL Analytics API](https://developers.cloudflare.com/analytics/graphql-api/). You can access the metrics [programmatically](#query-via-the-graphql-api) via GraphQL or HTTP client.

## Metrics

R2 has three datasets:

| Dataset | GraphQL Dataset Name | Description |
| --- | --- | --- |
| Operations | `r2OperationsAdaptiveGroups` | This dataset consists of the operations taken on a bucket within an account. |
| Storage | `r2StorageAdaptiveGroups` | This dataset consists of the storage of a bucket within an account. |
| Bandwidth | `r2BandwidthUsageAdaptiveGroups` | Dataset contains uploaded and downloaded bytes for buckets within an account. |

Metrics can be queried for a maximum range of 31 days. These datasets require an `accountTag` filter with your Cloudflare account ID.

Querying buckets with jurisdiction restriction

In your account, you may have two buckets of the same name, one with a specified jurisdiction, and one without.

Therefore, if you want to query metrics about a bucket which has a specified jurisdiction, you must include the [jurisdiction](https://developers.cloudflare.com/r2/reference/data-location/#jurisdictional-restrictions) followed by an underscore before the bucket name. For example: `eu_bucket-name`. This ensures you query the correct bucket.

### Operations dataset

| Field | Description |
| --- | --- |
| actionType | The name of the operation performed. |
| actionStatus | The status of the operation. Can be `success`, `userError`, or `internalError`. |
| bucketName | The bucket this operation was performed on if applicable. For buckets with a jurisdiction specified, you must include the jurisdiction followed by an underscore before the bucket name. For example: `eu_your-bucket-name` |
| objectName | The object this operation was performed on if applicable. |
| responseStatusCode | The http status code returned by this operation. |
| datetime | The time of the request. |

### Storage dataset

| Field | Description |
| --- | --- |
| bucketName | The bucket this storage value is for. For buckets with a jurisdiction specified, you must include the [jurisdiction ↗︎](https://developers.cloudflare.com/r2/reference/data-location/#jurisdictional-restrictions) followed by an underscore before the bucket name. For example: `eu_your-bucket-name` |
| payloadSize | The size of the objects in the bucket. |
| metadataSize | The size of the metadata of the objects in the bucket. |
| objectCount | The number of objects in the bucket. |
| uploadCount | The number of pending multipart uploads in the bucket. |
| datetime | The time that this storage value represents. |

### Bandwidth dataset

The dataset excludes bandwidth transfers smaller than 100 KiB. This threshold applies to transfer size, not object size.

You can filter by the following fields:

| Field | Description |
| --- | --- |
| `bucketName` | The R2 bucket identifier, including the jurisdiction prefix if applicable. |
| `date` | The transfer timestamp truncated to the start of the day. |
| `datetimeHour` | The transfer timestamp truncated to the start of the hour. |
| `datetimeFifteenMinutes` | The transfer timestamp rounded down to the nearest quarter hour. |
| `datetimeFiveMinutes` | The transfer timestamp truncated to the start of the five-minute interval. |
| `datetimeMinute` | The transfer timestamp truncated to the start of the minute. |
| `datetime` | The raw transfer timestamp. |

The following fields can be summed:

| Field | Description |
| --- | --- |
| `bytesDownload` | Downloaded bytes. |
| `bytesUpload` | Uploaded bytes. |

## View via the dashboard

Per-bucket analytics for R2 are available in the Cloudflare dashboard. To view current and historical metrics for a bucket:

1. In the Cloudflare dashboard, go to the **R2 object storage** page. [Go to **Overview** ↗](https://dash.cloudflare.com/?to=/:account/r2/overview)
2. Select your bucket.
3. Select the **Metrics** tab.

You can optionally select a time window to query. This defaults to the last 24 hours.

## Query via the GraphQL API

You can programmatically query analytics for your R2 buckets via the [GraphQL Analytics API](https://developers.cloudflare.com/analytics/graphql-api/). This API queries the same dataset as the Cloudflare dashboard, and supports GraphQL [introspection](https://developers.cloudflare.com/analytics/graphql-api/features/discovery/introspection/).

## Examples

### Operations

To query the volume of each operation type on a bucket for a given time period you can run a query as such

```graphql
query R2VolumeExample(
	$accountTag: string!
	$startDate: Time
	$endDate: Time
	$bucketName: string
) {
	viewer {
		accounts(filter: { accountTag: $accountTag }) {
			r2OperationsAdaptiveGroups(
				limit: 10000
				filter: {
					datetime_geq: $startDate
					datetime_leq: $endDate
					bucketName: $bucketName
				}
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

The `bucketName` field can be removed to get an account level overview of operations. The volume of operations can be broken down even further by adding more dimensions to the query.

### Storage

To query the storage of a bucket over a given time period you can run a query as such.

```graphql
query R2StorageExample(
	$accountTag: string!
	$startDate: Time
	$endDate: Time
	$bucketName: string
) {
	viewer {
		accounts(filter: { accountTag: $accountTag }) {
			r2StorageAdaptiveGroups(
				limit: 10000
				filter: {
					datetime_geq: $startDate
					datetime_leq: $endDate
					bucketName: $bucketName
				}
				orderBy: [datetime_DESC]
			) {
				max {
					objectCount
					uploadCount
					payloadSize
					metadataSize
				}
				dimensions {
					datetime
				}
			}
		}
	}
}
```

### Bandwidth

To query hourly uploads and downloads for a bucket. Results contain byte totals, not transfer rates, and excluded transfers smaller than 100 KiB.

```graphql
query R2BandwidthExample(
	$accountTag: string!
	$startDate: Time!
	$endDate: Time!
	$bucketName: string!
) {
	viewer {
		accounts(filter: { accountTag: $accountTag }) {
			r2BandwidthUsageAdaptiveGroups(
				limit: 1000
				filter: {
					datetime_geq: $startDate
					datetime_lt: $endDate
					bucketName: $bucketName
				}
				orderBy: [datetimeHour_ASC]
			) {
				sum {
					bytesUpload
					bytesDownload
				}
				dimensions {
					datetimeHour
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
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/r2/platform/metrics-analytics/#page","headline":"Metrics and analytics","description":"View R2 storage, operations, and bandwidth usage metrics.","url":"https://developers.cloudflare.com/r2/platform/metrics-analytics/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-09-24","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
