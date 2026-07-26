# Data Import

## Recommended Import Methods

When importing data from other systems to DuckDB, there are several considerations to take into account.
We recommend importing using the following order:

1. For systems which are supported by a DuckDB scanner extension, it's preferable to use the scanner. DuckDB currently offers scanners for [MySQL](https://duckdb.org/docs/current/guides/database_integration/mysql.html), [PostgreSQL](https://duckdb.org/docs/current/guides/database_integration/postgres.html) and [SQLite](https://duckdb.org/docs/current/guides/database_integration/sqlite.html), as well as a generic [ODBC scanner](https://duckdb.org/docs/current/core_extensions/odbc/overview.html).
2. If there is a bulk export feature in the data source system, export the data to Parquet or CSV format, then load it using DuckDB's [Parquet](https://duckdb.org/docs/current/guides/file_formats/parquet_import.html) or [CSV loader](https://duckdb.org/docs/current/guides/file_formats/csv_import.html).
3. If the approaches above are not applicable, consider using the DuckDB [appender](https://duckdb.org/docs/current/data/appender.html), currently available in the C, C++, Go, Java, and Rust APIs.

## Methods to Avoid

If possible, avoid looping row-by-row (tuple-at-a-time) in favor of bulk operations.
Performing row-by-row inserts (even with prepared statements) is detrimental to performance and will result in slow load times.

> Bestpractice Unless your data is small (<100k rows), avoid using inserts in loops.
