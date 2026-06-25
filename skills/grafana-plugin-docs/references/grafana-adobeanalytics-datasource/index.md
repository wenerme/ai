---
title: "Adobe Analytics data source | Grafana Enterprise Plugins documentation"
description: "Use the Adobe Analytics data source to query and visualize Adobe Analytics reports data in Grafana."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Adobe Analytics data source

> Note
>
> This plugin is in public preview. For details, refer to [Grafana release life cycle](/docs/release-life-cycle/). If you encounter issues or want to request a feature, open a support ticket with your Grafana Enterprise support channel.

The Adobe Analytics data source lets you query and visualize Adobe Analytics reports data in Grafana. Use it to build dashboards that combine Adobe Analytics metrics and dimensions with other telemetry in your Grafana organization.

> Note
>
> The Adobe Analytics data source is an Enterprise plugin. It’s available with a Grafana Cloud Pro or Advanced plan and Grafana Enterprise. For installation instructions, refer to [Install Grafana Enterprise plugins](/docs/grafana/latest/administration/plugin-management/#install-grafana-enterprise-plugins).

## Requirements

To use the Adobe Analytics data source, you need:

- An Adobe Analytics account with access to the [Adobe Analytics 2.0 API](https://developer.adobe.com/analytics-apis/docs/2.0/).
- An Adobe Developer Console project configured with the **Adobe Analytics API** and **OAuth Server-to-Server** credentials. Refer to [Create a project](https://developer.adobe.com/developer-console/docs/guides/projects/projects-empty/) and [Server-to-Server credentials](https://developer.adobe.com/developer-console/docs/guides/credentials/) in the Adobe Developer documentation.
- A [Grafana Cloud Pro or Advanced](/pricing/) plan or an [activated on-prem Grafana Enterprise license](/docs/grafana/latest/enterprise/license/activate-license/).

## Supported features

Expand table

| Feature     | Supported |
|-------------|-----------|
| Metrics     | Yes       |
| Logs        | No        |
| Traces      | No        |
| Alerting    | Yes       |
| Annotations | Yes       |

## Install the data source

To install the Adobe Analytics data source, refer to [Install Grafana Enterprise plugins](/docs/grafana/latest/administration/plugin-management/#install-grafana-enterprise-plugins). On Grafana Cloud, Enterprise plugins are managed for you and installed from the plugin catalog.

## Configure the data source

Configure the Adobe Analytics data source with your Global Company ID and an OAuth Server-to-Server credential from the Adobe Developer Console.

### Before you begin

Before you configure the data source, ensure you have:

- **Grafana permissions:** Organization administrator role.
- **Adobe Analytics access:** Access to the Adobe Analytics Company whose data you want to query.
- **Adobe Developer credentials:** A Client ID and Client Secret from an OAuth Server-to-Server credential in the Adobe Developer Console.

### Key concepts

If you’re new to Adobe Analytics, these terms are used throughout the configuration and query editor:

Expand table

| Term                       | Description                                                                                                           |
|----------------------------|-----------------------------------------------------------------------------------------------------------------------|
| **Global Company ID**      | The identifier for your Adobe Analytics Company. It’s included in every API request URL.                              |
| **Report suite**           | A container in Adobe Analytics that defines a reporting dataset. Each report suite has an `rsid`.                     |
| **Metric**                 | A quantitative measurement such as page views or visitors.                                                            |
| **Dimension**              | An attribute you use to group metrics, such as `Product` or `Day`.                                                    |
| **Segment**                | A saved filter that constrains which visits, visitors, or hits are included in a report.                              |
| **OAuth Server-to-Server** | An Adobe IMS credential type that issues access tokens using a Client ID and Client Secret, with no user interaction. |

### Find your Global Company ID

To find your Global Company ID:

1. Sign in to [Adobe Experience Cloud](https://experience.adobe.com).
2. Click **Analytics**.
3. In the top navigation bar, click **Admin** &gt; **All Admin**.
4. Click **Company Settings home**.
5. Click the **API Access** tab. Your Global Company ID appears on the page as:

   > The global company id for the Analytics Company you are currently logged into is **&lt;VALUE&gt;**

### Create an OAuth Server-to-Server credential

To create the credential in the Adobe Developer Console:

1. Go to [Projects](https://developer.adobe.com/console/projects) in the Adobe Developer Console.
2. Open the project you want to use with Grafana, or create a new one.
3. If the project doesn’t already include the Adobe Analytics API, click **Add API** and select **Adobe Analytics**.
4. If the project doesn’t already include an **OAuth Server-to-Server** credential, add one. For background, refer to [Credentials](https://developer.adobe.com/developer-console/docs/guides/credentials/) in the Adobe Developer documentation.
5. Open the **OAuth Server-to-Server** credential and copy the **Client ID** and **Client Secret**.

### Add the data source

To add the data source in Grafana:

1. Click **Connections** in the left-side menu.
2. Click **Add new connection**.
3. Type `Adobe Analytics` in the search bar.
4. Select **Adobe Analytics**.
5. Click **Add new data source**.

### Configure connection and authentication settings

On the data source configuration page, fill in the following fields.

Expand table

| Section            | Setting               | Description                                                                                    |
|--------------------|-----------------------|------------------------------------------------------------------------------------------------|
| **Connection**     | **Global Company ID** | The Global Company ID for your Adobe Analytics Company. Used in every API request path.        |
| **Authentication** | **Client ID**         | The Client ID from your OAuth Server-to-Server credential.                                     |
| **Authentication** | **Client Secret**     | The Client Secret from your OAuth Server-to-Server credential. The secret is stored encrypted. |

### Verify the connection

Click **Save &amp; test** to verify the connection. On success, Grafana displays a message containing `health check succeeded for 'Projects' query`. If the test fails, refer to [Troubleshoot Adobe Analytics data source issues](/docs/plugins/grafana-adobeanalytics-datasource/latest/troubleshooting/).

The health check requests the `/projects` endpoint on the Adobe Analytics API, which validates both the Global Company ID and the OAuth credential.

### Provision the data source

You can define the Adobe Analytics data source in YAML as part of Grafana’s provisioning system. For more information, refer to [Provisioning Grafana](/docs/grafana/latest/administration/provisioning/#data-sources).

YAML [Copy code to clipboard] Copy

```yaml
apiVersion: 1

datasources:
  - name: Adobe Analytics
    type: grafana-adobeanalytics-datasource
    jsonData:
      variables:
        global_company_id: <YOUR_GLOBAL_COMPANY_ID>
      services:
        adobe_analytics:
          auth:
            clientId: <YOUR_CLIENT_ID>
    secureJsonData:
      adobe_analytics.clientSecret: <YOUR_CLIENT_SECRET>
```

Replace the placeholders:

- `<YOUR_GLOBAL_COMPANY_ID>`: Your Adobe Analytics Global Company ID.
- `<YOUR_CLIENT_ID>`: The Client ID from your OAuth Server-to-Server credential.
- `<YOUR_CLIENT_SECRET>`: The Client Secret from your OAuth Server-to-Server credential.

#### Provision with Terraform

You can also provision the data source with the [Grafana Terraform provider](https://registry.terraform.io/providers/grafana/grafana/latest/docs) using the generic `grafana_data_source` resource.

hcl [Copy code to clipboard] Copy

```hcl
resource "grafana_data_source" "adobe_analytics" {
  type = "grafana-adobeanalytics-datasource"
  name = "Adobe Analytics"

  json_data_encoded = jsonencode({
    variables = {
      global_company_id = var.adobe_global_company_id
    }
    services = {
      adobe_analytics = {
        auth = {
          clientId = var.adobe_client_id
        }
      }
    }
  })

  secure_json_data_encoded = jsonencode({
    "adobe_analytics.clientSecret" = var.adobe_client_secret
  })
}
```

Supply the Global Company ID, Client ID, and Client Secret through Terraform input variables or another secret-handling mechanism. For the full resource reference, refer to the [`grafana_data_source`](https://registry.terraform.io/providers/grafana/grafana/latest/docs/resources/data_source) documentation.

## Query the data source

The Adobe Analytics query editor supports five query types. Use **Report** to retrieve metrics and dimensions data, and use the list queries to populate template variables or discover what’s available in a report suite.

Expand table

| Query type          | Description                                                                           |
|---------------------|---------------------------------------------------------------------------------------|
| **Report**          | Returns metrics and dimensions data from a report suite. This is the main query type. |
| **Report Suites**   | Returns the list of report suites available to your Company.                          |
| **Metrics List**    | Returns the list of metrics available in a report suite.                              |
| **Dimensions List** | Returns the list of dimensions available in a report suite.                           |
| **Segments List**   | Returns the list of segments available in a report suite.                             |

### Report query

The **Report** query returns data for a single report suite. It accepts the following fields.

Expand table

| Field                 | Description                                                                                                                                                                                                                                 |
|-----------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Report suite**      | Required. The report suite to query. Populated from the **Report Suites** list query.                                                                                                                                                       |
| **Global Segment ID** | Optional. A segment that applies as a global filter to the entire report.                                                                                                                                                                   |
| **Metrics**           | One or more metrics to return. Populated from the **Metrics List** query.                                                                                                                                                                   |
| **Dimension**         | Optional. A single dimension used to group the metric data. Populated from the **Dimensions List** query.                                                                                                                                   |
| **Segments**          | Optional. A segment applied per metric as a metric-level filter. Populated from the **Segments List** query.                                                                                                                                |
| **Search clause**     | Optional. A search clause used to filter dimension values. Refer to [Search filters](https://developer.adobe.com/analytics-apis/docs/2.0/guides/endpoints/reports/search-filters/#using-clause-parameters) in the Adobe Analytics API docs. |
| **Limit**             | The maximum number of rows to return. Default is `1000`.                                                                                                                                                                                    |

Queries return only data within the dashboard time range. Adjust the time range as needed.

#### Get metrics summary data

To return only the summary value for each metric, provide one or more metrics and leave the **Dimension** field empty. The response contains the summary totals for each metric across the selected time range.

#### Get time series data

To return time series data, select one of the Adobe Analytics date-range dimensions in the **Dimension** field:

Expand table

| Display name | Dimension ID                |
|--------------|-----------------------------|
| **Minute**   | `variables/daterangeminute` |
| **Hour**     | `variables/daterangehour`   |
| **Day**      | `variables/daterangeday`    |
| **Week**     | `variables/daterangeweek`   |
| **Month**    | `variables/daterangemonth`  |
| **Year**     | `variables/daterangeyear`   |

The dimension drop-down shows the display names. The plugin formats the values of these six dimensions as timestamps so the results render correctly in time series panels.

#### Retrieve data for non-date dimensions

When you combine metrics with a non-date dimension such as `Product`, the response contains tabular data. Use a table panel or a bar chart to visualize the result.

#### Use the Limit parameter

The **Limit** field controls the maximum number of rows returned in the response. The default is `1000`. Increase the limit if your query returns more rows than the current limit allows, for example when using a high-cardinality dimension over a long time range.

#### Use the Search clause parameter

Use **Search clause** to filter which dimension values are returned. For example, when querying the `Product` dimension, setting the search clause to `( NOT CONTAINS 'Product-1' )` excludes every product whose name contains `Product-1`. For the full clause syntax, refer to [Search filters](https://developer.adobe.com/analytics-apis/docs/2.0/guides/endpoints/reports/search-filters/#using-clause-parameters) in the Adobe Analytics API docs.

#### Filter reports by segments

The Report query supports two independent segment fields. They behave differently, so choose based on what you want to filter:

- **Global Segment ID:** Applies the selected segment as a global filter for the entire report, together with the dashboard time range. Use this when you want every metric in the report to reflect the same segment.
- **Segments:** Applies the selected segment as a per-metric filter. The plugin attaches the segment to each metric in the report and adds a matching `metricFilters` entry. Use this when you want to constrain only the metric values in this query without changing the report’s overall population.

You can use either field on its own. When both are set, the Global Segment ID narrows the report population and the Segments filter further constrains each metric.

#### Query examples

These examples show how to configure the Report query for common scenarios. In the query editor, pick metrics, dimensions, and segments from the drop-downs — they display friendly names but send the underlying Adobe Analytics IDs in the request.

**Example 1: Daily page views time series**

Visualize how page views change over time for a production report suite.

Expand table

| Field            | Value                         |
|------------------|-------------------------------|
| **Report suite** | Your production report suite. |
| **Metrics**      | **Page Views**                |
| **Dimension**    | **Day**                       |
| **Limit**        | `1000`                        |

Use a time series panel to render the result.

**Example 2: Top 10 products by revenue**

Rank products by revenue and orders for the dashboard time range.

Expand table

| Field            | Value                         |
|------------------|-------------------------------|
| **Report suite** | Your e-commerce report suite. |
| **Metrics**      | **Revenue**, **Orders**       |
| **Dimension**    | **Product**                   |
| **Limit**        | `10`                          |

Use a table or bar chart panel. Add a table **Sort by** transformation on **Revenue** if you want to guarantee descending order in the panel.

**Example 3: Hourly visits for a mobile segment**

Show visits for mobile users only, broken down by hour.

Expand table

| Field                 | Value                                        |
|-----------------------|----------------------------------------------|
| **Report suite**      | Your production report suite.                |
| **Metrics**           | **Visits**                                   |
| **Dimension**         | **Hour**                                     |
| **Global Segment ID** | A saved segment such as **Mobile visitors**. |

Because **Global Segment ID** applies as a whole-report filter, every value returned reflects the mobile segment.

**Example 4: Exclude a product family from a report**

Return revenue by product for all products except those whose name contains `Product-1`.

Expand table

| Field             | Value                          |
|-------------------|--------------------------------|
| **Report suite**  | Your e-commerce report suite.  |
| **Metrics**       | **Revenue**                    |
| **Dimension**     | **Product**                    |
| **Search clause** | `( NOT CONTAINS 'Product-1' )` |

For the full search-clause syntax, refer to [Search filters](https://developer.adobe.com/analytics-apis/docs/2.0/guides/endpoints/reports/search-filters/#using-clause-parameters) in the Adobe Analytics API documentation.

#### Use cases

Common scenarios for the Adobe Analytics data source:

- **Unified business dashboards:** Combine Adobe Analytics engagement and e-commerce metrics with infrastructure or application telemetry so on-call engineers and marketing teams share a view of customer impact during incidents.
- **Product performance monitoring:** Track orders, revenue, and bounce rate for key product pages and set alerts when metrics deviate from expected ranges.
- **Campaign analysis:** Compare visits, conversions, and revenue across campaigns by filtering on a campaign segment.
- **Segment comparisons:** Compare the same metrics across mobile versus desktop, paid versus organic, or any pair of saved segments by duplicating a Report query and changing only the **Global Segment ID**.
- **Content performance:** Identify top-performing pages, referrers, or search terms by pairing the appropriate dimension with **Page Views** or **Visits**.

### List queries

Use the list queries to discover report suites, metrics, dimensions, and segments, or as the source for template variables.

#### Report Suites

Returns the report suites available to your Adobe Analytics Company.

Expand table

| Field                        | Description                                                                     |
|------------------------------|---------------------------------------------------------------------------------|
| **Report suite ID contains** | Optional. Returns only report suites whose `rsid` contains the given substring. |

#### Metrics List

Returns the metrics available for a given report suite.

Expand table

| Field                  | Description                                                                                                    |
|------------------------|----------------------------------------------------------------------------------------------------------------|
| **Report suite ID**    | Required. The `rsid` of the report suite.                                                                      |
| **Specified language** | Optional. A locale used to translate metric names.                                                             |
| **Segmentable**        | Optional. If enabled, returns only metrics that are valid inside a segment.                                    |
| **Expansion**          | Optional. Additional metadata to include. Options are **Allowed for reporting**, **Categories**, and **Tags**. |

#### Dimensions List

Returns the dimensions available for a given report suite.

Expand table

| Field                  | Description                                                                                                    |
|------------------------|----------------------------------------------------------------------------------------------------------------|
| **Report suite ID**    | Required. The `rsid` of the report suite.                                                                      |
| **Specified language** | Optional. A locale used to translate dimension names.                                                          |
| **Segmentable**        | Optional. If enabled, returns only dimensions that are valid inside a segment.                                 |
| **Reportable**         | Optional. If enabled, returns only dimensions that are valid inside a report.                                  |
| **Classifiable**       | Optional. If enabled, returns only classifiable dimensions.                                                    |
| **Expansion**          | Optional. Additional metadata to include. Options are **Allowed for reporting**, **Categories**, and **Tags**. |

#### Segments List

Returns the segments available for a given report suite.

Expand table

| Field                   | Description                                                                                                                                            |
|-------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Report suite ID**     | Required. The `rsid` of the report suite.                                                                                                              |
| **Name**                | Optional. Returns segments whose name contains this string.                                                                                            |
| **Tag Names**           | Optional. Returns segments that contain the given tags.                                                                                                |
| **Segment Filter**      | Optional. Returns segments that match the given IDs. Separate multiple IDs with commas.                                                                |
| **Filter By Published** | Optional. Filters segments by their published state. Options are **All**, **True**, and **False**. Defaults to **All**.                                |
| **Include Type**        | Optional. Requires admin permissions to include segments you didn’t create. Options are **All**, **Shared**, and **Templates**. Defaults to all three. |
| **Limit**               | Optional. The maximum number of segments to return. Default is `1000`.                                                                                 |

## Template variables

You can use Adobe Analytics queries as the source for Grafana template variables to build dynamic, reusable dashboards. The list queries (**Report Suites**, **Metrics List**, **Dimensions List**, and **Segments List**) are the most useful for this.

To create an Adobe Analytics query variable:

1. Open your dashboard and click the dashboard settings icon.
2. Select **Variables** &gt; **Add variable**.
3. Set **Type** to **Query**.
4. Select your Adobe Analytics data source.
5. Choose one of the list query types and fill in the required parameters.

For details on how Grafana handles variables, refer to [Variables](/docs/grafana/latest/dashboards/variables/) and [Variable syntax](/docs/grafana/latest/dashboards/variables/variable-syntax/).

### Variable example: select a report suite per dashboard

A common pattern is to create an `rsid` variable so users can switch the whole dashboard between report suites without editing each panel.

1. Open your dashboard and enter edit mode.
2. Select **Variables** &gt; **Add variable**.
3. Set **Name** to `rsid` and **Type** to **Query**.
4. Select your Adobe Analytics data source.
5. Set **Query type** to **Report Suites**. Leave the filter field empty to list all suites, or set **Report suite ID contains** to narrow the list.
6. Click **Run query** to confirm the drop-down populates, then save the variable.
7. In your Report queries, use `${rsid}` in the **Report suite** field. When a user picks a suite from the dashboard drop-down, every panel updates together.

The same pattern works for metrics, dimensions, and segments — use the corresponding list query as the variable source, then reference the variable in the matching Report query field.

## Alerting

The Adobe Analytics data source supports Grafana alerting. You can create alert rules from any Report query that returns numeric data. For details on setting up rules, notification policies, and contact points, refer to [Alerting](/docs/grafana/latest/alerting/).

## Annotations

The Adobe Analytics data source supports Grafana annotations. Use a Report query that returns data with a time series dimension to mark events on a dashboard panel. For details, refer to [Annotations](/docs/grafana/latest/dashboards/build-dashboards/annotate-visualizations/).

## Known limitations

The Adobe Analytics data source doesn’t currently support breakdown dimensions in a single Report query. If you need this, open a feature request through your Grafana Enterprise support channel and describe your use case.

## Plugin updates

Always ensure that your plugin version is up-to-date so you have access to all current features and improvements. Navigate to **Plugins and data** &gt; **Plugins** to check for updates. Grafana recommends upgrading to the latest Grafana version, and this applies to plugins as well.

> Note
>
> Plugins are automatically updated in Grafana Cloud.

## Related resources

- [Troubleshoot Adobe Analytics data source issues](/docs/plugins/grafana-adobeanalytics-datasource/latest/troubleshooting/)
- [Adobe Analytics 2.0 API documentation](https://developer.adobe.com/analytics-apis/docs/2.0/)
- [Adobe Developer Console credentials guide](https://developer.adobe.com/developer-console/docs/guides/credentials/)
- [Grafana community forum](https://community.grafana.com/)
