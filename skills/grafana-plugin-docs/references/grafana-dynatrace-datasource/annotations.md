---
title: "Dynatrace annotations | Grafana Enterprise Plugins documentation"
description: "Use Dynatrace data as annotations in Grafana."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Annotations

Annotations allow you to overlay event data on your graphs. You can use Dynatrace data to create annotations that mark important events such as problems, deployments, or configuration changes directly on your time-series visualizations.

## Supported annotation sources

The Dynatrace plugin supports using any query type as an annotation source. The most common use cases include:

Expand table

| Query type        | Use case                                                                                              |
|-------------------|-------------------------------------------------------------------------------------------------------|
| Problems          | Mark when problems were detected and resolved in your environment.                                    |
| Problems V2       | Same as Problems, using the newer API with additional filtering options.                              |
| Direct API Access | Display Dynatrace events such as deployments or configuration changes using the `v2/events` endpoint. |
| Logs              | Highlight specific log events on your graphs.                                                         |
| Audit Logs        | Show administrative and configuration change events.                                                  |

## Create an annotation

To create an annotation using Dynatrace data:

1. Open your dashboard and click **Dashboard settings** (gear icon).
2. Select **Annotations** from the left menu.
3. Click **Add annotation query**.
4. Configure the annotation:

   - **Name**: Enter a descriptive name for the annotation.
   - **Data source**: Select your Dynatrace data source.
   - **Enabled**: Toggle on to display the annotation.
   - **Color**: Choose a color for the annotation markers.
5. Configure your query using the Dynatrace query editor.
6. Click **Save dashboard**.

## Example: Problems as annotations

A common use case is displaying Dynatrace problems as annotations on metric graphs. This helps correlate performance issues with detected problems.

To create a problems annotation:

1. Create a new annotation as described above.
2. Select **Problems** or **Problems V2** as the query type.
3. Configure filters as needed:

   - **Status**: Filter by problem status (OPEN or CLOSED).
   - **Impact**: Filter by impact level (APPLICATION, ENVIRONMENT, INFRASTRUCTURE, or SERVICE).
   - **Severity**: Filter by severity (AVAILABILITY, ERROR, PERFORMANCE, and others).
4. Click **Save dashboard**.

Problems appear as vertical markers on your graphs. Hover over a marker to see problem details.

## Example: Events as annotations

You can display Dynatrace events (such as deployments or configuration changes) as annotations using the Direct API Access query type.

To create an events annotation:

1. Create a new annotation as described above.
2. Select **Direct API Access** as the query type.
3. Enter the API endpoint: `v2/events`
4. Configure field extraction to display event details (for example, `eventType`, `title`, `startTime`).
5. Click **Save dashboard**.

## Example: Audit logs as annotations

You can overlay administrative and configuration-change events on your graphs to correlate them with changes in performance.

To create an audit logs annotation:

1. Create a new annotation as described above.
2. Select **Audit Logs** as the query type.
3. *(Optional)* In the **Filter** field, narrow the results with criteria such as `eventType("CREATE","UPDATE")` or `category("CONFIG")`.
4. Click **Save dashboard**.

Audit log entries appear as markers showing when administrative or configuration changes occurred.

## Example: Logs as annotations

You can highlight specific log events, such as errors, directly on your time-series graphs.

To create a logs annotation:

1. Create a new annotation as described above.
2. Select **Logs** as the query type.
3. In the **Query** field, enter a log search query such as `loglevel="error"`.
4. Click **Save dashboard**.

Matching log events appear as markers on your graphs.

## Annotation display options

When configuring annotations, you can customize how they appear:

- **Color**: Choose distinct colors for different annotation types to easily differentiate them.
- **Show in**: Select which panels display the annotation (All panels or specific panels).
- **Hide**: Temporarily hide annotations without deleting them.

## Using template variables in annotations

You can use [template variables](https://grafana.com/docs/plugins/grafana-dynatrace-datasource/latest/template-variables/) in your annotation queries to create dynamic annotations that respond to dashboard variable selections. For example, filter problems by a selected management zone variable.

## Additional resources

For more information about annotations in Grafana, refer to [Annotate visualizations](https://grafana.com/docs/grafana/latest/dashboards/build-dashboards/annotate-visualizations/).
