# Sling Connection Types Reference

## Database Connections (24 types)

| Type | Key | Notes |
|------|-----|-------|
| `postgres` | host, port, user, password, database, schema | Also accepts `url=` |
| `mysql` | host, port, user, password, database | |
| `mariadb` | host, port, user, password, database | |
| `sqlserver` | host, port, user, password, database | |
| `oracle` | host, port, user, password, sid/service | |
| `sqlite` | path | Local file path |
| `snowflake` | account, user, password, database, warehouse, schema, role | |
| `bigquery` | project, dataset, credentials_file / credentials_json | |
| `redshift` | host, port, user, password, database | |
| `databricks` | host, token, http_path, catalog, schema | |
| `clickhouse` | host, port, user, password, database | |
| `duckdb` | path | Local file or `:memory:` |
| `motherduck` | token, database | MotherDuck cloud |
| `starrocks` | host, port, user, password, database | |
| `trino` | host, port, user, password, catalog, schema | |
| `proton` | host, port, user, password | Timeplus Proton |
| `mongodb` | host, port, user, password, database | |
| `elasticsearch` | host, port, user, password | |
| `prometheus` | host, port | |
| `azuretable` | account, key | Azure Table Storage |
| `bigtable` | project, instance, credentials_file | |
| `exasol` | host, port, user, password, schema | |
| `d1` | account_id, database_id, api_token | Cloudflare D1 |

## File / Storage Connections (13 types)

| Type | Key | Notes |
|------|-----|-------|
| `s3` | bucket, access_key_id, secret_access_key, region | |
| `gs` | bucket, credentials_file / credentials_json | Google Cloud Storage |
| `azure` | account, key/sas_token, container | Azure Blob Storage |
| `minio` | endpoint, bucket, access_key_id, secret_access_key | |
| `spaces` | endpoint, bucket, access_key_id, secret_access_key | DigitalOcean |
| `r2` | endpoint, bucket, access_key_id, secret_access_key | Cloudflare R2 |
| `wasabi` | bucket, access_key_id, secret_access_key | |
| `b2` | bucket, application_key_id, application_key | Backblaze B2 |
| `ftp` | host, port, user, password | |
| `sftp` | host, port, user, password/ssh_key | |
| `googledrive` | credentials_file, folder_id | |
| `local` | path (optional) | Local filesystem |

## Datalake Connections (4 types)

| Type | Key | Notes |
|------|-----|-------|
| `athena` | region, s3_staging_dir, access_key_id, secret_access_key, database | |
| `ducklake` | path | DuckLake catalog |
| `iceberg` | catalog_type, catalog_uri, warehouse | Apache Iceberg |

## API Connections

```yaml
MY_API:
  type: api
  spec: /path/to/api-spec.yaml    # YAML spec file defining endpoints
  base_url: https://api.example.com
  headers:
    Authorization: "Bearer ${API_TOKEN}"
```

## URL Format Support

Many database types accept a `url` property instead of individual fields:

```bash
# These are equivalent:
sling conns set MY_PG url='postgresql://user:pass@host:5432/db'
sling conns set MY_PG type=postgres host=host port=5432 user=user password=pass database=db
```

## Priority Order (last wins)

1. Built-in `LOCAL` file connection
2. DBT profiles (`~/.dbt/profiles.yml`)
3. Sling env file (`~/.sling/env.yaml`)
4. `ENV_YAML` environment variable (YAML/JSON content)
5. Individual environment variables (URL or JSON format)
6. Project `.env.sling` file
