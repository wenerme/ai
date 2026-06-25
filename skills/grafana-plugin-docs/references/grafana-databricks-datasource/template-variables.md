---
title: "Template variables and the Databricks data source | Grafana Enterprise Plugins documentation"
description: "This document describes the templates and variables for the Databricks data source."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Template variables and the Databricks data source

Instead of hard-coding details such as server, application, and sensor names in metric queries, you can use variables. Grafana displays these variables in drop-down select boxes at the top of the dashboard to help you change the data displayed in your dashboard. Grafana refers to such variables as **template variables**.

After creating a variable, you can use it in your Databricks queries by using [Variable syntax](/docs/grafana/latest/variables/syntax/). For more information about variables, refer to [Templates and variables](/docs/grafana/latest/variables/).

## Create Databricks query variables

To add a new Databricks query variable, refer to [Add a query variable](/docs/grafana/latest/variables/variable-types/add-query-variable/).

To create a query variable for Databricks, write a SQL query that returns your desired variable options:

SQL [Copy code to clipboard] Copy

```sql
SELECT DISTINCT region FROM sales_data ORDER BY region
```

This query creates a drop-down with all unique regions from the `sales_data` table. You can enable multi-value selection or include an “All” option in the variable settings.
