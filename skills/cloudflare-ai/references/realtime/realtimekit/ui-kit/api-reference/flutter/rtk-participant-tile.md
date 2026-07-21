---
description: API reference for RtkParticipantTile component (Flutter Library)
title: RtkParticipantTile
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

#  RtkParticipantTile

Last updated Apr 23, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/flutter/rtk-participant-tile/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

A widget that displays a participant's video or avatar within a meeting environment. Automatically shows the video feed when available and falls back to the participant's avatar.

Note

[RtkProvider](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/flutter/rtk-provider/) must be an ancestor of this widget in the widget tree.

## Properties

| Property    | Type                  | Required | Default              | Description                                       |
| ----------- | --------------------- | -------- | -------------------- | ------------------------------------------------- |
| participant | RtkMeetingParticipant | ✅        | \-                   | The participant to display (positional parameter) |
| designToken | RtkDesignTokens?      | ❌        | Global design tokens | Design tokens for customization                   |
| height      | double                | ❌        | 240                  | Height of the tile                                |
| width       | double                | ❌        | 180                  | Width of the tile                                 |

Note

The `participant` parameter is positional. Pass it without a named argument: `RtkParticipantTile(participant)`.

## Usage Examples

### Basic Usage

```dart
import 'package:realtimekit_ui/realtimekit_ui.dart';

RtkParticipantTile(
  participant,
)
```

### With Properties

```dart
import 'package:realtimekit_ui/realtimekit_ui.dart';

RtkParticipantTile(
  participant,
  designToken: yourDesignToken,
  height: 300,
  width: 200,
)
```

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/flutter/rtk-participant-tile/#page","headline":"RtkParticipantTile · Cloudflare Realtime docs","description":"API reference for RtkParticipantTile component (Flutter Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/flutter/rtk-participant-tile/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
