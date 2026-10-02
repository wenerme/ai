---
title: "High-cardinality alerts | Grafana Plugins documentation"
description: "Keep alert volume manageable when a rule matches a large number of series, by aggregating in the expression, dropping labels you don't route on, and letting Alertmanager group the rest."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# High-cardinality alerts

A rule that returns thousands of series produces thousands of alerts. This page covers the ways to keep that under control.

## Spotting the problem early

Run **Query Preview** in the rule editor before saving. The result count is the number of alert instances the rule would produce right now.

The problem is easy to miss in testing, because a healthy system returns nothing. A rule that looks quiet in normal conditions can produce thousands of alerts during exactly the outage you wrote it for.

## Aggregate in the expression

The most effective fix is to alert on the aggregate rather than each member.

Instead of one alert per pod:

promql [Copy code to clipboard] Copy

```promql
rate(container_cpu_usage_seconds_total[5m]) > 0.9
```

alert on how many pods are affected, per service:

promql [Copy code to clipboard] Copy

```promql
count by (namespace, service) (
  rate(container_cpu_usage_seconds_total[5m]) > 0.9
) > 5
```

This produces one alert per service, not one per pod. You lose the list of individual pods. Put a dashboard link in the annotations so whoever responds can get it.

## Drop labels you don’t need

Labels that vary widely—pod names in a large cluster, request IDs, user IDs—multiply the alert count without helping anyone act.

Aggregate them away with `sum by` or `max by`, keeping only the labels you route or group on:

promql [Copy code to clipboard] Copy

```promql
max by (namespace, service) (
  rate(http_requests_total{status=~"5.."}[5m])
  / rate(http_requests_total[5m])
) > 0.05
```

## Alert on a proportion, not a count

Absolute thresholds don’t survive growth. A rule firing at “more than 10 failing pods” is reasonable at 50 pods and meaningless at 5000.

promql [Copy code to clipboard] Copy

```promql
count by (service) (up == 0) / count by (service) (up) > 0.2
```

This fires when more than a fifth of a service’s instances are down, whatever the size.

## Let grouping absorb the rest

When per-instance alerts are genuinely wanted—you do want to know which machines are down—keep the rule detailed and let Alertmanager batch the notifications:

YAML [Copy code to clipboard] Copy

```yaml
group_by: ['alertname', 'cluster']
group_wait: 30s
group_interval: 5m
```

Fifty machines failing in one cluster becomes a single notification listing all fifty. The alerts stay individually visible in the plugin, and only the notification volume is collapsed.

## Use inhibition for cascades

When a broad failure reliably produces many downstream alerts, an inhibition rule suppresses the symptoms while the cause is firing:

Expand table

| Field           | Value                            |
|-----------------|----------------------------------|
| Source matchers | `alertname = ClusterUnreachable` |
| Target matchers | `severity = warning`             |
| Equal labels    | `cluster`                        |

Refer to [Configure inhibition rules](/docs/plugins/grafana-prometheusalerting-app/latest/configure-notifications/inhibition-rules/).

## Choosing between these

They’re not alternatives so much as layers:

1. **Aggregate in the expression** when individual instances don’t need separate handling. This is the cheapest, since the alerts are never created.
2. **Group in Alertmanager** when you want the instances but not the notifications.
3. **Inhibit** when one alert genuinely explains the others.

Reach for the first before the others. Grouping and inhibition tidy up alerts that already exist; aggregation avoids creating them, which also keeps the plugin’s own lists readable.
