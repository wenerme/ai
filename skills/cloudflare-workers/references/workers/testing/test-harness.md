---
description: Write integration tests for Cloudflare Workers with the createTestHarness API in Wrangler.
title: Integration test harness
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

# Integration test harness

Last updated Jul 27, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/workers/testing/test-harness/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

[createTestHarness()](https://developers.cloudflare.com/workers/wrangler/api/#createtestharness) is a Wrangler API for integration testing from any Node.js test runner. It runs one or more Workers from [Wrangler](https://developers.cloudflare.com/workers/wrangler/) projects or Vite projects that use the [Cloudflare Vite plugin](https://developers.cloudflare.com/workers/vite-plugin/).

[Get started](https://developers.cloudflare.com/workers/testing/test-harness/get-started/) [View complete example](https://github.com/cloudflare/workers-sdk/tree/main/fixtures/create-test-harness-example)

## Features

* Runs production build output from Wrangler or the Cloudflare Vite plugin
* Dispatches requests and events to one or more Workers
* Provides access to bindings and local storage from tests
* Captures logs and diagnostic output from the Workers runtime

## Guides

### [Configure the test harness](https://developers.cloudflare.com/workers/testing/test-harness/configure/)

Configure Workers, test values, lifecycle hooks, and failure diagnostics.

### [Prepare test state](https://developers.cloudflare.com/workers/testing/test-harness/prepare-test-state/)

Seed storage, mock outbound requests, and replace bindings.

### [Interact with Workers](https://developers.cloudflare.com/workers/testing/test-harness/interact-with-workers/)

Test routes, dispatch events, control Workflows, and assert logs.

### [Integrations](https://developers.cloudflare.com/workers/testing/test-harness/integrations/)

Use the test harness with MSW and Playwright.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/workers/testing/test-harness/#page","headline":"Integration test harness · Cloudflare Workers docs","description":"Write integration tests for Cloudflare Workers with the createTestHarness API in Wrangler.","url":"https://developers.cloudflare.com/workers/testing/test-harness/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-07-27","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
