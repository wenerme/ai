---
agent:
  instructions: "This site offers a search API that returns relevant content across the entire site. Use the search endpoint to find information instead of crawling individual pages."
  search: "https://developers.cloudflare.com/.well-known/search?q={query}"
description: Migrate from @cloudflare/vitest-pool-workers to @cloudflare/vitest-plugin.
title: Migrate to Vitest plugin
image: https://developers.cloudflare.com/workers/testing/vitest-integration/migration-guides/migrate-to-vitest-plugin/og.png?v=801131a6f0378d18
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

# Migrate to Vitest plugin

`@cloudflare/vitest-plugin` replaces `@cloudflare/vitest-pool-workers`. Configuration helpers move from the `/config` subpath to the package root; other APIs and Vitest options are unchanged.

## Run the codemod

To update your project automatically, run the following command from the project root:

npmyarnpnpm

```
npx @cloudflare/codemods vitest:pool-workers-to-vitest-plugin
```

```
yarn @cloudflare/codemods vitest:pool-workers-to-vitest-plugin
```

```
pnpm @cloudflare/codemods vitest:pool-workers-to-vitest-plugin
```

Use `--dry-run` to preview the changes. Use `--files <glob>` to limit the files the codemod updates.

The codemod updates your dependency, imports, and test TypeScript configuration. It renames the package in imports but leaves `/config` subpaths in place. Update those helper imports [manually](#update-manually).

## Update manually

If you cannot run the codemod, update the package name in your `package.json`, imports, and test `tsconfig.json`:

```diff
- "@cloudflare/vitest-pool-workers": "^0.16.0"
+ "@cloudflare/vitest-plugin": "^1.0.0"

- import { cloudflareTest } from "@cloudflare/vitest-pool-workers";
+ import { cloudflareTest } from "@cloudflare/vitest-plugin";

- "types": ["@cloudflare/vitest-pool-workers/types"]
+ "types": ["@cloudflare/vitest-plugin/types"]
```

Import configuration helpers from the package root. `@cloudflare/vitest-plugin` does not export a `/config` subpath.

```diff
- import { readD1Migrations } from "@cloudflare/vitest-pool-workers/config";
+ import { readD1Migrations } from "@cloudflare/vitest-plugin";
```

## Update request mocking

To mock outbound requests, use [`@msw/cloudflare` ↗︎](https://github.com/mswjs/cloudflare). For setup instructions, refer to [Mock outbound requests](https://developers.cloudflare.com/workers/testing/vitest-integration/mock-outbound-requests/).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/testing/vitest-integration/migration-guides/migrate-to-vitest-plugin/#page","headline":"Migrate to Vitest plugin","description":"Migrate from @cloudflare/vitest-pool-workers to @cloudflare/vitest-plugin.","url":"https://developers.cloudflare.com/workers/testing/vitest-integration/migration-guides/migrate-to-vitest-plugin/","inLanguage":"en","image":"https://developers.cloudflare.com/workers/testing/vitest-integration/migration-guides/migrate-to-vitest-plugin/og.png?v=801131a6f0378d18","dateModified":"2026-11-18","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
