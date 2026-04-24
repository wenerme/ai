---
title: assert
description: Use the Node.js assert module in Cloudflare Workers for testing assertions and value comparisons.
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

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/workers/runtime-apis/nodejs/assert.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# assert

Note

To enable built-in Node.js APIs and polyfills, add the nodejs\_compat compatibility flag to your [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/). This also enables nodejs\_compat\_v2 as long as your compatibility date is 2024-09-23 or later. [Learn more about the Node.js compatibility flag and v2](https://developers.cloudflare.com/workers/configuration/compatibility-flags/#nodejs-compatibility-flag).

The [node:assert ↗](https://nodejs.org/docs/latest/api/assert.html) module in Node.js provides a number of useful assertions that are useful when building tests.

JavaScript

```

import { strictEqual, deepStrictEqual, ok, doesNotReject } from "node:assert";


strictEqual(1, 1); // ok!

strictEqual(1, "1"); // fails! throws AssertionError


deepStrictEqual({ a: { b: 1 } }, { a: { b: 1 } }); // ok!

deepStrictEqual({ a: { b: 1 } }, { a: { b: 2 } }); // fails! throws AssertionError


ok(true); // ok!

ok(false); // fails! throws AssertionError


await doesNotReject(async () => {}); // ok!

await doesNotReject(async () => {

  throw new Error("boom");

}); // fails! throws AssertionError


```

Explain Code

Note

In the Workers implementation of `assert`, all assertions run in, what Node.js calls, the strict assertion mode. In strict assertion mode, non-strict methods behave like their corresponding strict methods. For example, `deepEqual()` will behave like `deepStrictEqual()`.

Refer to the [Node.js documentation for assert ↗](https://nodejs.org/dist/latest-v19.x/docs/api/assert.html) for more information.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/runtime-apis/","name":"Runtime APIs"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/runtime-apis/nodejs/","name":"Node.js compatibility"}},{"@type":"ListItem","position":5,"item":{"@id":"/workers/runtime-apis/nodejs/assert/","name":"assert"}}]}
```
