---
title: Wrangler commands
description: Wrangler CLI commands for managing, deploying, and interacting with Cloudflare Workflows.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workflows/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Wrangler commands

## `workflows list`

List Workflows associated to account

* [  npm ](#tab-panel-10923)
* [  pnpm ](#tab-panel-10924)
* [  yarn ](#tab-panel-10925)

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
* `--install-skills` ` boolean ` default: false  
Install Cloudflare agents skills, if not already present, without asking the user for confirmation

## `workflows describe`

Describe Workflow resource

* [  npm ](#tab-panel-10926)
* [  pnpm ](#tab-panel-10927)
* [  yarn ](#tab-panel-10928)

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
* `--install-skills` ` boolean ` default: false  
Install Cloudflare agents skills, if not already present, without asking the user for confirmation

## `workflows delete`

Delete workflow - when deleting a workflow, it will also delete it's own instances

* [  npm ](#tab-panel-10929)
* [  pnpm ](#tab-panel-10930)
* [  yarn ](#tab-panel-10931)

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
* `--install-skills` ` boolean ` default: false  
Install Cloudflare agents skills, if not already present, without asking the user for confirmation

## `workflows trigger`

Trigger a workflow, creating a new instance. Can optionally take a JSON string to pass a parameter into the workflow instance

* [  npm ](#tab-panel-10932)
* [  pnpm ](#tab-panel-10933)
* [  yarn ](#tab-panel-10934)

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
* `--install-skills` ` boolean ` default: false  
Install Cloudflare agents skills, if not already present, without asking the user for confirmation

## `workflows instances list`

Instance related commands (list, describe, terminate, pause, resume)

* [  npm ](#tab-panel-10935)
* [  pnpm ](#tab-panel-10936)
* [  yarn ](#tab-panel-10937)

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
* `--install-skills` ` boolean ` default: false  
Install Cloudflare agents skills, if not already present, without asking the user for confirmation

## `workflows instances describe`

Describe a workflow instance - see its logs, retries and errors

* [  npm ](#tab-panel-10938)
* [  pnpm ](#tab-panel-10939)
* [  yarn ](#tab-panel-10940)

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
* `--install-skills` ` boolean ` default: false  
Install Cloudflare agents skills, if not already present, without asking the user for confirmation

## `workflows instances send-event`

Send an event to a workflow instance

* [  npm ](#tab-panel-10941)
* [  pnpm ](#tab-panel-10942)
* [  yarn ](#tab-panel-10943)

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
* `--install-skills` ` boolean ` default: false  
Install Cloudflare agents skills, if not already present, without asking the user for confirmation

## `workflows instances terminate`

Terminate a workflow instance

* [  npm ](#tab-panel-10944)
* [  pnpm ](#tab-panel-10945)
* [  yarn ](#tab-panel-10946)

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
* `--install-skills` ` boolean ` default: false  
Install Cloudflare agents skills, if not already present, without asking the user for confirmation

## `workflows instances restart`

Restart a workflow instance

* [  npm ](#tab-panel-10947)
* [  pnpm ](#tab-panel-10948)
* [  yarn ](#tab-panel-10949)

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
* `--install-skills` ` boolean ` default: false  
Install Cloudflare agents skills, if not already present, without asking the user for confirmation

## `workflows instances pause`

Pause a workflow instance

* [  npm ](#tab-panel-10950)
* [  pnpm ](#tab-panel-10951)
* [  yarn ](#tab-panel-10952)

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
* `--install-skills` ` boolean ` default: false  
Install Cloudflare agents skills, if not already present, without asking the user for confirmation

## `workflows instances resume`

Resume a workflow instance

* [  npm ](#tab-panel-10953)
* [  pnpm ](#tab-panel-10954)
* [  yarn ](#tab-panel-10955)

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
* `--install-skills` ` boolean ` default: false  
Install Cloudflare agents skills, if not already present, without asking the user for confirmation

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workflows/","name":"Workflows"}},{"@type":"ListItem","position":3,"item":{"@id":"/workflows/reference/","name":"Platform"}},{"@type":"ListItem","position":4,"item":{"@id":"/workflows/reference/wrangler-commands/","name":"Wrangler commands"}}]}
```
