---
title: "Sift analysis - Recent deployments | Grafana Plugins documentation"
description: "This Sift analysis identifies resources that have recently been changed."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Sift analysis - Recent deployments

Highlights any rollouts of Kubernetes Deployments or StatefulSets during the investigation time range in the specified namespace (and cluster, if provided).

## Inputs

- Required:

  - `namespace` in Prometheus datasource
- Optional:

  - `cluster` in Prometheus datasource

## How it works

### Step 1: Query for Deployments and StatefulSet rollouts

Search for recent rollouts of Deployments and StatefulSets in the specified `namespace` and (optionally) `cluster` using metrics from \[kube-state-metrics].

## What resources does this analysis use?

- Prometheus datasource

## How does this analysis determine when a result is interesting?

If there is at least one rollout of either a Deployment or StatefulSet, this is considered interesting.

## What configurations options are available for this analysis?

This check has no configurable parameters except for the Prometheus datasource.
