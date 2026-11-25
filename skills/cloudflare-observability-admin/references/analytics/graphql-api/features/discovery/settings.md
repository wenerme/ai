---
agent:
  instructions: "Use this search API to find relevant content across this site with keywords or natural-language queries, instead of crawling individual pages. Results are returned in Markdown."
  endpoint: "https://developers.cloudflare.com/.well-known/search?q={query}"
  method: "GET"
  documentation: "https://developers.cloudflare.com/ai-search/how-to/search-for-agents/"
description: Query dataset-specific limits via the Settings node.
title: Settings node
image: https://developers.cloudflare.com/analytics/graphql-api/features/discovery/settings/og.png?v=e782841e23a15187
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/analytics/llms.txt
> Use this file to discover all available pages before exploring further.

# Settings node

Cloudflare GraphQL API exposes more than 70 datasets to its customers. These datasets represent different Cloudflare products with very different data shapes; thus, each has its configuration of [limits](https://developers.cloudflare.com/analytics/graphql-api/limits/).

Although we allow access to ALL plans for the essential datasets (like `httpRequestsAdaptiveGroups`, `firewallEventsAdaptive`, etc), users on larger plans benefit from an extended set of datasets and wider query limits.

Not every dataset with a similar name is open to all plans. For example, `firewallEventsAdaptive` is available on all plans, but the aggregated `firewallEventsAdaptiveGroups` dataset is not available to Free zones. Refer to [Dataset availability by plan](https://developers.cloudflare.com/analytics/graphql-api/limits/#dataset-availability-by-plan).

In addition to [introspection](https://developers.cloudflare.com/analytics/graphql-api/features/discovery/introspection/), users can use the Settings node that is available for both zones and accounts scopes.

## Format

`Settings` node has all datasets from `zones` and `accounts` as fields.

*Using a settings node on accounts nodesgraphql*

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

- `enabled` - shows whether the node is available for a requester or not;
- `availableFields` - shows the list of fields available for a requester. If it is a nested field, the path will be returned, like `sum_requests`;
- `maxPageSize` - retrieves the maximum number of records that can be returned
- `maxNumberOfFields` - answers on how many fields could be used in a single query for that node;
- `notOlderThan` - returns a number of seconds on how far back in time a query can read;
- `maxDuration` - shows how wide the requested time range could be.

## A sample query

*Get boundaries of firewallEventsAdaptive nodegraphql*

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

*firewallEventsAdaptive limits for a given userjson*

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

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/analytics/graphql-api/features/discovery/settings/#page","headline":"Settings node","description":"Query dataset-specific limits via the Settings node.","url":"https://developers.cloudflare.com/analytics/graphql-api/features/discovery/settings/","inLanguage":"en","image":"https://developers.cloudflare.com/analytics/graphql-api/features/discovery/settings/og.png?v=e782841e23a15187","dateModified":"2026-11-23","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
