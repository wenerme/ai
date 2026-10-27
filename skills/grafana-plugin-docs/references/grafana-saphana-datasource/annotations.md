---
title: "SAP HANA annotations | Grafana Enterprise Plugins documentation"
description: "Use SAP HANA data as annotations in Grafana."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# SAP HANA annotations

Annotations allow you to overlay event data on your graphs. You can use SAP HANA data to create annotations that mark important events such as deployments, incidents, or other significant occurrences directly on your time-series visualizations.

For more information about annotations in Grafana, refer to [Annotate visualizations](http://grafana-com-website.grafana-com.svc.cluster.local.:80/docs/grafana/latest/dashboards/build-dashboards/annotate-visualizations/).

## Annotation query requirements

Your annotation query must return at least:

- One **time column** (timestamp, date, or epoch value) for the annotation’s start time
- One **text column** for the annotation content

Optionally, include additional columns to enrich your annotations:

- **timeEnd:** An end time. Return both `time` and `timeEnd` to create a region annotation that spans a time range.
- **title:** A separate title displayed above the annotation text.
- **tags:** One or more tags for filtering. Return tags as a comma-separated string to apply multiple tags to a single annotation.

Grafana automatically recognizes columns named `time`, `timeEnd`, `text`, `title`, and `tags`. If your columns use different names, map them to the correct annotation fields in the annotation editor.

## Create an annotation

To create an annotation using SAP HANA data:

1. Open your dashboard and click **Dashboard settings** (gear icon).
2. Select **Annotations** from the left menu.
3. Click **Add annotation query**.
4. Configure the annotation:

   - **Name:** Enter a descriptive name for the annotation.
   - **Data source:** Select your SAP HANA data source.
   - **Enabled:** Toggle on to display the annotation.
   - **Color:** Choose a color for the annotation markers.
5. In the **Query** field, enter a SAP HANA query that returns at least one time field and one text field.
6. From the **Format as** drop-down, select **Time Series**.
7. Configure the **From** field mappings.
8. Click **Save dashboard**.

## Example: Deployment event annotation

The following example creates point annotations from a table containing deployment events:

SQL ![Copy code to clipboard](http://grafana-com-website.grafana-com.svc.cluster.local.:80/media/images/icons/icon-copy-small-2.svg) Copy

```sql
SELECT
  "deployment_time" AS "time",
  CONCAT('Deployed version ', "version") AS "text",
  "deployed_by" AS "tags"
FROM "deployments"
WHERE $__timeFilter(deployment_time)
ORDER BY "deployment_time" ASC
```

This query:

- Returns the deployment timestamp as the `time` column
- Creates annotation text showing the deployed version
- Uses the `deployed_by` value as a tag for filtering

## Example: Region annotation

Return both a `time` and a `timeEnd` column to create a region annotation that highlights a span of time, such as an incident window or a maintenance period.

SQL ![Copy code to clipboard](http://grafana-com-website.grafana-com.svc.cluster.local.:80/media/images/icons/icon-copy-small-2.svg) Copy

```sql
SELECT
  "start_time" AS "time",
  "end_time" AS "timeEnd",
  "incident_name" AS "text",
  "severity" AS "tags"
FROM "incidents"
WHERE $__timeFilter(start_time)
ORDER BY "start_time" ASC
```

Grafana shades the area between `time` and `timeEnd` on the graph. If a row has no end time, it renders as a single point annotation.

## Example: Annotation with a title and multiple tags

Use a separate `title` column for a bold heading, and return a comma-separated `tags` column to apply more than one tag to each annotation.

SQL ![Copy code to clipboard](http://grafana-com-website.grafana-com.svc.cluster.local.:80/media/images/icons/icon-copy-small-2.svg) Copy

```sql
SELECT
  "event_time" AS "time",
  "event_type" AS "title",
  "event_message" AS "text",
  CONCAT("environment", ',', "service") AS "tags"
FROM "application_events"
WHERE $__timeFilter(event_time)
ORDER BY "event_time" ASC
```

In this query, `event_type` appears as the annotation title, `event_message` as the body, and the `environment` and `service` values become two separate tags.

## Annotation display

Annotations appear as vertical markers on your graph panels. Hover over a marker to see the annotation details.

## Annotation display options

When configuring annotations, you can customize how they appear:

- **Color:** Choose distinct colors for different annotation types to differentiate them.
- **Show in:** Select which panels display the annotation (All panels or specific panels).
- **Hide:** Temporarily hide annotations without deleting them.

## Use template variables in annotations

You can use [template variables](http://grafana-com-website.grafana-com.svc.cluster.local.:80/docs/plugins/grafana-saphana-datasource/latest/template-variables/) in your annotation queries to create dynamic annotations that respond to dashboard variable selections.

**Example:**

SQL ![Copy code to clipboard](http://grafana-com-website.grafana-com.svc.cluster.local.:80/media/images/icons/icon-copy-small-2.svg) Copy

```sql
SELECT
  "event_time" AS "time",
  "event_description" AS "text"
FROM "events"
WHERE $__timeFilter(event_time)
  AND "environment" = ${environment}
ORDER BY "event_time" ASC
```

This query filters annotations based on the selected `environment` variable.

## Additional resources

- [Annotate visualizations](http://grafana-com-website.grafana-com.svc.cluster.local.:80/docs/grafana/latest/dashboards/build-dashboards/annotate-visualizations/)
- [SAP HANA query editor](http://grafana-com-website.grafana-com.svc.cluster.local.:80/docs/plugins/grafana-saphana-datasource/latest/query-editor/)
