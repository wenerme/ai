---
description: Connect PyIceberg to R2 Data Catalog to create and query Iceberg tables in Python.
title: PyIceberg
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/r2-data-catalog/llms.txt
> Use this file to discover all available pages before exploring further.

# PyIceberg

Last updated Aug 7, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/r2-data-catalog/config-examples/pyiceberg/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Below is an example of using [PyIceberg ↗](https://py.iceberg.apache.org/) to connect to R2 Data Catalog.

## Prerequisites

* Sign up for a [Cloudflare account ↗](https://dash.cloudflare.com/sign-up/workers-and-pages).
* [Create an R2 bucket](https://developers.cloudflare.com/r2/buckets/create-buckets/) and [enable the data catalog](https://developers.cloudflare.com/r2-data-catalog/manage-catalogs/#enable-r2-data-catalog-on-a-bucket).
* [Create an R2 API token](https://developers.cloudflare.com/r2/api/tokens/) with both [R2 and data catalog permissions](https://developers.cloudflare.com/r2/api/tokens/#permissions).
* Install the [PyIceberg ↗](https://py.iceberg.apache.org/#installation) and [PyArrow ↗](https://arrow.apache.org/docs/python/install.html) libraries.

## Example usage

```py
import pyarrow as pa
from pyiceberg.catalog.rest import RestCatalog
from pyiceberg.exceptions import NamespaceAlreadyExistsError

# Define catalog connection details (replace variables)
WAREHOUSE = "<WAREHOUSE>"
TOKEN = "<TOKEN>"
CATALOG_URI = "<CATALOG_URI>"

# Connect to R2 Data Catalog
catalog = RestCatalog(
    name="my_catalog",
    warehouse=WAREHOUSE,
    uri=CATALOG_URI,
    token=TOKEN,
)

# Create default namespace
catalog.create_namespace("default")

# Create simple PyArrow table
df = pa.table({
    "id": [1, 2, 3],
    "name": ["Alice", "Bob", "Charlie"],
})

# Create an Iceberg table
test_table = ("default", "my_table")
table = catalog.create_table(
    test_table,
    schema=df.schema,
)
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/r2-data-catalog/config-examples/pyiceberg/#page","headline":"PyIceberg · Cloudflare R2 Data Catalog docs","description":"Connect PyIceberg to R2 Data Catalog to create and query Iceberg tables in Python.","url":"https://developers.cloudflare.com/r2-data-catalog/config-examples/pyiceberg/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-07","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
