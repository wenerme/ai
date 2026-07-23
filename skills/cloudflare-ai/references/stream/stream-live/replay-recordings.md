---
description: Automatically record Cloudflare Stream live broadcasts and retrieve recordings via the API.
title: Record and replay live streams
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/stream/llms.txt
> Use this file to discover all available pages before exploring further.

# Record and replay live streams

Last updated Apr 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/stream/stream-live/replay-recordings/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Live streams are automatically recorded, and available instantly once a live stream ends. To get a list of recordings for a given input ID, make a [GET request to /live\_inputs/<UID>/videos](https://developers.cloudflare.com/api/resources/stream/subresources/live%5Finputs/methods/get/) and filter for videos where `state` is set to `ready`:

```bash
curl -X GET \
-H "Authorization: Bearer <API_TOKEN>" \
https://dash.cloudflare.com/api/v4/accounts/<ACCOUNT_ID>/stream/live_inputs/<LIVE_INPUT_UID>/videos
```

```json
{
  "result": [
...
    {
      "uid": "6b9e68b07dfee8cc2d116e4c51d6a957",
      "thumbnail": "https://customer-f33zs165nr7gyfy4.cloudflarestream.com/6b9e68b07dfee8cc2d116e4c51d6a957/thumbnails/thumbnail.jpg",
      "thumbnailTimestampPct": 0,
      "readyToStream": true,
      "status": {
        "state": "ready",
        "pctComplete": "100.000000",
        "errorReasonCode": "",
        "errorReasonText": ""
      },
      "meta": {
        "name": "Stream Live Test 22 Sep 21 22:12 UTC"
      },
      "created": "2021-09-22T22:12:53.587306Z",
      "modified": "2021-09-23T00:14:05.591333Z",
      "size": 0,
      "preview": "https://customer-f33zs165nr7gyfy4.cloudflarestream.com/6b9e68b07dfee8cc2d116e4c51d6a957/watch",
      "allowedOrigins": [],
      "requireSignedURLs": false,
      "uploaded": "2021-09-22T22:12:53.587288Z",
      "uploadExpiry": null,
      "maxSizeBytes": null,
      "maxDurationSeconds": null,
      "duration": 7272,
      "input": {
        "width": 640,
        "height": 360
      },
      "playback": {
        "hls": "https://customer-f33zs165nr7gyfy4.cloudflarestream.com/6b9e68b07dfee8cc2d116e4c51d6a957/manifest/video.m3u8",
        "dash": "https://customer-f33zs165nr7gyfy4.cloudflarestream.com/6b9e68b07dfee8cc2d116e4c51d6a957/manifest/video.mpd"
      },
      "watermark": null,
      "liveInput": "34036a0695ab5237ce757ac53fd158a2"
    }
  ],
  "success": true,
  "errors": [],
  "messages": []
}
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/stream/stream-live/replay-recordings/#page","headline":"Record and replay live streams · Cloudflare Stream docs","description":"Automatically record Cloudflare Stream live broadcasts and retrieve recordings via the API.","url":"https://developers.cloudflare.com/stream/stream-live/replay-recordings/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
