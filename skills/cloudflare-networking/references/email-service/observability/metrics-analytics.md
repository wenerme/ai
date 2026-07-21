---
description: Query Email Service sending metrics and delivery rates via the dashboard or GraphQL Analytics API.
title: Metrics and analytics
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/email-service/llms.txt
> Use this file to discover all available pages before exploring further.

#  Metrics and analytics

Last updated Jun 9, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/email-service/observability/metrics-analytics/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

Email Service exposes analytics that allow you to inspect email sending performance and delivery rates across all your domains.

The metrics displayed in the [Cloudflare dashboard ↗](https://dash.cloudflare.com/) charts are queried from Cloudflare's [GraphQL Analytics API](https://developers.cloudflare.com/analytics/graphql-api/). You can access the metrics [programmatically](#query-via-the-graphql-api) via GraphQL or HTTP client.

## Metrics

Email Service currently exposes the below metrics:

| Dataset              | GraphQL Dataset Name       | Description                                                                                                                  |
| -------------------- | -------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| Sending (aggregated) | emailSendingAdaptiveGroups | Aggregated email sending counts grouped by dimensions such as status, date, sending domain, and authentication results.      |
| Sending (events)     | emailSendingAdaptive       | Individual email sending events with full detail including sender, recipient, subject, message ID, and error information.    |
| Routing (aggregated) | emailRoutingAdaptiveGroups | Aggregated email routing counts grouped by dimensions such as status, date, recipient domain, and authentication results.    |
| Routing (events)     | emailRoutingAdaptive       | Individual email routing events with full detail including sender, recipient, subject, message ID, and processing decisions. |

Metrics can be queried (and are retained) for the past 31 days.

## View metrics in the dashboard

Per-domain analytics for Email Service are available in the Cloudflare dashboard. To view current and historical metrics:

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com/) and select your account.
2. Go to **Compute** \> **Email Service** and select **Email Sending** or **Email Routing**.
3. Select an existing domain or view account-wide metrics.
4. Select the **Analytics** tab.

You can optionally select a time window to query. This defaults to the last 24 hours.

## Query via the GraphQL API

You can programmatically query analytics for your Email Service domains via the [GraphQL Analytics API](https://developers.cloudflare.com/analytics/graphql-api/). This API queries the same datasets as the Cloudflare dashboard, and supports GraphQL [introspection](https://developers.cloudflare.com/analytics/graphql-api/features/discovery/introspection/).

To get started using the [GraphQL Analytics API](https://developers.cloudflare.com/analytics/graphql-api/), follow the documentation to setup [Authentication for the GraphQL Analytics API](https://developers.cloudflare.com/analytics/graphql-api/getting-started/authentication/). Your API token must include the **Analytics Read** permission.

These are **zone-level** datasets. To query them, provide your zone ID (not account ID) as the `zoneTag` filter. The GraphQL datasets for Email Service include:

* `emailSendingAdaptiveGroups` — aggregated email sending counts with groupable dimensions
* `emailSendingAdaptive` — individual email sending events
* `emailRoutingAdaptiveGroups` — aggregated email routing counts with groupable dimensions
* `emailRoutingAdaptive` — individual email routing events

### Email Sending dimensions

The `emailSendingAdaptiveGroups` dataset supports the following dimensions for grouping and filtering:

| Dimension              | Type   | Description                                              |
| ---------------------- | ------ | -------------------------------------------------------- |
| date                   | Date   | Day-level grouping                                       |
| datetime               | Time   | Exact event timestamp                                    |
| datetimeMinute         | Time   | Minute-level grouping                                    |
| datetimeFiveMinutes    | Time   | 5-minute interval grouping                               |
| datetimeFifteenMinutes | Time   | 15-minute interval grouping                              |
| datetimeHour           | Time   | Hour-level grouping                                      |
| status                 | string | Delivery status (for example, delivered, deliveryFailed) |
| eventType              | string | Origin of email (incoming, forward, reply, newEmail)     |
| sendingDomain          | string | The domain used to send the email                        |
| envelopeTo             | string | Recipient envelope address                               |
| errorCause             | string | Error cause for failed sends                             |
| arc                    | string | ARC authentication result                                |
| dkim                   | string | DKIM authentication result                               |
| dmarc                  | string | DMARC authentication result                              |
| spf                    | string | SPF authentication result                                |
| isSpam                 | uint8  | Whether the email was flagged as spam                    |
| isNDR                  | uint8  | Whether the email is a non-delivery report               |
| isLastEvent            | uint8  | Whether this is the last event for this email            |

The `emailSendingAdaptive` dataset includes all of the above plus per-event fields: `from`, `to`, `subject`, `messageId`, `sessionId`, `errorDetail`.

### Email Routing dimensions

The `emailRoutingAdaptiveGroups` dataset supports the following dimensions for grouping and filtering:

| Dimension              | Type   | Description                                          |
| ---------------------- | ------ | ---------------------------------------------------- |
| date                   | Date   | Day-level grouping                                   |
| datetime               | Time   | Exact event timestamp                                |
| datetimeMinute         | Time   | Minute-level grouping                                |
| datetimeFiveMinutes    | Time   | 5-minute interval grouping                           |
| datetimeFifteenMinutes | Time   | 15-minute interval grouping                          |
| datetimeHour           | Time   | Hour-level grouping                                  |
| status                 | string | Resulting outcome for the email                      |
| eventType              | string | Origin of email (incoming, forward, reply, newEmail) |
| action                 | string | Action applied by the routing rule                   |
| ruleMatched            | string | UUID of the routing rule matched by the email        |
| arc                    | string | ARC authentication result                            |
| dkim                   | string | DKIM authentication result                           |
| dmarc                  | string | DMARC authentication result                          |
| spf                    | string | SPF authentication result                            |
| isSpam                 | uint8  | Whether the email was flagged as spam                |
| isNDR                  | uint8  | Whether the email is a non-delivery report           |
| isLastEvent            | uint8  | Whether this is the last event for this email        |

The `emailRoutingAdaptive` dataset includes all of the above plus per-event fields: `from`, `to`, `subject`, `messageId`, `sessionId`, `errorDetail`, `ruleMatched`.

### Examples

The following are common GraphQL queries that you can use to retrieve information about Email Service analytics. These queries use the variable `$zoneTag`, which should be set to your Cloudflare Zone ID. You can find this in the Cloudflare dashboard under your domain's **Overview** page.

```json
{
	"zoneTag": "<YOUR_ZONE_ID>",
	"start": "2024-07-15",
	"end": "2024-07-30"
}
```

#### Email sending operations

To query the count of emails for a given date range, grouped by `date` and `status` (for example, `delivered`, `deliveryFailed`):

```graphql
query EmailSendingByStatus($zoneTag: string!, $start: Date!, $end: Date!) {
	viewer {
		zones(filter: { zoneTag: $zoneTag }) {
			emailSendingAdaptiveGroups(
				filter: { date_geq: $start, date_leq: $end }
				limit: 10000
				orderBy: [date_DESC]
			) {
				count
				dimensions {
					date
					status
				}
			}
		}
	}
}
```

#### Delivery failure analysis

To investigate delivery failure causes for a specific date range, grouped by `errorCause` and `sendingDomain`:

```graphql
query EmailDeliveryFailures($zoneTag: string!, $start: Date!, $end: Date!) {
	viewer {
		zones(filter: { zoneTag: $zoneTag }) {
			emailSendingAdaptiveGroups(
				filter: { date_geq: $start, date_leq: $end, status: "deliveryFailed" }
				limit: 10000
				orderBy: [date_DESC]
			) {
				count
				dimensions {
					date
					errorCause
					sendingDomain
				}
			}
		}
	}
}
```

#### Hourly volume

To query email sending volume grouped by hour, useful for identifying traffic patterns:

```graphql
query EmailSendingHourlyVolume($zoneTag: string!, $start: Time!, $end: Time!) {
	viewer {
		zones(filter: { zoneTag: $zoneTag }) {
			emailSendingAdaptiveGroups(
				filter: { datetimeHour_geq: $start, datetimeHour_leq: $end }
				limit: 10000
				orderBy: [datetimeHour_ASC]
			) {
				count
				dimensions {
					datetimeHour
					status
				}
			}
		}
	}
}
```

#### Individual email events

To query individual email events for troubleshooting specific delivery issues. This uses the `emailSendingAdaptive` dataset and filters by `datetime` (Time type):

```graphql
query RecentEmailEvents($zoneTag: string!, $start: Time!, $end: Time!) {
	viewer {
		zones(filter: { zoneTag: $zoneTag }) {
			emailSendingAdaptive(
				filter: { datetime_geq: $start, datetime_leq: $end }
				limit: 50
				orderBy: [datetime_DESC]
			) {
				datetime
				from
				to
				subject
				status
				eventType
				sendingDomain
				messageId
				errorCause
				errorDetail
				dkim
				dmarc
				spf
				isSpam
			}
		}
	}
}
```

#### Email routing operations

To query the count of routed emails for a given date range, grouped by `date` and `status`:

```graphql
query EmailRoutingByStatus($zoneTag: string!, $start: Date!, $end: Date!) {
	viewer {
		zones(filter: { zoneTag: $zoneTag }) {
			emailRoutingAdaptiveGroups(
				filter: { date_geq: $start, date_leq: $end }
				limit: 10000
				orderBy: [date_DESC]
			) {
				count
				dimensions {
					date
					status
				}
			}
		}
	}
}
```

#### Routing rule activity

To see which routing rules are matching emails, grouped by `ruleMatched` and `action`:

```graphql
query EmailRoutingRuleActivity($zoneTag: string!, $start: Date!, $end: Date!) {
	viewer {
		zones(filter: { zoneTag: $zoneTag }) {
			emailRoutingAdaptiveGroups(
				filter: { date_geq: $start, date_leq: $end }
				limit: 10000
				orderBy: [date_DESC]
			) {
				count
				dimensions {
					date
					ruleMatched
					action
				}
			}
		}
	}
}
```

#### Individual routing events

To query individual routing events for troubleshooting:

```graphql
query RecentRoutingEvents($zoneTag: string!, $start: Time!, $end: Time!) {
	viewer {
		zones(filter: { zoneTag: $zoneTag }) {
			emailRoutingAdaptive(
				filter: { datetime_geq: $start, datetime_leq: $end }
				limit: 50
				orderBy: [datetime_DESC]
			) {
				datetime
				from
				to
				subject
				status
				action
				ruleMatched
				messageId
				errorDetail
				dkim
				dmarc
				spf
				isSpam
			}
		}
	}
}
```

Note

The `*AdaptiveGroups` datasets use `Date` type filters (`date_geq`, `date_leq`) for day-level filtering, or `Time` type filters (`datetimeHour_geq`, etc.) for finer granularity. The `*Adaptive` (events) datasets use `Time` type filters (`datetime_geq`, `datetime_leq`), for example `"2024-07-15T00:00:00Z"`.

## Next steps

* [Email logs](https://developers.cloudflare.com/email-service/observability/logs/) — view individual email activity in the dashboard.
* [Audit logs](https://developers.cloudflare.com/email-service/observability/audit-logs/) — track configuration changes.
* [GraphQL Analytics API](https://developers.cloudflare.com/analytics/graphql-api/) — full GraphQL API reference.

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/email-service/observability/metrics-analytics/#page","headline":"Metrics and analytics · Cloudflare Email Service docs","description":"Query Email Service sending metrics and delivery rates via the dashboard or GraphQL Analytics API.","url":"https://developers.cloudflare.com/email-service/observability/metrics-analytics/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-06-09","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
