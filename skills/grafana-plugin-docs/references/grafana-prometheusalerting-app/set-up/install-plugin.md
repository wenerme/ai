---
title: "Install the plugin | Grafana Plugins documentation"
description: "Install and enable the Prometheus Alerting plugin in Grafana Cloud or self-managed Grafana, using the plugin catalog or Grafana CLI, and learn which page opens first after enabling."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Install the plugin

Prometheus Alerting is an app plugin. Install it like any other plugin from the Grafana plugin catalog, then enable it so it appears in the navigation.

## Grafana Cloud

1. Click **Plugins and data** &gt; **Plugins** in the main menu.
2. Search for **Prometheus Alerting**.
3. Click the plugin, then click **Install**.

Grafana Cloud keeps the plugin up to date automatically.

## Self-managed Grafana

Install the plugin with Grafana CLI:

Bash [Copy code to clipboard] Copy

```bash
grafana cli plugins install grafana-prometheusalerting-app
```

Restart the Grafana server after the install finishes.

You can also install from the catalog in the UI, at **Plugins and data** &gt; **Plugins**. This requires the Grafana server to have network access to `grafana.com`. For air-gapped installs, refer to [Install a plugin in air-gapped environment](/docs/grafana/latest/administration/plugin-management/plugin-install/#install-a-plugin-in-air-gapped-environment).

## Enable the plugin

An app plugin does nothing until it’s enabled.

1. Click **Plugins and data** &gt; **Plugins** in the main menu.
2. Search for and click **Prometheus Alerting**.
3. Click **Enable**.

The plugin then appears in the main menu. Which page opens first depends on what you have configured:

- With an Alertmanager data source, you land on **Alerts**.
- Without an Alertmanager but with a Prometheus-compatible rules source, you land on **Rules**.
- With neither, you land on **Alerts**, which explains what’s missing.

> Note
>
> Enabling the plugin requires the Grafana **Admin** role. Using it afterwards doesn’t. Access to each page is controlled separately. Refer to [Configure access control](/docs/plugins/grafana-prometheusalerting-app/latest/set-up/configure-rbac/).

## Next steps

- [Configure data sources](/docs/plugins/grafana-prometheusalerting-app/latest/set-up/configure-data-sources/)
- [Configure access control](/docs/plugins/grafana-prometheusalerting-app/latest/set-up/configure-rbac/)
