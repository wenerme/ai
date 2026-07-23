---
description: Learn about the APIs used within Pages Functions.
title: API reference
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/pages/llms.txt
> Use this file to discover all available pages before exploring further.

# API reference

Last updated Apr 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/pages/functions/api-reference/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

The following methods can be used to configure your Pages Function.

## Methods

### `onRequests`

The `onRequest` method will be called unless a more specific `onRequestVerb` method is exported. For example, if both `onRequest` and `onRequestGet` are exported, only `onRequestGet` will be called for `GET` requests.

* `onRequest(context[EventContext](#eventcontext))` Response | Promise<Response>

  * This function will be invoked on all requests no matter what the request method is, as long as no specific request verb (like one of the methods below) is exported.
* `onRequestGet(context[EventContext](#eventcontext))` Response | Promise<Response>

  * This function will be invoked on all `GET` requests.
* `onRequestPost(context[EventContext](#eventcontext))` Response | Promise<Response>

  * This function will be invoked on all `POST` requests.
* `onRequestPatch(context[EventContext](#eventcontext))` Response | Promise<Response>

  * This function will be invoked on all `PATCH` requests.
* `onRequestPut(context[EventContext](#eventcontext))` Response | Promise<Response>

  * This function will be invoked on all `PUT` requests.
* `onRequestDelete(context[EventContext](#eventcontext))` Response | Promise<Response>

  * This function will be invoked on all `DELETE` requests.
* `onRequestHead(context[EventContext](#eventcontext))` Response | Promise<Response>

  * This function will be invoked on all `HEAD` requests.
* `onRequestOptions(context[EventContext](#eventcontext))` Response | Promise<Response>

  * This function will be invoked on all `OPTIONS` requests.

### `env.ASSETS.fetch()`

The `env.ASSETS.fetch()` function allows you to fetch a static asset from your Pages project.

You can pass a [Request object](https://developers.cloudflare.com/workers/runtime-apis/request/), URL string, or URL object to `env.ASSETS.fetch()` function. The URL must be to the pretty path, not directly to the asset. For example, if you had the path `/users/index.html`, you will request `/users/` instead of `/users/index.html`. This method call will run the header and redirect rules, modifying the response that is returned.

## Types

### `EventContext`

The following are the properties on the `context` object which are passed through on the `onRequest` methods:

* `request` [Request](https://developers.cloudflare.com/workers/runtime-apis/request/)
This is the incoming [Request](https://developers.cloudflare.com/workers/runtime-apis/request/).
* `functionPath` string
This is the path of the request.
* `waitUntil(promisePromise<any>)` void
Refer to [waitUntil documentation](https://developers.cloudflare.com/workers/runtime-apis/context/#waituntil) for more information.
* `passThroughOnException()` void
Refer to [passThroughOnException documentation](https://developers.cloudflare.com/workers/runtime-apis/context/#passthroughonexception) for more information. Note that this will not work on an [advanced mode project](https://developers.cloudflare.com/pages/functions/advanced-mode/).
* `next(input?Request | string, init?RequestInit)` Promise<Response>
Passes the request through to the next Function or to the asset server if no other Function is available.
* `env` [EnvWithFetch](#envwithfetch)
* `params` Params<P>
Holds the values from [dynamic routing](https://developers.cloudflare.com/pages/functions/routing/#dynamic-routes).
In the following example, you have a dynamic path that is `/users/[user].js`. When you visit the site on `/users/nevi` the `params` object would look like:
```js
{
	user: "nevi";
}
```
This allows you fetch the dynamic value from the path:
```js
export function onRequest(context) {
	return new Response(`Hello ${context.params.user}`);
}
```
Which would return `"Hello nevi"`.
* `data` Data

### `EnvWithFetch`

Holds the environment variables, secrets, and bindings for a Function. This also holds the `ASSETS` binding which is how you can fallback to the asset-serving behavior.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/pages/functions/api-reference/#page","headline":"API reference · Cloudflare Pages docs","description":"Learn about the APIs used within Pages Functions.","url":"https://developers.cloudflare.com/pages/functions/api-reference/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
