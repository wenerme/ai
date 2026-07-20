---
title: Workers for Platforms
description: Wrangler commands for managing Workers for Platforms dispatch namespaces.
image: https://developers.cloudflare.com/og-docs.png
---

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop)

# Workers for Platforms

Wrangler commands for managing Workers for Platforms [dispatch namespace](https://developers.cloudflare.com/cloudflare-for-platforms/workers-for-platforms/how-workers-for-platforms-works/#dispatch-namespace) using Wrangler.

## `dispatch-namespace list`

List all dispatch namespaces

* [  npm ](#tab-panel-13765)
* [  pnpm ](#tab-panel-13766)
* [  yarn ](#tab-panel-13767)

```sh
npx wrangler dispatch-namespace list
```

```sh
pnpm wrangler dispatch-namespace list
```

```sh
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
* `--install-skills` ` boolean ` default: false
Install Cloudflare skills for detected AI coding agents before running the command
* `--profile` ` string `
Use a specific auth profile

## `dispatch-namespace get`

Get information about a dispatch namespace

* [  npm ](#tab-panel-13768)
* [  pnpm ](#tab-panel-13769)
* [  yarn ](#tab-panel-13770)

```sh
npx wrangler dispatch-namespace get [NAME]
```

```sh
pnpm wrangler dispatch-namespace get [NAME]
```

```sh
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
* `--install-skills` ` boolean ` default: false
Install Cloudflare skills for detected AI coding agents before running the command
* `--profile` ` string `
Use a specific auth profile

## `dispatch-namespace create`

Create a dispatch namespace

* [  npm ](#tab-panel-13771)
* [  pnpm ](#tab-panel-13772)
* [  yarn ](#tab-panel-13773)

```sh
npx wrangler dispatch-namespace create [NAME]
```

```sh
pnpm wrangler dispatch-namespace create [NAME]
```

```sh
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
* `--install-skills` ` boolean ` default: false
Install Cloudflare skills for detected AI coding agents before running the command
* `--profile` ` string `
Use a specific auth profile

## `dispatch-namespace delete`

Delete a dispatch namespace

* [  npm ](#tab-panel-13774)
* [  pnpm ](#tab-panel-13775)
* [  yarn ](#tab-panel-13776)

```sh
npx wrangler dispatch-namespace delete [NAME]
```

```sh
pnpm wrangler dispatch-namespace delete [NAME]
```

```sh
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
* `--install-skills` ` boolean ` default: false
Install Cloudflare skills for detected AI coding agents before running the command
* `--profile` ` string `
Use a specific auth profile

Note

You must delete all user Workers in the dispatch namespace before it can be deleted.

## `dispatch-namespace rename`

Rename a dispatch namespace

* [  npm ](#tab-panel-13777)
* [  pnpm ](#tab-panel-13778)
* [  yarn ](#tab-panel-13779)

```sh
npx wrangler dispatch-namespace rename [OLDNAME] [NEWNAME]
```

```sh
pnpm wrangler dispatch-namespace rename [OLDNAME] [NEWNAME]
```

```sh
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
* `--install-skills` ` boolean ` default: false
Install Cloudflare skills for detected AI coding agents before running the command
* `--profile` ` string `
Use a specific auth profile

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/wrangler/commands/workers-for-platforms/#page","headline":"Workers for Platforms · Cloudflare Workers docs","description":"Wrangler commands for managing Workers for Platforms dispatch namespaces.","url":"https://developers.cloudflare.com/workers/wrangler/commands/workers-for-platforms/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/wrangler/","name":"Wrangler"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/wrangler/commands/","name":"Commands"}},{"@type":"ListItem","position":5,"item":{"@id":"/workers/wrangler/commands/workers-for-platforms/","name":"Workers for Platforms"}}]}
```
