---
description: Review the metrics exposed by Artifacts.
title: Metrics
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/artifacts/llms.txt
> Use this file to discover all available pages before exploring further.

# Metrics

Last updated Apr 25, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/artifacts/observability/metrics/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Artifacts exposes analytics that let you inspect repo activity, errors, and operation duration across your account.

Artifacts metrics are available through Cloudflare's [GraphQL Analytics API](https://developers.cloudflare.com/analytics/graphql-api/). You can use them to answer questions like which repos are busiest, where errors cluster, and how long operations take.

## Metrics

Artifacts currently exports the `artifactsEventsAdaptiveGroups` GraphQL dataset.

| Metric           | GraphQL field            | Description                                                                                                |
| ---------------- | ------------------------ | ---------------------------------------------------------------------------------------------------------- |
| Operations       | count                    | Total number of Artifacts events that match the query filter. This includes successful actions and errors. |
| Total duration   | sum.durationMs           | Total time spent handling matching Artifacts operations, in milliseconds.                                  |
| Average duration | avg.durationMs           | Average time per matching operation, in milliseconds.                                                      |
| Duration p25     | quantiles.durationMsP25  | 25th percentile operation duration, in milliseconds.                                                       |
| Duration p50     | quantiles.durationMsP50  | Median operation duration, in milliseconds.                                                                |
| Duration p75     | quantiles.durationMsP75  | 75th percentile operation duration, in milliseconds.                                                       |
| Duration p90     | quantiles.durationMsP90  | 90th percentile operation duration, in milliseconds.                                                       |
| Duration p95     | quantiles.durationMsP95  | 95th percentile operation duration, in milliseconds.                                                       |
| Duration p99     | quantiles.durationMsP99  | 99th percentile operation duration, in milliseconds.                                                       |
| Duration p999    | quantiles.durationMsP999 | 99.9th percentile operation duration, in milliseconds.                                                     |

Metrics can be queried for the past 31 days. Queries require an `accountTag` filter with your Cloudflare account ID.

## Dimensions

Use these dimensions to filter or group results:

| Dimension              | Description                                                                            |
| ---------------------- | -------------------------------------------------------------------------------------- |
| repository             | Fully qualified repo path in the form namespace/name.                                  |
| repositoryNamespace    | Namespace that contains the repo.                                                      |
| repositoryName         | Repo name inside the namespace.                                                        |
| eventKind              | Top-level event category. Use action for successful operations and error for failures. |
| eventType              | Specific operation or error type.                                                      |
| errorMessage           | Error message for failed operations.                                                   |
| date                   | Calendar date of the event.                                                            |
| datetime               | Exact event timestamp.                                                                 |
| datetimeMinute         | Event time truncated to the minute.                                                    |
| datetimeFiveMinutes    | Event time truncated to five-minute windows.                                           |
| datetimeFifteenMinutes | Event time truncated to fifteen-minute windows.                                        |
| datetimeHour           | Event time truncated to the hour.                                                      |
| datetimeSixHours       | Event time truncated to six-hour windows.                                              |

## Event types

Artifacts currently emits these values in `eventType`:

| Event type          | Kind   | Description                                        |
| ------------------- | ------ | -------------------------------------------------- |
| create              | action | A repo was created.                                |
| fork                | action | A repo was forked.                                 |
| push                | action | A client pushed data to a repo.                    |
| pull                | action | A client fetched or cloned data from a repo.       |
| delete              | action | A repo was deleted.                                |
| storageLimitReached | error  | An operation hit a storage limit condition.        |
| serverError         | error  | The service failed while handling the request.     |
| clientError         | error  | The client sent an invalid or unsupported request. |
| rateLimited         | error  | The request was rejected by a rate limiter.        |

## Example GraphQL queries

You can query Artifacts analytics with the [GraphQL Analytics API](https://developers.cloudflare.com/analytics/graphql-api/). All examples on this page use the `artifactsEventsAdaptiveGroups` dataset.

### Operations by repo within a namespace

Use this query to find the busiest repos in one namespace over a time range. It also returns average operation duration so you can compare activity and latency together.

```graphql
query ArtifactsOperationsByRepo(
	$accountTag: String!
	$datetimeStart: Time
	$datetimeEnd: Time
	$repositoryNamespace: String!
) {
	viewer {
		accounts(filter: { accountTag: $accountTag }) {
			artifactsEventsAdaptiveGroups(
				limit: 100
				filter: {
					datetime_geq: $datetimeStart
					datetime_leq: $datetimeEnd
					repositoryNamespace: $repositoryNamespace
					eventKind: "action"
				}
				orderBy: [count_DESC]
			) {
				count
				avg {
					durationMs
				}
				dimensions {
					repositoryName
				}
			}
		}
	}
}
```

### Errors by repo, descending

Use this query to rank repos by error volume. It helps you spot which repos fail most often and which error types are driving those failures.

```graphql
query ArtifactsErrorsByRepo(
	$accountTag: String!
	$datetimeStart: Time
	$datetimeEnd: Time
) {
	viewer {
		accounts(filter: { accountTag: $accountTag }) {
			artifactsEventsAdaptiveGroups(
				limit: 100
				filter: {
					datetime_geq: $datetimeStart
					datetime_leq: $datetimeEnd
					eventKind: "error"
				}
				orderBy: [count_DESC]
			) {
				count
				dimensions {
					repository
					eventType
				}
			}
		}
	}
}
```

### Repos by pushes, descending

Use this query to see which repos receive the most pushes in a time window. It is useful for identifying active write-heavy repos across an account.

```graphql
query ArtifactsPushesByRepo(
	$accountTag: String!
	$datetimeStart: Time
	$datetimeEnd: Time
) {
	viewer {
		accounts(filter: { accountTag: $accountTag }) {
			artifactsEventsAdaptiveGroups(
				limit: 100
				filter: {
					datetime_geq: $datetimeStart
					datetime_leq: $datetimeEnd
					eventKind: "action"
					eventType: "push"
				}
				orderBy: [count_DESC]
			) {
				count
				dimensions {
					repository
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
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/artifacts/observability/metrics/#page","headline":"Metrics · Cloudflare Artifacts docs","description":"Review the metrics exposed by Artifacts.","url":"https://developers.cloudflare.com/artifacts/observability/metrics/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-25","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
