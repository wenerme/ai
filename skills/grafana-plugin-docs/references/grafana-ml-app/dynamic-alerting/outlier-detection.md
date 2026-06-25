---
title: "Outlier detection | Grafana Plugins documentation"
description: "Create an Outlier Detector in Grafana Machine Learning."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Outlier detection

Grafana AI’s outlier detection helps you identify when members of a group behave differently from the rest, so you can spot anomalies early and take action before they impact your systems. For example, outlier detection can alert you when one instance in your cluster uses significantly more CPU than others, enabling proactive troubleshooting and prevention.

Use the following guide to create an Outlier Detector and set up outlier-based alerts in Grafana AI:

Give it a try using Grafana Play

With Grafana Play, you can explore and see how it works, learning from practical examples to accelerate your development. This feature can be seen on [Outlier detection page](https://play.grafana.org/a/grafana-ml-app/outlier-detector).

[Try it](https://play.grafana.org/a/grafana-ml-app/outlier-detector)

## Before you begin

- If needed, have an administrator [initialize Grafana AI](/docs/grafana/latest/administration/roles-and-permissions/).
- [Editor permissions](/docs/grafana/latest/administration/roles-and-permissions/) are required to create an outlier detector.

## Create an Outlier Detector

1. In the Grafana Cloud main menu, select **AI &amp; machine learning**.
2. From the **AI &amp; machine learning** home page, navigate the **Outlier Detection** tab, then click **+ Outlier Detector**.
3. Use the query builder to write your query.
4. Adapt the algorithm and sensitivity to your use case.
5. When you are satisfied with the results and the selected sensitivity, click **Create** to save the Outlier Detector.
6. Optional: From the outlier detectors list, click **Create Alert** to create an Outlier-based alert from your detector.

For further guidance on how to build an effective Outlier Detector query, refer to [Build the Outlier Detector query](#build-the-outlier-detector-query).

## Build the Outlier Detector query

The Outlier Detector query determines what series are compared and, more importantly, what the baseline group is. Outlier detection supports any metric query with three or more series.

To create an effective Outlier Detector query, consider that each member of the group is expected to behave similarly to its peers. Use [filters to define the baseline group](#use-filters-to-define-the-baseline-group) and [adjust the detection algorithm and sensitivity](#select-the-detection-algorithm-and-sensitivity).

### Example use case: Monitoring load balance

Suppose you have a system where the load is evenly distributed across many instances. Depending on the scenario, the load may be almost perfectly distributed or distributed with a spread. Such as with the [Grafana Mimir distributor](/docs/mimir/latest/operators-guide/architecture/components/distributor/) or the [Grafana Mimir ingester](/docs/mimir/latest/operators-guide/architecture/components/ingester/). In this case, you may want to know when an instance, or a subset of instances, behaves differently compared to its peers, as this could create a bottleneck or cause other downstream issues.

### Use filters to define the baseline group

Outlier detection works best when the expectation is that all members of the group should behave similarly. For the most effective outlier detection, filter your query so that the baseline group has a similar profile.

Consider the monitoring load balance use case:

- You have a CPU metric from multiple instances in different clusters. The US cluster, in particular, has a significantly heavier load than all other clusters.
- The baseline of all clusters combined is relatively low, which makes the instances in the US cluster stand out. As a result, the unfiltered query flags all instances in the US cluster as an outlier.
- If you filter the query to only include instances in the US cluster, these particular instances behave quite similarly.
- Filter your query for a more accurate baseline for this cluster and fewer false positive outlier alerts fired.

### Select the detection algorithm and sensitivity

The detection algorithm determines which distance calculation the Outlier Detector uses and the expected behavior in the group. Outlier detection supports two different algorithms: DBSCAN and MAD. For each algorithm, you can set the sensitivity to your liking. A higher sensitivity setting will result in more outliers and more alerts fired.

Which algorithm works best will depend on your use case and data:

- DBSCAN (Density-based spatial clustering of applications with noise): Clusters data points based on their density and distances and flags them if a series has data points outside the largest cluster. DBSCAN works with a rolling window, which means the band of normal behavior will move with your data. Use DBSCAN if you expect your series to move in sync over time or if you have strong trends in your data.
- MAD (Median Absolute Deviation): Compares the distances of data points at each timestamp to the rolling 24-hour median and flags them if a series has data points outside the chosen sensitivity threshold. MAD works best when you expect all members of a group to move within a stable band of normal behavior and is less affected by out-of-sync events, such as instances restarting at different times.

From the query builder, select the detection algorithm that best fits your system and query.

## Create an Outlier-based alert

Once the Outlier Detector is created, you can create an Outlier-based alert to notify you when an outlier is detected. Outlier-based alerts enable you to take action to resolve the anomaly as early as possible.

To create an Outlier-based alert:

1. From AI &amp; machine learning, navigate to the **Outlier Detection** tab.
2. Click **Create Alert** from the Outlier Detectors list.
3. Once you’re redirected to Grafana Managed alerts, configure and save your Outlier-based alert.

### Creating an Aggregated Outlier-based alert

By default, outlier-based alerts fire when at least one member of the group behaves differently than the rest. Use aggregated outlier-based alerts for systems with an expected tolerance for a certain number of instances to misbehave without affecting the overall system.

To create an aggregated outlier-based alert:

1. Click **Create Alert** from the Outlier Detectors list.
2. From Grafana Managed alerts, adapt the alert rule query to send an alert when the expected tolerance is met.

As an example, the default alert rule query for an Outlier Detector named `web_api_cluster_cpu_usage` is `web_api_cluster_cpu_usage:outliers`. To change this rule so that it only fires an alert if more than 10% of the group behaves differently, use an aggregated alert rule query:

`(sum(web_api_cluster_cpu_usage:outliers) / count(web_api_cluster_cpu_usage:outliers)) > 0.10`

## Querying the results

Similar to [Metric Forecasting](/docs/grafana-cloud/alerting-and-irm/machine-learning/dynamic-alerting/querying/) in Grafana AI, once you have saved an Outlier Detector, a new metric is exposed in the grafanacloud-ml-metrics Prometheus data source.

The metric `<outlier_detector_metric_name>:outliers` returns a binary value (0: not outlier, 1: outlier) for each timestamp that indicates whether or not a particular series was an outlier.
