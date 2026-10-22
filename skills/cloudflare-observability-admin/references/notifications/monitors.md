---
description: Define threshold, anomaly detection, and SLO monitors that evaluate SQL API queries on a schedule.
title: Monitors
image: https://developers.cloudflare.com/notifications/monitors/og.png?v=9bd3fadc12d5b5b7
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/notifications/llms.txt
> Use this file to discover all available pages before exploring further.

# Monitors

Last updated Oct 21, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/notifications/monitors/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Monitors evaluate a [SQL API](https://developers.cloudflare.com/analytics/sql-api/) query on a schedule. Cloudflare sends a notification when the query result meets your detection criteria. You can create monitors from the Cloudflare dashboard under **Alerts** > **Monitors**.

![Monitor creation showing the detection method choice: Threshold, Anomaly detection, or SLO.](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=1200,height=567,format=webp/_astro/monitors-detection-choice.DEk3poNv.png)

The datasets available to monitors depend on your plan and permissions. The dashboard only lists datasets available to the selected account or zone. For more information about dataset scopes and sampling, refer to [SQL API datasets](https://developers.cloudflare.com/analytics/sql-api/datasets/).

## Create a monitor

1. Go to **Alerts** > **Monitors** in the Cloudflare dashboard.
2. Select **Create a Monitor**.
3. Choose a detection method: **Threshold**, **Anomaly detection**, or **SLO**.
4. Configure the query using the visual builder or enter custom SQL.
5. Set the detection parameters (threshold value, sensitivity, or SLO target).
6. Name the monitor and add a description.
7. Add one or more delivery destinations (email, webhook, or PagerDuty).
8. Select **Create**.

## Monitor details

Each monitor has the following details:

| Option | Required | Description |
| --- | --- | --- |
| Name | Yes | Identifies the monitor in notifications and the Cloudflare dashboard. |
| Description | No | Records additional context about the monitor. |
| Destination | Yes | Sends notifications to at least one email address, webhook, or PagerDuty service. |

You can add up to 20 email recipients. All plans can use webhooks. PagerDuty requires a Business or higher zone.

## Monitor query

Use the query builder or enter custom SQL. The query builder supports these options:

| Option | Description |
| --- | --- |
| Dataset scope | Limits dataset selection to account-level datasets or datasets for one zone. |
| Dataset | Selects one dataset available within the dataset scope. |
| Metric | Applies `COUNT` or a supported aggregate function to a numeric field. The builder returns the result as `value`. |
| Time range | In Manual mode, sets a fixed data window relative to each evaluation and adds the timestamp bounds. |
| Filters | Restricts rows by field value. Available operators depend on the field data type. Multiple filters use `AND`. |

For adaptively sampled datasets, the builder uses `APPROX_MIN` and `APPROX_MAX` instead of `MIN` and `MAX`. The SQL API automatically applies sample weights to `COUNT`, `SUM`, and `AVG`.

### Custom SQL

A custom SQL query must meet these requirements:

- Return one numeric value in a column named `value`.
- Read one schema-qualified SQL API dataset.
- Include an account or zone filter.
- Include a lower timestamp bound when using Manual time-range mode.
- Use the [supported SQL syntax](https://developers.cloudflare.com/analytics/sql-api/sql-reference/).
- Omit a trailing semicolon.

Custom SQL supports two time-range modes:

- **Automatic** (recommended): Omit the timestamp filter. When the monitor runs, Cloudflare supplies a time range ending at the evaluation time and spanning the execution interval.
- **Manual**: Add a fixed time range to the SQL query. Relative ranges end at the evaluation time.

For example, this query returns the number of server errors during the previous five minutes:

```sql
SELECT COUNT(*) AS value
FROM events.httpRequests
WHERE accountTag = '<ACCOUNT_TAG>'
  AND timestamp >= NOW() - INTERVAL '5' MINUTE
  AND edgeResponseStatus >= 500
```

Monitors validate the query before saving. Query errors identify unsupported syntax, unavailable datasets or fields, and invalid scope. For SQL API query limits, refer to [Limits](https://developers.cloudflare.com/analytics/sql-api/limits/).

## Detection methods

Choose how Cloudflare evaluates the query result:

| Method | Description |
| --- | --- |
| Threshold | Compares the query result with a fixed numeric value. |
| Anomaly detection | Compares the query result with its historical baseline and detects spikes and/or drops. |
| Service-level objective | Compares the ratio of successful events to total events with a service-level objective (SLO) target. |

### Threshold

A threshold monitor compares the query result with a fixed value. It supports these options:

| Option | Description |
| --- | --- |
| Query | Produces the numeric value to evaluate. |
| Evaluation window | Sets the data window for each evaluation. You can select a preset or enter a custom duration. |
| Comparison operator | Compares the result with the threshold. Supported operators are `<`, `>`, `<=`, `>=`, `==`, and `!=`. |
| Threshold | Sets the numeric value used by the comparison. |

![Threshold monitor query builder with dataset selection, metric, filters, and query preview.](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=1361,height=806,format=webp/_astro/monitors-threshold.B-_Bh9Ns.png)

### Anomaly detection

Anomaly detection calculates the number of standard deviations between the current result and its historical baseline. It supports these options:

| Option | Description |
| --- | --- |
| Query | Produces the numeric value to evaluate. |
| Evaluation window | Sets the current data window. You can select a preset or enter a custom duration. |
| Baseline window | Sets the historical comparison window. The value must be at least six times the evaluation window and no more than `24h`. |
| Alert on | Detects spikes, drops, or both spikes and drops. |
| Sensitivity | Sets the z-score threshold. Lower values detect smaller changes. You can select a preset or enter a custom value. |
| Minimum event count | Optionally suppresses alerts for low-volume evaluation windows. |

New anomaly detection monitors require at least 30 minutes of historical data before they can trigger.

![Anomaly detection monitor showing baseline bounds and sensitivity configuration.](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=1356,height=802,format=webp/_astro/monitors-anomaly.BdIYyzO-.png)

### Service-level objective

An SLO monitor calculates the successful-event percentage from bad and total event counts. Both queries must return a numeric column named `value`. It supports these options:

| Option | Description |
| --- | --- |
| Bad events query | Counts events that do not meet your success criteria. |
| Total events query | Counts all events in the same population as the bad events query. |
| Short window | Measures the successful-event percentage over a short period so the monitor reacts and resolves quickly. |
| Long window | Measures the successful-event percentage over a longer period so brief failures do not trigger the monitor. |
| SLO target | Triggers when `(1 - bad events / total events) × 100` is below this value for both windows. You can select a preset or customize it. |
| Minimum event count | Optionally suppresses alerts for low-volume evaluation windows. |

Use equivalent filters in both queries. The bad events query should represent a subset of the total events query.

![SLO monitor showing bad events query, total events query, and SLO target percentage.](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=1364,height=798,format=webp/_astro/monitors-slo.BQUtHPwg.png)

## Evaluation and notification frequency

Monitors support two independent frequency settings:

| Option | Description |
| --- | --- |
| Execution interval | Controls how often Cloudflare runs the query. Leave this option at *Default* to use the fastest interval supported by the dataset. You can select a preset or enter a custom duration of at least one minute. |
| Repeat notification interval | Controls how often Cloudflare sends another notification while the monitor remains active. You can select a preset or enter a custom duration from one minute through `168h`. The default is `1h`. |

Most SQL API datasets support a one-minute execution interval. Log Explorer datasets support a minimum execution interval of 10 minutes. Cloudflare rejects an interval shorter than the selected dataset supports.

## Query preview

The query preview validates and charts an approximation of the signal before you save. Select a preview range of up to 7 days to inspect how the monitor might behave. The data shown in the preview may differ from the data evaluated by a monitor, including historical evaluations.

Threshold previews show the configured threshold. SLO previews show the calculated percentage and target. A query that returns no rows produces no signal and cannot trigger the monitor for that evaluation.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/notifications/monitors/#page","headline":"Monitors","description":"Define threshold, anomaly detection, and SLO monitors that evaluate SQL API queries on a schedule.","url":"https://developers.cloudflare.com/notifications/monitors/","inLanguage":"en","image":"https://developers.cloudflare.com/notifications/monitors/og.png?v=9bd3fadc12d5b5b7","dateModified":"2026-10-21","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
