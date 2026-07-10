---
title: "SolarWinds template variables | Grafana Enterprise Plugins documentation"
description: "Learn how to use template variables with the SolarWinds data source to build dynamic, reusable dashboards."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# SolarWinds template variables

Use template variables to create dynamic, reusable dashboards. Instead of hard-coding values such as node names or volumes into your queries, you can use variables that update from a drop-down at the top of the dashboard.

## Before you begin

- [Configure the SolarWinds data source](/docs/plugins/grafana-solarwinds-datasource/latest/configure/).
- Understand [Grafana template variables](/docs/grafana/latest/dashboards/variables/).

## Supported variable types

The SolarWinds data source supports the following variable types:

Expand table

| Variable type | Supported |
|---------------|-----------|
| Query         | Yes       |
| Custom        | Yes       |
| Data source   | Yes       |

## Create a query variable

The SolarWinds variable editor uses the same SWQL query editor as a dashboard panel. After you write a query, you select which result field provides the variable values and, optionally, which field provides the display labels.

To create a query variable that gets its values from SolarWinds:

1. Navigate to **Dashboard settings** &gt; **Variables**.
2. Click **Add variable**.
3. Select **Query** as the variable type.
4. Select the SolarWinds data source.
5. Enter your SWQL query in the **SWQL Query** field.
6. Set **Value Field** to the result column whose values you want to use for the variable.
7. Optionally, set **Label Field** to a result column to show friendlier labels in the drop-down. If you leave it empty, the value is also used as the label.
8. Confirm the preview shows the expected values, then save the variable.

## Query examples

The following SWQL queries return values you can use in a variable.

### List node names

This query returns the caption of each node:

SQL [Copy code to clipboard] Copy

```sql
SELECT DISTINCT Caption FROM Orion.Nodes ORDER BY Caption
```

Set **Value Field** to `Caption`.

### List volumes

This query returns the caption of each volume:

SQL [Copy code to clipboard] Copy

```sql
SELECT Caption FROM Orion.Volumes ORDER BY Caption
```

Set **Value Field** to `Caption`.

### Use separate value and label fields

This query returns the node ID and the node caption, so you can store the ID as the variable value while showing the name in the drop-down:

SQL [Copy code to clipboard] Copy

```sql
SELECT NodeID, Caption FROM Orion.Nodes ORDER BY Caption
```

Set **Value Field** to `NodeID` and **Label Field** to `Caption`. Queries that reference the variable use the node ID, while the drop-down shows the node name.

## Use variables in queries

After you create a variable, reference it in a SWQL query with the `$variable` or `${variable}` syntax. For more information, refer to [Variable syntax](/docs/grafana/latest/dashboards/variables/variable-syntax/).

For example, if you have a variable named `node`, you can filter a query by the selected node:

SQL [Copy code to clipboard] Copy

```sql
SELECT Caption, CPULoad FROM Orion.Nodes WHERE Caption = '$node'
```
