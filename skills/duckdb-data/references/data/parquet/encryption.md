# Parquet Encryption

Starting with version 0.10.0, DuckDB supports reading and writing encrypted Parquet files.
DuckDB broadly follows the [Parquet Modular Encryption specification](https://github.com/apache/parquet-format/blob/master/Encryption.md) with some [limitations](#limitations).

## Reading and Writing Encrypted Files

Using the `PRAGMA add_parquet_key` function, named encryption keys of 128, 192, or 256 bits can be added to a session. These keys are stored in-memory:

```sql
PRAGMA add_parquet_key('key128', 'EXAMPLE_PARQUET_ENCRYPTION_KEY');
PRAGMA add_parquet_key('key192', 'EXAMPLE_PARQUET_ENCRYPTION_KEY');
PRAGMA add_parquet_key('key256', 'EXAMPLE_PARQUET_ENCRYPTION_KEY');
PRAGMA add_parquet_key('key256base64', 'EXAMPLE_PARQUET_ENCRYPTION_KEY');
```

### Writing Encrypted Parquet Files

After specifying the key (e.g., `key256`), files can be encrypted as follows:

```sql
COPY tbl TO 'tbl.parquet' (ENCRYPTION_CONFIG {footer_key: 'key256'});
```

### Reading Encrypted Parquet Files

An encrypted Parquet file using a specific key (e.g., `key256`), can then be read as follows:

```sql
COPY tbl FROM 'tbl.parquet' (ENCRYPTION_CONFIG {footer_key: 'key256'});
```

Or:

```sql
SELECT *
FROM read_parquet('tbl.parquet', encryption_config = {footer_key: 'key256'});
```

## Interoperability

DuckDB can read uniformly encrypted Parquet files written by the Arrow C++ API (e.g., via PyArrow), as long as the same encryption key is used for both the footer and all columns.

## Limitations

DuckDB's Parquet encryption currently has the following limitations.

DuckDB encrypts the footer and all columns using the `footer_key`. The Parquet specification allows encryption of individual columns with different keys, e.g.:

```sql
COPY tbl TO 'tbl.parquet'
    (ENCRYPTION_CONFIG {
        footer_key: 'key256',
        column_keys: {key256: ['col0', 'col1']}
    });
```

However, this is unsupported at the moment and will cause an error to be thrown (for now):

```console
Not implemented Error: Parquet encryption_config column_keys not yet implemented
```

## Performance Implications

Note that encryption has some performance implications.
Without encryption, reading/writing the `lineitem` table from [`TPC-H`](https://duckdb.org/docs/current/core_extensions/tpch.html) at SF1, which is 6M rows and 15 columns, from/to a Parquet file takes 0.26 and 0.99 seconds, respectively.
With encryption, this takes 0.64 and 2.21 seconds, both approximately 2.5× slower than the unencrypted version.
