---
title: Error handling
description: How exceptions, stack traces, and logging works with the Workers RPC system.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

### Agents toolkit

* Agent setup
* Copy as Markdown

Open the Markdown file in a new tab

Ask Claude about this page

Ask ChatGPT about this page

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/workers/runtime-apis/rpc/error-handling.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Error handling

## Exceptions

An exception thrown by an RPC method implementation will propagate to the caller. If it is one of the standard JavaScript Error types, the `message` and prototype's `name` will be retained, though the stack trace is not.

### Unsupported error types

* If an [AggregateError ↗](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global%5FObjects/AggregateError) is thrown by an RPC method, it is not propagated back to the caller.
* The [SuppressedError ↗](https://github.com/tc39/proposal-explicit-resource-management?tab=readme-ov-file#the-suppressederror-error) type from the Explicit Resource Management proposal is not currently implemented or supported in Workers.
* Own properties of error objects, such as the [cause ↗](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global%5FObjects/Error/cause) property, are not propagated back to the caller

## Additional properties

For some remote exceptions, the runtime may set properties on the propagated exception to provide more information about the error; see [Durable Object error handling](https://developers.cloudflare.com/durable-objects/best-practices/error-handling) for more details.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/runtime-apis/","name":"Runtime APIs"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/runtime-apis/rpc/","name":"Remote-procedure call (RPC)"}},{"@type":"ListItem","position":5,"item":{"@id":"/workers/runtime-apis/rpc/error-handling/","name":"Error handling"}}]}
```
