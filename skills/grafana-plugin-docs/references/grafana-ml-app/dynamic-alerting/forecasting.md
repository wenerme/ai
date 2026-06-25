---
title: "Get started with metric forecasting and anomaly detection | Grafana Plugins documentation"
description: "How to create forecast and perform anomaly detection on Grafana Cloud metrics usage."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Get started with metric forecasting and anomaly detection

This guide walks you through the procedure to create and view forecasts in Grafana Cloud.

Give it a try using Grafana Play

With Grafana Play, you can explore and see how it works, learning from practical examples to accelerate your development. This feature can be seen on [Sample forecast page](https://play.grafana.org/a/grafana-ml-app/metric-forecast/3d95ad72-efe3-446a-8e99-e43854e213d4).

[Try it](https://play.grafana.org/a/grafana-ml-app/metric-forecast/3d95ad72-efe3-446a-8e99-e43854e213d4)

## Prerequisites

To create forecasts, you need the an [Editor or Admin basic role](/docs/grafana/latest/administration/roles-and-permissions/).

## Create a forecast

The following example uses a query to forecast and when you are predicted to go over your limits, or if an unexpected increase in metrics is likely to occur.

01. Navigate to **AI &amp; machine learning &gt; Metric Forecasts**.
02. Click **+ New Forecast**.
03. In the Query builder, choose Datasource **grafanacloud-usage**.
04. Run the following query: `sum(grafanacloud_instance_active_series)`.
05. Click **Next: Preview and tune**.
06. Preview the forecast. Your series appears in green while the forecast is blue.
07. Drag the **Uncertainty interval width** slider to **0.8** and see how the bands in the preview get narrower.
08. Click the **Advanced Model Options** section header and observe the tuneable knobs.
09. Click **Next: Set name and description**.
10. Name your forecast **Grafana Cloud Active Series** and click **Next: Review**.
11. Review your forecast. Once you’re satisfied, click **Create forecast**.

On the Forecasts page, your forecast is ready to generate predictions when the **Pending** tag turns into a green **Ready** tag.

### View your forecast

1. Click **View** on the **Grafana Cloud Active Series** forecast you created in the previous section.
2. Change the view to an interesting time frame for your forecast. By default the view is for the current week.

Explore how the forecast matches your actual result, and be sure to include some days in the future to see how the model thinks your active series will evolve.

> At the top of the screen, the UI displays your original query, as well as how you can query the forecast (`grafanacloud_active_series:predicted`) or actual(`grafanacloud_active_series:actual`) data. You can use these series to create panels or alerts.

## Use the forecast in a panel

From the view page:

1. Click the **Copy as panel** button in the upper right.
2. Open an existing dashboard or create a new dashboard.
3. At the top of the dashboard, click **Add** and select **Paste panel** from the dropdown.
4. Edit the new panel and view the generated queries.

## Use the forecast in an alert

1. Click the **Create Alert** button from either the view page or the list page.
2. In the Alert evaluation behavior section, choose a folder in which to save the alert.
3. Tune the alert conditions and labels, if desired.
4. Click **Save** or **Save and exit** to create the alert and navigate back to the previous page.

See [Grafana Alerting](/docs/grafana/latest/alerting/unified-alerting/#overview-of-grafana-alerting) for more information on alerting.

## Creating jobs via Terraform

See [Grafana Terraform](https://registry.terraform.io/providers/grafana/grafana/latest/docs/resources/machine_learning_job) docs for more details.

See our [Forecast model configuration](/docs/grafana-cloud/alerting-and-irm/machine-learning/dynamic-alerting/forecasting/config/) docs for more details on the optons available.
