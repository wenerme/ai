---
description: API reference for RtkParticipantTileView component (iOS Library)
title: RtkParticipantTileView
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# RtkParticipantTileView

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/ios/rtk-participant-tile-view/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

A complete participant tile view that displays video, avatar, name tag, and pin indicator. Combines `RtkVideoView`, `RtkAvatarView`, and `RtkMeetingNameTag` into a single composable view.

## Initializer parameters

| Parameter                | Type                  | Required | Default | Description                                                    |
| ------------------------ | --------------------- | -------- | ------- | -------------------------------------------------------------- |
| rtkClient                | RealtimeKitClient     | ✅        | \-      | The RealtimeKit client instance                                |
| participant              | RtkMeetingParticipant | ✅        | \-      | The participant to display                                     |
| isForLocalUser           | Bool                  | ✅        | \-      | Whether this tile represents the local user                    |
| showScreenShareVideoView | Bool                  | ❌        | false   | Whether to show the screen share video instead of camera video |

## Properties

| Property  | Type               | Required | Default | Description                                          |
| --------- | ------------------ | -------- | ------- | ---------------------------------------------------- |
| nameTag   | RtkMeetingNameTag! | \-       | \-      | The name tag view displayed on the tile              |
| viewModel | VideoPeerViewModel | \-       | \-      | The view model managing participant data (read-only) |

## Methods

| Method              | Return Type | Description                                      |
| ------------------- | ----------- | ------------------------------------------------ |
| pinView(show: Bool) | Void        | Shows or hides the pin indicator on the tile     |
| refreshVideo()      | Void        | Refreshes the video renderer for the participant |

## Usage Examples

### Basic Usage

```swift
import RealtimeKitUI

let tileView = RtkParticipantTileView(
    rtkClient: rtkClient,
    participant: participant,
    isForLocalUser: false
)
view.addSubview(tileView)
```

### Local user tile with screen share

```swift
import RealtimeKitUI

let localTile = RtkParticipantTileView(
    rtkClient: rtkClient,
    participant: localParticipant,
    isForLocalUser: true,
    showScreenShareVideoView: true
)
view.addSubview(localTile)
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/ios/rtk-participant-tile-view/#page","headline":"RtkParticipantTileView · Cloudflare Realtime docs","description":"API reference for RtkParticipantTileView component (iOS Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/ios/rtk-participant-tile-view/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
