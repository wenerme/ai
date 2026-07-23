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

To enable built-in Node.js APIs and polyfills, add the nodejs\_compat compatibility flag to your [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/). This also enables nodejs\_compat\_v2 as long as your compatibility date is 2024-09-23 or later. [Learn more about the Node.js compatibility flag and v2](https://developers.cloudflare.com/workers/configuration/compatibility-flags/#nodejs-compatibility-flag).

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

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/runtime-apis/nodejs/url/#page","headline":"url · Cloudflare Workers docs","description":"Use the Node.js url module in Workers for domain-to-ASCII and domain-to-Unicode conversions.","url":"https://developers.cloudflare.com/workers/runtime-apis/nodejs/url/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
