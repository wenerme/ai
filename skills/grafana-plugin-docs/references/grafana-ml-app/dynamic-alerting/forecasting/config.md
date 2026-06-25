---
title: "Forecast model configuration | Grafana Plugins documentation"
description: "Overview of model configuration."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Forecast model configuration

This page contains details on the forecast model details available for configuration and relevant notes regarding the individual settings.

## Standard Model Options

### Uncertainty Interval Width

- Default: 0.95
- Minimum: 0.01
- Maximum: 1

Uncertainty intervals (`yhat_upper`, `yhat_lower`) are computed as quantiles of the predicted value to use. The default value of 0.95 provides a 95% prediction interval, meaning 95% of future data should be expected to be between `(yhat_upper, yhat_lower)`.

## Advanced Model Options

### Trend Upper and Lower Limits

Setting upper and lower limits to the trend makes Prophet use logistic growth instead of linear growth. This causes predictions to never exceed the set bounds. When specifying bounds, be sure to choose values which correctly bound the underlying data.

Upper and lower limits cannot be used if you are rescaling the data, and for most use cases rescaling the data will provide better results than setting trend limits.

### Trend Mode

- Default: Auto
- Options: Auto, Custom, Off

When set to **Auto** the series is assumed to have some trend component. Trend changepoints will be automatically detected in the first 80% of the data and are given a relatively weak weight in the model.

Set this option to **Custom** to expose two further options:

- **Changepoint range** determines the proportion of data in which changepoints should be detected. For example, setting this to 0.5 would detect changepoints in the first 50% of the data.
- **Changepoint prior** determines the weight given to changepoints in the model. Increasing this will allow changepoints to have a larger effect on the forecasts. Set this to a very low number to effectively disable changepoint detection.

Set this option to **Off** to disable the trend component entirely.

### Daily Seasonality

- Default: Auto
- Options: Auto, Off, Custom

By default, daily seasonality is enabled if the query has at least two days of data.

You can set this option to **Custom** to customise the amount of detail modeled by the daily seasonality. This may be useful if your data shows strong daily patterns.

Set this option to **Off** to disable daily seasonality entirely.

### Weekly Seasonality

- Default: Auto
- Options: Auto, Off, Custom

By default, weekly seasonality is enabled if the query has at least two weeks of data.

You can also set this option to **Custom** to customise the amount of detail modeled by the weekly seasonality. This may be useful if your data shows strong weekly patterns.

Set this option to **Off** to disable weekly seasonality entirely.

### Seasonality Prior Scale

- Default: 10
- Minimum: 0.01
- Maximum: 10

Controls the weight given to daily and weekly seasonalities in the models forecasts. Increasing this value will cause the model to follow seasonal trends more strongly.

### Seasonality Mode

- Default: Additive
- Options: Additive, Multiplicative

How seasonality is applied to the trend to form the final forecast. Set to **Multiplicative** if it appears that the magnitude of seasonal fluctuations grows with the magnitude of the time series.

### Data Range

- Default: 90 days
- Maximum: 5 years

How far back in time to look for training data. This range should not be greater than the retention period of the underlying data source, as no data would be returned beyond it.

The resolution of the training data and of the generated predictions (also known as the **interval** or **step**) will be determined based on this range, such that no more than 50,000 samples per series are included in the training data. This is done by finding the smallest interval from a few options such that `data range / interval <= 60480`. For reference, 90 days of training data uses a 5 minute interval for a total of 25,920 samples. Larger ranges will therefore result in larger intervals.

## Holidays

Use this section to link holidays to the forecast. Refer to the [Holidays](../holidays/) documentation for more information.
