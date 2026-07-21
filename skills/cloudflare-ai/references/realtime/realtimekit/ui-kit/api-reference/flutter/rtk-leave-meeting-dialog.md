---
description: API reference for RtkLeaveMeetingDialog component (Flutter Library)
title: RtkLeaveMeetingDialog
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

#  RtkLeaveMeetingDialog

Last updated Apr 23, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/flutter/rtk-leave-meeting-dialog/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

A dialog widget for confirming the action of leaving a RealtimeKit meeting. Provides a prompt with cancel and leave options, and displays an additional end-meeting option for hosts.

## Properties

| Property    | Type              | Required | Default              | Description                     |
| ----------- | ----------------- | -------- | -------------------- | ------------------------------- |
| meeting     | RealtimekitClient | ✅        | \-                   | Meeting client instance         |
| designToken | RtkDesignTokens?  | ❌        | Global design tokens | Design tokens for customization |

## Usage Examples

### Basic Usage

```dart
import 'package:realtimekit_ui/realtimekit_ui.dart';

RtkLeaveMeetingDialog(
  meeting: yourMeetingInstance,
)
```

### With Properties

```dart
import 'package:realtimekit_ui/realtimekit_ui.dart';

RtkLeaveMeetingDialog(
  meeting: yourMeetingInstance,
  designToken: yourDesignToken,
)
```

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/flutter/rtk-leave-meeting-dialog/#page","headline":"RtkLeaveMeetingDialog · Cloudflare Realtime docs","description":"API reference for RtkLeaveMeetingDialog component (Flutter Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/flutter/rtk-leave-meeting-dialog/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
