# Limits

This page contains DuckDB's built-in limit values.
To check the value of a setting on your system, use the `current_setting` function.

## Limit Values

| Limit | Default value | Configuration option | Comment |
|---|---|---|---|
| Array size | 100000 | - | |
| BLOB size | 4 GB | - | |
| Expression depth | 1000 | [`max_expression_depth`](https://duckdb.org/docs/current/configuration/overview.html) | |
| Memory allocation for a vector | 128 GB | - | |
| Memory use | 80% of RAM | [`memory_limit`](https://duckdb.org/docs/current/configuration/pragmas.html#memory-limit) | Note: This limit only applies to the buffer manager. |
| String size | 4 GB | - | |
| Temporary directory size | unlimited | [`max_temp_directory_size`](https://duckdb.org/docs/current/configuration/overview.html) | |

## Size of Database Files

DuckDB doesn't have a practical limit for the size of a single DuckDB database file.
We have database files using 15 TB+ of disk space and they work fine.
However, connecting to such a huge database may take a few seconds and [checkpointing](https://duckdb.org/docs/current/sql/statements/checkpoint.html) can be slower.
