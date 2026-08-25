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

For compatibility dates of `2026-08-04` or later, Workers enables both `nodejs_compat` and `nodejs_compat_v2` by default. These flags are not used for these compatibility dates. Existing projects do not need to remove them when updating their compatibility date. For earlier dates, add `nodejs_compat` to your [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/) to opt in. For instructions to turn off Node.js compatibility, refer to the [Node.js compatibility flag](https://developers.cloudflare.com/workers/configuration/compatibility-flags/#nodejs-compatibility-flag).

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

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/runtime-apis/nodejs/test/#page","headline":"test · Cloudflare Workers docs","description":"Use the Node.js test module MockTracker API in Cloudflare Workers for tracking and managing mock objects.","url":"https://developers.cloudflare.com/workers/runtime-apis/nodejs/test/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-06-05","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
