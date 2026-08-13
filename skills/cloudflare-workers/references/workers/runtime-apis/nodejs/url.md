---
description: Use the Node.js url module in Workers for domain-to-ASCII and domain-to-Unicode conversions.
title: url
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

# url

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/workers/runtime-apis/nodejs/url/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Note

For compatibility dates of `2026-08-04` or later, Workers enables both `nodejs_compat` and `nodejs_compat_v2` by default. These flags are not used for these compatibility dates. Existing projects do not need to remove them when updating their compatibility date. For earlier dates, add `nodejs_compat` to your [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/) to opt in. For instructions to turn off Node.js compatibility, refer to the [Node.js compatibility flag](https://developers.cloudflare.com/workers/configuration/compatibility-flags/#nodejs-compatibility-flag).

## domainToASCII

Returns the Punycode ASCII serialization of the domain. If domain is an invalid domain, the empty string is returned.

```js
import { domainToASCII } from "node:url";

console.log(domainToASCII("español.com"));
// Prints xn--espaol-zwa.com
console.log(domainToASCII("中文.com"));
// Prints xn--fiq228c.com
console.log(domainToASCII("xn--iñvalid.com"));
// Prints an empty string
```

## domainToUnicode

Returns the Unicode serialization of the domain. If domain is an invalid domain, the empty string is returned.

It performs the inverse operation to `domainToASCII()`.

```js
import { domainToUnicode } from "node:url";

console.log(domainToUnicode("xn--espaol-zwa.com"));
// Prints español.com
console.log(domainToUnicode("xn--fiq228c.com"));
// Prints 中文.com
console.log(domainToUnicode("xn--iñvalid.com"));
// Prints an empty string
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/runtime-apis/nodejs/url/#page","headline":"url · Cloudflare Workers docs","description":"Use the Node.js url module in Workers for domain-to-ASCII and domain-to-Unicode conversions.","url":"https://developers.cloudflare.com/workers/runtime-apis/nodejs/url/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
