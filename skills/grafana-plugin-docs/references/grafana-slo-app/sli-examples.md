---
title: "SLI examples for Grafana SLO | Grafana Plugins documentation"
description: "Learn how to set reliability goals in Grafana SLO with event-based SLI examples."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# SLI examples for Grafana SLO

A **Service Level Indicator (SLI)** is a metric that measures how well your service is performing from the user’s perspective. SLIs typically track availability, latency, or a custom success rate. For example:

- Latency: requests respond within 2 seconds.
- Availability: requests do not return system errors.

**Service Level Objectives (SLOs)** defines your reliability goals by setting a target for SLI performance over a specific time window. To define an SLO, pair an SLI with a target and a time window:

Expand table

| SLI category | SLI description                      | Target | Time window |
|--------------|--------------------------------------|--------|-------------|
| Latency      | Requests respond within 2 seconds    | 99%    | 28d         |
| Availability | Requests do not return system errors | 99.5%  | 7d          |

In Grafana, SLIs are defined using data source queries that measure the success rate of the indicator. In the previous examples:

- Latency: the percentage of requests completed within two seconds.
- Availability: the percentage of requests without system errors.

SLI query results must return a value between `0` and `1` for each evaluation period, where `1` represents **100% success** and `0` represents **0% success**.

[](/media/docs/grafana-cloud/slo/screenshot-sli-query.png)

Grafana SLO continuously evaluates the SLI query. Each SLI is calculated over a specific time range defined in the query, typically `$__interval` or `$__rate_interval`.

Expand table

| Time range  | SLI value (success ratio) |
|-------------|---------------------------|
| 10:00—10:04 | 1.0                       |
| 10:00—10:08 | 0.98                      |
| 10:00—10:12 | 0.99                      |
| 10:00—10:16 | 1.0                       |

Grafana SLO aggregates these per-interval values over the selected time window to determine the overall success and remaining error budget.

SLIs typically use one of two calculation types: event-based SLIs (recommended), or time-based SLIs.

## Event-based SLIs

Event-based SLIs (also called occurrence-based, request-based, or ratio-based SLIs) calculate the SLI by comparing successful events to total events.

There are two common ways to express this, depending on the metric type:

1. **Using rates of events**

   [Copy code to clipboard] Copy

   ```none
   Success ratio = rate of successful events (over a period)
                   /
                   rate of total events (over a period)
   ```
2. **Using count of events**

   [Copy code to clipboard] Copy

   ```none
   Success ratio = number of successful events (over a period)
                   /
                   total number of events (over a period)
   ```

Both approaches measure the ratio of successful events, and the choice depends on the type of metric in the SLI query.

The following examples illustrate how to define event-based SLIs for different metric types:

- [SLI example for availability](/docs/grafana-cloud/alerting-and-irm/slo/sli-examples/availability/)
- [SLI example for latency](/docs/grafana-cloud/alerting-and-irm/slo/sli-examples/latency/)
- [Multidimensional SLI example](/docs/grafana-cloud/alerting-and-irm/slo/sli-examples/multidimensional/)

> Note
>
> Event-based SLIs ensure **each event contributes equally to the SLO and error budget**.
>
> Grafana expects SLIs to parse as a **ratio-like query**: `numerator / denominator`. SLIs that don’t parse as ratios are considered [time-based SLIs](#time-based-slis).
>
> If your data doesn’t expose both success and total events, define recording rules or update your service instrumentation rather than relying on complex SLI workarounds.

## Time-based SLIs

Time-based SLIs calculate the value of success for each time slice.

The error budget calculates the value of **successful time slices over total time slices**.

Expand table

| Time slice (interval)         | t1  | t2  | t3  | t4  | t5  |
|-------------------------------|-----|-----|-----|-----|-----|
| **SLI value (success ratio)** | 1   | 1   | 0   | 1   | 0   |
| **Total SLI value**           | 1/1 | 2/2 | 2/3 | 3/4 | 3/5 |

The time interval (or time slice) is the range selector used in the SLI query. For Prometheus, this must be either `$__interval` or `$__rate_interval`.

> Caution
>
> Time-based SLIs ensure each time slice contributes equally to the SLO and error budget.
>
> An important drawback is that a bad time slice during low traffic penalizes the SLO as much as a bad time slice during peak traffic, even though fewer users are impacted.
>
> **Event-based SLIs better represent the end-user experience** and are the recommended approach in most cases.
>
> **Use time-based SLIs only when your objective must strictly be defined in time intervals**. To learn about the implementation details and limitations, refer to the [time-based SLI examples](/docs/grafana-cloud/alerting-and-irm/slo/sli-examples/time-based/).
