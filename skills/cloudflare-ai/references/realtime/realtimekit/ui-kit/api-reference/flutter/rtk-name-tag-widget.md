---
description: API reference for RtkNameTag component (Flutter Library)
title: RtkNameTag
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

#  RtkNameTag

Last updated Apr 23, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/flutter/rtk-name-tag-widget/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

A widget that displays the name tag of a participant within a participant tile.

Note

[RtkProvider](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/flutter/rtk-provider/) must be an ancestor of this widget in the widget tree.

## Properties

| Property    | Type                  | Required | Default | Description                                 |
| ----------- | --------------------- | -------- | ------- | ------------------------------------------- |
| participant | RtkMeetingParticipant | ✅        | \-      | The participant whose name to display       |
| size        | double                | ✅        | \-      | Size constraint for the name tag            |
| color       | Color                 | ✅        | \-      | Color of the name tag text                  |
| factor      | double                | ❌        | 7       | Font size factor (fontSize = size / factor) |

## Usage Examples

### Basic Usage

```dart
import 'package:realtimekit_ui/realtimekit_ui.dart';

RtkNameTag(
  participant: participant,
  size: 14.0,
  color: Colors.white,
)
```

### With Properties

```dart
import 'package:realtimekit_ui/realtimekit_ui.dart';

RtkNameTag(
  participant: participant,
  size: 20.0,
  color: Colors.white,
  factor: 5,
)
```

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/flutter/rtk-name-tag-widget/#page","headline":"RtkNameTag · Cloudflare Realtime docs","description":"API reference for RtkNameTag component (Flutter Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/flutter/rtk-name-tag-widget/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
