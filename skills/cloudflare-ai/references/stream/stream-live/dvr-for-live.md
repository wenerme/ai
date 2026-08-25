---
description: Enable DVR mode in Cloudflare Stream to let viewers rewind, resume, and fast-forward live broadcasts.
title: DVR for Live
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/stream/llms.txt
> Use this file to discover all available pages before exploring further.

# DVR for Live

Last updated Apr 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/stream/stream-live/dvr-for-live/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Stream Live supports "DVR mode" on an opt-in basis to allow viewers to rewind, resume, and fast-forward a live broadcast. To enable DVR mode, add the `dvrEnabled=true` query parameter to the Stream Player embed source or the HLS manifest URL.

## Stream Player

```html
<div style="position: relative; padding-top: 56.25%;">
  <iframe
    src="https://customer-<CODE>.cloudflarestream.com/<INPUT_ID|VIDEO_ID>/iframe?dvrEnabled=true"
    style="border: none; position: absolute; top: 0; left: 0; height: 100%; width: 100%;"
    allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
    allowfullscreen="true"
  ></iframe>
</div>
```

When DVR mode is enabled the Stream Player will:

* Show a timeline the viewer can scrub/seek, similar to watching an on-demand video. The timeline will automatically scale to show the growing duration of the broadcast while it is live.
* The "LIVE" indicator will show grey if the viewer is behind the live edge or red if they are watching the latest content. Clicking that indicator will jump forward to the live edge.
* If the viewer pauses the player, it will resume playback from that time instead of jumping forward to the live edge.

## HLS manifest for custom players

```text
https://customer-<CODE>.cloudflarestream.com/<INPUT_ID|VIDEO_ID>/manifest/video.m3u8?dvrEnabled=true
```

Custom players using a DVR-capable HLS manifest may need additional configuration to surface helpful controls or information. Refer to your player library for additional information.

## Video ID or Input ID

Stream Live allows loading the Player or HLS manifest by Video ID or Live Input ID. Refer to [Watch a live stream](https://developers.cloudflare.com/stream/stream-live/watch-live-stream/) for how to retrieve these URLs and compare these options. There are additional considerations when using DVR mode:

**Recommended:** Use DVR Mode on a Video ID URL:

* When the player loads, it will start playing the active broadcast if it is still live or play the recording if the broadcast has concluded.

DVR Mode on a Live Input ID URL:

* When the player loads, it will start playing the currently live broadcast if there is one (refer to [Live Input Status](https://developers.cloudflare.com/stream/stream-live/watch-live-stream/#live-input-status)).
* If the viewer is still watching _after the broadcast ends,_ they can continue to watch. However, if the player or manifest is then reloaded, it will show the latest broadcast or "Stream has not yet started" (`HTTP 204`). Past broadcasts are not available by Live Input ID.

## Known Limitations

* When using DVR Mode and a player/manifest created using a Live Input ID, the player may stall when trying to switch quality levels if a viewer is still watching after a broadcast has concluded.
* Performance may be degraded for DVR-enabled broadcasts longer than three hours. Manifests are limited to a maximum of 7,200 segments. Segment length is determined by the keyframe interval, also called GOP size.
* DVR Mode relies on Version 8 of the HLS manifest specification. Stream uses HLS Version 6 in all other contexts. HLS v8 offers extremely broad compatibility but may not work with certain old player libraries or older devices.
* DVR Mode is not available for DASH manifests.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/stream/stream-live/dvr-for-live/#page","headline":"DVR for Live · Cloudflare Stream docs","description":"Enable DVR mode in Cloudflare Stream to let viewers rewind, resume, and fast-forward live broadcasts.","url":"https://developers.cloudflare.com/stream/stream-live/dvr-for-live/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
