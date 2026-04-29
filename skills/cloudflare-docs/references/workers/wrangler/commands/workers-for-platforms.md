---
title: Workers for Platforms
description: Wrangler commands for managing Workers for Platforms dispatch namespaces.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Workers for Platforms

Wrangler commands for managing Workers for Platforms [dispatch namespace](https://developers.cloudflare.com/cloudflare-for-platforms/workers-for-platforms/how-workers-for-platforms-works/#dispatch-namespace) using Wrangler.

## `dispatch-namespace list`

List all dispatch namespaces

* [  npm ](#tab-panel-9809)
* [  pnpm ](#tab-panel-9810)
* [  yarn ](#tab-panel-9811)

Terminal window

```

npx wrangler dispatch-namespace list


```

Terminal window

```

pnpm wrangler dispatch-namespace list


```

Terminal window

```

yarn wrangler dispatch-namespace list


```

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

## `dispatch-namespace get`

Get information about a dispatch namespace

* [  npm ](#tab-panel-9812)
* [  pnpm ](#tab-panel-9813)
* [  yarn ](#tab-panel-9814)

Terminal window

```

npx wrangler dispatch-namespace get [NAME]


```

Terminal window

```

pnpm wrangler dispatch-namespace get [NAME]


```

Terminal window

```

yarn wrangler dispatch-namespace get [NAME]


```

* `[NAME]` ` string ` required  
Name of the dispatch namespace

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

## `dispatch-namespace create`

Create a dispatch namespace

* [  npm ](#tab-panel-9815)
* [  pnpm ](#tab-panel-9816)
* [  yarn ](#tab-panel-9817)

Terminal window

```

npx wrangler dispatch-namespace create [NAME]


```

Terminal window

```

pnpm wrangler dispatch-namespace create [NAME]


```

Terminal window

```

yarn wrangler dispatch-namespace create [NAME]


```

* `[NAME]` ` string ` required  
Name of the dispatch namespace

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

## `dispatch-namespace delete`

Delete a dispatch namespace

* [  npm ](#tab-panel-9818)
* [  pnpm ](#tab-panel-9819)
* [  yarn ](#tab-panel-9820)

Terminal window

```

npx wrangler dispatch-namespace delete [NAME]


```

Terminal window

```

pnpm wrangler dispatch-namespace delete [NAME]


```

Terminal window

```

yarn wrangler dispatch-namespace delete [NAME]


```

* `[NAME]` ` string ` required  
Name of the dispatch namespace

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

Note

You must delete all user Workers in the dispatch namespace before it can be deleted.

## `dispatch-namespace rename`

Rename a dispatch namespace

* [  npm ](#tab-panel-9821)
* [  pnpm ](#tab-panel-9822)
* [  yarn ](#tab-panel-9823)

Terminal window

```

npx wrangler dispatch-namespace rename [OLDNAME] [NEWNAME]


```

Terminal window

```

pnpm wrangler dispatch-namespace rename [OLDNAME] [NEWNAME]


```

Terminal window

```

yarn wrangler dispatch-namespace rename [OLDNAME] [NEWNAME]


```

* `[OLDNAME]` ` string ` required  
Name of the dispatch namespace
* `[NEWNAME]` ` string ` required  
New name of the dispatch namespace

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
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/wrangler/","name":"Wrangler"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/wrangler/commands/","name":"Commands"}},{"@type":"ListItem","position":5,"item":{"@id":"/workers/wrangler/commands/workers-for-platforms/","name":"Workers for Platforms"}}]}
```
