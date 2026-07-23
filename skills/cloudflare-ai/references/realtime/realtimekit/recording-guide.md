---
description: Record RealtimeKit meetings as composite recordings or separate participant audio tracks.
title: Recording
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# Recording

Last updated May 28, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/realtime/realtimekit/recording-guide/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Learn how RealtimeKit records meetings as a single composite file or as separate participant audio tracks.

Visit the following pages to learn more about recording meetings:

* [Start Recording](https://developers.cloudflare.com/realtime/realtimekit/recording-guide/start-recording/)
* [Stop Recording](https://developers.cloudflare.com/realtime/realtimekit/recording-guide/stop-recording/)
* [Monitor Recording Status](https://developers.cloudflare.com/realtime/realtimekit/recording-guide/monitor-status/)
* [Configure Video Settings](https://developers.cloudflare.com/realtime/realtimekit/recording-guide/configure-codecs/)
* [Set Audio Configurations](https://developers.cloudflare.com/realtime/realtimekit/recording-guide/configure-audio-codec/)
* [Add Watermark](https://developers.cloudflare.com/realtime/realtimekit/recording-guide/add-watermark/)
* [Disable Upload to RealtimeKit Bucket](https://developers.cloudflare.com/realtime/realtimekit/recording-guide/configure-realtimekit-bucket-config/)
* [Track recording](https://developers.cloudflare.com/realtime/realtimekit/recording-guide/track-recording/)
* [Create Custom Recording App Using Recording SDKs](https://developers.cloudflare.com/realtime/realtimekit/recording-guide/create-record-app-using-sdks/)
* [Interactive Recordings with Timed Metadata](https://developers.cloudflare.com/realtime/realtimekit/recording-guide/interactive-recording/)
* [Manage Recording Config Precedence Order](https://developers.cloudflare.com/realtime/realtimekit/recording-guide/manage-recording-config-hierarchy/)
* [Upload Recording to Your Cloud](https://developers.cloudflare.com/realtime/realtimekit/recording-guide/custom-cloud-storage/)

RealtimeKit can record the audio and video of multiple users in a meeting, as well as interactions with RealtimeKit plugins, in a single file using composite recording mode. RealtimeKit can also record separate participant audio tracks using [track recording](https://developers.cloudflare.com/realtime/realtimekit/recording-guide/track-recording/).

## How composite recording works

Composite recordings are powered by anonymous virtual bot users who join your meeting, record it, and then upload it to RealtimeKit's Cloudflare R2 bucket. For video files, we currently support the [H.264 ↗](https://en.wikipedia.org/wiki/Advanced%5FVideo%5FCoding) and [VP8 ↗](https://en.wikipedia.org/wiki/VP8) codecs.

1. When the recording is finished, it is stored in RealtimeKit's Cloudflare R2 bucket.
2. RealtimeKit generates a downloadable link from which the recording can be downloaded. You can get the download URL using the [Fetch details of a recording API](https://developers.cloudflare.com/api/resources/realtime%5Fkit/subresources/recordings/methods/get%5Fone%5Frecording/)or from the Developer Portal.
You can receive notifications of recording status in any of the following ways:

  * Using the `recording.statusUpdate` webhook. RealtimeKit uses webhooks to notify your application when an event happens.
  * Using the [Fetch active recording API](https://developers.cloudflare.com/api/resources/realtime%5Fkit/subresources/recordings/methods/get%5Factive%5Frecordings/).
  * You can also view the states of recording from the Developer Portal.
3. Download the recording from the download url and store it to your cloud storage. The file is kept on RealtimeKit's server for seven days before being deleted.
You can get the download URL using the [Fetch active recording API](https://developers.cloudflare.com/api/resources/realtime%5Fkit/subresources/recordings/methods/get%5Factive%5Frecordings/) or from the Developer Portal.
We support transferring recordings to AWS, Azure, and DigitalOcean storage buckets. You can also choose to preconfigure the storage configurations using the Developer Portal or the [Start recording a meeting API](https://developers.cloudflare.com/api/resources/realtime%5Fkit/subresources/recordings/methods/start%5Frecordings/).

## Workflow

A typical workflow for recording a meeting involves the following steps:

1. Start a recording using the [Start Recording API](https://developers.cloudflare.com/api/resources/realtime%5Fkit/subresources/recordings/methods/start%5Frecordings/) or client side SDK.
2. Manage the recording using the [Pause, resume, or stop recording API](https://developers.cloudflare.com/api/resources/realtime%5Fkit/subresources/recordings/methods/pause%5Fresume%5Fstop%5Frecording/) or client side SDK.
3. Fetch the download URL for downloading the recording using the [Fetch details of a recording API](https://developers.cloudflare.com/api/resources/realtime%5Fkit/subresources/recordings/methods/get%5Fone%5Frecording/), webhook, or from the Developer Portal.

For separate participant audio files, refer to [Track recording](https://developers.cloudflare.com/realtime/realtimekit/recording-guide/track-recording/).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/recording-guide/#page","headline":"Recording · Cloudflare Realtime docs","description":"Record RealtimeKit meetings as composite recordings or separate participant audio tracks.","url":"https://developers.cloudflare.com/realtime/realtimekit/recording-guide/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-05-28","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
