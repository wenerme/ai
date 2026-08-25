---
description: Explore the JavaScript and web platform APIs available in the Cloudflare Workers runtime.
title: Runtime APIs
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

# Runtime APIs

Last updated Jul 3, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/workers/runtime-apis/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

The [Workers runtime ↗](https://blog.cloudflare.com/workerd-open-source-workers-runtime/) is designed to be [JavaScript standards compliant ↗](https://ecma-international.org/publications-and-standards/standards/ecma-262/) and web-interoperable. Wherever possible, it uses web platform APIs, so that code can be reused across client and server, as well as across [WinterCG ↗](https://wintercg.org/) JavaScript runtimes.

[Workers runtime features](https://developers.cloudflare.com/workers/runtime-apis/) are [compatible with a subset of Node.js APIs](https://developers.cloudflare.com/workers/runtime-apis/nodejs) and the ability to set a [compatibility date or compatibility flag](https://developers.cloudflare.com/workers/configuration/compatibility-dates/).

* [Bindings (env)](https://developers.cloudflare.com/workers/runtime-apis/bindings/)
* [Cache](https://developers.cloudflare.com/workers/runtime-apis/cache/)
* [Console](https://developers.cloudflare.com/workers/runtime-apis/console/)
* [Context (ctx)](https://developers.cloudflare.com/workers/runtime-apis/context/)
* [Encoding](https://developers.cloudflare.com/workers/runtime-apis/encoding/)
* [EventSource](https://developers.cloudflare.com/workers/runtime-apis/eventsource/)
* [Fetch](https://developers.cloudflare.com/workers/runtime-apis/fetch/)
* [Handlers](https://developers.cloudflare.com/workers/runtime-apis/handlers/)
* [Headers](https://developers.cloudflare.com/workers/runtime-apis/headers/)
* [HTMLRewriter](https://developers.cloudflare.com/workers/runtime-apis/html-rewriter/)
* [MessageChannel](https://developers.cloudflare.com/workers/runtime-apis/messagechannel/)
* [Node.js compatibility](https://developers.cloudflare.com/workers/runtime-apis/nodejs/)
* [Performance and timers](https://developers.cloudflare.com/workers/runtime-apis/performance/)
* [Remote-procedure call (RPC)](https://developers.cloudflare.com/workers/runtime-apis/rpc/)
* [Request](https://developers.cloudflare.com/workers/runtime-apis/request/)
* [Response](https://developers.cloudflare.com/workers/runtime-apis/response/)
* [Scheduler](https://developers.cloudflare.com/workers/runtime-apis/scheduler/)
* [Streams](https://developers.cloudflare.com/workers/runtime-apis/streams/)
* [TCP sockets](https://developers.cloudflare.com/workers/runtime-apis/tcp-sockets/)
* [Web Crypto](https://developers.cloudflare.com/workers/runtime-apis/web-crypto/)
* [Web standards](https://developers.cloudflare.com/workers/runtime-apis/web-standards/)
* [WebAssembly (Wasm)](https://developers.cloudflare.com/workers/runtime-apis/webassembly/)
* [WebSockets](https://developers.cloudflare.com/workers/runtime-apis/websockets/)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/workers/runtime-apis/#page","headline":"Runtime APIs · Cloudflare Workers docs","description":"Explore the JavaScript and web platform APIs available in the Cloudflare Workers runtime.","url":"https://developers.cloudflare.com/workers/runtime-apis/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-07-03","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
