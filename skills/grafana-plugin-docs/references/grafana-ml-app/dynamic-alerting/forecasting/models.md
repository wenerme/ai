---
title: "Advanced forecast model configuration | Grafana Plugins documentation"
description: "Details of how to configure a model from Terraform."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Advanced forecast model configuration

This page contains details on the forecast model details available for configuration and relevant notes regarding the individual settings.

## Common forecast model Configuration

The following fields are configurable on all models:

### Training data range

How far back in time to look for training data. Default 90 days. This range should not be greater than the retention period of the underlying data source, as no data would be returned beyond it. If the value is set too high, it could limit your training data interval options.

### Training data interval

The resolution of the data being trained on and of the generated predictions. Default 5 minutes.

A minimum of 100 and maximum of 50,000 samples per series can be used to train a model, so `training data range / training data interval` must result in less than 50,000. For reference, 90 days of training data at a 5 minute resolution is 25,920 samples.

## Prophet Hyperparameters

The following are hyperparameters that can be tuned for the Prophet model. The ‘Terraform’ bullet points indicate the key of the hyperparameter to use in the `hyper_params` field of the `grafana_machine_learning_job` resource when provisioning with Terraform.

### Changepoint Prior Scale

- Default: 0.05
- Minimum: 0.001
- Maximum: 10.0
- Terraform: `changepoint_prior_scale`

Determines the flexibility of the trend and in particular how much the trend changes at the trend changepoints. If it is too small the trend will be underfit and variance that should have been modeled with trend changes will instead end up being handled with the noise term. If it is too large the trend will overfit and in the most extreme case you can end up with the trend capturing yearly seasonality. A range of \[0.001, 0.5] would likely be about right.

### Changepoint Range

- Default: 0.8
- Minimum: 0.01
- Maximum: 1.0
- Terraform: `changepoint_range`

Controls what portion of the training data to check for changepoints. For the default value of 0.8, the first 80% of the data is checked for changepoints, and changepoints in the remaining 20% of data are ignored.

### Seasonality Prior Scale

- Default: 10.0
- Minimum: 0.01
- Maximum: 10.0
- Terraform: `seasonality_prior_range`

Controls the flexibility to fit the seasonality. A large value allows the seasonality to fit large fluctuations, whereas a small value shrinks the magnitude of the seasonality.

### Uncertainty Interval Width

- Default: 0.95
- Minimum: 0.01
- Maximum: 1
- Terraform: `interval_width`

Uncertainty intervals (yhat\_upper, yhat\_lower) are computed as quantiles of the predicted value to use. The default value of 0.95 provides a 95% confidence interval. 95% of future data should be expected to be between (yhat\_upper, yhat\_lower).

### Seasonality Mode

- Default: additive
- Options: additive, multiplicative
- Terraform: `seasonality_mode`

Set to “multiplicative” if it appears that the magnitude of seasonal fluctuations grows with the magnitude of the time series.

### Growth

- Default: linear
- Options: flat, linear, logistic
- Terraform: `growth`

The type of model used for the growth trend component.

Set to ‘flat’ only if you are certain that the trend is constant and that the time series mostly exhibits seasonality patterns, rather than trend changes. A flat growth model can reduce the width of uncertainty intervals in such cases.

Choose ’linear’ when you model something that always increases linearly. For example, disk space consumed by a constant rate of write operations.

Choose ’logistic’ for scenarios when you model growth with a known maximum value. You need to specify the maximum achievable point or carrying capacity at which that the forecast saturates. An optional floor may also be specified.

#### Logistic Cap

- Terraform: `logistic_growth_cap`

Expected maximum achievable value (required if and only if ‘growth’ is ’logistic’).

#### Logistic Floor

- Terraform: `logistic_growth_floor`

Expected minimum achievable value (optional).

### Weekly Fourier Order

- Default: 3
- Minimum: 0 (disabled)
- Maximum: 25
- Terraform: `weekly_seasonality`

How many Fourier orders to use to calculate weekly seasonality. If you leave the value empty, the value defaults to 3 when the training data range is larger than two weeks, and seasonality is then disabled on training data ranges under two weeks. Setting the Fourier order to 0 will disable weekly seasonality. Note that if a separate weekly seasonality for a holiday is configured, it is not possible to disable weekly seasonality.

If there is a strong weekday vs weekend component to your data it is recommended to use a Fourier order between 10 and 25.

### Separate weekly seasonality for holiday

Optionally, a holiday for which weekly seasonality should be modelled separately. This allows the model to capture the fact that the holiday may have a different day-of-week effects to non-holidays. For example, public holidays may not show the same weekday effects as non-holidays.

- Terraform: `conditional_weekly_seasonality` (must be set to the ID of a linked holiday)

### Daily Fourier Order

- Default: 4
- Minimum: 0 (disabled)
- Maximum: 25
- Terraform: `daily_seasonality`

How many Fourier orders to use when calculating daily seasonality. Leaving this value empty will use the default of 4 when the training data range is larger than two days, and disable seasonality on smaller training data ranges. Setting the Fourier order to 0 will disable daily seasonality. Note that if a separate daily seasonality for a holiday is configured it is not possible to disable daily seasonality.

### Separate daily seasonality for holiday

Optionally, a holiday for which daily seasonality should be modelled separately. This allows the model to capture the fact that the holiday may have a different hour-of-day effects to non-holidays. For example, public holidays may not show the same spike during work hours as non-holidays.

- Terraform: `conditional_daily_seasonality` (must be set to the ID of a linked holiday)

### Holidays Prior Scale

- Default: 10.0
- Minimum: 0.01
- Maximum: 10.0
- Terraform: `holidays_prior_scale`

Controls the flexibility to fit holidays. A large value allows fitting to large fluctuations on holidays, whereas a small value shrinks the impact of those fluctuations on the fit.
