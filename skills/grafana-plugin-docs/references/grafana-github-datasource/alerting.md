---
title: "GitHub alerting | Grafana Plugins documentation"
description: "Create alert rules using the GitHub data source plugin for Grafana"
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# GitHub alerting

The GitHub data source supports [Grafana Alerting](/docs/grafana/latest/alerting/). You can create alert rules that evaluate queries against GitHub data and send notifications when conditions are met.

## Before you begin

- [Configure the GitHub data source](/docs/plugins/grafana-github-datasource/latest/configure/).
- Familiarize yourself with [alert rules](/docs/grafana/latest/alerting/fundamentals/alert-rules/) and how to [create a Grafana-managed alert rule](/docs/grafana/latest/alerting/alerting-rules/create-grafana-managed-rule/).

## Supported query types

Any GitHub query type that includes a time field can be used in alert rule conditions. Common use cases include:

Expand table

| Query type      | Example alert                                                           |
|-----------------|-------------------------------------------------------------------------|
| Pull Requests   | Alert when more than 10 pull requests have been open longer than 7 days |
| Issues          | Alert when new issues are created at an unusual rate                    |
| Workflow Runs   | Alert when workflow runs fail                                           |
| Code Scanning   | Alert when new security vulnerabilities are detected                    |
| Vulnerabilities | Alert when open vulnerability count exceeds a threshold                 |
| Commits         | Alert when commit activity drops below expected levels                  |

For a complete list of query types and their time field options, refer to the [query editor](/docs/plugins/grafana-github-datasource/latest/query-editor/).

## Create an alert rule

To create an alert rule using the GitHub data source:

1. In the Grafana menu, click **Alerting** and select **Alert rules**.
2. Click **New alert rule**.
3. In the query section, select your GitHub data source.
4. Select a **Query Type** and configure the query options, including a **Time Field** appropriate for the alert condition.
5. Configure the alert condition (for example, **Is above** a threshold).
6. Set the evaluation group and pending period.
7. Configure notification settings and labels.
8. Click **Save rule**.

For detailed step-by-step guidance, refer to [Create a Grafana-managed alert rule](/docs/grafana/latest/alerting/alerting-rules/create-grafana-managed-rule/).

## Example alert rules

The following examples show common alert configurations using the GitHub data source.

### Alert on failed workflow runs

Monitor a repository for failed CI/CD workflows:

- **Query Type:** Workflow Runs
- **Owner:** `your-org`
- **Repository:** `your-repo`
- **Time Field:** Created At
- **Condition:** Count **Is above** `0` where `conclusion` equals `failure`

### Alert on open vulnerability count

Track the number of open security vulnerabilities in a repository:

- **Query Type:** Vulnerabilities
- **Owner:** `your-org`
- **Repository:** `your-repo`
- **Condition:** Count **Is above** the acceptable threshold

### Alert on stale pull requests

Detect pull requests that have been open for an extended period:

- **Query Type:** Pull Requests
- **Owner:** `your-org`
- **Repository:** `your-repo`
- **Query:** `is:open`
- **Time Field:** Created At
- **Condition:** Count **Is above** your team’s threshold

## Caching considerations

> Note
>
> The plugin caches all API responses for up to five minutes. Alert rule evaluations use cached data, so there may be a delay of up to five minutes between an event occurring in GitHub and the alert firing.
>
> Adjust evaluation intervals and pending periods accordingly to account for this caching behavior.

## Template annotations and labels

You can use [template annotations and labels](/docs/grafana/latest/alerting/alerting-rules/templates/) to include query results or metadata in alert notifications.
