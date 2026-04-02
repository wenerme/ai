---
title: Recipes and examples
description: Examples that demonstrate how to write unit and integration tests with the Workers Vitest integration.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/workers/testing/vitest-integration/recipes.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Recipes and examples

Recipes are examples that help demonstrate how to write unit tests and integration tests for Workers projects using the [@cloudflare/vitest-pool-workers ↗](https://www.npmjs.com/package/@cloudflare/vitest-pool-workers) package.

* [Basic unit and integration tests for Workers using SELF ↗](https://github.com/cloudflare/workers-sdk/tree/main/fixtures/vitest-pool-workers-examples/basics-unit-integration-self)
* [Basic unit and integration tests for Pages Functions using SELF ↗](https://github.com/cloudflare/workers-sdk/tree/main/fixtures/vitest-pool-workers-examples/pages-functions-unit-integration-self)
* [Basic integration tests using an auxiliary Worker ↗](https://github.com/cloudflare/workers-sdk/tree/main/fixtures/vitest-pool-workers-examples/basics-integration-auxiliary)
* [Basic integration test for Workers with static assets ↗](https://github.com/cloudflare/workers-sdk/tree/main/fixtures/vitest-pool-workers-examples/workers-assets)
* [Isolated tests using KV, R2 and the Cache API ↗](https://github.com/cloudflare/workers-sdk/tree/main/fixtures/vitest-pool-workers-examples/kv-r2-caches)
* [Isolated tests using D1 with migrations ↗](https://github.com/cloudflare/workers-sdk/tree/main/fixtures/vitest-pool-workers-examples/d1)
* [Isolated tests using Durable Objects with direct access ↗](https://github.com/cloudflare/workers-sdk/tree/main/fixtures/vitest-pool-workers-examples/durable-objects)
* [Isolated tests using Workflows ↗](https://github.com/cloudflare/workers-sdk/tree/main/fixtures/vitest-pool-workers-examples/workflows)
* [Tests using Queue producers and consumers ↗](https://github.com/cloudflare/workers-sdk/tree/main/fixtures/vitest-pool-workers-examples/queues)
* [Tests using Hyperdrive with a Vitest managed TCP server ↗](https://github.com/cloudflare/workers-sdk/tree/main/fixtures/vitest-pool-workers-examples/hyperdrive)
* [Tests using declarative/imperative outbound request mocks ↗](https://github.com/cloudflare/workers-sdk/tree/main/fixtures/vitest-pool-workers-examples/request-mocking)
* [Tests using multiple auxiliary Workers and request mocks ↗](https://github.com/cloudflare/workers-sdk/tree/main/fixtures/vitest-pool-workers-examples/multiple-workers)
* [Tests importing WebAssembly modules ↗](https://github.com/cloudflare/workers-sdk/tree/main/fixtures/vitest-pool-workers-examples/web-assembly)
* [Tests using JSRPC with entrypoints and Durable Objects ↗](https://github.com/cloudflare/workers-sdk/tree/main/fixtures/vitest-pool-workers-examples/rpc)
* [Tests using ctx.exports to access Worker exports ↗](https://github.com/cloudflare/workers-sdk/tree/main/fixtures/vitest-pool-workers-examples/context-exports)
* [Integration test with static assets and Puppeteer ↗](https://github.com/GregBrimble/puppeteer-vitest-workers-assets)
* [Resolving modules with Vite Dependency Pre-Bundling ↗](https://github.com/cloudflare/workers-sdk/tree/main/fixtures/vitest-pool-workers-examples/module-resolution)
* [Mocking Workers AI and Vectorize bindings in unit tests ↗](https://github.com/cloudflare/workers-sdk/tree/main/fixtures/vitest-pool-workers-examples/ai-vectorize)

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/testing/","name":"Testing"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/testing/vitest-integration/","name":"Vitest integration"}},{"@type":"ListItem","position":5,"item":{"@id":"/workers/testing/vitest-integration/recipes/","name":"Recipes and examples"}}]}
```
