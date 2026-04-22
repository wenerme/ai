---
title: Wrangler commands
description: Wrangler CLI commands for querying data with R2 SQL.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/r2-sql/reference/wrangler-commands.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Wrangler commands

Note

R2 SQL is currently in open beta. Report R2 SQL bugs in [GitHub ↗](https://github.com/cloudflare/workers-sdk/issues/new/choose). R2 SQL expects there to be a [WRANGLER\_R2\_SQL\_AUTH\_TOKEN](https://developers.cloudflare.com/r2-sql/query-data/#authentication) environment variable to be set.

### `r2 sql query`

Execute SQL query against R2 Data Catalog

* [  npm ](#tab-panel-8012)
* [  pnpm ](#tab-panel-8013)
* [  yarn ](#tab-panel-8014)

Terminal window

```

npx wrangler r2 sql query [WAREHOUSE] [QUERY]


```

Terminal window

```

pnpm wrangler r2 sql query [WAREHOUSE] [QUERY]


```

Terminal window

```

yarn wrangler r2 sql query [WAREHOUSE] [QUERY]


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

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/r2-sql/","name":"R2 SQL"}},{"@type":"ListItem","position":3,"item":{"@id":"/r2-sql/reference/","name":"Reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/r2-sql/reference/wrangler-commands/","name":"Wrangler commands"}}]}
```
