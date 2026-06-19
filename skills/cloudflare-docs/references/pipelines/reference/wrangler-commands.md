---
title: Wrangler commands
description: Wrangler CLI commands for managing Pipelines streams, sinks, and pipelines.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/pipelines/llms.txt  
> Use this file to discover all available pages before exploring further. 

[Skip to content](#%5Ftop) 

# Wrangler commands

## `pipelines setup`

Interactive setup for a complete pipeline

* [  npm ](#tab-panel-9525)
* [  pnpm ](#tab-panel-9526)
* [  yarn ](#tab-panel-9527)

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

* [  npm ](#tab-panel-9528)
* [  pnpm ](#tab-panel-9529)
* [  yarn ](#tab-panel-9530)

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

* [  npm ](#tab-panel-9531)
* [  pnpm ](#tab-panel-9532)
* [  yarn ](#tab-panel-9533)

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

* [  npm ](#tab-panel-9534)
* [  pnpm ](#tab-panel-9535)
* [  yarn ](#tab-panel-9536)

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

* [  npm ](#tab-panel-9537)
* [  pnpm ](#tab-panel-9538)
* [  yarn ](#tab-panel-9539)

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

* [  npm ](#tab-panel-9540)
* [  pnpm ](#tab-panel-9541)
* [  yarn ](#tab-panel-9542)

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

* [  npm ](#tab-panel-9543)
* [  pnpm ](#tab-panel-9544)
* [  yarn ](#tab-panel-9545)

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

* [  npm ](#tab-panel-9546)
* [  pnpm ](#tab-panel-9547)
* [  yarn ](#tab-panel-9548)

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

* [  npm ](#tab-panel-9549)
* [  pnpm ](#tab-panel-9550)
* [  yarn ](#tab-panel-9551)

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

* [  npm ](#tab-panel-9552)
* [  pnpm ](#tab-panel-9553)
* [  yarn ](#tab-panel-9554)

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

* [  npm ](#tab-panel-9555)
* [  pnpm ](#tab-panel-9556)
* [  yarn ](#tab-panel-9557)

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

* [  npm ](#tab-panel-9558)
* [  pnpm ](#tab-panel-9559)
* [  yarn ](#tab-panel-9560)

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

* [  npm ](#tab-panel-9561)
* [  pnpm ](#tab-panel-9562)
* [  yarn ](#tab-panel-9563)

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

* [  npm ](#tab-panel-9564)
* [  pnpm ](#tab-panel-9565)
* [  yarn ](#tab-panel-9566)

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
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/pipelines/reference/wrangler-commands/#page","headline":"Wrangler commands · Cloudflare Pipelines Docs","description":"Wrangler CLI commands for managing Pipelines streams, sinks, and pipelines.","url":"https://developers.cloudflare.com/pipelines/reference/wrangler-commands/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/pipelines/","name":"Pipelines"}},{"@type":"ListItem","position":3,"item":{"@id":"/pipelines/reference/","name":"Reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/pipelines/reference/wrangler-commands/","name":"Wrangler commands"}}]}
```
