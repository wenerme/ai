---
title: Revalidation
description: When a cached asset expires, Cloudflare uses the stale-while-revalidate directive in Cache-Control to determine whether it can continue serving the stale asset while fetching a fresh copy from the origin. If the directive is present and the asset is within the allowed staleness window, Cloudflare serves the expired content to visitors and revalidates in the background. By using headers like If-Modified-Since and ETag, Cloudflare validates content without fully re-fetching it, reducing origin traffic.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/cache/concepts/revalidation.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Revalidation

## Stale-while-revalidate

When a cached asset expires, Cloudflare uses the [stale-while-revalidate](https://developers.cloudflare.com/cache/concepts/cache-control/#revalidation) directive in `Cache-Control` to determine whether it can continue serving the stale asset while fetching a fresh copy from the origin. If the directive is present and the asset is within the allowed staleness window, Cloudflare serves the expired content to visitors and revalidates in the background. By using headers like `If-Modified-Since` and `ETag`, Cloudflare validates content without fully re-fetching it, reducing origin traffic.

Note

Asynchronous `stale-while-revalidate` is live for all Free, Pro, and Business zones. Enterprise zones are actively being migrated. The previous synchronous behavior is described in [Synchronous revalidation](#synchronous-revalidation-legacy).

## Asynchronous revalidation

Revalidation is fully asynchronous. When a cached asset expires and `stale-while-revalidate` is set, the first request that arrives after expiry triggers revalidation in the background. That request immediately receives stale content with an [UPDATING](https://developers.cloudflare.com/cache/concepts/cache-responses/#updating) status instead of blocking until the origin responds. All following requests also receive stale content with an `UPDATING` status until the origin responds. Once revalidation completes, subsequent requests receive fresh content with a [HIT](https://developers.cloudflare.com/cache/concepts/cache-responses/#hit) status.

If the stale content is still valid, Cloudflare sets a new TTL. If the content has changed, the origin provides fresh content to replace the old.

## Synchronous revalidation (legacy)

Note

Synchronous revalidation refers to a previous implementation that is only available to a subset of Enterprise zones that have not been migrated yet. All other zones use [asynchronous revalidation](#asynchronous-revalidation).

With synchronous revalidation (a legacy implementation), `stale-while-revalidate` blocks on the first request that arrives after a cached asset expired. That first request is held until the origin responds, and is served with a [MISS](https://developers.cloudflare.com/cache/concepts/cache-responses/#miss) or [REVALIDATED](https://developers.cloudflare.com/cache/concepts/cache-responses/#revalidated) status. Any other requests that arrive during this time for the same asset in the same cache location are served stale with the [UPDATING](https://developers.cloudflare.com/cache/concepts/cache-responses/#updating) status.

For example, if 1,000 requests arrive simultaneously for an expired asset in this previous implementation, one request goes to the origin while the other 999 are served stale from cache. The first visitor experiences higher latency because they have to wait for the origin round-trip.

On the other hand, with [asynchronous revalidation](#asynchronous-revalidation) all 1,000 requests are served from cache immediately and no visitor is blocked.

## Controlling stale behavior

Cloudflare only serves stale content during revalidation if your origin includes the `stale-while-revalidate` directive in its `Cache-Control` header. Without this directive, visitors wait for the origin to respond before receiving content.

If your origin sets `stale-while-revalidate` but you want to override it, you can disable stale serving through the [Serve stale content while revalidating](https://developers.cloudflare.com/cache/how-to/cache-rules/settings/#serve-stale-content-while-revalidating) setting in Cache Rules. Directives like `must-revalidate` and `no-cache` also prevent stale content from being served when [Origin Cache Control](https://developers.cloudflare.com/cache/concepts/cache-control/#enable-origin-cache-control) is enabled. For all available options, refer to [Cache-Control directives](https://developers.cloudflare.com/cache/concepts/cache-control/#cache-control-directives).

## Smart revalidation towards users

When both [Last-Modified ↗](https://datatracker.ietf.org/doc/html/rfc7232?cf%5Fhistory%5Fstate=%7B%22guid%22%3A%22C255D9FF78CD46CDA4F76812EA68C350%22%2C%22historyId%22%3A15%2C%22targetId%22%3A%226C8153BAEF7BC0C5A331E28F8BCF1ABA%22%7D#section-2.2) and [Etag ↗](https://datatracker.ietf.org/doc/html/rfc7232?cf%5Fhistory%5Fstate=%7B%22guid%22%3A%22C255D9FF78CD46CDA4F76812EA68C350%22%2C%22historyId%22%3A13%2C%22targetId%22%3A%226C8153BAEF7BC0C5A331E28F8BCF1ABA%22%7D#section-2.3) headers are absent from the origin server response, Smart Edge Revalidation will use the time the object was cached on Cloudflare's global network as the `Last-Modified` header value. When a browser sends a revalidation request to Cloudflare using `If-Modified-Since` or `If-None-Match`, our global network can answer those revalidation questions using the `Last-Modified` header generated from Smart Edge Revalidation. In this way, our global network can ensure efficient revalidation even if the headers are not sent from the origin.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cache/","name":"Cache / CDN"}},{"@type":"ListItem","position":3,"item":{"@id":"/cache/concepts/","name":"Concepts"}},{"@type":"ListItem","position":4,"item":{"@id":"/cache/concepts/revalidation/","name":"Revalidation"}}]}
```
