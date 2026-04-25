---
title: Cryptographic Background
description: Understand the cryptography behind drand.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

# Cryptographic Background

drand is an efficient randomness beacon daemon that utilizes pairing-based cryptography, `𝑡-of-𝑛` distributed key generation, and threshold BLS signatures to generate publicly-verifiable, unbiasable, unpredictable, distributed randomness.

This is an overview of the cryptographic building blocks drand uses to generate publicly-verifiable, unbiasable, and unpredictable randomness in a distributed manner.

The drand beacon has two phases: a setup phase and a beacon phase. Generally, we assume that there are _n_ participants, out of which at most _f<n_ are malicious. drand relies heavily on threshold cryptography primitives, where (at minimum) a threshold of _t-f+1_ nodes work together to successfully execute cryptographic operations.

Threshold cryptography has many applications as it avoids single points of failure. One application is cryptocurrency multi-sig wallets, where _t-of-n_ participants are required to sign a transaction using a threshold signature scheme.

Note

This document is intended for a general audience. No cryptographic background knowledge is required to understand these concepts.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/randomness-beacon/","name":"Randomness Beacon"}},{"@type":"ListItem","position":3,"item":{"@id":"/randomness-beacon/cryptographic-background/","name":"Cryptographic Background"}}]}
```
