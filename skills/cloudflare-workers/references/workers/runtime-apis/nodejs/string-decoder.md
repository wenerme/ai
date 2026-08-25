---
description: Use the Node.js string_decoder module in Cloudflare Workers for decoding buffer objects into strings.
title: StringDecoder
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

# StringDecoder

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/workers/runtime-apis/nodejs/string-decoder/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Note

For compatibility dates of `2026-08-04` or later, Workers enables both `nodejs_compat` and `nodejs_compat_v2` by default. These flags are not used for these compatibility dates. Existing projects do not need to remove them when updating their compatibility date. For earlier dates, add `nodejs_compat` to your [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/) to opt in. For instructions to turn off Node.js compatibility, refer to the [Node.js compatibility flag](https://developers.cloudflare.com/workers/configuration/compatibility-flags/#nodejs-compatibility-flag).

The [node:string\_decoder ↗](https://nodejs.org/api/string%5Fdecoder.html) is a legacy utility module that predates the WHATWG standard [TextEncoder](https://developers.cloudflare.com/workers/runtime-apis/encoding/#textencoder) and [TextDecoder](https://developers.cloudflare.com/workers/runtime-apis/encoding/#textdecoder) API. In most cases, you should use `TextEncoder` and `TextDecoder` instead. `StringDecoder` is available in the Workers runtime primarily for compatibility with existing npm packages that rely on it. `StringDecoder` can be accessed using:

```js
const { StringDecoder } = require("node:string_decoder");
const decoder = new StringDecoder("utf8");

const cent = Buffer.from([0xc2, 0xa2]);
console.log(decoder.write(cent));

const euro = Buffer.from([0xe2, 0x82, 0xac]);
console.log(decoder.write(euro));
```

Refer to the [Node.js documentation for string\_decoder ↗](https://nodejs.org/dist/latest-v20.x/docs/api/string%5Fdecoder.html) for more information.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/runtime-apis/nodejs/string-decoder/#page","headline":"StringDecoder · Cloudflare Workers docs","description":"Use the Node.js string\\_decoder module in Cloudflare Workers for decoding buffer objects into strings.","url":"https://developers.cloudflare.com/workers/runtime-apis/nodejs/string-decoder/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
