# Core Extensions

## List of Core Extensions

| Name                                                                      | Description                                     | Maintainer       | Support tier                                                                  | Aliases                 |
| :------------------------------------------------------------------------ | :---------------------------------------------- | ---------------- | :--------------------------------------------------------------------------------- | :---------------------- |
| [autocomplete](https://duckdb.org/docs/current/core_extensions/autocomplete.html)   | Autocompletion for CLI client                   | DuckDB team | Secondary |                         |
| [avro](https://duckdb.org/docs/current/core_extensions/avro.html)                   | Avro files reading                              | DuckDB team | Secondary |                         |
| [aws](https://duckdb.org/docs/current/core_extensions/aws.html)                     | AWS S3 functionality                            | DuckDB team | Secondary |                         |
| [azure](https://duckdb.org/docs/current/core_extensions/azure.html)                 | Filesystem abstraction for Azure Blob Storage   | DuckDB team | Secondary |                         |
| [delta](https://duckdb.org/docs/current/core_extensions/delta.html)                 | Delta Lake format                               | DuckDB team | Secondary |                         |
| [ducklake](https://duckdb.org/docs/current/core_extensions/ducklake.html)           | DuckLake format                                 | DuckDB team | Secondary |                         |
| [encodings](https://duckdb.org/docs/current/core_extensions/encodings.html)         | Read CSVs in 1000+ encodings                    | DuckDB team | Secondary |                         |
| [excel](https://duckdb.org/docs/current/core_extensions/excel.html)                 | Excel (`.xlsx`) read/write                      | DuckDB team | Secondary |                         |
| [fts](https://duckdb.org/docs/current/core_extensions/full_text_search.html)        | Full-text search                                | DuckDB team | Secondary |                         |
| [httpfs](https://duckdb.org/docs/current/core_extensions/httpfs/overview.html)      | HTTP(S) and S3 - file read/write operations     | DuckDB team | Primary     | http, https, s3         |
| [iceberg](https://duckdb.org/docs/current/core_extensions/iceberg/overview.html)    | Apache Iceberg table format                     | DuckDB team | Secondary |                         |
| [icu](https://duckdb.org/docs/current/core_extensions/icu.html)                     | Time zones and collations using the ICU library | DuckDB team | Primary     |                         |
| [inet](https://duckdb.org/docs/current/core_extensions/inet.html)                   | IP-related data types and functions             | DuckDB team | Secondary |                         |
| [json](https://duckdb.org/docs/current/data/json/overview.html)                     | JSON operations                                 | DuckDB team | Primary     |                         |
| [lance](https://duckdb.org/docs/current/core_extensions/lance.html)                 | Lance tables read/write                         | Third party      |                                                                                    |                         |
| [motherduck](https://duckdb.org/docs/current/core_extensions/motherduck.html)       | MotherDuck connectivity                         | Third party      |                                                                                    | md                      |
| [mysql](https://duckdb.org/docs/current/core_extensions/mysql.html)                 | MySQL database read/write operations            | DuckDB team | Secondary | mysql_scanner           |
| [odbc](https://duckdb.org/docs/current/core_extensions/odbc/overview.html)          | ODBC connectivity                               | DuckDB team | Secondary | odbc_scanner            |
| [parquet](https://duckdb.org/docs/current/data/parquet/overview.html)               | Parquet files read/write                        | DuckDB team | Primary     |                         |
| [postgres](https://duckdb.org/docs/current/core_extensions/postgres/overview.html)  | PostgreSQL database read/write operations       | DuckDB team | Secondary | postgres_scanner        |
| [quack](https://duckdb.org/docs/current/core_extensions/quack.html)                 | DuckDB-Quack protocol for remote access         | DuckDB team | Secondary |                         |
| [spatial](https://duckdb.org/docs/current/core_extensions/spatial/overview.html)    | Geospatial data and functions                   | DuckDB team | Secondary |                         |
| [sqlite](https://duckdb.org/docs/current/core_extensions/sqlite.html)               | SQLite database read/write operations           | DuckDB team | Secondary | sqlite_scanner, sqlite3 |
| [tpcds](https://duckdb.org/docs/current/core_extensions/tpcds.html)                 | TPC-DS data generation and query                | DuckDB team | Secondary |                         |
| [tpch](https://duckdb.org/docs/current/core_extensions/tpch.html)                   | TPC-H data generation and query                 | DuckDB team | Secondary |                         |
| [unity_catalog](https://duckdb.org/docs/current/core_extensions/unity_catalog.html) | Unity Catalog connectivity                      | DuckDB team | Secondary | uc_catalog              |
| [ui](https://duckdb.org/docs/current/core_extensions/ui.html)                       | Local UI for DuckDB                             | Third party      |                                                                                    |                         |
| [vortex](https://duckdb.org/docs/current/core_extensions/vortex.html)               | Vortex files read/write                         | Third party      |                                                                                    |                         |
| [vss](https://duckdb.org/docs/current/core_extensions/vss.html)                     | Vector similarity search queries                | DuckDB team | Secondary |                         |

The **Maintainer** column denotes whether the extension is maintained by the DuckDB team or by a third party.
For the extensions maintained by the DuckDB team, the **Support tier** column denotes the extension's support status.
_Primary extensions_ are covered by [community support](https://ducklabs.com/community_support_policy/).
_Secondary extensions_ are supported on a best-effort basis. That said, they still receive frequent bugfixes/updates and are shipped with new DuckDB releases.
