---
description: API reference for RtkActiveTabSelectorView component (iOS Library)
title: RtkActiveTabSelectorView
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

#  RtkActiveTabSelectorView

Last updated Apr 23, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/ios/rtk-active-tab-selector-view/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

A horizontally scrollable tab selector for switching between plugins and screen shares.

## Properties

| Property | Type                              | Required | Default | Description                              |
| -------- | --------------------------------- | -------- | ------- | ---------------------------------------- |
| buttons  | \[RtkPluginScreenShareTabButton\] | \-       | \-      | The array of tab buttons in the selector |

## Methods

| Method                    | Return Type | Description                                                   |
| ------------------------- | ----------- | ------------------------------------------------------------- |
| scrollToVisible(button:)  | Void        | Scrolls the tab selector to make the specified button visible |
| setAndDisplayButtons(\_:) | Void        | Sets and displays the provided array of tab buttons           |

## Usage Examples

### Basic Usage

```swift
import RealtimeKitUI

let tabSelector = RtkActiveTabSelectorView()
let buttons = [
    RtkPluginScreenShareTabButton(image: nil, title: "Screen Share"),
    RtkPluginScreenShareTabButton(image: nil, title: "Whiteboard")
]
tabSelector.setAndDisplayButtons(buttons)
view.addSubview(tabSelector)
```

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/ios/rtk-active-tab-selector-view/#page","headline":"RtkActiveTabSelectorView · Cloudflare Realtime docs","description":"API reference for RtkActiveTabSelectorView component (iOS Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/ios/rtk-active-tab-selector-view/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
