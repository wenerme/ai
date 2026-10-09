---
title: "AppDynamics annotations | Grafana Enterprise Plugins documentation"
description: "Use AppDynamics events as annotations in Grafana."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# AppDynamics annotations

Use the AppDynamics **Events** query type to overlay Controller events on time-series panels. Typical markers include deployments, errors, slow transactions, and policy activity.

To mark health-rule policy activity, use Events with `POLICY_*` values in **event-types**. The **Health** query type returns a table of health rule violations. It isn’t an annotation query.

For an overview of annotations, refer to [Annotate visualizations](/docs/grafana/latest/dashboards/build-dashboards/annotate-visualizations/).

## Create an annotation

To create an annotation using AppDynamics event data:

1. Open your dashboard and click **Dashboard settings** (gear icon).
2. Select **Annotations** from the left menu.
3. Click **Add annotation query**.
4. Configure the annotation:

   - **Name**: Enter a descriptive name for the annotation.
   - **Data source**: Select your AppDynamics data source.
   - **Enabled**: Toggle on to display the annotation.
   - **Color**: Choose a color for the annotation markers.
5. Select **Events** from the query type radio buttons.
6. Configure the Events query fields described in the following section.
7. Click **Save dashboard**.

## Events query fields

The Events query type retrieves events from the AppDynamics Controller REST API. **eventtype** and **event-types** are different fields. Use **event-types** to choose which events AppDynamics returns. Leave **eventtype** at the editor default unless you have a reason to change it.

The editor marks **summary** and **comment** required. Fill them to satisfy the form. They don’t replace **event-types**.

Expand table

| Field                | Description                                                                                                                                                                                  | Required |
|----------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------|
| **application\_id**  | Application name or ID. Select from the drop-down, or type a template variable such as `${application}` as a custom value.                                                                   | Yes      |
| **summary**          | Summary text. Required by the editor.                                                                                                                                                        | Yes      |
| **comment**          | Comment text. Required by the editor.                                                                                                                                                        | Yes      |
| **eventtype**        | Separate from **event-types**. The editor default is `APPLICATION_DEVELOPMENT`.                                                                                                              | Yes      |
| **time-range-type**  | How the time window is calculated: `BETWEEN_TIMES` (default), `BEFORE_NOW`, `BEFORE_TIME`, or `AFTER_TIME`.                                                                                  | Yes      |
| **duration-in-mins** | Duration in minutes. Used with `BEFORE_NOW`, `BEFORE_TIME`, or `AFTER_TIME`.                                                                                                                 | No       |
| **start-time**       | Start time in milliseconds. Hidden when **Use dashboard’s time picker** is on.                                                                                                               | No       |
| **end-time**         | End time in milliseconds. Hidden when **Use dashboard’s time picker** is on.                                                                                                                 | No       |
| **event-types**      | Event types to retrieve. Pick one value, or type a comma-separated list as a custom value. AppDynamics retrieve requests require this field even though the editor doesn’t mark it required. | No       |
| **severities**       | `INFO`, `WARN`, or `ERROR`. Pick one value, or type a comma-separated list such as `WARN,ERROR`.                                                                                             | Yes      |
| **tier**             | Limit events to a tier.                                                                                                                                                                      | No       |

The Events query type includes a **Use dashboard’s time picker** toggle. When enabled (the default for new queries), the query uses the dashboard time range and hides **start-time** and **end-time**. When disabled, set a fixed range with **time-range-type**, **start-time**, **end-time**, and **duration-in-mins** as needed.

## Common event types

Use these values in **event-types**. They aren’t interchangeable with the **eventtype** default.

Expand table

| Event type                  | Description                        |
|-----------------------------|------------------------------------|
| `APPLICATION_DEPLOYMENT`    | Application deployment events      |
| `APP_SERVER_RESTART`        | Application server restart events  |
| `APPLICATION_ERROR`         | Application errors                 |
| `APPLICATION_CONFIG_CHANGE` | Configuration changes              |
| `POLICY_OPEN_CRITICAL`      | Critical policy violation opened   |
| `POLICY_OPEN_WARNING`       | Warning policy violation opened    |
| `POLICY_CLOSE_CRITICAL`     | Critical policy violation resolved |
| `POLICY_CLOSE_WARNING`      | Warning policy violation resolved  |
| `SLOW`                      | Slow transaction events            |
| `VERY_SLOW`                 | Very slow transaction events       |
| `STALL`                     | Stalled transaction events         |
| `DEADLOCK`                  | Deadlock events                    |

For the complete list of supported event types, refer to the [AppDynamics Events API](https://docs.appdynamics.com/appd/24.x/latest/en/extend-splunk-appdynamics/splunk-appdynamics-apis/alert-and-respond-api/events-api).

## Example: Deployment annotations

Overlay application deployment events to correlate deployments with performance changes:

1. Create a new annotation query.
2. Select **Events** from the query type radio buttons.
3. Select your application from **application\_id**, or type `${application}`.
4. Fill **summary** and **comment**.
5. Leave **eventtype** at the default.
6. Select `APPLICATION_DEPLOYMENT` from **event-types**.
7. Select `INFO` from **severities**.
8. Leave **Use dashboard’s time picker** enabled.

## Example: Policy violation annotations

Overlay policy open and close events. This uses the Events query with `POLICY_*` types, not the Health query type.

1. Create a new annotation query.
2. Select **Events** from the query type radio buttons.
3. Select your application from **application\_id**, or type `${application}`.
4. Fill **summary** and **comment**.
5. Leave **eventtype** at the default.
6. In **event-types**, type `POLICY_OPEN_CRITICAL,POLICY_OPEN_WARNING,POLICY_CLOSE_CRITICAL,POLICY_CLOSE_WARNING`.
7. In **severities**, type `WARN,ERROR`.
8. Leave **Use dashboard’s time picker** enabled.

## Example: Error and slow transaction annotations

Mark error and slow transaction events on response time graphs:

1. Create a new annotation query.
2. Select **Events** from the query type radio buttons.
3. Select your application from **application\_id**, or type `${application}`.
4. Fill **summary** and **comment**.
5. Leave **eventtype** at the default.
6. In **event-types**, type `APPLICATION_ERROR,SLOW,VERY_SLOW,STALL`.
7. In **severities**, type `WARN,ERROR`.
8. Leave **Use dashboard’s time picker** enabled.

## Use template variables in annotations

You can use [template variables](/docs/plugins/dlopes7-appdynamics-datasource/latest/template-variables/) in annotation queries. The **application\_id** drop-down lists applications, not dashboard variables. Type `${application}` as a custom value rather than selecting a numeric application ID.

## Annotation display options

Grafana annotation queries also include display settings:

- **Color**: Choose a color for the markers.
- **Show in**: Choose all panels or specific panels.
- **Hide**: Hide the annotation without deleting it.

## Additional resources

- [Annotate visualizations](/docs/grafana/latest/dashboards/build-dashboards/annotate-visualizations/)
- [AppDynamics Events API](https://docs.appdynamics.com/appd/24.x/latest/en/extend-splunk-appdynamics/splunk-appdynamics-apis/alert-and-respond-api/events-api)
- [AppDynamics query editor](/docs/plugins/dlopes7-appdynamics-datasource/latest/query-editor/)
