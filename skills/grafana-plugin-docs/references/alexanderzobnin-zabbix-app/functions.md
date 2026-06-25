---
title: "Zabbix functions reference | Grafana Plugins documentation"
description: "Reference for all data processing functions available in the Zabbix data source query editor."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Zabbix functions reference

Functions let you transform, aggregate, and manipulate time series data returned by Zabbix queries. Add functions to a query by clicking the **+** button next to the query row in the query editor.

## Built-in variables

The following built-in variables are available for use as function parameters:

Expand table

| Variable          | Description                                       |
|-------------------|---------------------------------------------------|
| `$__range_ms`     | Panel time range in milliseconds.                 |
| `$__range_s`      | Panel time range in seconds.                      |
| `$__range`        | Panel time range as a string (`30s`, `1m`, `1h`). |
| `$__range_series` | Invokes the function over all series values.      |

[Copy code to clipboard] Copy

```none
groupBy($__range, avg)
percentile($__range_series, 95)
```

## Transform functions

Transform functions operate on each individual time series.

### groupBy

[Copy code to clipboard] Copy

```none
groupBy(interval, function)
```

Consolidates points within each `interval` into a single point using the specified `function`. Supported functions: `avg`, `min`, `max`, `sum`, `count`, `median`, `first`, `last`.

[Copy code to clipboard] Copy

```none
groupBy(10m, avg)
groupBy(1h, median)
```

### scale

[Copy code to clipboard] Copy

```none
scale(factor)
```

Multiplies each data point by `factor`.

[Copy code to clipboard] Copy

```none
scale(100)
scale(0.01)
```

### offset

[Copy code to clipboard] Copy

```none
offset(value)
```

Adds `value` to each data point.

### delta

[Copy code to clipboard] Copy

```none
delta()
```

Calculates the difference between consecutive values. For per-second rate calculations, use `rate()` instead.

### rate

[Copy code to clipboard] Copy

```none
rate()
```

Calculates the per-second rate of increase. Resistant to counter resets, making it suitable for converting growing counters into per-second rates.

### movingAverage

[Copy code to clipboard] Copy

```none
movingAverage(windowSize)
```

Calculates a moving average over a fixed number of past points specified by `windowSize`.

[Copy code to clipboard] Copy

```none
movingAverage(60)
```

If the metric has 1-second resolution, a window size of 60 corresponds to a 1-minute window.

### exponentialMovingAverage

[Copy code to clipboard] Copy

```none
exponentialMovingAverage(windowSize)
```

Calculates an exponential moving average (EMA) using the formula:

\[ \\text{ema}(current) = constant \\times currentValue + (1 - constant) \\times \\text{ema}(previous) ]

Where `constant = 2 / (windowSize + 1)`.

If `windowSize` is less than 1 (for example, `0.1`), the constant is set directly to `windowSize` rather than being calculated.

> Note
>
> The first N points (where N equals the window size) use an approximation. The plugin assumes previous N points have the same average as the first N points rather than fetching additional historical data. Don’t rely on the accuracy of the first N data points.

[Copy code to clipboard] Copy

```none
exponentialMovingAverage(60)
```

### percentile

[Copy code to clipboard] Copy

```none
percentile(interval, N)
```

Consolidates points within each `interval` into a single point at the Nth percentile.

[Copy code to clipboard] Copy

```none
percentile(1h, 99)
percentile($__range_series, 95)
```

### removeAboveValue

[Copy code to clipboard] Copy

```none
removeAboveValue(N)
```

Replaces data points with `null` if the value is greater than `N`.

[Copy code to clipboard] Copy

```none
removeAboveValue(100)
```

### removeBelowValue

[Copy code to clipboard] Copy

```none
removeBelowValue(N)
```

Replaces data points with `null` if the value is less than `N`.

[Copy code to clipboard] Copy

```none
removeBelowValue(0)
```

### transformNull

[Copy code to clipboard] Copy

```none
transformNull(N)
```

Replaces `null` values with `N`.

[Copy code to clipboard] Copy

```none
transformNull(0)
```

## Aggregate functions

Aggregate functions combine multiple time series into one.

### aggregateBy

[Copy code to clipboard] Copy

```none
aggregateBy(interval, function)
```

Combines all time series by consolidating points within each `interval` using the specified `function`. Supported functions: `avg`, `min`, `max`, `sum`, `count`, `median`, `first`, `last`.

[Copy code to clipboard] Copy

```none
aggregateBy(10m, avg)
aggregateBy(1h, median)
```

### sumSeries

[Copy code to clipboard] Copy

```none
sumSeries()
```

Adds all time series together, returning the sum at each data point. This function requires interpolation of each time series, which may cause high CPU load. Combine with `groupBy()` to reduce load.

### percentileAgg

[Copy code to clipboard] Copy

```none
percentileAgg(interval, N)
```

Combines all time series by consolidating points within each `interval` at the Nth percentile.

[Copy code to clipboard] Copy

```none
percentileAgg(1h, 99)
percentileAgg($__range_series, 95)
```

### average (deprecated)

[Copy code to clipboard] Copy

```none
average(interval)
```

> Caution
>
> Deprecated. Use `aggregateBy(interval, avg)` instead.

### min (deprecated)

[Copy code to clipboard] Copy

```none
min(interval)
```

> Caution
>
> Deprecated. Use `aggregateBy(interval, min)` instead.

### max (deprecated)

[Copy code to clipboard] Copy

```none
max(interval)
```

> Caution
>
> Deprecated. Use `aggregateBy(interval, max)` instead.

## Filter functions

Filter functions reduce the number of time series returned.

### top

[Copy code to clipboard] Copy

```none
top(N, value)
```

Returns the top N series sorted by `value`. Supported values: `avg`, `min`, `max`, `sum`, `count`, `median`, `first`, `last`.

[Copy code to clipboard] Copy

```none
top(10, avg)
top(5, max)
```

### bottom

[Copy code to clipboard] Copy

```none
bottom(N, value)
```

Returns the bottom N series sorted by `value`. Supported values: `avg`, `min`, `max`, `sum`, `count`, `median`, `first`, `last`.

[Copy code to clipboard] Copy

```none
bottom(5, avg)
```

### sortSeries

[Copy code to clipboard] Copy

```none
sortSeries(direction)
```

Sorts multiple time series by name in the specified `direction`. Supported values: `asc`, `desc`.

[Copy code to clipboard] Copy

```none
sortSeries(asc)
sortSeries(desc)
```

## Trend functions

Trend functions control how trend data is returned.

### trendValue

[Copy code to clipboard] Copy

```none
trendValue(valueType)
```

Specifies which trend value Zabbix returns when querying trends data. Supported values: `avg`, `min`, `max`, `sum`, `count`.

## Time functions

Time functions shift data along the time axis.

### timeShift

[Copy code to clipboard] Copy

```none
timeShift(interval)
```

Shifts the time series by the specified `interval`. Without a sign or with a minus sign, the data shifts backward in time. With a plus sign, it shifts forward.

[Copy code to clipboard] Copy

```none
timeShift(24h)   -- shift back 24 hours
timeShift(-24h)  -- same as timeShift(24h)
timeShift(+1d)   -- shift forward 1 day
```

## Alias functions

Alias functions change the display names of time series. The following template variables are available in `setAlias()` and `replaceAlias()`:

Expand table

| Variable                          | Description                       |
|-----------------------------------|-----------------------------------|
| `$__zbx_item`, `$__zbx_item_name` | Item name.                        |
| `$__zbx_item_key`                 | Item key.                         |
| `$__zbx_item_interval`            | Item collection interval (delay). |
| `$__zbx_host_name`                | Visible name of the host.         |
| `$__zbx_host`                     | Technical name of the host.       |
| `$__zbx_host_id`                  | ID of the host.                   |

[Copy code to clipboard] Copy

```none
setAlias($__zbx_host_name: $__zbx_item)       -- backend01: CPU user time
setAlias(Item key: $__zbx_item_key)            -- Item key: system.cpu.load[percpu,avg1]
```

### setAlias

[Copy code to clipboard] Copy

```none
setAlias(alias)
```

Replaces the metric name with the given `alias`.

[Copy code to clipboard] Copy

```none
setAlias(load)
```

### setAliasByRegex

[Copy code to clipboard] Copy

```none
setAliasByRegex(regex)
```

Returns the part of the metric name that matches the `regex`.

[Copy code to clipboard] Copy

```none
setAliasByRegex(Zabbix busy [a-zA-Z]+)
```

### replaceAlias

[Copy code to clipboard] Copy

```none
replaceAlias(pattern, newAlias)
```

Replaces parts of the metric name using `pattern` (a regex or plain string). When using regex, the following replacement patterns are supported:

Expand table

| Pattern | Inserts                                                |
|---------|--------------------------------------------------------|
| `$$`    | A literal `$`.                                         |
| `$&`    | The matched substring.                                 |
| ``$` `` | The portion of the string before the match.            |
| `$'`    | The portion of the string after the match.             |
| `$n`    | The nth parenthesized capture group (where n is 0-99). |

For more details, refer to [String.prototype.replace()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace).

[Copy code to clipboard] Copy

```none
-- Given: "CPU system time"
replaceAlias(/CPU (.*) time/, $1)                    -- system

-- Given: "backend01: CPU system time"
replaceAlias(/CPU (.*) time/, $1)                    -- backend01: system
replaceAlias(/.*CPU (.*) time/, $1)                  -- system
replaceAlias(/(.*): CPU (.*) time/, $1 - $2)         -- backend01 - system
```

> Note
>
> Grafana dashboard transforms such as “Join by label” are applied to raw query data and override alias functions. If this causes issues, use [Rename by regex](/docs/grafana/latest/panels-visualizations/query-transform-data/transform-data/#rename-by-regex) or [Value mappings with regex](/docs/grafana/latest/panels-visualizations/configure-value-mappings/#regex) instead.

## Special functions

### consolidateBy

[Copy code to clipboard] Copy

```none
consolidateBy(consolidationFunc)
```

Changes the consolidation function used when the number of data points exceeds the graph width in pixels. By default, the plugin uses `avg`. Valid values: `sum`, `avg`, `min`, `max`, `count`.

When using [Direct DB Connection](./configure/#configure-direct-db-connection), this function directly controls the SQL aggregation function. Pair it with `groupBy` for accurate results:

[Copy code to clipboard] Copy

```none
consolidateBy(max) | groupBy(1h, max)
```
