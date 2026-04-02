---
title: Limits
description: Limits specified in MiB (mebibyte), GiB (gibibyte), or TiB (tebibyte) are storage units of measurement based on base-2. 1 GiB (gibibyte) is equivalent to 230 bytes (or 10243 bytes). This is distinct from 1 GB (gigabyte), which is 109 bytes (or 10003 bytes).
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/r2/platform/limits.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Limits

| Feature                                                                         | Limit                                                                |
| ------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| Data storage per bucket                                                         | Unlimited                                                            |
| Number of objects per bucket                                                    | Unlimited                                                            |
| Maximum number of buckets per account                                           | 1,000,000                                                            |
| Maximum rate of bucket management operations per bucket [1](#user-content-fn-1) | 50 per second                                                        |
| Number of custom domains per bucket                                             | 50                                                                   |
| Object key length                                                               | 1,024 bytes                                                          |
| Object metadata size                                                            | 8,192 bytes                                                          |
| Object size                                                                     | 5 TiB per object [2](#user-content-fn-2)                             |
| Maximum upload size [3](#user-content-fn-3)                                     | 5 GiB (single-part) / 4.995 TiB (multi-part) [4](#user-content-fn-4) |
| Maximum upload parts                                                            | 10,000                                                               |
| Maximum concurrent writes to the same object name (key)                         | 1 per second [5](#user-content-fn-5)                                 |

Limits specified in MiB (mebibyte), GiB (gibibyte), or TiB (tebibyte) are storage units of measurement based on base-2\. 1 GiB (gibibyte) is equivalent to 230 bytes (or 10243 bytes). This is distinct from 1 GB (gigabyte), which is 109 bytes (or 10003 bytes).

Need a higher limit?

To request an adjustment to a limit, complete the [Limit Increase Request Form ↗](https://forms.gle/ukpeZVLWLnKeixDu7). If the limit can be increased, Cloudflare will contact you with next steps.

## Rate limiting on managed public buckets through `r2.dev`

Managed public bucket access through an `r2.dev` subdomain is not intended for production usage and has a variable rate limit applied to it. The `r2.dev` endpoint for your bucket is designed to enable testing.

* If you exceed the rate limit (hundreds of requests/second), requests to your `r2.dev` endpoint will be temporarily throttled and you will receive a `429 Too Many Requests` response.
* Bandwidth (throughput) may also be throttled when using the `r2.dev` endpoint.

For production use cases, connect a [custom domain](https://developers.cloudflare.com/r2/buckets/public-buckets/#custom-domains) to your bucket. Custom domains allow you to serve content from a domain you control (for example, `assets.example.com`), configure fine-grained caching, set up redirect and rewrite rules, mutate content via [Cloudflare Workers](https://developers.cloudflare.com/workers/), and get detailed URL-level analytics for content served from your R2 bucket.

## Footnotes

1. Bucket management operations include creating, deleting, listing, and configuring buckets. This limit does _not_ apply to reading or writing objects to a bucket. [↩](#user-content-fnref-1)
2. The object size limit is 5 GiB less than 5 TiB, so 4.995 TiB. [↩](#user-content-fnref-2)
3. Max upload size applies to uploading a file via one request, uploading a part of a multipart upload, or copying into a part of a multipart upload. If you have a Worker, its inbound request size is constrained by [Workers request limits](https://developers.cloudflare.com/workers/platform/limits#request-limits). The max upload size limit does not apply to subrequests. [↩](#user-content-fnref-3)
4. The max upload size is 5 MiB less than 5 GiB, so 4.995 GiB. [↩](#user-content-fnref-4)
5. Concurrent writes to the same object name (key) at a higher rate return HTTP 429 (rate limited) responses. [↩](#user-content-fnref-5)

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/r2/","name":"R2"}},{"@type":"ListItem","position":3,"item":{"@id":"/r2/platform/","name":"Platform"}},{"@type":"ListItem","position":4,"item":{"@id":"/r2/platform/limits/","name":"Limits"}}]}
```
