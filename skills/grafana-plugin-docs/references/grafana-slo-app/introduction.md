---
title: "Introduction to Grafana SLO | Grafana Plugins documentation"
description: "Introduction to Grafana SLO"
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Introduction to Grafana SLO

With Grafana SLO, you can create, monitor, and alert on your Service Level Objectives.

## Why use Service Level Objectives?

Service Level Objectives (SLOs) provide a practical framework for defining and measuring service reliability, enabling continuous improvement. They help teams:

- **Define reliability from the user perspective**: Measure what matters to users rather than isolated infrastructure metrics. Establish service expectations by defining reliability objectives that align with customer-facing commitments.
- **Align teams around shared reliability goals**: Use SLOs to create a common language between engineering, product, and operations. Break down silos, foster a culture of reliability, and balance competing priorities using error budgets.
- **Reduce alert noise and alert on risk**: Consolidate multiple alerts into user-centric SLOs. Evaluate reliability over meaningful time windows and receive alerts when the objective is at risk, not after it is violated.

## Fundamentals

The following concepts are essential to understanding how SLOs work.

### Service Level Indicators (SLIs)

A Service Level Indicator (SLI) is a metric that measures how well your service is performing, typically from the end-user perspective. For instance:

- User requests that respond within 2 seconds (latency)
- User requests that complete without errors (availability)

The SLI query must return a success ratio. For example, a latency SLI that returns `0.75` indicates that `75%` of requests responded within 2 seconds. Refer to [SLI examples](/docs/grafana-cloud/alerting-and-irm/slo/sli-examples/) for implementation details.

### Service Level Objectives (SLOs)

A Service Level Objective (SLO) defines the goal for an SLI using two settings:

1. The **SLO target**, which defines how much success the SLI must achieve.
2. The **SLO time window**, which defines the SLO evaluation period.

In the previous example, a target of `99%` with a time window of `28` days defines the SLO as:

- *Over a 28-day period, `99%` of user requests should respond within 2 seconds*

> Note
>
> When defining your SLOs, avoid setting the target to `100%` reliability. The cost and complexity of improving reliability increase significantly as you approach `100%`. Instead, define a target that includes an acceptable margin of failure, known as the error budget.

### Error budget

The error budget is derived from the SLO target and represents the amount of failure allowed by an SLO.

It’s calculated as `100% - SLO target`. For example, an SLO with a `99%` target has a `1%` error budget.

When evaluating SLO performance, the **error budget burndown** and **remaining error budget** are key metrics. They show how much of the error budget has been consumed and how much remains before the SLO is breached. For details, refer to [view remaining error budget](/docs/grafana-cloud/alerting-and-irm/slo/dashboard/#view-remaining-error-budget).

### Burn rate

The error budget burn rate (burn rate) measures how quickly the service consumes the error budget.

- A burn rate of `1` means the service exhausts the error budget exactly at the end of the SLO time window.
- A burn rate below `1` means the service retains some of the error budget by the end of the time window.
- A burn rate above `1` means the service exhausts the error budget before the end of the time window, indicating that service reliability is currently below the SLO target.

Burn rate shows whether your service is consuming the error budget faster than allowed.

For example, an SLO with a `99.9%` target allows an error budget of `0.1%`. If the current error rate is `0.2%`, the burn rate is `2`, and the error budget would be exhausted in half the SLO time window.

Refer to [analyze error budget burn rate](/docs/grafana-cloud/alerting-and-irm/slo/dashboard/#analyze-error-budget-burn-rate) for additional details.

### Alert on your burn rate

Burn rate alerts trigger when an SLO is at risk of being breached.

They allow you to act proactively before the SLO is breached. This differs from traditional alerts, which trigger after the alert threshold has been exceeded.

In Grafana SLO, you can enable two types of burn rate alert rules:

- **Slow-burn alerts**, which triggers when the error budget would be consumed over hours or days. These often indicate ongoing issues that require attention.
- **Fast-burn alerts**, which trigger when the error budget would be consumed over minutes or hours. These typically indicate severe issues, such as outages.

You may want to respond differently depending on how quickly the error budget is being consumed. For example, a slow burn might require creating a ticket, while a fast burn might require paging the on-call engineer and running an investigation.

You can enable **Assistant investigations** when burn-rate alerts fire. For more information, refer to [Add SLO alert rules and assistant investigations](/docs/grafana-cloud/alerting-and-irm/slo/create/#add-slo-alert-rules-and-assistant-investigations).

## SLO usage and billing

Each Grafana instance is limited to 70 SLOs by default.

Each SLO creates 10-12 Prometheus recording rules. Each recording rule creates one or more series depending on the provided grouping labels. If the output of your SLI query has very high cardinality, an SLO can create many new series.

SLO recording rules generate new data points every 60 seconds (1 data point per minute, or DPM) of [Prometheus metrics](/docs/grafana-cloud/cost-management-and-billing/analyze-costs/metrics-costs/prometheus-metrics-costs/). For more information about metrics and how to manage DPM, refer to [Grafana Cloud metrics optimization](/docs/grafana-cloud/cost-management-and-billing/reduce-costs/metrics-costs/adjust-data-points-per-minute/).

Grafana Cloud customers who need higher limits should contact a Grafana Cloud administrator or Editor within their organization. They can submit a support ticket through Grafana Cloud to request a limit increase or coordinate with their Grafana account team as needed.
