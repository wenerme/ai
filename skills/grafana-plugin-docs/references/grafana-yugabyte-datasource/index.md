---
title: "Yugabyte data source | Grafana Plugins documentation"
description: "Query and visualize YugabyteDB data in Grafana with the Yugabyte data source"
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Yugabyte data source

The Yugabyte data source plugin lets you connect Grafana to [YugabyteDB](https://www.yugabyte.com/) so you can query and visualize your data. The plugin connects to the YSQL (PostgreSQL-compatible) API and provides a visual query builder and a raw SQL editor with syntax highlighting and autocomplete.

## Supported features

The following table lists the features supported by the Yugabyte data source:

Expand table

| Feature            | Supported |
|--------------------|-----------|
| Metrics            | Yes       |
| Logs               | No        |
| Traces             | No        |
| Alerting           | Yes       |
| Annotations        | Yes       |
| Template variables | Yes       |

## Requirements

The Yugabyte data source has the following requirements:

- A running YugabyteDB instance (self-managed or YugabyteDB Aeon) that’s reachable from Grafana.
- A database user with permission to query the target database.
- Grafana version 11.6.0 or later.

## Choose between the Yugabyte and PostgreSQL data sources

Because YugabyteDB is PostgreSQL-compatible, you can query it with the PostgreSQL data source. However, when you work exclusively with YugabyteDB clusters, the Yugabyte data source is the better choice. It lets Grafana implement YugabyteDB-specific behavior and tailor query capabilities to YugabyteDB rather than generic PostgreSQL.

## Get started

The following pages help you get started with the Yugabyte data source:

- [Configure the Yugabyte data source](/docs/plugins/grafana-yugabyte-datasource/latest/configure/)
- [Yugabyte query editor](/docs/plugins/grafana-yugabyte-datasource/latest/query-editor/)
- [Template variables](/docs/plugins/grafana-yugabyte-datasource/latest/template-variables/)
- [Annotations](/docs/plugins/grafana-yugabyte-datasource/latest/annotations/)
- [Alerting](/docs/plugins/grafana-yugabyte-datasource/latest/alerting/)
- [Troubleshooting](/docs/plugins/grafana-yugabyte-datasource/latest/troubleshooting/)

## Additional features

After you configure the data source, you can:

- Use [Explore](/docs/grafana/latest/explore/) to query your data without building a dashboard.
- Add [Transformations](/docs/grafana/latest/panels-visualizations/query-transform-data/transform-data/) to manipulate query results.
- Set up [Alerting](/docs/plugins/grafana-yugabyte-datasource/latest/alerting/) rules on your YugabyteDB data.

## Known limitations

The Yugabyte data source has the following known limitations:

- Grafana ad hoc filters aren’t supported.
- The `$__timeGroup` macro isn’t compatible with YugabyteDB. To group results into time buckets, use a native function such as `date_trunc()`. Refer to [Macros](/docs/plugins/grafana-yugabyte-datasource/latest/query-editor/#macros) for details.
- The data source doesn’t provide TLS/SSL configuration options in the UI. It connects with the `libpq` setting `sslmode=allow`, which uses TLS when the server requires it but doesn’t verify the server certificate.

## Plugin updates

Always keep your plugin version up to date so you have access to recent features and fixes. Navigate to **Administration** &gt; **Plugins and data** &gt; **Plugins** to check for updates. Grafana recommends keeping Grafana up to date, and this applies to plugins as well.

On Grafana Cloud, Grafana manages the plugin and updates it automatically. On self-managed Grafana, update the plugin from the plugin catalog or with the `grafana cli plugins update grafana-yugabyte-datasource` command.

## Related resources

- [YugabyteDB documentation](https://docs.yugabyte.com/)
- [Yugabyte data source plugin on GitHub](https://github.com/grafana/yugabyte-datasource)
- [Grafana community forum](https://community.grafana.com/)
