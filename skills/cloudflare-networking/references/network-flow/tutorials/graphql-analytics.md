---
description: Use the GraphQL Analytics API to retrieve Network Flow data.
title: GraphQL Analytics
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/network-flow/llms.txt
> Use this file to discover all available pages before exploring further.

#  GraphQL Analytics

Last updated May 5, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/network-flow/tutorials/graphql-analytics/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

Use the GraphQL Analytics API to retrieve Network Flow (formerly Magic Network Monitoring) flow data.

Before you begin, you must have an [API token](https://developers.cloudflare.com/analytics/graphql-api/getting-started/authentication/). For additional help getting started with GraphQL Analytics, refer to [GraphQL Analytics API](https://developers.cloudflare.com/analytics/graphql-api/).

### Obtain your Cloudflare Account ID

To query Network Flow data via GraphQL, you need your Cloudflare Account ID.

1. Log in to the Cloudflare dashboard, and select your account.
[ Go to **Account home** ↗ ](https://dash.cloudflare.com/?to=/:account/home)
1. The URL in your browser's address bar should show `https://dash.cloudflare.com/` followed by a hex string. The hex string is your Cloudflare Account ID.

## Explore GraphQL schema with Network Flow example

Run a test query to retrieve bits and packets aggregated in five-minute intervals. Copy and paste the following code into GraphiQL.

For additional information about the Analytics schema, refer to [Explore the Analytics schema with GraphiQL](https://developers.cloudflare.com/analytics/graphql-api/getting-started/explore-graphql-schema/).

```graphql
query MagicNetworkMonitoring($accountTag: string!, $start: Time, $end: Time) {
	viewer {
		accounts(filter: { accountTag: $accountTag }) {
			mnmFlowDataAdaptiveGroups(
				filter: { datetime_gt: $start, datetime_leq: $end }
				limit: 10
				orderBy: [datetimeFiveMinutes_DESC]
			) {
				sum {
					bits
					packets
				}
				dimensions {
					datetimeFiveMinutes
				}
			}
		}
	}
}
```

Note

Cloudflare analytics are case sensitive for paths and URIs. Make sure that filters or queries use the correct case.

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/network-flow/tutorials/graphql-analytics/#page","headline":"GraphQL Analytics · Cloudflare Network Flow docs","description":"Use the GraphQL Analytics API to retrieve Network Flow data.","url":"https://developers.cloudflare.com/network-flow/tutorials/graphql-analytics/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["GraphQL"]}
```
