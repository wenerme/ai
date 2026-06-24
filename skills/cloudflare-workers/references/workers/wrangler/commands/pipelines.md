---
title: Pipelines
description: Wrangler commands for managing Cloudflare Pipelines.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop)

# Pipelines

Manage your [Pipelines](https://developers.cloudflare.com/pipelines/) using Wrangler.

For `get` commands in the Pipelines namespace (`pipelines get`, `pipelines streams get`, and `pipelines sinks get`), you can pass either a resource ID or resource name.

## `pipelines setup`

Interactive setup for a complete pipeline

* [  npm ](#tab-panel-12497)
* [  pnpm ](#tab-panel-12498)
* [  yarn ](#tab-panel-12499)

Terminal window

```
npx wrangler pipelines setup
```

Terminal window

```
pnpm wrangler pipelines setup
```

Terminal window

```
yarn wrangler pipelines setup
```

* `--name` ` string `
Pipeline name

Global flags

* `--v` ` boolean ` alias: --version
Show version number
* `--cwd` ` string `
Run as if Wrangler was started in the specified directory instead of the current working directory
* `--config` ` string ` alias: --c
Path to Wrangler configuration file
* `--env` ` string ` alias: --e
Environment to use for operations, and for selecting .env and .dev.vars files
* `--env-file` ` string `
Path to an .env file to load - can be specified multiple times - values from earlier files are overridden by values in later files
* `--experimental-provision` ` boolean ` aliases: --x-provision default: true
Experimental: Enable automatic resource provisioning
* `--experimental-auto-create` ` boolean ` alias: --x-auto-create default: true
Automatically provision draft bindings with new resources
* `--install-skills` ` boolean ` default: false
Install Cloudflare agents skills, if not already present, without asking the user for confirmation

## `pipelines create`

Create a new pipeline

* [  npm ](#tab-panel-12500)
* [  pnpm ](#tab-panel-12501)
* [  yarn ](#tab-panel-12502)

Terminal window

```
npx wrangler pipelines create [PIPELINE]
```

Terminal window

```
pnpm wrangler pipelines create [PIPELINE]
```

Terminal window

```
yarn wrangler pipelines create [PIPELINE]
```

* `[PIPELINE]` ` string ` required
The name of the pipeline to create
* `--sql` ` string `
Inline SQL query for the pipeline
* `--sql-file` ` string `
Path to file containing SQL query for the pipeline

Global flags

* `--v` ` boolean ` alias: --version
Show version number
* `--cwd` ` string `
Run as if Wrangler was started in the specified directory instead of the current working directory
* `--config` ` string ` alias: --c
Path to Wrangler configuration file
* `--env` ` string ` alias: --e
Environment to use for operations, and for selecting .env and .dev.vars files
* `--env-file` ` string `
Path to an .env file to load - can be specified multiple times - values from earlier files are overridden by values in later files
* `--experimental-provision` ` boolean ` aliases: --x-provision default: true
Experimental: Enable automatic resource provisioning
* `--experimental-auto-create` ` boolean ` alias: --x-auto-create default: true
Automatically provision draft bindings with new resources
* `--install-skills` ` boolean ` default: false
Install Cloudflare agents skills, if not already present, without asking the user for confirmation

## `pipelines list`

List all pipelines

* [  npm ](#tab-panel-12503)
* [  pnpm ](#tab-panel-12504)
* [  yarn ](#tab-panel-12505)

Terminal window

```
npx wrangler pipelines list
```

Terminal window

```
pnpm wrangler pipelines list
```

Terminal window

```
yarn wrangler pipelines list
```

* `--page` ` number ` default: 1
Page number for pagination
* `--per-page` ` number ` default: 20
Number of pipelines per page
* `--json` ` boolean ` default: false
Output in JSON format

Global flags

* `--v` ` boolean ` alias: --version
Show version number
* `--cwd` ` string `
Run as if Wrangler was started in the specified directory instead of the current working directory
* `--config` ` string ` alias: --c
Path to Wrangler configuration file
* `--env` ` string ` alias: --e
Environment to use for operations, and for selecting .env and .dev.vars files
* `--env-file` ` string `
Path to an .env file to load - can be specified multiple times - values from earlier files are overridden by values in later files
* `--experimental-provision` ` boolean ` aliases: --x-provision default: true
Experimental: Enable automatic resource provisioning
* `--experimental-auto-create` ` boolean ` alias: --x-auto-create default: true
Automatically provision draft bindings with new resources
* `--install-skills` ` boolean ` default: false
Install Cloudflare agents skills, if not already present, without asking the user for confirmation

## `pipelines get`

Get details about a specific pipeline

* [  npm ](#tab-panel-12506)
* [  pnpm ](#tab-panel-12507)
* [  yarn ](#tab-panel-12508)

Terminal window

```
npx wrangler pipelines get [PIPELINE]
```

Terminal window

```
pnpm wrangler pipelines get [PIPELINE]
```

Terminal window

```
yarn wrangler pipelines get [PIPELINE]
```

* `[PIPELINE]` ` string ` required
The ID or name of the pipeline to retrieve
* `--json` ` boolean ` default: false
Output in JSON format

Global flags

* `--v` ` boolean ` alias: --version
Show version number
* `--cwd` ` string `
Run as if Wrangler was started in the specified directory instead of the current working directory
* `--config` ` string ` alias: --c
Path to Wrangler configuration file
* `--env` ` string ` alias: --e
Environment to use for operations, and for selecting .env and .dev.vars files
* `--env-file` ` string `
Path to an .env file to load - can be specified multiple times - values from earlier files are overridden by values in later files
* `--experimental-provision` ` boolean ` aliases: --x-provision default: true
Experimental: Enable automatic resource provisioning
* `--experimental-auto-create` ` boolean ` alias: --x-auto-create default: true
Automatically provision draft bindings with new resources
* `--install-skills` ` boolean ` default: false
Install Cloudflare agents skills, if not already present, without asking the user for confirmation

## `pipelines update`

Update a pipeline configuration (legacy pipelines only)

* [  npm ](#tab-panel-12509)
* [  pnpm ](#tab-panel-12510)
* [  yarn ](#tab-panel-12511)

Terminal window

```
npx wrangler pipelines update [PIPELINE]
```

Terminal window

```
pnpm wrangler pipelines update [PIPELINE]
```

Terminal window

```
yarn wrangler pipelines update [PIPELINE]
```

* `[PIPELINE]` ` string ` required
The name of the legacy pipeline to update
* `--source` ` array `
Space separated list of allowed sources. Options are 'http' or 'worker'
* `--require-http-auth` ` boolean `
Require Cloudflare API Token for HTTPS endpoint authentication
* `--cors-origins` ` array `
CORS origin allowlist for HTTP endpoint (use \* for any origin). Defaults to an empty array
* `--batch-max-mb` ` number `
Maximum batch size in megabytes before flushing. Defaults to 100 MB if unset. Minimum: 1, Maximum: 100
* `--batch-max-rows` ` number `
Maximum number of rows per batch before flushing. Defaults to 10,000,000 if unset. Minimum: 100, Maximum: 10,000,000
* `--batch-max-seconds` ` number `
Maximum age of batch in seconds before flushing. Defaults to 300 if unset. Minimum: 1, Maximum: 300
* `--r2-bucket` ` string `
Destination R2 bucket name
* `--r2-access-key-id` ` string `
R2 service Access Key ID for authentication. Leave empty for OAuth confirmation.
* `--r2-secret-access-key` ` string `
R2 service Secret Access Key for authentication. Leave empty for OAuth confirmation.
* `--r2-prefix` ` string `
Prefix for storing files in the destination bucket. Default is no prefix
* `--compression` ` string `
Compression format for output files
* `--shard-count` ` number `
Number of shards for the pipeline. More shards handle higher request volume; fewer shards produce larger output files. Defaults to 2 if unset. Minimum: 1, Maximum: 15

Global flags

* `--v` ` boolean ` alias: --version
Show version number
* `--cwd` ` string `
Run as if Wrangler was started in the specified directory instead of the current working directory
* `--config` ` string ` alias: --c
Path to Wrangler configuration file
* `--env` ` string ` alias: --e
Environment to use for operations, and for selecting .env and .dev.vars files
* `--env-file` ` string `
Path to an .env file to load - can be specified multiple times - values from earlier files are overridden by values in later files
* `--experimental-provision` ` boolean ` aliases: --x-provision default: true
Experimental: Enable automatic resource provisioning
* `--experimental-auto-create` ` boolean ` alias: --x-auto-create default: true
Automatically provision draft bindings with new resources
* `--install-skills` ` boolean ` default: false
Install Cloudflare agents skills, if not already present, without asking the user for confirmation

## `pipelines delete`

Delete a pipeline

* [  npm ](#tab-panel-12512)
* [  pnpm ](#tab-panel-12513)
* [  yarn ](#tab-panel-12514)

Terminal window

```
npx wrangler pipelines delete [PIPELINE]
```

Terminal window

```
pnpm wrangler pipelines delete [PIPELINE]
```

Terminal window

```
yarn wrangler pipelines delete [PIPELINE]
```

* `[PIPELINE]` ` string ` required
The ID or name of the pipeline to delete
* `--force` ` boolean ` alias: --y default: false
Skip confirmation

Global flags

* `--v` ` boolean ` alias: --version
Show version number
* `--cwd` ` string `
Run as if Wrangler was started in the specified directory instead of the current working directory
* `--config` ` string ` alias: --c
Path to Wrangler configuration file
* `--env` ` string ` alias: --e
Environment to use for operations, and for selecting .env and .dev.vars files
* `--env-file` ` string `
Path to an .env file to load - can be specified multiple times - values from earlier files are overridden by values in later files
* `--experimental-provision` ` boolean ` aliases: --x-provision default: true
Experimental: Enable automatic resource provisioning
* `--experimental-auto-create` ` boolean ` alias: --x-auto-create default: true
Automatically provision draft bindings with new resources
* `--install-skills` ` boolean ` default: false
Install Cloudflare agents skills, if not already present, without asking the user for confirmation

## `pipelines streams create`

Create a new stream

* [  npm ](#tab-panel-12515)
* [  pnpm ](#tab-panel-12516)
* [  yarn ](#tab-panel-12517)

Terminal window

```
npx wrangler pipelines streams create [STREAM]
```

Terminal window

```
pnpm wrangler pipelines streams create [STREAM]
```

Terminal window

```
yarn wrangler pipelines streams create [STREAM]
```

* `[STREAM]` ` string ` required
The name of the stream to create
* `--schema-file` ` string `
Path to JSON file containing stream schema
* `--http-enabled` ` boolean ` default: true
Enable HTTP endpoint
* `--http-auth` ` boolean ` default: true
Require authentication for HTTP endpoint
* `--cors-origin` ` string `
CORS origin

Global flags

* `--v` ` boolean ` alias: --version
Show version number
* `--cwd` ` string `
Run as if Wrangler was started in the specified directory instead of the current working directory
* `--config` ` string ` alias: --c
Path to Wrangler configuration file
* `--env` ` string ` alias: --e
Environment to use for operations, and for selecting .env and .dev.vars files
* `--env-file` ` string `
Path to an .env file to load - can be specified multiple times - values from earlier files are overridden by values in later files
* `--experimental-provision` ` boolean ` aliases: --x-provision default: true
Experimental: Enable automatic resource provisioning
* `--experimental-auto-create` ` boolean ` alias: --x-auto-create default: true
Automatically provision draft bindings with new resources
* `--install-skills` ` boolean ` default: false
Install Cloudflare agents skills, if not already present, without asking the user for confirmation

## `pipelines streams list`

List all streams

* [  npm ](#tab-panel-12518)
* [  pnpm ](#tab-panel-12519)
* [  yarn ](#tab-panel-12520)

Terminal window

```
npx wrangler pipelines streams list
```

Terminal window

```
pnpm wrangler pipelines streams list
```

Terminal window

```
yarn wrangler pipelines streams list
```

* `--page` ` number ` default: 1
Page number for pagination
* `--per-page` ` number ` default: 20
Number of streams per page
* `--pipeline-id` ` string `
Filter streams by pipeline ID
* `--json` ` boolean ` default: false
Output in JSON format

Global flags

* `--v` ` boolean ` alias: --version
Show version number
* `--cwd` ` string `
Run as if Wrangler was started in the specified directory instead of the current working directory
* `--config` ` string ` alias: --c
Path to Wrangler configuration file
* `--env` ` string ` alias: --e
Environment to use for operations, and for selecting .env and .dev.vars files
* `--env-file` ` string `
Path to an .env file to load - can be specified multiple times - values from earlier files are overridden by values in later files
* `--experimental-provision` ` boolean ` aliases: --x-provision default: true
Experimental: Enable automatic resource provisioning
* `--experimental-auto-create` ` boolean ` alias: --x-auto-create default: true
Automatically provision draft bindings with new resources
* `--install-skills` ` boolean ` default: false
Install Cloudflare agents skills, if not already present, without asking the user for confirmation

## `pipelines streams get`

Get details about a specific stream

* [  npm ](#tab-panel-12521)
* [  pnpm ](#tab-panel-12522)
* [  yarn ](#tab-panel-12523)

Terminal window

```
npx wrangler pipelines streams get [STREAM]
```

Terminal window

```
pnpm wrangler pipelines streams get [STREAM]
```

Terminal window

```
yarn wrangler pipelines streams get [STREAM]
```

* `[STREAM]` ` string ` required
The ID or name of the stream to retrieve
* `--json` ` boolean ` default: false
Output in JSON format

Global flags

* `--v` ` boolean ` alias: --version
Show version number
* `--cwd` ` string `
Run as if Wrangler was started in the specified directory instead of the current working directory
* `--config` ` string ` alias: --c
Path to Wrangler configuration file
* `--env` ` string ` alias: --e
Environment to use for operations, and for selecting .env and .dev.vars files
* `--env-file` ` string `
Path to an .env file to load - can be specified multiple times - values from earlier files are overridden by values in later files
* `--experimental-provision` ` boolean ` aliases: --x-provision default: true
Experimental: Enable automatic resource provisioning
* `--experimental-auto-create` ` boolean ` alias: --x-auto-create default: true
Automatically provision draft bindings with new resources
* `--install-skills` ` boolean ` default: false
Install Cloudflare agents skills, if not already present, without asking the user for confirmation

## `pipelines streams delete`

Delete a stream

* [  npm ](#tab-panel-12524)
* [  pnpm ](#tab-panel-12525)
* [  yarn ](#tab-panel-12526)

Terminal window

```
npx wrangler pipelines streams delete [STREAM]
```

Terminal window

```
pnpm wrangler pipelines streams delete [STREAM]
```

Terminal window

```
yarn wrangler pipelines streams delete [STREAM]
```

* `[STREAM]` ` string ` required
The ID or name of the stream to delete
* `--force` ` boolean ` alias: --y default: false
Skip confirmation

Global flags

* `--v` ` boolean ` alias: --version
Show version number
* `--cwd` ` string `
Run as if Wrangler was started in the specified directory instead of the current working directory
* `--config` ` string ` alias: --c
Path to Wrangler configuration file
* `--env` ` string ` alias: --e
Environment to use for operations, and for selecting .env and .dev.vars files
* `--env-file` ` string `
Path to an .env file to load - can be specified multiple times - values from earlier files are overridden by values in later files
* `--experimental-provision` ` boolean ` aliases: --x-provision default: true
Experimental: Enable automatic resource provisioning
* `--experimental-auto-create` ` boolean ` alias: --x-auto-create default: true
Automatically provision draft bindings with new resources
* `--install-skills` ` boolean ` default: false
Install Cloudflare agents skills, if not already present, without asking the user for confirmation

## `pipelines sinks create`

Create a new sink

* [  npm ](#tab-panel-12527)
* [  pnpm ](#tab-panel-12528)
* [  yarn ](#tab-panel-12529)

Terminal window

```
npx wrangler pipelines sinks create [SINK]
```

Terminal window

```
pnpm wrangler pipelines sinks create [SINK]
```

Terminal window

```
yarn wrangler pipelines sinks create [SINK]
```

* `[SINK]` ` string ` required
The name of the sink to create
* `--type` ` string ` required
The type of sink to create
* `--bucket` ` string ` required
R2 bucket name
* `--format` ` string ` default: parquet
Output format
* `--compression` ` string ` default: zstd
Compression method (parquet only)
* `--target-row-group-size` ` string `
Target row group size for parquet format
* `--path` ` string `
The base prefix in your bucket where data will be written
* `--partitioning` ` string `
Time partition pattern (r2 sinks only)
* `--roll-size` ` number `
Roll file size in MB
* `--roll-interval` ` number ` default: 300
Roll file interval in seconds
* `--access-key-id` ` string `
R2 access key ID (leave empty for R2 credentials to be automatically created)
* `--secret-access-key` ` string `
R2 secret access key (leave empty for R2 credentials to be automatically created)
* `--namespace` ` string `
Data catalog namespace (required for r2-data-catalog)
* `--table` ` string `
Table name within namespace (required for r2-data-catalog)
* `--catalog-token` ` string `
Authentication token for data catalog (required for r2-data-catalog)

Global flags

* `--v` ` boolean ` alias: --version
Show version number
* `--cwd` ` string `
Run as if Wrangler was started in the specified directory instead of the current working directory
* `--config` ` string ` alias: --c
Path to Wrangler configuration file
* `--env` ` string ` alias: --e
Environment to use for operations, and for selecting .env and .dev.vars files
* `--env-file` ` string `
Path to an .env file to load - can be specified multiple times - values from earlier files are overridden by values in later files
* `--experimental-provision` ` boolean ` aliases: --x-provision default: true
Experimental: Enable automatic resource provisioning
* `--experimental-auto-create` ` boolean ` alias: --x-auto-create default: true
Automatically provision draft bindings with new resources
* `--install-skills` ` boolean ` default: false
Install Cloudflare agents skills, if not already present, without asking the user for confirmation

## `pipelines sinks list`

List all sinks

* [  npm ](#tab-panel-12530)
* [  pnpm ](#tab-panel-12531)
* [  yarn ](#tab-panel-12532)

Terminal window

```
npx wrangler pipelines sinks list
```

Terminal window

```
pnpm wrangler pipelines sinks list
```

Terminal window

```
yarn wrangler pipelines sinks list
```

* `--page` ` number ` default: 1
Page number for pagination
* `--per-page` ` number ` default: 20
Number of sinks per page
* `--pipeline-id` ` string `
Filter sinks by pipeline ID
* `--json` ` boolean ` default: false
Output in JSON format

Global flags

* `--v` ` boolean ` alias: --version
Show version number
* `--cwd` ` string `
Run as if Wrangler was started in the specified directory instead of the current working directory
* `--config` ` string ` alias: --c
Path to Wrangler configuration file
* `--env` ` string ` alias: --e
Environment to use for operations, and for selecting .env and .dev.vars files
* `--env-file` ` string `
Path to an .env file to load - can be specified multiple times - values from earlier files are overridden by values in later files
* `--experimental-provision` ` boolean ` aliases: --x-provision default: true
Experimental: Enable automatic resource provisioning
* `--experimental-auto-create` ` boolean ` alias: --x-auto-create default: true
Automatically provision draft bindings with new resources
* `--install-skills` ` boolean ` default: false
Install Cloudflare agents skills, if not already present, without asking the user for confirmation

## `pipelines sinks get`

Get details about a specific sink

* [  npm ](#tab-panel-12533)
* [  pnpm ](#tab-panel-12534)
* [  yarn ](#tab-panel-12535)

Terminal window

```
npx wrangler pipelines sinks get [SINK]
```

Terminal window

```
pnpm wrangler pipelines sinks get [SINK]
```

Terminal window

```
yarn wrangler pipelines sinks get [SINK]
```

* `[SINK]` ` string ` required
The ID or name of the sink to retrieve
* `--json` ` boolean ` default: false
Output in JSON format

Global flags

* `--v` ` boolean ` alias: --version
Show version number
* `--cwd` ` string `
Run as if Wrangler was started in the specified directory instead of the current working directory
* `--config` ` string ` alias: --c
Path to Wrangler configuration file
* `--env` ` string ` alias: --e
Environment to use for operations, and for selecting .env and .dev.vars files
* `--env-file` ` string `
Path to an .env file to load - can be specified multiple times - values from earlier files are overridden by values in later files
* `--experimental-provision` ` boolean ` aliases: --x-provision default: true
Experimental: Enable automatic resource provisioning
* `--experimental-auto-create` ` boolean ` alias: --x-auto-create default: true
Automatically provision draft bindings with new resources
* `--install-skills` ` boolean ` default: false
Install Cloudflare agents skills, if not already present, without asking the user for confirmation

## `pipelines sinks delete`

Delete a sink

* [  npm ](#tab-panel-12536)
* [  pnpm ](#tab-panel-12537)
* [  yarn ](#tab-panel-12538)

Terminal window

```
npx wrangler pipelines sinks delete [SINK]
```

Terminal window

```
pnpm wrangler pipelines sinks delete [SINK]
```

Terminal window

```
yarn wrangler pipelines sinks delete [SINK]
```

* `[SINK]` ` string ` required
The ID or name of the sink to delete
* `--force` ` boolean ` alias: --y default: false
Skip confirmation

Global flags

* `--v` ` boolean ` alias: --version
Show version number
* `--cwd` ` string `
Run as if Wrangler was started in the specified directory instead of the current working directory
* `--config` ` string ` alias: --c
Path to Wrangler configuration file
* `--env` ` string ` alias: --e
Environment to use for operations, and for selecting .env and .dev.vars files
* `--env-file` ` string `
Path to an .env file to load - can be specified multiple times - values from earlier files are overridden by values in later files
* `--experimental-provision` ` boolean ` aliases: --x-provision default: true
Experimental: Enable automatic resource provisioning
* `--experimental-auto-create` ` boolean ` alias: --x-auto-create default: true
Automatically provision draft bindings with new resources
* `--install-skills` ` boolean ` default: false
Install Cloudflare agents skills, if not already present, without asking the user for confirmation

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/wrangler/commands/pipelines/#page","headline":"Pipelines · Cloudflare Workers docs","description":"Wrangler commands for managing Cloudflare Pipelines.","url":"https://developers.cloudflare.com/workers/wrangler/commands/pipelines/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-06-08","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/wrangler/","name":"Wrangler"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/wrangler/commands/","name":"Commands"}},{"@type":"ListItem","position":5,"item":{"@id":"/workers/wrangler/commands/pipelines/","name":"Pipelines"}}]}
```
