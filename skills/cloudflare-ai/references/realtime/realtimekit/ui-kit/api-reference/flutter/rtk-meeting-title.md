---
description: API reference for RtkMeetingTitle component (Flutter Library)
title: RtkMeetingTitle
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

#  RtkMeetingTitle

Last updated Apr 23, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/flutter/rtk-meeting-title/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

A widget that displays the title of a RealtimeKit meeting. Integrates with the RealtimeKit design system for consistent styling.

## Properties

| Property              | Type              | Required | Default              | Description                     |
| --------------------- | ----------------- | -------- | -------------------- | ------------------------------- |
| meeting               | RealtimekitClient | ✅        | \-                   | Meeting client instance         |
| individualDesignToken | RtkDesignTokens?  | ❌        | Global design tokens | Design tokens for customization |

## Usage Examples

### Basic Usage

```dart
import 'package:realtimekit_ui/realtimekit_ui.dart';

RtkMeetingTitle(
  meeting: yourMeetingInstance,
)
```

### With Properties

```dart
import 'package:realtimekit_ui/realtimekit_ui.dart';

RtkMeetingTitle(
  meeting: yourMeetingInstance,
  individualDesignToken: yourDesignToken,
)
```

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/flutter/rtk-meeting-title/#page","headline":"RtkMeetingTitle · Cloudflare Realtime docs","description":"API reference for RtkMeetingTitle component (Flutter Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/flutter/rtk-meeting-title/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
