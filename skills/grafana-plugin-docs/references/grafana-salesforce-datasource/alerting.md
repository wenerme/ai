---
title: "Salesforce alerting | Grafana Enterprise Plugins documentation"
description: "Set up alerts using Salesforce data in Grafana."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Salesforce alerting

The Salesforce data source supports [Grafana Alerting](/docs/grafana/latest/alerting/), allowing you to create alert rules based on Salesforce data. You can monitor your Salesforce environment and receive notifications when specific conditions are met, such as when opportunity values drop, case counts spike, or tasks become overdue.

## Before you begin

- Ensure you have the appropriate permissions to create alert rules in Grafana.
- Verify your Salesforce data source is configured and working correctly.
- Familiarize yourself with [Grafana Alerting concepts](/docs/grafana/latest/alerting/fundamentals/).

## Query requirements for alerting

Alert queries must return numeric data that Grafana can evaluate against a threshold. Use aggregate SOQL functions to return numeric values:

Expand table

| Function       | Description                     | Example                               |
|----------------|---------------------------------|---------------------------------------|
| `COUNT()`      | Count of records                | `SELECT COUNT() FROM Case`            |
| `COUNT(field)` | Count of non-null field values  | `SELECT COUNT(Id) FROM Lead`          |
| `SUM(field)`   | Sum of numeric field values     | `SELECT SUM(Amount) FROM Opportunity` |
| `AVG(field)`   | Average of numeric field values | `SELECT AVG(Amount) FROM Opportunity` |
| `MIN(field)`   | Minimum value                   | `SELECT MIN(Amount) FROM Opportunity` |
| `MAX(field)`   | Maximum value                   | `SELECT MAX(Amount) FROM Opportunity` |

> Note
>
> Queries that return only text or non-numeric data cannot be used directly for alerting. Use aggregate functions to return numeric values.

## Create an alert rule

To create an alert rule using Salesforce data:

1. Go to **Alerting** &gt; **Alert rules**.
2. Click **New alert rule**.
3. Enter a name for your alert rule.
4. In the **Define query and alert condition** section:

   - Select your Salesforce data source.
   - Write a SOQL query that returns numeric data.
   - Add a **Reduce** expression if your query returns multiple series.
   - Add a **Threshold** expression to define the alert condition.
5. Configure the **Set evaluation behavior**:

   - Select or create a folder and evaluation group.
   - Set the evaluation interval (how often the alert is checked).
   - Set the pending period (how long the condition must be true before firing).
6. Add labels and annotations to provide context for notifications.
7. Click **Save rule**.

For detailed instructions, refer to [Create a Grafana-managed alert rule](/docs/grafana/latest/alerting/alerting-rules/create-grafana-managed-rule/).

## Example: Open case count alert

This example creates an alert that fires when the number of open high-priority cases exceeds a threshold:

1. Create a new alert rule.
2. Configure the query:

   soql [Copy code to clipboard] Copy

   ```soql
   SELECT COUNT() FROM Case
   WHERE IsClosed = false
     AND Priority = 'High'
   ```
3. Add expressions:

   - **Reduce**: Last value
   - **Threshold**: Is above 50
4. Set evaluation to run every 5 minutes with a 10-minute pending period.
5. Save the rule.

## Example: Opportunity pipeline alert

This example alerts when the total value of opportunities closing this month drops below a target:

1. Create a new alert rule.
2. Configure the query:

   soql [Copy code to clipboard] Copy

   ```soql
   SELECT SUM(Amount) FROM Opportunity
   WHERE IsClosed = false
     AND CloseDate = THIS_MONTH
   ```
3. Add expressions:

   - **Reduce**: Last value
   - **Threshold**: Is below 1000000
4. Set evaluation to run every hour.
5. Save the rule.

## Example: Overdue task alert

This example alerts when there are overdue tasks:

1. Create a new alert rule.
2. Configure the query:

   soql [Copy code to clipboard] Copy

   ```soql
   SELECT COUNT() FROM Task
   WHERE IsClosed = false
     AND ActivityDate < TODAY
   ```
3. Add expressions:

   - **Reduce**: Last value
   - **Threshold**: Is above 0
4. Set evaluation to run every 15 minutes.
5. Save the rule.

## Example: Lead conversion rate alert

This example alerts when lead conversion falls below an acceptable rate. First, create a query that returns the count of converted leads:

1. Create a new alert rule.
2. Configure the query:

   soql [Copy code to clipboard] Copy

   ```soql
   SELECT COUNT() FROM Lead
   WHERE IsConverted = true
     AND ConvertedDate = THIS_WEEK
   ```
3. Add expressions:

   - **Reduce**: Last value
   - **Threshold**: Is below 10
4. Set evaluation to run daily.
5. Save the rule.

## Best practices

Follow these recommendations to create reliable and efficient alerts with Salesforce data.

### Use aggregate functions

Always use SOQL aggregate functions (`COUNT`, `SUM`, `AVG`, `MIN`, `MAX`) for alert queries. These return numeric values that Grafana can evaluate against thresholds.

### Consider API limits

Salesforce has API request limits. Set alert evaluation intervals appropriately to avoid excessive API usage:

- Use longer intervals (5+ minutes) when possible.
- Avoid very short intervals (less than 1 minute) for non-critical alerts.
- Monitor your Salesforce API usage in Setup under **System Overview**.

### Use date literals

SOQL provides [date literals](https://developer.salesforce.com/docs/atlas.en-us.soql_sosl.meta/soql_sosl/sforce_api_calls_soql_select_dateformats.htm) that simplify time-based filtering:

- `TODAY`, `YESTERDAY`, `TOMORROW`
- `THIS_WEEK`, `LAST_WEEK`, `NEXT_WEEK`
- `THIS_MONTH`, `LAST_MONTH`, `NEXT_MONTH`
- `THIS_QUARTER`, `LAST_QUARTER`, `NEXT_QUARTER`
- `THIS_YEAR`, `LAST_YEAR`, `NEXT_YEAR`

### Handle no data conditions

Configure what happens when no data is returned:

1. In the alert rule, find **Configure no data and error handling**.
2. Choose an appropriate action:

   - **No Data**: Keep the alert in its current state
   - **Alerting**: Treat no data as an alert condition
   - **OK**: Treat no data as a healthy state

### Test queries before alerting

Always verify your query returns expected data before creating an alert:

1. Go to **Explore**.
2. Select your Salesforce data source.
3. Run the query you plan to use for alerting.
4. Confirm the data format and values are correct.

## Troubleshoot alerting issues

For common alerting issues with the Salesforce data source, refer to the [Troubleshooting](/docs/plugins/grafana-salesforce-datasource/latest/troubleshooting/) guide.

Common issues include:

- **Alert not firing**: Ensure your query returns numeric data using aggregate functions.
- **Evaluation errors**: Check that your SOQL syntax is valid and the query executes successfully in Explore.
- **Timeouts**: Simplify complex queries or increase the timeout setting in the data source configuration.

## Additional resources

- [Grafana Alerting documentation](/docs/grafana/latest/alerting/)
- [Create alert rules](/docs/grafana/latest/alerting/alerting-rules/)
- [Configure notifications](/docs/grafana/latest/alerting/configure-notifications/)
- [SOQL aggregate functions](https://developer.salesforce.com/docs/atlas.en-us.soql_sosl.meta/soql_sosl/sforce_api_calls_soql_select_agg_functions.htm)
