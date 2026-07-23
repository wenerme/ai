---
description: Manage Artifacts namespaces, repositories, and repo tokens from the command line using Wrangler.
title: Wrangler commands
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/artifacts/llms.txt
> Use this file to discover all available pages before exploring further.

# Wrangler commands

Last updated May 18, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/artifacts/api/wrangler/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Use `wrangler artifacts` commands to manage Artifacts namespaces, repositories, and repo-scoped tokens from the command line.

## `artifacts namespaces list`

List Artifacts namespaces

npmyarnpnpm

```
npx wrangler artifacts namespaces list
```

```
yarn wrangler artifacts namespaces list
```

```
pnpm wrangler artifacts namespaces list
```

* `--json` `boolean` default: false
Return output as JSON

Global flags

* `--v` `boolean` alias: --version
Show version number
* `--cwd` `string`
Run as if Wrangler was started in the specified directory instead of the current working directory
* `--config` `string` alias: --c
Path to Wrangler configuration file
* `--env` `string` alias: --e
Environment to use for operations, and for selecting .env and .dev.vars files
* `--env-file` `string`
Path to an .env file to load - can be specified multiple times - values from earlier files are overridden by values in later files
* `--experimental-provision` `boolean` aliases: --x-provisiondefault: true
Experimental: Enable automatic resource provisioning
* `--experimental-auto-create` `boolean` alias: --x-auto-createdefault: true
Automatically provision draft bindings with new resources
* `--install-skills` `boolean` default: false
Install Cloudflare skills for detected AI coding agents before running the command
* `--profile` `string`
Use a specific auth profile

## `artifacts namespaces get`

Get an Artifacts namespace

npmyarnpnpm

```
npx wrangler artifacts namespaces get [NAME]
```

```
yarn wrangler artifacts namespaces get [NAME]
```

```
pnpm wrangler artifacts namespaces get [NAME]
```

* `[NAME]` `string` required
The Artifacts namespace name
* `--json` `boolean` default: false
Return output as JSON

Global flags

* `--v` `boolean` alias: --version
Show version number
* `--cwd` `string`
Run as if Wrangler was started in the specified directory instead of the current working directory
* `--config` `string` alias: --c
Path to Wrangler configuration file
* `--env` `string` alias: --e
Environment to use for operations, and for selecting .env and .dev.vars files
* `--env-file` `string`
Path to an .env file to load - can be specified multiple times - values from earlier files are overridden by values in later files
* `--experimental-provision` `boolean` aliases: --x-provisiondefault: true
Experimental: Enable automatic resource provisioning
* `--experimental-auto-create` `boolean` alias: --x-auto-createdefault: true
Automatically provision draft bindings with new resources
* `--install-skills` `boolean` default: false
Install Cloudflare skills for detected AI coding agents before running the command
* `--profile` `string`
Use a specific auth profile

## `artifacts repos create`

Create an Artifacts repository

npmyarnpnpm

```
npx wrangler artifacts repos create [NAME]
```

```
yarn wrangler artifacts repos create [NAME]
```

```
pnpm wrangler artifacts repos create [NAME]
```

* `[NAME]` `string` required
The Artifacts repository name
* `--namespace` `string` required
The Artifacts namespace name
* `--description` `string`
An optional description for the repository
* `--default-branch` `string`
The default branch for the repository
* `--read-only` `boolean`
Create the repository as read-only
* `--json` `boolean` default: false
Return output as JSON

Global flags

* `--v` `boolean` alias: --version
Show version number
* `--cwd` `string`
Run as if Wrangler was started in the specified directory instead of the current working directory
* `--config` `string` alias: --c
Path to Wrangler configuration file
* `--env` `string` alias: --e
Environment to use for operations, and for selecting .env and .dev.vars files
* `--env-file` `string`
Path to an .env file to load - can be specified multiple times - values from earlier files are overridden by values in later files
* `--experimental-provision` `boolean` aliases: --x-provisiondefault: true
Experimental: Enable automatic resource provisioning
* `--experimental-auto-create` `boolean` alias: --x-auto-createdefault: true
Automatically provision draft bindings with new resources
* `--install-skills` `boolean` default: false
Install Cloudflare skills for detected AI coding agents before running the command
* `--profile` `string`
Use a specific auth profile

## `artifacts repos list`

List Artifacts repositories in a namespace

npmyarnpnpm

```
npx wrangler artifacts repos list
```

```
yarn wrangler artifacts repos list
```

```
pnpm wrangler artifacts repos list
```

* `--namespace` `string` required
The Artifacts namespace name
* `--json` `boolean` default: false
Return output as JSON

Global flags

* `--v` `boolean` alias: --version
Show version number
* `--cwd` `string`
Run as if Wrangler was started in the specified directory instead of the current working directory
* `--config` `string` alias: --c
Path to Wrangler configuration file
* `--env` `string` alias: --e
Environment to use for operations, and for selecting .env and .dev.vars files
* `--env-file` `string`
Path to an .env file to load - can be specified multiple times - values from earlier files are overridden by values in later files
* `--experimental-provision` `boolean` aliases: --x-provisiondefault: true
Experimental: Enable automatic resource provisioning
* `--experimental-auto-create` `boolean` alias: --x-auto-createdefault: true
Automatically provision draft bindings with new resources
* `--install-skills` `boolean` default: false
Install Cloudflare skills for detected AI coding agents before running the command
* `--profile` `string`
Use a specific auth profile

## `artifacts repos get`

Get an Artifacts repository

npmyarnpnpm

```
npx wrangler artifacts repos get [NAME]
```

```
yarn wrangler artifacts repos get [NAME]
```

```
pnpm wrangler artifacts repos get [NAME]
```

* `[NAME]` `string` required
The Artifacts repository name
* `--namespace` `string` required
The Artifacts namespace name
* `--json` `boolean` default: false
Return output as JSON

Global flags

* `--v` `boolean` alias: --version
Show version number
* `--cwd` `string`
Run as if Wrangler was started in the specified directory instead of the current working directory
* `--config` `string` alias: --c
Path to Wrangler configuration file
* `--env` `string` alias: --e
Environment to use for operations, and for selecting .env and .dev.vars files
* `--env-file` `string`
Path to an .env file to load - can be specified multiple times - values from earlier files are overridden by values in later files
* `--experimental-provision` `boolean` aliases: --x-provisiondefault: true
Experimental: Enable automatic resource provisioning
* `--experimental-auto-create` `boolean` alias: --x-auto-createdefault: true
Automatically provision draft bindings with new resources
* `--install-skills` `boolean` default: false
Install Cloudflare skills for detected AI coding agents before running the command
* `--profile` `string`
Use a specific auth profile

## `artifacts repos delete`

Delete an Artifacts repository

npmyarnpnpm

```
npx wrangler artifacts repos delete [NAME]
```

```
yarn wrangler artifacts repos delete [NAME]
```

```
pnpm wrangler artifacts repos delete [NAME]
```

* `[NAME]` `string` required
The Artifacts repository name
* `--namespace` `string` required
The Artifacts namespace name
* `--force` `boolean` alias: --ydefault: false
Skip confirmation
* `--json` `boolean` default: false
Return output as JSON

Global flags

* `--v` `boolean` alias: --version
Show version number
* `--cwd` `string`
Run as if Wrangler was started in the specified directory instead of the current working directory
* `--config` `string` alias: --c
Path to Wrangler configuration file
* `--env` `string` alias: --e
Environment to use for operations, and for selecting .env and .dev.vars files
* `--env-file` `string`
Path to an .env file to load - can be specified multiple times - values from earlier files are overridden by values in later files
* `--experimental-provision` `boolean` aliases: --x-provisiondefault: true
Experimental: Enable automatic resource provisioning
* `--experimental-auto-create` `boolean` alias: --x-auto-createdefault: true
Automatically provision draft bindings with new resources
* `--install-skills` `boolean` default: false
Install Cloudflare skills for detected AI coding agents before running the command
* `--profile` `string`
Use a specific auth profile

## `artifacts repos issue-token`

Issue a repo-scoped Artifacts token

npmyarnpnpm

```
npx wrangler artifacts repos issue-token [REPO]
```

```
yarn wrangler artifacts repos issue-token [REPO]
```

```
pnpm wrangler artifacts repos issue-token [REPO]
```

* `[REPO]` `string` required
The Artifacts repository name
* `--namespace` `string` required
The Artifacts namespace name
* `--scope` `string`
The token scope
* `--ttl` `number`
The token TTL in seconds
* `--json` `boolean` default: false
Return output as JSON

Global flags

* `--v` `boolean` alias: --version
Show version number
* `--cwd` `string`
Run as if Wrangler was started in the specified directory instead of the current working directory
* `--config` `string` alias: --c
Path to Wrangler configuration file
* `--env` `string` alias: --e
Environment to use for operations, and for selecting .env and .dev.vars files
* `--env-file` `string`
Path to an .env file to load - can be specified multiple times - values from earlier files are overridden by values in later files
* `--experimental-provision` `boolean` aliases: --x-provisiondefault: true
Experimental: Enable automatic resource provisioning
* `--experimental-auto-create` `boolean` alias: --x-auto-createdefault: true
Automatically provision draft bindings with new resources
* `--install-skills` `boolean` default: false
Install Cloudflare skills for detected AI coding agents before running the command
* `--profile` `string`
Use a specific auth profile

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/artifacts/api/wrangler/#page","headline":"Wrangler commands · Cloudflare Artifacts docs","description":"Manage Artifacts namespaces, repositories, and repo tokens from the command line using Wrangler.","url":"https://developers.cloudflare.com/artifacts/api/wrangler/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-05-18","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
