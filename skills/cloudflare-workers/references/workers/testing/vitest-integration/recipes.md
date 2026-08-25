---
description: Examples that demonstrate how to write unit and integration tests with the Workers Vitest integration.
title: Recipes and examples
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

# Recipes and examples

Last updated Aug 20, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/workers/testing/vitest-integration/recipes/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Recipes are examples that demonstrate unit and integration tests for Workers projects using the [@cloudflare/vitest-plugin ↗](https://www.npmjs.com/package/@cloudflare/vitest-plugin) package.

* [Basic unit and integration tests for Workers using exports.default ↗](https://github.com/cloudflare/workers-sdk/tree/main/fixtures/vitest-plugin-examples/basics-unit-integration-self)
* [Basic unit and integration tests for Pages Functions using exports.default ↗](https://github.com/cloudflare/workers-sdk/tree/main/fixtures/vitest-plugin-examples/pages-functions-unit-integration-self)
* [Basic integration tests using an auxiliary Worker ↗](https://github.com/cloudflare/workers-sdk/tree/main/fixtures/vitest-plugin-examples/basics-integration-auxiliary)
* [Tests using KV, R2 and the Cache API ↗](https://github.com/cloudflare/workers-sdk/tree/main/fixtures/vitest-plugin-examples/kv-r2-caches)
* [Tests using D1 with migrations ↗](https://github.com/cloudflare/workers-sdk/tree/main/fixtures/vitest-plugin-examples/d1)
* [Tests using Durable Objects with direct access ↗](https://github.com/cloudflare/workers-sdk/tree/main/fixtures/vitest-plugin-examples/durable-objects)
* [Tests using Workflows ↗](https://github.com/cloudflare/workers-sdk/tree/main/fixtures/vitest-plugin-examples/workflows)
* [Tests using Queue producers and consumers ↗](https://github.com/cloudflare/workers-sdk/tree/main/fixtures/vitest-plugin-examples/queues)
* [Tests using Pipelines ↗](https://github.com/cloudflare/workers-sdk/tree/main/fixtures/vitest-plugin-examples/pipelines)
* [Tests using Hyperdrive with a Vitest managed TCP server ↗](https://github.com/cloudflare/workers-sdk/tree/main/fixtures/vitest-plugin-examples/hyperdrive)
* [Mock outbound requests with @msw/cloudflare ↗](https://github.com/cloudflare/workers-sdk/tree/main/fixtures/vitest-plugin-examples/request-mocking)
* [Tests using multiple auxiliary Workers and request mocks ↗](https://github.com/cloudflare/workers-sdk/tree/main/fixtures/vitest-plugin-examples/multiple-workers)
* [Tests importing WebAssembly modules ↗](https://github.com/cloudflare/workers-sdk/tree/main/fixtures/vitest-plugin-examples/web-assembly)
* [Tests using JSRPC with entrypoints and Durable Objects ↗](https://github.com/cloudflare/workers-sdk/tree/main/fixtures/vitest-plugin-examples/rpc)
* [Tests using ctx.exports to access Worker exports ↗](https://github.com/cloudflare/workers-sdk/tree/main/fixtures/vitest-plugin-examples/context-exports)
* [Resolve modules with Vite dependency pre-bundling ↗](https://github.com/cloudflare/workers-sdk/tree/main/fixtures/vitest-plugin-examples/module-resolution)
* [Mock Workers AI and Vectorize bindings in unit tests ↗](https://github.com/cloudflare/workers-sdk/tree/main/fixtures/vitest-plugin-examples/ai-vectorize)
* [Tests using the Images binding ↗](https://github.com/cloudflare/workers-sdk/tree/main/fixtures/vitest-plugin-examples/images)
* [Tests mocking Workers Assets ↗](https://github.com/cloudflare/workers-sdk/tree/main/fixtures/vitest-plugin-examples/workers-assets)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/testing/vitest-integration/recipes/#page","headline":"Recipes and examples · Cloudflare Workers docs","description":"Examples that demonstrate how to write unit and integration tests with the Workers Vitest integration.","url":"https://developers.cloudflare.com/workers/testing/vitest-integration/recipes/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-20","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
