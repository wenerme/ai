---
description: Understand how to manage Iceberg REST catalogs associated with R2 buckets
title: Manage catalogs
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/r2/llms.txt
> Use this file to discover all available pages before exploring further.

#  Manage catalogs

Last updated Jul 13, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/r2/data-catalog/manage-catalogs/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

Learn how to:

* Enable and disable [R2 Data Catalog](https://developers.cloudflare.com/r2/data-catalog/) on your buckets.
* Enable and disable [table maintenance](https://developers.cloudflare.com/r2/data-catalog/table-maintenance/) features like compaction and snapshot expiration.
* Authenticate Iceberg engines using API tokens.

## Enable R2 Data Catalog on a bucket

Enabling the catalog on a bucket turns on the REST catalog interface and provides a **Catalog URI** and **Warehouse name** required by Iceberg clients. Once enabled, you can create and manage Iceberg tables in that bucket.

1. In the Cloudflare dashboard, go to the **R2 Data Catalog** page.
[ Go to **R2 Data Catalog** ↗ ](https://dash.cloudflare.com/?to=/:account/data-catalog/overview)
2. Select **Create catalog**.
3. Enter an R2 bucket name. You can select an existing bucket or enter a new bucket name to create one. If creating a new bucket, optionally select a location hint.
4. Select **Next** to configure table maintenance. Optionally enable [compaction](https://developers.cloudflare.com/r2/data-catalog/table-maintenance/) and [snapshot expiration](https://developers.cloudflare.com/r2/data-catalog/table-maintenance/) during setup.
5. Review your configuration and select **Create catalog**.
6. Once created, the catalog detail page displays your **Catalog URI** and **Warehouse name**.

To enable the catalog on your bucket, run the [r2 bucket catalog enable command](https://developers.cloudflare.com/workers/wrangler/commands/r2/#r2-bucket-catalog-enable):

```bash
npx wrangler r2 bucket catalog enable <BUCKET_NAME>
```

After enabling, Wrangler will return your catalog URI and warehouse name.

## Disable R2 Data Catalog on a bucket

When you disable the catalog on a bucket, it immediately stops serving requests from the catalog interface. Any Iceberg table references stored in that catalog become inaccessible until you re-enable it.

1. In the Cloudflare dashboard, go to the **R2 Data Catalog** page.
[ Go to **R2 Data Catalog** ↗ ](https://dash.cloudflare.com/?to=/:account/data-catalog/overview)
2. Select the catalog you want to disable.
3. Go to the **Settings** tab and scroll to the **Disable** section.
4. Select **Disable** and confirm.

To disable the catalog on your bucket, run the [r2 bucket catalog disable command](https://developers.cloudflare.com/workers/wrangler/commands/r2/#r2-bucket-catalog-disable):

```bash
npx wrangler r2 bucket catalog disable <BUCKET_NAME>
```

## Enable compaction

Compaction improves query performance by combining the many small files created during data ingestion into fewer, larger files according to the set `target file size`. For more information about compaction and why it is valuable, refer to [About compaction](https://developers.cloudflare.com/r2/data-catalog/table-maintenance/).

API token permission requirements

Table maintenance operations such as compaction and snapshot expiration require a Cloudflare API token with both R2 storage and R2 Data Catalog read/write permissions to act as a service credential.

Refer to [Authenticate your Iceberg engine](#authenticate-your-iceberg-engine) for details on creating a token with the required permissions.

1. In the Cloudflare dashboard, go to the **R2 Data Catalog** page.
[ Go to **R2 Data Catalog** ↗ ](https://dash.cloudflare.com/?to=/:account/data-catalog/overview)
2. Select the catalog you want to enable compaction on.
3. Go to the **Settings** tab and scroll to the **Table Maintenance** section.
4. Select **Enable** or **Edit** next to compaction.
5. Toggle compaction on and optionally set a target file size. The default is 128 MB.
6. Select **Save**.

Note

If no service credential has been generated for this catalog, the dashboard will prompt you to generate one. Compaction requires a credential to access and rewrite files in your bucket.

To enable the compaction on your catalog, run the [r2 bucket catalog compaction enable command](https://developers.cloudflare.com/workers/wrangler/commands/r2/#r2-bucket-catalog-compaction-enable):

```bash
# Enable catalog-level compaction (all tables)
npx wrangler r2 bucket catalog compaction enable <BUCKET_NAME> --target-size 128 --token <API_TOKEN>

# Enable compaction for a specific table
npx wrangler r2 bucket catalog compaction enable <BUCKET_NAME> <NAMESPACE> <TABLE> --target-size 128
```

Table-level vs Catalog-level compaction

* **Catalog-level**: Applies to all tables in the bucket; requires an API token as a service credential.
* **Table-level**: Applies to a specific table only.

Once enabled, compaction applies retroactively to all existing tables (for catalog-level compaction) or the specified table (for table-level compaction).

## Disable compaction

Disabling compaction will prevent the process from running for all tables (catalog level) or a specific table (table level). You can re-enable it at any time.

1. In the Cloudflare dashboard, go to the **R2 Data Catalog** page.
[ Go to **R2 Data Catalog** ↗ ](https://dash.cloudflare.com/?to=/:account/data-catalog/overview)
2. Select the catalog you want to disable compaction on.
3. Go to the **Settings** tab and scroll to the **Table Maintenance** section.
4. Select **Edit** next to compaction.
5. Toggle compaction off.
6. Select **Save**.

To disable the compaction on your catalog, run the [r2 bucket catalog compaction disable command](https://developers.cloudflare.com/workers/wrangler/commands/r2/#r2-bucket-catalog-compaction-disable):

```bash
# Disable catalog-level compaction (all tables)
npx wrangler r2 bucket catalog compaction disable <BUCKET_NAME>

# Disable compaction for a specific table
npx wrangler r2 bucket catalog compaction disable <BUCKET_NAME> <NAMESPACE> <TABLE>
```

## Enable snapshot expiration

Snapshot expiration automatically removes old table snapshots and any unreferenced data files to reduce metadata overhead and storage costs. You can configure:

* **Max snapshot age** \- Snapshots older than this duration are expired. Specify a value followed by a unit (`d` for days, `h` for hours, `m` for minutes, `s` for seconds). For example, `7d` expires snapshots older than 7 days.
* **Min snapshots to keep** \- The minimum number of snapshots to retain, regardless of age.

1. In the Cloudflare dashboard, go to the **R2 Data Catalog** page.
[ Go to **R2 Data Catalog** ↗ ](https://dash.cloudflare.com/?to=/:account/data-catalog/overview)
2. Select the catalog you want to enable snapshot expiration on.
3. Go to the **Settings** tab and scroll to the **Table Maintenance** section.
4. Select **Enable** or **Edit** next to snapshot expiration.
5. Toggle snapshot expiration on.
6. Set the **Max snapshot age** and **Min snapshots to keep** values.
7. Select **Save**.

Note

Snapshot expiration commands are available as of Wrangler version 4.56.0.

To enable snapshot expiration on your catalog, run the [r2 bucket catalog snapshot-expiration enable command](https://developers.cloudflare.com/workers/wrangler/commands/r2/#r2-bucket-catalog-snapshot-expiration-enable):

```bash
# Enable catalog-level snapshot expiration (all tables)
npx wrangler r2 bucket catalog snapshot-expiration enable <BUCKET_NAME> \
  --token <API_TOKEN> \
  --older-than-days 7 \
  --retain-last 10

# Enable snapshot expiration for a specific table
npx wrangler r2 bucket catalog snapshot-expiration enable <BUCKET_NAME> <NAMESPACE> <TABLE> \
  --older-than-days 2 \
  --retain-last 5
```

## Disable snapshot expiration

Disabling snapshot expiration prevents the process from running for all tables (catalog level) or a specific table (table level). You can re-enable snapshot expiration at any time.

1. In the Cloudflare dashboard, go to the **R2 Data Catalog** page.
[ Go to **R2 Data Catalog** ↗ ](https://dash.cloudflare.com/?to=/:account/data-catalog/overview)
2. Select the catalog you want to disable snapshot expiration on.
3. Go to the **Settings** tab and scroll to the **Table Maintenance** section.
4. Select **Edit** next to snapshot expiration.
5. Toggle snapshot expiration off.
6. Select **Save**.

```bash
# Disable catalog-level snapshot expiration (all tables)
npx wrangler r2 bucket catalog snapshot-expiration disable <BUCKET_NAME>

# Disable snapshot expiration for a specific table
npx wrangler r2 bucket catalog snapshot-expiration disable <BUCKET_NAME> <NAMESPACE> <TABLE>
```

## Authenticate your Iceberg engine

To connect your Iceberg engine to R2 Data Catalog, you must provide a Cloudflare API token with **both** R2 Data Catalog permissions and R2 storage permissions. Iceberg engines interact with R2 Data Catalog to perform table operations. The catalog also provides engines with SigV4 credentials, which are required to access the underlying data files stored in R2.

R2 Data Catalog supports both read-only and read-write tokens:

* **Read-only** operations (for example, listing namespaces, loading tables, and querying data) require a token with read access to R2 Data Catalog and R2 storage.
* **Write** operations (for example, creating or dropping tables and committing transactions) require a token with read and write access to R2 Data Catalog and R2 storage.

Use a read-only token for query engines and clients that only read data (such as R2 SQL, DuckDB, or PyIceberg readers), and a read-write token for engines and pipelines that create tables or write data.

Vended credentials inherit your token's R2 storage permissions

When an engine loads credentials from the catalog, R2 Data Catalog returns SigV4 credentials that inherit the R2 storage permissions of the API token used to authenticate. A token with read-only R2 Data Catalog access but read-write R2 storage access can still be used to write objects (including catalog metadata files) to the underlying bucket. To ensure read-only access to your data, scope the R2 storage permission to read-only as well.

### Create API token in the dashboard

Create an [R2 API token](https://developers.cloudflare.com/r2/api/tokens/#permissions) with the permissions matching your workload:

* **Admin Read & Write** — for engines and pipelines that read and write data. Includes read and write access to both R2 Data Catalog and R2 storage.
* **Admin Read only** — for query engines and clients that only read data. Includes read access to both R2 Data Catalog and R2 storage.

Providing the resulting token value to your Iceberg engine gives it the ability to manage catalog metadata and handle data operations (reads or writes to R2).

### Create API token via API

To create an API token programmatically for use with R2 Data Catalog, you need to specify both R2 Data Catalog and R2 storage permission groups in your [Access Policy](https://developers.cloudflare.com/r2/api/tokens/#access-policy).

#### Example read-write Access Policy

Use read and write permission groups for engines and pipelines that create tables or write data:

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
				"id": "d229766a2f7f4d299f20eaa8c9b1fde9",
				"name": "Workers R2 Data Catalog Write"
			},
			{
				"id": "2efd5506f9c8494dacb1fa10a3e7d5b6",
				"name": "Workers R2 Storage Bucket Item Write"
			}
		]
	}
]
```

#### Example read-only Access Policy

Use read permission groups for query engines and clients that only read data:

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
				"id": "45db74139a62490b9b60eb7c4f34994b",
				"name": "Workers R2 Data Catalog Read"
			},
			{
				"id": "6a018a9f2fc74eb6b293b0c548f38b39",
				"name": "Workers R2 Storage Bucket Item Read"
			}
		]
	}
]
```

To learn more about how to create API tokens for R2 Data Catalog using the API, including required permission groups and usage examples, refer to the [Create API tokens via API documentation](https://developers.cloudflare.com/r2/api/tokens/#create-api-tokens-via-api).

## R2 Local Uploads

[Local Uploads](https://developers.cloudflare.com/r2/buckets/local-uploads) writes object data to a nearby location, then asynchronously copies it to your bucket. Data is queryable immediately and remains strongly consistent. This can significantly improve latency of writes from Apache Iceberg clients outside of the region of the respective R2 Data Catalog bucket.

To enable R2 Local Uploads, you can use the following Wrangler command:

```bash
npx wrangler r2 bucket catalog local-uploads enable <R2_Data_Catalog_BUCKET_NAME>
```

## Limitations

* R2 Data Catalog does not currently support R2 buckets in a non-default jurisdiction.

## Learn more

### [ Get started ](https://developers.cloudflare.com/r2/data-catalog/get-started/)

 Learn how to enable the R2 Data Catalog on your bucket, load sample data, and run your first query.

### [ Connect to Iceberg engines ](https://developers.cloudflare.com/r2/data-catalog/config-examples/)

 Find detailed setup instructions for Apache Spark and other common query engines.

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/r2/data-catalog/manage-catalogs/#page","headline":"Manage catalogs · Cloudflare R2 docs","description":"Understand how to manage Iceberg REST catalogs associated with R2 buckets","url":"https://developers.cloudflare.com/r2/data-catalog/manage-catalogs/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-07-13","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
