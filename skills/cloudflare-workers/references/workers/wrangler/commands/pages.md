---
description: Wrangler commands for configuring Cloudflare Pages.
title: Pages
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

# Pages

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/workers/wrangler/commands/pages/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Configure [Cloudflare Pages](https://developers.cloudflare.com/pages/) using Wrangler.

## `pages dev`

Develop your full-stack Pages application locally

npmyarnpnpm

```
npx wrangler pages dev [DIRECTORY] [COMMAND]
```

```
yarn wrangler pages dev [DIRECTORY] [COMMAND]
```

```
pnpm wrangler pages dev [DIRECTORY] [COMMAND]
```

* `[DIRECTORY]` `string`
The directory of static assets to serve
* `[COMMAND]` `string`
The proxy command to run \[deprecated\]
* `--compatibility-date` `string`
Date to use for compatibility checks
* `--compatibility-flags` `string` alias: --compatibility-flag
Flags to use for compatibility checks
* `--ip` `string`
The IP address to listen on
* `--port` `number`
The port to listen on (serve from)
* `--inspector-port` `number`
Port for devtools to connect to
* `--proxy` `number`
The port to proxy (where the static assets are served)
* `--script-path` `string`
The location of the single Worker script if not using functions \[default: \_worker.js\]
* `--no-bundle` `boolean`
Whether to run bundling on `_worker.js`
* `--binding` `array` alias: --b
Bind variable/secret (KEY=VALUE)
* `--kv` `array` alias: --k
KV namespace to bind (--kv KV\_BINDING)
* `--d1` `array`
D1 database to bind (--d1 D1\_BINDING)
* `--do` `array` alias: --o
Durable Object to bind (--do DO\_BINDING=CLASS\_NAME@SCRIPT\_NAME)
* `--r2` `array`
R2 bucket to bind (--r2 R2\_BINDING)
* `--ai` `string`
AI to bind (--ai AI\_BINDING)
* `--version-metadata` `string`
Worker Version metadata (--version-metadata VERSION\_METADATA\_BINDING)
* `--service` `array`
Service to bind (--service SERVICE=SCRIPT\_NAME)
* `--live-reload` `boolean` default: false
Auto reload HTML pages when change is detected
* `--local-protocol` `"http" | "https"`
Protocol to listen to requests on, defaults to http.
* `--https-key-path` `string`
Path to a custom certificate key
* `--https-cert-path` `string`
Path to a custom certificate
* `--persist-to` `string`
Specify directory to use for local persistence (defaults to .wrangler/state)
* `--log-level` `"debug" | "info" | "log" | "warn" | "error" | "none"`
Specify logging level
* `--show-interactive-dev-session` `boolean`
Show interactive dev session (defaults to true if the terminal supports interactivity)

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

## `pages functions build`

Compile a folder of Pages Functions into a single Worker

npmyarnpnpm

```
npx wrangler pages functions build [DIRECTORY]
```

```
yarn wrangler pages functions build [DIRECTORY]
```

```
pnpm wrangler pages functions build [DIRECTORY]
```

* `[DIRECTORY]` `string` default: functions
The directory of Pages Functions
* `--outfile` `string`
The location of the output Worker script
* `--outdir` `string`
Output directory for the bundled Worker
* `--output-config-path` `string`
The location for the output config file
* `--build-metadata-path` `string`
The location for the build metadata file
* `--project-directory` `string`
The location of the Pages project
* `--output-routes-path` `string`
The location for the output \_routes.json file
* `--minify` `boolean` default: false
Minify the output Worker script
* `--sourcemap` `boolean` default: false
Generate a sourcemap for the output Worker script
* `--fallback-service` `string` default: ASSETS
The service to fallback to at the end of the `next` chain. Setting to '' will fallback to the global `fetch`.
* `--watch` `boolean` default: false
Watch for changes to the functions and automatically rebuild the Worker script
* `--plugin` `boolean` default: false
Build a plugin rather than a Worker script
* `--build-output-directory` `string`
The directory to output static assets to
* `--compatibility-date` `string`
Date to use for compatibility checks
* `--compatibility-flags` `string` alias: --compatibility-flag
Flags to use for compatibility checks
* `--external` `string`
A list of module imports to exclude from bundling
* `--metafile` `string`
Path to output build metadata from esbuild. If flag is used without a path, defaults to 'bundle-meta.json' inside the directory specified by --outdir.

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

## `pages project list`

List your Cloudflare Pages projects

npmyarnpnpm

```
npx wrangler pages project list
```

```
yarn wrangler pages project list
```

```
pnpm wrangler pages project list
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

## `pages project create`

Create a new Cloudflare Pages project

npmyarnpnpm

```
npx wrangler pages project create [PROJECT-NAME]
```

```
yarn wrangler pages project create [PROJECT-NAME]
```

```
pnpm wrangler pages project create [PROJECT-NAME]
```

* `[PROJECT-NAME]` `string` required
The name of your Pages project
* `--production-branch` `string`
The name of the production branch of your project
* `--compatibility-flags` `string` alias: --compatibility-flag
Flags to use for compatibility checks
* `--compatibility-date` `string`
Date to use for compatibility checks

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

## `pages project delete`

Delete a Cloudflare Pages project

npmyarnpnpm

```
npx wrangler pages project delete [PROJECT-NAME]
```

```
yarn wrangler pages project delete [PROJECT-NAME]
```

```
pnpm wrangler pages project delete [PROJECT-NAME]
```

* `[PROJECT-NAME]` `string` required
The name of your Pages project
* `--yes` `boolean` alias: --y
Answer "yes" to confirm project deletion

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

## `pages deployment list`

List deployments in your Cloudflare Pages project

npmyarnpnpm

```
npx wrangler pages deployment list
```

```
yarn wrangler pages deployment list
```

```
pnpm wrangler pages deployment list
```

* `--project-name` `string`
The name of the project you would like to list deployments for
* `--environment` `string`
Environment type to list deployments for
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

## `pages deployment tail`

Start a tailing session for a project's deployment and livestream logs from your Functions

npmyarnpnpm

```
npx wrangler pages deployment tail [DEPLOYMENT]
```

```
yarn wrangler pages deployment tail [DEPLOYMENT]
```

```
pnpm wrangler pages deployment tail [DEPLOYMENT]
```

* `[DEPLOYMENT]` `string`
(Optional) ID or URL of the deployment to tail. Specify by environment if deployment ID is unknown.
* `--project-name` `string`
The name of the project you would like to tail
* `--environment` `string` default: production
When not providing a specific deployment ID, specifying environment will grab the latest production or preview deployment
* `--format` `string`
The format of log entries
* `--status` `"ok" | "error" | "canceled"`
Filter by invocation status
* `--header` `string`
Filter by HTTP header
* `--method` `string`
Filter by HTTP method
* `--search` `string`
Filter by a text match in console.log messages
* `--sampling-rate` `number`
Adds a percentage of requests to log sampling rate
* `--ip` `string`
Filter by the IP address the request originates from. Use "self" to filter for your own IP

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

## `pages deployment delete`

Delete a deployment in your Cloudflare Pages project

npmyarnpnpm

```
npx wrangler pages deployment delete [DEPLOYMENT-ID]
```

```
yarn wrangler pages deployment delete [DEPLOYMENT-ID]
```

```
pnpm wrangler pages deployment delete [DEPLOYMENT-ID]
```

* `[DEPLOYMENT-ID]` `string` required
The ID of the deployment to delete
* `--project-name` `string`
The name of the project the deployment belongs to
* `--force` `boolean` alias: --fdefault: false
Delete even if the deployment has an active alias

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

## `pages deploy`

Deploy a directory of static assets as a Pages deployment

npmyarnpnpm

```
npx wrangler pages deploy [DIRECTORY]
```

```
yarn wrangler pages deploy [DIRECTORY]
```

```
pnpm wrangler pages deploy [DIRECTORY]
```

* `[DIRECTORY]` `string`
The directory of static files to upload
* `--project-name` `string`
The name of the project you want to deploy to
* `--branch` `string`
The name of the branch you want to deploy to
* `--commit-hash` `string`
The SHA to attach to this deployment
* `--commit-message` `string`
The commit message to attach to this deployment
* `--commit-dirty` `boolean`
Whether or not the workspace should be considered dirty for this deployment
* `--skip-caching` `boolean`
Skip asset caching which speeds up builds
* `--no-bundle` `boolean`
Whether to run bundling on `_worker.js` before deploying
* `--upload-source-maps` `boolean` default: false
Whether to upload any server-side sourcemaps with this deployment

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

## `pages secret put`

Create or update a secret variable for a Pages project

npmyarnpnpm

```
npx wrangler pages secret put [KEY]
```

```
yarn wrangler pages secret put [KEY]
```

```
pnpm wrangler pages secret put [KEY]
```

* `[KEY]` `string` required
The variable name to be accessible in the Pages project
* `--project-name` `string` aliases: --project
The name of your Pages project

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

## `pages secret bulk`

Bulk upload secrets for a Pages project

npmyarnpnpm

```
npx wrangler pages secret bulk [FILE]
```

```
yarn wrangler pages secret bulk [FILE]
```

```
pnpm wrangler pages secret bulk [FILE]
```

* `[FILE]` `string`
The file of key-value pairs to upload, as JSON in form {"key": value, ...} or .dev.vars file in the form KEY=VALUE
* `--project-name` `string` aliases: --project
The name of your Pages project

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

## `pages secret delete`

Delete a secret variable from a Pages project

npmyarnpnpm

```
npx wrangler pages secret delete [KEY]
```

```
yarn wrangler pages secret delete [KEY]
```

```
pnpm wrangler pages secret delete [KEY]
```

* `[KEY]` `string` required
The variable name to be accessible in the Pages project
* `--project-name` `string` aliases: --project
The name of your Pages project

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

## `pages secret list`

List all secrets for a Pages project

npmyarnpnpm

```
npx wrangler pages secret list
```

```
yarn wrangler pages secret list
```

```
pnpm wrangler pages secret list
```

* `--project-name` `string` aliases: --project
The name of your Pages project

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

## `pages download config`


Experimental

Download your Pages project config as a Wrangler configuration file

npmyarnpnpm

```
npx wrangler pages download config [PROJECTNAME]
```

```
yarn wrangler pages download config [PROJECTNAME]
```

```
pnpm wrangler pages download config [PROJECTNAME]
```

* `[PROJECTNAME]` `string`
The Pages project to download
* `--force` `boolean`
Overwrite an existing Wrangler configuration file without prompting

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
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/wrangler/commands/pages/#page","headline":"Pages · Cloudflare Workers docs","description":"Wrangler commands for configuring Cloudflare Pages.","url":"https://developers.cloudflare.com/workers/wrangler/commands/pages/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
