---
description: Deploy fate directly to your own Cloudflare account with Void.
title: fate
image: https://developers.cloudflare.com/workers/framework-guides/web-apps/fate/og.png?v=e9c00ff77b7de08b
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

# fate

Last updated Oct 8, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/workers/framework-guides/web-apps/fate/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

[*fate* ↗︎](https://fate.technology/) is a modern data client for the web inspired by [Relay ↗︎](https://relay.dev/) and [GraphQL ↗︎](https://graphql.org/). It combines view composition, normalized caching, data masking, Async React features, and type-safe data fetching.

Deploy fate directly to your own Cloudflare account with [Void ↗︎](https://fate.technology/integrations/void). The Void template includes the app, [D1 database](https://developers.cloudflare.com/d1/), Drizzle migrations, Better Auth, and live updates through `void-fate` and `void/live`.

## Prerequisites

You need Node.js 24+ and [Vite+ ↗︎](https://viteplus.dev/guide/).

## Deploy a new fate application on Workers

1. **Create a new fate app with Vite+.**

   ```sh
   vp create fate -- my-app --template void
   cd my-app
   ```

   Add `--framework vue` to the create command to use Vue instead of React.
2. **Set up Void local files, seed the local database, and prepare fate client support.**

   ```sh
   vp run dev:setup
   ```


3. **Start the app.**

   ```sh
   vp run dev
   ```

   The app runs at `http://localhost:6001`.
4. **Deploy directly to your own Cloudflare account.**

   From the project root:

   ```sh
   vp exec void deploy --platform cloudflare
   ```

   Void signs you into Cloudflare when needed, lets you select your account, provisions resources, applies checked-in database migrations, and deploys the app. It saves resource IDs in the root `wrangler.jsonc`; commit that updated config for subsequent deployments. A Void platform account is not required.

## Live updates

The template includes the `VOID_LIVE` [Durable Object binding](https://developers.cloudflare.com/durable-objects/) and its class migration. Keep them in `wrangler.jsonc` so live subscriptions can receive updates across requests. RPC requests use `/fate`, and live updates use `/fate-live`.

## Database migrations

After changing your database schema or auth configuration, run `vp run db:generate`, review and commit the generated migrations, then deploy. The migrations must include the Better Auth schema used in production.

See [Void's Cloudflare deployment guide ↗︎](https://void.cloud/integrations/cloudflare) for custom domains, secrets, and CI configuration.

## Next steps

- [fate documentation ↗︎](https://fate.technology/guide/getting-started)
- [Void integration ↗︎](https://fate.technology/integrations/void)
- [Cloudflare integration ↗︎](https://fate.technology/integrations/cloudflare)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/framework-guides/web-apps/fate/#page","headline":"fate","description":"Deploy fate directly to your own Cloudflare account with Void.","url":"https://developers.cloudflare.com/workers/framework-guides/web-apps/fate/","inLanguage":"en","image":"https://developers.cloudflare.com/workers/framework-guides/web-apps/fate/og.png?v=e9c00ff77b7de08b","dateModified":"2026-10-08","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["full-stack"]}
```
