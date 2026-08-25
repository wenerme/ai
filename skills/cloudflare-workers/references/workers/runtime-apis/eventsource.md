---
description: EventSource is a server-sent event API that allows a server to push events to a client.
title: EventSource
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

# EventSource

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/workers/runtime-apis/eventsource/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

## Background

The [EventSource ↗](https://developer.mozilla.org/en-US/docs/Web/API/EventSource) interface is a server-sent event API that allows a server to push events to a client. The `EventSource` object is used to receive server-sent events. It connects to a server over HTTP and receives events in a text-based format.

### Constructor

```js
let eventSource = new EventSource(url, options);
```

* `url` USVString - The URL to which to connect.
* `options` EventSourceInit - An optional dictionary containing any optional settings.

By default, the `EventSource` will use the global `fetch()` function under the covers to make requests. If you need to use a different fetch implementation as provided by a Cloudflare Workers binding, you can pass the `fetcher` option:

```js
export default {
  async fetch(req, env) {
    let eventSource = new EventSource(url, { fetcher: env.MYFETCHER });
    // ...
  }
};
```

Note that the `fetcher` option is a Cloudflare Workers specific extension.

### Properties

* `eventSource.url` USVString read-only
  * The URL of the event source.
* `eventSource.readyState` USVString read-only
  * The state of the connection.
* `eventSource.withCredentials` Boolean read-only
  * A Boolean indicating whether the `EventSource` object was instantiated with cross-origin (CORS) credentials set (`true`), or not (`false`).

### Methods

* `eventSource.close()`
  * Closes the connection.
* `eventSource.onopen`
  * An event handler called when a connection is opened.
* `eventSource.onmessage`
  * An event handler called when a message is received.
* `eventSource.onerror`
  * An event handler called when an error occurs.

### Events

* `message`
  * Fired when a message is received.
* `open`
  * Fired when the connection is opened.
* `error`
  * Fired when an error occurs.

### Class Methods

* `EventSource.from(readableStreamReadableStream) : EventSource`
  * This is a Cloudflare Workers specific extension that creates a new `EventSource` object from an existing `ReadableStream`. Such an instance does not initiate a new connection but instead attaches to the provided stream.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/runtime-apis/eventsource/#page","headline":"EventSource · Cloudflare Workers docs","description":"EventSource is a server-sent event API that allows a server to push events to a client.","url":"https://developers.cloudflare.com/workers/runtime-apis/eventsource/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
