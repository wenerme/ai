---
title: RtkVideoDeviceSelector
description: API reference for RtkVideoDeviceSelector component (Android Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/realtime/realtimekit/ui-kit/api-reference/android/video-device-selector.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# RtkVideoDeviceSelector

A video device selector component which can be used to select video devices.

## Properties

| Property       | Type   | Required | Default | Description       |
| -------------- | ------ | -------- | ------- | ----------------- |
| rtk\_ds\_label | string | ❌        | Video   | Custom label text |

## Methods

| Method            | Parameters                    | Description                               |
| ----------------- | ----------------------------- | ----------------------------------------- |
| activate          | meeting: RealtimeKitClient    | Bind the selector to the meeting state    |
| disableLabel      | \-                            | Disable the label text above the dropdown |
| applyDesignTokens | designTokens: RtkDesignTokens | Apply custom design tokens for theming    |

## Usage Examples

### Basic Usage

```

<com.cloudflare.realtimekit.ui.view.RtkVideoDeviceSelector

    android:id="@+id/videoSelector"

    app:rtk_ds_label="Camera"

    android:layout_width="0dp"

    android:layout_height="wrap_content" />


```

### With Methods

Kotlin

```

val videoSelector = findViewById<RtkVideoDeviceSelector>(R.id.videoSelector)

videoSelector.activate(meeting)


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/android/","name":"Android"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/android/video-device-selector/","name":"RtkVideoDeviceSelector"}}]}
```
