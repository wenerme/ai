---
title: "Configure alert rules | Grafana Plugins documentation"
description: "Create and manage data source-managed alerting and recording rules in the Prometheus Alerting plugin, including rule groups, evaluation intervals, and templated annotations."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Configure alert rules

Alert rules are stored and evaluated by the ruler of your Prometheus, Mimir, Cortex, or Loki data source. The plugin gives you an editor for them, so you can manage rules without editing YAML by hand or redeploying.

## Before you begin

Editing rules needs two things:

- The `alert.rules.external:write` permission. Refer to [Configure access control](/docs/plugins/grafana-prometheusalerting-app/latest/set-up/configure-rbac/).
- A data source with a writable ruler API. Mimir, Cortex, and Loki have one; vanilla Prometheus doesn’t, and its rules are read-only here. Refer to [Configure data sources](/docs/plugins/grafana-prometheusalerting-app/latest/set-up/configure-data-sources/).

If either is missing you can still browse rules. The create and edit actions are absent.

## In this section

- [Create an alert rule](/docs/plugins/grafana-prometheusalerting-app/latest/alerting-rules/create-alert-rule/)
- [Create a recording rule](/docs/plugins/grafana-prometheusalerting-app/latest/alerting-rules/create-recording-rule/)
- [Manage rule groups](/docs/plugins/grafana-prometheusalerting-app/latest/alerting-rules/manage-rule-groups/)
- [Template annotations and labels](/docs/plugins/grafana-prometheusalerting-app/latest/alerting-rules/template-annotations-and-labels/)
