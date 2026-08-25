---
description: Query AI Crawl Control analytics data using the GraphQL Analytics API.
title: GraphQL API
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-crawl-control/llms.txt
> Use this file to discover all available pages before exploring further.

# GraphQL API

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ai-crawl-control/reference/graphql-api/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

AI Crawl Control analytics are available through Cloudflare's [GraphQL Analytics API](https://developers.cloudflare.com/analytics/graphql-api/). You can query the same data shown in the dashboard to build custom reports, integrate with monitoring systems, or export for analysis. Test queries using the [GraphQL API Explorer ↗](https://graphql.cloudflare.com/), or capture the exact queries the dashboard uses via [Chrome DevTools](https://developers.cloudflare.com/analytics/graphql-api/tutorials/capture-graphql-queries-from-dashboard/).

## Key filters

| Filter                           | Description                                                                                                                     | Availability                                                                         |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| requestSource: "eyeball"         | Real client requests only. Excludes internal Cloudflare traffic.                                                                | All plans                                                                            |
| userAgent\_like: "%...%"         | Filter by [user agent](https://developers.cloudflare.com/ai-crawl-control/reference/bots/). Can be spoofed.                     | All plans                                                                            |
| edgeResponseStatus\_geq / \_lt   | Filter by HTTP status code range.                                                                                               | All plans                                                                            |
| clientRequestPath\_like: "%...%" | Filter by URL path pattern.                                                                                                     | All plans                                                                            |
| clientRefererHost\_like: "%...%" | Filter by [referrer domain](https://developers.cloudflare.com/ai-crawl-control/reference/bots/#referrer-domains-by-operator).   | Paid plans only                                                                      |
| botDetectionIds\_hasany: \[...\] | Filter by [detection IDs](https://developers.cloudflare.com/ai-crawl-control/reference/bots/). Reliably verified by Cloudflare. | [Bot Management](https://developers.cloudflare.com/bots/get-started/bot-management/) |

## Query examples

Get AI crawler requests over time using detection IDs

```graphql
{
	viewer {
		zones(filter: { zoneTag: "<ZONE_ID>" }) {
			httpRequestsAdaptiveGroups(
				filter: {
					datetime_geq: "2027-01-01T00:00:00Z"
					datetime_leq: "2027-01-02T00:00:00Z"
					requestSource: "eyeball"
					# 123815556 = GPTBot, 132995013 = ChatGPT-User, 126255384 = OAI-SearchBot
					botDetectionIds_hasany: [123815556, 132995013, 126255384]
				}
				limit: 5000
			) {
				count
				dimensions {
					datetimeHour
					botDetectionIds
					clientRequestHTTPHost
				}
				sum {
					edgeResponseBytes
				}
			}
		}
	}
}
```

Get AI crawler requests over time using user agent

```graphql
{
	viewer {
		zones(filter: { zoneTag: "<ZONE_ID>" }) {
			httpRequestsAdaptiveGroups(
				filter: {
					datetime_geq: "2027-01-01T00:00:00Z"
					datetime_leq: "2027-01-02T00:00:00Z"
					requestSource: "eyeball"
					userAgent_like: "%GPTBot%"
				}
				limit: 5000
			) {
				count
				dimensions {
					datetimeHour
					userAgent
					clientRequestHTTPHost
				}
				sum {
					edgeResponseBytes
				}
			}
		}
	}
}
```

Get top crawled paths

```graphql
{
	viewer {
		zones(filter: { zoneTag: "<ZONE_ID>" }) {
			httpRequestsAdaptiveGroups(
				filter: {
					datetime_geq: "2027-01-01T00:00:00Z"
					datetime_leq: "2027-01-02T00:00:00Z"
					requestSource: "eyeball"
					edgeResponseStatus_geq: 200
					edgeResponseStatus_lt: 400
					userAgent_like: "%GPTBot%"
				}
				limit: 5000
				orderBy: [count_DESC]
			) {
				count
				dimensions {
					clientRequestPath
					clientRequestHTTPHost
				}
			}
		}
	}
}
```

Get AI referral traffic

```graphql
{
	viewer {
		zones(filter: { zoneTag: "<ZONE_ID>" }) {
			httpRequestsAdaptiveGroups(
				filter: {
					datetime_geq: "2027-01-01T00:00:00Z"
					datetime_leq: "2027-01-02T00:00:00Z"
					requestSource: "eyeball"
					OR: [
						{ clientRefererHost_like: "%.chatgpt.com%" }
						{ clientRefererHost: "chatgpt.com" }
						{ clientRefererHost_like: "%.perplexity.ai%" }
						{ clientRefererHost: "perplexity.ai" }
					]
				}
				limit: 5000
				orderBy: [count_DESC]
			) {
				count
				dimensions {
					datetimeHour
					clientRefererHost
				}
			}
		}
	}
}
```

Get data transfer by crawler

```graphql
{
	viewer {
		zones(filter: { zoneTag: "<ZONE_ID>" }) {
			httpRequestsAdaptiveGroups(
				filter: {
					datetime_geq: "2027-01-01T00:00:00Z"
					datetime_leq: "2027-01-02T00:00:00Z"
					requestSource: "eyeball"
					userAgent_like: "%GPTBot%"
				}
				limit: 5000
				orderBy: [sum_edgeResponseBytes_DESC]
			) {
				count
				dimensions {
					userAgent
				}
				sum {
					edgeResponseBytes
				}
			}
		}
	}
}
```

## Related

* [Bot reference](https://developers.cloudflare.com/ai-crawl-control/reference/bots/) — Detection IDs and user agents
* [GraphQL Analytics API](https://developers.cloudflare.com/analytics/graphql-api/) — Full API documentation

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-crawl-control/reference/graphql-api/#page","headline":"GraphQL API · Cloudflare AI Crawl Control docs","description":"Query AI Crawl Control analytics data using the GraphQL Analytics API.","url":"https://developers.cloudflare.com/ai-crawl-control/reference/graphql-api/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
