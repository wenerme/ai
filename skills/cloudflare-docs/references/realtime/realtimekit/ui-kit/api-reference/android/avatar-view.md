---
title: RtkAvatarView
description: API reference for RtkAvatarView component (Android Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

# RtkAvatarView

Avatar component which renders a participant's profile picture or their initials.

## Methods

| Method            | Parameters                         | Description                                        |
| ----------------- | ---------------------------------- | -------------------------------------------------- |
| activate          | participant: RtkMeetingParticipant | Bind the avatar to a participant                   |
| refresh           | \-                                 | Refresh the avatar based on the participant's name |
| applyDesignTokens | designTokens: RtkDesignTokens      | Apply custom design tokens for theming             |

## Usage Examples

### Basic Usage

```

<com.cloudflare.realtimekit.ui.view.avatarview.RtkAvatarView

    android:id="@+id/rtk_avatar"

    android:layout_width="48dp"

    android:layout_height="48dp" />


```

### With Methods

Kotlin

```

val avatar = findViewById<RtkAvatarView>(R.id.rtk_avatar)

avatar.activate(participant)


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/android/","name":"Android"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/android/avatar-view/","name":"RtkAvatarView"}}]}
```
