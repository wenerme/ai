---
title: "Atlassian Statuspage data source | Grafana Enterprise Plugins documentation"
description: "Query the operational status, incidents, and scheduled maintenances of your Atlassian Statuspage in Grafana"
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Atlassian Statuspage data source

The Atlassian Statuspage data source plugin lets you query the operational status of your page, incidents, and scheduled maintenances from your Atlassian Statuspage.

> Note
>
> The Atlassian Statuspage data source is an Enterprise plugin. It’s available with a Grafana Cloud Pro or Advanced plan and Grafana Enterprise. For installation instructions, refer to [Install Grafana Enterprise plugins](/docs/grafana/latest/administration/plugin-management/#install-grafana-enterprise-plugins).

## Supported features

Expand table

| Feature     | Supported |
|-------------|-----------|
| Metrics     | Yes       |
| Logs        | No        |
| Traces      | No        |
| Alerting    | No        |
| Annotations | Yes       |

## Requirements

This plugin has the following requirements:

- A working Atlassian Statuspage with a public status page.
- A [Grafana Cloud Pro or Advanced](/pricing/) plan or an [activated on-prem Grafana Enterprise license](/docs/grafana/latest/enterprise/license/activate-license/). Contracted Cloud customers should refer to their agreement.

## Install the data source

To install the data source, refer to [Installation](/grafana/plugins/grafana-atlassianstatuspage-datasource/?tab=installation).

## Configure the data source in Grafana

[Add a data source](/docs/grafana/latest/datasources/#add-a-data-source) by filling in the following information.

### Connection

The connection requires only the URL of your Atlassian Statuspage.

**URL**

This is your Atlassian Statuspage URL. Include the protocol (for example, `https://`) and remove the trailing `/`. Refer to the following examples.

Expand table

| URL                               | Is correct?                    |
|-----------------------------------|--------------------------------|
| `https://status.grafana.com`      | Correct                        |
| `https://taewookim.statuspage.io` | Correct                        |
| `status.grafana.com`              | Incorrect - missing `https://` |
| `https://status.grafana.com/`     | Incorrect - has trailing `/`   |

### Authentication

Authentication isn’t required for this data source. Any public Atlassian Statuspage can be used.

## Configure the data source with provisioning

You can configure data sources using configuration files with Grafana’s provisioning system. To read about how it works, refer to [Provisioning Grafana data sources](/docs/grafana/latest/administration/provisioning/#data-sources).

Because authentication isn’t required, the only setting you provision is the `url` variable. Here is a provisioning example for this data source:

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

The plugin lets you query `Summary`, `Status`, `Components`, `Unresolved incidents`, `All incidents`, `Upcoming scheduled maintenances`, `Active scheduled maintenances`, and `All scheduled maintenances`. Each query type maps to an endpoint of the Atlassian Statuspage public API.

### Status

The status query shows the operational status of your page.

### Summary

The summary query gets the status rollup for the whole page. This endpoint includes an indicator - one of none, minor, major, or critical - as well as a human description of the blended component status. Examples of the blended status include “All Systems Operational”, “Partial System Outage”, and “Major Service Outage”.

### Components

The components query gets the components for the page. Each component is listed along with its status - one of operational, degraded\_performance, partial\_outage, or major\_outage.

### Unresolved incidents

The unresolved incidents query gets a list of any unresolved incidents. This endpoint only returns incidents in the Investigating, Identified, or Monitoring state.

### All incidents

The all incidents query gets a list of the 50 most recent incidents. This includes all unresolved incidents, as well as those in the Resolved and Postmortem state.

### Upcoming scheduled maintenances

The upcoming scheduled maintenances query gets a list of any upcoming maintenances. This endpoint only returns scheduled maintenances still in the Scheduled state.

### Active scheduled maintenances

The active scheduled maintenances query gets a list of any active maintenances. This endpoint only returns scheduled maintenances in the In Progress or Verifying state.

### All scheduled maintenances

The all scheduled maintenances query gets a list of the 50 most recent scheduled maintenances. This includes the scheduled maintenances returned by the upcoming and active queries, as well as those in the Completed state.

## Annotations

You can use annotations to visualize the relation between Atlassian Statuspage data and other data on your dashboards. For general information on how to use annotations, refer to the [Annotations documentation](/docs/grafana/latest/dashboards/build-dashboards/annotate-visualizations/).

## Pre-built dashboards

The plugin includes a pre-built **Atlassian Statuspage** dashboard that you can import to get started quickly. The dashboard includes panels for the current page status and summary, as well as tables for incidents (all and unresolved) and scheduled maintenances (all, active, and upcoming).

To import the dashboard:

1. Click **Connections** in the left-side menu.
2. Select your **Atlassian Statuspage** data source.
3. Select the **Dashboards** tab.
4. Find the **Atlassian Statuspage** dashboard and click **Import**.

After import, select your Atlassian Statuspage data source for each input prompt to populate the panels.

## Additional features

After configuring the data source, you can:

- Add [Transformations](/docs/grafana/latest/panels-visualizations/query-transform-data/transform-data/) to manipulate query results.
- Use [Explore](/docs/grafana/latest/explore/) to query data without building a dashboard.

## Known limitations

This data source has the following known limitations:

- The `All incidents` and `All scheduled maintenances` queries return a maximum of 50 of the most recent records.
- The plugin doesn’t support alerting.

## Troubleshooting

This section describes common issues you might encounter when configuring or using the Atlassian Statuspage data source.

### Connection errors

These errors occur when Grafana can’t reach your Atlassian Statuspage.

**Symptoms:**

- **Save &amp; test** fails.
- Queries fail with network or connection errors.

**Possible causes and solutions:**

Expand table

| Cause                            | Solution                                                                                                                                                                                                                                                 |
|----------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Incorrect URL format             | Verify the URL includes the protocol (`https://`) and has no trailing `/`. Refer to the URL examples in the Connection section.                                                                                                                          |
| Status page not reachable        | Confirm the page loads in a browser and that the host is publicly accessible.                                                                                                                                                                            |
| Network or firewall restrictions | Ensure the Grafana server allows outbound HTTPS (port 443) to your Statuspage host. For Grafana Cloud accessing a private endpoint, configure [Private data source connect](/docs/grafana-cloud/connect-externally-hosted/private-data-source-connect/). |

### Save &amp; test fails or returns an unexpected response

The data source health check queries the Statuspage `summary` endpoint and expects a JSON response.

**Symptoms:**

- **Save &amp; test** fails even though the URL opens in a browser.
- Queries return parsing errors instead of data.

**Possible causes and solutions:**

Expand table

| Cause                                        | Solution                                                                                                                                            |
|----------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------|
| URL doesn’t point to an Atlassian Statuspage | Verify the URL is a real Atlassian Statuspage. The plugin calls `<url>/api/v2/summary.json`; a non-Statuspage page returns HTML instead of JSON.    |
| Redirect or error page                       | A login page, redirect, or error page returns HTML rather than the expected JSON. Confirm the status page is public and requires no authentication. |

### No data or empty results

Some query types only return data when matching items exist.

**Symptoms:**

- A query runs without error but returns no rows.

**Possible causes and solutions:**

Expand table

| Cause           | Solution                                                                                                                                                                                                                                                           |
|-----------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| No active items | The `Unresolved incidents`, `Active scheduled maintenances`, and `Upcoming scheduled maintenances` queries return empty results when there are no items in the corresponding state. Use `All incidents` or `All scheduled maintenances` to see historical records. |
| Record limit    | The `All incidents` and `All scheduled maintenances` queries return only the 50 most recent records.                                                                                                                                                               |

### Get additional help

If you’ve tried these solutions and still encounter issues:

1. Check the [Grafana community forums](https://community.grafana.com/) for similar issues.
2. Review the [Atlassian Statuspage API documentation](https://developer.statuspage.io/) to confirm the expected response for an endpoint.
3. Contact Grafana Support if you’re an Enterprise, Cloud Pro, or Cloud Contracted user.
4. When reporting issues, include:

   - Grafana version
   - Plugin version
   - Error messages (redact sensitive information)
   - Steps to reproduce
   - The status page URL, if it’s public

## Plugin updates

Always ensure that your plugin version is up-to-date so you have access to all current features and improvements. Navigate to **Plugins and data** &gt; **Plugins** to check for updates. Grafana recommends upgrading to the latest Grafana version, and this applies to plugins as well.

> Note
>
> Plugins are automatically updated in Grafana Cloud.

## Related resources

- [Atlassian Statuspage API documentation](https://developer.statuspage.io/)
- [Grafana community forum](https://community.grafana.com/)
