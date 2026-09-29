---
title: "Alert rule evaluation | Grafana Plugins documentation"
description: "Learn how the Prometheus Alerting plugin evaluates rule groups on a schedule, how the evaluation interval interacts with the pending period, and how an alert moves between states."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Alert rule evaluation

Rules don’t run individually. They run as part of a group, on that group’s schedule, and the timing of that schedule affects how quickly alerts fire and how reliable they are.

## In this section

- [Rule groups and evaluation](/docs/plugins/grafana-prometheusalerting-app/latest/fundamentals/alert-rule-evaluation/rule-groups/): when rules run and in what order.
- [Alert rule state and health](/docs/plugins/grafana-prometheusalerting-app/latest/fundamentals/alert-rule-evaluation/alert-rule-state-and-health/): what the plugin is telling you about a rule.
