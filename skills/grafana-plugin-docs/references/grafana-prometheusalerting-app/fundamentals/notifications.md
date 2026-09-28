---
title: "Notifications | Grafana Plugins documentation"
description: "Learn how Alertmanager deduplicates, groups, routes, and suppresses alerts before delivering a notification, and how the Prometheus Alerting plugin exposes each step of that process."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Notifications

Once a rule fires, the ruler’s job is done. It just keeps reporting the alert. Everything from that point is Alertmanager’s decision.

## What Alertmanager does with an alert

For each firing alert, in roughly this order:

1. **Deduplicate.** Alerts with identical labels are the same alert, even from different ruler replicas.
2. **Group.** Related alerts are batched so one incident produces one notification instead of fifty. Refer to [Group alert notifications](/docs/plugins/grafana-prometheusalerting-app/latest/fundamentals/notifications/group-alert-notifications/).
3. **Route.** The routing tree is walked to decide which receiver the group goes to. Refer to [The routing tree](/docs/plugins/grafana-prometheusalerting-app/latest/fundamentals/notifications/routing-tree/).
4. **Suppress, if applicable.** A matching silence, an active inhibition rule, or a route muted by a time interval stops the notification here.
5. **Notify.** The receiver’s integrations are called. Refer to [Receivers](/docs/plugins/grafana-prometheusalerting-app/latest/fundamentals/notifications/receivers/).

The important consequence: a firing alert and a delivered notification are different things. Most “the alert fired but nobody was paged” problems are a suppression or routing step in the middle, not a broken rule.

## Three ways to suppress a notification

They’re easy to confuse, and the plugin exposes all three separately:

Expand table

| Mechanism           | Suppresses                                         | Typical use                                                 |
|---------------------|----------------------------------------------------|-------------------------------------------------------------|
| **Silence**         | Alerts matching label matchers, for a fixed window | Planned maintenance, a known issue being worked on          |
| **Inhibition rule** | Alerts of one kind while another kind is firing    | Don’t page for every service when the whole cluster is down |
| **Time interval**   | Notifications on a route, during recurring windows | Don’t send non-urgent alerts overnight                      |

A silence is a one-off you create by hand and that expires. An inhibition rule is standing configuration driven by other alerts. A time interval is a recurring schedule attached to a route.

The **Alerts** page shows which of these applied, labeling an alert as silenced by a silence, inhibited by an inhibition rule, or muted by a time interval.

## In this section

- [The routing tree](/docs/plugins/grafana-prometheusalerting-app/latest/fundamentals/notifications/routing-tree/)
- [Receivers](/docs/plugins/grafana-prometheusalerting-app/latest/fundamentals/notifications/receivers/)
- [Group alert notifications](/docs/plugins/grafana-prometheusalerting-app/latest/fundamentals/notifications/group-alert-notifications/)
