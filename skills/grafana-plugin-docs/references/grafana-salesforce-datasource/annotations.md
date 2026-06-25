---
title: "Salesforce annotations | Grafana Enterprise Plugins documentation"
description: "Use Salesforce data as annotations in Grafana."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Salesforce annotations

Annotations allow you to overlay event data on your graphs. You can use Salesforce data to create annotations that mark important events such as opportunity close dates, task due dates, or case creation times directly on your time-series visualizations.

For an overview of annotations, refer to [Annotate visualizations](/docs/grafana/latest/dashboards/build-dashboards/annotate-visualizations/).

## Supported visualizations

Annotations work with the following visualization types:

- Time series
- State timeline
- Candlestick

## Create an annotation

To create an annotation using Salesforce data:

1. Open your dashboard and click **Dashboard settings** (gear icon).
2. Select **Annotations** from the left menu.
3. Click **Add annotation query**.
4. Configure the annotation:

   - **Name**: Enter a descriptive name for the annotation.
   - **Data source**: Select your Salesforce data source.
   - **Enabled**: Toggle on to display the annotation.
   - **Color**: Choose a color for the annotation markers.
5. Write a SOQL query that returns your event data.
6. Click **Save dashboard**.

## Query format for annotations

Your SOQL query should return fields that Grafana can use for annotations. The following field names are recognized:

Expand table

| Field     | Description                                    |
|-----------|------------------------------------------------|
| `time`    | The timestamp for the annotation (required)    |
| `timeEnd` | End timestamp for range annotations (optional) |
| `title`   | Short title displayed on hover                 |
| `text`    | Detailed description displayed on hover        |
| `tags`    | Comma-separated tags for filtering             |

Alias your SOQL fields to match these names for proper annotation display.

## Example: Opportunity close dates

Mark when opportunities are scheduled to close to correlate with sales metrics:

soql [Copy code to clipboard] Copy

```soql
SELECT
  CloseDate time,
  Name title,
  CONCAT('Amount: $', Amount, ' | Stage: ', StageName) text,
  StageName tags
FROM Opportunity
WHERE CloseDate >= $__timeFrom
  AND CloseDate <= $__timeTo
ORDER BY CloseDate
```

## Example: Task due dates

Display task deadlines on your dashboards:

soql [Copy code to clipboard] Copy

```soql
SELECT
  ActivityDate time,
  Subject title,
  CONCAT('Priority: ', Priority, ' | Status: ', Status) text,
  Priority tags
FROM Task
WHERE ActivityDate >= $__timeFrom
  AND ActivityDate <= $__timeTo
  AND IsClosed = false
ORDER BY ActivityDate
```

## Example: Case creation events

Track when cases are created to identify support volume patterns:

soql [Copy code to clipboard] Copy

```soql
SELECT
  CreatedDate time,
  Subject title,
  CONCAT('Priority: ', Priority, ' | Status: ', Status, ' | Origin: ', Origin) text,
  Priority tags
FROM Case
WHERE CreatedDate >= $__timeFrom
  AND CreatedDate <= $__timeTo
ORDER BY CreatedDate
```

## Example: Login history

Monitor login activity by overlaying login events on your metrics:

soql [Copy code to clipboard] Copy

```soql
SELECT
  LoginTime time,
  CONCAT('Login: ', UserId) title,
  CONCAT('Platform: ', Platform, ' | Browser: ', Browser) text,
  Status tags
FROM LoginHistory
WHERE LoginTime >= $__timeFrom
  AND LoginTime <= $__timeTo
ORDER BY LoginTime
```

## Example: Event calendar items

Display Salesforce Events (meetings, calls) as annotations:

soql [Copy code to clipboard] Copy

```soql
SELECT
  StartDateTime time,
  EndDateTime timeEnd,
  Subject title,
  Description text,
  Type tags
FROM Event
WHERE StartDateTime >= $__timeFrom
  AND StartDateTime <= $__timeTo
ORDER BY StartDateTime
```

## Use template variables in annotations

You can use [template variables](/docs/plugins/grafana-salesforce-datasource/latest/template-variables/) in your annotation queries to create dynamic annotations. For example, filter opportunities by a selected owner:

soql [Copy code to clipboard] Copy

```soql
SELECT
  CloseDate time,
  Name title,
  StageName text
FROM Opportunity
WHERE CloseDate >= $__timeFrom
  AND CloseDate <= $__timeTo
  AND OwnerId = '${user}'
ORDER BY CloseDate
```

## Annotation display options

When configuring annotations, you can customize how they appear:

- **Color**: Choose distinct colors for different annotation types to easily differentiate them.
- **Show in**: Select which panels display the annotation (All panels or specific panels).
- **Hide**: Temporarily hide annotations without deleting them.

## Additional resources

For more information about annotations in Grafana, refer to [Annotate visualizations](/docs/grafana/latest/dashboards/build-dashboards/annotate-visualizations/).
