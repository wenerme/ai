# Guides

The guides section contains compact how-to guides that are focused on achieving a single goal.
For API references and examples, see the rest of the documentation.

Note that there are many tools using DuckDB, which are not covered in the official guides.
To find a list of these tools, check out the [Awesome DuckDB repository](https://github.com/davidgasquez/awesome-duckdb).

> Tip For a short introductory tutorial, check out the [“Analyzing Railway Traffic in the Netherlands”](https://duckdb.org/2024/05/31/analyzing-railway-traffic-in-the-netherlands.html) tutorial.

## Data Import and Export

* [Data import overview](https://duckdb.org/docs/current/guides/file_formats/overview.html)
* [File access with the `file:` protocol](https://duckdb.org/docs/current/guides/file_formats/file_access.html)
* [Reading DuckDB databases](https://duckdb.org/docs/current/guides/file_formats/read_duckdb.html)

### CSV Files

* [How to load a CSV file into a table](https://duckdb.org/docs/current/guides/file_formats/csv_import.html)
* [How to export a table to a CSV file](https://duckdb.org/docs/current/guides/file_formats/csv_export.html)

### Parquet Files

* [How to load a Parquet file into a table](https://duckdb.org/docs/current/guides/file_formats/parquet_import.html)
* [How to export a table to a Parquet file](https://duckdb.org/docs/current/guides/file_formats/parquet_export.html)
* [How to run a query directly on a Parquet file](https://duckdb.org/docs/current/guides/file_formats/query_parquet.html)

### HTTP(S), S3 and GCP

* [How to authenticate to S3 / AWS](https://duckdb.org/docs/current/core_extensions/aws.html#configuration-and-authentication)
* [How to load a Parquet file directly from HTTP(S)](https://duckdb.org/docs/current/guides/network_cloud_storage/http_import.html)
* [How to load a Parquet file directly from S3](https://duckdb.org/docs/current/guides/network_cloud_storage/s3_import.html)
* [How to export a Parquet file to S3](https://duckdb.org/docs/current/guides/network_cloud_storage/s3_export.html)
* [How to load a Parquet file from S3 Express One](https://duckdb.org/docs/current/guides/network_cloud_storage/s3_express_one.html)
* [How to load a Parquet file directly from GCS](https://duckdb.org/docs/current/guides/network_cloud_storage/gcs_import.html)
* [How to load a Parquet file directly from Cloudflare R2](https://duckdb.org/docs/current/guides/network_cloud_storage/cloudflare_r2_import.html)
* [How to load an Iceberg table directly from S3](https://duckdb.org/docs/current/guides/network_cloud_storage/s3_iceberg_import.html)
* [How to connect to Amazon S3 Tables](https://duckdb.org/docs/current/core_extensions/iceberg/amazon_s3_tables.html)
* [How to connect to Amazon SageMaker Lakehouse (AWS Glue)](https://duckdb.org/docs/current/core_extensions/iceberg/amazon_sagemaker_lakehouse.html)

### JSON Files

* [How to load a JSON file into a table](https://duckdb.org/docs/current/guides/file_formats/json_import.html)
* [How to export a table to a JSON file](https://duckdb.org/docs/current/guides/file_formats/json_export.html)

### Excel Files with the Spatial Extension

* [How to load an Excel file into a table](https://duckdb.org/docs/current/guides/file_formats/excel_import.html)
* [How to export a table to an Excel file](https://duckdb.org/docs/current/guides/file_formats/excel_export.html)

### Querying Other Database Systems

* [How to directly query a MySQL database](https://duckdb.org/docs/current/guides/database_integration/mysql.html)
* [How to directly query a PostgreSQL database](https://duckdb.org/docs/current/guides/database_integration/postgres.html)
* [How to directly query a SQLite database](https://duckdb.org/docs/current/guides/database_integration/sqlite.html)
* [How to connect to Amazon RDS / Aurora with IAM authentication](https://duckdb.org/docs/current/guides/database_integration/rds_iam.html)

### Directly Reading Files

* [How to directly read a binary file](https://duckdb.org/docs/current/guides/file_formats/read_file.html#read_blob)
* [How to directly read a text file](https://duckdb.org/docs/current/guides/file_formats/read_file.html#read_text)

## Performance

* [My workload is slow (troubleshooting guide)](https://duckdb.org/docs/current/guides/performance/my_workload_is_slow.html)
* [How to design the schema for optimal performance](https://duckdb.org/docs/current/guides/performance/schema.html)
* [What is the ideal hardware environment for DuckDB](https://duckdb.org/docs/current/guides/performance/environment.html)
* [What performance implications do Parquet files and (compressed) CSV files have](https://duckdb.org/docs/current/guides/performance/file_formats.html)
* [How to tune workloads](https://duckdb.org/docs/current/guides/performance/how_to_tune_workloads.html)
* [Benchmarks](https://duckdb.org/docs/current/guides/performance/benchmarks.html)

## Meta Queries

* [How to list all tables](https://duckdb.org/docs/current/guides/meta/list_tables.html)
* [How to view the schema of the result of a query](https://duckdb.org/docs/current/guides/meta/describe.html)
* [How to quickly get a feel for a dataset using summarize](https://duckdb.org/docs/current/guides/meta/summarize.html)
* [How to view the query plan of a query](https://duckdb.org/docs/current/guides/meta/explain.html)
* [How to profile a query](https://duckdb.org/docs/current/guides/meta/explain_analyze.html)

## ODBC

* [How to set up an ODBC application (and more!)](https://duckdb.org/docs/current/guides/odbc/general.html)

## Python Client

* [How to install the Python client](https://duckdb.org/docs/current/guides/python/install.html)
* [How to execute SQL queries](https://duckdb.org/docs/current/guides/python/execute_sql.html)
* [How to easily query DuckDB in Jupyter Notebooks](https://duckdb.org/docs/current/guides/python/jupyter.html)
* [How to easily query DuckDB in marimo Notebooks](https://duckdb.org/docs/current/guides/python/marimo.html)
* [How to use Multiple Python Threads with DuckDB](https://duckdb.org/docs/current/guides/python/multiple_threads.html)
* [How to use fsspec filesystems with DuckDB](https://duckdb.org/docs/current/guides/python/filesystems.html)

### Pandas

* [How to execute SQL on a Pandas DataFrame](https://duckdb.org/docs/current/guides/python/sql_on_pandas.html)
* [How to create a table from a Pandas DataFrame](https://duckdb.org/docs/current/guides/python/import_pandas.html)
* [How to export data to a Pandas DataFrame](https://duckdb.org/docs/current/guides/python/export_pandas.html)

### Apache Arrow

* [How to execute SQL on Apache Arrow](https://duckdb.org/docs/current/guides/python/sql_on_arrow.html)
* [How to create a DuckDB table from Apache Arrow](https://duckdb.org/docs/current/guides/python/import_arrow.html)
* [How to export data to Apache Arrow](https://duckdb.org/docs/current/guides/python/export_arrow.html)

### Relational API

* [How to query Pandas DataFrames with the Relational API](https://duckdb.org/docs/current/guides/python/relational_api_pandas.html)

### Python Library Integrations

* [How to use Ibis to query DuckDB with or without SQL](https://duckdb.org/docs/current/guides/python/ibis.html)
* [How to use DuckDB with Polars DataFrames via Apache Arrow](https://duckdb.org/docs/current/guides/python/polars.html)
* [How to stream DuckDB query results to PyTorch via Apache Arrow](https://duckdb.org/docs/current/guides/python/pytorch.html)

## SQL Features

* [Friendly SQL](https://duckdb.org/docs/current/sql/dialect/friendly_sql.html)
* [As-of join](https://duckdb.org/docs/current/guides/sql_features/asof_join.html)
* [Full-text search](https://duckdb.org/docs/current/guides/sql_features/full_text_search.html)
* [Graph queries](https://duckdb.org/docs/current/guides/sql_features/graph_queries.html)
* [`query` and `query_table` functions](https://duckdb.org/docs/current/guides/sql_features/query_and_query_table_functions.html)

## SQL Editors and IDEs

* [How to set up the DBeaver SQL IDE](https://duckdb.org/docs/current/guides/sql_editors/dbeaver.html)

## Data Viewers

* [How to visualize DuckDB databases with Tableau](https://duckdb.org/docs/current/guides/data_viewers/tableau.html)
* [How to draw command-line plots with DuckDB and YouPlot](https://duckdb.org/docs/current/guides/data_viewers/youplot.html)
