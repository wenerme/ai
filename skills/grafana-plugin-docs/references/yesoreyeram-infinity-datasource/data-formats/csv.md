---
title: "CSV | Grafana Plugins documentation"
description: "Query CSV files and endpoints with the Infinity data source"
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# CSV

Select **CSV** as the query type to retrieve data from CSV files or endpoints. You can query data from a URL or provide inline CSV data.

> Tip
>
> For a quick start, refer to [How to Visualize CSV Data with Grafana](/blog/how-to-visualize-csv-data-with-grafana/) or the [Visualize CSV data using the Infinity data source](/docs/learning-journeys/infinity-csv/) learning journey.

Give it a try using Grafana Play

With Grafana Play, you can explore and see how it works, learning from practical examples to accelerate your development. This feature can be seen on [Infinity plugin CSV demo](https://play.grafana.org/d/infinity-csv).

[Try it](https://play.grafana.org/d/infinity-csv)

## Query a CSV URL

Enter the CSV URL in the query editor. By default, CSV data should have column headers in the first row and use comma delimiters.

**Example URL**: `https://thingspeak.com/channels/38629/feed.csv`

**Sample data**:

csv [Copy code to clipboard] Copy

```csv
created_at,entry_id,field1,field2
2021-02-18 21:46:23 UTC,10458189,6.000000,12.000000
2021-02-18 21:46:39 UTC,10458190,0.000000,36.000000
2021-02-18 21:46:55 UTC,10458191,0.000000,49.000000
```

## Define columns

By default, all columns are returned as strings. To properly format your data, define columns with their types:

Expand table

| Property     | Description                                       |
|--------------|---------------------------------------------------|
| **Title**    | Display name for the column.                      |
| **Selector** | Column name in the CSV file (case-sensitive).     |
| **Format**   | Data type: String, Number, Timestamp, or Boolean. |

For time series visualizations, you need at least one time column and one or more numeric columns.

## Query data without a time field

For data without timestamps, set the **Format** to **Timeseries** to add a simulated time field. This allows visualization in panels like Bar Gauge, Stats, and Gauge.

**Example data**:

csv [Copy code to clipboard] Copy

```csv
Country,Population
India,3000
China,3500
UK,1200
USA,2000
Germany,700
```

## Use inline CSV data

Instead of querying a URL, you can provide CSV data directly:

1. Set **Source** to **Inline**.
2. Enter your CSV data in the data field.
3. Define columns to specify types.

**Example inline data**:

csv [Copy code to clipboard] Copy

```csv
country,population,capital
india,200,mumbai
china,500,beijing
usa,200,washington
canada,100,ottawa
```

## CSV options

Configure parsing behavior for non-standard CSV files:

Expand table

| Option                    | Description                                                         |
|---------------------------|---------------------------------------------------------------------|
| **Delimiter**             | Character that separates values. Use `\t` for tab-delimited files.  |
| **Headers**               | Comma-separated list of column names if the file has no header row. |
| **Skip empty lines**      | Ignore blank lines in the data.                                     |
| **Skip lines with error** | Ignore lines that cannot be parsed.                                 |
| **Relax column count**    | Allow rows with varying numbers of columns.                         |
| **Comment**               | Character that marks the start of a comment (for example, `#`).     |

## CSV without headers

If your CSV file doesn’t include a header row, specify column names in the **Headers** option as a comma-separated list.

## TSV and custom delimiters

For tab-separated files, either:

- Set the **Delimiter** to `\t` in CSV options, or
- Select **TSV** as the query type

## Time series field combinations

The Infinity data source automatically handles various field combinations for time series visualization:

Expand table

| Fields present            | Result                                  |
|---------------------------|-----------------------------------------|
| Time + one metric         | Single time series                      |
| Time + string + metric    | Multiple series grouped by string field |
| Time + multiple metrics   | Multiple time series                    |
| String + number (no time) | Categorical data with simulated time    |

## Advanced transformations

For advanced operations like grouping, ordering, and field manipulation, use the [UQL parser](/docs/plugins/yesoreyeram-infinity-datasource/latest/query/uql/):

SQL [Copy code to clipboard] Copy

```sql
parse-csv
| order by "field" asc
```
