---
title: Wrangler commands
description: Use Wrangler CLI commands to create, manage, and query D1 databases.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/d1/llms.txt
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop)

# Wrangler commands

D1 Wrangler commands use REST APIs to interact with the control plane. This page lists the Wrangler commands for D1.

## `d1 create`

Creates a new D1 database, and provides the binding and UUID that you will put in your config file

This command acts on remote D1 Databases.

* [  npm ](#tab-panel-8401)
* [  pnpm ](#tab-panel-8402)
* [  yarn ](#tab-panel-8403)

```sh
npx wrangler d1 create [NAME]
```

```sh
pnpm wrangler d1 create [NAME]
```

```sh
yarn wrangler d1 create [NAME]
```

* `[NAME]` ` string ` required
The name of the new D1 database
* `--location` ` string `
A hint for the primary location of the new DB. Options: weur: Western Europe eeur: Eastern Europe apac: Asia Pacific oc: Oceania wnam: Western North America enam: Eastern North America
* `--jurisdiction` ` string `
The location to restrict the D1 database to run and store data within to comply with local regulations. Note that if jurisdictions are set, the location hint is ignored. Options: eu: The European Union fedramp: FedRAMP-compliant data centers
* `--use-remote` ` boolean `
Use a remote binding when adding the newly created resource to your config
* `--update-config` ` boolean `
Automatically update your config file with the newly added resource
* `--binding` ` string `
The binding name of this resource in your Worker

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

## `d1 info`

Get information about a D1 database, including the current database size and state

This command acts on remote D1 Databases.

* [  npm ](#tab-panel-8404)
* [  pnpm ](#tab-panel-8405)
* [  yarn ](#tab-panel-8406)

```sh
npx wrangler d1 info [NAME]
```

```sh
pnpm wrangler d1 info [NAME]
```

```sh
yarn wrangler d1 info [NAME]
```

* `[NAME]` ` string ` required
The name of the DB
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

## `d1 list`

List all D1 databases in your account

This command acts on remote D1 Databases.

* [  npm ](#tab-panel-8407)
* [  pnpm ](#tab-panel-8408)
* [  yarn ](#tab-panel-8409)

```sh
npx wrangler d1 list
```

```sh
pnpm wrangler d1 list
```

```sh
yarn wrangler d1 list
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

## `d1 delete`

Delete a D1 database

This command acts on remote D1 Databases.

* [  npm ](#tab-panel-8410)
* [  pnpm ](#tab-panel-8411)
* [  yarn ](#tab-panel-8412)

```sh
npx wrangler d1 delete [NAME]
```

```sh
pnpm wrangler d1 delete [NAME]
```

```sh
yarn wrangler d1 delete [NAME]
```

* `[NAME]` ` string ` required
The name or binding of the DB
* `--skip-confirmation` ` boolean ` alias: --y default: false
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
* `--install-skills` ` boolean ` default: false
Install Cloudflare skills for detected AI coding agents before running the command
* `--profile` ` string `
Use a specific auth profile

## `d1 execute`

Execute a command or SQL file

You must provide either --command or --file for this command to run successfully.

* [  npm ](#tab-panel-8413)
* [  pnpm ](#tab-panel-8414)
* [  yarn ](#tab-panel-8415)

```sh
npx wrangler d1 execute [DATABASE]
```

```sh
pnpm wrangler d1 execute [DATABASE]
```

```sh
yarn wrangler d1 execute [DATABASE]
```

* `[DATABASE]` ` string ` required
The name or binding of the DB
* `--command` ` string `
The SQL query you wish to execute, or multiple queries separated by ';'
* `--file` ` string `
A .sql file to ingest
* `--yes` ` boolean ` alias: --y
Answer "yes" to any prompts
* `--local` ` boolean `
Execute commands/files against a local DB for use with wrangler dev
* `--remote` ` boolean `
Execute commands/files against a remote D1 database for use with remote bindings or your deployed Worker
* `--persist-to` ` string `
Specify directory to use for local persistence (for use with --local)
* `--json` ` boolean ` default: false
Return output as JSON
* `--preview` ` boolean ` default: false
Execute commands/files against a preview D1 database

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

## `d1 export`

Export the contents or schema of your database as a .sql file

* [  npm ](#tab-panel-8416)
* [  pnpm ](#tab-panel-8417)
* [  yarn ](#tab-panel-8418)

```sh
npx wrangler d1 export [NAME]
```

```sh
pnpm wrangler d1 export [NAME]
```

```sh
yarn wrangler d1 export [NAME]
```

* `[NAME]` ` string ` required
The name of the D1 database to export
* `--local` ` boolean `
Export from your local DB you use with wrangler dev
* `--remote` ` boolean `
Export from a remote D1 database
* `--skip-confirmation` ` boolean ` alias: --y default: false
Skip confirmation
* `--output` ` string ` required
Path to the SQL file for your export
* `--table` ` string `
Specify which tables to include in export
* `--no-schema` ` boolean `
Only output table contents, not the DB schema
* `--no-data` ` boolean `
Only output table schema, not the contents of the DBs themselves

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

## `d1 time-travel info`

Retrieve information about a database at a specific point-in-time using Time Travel

This command acts on remote D1 Databases.

For more information about Time Travel, see <https://developers.cloudflare.com/d1/reference/time-travel/>

* [  npm ](#tab-panel-8419)
* [  pnpm ](#tab-panel-8420)
* [  yarn ](#tab-panel-8421)

```sh
npx wrangler d1 time-travel info [DATABASE]
```

```sh
pnpm wrangler d1 time-travel info [DATABASE]
```

```sh
yarn wrangler d1 time-travel info [DATABASE]
```

* `[DATABASE]` ` string ` required
The name or binding of the DB
* `--timestamp` ` string `
Accepts a Unix (seconds from epoch) or RFC3339 timestamp (e.g. 2023-07-13T08:46:42.228Z) to retrieve a bookmark for
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

## `d1 time-travel restore`

Restore a database back to a specific point-in-time

This command acts on remote D1 Databases.

For more information about Time Travel, see <https://developers.cloudflare.com/d1/reference/time-travel/>

* [  npm ](#tab-panel-8422)
* [  pnpm ](#tab-panel-8423)
* [  yarn ](#tab-panel-8424)

```sh
npx wrangler d1 time-travel restore [DATABASE]
```

```sh
pnpm wrangler d1 time-travel restore [DATABASE]
```

```sh
yarn wrangler d1 time-travel restore [DATABASE]
```

* `[DATABASE]` ` string ` required
The name or binding of the DB
* `--bookmark` ` string `
Bookmark to use for time travel
* `--timestamp` ` string `
Accepts a Unix (seconds from epoch) or RFC3339 timestamp (e.g. 2023-07-13T08:46:42.228Z) to retrieve a bookmark for (within the last 30 days)
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

## `d1 migrations create`

Create a new migration

This will generate a new versioned file inside the 'migrations' folder. Name your migration file as a description of your change. This will make it easier for you to find your migration in the 'migrations' folder. An example filename looks like:

```
0000_create_user_table.sql

```

The filename will include a version number and the migration name you specify.

* [  npm ](#tab-panel-8425)
* [  pnpm ](#tab-panel-8426)
* [  yarn ](#tab-panel-8427)

```sh
npx wrangler d1 migrations create [DATABASE] [MESSAGE]
```

```sh
pnpm wrangler d1 migrations create [DATABASE] [MESSAGE]
```

```sh
yarn wrangler d1 migrations create [DATABASE] [MESSAGE]
```

* `[DATABASE]` ` string ` required
The name or binding of the DB
* `[MESSAGE]` ` string ` required
The Migration message

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

## `d1 migrations list`

View a list of unapplied migration files

* [  npm ](#tab-panel-8428)
* [  pnpm ](#tab-panel-8429)
* [  yarn ](#tab-panel-8430)

```sh
npx wrangler d1 migrations list [DATABASE]
```

```sh
pnpm wrangler d1 migrations list [DATABASE]
```

```sh
yarn wrangler d1 migrations list [DATABASE]
```

* `[DATABASE]` ` string ` required
The name or binding of the DB
* `--local` ` boolean `
Check migrations against a local DB for use with wrangler dev
* `--remote` ` boolean `
Check migrations against a remote DB for use with wrangler dev --remote
* `--preview` ` boolean ` default: false
Check migrations against a preview D1 DB
* `--persist-to` ` string `
Specify directory to use for local persistence (you must use --local with this flag)

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

## `d1 migrations apply`

Apply any unapplied D1 migrations

This command will prompt you to confirm the migrations you are about to apply. Confirm that you would like to proceed. After applying, a backup will be captured.

The progress of each migration will be printed in the console.

When running the apply command in a CI/CD environment or another non-interactive command line, the confirmation step will be skipped, but the backup will still be captured.

If applying a migration results in an error, this migration will be rolled back, and the previous successful migration will remain applied.

* [  npm ](#tab-panel-8431)
* [  pnpm ](#tab-panel-8432)
* [  yarn ](#tab-panel-8433)

```sh
npx wrangler d1 migrations apply [DATABASE]
```

```sh
pnpm wrangler d1 migrations apply [DATABASE]
```

```sh
yarn wrangler d1 migrations apply [DATABASE]
```

* `[DATABASE]` ` string ` required
The name or binding of the DB
* `--local` ` boolean `
Execute commands/files against a local DB for use with wrangler dev
* `--remote` ` boolean `
Execute commands/files against a remote DB for use with wrangler dev --remote
* `--preview` ` boolean ` default: false
Execute commands/files against a preview D1 DB
* `--persist-to` ` string `
Specify directory to use for local persistence (you must use --local with this flag)

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

## `d1 insights`


Experimental

Get information about the queries run on a D1 database

This command acts on remote D1 Databases.

* [  npm ](#tab-panel-8434)
* [  pnpm ](#tab-panel-8435)
* [  yarn ](#tab-panel-8436)

```sh
npx wrangler d1 insights [NAME]
```

```sh
pnpm wrangler d1 insights [NAME]
```

```sh
yarn wrangler d1 insights [NAME]
```

* `[NAME]` ` string ` required
The name of the DB
* `--time-period` ` string ` default: 1d
Fetch data from now to the provided time period
* `--sort-type` ` string ` default: sum
Choose the operation you want to sort insights by
* `--sort-by` ` string ` default: time
Choose the field you want to sort insights by
* `--sort-direction` ` string ` default: DESC
Choose a sort direction
* `--limit` ` number ` default: 5
fetch insights about the first X queries
* `--json` ` boolean ` default: false
return output as JSON

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
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/d1/wrangler-commands/#page","headline":"Wrangler commands · Cloudflare D1 docs","description":"Use Wrangler CLI commands to create, manage, and query D1 databases.","url":"https://developers.cloudflare.com/d1/wrangler-commands/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/d1/","name":"D1"}},{"@type":"ListItem","position":3,"item":{"@id":"/d1/wrangler-commands/","name":"Wrangler commands"}}]}
```
