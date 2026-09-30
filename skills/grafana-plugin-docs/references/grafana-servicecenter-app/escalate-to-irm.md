---
title: "Respond to service issues from Service Center | Grafana Plugins documentation"
description: "Learn how to escalate issues and declare incidents directly from the Service Center using Grafana IRM."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Respond to service issues from Service Center

From Service Center, you can respond quickly to issues affecting your services. If you see signs of service degradation, a missed SLO, or another problem, you can take direct action:

- Escalate the issue to a responsible team or individual
- Declare an incident, automatically labeled with the affected service
- View and contact the current on-call responder for the service

These actions leverage your [Grafana IRM](/docs/grafana-cloud/alerting-and-irm/irm/) configuration to help teams streamline incident response from within the service context.

## Before you begin

To use these IRM features in Service Center, configure the following:

- [Assign a team to each service](/docs/grafana-cloud/alerting-and-irm/service-center/create-a-service/#set-name-and-attributes) in Service Center
- Organization admins can view all teams. All authenticated users can view details for their own teams. [Access to the Teams API](/docs/grafana/latest/developers/http_api/team/#team-api) is required to view team and on-call information across all teams.

To **view on-call information**:

- [Create an on-call schedule](/docs/grafana-cloud/alerting-and-irm/irm/on-call-schedules/create-schedules/) with active participants for each team

To **escalate an issue**:

- [Configure direct paging for the team](/docs/grafana-cloud/alerting-and-irm/irm/integrations/alert-sources/manual/#configure-direct-paging-for-a-team)
- Have one of the following [IRM roles](/docs/grafana-cloud/alerting-and-irm/irm/set-up/manage-access/roles-and-permissions/): **Editor** basic role, **Alert Groups Direct Paging** role, or **OnCaller** role

## Declare an incident

You can declare an incident in Grafana IRM directly from the Service Center:

1. In the service list or service details page, click the **More** menu.
2. Select **Declare incident**.
3. The incident form opens with the service name pre-populated as a label.
4. Provide a title, severity, and any other details.
5. Click **Declare incident**.

[](/media/docs/grafana-cloud/service-center/screenshot-declare-incident.png)

For more information, refer to the [Declare an incident](/docs/grafana-cloud/alerting-and-irm/irm/incident/manage/declare-incident/) documentation.

## Escalate an issue

When you escalate an issue from the Service Center, it connects directly to your IRM escalation workflows.

To escalate a service-related issue:

1. In the service list or service details page, click the **More** menu.
2. Select **Escalate**.
3. In the escalation drawer, add a description of the issue.
4. If the service has a team assigned, that team is added as a default escalation participant. Otherwise, add users or teams manually.
5. Click **Create**.

The escalation creates an alert in Grafana IRM with:

- The service name as a label
- Your description as the alert message
- The selected teams and users as participants
- A link back to the service in the Service Center

For more information, refer to [Respond to alerts in Grafana IRM](/docs/grafana-cloud/alerting-and-irm/irm/use/respond-to-alerts/).

## View who is on-call for a service

The Service Center shows the current on-call user based on your Grafana IRM on-call schedules.

On the service details page, you can view the current on-call user if:

- The service has a team assigned
- That team has an active on-call schedule with at least one participant

[](/media/docs/grafana-cloud/service-center/screenshot-service-center-on-call-now.png)

This section displays:

- The avatar and name of the on-call user
- The associated schedule
- On-call status indicator

## Contact the on-call person for a service

From the Service Center, you can contact responders directly through the IRM on-call user card.

Hover over the on-call avatar to reveal:

- The user’s local time
- Whether the user is within working hours
- **Escalate**: Opens the escalation drawer with the user added by default
- **Slack DM**: Opens a direct message (if Slack is connected)

Even if direct paging is not enabled for the team, you can still escalate to an individual user from the avatar card.
