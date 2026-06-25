---
title: "AppDynamics annotations | Grafana Enterprise Plugins documentation"
description: "Use AppDynamics events as annotations in Grafana."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# AppDynamics annotations

Annotations allow you to overlay event data on your time-series visualizations. You can use the AppDynamics **Events** query type to display application events such as deployments, policy violations, errors, and health rule violations directly on your graphs.

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
5. Select **Events** from the query type selector.
6. Configure the Events query fields described in the following section.
7. Click **Save dashboard**.

## Events query fields

The Events query type retrieves events from the AppDynamics Controller REST API. Configure the following fields to control which events are returned:

Expand table

| Field                | Description                                                                                                                                                                                                              | Required |
|----------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------|
| **application\_id**  | The application name or ID to query events for. Select from the drop-down.                                                                                                                                               | Yes      |
| **summary**          | The summary text to filter events.                                                                                                                                                                                       | Yes      |
| **comment**          | The comment text to filter events.                                                                                                                                                                                       | Yes      |
| **eventtype**        | The type of event. Default: `APPLICATION_DEVELOPMENT`.                                                                                                                                                                   | Yes      |
| **time-range-type**  | Controls the time range for the query. Select from the drop-down: `BETWEEN_TIMES` (default), `BEFORE_NOW`, `BEFORE_TIME`, or `AFTER_TIME`. When set to `BETWEEN_TIMES`, the dashboard time picker is used automatically. | Yes      |
| **duration-in-mins** | Duration in minutes. Used with `BEFORE_NOW`, `BEFORE_TIME`, or `AFTER_TIME` range types.                                                                                                                                 | No       |
| **start-time**       | Start time in milliseconds. Hidden when the **Use dashboard’s time picker** toggle is on.                                                                                                                                | No       |
| **end-time**         | End time in milliseconds. Hidden when the **Use dashboard’s time picker** toggle is on.                                                                                                                                  | No       |
| **event-types**      | Comma-separated list of event types to filter. Select from the drop-down or enter values manually.                                                                                                                       | No       |
| **severities**       | The severity levels to include. Select from the drop-down: `INFO`, `WARN`, or `ERROR`.                                                                                                                                   | Yes      |
| **tier**             | Filter events to a specific tier within the application.                                                                                                                                                                 | No       |

The Events query type supports a **Use dashboard’s time picker** toggle. When enabled (default), the query automatically uses the dashboard’s time range and the **start-time** and **end-time** fields are hidden. When disabled, you can specify a fixed time range using the **time-range-type**, **start-time**, and **end-time** fields.

## Common event types

AppDynamics provides a wide range of event types. The following are commonly used for annotations:

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

For the complete list of supported event types, refer to the [AppDynamics Events and Action Suppression API](https://docs.appdynamics.com/appd/24.x/latest/en/extend-splunk-appdynamics/splunk-appdynamics-apis/alert-and-respond-api/events-and-action-suppression-api).

## Example: Deployment annotations

Overlay application deployment events on your dashboards to correlate deployments with performance changes:

1. Create a new annotation query.
2. Select **Events** from the query type selector.
3. Select your application from the **application\_id** drop-down.
4. Select `APPLICATION_DEPLOYMENT` from the **event-types** drop-down.
5. Select `INFO` from the **severities** drop-down.
6. Leave the **Use dashboard’s time picker** toggle enabled.

## Example: Policy violation annotations

Display health rule violations to identify when alerting policies triggered:

1. Create a new annotation query.
2. Select **Events** from the query type selector.
3. Select your application from the **application\_id** drop-down.
4. Select `POLICY_OPEN_CRITICAL`, `POLICY_OPEN_WARNING`, `POLICY_CLOSE_CRITICAL`, and `POLICY_CLOSE_WARNING` from the **event-types** drop-down.
5. Select `WARN` and `ERROR` from the **severities** drop-down.

## Example: Error and slow transaction annotations

Mark error and slow transaction events on your response time graphs:

1. Create a new annotation query.
2. Select **Events** from the query type selector.
3. Select your application from the **application\_id** drop-down.
4. Select `APPLICATION_ERROR`, `SLOW`, `VERY_SLOW`, and `STALL` from the **event-types** drop-down.
5. Select `WARN` and `ERROR` from the **severities** drop-down.

## Use template variables in annotations

You can use [template variables](/docs/plugins/dlopes7-appdynamics-datasource/latest/template-variables/) in annotation queries. For example, if you have a variable named `application`, use `${application}` in the **application\_id** field to dynamically filter events based on the selected application.

## Annotation display options

When configuring annotations, you can customize how they appear:

- **Color**: Choose distinct colors for different annotation types to easily differentiate them.
- **Show in**: Select which panels display the annotation (all panels or specific panels).
- **Hide**: Temporarily hide annotations without deleting them.

## Additional resources

- [Annotate visualizations](/docs/grafana/latest/dashboards/build-dashboards/annotate-visualizations/)
- [AppDynamics Events and Action Suppression API](https://docs.appdynamics.com/appd/24.x/latest/en/extend-splunk-appdynamics/splunk-appdynamics-apis/alert-and-respond-api/events-and-action-suppression-api)
