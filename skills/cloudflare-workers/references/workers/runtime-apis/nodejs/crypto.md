---
description: Use the Node.js crypto module in Cloudflare Workers for hashing, encryption, signing, and verification.
title: crypto
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

# crypto

Last updated Aug 12, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/workers/runtime-apis/nodejs/crypto/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Note

For compatibility dates of `2026-08-04` or later, Workers enables both `nodejs_compat` and `nodejs_compat_v2` by default. These flags are not used for these compatibility dates. Existing projects do not need to remove them when updating their compatibility date. For earlier dates, add `nodejs_compat` to your [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/) to opt in. For instructions to turn off Node.js compatibility, refer to the [Node.js compatibility flag](https://developers.cloudflare.com/workers/configuration/compatibility-flags/#nodejs-compatibility-flag).

The [node:crypto ↗](https://nodejs.org/docs/latest/api/crypto.html) module provides cryptographic functionality that includes a set of wrappers for OpenSSL's hash, HMAC, cipher, decipher, sign, and verify functions.

All `node:crypto` APIs are fully supported in Workers with the following exceptions:

* The functions [generateKeyPair ↗](https://nodejs.org/api/crypto.html#cryptogeneratekeypairtype-options-callback) and [generateKeyPairSync ↗](https://nodejs.org/api/crypto.html#cryptogeneratekeypairsynctype-options)do not support DSA or DH key pairs.
* `argon2` and `argon2Sync` are not supported.
* `ed448` and `x448` curves are not supported.
* It is not possible to manually enable or disable [FIPS mode ↗](https://nodejs.org/docs/latest/api/crypto.html#fips-mode).

The full `node:crypto` API is documented in the [Node.js documentation for node:crypto ↗](https://nodejs.org/api/crypto.html).

The [WebCrypto API](https://developers.cloudflare.com/workers/runtime-apis/web-crypto/) is also available within Cloudflare Workers. This does not require the `nodejs_compat` compatibility flag.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/runtime-apis/nodejs/crypto/#page","headline":"crypto · Cloudflare Workers docs","description":"Use the Node.js crypto module in Cloudflare Workers for hashing, encryption, signing, and verification.","url":"https://developers.cloudflare.com/workers/runtime-apis/nodejs/crypto/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-12","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
