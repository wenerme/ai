---
description: Review Workers for Platforms limits for scripts, Durable Objects, cache, tags, and API rate limits.
title: Limits
image: https://developers.cloudflare.com/cloudflare-for-platforms/workers-for-platforms/reference/limits/og.png?v=e197158116ac3f21
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-for-platforms/llms.txt
> Use this file to discover all available pages before exploring further.

# Limits

Last updated Nov 17, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/cloudflare-for-platforms/workers-for-platforms/reference/limits/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

## Script limits

Cloudflare provides an unlimited number of scripts for Workers for Platforms customers.

## `cf` object

The [`cf` object](https://developers.cloudflare.com/workers/runtime-apis/request/#the-cf-property-requestinitcfproperties) contains Cloudflare-specific properties of a request. This field is not accessible in [user Workers](https://developers.cloudflare.com/cloudflare-for-platforms/workers-for-platforms/how-workers-for-platforms-works/#user-workers) by default because some fields in this object are sensitive and can be used to manipulate Cloudflare features (for example, `cacheKey`, `resolveOverride`, `scrapeShield`).

In the default [untrusted mode](https://developers.cloudflare.com/cloudflare-for-platforms/workers-for-platforms/reference/worker-isolation/#untrusted-mode-default), this also applies to outgoing requests. Any `cf` properties a user Worker sets on a `fetch()` subrequest are ignored, and the subrequest uses the default cache behavior for its URL.

This includes the standard [`cache` option](https://developers.cloudflare.com/workers/examples/cache-using-fetch/#using-the-http-cache-api) of `fetch()` and `Request`. Workers implement `cache: "no-store"` and `cache: "no-cache"` as `cf` cache settings, so in untrusted mode they do not change how the subrequest is cached:

```js
// In a user Worker in an untrusted dispatch namespace:
await fetch("https://example.com/file.bin", {
	method: "HEAD",
	cache: "no-store",
});
// The cache is not bypassed. Because .bin is a default cached file extension,
// the request goes through the cache and reaches the origin as a GET.
```

The `Cache-Control: no-cache` and `Pragma: no-cache` request headers that these options add are still sent to the origin. They do not affect whether Cloudflare's cache handles the request.

When a subrequest goes through the cache, `HEAD` requests can be sent to the origin as `GET`, and the `Range` header can be removed. For more information, refer to [Interaction of HEAD requests with Cache](https://developers.cloudflare.com/cache/concepts/cache-behavior/#interaction-of-head-requests-with-cache) and [Range request behavior](https://developers.cloudflare.com/cache/reference/range-requests/).

To use `cf` properties or the `cache` option for requests from user Workers, use one of these options:

- **Trusted mode**: Enable [trusted mode](https://developers.cloudflare.com/cloudflare-for-platforms/workers-for-platforms/reference/worker-isolation/#trusted-mode) for your namespace. Only enable this if you control all Worker code in the namespace.
- **Outbound Worker**: Set the cache options in an [Outbound Worker](https://developers.cloudflare.com/cloudflare-for-platforms/workers-for-platforms/configuration/outbound-workers/), which runs as your platform's Worker rather than the user Worker. When an Outbound Worker is enabled, user Workers cannot use `connect()`, except through [Hyperdrive](https://developers.cloudflare.com/hyperdrive/) bindings.
- **Service binding**: Give user Workers a [service binding](https://developers.cloudflare.com/workers/runtime-apis/bindings/service-bindings/) to a Worker you own outside the namespace, in the same account. User code sends the requests that need the `cache` option through the binding. User Workers keep `connect()`.

A Worker outside the namespace runs as your platform's code, so the `cache` option on its own `fetch()` takes effect. The `cf` object of the user Worker is not passed to it, so user code cannot use it to set other `cf` properties:

```js
// A Worker outside the dispatch namespace. User Workers have a service binding
// to it named PLATFORM_FETCH. The cache option needs a compatibility date of
// 2024-11-11 or later.
export default {
	fetch(request) {
		return fetch(new Request(request, { cache: "no-store", cf: {} }));
	},
};
```

```js
// In a user Worker:
await env.PLATFORM_FETCH.fetch("https://example.com/file.bin", {
	method: "HEAD",
});
// The cache is bypassed, and the origin receives a HEAD request.
```

Use `cache: "no-store"` rather than `cache: "no-cache"`. `no-cache` only asks the cache to revalidate, so `HEAD` requests can still be sent to the origin as `GET`.

Any user Worker with the binding can use this Worker to send requests that bypass the cache. To keep it limited to that:

- Do not add routes to this Worker, and turn off its `workers.dev` and Preview URLs, so that only user Workers with the binding can call it.
- Do not add secrets or authentication to the requests this Worker sends, and do not trust headers from the caller for authentication.
- Do not let end users choose the targets of the service bindings in the user Workers you upload. Otherwise, user code could bind to your dispatch Worker or other platform Workers.
- If this Worker needs to know which user Worker is calling it, pass that information in the binding's [`props`](https://developers.cloudflare.com/workers/runtime-apis/context/#props).

## Durable Object namespace limits

Workers for Platforms do not have a limit for the number of Durable Object namespaces.

## Cache API

For isolation, `caches.default` is disabled for namespaced scripts. To learn more about the cache, refer to [How the cache Works](https://developers.cloudflare.com/workers/reference/how-the-cache-works/).

## ​Tags

You can set a maximum of eight tags per script. Avoid special characters like `,` and `&` when naming your tag.

Need a higher limit?

To request an adjustment to a limit, complete the [Limit Increase Request Form ↗︎](https://forms.gle/eX6pXvit1wBv77Yw5). If the limit can be increased, Cloudflare will contact you with next steps.

## Gradual Deployments

[Gradual Deployments](https://developers.cloudflare.com/workers/versions-and-deployments/gradual-deployments/) is not supported yet for user Workers. Changes made to user Workers create a new version that deployed all-at-once to 100% of traffic.

## API Rate Limits

| Type | Limit |
| --- | --- |
| Client API per user/account token | 1200/5 minutes |
| Client API per IP | 200/second |
| GraphQL | Varies by query cost. Max 320/5 min |
| User API tokens per user | 50 |
| Account API tokens per account | 500 |

Note

The global rate limit for the Cloudflare API is 1,200 requests per five minute period per user, and applies cumulatively regardless of whether the request is made via the dashboard, API key, or API token.

If you exceed this limit, all API calls for the next five minutes will be blocked, receiving a `HTTP 429 - Too Many Requests` response.

Some specific API calls have their own limits and are documented separately, such as the following:

- [Cache Purge APIs](https://developers.cloudflare.com/cache/how-to/purge-cache/#availability-and-limits)
- [GraphQL APIs](https://developers.cloudflare.com/analytics/graphql-api/limits/)
- [Rulesets APIs](https://developers.cloudflare.com/ruleset-engine/rulesets-api/#limits)
- [Lists API](https://developers.cloudflare.com/waf/tools/lists/lists-api/#rate-limiting-for-lists-api-requests)
- [Gateway Lists API](https://developers.cloudflare.com/cloudflare-one/reusable-components/lists/#api-rate-limit)

Enterprise customers can also [contact Cloudflare Support](https://developers.cloudflare.com/support/contacting-cloudflare-support/) to raise the Client API per user, GraphQL, or API token limits to a higher value.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-for-platforms/workers-for-platforms/reference/limits/#page","headline":"Limits","description":"Review Workers for Platforms limits for scripts, Durable Objects, cache, tags, and API rate limits.","url":"https://developers.cloudflare.com/cloudflare-for-platforms/workers-for-platforms/reference/limits/","inLanguage":"en","image":"https://developers.cloudflare.com/cloudflare-for-platforms/workers-for-platforms/reference/limits/og.png?v=e197158116ac3f21","dateModified":"2026-11-17","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
