---
title: Apache Trino
description: Below is an example of using Apache Trino to connect to R2 Data Catalog. For more information on connecting to R2 Data Catalog with Trino, refer to Trino documentation.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/r2/data-catalog/config-examples/trino.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Apache Trino

**Last reviewed:**  7 months ago 

Below is an example of using [Apache Trino ↗](https://trino.io/) to connect to R2 Data Catalog. For more information on connecting to R2 Data Catalog with Trino, refer to [Trino documentation ↗](https://trino.io/docs/current/connector/iceberg.html).

## Prerequisites

* Sign up for a [Cloudflare account ↗](https://dash.cloudflare.com/sign-up/workers-and-pages).
* [Create an R2 bucket](https://developers.cloudflare.com/r2/buckets/create-buckets/) and [enable the data catalog](https://developers.cloudflare.com/r2/data-catalog/manage-catalogs/#enable-r2-data-catalog-on-a-bucket).
* [Create an R2 API token, key, and secret](https://developers.cloudflare.com/r2/api/tokens/) with both [R2 and data catalog permissions](https://developers.cloudflare.com/r2/api/tokens/#permissions).
* Install [Docker ↗](https://docs.docker.com/get-docker/) to run the Trino container.

## Setup

Create a local directory for the catalog configuration and change directories to it

Terminal window

```

mkdir -p trino-catalog && cd trino-catalog/


```

Create a configuration file called `r2.properties` for your R2 Data Catalog connection:

```

# r2.properties

connector.name=iceberg


# R2 Configuration

fs.native-s3.enabled=true

s3.region=auto

s3.aws-access-key=<Your R2 access key>

s3.aws-secret-key=<Your R2 secret>

s3.endpoint=<Your R2 endpoint>

s3.path-style-access=true


# R2 Data Catalog Configuration

iceberg.catalog.type=rest

iceberg.rest-catalog.uri=<Your R2 Data Catalog URI>

iceberg.rest-catalog.warehouse=<Your R2 Data Catalog warehouse>

iceberg.rest-catalog.security=OAUTH2

iceberg.rest-catalog.oauth2.token=<Your R2 authentication token>


```

Explain Code

## Example usage

1. Start Trino with the R2 catalog configuration:  
Terminal window  
```  
# Create a local directory for the catalog configuration  
mkdir -p trino-catalog  
# Place your r2.properties file in the catalog directory  
cp r2.properties trino-catalog/  
# Run Trino with the catalog configuration  
docker run -d \  
  --name trino-r2 \  
  -p 8080:8080 \  
  -v $(pwd)/trino-catalog:/etc/trino/catalog \  
  trinodb/trino:latest  
```  
Explain Code
2. Connect to Trino and query your R2 Data Catalog:  
Terminal window  
```  
# Connect to the Trino CLI  
docker exec -it trino-r2 trino  
```
3. In the Trino CLI, run the following commands:  
```  
-- Show all schemas in the R2 catalog  
SHOW SCHEMAS IN r2;  
-- Show all schemas in the R2 catalog  
CREATE SCHEMA r2.example_schema  
-- Create a table with some values in it  
CREATE TABLE r2.example_schema.yearly_clicks (  
    year,  
    clicks  
)  
WITH (  
   partitioning = ARRAY['year']  
)  
AS VALUES  
    (2021, 10000),  
    (2022, 20000);  
-- Show tables in a specific schema  
SHOW TABLES IN r2.example_schema;  
-- Query your Iceberg table  
SELECT * FROM r2.example_schema.yearly_clicks;  
```  
Explain Code

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/r2/","name":"R2"}},{"@type":"ListItem","position":3,"item":{"@id":"/r2/data-catalog/","name":"R2 Data Catalog"}},{"@type":"ListItem","position":4,"item":{"@id":"/r2/data-catalog/config-examples/","name":"Connect to Iceberg engines"}},{"@type":"ListItem","position":5,"item":{"@id":"/r2/data-catalog/config-examples/trino/","name":"Apache Trino"}}]}
```
