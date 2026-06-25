---
title: "Sift analysis - Log query | Grafana Plugins documentation"
description: "This Sift analysis shows results from a configurable LogQL query run against a Loki instance."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Sift analysis - Log query

This analysis runs a custom Loki query configured by the user and uses the result to populate a configurable template.

## Inputs

- Required:

  - none
- Optional:

  - Custom filters

## How it works

### Step 1: Process query

Interpolates the user’s query using the investigation labels:

- `{namespace=”$namespace”, cluster=”$cluster”} |= “error in database”` becomes `{namespace=”machine-learning”, cluster=”dev-us-central-0”} |= “error in database”`

### Step 2: Execute query

Executes the query against the discovered Loki datasource.

### Step 3: Process results

Interpolates the template message using the result of the query.

For example, this template

[Copy code to clipboard] Copy

```none
I found something interesting!
Expr: {{ .expr }}
Matching streams:
{{ range .streams -}}
- Labels: {{ .Labels }}
  Logs:
{{- range .Entries }}
    {{ .Timestamp }} - {{ .Line }}
{{- end }}
{{ end -}}
```

becomes this result

[Copy code to clipboard] Copy

```none
I found something interesting!
Expr: {cluster="dev-us-central-0", namespace="machine-learning"} |= "error in database"
Matching streams:
- Labels: {cluster="dev-us-central-0", namespace="machine-learning", pod="some-pod"}
  Logs:
    2023-01-01 00:00:00 +0000 UTC - message 0
    2023-01-01 00:00:01 +0000 UTC - message 1
    2023-01-01 00:00:02 +0000 UTC - message 2
- Labels: {cluster="dev-us-central-0", namespace="machine-learning", pod="some-other-pod"}
  Logs:
    2023-01-01 00:00:00 +0000 UTC - message 0
    2023-01-01 00:00:01 +0000 UTC - message 1
    2023-01-01 00:00:02 +0000 UTC - message 2
```

## What resources does this analysis use?

- Loki datasource

## How does this analysis determine when a result is interesting?

- If at least one log stream is returned by the query, the check is considered interesting.

## What configurations options are available for this analysis?

### Query

The custom LogQL query expression to run.

### Message template

A Go template string used to format the output of the check.

The template string has access to the following variables:

- `expr`: the input expression string
- `interesting`: a boolean indicating whether this check found any interesting results
- `streams`: an array of log streams. Each element has two fields:

  - `Labels`, a map from label name to label value identifying the stream
  - `Entries`, an array of log entries. Each element has two fields:

    - `Timestamp`, the timestamp of the log entry.
    - `Line`, the log line itself.

#### Max log lines

The maximum log lines to include for each stream in the output.

- Default: 5
- Minimum: 1
