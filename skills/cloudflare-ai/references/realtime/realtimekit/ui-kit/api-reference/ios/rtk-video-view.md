---
description: API reference for RtkVideoView component (iOS Library)
title: RtkVideoView
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

#  RtkVideoView

Last updated Apr 23, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/ios/rtk-video-view/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

Renders a participant's video stream. Supports self-preview, remote participant video, and screen share rendering.

## Initializer parameters

| Parameter       | Type                  | Required | Default | Description                                               |
| --------------- | --------------------- | -------- | ------- | --------------------------------------------------------- |
| participant     | RtkMeetingParticipant | ✅        | \-      | The participant whose video to render                     |
| showSelfPreview | Bool                  | ❌        | false   | Whether to show the local camera preview                  |
| showScreenShare | Bool                  | ❌        | false   | Whether to show the screen share stream instead of camera |

## Methods

| Method             | Return Type | Description                                               |
| ------------------ | ----------- | --------------------------------------------------------- |
| reattachRenderer() | Void        | Reattaches the video renderer to the participant stream   |
| prepareForReuse()  | Void        | Prepares the view for reuse in a collection or table view |
| clean()            | Void        | Releases the video renderer and cleans up resources       |

## Usage Examples

### Basic Usage

```swift
import RealtimeKitUI

let videoView = RtkVideoView(participant: participant)
view.addSubview(videoView)
```

### Self-preview

```swift
import RealtimeKitUI

let previewView = RtkVideoView(
    participant: localParticipant,
    showSelfPreview: true
)
view.addSubview(previewView)
```

### Screen share

```swift
import RealtimeKitUI

let screenShareView = RtkVideoView(
    participant: participant,
    showScreenShare: true
)
view.addSubview(screenShareView)
```

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/ios/rtk-video-view/#page","headline":"RtkVideoView · Cloudflare Realtime docs","description":"API reference for RtkVideoView component (iOS Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/ios/rtk-video-view/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
