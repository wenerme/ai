---
title: Wrangler commands
description: Manage Browser Rendering sessions from the command line using Wrangler.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/browser-rendering/reference/wrangler-commands.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Wrangler commands

Use `wrangler browser` commands to manage Browser Rendering sessions from the command line.

## `browser create`

Create a new browser rendering session

* [  npm ](#tab-panel-3418)
* [  pnpm ](#tab-panel-3419)
* [  yarn ](#tab-panel-3420)

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

Close a browser rendering session

* [  npm ](#tab-panel-3421)
* [  pnpm ](#tab-panel-3422)
* [  yarn ](#tab-panel-3423)

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

List active browser rendering sessions

* [  npm ](#tab-panel-3424)
* [  pnpm ](#tab-panel-3425)
* [  yarn ](#tab-panel-3426)

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

* [  npm ](#tab-panel-3427)
* [  pnpm ](#tab-panel-3428)
* [  yarn ](#tab-panel-3429)

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
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/browser-rendering/","name":"Browser Rendering"}},{"@type":"ListItem","position":3,"item":{"@id":"/browser-rendering/reference/","name":"Reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/browser-rendering/reference/wrangler-commands/","name":"Wrangler commands"}}]}
```
