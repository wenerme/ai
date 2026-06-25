---
title: "Splunk data source | Grafana Enterprise Plugins documentation"
description: "Learn configuration options for the Splunk data source."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Splunk data source

Splunk is a data and log analysis tool used for monitoring and troubleshooting a wide variety of systems. The Splunk data source allows you to query and visualize Splunk data with Search Processing Language (SPL) or a visual SPL editor.

The following will help you get started with Splunk and Grafana:

- [Splunk Infrastructure Monitoring data source for Grafana](/docs/plugins/grafana-splunk-monitoring-datasource/latest/)
- [Instantly visualize Splunk data in Grafana](/grafana/plugins/grafana-splunk-datasource/)
- [Configure the Splunk data source](/docs/plugins/grafana-splunk-datasource/latest/configure-splunk-data-source/)

## Requirements

The Splunk data source has the following requirements:

- A [Splunk account](https://www.splunk.com/en_us/sign-up.html).
- Any free or paid [Grafana Cloud](/pricing/) plan or an [activated on-prem Grafana Enterprise license](/docs/grafana/latest/enterprise/license/activate-license/). Contracted Cloud customers should refer to their agreement.
- [Port 8089 enabled](https://docs.splunk.com/Documentation/SplunkCloud/9.0.2209/Config/ConfigureOutboundPorts).

## Known limitations

There are no known limitations.

## Install the Splunk data source

To install the data source, see [Grafana’s Splunk installation page](/grafana/plugins/grafana-splunk-datasource/?tab=installation). To configure the data source see [Configure the Splunk data source](/docs/plugins/grafana-splunk-datasource/latest/). If you want to provision Splunk see [Provision the Splunk data source](/docs/plugins/grafana-splunk-datasource/latest/configure-splunk-data-source/#provision-the-data-source).

## Get the most out of the Splunk data source

After installing and configuring Splunk you can:

- Use the [Splunk query editor](/docs/plugins/grafana-splunk-datasource/latest/query-editor/)
- Add [Annotations](/docs/grafana/latest/dashboards/annotations/)
- Configure and use [Templates and variables](/docs/plugins/grafana-splunk-datasource/latest/templates-and-variables/)
- Add [Transformations](/docs/grafana/latest/panels/transformations/)
- Set up [Alerting](/docs/grafana/latest/alerting/)
- [Troubleshoot](/docs/plugins/grafana-splunk-datasource/latest/troubleshooting/) common issues
