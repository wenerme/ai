---
description: API reference for RtkAudioIndicatorIconWidget component (Flutter Library)
title: RtkAudioIndicatorIconWidget
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# RtkAudioIndicatorIconWidget

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/flutter/rtk-audio-indicator-icon-widget/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

A widget that displays the audio status of a participant in a RealtimeKit meeting.

Note

[RtkProvider](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/flutter/rtk-provider/) must be an ancestor of this widget in the widget tree.

## Properties

| Property    | Type                  | Required | Default | Description                                   |
| ----------- | --------------------- | -------- | ------- | --------------------------------------------- |
| participant | RtkMeetingParticipant | ✅        | \-      | The participant whose audio status to display |
| iconSize    | double?               | ❌        | 24      | Size of the audio indicator icon              |

## Usage Examples

### Basic Usage

```dart
import 'package:realtimekit_ui/realtimekit_ui.dart';

RtkAudioIndicatorIconWidget(
  participant: participant,
)
```

### With Properties

```dart
import 'package:realtimekit_ui/realtimekit_ui.dart';

RtkAudioIndicatorIconWidget(
  participant: participant,
  iconSize: 32.0,
)
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/flutter/rtk-audio-indicator-icon-widget/#page","headline":"RtkAudioIndicatorIconWidget · Cloudflare Realtime docs","description":"API reference for RtkAudioIndicatorIconWidget component (Flutter Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/flutter/rtk-audio-indicator-icon-widget/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
