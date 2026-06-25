---
title: "Sift analyses | Grafana Plugins documentation"
description: "Learn more about the Sift checks you can run during investigations."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Sift analyses

Sift offers a range of checks to analyze your system’s telemetry during investigations. These checks include:

- [**Error Pattern Logs**](error-pattern-logs/): Analyzes error logs and identifies groups of similar log lines, highlighting groups with significantly increased log rates based on shared patterns.
- [**HTTP Error Series**](http-error-series/): Checks for series exhibiting elevated HTTP errors within a specified cluster and namespace.
- [**Kube Crashes**](kube-crashes/): Detects recent container crashes by analyzing Kubernetes metrics and provides information on the cause of the crash (Error, OOMKill).
- [**Log Query**](log-query/): Executes a configurable LogQL query against a Loki instance and shows the results in a configurable format. Useful for recurrent queries that you want to run during investigations.
- [**Metric Query**](metric-query/): Executes a configurable PromQL query against a Prometheus instance and shows the results in a configurable format. Useful for recurrent queries that you want to run during investigations.
- [**Noisy Neighbors**](noisy-neighbors/): Identifies over-saturated hosts where load exceeds CPU core count, leading to high latency, and examines pods on those hosts for deeper insights into the underlying issues.
- [**Recent Deployments**](recent-deployments/): Identifies resources that recently underwent changes in Kubernetes, such as service updates or configuration modifications.
- [**Resource Contention**](resource-contentions/): Focuses on containers with significant CPU throttling due to reaching CPU limits, or significant packet loss due to networking issues. Unlike noisy neighbors, CPU throttling is caused by the container itself and not by other processes on the underlying infrastructure.
