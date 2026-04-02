---
title: ReadableStream DefaultReader
description: A reader is used when you want to read from a ReadableStream, rather than piping its output to a WritableStream.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/workers/runtime-apis/streams/readablestreamdefaultreader.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# ReadableStream DefaultReader

## Background

A reader is used when you want to read from a [ReadableStream](https://developers.cloudflare.com/workers/runtime-apis/streams/readablestream/), rather than piping its output to a [WritableStream](https://developers.cloudflare.com/workers/runtime-apis/streams/writablestream/).

A `ReadableStreamDefaultReader` is not instantiated via its constructor. Rather, it is retrieved from a [ReadableStream](https://developers.cloudflare.com/workers/runtime-apis/streams/readablestream/):

JavaScript

```

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

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/runtime-apis/","name":"Runtime APIs"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/runtime-apis/streams/","name":"Streams"}},{"@type":"ListItem","position":5,"item":{"@id":"/workers/runtime-apis/streams/readablestreamdefaultreader/","name":"ReadableStream DefaultReader"}}]}
```
