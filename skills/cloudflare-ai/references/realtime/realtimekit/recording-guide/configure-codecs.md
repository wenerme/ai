---
description: Configure video codecs, resolution, and container formats for RealtimeKit recordings.
title: Configure Video Settings
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# Configure Video Settings

Last updated Apr 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/realtime/realtimekit/recording-guide/configure-codecs/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Video codecs are software programs that compress and decompress digital video data for transmission, storage, or playback. Configuring the appropriate video codec can help reduce file size, enhance video quality, and ensure compatibility with different playback devices.

## Configure Codecs

You can modify the codec which is used for recording the videos. We currently support the following codecs:

* **H264 (default)**: Records video using the H.264 codec with 1280px × 720px resolution, and 384 kbps AAC audio in MP4 container.
* **VP8**: Records video using the VP8 codec with 1280px × 720px resolution, and Vorbis codec audio in WebM container.

You can change the codec by specifying the codec in the `video_config` field in the [Start Recording API](https://developers.cloudflare.com/api/resources/realtime%5Fkit/subresources/recordings/methods/start%5Frecordings/), for example:

```json
{
  "video_config": {
    "codec": "H264"
  }
}
```

## Download Video Files

The video file for your recording is generated only if you passed the `video_config` parameters in the [Start Recording API](https://developers.cloudflare.com/api/resources/realtime%5Fkit/subresources/recordings/methods/start%5Frecordings/).

When the recording is completed, you can use the `downloadUrl` provided in the response body of the [Start Recording API](https://developers.cloudflare.com/api/resources/realtime%5Fkit/subresources/recordings/methods/start%5Frecordings/) to download and export the video file.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/recording-guide/configure-codecs/#page","headline":"Configure Video Settings · Cloudflare Realtime docs","description":"Configure video codecs, resolution, and container formats for RealtimeKit recordings.","url":"https://developers.cloudflare.com/realtime/realtimekit/recording-guide/configure-codecs/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
