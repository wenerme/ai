---
aliases:
  - ../../../variables/inspect-variable/ # /docs/grafana/next/variables/inspect-variable/
  - ../../../variables/manage-variable/ # /docs/grafana/next/variables/manage-variable/
  - ../../../dashboards/variables/inspect-variable/ # /docs/grafana/next/dashboards/variables/inspect-variable/
keywords:
  - grafana
  - templating
  - documentation
  - guide
  - template
  - variable
labels:
  products:
    - cloud
    - enterprise
    - oss
title: Manage and inspect variables
menuTitle: Inspect variables
description: Manage dashboard variables by moving, cloning, and deleting them, and inspect variable dependencies in the dashboard variables list.
weight: 500
---

# Manage and inspect variables

In the **Variables** tab, you can [add](https://grafana.com/docs/grafana/<GRAFANA_VERSION>/visualizations/dashboards/variables/add-template-variables/) variables and [manage](#manage-variables) existing variables. You can also [inspect](#inspect-variables) variables to identify any dependencies between them.

## Manage variables

You can take the following actions in the **Variables** tab:

- **Move**: Move a variable up or down the list using drag and drop.
- **Clone**: Clone a variable by clicking the clone icon in the set of icons on the right. This creates a copy of the variable with the name of the original variable prefixed with `copy_of_`.
- **Delete**: Delete a variable by clicking the trash icon in the set of icons on the right.

## Inspect variables

In addition to [managing variables](#manage-variables), the **Variables** tab lets you quickly identify whether variables have any dependencies. To check, click **Show dependencies** at the bottom of the list, which opens the dependencies diagram:

[Dependency map showing relationships between dashboard variables]
