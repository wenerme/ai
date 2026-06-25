---
title: "Visual editor | Grafana Plugins documentation"
description: "Learn how to use the Visual editor to simplify working with Grafana data frames to create charts."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Visual editor

The Visual editor simplifies working with Grafana data frames and makes it easy to send data to the [Charts function](/docs/plugins/volkovlabs-echarts-panel/latest/charts-function/).

The Visual Editor helps you work with datasets, but you still need the Charts function for advanced use cases.

This feature is in beta. It works for all charts enabled in the **Type** drop-down list.

[](/media/docs/grafana/panels-visualizations/business-charts/type-location.png)

*In development* means that this type is coming soon. All other types are available for selection.

If your use case requires complex logic, use the **Code** mode.

[](/media/docs/grafana/panels-visualizations/business-charts/vis-editor.png)

## Types

Below is a more detailed description of how the **Visual Editor** can be used for a particular series type.

Expand table

| Chart Type            | Description                                        |
|-----------------------|----------------------------------------------------|
| [Line](#line)         | Provides examples for the **Line** chart type.     |
| [Bar](#bar)           | Provides examples for the **Bar** chart type.      |
| [Radar](#radar)       | Provides examples for the **Radar** chart type.    |
| [Sunburst](#sunburst) | Provides examples for the **Sunburst** chart type. |
| [Boxplot](#boxplot)   | Provides examples for the **Boxplot** chart type.  |
| [Scatter](#scatter)   | Provides examples for the **Scatter** chart type.  |

## Line

[](/media/docs/grafana/panels-visualizations/business-charts/line-basic.png)

1. Required data frame. You need to have at least two columns of data. At least one column should be numerical.

   Expand table

   | Value | Day |
   |-------|-----|
   | 120   | 1   |
   | 130   | 2   |
   | 10    | 3   |
   | 80    | 4   |
   | 90    | 5   |
2. Datasets. Create at least two datasets. Add at least two columns of data from your data frame into the Charts function input.
3. Chart Type. Set it to the **Line**.
4. Chart Type specific options. Ensure to specify **Encode Y** (values to be located on the vertical axis) and **Encode X** (values to be located on the horizontal axis).
5. Charts Function.

JavaScript [Copy code to clipboard] Copy

```javascript
return {
  dataset: context.editor.dataset,
  series: context.editor.series,
  xAxis: {
    type: "category",
  },
  yAxis: {
    type: "value",
  },
};
```

## Bar

[](/media/docs/grafana/panels-visualizations/business-charts/bar-basic.png)

1. Required data frame. You need to have at least two columns of data. At least one column should be numerical.

   Expand table

   | Value | Day |
   |-------|-----|
   | Mon   | 120 |
   | Tue   | 52  |
   | Wed   | 200 |
   | Thu   | 334 |
   | Fri   | 390 |
   | Sat   | 330 |
   | Sun   | 220 |
2. Datasets. Create at least two datasets. Add at least two columns of data from your data frame into the Charts function input.
3. Chart Type. Set it to the **Bar**.
4. Chart Type specific options. For the **Bar** type, the only required option is **ID**.
5. Charts Function.

JavaScript [Copy code to clipboard] Copy

```javascript
return {
  dataset: context.editor.dataset,
  series: context.editor.series,
  xAxis: {
    type: "category",
  },
  yAxis: {
    type: "value",
  },
};
```

## Radar

A radar chart, also known as a spider chart, shows multivariate data stacked at an axis with the same central point. The chart usually displays two or more quantitative variables for comparison.

Here, we compare the allocated and actual budgets in six categories (company departments).

[](/media/docs/grafana/panels-visualizations/business-charts/radar-basic.png)

1. Required data frame. You need to have at least two columns of data. At least one column should be numerical. In this example, there are two numerical columns.

   Expand table

   | Indicator names (Department) | Allocated Budget | Actual Spending |
   |------------------------------|------------------|-----------------|
   | Sales                        | 4200             | 5000            |
   | Administration               | 3000             | 14000           |
   | Information Technology       | 20000            | 28000           |
   | Customer Support             | 35000            | 26000           |
   | Development                  | 50000            | 42000           |
   | Marketing                    | 18000            | 21000           |
2. Datasets. Add numerical columns into your datasets.
3. Chart Type. Set it to the **Radar**.
4. Chart Type specific options. For the **Radar** type, specify dimensions where one dimension is one data series. In this example, there are two dimensions. One is for the allocated budget, and the other is for the actual spending.
5. Charts Function.

JavaScript [Copy code to clipboard] Copy

```javascript
return {
  legend: {
    data: ["Allocated Budget", "Actual Spending"],
  },
  radar: context.editor.radar,
  series: context.editor.series,
};
```

### Supported options

- **Shape**. It could be **Circle** or **Polygon**.
- **Radius**. The size of the radar in pixels.
- **Indicator**. It is a data frame column containing the radar category names (in this example, they are department names).

## Sunburst

A sunburst chart is a circular diagram displaying pieces of a whole on multiple levels. It indicates the parts’ contribution to the whole, and each part can be further divided into smaller pieces.

Data for the sunburst chart should include levels. These levels represent the hierarchical structure of the data. The top level typically represents the set of main categories, and each further level decomposes the previous one, providing a more detailed view of the data.

[](/media/docs/grafana/panels-visualizations/business-charts/sunburst-basic.png)

1. Required data frame. For a meaningful sunburst, you need at least two levels(two columns) of data.

   Expand table

   | Level 0 | Level 1    | Level 2       | Level 3 |
   |---------|------------|---------------|---------|
   | Grandpa | Father     | Brother Peter |         |
   | Grandpa | Father     | Me            |         |
   | Grandpa | Uncle Leo  | Cousin Jack   |         |
   | Grandpa | Uncle Leo  | Cousin Ben    |         |
   | Grandpa | Uncle Leo  | Cousin Mary   |         |
   | Grandpa | Uncle Leo  | Cousin Mary   | Jackson |
   | Nancy   | Uncle Nike | Cousin Jenny  |         |
   | Nancy   | Uncle Nike | Cousin Betty  |         |
2. Datasets. Add every level as a separate dataset. In this example, there are four levels; therefore, there are four datasets.
3. Chart Type. Set it to the **Sunburst**.
4. Chart Type specific options. Every column is a level for the **Sunburst**; ensure to rearrange them if needed.
5. Charts Function.

JavaScript [Copy code to clipboard] Copy

```javascript
return {
  radar: context.editor.radar,
  series: context.editor.series,
};
```

### Supported options

- **Inner Radius** and **Outer Radius** is the chart size relative to the panel’s in percentage.
- **Sunburst sort**. The label sorting.
- **Emphasis Focus**. What part of the chart is highlighted when a mouse hovers.
- **Show label**. Show or hide labels.
- **Label rotate**. Choose between two ways of label rotation.

## Boxplot

The boxplot is a chart depicting a variable distribution in a compact way where you can compare it over time or between multiple entities.

[](/media/docs/grafana/panels-visualizations/business-charts/boxplot-basic.png)

1. Required data frame. For each distribution, you provide the minimum, the first quartile (25% mark), the median, the third quartile (75% mark), and maximum values.

   Expand table

   | Category | min | q1 | median | q3 | maximum |
   |----------|-----|----|--------|----|---------|
   | a        | 1   | 2  | 3      | 4  | 5       |
   | b        | 2   | 3  | 4      | 5  | 6       |
   | c        | 3   | 4  | 5      | 6  | 7       |
   | d        | 4   | 5  | 6      | 7  | 8       |
2. Datasets. For the **Boxplot**, you need to add six datasets, where the first dataset should contain the category, then minimum values, first quartile, median, third quartile, and maximum. The order of the datasets is important.
3. Chart Type. Set it to the **Boxplot**.
4. Chart Type specific options. There are no specific options to specify with the latest plugin release.
5. Charts Function.

JavaScript [Copy code to clipboard] Copy

```javascript
return {
  tooltip: {},
  dataset: context.editor.dataset,
  series: context.editor.series,
  xAxis: {
    type: "category",
  },
  yAxis: {
    type: "value",
  },
};
```

## Scatter

The scatter (also known as scatter graph, scatter plot, scattergram) is a chart that uses Cartesian coordinates to depict a value for two variables.

[](/media/docs/grafana/panels-visualizations/business-charts/scatter-basic.png)

1. Required data frame. One data frame should consist of three columns, X and Y coordinates and then a value to display. For instance:

   Expand table

   | Y-axis | X-axis | Size |
   |--------|--------|------|
   | 10     | 8.04   | 20   |
   | 8.07   | 6.95   | 21   |
   | 13.0   | 7.58   | 22   |
   | 9.05   | 8.81   | 23   |
   | 11     | 8.33   | 24   |
2. Datasets. For the **Scatter**, you need to add three datasets.
3. Chart Type. Set it to the **Scatter**.
4. Chart Type specific options. Specify which dataset should play the role of X coordinates, Y coordinates, and the value associated with each (x,y) coordinate.
5. Charts Function.

JavaScript [Copy code to clipboard] Copy

```javascript
return {
  dataset: context.editor.dataset,
  series: context.editor.series,
  grid: {
    bottom: "3%",
    containLabel: true,
    left: "3%",
    right: "4%",
    top: "4%",
  },
  /**
   * Should be add to see tooltip
   */
  tooltip: {},
  xAxis: {
    type: "value",
  },
  yAxis: {
    type: "value",
  },
};
```

## Examples

To get you started faster, there are many examples of how the **Visual Editor** can be used.

Please, check out the [Examples section](/docs/plugins/volkovlabs-echarts-panel/latest/examples/) of the documentation.
