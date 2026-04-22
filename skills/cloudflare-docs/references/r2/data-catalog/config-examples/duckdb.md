---
title: DuckDB
description: Connect DuckDB to R2 Data Catalog to query and manage Iceberg tables.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/r2/data-catalog/config-examples/duckdb.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# DuckDB

**Last reviewed:**  11 months ago 

Below is an example of using [DuckDB ↗](https://duckdb.org/) to connect to R2 Data Catalog. For more information on connecting to R2 Data Catalog with DuckDB, refer to [DuckDB documentation ↗](https://duckdb.org/docs/stable/core%5Fextensions/iceberg/iceberg%5Frest%5Fcatalogs#r2-catalog).

## Prerequisites

* Sign up for a [Cloudflare account ↗](https://dash.cloudflare.com/sign-up/workers-and-pages).
* [Create an R2 bucket](https://developers.cloudflare.com/r2/buckets/create-buckets/) and [enable the data catalog](https://developers.cloudflare.com/r2/data-catalog/manage-catalogs/#enable-r2-data-catalog-on-a-bucket).
* [Create an R2 API token](https://developers.cloudflare.com/r2/api/tokens/) with both [R2 and data catalog permissions](https://developers.cloudflare.com/r2/api/tokens/#permissions).
* Install [DuckDB ↗](https://duckdb.org/docs/installation/).  
   * Note: [DuckDB 1.4.0 ↗](https://github.com/duckdb/duckdb/releases/tag/v1.4.0) or greater is required to attach and write to [Iceberg REST Catalogs ↗](https://duckdb.org/docs/stable/core%5Fextensions/iceberg/iceberg%5Frest%5Fcatalogs).
* Note: DuckDB [does not currently support ↗](https://duckdb.org/docs/stable/core%5Fextensions/iceberg/iceberg%5Frest%5Fcatalogs#limitations-for-update-and-delete) `DELETE` on partitioned tables.

## Example usage

In the [DuckDB CLI ↗](https://duckdb.org/docs/stable/clients/cli/overview.html) (Command Line Interface), run the following commands:

```

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

Explain Code

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/r2/","name":"R2"}},{"@type":"ListItem","position":3,"item":{"@id":"/r2/data-catalog/","name":"R2 Data Catalog"}},{"@type":"ListItem","position":4,"item":{"@id":"/r2/data-catalog/config-examples/","name":"Connect to Iceberg engines"}},{"@type":"ListItem","position":5,"item":{"@id":"/r2/data-catalog/config-examples/duckdb/","name":"DuckDB"}}]}
```
