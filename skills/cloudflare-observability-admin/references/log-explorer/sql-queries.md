---
description: Review SQL syntax supported by Log Explorer.
title: SQL queries supported
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/log-explorer/llms.txt
> Use this file to discover all available pages before exploring further.

# SQL queries supported

Last updated Apr 23, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/log-explorer/sql-queries/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

This page outlines the SQL features supported by Log Explorer, including common aggregation functions, expressions, and query clauses.

The diagram below illustrates the general shape of a valid query supported in Log Explorer. It shows how standard SQL clauses — such as `SELECT`, `WHERE`, `GROUP BY`, and `ORDER BY` — can be composed to form supported queries.

![Supported SQL grammar](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=980,height=864,format=webp/_astro/supported-sql-grammar-graph.bOILnB7v.png)

Examples of queries include:

- `SELECT * FROM table WHERE (a = 1 OR b = "hello") AND c < 25.89`
- `SELECT a, b, c FROM table WHERE d >= "GB" LIMIT 10`

Note

- A default `LIMIT` of 10,000 is applied if the `LIMIT` clause is omitted.
- The `WHERE` clause supports up to 25 predicates, which can be grouped using parentheses.

### SQL Clauses in detail

The following SQL clauses define the structure and logic of queries in Log Explorer:

- `SELECT` - The `SELECT` clause specifies the columns that you want to retrieve from the database tables. It can include individual column names, expressions, or even wildcard characters to select all columns.
- `FROM` - The `FROM` clause specifies the tables from which to retrieve data. It indicates the source of the data for the `SELECT` statement.
- `WHERE` - The `WHERE` clause filters the rows returned by a query based on specified conditions. It allows you to specify conditions that must be met for a row to be included in the result set.
- `SELECT DISTINCT` - Removes duplicate rows from the result set.
- `GROUP BY` - Groups rows for aggregation. The `GROUP BY` clause is used to group rows that have the same values into summary rows.
- `ORDER BY` - Sorts the result set. The `ORDER BY` clause is used to sort the result set by one or more columns in ascending or descending order.
- `LIMIT` - Restricts the number of rows returned. The `LIMIT` clause is used to constrain the number of rows returned by a query. It is often used in conjunction with the `ORDER BY` clause to retrieve the top `N` rows or to implement pagination.
- `OFFSET` - Skips a specified number of rows before returning results.

The sections that follow break down the remaining components shown in the diagram — such as aggregation functions, string and numeric expressions, and supported operators — in more detail.

## Functions

Log Explorer supports a range of SQL functions to transform, evaluate, or summarize data. These include scalar and aggregation functions.

### Scalar functions

These help manipulate or evaluate values (often strings):

- `ARRAY_CONTAINS(array, element)` – Checks if the array contains the element.<details><summary>

  Example</summary>

<code>ARRAY_CONTAINS(['US', 'CA'], ClientCountry)</code>

  Returns rows where <code>ClientCountry</code> is either <code>US</code> or <code>CA</code>.</details>

- `SUBSTRING(string, from_number, for_number)` – Extracts part of a string.<details><summary>

  Example</summary>

<code>SUBSTRING(ClientRequestPath, 0, 5)</code>

  Extracts the first <code>5</code> characters from <code>ClientRequestPath</code>.</details>

- `LOWER(string)` – Converts to lowercase.<details><summary>

  Example</summary>

<code>LOWER(ClientRequestUserAgent)</code>

  Converts the user agent string to lowercase.</details>

- `UPPER(string)` – Converts to uppercase.<details><summary>

  Example</summary>

<code>UPPER(ClientCountry)</code>

  Converts the country code to uppercase.</details>

### Aggregation functions

Used to perform calculations on sets of rows:

- `SUM(expression)` – Total of values.<details><summary>

  Example</summary>

<code>SUM(ClientRequestBytes)</code>

  Adds up the total number of bytes requested by clients.</details>

- `MIN(expression)` – Minimum value.<details><summary>

  Example</summary>

<code>MIN(OriginResponseDurationMs)</code>

  Finds the shortest response time from origin servers.</details>

- `MAX(expression)` – Maximum value.<details><summary>

  Example</summary>

<code>MAX(OriginResponseDurationMs)</code>

  Finds the longest response time.</details>

- `COUNT(expression)` – Number of rows (can be all rows or non-null values).<details><summary>

  Example</summary>

<code>COUNT(ClientRequestUserAgent)</code>

  Counts how many rows have a user agent value.</details>

- `COUNT(DISTINCT expression)` – Number of distinct non-null values.<details><summary>

  Example</summary>

<code>COUNT(DISTINCT ClientIP)</code>

  Counts how many unique client IPs made requests.</details>

- `AVG(expression)` – Average of numeric values.<details><summary>

  Example</summary>

<code>AVG(OriginResponseDurationMs)</code>

  Computes the average origin response time in milliseconds.</details>

The diagram below represents the grammar for SQL expressions including scalar and aggregate functions.

![Scalar and aggregate functions](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=392,height=428,format=webp/_astro/scalar-aggregate-functions.ucmFeJbw.png)

## Expressions

Conditions or logic used in queries:

- `CASE WHEN` – Conditional logic (like if-else).
- `AS` – Alias for columns or tables.
- `LIKE` – Pattern matching.
- `IN (list)` – Checks if a value is in a list.
- `BETWEEN ... AND ...` – Checks if a value is within a range.
- `Unary operator` – Operates on one operand (for example, `-5`).
- `Binary operator` – Operates on two operands (for example, `5 + 3`).
- `Nested Expressions` – Expression wrapped with parentheses, like `( x > y )` or `( 1 )`.
- `Compound identifier` – Multi-part name (for example, `schema.table.column`).
- `Array` – A collection of values (supported differently across SQL dialects).
- `Literals` - represent values such as strings, numbers, or arrays.

The diagram below represents the grammar for SQL expressions, detailing the various forms an expression can take, including columns, literals, functions, operators, and aliases.

![SQL expressions](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=1152,height=714,format=webp/_astro/expressions.BHSBeoXm.png)

The diagram below defines the grammar for unary operators, which operate on a single operand (for example, negation or logical `NOT`):

![Grammar for unary operators](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=354,height=264,format=webp/_astro/not.BmwQbTYc.png)

## Binary Operators

Used for arithmetic, comparison, logical operations:

- Arithmetic: `+`, `-`, `*`, `/`, `%` (modulo)
- Comparison: `>`, `<`, `>=`, `<=`, `=`, `!=` (or `<>`)\`
- Logical: `AND`, `OR`, `XOR`
- Bitwise: `&`, `|`, `^`, `>>`, `<<`
- String concat: `||`

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/log-explorer/sql-queries/#page","headline":"SQL queries supported","description":"Review SQL syntax supported by Log Explorer.","url":"https://developers.cloudflare.com/log-explorer/sql-queries/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
