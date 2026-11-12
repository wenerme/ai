---
description: Move TanStack Start off Vercel by replacing the Nitro Vite plugin with the Cloudflare Vite plugin. Server functions and server routes run on Workers unchanged.
title: Migrate TanStack Start from Vercel to Cloudflare Workers
image: https://developers.cloudflare.com/workers/static-assets/migration-guides/vercel-to-workers/tanstack-start/og.png?v=46dc508f186a6873
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

# Migrate TanStack Start from Vercel to Cloudflare Workers

Last updated Nov 11, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/workers/static-assets/migration-guides/vercel-to-workers/tanstack-start/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

This guide moves a [TanStack Start ↗︎](https://tanstack.com/start) application from Vercel to Cloudflare Workers. On Vercel, TanStack Start runs through the Nitro Vite plugin. On Workers, the [Cloudflare Vite plugin](https://developers.cloudflare.com/workers/vite-plugin/) replaces it.

Server functions, server routes, and client-only routes work without code changes.

## Before you begin

- Your project must use `@tanstack/react-start` 1.132.0 or later. Earlier versions do not export `@tanstack/react-start/server-entry`. Upgrade all `@tanstack/*` packages to the same version.
- Your project must build with Vite. Projects built with Rsbuild are not supported.
- Review the steps in [Before you begin](https://developers.cloudflare.com/workers/static-assets/migration-guides/vercel-to-workers/#before-you-begin) that apply to every framework.

## Migrate with a coding agent

Copy this prompt into your coding agent. The agent stops before it deploys.

```txt
Migrate this TanStack Start app from Vercel to Cloudflare Workers (Workers with Static Assets, not Pages).

0. Work on a new git branch. Install dependencies exactly as locked with the repository's package manager (<pm>).
   - If <pm> rejects the lockfile format (for example, pnpm 10 or later with lockfileVersion '6.0'), convert the lockfile with an older major version, such as `npx pnpm@9 install --lockfile-only`. Do not re-resolve dependencies. Commit the conversion separately.
   - With pnpm 10 or later, add `allowBuilds: { esbuild: true, workerd: true }` to pnpm-workspace.yaml. Never run the interactive `pnpm approve-builds`.
1. Confirm that vite.config.ts uses tanstackStart() from @tanstack/react-start/plugin/vite. If the project uses Rsbuild, stop and tell me. Confirm that @tanstack/react-start is 1.132.0 or later. If it is older, stop and propose upgrading all @tanstack/* packages together.
2. Remove Vercel configuration:
   - Port redirects and headers from vercel.json, then delete vercel.json and .vercel/.
   - Uninstall the `nitro` package. Remove the nitro() plugin and its import from vite.config.ts.
   - List runtime @vercel/* usage (kv, blob, postgres, og, edge-config, analytics). Propose Cloudflare equivalents, but do not rewrite them without asking me.
3. Install @cloudflare/vite-plugin and wrangler as dev dependencies.
4. In vite.config.ts, add cloudflare({ viteEnvironment: { name: "ssr" } }) as the first plugin. Keep tanstackStart() before the React plugin. Keep all other plugins in their existing order.
5. Create wrangler.jsonc with "$schema": "node_modules/wrangler/config-schema.json", "name": "<repository name, lowercase, hyphens>", "main": "@tanstack/react-start/server-entry", "compatibility_date": "<today>", and "observability": { "enabled": true }. Do not set "assets". Do not add nodejs_compat. A compatibility date of 2026-08-04 or later already enables it. If package.json "name" differs from the repository name, use the repository name and tell me.
6. Keep the existing dev and build scripts and their flags. Add preview="vite preview", deploy="<pm> run build && wrangler deploy", and cf-typegen="wrangler types". Remove scripts that start a Node.js server, such as `node .output/server/index.mjs`. Add .wrangler/ and .dev.vars* to .gitignore.
7. Create public/_headers so hashed assets keep a one-year cache:
   /assets/*
     Cache-Control: public, max-age=31536000, immutable
8. Read bindings and secrets in server functions and routes with `import { env } from "cloudflare:workers"`. Run cf-typegen and make sure tsconfig.json includes worker-configuration.d.ts. If vercel.json had crons, create src/server.ts that exports { fetch: handler.fetch, scheduled }, with handler imported from "@tanstack/react-start/server-entry". Point "main" at src/server.ts and add triggers.crons.
9. If tanstackStart({ prerender }) is turned on, build and confirm that prerendering still works.
10. Search server code for Node.js-only APIs: file system writes, child_process, and native modules such as sharp, canvas, or bcrypt. These fail on Workers and in `vite dev`. List them and propose KV, D1, or R2. Do not rewrite data layers without asking me.
11. Run `<pm> run build`, then `<pm> run preview --port <free port> --strictPort`. Request every route, API route, and one server function with curl. Compare the results with the live Vercel site. If vitest uses vite.config.ts, tell me that it now loads the Cloudflare plugin.

Rules: use only non-interactive commands; store local secrets in a gitignored .dev.vars file with placeholder values; never print secret values; do not deploy, log in, or change DNS.
When you finish, list the files you changed, the Vercel features without an equivalent, the secrets I must set with `npx wrangler secret put <NAME>`, and the deploy command.
```

## Migrate manually

1. Remove the Nitro package and install the Cloudflare Vite plugin and Wrangler:npmyarnpnpmbun

   ```
   npm uninstall nitro
   ```

   ```
   yarn remove nitro
   ```

   ```
   pnpm remove nitro
   ```

   ```
   bun remove nitro
   ```

   npmyarnpnpmbun

   ```
   npm i -D @cloudflare/vite-plugin wrangler
   ```

   ```
   yarn add -D @cloudflare/vite-plugin wrangler
   ```

   ```
   pnpm add -D @cloudflare/vite-plugin wrangler
   ```

   ```
   bun add -d @cloudflare/vite-plugin wrangler
   ```

2. In `vite.config.ts`, remove `nitro()` and its import. Add the Cloudflare plugin as the first plugin:

   *vite.config.tsts*



   ```ts
   import { defineConfig } from "vite";
   import { cloudflare } from "@cloudflare/vite-plugin";
   import { tanstackStart } from "@tanstack/react-start/plugin/vite";
   import viteReact from "@vitejs/plugin-react";

   export default defineConfig({
   	plugins: [
   		cloudflare({ viteEnvironment: { name: "ssr" } }),
   		tanstackStart(),
   		viteReact(),
   	],
   });
   ```

3. Create a Wrangler configuration file. Do not set `assets`, because the Cloudflare Vite plugin generates it.

   ```jsonc
   {
   	"$schema": "node_modules/wrangler/config-schema.json",
   	"name": "<YOUR_PROJECT_NAME>",
   	"main": "@tanstack/react-start/server-entry",
   	// Set this to today's date
   	"compatibility_date": "2026-11-12",
   	"observability": {
   		"enabled": true,
   	},
   }
   ```

   ```toml
   "$schema" = "node_modules/wrangler/config-schema.json"
   name = "<YOUR_PROJECT_NAME>"
   main = "@tanstack/react-start/server-entry"
   # Set this to today's date
   compatibility_date = "2026-11-12"

   [observability]
   enabled = true
   ```

4. Add a `public/_headers` file so hashed assets keep a one-year cache:

   *public/\_headerstxt*



   ```txt
   /assets/*
     Cache-Control: public, max-age=31536000, immutable
   ```

5. Add these scripts to `package.json`:

   *package.jsonjson*



   ```json
   {
   	"scripts": {
   		"preview": "vite preview",
   		"deploy": "npm run build && wrangler deploy",
   		"cf-typegen": "wrangler types"
   	}
   }
   ```

   Remove any script that starts a Node.js server, such as `node .output/server/index.mjs`.
6. Generate types for your bindings:npmyarnpnpm

   ```
   npm run cf-typegen
   ```

   ```
   yarn run cf-typegen
   ```

   ```
   pnpm run cf-typegen
   ```

   Read bindings in server functions and routes with `import { env } from "cloudflare:workers"`.
7. Build and preview your application locally. The preview runs in the Workers runtime.npmyarnpnpm

   ```
   npm run build
   ```

   ```
   yarn run build
   ```

   ```
   pnpm run build
   ```

   npmyarnpnpm

   ```
   npm run preview
   ```

   ```
   yarn run preview
   ```

   ```
   pnpm run preview
   ```

8. Delete `vercel.json` and deploy your application:npmyarnpnpm

   ```
   npm run deploy
   ```

   ```
   yarn run deploy
   ```

   ```
   pnpm run deploy
   ```

To add [Cron Triggers](https://developers.cloudflare.com/workers/configuration/cron-triggers/), [Queues](https://developers.cloudflare.com/queues/), or [Durable Objects](https://developers.cloudflare.com/durable-objects/), create a custom server entrypoint. For more information, refer to [Custom entrypoints](https://developers.cloudflare.com/workers/framework-guides/web-apps/tanstack-start/#custom-entrypoints).

## Troubleshooting

- **Assets are not cached.** Without `public/_headers`, Workers serves files in `/assets/` with `max-age=0, must-revalidate`.
- **The server function format changes after a lockfile re-resolve.** Re-resolving dependencies can upgrade `seroval`, which changes the server function wire format. Convert old lockfiles instead.
- **File system writes fail.** Runtime writes to the file system fail on Workers. They also fail in `vite dev`, which now runs in the Workers runtime. Use [KV](https://developers.cloudflare.com/kv/), [D1](https://developers.cloudflare.com/d1/), or [R2](https://developers.cloudflare.com/r2/) instead.
- **Automatic configuration leaves the `nitro` package installed.** `wrangler setup` removes the `nitro()` plugin call but not the package.
- **Vitest fails with `module is not defined`.** Vitest loads `vite.config.ts`, which now includes the Cloudflare plugin. Give Vitest its own configuration file.

## Related resources

- [TanStack Start framework guide](https://developers.cloudflare.com/workers/framework-guides/web-apps/tanstack-start/)
- [Migrate from Vercel to Workers](https://developers.cloudflare.com/workers/static-assets/migration-guides/vercel-to-workers/)
- [Cloudflare Vite plugin](https://developers.cloudflare.com/workers/vite-plugin/)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/static-assets/migration-guides/vercel-to-workers/tanstack-start/#page","headline":"Migrate TanStack Start from Vercel to Cloudflare Workers","description":"Move TanStack Start off Vercel by replacing the Nitro Vite plugin with the Cloudflare Vite plugin. Server functions and server routes run on Workers unchanged.","url":"https://developers.cloudflare.com/workers/static-assets/migration-guides/vercel-to-workers/tanstack-start/","inLanguage":"en","image":"https://developers.cloudflare.com/workers/static-assets/migration-guides/vercel-to-workers/tanstack-start/og.png?v=46dc508f186a6873","dateModified":"2026-11-11","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
