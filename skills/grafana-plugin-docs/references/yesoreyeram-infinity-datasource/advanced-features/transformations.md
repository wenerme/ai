---
title: "Transformations | Grafana Plugins documentation"
description: "Apply server-side data transformations to Infinity query results."
---

> For a curated documentation index, see [llms.txt](/llms.txt). For the complete documentation index, see [llms-full.txt](/llms-full.txt).

# Transformations

Server-side transformations let you manipulate query results before they’re sent to the dashboard. Use transformations to limit rows, filter data, add computed columns, or aggregate results.

## Before you begin

- Ensure you have at least one Infinity query using a backend parser (JSONata or JQ)
- Transformations only work with backend parser queries

## How transformations work

Transformations are applied as a separate query that processes the results of your other Infinity queries. When you add a transformation query:

1. All previous Infinity queries with backend parsers execute first
2. The transformation query processes those results
3. The transformed data is returned to the dashboard

> Note
>
> Transformations only apply to Infinity queries using backend parsers (JSONata or JQ). Frontend parser queries (UQL, GROQ) are not affected.

## Add a transformation

1. In the query editor, click **+ Query** to add a new query.
2. Set **Type** to **Transformations**.
3. Click **Add Transformation** and select the transformation type.
4. Configure the transformation options.

You can add multiple transformations to a single query. They execute in order from top to bottom.

## Available transformations

### Limit

Limits the number of rows returned from each query.

Expand table

| Field     | Description                                    |
|-----------|------------------------------------------------|
| **Limit** | Maximum number of rows to return (default: 10) |

**Example:** Set limit to `5` to return only the first 5 rows from each query.

### Filter expression

Filters results based on a JSONata expression that evaluates to true or false.

Expand table

| Field          | Description                               |
|----------------|-------------------------------------------|
| **Expression** | JSONata expression that returns a boolean |

**Example expressions:**

Expand table

| Expression                  | Description                               |
|-----------------------------|-------------------------------------------|
| `status = 'active'`         | Keep rows where status equals “active”    |
| `price > 100`               | Keep rows where price is greater than 100 |
| `$contains(name, 'server')` | Keep rows where name contains “server”    |
| `age >= 18 and age <= 65`   | Keep rows where age is between 18 and 65  |

### Computed column

Adds a new column based on a JSONata expression.

Expand table

| Field          | Description                             |
|----------------|-----------------------------------------|
| **Expression** | JSONata expression to compute the value |
| **Alias**      | Name for the new column                 |

**Example expressions:**

Expand table

| Expression                   | Alias       | Description                     |
|------------------------------|-------------|---------------------------------|
| `price * quantity`           | `total`     | Multiply price by quantity      |
| `firstName & ' ' & lastName` | `fullName`  | Concatenate first and last name |
| `$now()`                     | `timestamp` | Add current timestamp           |
| `$round(value, 2)`           | `rounded`   | Round value to 2 decimal places |

### Summarize / Group by

Aggregates data by grouping rows and applying an aggregation function.

Expand table

| Field          | Description                                          |
|----------------|------------------------------------------------------|
| **Expression** | Aggregation expression (for example, `$sum(amount)`) |
| **By**         | Field to group by                                    |
| **Alias**      | Name for the aggregated column                       |

**Aggregation functions:**

Expand table

| Function          | Description       |
|-------------------|-------------------|
| `$sum(field)`     | Sum of values     |
| `$average(field)` | Average of values |
| `$min(field)`     | Minimum value     |
| `$max(field)`     | Maximum value     |
| `$count(field)`   | Count of values   |

**Example:** To sum sales by region:

- **Expression:** `$sum(sales)`
- **By:** `region`
- **Alias:** `totalSales`

## Transformation order

When you add multiple transformations, they execute in the order they appear. For example:

1. **Filter expression** (`status = 'active'`) - First, filter to active records
2. **Computed column** (`price * 1.1` as `priceWithTax`) - Then, add a calculated column
3. **Limit** (`10`) - Finally, return only 10 rows

> Note
>
> Transformations are applied after the Infinity backend processes your query. If your API supports server-side filtering or pagination, use those capabilities instead for better performance.
