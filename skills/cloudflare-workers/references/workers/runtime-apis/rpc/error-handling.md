---
description: How exceptions, error properties, and stack traces work with the Workers RPC system.
title: Error handling
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

# Error handling

Last updated Sep 4, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/workers/runtime-apis/rpc/error-handling/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

## Exceptions

An error thrown by an RPC method, or used to reject the method's returned Promise, propagates to the caller as a new error object. With enhanced error serialization, Workers preserves the effective `name` and `message` and serializable own properties, including non-enumerable properties such as [cause ↗](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global%5FObjects/Error/cause).

[Enhanced error serialization](https://developers.cloudflare.com/workers/configuration/compatibility-flags/#enhanced-error-serialization) uses the `enhanced_error_serialization` compatibility flag. It is on by default for compatibility dates on or after `2026-04-21`. For earlier compatibility dates, add the flag to both the RPC provider and consumer. A Worker can opt out with `legacy_error_serialization`. Without enhanced error serialization, RPC uses legacy error reconstruction and does not preserve custom own properties.

The provider must be able to serialize the error and its own property values. Keep public error properties small and serializable. If an own property contains a non-serializable value, Workers does not guarantee that the enhanced error details will reach the consumer.

On the consumer, treat the error's serializable fields as the RPC contract. Workers does not preserve or guarantee:

* The source object's identity, custom prototype, or constructor.
* The results of `instanceof` checks, especially for custom error classes.
* Prototype methods or property descriptors.
* The provider's original stack trace. The consumer may see a new stack from error reconstruction instead.
* Non-serializable property values.

For example, an instance of `ProviderError extends Error` can arrive with `name` set to `"ProviderError"` and with serializable own fields such as `code`, but it is not an instance of a consumer-side `ProviderError` class. Check documented fields such as `name` and `code` instead of relying on class identity.

## Additional properties

For some remote exceptions, the runtime may add properties to the propagated exception, such as retry or Durable Object metadata. These properties are separate from the provider's custom properties. Refer to [Durable Object error handling](https://developers.cloudflare.com/durable-objects/best-practices/error-handling) for more details.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/runtime-apis/rpc/error-handling/#page","headline":"Workers RPC — Error Handling · Cloudflare Workers docs","description":"How exceptions, error properties, and stack traces work with the Workers RPC system.","url":"https://developers.cloudflare.com/workers/runtime-apis/rpc/error-handling/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-09-04","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
