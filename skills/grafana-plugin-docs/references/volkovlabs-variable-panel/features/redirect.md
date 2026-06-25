---
title: "Redirect dashboards | Grafana Plugins documentation"
description: "Learn how to configure dashboard redirects that open corresponding dashboards based on variable value selections."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Redirect dashboards

> Note
>
> Variable panel supports redirects since version 2.2.0.

This feature lets you open a corresponding dashboard when you select a variable value. This is useful when a variable panel displays a list of devices and each device requires a specific dashboard.

When you select a device in the Business Variable panel, the corresponding dashboard opens. The dashboard switch is seamless, so users might not realize they switched dashboards.

## Map dashboard variables

Create two dashboard variables:

- One to retrieve all devices.
- Another to hold one `dashboard_id` at a time following the device from the first variable.

[](/media/docs/grafana/panels-visualizations/business-variable/vars.png)

## Dashboards

Create device-specific dashboards with an identical variable panel on each dashboard.

[](/media/docs/grafana/panels-visualizations/business-variable/switch-dash.png)

## Variable panel

In the Business Variable panel options, specify a value for **Dashboard &gt; Select variable with dashboard UID**.

[](/media/docs/grafana/panels-visualizations/business-variable/var-conf.png)

After this configuration, the Business Variable panel switches dashboards when you select a device. A smooth transition provides a seamless user experience.
