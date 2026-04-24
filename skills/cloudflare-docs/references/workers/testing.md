---
title: Testing
description: Compare testing options for Cloudflare Workers, including Vitest integration, Miniflare, and unstable_startWorker.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

### Agents toolkit

* Agent setup
* Copy as Markdown

Open the Markdown file in a new tab

Ask Claude about this page

Ask ChatGPT about this page

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/workers/testing/index.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Testing

The Workers platform has a variety of ways to test your applications, depending on your requirements. We recommend using the [Vitest integration](https://developers.cloudflare.com/workers/testing/vitest-integration), which allows you to run tests _inside_ the Workers runtime, and unit test individual functions within your Worker.

[ Get started with Vitest ](https://developers.cloudflare.com/workers/testing/vitest-integration/write-your-first-test/) 

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
| Testing service Workers               | ❌                                                                                          | ✅                                                                                                    | ✅                                                                                             |

Pages Functions

The content described on this page is also applicable to [Pages Functions](https://developers.cloudflare.com/pages/functions/). Pages Functions are Cloudflare Workers and can be thought of synonymously with Workers in this context.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/testing/","name":"Testing"}}]}
```
