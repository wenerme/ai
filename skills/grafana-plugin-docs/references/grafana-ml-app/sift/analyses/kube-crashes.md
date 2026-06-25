---
title: "Sift analysis - Kube crashes | Grafana Plugins documentation"
description: "This Sift analysis provides information around the cause of recent container crashes."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Sift analysis - Kube crashes

This analysis finds pods in the specified namespace (and optionally cluster) that have crashed during the investigation time range, either due to an application error or an OOMKill.

## Inputs

- Required:

  - `namespace` in Prometheus datasource, and
  - `namespace` in Loki datasource
- Optional:

  - `cluster` (to narrow down the scope to a single cluster)

## How it works

### Step 1: Find crashing pods and their workloads

Find crashing containers and their associated workloads in the specified `namespace` and (optionally) `cluster` using metrics from [kube-state-metrics](https://github.com/kubernetes/kube-state-metrics).

### Step 2: Sorts results

We split the crashes into two groups, those caused by OOMKills and those caused by crashes (using the `reason` label).

### Step 3: Define events

We create an event for each crash.

### Step 4: Locate reasons for crashes

We find the reason for each crash by interpolating the following query template with a filter for namespace/cluster/pod and searching the discovered Loki datasource for logs:

[Copy code to clipboard] Copy

```none
%s |~`(?i)(panic:|traceback |error:|fatal)` !~`(?i)(info|debug)`
```

*This step is currently optional, and does not always run for every analysis.*

## What resources does this analysis use?

- Prometheus datasource - Range query
- Loki datasource - Logs range query

## How does this analysis determine when a result is interesting?

- The results are interesting if we locate one or more crashes.

## What configurations options are available for this analysis?

This check has no configurable parameters except for the Prometheus and Loki datasources.
