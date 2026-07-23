---
description: Understand the cryptography behind drand.
title: Cryptographic Background
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/randomness-beacon/llms.txt
> Use this file to discover all available pages before exploring further.

# Cryptographic Background

Last updated Apr 24, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/randomness-beacon/cryptographic-background/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

drand is an efficient randomness beacon daemon that utilizes pairing-based cryptography, `𝑡-of-𝑛` distributed key generation, and threshold BLS signatures to generate publicly-verifiable, unbiasable, unpredictable, distributed randomness.

This is an overview of the cryptographic building blocks drand uses to generate publicly-verifiable, unbiasable, and unpredictable randomness in a distributed manner.

The drand beacon has two phases: a setup phase and a beacon phase. Generally, we assume that there are _n_ participants, out of which at most _f<n_ are malicious. drand relies heavily on threshold cryptography primitives, where (at minimum) a threshold of _t-f+1_ nodes work together to successfully execute cryptographic operations.

Threshold cryptography has many applications as it avoids single points of failure. One application is cryptocurrency multi-sig wallets, where _t-of-n_ participants are required to sign a transaction using a threshold signature scheme.

Note

This document is intended for a general audience. No cryptographic background knowledge is required to understand these concepts.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/randomness-beacon/cryptographic-background/#page","headline":"Cryptographic Background · Cloudflare Randomness Beacon docs","description":"Understand the cryptography behind drand.","url":"https://developers.cloudflare.com/randomness-beacon/cryptographic-background/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-24","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
