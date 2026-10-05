---
title: "Configure notifications | Grafana Plugins documentation"
description: "Configure the Alertmanager routes, receivers, notification templates, silences, time intervals, and inhibition rules that the Prometheus Alerting plugin manages for an external Alertmanager."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Configure notifications

Alertmanager decides what happens to an alert once it fires. This section covers every Alertmanager resource the plugin manages.

## Before you begin

These pages need an Alertmanager data source. Without one they don’t appear in the plugin at all. Refer to [Configure data sources](/docs/plugins/grafana-prometheusalerting-app/latest/set-up/configure-data-sources/).

Viewing needs `alert.notifications.external:read`; changing anything needs `alert.notifications.external:write`. Silences are separate, using the `alert.instances.external:*` permissions instead. Refer to [Configure access control](/docs/plugins/grafana-prometheusalerting-app/latest/set-up/configure-rbac/).

If several Alertmanagers are configured, check the picker at the top of the page before making changes. Every edit applies to the selected one.

## Where to start

If you’re setting up notifications from scratch, work outward from the destination:

1. **Create a receiver** for each place notifications should land.
2. **Configure routes** so alerts reach the right receiver.
3. **Add time intervals** if some routes should be quiet at certain hours.
4. **Add inhibition rules** if some alerts should suppress others.
5. **Customize templates** once the mechanics work and you want the messages to read better.

Silences come later. They’re a day-to-day operational tool rather than part of the initial setup.

## In this section

- [Configure routes](/docs/plugins/grafana-prometheusalerting-app/latest/configure-notifications/configure-routes/)
- [Create a receiver](/docs/plugins/grafana-prometheusalerting-app/latest/configure-notifications/create-receiver/)
- [Create a silence](/docs/plugins/grafana-prometheusalerting-app/latest/configure-notifications/create-silence/)
- [Configure time intervals](/docs/plugins/grafana-prometheusalerting-app/latest/configure-notifications/time-intervals/)
- [Configure inhibition rules](/docs/plugins/grafana-prometheusalerting-app/latest/configure-notifications/inhibition-rules/)
- [Notification templates](/docs/plugins/grafana-prometheusalerting-app/latest/configure-notifications/template-notifications/)
