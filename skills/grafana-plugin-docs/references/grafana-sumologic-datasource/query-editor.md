---
title: "Sumo Logic query editor | Grafana Enterprise Plugins documentation"
description: "Use the Sumo Logic query editor to build metrics and logs queries in Grafana."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Sumo Logic query editor

The Sumo Logic query editor lets you build and run metrics and logs queries against your Sumo Logic data. You can access the query editor from a dashboard panel by editing or adding a panel and selecting a Sumo Logic data source, or from the [Explore](/docs/grafana/latest/explore/) page for ad-hoc queries. For metrics, the editor offers both a visual Builder mode and a raw Code mode. For logs, you write queries using the Sumo Logic [Search Query Language](https://help.sumologic.com/docs/search/search-query-language/).

## Before you begin

- [Configure the Sumo Logic data source](/docs/plugins/grafana-sumologic-datasource/latest/configure/).
- Verify your access credentials have permissions to query your Sumo Logic data.

## Query types

The Sumo Logic query editor supports two query types, selectable using a radio button at the top of the editor:

- **Metrics:** Query time-series metrics data using the visual query builder or a raw query editor.
- **Logs:** Query log data using the Sumo Logic Search Query Language.

## Metrics queries

Metrics queries return time-series data from the Sumo Logic Metrics API. When you select **Metrics** as the query type, the editor displays the following controls.

### Query Mode

Use the **Query Mode** radio button to switch between **Builder** and **Code** mode:

- **Builder:** A visual interface for constructing metrics queries without writing raw query syntax.
- **Code:** A raw text editor for writing Sumo Logic metrics queries directly.

### Rollup and quantization

The **Rollup** and **Quantization** settings appear on the same row and apply to both Builder and Code mode.

Expand table

| Setting          | Description                                                                                                                                            |
|------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Rollup**       | The aggregation function Sumo Logic uses when quantizing metrics. Options: **Avg**, **Sum**, **Min**, **Max**, **Count**, **None**. Default: **None**. |
| **Quantization** | The time bucket size in milliseconds for data aggregation. Set to `0` or leave empty to use automatic quantization.                                    |

### Builder mode

In Builder mode, you construct a query by selecting a metric, adding filters, and chaining operators.

#### Metric

Select a metric from the **Metric** drop-down. The drop-down is searchable and populates with available metrics from your Sumo Logic account based on the current dashboard time range.

#### Filters

Add filters to narrow your query to specific dimensions. Each filter has three components:

Expand table

| Component     | Description                                                                                         |
|---------------|-----------------------------------------------------------------------------------------------------|
| **Dimension** | The metric dimension to filter on. Options populate based on the selected metric.                   |
| **Eval**      | The comparison type. Use **equals** (`=`) for a single value or **in** (`=()`) for multiple values. |
| **Value**     | The dimension value to match. When using **in**, you can select multiple values.                    |

Click the **+** button to add a filter, or the **x** button to remove one. You can add multiple filters to a single query.

#### Operators

Add operators to transform, aggregate, or filter your metrics data. Click the **+** button to add an operator. Each operator type has different configuration options.

The following table describes the available operators and their options.

Expand table

| Operator                                                  | Description                                          | Options                                                                                                  |
|-----------------------------------------------------------|------------------------------------------------------|----------------------------------------------------------------------------------------------------------|
| **avg**, **sum**, **min**, **max**, **count**, **stddev** | Aggregate values across time series.                 | **by** with a list of dimensions to group by.                                                            |
| **topk**, **bottomk**                                     | Return the top or bottom *k* time series.            | A numeric value for *k* and an aggregation function (avg, min, max, sum, count, latest).                 |
| **delta**                                                 | Calculate the difference between consecutive points. | Mode: all, increasing, decreasing, or counter.                                                           |
| **rate**                                                  | Calculate the per-second rate of change.             | Mode: all, increasing, decreasing, or counter, plus a numeric value.                                     |
| **fillmissing**                                           | Fill gaps in time series data.                       | Mode: empty, last, interpolation, or fixed. For fixed, specify a fill value.                             |
| **ewma**                                                  | Exponentially weighted moving average.               | Mode: span or alpha, plus a numeric value.                                                               |
| **eval**, **parse**                                       | Apply a custom expression or parse rule.             | A raw expression string.                                                                                 |
| **filter**, **where**                                     | Filter time series by a condition.                   | An aggregation function, a comparison operator (`<`, `<=`, `>`, `>=`, `=`, `!=`), and a threshold value. |
| **histogram\_quantile**                                   | Compute a histogram quantile.                        | A numeric quantile value (for example, `0.95`).                                                          |
| **timeshift**                                             | Shift the time range of the query.                   | A time offset value (for example, `1h`).                                                                 |
| **percentile**                                            | Calculate a percentile across time series.           | A numeric percentile value and a list of dimensions.                                                     |
| **predict**                                               | Forecast future values.                              | Model type: linear or ar. Forecast window and optional ar.window parameter.                              |
| **quantize**                                              | Bucket time series into fixed intervals.             | A time interval value and a rollup function.                                                             |
| **accum**                                                 | Calculate a running cumulative sum.                  | None.                                                                                                    |

### Code mode

In Code mode, the editor displays a raw text area where you write Sumo Logic metrics queries directly. The default query is `* | count by metric`.

Metrics queries use a pipe-delimited syntax where you specify a metric selector, then chain operators:

SQL [Copy code to clipboard] Copy

```sql
metric=cpu_idle department=sales | avg by host
```

For more information about metrics query syntax, refer to the [Sumo Logic metrics queries documentation](https://help.sumologic.com/docs/metrics/metrics-queries/metrics-queries-classic/).

### Metrics query examples

The following examples demonstrate common query patterns. You can use these in either Builder or Code mode.

#### Basic aggregation

Average CPU idle time grouped by host:

SQL [Copy code to clipboard] Copy

```sql
metric=cpu_idle | avg by host
```

Total request count across all services:

SQL [Copy code to clipboard] Copy

```sql
metric=http_requests | sum by service
```

Maximum memory usage per host:

SQL [Copy code to clipboard] Copy

```sql
metric=mem_used_percent | max by host
```

Standard deviation of response times to detect variability:

SQL [Copy code to clipboard] Copy

```sql
metric=http_response_time | stddev by service
```

#### Filter and aggregate

Filter by a specific department:

SQL [Copy code to clipboard] Copy

```sql
metric=cpu_idle department=sales | avg by host
```

Filter by multiple hosts using the `in` operator:

SQL [Copy code to clipboard] Copy

```sql
metric=cpu_idle host=(web-01,web-02,web-03) | avg
```

#### Top-k and bottom-k

Return the top 5 hosts by memory usage:

SQL [Copy code to clipboard] Copy

```sql
metric=mem_used | topk(5, avg) by host
```

Return the 3 least active services:

SQL [Copy code to clipboard] Copy

```sql
metric=http_requests | bottomk(3, sum) by service
```

#### Rates and deltas

Calculate the per-second rate of incoming bytes:

SQL [Copy code to clipboard] Copy

```sql
metric=net_bytes_recv | rate increasing
```

Calculate the change in disk usage between consecutive data points:

SQL [Copy code to clipboard] Copy

```sql
metric=disk_used | delta
```

#### Smoothing and gap filling

Fill missing data points with the last known value:

SQL [Copy code to clipboard] Copy

```sql
metric=cpu_idle | avg by host | fillmissing last
```

Apply exponentially weighted moving average to smooth noisy data:

SQL [Copy code to clipboard] Copy

```sql
metric=http_response_time | avg by service | ewma span 10
```

#### Percentile and quantile

Calculate the 95th percentile of request latency:

SQL [Copy code to clipboard] Copy

```sql
metric=http_request_duration | pct(95) by service
```

#### Time comparison and forecasting

Compare current values to the same time yesterday:

SQL [Copy code to clipboard] Copy

```sql
metric=cpu_idle | avg by host | timeshift 1d
```

Forecast future values using a linear model:

SQL [Copy code to clipboard] Copy

```sql
metric=disk_used_percent | avg by host | predict linear 24h
```

#### Filtering results

Keep only time series where the average value exceeds a threshold:

SQL [Copy code to clipboard] Copy

```sql
metric=cpu_idle | filter avg > 90
```

Filter using the current value:

SQL [Copy code to clipboard] Copy

```sql
metric=http_response_time | avg by service | where _value > 500
```

#### Chaining operators

Chain multiple operators for complex analysis. Calculate the rate of errors, fill gaps, then smooth with EWMA:

SQL [Copy code to clipboard] Copy

```sql
metric=http_errors | rate increasing | fillmissing 0 | ewma span 5
```

Aggregate by host, calculate the running cumulative sum:

SQL [Copy code to clipboard] Copy

```sql
metric=http_requests | sum by host | accum
```

## Logs queries

Logs queries use the Sumo Logic Search Query Language to search and analyze log data. The query editor provides a code editor for writing raw log queries. The default query is `_index=*`.

### Fetch histogram data

Enable the **Fetch histogram data** toggle to retrieve histogram bucket data showing the distribution of log events over time. When this toggle is enabled, log messages and records aren’t returned – only the histogram data is included in the response.

### Logs query examples

#### Basic searches

Search all logs in a specific index:

SQL [Copy code to clipboard] Copy

```sql
_index=my_index
```

Search for error messages from a specific source:

SQL [Copy code to clipboard] Copy

```sql
_sourceCategory=prod/app "ERROR"
```

Search across all sources for a specific error message:

SQL [Copy code to clipboard] Copy

```sql
"OutOfMemoryError" OR "heap space"
```

#### Aggregation

Count errors by source host:

SQL [Copy code to clipboard] Copy

```sql
_sourceCategory=prod/app error | count by _sourceHost
```

Count 5xx HTTP errors by status code and host:

SQL [Copy code to clipboard] Copy

```sql
_sourceCategory=prod/web status_code >= 500 | count by status_code, _sourceHost
```

Calculate average response time from parsed fields:

SQL [Copy code to clipboard] Copy

```sql
_sourceCategory=prod/api | parse "duration=*ms" as duration | avg(duration) by _sourceHost
```

Find the minimum and maximum response times:

SQL [Copy code to clipboard] Copy

```sql
_sourceCategory=prod/api | parse "duration=*ms" as duration | min(duration), max(duration) by endpoint
```

Sum total bytes transferred:

SQL [Copy code to clipboard] Copy

```sql
_sourceCategory=prod/web | parse "bytes=*" as bytes | sum(bytes) by _sourceHost
```

#### Parsing and analysis

Parse structured log fields and count:

SQL [Copy code to clipboard] Copy

```sql
_sourceCategory=prod/api | parse "method=* url=* status=*" as method, url, status | count by method, status
```

Find the top 10 slowest API endpoints:

SQL [Copy code to clipboard] Copy

```sql
_sourceCategory=prod/api | parse "duration=*ms" as duration | top 10 url by avg(duration)
```

#### Time-bucketed analysis

Use `timeslice` to create time-bucketed aggregations for time-series visualization:

SQL [Copy code to clipboard] Copy

```sql
_sourceCategory=prod/app error | timeslice 5m | count by _timeslice
```

Track error rate over time by severity:

SQL [Copy code to clipboard] Copy

```sql
_sourceCategory=prod/app | parse "level=*" as level | where level in ("ERROR", "FATAL") | timeslice 1m | count by _timeslice, level
```

#### Sorting and limiting

Sort results by count in descending order:

SQL [Copy code to clipboard] Copy

```sql
_sourceCategory=prod/app error | count by _sourceHost | sort by _count desc
```

For complete query syntax documentation, refer to the [Sumo Logic Search Query Language](https://help.sumologic.com/docs/search/search-query-language/).

## Use Explore

You can use [Explore](/docs/grafana/latest/explore/) to run ad-hoc metrics and logs queries without creating a dashboard. Explore is useful for debugging queries, investigating issues, and exploring your data.

For more information about working with logs in Explore, refer to [Explore logs](/docs/grafana/latest/explore/logs-integration/).
