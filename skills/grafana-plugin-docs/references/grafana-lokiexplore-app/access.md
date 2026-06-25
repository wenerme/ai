---
title: "Access or install Grafana Logs Drilldown | Grafana Plugins documentation"
description: "Describes how to access Grafana Logs Drilldown in Grafana Cloud and the different installation methods for self-hosted Grafana."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Access or install Grafana Logs Drilldown

To use Grafana Logs Drilldown to view your log data, you can either access it in Grafana Cloud or install it in your own Grafana instance.

Give it a try using Grafana Play

With Grafana Play, you can explore and see how it works, learning from practical examples to accelerate your development. This feature can be seen on [the Grafana Play site](https://play.grafana.org/a/grafana-lokiexplore-app/explore?var-ds=ddhr3fttaw8aod&var-patterns=&var-lineFilter=&var-logsFormat=).

[Try it](https://play.grafana.org/a/grafana-lokiexplore-app/explore?var-ds=ddhr3fttaw8aod&var-patterns=&var-lineFilter=&var-logsFormat=)

## Access in Grafana and Grafana Cloud

Grafana Logs Drilldown is installed by default in both Grafana and Grafana Cloud. To access Grafana Logs Drilldown:

1. Open your Grafana stack in a web browser.
2. In the main menu, select **Drilldown** &gt; **Logs**.

In Grafana v12 and later, Grafana includes all Drilldown apps by default in the same **Drilldown** section.

## Installation

Logs Drilldown is installed by default in current Grafana releases. If you are upgrading an older installation, you might need to install the plugin manually.

### Install via Plugins catalog

For Enterprise and OSS Grafana users, you can install Grafana Logs Drilldown via the [Grafana Plugins catalog](/grafana/plugins/grafana-lokiexplore-app/).

1. Open [https://grafana.com/grafana/plugins/grafana-lokiexplore-app/](/grafana/plugins/grafana-lokiexplore-app/) in a web browser
2. Click the **Installation** tab.
3. Follow the instructions to install the app.

### Enable in Loki configuration

The following Loki and Grafana version and configuration are required:

- Grafana v11.6.11 or later
- Loki v3.2.0 or later

  > Note
  >
  > To get the most recent features, including experimental features, upgrade to Loki 3.5.0 or later.

  - Enable pattern ingestion by setting `pattern_ingester.enabled` to `true` in your Loki configuration file.
  - Enable structured metadata by setting `allow_structured_metadata` to `true` within your Loki configuration file.
  - Enable the volume endpoint by setting `volume_enabled` to `true` within your Loki configuration file.
  - Enable log level detection by setting `discover_log_levels` to `true` within your Loki configuration file.

    YAML [Copy code to clipboard] Copy

    ```yaml
    pattern_ingester:
      enabled: true
    limits_config:
      allow_structured_metadata: true
      volume_enabled: true
      discover_log_levels: true
    ```

### Install via environment variable

If you want to [install the app in a Docker container](/docs/grafana/latest/setup-grafana/configure-docker/#install-plugins-in-the-docker-container), you need to configure the following environment variable:

sh [Copy code to clipboard] Copy

```sh
GF_INSTALL_PLUGINS="https://storage.googleapis.com/integration-artifacts/grafana-lokiexplore-app/release/main/any/grafana-lokiexplore-app-main.zip;grafana-lokiexplore-app"
```

### Install using Grafana CLI

You can install Grafana Logs Drilldown in your own Grafana instance using the Grafana CLI. For more information, refer to the [Grafana CLI documentation](/docs/grafana/latest/cli/).

Run the following command:

sh [Copy code to clipboard] Copy

```sh
grafana cli plugins install --pluginUrl=https://storage.googleapis.com/integration-artifacts/grafana-lokiexplore-app/release/main/any/grafana-lokiexplore-app-main.zip grafana-lokiexplore-app
```

## Permissions

All the Grafana Drilldown apps require the `datasources:explore` permission in Grafana.

## Test with Docker Compose

You can test the app using the following command to spin up Grafana, Loki, and the Grafana Logs Drilldown App:

sh [Copy code to clipboard] Copy

```sh
curl -L https://github.com/grafana/explore-logs/raw/main/scripts/run.sh | sh
```

This will download the [run.sh](https://github.com/grafana/explore-logs/blob/main/scripts/run.sh) file and execute it.

That shell file will download some configuration files into your `/tmp/explore-logs` directory and start the Docker containers via `docker compose` from there.

Once the Docker container has started, navigate to `http://localhost:3000/a/grafana-lokiexplore-app/explore` to access Grafana Logs Drilldown.

## Having trouble?

Refer to the [troubleshooting guide](../troubleshooting/) for tips on how to solve common issues.

## What next?

Before you can use Grafana Logs Drilldown, an administrator must configure a Loki data source in order to access your logs in Grafana Logs Drilldown. Refer to the [Loki data source documentation](/docs/grafana-cloud/connect-externally-hosted/data-sources/loki/) for instructions.

After installing, you can customize default settings such as time range, data source, and display fields. Refer to [Configure Logs Drilldown](./configure/) for details.
