---
description: Retrieve auditor public keys and verify epoch signatures.
title: Auditor
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/key-transparency/llms.txt
> Use this file to discover all available pages before exploring further.

#  Auditor

Last updated May 5, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/key-transparency/api/auditor-information/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

The Auditor is designed to sign epoch information, which includes the time at which the request is received by the Auditor, the epoch number, and the epoch digest. The Auditor serializes this information in binary using protobuf or bincode and checks whether the requested inclusion is valid, as in it satisfies [publication constraints](https://developers.cloudflare.com/key-transparency/api/epochs/#constraints).

If the Log is setup to provide [AKD ↗](https://github.com/facebook/akd) audit proof, the Auditor verifies them asynchronously.

## Get Auditor information

`keys` contain Auditor public keys which allow for key rotation later.

```sh
curl 'https://plexi.key-transparency.cloudflare.com/info'
{
  "keys": [
    {
      "public_key": "d1036a33a8731e82a29dc68210988b32b60b7c1bd22d2341f2e339f4db3a2f4a",
      "not_before": 1712311441501
    }
  ],
  "logs": [
    "508607faff7cb16be841e901eca41a6239461f239e7e610c9ea2576f334bc144"
  ]
}
```

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/key-transparency/api/auditor-information/#page","headline":"Auditor · Cloudflare Key Transparency Auditor docs","description":"Retrieve auditor public keys and verify epoch signatures.","url":"https://developers.cloudflare.com/key-transparency/api/auditor-information/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["REST API"]}
```
