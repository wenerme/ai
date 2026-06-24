---
name: sling-cli
description: Use when moving data between databases, files, or APIs with the sling CLI; configuring connections, writing replication YAML, running data pipelines, or troubleshooting sling run/conns commands
---

# Sling CLI Guide

You are a data integration expert. Use these patterns when working with the `sling` CLI for ETL/ELT tasks across databases, cloud storage, and APIs.

## Install

```bash
# macOS
brew install slingdata-io/tap/sling

# Linux / script
curl -LO 'https://github.com/slingdata-io/sling-cli/releases/latest/download/sling_linux_amd64.tar.gz'
tar xf sling_linux_amd64.tar.gz && mv sling /usr/local/bin/

sling update   # upgrade to latest
```

## Key Commands

```bash
# Ad-hoc data copy
sling run --src-conn PG_DB --src-stream public.users \
          --tgt-conn MYSQL_DB --tgt-object mysql.users \
          --mode full-refresh

# Run replication config file
sling run -r replication.yaml

# Run pipeline config file
sling run -p pipeline.yaml

# Debug mode
sling run -d -r replication.yaml
```

## Connection Management

```bash
# List connections
sling conns list

# Set connection (saved to ~/.sling/env.yaml)
sling conns set MY_PG url='postgresql://user:pass@host:5432/db'
sling conns set MY_S3 type=s3 bucket=my-bucket access_key_id=KEY secret_access_key=SECRET

# Test connection
sling conns test MY_PG

# Discover available streams (tables/files/endpoints)
sling conns discover MY_PG
sling conns discover MY_PG --pattern 'public.*' --columns

# Execute SQL
sling conns exec MY_PG "select count(*) from public.users"

# Remove connection
sling conns unset MY_PG
```

### Connection Config (`~/.sling/env.yaml`)

```yaml
connections:
  MY_POSTGRES:
    type: postgres
    host: localhost
    user: myuser
    database: mydb
    password: ${PG_PASSWORD}
    port: 5432

  MY_S3:
    type: s3
    bucket: my-bucket
    access_key_id: ${AWS_ACCESS_KEY_ID}
    secret_access_key: ${AWS_SECRET_ACCESS_KEY}

  MY_SNOWFLAKE:
    type: snowflake
    account: myaccount
    user: myuser
    password: ${SF_PASSWORD}
    database: mydb
    warehouse: compute_wh
    schema: public
```

Connections can also be set via env vars:
```bash
export MY_POSTGRES='postgresql://user:pass@host:5432/db'
export MY_S3='{type: s3, bucket: my-bucket, access_key_id: KEY, secret_access_key: SECRET}'
```

See [references/connections.md](references/connections.md) for all 40+ supported connection types.

## Replication YAML

```yaml
source: MY_POSTGRES
target: MY_SNOWFLAKE

defaults:
  mode: full-refresh
  target_options:
    add_new_columns: true

streams:
  # Simple full-refresh
  public.users: {}

  # Incremental by update_key
  public.orders:
    mode: incremental
    primary_key: [id]
    update_key: updated_at
    object: analytics.orders

  # Custom SQL
  public.events:
    sql: "SELECT * FROM public.events WHERE created_at > '{state.last_run_timestamp}'"
    mode: incremental
    update_key: created_at

  # Wildcard (each table → separate target)
  public.*:
    mode: full-refresh

  # Files
  file://data/*.csv:
    object: raw.csv_data
    mode: snapshot
```

## Modes

| Mode | Behavior |
|------|----------|
| `full-refresh` | Drop + recreate target table, load all data (default) |
| `incremental` | Load only new/changed rows via `update_key` |
| `truncate` | Truncate target then insert all rows |
| `snapshot` | Insert all rows, add `_sling_loaded_at` metadata |
| `backfill` | Historical load with `range` chunking |
| `definition-only` | Create table schema only, no data |
| `change-capture` | CDC mode (DB→DB only) |

**Auto-detect:** If `primary_key` or `update_key` present → `incremental`, else → `full-refresh`.

## Source Options

```yaml
source_options:
  # Files
  delimiter: ","
  header: true
  compression: gzip       # auto, gzip, zstd, snappy, none

  # Chunking (large tables)
  chunk_size: 1d          # 1d / 1w / 10000 (rows)
  chunk_count: 10
  range: '2024-01-01,2024-12-31'

  # JSON/API
  flatten: true
  jmespath: "data[].items"
  jq: ".results[]"

  # Type overrides
  columns:
    amount: 'decimal(18,4)'
    code: 'string'
  transforms: [trim_space]
```

## Target Options

```yaml
target_options:
  add_new_columns: true        # auto-add missing columns
  adjust_column_type: true     # widen column types as needed
  use_bulk: true               # use bulk loading (faster)
  file_max_rows: 500000        # rows per file (file targets)
  column_casing: snake         # lower / upper / snake / camel
  post_sql: "ANALYZE {table}"  # run after load
  compression: gzip            # output compression
  table_ddl: |
    CREATE TABLE {table} (id INT, name VARCHAR(255))
```

## Hooks

```yaml
hooks:
  start:
    - type: log
      message: "Starting {source.name} → {target.name}"
    - type: sql
      connection: MY_PG
      query: "UPDATE sync_log SET started_at = now() WHERE job = 'users'"
  end:
    - type: log
      message: "Completed. Rows: {stats.total_rows}"
```

## Environment Variables

```bash
SLING_HOME_DIR     # config home (default: ~/.sling)
SLING_TEMP_DIR     # temp dir for staging files
SLING_LOGGING      # log level: info/debug/warn/error
```

## Detailed References

- [Connection Types](references/connections.md) — all 40+ types with config keys
- [Replication Config](references/replication.md) — full schema reference
