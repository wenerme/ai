# Sling Replication Config Reference

## Full Schema

```yaml
# replication.yaml
source: <CONNECTION_NAME_OR_URL>
target: <CONNECTION_NAME_OR_URL>

# Applied to all streams unless overridden
defaults:
  mode: full-refresh | incremental | truncate | snapshot | backfill | definition-only | change-capture
  object: <target_schema.table>
  primary_key: [col1, col2]
  update_key: updated_at
  select: [col1, col2, col3]        # columns to select (empty = all)
  where: "status = 'active'"        # WHERE clause
  sql: "SELECT ..."                 # custom SQL (overrides select/where)
  disabled: false
  single: false                     # treat wildcard as single stream
  source_options:
    # ... see Source Options below
  target_options:
    # ... see Target Options below

hooks:
  start:
    - type: log | sql | bash | http
      # see Hooks section
  pre_stream:
    - ...
  post_stream:
    - ...
  end:
    - ...

env:
  MY_VAR: value                     # available as {env.MY_VAR} in templates

streams:
  schema.table_name:
    # any ReplicationStreamConfig fields, inherits defaults
    {}

  schema.*:                         # wildcard — one stream per matched object
    mode: full-refresh

  file://path/to/data.csv:
    object: target_schema.table
    
  http://api.example.com/data:
    object: raw.api_data
    source_options:
      flatten: true
```

## Stream Config Fields

| Field | Type | Description |
|-------|------|-------------|
| `mode` | string | Load mode (see Modes table) |
| `object` | string | Target table/file path |
| `primary_key` | list\|string | Primary key column(s) for dedup |
| `update_key` | string | Watermark column for incremental |
| `sql` | string | Custom SQL query (overrides stream name) |
| `select` | list | Columns to select (`[]` = none) |
| `where` | string | SQL WHERE filter |
| `columns` | map | Type overrides: `{col: 'decimal(10,4)'}` |
| `transforms` | list | Row transforms: `[trim_space]` |
| `disabled` | bool | Skip this stream |
| `single` | bool | Don't expand wildcard |
| `source_options` | object | Source-specific config |
| `target_options` | object | Target-specific config |

## Source Options

| Key | Type | Description |
|-----|------|-------------|
| `range` | string | Date/value range `'2024-01-01,2024-12-31'` |
| `chunk_size` | string/int | `1d` / `1w` / row count |
| `chunk_count` | int | Max chunks |
| `chunk_expr` | string | Custom chunking expression |
| `delimiter` | string | CSV delimiter (default `,`) |
| `escape` | string | CSV escape char |
| `quote` | string | CSV quote char |
| `header` | bool | Has header row (default `true`) |
| `compression` | string | `auto` / `gzip` / `zstd` / `snappy` / `none` |
| `format` | string | `csv` / `json` / `parquet` / `avro` |
| `flatten` | bool | Flatten nested JSON/API response |
| `jmespath` | string | JMESPath expression for JSON |
| `jq` | string | jq filter for JSON |
| `max_decimals` | int | Decimal precision |
| `columns` | map | Force column types |
| `transforms` | list | Apply transforms |

## Target Options

| Key | Type | Description |
|-----|------|-------------|
| `add_new_columns` | bool | Auto-add missing columns (default `false`) |
| `adjust_column_type` | bool | Widen column types (default `false`) |
| `use_bulk` | bool | Use bulk loading (default `true`) |
| `file_max_rows` | int | Max rows per output file |
| `file_max_bytes` | int | Max bytes per output file |
| `compression` | string | Output compression |
| `format` | string | Output format for file targets |
| `column_casing` | string | `lower` / `upper` / `snake` / `camel` |
| `table_ddl` | string | Custom CREATE TABLE DDL |
| `table_tmp` | string | Custom temp table name |
| `pre_sql` | string | SQL before load |
| `post_sql` | string | SQL after load |
| `merge_strategy` | string | Merge strategy for incremental |
| `direct_insert` | bool | Skip staging, insert directly |

## Hooks

```yaml
hooks:
  start:             # once, before all streams
  pre_stream:        # before each stream  
  post_stream:       # after each stream
  end:               # once, after all streams

# Hook action types:
- type: log
  message: "text with {source.name} {stats.total_rows}"

- type: sql
  connection: MY_PG
  query: "UPDATE log SET ts = now()"

- type: bash
  command: "echo done"

- type: http
  url: https://hooks.example.com/notify
  method: POST
  payload: '{"rows": {stats.total_rows}}'
```

## Template Variables

Available in `sql`, `message`, `command`, `query`, `payload`, and `object`:

| Variable | Value |
|----------|-------|
| `{source.name}` | Source connection name |
| `{target.name}` | Target connection name |
| `{stream.name}` | Current stream name |
| `{stream.object}` | Target object name |
| `{stats.total_rows}` | Rows processed |
| `{state.last_run_timestamp}` | Last incremental watermark |
| `{env.MY_VAR}` | From `env:` block |
| `{_sling_loaded_at}` | Load timestamp (snapshot mode) |

## Common Patterns

### DB → DB incremental

```yaml
source: PG_PROD
target: SNOWFLAKE_DW

defaults:
  mode: incremental
  target_options:
    add_new_columns: true

streams:
  public.orders:
    primary_key: [id]
    update_key: updated_at
    object: raw.orders
```

### DB → S3 as Parquet

```yaml
source: PG_PROD
target: MY_S3

streams:
  public.users:
    object: s3://my-bucket/users/data.parquet
    target_options:
      format: parquet
      compression: snappy
      file_max_rows: 1000000
```

### Files → DB bulk load

```yaml
source: local
target: PG_STAGING

streams:
  file:///data/exports/*.csv:
    object: staging.csv_import
    mode: truncate
    source_options:
      delimiter: "|"
      header: true
```
