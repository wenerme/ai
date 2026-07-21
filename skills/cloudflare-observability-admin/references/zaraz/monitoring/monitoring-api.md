---
description: Query Zaraz monitoring data with the GraphQL API.
title: Monitoring API
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/zaraz/llms.txt
> Use this file to discover all available pages before exploring further.

#  Monitoring API

Last updated Apr 16, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/zaraz/monitoring/monitoring-api/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

The **Zaraz Monitoring API** allows users to retrieve detailed data on Zaraz events through the **GraphQL Analytics API**. Using this API, you can monitor events, pageviews, triggers, actions, and server-side request statuses, including any errors and successes. The data available through the API mirrors what is shown on the Zaraz Monitoring page in the dashboard, but with the API, you can query it programmatically to create alerts and notifications for unexpected deviations.

To get started, you'll need to generate an Analytics API token by following the [API token authentication guide](https://developers.cloudflare.com/analytics/graphql-api/getting-started/authentication/api-token-auth/).

## Key Entities

The Monitoring API includes the following core entities, which each provide distinct insights:

* **zarazTrackAdaptiveGroups**: Contains data on Zaraz events, such as event counts and timestamps.
* **zarazActionsAdaptiveGroups**: Provides information on Zaraz Actions.
* **zarazTriggersAdaptiveGroups**: Tracks data on Zaraz Triggers.
* **zarazFetchAdaptiveGroups**: Captures server-side request data, including URLs and returning status codes for third-party requests made by Zaraz.

## Example GraphQL Queries

You can construct any query you'd like using the above datasets, but here are some example queries you can use.

Query for the count of Zaraz events, grouped by time.

```graphql
query ZarazEvents(
	$zoneTag: string
	$limit: uint64!
	$start: Time
	$end: Time
	$orderBy: ZoneZarazTrackAdaptiveGroupsOrderBy!
) {
	viewer {
		zones(filter: { zoneTag: $zoneTag }) {
			data: zarazTrackAdaptiveGroups(
				limit: $limit
				filter: { datetimeHour_geq: $start, datetimeHour_leq: $end }
				orderBy: [$orderBy]
			) {
				count
				dimensions {
					ts: datetimeHour
				}
			}
		}
	}
}
```

Query for the count of Zaraz loads, grouped by time.

```graphql
query ZarazLoads(
	$zoneTag: string
	$limit: uint64!
	$start: Date
	$end: Date
	$orderBy: ZoneZarazTriggersAdaptiveGroupsOrderBy!
) {
	viewer {
		zones(filter: { zoneTag: $zoneTag }) {
			data: zarazTriggersAdaptiveGroups(
				limit: $limit
				filter: { date_geq: $start, date_leq: $end, triggerName: Pageview }
				orderBy: [$orderBy]
			) {
				count
				dimensions {
					ts: date
				}
			}
		}
	}
}
```

Query for the total execution count of each trigger processed by Zaraz.

```graphql
query ZarazTriggers(
	$zoneTag: string
	$limit: uint64!
	$start: Date
	$end: Date
) {
	viewer {
		zones(filter: { zoneTag: $zoneTag }) {
			data: zarazTriggersAdaptiveGroups(
				limit: $limit
				filter: { date_geq: $start, date_leq: $end }
				orderBy: [count_DESC]
			) {
				count
				dimensions {
					name: triggerName
				}
			}
		}
	}
}
```

Query for the count of 400 server-side responses, grouped by time and URL.

```graphql
query ErroneousResponses(
	$zoneTag: string
	$limit: uint64!
	$start: Time
	$end: Time
	$orderBy: ZoneZarazFetchAdaptiveGroupsOrderBy!
) {
	viewer {
		zones(filter: { zoneTag: $zoneTag }) {
			data: zarazFetchAdaptiveGroups(
				limit: $limit
				filter: {
					datetimeHour_geq: $start
					datetimeHour_leq: $end
					url_neq: ""
					status: 400
				}
				orderBy: [$orderBy]
			) {
				count
				dimensions {
					ts: datetimeHour
					name: url
				}
			}
		}
	}
}
```

### Variables Example

```json
{
	"zoneTag": "d6dfdf32c704a77ac227243a5eb5ca61",
	"start": "2025-01-01T00:00:00Z",
	"end": "2025-01-30T00:00:00Z",
	"limit": 10000,
	"orderBy": "datetimeHour_ASC"
}
```

Be sure to customize the zoneTag to match your specific zone, along with setting the desired start and end dates

### Explanation of Parameters

* **zoneTag**: Unique identifier of your Cloudflare zone.
* **limit**: Maximum number of results to return.
* **start** and **end**: Define the date range for the query in ISO 8601 format.
* **orderBy**: Determines the sorting order, such as by ascending or descending datetime.

## Example `curl` Request

Use this `curl` command to query the Zaraz Monitoring API for the number of events processed by Zaraz. Replace `$TOKEN` with your API token, `$ZONE_TAG` with your zone tag, and adjust the start and end dates as needed.

```bash
curl -X POST https://api.cloudflare.com/client/v4/graphql \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "query": "query AllEvents($zoneTag: String!, $limit: Int!, $start: Date, $end: Date, $orderBy: [ZoneZarazTriggersAdaptiveGroupsOrderBy!]) { viewer { zones(filter: { zoneTag: $zoneTag }) { data: zarazTrackAdaptiveGroups( limit: $limit filter: { datetimeHour_geq: $start datetimeHour_leq: $end } orderBy: [$orderBy] ) { count dimensions { ts: datetimeHour } } } } }",
    "variables": {
      "zoneTag": "$ZONE_TAG",
      "start": "2025-01-01T00:00:00Z",
      "end": "2025-01-30T00:00:00Z",
      "limit": 10000,
      "orderBy": "datetimeHour_ASC"
    }
  }'
```

### Explanation of the `curl` Components

* **Authorization**: The `Authorization` header requires a Bearer token. Replace `$TOKEN` with your actual API token.
* **Content-Type**: Set `application/json` to indicate a JSON payload.
* **Data Payload**: This payload includes the GraphQL query and variable parameters, such as `zoneTag`, `start`, `end`, `limit`, and `orderBy`.

This `curl` example will return a JSON response containing event counts and timestamps within the specified date range. Modify the `variables` values as needed for your use case.

## Additional Resources

Refer to the [full GraphQL Analytics API documentation](https://developers.cloudflare.com/analytics/graphql-api/) for more details on available fields, filters, and further customization options for Zaraz Monitoring API queries.

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/zaraz/monitoring/monitoring-api/#page","headline":"Monitoring API · Cloudflare Zaraz docs","description":"Query Zaraz monitoring data with the GraphQL API.","url":"https://developers.cloudflare.com/zaraz/monitoring/monitoring-api/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
