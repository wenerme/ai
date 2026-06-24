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

* [  npm ](#tab-panel-13149)
* [  pnpm ](#tab-panel-13150)
* [  yarn ](#tab-panel-13151)

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

* [  npm ](#tab-panel-13152)
* [  pnpm ](#tab-panel-13153)
* [  yarn ](#tab-panel-13154)

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

* [  npm ](#tab-panel-13155)
* [  pnpm ](#tab-panel-13156)
* [  yarn ](#tab-panel-13157)

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

* [  npm ](#tab-panel-13158)
* [  pnpm ](#tab-panel-13159)
* [  yarn ](#tab-panel-13160)

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

* [  npm ](#tab-panel-13161)
* [  pnpm ](#tab-panel-13162)
* [  yarn ](#tab-panel-13163)

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

* [  npm ](#tab-panel-13164)
* [  pnpm ](#tab-panel-13165)
* [  yarn ](#tab-panel-13166)

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

* [  npm ](#tab-panel-13167)
* [  pnpm ](#tab-panel-13168)
* [  yarn ](#tab-panel-13169)

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

* [  npm ](#tab-panel-13170)
* [  pnpm ](#tab-panel-13171)
* [  yarn ](#tab-panel-13172)

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

* [  npm ](#tab-panel-13173)
* [  pnpm ](#tab-panel-13174)
* [  yarn ](#tab-panel-13175)

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
* `--from-step-name` ` string `
Name of the step to restart from
* `--from-step-count` ` number `
1-based occurrence of the step name/type to restart from (defaults to 1)
* `--from-step-type` ` string `
Step type to restart from, used when the same name is shared across step types (defaults to do)

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

* [  npm ](#tab-panel-13176)
* [  pnpm ](#tab-panel-13177)
* [  yarn ](#tab-panel-13178)

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

* [  npm ](#tab-panel-13179)
* [  pnpm ](#tab-panel-13180)
* [  yarn ](#tab-panel-13181)

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
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/workflows/reference/wrangler-commands/#page","headline":"Wrangler commands · Cloudflare Workflows docs","description":"Wrangler CLI commands for managing, deploying, and interacting with Cloudflare Workflows.","url":"https://developers.cloudflare.com/workflows/reference/wrangler-commands/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-22","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workflows/","name":"Workflows"}},{"@type":"ListItem","position":3,"item":{"@id":"/workflows/reference/","name":"Platform"}},{"@type":"ListItem","position":4,"item":{"@id":"/workflows/reference/wrangler-commands/","name":"Wrangler commands"}}]}
```
