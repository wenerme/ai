---
title: "JSON | Grafana Plugins documentation"
description: "Query JSON APIs and files with the Infinity data source"
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# JSON

Select **JSON** as the query type to retrieve data from JSON APIs or files. You can query data from a URL or provide inline JSON data.

> Tip
>
> For a guided introduction, check out the [Visualize JSON data using the Infinity data source](/docs/learning-journeys/infinity-json/) learning journey.

Give it a try using Grafana Play

With Grafana Play, you can explore and see how it works, learning from practical examples to accelerate your development. This feature can be seen on [Infinity plugin JSON demo](https://play.grafana.org/d/infinity-json).

[Try it](https://play.grafana.org/d/infinity-json)

## Query a public JSON API

To fetch data from a publicly accessible JSON API endpoint, enter the URL in the query editor.

**Example URL**: `https://jsonplaceholder.typicode.com/users`

When the API returns an array at the root level, no additional configuration is required. The plugin automatically detects the fields.

## Access nested properties

When your data is nested within a property, use the **Root selector** field to specify the path to the data array.

**Example URL**: `https://thingspeak.com/channels/38629/feed.json`

If the data is in the `feeds` property, set the root selector based on your parser:

Expand table

| Parser  | Root selector                  |
|---------|--------------------------------|
| JSONata | `$.feeds`                      |
| JQ      | `.feeds`                       |
| UQL     | `parse-json | project "feeds"` |

Then add columns to define the fields and their types.

## Query data without a time field

For data without timestamps, set the **Format** to **Timeseries** to add a simulated time field. This allows visualization in time-based panels.

**Example data**:

JSON [Copy code to clipboard] Copy

```json
[
  { "country": "india", "population": 300 },
  { "country": "usa", "population": 200 },
  { "country": "uk", "population": 150 },
  { "country": "china", "population": 400 }
]
```

## Use inline JSON data

Instead of querying a URL, you can provide JSON data directly in the query editor:

1. Set **Source** to **Inline**.
2. Enter your JSON data in the data field.
3. Define columns to specify which fields to display.

**Example inline data**:

JSON [Copy code to clipboard] Copy

```json
[
  { "country": "india", "population": 420 },
  { "country": "usa", "population": 200 },
  { "country": "uk", "population": 150 },
  { "country": "china", "population": 400 }
]
```

## Use JSONata in the root selector

The root selector supports JSONata syntax for complex data extraction. Any selector starting with `$` is treated as a JSONata expression.

**Example data**:

JSON [Copy code to clipboard] Copy

```json
{
  "customers": [
    { "name": "mary", "age": 22, "gender": "female" },
    { "name": "joseph", "age": 41, "gender": "male" }
  ],
  "premium_customers": [
    { "name": "john doe", "age": 21, "gender": "male" }
  ]
}
```

Expand table

| Root selector         | Result                                  |
|-----------------------|-----------------------------------------|
| `$.premium_customers` | Returns only `john doe`                 |
| `$.*`                 | Returns all three rows from both arrays |

## Parser options

The Infinity data source offers multiple parsers for JSON data:

### UQL parser

Use the [UQL parser](/docs/plugins/yesoreyeram-infinity-datasource/latest/query/uql/) for advanced operations like grouping, ordering, and field manipulation.

**Example UQL query**:

SQL [Copy code to clipboard] Copy

```sql
parse-json
| scope "feeds"
| project "ts"=todatetime("created_at"), "Density"=tonumber("field1")
```

### JSONata parser

Use the **JSONata** parser when you need:

- Alerting support
- Recorded queries
- Server-side processing
- Complex data transformations using [JSONata syntax](https://jsonata.org/)

For more information, refer to [JSONata parser](/docs/plugins/yesoreyeram-infinity-datasource/latest/query/backend/).

### JQ parser

Use the **JQ** parser when you need:

- Alerting support
- Recorded queries
- Server-side processing
- Data transformations using [JQ syntax](https://jqlang.github.io/jq/manual/)

For more information, refer to [JQ parser](/docs/plugins/yesoreyeram-infinity-datasource/latest/query/jq-backend/).

When using JSONata or JQ parsers:

- Timestamp fields must use ISO 8601 format (for example, `2006-01-02T15:04:05Z07:00`) or specify a custom layout using [Go time format](https://www.geeksforgeeks.org/time-formatting-in-golang/).
- Use the **Summarize** field to aggregate numeric values with functions like `sum`, `min`, `max`, `mean`, `first`, and `last`.

**Example summarize expression**: `last(density_of_eastbound_cars) - last(density_of_westbound_cars)`
