---
title: RtkRecordingIndicator
description: API reference for RtkRecordingIndicator component (Android Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/realtime/realtimekit/ui-kit/api-reference/android/recording-indicator.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# RtkRecordingIndicator

A component which indicates the recording status of a meeting. It does not render anything if no recording is taking place.

## Methods

| Method            | Parameters                    | Description                             |
| ----------------- | ----------------------------- | --------------------------------------- |
| activate          | meeting: RealtimeKitClient    | Bind the indicator to the meeting state |
| applyDesignTokens | designTokens: RtkDesignTokens | Apply custom design tokens for theming  |

## Usage Examples

### Basic Usage

```

<com.cloudflare.realtimekit.ui.view.RtkRecordingIndicator

    android:id="@+id/rtk_recording_indicator"

    android:layout_width="wrap_content"

    android:layout_height="wrap_content" />


```

### With Methods

Kotlin

```

val recordingIndicator = findViewById<RtkRecordingIndicator>(R.id.rtk_recording_indicator)

recordingIndicator.activate(meeting)


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/android/","name":"Android"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/android/recording-indicator/","name":"RtkRecordingIndicator"}}]}
```
