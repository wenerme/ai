---
description: Write custom analytics events to Workers Analytics Engine for high-cardinality, time-series data.
title: Write to Analytics Engine
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

# Write to Analytics Engine

Write custom analytics events to Workers Analytics Engine.

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/workers/examples/analytics-engine/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

[Workers Analytics Engine](https://developers.cloudflare.com/analytics/analytics-engine/) provides time-series analytics at scale. Use it to track custom metrics, build usage-based billing, or understand service health on a per-customer basis.

Unlike logs, Analytics Engine is designed for aggregated queries over high-cardinality data. Writes are non-blocking and do not impact request latency.

## Configure the binding

Add an Analytics Engine dataset binding to your Wrangler configuration file. The dataset is created automatically when you first write to it.

```jsonc
{
	"analytics_engine_datasets": [
		{
			"binding": "ANALYTICS",
			"dataset": "my_dataset",
		},
	],
}
```

```toml
[[analytics_engine_datasets]]
binding = "ANALYTICS"
dataset = "my_dataset"
```

## Write data points

```js
export default {
	async fetch(request, env) {
		const url = new URL(request.url);

		// Write a page view event
		env.ANALYTICS.writeDataPoint({
			blobs: [
				url.pathname,
				request.headers.get("cf-connecting-country") ?? "unknown",
			],
			doubles: [1], // Count
			indexes: [url.hostname], // Sampling key
		});

		// Write a response timing event
		const start = Date.now();
		const response = await fetch(request);
		const duration = Date.now() - start;

		env.ANALYTICS.writeDataPoint({
			blobs: [url.pathname, response.status.toString()],
			doubles: [duration],
			indexes: [url.hostname],
		});

		// Writes are non-blocking - no need to await or use waitUntil()
		return response;
	},
};
```

```ts
interface Env {
	ANALYTICS: AnalyticsEngineDataset;
}

export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		const url = new URL(request.url);

		// Write a page view event
		env.ANALYTICS.writeDataPoint({
			blobs: [
				url.pathname,
				request.headers.get("cf-connecting-country") ?? "unknown",
			],
			doubles: [1], // Count
			indexes: [url.hostname], // Sampling key
		});

		// Write a response timing event
		const start = Date.now();
		const response = await fetch(request);
		const duration = Date.now() - start;

		env.ANALYTICS.writeDataPoint({
			blobs: [url.pathname, response.status.toString()],
			doubles: [duration],
			indexes: [url.hostname],
		});

		// Writes are non-blocking - no need to await or use waitUntil()
		return response;
	},
};
```

## Data point structure

Each data point consists of:

* **blobs** (strings) - Dimensions for grouping and filtering. Use for paths, regions, status codes, or customer IDs.
* **doubles** (numbers) - Numeric values to record, such as counts, durations, or sizes.
* **indexes** (strings) - A single string used as the [sampling key](https://developers.cloudflare.com/analytics/analytics-engine/sql-api/#sampling). Group related events under the same index.

## Query your data

Query your data using the [SQL API](https://developers.cloudflare.com/analytics/analytics-engine/sql-api/):

```bash
curl "https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/analytics_engine/sql" \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --data "SELECT blob1 AS path, SUM(_sample_interval) AS views FROM my_dataset WHERE timestamp > NOW() - INTERVAL '1' HOUR GROUP BY path ORDER BY views DESC LIMIT 10"
```

## Related resources

* [Analytics Engine documentation](https://developers.cloudflare.com/analytics/analytics-engine/) \- Full reference for Workers Analytics Engine.
* [SQL API reference](https://developers.cloudflare.com/analytics/analytics-engine/sql-api/) \- Query syntax and available functions.
* [Grafana integration](https://developers.cloudflare.com/analytics/analytics-engine/grafana/) \- Visualize Analytics Engine data in Grafana.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/examples/analytics-engine/#page","headline":"Write to Analytics Engine · Cloudflare Workers docs","description":"Write custom analytics events to Workers Analytics Engine for high-cardinality, time-series data.","url":"https://developers.cloudflare.com/workers/examples/analytics-engine/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
