---
title: "SAP HANA annotations | Grafana Enterprise Plugins documentation"
description: "Use SAP HANA data as annotations in Grafana."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Annotations

Annotations allow you to overlay event data on your graphs. You can use SAP HANA data to create annotations that mark important events such as deployments, incidents, or other significant occurrences directly on your time-series visualizations.

For more information about annotations in Grafana, refer to [Annotate visualizations](/docs/grafana/latest/dashboards/build-dashboards/annotate-visualizations/).

## Annotation query requirements

Your annotation query must return at least:

- One **time column** (timestamp, date, or epoch value)
- One **text column** (the annotation content)

Optionally, you can include additional columns for:

- **Tags:** Categorize annotations for filtering
- **Title:** A separate title field for the annotation

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

## Example annotation query

The following example creates annotations from a table containing deployment events:

SQL [Copy code to clipboard] Copy

```sql
SELECT
  deployment_time AS time,
  CONCAT('Deployed version ', version) AS text,
  deployed_by AS tags
FROM deployments
WHERE $__timeFilter(deployment_time)
ORDER BY deployment_time ASC
```

This query:

- Returns the deployment timestamp as the `time` column
- Creates annotation text showing the deployed version
- Uses the deployer name as a tag for filtering

## Annotation display

Annotations appear as vertical markers on your graph panels. Hover over a marker to see the annotation details.

## Annotation display options

When configuring annotations, you can customize how they appear:

- **Color:** Choose distinct colors for different annotation types to easily differentiate them.
- **Show in:** Select which panels display the annotation (All panels or specific panels).
- **Hide:** Temporarily hide annotations without deleting them.

## Use template variables in annotations

You can use [template variables](/docs/plugins/grafana-saphana-datasource/latest/template-variables/) in your annotation queries to create dynamic annotations that respond to dashboard variable selections.

**Example:**

SQL [Copy code to clipboard] Copy

```sql
SELECT
  event_time AS time,
  event_description AS text
FROM events
WHERE $__timeFilter(event_time)
  AND environment = '${environment}'
ORDER BY event_time ASC
```

This query filters annotations based on the selected `environment` variable.

## Additional resources

- [Annotate visualizations](/docs/grafana/latest/dashboards/build-dashboards/annotate-visualizations/)
- [SAP HANA query editor](/docs/plugins/grafana-saphana-datasource/latest/query-editor/)
