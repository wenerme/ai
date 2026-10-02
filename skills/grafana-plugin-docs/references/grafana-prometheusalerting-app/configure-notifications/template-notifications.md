---
title: "Notification templates | Grafana Plugins documentation"
description: "Customize how Alertmanager formats the notifications it sends, using Go templates that are rendered at send time and describe a whole group of alerts rather than a single instance."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Notification templates

Notification templates control how a notification is formatted before it’s sent. Alertmanager renders them at send time, after grouping, so a template describes a whole group of alerts rather than one.

This is different from templating a rule’s annotations, which the ruler does per alert instance during evaluation. Refer to [Templates](/docs/plugins/grafana-prometheusalerting-app/latest/fundamentals/templates/).

## In this section

- [Manage notification templates](/docs/plugins/grafana-prometheusalerting-app/latest/configure-notifications/template-notifications/manage-notification-templates/): create, edit, and delete templates.
- [Template language](/docs/plugins/grafana-prometheusalerting-app/latest/configure-notifications/template-notifications/language/): the Go template syntax.
- [Template examples](/docs/plugins/grafana-prometheusalerting-app/latest/configure-notifications/template-notifications/examples/): patterns you can copy.
- [Template reference](/docs/plugins/grafana-prometheusalerting-app/latest/configure-notifications/template-notifications/reference/): the data a template can read.
