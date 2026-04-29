---
title: Wrangler commands
description: Manage AI Search instances from the command line using Wrangler.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-search/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Wrangler commands

## `ai-search list`

List all AI Search instances

* [  npm ](#tab-panel-4208)
* [  pnpm ](#tab-panel-4209)
* [  yarn ](#tab-panel-4210)

Terminal window

```

npx wrangler ai-search list


```

Terminal window

```

pnpm wrangler ai-search list


```

Terminal window

```

yarn wrangler ai-search list


```

* `--json` ` boolean ` default: false  
Return output as clean JSON
* `--page` ` number ` default: 1  
Page number of the results, can configure page size using "per-page"
* `--per-page` ` number `  
Number of instances to show per page

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

## `ai-search create`

Create a new AI Search instance

* [  npm ](#tab-panel-4211)
* [  pnpm ](#tab-panel-4212)
* [  yarn ](#tab-panel-4213)

Terminal window

```

npx wrangler ai-search create [NAME]


```

Terminal window

```

pnpm wrangler ai-search create [NAME]


```

Terminal window

```

yarn wrangler ai-search create [NAME]


```

* `[NAME]` ` string ` required  
The name of the AI Search instance to create (must be unique).
* `--source` ` string `  
Data source identifier (R2 bucket name or web URL).
* `--type` ` string `  
The source type for the instance.
* `--embedding-model` ` string `  
Embedding model to use.
* `--generation-model` ` string `  
LLM model for chat completions.
* `--chunk-size` ` number `  
Chunk size for document splitting (min: 64).
* `--chunk-overlap` ` number `  
Overlap between document chunks.
* `--max-num-results` ` number `  
Maximum search results per query.
* `--reranking` ` boolean `  
Enable reranking of search results.
* `--reranking-model` ` string `  
Model to use for reranking.
* `--hybrid-search` ` boolean `  
Enable hybrid (keyword + vector) search.
* `--cache` ` boolean `  
Enable response caching.
* `--score-threshold` ` number `  
Minimum relevance score threshold (0-1).
* `--prefix` ` string `  
R2 key prefix to scope indexing.
* `--include-items` ` array `  
Glob patterns for items to include.
* `--exclude-items` ` array `  
Glob patterns for items to exclude.
* `--json` ` boolean ` default: false  
Return output as clean JSON

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

## `ai-search get`

Get details of an AI Search instance

* [  npm ](#tab-panel-4214)
* [  pnpm ](#tab-panel-4215)
* [  yarn ](#tab-panel-4216)

Terminal window

```

npx wrangler ai-search get [NAME]


```

Terminal window

```

pnpm wrangler ai-search get [NAME]


```

Terminal window

```

yarn wrangler ai-search get [NAME]


```

* `[NAME]` ` string ` required  
The name of the AI Search instance.
* `--json` ` boolean ` default: false  
Return output as clean JSON

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

## `ai-search update`

Update an AI Search instance configuration

* [  npm ](#tab-panel-4217)
* [  pnpm ](#tab-panel-4218)
* [  yarn ](#tab-panel-4219)

Terminal window

```

npx wrangler ai-search update [NAME]


```

Terminal window

```

pnpm wrangler ai-search update [NAME]


```

Terminal window

```

yarn wrangler ai-search update [NAME]


```

* `[NAME]` ` string ` required  
The name of the AI Search instance to update.
* `--embedding-model` ` string `  
Update the embedding model.
* `--generation-model` ` string `  
Update the LLM model for chat completions.
* `--chunk-size` ` number `  
Update the chunk size.
* `--chunk-overlap` ` number `  
Update the chunk overlap.
* `--max-num-results` ` number `  
Update max search results per query.
* `--reranking` ` boolean `  
Enable or disable reranking.
* `--reranking-model` ` string `  
Update the reranking model.
* `--hybrid-search` ` boolean `  
Enable or disable hybrid search.
* `--cache` ` boolean `  
Enable or disable caching.
* `--score-threshold` ` number `  
Update the minimum relevance score threshold (0-1).
* `--paused` ` boolean `  
Pause or resume the instance.
* `--json` ` boolean ` default: false  
Return output as clean JSON

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

## `ai-search delete`

Delete an AI Search instance

* [  npm ](#tab-panel-4220)
* [  pnpm ](#tab-panel-4221)
* [  yarn ](#tab-panel-4222)

Terminal window

```

npx wrangler ai-search delete [NAME]


```

Terminal window

```

pnpm wrangler ai-search delete [NAME]


```

Terminal window

```

yarn wrangler ai-search delete [NAME]


```

* `[NAME]` ` string ` required  
The name of the AI Search instance to delete.
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

## `ai-search stats`

Get usage statistics for an AI Search instance

* [  npm ](#tab-panel-4223)
* [  pnpm ](#tab-panel-4224)
* [  yarn ](#tab-panel-4225)

Terminal window

```

npx wrangler ai-search stats [NAME]


```

Terminal window

```

pnpm wrangler ai-search stats [NAME]


```

Terminal window

```

yarn wrangler ai-search stats [NAME]


```

* `[NAME]` ` string ` required  
The name of the AI Search instance.
* `--json` ` boolean ` default: false  
Return output as clean JSON

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

## `ai-search search`

Execute a semantic search query against an AI Search instance

* [  npm ](#tab-panel-4226)
* [  pnpm ](#tab-panel-4227)
* [  yarn ](#tab-panel-4228)

Terminal window

```

npx wrangler ai-search search [NAME]


```

Terminal window

```

pnpm wrangler ai-search search [NAME]


```

Terminal window

```

yarn wrangler ai-search search [NAME]


```

* `[NAME]` ` string ` required  
The name of the AI Search instance.
* `--query` ` string ` required  
The search query text.
* `--max-num-results` ` number `  
Override maximum number of results.
* `--score-threshold` ` number `  
Override minimum relevance score (0-1).
* `--reranking` ` boolean `  
Override reranking setting.
* `--filter` ` array `  
Metadata filter as key=value (repeatable, e.g. --filter type=docs --filter lang=en).
* `--json` ` boolean ` default: false  
Return output as clean JSON

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

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai-search/","name":"AI Search"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai-search/wrangler-commands/","name":"Wrangler commands"}}]}
```
