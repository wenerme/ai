---
title: "Sift analysis - HTTP error series | Grafana Plugins documentation"
description: "This Sift analysis identifies elevated HTTP errors within a specified cluster and namespace."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Sift analysis - HTTP error series

This analysis reviews HTTP request and response data, looking for any errors that may be relevant within the given time range.

## Inputs

- Required:

  - `cluster`
  - `namespace`
- Optional:

  - None

*If no cluster or namespace is available, this analysis will use all clusters and/or all namespaces it can locate.*

## How it works

### Step 1: Retrieve relevant series

A request is made to the Prometheus series endpoint to fetch all series that match the investigation selectors and include one of the known HTTP error-related labels: `code`, `http_status`, `status_code`, `statuscode`, `response_code`, or `status`.

The label values should match the regular expression `"(4|5)[0-9]{2}"`.

### Step 2: Filtering out some series

Series with names ending in `_sum` or `_bucket` are filtered out to narrow down the dataset

### Step 3: Query series data

For each remaining series, an additional request is made to the `query_range` Prometheus endpoint to retrieve the data using the following query:

[Copy code to clipboard] Copy

```none
sum(
  rate(http_metric{%s, code=~"(4|5)[0-9]{2}"}[5m]) or
  rate(http_metric{%s, http_status=~"(4|5)[0-9]{2}"}[5m]) or
  rate(http_metric{%s, status_code=~"(4|5)[0-9]{2}"}[5m]) or
  rate(http_metric{%s, statuscode=~"(4|5)[0-9]{2}"}[5m]) or
  rate(http_metric{%s, response_code=~"(4|5)[0-9]{2}"}[5m]) or
  rate(http_metric{%s, status=~"(4|5)[0-9]{2}"}[5m])
)
```

The query requires `cluster` and `namespace` labels. If these labels are not available, it will utilize all available inputs.

### Step 4: Detect timestamps with elevated HTTP errors

For each series, the system checks if any point in the series exceeds the threshold specified in the configuration compared to the average so far value of the points.

The timestamp of any such point is noted as the occurrence of an anomaly, indicating elevated HTTP errors

### Step 5: Identify anomaly windows

Once all series have been analyzed, the anomaly timestamps are processed to determine the 5-minute window with the highest count of elevated HTTP error timestamps.

## What resources does this analysis use?

- Prometheus datasource - Series endpoint
- Prometheus datasource - Query range endpoint

## How does this analysis determine when a result is interesting?

- The anomaly window start time is after the investigation start time
- The anomaly window has more than one series

## What configurations options are available for this analysis?

### Cut off time

The maximum time to look back for anomalies. Increase this value to look further in the past for erroring series, or decrease it to reduce false positives.

- Default: 90 minutes
- Minimum: 20 minutes
- Maximum: 2 hours

### Threshold

The minimum percentage change of HTTP errors from the rolling average before a series is considered anomalous.

- Default: 60%
- Minimum: 50%
