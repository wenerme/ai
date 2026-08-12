---
title: "Time-based SLI examples | Grafana Plugins documentation"
description: "Learn how time-based SLIs in Grafana SLO work with complete query examples."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Time-based SLI examples

This guide provides examples of defining time-based SLIs in Grafana SLO.

To begin, it’s helpful to understand how the different SLI types work.

**Time-based SLIs** calculate the error budget by measuring the value of successful time slices over the total number of time slices:

[Copy code to clipboard] Copy

```none
successful time-slices / total time-slices
```

In contrast, [event-based SLIs](/docs/grafana-cloud/alerting-and-irm/slo/sli-examples/#time-based-slis) calculate the error budget as:

[Copy code to clipboard] Copy

```none
successful events / total events
```

For both types of SLIs, SLI queries must return a value between `0` and `1`, where `1` represents **100% success** for the interval.

## Event-based SLI comparison

The following example illustrates the difference between the two approaches. The time window measures availability for five consecutive intervals:

Expand table

|                        | t1    | t2    | t3    | t4    | t5    |
|------------------------|-------|-------|-------|-------|-------|
| **Successful events**  | 10    | 10    | 10    | 10    | 20    |
| **Total events**       | 10    | 10    | 10    | 10    | 40    |
|                        |       |       |       |       |       |
|                        |       |       |       |       |       |
| **Time-based result**  | 1     | 1     | 1     | 1     | 0.5   |
| **Event-based result** | 10/10 | 10/10 | 10/10 | 10/10 | 20/40 |

The SLI values over the time window are:

1. **Event-based SLI**

   `successful events / total events` *60/80 =* **0.75 (75%)**
2. **Time-based SLI**

   `successful time-slices / total time-slices` *4.5/5 =* **0.9 (90%)**

> Note
>
> In event-based SLIs, each event contributes equally to the SLO.
>
> Event-based SLIs are preferred in most cases because they better represent the end-user experience: each event (such as an user interaction or request) is weighted equally.
>
> In time-based SLIs, each interval contributes equally to the SLO. A high-traffic interval affects the SLO the same as a low-traffic interval, even though more users are impacted.
>
> **Use time-based SLIs only when your objective must be strictly defined in time intervals**.

## Time-based SLI limitations

Grafana SLO doesn’t fully support time-based SLIs yet:

- [Multidimensional SLIs](/docs/grafana-cloud/alerting-and-irm/slo/sli-examples/multidimensional/) are not supported.
- [SLO reports](/docs/grafana-cloud/alerting-and-irm/slo/reports/) are not supported.
- **SLO alerts** are not supported for time-based SLIs using strict interval conditions.

## How to define a time-based SLI

To create a time-based SLI, use the **Advanced SLI** query option to [create a SLO](/docs/grafana-cloud/alerting-and-irm/slo/create/).

Any SLI query that **cannot be parsed as a ratio-like query (`numerator / denominator`)** is treated as a time-based SLO.

The time interval (or time slice) is the range selector used in the SLI query. For Prometheus, this must be either `$__interval` or [`$__rate_interval`](/docs/grafana/latest/datasources/prometheus/template-variables/#use-__rate_interval).

You can identify a time-based SLO by its dashboard: it does not display the **Event Rate** panel.

## Time-based SLIs should return binary results

In Grafana SLO, SLI queries must return a value between `0` and `1` that represents the success ratio: `1` (100% success), `0.5` (50%), `0.2` (20%), `0` (0% success).

For time-based SLIs, we recommend designing queries that avoid fractional results and instead return only binary outcomes:

- `1` for a good time interval.
- `0` for a bad time interval.

This makes the objective clearer to communicate and ensures consistency across different SLOs.

To illustrate this, consider the [event-based SLI latency example](/docs/grafana-cloud/alerting-and-irm/slo/sli-examples/latency/) was defined as:

- *99% (SLO target) of requests must respond within 2 seconds.*

You can express this objective similarly as a time-based SLI using either a strict or percentile condition:

- *99% (SLO target) of time intervals must have **all** requests responding within 2 seconds (strict condition).*
- *99% (SLO target) of time intervals must have **95%** of requests responding within 2 seconds (percentile condition).*

Expand table

|                     | **Event-based SLI**                        | **Time-based SLI (strict)**              | **Time-based SLI (95%)**                               |
|---------------------|--------------------------------------------|------------------------------------------|--------------------------------------------------------|
| **SLO description** | 99% of requests ≤ 2s                       | 99% of intervals where all requests ≤ 2s | 99% of intervals where p95 latency ≤ 2s                |
| **SLO measurement** | 99% success acrossall requests | 99% interval success                     | 99% interval success                                   |
| **Tolerance**       | Allows up to 1% slow requests overall      | Fails an interval if any request is slow | Fails an interval if more than 5% of requests are slow |

Different measurement approaches can introduce significant complexity to understand SLO behavior.

If your time-based SLI returns a value like *“percentage of requests under 2 seconds per interval,”* then your SLO description becomes much less intuitive. The previous example would need to be expressed as:

- *Over the selected SLO window, the average ratio of requests responding within 2 seconds per time interval must be at least 99%.*

Fractional interval SLIs force you to define the SLO in terms of averages of ratios, which is significantly harder to understand and communicate.

Binary interval SLIs avoid this complexity and make it straightforward to describe objectives in terms of the percentage (the SLO target) of good or bad time periods.

- `1` indicates a good time interval.
- `0` indicates a bad time interval.

## Time-based SLI example for latency

The following examples show how to implement the time-based SLIs described above, using both strict and percentile-based interval conditions.

### Strict interval condition (using Gauges)

The [probe latency example](/docs/grafana-cloud/alerting-and-irm/slo/sli-examples/latency/) defines an event-based SLI using the `probe_duration_seconds` metric, a Prometheus Gauge that measures how long a probe takes to complete (in seconds).

This example uses the same metric to define a strict time-based SLI:

> 99% (SLO target) of time intervals must have **all** requests responding within 2 seconds.

For each evaluation interval, the SLI query must return:

- `1` (100% success) if **all** requests in the time interval are `< 2s`
- `0` (0% success) if **any** request in the time interval is `≥ 2s`

You can configure time-based SLIs only using the **Advanced** option in the Grafana SLO wizard (refer to [how to define a time-based SLI](#how-to-define-a-time-based-sli)). The SLI query looks like this:

promql [Copy code to clipboard] Copy

```promql
min (
  min_over_time(
    (probe_duration_seconds{job="<JOB_NAME>"} < bool 2)[$__interval:]
  )
)
```

- `probe_duration_seconds{job="<JOB_NAME>"} < bool 2`

  Returns a binary series (`1` or `0`) indicating whether each sample (probe request) was under 2 seconds.

  This expression returns one series (dimension) for each unique label set. In this example, the dimension is often determined by the `probe` label, resulting in one series per probe location: `{job="<JOB_NAME>", probe="Paris"}`, `{job="<JOB_NAME>", probe="Tokyo"}`, etc.
- `[$__interval:]`

  Applies a range vector selector over the previous expression.

  Because `*_over_time` functions require a range vector as input, the subquery `[:]` generates a range vector containing all samples within `$__interval`.

  This defines the time interval for the SLI evaluation.
- `min_over_time(...)`

  Returns the minimum value observed during the interval (`$__interval`):

  - Returns `1` if **all** requests in the interval are `< 2s`
  - Returns `0` if **any** request in the interval is `≥ 2s`

  This produces one result per dimension (for example, one per probe location).
- `min(...)`

  Aggregates across all returned series (dimensions):

  - Returns `1` if **all dimensions** are successful: all requests across all dimensions are `< 2s`
  - Returns `0` if **any dimension** has a failure: any request across all dimensions is `≥ 2s`

### Percentile interval condition (using Histograms)

The following example defines the time-based SLI using a percentile condition for each evaluation interval:

> 99% (SLO target) of time intervals must have **95%** of requests responding within 2 seconds.

For each evaluation interval, the SLI query must return:

- `1` (100% success) if **95%** of requests in the interval are `< 2s`
- `0` (0% success) if **5% or more** requests in the interval are `≥ 2s`

With gauge metrics, you can use `quantile_over_time` to calculate percentiles from intervals:

promql [Copy code to clipboard] Copy

```promql
# Using gauges. Returns one result per series (dimension).
quantile_over_time(
  0.95,
  probe_duration_seconds{job="<JOB_NAME>"}[$__interval]
)
```

However, **`quantile_over_time()` cannot compute a global percentile**.

`quantile_over_time()` computes the percentile per individual series (per unique label set). It cannot aggregate samples across all dimensions to compute a global `p95` latency, making it unsuitable for a time-based SLI that needs to represent a global percentile of all events.

To calculate `p95` across all dimensions, **use a histogram metric and [`histogram_quantile()`](https://prometheus.io/docs/prometheus/latest/querying/functions/#histogram_quantile)**. This example uses OpenTelemetry metric [http.client.request.duration](https://opentelemetry.io/docs/specs/semconv/http/http-metrics/#metric-httpclientrequestduration), stored either as a classic or native histogram.

promql [Copy code to clipboard] Copy

```promql
# using classic histogram
histogram_quantile(0.95,
  sum by (le) (
    rate(http_client_request_duration_seconds_bucket[$__rate_interval])
  )
) < bool 2
```

promql [Copy code to clipboard] Copy

```promql
# using native histogram
histogram_quantile(0.95,
  sum (
    rate(http_client_request_duration_seconds[$__rate_interval])
  )
) < bool 2
```

The query breakdown of both SLIs is similar:

- `histogram_quantile(0.95, ...)`

  Calculates the **95th percentile** (*p95*) latency during each interval (`$__rate_interval`). It is the estimation of the latency under which **95%** of requests occurred.

  The syntax for calculating quantiles is:

  - **Classic histogram**

    `histogram_quantile(<quantile>, sum by (le) (rate(<histogram_metric_bucket>[<ri>])))`
  - **Native histogram**

    `histogram_quantile(<quantile>, sum (rate(<histogram_metric>[<ri>])))`
- `< bool 2`

  Converts the percentile result of each interval to a binary outcome:

  - Returns `1` if p95 is `< 2s`
  - Returns `0` if p95 is `≥ 2s`

For strict conditions (*“all requests must be &lt; 2s”*), you can use `histogram_quantile(1, ...)`, which calculates the maximum observed value in the interval.

## Time-based SLI example for availability

For comparison, this section replicates the [event-based SLI availability example](/docs/grafana-cloud/alerting-and-irm/slo/sli-examples/availability/):

- *99% (SLO target) of requests must not return system errors.*

As with the latency example, you can translate this objective into time-based SLIs:

- **Strict condition**

  *99% (SLO target) of time intervals must have **all** requests succeed (no errors).*
- **Percentile condition**

  *99% (SLO target) of time intervals must have **95%** of requests succeed.*

To measure availability, this example uses the Prometheus Counter metric `http_requests_total`:

Expand table

| Metric query                         | Description      |
|--------------------------------------|------------------|
| `http_requests_total`                | Total requests   |
| `http_requests_total{status=~"5.."}` | Failing requests |
| `http_requests_total{status!~"5.."}` | Success requests |

Alternatively, you can use the `_count` series of histogram metrics, which behaves similarly.

### Strict interval condition

> 99% (SLO target) of time intervals must have **all** requests not responding with errors

For each evaluation interval, the SLI query must return:

- `1` (100% success) if **all** requests in the interval were successful
- `0` (0% success) if **any** request in the interval returned a system error (`5xx`)

The SLI query is:

promql [Copy code to clipboard] Copy

```promql
(
    sum(increase(http_requests_total{status=~"5.."}[$__rate_interval]))
    or vector(0)
) == bool 0
```

- `http_requests_total{status=~"5.."}`

  Filters to include only `5xx` failing requests (errors) for each series (dimension).
- `increase(...[$__rate_interval])`

  Counts failing requests during the interval.
- `sum ()`

  Aggregates failing requests across all dimensions into a single value:

  - `0` means no failures in the interval.
  - `>0` means at least one failure occurred.
- `or vector(0)`

  Returns `0` if no samples exist for a series.
- `== bool 0`
  Converts the summed value into a binary result:

  - `1` if **all** requests across all dimensions succeeded
  - `0` if **any** request failed in the interval

  This produces a boolean result for each interval, indicating a good or bad interval.

### Percentile interval condition

> 99% (SLO target) of time intervals must have **95%** of requests not responding with errors

For each evaluation interval, the SLI query must return:

- `1` (100% success) if more than **95%** requests are successful
- `0` (0% success) if **5% or more** requests are failing

You can configure time-based SLIs only using the **Advanced** option in the Grafana SLO wizard (refer to [how to define a time-based SLI](#how-to-define-a-time-based-sli)). The SLI query looks like this:

promql [Copy code to clipboard] Copy

```promql
(
  #  Event-based ratio to compute the fraction of successful events
  (
    sum(rate(http_requests_total{status!~"5.."}[$__rate_interval] offset 2m))
    or 0 * sum(rate(http_requests_total[$__rate_interval] offset 2m))
  )
  /
  sum(rate(http_requests_total[$__rate_interval] offset 2m))
) > bool 0.95
# `bool` converts the comparison result into a binary series
```

- This query reuses the standard [event-based SLI ratio](/docs/grafana-cloud/alerting-and-irm/slo/sli-examples/availability/#probe-availability-summary) to compute the success ratio for each interval.
- `> bool 0.95`

  Compares the success ratio for each interval to convert it into a binary result:

  - `1` if more than **95%** requests in the interval are successful
  - `0` otherwise

## Wrap-up

When designing SLOs or implementing time-based SLIs, keep the following in mind:

1. **Event-based SLIs are recommended**

   Event-based SLIs better represent the full user experience by weighting each event equally. In contrast, time-based SLIs count each time interval equally, regardless of traffic volumes.

   Avoid using time-based SLIs unless your objective must be defined strictly in terms of time intervals.
2. **Grafana SLO treats non-ratio queries as time-based SLIs**

   If your SLI query does not follow a ratio-like structure (`numerator / denominator`), Grafana SLO treats it as a time-based SLI and evaluates the error budget per time interval.
3. **Time-based SLIs don’t support all SLO features**

   Refer to [time-based SLI limitations](#time-based-sli-limitations) for details.
4. **It’s preferred that time-based SLIs return only binary results**

   Returning `1` for good intervals and `0` for bad intervals makes the SLO easier to define, and compare across different SLOs.
