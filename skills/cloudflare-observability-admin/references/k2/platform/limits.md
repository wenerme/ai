---
description: Account, stream, record, and consumer limits for Cloudflare K2.
title: Limits
image: https://developers.cloudflare.com/k2/platform/limits/og.png?v=ac2d822337ad8e50
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/k2/llms.txt
> Use this file to discover all available pages before exploring further.

# Limits

Last updated Oct 6, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/k2/platform/limits/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Need a higher limit?

To request an adjustment to a limit, complete the [Limit Increase Request Form ↗︎](https://forms.gle/eX6pXvit1wBv77Yw5). If the limit can be increased, Cloudflare will contact you with next steps.

## Account limits

During the public beta, each account can store up to 10 GB across all streams.

## Streams

| Feature | Limit |
| --- | --- |
| Maximum streams per account | 20 |
| Minimum retention period | 1 hour (`3600` seconds) |
| Maximum retention period | 30 days (`2592000` seconds) |
| Default retention period | 7 days (`604800` seconds) |

Higher retention limits are available by request.

## Produce records

| Feature | Limit |
| --- | --- |
| Maximum produce throughput per stream | 30 MB/s |
| Maximum request size | 5 MB (5,000,000 bytes) |
| Maximum record size | \~1 MB (1,000,000 bytes) |
| Maximum headers per record | 32 |
| Maximum header name size | 256 bytes |
| Maximum header value size | 8 KiB (8,192 bytes) |
| Maximum total header size per record | 64 KiB (65,536 bytes) |

The maximum request size applies to the HTTP request body both before and after gzip decompression + a small amount of internal metadata. For the Workers binding, it applies to the total size of the records in a single `send()` call.

The maximum record size applies to the decoded record content, and to the record content and headers combined. Header sizes are measured in UTF-8 bytes.

There is no limit on the number of records in a request, other than the maximum request size.

The maximum produce throughput applies to the total data produced to a stream across all producers. To request a higher limit, refer to [limit increases](#account-limits).

## Subscriptions and consuming records

| Feature | Limit |
| --- | --- |
| Maximum `max_records` per consume request | 10,000 |
| Maximum data per consume response | 10 MB |
| `worker_id` length | 1 to 256 characters |
| Maximum active leases per subscription | 128 |
| Maximum subscriptions per stream | 100 |

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/k2/platform/limits/#page","headline":"Limits","description":"Account, stream, record, and consumer limits for Cloudflare K2.","url":"https://developers.cloudflare.com/k2/platform/limits/","inLanguage":"en","image":"https://developers.cloudflare.com/k2/platform/limits/og.png?v=ac2d822337ad8e50","dateModified":"2026-10-06","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
