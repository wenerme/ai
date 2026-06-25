---
title: "Set up alerting for Jira data | Grafana Enterprise Plugins documentation"
description: "Learn how to create alerts based on Jira issue data"
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Set up alerting for Jira data

The Jira data source supports Grafana Alerting, allowing you to create alerts based on Jira issue metrics. Use alerts to get notified when issue counts exceed thresholds, SLA targets are at risk, or sprint velocity changes significantly.

For general information about Grafana Alerting, refer to [Grafana Alerting](/docs/grafana/latest/alerting/).

## Before you begin

Before you create alerts based on Jira data:

- Ensure your Jira data source is configured and working.
- Verify your query returns numeric data (alerts require numeric values to evaluate conditions).
- Plan your alert thresholds based on your team’s workflow.

## Create an alert rule

To create an alert rule based on Jira data:

1. Open a dashboard panel that uses the Jira data source.
2. Click the panel title and select **Edit**.
3. Click the **Alert** tab.
4. Click **Create alert rule from this panel**.
5. Configure the alert rule:

   - **Rule name**: Enter a descriptive name for the alert.
   - **Evaluate every**: Set how often the alert condition is evaluated.
   - **For**: Set how long the condition must be true before alerting.
6. Define the alert condition based on your query results.
7. Configure notifications and labels.
8. Click **Save rule**.

For detailed instructions, refer to [Create Grafana-managed alert rules](/docs/grafana/latest/alerting/alerting-rules/create-grafana-managed-rule/).

## Common alerting use cases

The following examples demonstrate common alerting scenarios with Jira data.

### Alert on high issue count

Get notified when the number of open issues exceeds a threshold:

1. Create a query:

   - Select Fields: **Key**
   - Add JQL Filter: `project = 'Your Project' AND status != done`
2. Add the **Count** transformation or use the **Reduce** transformation with Count.
3. Set the alert condition: `WHEN last() OF query IS ABOVE 50`

### Alert on overdue issues

Get notified when issues are past their due date:

1. Create a query:

   - Select Fields: **Key**, **Due Date**
   - Add JQL Filter: `project = 'Your Project' AND due < now() AND status != done`
2. Add the **Count** transformation.
3. Set the alert condition: `WHEN last() OF query IS ABOVE 0`

### Alert on sprint burndown

Get notified when remaining story points exceed expected values:

1. Create a query:

   - Select Fields: **Story point estimate**
   - Add JQL Filter: `project = 'Your Project' AND sprint in openSprints() AND status != done`
2. Add the **Reduce** transformation with **Total** calculation.
3. Set the alert condition based on your expected burndown rate.

### Alert on critical issues

Get notified immediately when critical or blocker issues are created:

1. Create a query:

   - Select Fields: **Key**
   - Add JQL Filter: `project = 'Your Project' AND priority IN ('Critical', 'Blocker') AND created >= -1h`
2. Add the **Count** transformation.
3. Set the alert condition: `WHEN last() OF query IS ABOVE 0`
4. Set **Evaluate every** to `5m` for quick notification.

## Transform data for alerting

Alerts require numeric data. Use transformations to convert Jira issue data into alertable metrics:

### Count issues

Use the **Reduce** transformation to count issues:

1. Add the **Reduce** transformation.
2. Set Mode: **Series to rows**.
3. Set Calculations: **Count**.

### Sum numeric fields

Use the **Reduce** transformation to sum story points or other numeric fields:

1. Add the **Reduce** transformation.
2. Set Mode: **Series to rows**.
3. Set Calculations: **Total**.

### Group and aggregate

Use the **Group By** transformation to create metrics by category:

1. Add the **Group By** transformation.
2. Group by a field (for example, **Status** or **Priority**).
3. Aggregate another field with **Count** or **Total**.

## Alert notification channels

Configure where alert notifications are sent:

- Email
- Slack
- PagerDuty
- Microsoft Teams
- Webhooks
- And more

For instructions on setting up notification channels, refer to [Configure contact points](/docs/grafana/latest/alerting/configure-notifications/manage-contact-points/).

## Best practices

Consider the following best practices when setting up Jira alerts:

- **Set appropriate evaluation intervals**: Jira data doesn’t change as frequently as metrics data. Evaluating every 5-15 minutes is usually sufficient.
- **Use the “For” duration**: Prevent alert flapping by requiring the condition to be true for a period (for example, 5 minutes) before alerting.
- **Include context in notifications**: Add labels and annotations to include project name, issue count, and links to relevant dashboards.
- **Test your alerts**: Use the **Test rule** feature to verify your alert conditions work as expected.
