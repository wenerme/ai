---
title: "Splunk query editor | Grafana Enterprise Plugins documentation"
description: "Use the Splunk query editor to create and run SPL queries in Grafana."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Splunk query editor

The Splunk query editor lets you create and run queries using Splunk’s Search Processing Language (SPL) in two modes: **Search** mode and **Events** mode. If you’re getting started with SPL, refer to Splunk’s [Search reference](https://docs.splunk.com/Documentation/Splunk/latest/SearchReference/WhatsInThisManual) for guidance.

## Before you begin

- [Configure the Splunk data source](/docs/plugins/grafana-splunk-datasource/latest/configure/).
- Verify your Splunk credentials have appropriate permissions to run searches.

## Key concepts

If you’re new to Splunk, these terms are used throughout the query editor:

Expand table

| Term           | Description                                                                                             |
|----------------|---------------------------------------------------------------------------------------------------------|
| **SPL**        | Search Processing Language, the query language used by Splunk.                                          |
| **Index**      | A repository for Splunk data, similar to a database table.                                              |
| **Sourcetype** | A classification for data that determines how it is formatted and parsed.                               |
| **Timechart**  | An SPL command that generates a statistical aggregation over time, used for time-series visualizations. |
| **mstats**     | An SPL command for querying Splunk metrics data, introduced in Splunk 7.x.                              |
| **Namespace**  | A Splunk app context that determines which knowledge objects are available to a query.                  |

## Query modes

The query editor supports two modes:

- **[Search mode](#search-mode):** For metrics and time-series queries. Supports both raw SPL and a visual query builder.
- **[Events mode](#events-mode):** For log and annotation queries. Supports raw SPL only.

## Search mode

Search mode provides two editing experiences: a raw SPL editor and a visual query builder.

### Raw SPL editor

The following options are available in the raw SPL editor:

Expand table

| Field            | Description                                                                                                                                                                                       |
|------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Search**       | Enter the Splunk search query using SPL.                                                                                                                                                          |
| **Namespace**    | Select the Splunk app context for the query. Refer to the [Splunk REST API User Manual](https://docs.splunk.com/Documentation/Splunk/latest/RESTUM/RESTusing) for more information on namespaces. |
| **Sample ratio** | Set a sampling ratio to reduce the volume of data processed. Options: `1:10`, `1:100`, `1:1,000`, `1:10,000`, `1:100,000`.                                                                        |
| **Limit**        | Adds `limit=value` to timechart parameters.                                                                                                                                                       |

The SPL editor includes autocomplete that provides suggestions from Splunk’s typeahead API, Grafana template variables, and built-in SPL commands.

Search query example:

spl [Copy code to clipboard] Copy

```spl
index=sales_data_index action=purchase | stats sum(bytes) BY host
```

### Visual query builder

Click the pencil icon in the upper right of the query editor to toggle the visual query builder. The builder generates SPL automatically based on your selections.

[The visual query builder for Search mode](/media/docs/splunk/search-mode-create-query-v10.2.png)

The visual query builder provides the following options:

Expand table

| Field           | Description                                                                                                                                                                        |
|-----------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Index**       | Select an index from the drop-down list.                                                                                                                                           |
| **Source Type** | Select a sourcetype from the drop-down list.                                                                                                                                       |
| **Namespace**   | Select the Splunk app context.                                                                                                                                                     |
| **Metric**      | Add one or more metric aggregations. Select a function and field, and optionally set an alias. The default function is `avg`.                                                      |
| **Split by**    | Select one or more fields to split results by. Supports template variables.                                                                                                        |
| **Where**       | Add a where clause to filter results (available when using one split-by field and one metric aggregation).                                                                         |
| **Span**        | Set the time span for the query. Options: `auto`, `10s`, `1m`, `10m`, `1h`, `12h`, `1d`, `7d`, `1mon`. Default: `auto`.                                                            |
| **Limit**       | Adds `limit=value` to timechart parameters. Accepts positive or negative integers.                                                                                                 |
| **Useother**    | Add a series for data not included in graphs because it doesn’t meet the `where` clause criteria. Default: on.                                                                     |
| **Usenull**     | Toggle on to create a series for events that don’t contain the split-by field. Default: off.                                                                                       |
| **Continuous**  | Fill time gaps in the chart. Default: on.                                                                                                                                          |
| **Partial**     | Retain partial time bins (first and last bins only). Default: on.                                                                                                                  |
| **Bins**        | Set the number of histogram bins. Default: `100`. Refer to [Splunk’s bin reference](https://docs.splunk.com/Documentation/Splunk/latest/SearchReference/Bin) for more information. |

#### Aggregation functions

The visual builder supports the following aggregation functions:

**Statistical:** `avg`, `count`, `distinct_count`, `estdc`, `estdc_error`, `max`, `mean`, `median`, `min`, `mode`, `perc95`, `range`, `stdev`, `stdevp`, `sum`, `sumsq`, `var`, `varp`

**Event ordering:** `earliest`, `first`, `last`, `latest`

## Events mode

Events mode is designed for log and annotation queries. Unlike Search mode, Events mode doesn’t include a visual query builder.

The following options are available:

Expand table

| Field                    | Description                                                                                                                                                                                            |
|--------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Search**               | Enter the Splunk search query using SPL.                                                                                                                                                               |
| **Event field as text**  | Specify a field to use as annotation text. Default: `_raw`.                                                                                                                                            |
| **Regex**                | Extract part of a message using a regular expression.                                                                                                                                                  |
| **Or Splunk alert name** | Specify an alert name to retrieve fired alerts, or leave blank to get all fired alerts. Supports template variables. Use this instead of the **Search** field to display Splunk alerts as annotations. |

Example event search query:

spl [Copy code to clipboard] Copy

```spl
index=os sourcetype=iostat | where total_ops > 400
index=os sourcetype=iostat | where total_ops > $io_threshold
```

Example using **Event field as text** with **Regex**:

text [Copy code to clipboard] Copy

```text
Event field as text: _raw
Regex: WirelessRadioManagerd\[\d*\]: (.*)
```

## View As (Explore only)

When using the query editor in Explore, the **View As** selector lets you control how results are displayed. This option isn’t available in the dashboard panel editor.

Expand table

| Option     | Description                                                                                   |
|------------|-----------------------------------------------------------------------------------------------|
| **Detect** | Automatically chooses the best visualization based on the query results. This is the default. |
| **Graph**  | Displays results as a time-series graph.                                                      |
| **Logs**   | Displays results in log format.                                                               |
| **Table**  | Displays results in a table.                                                                  |

## Common options

The following options are available in both query modes.

### Add queries

Click **+ Add query** to add multiple queries in the query editor.

### Query history

The query editor keeps a history of your Splunk queries:

- **Query history:** Displays your recent queries. Queries are kept for two weeks unless starred. The editor shows 100 queries at a time and is paginated, with an overall limit of 200,000 records.
- **Starred:** Starred queries are kept beyond the two-week limit.
- **Settings:** Toggle to change the default active tab from “Query history” to “Starred”.

### Query inspector

Click **Query inspector** to view detailed statistics about your query, including query statistics under **Stats**, request response time under **Query**, data frame details under **{} JSON**, and the shape of your data under **Data**.

## Work with Splunk data

The following sections describe additional commands and options for working with Splunk data in the query editor.

### Timechart

Use the `timechart` command to generate a statistical aggregation table from time-series data. Refer to the [timechart command overview](https://docs.splunk.com/Documentation/SCS/current/SearchReference/timechartcommandoverview#How_the_timechart_command_works) and [timechart reference](https://docs.splunk.com/Documentation/Splunk/latest/SearchReference/timechart) in Splunk’s documentation.

Example:

spl [Copy code to clipboard] Copy

```spl
index=os sourcetype=cpu | timechart span=1m avg(pctSystem) as system, avg(pctUser) as user, avg(pctIowait) as iowait
index=os sourcetype=ps | timechart span=1m limit=5 useother=false avg(cpu_load_percent) by process_name
```

### Splunk metrics and `mstats`

Starting with version 7.x, Splunk introduced the `mstats` command for analyzing metrics, which you combine with the `timechart` command. You must also set the `prestats=t` option as shown in the following example:

text [Copy code to clipboard] Copy

```text
Current syntax:
| mstats prestats=t avg(disk.disk_ops.read) avg(disk.disk_ops.write) WHERE index="collectd" by metric_name span=1m
| timechart avg(disk.disk_ops.read) avg(disk.disk_ops.write) span=1m

Deprecated syntax:
| mstats prestats=t avg(_value) AS Value WHERE index="collectd" metric_name="disk.disk_ops.read" OR metric_name="disk.disk_ops.write" by metric_name span=1m
| timechart avg(_value) span=1m by metric_name
```

For more information about the `mstats` command, refer to Splunk’s [mstats](https://docs.splunk.com/Documentation/Splunk/latest/SearchReference/Mstats) documentation.

### Result format

The data source automatically determines the result format based on the Splunk response:

- **Time series:** When the response contains date fields, results are formatted as time-series data suitable for graph visualizations.
- **Logs:** When the response contains a `_raw` field, results are formatted as log data.
- **Table:** When using the `stats` command or returning raw events with `fields`, results are formatted as tabular data similar to the **Statistics** tab in Splunk UI.

You can override the automatic detection using the **View As** selector in Explore mode.

Table query examples:

spl [Copy code to clipboard] Copy

```spl
index="_internal" sourcetype="scheduler" | fields host, source
```

spl [Copy code to clipboard] Copy

```spl
index="_internal" sourcetype="splunkd_access" | stats avg(bytes) as bytes, avg(file) as file by status
```

Refer to the [stats command reference](https://docs.splunk.com/Documentation/Splunk/latest/SearchReference/Stats) in Splunk’s documentation for more information.

### Common query examples

The following examples demonstrate common use cases for Splunk queries in Grafana.

**Monitor error rates over time:**

spl [Copy code to clipboard] Copy

```spl
index=main log_level=ERROR | timechart span=5m count as error_count
```

**Track system CPU usage:**

spl [Copy code to clipboard] Copy

```spl
index=os sourcetype=cpu | timechart span=1m avg(pctSystem) as system, avg(pctUser) as user
```

**View top sourcetypes by event volume:**

spl [Copy code to clipboard] Copy

```spl
index=* | stats count by sourcetype | sort -count | head 10
```

**Search logs for a specific error pattern:**

spl [Copy code to clipboard] Copy

```spl
index=main sourcetype=application "connection refused" OR "timeout" | fields _time, host, _raw
```

**Monitor Splunk indexing throughput:**

spl [Copy code to clipboard] Copy

```spl
index=_internal sourcetype=splunkd group=thruput | timechart span=1m sum(kb) as throughput_kb
```

### Annotations

You can use Splunk queries and fired alerts as annotations on Grafana graphs. For setup instructions, refer to [Splunk annotations](/docs/plugins/grafana-splunk-datasource/latest/annotations/).

### Import queries from other data sources

The Splunk query editor can import queries from Prometheus and Loki data sources. This converts label selectors into SPL format, making it easier to migrate existing queries to Splunk.

## Next steps

- [Template variables](/docs/plugins/grafana-splunk-datasource/latest/template-variables/): Create dynamic dashboards with drop-down filters.
- [Annotations](/docs/plugins/grafana-splunk-datasource/latest/annotations/): Overlay Splunk events and alerts on graphs.
- [Alerting](/docs/plugins/grafana-splunk-datasource/latest/alerting/): Set up alert rules based on Splunk queries.
- [Troubleshooting](/docs/plugins/grafana-splunk-datasource/latest/troubleshooting/): Solutions for common query issues.
