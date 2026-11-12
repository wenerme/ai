---
description: Replace adapter-vercel with adapter-cloudflare, pick the right adapter for SvelteKit 2 or 3, convert ISR routes, and read bindings on Cloudflare Workers.
title: Migrate SvelteKit from Vercel to Cloudflare Workers
image: https://developers.cloudflare.com/workers/static-assets/migration-guides/vercel-to-workers/sveltekit/og.png?v=7a68b8d01a7414e6
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

# Migrate SvelteKit from Vercel to Cloudflare Workers

Last updated Nov 11, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/workers/static-assets/migration-guides/vercel-to-workers/sveltekit/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

This guide moves a [SvelteKit ↗︎](https://svelte.dev/docs/kit) application from Vercel to Cloudflare Workers. You replace `@sveltejs/adapter-vercel` or `@sveltejs/adapter-auto` with [`@sveltejs/adapter-cloudflare` ↗︎](https://svelte.dev/docs/kit/adapter-cloudflare).

The adapter version depends on your SvelteKit major version:

| SvelteKit version | Adapter | Configured in | Bindings |
| --- | --- | --- | --- |
| Earlier than 2 | None. Upgrade to SvelteKit 2 first. | — | — |
| 2 | `@sveltejs/adapter-cloudflare@^7` | `svelte.config.js` | `event.platform.env` |
| 3 | `@sveltejs/adapter-cloudflare@^8` | `vite.config.js` | `import { env } from "cloudflare:workers"` |

## Before you begin

- Migrate hosting on your current SvelteKit major version. Do not combine the move with a SvelteKit major upgrade, unless your version is earlier than 2.
- On SvelteKit 2, do not use automatic project configuration or `npx sv add`. Both install adapter version 8, which only works with SvelteKit 3.
- Make sure `package.json` has a `name` field. Without it, `sv add` fails and automatic configuration does not install the adapter.
- Review the steps in [Before you begin](https://developers.cloudflare.com/workers/static-assets/migration-guides/vercel-to-workers/#before-you-begin) that apply to every framework.

## Migrate with a coding agent

Copy this prompt into your coding agent. The agent stops before it deploys.

```txt
Migrate this SvelteKit app from Vercel to Cloudflare Workers (Workers with Static Assets, not Pages).

0. Detect the package manager from the lockfile (<pm>) and install dependencies. If the lockfile comes from an older package manager major version, regenerate it in its own commit. With pnpm 10 or later, run `pnpm approve-builds --all` if an install reports ERR_PNPM_IGNORED_BUILDS. Run it again after you install wrangler, which adds workerd. If package.json has no "name", add one.
1. Detect the installed @sveltejs/kit version from node_modules/@sveltejs/kit/package.json.
   - 2.x or 3.x: keep that major version. Do not combine the hosting move with a SvelteKit major upgrade.
   - Earlier than 2 (1.x or 1.0.0-next.*): no Cloudflare Workers adapter supports it. Upgrade to the latest SvelteKit 2 in a separate commit, and keep the current adapter. Target @sveltejs/kit@^2, svelte@^5 (keep the legacy syntax), vite@^7, @sveltejs/vite-plugin-svelte@^6, typescript@^5, and svelte-check@^4. `npx sv migrate` is interactive and has no codemod for pre-1.0 APIs, so make these changes by hand:
     - kit.methodOverride and POST, PATCH, or DELETE exports in +page.server become named `export const actions`, with `action="?/name"`. Delete kit.methodOverride from svelte.config.js, because SvelteKit 2 rejects it.
     - Custom form enhance functions become `enhance` from $app/forms.
     - $app/env becomes $app/environment.
     - `export const hydrate` and `export const router` become `csr`.
     - sveltekit:prefetch becomes data-sveltekit-preload-data.
     - src/hooks.js becomes src/hooks.server.js.
     - `throw error()` and `throw redirect()` become `error()` and `redirect()`.
     - Self-closing non-void tags, such as `<button />`, become `<button></button>`.
     Get `build` and `check` passing before you continue.
2. Remove Vercel:
   - Uninstall @sveltejs/adapter-vercel and @sveltejs/adapter-auto.
   - Port redirects and headers from vercel.json. Static rules go to static/_redirects and static/_headers. Dynamic rules go to src/hooks.server.ts. Then delete vercel.json and .vercel/.
   - Remove every Vercel route configuration (`export const config = { runtime, regions, split, memory, maxDuration, isr }`). List the ISR routes, and replace them with `export const prerender = true` or Cache-Control headers set with setHeaders.
   - Remove VERCEL_* environment variable usage and Vercel analytics. Tell me to turn on Cloudflare Web Analytics instead.
3. Install @sveltejs/adapter-cloudflare and wrangler as dev dependencies. Use @^7 for SvelteKit 2 and @^8 for SvelteKit 3. Do not use `npx sv add` or `wrangler setup` on SvelteKit 2.
4. Configure the adapter. On SvelteKit 3, use sveltekit({ adapter: adapter() }) in vite.config. On SvelteKit 2, set kit.adapter = adapter() in svelte.config.js.
5. Create wrangler.jsonc with "name" (the package.json name), "main": ".svelte-kit/cloudflare/_worker.js", "compatibility_date": "<today>", "assets": { "binding": "ASSETS", "directory": ".svelte-kit/cloudflare" }, and "observability": { "enabled": true }. Do not add nodejs_compat. A compatibility date of 2026-08-04 or later already enables it. Add .wrangler/ and .dev.vars* to .gitignore.
6. Bindings: on SvelteKit 3, use `import { env, waitUntil } from "cloudflare:workers"`. On SvelteKit 2, use event.platform.env, and type App.Platform in src/app.d.ts as { env: Env; ctx: ExecutionContext; cf?: IncomingRequestCfProperties }. Run `npx wrangler types` before the first build. Add `/// <reference path="../worker-configuration.d.ts" />` to the top of src/app.d.ts instead of changing tsconfig "include".
7. Set these scripts: preview="<pm> run build && wrangler dev", deploy="<pm> run build && wrangler deploy", and cf-typegen="wrangler types".
8. Remove runtime file system access. Use read() from $app/server, or prerender. Do not use sharp at runtime.
9. If vercel.json had crons, tell me that adapter-cloudflare has no scheduled handler. Propose a separate Worker with a Cron Trigger that calls an authenticated SvelteKit endpoint.
10. Run `<pm> run build`, `<pm> run check`, and `npx wrangler dev --port <port>`. Request every page, __data.json endpoint, form action, and asset with curl. For form actions, send an Origin header that matches the dev URL. Use http://localhost, not 127.0.0.1, because SvelteKit sets Secure cookies on other hosts. If a third-party API also fails on the live Vercel site, report it instead of fixing it.

Rules: one commit per logical step; store local secrets in a gitignored .dev.vars file with placeholder values; never print secret values; do not deploy, log in, or change DNS.
When you finish, list the files you changed, behavior changes from any SvelteKit upgrade, the Vercel features without an equivalent, the secrets I must set with `npx wrangler secret put <NAME>`, and the deploy command.
```

## Migrate manually

1. If your SvelteKit version is earlier than 2, upgrade to SvelteKit 2 first. For more information, refer to [Migrating to SvelteKit v2 ↗︎](https://svelte.dev/docs/kit/migrating-to-sveltekit-2).
2. Remove whichever of these adapters your project uses:npmyarnpnpmbun

   ```
   npm uninstall @sveltejs/adapter-vercel @sveltejs/adapter-auto
   ```

   ```
   yarn remove @sveltejs/adapter-vercel @sveltejs/adapter-auto
   ```

   ```
   pnpm remove @sveltejs/adapter-vercel @sveltejs/adapter-auto
   ```

   ```
   bun remove @sveltejs/adapter-vercel @sveltejs/adapter-auto
   ```

   Install the Cloudflare adapter that matches your SvelteKit version. On SvelteKit 2:npmyarnpnpmbun

   ```
   npm i -D @sveltejs/adapter-cloudflare@^7 wrangler
   ```

   ```
   yarn add -D @sveltejs/adapter-cloudflare@^7 wrangler
   ```

   ```
   pnpm add -D @sveltejs/adapter-cloudflare@^7 wrangler
   ```

   ```
   bun add -d @sveltejs/adapter-cloudflare@^7 wrangler
   ```

   On SvelteKit 3:npmyarnpnpmbun

   ```
   npm i -D @sveltejs/adapter-cloudflare@^8 wrangler
   ```

   ```
   yarn add -D @sveltejs/adapter-cloudflare@^8 wrangler
   ```

   ```
   pnpm add -D @sveltejs/adapter-cloudflare@^8 wrangler
   ```

   ```
   bun add -d @sveltejs/adapter-cloudflare@^8 wrangler
   ```

3. Configure the adapter. On SvelteKit 2, edit `svelte.config.js`:

   *svelte.config.jsjs*



   ```js
   import adapter from "@sveltejs/adapter-cloudflare";

   /** @type {import('@sveltejs/kit').Config} */
   export default {
   	kit: {
   		adapter: adapter(),
   	},
   };
   ```

   On SvelteKit 3, pass the adapter to the `sveltekit()` plugin in `vite.config.js` instead.
4. Create a Wrangler configuration file:

   ```jsonc
   {
   	"$schema": "node_modules/wrangler/config-schema.json",
   	"name": "<YOUR_PROJECT_NAME>",
   	"main": ".svelte-kit/cloudflare/_worker.js",
   	// Set this to today's date
   	"compatibility_date": "2026-11-12",
   	"assets": {
   		"binding": "ASSETS",
   		"directory": ".svelte-kit/cloudflare",
   	},
   	"observability": {
   		"enabled": true,
   	},
   }
   ```

   ```toml
   "$schema" = "node_modules/wrangler/config-schema.json"
   name = "<YOUR_PROJECT_NAME>"
   main = ".svelte-kit/cloudflare/_worker.js"
   # Set this to today's date
   compatibility_date = "2026-11-12"

   [assets]
   binding = "ASSETS"
   directory = ".svelte-kit/cloudflare"

   [observability]
   enabled = true
   ```

5. Generate types for your bindings before the first build:npmyarnpnpm

   ```
   npx wrangler types
   ```

   ```
   yarn wrangler types
   ```

   ```
   pnpm wrangler types
   ```

6. On SvelteKit 2, reference the generated types and declare the platform type in `src/app.d.ts`:

   *src/app.d.tsts*



   ```ts
   /// <reference path="../worker-configuration.d.ts" />
   declare global {
   	namespace App {
   		interface Platform {
   			env: Env;
   			ctx: ExecutionContext;
   			cf?: IncomingRequestCfProperties;
   		}
   	}
   }

   export {};
   ```

7. Delete `vercel.json` and every Vercel `export const config` block. Replace ISR routes with prerendering or `Cache-Control` headers.
8. Build your application and run it locally:npmyarnpnpm

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
   npx wrangler dev
   ```

   ```
   yarn wrangler dev
   ```

   ```
   pnpm wrangler dev
   ```

9. Deploy your application:npmyarnpnpm

   ```
   npx wrangler deploy
   ```

   ```
   yarn wrangler deploy
   ```

   ```
   pnpm wrangler deploy
   ```

<details>

<summary>

Upgrade checklist for SvelteKit versions earlier than 1.0

</summary>

Pre-1.0 SvelteKit applications need these changes when you upgrade to SvelteKit 2:

| Pre-1.0 API | SvelteKit 2 replacement |
| --- | --- |
| <code>kit.methodOverride</code> and <code>POST</code>/<code>PATCH</code>/<code>DELETE</code> exports | Named form actions with <code>action="?/name"</code>. Remove <code>kit.methodOverride</code> from <code>svelte.config.js</code>. |
| Custom form <code>enhance</code> helpers | <code>enhance</code> from <code>$app/forms</code> |
| <code>$app/env</code> | <code>$app/environment</code> |
| <code>export const hydrate</code> and <code>export const router</code> | <code>export const csr</code> |
| <code>sveltekit:prefetch</code> | <code>data-sveltekit-preload-data</code> |
| <code>src/hooks.js</code> | <code>src/hooks.server.js</code> |
| <code>throw error()</code> and <code>throw redirect()</code> | <code>error()</code> and <code>redirect()</code> |
| Self-closing non-void tags, such as <code>&lt;button /&gt;</code> | <code>&lt;button&gt;&lt;/button&gt;</code> |

After the upgrade, cookies set by SvelteKit include <code>Secure</code> and <code>SameSite=Lax</code>. Cross-site form submissions return <code>403</code>.

</details>

## Troubleshooting

- **The build fails with `Cannot read properties of undefined (reading 'assets')`.** You installed adapter version 8 on SvelteKit 2. Install `@sveltejs/adapter-cloudflare@^7`.
- **The build fails with `Unexpected option config.kit.methodOverride`.** SvelteKit 2 removed `methodOverride`. Delete it from `svelte.config.js` and use named form actions.
- **The build fails with `Types file not found`.** Run `npx wrangler types` before you build.
- **Cron jobs have no scheduled handler.** `adapter-cloudflare` does not export a `scheduled()` handler. Use a separate Worker with a [Cron Trigger](https://developers.cloudflare.com/workers/configuration/cron-triggers/) that calls an authenticated endpoint.
- **Prerendered pages skip your hooks.** Workers serves prerendered pages as static assets, so `hooks.server.js` does not run for them. Vercel behaves the same way.

## Related resources

- [SvelteKit framework guide](https://developers.cloudflare.com/workers/framework-guides/web-apps/sveltekit/)
- [Migrate from Vercel to Workers](https://developers.cloudflare.com/workers/static-assets/migration-guides/vercel-to-workers/)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/static-assets/migration-guides/vercel-to-workers/sveltekit/#page","headline":"Migrate SvelteKit from Vercel to Cloudflare Workers","description":"Replace adapter-vercel with adapter-cloudflare, pick the right adapter for SvelteKit 2 or 3, convert ISR routes, and read bindings on Cloudflare Workers.","url":"https://developers.cloudflare.com/workers/static-assets/migration-guides/vercel-to-workers/sveltekit/","inLanguage":"en","image":"https://developers.cloudflare.com/workers/static-assets/migration-guides/vercel-to-workers/sveltekit/og.png?v=7a68b8d01a7414e6","dateModified":"2026-11-11","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
