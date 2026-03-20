---
title: 'Analysis functions - Time-series'
description: 'Functions for analyzing time-series data in ClickHouse.'
keywords: ['time-series', 'analysis functions', 'window functions', 'aggregation functions', 'moving averages', 'trend analysis']
show_related_blogs: true
doc_type: 'reference'
---

# Time-series analysis functions

Time series analysis in ClickHouse can be performed using standard SQL aggregation and window functions. 
When working with time series data, you'll typically encounter three main types of metrics:

* Counter metrics that monotonically increase over time (like page views or total events)
* Gauge metrics that represent point-in-time measurements that can go up and down (like CPU usage or temperature)
* Histograms that sample observations and count them in buckets (like request durations or response sizes)

Common analysis patterns for these metrics include comparing values between periods, calculating cumulative totals, determining rates of change, and analyzing distributions. 
These can all be achieved through combinations of aggregations, window functions like `sum() OVER`, and specialized functions like `histogram()`.

## Period-over-period changes {#time-series-period-over-period-changes}

When analyzing time series data, we often need to understand how values change between time periods. 
This is essential for both gauge and counter metrics. 
The [`lagInFrame`](/docs/sql-reference/window-functions/lagInFrame) window function lets us access the previous period's value to calculate these changes.

The following query demonstrates this by calculating day-over-day changes in views for "Weird Al" Yankovic's Wikipedia page.
The trend column shows whether traffic increased (positive values) or decreased (negative values) compared to the previous day, helping identify unusual spikes or drops in activity.

```sql
SELECT
    toDate(time) AS day,
    sum(hits) AS h,
    lagInFrame(h) OVER (ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING) AS p,
    h - p AS trend
FROM wikistat
WHERE path = '"Weird_Al"_Yankovic'
GROUP BY ALL
LIMIT 10;
```

```text
┌────────day─┬────h─┬────p─┬─trend─┐
│ 2015-05-01 │ 3934 │    0 │  3934 │
│ 2015-05-02 │ 3411 │ 3934 │  -523 │
│ 2015-05-03 │ 3195 │ 3411 │  -216 │
│ 2015-05-04 │ 3076 │ 3195 │  -119 │
│ 2015-05-05 │ 3450 │ 3076 │   374 │
│ 2015-05-06 │ 3053 │ 3450 │  -397 │
│ 2015-05-07 │ 2890 │ 3053 │  -163 │
│ 2015-05-08 │ 3898 │ 2890 │  1008 │
│ 2015-05-09 │ 3092 │ 3898 │  -806 │
│ 2015-05-10 │ 3508 │ 3092 │   416 │
└────────────┴──────┴──────┴───────┘
```

## Cumulative values {#time-series-cumulative-values}

Counter metrics naturally accumulate over time. 
To analyze this cumulative growth, we can calculate running totals using window functions.

The following query demonstrates this by using the `sum() OVER` clause, which creates a running total. The `bar()` function provides a visual representation of the growth.

```sql
SELECT
    toDate(time) AS day,
    sum(hits) AS h,
    sum(h) OVER (ROWS BETWEEN UNBOUNDED PRECEDING AND 0 FOLLOWING) AS c,
    bar(c, 0, 50000, 25) AS b
FROM wikistat
WHERE path = '"Weird_Al"_Yankovic'
GROUP BY ALL
ORDER BY day
LIMIT 10;
```

```text
┌────────day─┬────h─┬─────c─┬─b─────────────────┐
│ 2015-05-01 │ 3934 │  3934 │ █▉                │
│ 2015-05-02 │ 3411 │  7345 │ ███▋              │
│ 2015-05-03 │ 3195 │ 10540 │ █████▎            │
│ 2015-05-04 │ 3076 │ 13616 │ ██████▊           │
│ 2015-05-05 │ 3450 │ 17066 │ ████████▌         │
│ 2015-05-06 │ 3053 │ 20119 │ ██████████        │
│ 2015-05-07 │ 2890 │ 23009 │ ███████████▌      │
│ 2015-05-08 │ 3898 │ 26907 │ █████████████▍    │
│ 2015-05-09 │ 3092 │ 29999 │ ██████████████▉   │
│ 2015-05-10 │ 3508 │ 33507 │ ████████████████▊ │
└────────────┴──────┴───────┴───────────────────┘
```

## Rate calculations {#time-series-rate-calculations}

When analyzing time series data, it's often useful to understand the rate of events per unit of time. 
This query calculates the rate of page views per second by dividing hourly totals by the number of seconds in an hour (3600). 
The visual bar helps identify peak hours of activity.

```sql
SELECT
    toStartOfHour(time) AS time,
    sum(hits) AS hits,
    round(hits / (60 * 60), 2) AS rate,
    bar(rate * 10, 0, max(rate * 10) OVER (), 25) AS b
FROM wikistat
WHERE path = '"Weird_Al"_Yankovic'
GROUP BY time
LIMIT 10;
```

```text
┌────────────────time─┬───h─┬─rate─┬─b─────┐
│ 2015-07-01 01:00:00 │ 143 │ 0.04 │ █▊    │
│ 2015-07-01 02:00:00 │ 170 │ 0.05 │ ██▏   │
│ 2015-07-01 03:00:00 │ 148 │ 0.04 │ █▊    │
│ 2015-07-01 04:00:00 │ 190 │ 0.05 │ ██▏   │
│ 2015-07-01 05:00:00 │ 253 │ 0.07 │ ███▏  │
│ 2015-07-01 06:00:00 │ 233 │ 0.06 │ ██▋   │
│ 2015-07-01 07:00:00 │ 359 │  0.1 │ ████▍ │
│ 2015-07-01 08:00:00 │ 190 │ 0.05 │ ██▏   │
│ 2015-07-01 09:00:00 │ 121 │ 0.03 │ █▎    │
│ 2015-07-01 10:00:00 │  70 │ 0.02 │ ▉     │
└─────────────────────┴─────┴──────┴───────┘
```

## Histograms {#time-series-histograms}

A popular use case for time series data is to build histograms based on tracked events. 
Suppose we wanted to understand the distribution of a number of pages based on their total hits, only including pages that have over 10,000 hits.
We can use the `histogram()` function to automatically generate an adaptive histogram based on the number of bins:

```sql
SELECT
    histogram(10)(hits) AS hist
FROM
(
    SELECT
        path,
        sum(hits) AS hits
    FROM wikistat
    WHERE date(time) = '2015-06-15'
    GROUP BY path
    HAVING hits > 10000
)
FORMAT Vertical;
```

```text
Row 1:
──────
hist: [(10033,23224.55065359477,60.625),(23224.55065359477,37855.38888888889,15.625),(37855.38888888889,52913.5,3.5),(52913.5,69438,1.25),(69438,83102.16666666666,1.25),(83102.16666666666,94267.66666666666,2.5),(94267.66666666666,116778,1.25),(116778,186175.75,1.125),(186175.75,946963.25,1.75),(946963.25,1655250,1.125)]
```

We can then use [`arrayJoin()`](/docs/sql-reference/functions/array-join) to massage the data and `bar()` to visualize it:

```sql
WITH histogram(10)(hits) AS hist
SELECT
    round(arrayJoin(hist).1) AS lowerBound,
    round(arrayJoin(hist).2) AS upperBound,
    arrayJoin(hist).3 AS count,
    bar(count, 0, max(count) OVER (), 20) AS b
FROM
(
    SELECT
        path,
        sum(hits) AS hits
    FROM wikistat
    WHERE date(time) = '2015-06-15'
    GROUP BY path
    HAVING hits > 10000
);
```

```text
┌─lowerBound─┬─upperBound─┬──count─┬─b────────────────────┐
│      10033 │      19886 │ 53.375 │ ████████████████████ │
│      19886 │      31515 │ 18.625 │ ██████▉              │
│      31515 │      43518 │  6.375 │ ██▍                  │
│      43518 │      55647 │  1.625 │ ▌                    │
│      55647 │      73602 │  1.375 │ ▌                    │
│      73602 │      92880 │   3.25 │ █▏                   │
│      92880 │     116778 │  1.375 │ ▌                    │
│     116778 │     186176 │  1.125 │ ▍                    │
│     186176 │     946963 │   1.75 │ ▋                    │
│     946963 │    1655250 │  1.125 │ ▍                    │
└────────────┴────────────┴────────┴──────────────────────┘
```
