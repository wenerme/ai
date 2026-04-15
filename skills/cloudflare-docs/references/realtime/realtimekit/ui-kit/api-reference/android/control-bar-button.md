---
title: RtkControlBarButton
description: API reference for RtkControlBarButton component (Android Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/realtime/realtimekit/ui-kit/api-reference/android/control-bar-button.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# RtkControlBarButton

A skeleton component used for composing custom controlbar buttons.

## Properties

| Property              | Type                 | Required | Default | Description                           |
| --------------------- | -------------------- | -------- | ------- | ------------------------------------- |
| rtk\_cbb\_icon        | reference            | ❌        | \-      | Drawable resource for the button icon |
| rtk\_cbb\_variant     | button \| horizontal | ❌        | button  | Layout variant                        |
| rtk\_cbb\_showText    | boolean              | ❌        | true    | Whether to show the label text        |
| rtk\_cbb\_iconSize    | dimension            | ❌        | \-      | Size of the icon                      |
| rtk\_cbb\_iconPadding | dimension            | ❌        | \-      | Padding between icon and label        |

## Methods

| Method             | Parameters                    | Description                            |
| ------------------ | ----------------------------- | -------------------------------------- |
| applyDesignTokens  | designTokens: RtkDesignTokens | Apply custom design tokens for theming |
| setIconDrawable    | drawable: Drawable?           | Set the button icon                    |
| setIconTint        | color: Int                    | Set the icon tint color                |
| setText            | text: String?                 | Set the button label text              |
| setProcessingState | processing: Boolean           | Show or hide a loading spinner         |

## Usage Examples

### Basic Usage

```

<com.cloudflare.realtimekit.ui.view.controlbarbuttons.RtkControlBarButton

    android:id="@+id/rtk_control_bar_button"

    android:layout_width="wrap_content"

    android:layout_height="wrap_content"

    app:rtk_cbb_showText="true"

    app:rtk_cbb_variant="button" />


```

### With Methods

Kotlin

```

val buttonView = findViewById<RtkControlBarButton>(R.id.rtk_control_bar_button)

buttonView.setOnClickListener { }


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/android/","name":"Android"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/android/control-bar-button/","name":"RtkControlBarButton"}}]}
```
