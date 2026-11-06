---
description: Migrate React Router or Remix from Vercel to Cloudflare Workers. Replace vercelPreset with the Cloudflare Vite plugin. Includes a prompt for your coding agent.
title: Migrate React Router and Remix from Vercel to Cloudflare Workers
image: https://developers.cloudflare.com/workers/static-assets/migration-guides/vercel-to-workers/react-router/og.png?v=89b5412c7fd8cff2
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

# Migrate React Router and Remix from Vercel to Cloudflare Workers

Last updated Nov 5, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/workers/static-assets/migration-guides/vercel-to-workers/react-router/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

This guide moves a Remix v2 or [React Router ↗︎](https://reactrouter.com/) v7 application from Vercel to Cloudflare Workers. React Router v7 framework mode is the successor to Remix. Cloudflare supports Remix applications through React Router and the [Cloudflare Vite plugin](https://developers.cloudflare.com/workers/vite-plugin/).

If your application uses Remix v2, upgrade to React Router v7 first. Ship that upgrade on Vercel, then switch hosting.

## Before you begin

- SPA mode ( `ssr: false`) is not supported with the Cloudflare Vite plugin. Prerendering requires React Router 7.13.1 or later with the `future.unstable_previewServerPrerendering` flag. Check `react-router.config.ts` before you start.
- Do not use automatic project configuration on a Remix v2 application. It detects the application as a static site.
- This guide uses React Router v7. Install `@react-router/*` packages with `@^7`, because unpinned installs can resolve a newer major version.
- Review the steps in [Before you begin](https://developers.cloudflare.com/workers/static-assets/migration-guides/vercel-to-workers/#before-you-begin) that apply to every framework.

## Migrate with a coding agent

Copy this prompt into your coding agent. The agent stops before it deploys.

```txt
Migrate this app from Vercel to Cloudflare Workers (Workers with Static Assets, not Pages). It is either Remix v2 or React Router v7 in framework mode. Target React Router 7.x. Do not upgrade to React Router 8 in the same change.

0. Detect the framework. @remix-run/* means Remix v2. react-router plus @react-router/dev means React Router v7. If react-router.config.ts has `ssr: false`, stop and report that the Cloudflare Vite plugin does not support SPA mode. If it has `prerender`, use react-router and @react-router/* 7.13.1 or later and set `future: { unstable_previewServerPrerendering: true }`. Do not use `wrangler setup` on Remix v2.
1. Remix v2 only: upgrade to React Router v7 first (https://reactrouter.com/upgrading/remix). Commit the upgrade separately.
   - If the app has loaders or actions, update @remix-run/* to the latest 2.x and turn on every v3_* future flag. Fix what breaks, then typecheck, build, and commit.
   - Run `npx codemod remix/2/react-router/upgrade`. If it fails with "Registry error: HTTP request failed", run `npx codemod@0.18.13 remix/2/react-router/upgrade --no-interactive` instead.
   - The codemod is incomplete. Fix these by hand:
     a. Uninstall @vercel/remix, because it pins Remix 2 and breaks the install.
     b. Set isbot to ^5 and engines.node to >=20.
     c. Remove installGlobals() and its import.
     d. Call reactRouter() in vite.config.ts with no options. Move ssr and presets into react-router.config.ts.
     e. Create app/routes.ts with `export default flatRoutes() satisfies RouteConfig`. Install @react-router/fs-routes@^7 as a dev dependency.
     f. Rewrite every remaining import from @remix-run/* or @vercel/remix to "react-router".
     g. In tsconfig.json, add ".react-router/types/**/*" to include and set "rootDirs": [".", "./.react-router/types"]. Add .react-router/ to .gitignore.
     h. Rename RemixServer to ServerRouter and RemixBrowser to HydratedRouter (from "react-router/dom") in entry files.
   - Delete node_modules and the lockfile, then reinstall. A stale lockfile keeps the Remix 2 dependency tree.
   - Run `react-router typegen && tsc`, build, and commit.
2. Remove Vercel:
   - Delete vercel.json and .vercel/. Uninstall @vercel/remix, @vercel/react-router, @vercel/analytics, and @vercel/speed-insights. Remove their components.
   - Remove vercelPreset() from react-router.config.ts and vite.config.ts.
   - If app/entry.server.(t|j)sx re-exports @vercel/react-router/entry.server, uses renderToPipeableStream, or imports node:stream, replace it with an entry that uses renderToReadableStream. Use https://github.com/cloudflare/templates/blob/main/react-router-starter-template/app/entry.server.tsx as the reference. If there is no entry.server file, the default entry works.
   - Remove route-level Vercel configuration (`export const config = { runtime, regions, maxDuration, memory }`).
   - List other @vercel/* usage and propose Cloudflare equivalents without rewriting them.
3. Install @cloudflare/vite-plugin, wrangler, and vite@^7 as dev dependencies. The plugin requires Vite 6.1 or later. Add cloudflare({ viteEnvironment: { name: "ssr" } }) before reactRouter() in vite.config.ts. In react-router.config.ts, set `future: { v8_viteEnvironmentApi: true }`. React Router versions earlier than 7.10 name this flag unstable_viteEnvironmentApi.
4. Create workers/app.ts:
   import { createRequestHandler } from "react-router";
   declare module "react-router" { interface AppLoadContext { cloudflare: { env: Env; ctx: ExecutionContext } } }
   const requestHandler = createRequestHandler(() => import("virtual:react-router/server-build"), import.meta.env.MODE);
   export default { fetch(request, env, ctx) { return requestHandler(request, { cloudflare: { env, ctx } }); } } satisfies ExportedHandler<Env>;
5. Create wrangler.jsonc with "name" (the repository name), "main": "./workers/app.ts", "compatibility_date": "<today>", "observability": { "enabled": true }, and "upload_source_maps": true. Do not add nodejs_compat. A compatibility date of 2026-08-04 or later already enables it. Create public/_headers:
   /assets/*
     Cache-Control: public, max-age=31536000, immutable
   Add .wrangler/ and .dev.vars* to .gitignore.
6. Set these scripts: dev="react-router dev", build="react-router build", preview="npm run build && vite preview", deploy="npm run build && wrangler deploy", and cf-typegen="wrangler types && react-router typegen". Remove the start script. Add workers/**/* and worker-configuration.d.ts to tsconfig.json include. Run cf-typegen.
7. In loaders and actions, read bindings from `context.cloudflare.env`. Use `context.cloudflare.ctx.waitUntil` for background work.
8. Typecheck, build, and run `npm run preview -- --port <free port> --strictPort`. Request every route with curl. Confirm that /assets/* files return 200 with the immutable header.

Rules: use the repository's package manager; store local secrets in a gitignored .dev.vars file with placeholder values; never print secret values; do not deploy, log in, or change DNS.
When you finish, list the files you changed, the Vercel features without an equivalent, the secrets I must set with `npx wrangler secret put <NAME>`, and the deploy command.
```

## Migrate manually

### Upgrade Remix v2 to React Router v7

Skip this section if your application already uses React Router v7.

1. Run the React Router codemod:npmyarnpnpm

   ```
   npx codemod remix/2/react-router/upgrade
   ```

   ```
   yarn dlx codemod remix/2/react-router/upgrade
   ```

   ```
   pnpx codemod remix/2/react-router/upgrade
   ```

2. Complete the steps that the codemod does not cover:
   - Replace `@vercel/remix` with `@vercel/react-router`, so you can ship the upgrade on Vercel first.
   - Set `isbot` to `^5`.
   - Remove `installGlobals()`.
   - Create `app/routes.ts` with `flatRoutes()`, and install `@react-router/fs-routes@^7`.
   - Rewrite every `@remix-run/*` and `@vercel/remix` import to `react-router`.
3. Delete `node_modules` and your lockfile, then reinstall your dependencies.
4. Build, test, and deploy the upgrade on Vercel. For more information, refer to [Upgrading from Remix ↗︎](https://reactrouter.com/upgrading/remix).

### Move React Router to Workers

1. Remove whichever of these Vercel packages your project uses, then install the Cloudflare Vite plugin:npmyarnpnpmbun

   ```
   npm uninstall @vercel/react-router @vercel/remix @vercel/analytics @vercel/speed-insights
   ```

   ```
   yarn remove @vercel/react-router @vercel/remix @vercel/analytics @vercel/speed-insights
   ```

   ```
   pnpm remove @vercel/react-router @vercel/remix @vercel/analytics @vercel/speed-insights
   ```

   ```
   bun remove @vercel/react-router @vercel/remix @vercel/analytics @vercel/speed-insights
   ```

   npmyarnpnpmbun

   ```
   npm i -D @cloudflare/vite-plugin wrangler vite@^7
   ```

   ```
   yarn add -D @cloudflare/vite-plugin wrangler vite@^7
   ```

   ```
   pnpm add -D @cloudflare/vite-plugin wrangler vite@^7
   ```

   ```
   bun add -d @cloudflare/vite-plugin wrangler vite@^7
   ```

2. Remove `vercelPreset()`, `vercel.json`, `<Analytics />`, `<SpeedInsights />`, and any route `export const config`. If `vercelPreset()` generated `app/entry.server.jsx`, delete that file too.
3. Add the Cloudflare plugin to `vite.config.ts`, before `reactRouter()`:

   *vite.config.tsts*



   ```ts
   import { cloudflare } from "@cloudflare/vite-plugin";
   import { reactRouter } from "@react-router/dev/vite";
   import { defineConfig } from "vite";

   export default defineConfig({
   	plugins: [cloudflare({ viteEnvironment: { name: "ssr" } }), reactRouter()],
   });
   ```

4. Turn on the Vite Environment API in `react-router.config.ts`:

   *react-router.config.tsts*



   ```ts
   import type { Config } from "@react-router/dev/config";

   export default {
   	ssr: true,
   	future: {
   		v8_viteEnvironmentApi: true,
   	},
   } satisfies Config;
   ```

5. Create the Worker entry file:

   *workers/app.tsts*



   ```ts
   import { createRequestHandler } from "react-router";

   declare module "react-router" {
   	export interface AppLoadContext {
   		cloudflare: { env: Env; ctx: ExecutionContext };
   	}
   }

   const requestHandler = createRequestHandler(
   	() => import("virtual:react-router/server-build"),
   	import.meta.env.MODE,
   );

   export default {
   	fetch(request, env, ctx) {
   		return requestHandler(request, { cloudflare: { env, ctx } });
   	},
   } satisfies ExportedHandler<Env>;
   ```

6. Create a Wrangler configuration file:

   ```jsonc
   {
   	"$schema": "node_modules/wrangler/config-schema.json",
   	"name": "<YOUR_PROJECT_NAME>",
   	"main": "./workers/app.ts",
   	// Set this to today's date
   	"compatibility_date": "2026-11-06",
   	"observability": {
   		"enabled": true,
   	},
   	"upload_source_maps": true,
   }
   ```

   ```toml
   "$schema" = "node_modules/wrangler/config-schema.json"
   name = "<YOUR_PROJECT_NAME>"
   main = "./workers/app.ts"
   # Set this to today's date
   compatibility_date = "2026-11-06"
   upload_source_maps = true

   [observability]
   enabled = true
   ```

7. Add a `public/_headers` file so hashed assets keep a one-year cache:

   *public/\_headerstxt*



   ```txt
   /assets/*
     Cache-Control: public, max-age=31536000, immutable
   ```

8. If your application had a Node.js `entry.server` file, replace it with one that uses `renderToReadableStream`. For a reference, refer to the [React Router starter template ↗︎](https://github.com/cloudflare/templates/blob/main/react-router-starter-template/app/entry.server.tsx).
9. Read bindings in loaders and actions from `context.cloudflare.env`:

   *app/routes/home.tsxts*



   ```ts
   export function loader({ context }: Route.LoaderArgs) {
   	return { value: context.cloudflare.env.MY_VAR };
   }
   ```

10. Generate types, build, and preview your application locally:npmyarnpnpm

    ```
    npx wrangler types
    ```

    ```
    yarn wrangler types
    ```

    ```
    pnpm wrangler types
    ```

    npmyarnpnpm

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
    npx vite preview
    ```

    ```
    yarn vite preview
    ```

    ```
    pnpm vite preview
    ```

11. Deploy your application:npmyarnpnpm

    ```
    npx wrangler deploy
    ```

    ```
    yarn wrangler deploy
    ```

    ```
    pnpm wrangler deploy
    ```

## Known issues

- **The build fails with `Could not load virtual:react-router/server-manifest`.** Either the `v8_viteEnvironmentApi` future flag is missing, or `vercelPreset()` is still configured.
- **React Router 7.10 or later rejects `unstable_viteEnvironmentApi`.** The flag was renamed to `v8_viteEnvironmentApi`. Some starter templates still use the old name.
- **The install fails with `ERESOLVE`.** `@vercel/remix` pins Remix 2, and `@cloudflare/vite-plugin` requires Vite 6.1 or later. Remove `@vercel/remix`, upgrade Vite, and reinstall from a clean lockfile.
- **The codemod fails with `Registry error: HTTP request failed`.** This happens behind TLS-inspecting proxies. Use `npx codemod@0.18.13 remix/2/react-router/upgrade --no-interactive`.
- **Remix `?_data` requests stop working.** React Router v7 uses `/<route>.data` endpoints. Browser tabs that loaded the old bundle can fail one navigation after the cutover.

## Related resources

- [React Router framework guide](https://developers.cloudflare.com/workers/framework-guides/web-apps/react-router/)
- [Migrate from Vercel to Workers](https://developers.cloudflare.com/workers/static-assets/migration-guides/vercel-to-workers/)
- [Cloudflare Vite plugin](https://developers.cloudflare.com/workers/vite-plugin/)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/static-assets/migration-guides/vercel-to-workers/react-router/#page","headline":"Migrate React Router and Remix from Vercel to Cloudflare Workers","description":"Migrate React Router or Remix from Vercel to Cloudflare Workers. Replace vercelPreset with the Cloudflare Vite plugin. Includes a prompt for your coding agent.","url":"https://developers.cloudflare.com/workers/static-assets/migration-guides/vercel-to-workers/react-router/","inLanguage":"en","image":"https://developers.cloudflare.com/workers/static-assets/migration-guides/vercel-to-workers/react-router/og.png?v=89b5412c7fd8cff2","dateModified":"2026-11-05","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
