---
title: "Azure Data Explorer template variables | Grafana Plugins documentation"
description: "Use template variables with the Azure Data Explorer data source to create dynamic, reusable Grafana dashboards."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Azure Data Explorer template variables

Use template variables to create dynamic, reusable dashboards. Instead of hard-coding values such as server, application, or sensor names in your queries, you can use variables that appear as drop-down lists at the top of the dashboard.

## Before you begin

Before you create template variables, ensure you have the following:

- A [configured Azure Data Explorer data source](/docs/plugins/grafana-azure-data-explorer-datasource/latest/configure/).
- An understanding of [Grafana template variables](/docs/grafana/latest/dashboards/variables/).

## Create a query variable

To create a query variable:

1. Navigate to **Dashboard settings** &gt; **Variables**.
2. Click **Add variable**.
3. Select **Query** as the variable type.
4. In the **Query options** section, select the Azure Data Explorer data source.
5. Select a **Query Type**. The type determines which values the variable returns and which fields you must complete.
6. Complete the dependent fields, or write a query if you select **Kusto Query**.
7. Review the preview of returned values at the bottom.

The Azure Data Explorer variable editor supports the following query types:

Expand table

| Query type      | Returns                                                                                 | Required fields                      |
|-----------------|-----------------------------------------------------------------------------------------|--------------------------------------|
| **Clusters**    | The clusters available to the data source.                                              | None                                 |
| **Databases**   | The databases in the selected cluster.                                                  | **Cluster**                          |
| **Tables**      | The tables in the selected database.                                                    | **Cluster**, **Database**            |
| **Columns**     | The columns in the selected table.                                                      | **Cluster**, **Database**, **Table** |
| **Kusto Query** | The results of a Kusto query. Use `project` to return a single column of string values. | A Kusto query                        |

The **Name** field sets the variable name. Use the **Label** field to set a friendly display name.

## Use variables in queries

Reference a variable in a query with the `$` prefix. For example, if the variable is named `level`:

kusto [Copy code to clipboard] Copy

```kusto
MyLogs
| where Level == '$level'
```

For variables that allow multiple values, use the `in` operator:

kusto [Copy code to clipboard] Copy

```kusto
MyLogs
| where Level in ($level)
```

## Query for a list of databases

To populate a variable with the databases in a cluster, select the **Databases** query type and choose a cluster. This is the recommended approach.

Alternatively, select the **Kusto Query** type and use the `databases()` function, which returns the list of databases:

kusto [Copy code to clipboard] Copy

```kusto
databases()
```

You can use a database variable in the query header’s **Database** drop-down to switch databases without editing the panel query. To use the variable, type its name in the drop-down. For example, if the variable is named `database`, type `$database`.

## Template variable macros

Use the following macros with multi-value template variables:

Expand table

| Macro                          | Description                                                                                                                                                                                                                                                                                                                                                                                                                                |
|--------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `$__escapeMulti($myVar)`       | Use with multi-value variables that contain illegal characters. For example, if `$myVar` has the value `'\\grafana-vm\Network(eth0)\Total','\\hello!'`, it expands to `@'\\grafana-vm\Network(eth0)\Total', @'\\hello!'`. For single-value variables, escape the variable inline instead, such as `@'\$myVar'`.                                                                                                                            |
| `$__contains(colName, $myVar)` | Use with multi-value variables. For example, if `$myVar` has the value `'value1','value2'`, it expands to `colName in ('value1','value2')`. If you use the **Include All** option, check **Include All option** and set the **Custom all value** field to `all`. When `$myVar` has the value `all`, the macro expands to `1 == 1`. This improves query performance for variables with many options by avoiding a large `where..in` clause. |
