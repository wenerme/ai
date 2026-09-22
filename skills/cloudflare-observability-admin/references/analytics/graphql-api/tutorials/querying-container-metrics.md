---
description: Query Cloudflare Containers metrics with the GraphQL Analytics API.
title: Querying Containers metrics with GraphQL
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/analytics/llms.txt
> Use this file to discover all available pages before exploring further.

# Querying Containers metrics with GraphQL

Last updated Apr 23, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/analytics/graphql-api/tutorials/querying-container-metrics/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

This example uses the GraphQL Analytics API to query metrics for your [Containers](https://developers.cloudflare.com/containers/). Two endpoints are available:

- `containersMetricsAdaptiveGroups` returns metrics for the code running inside your container, including every process inside it. Use this endpoint to inspect CPU, memory, disk, network, and uptime behavior for your own workload.
- `containersUsageAdaptiveGroups` returns the resources consumed by your container together with the micro VM sandbox required to run it. These are the values that populate the usage estimates in the Cloudflare dashboard, and are the ones to use when estimating your billing costs.

Both endpoints share the same underlying dataset, but expose different slices of it.

Replace `<CLOUDFLARE_ACCOUNT_TAG>` and `<API_TOKEN>`<sup>[1](#user-content-fn-1)</sup> with your Account ID and API token, and adjust the `datetimeStart` and `datetimeEnd` values for the time range you want to query.

## Query container workload metrics

Use `containersMetricsAdaptiveGroups` to understand how your container and its subprocesses are behaving. The numbers returned reflect resource usage of your own code and do not include any platform overhead.

<details>

<summary>

Dimensions

</summary>

You can group results by any of the following dimensions:

| Dimension | Description |
| --- | --- |
| <code>instanceId</code> | The container instance ID. This is the same ID shown in the Cloudflare dashboard and by <a href="https://developers.cloudflare.com/workers/wrangler/">Wrangler</a>. |
| <code>placementId</code> | A single container instance can be placed in different locations over its lifetime (for example, when moved between data centers). Group by <code>placementId</code> to separate metrics across each placement. |
| <code>applicationId</code> | The Containers application the instance belongs to. |
| <code>location</code> | The Cloudflare data center where the container is running. |
| <code>region</code> | The region the container is running in. |
| <code>label(name: "...")</code> | The value of a specific container label. See <a href="#filter-and-group-by-labels">Filter and group by labels</a>. |
| <code>date</code>, <code>datetime</code>, <code>datetimeMinute</code>, <code>datetimeFiveMinutes</code>, <code>datetimeFifteenMinutes</code>, <code>datetimeHour</code>, <code>datetimeSixHours</code> | Time buckets of varying granularity. |

</details>

<details>

<summary>

Metrics

</summary>

The following metric groups are available. Each group exposes multiple fields — use GraphQL introspection or the <a href="https://developers.cloudflare.com/analytics/graphql-api/getting-started/explore-graphql-schema/">GraphQL API Explorer</a> to discover the full list.

| Group | Examples | Description |
| --- | --- | --- |
| <code>count</code> | — | Number of metric samples received. |
| <code>avg</code> | <code>memory</code>, <code>cpuUtilization</code>, <code>rxBandwidthBps</code>, <code>txBandwidthBps</code>, <code>gpuMemory</code>, <code>containerUptime</code> | Average of the metric over the selected time range. |
| <code>sum</code> | <code>cpuTimeSec</code>, <code>allocatedMemory</code>, <code>allocatedDisk</code>, <code>allocatedCpu</code>, <code>rxBytes</code>, <code>txBytes</code>, <code>containerUptime</code> | Total value of the metric over the selected time range. |
| <code>max</code> | <code>memory</code>, <code>cpuUtilization</code>, <code>diskUsage</code>, <code>diskUsagePercentage</code>, <code>rxBandwidthBps</code>, <code>txBandwidthBps</code>, <code>containerUptime</code> | Maximum observed value of the metric. |
| <code>quantiles</code> | <code>memory</code>, <code>cpuUtilization</code>, <code>rxBandwidthBps</code>, <code>txBandwidthBps</code>, <code>diskUsage</code>, <code>diskUsagePercentage</code>, <code>gpuMemory</code>, <code>containerUptime</code> | Weighted quantiles. Each metric is available with a <code>P50</code>, <code>P95</code>, or <code>P99</code> suffix (for example, <code>memoryP95</code>). |

</details>

### API call

The following query returns CPU time and peak memory usage for a single container instance, bucketed by hour:

```bash
echo '{ "query":
  "query ContainersMetrics($accountTag: String, $datetimeStart: Time, $datetimeEnd: Time, $instanceId: String) {
    viewer {
      accounts(filter: {accountTag: $accountTag}) {
        containersMetricsAdaptiveGroups(
          limit: 100
          filter: {
            datetime_geq: $datetimeStart,
            datetime_leq: $datetimeEnd,
            instanceId: $instanceId
          }
          orderBy: [datetimeHour_ASC]
        ) {
          dimensions {
            datetimeHour
            instanceId
          }
          sum {
            cpuTimeSec
          }
          max {
            memory
          }
          quantiles {
            cpuUtilizationP95
            memoryP95
          }
        }
      }
    }
  }",
  "variables": {
    "accountTag": "<CLOUDFLARE_ACCOUNT_TAG>",
    "datetimeStart": "2026-04-15T00:00:00Z",
    "datetimeEnd": "2026-04-16T00:00:00Z",
    "instanceId": "4c9b1b3c-8e8d-4a2d-9a3f-7f2b1c0a0e55"
  }
}' | tr -d '\n' | curl --silent \
https://api.cloudflare.com/client/v4/graphql \
--header "Authorization: Bearer <API_TOKEN>" \
--header "Accept: application/json" \
--header "Content-Type: application/json" \
--data @- | jq .
```

### Response

```json
{
	"data": {
		"viewer": {
			"accounts": [
				{
					"containersMetricsAdaptiveGroups": [
						{
							"dimensions": {
								"datetimeHour": "2026-04-15T00:00:00Z",
								"instanceId": "4c9b1b3c-8e8d-4a2d-9a3f-7f2b1c0a0e55"
							},
							"max": {
								"memory": 312475648
							},
							"quantiles": {
								"cpuUtilizationP95": 0.4821,
								"memoryP95": 298123264
							},
							"sum": {
								"cpuTimeSec": 128.47
							}
						},
						{
							"dimensions": {
								"datetimeHour": "2026-04-15T01:00:00Z",
								"instanceId": "4c9b1b3c-8e8d-4a2d-9a3f-7f2b1c0a0e55"
							},
							"max": {
								"memory": 305135616
							},
							"quantiles": {
								"cpuUtilizationP95": 0.3914,
								"memoryP95": 291454976
							},
							"sum": {
								"cpuTimeSec": 104.91
							}
						}
					]
				}
			]
		}
	},
	"errors": null
}
```

## Query container billing usage

Use `containersUsageAdaptiveGroups` to estimate your billing costs. Results include both your container's resource usage and the micro VM sandbox required to run it, and match the usage values shown in the Cloudflare dashboard.

<details>

<summary>

Dimensions

</summary>

You can group results by any of the following dimensions:

| Dimension | Description |
| --- | --- |
| <code>instanceId</code> | The container instance ID. This is the same ID shown in the Cloudflare dashboard and by <a href="https://developers.cloudflare.com/workers/wrangler/">Wrangler</a>. |
| <code>placementId</code> | A single container instance can be placed in different locations over its lifetime (for example, when moved between data centers). Group by <code>placementId</code> to separate metrics across each placement. |
| <code>applicationId</code> | The Containers application the instance belongs to. |
| <code>location</code> | The Cloudflare data center where the container is running. |
| <code>region</code> | The region the container is running in. |
| <code>label(name: "...")</code> | The value of a specific container label. See <a href="#filter-and-group-by-labels">Filter and group by labels</a>. |
| <code>date</code>, <code>datetime</code>, <code>datetimeMinute</code>, <code>datetimeFiveMinutes</code>, <code>datetimeFifteenMinutes</code>, <code>datetimeHour</code>, <code>datetimeSixHours</code> | Time buckets of varying granularity. |

</details>

<details>

<summary>

Metrics

</summary>

Only <code>sum</code> metrics are available:

| Field | Description |
| --- | --- |
| <code>cpuTimeSec</code> | Total CPU time, in seconds. |
| <code>allocatedMemory</code> | Total allocated memory, in byte-seconds. |
| <code>allocatedDisk</code> | Total allocated disk, in byte-seconds. |
| <code>txBytes</code> | Total bytes transmitted. |

</details>

### API call

The following query returns daily CPU and memory usage for the last 30 days:

```bash
echo '{ "query":
  "query ContainersUsage($accountTag: String, $datetimeStart: Time, $datetimeEnd: Time) {
    viewer {
      accounts(filter: {accountTag: $accountTag}) {
        containersUsageAdaptiveGroups(
          limit: 100
          filter: {
            date_geq: $datetimeStart,
            date_leq: $datetimeEnd
          }
          orderBy: [date_ASC]
        ) {
          dimensions {
            date
          }
          sum {
            cpuTimeSec
            allocatedMemory
            allocatedDisk
            txBytes
          }
        }
      }
    }
  }",
  "variables": {
    "accountTag": "<CLOUDFLARE_ACCOUNT_TAG>",
    "datetimeStart": "2026-03-23",
    "datetimeEnd": "2026-04-22"
  }
}' | tr -d '\n' | curl --silent \
https://api.cloudflare.com/client/v4/graphql \
--header "Authorization: Bearer <API_TOKEN>" \
--header "Accept: application/json" \
--header "Content-Type: application/json" \
--data @- | jq .
```

### Response

```json
{
	"data": {
		"viewer": {
			"accounts": [
				{
					"containersUsageAdaptiveGroups": [
						{
							"dimensions": {
								"date": "2026-04-20"
							},
							"sum": {
								"allocatedDisk": 172800000000000,
								"allocatedMemory": 22118400000000,
								"cpuTimeSec": 3742.18,
								"txBytes": 8471239
							}
						},
						{
							"dimensions": {
								"date": "2026-04-21"
							},
							"sum": {
								"allocatedDisk": 172800000000000,
								"allocatedMemory": 22118400000000,
								"cpuTimeSec": 3955.02,
								"txBytes": 9023841
							}
						}
					]
				}
			]
		}
	},
	"errors": null
}
```

## Filter and group by labels

Both endpoints expose container labels through two fields:

- `labels` is an array of `key=value` strings, and is designed for filtering. Use the [`_has` operator](https://developers.cloudflare.com/analytics/graphql-api/features/filtering/) to match a specific label.
- `label(name: "...")` is a grouping dimension that returns the value of a named label. Alias it to a convenient field name in your response.

For example, the following query returns CPU time and memory usage for production containers, grouped by environment:

```graphql
query ContainersByLabel(
	$accountTag: String
	$datetimeStart: Time
	$datetimeEnd: Time
) {
	viewer {
		accounts(filter: { accountTag: $accountTag }) {
			containersMetricsAdaptiveGroups(
				limit: 100
				filter: {
					datetime_geq: $datetimeStart
					datetime_leq: $datetimeEnd
					labels_has: "env=production"
				}
			) {
				dimensions {
					env: label(name: "env")
					region: label(name: "region")
				}
				sum {
					cpuTimeSec
				}
				max {
					memory
				}
			}
		}
	}
}
```

The aliased dimensions appear directly on each result:

```json
{
	"data": {
		"viewer": {
			"accounts": [
				{
					"containersMetricsAdaptiveGroups": [
						{
							"dimensions": {
								"env": "production",
								"region": "enam"
							},
							"max": { "memory": 412316672 },
							"sum": { "cpuTimeSec": 9812.41 }
						},
						{
							"dimensions": {
								"env": "production",
								"region": "weur"
							},
							"max": { "memory": 398458880 },
							"sum": { "cpuTimeSec": 7421.08 }
						}
					]
				}
			]
		}
	},
	"errors": null
}
```

## Footnotes

1. Refer to [Configure an Analytics API token](https://developers.cloudflare.com/analytics/graphql-api/getting-started/authentication/api-token-auth/) for more information on configuration and permissions. [↩](#user-content-fnref-1)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/analytics/graphql-api/tutorials/querying-container-metrics/#page","headline":"Querying Containers metrics with GraphQL","description":"Query Cloudflare Containers metrics with the GraphQL Analytics API.","url":"https://developers.cloudflare.com/analytics/graphql-api/tutorials/querying-container-metrics/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
