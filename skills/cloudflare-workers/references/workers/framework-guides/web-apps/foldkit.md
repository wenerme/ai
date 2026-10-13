---
description: Deploy a Foldkit single-page, statically generated, or server-rendered application to Cloudflare Workers.
title: Foldkit
image: https://developers.cloudflare.com/workers/framework-guides/web-apps/foldkit/og.png?v=aec8c202932ddb85
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

# Foldkit

Last updated Oct 13, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/workers/framework-guides/web-apps/foldkit/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

[Foldkit ↗︎](https://foldkit.dev/) supports single-page applications (SPA), static site generation (SSG), and server-side rendering (SSR). Each mode uses [Workers Assets](https://developers.cloudflare.com/workers/static-assets/) to serve browser files. SSR also runs a Worker `fetch` handler.

You need Node.js 22.22.2 or newer and a Cloudflare account.

## Create a Foldkit application

1. Create a project with [`create-foldkit-app` ↗︎](https://www.npmjs.com/package/create-foldkit-app):npm

   ```
   npx create-foldkit-app@latest --name my-foldkit-app
   ```

   Choose a rendering mode when prompted. For SPA, choose the `routing` example. Select npm as the package manager.
2. In the project directory, install Wrangler:

   ```sh
   cd my-foldkit-app
   ```

   npm

   ```
   npm i -D wrangler
   ```

## Configure your rendering mode

In the project directory, create a `wrangler.jsonc` file with the configuration for your rendering mode.

### SPA

The SPA build writes `index.html` and browser assets to `dist`. The `single-page-application` setting serves `index.html` when a client-side route does not match an asset.

```jsonc
{
  "$schema": "./node_modules/wrangler/config-schema.json",
  "name": "my-foldkit-app",
  // Set this to today's date
  "compatibility_date": "2026-10-13",
  "assets": {
    "directory": "./dist",
    "not_found_handling": "single-page-application"
  }
}
```

```toml
name = "my-foldkit-app"
# Set this to today's date
compatibility_date = "2026-10-13"

[assets]
directory = "./dist"
not_found_handling = "single-page-application"
```

### SSG

The SSG build uses a server bundle to prerender routes, then writes HTML and browser assets to `dist/client`. Deploy only `dist/client` with Workers Assets.

```jsonc
{
  "$schema": "./node_modules/wrangler/config-schema.json",
  "name": "my-foldkit-app",
  // Set this to today's date
  "compatibility_date": "2026-10-13",
  "assets": {
    "directory": "./dist/client"
  }
}
```

```toml
name = "my-foldkit-app"
# Set this to today's date
compatibility_date = "2026-10-13"

[assets]
directory = "./dist/client"
```

### SSR

The SSR build writes a Web `fetch` handler to `dist/server/fetch.js` and browser assets to `dist/client`. The Worker handles page requests, while Workers Assets serves the browser files.

```jsonc
{
  "$schema": "./node_modules/wrangler/config-schema.json",
  "name": "my-foldkit-app",
  "main": "./dist/server/fetch.js",
  // Set this to today's date
  "compatibility_date": "2026-10-13",
  "assets": {
    "directory": "./dist/client"
  }
}
```

```toml
name = "my-foldkit-app"
main = "./dist/server/fetch.js"
# Set this to today's date
compatibility_date = "2026-10-13"

[assets]
directory = "./dist/client"
```

## Preview and deploy

1. Build the application:npm

   ```
   npm run build
   ```

2. Preview it in the Workers runtime:npm

   ```
   npx wrangler dev
   ```

   Open the local URL printed by Wrangler. For SPA, open `/people` and reload it. For SSG, visit `/about/`. For SSR, increment the counter and reload. Its cookie-backed value should persist.
3. Build and deploy the application:npm

   ```
   npm run build
   ```

   npm

   ```
   npx wrangler deploy
   ```

Open the `workers.dev` URL printed by Wrangler to verify the deployed application. For more information about SSG and SSR builds, refer to [Foldkit's server rendering guide ↗︎](https://foldkit.dev/core/server-rendering).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/framework-guides/web-apps/foldkit/#page","headline":"Foldkit","description":"Deploy a Foldkit single-page, statically generated, or server-rendered application to Cloudflare Workers.","url":"https://developers.cloudflare.com/workers/framework-guides/web-apps/foldkit/","inLanguage":"en","image":"https://developers.cloudflare.com/workers/framework-guides/web-apps/foldkit/og.png?v=aec8c202932ddb85","dateModified":"2026-10-13","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["full-stack"]}
```
