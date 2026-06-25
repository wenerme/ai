---
title: "Wavefront data source for Grafana | Grafana Enterprise Plugins documentation"
description: "Wavefront data source for Grafana The Grafana Wavefront data source plugin allows Grafana users to query and visualize the data they’re collecting directly from Wavefront and easily visualize it alongside any other metric, log, tracing, or other data source. This flexible, single-pane view makes it easier to track system health and debug issues."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Wavefront data source for Grafana

The Grafana Wavefront data source plugin allows Grafana users to query and visualize the data they’re collecting directly from Wavefront and easily visualize it alongside any other metric, log, tracing, or other data source. This flexible, single-pane view makes it easier to track system health and debug issues.

## Maximizing your tech stack with Wavefront and Grafana

While on the surface, Grafana and Wavefront may sound similar, many organizations use both Wavefront and Grafana as critical parts of their observability workflows.

**Visualize without Moving Data Sources:** Grafana’s unique architecture queries data directly where it lives rather than moving it and paying for redundant storage and ingestion.

**Compose Panels from Varied Sources** With pre-built and custom dashboards, bring data together from many different data sources into a single pane of glass.

**Transform and Compute at the User Level:** Users can transform data and run various computations on data they see, requiring less data preparation.

**Combine, Compute, and Visualize within Panels:** Create mixed-datasource panels that display related data from Wavefront and other sources, like Prometheus and InfluxDB.

## Requirements

This plugin has the following requirements:

- Wavefront user who can generate an API key
- One of the following account types:

  - Available for users with a [Grafana Cloud](/products/cloud/) Free, Advanced or Trial account or with an [activated Grafana Enterprise license](/docs/grafana/latest/enterprise/license/activate-license/).

## Known limitations

Template variables with `Multi-value` and `Include All option` are currently not supported by the Wavefront plugin.

## Install the Wavefront data source plugin

To install the data source, refer to [Installation](/grafana/plugins/grafana-wavefront-datasource/?tab=installation)

## Configure Wavefront

You will need your Wavefront API token to use this plugin. Either generated from an API token from an user account or a service account.

### From a user account

1. Log into your Wavefront environment.
2. Click the cog in the top right corner of the page and select your username (e.g. `me@grafana.com`).
3. Select the `API Access` tab at the top of the user page.
4. Copy an existing key or click `generate`. Paste this token when configuring the data source in Grafana.

### From a service account

1. Log into your Wavefront environment.
2. Click the cog on the top right corner of the page and select account management.
3. On the left hand navigation select `Accounts, Groups, & Roles`
4. At the top select the `Service Accounts` and click `Create New Account`.
5. Enter a name for the service account.
6. Copy the token that is provided under the `Tokens` section to paste when configuring the data source in Grafana.
7. Make sure you have the `Accounts, Groups, & Roles` check box selected under `Permissions`

## Configure the data source in Grafana

[Add a data source](/docs/grafana/latest/datasources/add-a-data-source/) by filling in the following fields:

Expand table

| Field           | Description                                                                                       |
|-----------------|---------------------------------------------------------------------------------------------------|
| API URL         | The URL you use to access your wavefront environment. e.g. `https://myenvironment.wavefront.com`. |
| Token           | Your API token from Wavefront. To learn more refer to [Configure Wavefront](#configure-wavefront) |
| Request Timeout | Wavefront query timeout duration in seconds. If left blank 30 seconds will be set to default      |

### Configure the data source with provisioning

It is possible to configure data sources using config files with Grafana’s provisioning system. You can read more about how it works and all the settings you can set for data sources on [the provisioning docs page](/docs/grafana/latest/administration/provisioning/#datasources)

YAML [Copy code to clipboard] Copy

```yaml
apiVersion: 1
datasources:
  - name: Wavefront
    type: grafana-wavefront-datasource
    access: proxy
    basicAuth: false
    editable: true
    enabled: true
    jsonData:
      url: Wavefront environment URL
      requestTimeout: 30
    secureJsonData:
      token: Wavefront API token
```

## Query the data source

The Wavefront query editor has two modes: `Query Builder` and `Raw Query`. To toggle between them, use the selector in the top right of the query form.

### Query Builder

Metric

The metric selector is a categorized hierarchy. Select a category, then click again to drill into the subcategories. Repeat this process until you have reached your desired metric.

After selecting a metric, the available filters and filter values will be automatically populated for you.

Aggregate

Select an aggregation method to preform on this metric query.

Filters

Filter the results from this metric query.

The Wavefront plugin will dynamically query the appropriate filters for each metric.

Click on the `+` button to add a filter. Click on the trashcan button to delete a filter.

After creating a filter select a key and value from their respective dropdowns.

If multiple filters are applied you can change the conjunction by clicking on the conjunction and selecting from the dropdown.

Functions

Functions provide an additional way to aggregate, manipulate, and perform calculations on the metric response data. To view the available functions, click the drop down by the function label on the `Query Builder`.

Based on the function you select, you will be able to perform further actions such as setting a group by field or applying thresholds. Multiple functions can be chained together to perform advanced calculations or data manipulations.

### Raw Query

In `Raw Query` mode, you will see a single field labeled `Query`. This allows you to run any WQL query that you desire.

### Events

List all the events within the dashboard time range. Maximum of 100 events can be fetched.

### Templates and variables

To add a new Wavefront query variable, refer to [Add a query variable](/docs/grafana/latest/variables/variable-types/add-query-variable/). Use your Wavefront data source as your data source for the following available queries:

Expand table

| Query Type         | Description                  | Example                                    |
|--------------------|------------------------------|--------------------------------------------|
| metrics            | List of metrics              | **Query:** `~sample.cpu.\*`                |
| sources            | List of sources              | **Query:** `~sample.cpu.\*`                |
| sourceTags         | List of source tags          | **Query:** `~sample.cpu.\*`                |
| matchingSourceTags | List of matching source tags | **Query:** `~sample.cpu.\*`                |
| tagNames           | List of tag names            | **Query:** `~sample.cpu.\*`                |
| tagValues          | List of tag values           | **Query:** `~sample.cpu.\*` **Tag:** `env` |

**WARNING** `Multi-value` and `Include All option` are currently not supported by the Wavefront plugin.

After creating a variable, you can use it in your Wavefront queries by using [Variable syntax](/docs/grafana/latest/variables/syntax/). For more information about variables, refer to [Templates and variables](/docs/grafana/latest/variables/).

### Import a dashboard for Wavefront

Follow these [instructions](/docs/grafana/latest/dashboards/export-import/#importing-a-dashboard) for importing a dashboard. Imported dashboards can be found in Configuration &gt; Data Sources &gt; select your Wavefront data source &gt; select the Dashboards tab to see available pre-made dashboards.

## Get the most out of the plugin

- Add [Annotations](/docs/grafana/latest/dashboards/annotations/).
- Configure and use [Templates and variables](/docs/grafana/latest/variables/).
- Add [Transformations](/docs/grafana/latest/panels/transformations/).
- Set up alerting; refer to [Alerts overview](/docs/grafana/latest/alerting/).

### Using Display Name

This plugin uses the Display Name field in the Field tab of the Options panel (available in Grafana v7.0+) to shorten or alter a legend key based on its name, labels, or values. Other datasources use custom `alias` functionality to modify legend keys, but the Display Name function is a more consistent way to do so. Documentation for the Display Name field option is in the [Grafana docs](/docs/grafana/latest/panels/field-options/standard-field-options/#display-name).

### Using Ad-Hoc Filters

To use ad-hoc filters, we must create two template variables. The first one is a helper variable that will be used to select a metric so that add-hoc filters can be populated for that metric name. The other will be the actual ad-hoc filter variable.

**NOTICE** The helper variable that is required has to be named `metriclink`. This can be an custom variable with the list of metrics that you’d like to use or a query based variable using the [Template Variable Query Structure](#template-variable-query-structure). If you would like to populate the ad-hoc filter fields with only the values from a single metric, you can hide the `metriclink` template variable.

After creating the `metriclink` variable, you can now add the ad-hoc filter by following the same steps detailed in [Adding a Query Template Variable](#adding-a-query-template-variable). The difference being that you will select `Ad Hoc Filters` as the `Type` and no inputs are required for a query.

If you followed the steps correctly, your dashboard should look like so:
