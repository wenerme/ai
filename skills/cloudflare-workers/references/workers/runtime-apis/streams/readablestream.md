---
description: Learn about the ReadableStream API for reading streamed data in Cloudflare Workers.
title: ReadableStream
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

# ReadableStream

Last updated Sep 5, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/workers/runtime-apis/streams/readablestream/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

## Background

A `ReadableStream` is returned by the `readable` property inside [TransformStream](https://developers.cloudflare.com/workers/runtime-apis/streams/transformstream/).

## Properties

* `locked` boolean
  * A Boolean value that indicates if the readable stream is locked to a reader.

## Methods

* `pipeTo(destinationWritableStream, optionsPipeToOptions)` : Promise<void>

  * Pipes the readable stream to a given writable stream `destination` and returns a promise that is fulfilled when the `write` operation succeeds or rejects it if the operation fails.
* `pipeThrough(transformStream, optionsPipeToOptions)` : ReadableStream

  * Pipes the readable stream to the writable side of a given [TransformStream](https://developers.cloudflare.com/workers/runtime-apis/streams/transformstream/) and returns the transform's readable side, so that calls can be chained. `options` accepts the same values as `pipeTo()`.
* `getReader(optionsObject)` : ReadableStreamDefaultReader

  * Gets an instance of `ReadableStreamDefaultReader` and locks the `ReadableStream` to that reader instance. This method accepts an object argument indicating options. The only supported option is `mode`, which can be set to `byob` to create a [ReadableStreamBYOBReader](https://developers.cloudflare.com/workers/runtime-apis/streams/readablestreambyobreader/), as shown here:

```js
let reader = readable.getReader({ mode: 'byob' });
```

* `cancel(reasonstringoptional)` : Promise<void>

  * Cancels the stream. `reason` is an optional human-readable string indicating the reason for cancellation. `reason` will be passed to the underlying source’s cancel algorithm. Any data not yet read is lost.
* `tee()` : \[ReadableStream, ReadableStream\]

  * Locks the stream and returns an array of two new `ReadableStream` instances, each of which reads the same data as the original stream. Backpressure to the underlying source follows the branch with the most unread data, which avoids unbounded buffering when one branch reads more slowly than the other, as long as the underlying source responds to backpressure. Refer to [workerd's streams documentation ↗](https://github.com/cloudflare/workerd/blob/main/src/workerd/api/streams/README.md#tee-behavior) for implementation details.
* `values(optionsObject)` : AsyncIterableIterator

  * Returns an async iterator that reads and consumes the chunks of the stream. This method accepts an object argument indicating options. The only supported option is `preventCancel`, which, when `true`, prevents the stream from being canceled when the iterator exits early (for example, from a `break` statement). A `ReadableStream` is also async iterable directly:

```js
for await (const chunk of readable) {
	console.log(chunk);
}
```

```ts
for await (const chunk of readable) {
  console.log(chunk);
}
```

### `PipeToOptions`

* `preventClose` bool

  * When `true`, closure of the source `ReadableStream` will not cause the destination `WritableStream` to be closed.
* `preventAbort` bool

  * When `true`, errors in the source `ReadableStream` will no longer abort the destination `WritableStream`. `pipeTo` will return a rejected promise with the error from the source or any error that occurred while aborting the destination.

## Static methods

* `ReadableStream.from(asyncIterable)` : ReadableStream

  * Creates a new `ReadableStream` whose chunks are the values yielded by `asyncIterable`, which may be any iterable or async iterable, including an async generator.

```js
const stream = ReadableStream.from(
	(async function* () {
		yield "hello ";
		yield "world";
	})(),
);
```

```ts
const stream = ReadableStream.from(
  (async function* () {
    yield 'hello ';
    yield 'world';
  })()
);
```

---

## Related resources

* [Streams](https://developers.cloudflare.com/workers/runtime-apis/streams/)
* [Readable streams in the WHATWG Streams API specification ↗](https://streams.spec.whatwg.org/#rs-model)
* [MDN’s ReadableStream documentation ↗](https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/runtime-apis/streams/readablestream/#page","headline":"ReadableStream · Cloudflare Workers docs","description":"Learn about the ReadableStream API for reading streamed data in Cloudflare Workers.","url":"https://developers.cloudflare.com/workers/runtime-apis/streams/readablestream/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-09-05","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
