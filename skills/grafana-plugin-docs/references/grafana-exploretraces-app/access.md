---
title: "Access or install Traces Drilldown | Grafana Plugins documentation"
description: "Access or install Traces Drilldown."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Access or install Traces Drilldown

You can access Grafana Traces Drilldown using any of these:

- [Grafana Cloud](#set-up-in-grafana-cloud): The easiest method, since no setup or installation is required.
- Self-managed [Grafana](#set-up-in-self-managed-grafana) open source or Enterprise: You must install the Traces Drilldown plugin.

Traces Drilldown requires Grafana Tempo 2.6 or later with [TraceQL metrics configured](/docs/tempo/latest/operations/traceql-metrics/).

## Set up in Grafana Cloud

To use Traces Drilldown with Grafana Cloud, you need the following:

- Grafana Cloud account
- Grafana stack in Grafana Cloud receiving tracing data from your stack’s default [Hosted Traces](/docs/grafana-cloud/send-data/traces/) data source or a [Tempo data source](/docs/grafana-cloud/connect-externally-hosted/data-sources/tempo/configure-tempo-data-source/)

## Set up in self-managed Grafana

To use Traces Drilldown with self-managed Grafana open source or Grafana Enterprise, you need:

- Your own Grafana instance running 11.6 or later
- Tempo 2.6 or later with [TraceQL metrics configured](/docs/tempo/latest/operations/traceql-metrics/)
- Configured [Tempo data source](/docs/grafana/latest/datasources/tempo/configure-tempo-data-source/) receiving tracing data

Next, [access Traces Drilldown](#access-traces-drilldown).

### Install the Traces Drilldown plugin

> Note
>
> Grafana v12 and later includes all Drilldown apps, including Traces Drilldown. No separate installation is required. Go to [Access Traces Drilldown](#access-traces-drilldown).

Traces Drilldown is distributed as a Grafana plugin. You can find it in the official [Grafana Plugin Directory](/grafana/plugins/grafana-exploretraces-app/).

### Install in your Grafana instance

You can install Traces Drilldown in your Grafana instance using `grafana cli`:

shell [Copy code to clipboard] Copy

```shell
grafana cli plugins install grafana-exploretraces-app
```

Alternatively, follow these steps to install Traces Drilldown in Grafana:

1. In Grafana, go to **Administration** &gt; **Plugins and data** &gt; **Plugins**.
2. Search for “Traces Drilldown”.
3. Select Traces Drilldown.
4. Click **Install**.

The plugin is automatically activated after installation.

### Install in a Docker container

To install the app in a Docker container, configure the following environment variable:

shell [Copy code to clipboard] Copy

```shell
GF_INSTALL_PLUGINS=grafana-exploretraces-app
```

## Access Traces Drilldown

To access Traces Drilldown, use the following steps:

1. Open your Grafana stack in a web browser.
2. In the main menu, select **Drilldown** &gt; **Traces**.

## Next steps

To learn how to use Traces Drilldown to explore your tracing data:

- [Concepts](../concepts/)
- [Get started with Traces Drilldown](../get-started/)
- [Determine your use case](../determine-use-case/)
- [Investigate trends and spikes](../investigate/)
- [Use signals together](/docs/grafana-cloud/telemetry-signals/use-signals-together/)
- [Telemetry signal workflows](/docs/grafana-cloud/telemetry-signals/workflows/)
