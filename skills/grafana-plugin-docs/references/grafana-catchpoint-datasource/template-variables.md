---
title: "Catchpoint template variables | Grafana Enterprise Plugins documentation"
description: "Use template variables with the Catchpoint data source to build dynamic, reusable Grafana dashboards."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Catchpoint template variables

Use template variables to create dynamic, reusable dashboards that aren’t tied to a specific Catchpoint test, site, or SLO.

## Before you begin

- [Configure the Catchpoint data source](/docs/plugins/grafana-catchpoint-datasource/latest/configure/).
- Understand [Grafana template variables](/docs/grafana/latest/dashboards/variables/).

## Supported variable types

The Catchpoint data source supports the following variable types:

Expand table

| Variable type | Supported |
|---------------|-----------|
| Query         | Yes       |
| Custom        | Yes       |
| Data source   | Yes       |

## Create a query variable

To create a query variable:

1. Navigate to **Dashboard settings** &gt; **Variables**.
2. Click **Add variable**.
3. Select **Query** as the variable type.
4. Select the Catchpoint data source.
5. Configure the query to return the values you want, such as a list of SLOs.

## Query examples

A query variable uses the same **Action** selector as the [query editor](/docs/plugins/grafana-catchpoint-datasource/latest/query-editor/). The **SLO list** query is the most useful source for a variable because it returns a clean list of SLOs rather than time series data. The values are loaded from your Catchpoint account, so what you see depends on the SLOs configured there.

### Populate a variable with SLOs

This variable query returns the SLOs configured in your Catchpoint account.

Expand table

| Field      | Value    |
|------------|----------|
| **Action** | SLO list |

After you select the values, the variable’s drop-down lists your SLOs, which you can then reference in an SLO Status query.

## Use variables in queries

After you create a variable, reference it in your Catchpoint queries using [variable syntax](/docs/grafana/latest/dashboards/variables/variable-syntax/). For example, create an SLO variable named `slo` and reference it in the **SLO** field of an SLO Status query:

text [Copy code to clipboard] Copy

```text
$slo
```

This lets you switch the visualized SLO from a dashboard drop-down without editing the panel.

## Next steps

- [Catchpoint query editor](/docs/plugins/grafana-catchpoint-datasource/latest/query-editor/)
- [Troubleshooting](/docs/plugins/grafana-catchpoint-datasource/latest/troubleshooting/)
