---
description: API reference for RtkJoinStageDialog component (Android Library)
title: RtkJoinStageDialog
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

#  RtkJoinStageDialog

Last updated Apr 21, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/android/join-stage-dialog/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

A confirmation dialog screen shown when the user's request to join stage is approved or when the host invites the local user to join stage.

## Methods

| Method            | Parameters                    | Description                            |
| ----------------- | ----------------------------- | -------------------------------------- |
| activate          | meeting: RealtimeKitClient    | Bind the dialog to the meeting state   |
| applyDesignTokens | designTokens: RtkDesignTokens | Apply custom design tokens for theming |
| show              | \-                            | Display the dialog                     |
| dismiss           | \-                            | Dismiss the dialog                     |

## Usage Examples

### Basic Usage

```kotlin
val rtkJoinStage = RtkJoinStageDialog(requireContext())
rtkJoinStage.show()
rtkJoinStage.activate(meeting)
```

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/android/join-stage-dialog/#page","headline":"RtkJoinStageDialog · Cloudflare Realtime docs","description":"API reference for RtkJoinStageDialog component (Android Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/android/join-stage-dialog/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
