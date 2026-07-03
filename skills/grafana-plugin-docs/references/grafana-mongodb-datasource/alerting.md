---
title: "MongoDB alerting | Grafana Enterprise Plugins documentation"
description: "Set up alerts using MongoDB data in Grafana."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# MongoDB alerting

The MongoDB data source supports [Grafana Alerting](/docs/grafana/latest/alerting/), allowing you to create alert rules based on MongoDB data. You can monitor your collections and receive notifications when specific conditions are met.

## Before you begin

- Ensure you have the appropriate permissions to create alert rules in Grafana.
- Verify your MongoDB data source is [configured](/docs/plugins/grafana-mongodb-datasource/latest/configure/) and working correctly.
- Familiarize yourself with [Grafana Alerting concepts](/docs/grafana/latest/alerting/fundamentals/).

## Query requirements for alerting

Alert queries must return numeric data that Grafana can evaluate against a threshold. Your MongoDB query must:

- Return at least one numeric field for the alert condition.
- Include a `time` field (date type) for time-series evaluation.
- Return data within the evaluation time range (use `$__timeFrom` and `$__timeTo` macros).

Using an `aggregate` pipeline with `$project` is recommended to shape results into the expected format.

> Note
>
> Queries that return only text or non-numeric data cannot be used directly for alerting.

## Create an alert rule

To create an alert rule using MongoDB data:

1. Go to **Alerting** &gt; **Alert rules**.
2. Click **New alert rule**.
3. Enter a name for your alert rule.
4. In the **Define query and alert condition** section:

   - Select your MongoDB data source.
   - Write a MongoDB aggregate query that returns numeric data with a `time` field.
   - Add a **Reduce** expression if your query returns multiple series.
   - Add a **Threshold** expression to define the alert condition.
5. Configure the **Set evaluation behavior**:

   - Select or create a folder and evaluation group.
   - Set the evaluation interval (how often the alert is checked).
   - Set the pending period (how long the condition must be true before firing).
6. Add labels and annotations to provide context for notifications.
7. Click **Save rule**.

For detailed instructions, refer to [Create a Grafana-managed alert rule](/docs/grafana/latest/alerting/alerting-rules/create-grafana-managed-rule/).

## Example: Document count threshold alert

This example creates an alert that fires when a collection grows beyond a threshold:

1. Create a new alert rule.
2. Configure the query:

   JavaScript [Copy code to clipboard] Copy

   ```javascript
   monitoring_db.collection_stats.aggregate([
     {
       $match: {
         "timestamp": { $gte: $__timeFrom, $lt: $__timeTo }
       }
     },
     {
       $project: {
         "_id": 0,
         "time": "$timestamp",
         "document_count": "$count"
       }
     }
   ]).sort({"time": 1})
   ```
3. Add expressions:

   - **Reduce**: Last value (to get the most recent data point)
   - **Threshold**: Is above 1000000 (or your desired document limit)
4. Set evaluation to run every 5 minutes with a 10-minute pending period.
5. Save the rule.

## Example: Average response time alert

This example alerts when average response time from a metrics collection exceeds a threshold:

1. Create a new alert rule.
2. Configure the query:

   JavaScript [Copy code to clipboard] Copy

   ```javascript
   app_db.request_metrics.aggregate([
     {
       $match: {
         "timestamp": { $gte: $__timeFrom, $lt: $__timeTo }
       }
     },
     {
       $group: {
         "_id": {
           "$dateTrunc": { "date": "$timestamp", "unit": "minute", "binSize": 1 }
         },
         "avg_response_ms": { "$avg": "$response_time_ms" }
       }
     },
     {
       $project: {
         "_id": 0,
         "time": "$_id",
         "avg_response_ms": 1
       }
     }
   ]).sort({"time": 1})
   ```
3. Add expressions:

   - **Reduce**: Mean (average across all data points)
   - **Threshold**: Is above 500 (milliseconds)
4. Set evaluation to run every 1 minute.
5. Save the rule.

## Example: Data freshness alert

This example alerts when data hasn’t been updated within the expected time frame:

1. Create a new alert rule.
2. Configure the query:

   JavaScript [Copy code to clipboard] Copy

   ```javascript
   app_db.ingestion_status.aggregate([
     {
       $group: {
         "_id": null,
         "last_insert": { "$max": "$created_at" }
       }
     },
     {
       $project: {
         "_id": 0,
         "time": "$$NOW",
         "minutes_since_update": {
           "$dateDiff": {
             "startDate": "$last_insert",
             "endDate": "$$NOW",
             "unit": "minute"
           }
         }
       }
     }
   ])
   ```
3. Add expressions:

   - **Reduce**: Last value
   - **Threshold**: Is above 60 (minutes)
4. Set evaluation to run every 10 minutes.
5. Save the rule.

## Example: Error rate alert

This example alerts when error counts exceed a threshold within a time window:

1. Create a new alert rule.
2. Configure the query:

   JavaScript [Copy code to clipboard] Copy

   ```javascript
   logs_db.application_logs.aggregate([
     {
       $match: {
         "level": "ERROR",
         "timestamp": { $gte: $__timeFrom, $lt: $__timeTo }
       }
     },
     {
       $group: {
         "_id": {
           "$dateTrunc": { "date": "$timestamp", "unit": "minute", "binSize": 5 }
         },
         "error_count": { "$sum": 1 }
       }
     },
     {
       $project: {
         "_id": 0,
         "time": "$_id",
         "error_count": 1
       }
     }
   ]).sort({"time": 1})
   ```
3. Add expressions:

   - **Reduce**: Last value
   - **Threshold**: Is above 50
4. Set evaluation to run every 5 minutes.
5. Save the rule.

## Best practices

Follow these recommendations to create reliable and efficient alerts with MongoDB data.

### Use appropriate query intervals

- Set the alert evaluation interval based on how frequently your data updates.
- Avoid very short intervals (less than 1 minute) as they may cause evaluation timeouts.
- Use `$__timeFrom` and `$__timeTo` macros to scope queries to the evaluation window.

### Reduce multiple series

When your MongoDB query returns multiple time series (for example, metrics per service), use the **Reduce** expression to aggregate them:

- **Last**: Use the most recent value
- **Mean**: Average across all series
- **Max/Min**: Use the highest or lowest value
- **Sum**: Total across all series

### Handle no data conditions

Configure what happens when no data is returned:

1. In the alert rule, find **Configure no data and error handling**.
2. Choose an appropriate action:

   - **No Data**: Set the alert state to No Data
   - **Alerting**: Treat no data as an alert condition (fires the alert)
   - **OK**: Set the alert state to Normal
   - **Keep Last State**: Maintain the previous alert state

### Test queries in Explore first

Always verify your query returns expected data before creating an alert:

1. Go to **Explore**.
2. Select your MongoDB data source.
3. Run the query you plan to use for alerting.
4. Confirm the result includes a `time` field (date type) and at least one numeric field.
5. Verify the values are in the expected range for your threshold conditions.

### Optimize query performance

Alert queries run at regular intervals. To minimize impact on your MongoDB server:

- Use efficient queries that leverage indexes.
- Apply `$match` filters early in your aggregation pipeline.
- Use projections to limit the fields returned.
- Consider the **Rows to return** setting in the data source configuration.

## Troubleshooting

If your alerts are not working as expected:

- **No data returned**: Verify the query runs successfully in Explore and returns data for the evaluation time range.
- **Query timeout**: Optimize your query or increase the evaluation interval.
- **Unexpected values**: Check that your query returns the correct data type (numeric for thresholds) with a `time` field.
- **Alert never fires**: Ensure the **Reduce** expression is configured correctly for your data shape.

For additional troubleshooting, refer to [Troubleshoot the MongoDB data source](/docs/plugins/grafana-mongodb-datasource/latest/troubleshooting/).

## Additional resources

- [Grafana Alerting documentation](/docs/grafana/latest/alerting/)
- [Create alert rules](/docs/grafana/latest/alerting/alerting-rules/)
- [Configure notifications](/docs/grafana/latest/alerting/configure-notifications/)
