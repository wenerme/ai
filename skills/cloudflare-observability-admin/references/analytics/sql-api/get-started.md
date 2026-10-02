---
description: Authenticate and run your first SQL API query.
title: Get started
image: https://developers.cloudflare.com/analytics/sql-api/get-started/og.png?v=bc12057ae3200e6d
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/analytics/llms.txt
> Use this file to discover all available pages before exploring further.

# Get started

Last updated Oct 2, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/analytics/sql-api/get-started/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

## Prerequisites

To run an account-scoped query, you need an account identifier and an API token with **Account Analytics Read** permission for that account. A query containing `zoneTag` requires either **Zone Analytics Read** permission for every named zone or **Account Analytics Read** permission for their owning account.

SQL API datasets represent different Cloudflare products. Some datasets and fields require additional API token permissions for the products whose data they expose. Include the permissions required by every dataset and field you plan to query.

Cloudflare recommends API tokens because you can restrict each token to specific resources. Refer to [Create an API token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/) for instructions.

## Run a query

Send a `POST` request to the SQL API endpoint. Pass the SQL statement and its parameters as JSON.

The following query returns the five most common HTTP response statuses for one account after a specified start time. Replace `<START_TIME>` with a recent ISO 8601 timestamp within the dataset's retention period.

```bash
curl "https://api.cloudflare.com/client/v4/analytics/sql" \
  --header "Authorization: Bearer <API_TOKEN>" \
  --header "Content-Type: application/json" \
  --data '{
    "query": "SELECT edgeResponseStatus AS status, COUNT(*) AS requests FROM events.httpRequests WHERE accountTag = $account AND timestamp >= $start GROUP BY edgeResponseStatus ORDER BY requests DESC LIMIT 5",
    "params": {
      "account": "<ACCOUNT_TAG>",
      "start": "<START_TIME>"
    }
  }'
```

A successful response has the following structure:

```json
{
	"data": [
		{
			"status": 200,
			"requests": 125430
		},
		{
			"status": 404,
			"requests": 8240
		},
		{
			"status": 301,
			"requests": 5175
		},
		{
			"status": 304,
			"requests": 3960
		},
		{
			"status": 500,
			"requests": 82
		}
	],
	"rows": 5,
	"statistics": {
		"elapsed_ms": 42,
		"rows_read": 250000,
		"bytes_read": 18000000
	}
}
```

The `data` array contains one object for each result row. The object keys match selected field names or aliases. The `rows` value is the number of returned rows. The `statistics` object describes the work performed by the data store.

This response shape applies to the default output from ClickHouse-backed datasets. Log Explorer and explicit output formats have different response shapes. Refer to [Response formats](https://developers.cloudflare.com/analytics/sql-api/query-api/#response-formats).

## Use the Cloudflare CLI

The Cloudflare CLI provides `cf sql query`. Pass the SQL statement as a positional argument, then provide exactly one scope flag and a lower time bound:

```bash
cf sql query \
  'SELECT edgeResponseStatus AS status, COUNT(*) AS requests FROM events.httpRequests GROUP BY edgeResponseStatus ORDER BY requests DESC LIMIT 5' \
  --scope-account "<ACCOUNT_TAG>" \
  --time-since "<START_TIME>"
```

Use `--scope-zone` instead of `--scope-account` for zone scope. You can optionally add `--time-until`. Both time bounds are inclusive. Do not include tenancy or timestamp predicates in SQL when you supply the corresponding CLI flags.

For request options and parameter binding, refer to [Query the API](https://developers.cloudflare.com/analytics/sql-api/query-api/).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/analytics/sql-api/get-started/#page","headline":"Get started","description":"Authenticate and run your first SQL API query.","url":"https://developers.cloudflare.com/analytics/sql-api/get-started/","inLanguage":"en","image":"https://developers.cloudflare.com/analytics/sql-api/get-started/og.png?v=bc12057ae3200e6d","dateModified":"2026-10-02","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
