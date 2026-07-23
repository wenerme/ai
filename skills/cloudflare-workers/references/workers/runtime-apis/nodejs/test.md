---
description: Use the Node.js test module MockTracker API in Cloudflare Workers for tracking and managing mock objects.
title: test
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

# test

Last updated Jun 5, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/workers/runtime-apis/nodejs/test/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Note

To enable built-in Node.js APIs and polyfills, add the nodejs\_compat compatibility flag to your [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/). This also enables nodejs\_compat\_v2 as long as your compatibility date is 2024-09-23 or later. [Learn more about the Node.js compatibility flag and v2](https://developers.cloudflare.com/workers/configuration/compatibility-flags/#nodejs-compatibility-flag).

## `MockTracker`

The `MockTracker` API in Node.js provides a means of tracking and managing mock objects in a test environment.

```js
import { mock } from 'node:test';

const fn = mock.fn();
fn(1,2,3);  // does nothing... but

console.log(fn.mock.callCount());  // Records how many times it was called
console.log(fn.mock.calls[0].arguments);  // Records the arguments that were passed each call
```

The full `MockTracker` API is documented in the [Node.js documentation for MockTracker ↗](https://nodejs.org/docs/latest/api/test.html#class-mocktracker).

The Workers implementation of `MockTracker` currently does not include an implementation of the [Node.js mock timers API ↗](https://nodejs.org/docs/latest/api/test.html#class-mocktimers).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/runtime-apis/nodejs/test/#page","headline":"test · Cloudflare Workers docs","description":"Use the Node.js test module MockTracker API in Cloudflare Workers for tracking and managing mock objects.","url":"https://developers.cloudflare.com/workers/runtime-apis/nodejs/test/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-06-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
