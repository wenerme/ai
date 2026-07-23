---
description: Query dataset-specific limits via the Settings node.
title: Settings node
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/analytics/llms.txt
> Use this file to discover all available pages before exploring further.

# Settings node

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/analytics/graphql-api/features/discovery/settings/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Cloudflare GraphQL API exposes more than 70 datasets to its customers. These datasets represent different Cloudflare products with very different data shapes; thus, each has its configuration of [limits](https://developers.cloudflare.com/analytics/graphql-api/limits/).

Although we allow access to ALL plans for the essential datasets (like `httpRequestsAdaptiveGroups`, `firewallEventsAdaptive`, etc), users on larger plans benefit from an extended set of datasets and wider query limits.

In addition to [introspection](https://developers.cloudflare.com/analytics/graphql-api/features/discovery/introspection/), users can use the Settings node that is available for both zones and accounts scopes.

## Format

`Settings` node has all datasets from `zones` and `accounts` as fields.

```graphql
{
  viewer {
    accounts(filter: { accountTag : $accountTag }) {
      settings {
        # any dataset(s) from accounts
      }
    }
    zones(filter: { zoneTag : $zoneTag }) {
      settings {
        # any dataset(s) from zones
      }
    }
  }
}
```

Every subnode of `settings` node could consist of these fields:

* `enabled` \- shows whether the node is available for a requester or not;
* `availableFields` \- shows the list of fields available for a requester. If it is a nested field, the path will be returned, like `sum_requests`;
* `maxPageSize` \- retrieves the maximum number of records that can be returned
* `maxNumberOfFields` \- answers on how many fields could be used in a single query for that node;
* `notOlderThan` \- returns a number of seconds on how far back in time a query can read;
* `maxDuration` \- shows how wide the requested time range could be.

## A sample query

```graphql
query SampleQuery($zoneTag: string) {
	viewer {
		zones(filter: { zoneTag: $zoneTag }) {
			settings {
				firewallEventsAdaptive {
					enabled
					maxDuration
					maxNumberOfFields
					maxPageSize
					notOlderThan
				}
			}
		}
	}
}
```

```json
{
	"data": {
		"viewer": {
			"zones": [
				{
					"settings": {
						"firewallEventsAdaptive": {
							"enabled": true,
							"maxDuration": 259200,
							"maxNumberOfFields": 30,
							"maxPageSize": 10000,
							"notOlderThan": 2678400
						}
					}
				}
			]
		}
	},
	"errors": null
}
```

To get more details on how to execute queries, please refer to our how to get started [guides](https://developers.cloudflare.com/analytics/graphql-api/getting-started/).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/analytics/graphql-api/features/discovery/settings/#page","headline":"Settings node · Cloudflare Analytics docs","description":"Query dataset-specific limits via the Settings node.","url":"https://developers.cloudflare.com/analytics/graphql-api/features/discovery/settings/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
