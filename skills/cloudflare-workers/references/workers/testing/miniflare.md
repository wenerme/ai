---
description: Simulate and test Cloudflare Workers locally with Miniflare, a fully-local development simulator.
title: Miniflare
image: https://developers.cloudflare.com/workers/testing/miniflare/og.png?v=0e9fdd4cd87b0c90
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

# Miniflare

Last updated Oct 18, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/workers/testing/miniflare/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Use Wrangler for most projects

This documentation describes the Miniflare API, which is only relevant for advanced use cases. Most users should use [Wrangler](https://developers.cloudflare.com/workers/wrangler/) to build, run, and deploy their Workers.

**Miniflare** is a simulator for developing and testing [**Cloudflare Workers** ↗︎](https://workers.cloudflare.com/). It is written in TypeScript and uses a local `workerd` process to implement Workers runtime APIs.

Miniflare is not a hardened sandbox

Do not use Miniflare to run untrusted or potentially malicious Worker code directly on your machine. Run the entire development process inside an appropriate secure sandbox, such as a virtual machine.

Miniflare starts a local [`workerd` ↗︎](https://github.com/cloudflare/workerd#warning-workerd-is-not-a-hardened-sandbox) process. This warning applies to default local execution with `wrangler dev`, `vite dev`, `vite preview`, direct Miniflare use, and Miniflare-based testing tools. Setting `remote: true` on a binding changes which resource your code accesses, but your Worker code still executes locally. By contrast, legacy `wrangler dev --remote` executes your Worker code on Cloudflare.

Miniflare is not a security boundary for untrusted code. Although `workerd` attempts to restrict Worker code to configured resources, an implementation bug could allow code to escape those restrictions. The hosted Workers platform applies [additional layers of defense in depth](https://developers.cloudflare.com/workers/reference/security-model/) that Miniflare does not provide locally.

- 🎉 **Fun:** develop Workers easily with detailed logging, file watching and pretty error pages supporting source maps.
- 🔋 **Full-featured:** supports most Workers features, including KV, Durable Objects, WebSockets, modules and more.
- ⚡ **Fully-local:** test and develop Workers without an Internet connection. Reload code on change quickly.

[Get Started](https://developers.cloudflare.com/workers/testing/miniflare/get-started) [GitHub](https://github.com/cloudflare/workers-sdk/tree/main/packages/miniflare) [NPM](https://npmjs.com/package/miniflare)

---

These docs primarily cover Miniflare specific things. For more information on runtime APIs, refer to the [Cloudflare Workers docs](https://developers.cloudflare.com/workers).

If you find something that doesn't behave as it does in the production Workers environment (and this difference isn't documented), or something's wrong in these docs, please [open a GitHub issue ↗︎](https://github.com/cloudflare/workers-sdk/issues/new/choose).

- [Get Started](https://developers.cloudflare.com/workers/testing/miniflare/get-started/): Install and configure the Miniflare API to dispatch events and test Cloudflare Workers locally.
- [Writing tests](https://developers.cloudflare.com/workers/testing/miniflare/writing-tests/): Write integration tests against Workers using Miniflare.
- [Core](https://developers.cloudflare.com/workers/testing/miniflare/core/): Core Miniflare features for testing Cloudflare Workers, including fetch events and compatibility settings.
- [Developing](https://developers.cloudflare.com/workers/testing/miniflare/developing/): Development tools for Miniflare, including debugger support and live reload for Cloudflare Workers.
- [Migrations](https://developers.cloudflare.com/workers/testing/miniflare/migrations/): Review migration guides for specific versions of Miniflare.
- [Storage](https://developers.cloudflare.com/workers/testing/miniflare/storage/): Configure and manage local storage simulators in Miniflare for Workers bindings like KV, R2, and D1.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/workers/testing/miniflare/#page","headline":"Miniflare","description":"Simulate and test Cloudflare Workers locally with Miniflare, a fully-local development simulator.","url":"https://developers.cloudflare.com/workers/testing/miniflare/","inLanguage":"en","image":"https://developers.cloudflare.com/workers/testing/miniflare/og.png?v=0e9fdd4cd87b0c90","dateModified":"2026-10-18","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
