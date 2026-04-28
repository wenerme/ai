---
title: Workflows
description: Wrangler commands for managing and configuring Cloudflare Workflows.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

# Workflows

Manage and configure [Workflows](https://developers.cloudflare.com/workflows/) using Wrangler.

Note

The `wrangler workflows` command requires Wrangler version `3.83.0` or greater. Use `npx wrangler@latest` to always use the latest Wrangler version when invoking commands.

`--local` option

All `wrangler workflows` commands support the `--local` flag to target a Workflow running in a local [wrangler dev](https://developers.cloudflare.com/workers/wrangler/commands/general/#dev) session instead of production. Use `--port` to specify the port of the dev session (defaults to `8787`).

The `--local` flag requires Wrangler version `4.79.0` or greater.

For more information, refer to [Workflows local development](https://developers.cloudflare.com/workflows/build/local-development/).

## `workflows list`

List Workflows associated to account

* [  npm ](#tab-panel-9796)
* [  pnpm ](#tab-panel-9797)
* [  yarn ](#tab-panel-9798)

Terminal window

```

npx wrangler workflows list


```

Terminal window

```

pnpm wrangler workflows list


```

Terminal window

```

yarn wrangler workflows list


```

* `--local` ` boolean `  
Interact with local dev session
* `--port` ` number ` default: 8787  
Port of the local dev session (default: 8787)
* `--page` ` number ` default: 1  
Show a sepecific page from the listing, can configure page size using "per-page"
* `--per-page` ` number `  
Configure the maximum number of workflows to show per page

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

## `workflows describe`

Describe Workflow resource

* [  npm ](#tab-panel-9799)
* [  pnpm ](#tab-panel-9800)
* [  yarn ](#tab-panel-9801)

Terminal window

```

npx wrangler workflows describe [NAME]


```

Terminal window

```

pnpm wrangler workflows describe [NAME]


```

Terminal window

```

yarn wrangler workflows describe [NAME]


```

* `--local` ` boolean `  
Interact with local dev session
* `--port` ` number ` default: 8787  
Port of the local dev session (default: 8787)
* `[NAME]` ` string ` required  
Name of the workflow

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

## `workflows delete`

Delete workflow - when deleting a workflow, it will also delete it's own instances

* [  npm ](#tab-panel-9802)
* [  pnpm ](#tab-panel-9803)
* [  yarn ](#tab-panel-9804)

Terminal window

```

npx wrangler workflows delete [NAME]


```

Terminal window

```

pnpm wrangler workflows delete [NAME]


```

Terminal window

```

yarn wrangler workflows delete [NAME]


```

* `--local` ` boolean `  
Interact with local dev session
* `--port` ` number ` default: 8787  
Port of the local dev session (default: 8787)
* `[NAME]` ` string ` required  
Name of the workflow

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

## `workflows trigger`

Trigger a workflow, creating a new instance. Can optionally take a JSON string to pass a parameter into the workflow instance

* [  npm ](#tab-panel-9805)
* [  pnpm ](#tab-panel-9806)
* [  yarn ](#tab-panel-9807)

Terminal window

```

npx wrangler workflows trigger [NAME] [PARAMS]


```

Terminal window

```

pnpm wrangler workflows trigger [NAME] [PARAMS]


```

Terminal window

```

yarn wrangler workflows trigger [NAME] [PARAMS]


```

* `--local` ` boolean `  
Interact with local dev session
* `--port` ` number ` default: 8787  
Port of the local dev session (default: 8787)
* `[NAME]` ` string ` required  
Name of the workflow
* `[PARAMS]` ` string ` default:  
Params for the workflow instance, encoded as a JSON string
* `--id` ` string `  
Custom instance ID, if not provided it will default to a random UUIDv4

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

## `workflows instances list`

Instance related commands (list, describe, terminate, pause, resume)

* [  npm ](#tab-panel-9808)
* [  pnpm ](#tab-panel-9809)
* [  yarn ](#tab-panel-9810)

Terminal window

```

npx wrangler workflows instances list [NAME]


```

Terminal window

```

pnpm wrangler workflows instances list [NAME]


```

Terminal window

```

yarn wrangler workflows instances list [NAME]


```

* `--local` ` boolean `  
Interact with local dev session
* `--port` ` number ` default: 8787  
Port of the local dev session (default: 8787)
* `[NAME]` ` string ` required  
Name of the workflow
* `--reverse` ` boolean ` default: false  
Reverse order of the instances table
* `--status` ` string `  
Filters list by instance status (can be one of: queued, running, paused, errored, terminated, complete)
* `--page` ` number ` default: 1  
Show a sepecific page from the listing, can configure page size using "per-page"
* `--per-page` ` number `  
Configure the maximum number of instances to show per page

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

## `workflows instances describe`

Describe a workflow instance - see its logs, retries and errors

* [  npm ](#tab-panel-9811)
* [  pnpm ](#tab-panel-9812)
* [  yarn ](#tab-panel-9813)

Terminal window

```

npx wrangler workflows instances describe [NAME] [ID]


```

Terminal window

```

pnpm wrangler workflows instances describe [NAME] [ID]


```

Terminal window

```

yarn wrangler workflows instances describe [NAME] [ID]


```

* `--local` ` boolean `  
Interact with local dev session
* `--port` ` number ` default: 8787  
Port of the local dev session (default: 8787)
* `[NAME]` ` string ` required  
Name of the workflow
* `[ID]` ` string ` default: latest  
ID of the instance - instead of an UUID you can type 'latest' to get the latest instance and describe it
* `--step-output` ` boolean ` default: true  
Don't output the step output since it might clutter the terminal
* `--truncate-output-limit` ` number ` default: 5000  
Truncate step output after x characters

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

## `workflows instances send-event`

Send an event to a workflow instance

* [  npm ](#tab-panel-9814)
* [  pnpm ](#tab-panel-9815)
* [  yarn ](#tab-panel-9816)

Terminal window

```

npx wrangler workflows instances send-event [NAME] [ID]


```

Terminal window

```

pnpm wrangler workflows instances send-event [NAME] [ID]


```

Terminal window

```

yarn wrangler workflows instances send-event [NAME] [ID]


```

* `--local` ` boolean `  
Interact with local dev session
* `--port` ` number ` default: 8787  
Port of the local dev session (default: 8787)
* `[NAME]` ` string ` required  
Name of the workflow
* `[ID]` ` string ` required  
ID of the instance - instead of an UUID you can type 'latest' to get the latest instance and send an event to it
* `--type` ` string ` required  
Type of the workflow event
* `--payload` ` string ` default: {}  
JSON string for the workflow event (e.g., '{"key": "value"}')

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

## `workflows instances terminate`

Terminate a workflow instance

* [  npm ](#tab-panel-9817)
* [  pnpm ](#tab-panel-9818)
* [  yarn ](#tab-panel-9819)

Terminal window

```

npx wrangler workflows instances terminate [NAME] [ID]


```

Terminal window

```

pnpm wrangler workflows instances terminate [NAME] [ID]


```

Terminal window

```

yarn wrangler workflows instances terminate [NAME] [ID]


```

* `--local` ` boolean `  
Interact with local dev session
* `--port` ` number ` default: 8787  
Port of the local dev session (default: 8787)
* `[NAME]` ` string ` required  
Name of the workflow
* `[ID]` ` string ` required  
ID of the instance - instead of an UUID you can type 'latest' to get the latest instance and describe it

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

## `workflows instances restart`

Restart a workflow instance

* [  npm ](#tab-panel-9820)
* [  pnpm ](#tab-panel-9821)
* [  yarn ](#tab-panel-9822)

Terminal window

```

npx wrangler workflows instances restart [NAME] [ID]


```

Terminal window

```

pnpm wrangler workflows instances restart [NAME] [ID]


```

Terminal window

```

yarn wrangler workflows instances restart [NAME] [ID]


```

* `--local` ` boolean `  
Interact with local dev session
* `--port` ` number ` default: 8787  
Port of the local dev session (default: 8787)
* `[NAME]` ` string ` required  
Name of the workflow
* `[ID]` ` string ` required  
ID of the instance - instead of an UUID you can type 'latest' to get the latest instance and describe it

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

## `workflows instances pause`

Pause a workflow instance

* [  npm ](#tab-panel-9823)
* [  pnpm ](#tab-panel-9824)
* [  yarn ](#tab-panel-9825)

Terminal window

```

npx wrangler workflows instances pause [NAME] [ID]


```

Terminal window

```

pnpm wrangler workflows instances pause [NAME] [ID]


```

Terminal window

```

yarn wrangler workflows instances pause [NAME] [ID]


```

* `--local` ` boolean `  
Interact with local dev session
* `--port` ` number ` default: 8787  
Port of the local dev session (default: 8787)
* `[NAME]` ` string ` required  
Name of the workflow
* `[ID]` ` string ` required  
ID of the instance - instead of an UUID you can type 'latest' to get the latest instance and pause it

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

## `workflows instances resume`

Resume a workflow instance

* [  npm ](#tab-panel-9826)
* [  pnpm ](#tab-panel-9827)
* [  yarn ](#tab-panel-9828)

Terminal window

```

npx wrangler workflows instances resume [NAME] [ID]


```

Terminal window

```

pnpm wrangler workflows instances resume [NAME] [ID]


```

Terminal window

```

yarn wrangler workflows instances resume [NAME] [ID]


```

* `--local` ` boolean `  
Interact with local dev session
* `--port` ` number ` default: 8787  
Port of the local dev session (default: 8787)
* `[NAME]` ` string ` required  
Name of the workflow
* `[ID]` ` string ` required  
ID of the instance - instead of an UUID you can type 'latest' to get the latest instance and resume it

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
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/wrangler/","name":"Wrangler"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/wrangler/commands/","name":"Commands"}},{"@type":"ListItem","position":5,"item":{"@id":"/workers/wrangler/commands/workflows/","name":"Workflows"}}]}
```
