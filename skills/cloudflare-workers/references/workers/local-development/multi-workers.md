---
description: Learn how to develop with multiple Workers using different approaches and configurations.
title: Developing with multiple Workers
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

# Developing with multiple Workers

Last updated Jun 25, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/workers/local-development/multi-workers/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

When building complex applications, you may want to run multiple Workers during development. This guide covers the different approaches for running multiple Workers locally and when to use each approach.

## Single dev command

Note

We recommend this approach as the default for most development workflows as it ensures the best compatibility with bindings.

You can run multiple Workers in a single dev command by passing multiple configuration files to your dev server:

**Using Wrangler**

npmyarnpnpm

```
npx wrangler dev -c ./app/wrangler.jsonc -c ./api/wrangler.jsonc
```

```
yarn wrangler dev -c ./app/wrangler.jsonc -c ./api/wrangler.jsonc
```

```
pnpm wrangler dev -c ./app/wrangler.jsonc -c ./api/wrangler.jsonc
```

The first config (`./app/wrangler.jsonc`) is treated as the primary Worker, exposed at `http://localhost:8787`. Additional configs (e.g. `./api/wrangler.jsonc`) run as auxiliary Workers, available via service bindings or tail consumers from the primary Worker.

**Using the Vite plugin**

Configure `auxiliaryWorkers` in your Vite configuration:

```js
import { defineConfig } from "vite";
import { cloudflare } from "@cloudflare/vite-plugin";

export default defineConfig({
  plugins: [
    cloudflare({
      configPath: "./app/wrangler.jsonc",
      auxiliaryWorkers: [
        {
          configPath: "./api/wrangler.jsonc",
        },
      ],
    }),
  ],
});
```

Then run:

npmyarnpnpm

```
npx vite dev
```

```
yarn vite dev
```

```
pnpm vite dev
```

**Use this approach when:**

* You want the simplest setup for development
* Workers are part of the same application or codebase
* You need to access a Durable Object namespace or Workflow from another Worker using `script_name`, or set up Queues where the producer and consumer Workers are separated.

## Multiple dev commands

You can also run each Worker in separate dev commands, each with its own terminal and configuration.

npmyarnpnpm

```
# Terminal 1
npx wrangler dev -c ./app/wrangler.jsonc
```

```
# Terminal 1
yarn wrangler dev -c ./app/wrangler.jsonc
```

```
# Terminal 1
pnpm wrangler dev -c ./app/wrangler.jsonc
```

npmyarnpnpm

```
# Terminal 2
npx wrangler dev -c ./api/wrangler.jsonc
```

```
# Terminal 2
yarn wrangler dev -c ./api/wrangler.jsonc
```

```
# Terminal 2
pnpm wrangler dev -c ./api/wrangler.jsonc
```

These Workers run in different dev commands but can still communicate with each other via service bindings or tail consumers **regardless of whether they are started with `wrangler dev` or `vite dev`**.

Note

You can also combine both approaches — for example, run a group of Workers together through `vite dev` using `auxiliaryWorkers`, while running another Worker separately with `wrangler dev`. This allows you to keep tightly coupled Workers running under a single dev command, while keeping independent or shared Workers in separate ones.

**Use this approach when:**

* You want each Worker to be accessible on its own local URL during development, since only the primary Worker is exposed when using a single dev command
* Each Worker has its own build setup or tooling — for example, one uses Vite with custom plugins while another is a vanilla Wrangler project
* You need the flexibility to run and develop Workers independently without restructuring your project or consolidating configs

This setup is especially useful in larger projects where each team maintains a subset of Workers. Running everything in a single dev command might require significant restructuring or build integration that isn't always practical.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/local-development/multi-workers/#page","headline":"Developing with multiple Workers · Cloudflare Workers docs","description":"Learn how to develop with multiple Workers using different approaches and configurations.","url":"https://developers.cloudflare.com/workers/local-development/multi-workers/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-06-25","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
