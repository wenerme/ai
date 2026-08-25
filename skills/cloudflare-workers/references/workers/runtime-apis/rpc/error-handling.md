---
description: How exceptions, stack traces, and logging works with the Workers RPC system.
title: Error handling
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

# Error handling

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/workers/runtime-apis/rpc/error-handling/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

## Exceptions

An exception thrown by an RPC method implementation will propagate to the caller. If it is one of the standard JavaScript Error types, the `message` and prototype's `name` will be retained, though the stack trace is not.

### Unsupported error types

* If an [AggregateError ↗](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global%5FObjects/AggregateError) is thrown by an RPC method, it is not propagated back to the caller.
* The [SuppressedError ↗](https://github.com/tc39/proposal-explicit-resource-management?tab=readme-ov-file#the-suppressederror-error) type from the Explicit Resource Management proposal is not currently implemented or supported in Workers.
* Own properties of error objects, such as the [cause ↗](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global%5FObjects/Error/cause) property, are not propagated back to the caller

## Additional properties

For some remote exceptions, the runtime may set properties on the propagated exception to provide more information about the error; see [Durable Object error handling](https://developers.cloudflare.com/durable-objects/best-practices/error-handling) for more details.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/runtime-apis/rpc/error-handling/#page","headline":"Workers RPC — Error Handling · Cloudflare Workers docs","description":"How exceptions, stack traces, and logging works with the Workers RPC system.","url":"https://developers.cloudflare.com/workers/runtime-apis/rpc/error-handling/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
