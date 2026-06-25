---
title: "MQTT template variables | Grafana Plugins documentation"
description: "Use Grafana template variables to create dynamic MQTT topic subscriptions."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# MQTT template variables

Use template variables to create dynamic dashboards where the MQTT topic changes based on user selections. Instead of hard-coding topic paths, you can use variables to let users switch between devices, rooms, or sensors from a drop-down at the top of the dashboard.

For general information about template variables in Grafana, refer to [Templates and variables](/docs/grafana/latest/dashboards/variables/).

## Before you begin

- Ensure you have [configured the MQTT data source](/docs/plugins/grafana-mqtt-datasource/latest/configure/).
- Familiarize yourself with [Grafana variable types](/docs/grafana/latest/dashboards/variables/add-template-variables/).

## Supported variable types

The MQTT data source doesn’t provide a variable query handler, so query-based variables aren’t available. You can use the following variable types to build dynamic topics.

Expand table

| Variable type | Supported | Use case                                                                 |
|---------------|-----------|--------------------------------------------------------------------------|
| **Custom**    | Yes       | Define a fixed list of values (for example, room names or device IDs).   |
| **Text box**  | Yes       | Let users type a free-form value.                                        |
| **Constant**  | Yes       | Set a hidden, fixed value (for example, a base topic prefix).            |
| **Query**     | No        | Not supported. The data source doesn’t expose a variable query endpoint. |

## Use variables in the topic field

Reference variables in the **Topic** field of the query editor using `$variable` or `${variable}` syntax. Grafana replaces the variable with its current value before subscribing to the topic.

For example, if you create a **Custom** variable named `room` with the values `bedroom`, `kitchen`, and `living_room`, you can set the topic to:

[Copy code to clipboard] Copy

```none
home/$room/temperature
```

When a user selects `kitchen` from the drop-down, the plugin subscribes to `home/kitchen/temperature`.

## Create a variable for MQTT topics

To create a variable that controls which topic the panel subscribes to:

1. Open the dashboard and click **Dashboard settings** (gear icon).
2. Click **Variables** in the left menu.
3. Click **Add variable**.
4. Set **Variable type** to **Custom**.
5. Enter a **Name** (for example, `device`).
6. In **Custom options**, enter a comma-separated list of values (for example, `sensor-01, sensor-02, sensor-03`).
7. Click **Apply**.
8. In your panel’s query editor, use the variable in the **Topic** field (for example, `factory/$device/metrics`).

## Combine multiple variables

You can use more than one variable in a single topic to build fully dynamic paths. For example, with variables `location` and `metric`:

[Copy code to clipboard] Copy

```none
sites/${location}/sensors/${metric}
```

This lets users independently select both the location and the metric type from separate drop-downs.
