---
description: Learn about the drand randomness-as-a-service project.
title: About drand
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/randomness-beacon/llms.txt
> Use this file to discover all available pages before exploring further.

#  About drand

Last updated Apr 24, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/randomness-beacon/about/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

The drand project aims to address the current lack of services providing distributed public randomness. Distributed to increase the resilience and trustworthiness, drand provides a standalone randomness-as-a-service network that is application agnostic. This is similar to how NTP networks serve timing information across the globe.

drand follows the [KISS principle ↗](https://en.wikipedia.org/wiki/KISS%5Fprinciple). It relies on well-researched cryptographic building blocks and open-source software design principles and libraries, such as protobuf and gRPC, to ensure high performance and interoperability. drand also attempts to use sane security defaults, such as having TLS enabled by default.

Beyond that, drand adds new features important for its practical deployment, such as being able to securely add and remove members of the network through [resharing ↗](https://ieeexplore.ieee.org/document/1183515) while keeping the same shared public key necessary for randomness verification.

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/randomness-beacon/about/#page","headline":"About drand · Cloudflare Randomness Beacon docs","description":"Learn about the drand randomness-as-a-service project.","url":"https://developers.cloudflare.com/randomness-beacon/about/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-24","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
