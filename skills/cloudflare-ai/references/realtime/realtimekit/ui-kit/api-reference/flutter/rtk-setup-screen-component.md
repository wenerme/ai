---
description: API reference for RtkSetupScreen component (Flutter Library)
title: RtkSetupScreen
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

#  RtkSetupScreen

Last updated Apr 23, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/flutter/rtk-setup-screen-component/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

A pre-built setup screen shown before joining a meeting. Allows users to edit their display name and configure media settings.

Note

[RtkProvider](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/flutter/rtk-provider/) must be an ancestor of this widget in the widget tree.

## Properties

| Property            | Type         | Required | Default | Description                                            |
| ------------------- | ------------ | -------- | ------- | ------------------------------------------------------ |
| selectedAudioDevice | AudioDevice? | ✅        | \-      | Currently selected audio device (positional parameter) |
| selectedVideoDevice | VideoDevice? | ✅        | \-      | Currently selected video device (positional parameter) |

Note

Both parameters are positional. Pass them without named arguments.

## Usage Examples

### Basic Usage

```dart
import 'package:realtimekit_ui/realtimekit_ui.dart';

RtkSetupScreen(
  selectedAudioDevice,
  selectedVideoDevice,
)
```

### With Properties

```dart
import 'package:realtimekit_ui/realtimekit_ui.dart';

final selectedAudioDevice = meeting.getSelectedAudioDevice();
final selectedVideoDevice = meeting.getSelectedVideoDevice();

RtkSetupScreen(
  selectedAudioDevice,
  selectedVideoDevice,
)
```

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/flutter/rtk-setup-screen-component/#page","headline":"RtkSetupScreen · Cloudflare Realtime docs","description":"API reference for RtkSetupScreen component (Flutter Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/flutter/rtk-setup-screen-component/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
