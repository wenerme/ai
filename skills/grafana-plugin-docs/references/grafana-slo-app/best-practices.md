---
title: "Best practices for Grafana SLOs | Grafana Plugins documentation"
description: "Best practices for Grafana SLOs"
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Best practices for Grafana SLOs

Because SLOs are still a relatively new practice, it can feel overwhelming when you start to create SLOs for the first time. To help simplify things, some best practices for SLOs and SLO queries are provided on this page.

## What is a good SLO?

A Service Level Objective (SLO) is meant to define specific, measurable targets which represent the quality of service provided by a service provider to its users. The best place to start is with the level of service your customers expect. Sometimes these are written into formal service level agreements (SLAs) with customers, and sometimes they are implicit in customers expectations for a service.

Good SLOs are simple. Don’t use every metric you can track as an SLI; choose the ones that really matter to the consumers of your service. If you choose too many, it’ll make it hard to pay attention to the ones that matter.

### A good SLO is attainable, not aspirational

Start with a realistic target. Unrealistic goals create unnecessary frustration which can then eclipse useful feedback from the SLO. Remember, this is meant to be achievable and it is meant to reflect the user experience. An SLO is not an OKR.

It’s also important to make your SLO simple and understandable. The most effective SLOs are the ones that are readable for all stakeholders.

### Target services with good traffic

Too little traffic is insufficient for monitoring trends and can cause noisy alerts and irregularities can be reflected disproportionately with low-traffic environments. Conversely, too much traffic can mask customer-specific issues.

## Team alignment

Teams should be the ones to create SLOs and SLIs, not managers. Your SLOs should communicate to you feedback for your services and the customer experience with them, so it’s good for the team to work together to create the SLOs.

### Embed SLO review in team rituals

As you work with SLOs, the information they provide can help guide decision-making because they add context and correlate patterns. This can help when there’s a need to balance reliability and feature velocity. Early on, it’s good practice for teams to review SLOs at regular intervals.

### Iterate and adjust

Once SLO review is a part of your team rituals it’s important to iterate on the information you have to be able to make continuously more informed decisions.

As you learn more from your SLOs, you may learn your assumptions don’t reflect practical reality. In the early period of SLO implementation, you may find there are a number of factors you hadn’t previously considered. If you have a lot of error budget left over, you can adjust your objectives accordingly.

## Keep SLI queries simple

There are many approaches to how you configure your SLI queries. Ultimately, it all depends on your needs.

If your metrics aren’t suited for event-based SLIs or don’t reflect the user experience, update your service instrumentation rather than working around with complex SLI queries.

Tips for creating effective SLIs:

- **Start with availability and latency**. These are the most common SLO types for request-driven services. See the [availability examples](/docs/grafana-cloud/alerting-and-irm/slo/sli-examples/availability/) and [latency examples](/docs/grafana-cloud/alerting-and-irm/slo/sli-examples/latency/).
- **Test from the user’s perspective**. Consider using Synthetic Monitoring probes from one or more geographic locations where your users are.
- **Decide between aggregated and multidimensional SLIs, or both**. Multidimensional SLIs let you filter consumption and set alerts for each dimension (for example, every `cluster` or `probe`). See the [multidimensional example](/docs/grafana-cloud/alerting-and-irm/slo/sli-examples/multidimensional/).
- **Use event-based SLIs over time-based SLIs**. Event-based SLIs are generally more accurate, and Grafana SLO doesn’t support all dashboard views for time-based SLIs. Learn more about [SLI calculation types](/docs/grafana-cloud/alerting-and-irm/slo/sli-examples/).
- **Avoid percentiles in SLIs**. SLIs should count all requests meeting the target, not just a percentile (for example, “p95 latency under 2s”). Percentiles from histograms can also be inaccurate. See the [latency examples](/docs/grafana-cloud/alerting-and-irm/slo/sli-examples/latency/).

## Alerts and labels

SLO alerts are different from typical data source alerts. Because alerts for SLOs let you know there is a trend in your burn rate that needs attention, it’s important to understand how to set up and balance fast-burn and slow-burn alerts to keep you informed without inducing alerting fatigue.

### SLO alerting system configuration and migration guide

By default, Grafana SLOs are configured to use [Grafana-managed alert rules](/docs/grafana/latest/alerting/fundamentals/alert-rules/). You can also choose to use data source-managed alert rules if you prefer.

To change your alerting system preferences for SLOs

1. Go to **Administration &gt; Plugins and data &gt; Plugins** and click on the SLO card.
2. Click Configuration and select your desired alerting system from the dropdown menu.
   Click **Save** to apply the changes.

When you change your alerting system, the alert rules transfer from one alerting system to the other. All SLOs use the alerting system you select. When switching from one alerting system to another, make sure that you have configured Notification Policies and Contact Points in the new system’s Alertmanager to avoid missing alert notifications. Alerts are routed by matching their labels to Notification Polices, which send notifications to Contact Points. Learn more about the [different AlertManagers](/docs/grafana/latest/alerting/set-up/configure-alertmanager/#types-of-alertmanagers-in-grafana) and about [how to configure alert notifications](/docs/grafana/latest/alerting/configure-notifications/).

Note that only the alert rules move between alerting systems. The recording rules are unchanged.

> Note
>
> For stacks using data source-managed alerting, the SLO data source-managed alert rules are stored in a Grafana Mimir namespace called `grafana_slo_<STACK ID>` where the stack ID refers to the stack in which the SLO plugin is running. This enables you to quickly search for and uniquely identify SLO alert rules.

### Prioritize your alerts

Have your alerts routed first to designated individuals to validate your SLI. Send notifications to designated engineers through OnCall or your main escalation channel when fast-burn alerts fire so that the appropriate people can quickly respond to possible pressing issues. Send group notifications for slow-burn alerts to analyze and respond to as a team during normal working hours.

#### Use SLO alerts to trigger Grafana OnCall

If you’ve [configured OnCall for Grafana Alerting](/docs/grafana/latest/alerting/configure-notifications/manage-contact-points/integrations/configure-oncall/), you may want to forward SLO alerts to Oncall as well. To forward alerts to OnCall by adding a contact point with a webhook on the “ngalertmanager” alert manager.

### Use labels

Set up good label practices. Keep them limited to make them navigable and consumable for triage.

Grafana SLOs use two label types: SLO labels and Alert labels. SLO labels are for grouping and filtering SLOs. Alert labels are added to slow and fast burn alerts and are used to route notifications and add metadata to alerts.

### Minimum Failures

To reduce alert fatigue a team may want to set a minimum number of failures (as defined by `(success events - total events)`) before an alert is triggered. This is most common for SLIs built on processes that have heavily periodic or spiky traffic where the low traffic rates make alerting rules unreliable.

The ideal solution for low-traffic is to supplement your traffic flow with synthetics to ensure you always get a clear signal on whether your failure events represent an issue.

If you are unable to use synthetics, you can choose to change the Minimum Failures [advanced feature](/docs/grafana-cloud/alerting-and-irm/slo/create/#add-slo-alert-rules-and-assistant-investigations) number. This number is applied to all your alerting time windows for the SLO, the smallest of which is 1 hour. This means that, if your service never gets enough traffic to exceed the Minimum Failures number, it won’t trigger an alert.

## Additional reference materials

Google provides good introductory documentation on SLOs in their [SRE Book](https://sre.google/sre-book/service-level-objectives/). They also provide useful guides on [SLO implementation](https://sre.google/workbook/alerting-on-slos/) and [alerting on SLOs](https://sre.google/workbook/alerting-on-slos/).
