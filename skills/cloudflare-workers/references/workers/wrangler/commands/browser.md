---
title: Browser
description: Wrangler commands for interacting with Cloudflare Browser Run.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop)

# Browser

Interact with the [Browser Run](https://developers.cloudflare.com/browser-run/) service using Wrangler.

## `browser create`

Create a new Browser Run session

* [  npm ](#tab-panel-12662)
* [  pnpm ](#tab-panel-12663)
* [  yarn ](#tab-panel-12664)

```sh
npx wrangler browser create
```

```sh
pnpm wrangler browser create
```

```sh
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
* `--install-skills` ` boolean ` default: false
Install Cloudflare skills for detected AI coding agents before running the command
* `--profile` ` string `
Use a specific auth profile

## `browser close`

Close a Browser Run session

* [  npm ](#tab-panel-12665)
* [  pnpm ](#tab-panel-12666)
* [  yarn ](#tab-panel-12667)

```sh
npx wrangler browser close [SESSIONID]
```

```sh
pnpm wrangler browser close [SESSIONID]
```

```sh
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
* `--install-skills` ` boolean ` default: false
Install Cloudflare skills for detected AI coding agents before running the command
* `--profile` ` string `
Use a specific auth profile

## `browser list`

List active Browser Run sessions

* [  npm ](#tab-panel-12668)
* [  pnpm ](#tab-panel-12669)
* [  yarn ](#tab-panel-12670)

```sh
npx wrangler browser list
```

```sh
pnpm wrangler browser list
```

```sh
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
* `--install-skills` ` boolean ` default: false
Install Cloudflare skills for detected AI coding agents before running the command
* `--profile` ` string `
Use a specific auth profile

## `browser view`

View a live browser session

* [  npm ](#tab-panel-12671)
* [  pnpm ](#tab-panel-12672)
* [  yarn ](#tab-panel-12673)

```sh
npx wrangler browser view [SESSIONID]
```

```sh
pnpm wrangler browser view [SESSIONID]
```

```sh
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
* `--install-skills` ` boolean ` default: false
Install Cloudflare skills for detected AI coding agents before running the command
* `--profile` ` string `
Use a specific auth profile

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/wrangler/commands/browser/#page","headline":"Browser · Cloudflare Workers docs","description":"Wrangler commands for interacting with Cloudflare Browser Run.","url":"https://developers.cloudflare.com/workers/wrangler/commands/browser/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/wrangler/","name":"Wrangler"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/wrangler/commands/","name":"Commands"}},{"@type":"ListItem","position":5,"item":{"@id":"/workers/wrangler/commands/browser/","name":"Browser"}}]}
```
