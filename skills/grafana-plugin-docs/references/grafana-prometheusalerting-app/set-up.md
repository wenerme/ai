---
title: "Set up the Prometheus Alerting plugin | Grafana Plugins documentation"
description: "Install the Prometheus Alerting plugin in Grafana, connect a Prometheus-compatible rules source and an Alertmanager data source, and configure the permissions that control each page."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Set up the Prometheus Alerting plugin

Getting the plugin working takes three steps: install it, point it at your data sources, and decide who can use it.

The order matters a little. The plugin has nothing to show until at least one data source is configured, so an empty-looking plugin right after install is expected rather than a sign that something went wrong.

## In this section

- [Install the plugin](/docs/plugins/grafana-prometheusalerting-app/latest/set-up/install-plugin/): install from the catalog and enable the app.
- [Configure data sources](/docs/plugins/grafana-prometheusalerting-app/latest/set-up/configure-data-sources/): connect a rules source and an Alertmanager, and understand what each supports.
- [Configure access control](/docs/plugins/grafana-prometheusalerting-app/latest/set-up/configure-rbac/): grant the permissions that control each page.
