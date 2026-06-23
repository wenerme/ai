---
title: SQL reference
description: Comprehensive reference for SQL syntax, functions, and data types supported in R2 SQL.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/r2-sql/llms.txt  
> Use this file to discover all available pages before exploring further. 

[Skip to content](#%5Ftop) 

# SQL reference

Note

R2 SQL is in public beta. Supported SQL grammar may change over time.

R2 SQL is Cloudflare's serverless, distributed, analytics query engine for querying [Apache Iceberg ↗](https://iceberg.apache.org/) tables stored in [R2 Data Catalog](https://developers.cloudflare.com/r2/data-catalog/). This page documents the supported SQL syntax.

---

## Query syntax

```
SELECT [DISTINCT] column_list | expression | aggregate_function | window_functionFROM namespace_name.table_name[JOIN namespace_name.table_name ON condition][WHERE conditions][GROUP BY column_list][HAVING conditions][QUALIFY window_condition][ORDER BY expression [ASC | DESC]][LIMIT number]
```

Two or more queries can be combined with [set operations](#set-operations) (`UNION`, `UNION ALL`, `INTERSECT`, `EXCEPT`).

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
SELECT [DISTINCT] column_specification [, column_specification, ...]
```

### Column specification

* **Column name**: `column_name`
* **All columns**: `*`
* **Qualified wildcard**: `table_name.*`
* **Column alias**: `column_name AS alias`
* **Expressions**: arithmetic, function calls, CASE expressions, and casts

### Examples

```
SELECT * FROM my_namespace.sales_data LIMIT 10SELECT customer_id, region, total_amount FROM my_namespace.sales_data LIMIT 10SELECT region, total_amount * 1.1 AS total_with_tax FROM my_namespace.sales_data LIMIT 10
```

### DISTINCT

`SELECT DISTINCT` returns unique rows. `DISTINCT ON (...)` returns the first row for each combination of the listed expressions, using the `ORDER BY` clause to determine which row is kept.

```
-- Unique combinationsSELECT DISTINCT region, department FROM my_namespace.sales_data
-- First row per region by amountSELECT DISTINCT ON (region) region, customer_id, total_amountFROM my_namespace.sales_dataORDER BY region, total_amount DESC
```

For counting unique values on large datasets, `approx_distinct()` is a faster alternative.

---

## Common table expressions (CTEs)

CTEs let you define named temporary result sets using `WITH` that you can reference in the main query. CTEs can reference different tables and can include JOINs. A CTE can also be joined with other CTEs or regular tables in the main query.

### Syntax

```
WITH cte_name AS (    SELECT ...    FROM namespace_name.table_name    [WHERE ...])SELECT ... FROM cte_name
```

### Chained CTEs

A CTE can reference a previously defined CTE.

```
WITH filtered AS (    SELECT customer_id, department, total_amount    FROM my_namespace.sales_data    WHERE total_amount > 0),summary AS (    SELECT department,           COUNT(*) AS order_count,           round(AVG(total_amount), 2) AS avg_amount    FROM filtered    GROUP BY department)SELECT *FROM summaryWHERE order_count > 100ORDER BY avg_amount DESC
```

### CTE joined with another table

```
WITH enterprise_zones AS (    SELECT zone_id, domain, plan    FROM my_namespace.zones    WHERE plan = 'enterprise')SELECT ez.domain, f.action, COUNT(*) AS cntFROM enterprise_zones ezINNER JOIN my_namespace.firewall_events f ON ez.zone_id = f.zone_idGROUP BY ez.domain, f.actionORDER BY cnt DESCLIMIT 20
```

### Two CTEs joined together

```
WITH top_zones AS (    SELECT zone_id, COUNT(*) AS req_count    FROM my_namespace.http_requests    GROUP BY zone_id    ORDER BY req_count DESC    LIMIT 50),zone_threats AS (    SELECT zone_id, COUNT(*) AS threat_count    FROM my_namespace.firewall_events    WHERE risk_score > 0.5    GROUP BY zone_id)SELECT tz.zone_id, tz.req_count, COALESCE(zt.threat_count, 0) AS threat_countFROM top_zones tzLEFT JOIN zone_threats zt ON tz.zone_id = zt.zone_idORDER BY tz.req_count DESCLIMIT 20
```

---

## FROM clause

### Syntax

```
SELECT * FROM namespace_name.table_name
```

R2 SQL queries can reference one or more tables. Tables are specified as `namespace_name.table_name`. Multiple tables can be combined using JOINs or comma-separated syntax. Refer to the [JOIN clause](#join-clause) section for details.

---

## JOIN clause

R2 SQL supports joining multiple Iceberg tables in a single query. All join types use standard SQL syntax.

### Supported join types

| Join type        | Syntax                          | Description                                                        |
| ---------------- | ------------------------------- | ------------------------------------------------------------------ |
| Inner join       | INNER JOIN ... ON               | Returns rows that match in both tables                             |
| Left outer join  | LEFT JOIN ... ON                | Returns all rows from the left table, NULLs for non-matching right |
| Right outer join | RIGHT JOIN ... ON               | Returns all rows from the right table, NULLs for non-matching left |
| Full outer join  | FULL OUTER JOIN ... ON          | Returns all rows from both tables, NULLs where no match            |
| Cross join       | CROSS JOIN                      | Cartesian product of both tables                                   |
| Implicit join    | FROM t1, t2 WHERE t1.id = t2.id | Comma-separated tables with join condition in WHERE                |

### Syntax

```
-- Explicit JOINSELECT columnsFROM namespace.table1 alias1[INNER | LEFT | RIGHT | FULL OUTER | CROSS] JOIN namespace.table2 alias2  ON alias1.column = alias2.column[WHERE conditions]
-- Implicit joinSELECT columnsFROM namespace.table1 alias1, namespace.table2 alias2WHERE alias1.column = alias2.column
```

### Multi-way joins

You can join three or more tables in a single query:

```
SELECT z.domain, h.method, f.action, COUNT(*) AS cntFROM my_namespace.zones zINNER JOIN my_namespace.http_requests h ON z.zone_id = h.zone_idINNER JOIN my_namespace.firewall_events f ON z.zone_id = f.zone_idWHERE h.status_code >= 400GROUP BY z.domain, h.method, f.actionORDER BY cnt DESCLIMIT 20
```

### Self-joins

A table can be joined with itself using different aliases:

```
SELECT f1.source_ip, f1.zone_id AS zone1, f2.zone_id AS zone2FROM my_namespace.firewall_events f1INNER JOIN my_namespace.firewall_events f2  ON f1.source_ip = f2.source_ip  AND f1.zone_id < f2.zone_idWHERE f1.action = 'block'LIMIT 20
```

### Join conditions

* Join conditions use the `ON` clause with equality (`=`) or expression-based predicates.
* Functions are supported in join predicates (for example, `ON LOWER(a.col) = LOWER(b.col)`).
* Multiple conditions can be combined with `AND`.

Note

Nested (parenthesized) joins are not supported. Write multi-way joins as a flat sequence of `JOIN` clauses instead of grouping them with parentheses.

```
-- Not supportedSELECT * FROM (t1 JOIN t2 ON t1.id = t2.id) JOIN t3 ON t2.id = t3.id
-- SupportedSELECT * FROM t1 JOIN t2 ON t1.id = t2.id JOIN t3 ON t2.id = t3.id
```

### Best practices for joins

* Include `WHERE` filters to reduce intermediate result sizes, especially for multi-way joins.
* Join large fact tables through a shared dimension table rather than directly cross-joining two large tables.
* Use `LIMIT` to cap result sizes.

---

## Subqueries

R2 SQL supports subqueries in multiple positions within a query.

### Subqueries in FROM (derived tables)

A subquery in the `FROM` clause creates a derived table that can be referenced in the outer query:

```
SELECT sub.domain, sub.total_requestsFROM (    SELECT z.domain, COUNT(*) AS total_requests    FROM my_namespace.zones z    INNER JOIN my_namespace.http_requests h ON z.zone_id = h.zone_id    GROUP BY z.domain) subWHERE sub.total_requests > 1000ORDER BY sub.total_requests DESCLIMIT 20
```

Note

`LATERAL` derived tables are not supported. Subqueries in `FROM` cannot reference columns from other tables in the same `FROM` clause.

Derived tables can be joined with other derived tables or regular tables:

```
SELECT req.domain, req.total_reqs, fw.total_eventsFROM (    SELECT zone_id, domain, COUNT(*) AS total_reqs    FROM my_namespace.zones z    INNER JOIN my_namespace.http_requests h ON z.zone_id = h.zone_id    GROUP BY zone_id, domain) reqINNER JOIN (    SELECT zone_id, COUNT(*) AS total_events    FROM my_namespace.firewall_events    GROUP BY zone_id) fw ON req.zone_id = fw.zone_idORDER BY fw.total_events DESCLIMIT 20
```

### `IN` / `NOT IN` subqueries

Filter rows based on whether a value exists in the result of a subquery:

```
-- Find requests from enterprise zonesSELECT method, status_code, COUNT(*) AS cntFROM my_namespace.http_requestsWHERE zone_id IN (    SELECT zone_id FROM my_namespace.zones WHERE plan = 'enterprise')GROUP BY method, status_codeORDER BY cnt DESCLIMIT 20
```

```
-- NOT IN exampleSELECT zone_id, COUNT(*) AS cntFROM my_namespace.http_requestsWHERE zone_id NOT IN (    SELECT zone_id FROM my_namespace.firewall_events WHERE action = 'block')GROUP BY zone_idLIMIT 10
```

Warning

`NOT IN` subqueries are not supported on nullable columns. If the subquery column can contain `NULL` values, use `NOT EXISTS` instead.

```
-- Instead of NOT IN on a nullable column:SELECT z.domainFROM my_namespace.zones zWHERE NOT EXISTS (    SELECT 1 FROM my_namespace.firewall_events f    WHERE f.zone_id = z.zone_id)LIMIT 20
```

### `EXISTS` / `NOT EXISTS` subqueries

Test for the existence of rows matching a correlated condition:

```
-- Find zones with blocked firewall events (semi-join)SELECT z.domain, z.planFROM my_namespace.zones zWHERE EXISTS (    SELECT 1 FROM my_namespace.firewall_events f    WHERE f.zone_id = z.zone_id AND f.action = 'block')ORDER BY z.domainLIMIT 20
```

```
-- Find zones with NO firewall events (anti-join)SELECT z.domain, z.planFROM my_namespace.zones zWHERE NOT EXISTS (    SELECT 1 FROM my_namespace.firewall_events f    WHERE f.zone_id = z.zone_id)ORDER BY z.domainLIMIT 20
```

### Scalar subqueries

A subquery that returns a single value can be used in `SELECT`, `WHERE`, or `HAVING`:

```
-- In SELECT (constant value per row)SELECT z.domain, z.plan,       (SELECT COUNT(*) FROM my_namespace.zones) AS total_zonesFROM my_namespace.zones zWHERE z.plan = 'enterprise'LIMIT 10
```

```
-- In WHERE (comparison)SELECT z.domain, z.plan, z.requests_30dFROM my_namespace.zones zWHERE z.requests_30d > (    SELECT AVG(requests_30d) FROM my_namespace.zones)ORDER BY z.requests_30d DESCLIMIT 20
```

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
SELECT * FROM my_namespace.sales_dataWHERE timestamp BETWEEN '2025-09-24T01:00:00Z' AND '2025-09-25T01:00:00Z'
SELECT * FROM my_namespace.sales_dataWHERE status = 200 AND response_time > 1000
SELECT * FROM my_namespace.sales_dataWHERE (region = 'North' OR region = 'South')  AND total_amount IS NOT NULL
SELECT * FROM my_namespace.sales_dataWHERE department ILIKE '%eng%'
```

---

## GROUP BY clause

### Syntax

```
SELECT column_list, aggregation_function(column)FROM namespace_name.table_name[WHERE conditions]GROUP BY column_list
```

### Examples

```
SELECT department, COUNT(*) AS dept_countFROM my_namespace.sales_dataGROUP BY department
SELECT department, category, SUM(total_amount) AS totalFROM my_namespace.sales_dataGROUP BY department, category
```

### GROUPING SETS, ROLLUP, and CUBE

These extensions compute multiple groupings, including subtotals and grand totals, in a single query.

* **`GROUPING SETS`**: Computes exactly the groupings you list. `()` produces the grand total.
* **`ROLLUP`**: Computes hierarchical subtotals from left to right. `ROLLUP(a, b)` groups by `(a, b)`, `(a)`, and `()`.
* **`CUBE`**: Computes every combination of the listed columns. `CUBE(a, b)` groups by `(a, b)`, `(a)`, `(b)`, and `()`.

```
-- Subtotals per department plus a grand totalSELECT department, SUM(total_amount) AS totalFROM my_namespace.sales_dataGROUP BY ROLLUP(department)
-- Every combination of department and categorySELECT department, category, SUM(total_amount) AS totalFROM my_namespace.sales_dataGROUP BY CUBE(department, category)
-- Explicit groupingsSELECT department, category, SUM(total_amount) AS totalFROM my_namespace.sales_dataGROUP BY GROUPING SETS ((department, category), (department), ())
```

---

## HAVING clause

### Syntax

```
SELECT column_list, aggregation_function(column) AS aliasFROM namespace_name.table_nameGROUP BY column_listHAVING aggregation_function(column) comparison_operator value
```

### Examples

```
SELECT department, COUNT(*) AS dept_countFROM my_namespace.sales_dataGROUP BY departmentHAVING COUNT(*) > 1000
SELECT region, SUM(total_amount) AS totalFROM my_namespace.sales_dataGROUP BY regionHAVING SUM(total_amount) > 1000000
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
SELECT customer_id, total_amountFROM my_namespace.sales_dataWHERE total_amount IS NOT NULLORDER BY total_amount DESCLIMIT 50
SELECT department, COUNT(*) AS dept_countFROM my_namespace.sales_dataGROUP BY departmentORDER BY dept_count DESC, department ASC
```

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

## Window functions

Window functions compute a value across a set of rows related to the current row without collapsing them into a single output row. The window is defined inline with an `OVER (...)` clause containing an optional `PARTITION BY`, `ORDER BY`, and frame specification.

### Syntax

```
function(args) OVER (    [PARTITION BY expression [, ...]]    [ORDER BY expression [ASC | DESC] [, ...]]    [frame_specification])
```

### Supported functions

| Category  | Functions                                                        |
| --------- | ---------------------------------------------------------------- |
| Ranking   | ROW\_NUMBER, RANK, DENSE\_RANK, PERCENT\_RANK, CUME\_DIST, NTILE |
| Offset    | LAG, LEAD, FIRST\_VALUE, LAST\_VALUE, NTH\_VALUE                 |
| Aggregate | SUM, AVG, COUNT, MIN, MAX, and other aggregates used with OVER   |

### Examples

```
-- Rank rows within each partitionSELECT customer_id, region,       ROW_NUMBER() OVER (PARTITION BY region ORDER BY total_amount DESC) AS rank_in_region,       LAG(total_amount) OVER (PARTITION BY region ORDER BY total_amount DESC) AS prev_amountFROM my_namespace.sales_data
-- Running total with an explicit frameSELECT customer_id, total_amount,       SUM(total_amount) OVER (ORDER BY total_amount ROWS BETWEEN 2 PRECEDING AND CURRENT ROW) AS running_totalFROM my_namespace.sales_data
```

Note

The named `WINDOW` clause is not supported. Inline the `OVER (...)` specification at each call site instead of defining `WINDOW w AS (...)`.

### QUALIFY

`QUALIFY` filters rows based on the result of a window function, similar to how `HAVING` filters grouped rows.

```
-- Keep only the top 3 customers by amount in each regionSELECT customer_id, region, total_amountFROM my_namespace.sales_dataQUALIFY ROW_NUMBER() OVER (PARTITION BY region ORDER BY total_amount DESC) <= 3
```

---

## Set operations

Set operations combine the results of two or more `SELECT` statements.

### Syntax

```
SELECT ... FROM table1UNION | UNION ALL | INTERSECT | EXCEPTSELECT ... FROM table2
```

### Supported operations

| Operation | Description                                                        |
| --------- | ------------------------------------------------------------------ |
| UNION     | Returns all rows from both queries, removing duplicates            |
| UNION ALL | Returns all rows from both queries, including duplicates           |
| INTERSECT | Returns only rows that appear in both query results                |
| EXCEPT    | Returns rows from the first query that do not appear in the second |

### Examples

#### Union

```
-- Find zones that had either firewall blocks OR high-risk requestsSELECT zone_id FROM my_namespace.firewall_events WHERE action = 'block'UNIONSELECT zone_id FROM my_namespace.http_requests WHERE risk_score > 0.8
```

#### Intersect

```
-- Find zones with both firewall blocks AND entries in the zones tableSELECT zone_id FROM my_namespace.firewall_events WHERE action = 'block'INTERSECTSELECT zone_id FROM my_namespace.zones WHERE plan = 'enterprise'
```

#### Except

```
-- Find enterprise zones that have no firewall eventsSELECT zone_id FROM my_namespace.zones WHERE plan = 'enterprise'EXCEPTSELECT zone_id FROM my_namespace.firewall_events
```

### Requirements

* All queries in a set operation must return the same number of columns.
* Corresponding columns must have compatible data types.
* Column names in the result are taken from the first query.

Note

A `LIMIT` placed directly before a set operator is not valid. Wrap each query in a subquery if you need to limit its rows, or apply a single `LIMIT` to the combined result.

---

## EXPLAIN

Returns the execution plan for a query without running it.

```
EXPLAIN SELECT department, COUNT(*) AS dept_countFROM my_namespace.sales_dataWHERE total_amount IS NOT NULLGROUP BY department;
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
SELECT 42 AS int_val, 3.14 AS float_val, 'hello' AS str_val, TRUE AS bool_val, NULL AS null_valFROM my_namespace.sales_data LIMIT 1
```

### Arithmetic operators

`+`, `-`, `*`, `/`, `%`

```
SELECT customer_id, total_amount * 1.1 AS total_with_tax, total_amount % 10 AS remainderFROM my_namespace.sales_dataWHERE total_amount IS NOT NULLLIMIT 5
```

### String concatenation

```
SELECT customer_id || ' - ' || region AS labelFROM my_namespace.sales_dataLIMIT 5
```

### CASE expressions

Searched form:

```
SELECT customer_id,    CASE        WHEN total_amount > 1000 THEN 'high'        WHEN total_amount > 100 THEN 'medium'        ELSE 'low'    END AS tierFROM my_namespace.sales_dataLIMIT 10
```

Simple form:

```
SELECT customer_id,    CASE region        WHEN 'North' THEN 'N'        WHEN 'South' THEN 'S'        ELSE 'Other'    END AS region_codeFROM my_namespace.sales_dataLIMIT 10
```

### Type casting

```
-- CASTSELECT CAST(total_amount AS INT) AS amount_int FROM my_namespace.sales_data LIMIT 5
-- TRY_CAST (returns NULL on failure instead of error)SELECT TRY_CAST(customer_id AS INT) AS id_int FROM my_namespace.sales_data LIMIT 5
-- Shorthand (::)SELECT total_amount::INT AS amount_int FROM my_namespace.sales_data LIMIT 5
```

### EXTRACT

```
SELECT EXTRACT(YEAR FROM timestamp) AS yr,       EXTRACT(MONTH FROM timestamp) AS mo,       EXTRACT(DAY FROM timestamp) AS dyFROM my_namespace.sales_dataLIMIT 1
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
SELECT *FROM my_namespace.sales_dataWHERE timestamp BETWEEN '2025-09-24T01:00:00Z' AND '2025-09-25T01:00:00Z'LIMIT 100
```

### Filtered query with sorting

```
SELECT customer_id, timestamp, status, total_amountFROM my_namespace.sales_dataWHERE status >= 400 AND total_amount > 5000ORDER BY total_amount DESCLIMIT 50
```

### Aggregation with HAVING

```
SELECT region, COUNT(*) AS region_count, AVG(total_amount) AS avg_amountFROM my_namespace.sales_dataWHERE status = 'completed'GROUP BY regionHAVING COUNT(*) > 1000ORDER BY avg_amount DESCLIMIT 20
```

### Conditional categorization

```
SELECT customer_id,    CASE        WHEN total_amount >= 1000 THEN 'Premium'        WHEN total_amount >= 100 THEN 'Standard'        ELSE 'Basic'    END AS tier,    total_amountFROM my_namespace.sales_dataWHERE total_amount IS NOT NULLORDER BY total_amount DESCLIMIT 20
```

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/r2-sql/sql-reference/#page","headline":"SQL reference · R2 SQL docs","description":"Comprehensive reference for SQL syntax, functions, and data types supported in R2 SQL.","url":"https://developers.cloudflare.com/r2-sql/sql-reference/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-06-22","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["SQL"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/r2-sql/","name":"R2 SQL"}},{"@type":"ListItem","position":3,"item":{"@id":"/r2-sql/sql-reference/","name":"SQL reference"}}]}
```
