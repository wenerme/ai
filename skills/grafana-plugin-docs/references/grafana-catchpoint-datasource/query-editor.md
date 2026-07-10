---
title: "Catchpoint query editor | Grafana Enterprise Plugins documentation"
description: "Use the Catchpoint query editor to build Tests, RUM, and SLO queries in Grafana."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Catchpoint query editor

This document explains how to use the Catchpoint query editor to build queries against your Catchpoint data.

## Before you begin

- Ensure you’ve [configured the Catchpoint data source](/docs/plugins/grafana-catchpoint-datasource/latest/configure/).
- Verify your Catchpoint REST API v2 key has access to the tests, sites, and SLOs you want to query.

## Key concepts

If you’re new to Catchpoint, these terms are used throughout the query editor:

Expand table

| Term           | Description                                                                       |
|----------------|-----------------------------------------------------------------------------------|
| **Test**       | A synthetic monitoring check configured in Catchpoint.                            |
| **RUM site**   | A real user monitoring source identified by a site ID.                            |
| **SLO**        | A service level objective that tracks availability or test time against a target. |
| **Dimension**  | An attribute, such as node or country, used to group and break down results.      |
| **Metric**     | A measured value, such as response time or availability.                          |
| **Tracepoint** | A custom measurement point captured during a test or RUM session.                 |
| **Indicator**  | A RUM insight value used to segment data.                                         |
| **Zone type**  | A classification of measured content as self zone or third party zone.            |

## Query types

Select the query type with the **Action** selector. The query editor supports the following query types:

- **Tests Query:** Returns aggregated synthetic test data.
- **RUM Query:** Returns real user monitoring data for one or more sites.
- **SLO list:** Returns the list of configured SLOs.
- **SLO Status:** Returns SLO compliance based on violations over the selected time range.

The start and end times for time series queries are set automatically from the dashboard time range.

## Create a Tests query

A Tests query returns aggregated data for one or more synthetic tests.

To create a Tests query:

1. Select the **Catchpoint** data source.
2. Select **Tests Query** from the **Action** selector.
3. Select a test and set any optional parameters.

Expand table

| Field                    | Description                                                                                         |
|--------------------------|-----------------------------------------------------------------------------------------------------|
| **Test**                 | Required. The test to query.                                                                        |
| **Sub Source Type**      | The sub source types to include.                                                                    |
| **Time Interval**        | The aggregation window. The default is 5m for ranges under 6h and 15m for longer ranges.            |
| **Dimensions**           | The dimensions used to group and break down the data.                                               |
| **Metrics**              | The metrics to return. All metrics are returned if no value is set.                                 |
| **Tracepoints**          | The tracepoints to include.                                                                         |
| **Zone Types**           | The zone types to include, such as **Self Zone** or **Third Party Zone**.                           |
| **Availability Filters** | Filters runs by outcome, such as **Only Failures**, **Only Successes**, **All**, or SLA categories. |
| **Verify On Error**      | Includes verify-on-error runs. The default is `false`.                                              |

## Create a RUM query

A RUM query returns real user monitoring data for one or more sites.

To create a RUM query:

1. Select the **Catchpoint** data source.
2. Select **RUM Query** from the **Action** selector.
3. Enter one or more site IDs and set any optional parameters.

Expand table

| Field               | Description                                                                                                          |
|---------------------|----------------------------------------------------------------------------------------------------------------------|
| **Site IDs**        | Required. The RUM site IDs to query. Find Site IDs in the Catchpoint platform under **Control Center** &gt; **RUM**. |
| **Sub Source Type** | The sub source type to return, such as **Provider**, **Ajax**, or **Zone**.                                          |
| **Time Interval**   | The aggregation window.                                                                                              |
| **Dimensions**      | The dimensions used to group and break down the data.                                                                |
| **Metrics**         | The metrics to return. Default metrics for the sub source type are returned if no value is set.                      |
| **Tracepoints**     | The tracepoints to include.                                                                                          |
| **Indicators**      | The indicators to include.                                                                                           |
| **Zone Types**      | The zone types to include, such as **Self Zone** or **Third Party Zone**.                                            |

## Create an SLO list query

An SLO list query returns the SLOs configured in your Catchpoint account. This query takes no parameters and is useful for discovery and for populating template variables.

To create an SLO list query:

1. Select the **Catchpoint** data source.
2. Select **SLO list** from the **Action** selector.

## Create an SLO status query

An SLO status query returns SLO compliance for the selected time range, calculated from violations.

To create an SLO status query:

1. Select the **Catchpoint** data source.
2. Select **SLO Status** from the **Action** selector.
3. Select one or more SLOs and set any optional parameters.

Expand table

| Field           | Description                                                                   |
|-----------------|-------------------------------------------------------------------------------|
| **SLO**         | Required. The SLOs to evaluate.                                               |
| **Metric Type** | The SLO metric, either **Availability** or **Test Time**.                     |
| **Status Type** | The SLO status, either **Active** or **Inactive**. The default is **Active**. |

## Query examples

The following examples show how to configure each query type field by field. Set only the fields listed; leave the rest at their defaults. The available tests, sites, metrics, and dimensions are loaded from your Catchpoint account, so the exact names you see may differ from these examples.

### Chart availability for a single test

This Tests query returns the availability metric for one test, aggregated in 5-minute windows.

Expand table

| Field             | Value                         |
|-------------------|-------------------------------|
| **Action**        | Tests Query                   |
| **Test**          | Your production homepage test |
| **Metrics**       | Availability                  |
| **Time Interval** | 5m                            |

### Break down test response time by country

This Tests query compares response time across the countries where your test runs.

Expand table

| Field          | Value                         |
|----------------|-------------------------------|
| **Action**     | Tests Query                   |
| **Test**       | Your production homepage test |
| **Metrics**    | Webpage Response              |
| **Dimensions** | Country                       |

### Compare RUM page load time across providers

This RUM query returns page load time for a site, broken down by provider.

Expand table

| Field               | Value            |
|---------------------|------------------|
| **Action**          | RUM Query        |
| **Site IDs**        | Your RUM site ID |
| **Sub Source Type** | Provider         |
| **Metrics**         | Page Load Time   |

### Show current SLO compliance

This SLO Status query returns availability compliance for the selected SLOs over the dashboard time range.

Expand table

| Field           | Value            |
|-----------------|------------------|
| **Action**      | SLO Status       |
| **SLO**         | One or more SLOs |
| **Metric Type** | Availability     |
| **Status Type** | Active           |

## Use cases

The following scenarios show common ways to use the Catchpoint query editor:

- **Monitor synthetic availability:** Use a Tests query with the **Availability Filters** set to **Only Failures** to surface failing runs across your tests.
- **Analyze real user performance by region:** Use a RUM query with a geography dimension to break down performance across countries or regions.
- **Track SLO compliance:** Use an SLO Status query to visualize current compliance against your availability or test time objectives.

## Known limitations

Due to a limitation of the Catchpoint API, you can’t filter by specific dimension values in a Tests query. When you select a dimension, the data for all of its values is returned.

## Next steps

- [Template variables](/docs/plugins/grafana-catchpoint-datasource/latest/template-variables/)
- [Alerting](/docs/plugins/grafana-catchpoint-datasource/latest/alerting/)
- [Annotations](/docs/plugins/grafana-catchpoint-datasource/latest/annotations/)
- [Troubleshooting](/docs/plugins/grafana-catchpoint-datasource/latest/troubleshooting/)
