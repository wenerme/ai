---
title: "Query metrics | Grafana Plugins documentation"
description: "How to query machine learning results."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Query metrics

Once you have trained a forecast, a new **grafanacloud-ml-metrics** Prometheus data source will be present in your Grafana Cloud instance. This data source can be queried using PromQL to translate specific queries into running forecasts.

## Queried series

Two main metrics can be queried. The `<forecast_metric_name>:predicted` provides series related to the predictions of a specific forecast, and `<forecast_metric_name>:actual` provides the actual values retrieved from the forecast query.

All available series have a resolution equal to the training data interval of their corresponding forecast. See the [Data Range](/docs/grafana-cloud/alerting-and-irm/machine-learning/dynamic-alerting/forecasting/config/#data-range) documentation for more information.

### Predicted

The `:predicted` metric contains three series differentiated by the `ml_forecast` label. For example, a forecast with a metric name of `request_rate` will produce the following series:

promql [Copy code to clipboard] Copy

```promql
request_rate:predicted{ml_forecast="yhat"}
request_rate:predicted{ml_forecast="yhat_lower"}
request_rate:predicted{ml_forecast="yhat_upper"}
```

Where `yhat` is the calculated the predicted value, and `yhat_lower` and `yhat_upper` are the confidence bounds of the prediction.

The `:predicted` metric can be queried for future timestamps, with data available for up to half of the [training data range](/docs/grafana-cloud/alerting-and-irm/machine-learning/dynamic-alerting/forecasting/config/#data-range) into the future.

For example, if the training data range is set to 90 days (the default) and there is at least 90 days of training data available, then the `:predicted` metric will be available up to 45 days in the future. If there is only 20 days of training data available, then the `:predicted` metric will be available up to 10 days in the future.

### Actual

The `:actual` metric queries the datasource for up-to-date data of the real values. The results for this query do not have an `ml_forecast` label, so to compare the `:predicted` and `:actual` series you need to use `ignoring (ml_forecast)`.

For example, to calculate the residual, or error, of a prediction you can use the PromQL:

promql [Copy code to clipboard] Copy

```promql
abs(request_rate:predicted{ml_forecast="yhat"} - ignoring (ml_forecast) request_rate:actual)
```

### Anomalous

Another common use case is anomaly detection, defined as when the :actual value is outside of the `:predicted` upper or lower bounds. The `:anomalous` metric queries the data source for anomalous values. The `:anomalous` metric has a value of 1 when `:actual` is anomalously high, a value of 0 when `:actual` is not anomalous, and a value of -1 when `:actual` is anomalously low. To query for all points where there are anomalies, high or low, you need to query for `:anomalous != 0`.

Expand table

| :actual &gt; :predicted{ml\_forecast=“yhat\_upper”} | :actual &lt; :predicted{ml\_forecast=“yhat\_lower”} | :anomalous |
|-----------------------------------------------------|-----------------------------------------------------|------------|
| No                                                  | No                                                  | 0          |
| Yes                                                 | No                                                  | 1          |
| No                                                  | Yes                                                 | -1         |

The results for this query do not have an `ml_forecast` label, so to combine :anomalous with either the `:predicted` or `:actual` series, you need to use `ignoring (ml_forecast)`.

### Querying the Values of Anomalous Points

You can query the values of anomalous points. To query the anomalous values, low or high, use the following query:

promql [Copy code to clipboard] Copy

```promql
request_rate:actual and ignoring (ml_forecast) (request_rate:anomalous != 0)
```

For only anomalies below the lower bound, use one of the following two examples:

promql [Copy code to clipboard] Copy

```promql
request_rate:actual and ignoring (ml_forecast) (request_rate:anomalous == -1)
```

or

promql [Copy code to clipboard] Copy

```promql
request_rate:actual < ignoring (ml_forecast) request_rate:predicted{ml_forecast="yhat_lower"}
```

For only anomalies above the upper bound, use one of the following two examples:

promql [Copy code to clipboard] Copy

```promql
request_rate:actual and ignoring (ml_forecast) (request_rate:anomalous == 1)
```

or

promql [Copy code to clipboard] Copy

```promql
request_rate:actual > ignoring (ml_forecast) request_rate:predicted{ml_forecast="yhat_upper"}
```

The primary use of the queries using greater or less than, instead of the queries checking the ‘anomalous’ flag, is if you want to add something else to your criteria. For example, if you want only results more than 10% above the upper bound, you can add 10% to the expression on the right.
