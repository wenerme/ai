---
description: Wrangler CLI commands for querying data with R2 SQL.
title: Wrangler commands
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/r2-sql/llms.txt
> Use this file to discover all available pages before exploring further.

#  Wrangler commands

Last updated Apr 21, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/r2-sql/reference/wrangler-commands/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

Note

R2 SQL is currently in open beta. Report R2 SQL bugs in [GitHub ↗](https://github.com/cloudflare/workers-sdk/issues/new/choose). R2 SQL expects there to be a [WRANGLER\_R2\_SQL\_AUTH\_TOKEN](https://developers.cloudflare.com/r2-sql/query-data/#authentication) environment variable to be set.

### `r2 sql query`

Execute SQL query against R2 Data Catalog

 npm  yarn  pnpm

```
npx wrangler r2 sql query [WAREHOUSE] [QUERY]
```

```
yarn wrangler r2 sql query [WAREHOUSE] [QUERY]
```

```
pnpm wrangler r2 sql query [WAREHOUSE] [QUERY]
```

* `[WAREHOUSE]` ` string ` required
R2 Data Catalog warehouse name
* `[QUERY]` ` string ` required
The SQL query to execute

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

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/r2-sql/reference/wrangler-commands/#page","headline":"Wrangler commands · R2 SQL docs","description":"Wrangler CLI commands for querying data with R2 SQL.","url":"https://developers.cloudflare.com/r2-sql/reference/wrangler-commands/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
