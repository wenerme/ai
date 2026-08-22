---
description: Purge cached resources by cache tag headers.
title: Purge cache by cache-tags
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cache/llms.txt
> Use this file to discover all available pages before exploring further.

# Purge cache by cache-tags

Last updated Aug 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/cache/how-to/purge-cache/purge-by-tags/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Cache-tag purging makes multi-file purging easier because you can instantly bulk purge by adding cache-tags to your assets, such as webpages, image files, and more.

## General workflow for cache-tags

1. Add tags to the `Cache-Tag` HTTP response header from your origin web server for your web content, such as pages, static assets, etc.
2. [Ensure your web traffic is proxied](https://developers.cloudflare.com/dns/proxy-status/) through Cloudflare.
3. Cloudflare associates the tags in the `Cache-Tag` HTTP header with the content being cached.
4. Use specific cache-tags to instantly purge your Cloudflare CDN cache of all content containing that cache-tag from your dashboard or [using our API](https://developers.cloudflare.com/api/resources/cache/methods/purge/).
5. Cloudflare forces a [cache MISS](https://developers.cloudflare.com/cache/concepts/cache-responses/#miss) on content with the purged cache-tag.

Warning

Be careful when purging. A cache MISS can cause execution delays by requiring a fetch from your origin server.

## Add Cache-Tag HTTP response headers

You add cache-tags to your web content in `Cache-Tag` HTTP response headers to allow the client and server to pass additional information in requests or responses. HTTP headers consist of a specific case-insensitive name followed by a colon `:` and the valid value, for example, `Cache-Tag:tag1,tag2,tag3`. Use commas to separate the tags when you want to use multiple cache-tags.

When your content reaches our edge network, Cloudflare:

* Removes the `Cache-Tag` HTTP header before sending the response to your website visitor or passing the response to a [Worker](https://developers.cloudflare.com/workers/). Your end users or Worker never see `Cache-Tag` HTTP headers on your Cloudflare-enabled website.
* Removes whitespaces from the header and any before and after cache-tag names: `tag1`, `tag2` and `tag1,tag2` are considered the same.
* Removes all repeated and trailing commas before applying cache-tags: `tag1,,,tag2` and `tag1,tag2` are considered the same.

## A few things to remember

* A single HTTP response can have more than one `Cache-Tag` HTTP header field.
* The minimum length of a cache-tag is one byte.
* Individual tags do not have a maximum length, but the aggregate `Cache-Tag` HTTP header cannot exceed 16 KB after the header field name, which is approximately 1,000 unique tags. Length includes whitespace and commas but does not include the header field name.
* For cache purges, the maximum length of a cache-tag in an API call is 1,024 characters.
* The `Cache-Tag` HTTP header must only contain printable ASCII encoded characters.
* Spaces are not allowed in cache-tags.
* Case is not sensitive. For example, `Tag1` and `tag1` are considered the same.

## Purge using cache-tags

1. In the Cloudflare dashboard, go to the **Configuration** page.
[Go to **Configuration** ↗](https://dash.cloudflare.com/?to=/:account/:zone/caching/configuration)
2. Under **Purge Cache**, select **Custom Purge**. The **Custom Purge** window appears.
3. Under **Purge by**, select **Tag**.
4. In the text box, enter your tags to use to purge the cached resources. To purge multiple cache-tagged resources, separate each tag with a comma or have one tag per line. You can purge up to 100 tags at a time.
5. Select **Purge**.

For information on rate limits, refer to the [Availability and limits](https://developers.cloudflare.com/cache/how-to/purge-cache/#availability-and-limits) section.

## Resulting cache status

Purging by tag deletes the resource, resulting in the `CF-Cache-Status` header being set to [MISS](https://developers.cloudflare.com/cache/concepts/cache-responses/#miss) for subsequent requests.

If [Tiered Cache](https://developers.cloudflare.com/cache/how-to/tiered-cache/) is used, purging by tag may return `EXPIRED`, as the lower tier tries to revalidate with the upper tier to reduce load on the latter. Depending on whether the upper tier has the resource or not, and whether the end user is reaching the lower tier or the upper tier, `EXPIRED` or `MISS` are returned.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cache/how-to/purge-cache/purge-by-tags/#page","headline":"Purge cache by cache-tags · Cloudflare Cache (CDN) docs","description":"Purge cached resources by cache tag headers.","url":"https://developers.cloudflare.com/cache/how-to/purge-cache/purge-by-tags/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
