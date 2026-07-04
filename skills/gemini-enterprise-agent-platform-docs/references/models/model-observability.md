This document explains how to monitor the behavior, health, and performance of
your fully-managed models in Gemini Enterprise Agent Platform. It describes how to use the prebuilt
model observability dashboard to gain insights into model usage, identify
latency issues, and troubleshoot errors.

You learn how to do the following:

- Access and interpret the model observability dashboard.
- View available monitoring metrics.
- Monitor model endpoint traffic using Metrics Explorer.

## Access and interpret the model observability dashboard

Generative AI on Gemini Enterprise Agent Platform provides a prebuilt model observability dashboard to
view the behavior, health, and performance of fully-managed models.
Fully-managed models, also known as Model as a Service (MaaS), are provided by
Google and include Google's Gemini models and partner
models with managed endpoints. Metrics from self-hosted models aren't included
in the dashboard.

Generative AI on Gemini Enterprise Agent Platform automatically collects and reports activity from MaaS
models to help you quickly troubleshoot latency issues and monitor capacity.
![A sample model observability dashboard in the Cloud Console](https://docs.cloud.google.com/static/gemini-enterprise-agent-platform/models/images/observability-dashboard.png) ^Model observability dashboard example^

### Use case

As an application developer, you can view how your users are interacting with
the models that you've exposed. For example, you can view how model usage (model
requests per second) and the compute intensity of user prompts (model invocation
latencies) are trending over time. Consequently, because these metrics are
related to model usage, you can also estimate costs for running each model.

When an issue arises, you can quickly troubleshoot from the dashboard. You can
check if models are responding reliably and in a timely manner by viewing API
error rates, first token latencies, and token throughput.

### Available monitoring metrics

The model observability dashboard displays a subset of metrics that are
collected by Cloud Monitoring, such as model request per second (QPS), token
throughput, and first token latencies. [View the dashboard](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/model-observability#view) to see all
the available metrics.

### Limitations

Agent Platform captures dashboard metrics only for API calls to a
model's endpoint. Google Cloud console usage, such as metrics from
Vertex AI Studio, aren't added to the dashboard.

### View the dashboard

1. In the Agent Platform section of the Google Cloud console, go to the **Dashboard** page.

[Go to Agent Platform](https://console.cloud.google.com/agent-platform/)
1. In the dashboard, under Model observability, click **Show all metrics** to view
the model observability dashboard in the Google Cloud Observability console.

> [!NOTE]
> **Note:** The observability section is available only if you or another user has made API calls to a MaaS model in your project.

1. To view metrics for a specific model or in a particular location, set one or
   more filters at the top of the dashboard page.

   For descriptions of each metric, see the "`aiplatform`" section on the
   [Google Cloud metrics](https://docs.cloud.google.com/monitoring/api/metrics_gcp_a_b#gcp-aiplatform) page.

## Monitor model endpoint traffic

Use the following instructions to monitor traffic to your endpoint in the
Metrics Explorer.

1. In the Google Cloud console, go to the **Metrics Explorer** page.

   [Go
   to Metrics Explorer](https://console.cloud.google.com/projectselector/monitoring/metrics-explorer?supportedpurview=project,folder,organizationId)
2. Select the project you want to view metrics for.

3. From the **Metric** drop-down menu, click **Select a metric**.

4. In the **Filter by resource or metric name** search bar, enter
   `Gemini Enterprise Agent Platform Endpoint`.

5. Select the **Agent Platform Endpoint \> Prediction** metric category. Under **Active metrics**, select any of the following metrics:

   - **`prediction/online/error_count`**
   - **`prediction/online/prediction_count`**
   - **`prediction/online/prediction_latencies`**
   - **`prediction/online/response_count`**

   Click **Apply** . To add more than one metric, click **Add query**.

   You can filter or aggregate your metrics using the following drop-down menus:
   - To select and view a subset of your data based on specified criteria, use
     the **Filter** drop-down menu. For example, to filter for the model
     `gemini-2.0-flash-001`, use `endpoint_id = gemini-2p0-flash-001` (note that
     the `.` in the model version is replaced with a `p`).

   - To combine multiple data points into a single value and see a summarized
     view of your metrics, use the **Aggregation** drop-down menu. For example, you can aggregate the **Sum** of `response_code`.

6. Optionally, you can set up alerts for your endpoint. For more information,
   see [Manage alerting policies](https://docs.cloud.google.com/monitoring/alerts/manage-alerts).

To view the metrics you add to your project using a dashboard, see
[Dashboards overview](https://docs.cloud.google.com/monitoring/dashboards).

## What's next

- To learn how to create alerts for your dashboard, see [Alerting overview](https://docs.cloud.google.com/monitoring/alerts).
- To learn about metrics data retention, see the [Monitoring quotas and limits](https://docs.cloud.google.com/monitoring/quotas#data_retention_policy).
- To learn about data at rest, see [Protecting data at rest](https://docs.cloud.google.com/monitoring/compliance/data-at-rest).
- To view a list of all metrics that Cloud Monitoring collects, see the "`aiplatform`" section on the [Google Cloud metrics](https://docs.cloud.google.com/monitoring/api/metrics_gcp_a_b#gcp-aiplatform) page.
