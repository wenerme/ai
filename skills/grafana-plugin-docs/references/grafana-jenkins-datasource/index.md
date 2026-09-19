---
title: "Jenkins data source for Grafana | Grafana Enterprise Plugins documentation"
description: "Guide for using the Jenkins data source in Grafana"
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Jenkins data source

> Note
>
> Jenkins data source is currently in [public preview](/docs/release-life-cycle/). Grafana Labs offers limited support, and breaking changes might occur prior to the feature being made generally available.

[Jenkins](https://www.jenkins.io/) is an open source automation server used to build and deploy projects as part of Continuous Integration (CI) and Continuous Deployment (CD) pipelines.

The Jenkins data source plugin allows you to query and visualize metrics such as projects, builds, build queues, nodes, and load statistics from within Grafana. You can use this information to measure performance against [DORA metrics](https://dora.dev/) to assess your software delivery and operations performance.

> Note
>
> The Jenkins data source is an Enterprise plugin. It’s available with a Grafana Cloud Pro or Advanced plan and Grafana Enterprise. For installation instructions, refer to [Install and upgrade the Jenkins data source plugin](/docs/plugins/grafana-jenkins-datasource/latest/install/).

## Supported features

Unlike observability data sources that return metrics, logs, or traces, the Jenkins data source queries the state of your CI/CD automation server. It retrieves the following data from your Jenkins instance:

Expand table

| Data           | Description                                             |
|----------------|---------------------------------------------------------|
| Projects       | Jenkins projects, also called jobs, and their status.   |
| Project builds | The builds for a selected project.                      |
| Build queue    | Build requests waiting for an available executor.       |
| Nodes          | The nodes, or agents, connected to your Jenkins server. |
| Node labels    | The labels used to organize your Jenkins nodes.         |

For details on each query type and the fields it returns, refer to the [Jenkins query editor](/docs/plugins/grafana-jenkins-datasource/latest/query-editor/).

The data source also supports the following Grafana capabilities:

Expand table

| Capability                        | Supported |
|-----------------------------------|-----------|
| Alerting                          | No        |
| Annotations                       | No        |
| Private Data Source Connect (PDC) | Yes       |

## Requirements

This plugin has the following requirements:

- A [Grafana Cloud Pro or Advanced](/pricing/) plan or an [activated on-prem Grafana Enterprise license](/docs/grafana/latest/enterprise/license/activate-license/).
- Grafana version 10.4.8 or later.
- A Jenkins instance with the [Remote Access API](https://www.jenkins.io/doc/book/using/remote-access-api/) enabled.

## Known limitations

The plugin currently does not support:

- [Alerting](/docs/grafana/latest/alerting/)
- [Externally shared dashboards](/docs/grafana/latest/dashboards/share-dashboards-panels/shared-dashboards/#externally-shared-dashboards)

## Get started

The following documents help you get started with the Jenkins data source:

- [Install and upgrade the Jenkins data source plugin](/docs/plugins/grafana-jenkins-datasource/latest/install/)
- [Configure the Jenkins data source](/docs/plugins/grafana-jenkins-datasource/latest/configure/)
- [Use the Jenkins query editor](/docs/plugins/grafana-jenkins-datasource/latest/query-editor/)
- [Use template variables with the Jenkins data source](/docs/plugins/grafana-jenkins-datasource/latest/template-variables/)
- [Troubleshoot the Jenkins data source](/docs/plugins/grafana-jenkins-datasource/latest/troubleshooting/)

## Import a dashboard for Jenkins

This plugin includes two built-in dashboards to help you quickly get started visualizing Jenkins data.

To import the dashboards, you must first [install the plugin](/docs/plugins/grafana-jenkins-datasource/latest/install/) and [configure a data source](/docs/plugins/grafana-jenkins-datasource/latest/configure/).

From the data source configuration page, navigate to the **Dashboards** tab where you see a list of available dashboards.

Click the **Import** button next to any dashboard you want to import.

### Jenkins Overview

This dashboard provides an overview of the Jenkins instance, including all projects, nodes, executor status, and build queue.

### Jenkins DORA Metrics

This dashboard provides information on [four key metrics](https://dora.dev/guides/dora-metrics-four-keys/) used to assess software development team performance: deployment frequency, lead time for changes, change failure rate, and time to restore service. These metrics focus on both the speed and stability of software delivery.

## Plugin updates

Always ensure that your plugin version is up-to-date so you have access to all current features and improvements. Navigate to **Plugins and data** &gt; **Plugins** to check for updates. Grafana recommends upgrading to the latest Grafana version, and this applies to plugins as well.

> Note
>
> On Grafana Cloud, the Jenkins plugin is managed by Grafana and updates automatically. On self-managed Grafana, you must update Enterprise plugins manually. Refer to [Version and upgrade guidance](/docs/plugins/grafana-jenkins-datasource/latest/troubleshooting/#version-and-upgrade-guidance).

## Learn more

- Add [Annotations](/docs/grafana/latest/dashboards/build-dashboards/annotate-visualizations/).
- Configure and use [Templates and variables](/docs/grafana/latest/dashboards/variables/).
- Add [Transformations](/docs/grafana/latest/panels-visualizations/query-transform-data/transform-data/).
- Use [Explore](/docs/grafana/latest/explore/) to query data without building a dashboard.
