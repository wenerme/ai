---
title: "Azure DevOps annotations | Grafana Enterprise Plugins documentation"
description: "Use annotations with the Azure DevOps data source to overlay build, release, and deployment events on Grafana dashboard panels."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Azure DevOps annotations

The Azure DevOps data source supports annotations through Grafana’s built-in annotation system. You can use any Azure DevOps query type as an annotation source to overlay events such as builds, releases, or deployments on your dashboard panels.

## Before you begin

- [Configure the Azure DevOps data source](/docs/plugins/grafana-azuredevops-datasource/latest/configure/).
- Understand [Grafana annotations](/docs/grafana/latest/dashboards/build-dashboards/annotate-visualizations/).

## Add an annotation query

To add an Azure DevOps annotation to a dashboard:

1. Navigate to **Dashboard settings** &gt; **Annotations**.
2. Click **Add annotation query**.
3. Select the **Azure DevOps** data source.
4. Select a query type and configure filters as needed. Refer to the [query editor documentation](/docs/plugins/grafana-azuredevops-datasource/latest/query-editor/) for available query types and fields.

## Use cases

The following examples show common ways to use annotations with the Azure DevOps data source.

### Mark builds on a time series

Overlay build events on performance or error-rate dashboards to correlate code changes with metric changes:

1. Add an annotation query using the **Builds** query type.
2. Select your project from the **Project** drop-down.
3. Set **Result** to `succeeded` or leave empty to show all results.

Each build appears as a vertical line on time series panels within the dashboard time range.

### Track deployments

Annotate dashboards with release deployment events to see when new code was deployed:

1. Add an annotation query using the **Release Deployments** query type.
2. Select your project from the **Project** drop-down.
3. Set **Last attempt only** to on to avoid duplicate markers for retried deployments.

### Show release events

Mark when releases are created to correlate with downstream effects:

1. Add an annotation query using the **Releases** query type.
2. Select your project from the **Project** drop-down.
3. Optionally set **sourceBranchFilter** to limit annotations to releases from a specific branch (for example, `refs/heads/main`).

## Next steps

- [Use template variables](/docs/plugins/grafana-azuredevops-datasource/latest/template-variables/) to make annotation queries dynamic.
- [Troubleshoot annotation issues](/docs/plugins/grafana-azuredevops-datasource/latest/troubleshooting/#annotations-dont-appear-on-panels) if annotations don’t appear on your panels.
