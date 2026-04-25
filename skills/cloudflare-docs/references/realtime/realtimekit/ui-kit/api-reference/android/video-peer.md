---
title: RtkVideoPeer
description: API reference for RtkVideoPeer component (Android Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

# RtkVideoPeer

A view that renders a participant's video stream with an avatar fallback when video is disabled.

## Methods

| Method  | Parameters                                                 | Description                               |
| ------- | ---------------------------------------------------------- | ----------------------------------------- |
| refresh | participant: RtkMeetingParticipant, isScreenShare: Boolean | Update the view with the participant data |

## Usage Examples

### Basic Usage

```

<com.cloudflare.realtimekit.ui.view.RtkVideoPeer

    android:id="@+id/rtk_video_peer"

    android:layout_width="match_parent"

    android:layout_height="200dp" />


```

### With Methods

Kotlin

```

val videoPeer = findViewById<RtkVideoPeer>(R.id.rtk_video_peer)

videoPeer.refresh(participant, isScreenShare = false)


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/android/","name":"Android"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/android/video-peer/","name":"RtkVideoPeer"}}]}
```
