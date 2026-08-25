---
description: Create a Nuxt application and deploy it to Cloudflare Workers with Workers Assets.
title: Nuxt
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

# Nuxt

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/workers/framework-guides/web-apps/more-web-frameworks/nuxt/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

In this guide, you will create a new [Nuxt ↗](https://nuxt.com/) application and deploy to Cloudflare Workers (with the new [Workers Assets](https://developers.cloudflare.com/workers/static-assets/)).

Already have a Nuxt project?

Run `wrangler deploy` in a project without a Wrangler configuration file and Wrangler will automatically detect Nuxt, generate the necessary configuration, and deploy your project.

npmyarnpnpm

```
npx wrangler deploy
```

```
yarn wrangler deploy
```

```
pnpm wrangler deploy
```

Learn more about [automatic project configuration](https://developers.cloudflare.com/workers/framework-guides/automatic-configuration/).

NuxtDetected

Generated configuration

wrangler.jsonc

main:.output/server/index.mjs

wrangler.jsonc

assets:directory: .output/public

wrangler.jsonc

compatibility\_flags:nodejs\_compat

wrangler.jsonc

observability:enabled: true

nuxt.config.ts

preset:cloudflare

WorkersDeployed

Wrangler handles configuration automatically

## 1\. Set up a new project

Use the [create-cloudflare ↗](https://www.npmjs.com/package/create-cloudflare) CLI (C3) to set up a new project. C3 will create a new project directory, initiate Nuxt's official setup tool, and provide the option to deploy instantly.

To use `create-cloudflare` to create a new Nuxt project with Workers Assets, run the following command:

npmyarnpnpm

```
npm create cloudflare@latest -- my-nuxt-app --framework=nuxt
```

```
yarn create cloudflare my-nuxt-app --framework=nuxt
```

```
pnpm create cloudflare@latest my-nuxt-app --framework=nuxt
```

After setting up your project, change your directory by running the following command:

```sh
cd my-nuxt-app
```

## 2\. Develop locally

After you have created your project, run the following command in the project directory to start a local server. This will allow you to preview your project locally during development.

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

## 3\. Deploy your Project

Your project can be deployed to a `*.workers.dev` subdomain or a [Custom Domain](https://developers.cloudflare.com/workers/configuration/routing/custom-domains/), from your own machine or from any CI/CD system, including [Cloudflare's own](https://developers.cloudflare.com/workers/ci-cd/builds/).

The following command will build and deploy your project. If you're using CI, ensure you update your ["deploy command"](https://developers.cloudflare.com/workers/ci-cd/builds/configuration/#build-settings) configuration appropriately.

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

---

## Bindings

Your Nuxt application can be fully integrated with the Cloudflare Developer Platform, in both local development and in production, by using product bindings. The [Nuxt documentation ↗](https://nitro.unjs.io/deploy/providers/cloudflare#direct-access-to-cloudflare-bindings) provides information about configuring bindings and how you can access them in your Nuxt event handlers.

With bindings, your application can be fully integrated with the Cloudflare Developer Platform, giving you access to compute, storage, AI and more.

### [Bindings](https://developers.cloudflare.com/workers/runtime-apis/bindings/)

Access to compute, storage, AI and more.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/framework-guides/web-apps/more-web-frameworks/nuxt/#page","headline":"Nuxt · Cloudflare Workers docs","description":"Create a Nuxt application and deploy it to Cloudflare Workers with Workers Assets.","url":"https://developers.cloudflare.com/workers/framework-guides/web-apps/more-web-frameworks/nuxt/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["full-stack","Nuxt"]}
```
