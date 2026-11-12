---
description: Serve a static site or single-page app from Vercel on Workers with a Wrangler file that points to your build output. Deploy on every push with Workers Builds.
title: Migrate a static site or SPA from Vercel to Cloudflare Workers
image: https://developers.cloudflare.com/workers/static-assets/migration-guides/vercel-to-workers/static-site/og.png?v=b6b558c6444fee16
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

# Migrate a static site or SPA from Vercel to Cloudflare Workers

Last updated Nov 11, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/workers/static-assets/migration-guides/vercel-to-workers/static-site/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

This guide moves a static site or single-page application (SPA) from Vercel to Cloudflare Workers. Use it if your project does not render pages on the server. [Workers Static Assets](https://developers.cloudflare.com/workers/static-assets/) serves your build output, so you do not need a framework adapter.

## Before you begin

Review the steps in [Before you begin](https://developers.cloudflare.com/workers/static-assets/migration-guides/vercel-to-workers/#before-you-begin) that apply to every framework.

## Migrate your site

1. In the Vercel dashboard, go to your project's **Settings** > **Build & Development settings**. Note the **Build Command** and **Output Directory** values.![Finding the Build Command and Output Directory fields](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=1848,height=1100,format=webp/_astro/vercel-deploy-1.DrHD4fam.png)
2. In the root of your project, create a Wrangler configuration file. Replace `<your-project-name>` with your project name, and `<your-build-directory>` with the output directory, for example `./dist`.

   For a static site:

   ```jsonc
   {
   	"name": "<your-project-name>",
   	// Set this to today's date
   	"compatibility_date": "2026-11-12",
   	"assets": {
   		"directory": "<your-build-directory>",
   	},
   }
   ```

   ```toml
   name = "<your-project-name>"
   # Set this to today's date
   compatibility_date = "2026-11-12"

   [assets]
   directory = "<your-build-directory>"
   ```

   For a single-page application, add `not_found_handling`:

   ```jsonc
   {
   	"name": "<your-project-name>",
   	// Set this to today's date
   	"compatibility_date": "2026-11-12",
   	"assets": {
   		"directory": "<your-build-directory>",
   		"not_found_handling": "single-page-application",
   	},
   }
   ```

   ```toml
   name = "<your-project-name>"
   # Set this to today's date
   compatibility_date = "2026-11-12"

   [assets]
   directory = "<your-build-directory>"
   not_found_handling = "single-page-application"
   ```

3. Build your project, then deploy it:npmyarnpnpm

   ```
   npx wrangler deploy
   ```

   ```
   yarn wrangler deploy
   ```

   ```
   pnpm wrangler deploy
   ```

4. To deploy on every push, [connect your repository to Workers Builds](https://developers.cloudflare.com/workers/ci-cd/builds/#connect-a-new-worker). Use the same build command as on Vercel, and use `npx wrangler deploy` as the deploy command.

## Related resources

- [Static Assets](https://developers.cloudflare.com/workers/static-assets/)
- [Single-page application routing](https://developers.cloudflare.com/workers/static-assets/routing/single-page-application/)
- [Migrate from Vercel to Workers](https://developers.cloudflare.com/workers/static-assets/migration-guides/vercel-to-workers/)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/static-assets/migration-guides/vercel-to-workers/static-site/#page","headline":"Migrate a static site or SPA from Vercel to Cloudflare Workers","description":"Serve a static site or single-page app from Vercel on Workers with a Wrangler file that points to your build output. Deploy on every push with Workers Builds.","url":"https://developers.cloudflare.com/workers/static-assets/migration-guides/vercel-to-workers/static-site/","inLanguage":"en","image":"https://developers.cloudflare.com/workers/static-assets/migration-guides/vercel-to-workers/static-site/og.png?v=b6b558c6444fee16","dateModified":"2026-11-11","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
