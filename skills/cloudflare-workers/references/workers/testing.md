---
description: Compare testing options for Cloudflare Workers, including Vitest integration, Miniflare, and unstable_startWorker.
title: Testing
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

# Testing

Last updated Jul 3, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/workers/testing/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

The Workers platform has a variety of ways to test your applications, depending on your requirements. We recommend using the [Vitest integration](https://developers.cloudflare.com/workers/testing/vitest-integration), which allows you to run tests _inside_ the Workers runtime, and unit test individual functions within your Worker.

[Get started with Vitest](https://developers.cloudflare.com/workers/testing/vitest-integration/write-your-first-test/)

## Testing comparison matrix

However, if you don't use Vitest, both [Miniflare's API](https://developers.cloudflare.com/workers/testing/miniflare/writing-tests) and the [unstable\_startWorker()](https://developers.cloudflare.com/workers/wrangler/api/#unstable%5Fstartworker) API provide options for testing your Worker in any testing framework.

| Feature                               | [Vitest integration](https://developers.cloudflare.com/workers/testing/vitest-integration) | [unstable\_startWorker()](https://developers.cloudflare.com/workers/testing/unstable%5Fstartworker/) | [Miniflare's API](https://developers.cloudflare.com/workers/testing/miniflare/writing-tests/) |
| ------------------------------------- | ------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| Unit testing                          | ✅                                                                                          | ❌                                                                                                    | ❌                                                                                             |
| Integration testing                   | ✅                                                                                          | ✅                                                                                                    | ✅                                                                                             |
| Loading Wrangler configuration files  | ✅                                                                                          | ✅                                                                                                    | ❌                                                                                             |
| Use bindings directly in tests        | ✅                                                                                          | ❌                                                                                                    | ✅                                                                                             |
| Isolated per-test storage             | ✅                                                                                          | ❌                                                                                                    | ❌                                                                                             |
| Outbound request mocking              | ✅                                                                                          | ❌                                                                                                    | ✅                                                                                             |
| Multiple Worker support               | ✅                                                                                          | ✅                                                                                                    | ✅                                                                                             |
| Direct access to Durable Objects      | ✅                                                                                          | ❌                                                                                                    | ❌                                                                                             |
| Run Durable Object alarms immediately | ✅                                                                                          | ❌                                                                                                    | ❌                                                                                             |
| List Durable Objects                  | ✅                                                                                          | ❌                                                                                                    | ❌                                                                                             |
| Test Durable Object eviction          | ✅                                                                                          | ❌                                                                                                    | ❌                                                                                             |
| Testing service Workers               | ❌                                                                                          | ✅                                                                                                    | ✅                                                                                             |

Pages Functions

The content described on this page is also applicable to [Pages Functions](https://developers.cloudflare.com/pages/functions/). Pages Functions are Cloudflare Workers and can be thought of synonymously with Workers in this context.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/workers/testing/#page","headline":"Testing · Cloudflare Workers docs","description":"Compare testing options for Cloudflare Workers, including Vitest integration, Miniflare, and unstable\\_startWorker.","url":"https://developers.cloudflare.com/workers/testing/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-07-03","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
