---
description: Deploy EmDash, an open-source CMS built on Astro, to Cloudflare Workers with D1 for content and R2 for media.
title: EmDash
image: https://developers.cloudflare.com/workers/framework-guides/web-apps/emdash/og.png?v=09a15875378900ba
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

# EmDash

Last updated Nov 5, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/workers/framework-guides/web-apps/emdash/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

[EmDash ↗︎](https://emdashcms.com/) is an open-source, full-stack content management system (CMS) for [Astro](https://developers.cloudflare.com/workers/framework-guides/web-apps/astro/). An EmDash site runs on Workers, stores content in [D1](https://developers.cloudflare.com/d1/), and stores media in [R2](https://developers.cloudflare.com/r2/). It includes an admin panel, a plugin system, and a Model Context Protocol (MCP) server for editing content from AI tools.

The source code is available on [GitHub ↗︎](https://github.com/emdash-cms/emdash).

You need Node.js 22.23.4 or later and a Cloudflare account.

## Create an EmDash site

1. Create a project with [`create-emdash` ↗︎](https://www.npmjs.com/package/create-emdash):npmyarnpnpm

   ```
   npm create emdash@latest -- my-emdash-site
   ```

   ```
   yarn create emdash my-emdash-site
   ```

   ```
   pnpm create emdash@latest my-emdash-site
   ```

2. When prompted, choose the following options:
   - **Where will you deploy?** Cloudflare Workers
   - **Which template?** Starter, Blog, Marketing, or Portfolio
   - **Install dependencies?** Yes
   - **Enable sandboxed plugins?** No. You can turn them on later. For more information, refer to [Sandboxed plugins](#sandboxed-plugins).

   The scaffolder writes a generated `EMDASH_ENCRYPTION_KEY` to a `.env` file. Do not commit this file.
3. Go to the project directory:

   ```sh
   cd my-emdash-site
   ```

To create a project without prompts, pass the template and platform as flags:

npmyarnpnpm

```
npm create emdash@latest -- my-emdash-site --template cloudflare:starter --yes
```

```
yarn create emdash my-emdash-site --template cloudflare:starter --yes
```

```
pnpm create emdash@latest my-emdash-site --template cloudflare:starter --yes
```

## Cloudflare products EmDash uses

An EmDash site uses the following Cloudflare products:

| Product | Binding | Purpose | Configured in |
| --- | --- | --- | --- |
| [D1](https://developers.cloudflare.com/d1/) | `DB` | Stores content, users, and settings | `wrangler.jsonc` |
| [R2](https://developers.cloudflare.com/r2/) | `MEDIA` | Stores uploaded media | `wrangler.jsonc` |
| [Cron Triggers](https://developers.cloudflare.com/workers/configuration/cron-triggers/) | — | Runs scheduled publishing, plugin tasks, and backups | `wrangler.jsonc` |
| [Workers KV](https://developers.cloudflare.com/kv/) | `SESSION` | Stores Astro sessions | Added by `@astrojs/cloudflare` at build |
| [Images](https://developers.cloudflare.com/images/optimization/binding/) | `IMAGES` | Resizes and optimizes media | Added by `@astrojs/cloudflare` at build |
| [Workers Static Assets](https://developers.cloudflare.com/workers/static-assets/) | `ASSETS` | Serves the built front end and admin panel files | Added by `@astrojs/cloudflare` at build |
| [Dynamic Workers](https://developers.cloudflare.com/dynamic-workers/) | `LOADER` | Runs sandboxed plugins in isolation (optional) | `wrangler.jsonc` |

The template configures the D1, R2, and Cron Trigger bindings in `wrangler.jsonc`:

```jsonc
{
  "$schema": "./node_modules/wrangler/config-schema.json",
  "name": "my-emdash-site",
  "main": "./src/worker.ts",
  // Set this to today's date
  "compatibility_date": "2026-11-06",
  "d1_databases": [
    {
      "binding": "DB",
      "database_name": "my-emdash-site"
    }
  ],
  "r2_buckets": [
    {
      "binding": "MEDIA",
      "bucket_name": "my-emdash-media"
    }
  ],
  "triggers": {
    "crons": [
      "* * * * *"
    ]
  }
}
```

```toml
name = "my-emdash-site"
main = "./src/worker.ts"
# Set this to today's date
compatibility_date = "2026-11-06"

[[d1_databases]]
binding = "DB"
database_name = "my-emdash-site"

[[r2_buckets]]
binding = "MEDIA"
bucket_name = "my-emdash-media"

[triggers]
crons = ["* * * * *"]
```

The template pins an earlier compatibility date and sets the `nodejs_compat` flag. Keep the flag unless you update the compatibility date to `2026-08-04` or later, which turns on Node.js compatibility by default.

EmDash connects to these bindings by name in `astro.config.mjs`. The binding names in both files must match:

*astro.config.mjsjs*

```js
import cloudflare from "@astrojs/cloudflare";
import react from "@astrojs/react";
import { d1, r2 } from "@emdash-cms/cloudflare";
import { defineConfig } from "astro/config";
import emdash from "emdash/astro";

export default defineConfig({
	output: "server",
	adapter: cloudflare(),
	integrations: [
		react(),
		emdash({
			database: d1({ binding: "DB", session: "auto", coalesce: true }),
			storage: r2({ binding: "MEDIA" }),
		}),
	],
});
```

The Worker entry point in `src/worker.ts` exports a `scheduled` handler. The Cron Trigger calls this handler to publish scheduled content. Keep both the Cron Trigger and the handler, or scheduled entries do not go live.

## Preview and deploy

1. Build the site:npmyarnpnpm

   ```
   npm run build
   ```

   ```
   yarn run build
   ```

   ```
   pnpm run build
   ```

2. Preview the site:npmyarnpnpm

   ```
   npx wrangler dev
   ```

   ```
   yarn wrangler dev
   ```

   ```
   pnpm wrangler dev
   ```

   Open the local URL that Wrangler prints. To start the setup wizard, go to `/_emdash/admin/`.
3. Deploy the site:npmyarnpnpm

   ```
   npm run deploy
   ```

   ```
   yarn run deploy
   ```

   ```
   pnpm run deploy
   ```

   On the first deploy, Wrangler creates the D1 database, R2 bucket, and KV namespace that the site uses.
4. Open the `workers.dev` URL that Wrangler prints, then go to `/_emdash/admin/` to complete setup.

Caution

The first person to finish the setup wizard becomes the administrator. Complete setup right after you deploy.

Passkeys only work on the hostname where you create them. To use a custom domain, run setup on that domain, or set `EMDASH_SITE_URL` to it before setup.

To use encrypted plugin settings in production, upload the encryption key from `.env` as a [secret](https://developers.cloudflare.com/workers/configuration/secrets/):

npmyarnpnpm

```
npx wrangler secret put EMDASH_ENCRYPTION_KEY
```

```
yarn wrangler secret put EMDASH_ENCRYPTION_KEY
```

```
pnpm wrangler secret put EMDASH_ENCRYPTION_KEY
```

## Sandboxed plugins

EmDash can run plugins in isolated sandboxes with [Dynamic Workers](https://developers.cloudflare.com/dynamic-workers/). Sandboxed plugins cannot access environment variables or the file system.

Note

Dynamic Workers are only available on the [Workers Paid plan](https://developers.cloudflare.com/workers/platform/pricing/).

To turn on sandboxed plugins:

1. In `wrangler.jsonc`, uncomment the `worker_loaders` binding:

   ```jsonc
   {
     "$schema": "./node_modules/wrangler/config-schema.json",
     "worker_loaders": [
       {
         "binding": "LOADER"
       }
     ]
   }
   ```

   ```toml
   [[worker_loaders]]
   binding = "LOADER"
   ```

2. In `astro.config.mjs`, import `sandbox` and pass it to EmDash as `sandboxRunner`:

   *astro.config.mjsjs*



   ```js
   import { d1, r2, sandbox } from "@emdash-cms/cloudflare";

   emdash({
   	database: d1({ binding: "DB", session: "auto", coalesce: true }),
   	storage: r2({ binding: "MEDIA" }),
   	sandboxRunner: sandbox(),
   });
   ```

3. Build and deploy the site again.

## Build with AI tools

Each EmDash template for Cloudflare includes an `AGENTS.md` file, agent skills, and an MCP configuration for the [EmDash documentation ↗︎](https://docs.emdashcms.com/docs-mcp/). AI coding tools that read these files can work with EmDash without extra setup.

Each deployed site also includes an [MCP server ↗︎](https://docs.emdashcms.com/reference/mcp-server/). Connect an MCP client to draft, edit, and schedule content.

## Next steps

- [Deploy to Cloudflare ↗︎](https://docs.emdashcms.com/deployment/cloudflare/) in the EmDash documentation covers caching, custom domains, email, Cloudflare Access, and preview deployments.
- [Migrate from WordPress ↗︎](https://docs.emdashcms.com/migration/from-wordpress/) imports posts, pages, and media from a WordPress export.
- [Astro on Workers](https://developers.cloudflare.com/workers/framework-guides/web-apps/astro/) covers the Astro adapter, bindings, and sessions.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/framework-guides/web-apps/emdash/#page","headline":"EmDash","description":"Deploy EmDash, an open-source CMS built on Astro, to Cloudflare Workers with D1 for content and R2 for media.","url":"https://developers.cloudflare.com/workers/framework-guides/web-apps/emdash/","inLanguage":"en","image":"https://developers.cloudflare.com/workers/framework-guides/web-apps/emdash/og.png?v=09a15875378900ba","dateModified":"2026-11-05","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["full-stack","Astro"]}
```
