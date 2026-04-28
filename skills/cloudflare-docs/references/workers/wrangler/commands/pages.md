---
title: Pages
description: Wrangler commands for configuring Cloudflare Pages.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

# Pages

Configure [Cloudflare Pages](https://developers.cloudflare.com/pages/) using Wrangler.

## `pages dev`

Develop your full-stack Pages application locally

* [  npm ](#tab-panel-9388)
* [  pnpm ](#tab-panel-9389)
* [  yarn ](#tab-panel-9390)

Terminal window

```

npx wrangler pages dev [DIRECTORY] [COMMAND]


```

Terminal window

```

pnpm wrangler pages dev [DIRECTORY] [COMMAND]


```

Terminal window

```

yarn wrangler pages dev [DIRECTORY] [COMMAND]


```

* `[DIRECTORY]` ` string `  
The directory of static assets to serve
* `[COMMAND]` ` string `  
The proxy command to run \[deprecated\]
* `--compatibility-date` ` string `  
Date to use for compatibility checks
* `--compatibility-flags` ` string ` alias: --compatibility-flag  
Flags to use for compatibility checks
* `--ip` ` string `  
The IP address to listen on
* `--port` ` number `  
The port to listen on (serve from)
* `--inspector-port` ` number `  
Port for devtools to connect to
* `--proxy` ` number `  
The port to proxy (where the static assets are served)
* `--script-path` ` string `  
The location of the single Worker script if not using functions \[default: \_worker.js\]
* `--no-bundle` ` boolean `  
Whether to run bundling on `_worker.js`
* `--binding` ` array ` alias: --b  
Bind variable/secret (KEY=VALUE)
* `--kv` ` array ` alias: --k  
KV namespace to bind (--kv KV\_BINDING)
* `--d1` ` array `  
D1 database to bind (--d1 D1\_BINDING)
* `--do` ` array ` alias: --o  
Durable Object to bind (--do DO\_BINDING=CLASS\_NAME@SCRIPT\_NAME)
* `--r2` ` array `  
R2 bucket to bind (--r2 R2\_BINDING)
* `--ai` ` string `  
AI to bind (--ai AI\_BINDING)
* `--version-metadata` ` string `  
Worker Version metadata (--version-metadata VERSION\_METADATA\_BINDING)
* `--service` ` array `  
Service to bind (--service SERVICE=SCRIPT\_NAME)
* `--live-reload` ` boolean ` default: false  
Auto reload HTML pages when change is detected
* `--local-protocol` ` "http" | "https" `  
Protocol to listen to requests on, defaults to http.
* `--https-key-path` ` string `  
Path to a custom certificate key
* `--https-cert-path` ` string `  
Path to a custom certificate
* `--persist-to` ` string `  
Specify directory to use for local persistence (defaults to .wrangler/state)
* `--log-level` ` "debug" | "info" | "log" | "warn" | "error" | "none" `  
Specify logging level
* `--show-interactive-dev-session` ` boolean `  
Show interactive dev session (defaults to true if the terminal supports interactivity)

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

## `pages functions build`

Compile a folder of Pages Functions into a single Worker

* [  npm ](#tab-panel-9391)
* [  pnpm ](#tab-panel-9392)
* [  yarn ](#tab-panel-9393)

Terminal window

```

npx wrangler pages functions build [DIRECTORY]


```

Terminal window

```

pnpm wrangler pages functions build [DIRECTORY]


```

Terminal window

```

yarn wrangler pages functions build [DIRECTORY]


```

* `[DIRECTORY]` ` string ` default: functions  
The directory of Pages Functions
* `--outfile` ` string `  
The location of the output Worker script
* `--outdir` ` string `  
Output directory for the bundled Worker
* `--output-config-path` ` string `  
The location for the output config file
* `--build-metadata-path` ` string `  
The location for the build metadata file
* `--project-directory` ` string `  
The location of the Pages project
* `--output-routes-path` ` string `  
The location for the output \_routes.json file
* `--minify` ` boolean ` default: false  
Minify the output Worker script
* `--sourcemap` ` boolean ` default: false  
Generate a sourcemap for the output Worker script
* `--fallback-service` ` string ` default: ASSETS  
The service to fallback to at the end of the `next` chain. Setting to '' will fallback to the global `fetch`.
* `--watch` ` boolean ` default: false  
Watch for changes to the functions and automatically rebuild the Worker script
* `--plugin` ` boolean ` default: false  
Build a plugin rather than a Worker script
* `--build-output-directory` ` string `  
The directory to output static assets to
* `--compatibility-date` ` string `  
Date to use for compatibility checks
* `--compatibility-flags` ` string ` alias: --compatibility-flag  
Flags to use for compatibility checks
* `--external` ` string `  
A list of module imports to exclude from bundling
* `--metafile` ` string `  
Path to output build metadata from esbuild. If flag is used without a path, defaults to 'bundle-meta.json' inside the directory specified by --outdir.

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

## `pages project list`

List your Cloudflare Pages projects

* [  npm ](#tab-panel-9394)
* [  pnpm ](#tab-panel-9395)
* [  yarn ](#tab-panel-9396)

Terminal window

```

npx wrangler pages project list


```

Terminal window

```

pnpm wrangler pages project list


```

Terminal window

```

yarn wrangler pages project list


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

## `pages project create`

Create a new Cloudflare Pages project

* [  npm ](#tab-panel-9397)
* [  pnpm ](#tab-panel-9398)
* [  yarn ](#tab-panel-9399)

Terminal window

```

npx wrangler pages project create [PROJECT-NAME]


```

Terminal window

```

pnpm wrangler pages project create [PROJECT-NAME]


```

Terminal window

```

yarn wrangler pages project create [PROJECT-NAME]


```

* `[PROJECT-NAME]` ` string ` required  
The name of your Pages project
* `--production-branch` ` string `  
The name of the production branch of your project
* `--compatibility-flags` ` string ` alias: --compatibility-flag  
Flags to use for compatibility checks
* `--compatibility-date` ` string `  
Date to use for compatibility checks

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

## `pages project delete`

Delete a Cloudflare Pages project

* [  npm ](#tab-panel-9400)
* [  pnpm ](#tab-panel-9401)
* [  yarn ](#tab-panel-9402)

Terminal window

```

npx wrangler pages project delete [PROJECT-NAME]


```

Terminal window

```

pnpm wrangler pages project delete [PROJECT-NAME]


```

Terminal window

```

yarn wrangler pages project delete [PROJECT-NAME]


```

* `[PROJECT-NAME]` ` string ` required  
The name of your Pages project
* `--yes` ` boolean ` alias: --y  
Answer "yes" to confirm project deletion

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

## `pages deployment list`

List deployments in your Cloudflare Pages project

* [  npm ](#tab-panel-9403)
* [  pnpm ](#tab-panel-9404)
* [  yarn ](#tab-panel-9405)

Terminal window

```

npx wrangler pages deployment list


```

Terminal window

```

pnpm wrangler pages deployment list


```

Terminal window

```

yarn wrangler pages deployment list


```

* `--project-name` ` string `  
The name of the project you would like to list deployments for
* `--environment` ` string `  
Environment type to list deployments for
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

## `pages deployment tail`

Start a tailing session for a project's deployment and livestream logs from your Functions

* [  npm ](#tab-panel-9406)
* [  pnpm ](#tab-panel-9407)
* [  yarn ](#tab-panel-9408)

Terminal window

```

npx wrangler pages deployment tail [DEPLOYMENT]


```

Terminal window

```

pnpm wrangler pages deployment tail [DEPLOYMENT]


```

Terminal window

```

yarn wrangler pages deployment tail [DEPLOYMENT]


```

* `[DEPLOYMENT]` ` string `  
(Optional) ID or URL of the deployment to tail. Specify by environment if deployment ID is unknown.
* `--project-name` ` string `  
The name of the project you would like to tail
* `--environment` ` string ` default: production  
When not providing a specific deployment ID, specifying environment will grab the latest production or preview deployment
* `--format` ` string `  
The format of log entries
* `--status` ` "ok" | "error" | "canceled" `  
Filter by invocation status
* `--header` ` string `  
Filter by HTTP header
* `--method` ` string `  
Filter by HTTP method
* `--search` ` string `  
Filter by a text match in console.log messages
* `--sampling-rate` ` number `  
Adds a percentage of requests to log sampling rate
* `--ip` ` string `  
Filter by the IP address the request originates from. Use "self" to filter for your own IP

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

## `pages deployment delete`

Delete a deployment in your Cloudflare Pages project

* [  npm ](#tab-panel-9409)
* [  pnpm ](#tab-panel-9410)
* [  yarn ](#tab-panel-9411)

Terminal window

```

npx wrangler pages deployment delete [DEPLOYMENT-ID]


```

Terminal window

```

pnpm wrangler pages deployment delete [DEPLOYMENT-ID]


```

Terminal window

```

yarn wrangler pages deployment delete [DEPLOYMENT-ID]


```

* `[DEPLOYMENT-ID]` ` string ` required  
The ID of the deployment to delete
* `--project-name` ` string `  
The name of the project the deployment belongs to
* `--force` ` boolean ` alias: --f default: false  
Skip confirmation

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

## `pages deploy`

Deploy a directory of static assets as a Pages deployment

* [  npm ](#tab-panel-9412)
* [  pnpm ](#tab-panel-9413)
* [  yarn ](#tab-panel-9414)

Terminal window

```

npx wrangler pages deploy [DIRECTORY]


```

Terminal window

```

pnpm wrangler pages deploy [DIRECTORY]


```

Terminal window

```

yarn wrangler pages deploy [DIRECTORY]


```

* `[DIRECTORY]` ` string `  
The directory of static files to upload
* `--project-name` ` string `  
The name of the project you want to deploy to
* `--branch` ` string `  
The name of the branch you want to deploy to
* `--commit-hash` ` string `  
The SHA to attach to this deployment
* `--commit-message` ` string `  
The commit message to attach to this deployment
* `--commit-dirty` ` boolean `  
Whether or not the workspace should be considered dirty for this deployment
* `--skip-caching` ` boolean `  
Skip asset caching which speeds up builds
* `--no-bundle` ` boolean `  
Whether to run bundling on `_worker.js` before deploying
* `--upload-source-maps` ` boolean ` default: false  
Whether to upload any server-side sourcemaps with this deployment

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

## `pages secret put`

Create or update a secret variable for a Pages project

* [  npm ](#tab-panel-9415)
* [  pnpm ](#tab-panel-9416)
* [  yarn ](#tab-panel-9417)

Terminal window

```

npx wrangler pages secret put [KEY]


```

Terminal window

```

pnpm wrangler pages secret put [KEY]


```

Terminal window

```

yarn wrangler pages secret put [KEY]


```

* `[KEY]` ` string ` required  
The variable name to be accessible in the Pages project
* `--project-name` ` string ` aliases: --project  
The name of your Pages project

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

## `pages secret bulk`

Bulk upload secrets for a Pages project

* [  npm ](#tab-panel-9418)
* [  pnpm ](#tab-panel-9419)
* [  yarn ](#tab-panel-9420)

Terminal window

```

npx wrangler pages secret bulk [FILE]


```

Terminal window

```

pnpm wrangler pages secret bulk [FILE]


```

Terminal window

```

yarn wrangler pages secret bulk [FILE]


```

* `[FILE]` ` string `  
The file of key-value pairs to upload, as JSON in form {"key": value, ...} or .dev.vars file in the form KEY=VALUE
* `--project-name` ` string ` aliases: --project  
The name of your Pages project

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

## `pages secret delete`

Delete a secret variable from a Pages project

* [  npm ](#tab-panel-9421)
* [  pnpm ](#tab-panel-9422)
* [  yarn ](#tab-panel-9423)

Terminal window

```

npx wrangler pages secret delete [KEY]


```

Terminal window

```

pnpm wrangler pages secret delete [KEY]


```

Terminal window

```

yarn wrangler pages secret delete [KEY]


```

* `[KEY]` ` string ` required  
The variable name to be accessible in the Pages project
* `--project-name` ` string ` aliases: --project  
The name of your Pages project

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

## `pages secret list`

List all secrets for a Pages project

* [  npm ](#tab-panel-9424)
* [  pnpm ](#tab-panel-9425)
* [  yarn ](#tab-panel-9426)

Terminal window

```

npx wrangler pages secret list


```

Terminal window

```

pnpm wrangler pages secret list


```

Terminal window

```

yarn wrangler pages secret list


```

* `--project-name` ` string ` aliases: --project  
The name of your Pages project

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

## `pages download config`

  
Experimental 

Download your Pages project config as a Wrangler configuration file

* [  npm ](#tab-panel-9427)
* [  pnpm ](#tab-panel-9428)
* [  yarn ](#tab-panel-9429)

Terminal window

```

npx wrangler pages download config [PROJECTNAME]


```

Terminal window

```

pnpm wrangler pages download config [PROJECTNAME]


```

Terminal window

```

yarn wrangler pages download config [PROJECTNAME]


```

* `[PROJECTNAME]` ` string `  
The Pages project to download
* `--force` ` boolean `  
Overwrite an existing Wrangler configuration file without prompting

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
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/wrangler/","name":"Wrangler"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/wrangler/commands/","name":"Commands"}},{"@type":"ListItem","position":5,"item":{"@id":"/workers/wrangler/commands/pages/","name":"Pages"}}]}
```
