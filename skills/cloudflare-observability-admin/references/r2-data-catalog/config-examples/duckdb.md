---
description: Connect DuckDB to R2 Data Catalog to query and manage Iceberg tables.
title: DuckDB
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/r2-data-catalog/llms.txt
> Use this file to discover all available pages before exploring further.

# DuckDB

Last updated Aug 7, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/r2-data-catalog/config-examples/duckdb/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Below is an example of using [DuckDB ↗](https://duckdb.org/) to connect to R2 Data Catalog. For more information on connecting to R2 Data Catalog with DuckDB, refer to [DuckDB documentation ↗](https://duckdb.org/docs/stable/core%5Fextensions/iceberg/iceberg%5Frest%5Fcatalogs#r2-catalog).

## Prerequisites

* Sign up for a [Cloudflare account ↗](https://dash.cloudflare.com/sign-up/workers-and-pages).
* [Create an R2 bucket](https://developers.cloudflare.com/r2/buckets/create-buckets/) and [enable the data catalog](https://developers.cloudflare.com/r2-data-catalog/manage-catalogs/#enable-r2-data-catalog-on-a-bucket).
* [Create an R2 API token](https://developers.cloudflare.com/r2/api/tokens/) with both [R2 and data catalog permissions](https://developers.cloudflare.com/r2/api/tokens/#permissions).
* Install [DuckDB ↗](https://duckdb.org/docs/installation/).
  * Note: [DuckDB 1.4.0 ↗](https://github.com/duckdb/duckdb/releases/tag/v1.4.0) or greater is required to attach and write to [Iceberg REST Catalogs ↗](https://duckdb.org/docs/stable/core%5Fextensions/iceberg/iceberg%5Frest%5Fcatalogs).
* Note: DuckDB [does not currently support ↗](https://duckdb.org/docs/stable/core%5Fextensions/iceberg/iceberg%5Frest%5Fcatalogs#limitations-for-update-and-delete) `DELETE` on partitioned tables.

## Example usage

In the [DuckDB CLI ↗](https://duckdb.org/docs/stable/clients/cli/overview.html) (Command Line Interface), run the following commands:

```sql
-- Install the iceberg DuckDB extension (if you haven't already) and load the extension.
INSTALL iceberg;
LOAD iceberg;

-- Install and load httpfs extension for reading/writing files over HTTP(S).
INSTALL httpfs;
LOAD httpfs;

-- Create a DuckDB secret to store R2 Data Catalog credentials.
CREATE SECRET r2_secret (
    TYPE ICEBERG,
    TOKEN '<token>'
);

-- Attach R2 Data Catalog with the following ATTACH statement.
ATTACH '<warehouse_name>' AS my_r2_catalog (
    TYPE ICEBERG,
    ENDPOINT '<catalog_uri>'
);

-- Create the default schema in the catalog and set it as the active schema.
CREATE SCHEMA my_r2_catalog.default;
USE my_r2_catalog.default;

-- Create and populate a sample Iceberg table with data.
CREATE TABLE my_iceberg_table AS SELECT a FROM range(4) t(a);

-- Show all available tables.
SHOW ALL TABLES;

-- Query the Iceberg table you just created.
SELECT * FROM my_r2_catalog.default.my_iceberg_table;
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/r2-data-catalog/config-examples/duckdb/#page","headline":"DuckDB · Cloudflare R2 Data Catalog docs","description":"Connect DuckDB to R2 Data Catalog to query and manage Iceberg tables.","url":"https://developers.cloudflare.com/r2-data-catalog/config-examples/duckdb/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-07","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
