---
description: Query the SQL API directly from a Cloudflare Worker.
title: Workers binding
image: https://developers.cloudflare.com/analytics/sql-api/workers-binding/og.png?v=84705ed1b99f3db3
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/analytics/llms.txt
> Use this file to discover all available pages before exploring further.

# Workers binding

Last updated Oct 2, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/analytics/sql-api/workers-binding/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

The Analytics SQL binding lets a Cloudflare Worker query SQL API datasets without making an HTTP request or managing an API token. Each binding is scoped to the Cloudflare account that owns the Worker.

## Configure the binding

Add an Analytics SQL binding to your Worker's Wrangler configuration. The `analytics` key requires Wrangler 4.145.0 or later.

```jsonc
{
	"analytics": {
		"binding": "ANALYTICS_SQL"
	}
}
```

```toml
[analytics]
binding = "ANALYTICS_SQL"
```

The `binding` value determines how you access the binding on your Worker's `env` object.

## Query from a Worker

Call the binding's `query()` method with a SQL statement and optional parameters:

```js
export default {
	async fetch(_request, env) {
		const start = new Date(Date.now() - 60 * 60 * 1000).toISOString();
		const result = await env.ANALYTICS_SQL.query({
			query: `
        SELECT edgeResponseStatus AS status, COUNT(*) AS requests
        FROM events.httpRequests
        WHERE timestamp >= $start
        GROUP BY edgeResponseStatus
        ORDER BY requests DESC
        LIMIT 10
      `,
			params: { start },
		});

		return Response.json(result);
	},
};
```

```ts
interface Env {
	ANALYTICS_SQL: AnalyticsSQLBinding;
}

export default {
	async fetch(_request, env): Promise<Response> {
		const start = new Date(Date.now() - 60 * 60 * 1000).toISOString();
		const result = await env.ANALYTICS_SQL.query({
			query: `
        SELECT edgeResponseStatus AS status, COUNT(*) AS requests
        FROM events.httpRequests
        WHERE timestamp >= $start
        GROUP BY edgeResponseStatus
        ORDER BY requests DESC
        LIMIT 10
      `,
			params: { start },
		});

		return Response.json(result);
	},
} satisfies ExportedHandler<Env>;
```

Do not include an `accountTag` or `zoneTag` predicate in a binding query. The binding supplies the Worker's account scope separately and the API rejects a query that also specifies tenancy in SQL.

The binding can query only datasets that support account scope.

The binding can query Workers Analytics Engine datasets through names such as `events.analyticsEngine."example-dataset"`. Access still depends on the account's Workers Analytics Engine entitlement.

## Request

The `query()` method accepts the following fields:

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `query` | string | Yes | One SQL `SELECT` statement. |
| `params` | array or object | No | Positional or named string, number, boolean, or `null` values. |

The binding does not accept `scope` because it derives scope from the Worker. It does not currently expose request-level `time_range`. Include the time constraint in SQL.

## Response

The method returns the default ClickHouse-backed result structure:

```json
{
	"data": [
		{
			"status": 200,
			"requests": 125430
		}
	],
	"rows": 1,
	"statistics": {
		"elapsed_ms": 42,
		"rows_read": 250000,
		"bytes_read": 18000000
	}
}
```

Do not add a `FORMAT` clause to binding queries. The binding expects the default JSON response with `statistics`. Log Explorer-backed datasets currently return a different response shape and are not supported through the binding.

The binding does not retry failed requests automatically. A thrown error includes a boolean `retryable` property that indicates whether retrying may succeed. Apply bounded exponential backoff only when `retryable` is `true`.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/analytics/sql-api/workers-binding/#page","headline":"Workers binding","description":"Query the SQL API directly from a Cloudflare Worker.","url":"https://developers.cloudflare.com/analytics/sql-api/workers-binding/","inLanguage":"en","image":"https://developers.cloudflare.com/analytics/sql-api/workers-binding/og.png?v=84705ed1b99f3db3","dateModified":"2026-10-02","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
