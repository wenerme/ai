---
description: Move a Vercel app to one Cloudflare Worker. Pick your framework, then map Vercel KV, Blob, Edge Config, cron jobs, ISR, env vars, and domains to Cloudflare.
title: Migrate from Vercel to Cloudflare Workers
image: https://developers.cloudflare.com/workers/static-assets/migration-guides/vercel-to-workers/og.png?v=93e2326fad000491
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

# Migrate from Vercel to Cloudflare Workers

Last updated Nov 11, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/workers/static-assets/migration-guides/vercel-to-workers/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

This guide shows you how to move an application from Vercel to Cloudflare Workers. Workers runs your framework's server code and serves its static assets from a single Worker.

## Choose your framework

Each framework guide includes a prompt for your coding agent and the equivalent manual steps. Every guide was tested end to end by migrating a real Vercel-hosted application.

| Framework | Guide | What changes |
| --- | --- | --- |
| Astro | [Migrate Astro from Vercel](https://developers.cloudflare.com/workers/static-assets/migration-guides/vercel-to-workers/astro/) | `@astrojs/vercel` is replaced by `@astrojs/cloudflare` |
| Next.js | [Migrate Next.js from Vercel](https://developers.cloudflare.com/workers/static-assets/migration-guides/vercel-to-workers/nextjs/) | vinext runs your Next.js app on Vite and Workers |
| Nuxt | [Migrate Nuxt from Vercel](https://developers.cloudflare.com/workers/static-assets/migration-guides/vercel-to-workers/nuxt/) | The Nitro `vercel` preset is replaced by `cloudflare_module` |
| Remix and React Router | [Migrate React Router from Vercel](https://developers.cloudflare.com/workers/static-assets/migration-guides/vercel-to-workers/react-router/) | `@vercel/remix` is replaced by the Cloudflare Vite plugin |
| SvelteKit | [Migrate SvelteKit from Vercel](https://developers.cloudflare.com/workers/static-assets/migration-guides/vercel-to-workers/sveltekit/) | `adapter-vercel` is replaced by `adapter-cloudflare` |
| TanStack Start | [Migrate TanStack Start from Vercel](https://developers.cloudflare.com/workers/static-assets/migration-guides/vercel-to-workers/tanstack-start/) | The Nitro Vite plugin is replaced by the Cloudflare Vite plugin |
| Static site or single-page app | [Migrate a static site from Vercel](https://developers.cloudflare.com/workers/static-assets/migration-guides/vercel-to-workers/static-site/) | A Wrangler configuration file points to your build output |

For other frameworks, refer to the [framework guides](https://developers.cloudflare.com/workers/framework-guides/) and the rest of this page.

## Before you begin

These steps apply to every framework:

- Install dependencies before you run any migration tool. [Automatic project configuration](https://developers.cloudflare.com/workers/framework-guides/automatic-configuration/) cannot detect your framework without `node_modules`.
- If you use pnpm 10 or later, allow the `esbuild` and `workerd` build scripts. Otherwise, installs fail with `ERR_PNPM_IGNORED_BUILDS`. Run `pnpm approve-builds --all`, or add the packages to `allowBuilds` in `pnpm-workspace.yaml`.
- Set the Worker `name` explicitly. Migration tools default to the `name` field in `package.json`, which is often a template name.
- Use a compatibility date of `2026-08-04` or later, for example today. [Node.js compatibility](https://developers.cloudflare.com/workers/runtime-apis/nodejs/) is on by default for these dates, so new configurations do not need the `nodejs_compat` flag. Existing configurations can keep it. For more information, refer to [Node.js compatibility flag](https://developers.cloudflare.com/workers/configuration/compatibility-flags/#nodejs-compatibility-flag).
- Add `.wrangler/` and `.dev.vars*` to `.gitignore`.
- If your account has access to more than one Cloudflare account, set the `CLOUDFLARE_ACCOUNT_ID` environment variable before you deploy.

## Migrate a static site or single-page application

To migrate a project that does not render pages on the server, refer to [Migrate a static site or SPA from Vercel to Cloudflare Workers](https://developers.cloudflare.com/workers/static-assets/migration-guides/vercel-to-workers/static-site/).

## Map Vercel features to Cloudflare

Each Vercel feature has a Cloudflare equivalent:

| Vercel feature | Cloudflare equivalent |
| --- | --- |
| Analytics and Speed Insights | [Web Analytics](https://developers.cloudflare.com/web-analytics/) |
| Blob | [R2](https://developers.cloudflare.com/r2/) |
| Cron Jobs | [Cron Triggers](https://developers.cloudflare.com/workers/configuration/cron-triggers/) with a `scheduled()` handler |
| Edge Config | [Workers KV](https://developers.cloudflare.com/kv/) |
| Environment variables | [Environment variables](https://developers.cloudflare.com/workers/configuration/environment-variables/) and [secrets](https://developers.cloudflare.com/workers/configuration/secrets/) |
| Functions, Edge Functions, Middleware | One Worker, built by your framework adapter |
| Git integration and preview URLs | [Workers Builds](https://developers.cloudflare.com/workers/ci-cd/builds/) and [preview URLs](https://developers.cloudflare.com/workers/previews/) |
| Image Optimization | [Images binding](https://developers.cloudflare.com/images/optimization/binding/) or [image transformations](https://developers.cloudflare.com/images/optimization/transformations/) |
| ISR and `s-maxage` caching | Prerendering, or your framework's Cloudflare cache integration. Refer to [Replace ISR and edge caching](#replace-isr-and-edge-caching). |
| KV and Upstash Redis | [Workers KV](https://developers.cloudflare.com/kv/), or keep Upstash and connect over HTTP |
| Postgres | Keep your database and connect with [Hyperdrive](https://developers.cloudflare.com/hyperdrive/), or use [D1](https://developers.cloudflare.com/d1/) |
| Queues | [Queues](https://developers.cloudflare.com/queues/) |
| `vercel.json` headers and redirects | Framework configuration, or [`_headers`](https://developers.cloudflare.com/workers/static-assets/headers/) and [`_redirects`](https://developers.cloudflare.com/workers/static-assets/redirects/) for static assets |

Vercel-specific URLs, such as `/_vercel/image` and `/_vercel/insights`, return `404` after you migrate. Update any references to them.

## Move environment variables and secrets

To copy production environment variables from Vercel to your Worker:

1. Pull the production environment variables with the Vercel CLI:

   ```sh
   vercel env pull .env.production.local --environment=production
   ```

   Vercel does not return the values of sensitive environment variables. Add those values to the file manually.
2. Upload the variables as Worker secrets:npmyarnpnpm

   ```
   npx wrangler secret bulk .env.production.local
   ```

   ```
   yarn wrangler secret bulk .env.production.local
   ```

   ```
   pnpm wrangler secret bulk .env.production.local
   ```

3. Delete `.env.production.local` after the upload.

Store non-secret values in `vars` in your Wrangler configuration file. Store local development secrets in a `.dev.vars` file. Public build-time variables, such as `NEXT_PUBLIC_*`, `VITE_*`, and `PUBLIC_*`, must exist when your project builds. If you use Workers Builds, add them as [build variables](https://developers.cloudflare.com/workers/ci-cd/builds/configuration/).

## Restore caching for hashed assets

Vercel serves hashed build assets with a one-year immutable cache. Workers serves static assets with `max-age=0, must-revalidate` by default. To restore long-lived caching, add a `_headers` file to your static directory. Adjust the path to match your framework's asset directory:

*public/\_headerstxt*

```txt
/assets/*
  Cache-Control: public, max-age=31536000, immutable
```

SvelteKit and Nuxt generate a `_headers` file for you. Cloudflare applies every `_headers` rule that matches a path. To replace a header value from a less specific rule, add `! Header-Name` before the new value. For more information, refer to [Headers](https://developers.cloudflare.com/workers/static-assets/headers/).

## Replace ISR and edge caching

On Vercel, a `Cache-Control: s-maxage` header caches server-rendered responses at the edge. On Workers, turn on [Workers Cache](https://developers.cloudflare.com/workers/cache/) to cache your Worker's responses based on the `Cache-Control` headers they return. Workers Cache requires Wrangler 4.69.0 or later.

```jsonc
{
	"cache": {
		"enabled": true,
	},
}
```

```toml
[cache]
enabled = true
```

Workers Cache does not serve stale responses that include `s-maxage`, even if they also set `stale-while-revalidate`. For more information, refer to [Cache-Control semantics](https://developers.cloudflare.com/workers/cache/configuration/#cache-control-semantics).

When caching is on, all requests to your Worker are billed at the standard request rate, including static asset requests. For more information, refer to [Workers Cache pricing](https://developers.cloudflare.com/workers/cache/#pricing).

You can also prerender pages that do not change between deploys, use your framework's Cloudflare cache integration, such as Astro route caching or a vinext cache adapter, or use the [Cache API](https://developers.cloudflare.com/workers/runtime-apis/cache/) from your server code.

## Add a custom domain

Workers Custom Domains only supports domains that are configured as zones on your account. A zone is a domain, such as `example.com`, that Cloudflare manages for you, including its DNS and traffic.

To move a domain without downtime:

1. Deploy your Worker and test it on its `workers.dev` URL. Keep Vercel serving production.
2. Lower the time to live (TTL) of your DNS records.
3. Add your domain to Cloudflare as a zone. Confirm that the imported DNS records match your Vercel records, then update the nameservers at your registrar.
4. [Add a custom domain to your Worker](https://developers.cloudflare.com/workers/configuration/routing/custom-domains/#add-a-custom-domain). The custom domain replaces the existing Vercel DNS record for that hostname and issues a certificate.
5. Confirm that traffic reaches your Worker, then remove the domain from your Vercel project.

## Roll back a deployment

To return to a previous version of your Worker, run:

npmyarnpnpm

```
npx wrangler rollback
```

```
yarn wrangler rollback
```

```
pnpm wrangler rollback
```

To shift traffic gradually between versions, refer to [Gradual deployments](https://developers.cloudflare.com/workers/versions-and-deployments/gradual-deployments/).

## Delete your Vercel app

After your custom domain sends requests to Cloudflare Workers, you can delete your Vercel application.

## Troubleshooting

- Review the [Workers limits](https://developers.cloudflare.com/workers/platform/limits/). SSR applications usually need the Workers Paid plan, because the Free plan allows 10 ms of CPU time per request.
- Native Node.js modules, such as `sharp` and `canvas`, do not run on Workers. Runtime writes to the file system also fail.
- On a `workers.dev` URL, Cloudflare serves a managed `robots.txt` file if your application does not provide one.
- For more migration steps, refer to the [Cloudflare Pages to Workers migration guide](https://developers.cloudflare.com/workers/static-assets/migration-guides/migrate-from-pages/).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/static-assets/migration-guides/vercel-to-workers/#page","headline":"Migrate from Vercel to Cloudflare Workers","description":"Move a Vercel app to one Cloudflare Worker. Pick your framework, then map Vercel KV, Blob, Edge Config, cron jobs, ISR, env vars, and domains to Cloudflare.","url":"https://developers.cloudflare.com/workers/static-assets/migration-guides/vercel-to-workers/","inLanguage":"en","image":"https://developers.cloudflare.com/workers/static-assets/migration-guides/vercel-to-workers/og.png?v=93e2326fad000491","dateModified":"2026-11-11","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
