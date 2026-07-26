# Spatial Extension

The `spatial` extension provides support for geospatial data processing in DuckDB.
For an overview of the extension, see our [blog post](https://duckdb.org/2023/04/28/spatial.html).

## Installing and Loading

To install the `spatial` extension, run:

```sql
INSTALL spatial;
```

Note that the `spatial` extension is not autoloadable.
Therefore, you need to load it before using it:

```sql
LOAD spatial;
```
