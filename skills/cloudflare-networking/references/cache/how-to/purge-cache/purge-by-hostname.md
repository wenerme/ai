---
description: Purge all cached resources for a specific hostname.
title: ​Purge cache by hostname
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cache/llms.txt
> Use this file to discover all available pages before exploring further.

# ​Purge cache by hostname

Last updated Apr 16, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/cache/how-to/purge-cache/purge-by-hostname/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Purging by hostname means that all assets at URLs with a host that matches one of the provided values will be instantly purged from the cache.

1. In the Cloudflare dashboard, go to the **Configuration** page.
[Go to **Configuration** ↗](https://dash.cloudflare.com/?to=/:account/:zone/caching/configuration)
2. Under **Purge Cache**, select **Custom Purge**. The **Custom Purge** window appears.
3. Under **Purge by**, select **Hostname**.
4. Follow the syntax instructions:

  * One hostname per line.
  * Separated by commas.
  * You can purge up to 30 hostnames at a time.
5. Enter the appropriate value(s) in the text field using the format shown in the example.
6. Select **Purge**.

For information on rate limits, refer to the [Availability and limits](https://developers.cloudflare.com/cache/how-to/purge-cache/#availability-and-limits) section.

## Resulting cache status

Purging by hostname deletes the resource, resulting in the `CF-Cache-Status` header being set to [MISS](https://developers.cloudflare.com/cache/concepts/cache-responses/#miss) for subsequent requests.

If [tiered cache](https://developers.cloudflare.com/cache/how-to/tiered-cache/) is used, purging by hostname may return `EXPIRED`, as the lower tier tries to revalidate with the upper tier to reduce load on the latter. Depending on whether the upper tier has the resource or not, and whether the end user is reaching the lower tier or the upper tier, `EXPIRED` or `MISS` are returned.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cache/how-to/purge-cache/purge-by-hostname/#page","headline":"​Purge cache by hostname · Cloudflare Cache (CDN) docs","description":"Purge all cached resources for a specific hostname.","url":"https://developers.cloudflare.com/cache/how-to/purge-cache/purge-by-hostname/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
