---
title: "Troubleshooting | Grafana Plugins documentation"
description: "Troubleshoot SLI query calculations and learn how to resolve common issues."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Troubleshooting

If you have arrived here via an annotation in your SLO dashboard, this is because the SLI calculation is being clamped to no greater than 100%. SLI calculations &gt; 100% can happen due to the reasons described below. If you want to hide these annotations, you can do so by toggling the **Show SLO Annotations** button.

Some common SLO source query patterns can result in SLI calculation issues, such as SLIs above 100%, “no data”, or other SLI inconsistencies.

The following sections describe common SLI calculation issues and how to resolve or remediate them.

## Source query returns above 100%

SLO source queries should generate values within the range of 0-1.

Redefine the source query if it produces values outside of the range of 0-1.

Refer to [SLI examples](/docs/grafana-cloud/alerting-and-irm/slo/sli-examples/) for more information about correctly configuring SLI queries.

## Source query compares different metrics

Ratio queries that use different metrics in the numerator and the denominator can experience synchronization issues when the numerator and denominator are incremented at different intervals.

For example, this query uses the `http_success_total` metric in the numerator and the `http_requests_total` metric in the denominator, which is susceptible to reporting &gt; 100% when the metrics are ingested at different times.

`rate(http_success_total) / rate(http_requests_total)`

Use a single metric with series identified by labels to avoid synchronization issues if possible. The metrics ingester synchronizes series belonging to the same metric within a single scrape endpoint during ingestion.

`rate(http_requests_total{status="200"}) / rate(http_requests_total)`.

> Note
>
> The metrics ingester also synchronizes data types that natively generate multiple metrics, such as histograms. For example the Prometheus client library synchronizes these metrics:
>
> - `http_request_duration_seconds_bucket`
> - `http_request_duration_seconds_count`
> - `http_request_duration_seconds_sum`

## Series aggregated by Adaptive Telemetry

Adaptive Telemetry can cause [significant impacts on recording rule values](/docs/grafana-cloud/cost-management-and-billing/adaptive-telemetry/adaptive-metrics/understand-aggregation-delay/), which can lead to unexpected irregularities in recorded SLI data.

Exclude metrics used in SLI queries from Adaptive Telemetry aggregation.

## Series created by recording rules

The ruler executes recording rules with varying latency. SLI series may be inaccurate or report over 100% when the numerator and denominator of the ratio query come from different recording rules. The ruler can cause synchronization issues when it evaluates and writes series in the numerator and denominator at different latencies or intervals.

Query the source series instead of the recorded series if possible to generate accurate SLI calculations.

## Sampled series

Downsampled series can have inconsistent SLI values when the success and total series are not evenly sampled by the metrics ingester. For example if more success events are sampled than total events, then the SLI can measure over 100%. One common scenario where this happens is when using series derived from sampled traces.

Avoid using sampled series in the SLO query if possible.

## Newly initialized counter series

Counter series that transition from being absent to being present cause discrepancies in the SLI calculation when the series’ initial value is not zero. The `rate` function requires two data points. The increase recorded by the initial transition from the series being absent to present is lost when the initial value is not zero. This causes the SLI metric to be incorrect.

This source of error is exacerbated by many short lived series being included in the SLO. Ensure counter series used by the SLO query are initialized with a 0 value or avoid the inclusion of short lived series in the SLO query if possible. It may not be practical to initialize each labeled series to zero, such as series identified with HTTP status codes, but initializing the most common value from each “success” and “total” class may be enough:

- `status=200`
- `status=500`

## Late-arriving series

Series samples might not arrive and become queryable until well after the timestamps in the samples themselves when network issues or problems in the collection environment introduce latency to the ingestion pipeline. The SLO creation wizard configures SLO queries with a metrics offset to handle this scenario. However, metrics written outside of the offset can cause synchronization issues. For example, synchronization issues can occur if Mimir ingests metrics from more than two minutes ago when the SLO query is configured to use `offset 2m`.

In certain situations such as SLOs based on late-arriving Amazon CloudWatch metrics, you may need to configure a greater offset. The advanced SLO type parses a user-provided offset and add two minutes to it. If you wanted to achieve a five-minute offset, you could use the advanced query below. Verify the resulting offset in the recording rules by clicking “View Alerts” on the Manage SLOs page and viewing the recording rules.

[Copy code to clipboard] Copy

```none
sum (rate(request_total{status="success"}[$__rate_interval] offset 3m)) / sum (rate(request_total[$__rate_interval] offset 3m))
```

**Note:** It’s important to track metrics for ingestion latency when using a self-managed data source, because metrics ingestion latency can increase the number of late arriving metrics and impact SLO evaluation.

## Out-of-order series

Mimir has an `out_of_order_time_window` feature that can cause synchronization issues for SLO recording rules. Refer to [Recording rules for ingesting out-of-order samples](/docs/mimir/latest/configure/configure-out-of-order-samples-ingestion/#recording-rules-when-out-of-order-ingestion-is-enabled) for information about `out_of_order_time_window` configuration.

Set the SLO offset equal to or greater than the `out_of_order_time_window` when this feature is enabled.

## The error budget is not updated

The **Error Budget Burndown**, **Remaining Error Budget** stat, and **SLI** stat panels might not display accurate values until the first SLO time window has elapsed.

These panels query recorded metrics (`grafana_slo_*`) that are initialized when you create the SLO. Recording rules collect data only from the time the SLO is created and do not backfill historical data. As a result, the panels report fully accurate results only after the recording rules have collected data for the entire SLO time window.

For example, for a 7-day SLO, the **Error Budget Burndown** panel can stay flat during the first 7 days after creation, even though the **SLI** and **Error Budget Burn Rate** panels already indicate that the error budget is being consumed.

[](/media/docs/grafana-cloud/slo/screenshot-error-budget-burndown-not-updated.png)

## Data source issues

Misconfigured data source permissions can cause SLO calculation errors or `no data` metrics. Troubleshoot SLO data source permission issues:

1. Verify that the Cloud Access Policy has the correct permissions.
2. Verify that [RBAC](/docs/grafana-cloud/alerting-and-irm/slo/set-up/rbac/) is configured appropriately.
