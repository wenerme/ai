---
title: RtkButton
description: API reference for RtkButton component (Android Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/realtime/realtimekit/ui-kit/api-reference/android/button.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# RtkButton

A button that follows the RealtimeKit design system.

## Properties

| Property          | Type                 | Required | Default | Description |                |
| ----------------- | -------------------- | -------- | ------- | ----------- | -------------- |
| rtk\_btn\_variant | primary \| secondary | danger   | ❌       | \-          | Button variant |

## Methods

| Method            | Parameters                    | Description                                 |
| ----------------- | ----------------------------- | ------------------------------------------- |
| applyDesignTokens | designTokens: RtkDesignTokens | Apply custom design tokens for theming      |
| refresh           | uiTokens: RtkDesignTokens     | Refresh the button with the provided tokens |

## Usage Examples

### Basic Usage

```

<com.cloudflare.realtimekit.ui.view.button.RtkButton

    android:id="@+id/btn_id"

    android:layout_width="200dp"

    android:layout_height="48dp"

    android:text="Text on Button"

    app:rtk_btn_variant="primary" />


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/android/","name":"Android"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/android/button/","name":"RtkButton"}}]}
```
