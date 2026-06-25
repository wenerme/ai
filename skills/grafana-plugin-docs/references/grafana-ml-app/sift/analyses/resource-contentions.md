---
title: "Sift analysis - Resource contention | Grafana Plugins documentation"
description: "This Sift analysis inspects containers for CPU throttling or network packet loss."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Sift analysis - Resource contention

The resource contention analysis reviews resource metrics to determine if any pod in the scope of the investigation is running into resource constraints.

## Inputs

- Required:

  - `cluster`
  - `namespace`

## How it works

### Step 1: Find pods with high CPU throttling

Query cAdvisor metrics from Prometheus for any pods are throttled for more than 25% of [cfs](https://en.wikipedia.org/wiki/Completely_Fair_Scheduler) periods.

[Copy code to clipboard] Copy

```none
sum by (cluster, namespace, pod, container) (
  rate(container_cpu_cfs_throttled_periods_total{cluster="<cluster>", namespace="<namespace>"}[5m])
) /
sum by (cluster, namespace, pod, container) (
  rate(container_cpu_cfs_periods_total{cluster="<cluster>", namespace="<namespace>"}[5m])
) > 0.25
```

### Step 2: Check for profiling data

Look in Pyroscope to see if there are profiles that can be linked for any pods with high CPU throttling.

## What resources does this analysis use?

- Prometheus datasource

## How does this analysis determine when a result is interesting?

- If any pods in the scope have a high level of CPU throttling.

## What configurations options are available for this analysis?

- This check has no configurable parameters except for the Prometheus datasource.
