---
description: Wrangler CLI commands for querying data with R2 SQL.
title: Wrangler commands
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/r2-sql/llms.txt
> Use this file to discover all available pages before exploring further.

# Wrangler commands

Last updated Apr 21, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/r2-sql/reference/wrangler-commands/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Note

R2 SQL is currently in open beta. Report R2 SQL bugs in [GitHub ↗︎](https://github.com/cloudflare/workers-sdk/issues/new/choose). R2 SQL expects there to be a [`WRANGLER_R2_SQL_AUTH_TOKEN`](https://developers.cloudflare.com/r2-sql/query-data/#authentication) environment variable to be set.

### `r2 sql query`

Execute SQL query against R2 Data Catalog

npmyarnpnpm

```
npx wrangler r2 sql query <WAREHOUSE> <QUERY>
```

```
yarn wrangler r2 sql query <WAREHOUSE> <QUERY>
```

```
pnpm wrangler r2 sql query <WAREHOUSE> <QUERY>
```

- `<WAREHOUSE>` `string` required

  R2 Data Catalog warehouse name
- `<QUERY>` `string` required

  The SQL query to execute

<details>

<summary>

Global flags

</summary>

- <code>--v</code><code>boolean</code> alias: --version

  Show version number
- <code>--cwd</code><code>string</code>Run as if Wrangler was started in the specified directory instead of the current working directory
- <code>--config</code><code>string</code> alias: --c

  Path to Wrangler configuration file
- <code>--env</code><code>string</code> alias: --e

  Environment to use for operations, and for selecting .env and .dev.vars files
- <code>--env-file</code><code>string</code>Path to an .env file to load - can be specified multiple times - values from earlier files are overridden by values in later files
- <code>--install-skills</code><code>boolean</code> default: false

  Install Cloudflare skills for detected AI coding agents before running the command
- <code>--profile</code><code>string</code>Use a specific auth profile

</details>

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/r2-sql/reference/wrangler-commands/#page","headline":"Wrangler commands","description":"Wrangler CLI commands for querying data with R2 SQL.","url":"https://developers.cloudflare.com/r2-sql/reference/wrangler-commands/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
