---
title: Wrangler commands
description: Manage Artifacts namespaces, repositories, and repo tokens from the command line using Wrangler.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/artifacts/llms.txt
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop)

# Wrangler commands

Use `wrangler artifacts` commands to manage Artifacts namespaces, repositories, and repo-scoped tokens from the command line.

## `artifacts namespaces list`

List Artifacts namespaces

* [  npm ](#tab-panel-7089)
* [  pnpm ](#tab-panel-7090)
* [  yarn ](#tab-panel-7091)

```sh
npx wrangler artifacts namespaces list
```

```sh
pnpm wrangler artifacts namespaces list
```

```sh
yarn wrangler artifacts namespaces list
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
Install Cloudflare agents skills, if not already present, without asking the user for confirmation

## `artifacts namespaces get`

Get an Artifacts namespace

* [  npm ](#tab-panel-7092)
* [  pnpm ](#tab-panel-7093)
* [  yarn ](#tab-panel-7094)

```sh
npx wrangler artifacts namespaces get [NAME]
```

```sh
pnpm wrangler artifacts namespaces get [NAME]
```

```sh
yarn wrangler artifacts namespaces get [NAME]
```

* `[NAME]` ` string ` required
The Artifacts namespace name
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
Install Cloudflare agents skills, if not already present, without asking the user for confirmation

## `artifacts repos create`

Create an Artifacts repository

* [  npm ](#tab-panel-7095)
* [  pnpm ](#tab-panel-7096)
* [  yarn ](#tab-panel-7097)

```sh
npx wrangler artifacts repos create [NAME]
```

```sh
pnpm wrangler artifacts repos create [NAME]
```

```sh
yarn wrangler artifacts repos create [NAME]
```

* `[NAME]` ` string ` required
The Artifacts repository name
* `--namespace` ` string ` required
The Artifacts namespace name
* `--description` ` string `
An optional description for the repository
* `--default-branch` ` string `
The default branch for the repository
* `--read-only` ` boolean `
Create the repository as read-only
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
Install Cloudflare agents skills, if not already present, without asking the user for confirmation

## `artifacts repos list`

List Artifacts repositories in a namespace

* [  npm ](#tab-panel-7098)
* [  pnpm ](#tab-panel-7099)
* [  yarn ](#tab-panel-7100)

```sh
npx wrangler artifacts repos list
```

```sh
pnpm wrangler artifacts repos list
```

```sh
yarn wrangler artifacts repos list
```

* `--namespace` ` string ` required
The Artifacts namespace name
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
Install Cloudflare agents skills, if not already present, without asking the user for confirmation

## `artifacts repos get`

Get an Artifacts repository

* [  npm ](#tab-panel-7101)
* [  pnpm ](#tab-panel-7102)
* [  yarn ](#tab-panel-7103)

```sh
npx wrangler artifacts repos get [NAME]
```

```sh
pnpm wrangler artifacts repos get [NAME]
```

```sh
yarn wrangler artifacts repos get [NAME]
```

* `[NAME]` ` string ` required
The Artifacts repository name
* `--namespace` ` string ` required
The Artifacts namespace name
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
Install Cloudflare agents skills, if not already present, without asking the user for confirmation

## `artifacts repos delete`

Delete an Artifacts repository

* [  npm ](#tab-panel-7104)
* [  pnpm ](#tab-panel-7105)
* [  yarn ](#tab-panel-7106)

```sh
npx wrangler artifacts repos delete [NAME]
```

```sh
pnpm wrangler artifacts repos delete [NAME]
```

```sh
yarn wrangler artifacts repos delete [NAME]
```

* `[NAME]` ` string ` required
The Artifacts repository name
* `--namespace` ` string ` required
The Artifacts namespace name
* `--force` ` boolean ` alias: --y default: false
Skip confirmation
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
Install Cloudflare agents skills, if not already present, without asking the user for confirmation

## `artifacts repos issue-token`

Issue a repo-scoped Artifacts token

* [  npm ](#tab-panel-7107)
* [  pnpm ](#tab-panel-7108)
* [  yarn ](#tab-panel-7109)

```sh
npx wrangler artifacts repos issue-token [REPO]
```

```sh
pnpm wrangler artifacts repos issue-token [REPO]
```

```sh
yarn wrangler artifacts repos issue-token [REPO]
```

* `[REPO]` ` string ` required
The Artifacts repository name
* `--namespace` ` string ` required
The Artifacts namespace name
* `--scope` ` string `
The token scope
* `--ttl` ` number `
The token TTL in seconds
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
Install Cloudflare agents skills, if not already present, without asking the user for confirmation

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/artifacts/api/wrangler/#page","headline":"Wrangler commands · Cloudflare Artifacts docs","description":"Manage Artifacts namespaces, repositories, and repo tokens from the command line using Wrangler.","url":"https://developers.cloudflare.com/artifacts/api/wrangler/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-05-18","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/artifacts/","name":"Artifacts"}},{"@type":"ListItem","position":3,"item":{"@id":"/artifacts/api/","name":"API"}},{"@type":"ListItem","position":4,"item":{"@id":"/artifacts/api/wrangler/","name":"Wrangler commands"}}]}
```
