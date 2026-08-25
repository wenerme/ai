---
description: Deploy a Next.js application to Cloudflare Workers with the OpenNext adapter.
title: OpenNext adapter
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

# OpenNext adapter

Last updated Aug 25, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/workers/framework-guides/web-apps/opennext/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Recommended path

Cloudflare recommends [vinext](https://developers.cloudflare.com/workers/framework-guides/web-apps/nextjs/) instead of OpenNext for new Next.js applications on Cloudflare Workers.

Use this guide to maintain an existing OpenNext application. Migrate to vinext when compatibility allows.

[OpenNext ↗](https://opennext.js.org/) adapts the output of `next build` so it can run on different platforms, including Cloudflare Workers.

## Supported features

Most Next.js features are supported by the Cloudflare OpenNext adapter:

| Feature                               | Cloudflare OpenNext adapter | Notes                                                                             |
| ------------------------------------- | --------------------------- | --------------------------------------------------------------------------------- |
| App Router                            | Supported                   |                                                                                   |
| Pages Router                          | Supported                   |                                                                                   |
| Route Handlers                        | Supported                   |                                                                                   |
| React Server Components               | Supported                   |                                                                                   |
| Static Site Generation (SSG)          | Supported                   |                                                                                   |
| Server-Side Rendering (SSR)           | Supported                   |                                                                                   |
| Incremental Static Regeneration (ISR) | Supported                   |                                                                                   |
| Server Actions                        | Supported                   |                                                                                   |
| Response streaming                    | Supported                   |                                                                                   |
| Asynchronous work with next/after     | Supported                   |                                                                                   |
| Middleware                            | Supported                   |                                                                                   |
| Image optimization                    | Supported                   | Supported through [Cloudflare Images](https://developers.cloudflare.com/images/). |
| Partial Prerendering (PPR)            | Supported                   | PPR is experimental in Next.js.                                                   |
| Composable Caching ("use cache")      | Supported                   | Composable Caching is experimental in Next.js.                                    |
| Node.js in Middleware                 | Not yet supported           | Node.js middleware introduced in Next.js 15.2 is not yet supported.               |

For detailed OpenNext documentation, refer to [OpenNext for Cloudflare ↗](https://opennext.js.org/cloudflare).

## Configure OpenNext manually

Wrangler automatic configuration uses vinext for Next.js projects. To use OpenNext, configure the adapter manually.

1. **Install the OpenNext Cloudflare adapter.**
npmyarnpnpmbun
```
npm i @opennextjs/cloudflare@latest
```
```
yarn add @opennextjs/cloudflare@latest
```
```
pnpm add @opennextjs/cloudflare@latest
```
```
bun add @opennextjs/cloudflare@latest
```
2. **Install Wrangler.**
npmyarnpnpmbun
```
npm i -D wrangler@latest
```
```
yarn add -D wrangler@latest
```
```
pnpm add -D wrangler@latest
```
```
bun add -d wrangler@latest
```
3. **Add a Wrangler configuration file.**
In your project root, create a [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/) with the following content:
```jsonc
{
  "$schema": "./node_modules/wrangler/config-schema.json",
  "name": "my-app",
  "main": ".open-next/worker.js",
  // Set this to today's date
  "compatibility_date": "2026-08-25",
  "compatibility_flags": [
    "nodejs_compat"
  ],
  "assets": {
    "directory": ".open-next/assets",
    "binding": "ASSETS"
  },
  "observability": {
    "enabled": true
  }
}
```
```toml
name = "my-app"
main = ".open-next/worker.js"
# Set this to today's date
compatibility_date = "2026-08-25"
compatibility_flags = ["nodejs_compat"]
[assets]
directory = ".open-next/assets"
binding = "ASSETS"
[observability]
enabled = true
```
Note
You must turn on the [nodejs\_compat compatibility flag](https://developers.cloudflare.com/workers/runtime-apis/nodejs/) and set your [compatibility date](https://developers.cloudflare.com/workers/configuration/compatibility-dates/) to `2024-09-23` or later.
4. **Add an OpenNext configuration file.**
In your project root, create `open-next.config.ts`:
```ts
import { defineCloudflareConfig } from "@opennextjs/cloudflare";
export default defineCloudflareConfig();
```
Use this file to configure OpenNext features such as caching. For more information, refer to [OpenNext caching ↗](https://opennext.js.org/cloudflare/caching).
5. **Update `package.json`.**
Add scripts for previewing, deploying, and generating Cloudflare types:
```json
{
  "scripts": {
    "preview": "opennextjs-cloudflare build && opennextjs-cloudflare preview",
    "deploy": "opennextjs-cloudflare build && opennextjs-cloudflare deploy",
    "cf-typegen": "wrangler types --env-interface CloudflareEnv cloudflare-env.d.ts"
  }
}
```
Script usage

  * `preview`: Builds your app and serves it locally in the Workers runtime.
  * `deploy`: Builds your app and deploys it to Cloudflare Workers.
  * `cf-typegen`: Generates `cloudflare-env.d.ts` with Cloudflare binding types.
6. **Develop locally.**
Start the Next.js development server.
npmyarnpnpm
```
npm run dev
```
```
yarn run dev
```
```
pnpm run dev
```
7. **Preview with OpenNext.**
Preview your application in the Workers runtime.
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
8. **Deploy your project.**
Deploy your project to Cloudflare Workers.
npmyarnpnpm
```
npm run deploy
```
```
yarn run deploy
```
```
pnpm run deploy
```

Workers Builds

[Workers Builds](https://developers.cloudflare.com/workers/ci-cd/builds/) requires you to configure environment variables in [Build variables and secrets](https://developers.cloudflare.com/workers/ci-cd/builds/configuration/#build-variables-and-secrets).

This ensures the Next.js build has access to both public `NEXT_PUBLIC_` variables and non-public variables required for static generation and server-side build work. For more information, refer to [OpenNext environment variables ↗](https://opennext.js.org/cloudflare/howtos/env-vars#workers-builds).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/framework-guides/web-apps/opennext/#page","headline":"OpenNext adapter · Cloudflare Workers docs","description":"Deploy a Next.js application to Cloudflare Workers with the OpenNext adapter.","url":"https://developers.cloudflare.com/workers/framework-guides/web-apps/opennext/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-25","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["full-stack"]}
```
