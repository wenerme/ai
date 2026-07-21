---
description: API reference for RtkProvider component (Flutter Library)
title: RtkProvider
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

#  RtkProvider

Last updated Apr 23, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/flutter/rtk-provider/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

A foundational widget that initializes and provides the RealtimeKit environment for a Flutter application. `RtkProvider` acts as a context wrapper that sets up design tokens, client configurations, and UI Kit information required by RealtimeKit components.

## Properties

| Property  | Type                    | Required | Default | Description                                                       |
| --------- | ----------------------- | -------- | ------- | ----------------------------------------------------------------- |
| child     | Widget                  | ✅        | \-      | The widget below this widget in the tree                          |
| meeting   | RealtimekitClient       | ✅        | \-      | Meeting client instance                                           |
| uiKitInfo | RealtimeKitUIInfo       | ✅        | \-      | UI Kit configuration info including design tokens and UI settings |
| observers | List<ProviderObserver>? | ❌        | null    | Riverpod provider observers for debugging                         |

## Usage Examples

### Basic Usage

```dart
import 'package:realtimekit_ui/realtimekit_ui.dart';

RtkProvider(
  meeting: yourMeetingInstance,
  uiKitInfo: yourUiKitInfo,
  child: MaterialApp(
    home: YourAppHome(),
  ),
)
```

### With Properties

```dart
import 'package:realtimekit_ui/realtimekit_ui.dart';

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return RtkProvider(
      meeting: RealtimekitClient(
        // Client configuration
      ),
      uiKitInfo: RealtimeKitUIInfo(
        // UI Kit information and design tokens
      ),
      observers: [MyProviderObserver()],
      child: MaterialApp(
        home: HomeScreen(),
      ),
    );
  }
}
```

Note

You do not need to wrap the root of your application inside `RtkProvider`. You can wrap a specific subtree where you use RealtimeKit components. A `MaterialApp` widget must exist below `RtkProvider` in the widget tree.

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/flutter/rtk-provider/#page","headline":"RtkProvider · Cloudflare Realtime docs","description":"API reference for RtkProvider component (Flutter Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/flutter/rtk-provider/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
