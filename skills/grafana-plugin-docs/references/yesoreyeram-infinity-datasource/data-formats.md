---
title: "Data formats | Grafana Plugins documentation"
description: "Learn how to query different data formats with the Infinity data source"
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Data formats

The Infinity data source can query and visualize data from multiple formats. Each format has its own configuration options and selector syntax.

## Supported formats

Expand table

| Format                                                                                                                         | Description                        | Use case                                  |
|--------------------------------------------------------------------------------------------------------------------------------|------------------------------------|-------------------------------------------|
| [JSON](https://grafana.com/docs/plugins/yesoreyeram-infinity-datasource/latest/data-formats/json/)                             | Query JSON APIs and files          | REST APIs, most modern web services       |
| [CSV](https://grafana.com/docs/plugins/yesoreyeram-infinity-datasource/latest/data-formats/csv/)                               | Query CSV files and endpoints      | Spreadsheet exports, data feeds           |
| [XML](https://grafana.com/docs/plugins/yesoreyeram-infinity-datasource/latest/data-formats/xml/)                               | Query XML APIs and files           | SOAP APIs, RSS feeds, legacy systems      |
| [GraphQL](https://grafana.com/docs/plugins/yesoreyeram-infinity-datasource/latest/data-formats/graphql/)                       | Query GraphQL endpoints            | GraphQL APIs                              |
| [HTML](https://grafana.com/docs/plugins/yesoreyeram-infinity-datasource/latest/data-formats/html/)                             | Extract data from HTML pages       | Web scraping, legacy systems without APIs |
| [Azure Blob Storage](https://grafana.com/docs/plugins/yesoreyeram-infinity-datasource/latest/data-formats/azure-blob-storage/) | Query data from Azure Blob Storage | Cloud storage, Azure                      |

## Common concepts

All data format queries share these common configuration options:

- **Source**: Where to get the data (URL, inline, Azure Blob, or reference)
- **Root selector**: Path to the array of data rows
- **Columns**: Define which fields to extract and their data types
- **Format**: Output format (table, time series, data frame, etc.)

For advanced data transformation, you can use [JSONata](https://grafana.com/docs/plugins/yesoreyeram-infinity-datasource/latest/query/backend/), [JQ](https://grafana.com/docs/plugins/yesoreyeram-infinity-datasource/latest/query/jq-backend/), or [UQL](https://grafana.com/docs/plugins/yesoreyeram-infinity-datasource/latest/query/uql/) parsers with any data format.
