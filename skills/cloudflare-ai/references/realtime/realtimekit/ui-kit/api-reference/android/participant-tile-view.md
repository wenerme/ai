---
description: API reference for RtkParticipantTileView component (Android Library)
title: RtkParticipantTileView
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# RtkParticipantTileView

Last updated Apr 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/android/participant-tile-view/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

A component which plays a participant's video and allows for placement of components like name tag and avatar.

## Properties

| Property                  | Type                        | Required | Default      | Description                  |
| ------------------------- | --------------------------- | -------- | ------------ | ---------------------------- |
| rtk\_ptv\_nameTagPosition | BOTTOM\_LEFT \| TOP\_CENTER | ❌        | BOTTOM\_LEFT | Position of the name tag     |
| cardBackgroundColor       | color                       | ❌        | \-           | Background color of the tile |
| cardCornerRadius          | dimension                   | ❌        | \-           | Corner radius of the tile    |

## Methods

| Method                  | Parameters                         | Description                             |
| ----------------------- | ---------------------------------- | --------------------------------------- |
| activate                | participant: RtkMeetingParticipant | Bind the tile to a specific participant |
| refreshParticipantName  | \-                                 | Refresh the name tag and avatar         |
| refreshParticipantVideo | \-                                 | Refresh the video view state            |
| applyDesignTokens       | designTokens: RtkDesignTokens      | Apply custom design tokens for theming  |

## Usage Examples

### Basic Usage

```xml
<com.cloudflare.realtimekit.ui.view.participanttile.RtkParticipantTileView
    android:id="@+id/rtk_participant_tile"
    android:layout_width="match_parent"
    android:layout_height="200dp"
    app:rtk_ptv_nameTagPosition="BOTTOM_LEFT" />
```

### With Methods

```kotlin
val tile = findViewById<RtkParticipantTileView>(R.id.rtk_participant_tile)
tile.activate(participant)
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/android/participant-tile-view/#page","headline":"RtkParticipantTileView · Cloudflare Realtime docs","description":"API reference for RtkParticipantTileView component (Android Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/android/participant-tile-view/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
