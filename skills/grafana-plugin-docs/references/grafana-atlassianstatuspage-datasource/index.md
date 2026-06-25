---
title: "Atlassian Statuspage data source for Grafana | Grafana Enterprise Plugins documentation"
description: "Atlassian Statuspage Grafana data source The Atlassian Statuspage data source plugin allows you to query operational status of your page, incidents, scheduled maintenances for your Atlassian Statuspage."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Atlassian Statuspage Grafana data source

The Atlassian Statuspage data source plugin allows you to query operational status of your page, incidents, scheduled maintenances for your Atlassian Statuspage.

## Requirements

This plugin has the following requirements:

- Working Atlassian Statuspage
- Any free or paid [Grafana Cloud](/pricing/) plan or an [activated on-prem Grafana Enterprise license](/docs/grafana/latest/enterprise/license/activate-license/). Contracted Cloud customers should refer to their agreement.

## Install the data source

To install the data source, refer to [Installation](/grafana/plugins/grafana-atlassianstatuspage-datasource/?tab=installation).

## Configure the data source in Grafana

[Add a data source](/docs/grafana/latest/datasources/add-a-data-source/) by filling in the following information:

### Connection

**URL**

This is your Atlassian Statuspage URL. You should include protocol (e.g. `https://`) and remove the trailing `/`. You can find some examples below.

Expand table

| URL                               | Is correct?                      |
|-----------------------------------|----------------------------------|
| `https://status.grafana.com`      | ✅ correct                        |
| `https://taewookim.statuspage.io` | ✅ correct                        |
| `status.grafana.com`              | ❌ incorrect - missing `https://` |
| `https://status.grafana.com/`     | ❌ incorrect - has trailing `/`   |

### Authentication

Authentication is not required for this data source. Any public Atlassian Statuspage can be used.

## Configure the data source with provisioning

It is possible to configure data sources using configuration files with Grafana’s provisioning system. To read about how it works refer to [Provisioning Grafana data sources](/docs/grafana/latest/administration/provisioning/#data-sources).

Here is the provisioning example for this data source using API token authentication:

YAML [Copy code to clipboard] Copy

```yaml
apiVersion: 1
datasources:
  - name: Atlassian Statuspage
    type: grafana-atlassianstatuspage-datasource
    jsonData:
      variables:
        url: <YOUR_ATLASSIAN_STATUSPAGE_URL>
```

## Query the data source

Plugin allows querying `Summary`, `Status`, `Components`, `Unresolved incidents`, `All incidents`, `Upcoming scheduled maintenances`, `Active scheduled maintenances`, `All scheduled maintenances`.

### Querying Status data

Status query shows operational status of your page

### Querying Summary data

Get the status rollup for the whole page. This endpoint includes an indicator - one of none, minor, major, or critical, as well as a human description of the blended component status. Examples of the blended status include “All Systems Operational”, “Partial System Outage”, and “Major Service Outage”.

### Querying components data

Get the components for the page. Each component is listed along with its status - one of operational, degraded\_performance, partial\_outage, or major\_outage.

### Querying Unresolved incidents data

Get a list of any unresolved incidents. This endpoint will only return incidents in the Investigating, Identified, or Monitoring state.

### Querying All incidents data

Get a list of the 50 most recent incidents. This includes all unresolved incidents as described above, as well as those in the Resolved and Postmortem state.

### Querying Upcoming scheduled maintenances data

Get a list of any upcoming maintenances. This endpoint will only return scheduled maintenances still in the Scheduled state.

### Active scheduled maintenances data

Get a list of any active maintenances. This endpoint will only return scheduled maintenances in the In Progress or Verifying state.

### All scheduled maintenances data

Get a list of the 50 most recent scheduled maintenances. This includes scheduled maintenances as described in the above two endpoints, as well as those in the Completed state.

## Annotations

You can use annotations to visualize the relation between Atlassian Statuspage data and other data on your dashboards. For a generic information on how to use annotations refer to the [documentation](/docs/grafana/latest/dashboards/annotations/).

## Known limitations

- `Incidents` and `Maintenances` action currently only returns maximum 50 latest records.
- At the moment plugin doesn’t support alerting.

## Learn more

- Add [Transformations](/docs/grafana/latest/panels/transformations/).
