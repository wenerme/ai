# DuckDB Environment

DuckDB provides a number of functions and `PRAGMA` options to retrieve information on the running DuckDB instance and its environment.

## Version

The `version()` function returns the version number of DuckDB.

```sql
SELECT version() AS version;
```


| version |
|-----------|
| vcurrent release |

Using a `PRAGMA`:

```sql
PRAGMA version;
```


| library_version | source_id  |
|-----------------|------------|
| vcurrent release | current release |

## Platform

The platform information consists of the operating system, system architecture, and, optionally, the compiler.
The platform is used when [installing extensions](https://duckdb.org/docs/current/extensions/extension_distribution.html#platforms).
To retrieve the platform, use the following `PRAGMA`:

```sql
PRAGMA platform;
```

On macOS, running on Apple Silicon architecture, the result is:

| platform  |
|-----------|
| osx_arm64 |

On Windows, running on an AMD64 architecture, the platform is `windows_amd64`.
On Ubuntu Linux, running on the ARM64 architecture, the platform is `linux_arm64`.

## Extensions

To get a list of DuckDB extensions and their status (e.g., `loaded`, `installed`), use the [`duckdb_extensions()` function](https://duckdb.org/docs/current/extensions/overview.html#listing-extensions):

```sql
SELECT *
FROM duckdb_extensions();
```

## Meta Table Functions

DuckDB has the following built-in table functions to obtain metadata about available catalog objects:

* [`duckdb_columns()`](https://duckdb.org/docs/current/sql/meta/duckdb_table_functions.html#duckdb_columns): columns
* [`duckdb_constraints()`](https://duckdb.org/docs/current/sql/meta/duckdb_table_functions.html#duckdb_constraints): constraints
* [`duckdb_databases()`](https://duckdb.org/docs/current/sql/meta/duckdb_table_functions.html#duckdb_databases): lists the databases that are accessible from within the current DuckDB process
* [`duckdb_dependencies()`](https://duckdb.org/docs/current/sql/meta/duckdb_table_functions.html#duckdb_dependencies): dependencies between objects
* [`duckdb_extensions()`](https://duckdb.org/docs/current/sql/meta/duckdb_table_functions.html#duckdb_extensions): extensions
* [`duckdb_functions()`](https://duckdb.org/docs/current/sql/meta/duckdb_table_functions.html#duckdb_functions): functions
* [`duckdb_indexes()`](https://duckdb.org/docs/current/sql/meta/duckdb_table_functions.html#duckdb_indexes): secondary indexes
* [`duckdb_keywords()`](https://duckdb.org/docs/current/sql/meta/duckdb_table_functions.html#duckdb_keywords): DuckDB's keywords and reserved words
* [`duckdb_optimizers()`](https://duckdb.org/docs/current/sql/meta/duckdb_table_functions.html#duckdb_optimizers): the available optimization rules in the DuckDB instance
* [`duckdb_schemas()`](https://duckdb.org/docs/current/sql/meta/duckdb_table_functions.html#duckdb_schemas): schemas
* [`duckdb_sequences()`](https://duckdb.org/docs/current/sql/meta/duckdb_table_functions.html#duckdb_sequences): sequences
* [`duckdb_settings()`](https://duckdb.org/docs/current/sql/meta/duckdb_table_functions.html#duckdb_settings): settings
* [`duckdb_tables()`](https://duckdb.org/docs/current/sql/meta/duckdb_table_functions.html#duckdb_tables): base tables
* [`duckdb_temporary_files()`](https://duckdb.org/docs/current/sql/meta/duckdb_table_functions.html#duckdb_temporary_files): the temporary files DuckDB has written to disk, to offload data from memory
* [`duckdb_types()`](https://duckdb.org/docs/current/sql/meta/duckdb_table_functions.html#duckdb_types): data types
* [`duckdb_views()`](https://duckdb.org/docs/current/sql/meta/duckdb_table_functions.html#duckdb_views): views
