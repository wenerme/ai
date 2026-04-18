---
title: SQL reference
description: Comprehensive reference for SQL syntax, functions, and data types supported in R2 SQL.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

### Tags

[ SQL ](https://developers.cloudflare.com/search/?tags=SQL) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/r2-sql/sql-reference/index.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# SQL reference

Note

R2 SQL is in public beta. Supported SQL grammar may change over time.

R2 SQL is Cloudflare's serverless, distributed, analytics query engine for querying [Apache Iceberg ↗](https://iceberg.apache.org/) tables stored in [R2 Data Catalog](https://developers.cloudflare.com/r2/data-catalog/). This page documents the supported SQL syntax.

---

## Query syntax

```

SELECT column_list | expression | aggregation_function

FROM namespace_name.table_name

[WHERE conditions]

[GROUP BY column_list]

[HAVING conditions]

[ORDER BY expression [ASC | DESC]]

[LIMIT number]


```

---

## Schema discovery commands

### SHOW DATABASES

Lists all available namespaces.

```

SHOW DATABASES;


```

### SHOW NAMESPACES

Alias for `SHOW DATABASES`. Lists all available namespaces.

```

SHOW NAMESPACES;


```

### SHOW TABLES

Lists all tables within a specific namespace.

```

SHOW TABLES IN namespace_name;


```

### DESCRIBE

Describes the structure of a table, showing column names and data types.

```

DESCRIBE namespace_name.table_name;


```

---

## SELECT clause

### Syntax

```

SELECT column_specification [, column_specification, ...]


```

### Column specification

* **Column name**: `column_name`
* **All columns**: `*`
* **Qualified wildcard**: `table_name.*`
* **Column alias**: `column_name AS alias`
* **Expressions**: arithmetic, function calls, CASE expressions, and casts

### Examples

```

SELECT * FROM my_namespace.sales_data LIMIT 10

SELECT customer_id, region, total_amount FROM my_namespace.sales_data LIMIT 10

SELECT region, total_amount * 1.1 AS total_with_tax FROM my_namespace.sales_data LIMIT 10


```

---

## Common table expressions (CTEs)

CTEs let you define named temporary result sets using `WITH` that you can reference in the main query. All CTEs must reference the same single table.

### Syntax

```

WITH cte_name AS (

    SELECT ...

    FROM namespace_name.table_name

    [WHERE ...]

)

SELECT ... FROM cte_name


```

### Chained CTEs

A CTE can reference a previously defined CTE. All CTEs in the chain must derive from the same underlying table.

```

WITH filtered AS (

    SELECT customer_id, department, total_amount

    FROM my_namespace.sales_data

    WHERE total_amount > 0

),

summary AS (

    SELECT department,

           COUNT(*) AS order_count,

           round(AVG(total_amount), 2) AS avg_amount

    FROM filtered

    GROUP BY department

)

SELECT *

FROM summary

WHERE order_count > 100

ORDER BY avg_amount DESC


```

Explain Code

Note

CTEs must reference a single table. Multi-table CTEs, JOINs within CTEs, and cross-table references are not supported.

---

## FROM clause

### Syntax

```

SELECT * FROM namespace_name.table_name


```

R2 SQL queries reference exactly one table, specified as `namespace_name.table_name`.

---

## WHERE clause

### Syntax

```

SELECT * FROM namespace_name.table_name WHERE condition [AND | OR condition ...]


```

### Conditions

#### Comparison operators

`=`, `!=`, `<>`, `<`, `>`, `<=`, `>=`

#### Null checks

* `column_name IS NULL`
* `column_name IS NOT NULL`

#### Boolean checks

* `IS TRUE`, `IS FALSE`, `IS NOT TRUE`, `IS NOT FALSE`
* `IS UNKNOWN`, `IS NOT UNKNOWN`

#### Range

* `column_name BETWEEN value1 AND value2`
* `column_name NOT BETWEEN value1 AND value2`

#### List membership

* `column_name IN ('value1', 'value2')`
* `column_name NOT IN ('value1', 'value2')`

#### Pattern matching

* `column_name LIKE 'pattern'`
* `column_name NOT LIKE 'pattern'`
* `column_name ILIKE 'pattern'` (case-insensitive)
* `column_name NOT ILIKE 'pattern'`
* `column_name SIMILAR TO 'regex_pattern'`

#### Logical operators

* `AND`
* `OR`
* `NOT`

### Examples

```

SELECT * FROM my_namespace.sales_data

WHERE timestamp BETWEEN '2025-09-24T01:00:00Z' AND '2025-09-25T01:00:00Z'


SELECT * FROM my_namespace.sales_data

WHERE status = 200 AND response_time > 1000


SELECT * FROM my_namespace.sales_data

WHERE (region = 'North' OR region = 'South')

  AND total_amount IS NOT NULL


SELECT * FROM my_namespace.sales_data

WHERE department ILIKE '%eng%'


```

Explain Code

---

## GROUP BY clause

### Syntax

```

SELECT column_list, aggregation_function(column)

FROM namespace_name.table_name

[WHERE conditions]

GROUP BY column_list


```

### Examples

```

SELECT department, COUNT(*) AS dept_count

FROM my_namespace.sales_data

GROUP BY department


SELECT department, category, SUM(total_amount) AS total

FROM my_namespace.sales_data

GROUP BY department, category


```

---

## HAVING clause

### Syntax

```

SELECT column_list, aggregation_function(column) AS alias

FROM namespace_name.table_name

GROUP BY column_list

HAVING aggregation_function(column) comparison_operator value


```

### Examples

```

SELECT department, COUNT(*) AS dept_count

FROM my_namespace.sales_data

GROUP BY department

HAVING COUNT(*) > 1000


SELECT region, SUM(total_amount) AS total

FROM my_namespace.sales_data

GROUP BY region

HAVING SUM(total_amount) > 1000000


```

---

## ORDER BY clause

### Syntax

```

ORDER BY expression [ASC | DESC] [, expression [ASC | DESC], ...]


```

* **ASC**: Ascending order (default)
* **DESC**: Descending order
* Multi-column ordering is supported

### Examples

```

SELECT customer_id, total_amount

FROM my_namespace.sales_data

WHERE total_amount IS NOT NULL

ORDER BY total_amount DESC

LIMIT 50


SELECT department, COUNT(*) AS dept_count

FROM my_namespace.sales_data

GROUP BY department

ORDER BY dept_count DESC, department ASC


```

Explain Code

---

## LIMIT clause

### Syntax

```

LIMIT number


```

* **Type**: Integer only
* **Default**: 500

### Examples

```

SELECT * FROM my_namespace.sales_data LIMIT 100


```

---

## EXPLAIN

Returns the execution plan for a query without running it.

```

EXPLAIN SELECT department, COUNT(*) AS dept_count

FROM my_namespace.sales_data

WHERE total_amount IS NOT NULL

GROUP BY department;


```

### EXPLAIN FORMAT JSON

Returns the execution plan as structured JSON for programmatic analysis.

```

EXPLAIN FORMAT JSON SELECT * FROM my_namespace.sales_data LIMIT 10;


```

---

## Expressions

Expressions can be used in `SELECT`, `WHERE`, `GROUP BY`, `HAVING`, and `ORDER BY` clauses.

### Literals

```

SELECT 42 AS int_val, 3.14 AS float_val, 'hello' AS str_val, TRUE AS bool_val, NULL AS null_val

FROM my_namespace.sales_data LIMIT 1


```

### Arithmetic operators

`+`, `-`, `*`, `/`, `%`

```

SELECT customer_id, total_amount * 1.1 AS total_with_tax, total_amount % 10 AS remainder

FROM my_namespace.sales_data

WHERE total_amount IS NOT NULL

LIMIT 5


```

### String concatenation

```

SELECT customer_id || ' - ' || region AS label

FROM my_namespace.sales_data

LIMIT 5


```

### CASE expressions

Searched form:

```

SELECT customer_id,

    CASE

        WHEN total_amount > 1000 THEN 'high'

        WHEN total_amount > 100 THEN 'medium'

        ELSE 'low'

    END AS tier

FROM my_namespace.sales_data

LIMIT 10


```

Simple form:

```

SELECT customer_id,

    CASE region

        WHEN 'North' THEN 'N'

        WHEN 'South' THEN 'S'

        ELSE 'Other'

    END AS region_code

FROM my_namespace.sales_data

LIMIT 10


```

### Type casting

```

-- CAST

SELECT CAST(total_amount AS INT) AS amount_int FROM my_namespace.sales_data LIMIT 5


-- TRY_CAST (returns NULL on failure instead of error)

SELECT TRY_CAST(customer_id AS INT) AS id_int FROM my_namespace.sales_data LIMIT 5


-- Shorthand (::)

SELECT total_amount::INT AS amount_int FROM my_namespace.sales_data LIMIT 5


```

### EXTRACT

```

SELECT EXTRACT(YEAR FROM timestamp) AS yr,

       EXTRACT(MONTH FROM timestamp) AS mo,

       EXTRACT(DAY FROM timestamp) AS dy

FROM my_namespace.sales_data

LIMIT 1


```

---

## Data type reference

| Type      | Description     | Example Values               |
| --------- | --------------- | ---------------------------- |
| integer   | Whole numbers   | 1, 42, \-10, 0               |
| float     | Decimal numbers | 1.5, 3.14, \-2.7, 0.0        |
| string    | Text values     | 'hello', 'GET', '2024-01-01' |
| boolean   | Boolean values  | true, false                  |
| timestamp | RFC3339         | '2025-09-24T01:00:00Z'       |
| date      | Date values     | '2025-09-24'                 |
| struct    | Named fields    | struct\_col\['field\_name'\] |
| array     | Ordered list    | array\_col\[1\] (1-indexed)  |
| map       | Key-value pairs | map\_keys(map\_col)          |

---

## Operator precedence

1. **Comparison operators**: `=`, `!=`, `<`, `<=`, `>`, `>=`, `LIKE`, `BETWEEN`, `IS NULL`, `IS NOT NULL`
2. **AND** (higher precedence)
3. **OR** (lower precedence)

Use parentheses to override default precedence:

```

SELECT * FROM my_namespace.sales_data WHERE (status = 404 OR status = 500) AND region = 'North'


```

---

## Complete query examples

### Basic query

```

SELECT *

FROM my_namespace.sales_data

WHERE timestamp BETWEEN '2025-09-24T01:00:00Z' AND '2025-09-25T01:00:00Z'

LIMIT 100


```

### Filtered query with sorting

```

SELECT customer_id, timestamp, status, total_amount

FROM my_namespace.sales_data

WHERE status >= 400 AND total_amount > 5000

ORDER BY total_amount DESC

LIMIT 50


```

### Aggregation with HAVING

```

SELECT region, COUNT(*) AS region_count, AVG(total_amount) AS avg_amount

FROM my_namespace.sales_data

WHERE status = 'completed'

GROUP BY region

HAVING COUNT(*) > 1000

ORDER BY avg_amount DESC

LIMIT 20


```

### Conditional categorization

```

SELECT customer_id,

    CASE

        WHEN total_amount >= 1000 THEN 'Premium'

        WHEN total_amount >= 100 THEN 'Standard'

        ELSE 'Basic'

    END AS tier,

    total_amount

FROM my_namespace.sales_data

WHERE total_amount IS NOT NULL

ORDER BY total_amount DESC

LIMIT 20


```

Explain Code

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/r2-sql/","name":"R2 SQL"}},{"@type":"ListItem","position":3,"item":{"@id":"/r2-sql/sql-reference/","name":"SQL reference"}}]}
```
