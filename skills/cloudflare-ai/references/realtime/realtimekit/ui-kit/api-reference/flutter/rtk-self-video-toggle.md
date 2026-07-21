---
description: API reference for RtkSelfVideoToggleButton component (Flutter Library)
title: RtkSelfVideoToggleButton
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

#  RtkSelfVideoToggleButton

Last updated Apr 23, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/flutter/rtk-self-video-toggle/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

A toggle button widget for controlling video state during a meeting. Allows users to turn their video on or off.

Note

[RtkProvider](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/flutter/rtk-provider/) must be an ancestor of this widget in the widget tree.

## Properties

| Property              | Type              | Required | Default              | Description                            |
| --------------------- | ----------------- | -------- | -------------------- | -------------------------------------- |
| meeting               | RealtimekitClient | ✅        | \-                   | Meeting client instance                |
| individualDesignToken | RtkDesignTokens?  | ❌        | Global design tokens | Design tokens for customization        |
| onVideoToggle         | VoidCallback?     | ❌        | \-                   | Callback invoked when video is toggled |
| iconSize              | double?           | ❌        | \-                   | Size of the icon                       |
| iconColor             | Color?            | ❌        | \-                   | Color of the icon                      |
| showLabel             | bool              | ❌        | false                | Whether to show label text             |

## Usage Examples

### Basic Usage

```dart
import 'package:realtimekit_ui/realtimekit_ui.dart';

RtkSelfVideoToggleButton(
  meeting: yourMeetingInstance,
)
```

### With Properties

```dart
import 'package:realtimekit_ui/realtimekit_ui.dart';

RtkSelfVideoToggleButton(
  meeting: yourMeetingInstance,
  onVideoToggle: () {
    // Handle video toggle
  },
  iconSize: 24.0,
  iconColor: Colors.red,
  showLabel: true,
)
```

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/flutter/rtk-self-video-toggle/#page","headline":"RtkSelfVideoToggleButton · Cloudflare Realtime docs","description":"API reference for RtkSelfVideoToggleButton component (Flutter Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/flutter/rtk-self-video-toggle/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
