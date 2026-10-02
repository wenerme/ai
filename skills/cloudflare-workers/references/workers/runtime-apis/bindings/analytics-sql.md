---
description: Review the Analytics SQL binding interface for queries from Cloudflare Workers.
title: Analytics SQL binding
image: https://developers.cloudflare.com/workers/runtime-apis/bindings/analytics-sql/og.png?v=dd1ae17ff9c031c9
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

# Analytics SQL binding

Last updated Oct 2, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/workers/runtime-apis/bindings/analytics-sql/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Use the Analytics SQL binding to query analytics datasets from a Worker.

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

The `binding` value determines the property used to access the binding on your Worker's `env` object.

## Use the binding

```js
export default {
	async fetch(_request, env) {
		const start = new Date(Date.now() - 60 * 60 * 1000).toISOString();
		const result = await env.ANALYTICS_SQL.query({
			query:
				"SELECT COUNT(*) AS requests FROM events.httpRequests WHERE timestamp >= $start",
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

type CountRow = {
	requests: number;
};

export default {
	async fetch(_request, env): Promise<Response> {
		const start = new Date(Date.now() - 60 * 60 * 1000).toISOString();
		const result = await env.ANALYTICS_SQL.query<CountRow>({
			query: "SELECT COUNT(*) AS requests FROM events.httpRequests WHERE timestamp >= $start",
			params: { start },
		});

		return Response.json(result);
	},
} satisfies ExportedHandler<Env>;
```

For available datasets and supported SQL syntax, refer to the [Analytics SQL documentation](https://developers.cloudflare.com/analytics/sql-api/).

## `query()`

The `query()` method executes one SQL `SELECT` statement:

```ts
query<T extends Record<string, unknown> = Record<string, unknown>>(
	request: AnalyticsSQLQuery,
): Promise<AnalyticsSQLResult<T>>;
```

The optional type parameter defines the shape of each result row.

### Request

The `AnalyticsSQLQuery` object has the following properties:

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `query` | `string` | Yes | SQL statement to execute. Use `$1` for positional parameters or `$name` for named parameters. |
| `params` | array or object | No | Values for the placeholders in `query`. |

An `AnalyticsSQLParameter` can be a `string`, `number`, `boolean`, or `null`.

The binding derives account scope from the Worker. It does not accept `scope` or `time_range` request properties.

### Result

The `AnalyticsSQLResult<T>` object has the following properties:

| Property | Type | Description |
| --- | --- | --- |
| `data` | `T[]` | Query result rows keyed by selected column names. |
| `rows` | `number` | Number of rows in `data`. |
| `statistics` | `AnalyticsSQLStatistics` | Execution statistics for the query. |

The `statistics` object contains `elapsed_ms`, `rows_read`, and `bytes_read`. For details about these values, refer to [Query the SQL API](https://developers.cloudflare.com/analytics/sql-api/query-api/#response-formats).

## Errors

The method rejects its promise when a query fails. The thrown error has a boolean `retryable` property. Retry with bounded exponential backoff only when this property is `true`.

The binding does not retry queries automatically. For query and service errors, refer to [SQL API errors](https://developers.cloudflare.com/analytics/sql-api/errors/).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/runtime-apis/bindings/analytics-sql/#page","headline":"Analytics SQL binding","description":"Review the Analytics SQL binding interface for queries from Cloudflare Workers.","url":"https://developers.cloudflare.com/workers/runtime-apis/bindings/analytics-sql/","inLanguage":"en","image":"https://developers.cloudflare.com/workers/runtime-apis/bindings/analytics-sql/og.png?v=dd1ae17ff9c031c9","dateModified":"2026-10-02","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
