---
title: "Sentry data source | Grafana Plugins documentation"
description: "Guide for using the Sentry data source in Grafana to query and visualize Sentry issues, events, spans, and organization statistics."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Sentry data source

The Sentry data source plugin lets you query and visualize [Sentry](https://sentry.io/) data within Grafana. You can display issues, events, spans, session metrics, and organization statistics in Grafana dashboards, giving you a unified view of application errors and performance alongside your other observability data.

## Requirements

- Grafana version 10.4.0 or later.
- A Sentry account (hosted at [sentry.io](https://sentry.io/) or self-hosted).
- A Sentry internal integration authentication token with **Read** access to **Project**, **Issue &amp; Event**, and **Organization**. Refer to [Configure the Sentry data source](/docs/plugins/grafana-sentry-datasource/latest/configure/) for setup instructions.

## Supported features

Expand table

| Feature     | Supported |
|-------------|-----------|
| Metrics     | Yes       |
| Alerting    | Yes       |
| Annotations | Yes       |

## Supported query types

The Sentry data source supports the following query types. For detailed field descriptions and examples, refer to the [query editor](/docs/plugins/grafana-sentry-datasource/latest/query-editor/) documentation.

Expand table

| Query type   | Description                                                                     |
|--------------|---------------------------------------------------------------------------------|
| Issues       | Query Sentry issues with filtering, sorting, and pagination.                    |
| Events       | Query individual error and transaction events with custom fields.               |
| Spans        | Query span data for distributed tracing analysis.                               |
| Events Stats | Query time-series event data for trend analysis and visualization.              |
| Spans Stats  | Query time-series span data for performance trend analysis.                     |
| Metrics      | Query session-based metrics such as crash rates and session health.             |
| Stats        | Query organization-level usage statistics such as event quotas and consumption. |

## Get started

The following documents help you set up and use the Sentry data source:

- [Configure the Sentry data source](/docs/plugins/grafana-sentry-datasource/latest/configure/)
- [Sentry query editor](/docs/plugins/grafana-sentry-datasource/latest/query-editor/)
- [Template variables](/docs/plugins/grafana-sentry-datasource/latest/template-variables/)
- [Annotations](/docs/plugins/grafana-sentry-datasource/latest/annotations/)
- [Alerting](/docs/plugins/grafana-sentry-datasource/latest/alerting/)
- [Troubleshooting](/docs/plugins/grafana-sentry-datasource/latest/troubleshooting/)

## Additional features

After configuring the data source, you can:

- Use [Explore](/docs/grafana/latest/explore/) to query Sentry data without building a dashboard.
- Add [Transformations](/docs/grafana/latest/panels-visualizations/query-transform-data/transform-data/) to manipulate query results.
- Create [Template variables](/docs/plugins/grafana-sentry-datasource/latest/template-variables/) for dynamic, reusable dashboards.
- Add [Annotations](/docs/plugins/grafana-sentry-datasource/latest/annotations/) to overlay Sentry issues on graphs.
- Set up [Alerting](/docs/plugins/grafana-sentry-datasource/latest/alerting/) rules based on Sentry data.

## Plugin updates

Always ensure that your plugin version is up-to-date so you have access to all current features and improvements. Navigate to **Plugins and data** &gt; **Plugins** to check for updates. Grafana recommends upgrading to the latest Grafana version, and this applies to plugins as well.

> Note
>
> Plugins are automatically updated in Grafana Cloud.

## Related resources

- [Official Sentry documentation](https://docs.sentry.io/)
- [Grafana community forum](https://community.grafana.com/)
