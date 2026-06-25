---
title: "PagerDuty data source | Grafana Enterprise Plugins documentation"
description: "Use the PagerDuty data source to query and visualize PagerDuty incident data in Grafana."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# PagerDuty data source

The PagerDuty data source plugin allows you to query incident data from [PagerDuty](https://www.pagerduty.com/) and visualize it in Grafana dashboards. You can list and filter incidents, retrieve individual incident details, and overlay incidents as annotations on other data.

> Note
>
> The PagerDuty data source is an Enterprise plugin. It’s available with a Grafana Cloud Pro or Advanced plan and Grafana Enterprise. For installation instructions, refer to [Install Grafana Enterprise plugins](/docs/grafana/latest/administration/plugin-management/#install-grafana-enterprise-plugins).

## Supported features

The following table lists the features supported by the PagerDuty data source.

Expand table

| Feature     | Supported |
|-------------|-----------|
| Metrics     | Yes       |
| Logs        | No        |
| Traces      | No        |
| Alerting    | Yes       |
| Annotations | Yes       |

## Before you begin

Before configuring the PagerDuty data source, ensure you have:

- A [Grafana Cloud Pro or Advanced](/pricing/) plan or an [activated on-prem Grafana Enterprise license](/docs/grafana/latest/enterprise/license/activate-license/). Self-hosted installations require Grafana version 11.6.7 or later.
- A PagerDuty account with a REST API key. Refer to the [PagerDuty REST API Keys documentation](https://support.pagerduty.com/docs/api-access-keys#rest-api-keys) for instructions on generating an API key. Because this plugin only reads data from PagerDuty, prefer generating a **read-only** API key.
- **Grafana permissions:** `Organization administrator` role to add and configure data sources.

## Configure the data source

To start querying PagerDuty data, add and configure the data source in Grafana.

### Add the data source

To add the PagerDuty data source:

1. Click **Connections** in the left-side menu.
2. Click **Add new connection**.
3. Type `PagerDuty` in the search bar.
4. Select **PagerDuty**.
5. Click **Add new data source**.

### Authentication

The PagerDuty data source authenticates using an API key.

Expand table

| Setting     | Description                                                  |
|-------------|--------------------------------------------------------------|
| **API key** | Your PagerDuty REST API key. A read-only key is recommended. |

### Optional settings

The following optional settings are available under **Optional Settings** in the configuration editor.

Expand table

| Setting                | Description                                                                                                                                                                                                                                                                                                                        |
|------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Secure Socks Proxy** | Toggle to enable proxying the data source connection through a secure socks proxy. This setting is only visible when the `secureSocksDSProxyEnabled` feature toggle is enabled in Grafana. For more information, refer to [Configure a data source connection proxy](/docs/grafana/latest/setup-grafana/configure-grafana/proxy/). |

### Verify the connection

Click **Save &amp; test** to verify that the data source is configured correctly. A successful connection displays the message **PagerDuty API datasource connected successfully**.

### Provision the data source

You can define the PagerDuty data source in YAML files as part of Grafana’s provisioning system. For more information, refer to [Provisioning Grafana data sources](/docs/grafana/latest/administration/provisioning/#data-sources).

YAML [Copy code to clipboard] Copy

```yaml
apiVersion: 1

datasources:
  - name: PagerDuty
    type: grafana-pagerduty-datasource
    jsonData:
      auth:
        id: api_key
    secureJsonData:
      auth.api_key.apiKey: <API_KEY>
```

You can also provision the data source using the [Grafana Terraform provider](https://registry.terraform.io/providers/grafana/grafana/latest/docs):

hcl [Copy code to clipboard] Copy

```hcl
resource "grafana_data_source" "pagerduty" {
  type = "grafana-pagerduty-datasource"
  name = "PagerDuty"

  json_data_encoded = jsonencode({
    auth = {
      id = "api_key"
    }
  })

  secure_json_data_encoded = jsonencode({
    "auth.api_key.apiKey" = var.pagerduty_api_key
  })
}
```

## Query the data source

The query editor has the following controls:

1. **Category** – Select the query category. PagerDuty has a single category: **Incidents**.
2. **Action** – Select the operation to perform from the drop-down.
3. **Additional parameters (optional)** – Expand this collapsible section to configure filters and options. For **List incidents**, this section starts collapsed.
4. **Transformation options** – Expand this collapsible section to select which fields to return.

### List incidents

The **List incidents** action retrieves a paginated list of incidents. By default, the **Since** and **Until** parameters use the dashboard time range variables `${__from:date}` and `${__to:date}`, returning only incidents created within the selected time frame. Clear these fields to query all incidents.

Expand the **Additional parameters (optional)** section to configure the following filters.

Expand table

| Parameter           | Description                                                                                                    |
|---------------------|----------------------------------------------------------------------------------------------------------------|
| **Since**           | Start of the date range in ISO 8601 format. Maximum range is 6 months. Defaults to `${__from:date}`.           |
| **Until**           | End of the date range in ISO 8601 format. Maximum range is 6 months. Defaults to `${__to:date}`.               |
| **Incident key**    | Filter by incident de-duplication key.                                                                         |
| **Service IDs**     | Filter by one or more PagerDuty service IDs.                                                                   |
| **Team IDs**        | Filter by one or more PagerDuty team IDs.                                                                      |
| **User IDs**        | Filter by one or more PagerDuty user IDs.                                                                      |
| **Urgencies**       | Filter by urgency level.                                                                                       |
| **Statuses**        | Filter by status: `triggered`, `acknowledged`, or `resolved`.                                                  |
| **Sort by**         | Sort results by `incident_number`, `created_at`, `resolved_at`, or `urgency` in ascending or descending order. |
| **Include details** | Include additional fields in the response, such as related objects.                                            |

#### Example: Monitor unresolved incidents by service

To build a table showing all currently open incidents for a specific service:

1. Select **List incidents** from the **Action** drop-down.
2. Set **Statuses** to `triggered` and `acknowledged`.
3. Enter your PagerDuty service ID in the **Service IDs** field.
4. Set **Sort by** to `created_at:desc` to show the most recent incidents first.
5. Expand **Transformation options** and select the following fields under **Select fields**: `title`, `status`, `urgency`, `created_at`, and `html_url`.
6. Choose the **Table** visualization to display the results.

#### Example: Track incident volume over time

To visualize how many incidents your team handles over time:

1. Select **List incidents** from the **Action** drop-down.
2. Set the dashboard time range to the period you want to analyze (for example, **Last 30 days**).
3. Enter your team ID in the **Team IDs** field.
4. Expand **Transformation options** and select `created_at` and `status` under **Select fields**.
5. Choose the **Bar chart** or **Time series** visualization.
6. Use a [Group by transformation](/docs/grafana/latest/panels-visualizations/query-transform-data/transform-data/#group-by) to aggregate incident counts by day or week.

#### Example: View high-urgency incidents across all services

To create an overview of high-urgency incidents that need immediate attention:

1. Select **List incidents** from the **Action** drop-down.
2. Set **Urgencies** to `high`.
3. Set **Statuses** to `triggered`.
4. Clear the **Since** and **Until** fields to return incidents regardless of when they were created.
5. Expand **Transformation options** and select: `title`, `service`, `created_at`, `escalation_policy`, and `html_url` under **Select fields**.
6. Choose the **Table** visualization and use the `html_url` field to link directly to each incident in PagerDuty.

### Get an incident

The **Get an incident** action retrieves detailed information about a single incident. The required **Id** field appears under the **Parameters** section.

Expand table

| Parameter | Description                                    |
|-----------|------------------------------------------------|
| **Id**    | The incident ID or incident number (required). |

### Select fields

Expand the **Transformation options** section and use the **Select fields** drop-down to choose which fields to include in the query results. If no fields are selected, all available fields are returned.

Available fields for **List incidents** include: `id`, `summary`, `type`, `self`, `html_url`, `incident_number`, `title`, `description`, `created_at`, `updated_at`, `status`, `incident_key`, `service`, `assignments`, `assigned_via`, `last_status_change_at`, `resolved_at`, `first_trigger_log_entry`, `alert_counts`, `is_mergeable`, `escalation_policy`, `teams`, `pending_actions`, `acknowledgements`, `alert_grouping`, `last_status_change_by`, `priority`, `resolve_reason`, `incidents_responders`, `responder_requests`, and `urgency`.

The **Get an incident** action supports the same fields except `description`, and additionally includes `conference_bridge`.

The fields `created_at`, `updated_at`, `resolved_at`, and `last_status_change_at` are automatically parsed as timestamps.

## Annotations

You can use annotations to overlay PagerDuty incidents on other dashboard panels. This helps you correlate incidents with metrics and logs from other data sources.

To add a PagerDuty annotation:

1. Open your dashboard and click **Settings** (gear icon).
2. Select **Annotations** and click **Add annotation query**.
3. Select the PagerDuty data source.
4. Choose **List incidents** from the **Action** drop-down.
5. Configure any filters you need, such as **Statuses** or **Service IDs**.
6. Click **Save dashboard**.

Incidents are mapped to annotations using the timestamp fields (`created_at`, `updated_at`, `resolved_at`, or `last_status_change_at`). Use the **Select fields** drop-down under **Transformation options** to control which fields appear in the annotation tooltip.

### Example: Correlate incidents with infrastructure metrics

To overlay PagerDuty incidents on a time series panel that shows CPU or memory usage from another data source:

1. Create a dashboard panel with your infrastructure metrics (for example, from Prometheus or CloudWatch).
2. Open **Dashboard settings** &gt; **Annotations** and click **Add annotation query**.
3. Select the PagerDuty data source.
4. Choose **List incidents** from the **Action** drop-down.
5. Set **Service IDs** to the service that matches the infrastructure being monitored.
6. Set **Statuses** to `triggered` and `acknowledged` to show only active incidents.
7. Expand **Transformation options** and select `title` and `status` under **Select fields** so the annotation tooltip shows useful context.
8. Click **Save dashboard**.

Incident markers now appear on the time series panel, making it easy to see whether a spike in resource usage corresponds to a PagerDuty incident.

For more information about annotations, refer to [Annotate visualizations](/docs/grafana/latest/dashboards/build-dashboards/annotate-visualizations/).

## Template variables

Template variables let you create dynamic, reusable dashboards. You can use the PagerDuty data source as a query variable source.

To create a PagerDuty query variable:

1. Navigate to **Dashboard settings** &gt; **Variables**.
2. Click **Add variable**.
3. Select **Query** as the variable type.
4. Select the PagerDuty data source.
5. Choose an action from the **Action** drop-down (for example, **List incidents**).
6. Use the **Select fields** drop-down to choose which fields to return.

> Note
>
> The first two fields selected under **Select fields** are used as the variable label and value, respectively. If only one field is selected, it’s used for both. For example, to create a variable that holds incident IDs with human-readable labels, select `title` and `id` so the incident title displays as the label and the incident ID is used as the value.

After creating a variable, reference it in your PagerDuty queries using [variable syntax](/docs/grafana/latest/dashboards/variables/variable-syntax/). For more information, refer to [Templates and variables](/docs/grafana/latest/dashboards/variables/).

### Example: Filter incidents by variable

To create a dashboard where users can select an incident from a drop-down and view its details:

1. Create a query variable named `incident` using the PagerDuty data source.
2. Select **List incidents** from the **Action** drop-down.
3. Under **Select fields**, choose `summary` first (label), then `id` (value).
4. In your panel query, select **Get an incident** from the **Action** drop-down and enter `$incident` in the **Id** field.

When users select an incident from the dashboard drop-down, the panel updates to show that incident’s details.

### Example: Filter by status using a custom variable

To let users toggle between viewing triggered, acknowledged, or resolved incidents:

1. Navigate to **Dashboard settings** &gt; **Variables** and click **Add variable**.
2. Select **Custom** as the variable type.
3. Name the variable `status`.
4. Enter `triggered,acknowledged,resolved` in the **Custom options** field.
5. Enable **Multi-value** to allow users to select more than one status.
6. In your panel query, select **List incidents** from the **Action** drop-down and enter `$status` in the **Statuses** field.

The dashboard drop-down now lets users control which incident statuses are displayed.

## Alerting

You can create Grafana alert rules that query PagerDuty incident data. For example, you can alert when the number of triggered incidents exceeds a threshold or when high-urgency incidents remain unacknowledged.

To create an alert rule using PagerDuty data:

1. Navigate to **Alerting** &gt; **Alert rules**.
2. Click **New alert rule**.
3. Select the PagerDuty data source.
4. Configure a **List incidents** query with the appropriate filters (for example, **Statuses** set to `triggered` and **Urgencies** set to `high`).
5. Add a **Reduce** expression to aggregate the results (for example, count rows).
6. Add a **Threshold** expression to define the alert condition.
7. Configure notification policies and contact points as needed.

For more information, refer to [Grafana Alerting](/docs/grafana/latest/alerting/).

## Plugin updates

Always ensure that your plugin version is up-to-date so you have access to all current features and improvements. Navigate to **Plugins and data** &gt; **Plugins** to check for updates. Grafana recommends upgrading to the latest Grafana version, and this applies to plugins as well.

> Note
>
> Plugins are automatically updated in Grafana Cloud.

## Related resources

- [Troubleshoot PagerDuty data source issues](/docs/plugins/grafana-pagerduty-datasource/latest/troubleshooting/)
- [PagerDuty REST API documentation](https://developer.pagerduty.com/api-reference/)
- [Explore](/docs/grafana/latest/explore/)
- [Transformations](/docs/grafana/latest/panels-visualizations/query-transform-data/transform-data/)
- [Alerting](/docs/grafana/latest/alerting/)
- [Grafana community forum](https://community.grafana.com/)
