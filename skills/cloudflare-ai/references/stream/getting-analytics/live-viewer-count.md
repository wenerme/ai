---
description: Retrieve real-time viewer counts for Cloudflare Stream live videos using the views endpoint.
title: Get live viewer counts
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/stream/llms.txt
> Use this file to discover all available pages before exploring further.

#  Get live viewer counts

Last updated Apr 21, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/stream/getting-analytics/live-viewer-count/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

The Stream player has full support for live viewer counts by default. To get the viewer count for live videos for use with third party players, make a `GET` request to the `/views` endpoint.

```bash
https://customer-<CODE>.cloudflarestream.com/<INPUT_ID>/views
```

Below is a response for a live video with several active viewers:

```json
{ "liveViewers": 113 }
```

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/stream/getting-analytics/live-viewer-count/#page","headline":"Get live viewer counts · Cloudflare Stream docs","description":"Retrieve real-time viewer counts for Cloudflare Stream live videos using the views endpoint.","url":"https://developers.cloudflare.com/stream/getting-analytics/live-viewer-count/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
