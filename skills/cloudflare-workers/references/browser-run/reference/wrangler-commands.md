---
description: Manage Browser Run sessions from the command line using Wrangler.
title: Wrangler commands
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/browser-run/llms.txt
> Use this file to discover all available pages before exploring further.

# Wrangler commands

Last updated Apr 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/browser-run/reference/wrangler-commands/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Use `wrangler browser` commands to manage Browser Run sessions from the command line.

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

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/browser-run/reference/wrangler-commands/#page","headline":"Wrangler commands · Cloudflare Browser Run docs","description":"Manage Browser Run sessions from the command line using Wrangler.","url":"https://developers.cloudflare.com/browser-run/reference/wrangler-commands/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
