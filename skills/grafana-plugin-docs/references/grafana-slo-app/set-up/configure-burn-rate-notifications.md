---
title: "Configure burn-rate notifications | Grafana Plugins documentation"
description: "Configure burn-rate (SLO) notifications in Grafana Alerting"
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Configure burn-rate notifications

Burn rate alerts trigger when an SLO is at risk of being breached.

When an SLO has alert rules enabled, Grafana Alerting generates the corresponding burn-rate alert rules under the **Grafana SLO** folder.

[](/media/docs/grafana-cloud/slo/screenshot-grafana-slo-alert-rules-folder.png)

When Grafana SLO creates alert rules, it automatically adds a set of labels to uniquely identify them, including `grafana_slo_uuid`, `grafana_slo_window`, and `grafana_slo_severity`.

By default, Grafana SLO uses the `grafana_slo_severity` label to differentiate:

- **Fast-burn alerts** use `grafana_slo_severity="critical"`.
- **Slow-burn alerts** use `grafana_slo_severity="warning"`.

> Note
>
> On the [SLO edit page](/docs/grafana-cloud/alerting-and-irm/slo/create/#add-slo-alert-rules-and-assistant-investigations), you can also configure notification settings for burn-rate alerts, such as custom labels and annotations, as well as enabling **Assistant investigations** when the alert fires.

## Burn-rate alerts

Burn-rate (SLO) alerts are based on the [error budget burn rate metric](/docs/grafana-cloud/alerting-and-irm/slo/introduction/#burn-rate), which measures how quickly a service consumes its error budget:

- `> 1` means the service exhausts the error budget before the end of the SLO time window.
- `= 1` means the service exhausts the error budget exactly at the end of the SLO time window.
- `< 1` means the service doesn’t exhaust the error budget within the SLO time window.

Burn-rate alerts follow practices from the [Google SRE workbook](https://sre.google/sre-book/service-level-objectives/). To explore the queries and conditions for each alert, go to **Alert rules** in Grafana Alerting.

### Fast-burn alerts

Fast-burn alerts (`grafana_slo_severity="critical"`) fire when the error budget would be consumed over minutes or hours.

They evaluate shorter time periods and trigger if any of these conditions are met:

1. The burn rate is at least `14.4×` when averaged over the last 5 minutes **and** the last hour.
2. The burn rate is at least `6×` when averaged over the last 30 minutes **and** the last 6 hours.

### Slow-burn alerts

Slow-burn alerts (`grafana_slo_severity="warning"`) fire when the error budget would be consumed over hours or days.

They evaluate longer time periods and trigger if any of these conditions are met:

1. The burn rate is at least `3×` when averaged over the last 2 hours **and** the last 24 hours.
2. The burn rate is at least `1×` when averaged over the last 6 hours **and** the last 72 hours.

## Configure notifications

To configure where to receive SLO alert notifications, complete the following steps in Grafana Alerting:

1. [Configure notification policies](/docs/grafana-cloud/alerting-and-irm/alerting/fundamentals/notifications/notification-policies/) to handle SLO alert notifications.

   Use the `service`, `team`, or other SLO labels to match alert labels in the notification policy. Then use the `grafana_slo_severity` label to route alerts by severity.

   A notification policy is often designed to handle related alerts. For instance, you can create a policy to handle all fast-burn alerts for a specific `service` or `team`.
2. [Configure a contact point](/docs/grafana-cloud/alerting-and-irm/alerting/fundamentals/notifications/contact-points/) for each notification policy.

   Notification policies that handle fast-burn alerts should use a paging system, such as [Grafana IRM](/docs/grafana-cloud/alerting-and-irm/irm/), because these alerts often require immediate action or team response.

   For policies handling slow-burn alerts, use ticketing systems such as Jira or ServiceNow, or send notifications to a team channel.

The following example shows a basic notification policy tree for SLO alerts:

[](/media/docs/grafana-cloud/slo/diagram-notificaition-policies-setup.png)

For more details on setting up notifications, refer to [Grafana Alerting notifications](/docs/grafana-cloud/alerting-and-irm/alerting/alerting-rules/create-notification-policy/).
