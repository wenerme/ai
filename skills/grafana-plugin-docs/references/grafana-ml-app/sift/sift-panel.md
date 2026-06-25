---
title: "Sift panel | Grafana Plugins documentation"
description: "Show Sift results on your dashboard"
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Sift panel

The Sift panel can be used to show Sift investigations and results directly on your dashboards.

To get started, add a new panel to your dashboard and select **Sift** from the panel type selector in the top right. You don’t need to add a query.

From the panel editor you can select what to display in the panel: investigations or analysis results.

## Investigations

The **Investigations** display mode lists investigations run during the dashboard’s current time range.

Each investigation is displayed as a row along with its creation time and labels. An icon to the left indicates whether the investigation found interesting results.

## Analysis Results

The **Analysis Results** display mode lists the individual analyses of investigations run during the dashboard’s current time range.

Each analysis is displayed as a row along with the name of the investigation and any labels associated with the investigation. An icon to the left indicates whether the investigation found interesting results.

In this mode you have two further options:

- **Checks**: Filter the results to only specific checks.
- **Only interesting checks**: Filter the results to only show analyses with interesting results.

## Labels

Both modes allow you to add labels which can be used to filter the list of investigations or analyses. The labels are combined using ‘AND’ logic.

For example, if you only wished to show investigations where the labels matched `cluster="prod"` *and* `namespace="default"` you could add two label filters.

### Template variables

The values of these labels can also refer to template variables. The values of any multi-valued template variables are combined using ‘OR’ logic.

For example, you may have a template variable named `cluster` with selected options `dev` and `prod`, and a template variable named `namespace` with selected options `default` and `app`.

In this case you could add two label filters to the panel: one with name `cluster` and value `$cluster` and one with name `namespace` and value `$namespace`. The panel would then show all investigations matching both:

- `cluster="dev"` OR `cluster="prod"`; AND
- `namespace="default"` OR `namespace="app"`

Template variables with ‘All’ values are also supported.
