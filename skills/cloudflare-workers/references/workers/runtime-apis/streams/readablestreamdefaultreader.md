---
description: Use ReadableStreamDefaultReader in Workers to read chunks from a ReadableStream.
title: ReadableStream DefaultReader
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

# ReadableStream DefaultReader

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/workers/runtime-apis/streams/readablestreamdefaultreader/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

## Background

A reader is used when you want to read from a [ReadableStream](https://developers.cloudflare.com/workers/runtime-apis/streams/readablestream/), rather than piping its output to a [WritableStream](https://developers.cloudflare.com/workers/runtime-apis/streams/writablestream/).

A `ReadableStreamDefaultReader` is not instantiated via its constructor. Rather, it is retrieved from a [ReadableStream](https://developers.cloudflare.com/workers/runtime-apis/streams/readablestream/):

```js
const { readable, writable } = new TransformStream();
const reader = readable.getReader();
```

---

## Properties

* `reader.closed` : Promise

  * A promise indicating if the reader is closed. The promise is fulfilled when the reader stream closes and is rejected if there is an error in the stream.

## Methods

* `read()` : Promise

  * A promise that returns the next available chunk of data being passed through the reader queue.
* `cancel(reasonstringoptional)` : void

  * Cancels the stream. `reason` is an optional human-readable string indicating the reason for cancellation. `reason` will be passed to the underlying source’s cancel algorithm -- if this readable stream is one side of a [TransformStream](https://developers.cloudflare.com/workers/runtime-apis/streams/transformstream/), then its cancel algorithm causes the transform’s writable side to become errored with `reason`.
Warning
Any data not yet read is lost.
* `releaseLock()` : void

  * Releases the lock on the readable stream. A lock cannot be released if the reader has pending read operations. A `TypeError` is thrown and the reader remains locked.

---

## Related resources

* [Streams](https://developers.cloudflare.com/workers/runtime-apis/streams/)
* [Readable streams in the WHATWG Streams API specification ↗](https://streams.spec.whatwg.org/#rs-model)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/runtime-apis/streams/readablestreamdefaultreader/#page","headline":"ReadableStreamDefaultReader · Cloudflare Workers docs","description":"Use ReadableStreamDefaultReader in Workers to read chunks from a ReadableStream.","url":"https://developers.cloudflare.com/workers/runtime-apis/streams/readablestreamdefaultreader/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
