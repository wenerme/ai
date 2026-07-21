---
description: API reference for RtkJoinButton component (Flutter Library)
title: RtkJoinButton
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

#  RtkJoinButton

Last updated Apr 23, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/flutter/rtk-join-button/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

A button widget for joining a RealtimeKit meeting room. Provides visual feedback during the joining process.

## Properties

| Property        | Type              | Required | Default              | Description                                 |
| --------------- | ----------------- | -------- | -------------------- | ------------------------------------------- |
| meeting         | RealtimekitClient | ✅        | \-                   | Meeting client instance                     |
| onMeetingJoined | VoidCallback?     | ❌        | \-                   | Callback invoked when the meeting is joined |
| rtkDesignToken  | RtkDesignTokens?  | ❌        | Global design tokens | Design tokens for customization             |
| height          | double?           | ❌        | \-                   | Height of the button                        |
| width           | double?           | ❌        | \-                   | Width of the button                         |
| isDisabled      | bool              | ❌        | false                | Whether the button is disabled              |

## Usage Examples

### Basic Usage

```dart
import 'package:realtimekit_ui/realtimekit_ui.dart';

RtkJoinButton(
  meeting: yourMeetingInstance,
)
```

### With Properties

```dart
import 'package:realtimekit_ui/realtimekit_ui.dart';

RtkJoinButton(
  meeting: yourMeetingInstance,
  onMeetingJoined: () {
    // Handle successful join
  },
  height: 50.0,
  width: 200.0,
  isDisabled: false,
)
```

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/flutter/rtk-join-button/#page","headline":"RtkJoinButton · Cloudflare Realtime docs","description":"API reference for RtkJoinButton component (Flutter Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/flutter/rtk-join-button/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
