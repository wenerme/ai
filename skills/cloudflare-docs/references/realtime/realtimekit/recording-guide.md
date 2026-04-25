---
title: Recording
description: Record audio and video from RealtimeKit meetings using composite recording mode.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

# Recording

Learn how RealtimeKit records the audio and video of multiple users in a meeting, as well as interacts with RealtimeKit plugins, in a single file using composite recording mode.

Visit the following pages to learn more about recording meetings:

* [ Configure Video Settings ](https://developers.cloudflare.com/realtime/realtimekit/recording-guide/configure-codecs/)
* [ Set Audio Configurations ](https://developers.cloudflare.com/realtime/realtimekit/recording-guide/configure-audio-codec/)
* [ Add Watermark ](https://developers.cloudflare.com/realtime/realtimekit/recording-guide/add-watermark/)
* [ Disable Upload to RealtimeKit Bucket ](https://developers.cloudflare.com/realtime/realtimekit/recording-guide/configure-realtimekit-bucket-config/)
* [ Create Custom Recording App Using Recording SDKs ](https://developers.cloudflare.com/realtime/realtimekit/recording-guide/create-record-app-using-sdks/)
* [ Interactive Recordings with Timed Metadata ](https://developers.cloudflare.com/realtime/realtimekit/recording-guide/interactive-recording/)
* [ Manage Recording Config Precedence Order ](https://developers.cloudflare.com/realtime/realtimekit/recording-guide/manage-recording-config-hierarchy/)
* [ Upload Recording to Your Cloud ](https://developers.cloudflare.com/realtime/realtimekit/recording-guide/custom-cloud-storage/)
* [ Start Recording ](https://developers.cloudflare.com/realtime/realtimekit/recording-guide/start-recording/)
* [ Stop Recording ](https://developers.cloudflare.com/realtime/realtimekit/recording-guide/stop-recording/)
* [ Monitor Recording Status ](https://developers.cloudflare.com/realtime/realtimekit/recording-guide/monitor-status/)

RealtimeKit records the audio and video of multiple users in a meeting, as well as interactions with RealtimeKit plugins, in a single file using composite recording mode.

## How does RealtimeKit recording work?

RealtimeKit recordings are powered by anonymous virtual bot users who join your meeting, record it, and then upload it to RealtimeKit's Cloudflare R2 bucket. For video files, we currently support the[H.264 ↗](https://en.wikipedia.org/wiki/Advanced%5FVideo%5FCoding) and[VP8 ↗](https://en.wikipedia.org/wiki/VP8) codecs.

1. When the recording is finished, it is stored in RealtimeKit's Cloudflare R2 bucket.
2. RealtimeKit generates a downloadable link from which the recording can be downloaded. You can get the download URL using the[Fetch details of a recording API](https://developers.cloudflare.com/api/resources/realtime%5Fkit/subresources/recordings/methods/get%5Fone%5Frecording/)or from the Developer Portal.  
You can receive notifications of recording status in any of the following ways:  
   * Using the `recording.statusUpdate` webhook. RealtimeKit uses webhooks to notify your application when an event happens.  
   * Using the [Fetch active recording API](https://developers.cloudflare.com/api/resources/realtime%5Fkit/subresources/recordings/methods/get%5Factive%5Frecordings/).  
   * You can also view the states of recording from the Developer Portal.
3. Download the recording from the download url and store it to your cloud storage. The file is kept on RealtimeKit's server for seven days before being deleted.  
You can get the download URL using the[Fetch active recording API](https://developers.cloudflare.com/api/resources/realtime%5Fkit/subresources/recordings/methods/get%5Factive%5Frecordings/) or from the Developer Portal.  
We support transferring recordings to AWS, Azure, and DigitalOcean storage buckets. You can also choose to preconfigure the storage configurations using the Developer Portal or the[Start recording a meeting API](https://developers.cloudflare.com/api/resources/realtime%5Fkit/subresources/recordings/methods/start%5Frecordings/).

## Workflow

A typical workflow for recording a meeting involves the following steps:

1. Start a recording using the [Start Recording API](https://developers.cloudflare.com/api/resources/realtime%5Fkit/subresources/recordings/methods/start%5Frecordings/) or client side SDK.
2. Manage the recording using the [Pause, resume, or stop recording API](https://developers.cloudflare.com/api/resources/realtime%5Fkit/subresources/recordings/methods/pause%5Fresume%5Fstop%5Frecording/) or client side SDK.
3. Fetch the download URL for downloading the recording using the [Fetch details of a recording API](https://developers.cloudflare.com/api/resources/realtime%5Fkit/subresources/recordings/methods/get%5Fone%5Frecording/), webhook, or from the Developer Portal.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/recording-guide/","name":"Recording"}}]}
```
