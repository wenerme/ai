---
title: "Sift analysis - Error pattern logs | Grafana Plugins documentation"
description: "This Sift analysis reviews error logs and highlights log lines with increased log rates based."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Sift analysis - Error pattern logs

This analysis reviews error logs and highlights log patterns with increased rates in the investigation time range. It can help identify patterns in error logs that may indicate a problem in the system.

## Inputs

- Required:

  - A Loki datasource (*This analysis will attempt to discover this datasource without the need for user input*)
- Optional:

  - None

## How it works

### Step 1: Retrieve error logs

Retrieve error logs from the Loki datasource using the initial query. The query is customizable and can be adjusted to search for specific error log patterns.

### Step 2: Learn the patterns

Identify patterns in the error logs by grouping similar log lines together. The analysis will count the number of occurrences of each pattern. The minimum count can be adjusted to increase or decrease the sensitivity of the analysis.

### Step 3: Highlight interesting patterns

Highlight patterns that have an increased log rate compared to before the investigation time range. The analysis will show the log lines for each pattern found, along with the number of occurrences and the percentage increase.

## What resources does this analysis use?

- Loki datasource - to retrieve logs and calculate log rates

## How does this analysis determine when a result is interesting?

- If at least one pattern has a higher log rate during the investigation time range compared to before, it is considered interesting.

## What configurations options are available for this analysis?

### Maximum examples

The maximum number of example logs to show for each pattern found.

- Default: 3
- Minimum: 1
- Maximum: 10

### Minimum count

The minimum number of log occurrences before a pattern is considered interesting. Decreasing this number will increase the sensitivity of the check, with more patterns being considered interesting. Increasing will have the opposite effect, with fewer patterns appearing in the results.

- Default: 5
- Minimum: 1
- Maximum: 10

### Initial Query

The query used to find error logs. This could be customized to only search for HTTP error logs, for example.

- Default: `!~ "debug|DEBUG|info|INFO" |~ "error|ERROR"`
