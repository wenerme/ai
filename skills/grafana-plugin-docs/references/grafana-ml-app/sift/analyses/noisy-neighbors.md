---
title: "Sift analysis - Noisy neighbors | Grafana Plugins documentation"
description: "This Sift analysis provides insights into over-saturated hosts where load exceeeds CPU core count."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Sift analysis - Noisy neighbors

The noisy neighbors analysis identifies pods in the scope of the investigation that are running on nodes with high [load](https://man7.org/linux/man-pages/man3/getloadavg.3.html). High load means that processes are waiting to be ran which can lead to performance degradation in the application. If any pods are identified, then the check will also try to identify if any other pods are using more CPU than requested.

## Inputs

- Required:

  - `cluster`
  - `namespace`

## How it works

### Step 1: Find pods running on high load nodes

Query Prometheus for all pods in the given namespace that are scheduled on nodes with a higher core normalized load than the load threshold configuration.

### Step 2: Find pods using more CPU than requested on high load nodes

Query Prometheus for any pods that are using more CPU than configured in their requests.

## What resources does this analysis use?

- Prometheus datasource

## How does this analysis determine when a result is interesting?

- If any pods in the input namespace are scheduled on a high load node.

## What configurations options are available for this analysis?

### Load threshold

The threshold above which nodes will be considered to have ‘high load’.

- Default: 100%
- Minimum: 30%
- Maximum: 100%

### Usage quantile

The quantile used to determine if a pod is using too much of a specific resource.

- Default: 0.8
- Minimum: 0.5
- Maximum: 0.99
