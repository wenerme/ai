# List Type

A `LIST` column encodes lists of values. Fields in the column can have values with different lengths, but they must all have the same underlying type. `LIST`s are typically used to store arrays of numbers, but can contain any uniform data type, including other `LIST`s and `STRUCT`s.

`LIST`s are similar to PostgreSQL's `ARRAY` type. DuckDB uses the `LIST` terminology, but some [`array_` functions](https://duckdb.org/docs/current/sql/functions/list.html) are provided for PostgreSQL compatibility.

See the [data types overview](https://duckdb.org/docs/current/sql/data_types/overview.html) for a comparison between nested data types.

> For storing fixed-length lists, DuckDB uses the [`ARRAY` type](https://duckdb.org/docs/current/sql/data_types/array.html).

## Creating Lists

Lists can be created using the [`list_value(expr, ...)`](https://duckdb.org/docs/current/sql/functions/list.html#list_valueany-) function or the equivalent bracket notation `[expr, ...]`. The expressions can be constants or arbitrary expressions. To create a list from a table column, use the [`list`](https://duckdb.org/docs/current/sql/functions/aggregates.html#general-aggregate-functions) aggregate function.

List of integers:

```sql
SELECT [1, 2, 3];
```

List of strings with a `NULL` value:

```sql
SELECT ['duck', 'goose', NULL, 'heron'];
```

List of lists with `NULL` values:

```sql
SELECT [['duck', 'goose', 'heron'], NULL, ['frog', 'toad'], []];
```

Create a list with the list_value function:

```sql
SELECT list_value(1, 2, 3);
```

Create a table with an `INTEGER` list column and a `VARCHAR` list column:

```sql
CREATE TABLE list_table (int_list INTEGER[], varchar_list VARCHAR[]);
```

## Retrieving from Lists

Retrieving one or more values from a list can be accomplished using brackets and slicing notation, or through [list functions](https://duckdb.org/docs/current/sql/functions/list.html) like `list_extract`. Multiple equivalent functions are provided as aliases for compatibility with systems that refer to lists as arrays. For example, the function `array_slice`.

<!-- markdownlint-disable MD052 -->

| Example                                  | Result     |
|:-----------------------------------------|:-----------|
| SELECT ['a', 'b', 'c'][3]                | 'c'        |
| SELECT ['a', 'b', 'c'][-1]               | 'c'        |
| SELECT ['a', 'b', 'c'][2 + 1]            | 'c'        |
| SELECT list_extract(['a', 'b', 'c'], 3)  | 'c'        |
| SELECT ['a', 'b', 'c'][1:2]              | ['a', 'b'] |
| SELECT ['a', 'b', 'c'][:2]               | ['a', 'b'] |
| SELECT ['a', 'b', 'c'][-2:]              | ['b', 'c'] |
| SELECT list_slice(['a', 'b', 'c'], 2, 3) | ['b', 'c'] |

<!-- markdownlint-disable MD052 -->

## Comparison and Ordering

The `LIST` type can be compared using all the [comparison operators](https://duckdb.org/docs/current/sql/expressions/comparison_operators.html).
These comparisons can be used in [logical expressions](https://duckdb.org/docs/current/sql/expressions/logical_operators.html)
such as `WHERE` and `HAVING` clauses, and return [`BOOLEAN` values](https://duckdb.org/docs/current/sql/data_types/boolean.html).

The `LIST` ordering is defined positionally using the following rules, where `min_len = min(len(l1), len(l2))`.

* **Equality.** `l1` and `l2` are equal, if for each `i` in `[1, min_len]`: `l1[i] = l2[i]`.
* **Less Than**. For the first index `i` in `[1, min_len]` where `l1[i] != l2[i]`:
  If `l1[i] < l2[i]`, `l1` is less than `l2`.

`NULL` values are compared following PostgreSQL's semantics.
Lower nesting levels are used for tie-breaking.

Here are some queries returning `true` for the comparison.

```sql
SELECT [1, 2] < [1, 3] AS result;
```

```sql
SELECT [[1], [2, 4, 5]] < [[2]] AS result;
```

```sql
SELECT [ ] < [1] AS result;
```

These queries return `false`.

```sql
SELECT [ ] < [ ] AS result;
```

```sql
SELECT [1, 2] < [1] AS result;
```

These queries return `NULL`.

```sql
SELECT [1, 2] < [1, NULL, 4] AS result;
```

## Functions

See [List Functions](https://duckdb.org/docs/current/sql/functions/list.html).
