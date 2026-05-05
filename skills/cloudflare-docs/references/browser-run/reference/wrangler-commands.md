---
title: Wrangler commands
description: Manage Browser Run sessions from the command line using Wrangler.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/browser-run/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Wrangler commands

Use `wrangler browser` commands to manage Browser Run sessions from the command line.

## `browser create`

Create a new Browser Run session

* [  npm ](#tab-panel-4762)
* [  pnpm ](#tab-panel-4763)
* [  yarn ](#tab-panel-4764)

Terminal window

```

npx wrangler browser create


```

Terminal window

```

pnpm wrangler browser create


```

Terminal window

```

yarn wrangler browser create


```

* `--lab` ` boolean ` default: false  
Enable lab browser session with experimental Chrome features (e.g., WebMCP)
* `--keepAlive` ` number ` alias: --k  
Keep-alive duration in seconds (60-600)
* `--json` ` boolean ` default: false  
Return session info as JSON
* `--open` ` boolean `  
Open DevTools in browser (default: true in interactive mode)

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

## `browser close`

Close a Browser Run session

* [  npm ](#tab-panel-4765)
* [  pnpm ](#tab-panel-4766)
* [  yarn ](#tab-panel-4767)

Terminal window

```

npx wrangler browser close [SESSIONID]


```

Terminal window

```

pnpm wrangler browser close [SESSIONID]


```

Terminal window

```

yarn wrangler browser close [SESSIONID]


```

* `[SESSIONID]` ` string ` required  
The session ID to close
* `--json` ` boolean ` default: false  
Return result as JSON

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

## `browser list`

List active Browser Run sessions

* [  npm ](#tab-panel-4768)
* [  pnpm ](#tab-panel-4769)
* [  yarn ](#tab-panel-4770)

Terminal window

```

npx wrangler browser list


```

Terminal window

```

pnpm wrangler browser list


```

Terminal window

```

yarn wrangler browser list


```

* `--json` ` boolean ` default: false  
Return output as JSON

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

## `browser view`

View a live browser session

* [  npm ](#tab-panel-4771)
* [  pnpm ](#tab-panel-4772)
* [  yarn ](#tab-panel-4773)

Terminal window

```

npx wrangler browser view [SESSIONID]


```

Terminal window

```

pnpm wrangler browser view [SESSIONID]


```

Terminal window

```

yarn wrangler browser view [SESSIONID]


```

* `[SESSIONID]` ` string `  
The session ID to inspect (optional if only one session exists)
* `--target` ` string `  
Target selector (matches id exactly, or url/title by substring)
* `--json` ` boolean ` default: false  
Return live browser session URL(s) as JSON
* `--open` ` boolean `  
Open in browser (default: true in interactive mode)

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
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/browser-run/","name":"Browser Run"}},{"@type":"ListItem","position":3,"item":{"@id":"/browser-run/reference/","name":"Reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/browser-run/reference/wrangler-commands/","name":"Wrangler commands"}}]}
```
