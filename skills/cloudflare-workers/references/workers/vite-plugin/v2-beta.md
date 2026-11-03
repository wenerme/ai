---
description: Compare Vite plugin v2 beta with v1 and review the changes required to migrate an existing Cloudflare Workers project.
title: v2 beta
image: https://developers.cloudflare.com/workers/vite-plugin/v2-beta/og.png?v=094767455c418935
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

# v2 beta

Last updated Nov 3, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/workers/vite-plugin/v2-beta/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Vite plugin v2 is in beta

v2 may change before general availability. The other Vite plugin pages describe v1, the current stable version.

Vite plugin v2 uses [`cloudflare.config.ts`](https://developers.cloudflare.com/cf/projects/cloudflare-config/) for configuration and integrates with the [cf CLI](https://developers.cloudflare.com/cf/) for deployment.

See [Deploy your first Worker](https://developers.cloudflare.com/cf/get-started/first-worker/) to quickly scaffold a new project using the beta.

Alternatively, to try the beta in an existing project, install the Vite plugin and `cf` as development dependencies.

npmyarnpnpmbun

```
npm i -D @cloudflare/vite-plugin@beta cf
```

```
yarn add -D @cloudflare/vite-plugin@beta cf
```

```
pnpm add -D @cloudflare/vite-plugin@beta cf
```

```
bun add -d @cloudflare/vite-plugin@beta cf
```

## Differences from v1

The following table summarizes the main differences:

|  | v1 | v2 beta |
| --- | --- | --- |
| Worker configuration | Loads `wrangler.jsonc`, `wrangler.json`, or `wrangler.toml` | Loads `cloudflare.config.ts` |
| Deployment | Deploys with `wrangler deploy` | Deploys with `cf deploy` |
| Build Output | Writes per-Worker deployment output under `dist` by default | Always writes structured Build Output to `.cloudflare/output` |
| Vite version | Supports Vite 6 and above | Supports Vite 7 and above |
| Vite environment | Derives the environment name from the Worker name | Uses the `ssr` environment by default |
| Type generation | Run `wrangler types` separately | Generates types by default during development and builds |
| Local secrets | Can use `CLOUDFLARE_ENV` to select env-specific files | Uses Vite's resolved mode and `envDir` to select mode-specific files |

## Configuration

v2 reads configuration from [`cloudflare.config.ts`](https://developers.cloudflare.com/cf/projects/cloudflare-config/). It does not load Wrangler configuration files. To convert an existing configuration, refer to [Migrate from Wrangler to `cf`](https://developers.cloudflare.com/cf/wrangler/migrate/).

The `configPath` option has been removed and the `config`, `auxiliaryWorkers`, and `prerenderWorker` options now accept the new camelCase [Worker configuration format](https://developers.cloudflare.com/cf/projects/cloudflare-config/#configure-the-worker).

## Build and deployment

`vite build` always writes structured Build Output to `.cloudflare/output`. Run [`cf deploy`](https://developers.cloudflare.com/cf/projects/#deploy) to build and deploy. To deploy an existing build without rebuilding, use [`cf deploy --prebuilt`](https://developers.cloudflare.com/cf/projects/#deploy-a-prebuilt-build)

Wrangler cannot deploy applications built with Vite plugin v2. Wrangler is also no longer a runtime or peer dependency of the plugin.

When a project [configures Containers](https://developers.cloudflare.com/cf/projects/cloudflare-config/#attach-a-container), `vite build` builds Dockerfile-backed Container images and records them in the Build Output. `vite preview` reuses these images instead of rebuilding them.

## Vite environment

The entry Worker now uses the `ssr` Vite environment by default. Update Vite configuration and plugins that target the previous Worker-derived name to use `environments.ssr`. To keep the previous name, set `viteEnvironment.name` explicitly in the `cloudflare()` plugin options.

## Generated types

v2 generates `.cloudflare/types/index.d.ts` during development and builds. The declarations infer [bindings from `cloudflare.config.ts`](https://developers.cloudflare.com/cf/projects/cloudflare-config/#declare-bindings). They also include runtime types for the configured compatibility date and compatibility flags.

Add the configuration file and generated declarations to your TypeScript configuration:

*tsconfig.jsonjson*

```json
{
	"include": ["src", "cloudflare.config.ts", ".cloudflare/types"]
}
```

Use the top-level `types` plugin option to turn off generation or omit runtime types. For the equivalent manual command, refer to [Generate types](https://developers.cloudflare.com/cf/projects/#generate-types).

## Local secrets and environment variables

v2 uses Vite's resolved mode and `envDir` to locate [`.dev.vars` and `.env` files](https://developers.cloudflare.com/workers/configuration/secrets/#local-development-with-secrets) that provide declared Worker secrets. Use Vite's `--mode` option instead of `CLOUDFLARE_ENV` to select mode-specific files. When `--mode` is not specified, the mode defaults to `development` in dev and `production` in build.

For preview, set the mode during `vite build`. `vite preview` uses the mode recorded in the Build Output.

v2 also removes the deprecated `WRANGLER_HYPERDRIVE_LOCAL_CONNECTION_STRING_<BINDING_NAME>` environment variable. Rename [Hyperdrive local overrides](https://developers.cloudflare.com/hyperdrive/configuration/local-development/#configure-with-environment-variable) to `CLOUDFLARE_HYPERDRIVE_LOCAL_CONNECTION_STRING_<BINDING_NAME>`.

## Local testing endpoints

v2 no longer rewrites legacy local testing endpoints. Update scripts, tests, and integrations that call these endpoints directly:

| Legacy endpoint | v2 endpoint |
| --- | --- |
| `/cdn-cgi/handler/scheduled` or `/cdn-cgi/mf/scheduled` | [`/cdn-cgi/local/scheduled`](https://developers.cloudflare.com/workers/runtime-apis/handlers/scheduled/) |
| `/cdn-cgi/handler/email` | [`/cdn-cgi/local/email`](https://developers.cloudflare.com/email-service/observability/local-development/routing/) |
| `/cdn-cgi/mf/stream/*` | `/__cf_local/stream/*` |
| `/cdn-cgi/mf/imagedelivery/*` | `/__cf_local/imagedelivery/*` |
| `/cdn-cgi/explorer/*` | [`/cdn-cgi/local/explorer/*`](https://developers.cloudflare.com/workers/local-development/local-explorer/) |

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/vite-plugin/v2-beta/#page","headline":"v2 beta","description":"Compare Vite plugin v2 beta with v1 and review the changes required to migrate an existing Cloudflare Workers project.","url":"https://developers.cloudflare.com/workers/vite-plugin/v2-beta/","inLanguage":"en","image":"https://developers.cloudflare.com/workers/vite-plugin/v2-beta/og.png?v=094767455c418935","dateModified":"2026-11-03","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
