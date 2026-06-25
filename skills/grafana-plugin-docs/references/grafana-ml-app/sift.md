---
title: "Sift investigations | Grafana Plugins documentation"
description: "Run Sift investigations to learn interesting things"
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Sift investigations

Sift is a powerful, free diagnostic assistant included in Grafana Cloud designed to perform investigations on your infrastructure telemetry. When you run a Sift investigations, Sift will run a number of checks and curate a rich list of “interesting results” which includes a over a dozen points of investigative summaries.

With Sift, you can reduce your time to action for investigations and quickly identify critical details during incidents. By employing a series of individual checks, Sift examines specific aspects of your infrastructure during investigations, groups the analyses together, and provides insights and links across Grafana to add a new foundational level of clarity and linearity to your investigative processes.

## Explore Sift

- [**Sift investigations**](sift/): Learn more about how Sift work in Grafana Cloud.
- [**Configure Sift**](sift-config/): Configure your Sift investigation analysis settings.
- [**Sift panel**](sift-panel/): Find out more about the Sift panel and how to show results directly on your dashboards.
- [**Sift analyses**](analyses/): Read more about the configurable analyses in Sift.

## RBAC permissions

Sift can also be managed using RBAC similar to Dynamic Alerting. See the [Dynamic Alerting RBAC page](/docs/grafana-cloud/alerting-and-irm/machine-learning/dynamic-alerting/rbac/) for how to configure RBAC.

The Sift specific RBAC roles are:

- **Sift Editors**:

  - Start investigations
  - Edit configurations
- **Sift Viewers**:

  - View investigations
