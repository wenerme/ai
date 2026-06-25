---
title: "Drone CI data source for Grafana | Grafana Enterprise Plugins documentation"
description: "Drone CI Grafana data source Note Drone enterprise data source for Grafana is currently in public preview. Grafana Labs offers limited support, and breaking changes might occur prior to the feature being made generally available."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Drone CI Grafana data source

> Note
>
> **Drone** enterprise data source for Grafana is currently in [public preview](/docs/release-life-cycle/). Grafana Labs offers limited support, and breaking changes might occur prior to the feature being made generally available.

The Drone data source plugin allows you to retrieve data for repositories and builds from your Drone instance.

## Requirements

This plugin has the following requirements:

- Working Drone instance
- Any free or paid [Grafana Cloud](/pricing/) plan or an [activated on-prem Grafana Enterprise license](/docs/grafana/latest/enterprise/license/activate-license/). Contracted Cloud customers should refer to their agreement.

## Install the data source

To install the data source, refer to [Installation](/grafana/plugins/grafana-adobeanalytics-datasource/?tab=installation).

## Configure the data source in Grafana

[Add a data source](/docs/grafana/latest/datasources/add-a-data-source/) by filling in the following information:

### Connection

**URL**

This is your Drone instance URL. You should include protocol (e.g. `https://`) and remove the trailing `/`. You can find some examples below.

Expand table

| URL                          | Is correct?                      |
|------------------------------|----------------------------------|
| `https://drone.company.com`  | ✅ correct                        |
| `https://company.com/drone`  | ✅ correct                        |
| `drone.company.com`          | ❌ incorrect - missing `https://` |
| `https://drone.company.com/` | ❌ incorrect - has trailing `/`   |

### Authentication

**API Token**

The plugin supports API token authentication. You can find your API token on the `<YOUR_DRONE_URL>/account` page of your Drone instance.

## Configure the data source with provisioning

It is possible to configure data sources using configuration files with Grafana’s provisioning system. To read about how it works refer to [Provisioning Grafana data sources](/docs/grafana/latest/administration/provisioning/#data-sources).

Here is the provisioning example for this data source using API token authentication:

YAML [Copy code to clipboard] Copy

```yaml
apiVersion: 1
datasources:
  - name: Drone
    type: grafana-drone-datasource
    jsonData:
      variables:
        url: <YOUR_DRONE_URL>
    secureJsonData:
      drone.token: <YOUR_API_TOKEN>
```

## Query the data source

Plugin allows querying repositories and builds data.

### Getting repository list

Getting repositories data doesn’t require any parameters. Plugin only returns repositories that are active in Drone and filters out inactive ones.

### Getting data for a specific repository

When choosing `Repo Info` action you also need to select mandatory repository parameter from the dropdown list, dropdown only includes active repositories.

### Getting build list

`Build List` action returns data for the recent builds of the specified repository which you need to choose from the dropdown list. Dropdown contains only active repositories.

### Getting specific build data

This action is similar to the build list action but only returns data for single build. You will need to provide mandatory repo `Repository` and `Build number` parameters from the dropdown lists. `Build number` parameter will only appear after you selected repository.

> Note
>
> `Build number` dropdown list contains at most 100 recent builds, but you can still type in build number that is not in the list and the plugin will return data for that build.

## Templates and variables

To add a new Drone data source query variable, refer to [Add a query variable](/docs/grafana/latest/variables/variable-types/add-query-variable/). Use your Drone data source as your data source and fill out the fields in the query builder.

After creating a variable, you can use it in your Drone queries using [Variable syntax](/docs/grafana/latest/variables/syntax/). For more information about variables, refer to [Templates and variables](/docs/grafana/latest/variables/).

**Example**:
You can create a variable that contains all repositories, use `slug` field as a variable value and `name` as a variable label when creating variable. You can then use created variable in other Drone data source queries that require repository parameter (e.g. to get data for specific repository or to get builds for the specific repository).

## Annotations

You can use annotations to visualize the relation between Drone data (e.g. builds) and other data on your dashboards. For a generic information on how to use annotations refer to the [documentation](/docs/grafana/latest/dashboards/annotations/).

## Built-in dashboards

Plugin has a built-in dashboard that has a repository variable and visualizes some stats for the selected repository. It is only included to showcase plugin’s functionality. Feel free to import dashboard and change it as you like.

To view a list of pre-made Drone dashboards do the following:

1. Go to **Connections** in the sidebar menu.
2. Under Connections, click **Data sources**.
3. Type `Drone` in the search bar and select the Drone data source.
4. Go to **Dashboards** tab to view a list of pre-made dashboards.

## Known limitations

- `Build List` action currently only returns maximum 100 latest builds, not all builds.
- At the moment plugin doesn’t support alerting.

## Learn more

- Add [Transformations](/docs/grafana/latest/panels/transformations/).
