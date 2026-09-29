---
description: Identify whether intermittent request slowness correlates with Tiered Cache upper-tier routing, and collect the evidence needed to report it.
title: Investigate latency on tiered requests
image: https://developers.cloudflare.com/cache/troubleshooting/investigating-tiered-cache-latency/og.png?v=024c14715f0d8280
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cache/llms.txt
> Use this file to discover all available pages before exploring further.

# Investigate latency on tiered requests

Last updated Sep 29, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/cache/troubleshooting/investigating-tiered-cache-latency/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Some requests for the same URL are slow while others are fast. If the slow requests have a `cf-cache-status` of `MISS` or `EXPIRED` and the fast requests have `HIT`, the difference may be explained by Tiered Cache: slow requests miss in the lower-tier data center and fetch through an upper-tier data center before reaching your origin. Fast requests are served directly from the lower-tier cache.

This page describes how to use Log Explorer to confirm whether Tiered Cache is involved and how to collect the data needed before contacting Support.

## Confirm Tiered Cache routing with Log Explorer

The [HTTP Requests](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/zone/http_requests/) dataset exposes fields that show whether a request was routed through an upper tier:

- **`CacheTieredFill`**: `true` when the lower-tier data center fetched from an upper-tier data center for this request.
- **`EdgeColoCode`**: the IATA airport code for the lower-tier data center that received the request.
- **`UpperTierColoID`**: the internal ID of the upper-tier data center used for the fill.
- **`CacheCacheStatus`**: the cache outcome ( `HIT`, `MISS`, `EXPIRED`, `BYPASS`, and so on).
- **`OriginResponseDurationMs`**: the total time from when the lower-tier sent a request upstream until it received the full response. When `CacheTieredFill` is `true`, this duration includes the upper-tier lookup, any transit to your origin (also includes Argo Smart Routing transit time, if enabled), origin processing, and the response back. It is a measure of correlation, not isolation of a specific network hop.

## Correlate slow requests with upper-tier usage

To check whether the slow requests are the ones going through Tiered Cache:

1. Open [Log Explorer](https://developers.cloudflare.com/logs/) for the zone.
2. Filter by the affected URL or path and set a time window that includes both slow and fast samples.
3. Group by `CacheTieredFill` and compare `OriginResponseDurationMs` between the two groups.

If requests where `CacheTieredFill` is `true` show significantly higher `OriginResponseDurationMs` than those where it is `false`, Tiered Cache routing is correlated with the slowness.

4. Note the `EdgeColoCode` values for the slow requests and the `UpperTierColoID` values. These identify which lower-tier and upper-tier pair is involved.

Note

`OriginResponseDurationMs` captures total upstream response time across all hops. It does not isolate a specific segment, such as transit between the upper tier and your origin, and does not prove congestion on a particular path. Use it to establish whether Tiered Cache routing correlates with the slow samples before escalating.

## What to bring to Support

When you contact Cloudflare Support, include:

- The zone ID and affected URL or path.
- A Log Explorer export or screenshot showing slow samples ( `CacheTieredFill: true`) and fast samples ( `CacheTieredFill: false`), with `OriginResponseDurationMs`, `EdgeColoCode`, `UpperTierColoID`, and `CacheCacheStatus` visible.
- The time window in UTC during which you observed the issue.

Cloudflare Support and network engineering use this data to assess whether a routing change between the upper-tier data center and your origin is needed.

## Why turning off Tiered Cache does not fix the underlying cause

Turning off Tiered Cache routes all cache misses from every lower-tier data center directly to your origin. If the underlying issue is a congested or slow path from a specific upper-tier data center to your origin, turning off Tiered Cache may redistribute traffic rather than resolve the congestion, and removes the cache-fill efficiency benefits for the rest of your traffic.

If a specific upper-tier data center consistently produces high `OriginResponseDurationMs`, the appropriate fix is a routing or topology change. Consider:

- **[Smart Tiered Cache](https://developers.cloudflare.com/cache/how-to/tiered-cache/#smart-tiered-cache)**: selects upper tiers using origin-latency data, which can route around a slow upper-tier-to-origin path automatically.
- **[Custom Tiered Cache](https://developers.cloudflare.com/cache/how-to/tiered-cache/#custom-tiered-cache)**: lets you work with your account team to design a topology that avoids specific upper-tier data centers.

## Related resources

- [Investigate uncached responses](https://developers.cloudflare.com/cache/troubleshooting/investigating-uncached-responses/)
- [Tiered Cache](https://developers.cloudflare.com/cache/how-to/tiered-cache/)
- [HTTP Requests log fields](https://developers.cloudflare.com/logs/logpush/logpush-job/datasets/zone/http_requests/)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cache/troubleshooting/investigating-tiered-cache-latency/#page","headline":"Investigate latency on tiered requests","description":"Identify whether intermittent request slowness correlates with Tiered Cache upper-tier routing, and collect the evidence needed to report it.","url":"https://developers.cloudflare.com/cache/troubleshooting/investigating-tiered-cache-latency/","inLanguage":"en","image":"https://developers.cloudflare.com/cache/troubleshooting/investigating-tiered-cache-latency/og.png?v=024c14715f0d8280","dateModified":"2026-09-29","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
