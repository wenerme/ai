---
title: "Dashboards and Splunk | Grafana Enterprise Plugins documentation"
description: "This doc explains how to work with dashboards and Splunk"
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Dashboards and Splunk

The following dashboards are currently available:

- Kubernetes overview
- Node overview
- Pod overview

## Dependencies

The following are required:

- Splunk version 8.0 and above. Grafana dashboards have been tested against Splunk 8.2.
- Grafana version 8.2 and above.
- [Splunk OpenTelemetry Connector for Kubernetes](https://github.com/signalfx/splunk-otel-collector-chart) - For these dashboards to be populated, Grafana requires Kubernetes data to be ingested into Splunk. Currently, the dashboards utilize metrics only from this agent. The `otelK8sClusterReceiver` and `otelAgent` daemonset are required. We recommend using the [Helm chart](https://github.com/signalfx/splunk-otel-collector-chart) provided by Splunk.
- [Splunk Open Connect](https://splunkbase.splunk.com/app/4497/) - The [Helm chart](https://github.com/splunk/splunk-connect-for-kubernetes) can be used to collect Kubernetes events. Currently, the Open Telemetry connector does not [collect this data](https://github.com/signalfx/splunk-otel-collector-chart/issues/222). Once added, this agent will no longer be required.

**When opening a dashboard, ensure you select an appropriate metrics and events index.** These default to `em_metrics` and `main` respectively.

## Kubernetes overview

This dashboard provides summary statistics on the cluster concerning capacity, resource utilization and pod state. Users can filter by cluster name and namespace.

## Node overview

This dashboard provides summary statistics with respect to nodes in the cluster, allowing users to filter by node and cluster name.

## Pod overview

This dashboard provides summary statistics with respect to nodes in the cluster, allowing users to filter by pod and cluster name.
