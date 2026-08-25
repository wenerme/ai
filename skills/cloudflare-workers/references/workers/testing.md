---
description: Choose testing tools for Cloudflare Workers, including createTestHarness and the Vitest integration.
title: Testing
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

# Testing

Last updated Jul 27, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/workers/testing/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

The Workers platform provides complementary tools for testing different parts of your application. For most projects, use the [Workers Vitest integration](https://developers.cloudflare.com/workers/testing/vitest-integration/) for unit tests and the [createTestHarness()](https://developers.cloudflare.com/workers/testing/test-harness/) API for integration tests.

## Unit tests

Use the [Workers Vitest integration](https://developers.cloudflare.com/workers/testing/vitest-integration/) for fast feedback while testing individual functions and modules. Tests run inside the Workers runtime, so your test code can access bindings and runtime APIs directly.

The Workers Vitest integration provides:

* Fast feedback while testing individual functions and modules.
* Direct assertions against binding state, such as values written to KV, R2, D1, or Durable Objects.
* Direct calls to Durable Objects and other runtime APIs.

To set up unit tests, refer to [Write your first Vitest test](https://developers.cloudflare.com/workers/testing/vitest-integration/write-your-first-test/).

## Integration tests

Use the [createTestHarness()](https://developers.cloudflare.com/workers/testing/test-harness/) API to exercise one or more Workers as a whole and test how they interact with each other and with external services.

The integration test harness provides:

* Confidence from exercising production Worker builds.
* Coverage through configured HTTP routes across Workers.
* Compatibility with any Node.js test runner and tools such as Playwright or MSW.

To set up integration tests, refer to [Get started with the integration test harness](https://developers.cloudflare.com/workers/testing/test-harness/get-started/).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/workers/testing/#page","headline":"Testing · Cloudflare Workers docs","description":"Choose testing tools for Cloudflare Workers, including createTestHarness and the Vitest integration.","url":"https://developers.cloudflare.com/workers/testing/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-07-27","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
