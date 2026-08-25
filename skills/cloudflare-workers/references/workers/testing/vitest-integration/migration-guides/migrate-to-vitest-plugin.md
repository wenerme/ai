---
description: Migrate from @cloudflare/vitest-pool-workers to @cloudflare/vitest-plugin.
title: Migrate to Vitest plugin
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

# Migrate to Vitest plugin

Last updated Aug 20, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/workers/testing/vitest-integration/migration-guides/migrate-to-vitest-plugin/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

`@cloudflare/vitest-plugin` replaces `@cloudflare/vitest-pool-workers`. The package API and Vitest configuration are unchanged.

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

The codemod updates your dependency, imports, and test TypeScript configuration.

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

The same rename applies to subpath imports, including `@cloudflare/vitest-plugin/config`.

## Update request mocking

To mock outbound requests, use [@msw/cloudflare ↗](https://github.com/mswjs/cloudflare). For setup instructions, refer to [Mock outbound requests](https://developers.cloudflare.com/workers/testing/vitest-integration/mock-outbound-requests/).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/testing/vitest-integration/migration-guides/migrate-to-vitest-plugin/#page","headline":"Migrate to Vitest plugin · Cloudflare Workers docs","description":"Migrate from @cloudflare/vitest-pool-workers to @cloudflare/vitest-plugin.","url":"https://developers.cloudflare.com/workers/testing/vitest-integration/migration-guides/migrate-to-vitest-plugin/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-20","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
