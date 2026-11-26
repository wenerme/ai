---
agent:
  instructions: "Use this search API to find relevant content across this site with keywords or natural-language queries, instead of crawling individual pages. Results are returned in Markdown."
  endpoint: "https://developers.cloudflare.com/.well-known/search?q={query}"
  method: "GET"
  documentation: "https://developers.cloudflare.com/ai-search/how-to/search-for-agents/"
description: Connect Polars to Basin Catalog to read, transform, and write Iceberg tables in Python.
title: Polars
image: https://developers.cloudflare.com/basin-catalog/config-examples/polars/og.png?v=b81182fddd596f5e
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/basin-catalog/llms.txt
> Use this file to discover all available pages before exploring further.

# Polars

The following example uses [Polars ↗︎](https://pola.rs/) to create, read, and query an Iceberg table in Basin Catalog. For more information on Polars and Iceberg, refer to the [Polars documentation ↗︎](https://docs.pola.rs/api/python/stable/reference/api/polars.scan_iceberg.html).

## Prerequisites

- Sign up for a [Cloudflare account ↗︎](https://dash.cloudflare.com/sign-up/workers-and-pages).
- [Create an R2 bucket](https://developers.cloudflare.com/r2/buckets/create-buckets/) and [enable the data catalog](https://developers.cloudflare.com/basin-catalog/manage-catalogs/#enable-basin-catalog-on-a-bucket).
- [Create an R2 bucket](https://developers.cloudflare.com/r2/buckets/create-buckets/) and [enable Basin Catalog](https://developers.cloudflare.com/basin-catalog/manage-catalogs/#enable-basin-catalog-on-a-bucket) on it.
- Install [Polars ↗︎](https://docs.pola.rs/user-guide/installation/) 2.2.0 or later with the `iceberg` extra: `pip install 'polars[iceberg]'`.

## Example usage

```py
import polars as pl
from pyiceberg.catalog.rest import RestCatalog

# Connect to Basin Catalog (replace the placeholders)
catalog = RestCatalog(
    name="my_catalog",
    warehouse="<WAREHOUSE>",
    uri="<CATALOG_URI>",
    token="<TOKEN>",
)

# Create an Iceberg table (and the namespace) from a Polars DataFrame
df = pl.DataFrame({
    "id": [1, 2, 3],
    "name": ["Alice", "Bob", "Charlie"],
})
df.lazy().sink_iceberg(
    "default.my_table",
    catalog=catalog,
    mode="append",
    create_if_not_exists=True,
    create_namespace_if_not_exists=True,
)

# Read the table back lazily and filter it
print(
    pl.scan_iceberg("default.my_table", catalog=catalog)
    .filter(pl.col("id") > 1)
    .collect()
)

# Or query it with SQL
ctx = pl.SQLContext()
ctx.register_catalog("my_catalog", catalog, default_namespace="default", default=True)
print(ctx.execute("SELECT name FROM my_table WHERE id = 2").collect())
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/basin-catalog/config-examples/polars/#page","headline":"Polars","description":"Connect Polars to Basin Catalog to read, transform, and write Iceberg tables in Python.","url":"https://developers.cloudflare.com/basin-catalog/config-examples/polars/","inLanguage":"en","image":"https://developers.cloudflare.com/basin-catalog/config-examples/polars/og.png?v=b81182fddd596f5e","dateModified":"2026-11-26","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
