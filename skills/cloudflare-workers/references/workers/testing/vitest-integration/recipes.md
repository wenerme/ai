---
description: Examples that demonstrate how to write unit and integration tests with the Workers Vitest integration.
title: Recipes and examples
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

#  Recipes and examples

Last updated Apr 29, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/workers/testing/vitest-integration/recipes/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

Recipes are examples that help demonstrate how to write unit tests and integration tests for Workers projects using the [@cloudflare/vitest-pool-workers ↗](https://www.npmjs.com/package/@cloudflare/vitest-pool-workers) package.

* [Basic unit and integration tests for Workers using exports.default ↗](https://github.com/cloudflare/workers-sdk/tree/main/fixtures/vitest-pool-workers-examples/basics-unit-integration-self)
* [Basic unit and integration tests for Pages Functions using exports.default ↗](https://github.com/cloudflare/workers-sdk/tree/main/fixtures/vitest-pool-workers-examples/pages-functions-unit-integration-self)
* [Basic integration tests using an auxiliary Worker ↗](https://github.com/cloudflare/workers-sdk/tree/main/fixtures/vitest-pool-workers-examples/basics-integration-auxiliary)
* [Tests using KV, R2 and the Cache API ↗](https://github.com/cloudflare/workers-sdk/tree/main/fixtures/vitest-pool-workers-examples/kv-r2-caches)
* [Tests using D1 with migrations ↗](https://github.com/cloudflare/workers-sdk/tree/main/fixtures/vitest-pool-workers-examples/d1)
* [Tests using Durable Objects with direct access ↗](https://github.com/cloudflare/workers-sdk/tree/main/fixtures/vitest-pool-workers-examples/durable-objects)
* [Tests using Workflows ↗](https://github.com/cloudflare/workers-sdk/tree/main/fixtures/vitest-pool-workers-examples/workflows)
* [Tests using Queue producers and consumers ↗](https://github.com/cloudflare/workers-sdk/tree/main/fixtures/vitest-pool-workers-examples/queues)
* [Tests using Pipelines ↗](https://github.com/cloudflare/workers-sdk/tree/main/fixtures/vitest-pool-workers-examples/pipelines)
* [Tests using Hyperdrive with a Vitest managed TCP server ↗](https://github.com/cloudflare/workers-sdk/tree/main/fixtures/vitest-pool-workers-examples/hyperdrive)
* [Tests using declarative (MSW) / imperative outbound request mocks ↗](https://github.com/cloudflare/workers-sdk/tree/main/fixtures/vitest-pool-workers-examples/request-mocking)
* [Tests using multiple auxiliary Workers and request mocks ↗](https://github.com/cloudflare/workers-sdk/tree/main/fixtures/vitest-pool-workers-examples/multiple-workers)
* [Tests importing WebAssembly modules ↗](https://github.com/cloudflare/workers-sdk/tree/main/fixtures/vitest-pool-workers-examples/web-assembly)
* [Tests using JSRPC with entrypoints and Durable Objects ↗](https://github.com/cloudflare/workers-sdk/tree/main/fixtures/vitest-pool-workers-examples/rpc)
* [Tests using ctx.exports to access Worker exports ↗](https://github.com/cloudflare/workers-sdk/tree/main/fixtures/vitest-pool-workers-examples/context-exports)
* [Resolving modules with Vite Dependency Pre-Bundling ↗](https://github.com/cloudflare/workers-sdk/tree/main/fixtures/vitest-pool-workers-examples/module-resolution)
* [Mocking Workers AI and Vectorize bindings in unit tests ↗](https://github.com/cloudflare/workers-sdk/tree/main/fixtures/vitest-pool-workers-examples/ai-vectorize)
* [Tests using the Images binding ↗](https://github.com/cloudflare/workers-sdk/tree/main/fixtures/vitest-pool-workers-examples/images)
* [Tests mocking Workers Assets ↗](https://github.com/cloudflare/workers-sdk/tree/main/fixtures/vitest-pool-workers-examples/workers-assets)

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/testing/vitest-integration/recipes/#page","headline":"Recipes and examples · Cloudflare Workers docs","description":"Examples that demonstrate how to write unit and integration tests with the Workers Vitest integration.","url":"https://developers.cloudflare.com/workers/testing/vitest-integration/recipes/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-29","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
