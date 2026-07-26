# Friendly SQL

DuckDB offers several advanced SQL features and syntactic sugar to make SQL queries more concise. We refer to these colloquially as “friendly SQL”.

> Several of these features were first introduced by DuckDB, while some are inspired by other systems.
> Many of the features originally introduced by DuckDB (e.g., [`GROUP BY ALL`](https://duckdb.org/docs/current/sql/query_syntax/groupby.html#group-by-all)) have been since adapted by other systems.

> Tip We have a [Friendly SQL 2026 Calendar](https://blobs.duckdb.org/merch/duckdb-friendly-sql-calendar-2026.pdf) with a short explanation, an example, and an abstract illustration for 12 friendly SQL features.

## Clauses

* Creating tables and inserting data:
    * [`CREATE OR REPLACE TABLE`](https://duckdb.org/docs/current/sql/statements/create_table.html#create-or-replace): avoid `DROP TABLE IF EXISTS` statements in scripts.
    * [`CREATE TABLE ... AS SELECT` (CTAS)](https://duckdb.org/docs/current/sql/statements/create_table.html#create-table--as-select-ctas): create a new table from the output of a table without manually defining a schema.
    * [`INSERT INTO ... BY NAME`](https://duckdb.org/docs/current/sql/statements/insert.html#insert-into--by-name): this variant of the `INSERT` statement allows using column names instead of positions.
    * [`INSERT OR IGNORE INTO ...`](https://duckdb.org/docs/current/sql/statements/insert.html#insert-or-ignore-into): insert the rows that do not result in a conflict due to `UNIQUE` or `PRIMARY KEY` constraints.
    * [`INSERT OR REPLACE INTO ...`](https://duckdb.org/docs/current/sql/statements/insert.html#insert-or-replace-into): insert the rows that do not result in a conflict due to `UNIQUE` or `PRIMARY KEY` constraints. For those that result in a conflict, replace the columns of the existing row to the new values of the to-be-inserted row.
* Describing tables and computing statistics:
    * [`DESCRIBE`](https://duckdb.org/docs/current/guides/meta/describe.html): provides a succinct summary of the schema of a table or query.
    * [`SUMMARIZE`](https://duckdb.org/docs/current/guides/meta/summarize.html): returns summary statistics for a table or query.
* Making SQL clauses more compact and readable:
    * [`FROM`-first syntax with an optional `SELECT` clause](https://duckdb.org/docs/current/sql/query_syntax/from.html#from-first-syntax): DuckDB allows queries in the form of `FROM tbl` which selects all columns (performing a `SELECT *` statement).
    * [`GROUP BY ALL`](https://duckdb.org/docs/current/sql/query_syntax/groupby.html#group-by-all): omit the group-by columns by inferring them from the list of attributes in the `SELECT` clause.
    * [`ORDER BY ALL`](https://duckdb.org/docs/current/sql/query_syntax/orderby.html#order-by-all): shorthand to order on all columns (e.g., to ensure deterministic results).
    * [`SELECT * EXCLUDE`](https://duckdb.org/docs/current/sql/expressions/star.html#exclude-clause): the `EXCLUDE` option allows excluding specific columns from the `*` expression.
    * [`SELECT * REPLACE`](https://duckdb.org/docs/current/sql/expressions/star.html#replace-clause): the `REPLACE` option allows replacing specific columns with different expressions in a `*` expression.
    * [`UNION BY NAME`](https://duckdb.org/docs/current/sql/query_syntax/setops.html#union-all-by-name): perform the `UNION` operation along the names of columns (instead of relying on positions).
    * [Prefix aliases in the `SELECT` and `FROM` clauses](https://duckdb.org/docs/current/sql/query_syntax/select.html): write `x: 42` instead of `42 AS x` for improved readability.
    * [Specifying a percentage of the table size for the `LIMIT` clause](https://duckdb.org/docs/current/sql/query_syntax/limit.html): write `LIMIT 10%` to return 10% of the query results.
* Transforming tables:
    * [`PIVOT`](https://duckdb.org/docs/current/sql/statements/pivot.html) to turn long tables to wide tables.
    * [`UNPIVOT`](https://duckdb.org/docs/current/sql/statements/unpivot.html) to turn wide tables to long tables.
* Defining SQL-level variables:
    * [`SET VARIABLE`](https://duckdb.org/docs/current/sql/statements/set_variable.html#set-variable)
    * [`RESET VARIABLE`](https://duckdb.org/docs/current/sql/statements/set_variable.html#reset-variable)

## Query Features

* [Column aliases in `WHERE`, `GROUP BY`, and `HAVING`](https://duckdb.org/2022/05/04/friendlier-sql.html#column-aliases-in-where--group-by--having). (Note that column aliases cannot be used in the `ON` clause of [`JOIN` clauses](https://duckdb.org/docs/current/sql/query_syntax/from.html#joins).)
* [`COLUMNS()` expression](https://duckdb.org/docs/current/sql/expressions/star.html#columns-expression) can be used to execute the same expression on multiple columns:
    * [with regular expressions](https://duckdb.org/2023/08/23/even-friendlier-sql.html#columns-with-regular-expressions)
    * [with `EXCLUDE` and `REPLACE`](https://duckdb.org/2023/08/23/even-friendlier-sql.html#columns-with-exclude-and-replace)
    * [with lambda functions](https://duckdb.org/2023/08/23/even-friendlier-sql.html#columns-with-lambda-functions)
* Reusable column aliases (also known as “lateral column aliases”), e.g.: `SELECT i + 1 AS j, j + 2 AS k FROM range(0, 3) t(i)`
* Advanced aggregation features for analytical (OLAP) queries:
    * [`FILTER` clause](https://duckdb.org/docs/current/sql/query_syntax/filter.html)
    * [`GROUPING SETS`, `GROUP BY CUBE`, `GROUP BY ROLLUP` clauses](https://duckdb.org/docs/current/sql/query_syntax/grouping_sets.html)
* [`count()` shorthand](https://duckdb.org/docs/current/sql/functions/aggregates.html) for `count(*)`
* [`IN` operator for lists and maps](https://duckdb.org/docs/current/sql/expressions/in.html)
* [Specifying column names for common table expressions (`WITH`)](https://duckdb.org/docs/current/sql/query_syntax/with.html#basic-cte-examples)
* [Specifying column names in the `JOIN` clause](https://duckdb.org/docs/current/sql/query_syntax/from.html#shorthands-in-the-join-clause)
* [Using `VALUES` in the `JOIN` clause](https://duckdb.org/docs/current/sql/query_syntax/from.html#shorthands-in-the-join-clause)
* [Using `VALUES` in the anchor part of common table expressions](https://duckdb.org/docs/current/sql/query_syntax/with.html#using-values)
* [`SWITCH` statements as syntactic sugar for the `CASE` expression](https://duckdb.org/docs/current/sql/expressions/case.html#switch-expression)

## Literals and Identifiers

* [Case-insensitivity while maintaining case of entities in the catalog](https://duckdb.org/docs/current/sql/dialect/keywords_and_identifiers.html#case-sensitivity-of-identifiers)
* [Deduplicating identifiers](https://duckdb.org/docs/current/sql/dialect/keywords_and_identifiers.html#deduplicating-identifiers)
* [Underscores as digit separators in numeric literals](https://duckdb.org/docs/current/sql/data_types/literal_types.html#underscores-in-numeric-literals)

## Data Types

* [`MAP` data type](https://duckdb.org/docs/current/sql/data_types/map.html)
* [`UNION` data type](https://duckdb.org/docs/current/sql/data_types/union.html)

## Data Import

* [Auto-detecting the headers and schema of CSV files](https://duckdb.org/docs/current/data/csv/auto_detection.html)
* Directly querying [CSV files](https://duckdb.org/docs/current/data/csv/overview.html) and [Parquet files](https://duckdb.org/docs/current/data/parquet/overview.html)
* [Replacement scans](https://duckdb.org/docs/current/guides/glossary.html):
    * You can load from files using the syntax `FROM 'my.csv'`, `FROM 'my.csv.gz'`, `FROM 'my.parquet'`, etc.
    * In Python, you can [access Pandas data frames using `FROM df`](https://duckdb.org/docs/current/guides/python/export_pandas.html).
* [Filename expansion (globbing)](https://duckdb.org/docs/current/sql/functions/pattern_matching.html#globbing), e.g.: `FROM 'my-data/part-*.parquet'`

## Functions and Expressions

* [Dot operator for function chaining](https://duckdb.org/docs/current/sql/functions/overview.html#function-chaining-via-the-dot-operator): `SELECT ('hello').upper()`
* String formatters:
    the [`format()` function with the `fmt` syntax](https://duckdb.org/docs/current/sql/functions/text.html#fmt-syntax) and
    the [`printf() function`](https://duckdb.org/docs/current/sql/functions/text.html#printf-syntax)
* [List comprehensions](https://duckdb.org/2023/08/23/even-friendlier-sql.html#list-comprehensions)
* [List slicing](https://duckdb.org/2022/05/04/friendlier-sql.html#string-slicing) and indexing from the back (`[-1]`)
* [String slicing](https://duckdb.org/2022/05/04/friendlier-sql.html#string-slicing)
* [`STRUCT.*` notation](https://duckdb.org/2022/05/04/friendlier-sql.html#struct-dot-notation)
* [Creating `LIST` using square brackets](https://duckdb.org/docs/current/sql/data_types/list.html#creating-lists)
* [Simple `LIST` and `STRUCT` creation](https://duckdb.org/2022/05/04/friendlier-sql.html#simple-list-and-struct-creation)
* [Updating the schema of `STRUCT`s](https://duckdb.org/docs/current/sql/data_types/struct.html#updating-the-schema)

## Join Types

* [`ASOF` joins](https://duckdb.org/docs/current/sql/query_syntax/from.html#as-of-joins)
* [`LATERAL` joins](https://duckdb.org/docs/current/sql/query_syntax/from.html#lateral-joins)
* [`POSITIONAL` joins](https://duckdb.org/docs/current/sql/query_syntax/from.html#positional-joins)

## Trailing Commas

DuckDB allows [trailing commas](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Trailing_commas),
both when listing entities (e.g., column and table names) and when constructing [`LIST` items](https://duckdb.org/docs/current/sql/data_types/list.html#creating-lists).
For example, the following query works:

```sql
SELECT
    42 AS x,
    ['a', 'b', 'c',] AS y,
    'hello world' AS z,
;
```

## "Top-N in Group" Queries

Computing the "top-N rows in a group" ordered by some criteria is a common task in SQL that unfortunately often requires a complex query involving window functions and/or subqueries.

To aid in this, DuckDB provides the aggregate functions [`max(arg, n)`](https://duckdb.org/docs/current/sql/functions/aggregates.html#maxarg-n), [`min(arg, n)`](https://duckdb.org/docs/current/sql/functions/aggregates.html#minarg-n), [`arg_max(arg, val, n)`](https://duckdb.org/docs/current/sql/functions/aggregates.html#arg_maxarg-val-n), [`arg_min(arg, val, n)`](https://duckdb.org/docs/current/sql/functions/aggregates.html#arg_minarg-val-n), [`max_by(arg, val, n)`](https://duckdb.org/docs/current/sql/functions/aggregates.html#max_byarg-val-n) and [`min_by(arg, val, n)`](https://duckdb.org/docs/current/sql/functions/aggregates.html#min_byarg-val-n) to efficiently return the "top" `n` rows in a group based on a specific column in either ascending or descending order.

For example, let's use the following table:

```sql
SELECT * FROM t1;
```

```text
┌─────────┬───────┐
│   grp   │  val  │
│ varchar │ int32 │
├─────────┼───────┤
│ a       │     2 │
│ a       │     1 │
│ b       │     5 │
│ b       │     4 │
│ a       │     3 │
│ b       │     6 │
└─────────┴───────┘
```

We want to get a list of the top-3 `val` values in each group `grp`. The conventional way to do this is to use a window function in a subquery:

```sql
SELECT array_agg(rs.val), rs.grp
FROM
    (SELECT val, grp, row_number() OVER (PARTITION BY grp ORDER BY val DESC) AS rid
    FROM t1 ORDER BY val DESC) AS rs
WHERE rid < 4
GROUP BY rs.grp;
```

```text
┌───────────────────┬─────────┐
│ array_agg(rs.val) │   grp   │
│      int32[]      │ varchar │
├───────────────────┼─────────┤
│ [3, 2, 1]         │ a       │
│ [6, 5, 4]         │ b       │
└───────────────────┴─────────┘
```

But in DuckDB, we can do this much more concisely (and efficiently!):

```sql
SELECT max(val, 3) FROM t1 GROUP BY grp;
```

```text
┌─────────────┐
│ max(val, 3) │
│   int32[]   │
├─────────────┤
│ [3, 2, 1]   │
│ [6, 5, 4]   │
└─────────────┘
```

## Related Blog Posts

* [“Friendlier SQL with DuckDB”](https://duckdb.org/2022/05/04/friendlier-sql.html) blog post
* [“Even Friendlier SQL with DuckDB”](https://duckdb.org/2023/08/23/even-friendlier-sql.html) blog post
* [“SQL Gymnastics: Bending SQL into Flexible New Shapes”](https://duckdb.org/2024/03/01/sql-gymnastics.html) blog post
