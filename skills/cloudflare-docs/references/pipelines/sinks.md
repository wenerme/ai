---
title: Sinks
description: Configure data destinations in Cloudflare Pipelines to write to R2 or R2 Data Catalog.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

# Sinks

Sinks define destinations for your data in Cloudflare Pipelines. They support writing to [R2 Data Catalog](https://developers.cloudflare.com/r2/data-catalog/) as Apache Iceberg tables or to [R2](https://developers.cloudflare.com/r2/) as raw JSON or Parquet files.

Sinks provide exactly-once delivery guarantees, ensuring events are never duplicated or dropped. They can be configured to write files frequently for low-latency ingestion or to write larger, less frequent files for better query performance.

## Learn more

[ Manage sinks ](https://developers.cloudflare.com/pipelines/sinks/manage-sinks/) Create, configure, and delete sinks using Wrangler or the API. 

[ Available sinks ](https://developers.cloudflare.com/pipelines/sinks/available-sinks/) Learn about supported sink destinations and their configuration options. 

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/pipelines/","name":"Pipelines"}},{"@type":"ListItem","position":3,"item":{"@id":"/pipelines/sinks/","name":"Sinks"}}]}
```
