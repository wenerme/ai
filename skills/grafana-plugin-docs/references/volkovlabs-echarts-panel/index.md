---
title: "Business Charts | Grafana Plugins documentation"
description: "Learn how to integrate charts and graphs from the Apache ECharts library into your Grafana dashboard using the Business Charts panel."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Business Charts

The Business Charts panel lets you integrate charts and graphs created by the [Apache ECharts library](https://echarts.apache.org/en/index.html) into your Grafana dashboard.

Apache ECharts is a versatile data visualization library. It provides a wide range of chart types, including statistical capabilities. It is written in pure JavaScript and based on [zrender](http://ecomfe.github.io/zrender/), a lightweight graphic library for chart rendering.

The Business Charts plugin lets you add interactive and customizable charts to your Grafana dashboard.

## Requirements

- Business Charts panel 7.X requires **Grafana 11** or **Grafana 12**.
- Business Charts panel 6.X requires **Grafana 10** or **Grafana 11**.
- Apache ECharts panel 5.X requires **Grafana 9** or **Grafana 10**.
- Apache ECharts panel 3.X and 4.X require **Grafana 8.5** or **Grafana 9**.

## Getting started

Install the Business Charts panel from the [Grafana Plugins catalog](/grafana/plugins/volkovlabs-echarts-panel/) or use the Grafana command line tool.

To install using the command line, run:

sh [Copy code to clipboard] Copy

```sh
grafana cli plugins install volkovlabs-echarts-panel
```

## Highlights

- Provides an in-panel code editor for:

  - Working with Grafana data frames (JavaScript).
  - Updating chart configurations in the JSON format.
  - Customizing theme configurations.
- Supports Code Editor suggestions for parameters and variables.
- Supports SVG and Canvas renderers.
- Supports variables and [locationService](/docs/grafana/latest/developers/plugins/create-a-grafana-plugin/extend-a-plugin/add-support-for-variables/#set-a-variable-from-your-plugin) to make charts interactive.
- Includes USA and World GeoJSON maps. Additional maps can be loaded dynamically.
- Supports Baidu, Gaode, and Google Maps using API with required provision of the access key.
- Includes [ECharts-GL](https://github.com/ecomfe/echarts-gl) proving 3D plots, globe visualization, and WebGL acceleration.
- Includes [ecStat](https://github.com/ecomfe/echarts-stat), a statistical and data mining tool.
- Includes [Liquid Fill Chart](https://github.com/ecomfe/echarts-liquidfill) to represent data in percentage.
- Supports real-time data updates using streaming data sources and Grafana Live.
- Supports light and dark themes adjusted to the Grafana theme.
- Based on [Apache ECharts 5.5.1](https://github.com/apache/echarts/releases/tag/5.5.1).
- Provides 100+ ready-to-use examples at [echarts.volkovlabs.io](https://echarts.volkovlabs.io).
- Supports the [Wordcloud extension](https://github.com/ecomfe/echarts-wordcloud).

[](/media/docs/grafana/panels-visualizations/business-charts/business-charts.gif)

## Documentation

Expand table

| Section                                                                           | Description                                                              |
|-----------------------------------------------------------------------------------|--------------------------------------------------------------------------|
| [Charts function](/docs/plugins/volkovlabs-echarts-panel/latest/charts-function/) | Explains how to configure the main Apache ECharts library function.      |
| [Visual editor](/docs/plugins/volkovlabs-echarts-panel/latest/visual-editor/)     | Explains how to work with the Visual Editor.                             |
| [Examples](/docs/plugins/volkovlabs-echarts-panel/latest/examples/)               | Explains how to get started with the Apache ECharts Examples in Grafana. |
| [Features](/docs/plugins/volkovlabs-echarts-panel/latest/features/)               | Demonstrates the Business Charts panel features.                         |
| [Maps](/docs/plugins/volkovlabs-echarts-panel/latest/maps/)                       | Demonstrates how to work with different maps.                            |
| [Release notes](/docs/plugins/volkovlabs-echarts-panel/latest/release/)           | Stay up to date with the latest features and updates.                    |

## Acknowledgment

The Apache Software Foundation Apache ECharts, ECharts, Apache, the Apache feather, and the Apache ECharts project logo are either registered trademarks or trademarks of the Apache Software Foundation.

## License

Apache License Version 2.0, see [LICENSE](https://github.com/grafana/business-charts/blob/main/LICENSE).
