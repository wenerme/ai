---
title: "Cloudflare alerting | Grafana Enterprise Plugins documentation"
description: "Learn how to configure alerts with the Cloudflare data source in Grafana."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Cloudflare alerting

You can use the Cloudflare data source with Grafana Alerting to create alert rules based on your Cloudflare data. This allows you to get notified when DNS query patterns change, response times increase, or other metrics exceed thresholds.

## Before you begin

Ensure you have:

- [Configured the Cloudflare data source](/docs/plugins/grafana-cloudflare-datasource/latest/configure/)
- Familiarity with [Grafana Alerting](/docs/grafana/latest/alerting/)

## Supported query types for alerting

Alerting works best with time series queries that return numeric data. The following Cloudflare query types support alerting:

Expand table

| Query type                    | Use case                                          |
|-------------------------------|---------------------------------------------------|
| **DNS analytics by time**     | Alert on query count, response times, cache rates |
| **Radar time series queries** | Alert on traffic distribution changes             |

> Note
>
> Table-based queries like “DNS analytics report” and “List zones” are not suitable for alerting because they don’t return time series data.

## Create an alert rule

To create an alert rule using the Cloudflare data source:

1. Navigate to **Alerting** &gt; **Alert rules** in the left menu.
2. Click **New alert rule**.
3. In the query section, select your Cloudflare data source.
4. Configure a time series query (for example, DNS analytics by time).
5. Define your alert condition using expressions (Reduce, Threshold, etc.).
6. Configure labels, notifications, and other alert settings.
7. Click **Save rule**.

For detailed instructions on creating alert rules, refer to [Create Grafana-managed alert rules](/docs/grafana/latest/alerting/alerting-rules/create-grafana-managed-rule/).

## Alert examples

### Example: Alert on high DNS query volume

To receive an alert when DNS query count exceeds a threshold:

1. Create a new alert rule.
2. Select the Cloudflare data source.
3. Set **Action** to `zones-dns-analytics-report-bytime`.
4. Select your zone from **Zone ID**.
5. In **Metrics**, select `Query Count`.
6. Add a **Reduce** expression to calculate the average or last value.
7. Add a **Threshold** expression to trigger when the value exceeds your limit (for example, &gt; 10000).
8. Configure notification settings and save.

### Example: Alert on slow DNS response times

To receive an alert when average DNS response time increases:

1. Create a new alert rule.
2. Select the Cloudflare data source.
3. Set **Action** to `zones-dns-analytics-report-bytime`.
4. Select your zone from **Zone ID**.
5. In **Metrics**, select `Average response time`.
6. Add a **Reduce** expression to calculate the average.
7. Add a **Threshold** expression to trigger when response time exceeds your SLA (for example, &gt; 100ms).
8. Configure notification settings and save.

### Example: Alert on DNS query drops

To receive an alert when DNS queries drop significantly (potential outage indicator):

1. Create a new alert rule.
2. Select the Cloudflare data source.
3. Set **Action** to `zones-dns-analytics-report-bytime`.
4. Select your zone from **Zone ID**.
5. In **Metrics**, select `Query Count`.
6. Add a **Reduce** expression to calculate the average.
7. Add a **Threshold** expression to trigger when the value drops below a baseline (for example, &lt; 100).
8. Configure notification settings and save.

## Related documentation

- [Grafana Alerting](/docs/grafana/latest/alerting/)
- [Create alert rules](/docs/grafana/latest/alerting/alerting-rules/)
- [Cloudflare query editor](/docs/plugins/grafana-cloudflare-datasource/latest/query-editor/)
