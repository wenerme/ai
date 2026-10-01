---
description: Understand how to query data with Basin SQL
title: Query data
image: https://developers.cloudflare.com/basin-sql/query-data/og.png?v=babebcf967cb2a0a
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/basin-sql/llms.txt
> Use this file to discover all available pages before exploring further.

# Query data

Last updated Oct 1, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/basin-sql/query-data/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Query [Apache Iceberg ↗︎](https://iceberg.apache.org/) tables managed by [Basin Catalog](https://developers.cloudflare.com/basin-catalog/). Basin SQL queries can be made via [Wrangler](https://developers.cloudflare.com/workers/wrangler/) or HTTP API.

## Get your warehouse name

To query data with Basin SQL, you need your warehouse name associated with your [catalog](https://developers.cloudflare.com/basin-catalog/manage-catalogs/). To retrieve it, you can run the `basin catalog get` command:

npmyarnpnpm

```
npx wrangler basin catalog get <BUCKET_NAME>
```

```
yarn wrangler basin catalog get <BUCKET_NAME>
```

```
pnpm wrangler basin catalog get <BUCKET_NAME>
```

Alternatively, you can find it in the dashboard by going to the **R2 object storage** page, selecting the bucket, switching to the **Settings** tab, scrolling to **Basin Catalog**, and finding **Warehouse name**.

## Query via Wrangler

To begin, install [`npm` ↗︎](https://docs.npmjs.com/getting-started). Then [install Wrangler, the Developer Platform CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/).

Wrangler needs an API token with permissions to access Basin Catalog, R2 storage, and Basin SQL to execute queries. The `basin sql query` command looks for the token in the `WRANGLER_BASIN_SQL_AUTH_TOKEN` environment variable.

Set up your environment:

```bash
export WRANGLER_BASIN_SQL_AUTH_TOKEN=YOUR_API_TOKEN
```

Or create a `.env` file with:

```txt
WRANGLER_BASIN_SQL_AUTH_TOKEN=YOUR_API_TOKEN
```

Where `YOUR_API_TOKEN` is the token you created with the [required permissions](#authentication). For more information on setting environment variables, refer to [Wrangler system environment variables](https://developers.cloudflare.com/workers/wrangler/system-environment-variables/).

To run a SQL query, run the `basin sql query` command:

npmyarnpnpm

```
npx wrangler basin sql query <WAREHOUSE> "SELECT * FROM namespace.table_name limit 10;"
```

```
yarn wrangler basin sql query <WAREHOUSE> "SELECT * FROM namespace.table_name limit 10;"
```

```
pnpm wrangler basin sql query <WAREHOUSE> "SELECT * FROM namespace.table_name limit 10;"
```

For a full list of supported SQL commands, refer to the [Basin SQL reference](https://developers.cloudflare.com/basin-sql/sql-reference/).

## Query via API

Below is an example of using Basin SQL via the REST endpoint:

```bash
curl -X POST \
  "https://api.sql.cloudflarestorage.com/api/v1/accounts/{ACCOUNT_ID}/basin-sql/query/{BUCKET_NAME}" \
  -H "Authorization: Bearer ${WRANGLER_BASIN_SQL_AUTH_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "query": "SELECT * FROM namespace.table_name limit 10;"
  }'
```

The API requires an API token with the appropriate permissions in the Authorization header. Refer to [Authentication](#authentication) for details on creating a token.

For a full list of supported SQL commands, refer to the [Basin SQL reference](https://developers.cloudflare.com/basin-sql/sql-reference/).

## Authentication

To query data with Basin SQL, you must provide a Cloudflare API token with Basin SQL, Basin Catalog, and R2 storage permissions. Basin SQL requires these permissions to access catalog metadata and read the underlying data files stored in R2.

### Create API token in the dashboard

Create an [R2 API token](https://developers.cloudflare.com/r2/api/tokens/#permissions) with the following permissions:

- Access to Basin Catalog (read-only)
- Access to R2 storage (Admin read/write)
- Access to Basin SQL (read-only)

Use this token value for the `WRANGLER_BASIN_SQL_AUTH_TOKEN` environment variable when querying with Wrangler, or in the Authorization header when using the REST API.

### Create API token via API

To create an API token programmatically for use with Basin SQL, specify Basin SQL, Basin Catalog, and R2 storage permission groups in your [Access Policy](https://developers.cloudflare.com/r2/api/tokens/#access-policy).

#### Example Access Policy

```json
[
	{
		"id": "f267e341f3dd4697bd3b9f71dd96247f",
		"effect": "allow",
		"resources": {
			"com.cloudflare.edge.r2.bucket.4793d734c0b8e484dfc37ec392b5fa8a_default_my-bucket": "*",
			"com.cloudflare.edge.r2.bucket.4793d734c0b8e484dfc37ec392b5fa8a_eu_my-eu-bucket": "*"
		},
		"permission_groups": [
			{
				"id": "f45430d92e2b4a6cb9f94f2594c141b8",
				"name": "Workers R2 SQL Read"
			},
			{
				"id": "d229766a2f7f4d299f20eaa8c9b1fde9",
				"name": "Workers R2 Data Catalog Write"
			},
			{
				"id": "bf7481a1826f439697cb59a20b22293e",
				"name": "Workers R2 Storage Write"
			}
		]
	}
]
```

To learn more about how to create API tokens for Basin SQL using the API, including required permission groups and usage examples, refer to the [Create API tokens via API documentation](https://developers.cloudflare.com/r2/api/tokens/#create-api-tokens-via-api).

## Additional resources

### [Manage catalogs](https://developers.cloudflare.com/basin-catalog/manage-catalogs/)

Enable or disable Basin Catalog on your bucket, retrieve configuration details, and authenticate your Iceberg engine.

### [Build an end to end data pipeline](https://developers.cloudflare.com/basin-sql/tutorials/end-to-end-pipeline/)

Detailed tutorial for setting up a simple fraud detection data pipeline, and generate events for it in Python.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/basin-sql/query-data/#page","headline":"Query data","description":"Understand how to query data with Basin SQL","url":"https://developers.cloudflare.com/basin-sql/query-data/","inLanguage":"en","image":"https://developers.cloudflare.com/basin-sql/query-data/og.png?v=babebcf967cb2a0a","dateModified":"2026-10-01","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
