---
description: Wrangler commands for interacting with Cloudflare Browser Run.
title: Browser
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

# Browser

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/workers/wrangler/commands/browser/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Interact with the [Browser Run](https://developers.cloudflare.com/browser-run/) service using Wrangler.

## `browser create`

Create a new Browser Run session

npmyarnpnpm

```
npx wrangler browser create
```

```
yarn wrangler browser create
```

```
pnpm wrangler browser create
```

* `--lab` `boolean` default: false
Enable lab browser session with experimental Chrome features (e.g., WebMCP)
* `--keepAlive` `number` alias: --k
Keep-alive duration in seconds (60-600)
* `--json` `boolean` default: false
Return session info as JSON
* `--open` `boolean`
Open DevTools in browser (default: true in interactive mode)

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

## `browser close`

Close a Browser Run session

npmyarnpnpm

```
npx wrangler browser close [SESSIONID]
```

```
yarn wrangler browser close [SESSIONID]
```

```
pnpm wrangler browser close [SESSIONID]
```

* `[SESSIONID]` `string` required
The session ID to close
* `--json` `boolean` default: false
Return result as JSON

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

## `browser list`

List active Browser Run sessions

npmyarnpnpm

```
npx wrangler browser list
```

```
yarn wrangler browser list
```

```
pnpm wrangler browser list
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

## `browser view`

View a live browser session

npmyarnpnpm

```
npx wrangler browser view [SESSIONID]
```

```
yarn wrangler browser view [SESSIONID]
```

```
pnpm wrangler browser view [SESSIONID]
```

* `[SESSIONID]` `string`
The session ID to inspect (optional if only one session exists)
* `--target` `string`
Target selector (matches id exactly, or url/title by substring)
* `--json` `boolean` default: false
Return live browser session URL(s) as JSON
* `--open` `boolean`
Open in browser (default: true in interactive mode)

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
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/wrangler/commands/browser/#page","headline":"Browser · Cloudflare Workers docs","description":"Wrangler commands for interacting with Cloudflare Browser Run.","url":"https://developers.cloudflare.com/workers/wrangler/commands/browser/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
