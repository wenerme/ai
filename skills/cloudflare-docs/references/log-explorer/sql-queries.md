---
title: SQL queries supported
description: Review SQL syntax supported by Log Explorer.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/log-explorer/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# SQL queries supported

This page outlines the SQL features supported by Log Explorer, including common aggregation functions, expressions, and query clauses.

The diagram below illustrates the general shape of a valid query supported in Log Explorer. It shows how standard SQL clauses — such as `SELECT`, `WHERE`, `GROUP BY`, and `ORDER BY` — can be composed to form supported queries.

![Supported SQL grammar](https://developers.cloudflare.com/_astro/supported-sql-grammar-graph.bOILnB7v_1BnHeS.webp) 

Examples of queries include:

* `SELECT * FROM table WHERE (a = 1 OR b = "hello") AND c < 25.89`
* `SELECT a, b, c FROM table WHERE d >= "GB" LIMIT 10`

Note

* A default `LIMIT` of 10,000 is applied if the `LIMIT` clause is omitted.
* The `WHERE` clause supports up to 25 predicates, which can be grouped using parentheses.

### SQL Clauses in detail

The following SQL clauses define the structure and logic of queries in Log Explorer:

* `SELECT` \- The `SELECT` clause specifies the columns that you want to retrieve from the database tables. It can include individual column names, expressions, or even wildcard characters to select all columns.
* `FROM` \- The `FROM` clause specifies the tables from which to retrieve data. It indicates the source of the data for the `SELECT` statement.
* `WHERE` \- The `WHERE` clause filters the rows returned by a query based on specified conditions. It allows you to specify conditions that must be met for a row to be included in the result set.
* `SELECT DISTINCT` \- Removes duplicate rows from the result set.
* `GROUP BY` \- Groups rows for aggregation. The `GROUP BY` clause is used to group rows that have the same values into summary rows.
* `ORDER BY` \- Sorts the result set. The `ORDER BY` clause is used to sort the result set by one or more columns in ascending or descending order.
* `LIMIT` \- Restricts the number of rows returned. The `LIMIT` clause is used to constrain the number of rows returned by a query. It is often used in conjunction with the `ORDER BY` clause to retrieve the top `N` rows or to implement pagination.
* `OFFSET` \- Skips a specified number of rows before returning results.

The sections that follow break down the remaining components shown in the diagram — such as aggregation functions, string and numeric expressions, and supported operators — in more detail.

## Functions

Log Explorer supports a range of SQL functions to transform, evaluate, or summarize data. These include scalar and aggregation functions.

### Scalar functions

These help manipulate or evaluate values (often strings):

* `ARRAY_CONTAINS(array, element)` – Checks if the array contains the element.  
Example  
`ARRAY_CONTAINS(['US', 'CA'], ClientCountry)`  
Returns rows where `ClientCountry` is either `US` or `CA`.
* `SUBSTRING(string, from_number, for_number)` – Extracts part of a string.  
Example  
`SUBSTRING(ClientRequestPath, 0, 5)`  
Extracts the first `5` characters from `ClientRequestPath`.
* `LOWER(string)` – Converts to lowercase.  
Example  
`LOWER(ClientRequestUserAgent)`  
Converts the user agent string to lowercase.
* `UPPER(string)` – Converts to uppercase.  
Example  
`UPPER(ClientCountry)`  
Converts the country code to uppercase.

### Aggregation functions

Used to perform calculations on sets of rows:

* `SUM(expression)` – Total of values.  
Example  
`SUM(ClientRequestBytes)`  
Adds up the total number of bytes requested by clients.
* `MIN(expression)` – Minimum value.  
Example  
`MIN(OriginResponseDurationMs)`  
Finds the shortest response time from origin servers.
* `MAX(expression)` – Maximum value.  
Example  
`MAX(OriginResponseDurationMs)`  
Finds the longest response time.
* `COUNT(expression)` – Number of rows (can be all rows or non-null values).  
Example  
`COUNT(ClientRequestUserAgent)`  
Counts how many rows have a user agent value.
* `COUNT(DISTINCT expression)` – Number of distinct non-null values.  
Example  
`COUNT(DISTINCT ClientIP)`  
Counts how many unique client IPs made requests.
* `AVG(expression)` – Average of numeric values.  
Example  
`AVG(OriginResponseDurationMs)`  
Computes the average origin response time in milliseconds.

The diagram below represents the grammar for SQL expressions including scalar and aggregate functions.

![Scalar and aggregate functions](https://developers.cloudflare.com/_astro/scalar-aggregate-functions.ucmFeJbw_Z172y6U.webp) 

## Expressions

Conditions or logic used in queries:

* `CASE WHEN` – Conditional logic (like if-else).
* `AS` – Alias for columns or tables.
* `LIKE` – Pattern matching.
* `IN (list)` – Checks if a value is in a list.
* `BETWEEN ... AND ...` – Checks if a value is within a range.
* `Unary operator` – Operates on one operand (for example, `-5`).
* `Binary operator` – Operates on two operands (for example, `5 + 3`).
* `Nested Expressions` – Expression wrapped with parentheses, like `( x > y )` or `( 1 )`.
* `Compound identifier` – Multi-part name (for example, `schema.table.column`).
* `Array` – A collection of values (supported differently across SQL dialects).
* `Literals` \- represent values such as strings, numbers, or arrays.

The diagram below represents the grammar for SQL expressions, detailing the various forms an expression can take, including columns, literals, functions, operators, and aliases.

![SQL expressions](https://developers.cloudflare.com/_astro/expressions.BHSBeoXm_1Sx8ac.webp) 

The diagram below defines the grammar for unary operators, which operate on a single operand (for example, negation or logical `NOT`):

![Grammar for unary operators](https://developers.cloudflare.com/_astro/not.BmwQbTYc_Z1Idv4u.webp) 

## Binary Operators

Used for arithmetic, comparison, logical operations:

* Arithmetic: `+`, `-`, `*`, `/`, `%` (modulo)
* Comparison: `>`, `<`, `>=`, `<=`, `=`, `!=` (or `<>`)\`
* Logical: `AND`, `OR`, `XOR`
* Bitwise: `&`, `|`, `^`, `>>`, `<<`
* String concat: `||`

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/log-explorer/","name":"Log Explorer"}},{"@type":"ListItem","position":3,"item":{"@id":"/log-explorer/sql-queries/","name":"SQL queries supported"}}]}
```
