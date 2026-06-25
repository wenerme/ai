---
title: "Sift analysis - Metric query | Grafana Plugins documentation"
description: "This Sift analysis shows results from a configurable PromQL query run against a Prometheus instance."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Sift analysis - Metric query

This analysis runs a custom Prometheus query configured by the user and uses the result to populate a configurable template.

## Inputs

- Required:

  - None
- Optional:

  - Custom filters

## How it works

### Step 1: Process query

Interpolates the user’s query using the investigation labels.

For example: `node_load1{namespace=”$namespace”, cluster=”$cluster”}` becomes `node_load1{namespace=”machine-learning”, cluster=”dev-us-central-0”}`

### Step 2: Execute query

Executes the query against the discovered Prometheus datasource.

### Step 3: Process results

Interpolates the template message using the result of the query.

For example, this template:

[Copy code to clipboard] Copy

```none
I found something interesting!
Expr: {{ .expr }}
{{ range .series -}}
Series: {{ .Labels }}
* Last Timestamp: {{ .LastTimestamp.UTC.Format "2006-01-02T15:04:05Z07:00" }}
* Last Value: {{ .LastValue }}
{{ end -}}
```

Becomes this result:

[Copy code to clipboard] Copy

```none
I found something interesting!
Expr: node_load1{namespace=”machine-learning”, cluster=”dev-us-central-0”}
Series: {foo="bar"}
* Last Timestamp: 1970-01-01T00:00:00Z
* Last Value: 0
Series: {foo="baz"}
* Last Timestamp: 2023-04-06T15:39:27Z
* Last Value: 1
```

## What resources does this analysis use?

- Prometheus datasource

## How does this analysis determine when a result is interesting?

- If at least one series is returned by the query, the check is considered interesting.

## What configurations options are available for this analysis?

### Query

The custom PromQL query expression to run.

### Message template

A Go template string used to format the output of the check.

The template string has access to the following variables:

- `expr`: the input expression string
- `interesting`: a boolean indicating whether this check found any interesting results
- `series`: an array of time series. Each element has three fields:

  - `Labels`, a Prometheus Metric implemented as a map from label name to label value used to identify the series.
  - `LastTimestamp`, the latest timestamp found in the input query.
  - `LastValue`, the latest value found in the input query.
