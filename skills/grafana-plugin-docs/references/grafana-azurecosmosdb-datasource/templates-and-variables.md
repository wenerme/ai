---
title: "Azure Cosmos DB templates and variables | Grafana Enterprise Plugins documentation"
description: "This document describes using templates and variables with Azure Cosmos DB"
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

[Documentation](/docs/)[breadcrumb arrow] [Plugins](/docs/plugins/)[breadcrumb arrow] [Azure Cosmos DB data source](/docs/plugins/grafana-azurecosmosdb-datasource/latest/)[breadcrumb arrow] Azure Cosmos DB templates and variables

### Azure Cosmos DB templates and variables

Instead of hard-coding details such as database, containers, partition keys, and `WHERE` clause filters, you can use variables. Grafana lists these variables in dropdown select boxes at the top of the dashboard to help you change the data displayed in your dashboard. Grafana refers to such variables as template variables.

For an introduction to templates and variables, see the following topics:

- [Variables](/docs/grafana/latest/dashboards/variables/)
- [Templates](/docs/grafana/latest/dashboards/variables/#templates)
- [Add and manage variables](/docs/grafana/latest/dashboards/variables/add-template-variables/)
- [Variable syntax](/docs/grafana/latest/dashboards/variables/variable-syntax/)

To add a new Azure Cosmos DB query variable, see [Add a query variable](/docs/grafana/latest/variables/variable-types/add-query-variable/). Use your Azure Cosmos DB data source as your data source. The following queries are available:

- **Database** - Fetches all of the available databases
- **Container** - After a database has been selected, fetches all of the available databases
- **Query** - After a database and container has been selected, enter a Cosmos DB NoSQL query that returns one field. For more information refer to [Azure Cosmos DB query editor](/docs/plugins/grafana-azurecosmosdb-datasource/latest/editor/)
