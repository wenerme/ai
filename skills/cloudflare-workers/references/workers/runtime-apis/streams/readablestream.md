---
description: Learn about the ReadableStream API for reading streamed data in Cloudflare Workers.
title: ReadableStream
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

#  ReadableStream

Last updated Apr 23, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/workers/runtime-apis/streams/readablestream/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

## Background

A `ReadableStream` is returned by the `readable` property inside [TransformStream](https://developers.cloudflare.com/workers/runtime-apis/streams/transformstream/).

## Properties

* `locked` boolean
  * A Boolean value that indicates if the readable stream is locked to a reader.

## Methods

* `pipeTo(destinationWritableStream, optionsPipeToOptions)` : Promise<void>

  * Pipes the readable stream to a given writable stream `destination` and returns a promise that is fulfilled when the `write` operation succeeds or rejects it if the operation fails.
* `getReader(optionsObject)` : ReadableStreamDefaultReader

  * Gets an instance of `ReadableStreamDefaultReader` and locks the `ReadableStream` to that reader instance. This method accepts an object argument indicating options. The only supported option is `mode`, which can be set to `byob` to create a [ReadableStreamBYOBReader](https://developers.cloudflare.com/workers/runtime-apis/streams/readablestreambyobreader/), as shown here:

```js
let reader = readable.getReader({ mode: 'byob' });
```

### `PipeToOptions`

* `preventClose` bool

  * When `true`, closure of the source `ReadableStream` will not cause the destination `WritableStream` to be closed.
* `preventAbort` bool

  * When `true`, errors in the source `ReadableStream` will no longer abort the destination `WritableStream`. `pipeTo` will return a rejected promise with the error from the source or any error that occurred while aborting the destination.

---

## Related resources

* [Streams](https://developers.cloudflare.com/workers/runtime-apis/streams/)
* [Readable streams in the WHATWG Streams API specification ↗](https://streams.spec.whatwg.org/#rs-model)
* [MDN’s ReadableStream documentation ↗](https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream)

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/runtime-apis/streams/readablestream/#page","headline":"ReadableStream · Cloudflare Workers docs","description":"Learn about the ReadableStream API for reading streamed data in Cloudflare Workers.","url":"https://developers.cloudflare.com/workers/runtime-apis/streams/readablestream/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
