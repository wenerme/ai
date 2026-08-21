---
description: Run unit and integration tests for Cloudflare Workers inside the Workers runtime using the Vitest integration.
title: Vitest integration
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

# Vitest integration

Last updated Aug 20, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/workers/testing/vitest-integration/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

For most users, Cloudflare recommends using the Workers Vitest integration for unit testing Workers and [Pages Functions](https://developers.cloudflare.com/pages/functions/) projects. [Vitest ↗](https://vitest.dev/) is a popular JavaScript testing framework featuring a fast watch mode, Jest compatibility, and default TypeScript support. Cloudflare provides the `@cloudflare/vitest-plugin` Vite plugin, which runs your Vitest tests inside the Workers runtime.

The Workers Vitest integration:

* Supports both **unit tests** and **integration tests**.
* Provides direct access to Workers runtime APIs and bindings.
* Implements isolated per-test-file storage.
* Runs tests fully-locally using [Miniflare ↗](https://miniflare.dev/).
* Leverages Vitest's hot-module reloading for near instant reruns.
* Supports projects with multiple Workers.
[Write your first test](https://developers.cloudflare.com/workers/testing/vitest-integration/write-your-first-test/)

If you use `@cloudflare/vitest-pool-workers`, refer to [Migrate to Vitest plugin](https://developers.cloudflare.com/workers/testing/vitest-integration/migration-guides/migrate-to-vitest-plugin/).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/workers/testing/vitest-integration/#page","headline":"Vitest integration · Cloudflare Workers docs","description":"Run unit and integration tests for Cloudflare Workers inside the Workers runtime using the Vitest integration.","url":"https://developers.cloudflare.com/workers/testing/vitest-integration/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-20","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
