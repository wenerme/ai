# LOAD / INSTALL Statements

## `INSTALL`

The `INSTALL` statement downloads an extension so it can be loaded into a DuckDB session.

### Examples

Install the [`httpfs`](https://duckdb.org/docs/current/core_extensions/httpfs/overview.html) extension:

```sql
INSTALL httpfs;
```

Install the [`h3` community extension](https://duckdb.org/community_extensions/extensions/h3.html):

```sql
INSTALL h3 FROM community;
```

### Syntax

## `LOAD`

The `LOAD` statement loads an installed DuckDB extension into the current session.

### Examples

Load the [`httpfs`](https://duckdb.org/docs/current/core_extensions/httpfs/overview.html) extension:

```sql
LOAD httpfs;
```

Load the [`spatial`](https://duckdb.org/docs/current/core_extensions/spatial/overview.html) extension:

```sql
LOAD spatial;
```

### Syntax

