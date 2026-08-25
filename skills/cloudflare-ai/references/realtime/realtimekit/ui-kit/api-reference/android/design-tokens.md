---
description: API reference for RtkDesignTokens component (Android Library)
title: RtkDesignTokens
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# RtkDesignTokens

Last updated Apr 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/android/design-tokens/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

The top-level design token container for customizing the look and feel of all UI Kit components.

## Properties

| Property     | Type                 | Required | Default | Description         |
| ------------ | -------------------- | -------- | ------- | ------------------- |
| colors       | RtkColorTokens       | ❌        | \-      | Color theme tokens  |
| borderWidth  | RtkBorderWidthToken  | ❌        | \-      | Border width token  |
| borderRadius | RtkBorderRadiusToken | ❌        | \-      | Border radius token |

## Usage Examples

### Basic Usage

```kotlin
val designTokens = RtkDesignTokens(
    colors = RtkColorTokens(
        brand = BrandColor(
            shade300 = Color.parseColor("#497CFD"),
            shade400 = Color.parseColor("#356EFD"),
            shade500 = Color.parseColor("#2160FD"),
            shade600 = Color.parseColor("#0D52FD"),
            shade700 = Color.parseColor("#0046E5")
        ),
        background = BackgroundColor(
            shade600 = Color.parseColor("#2C2C2C"),
            shade700 = Color.parseColor("#242424"),
            shade800 = Color.parseColor("#1C1C1C"),
            shade900 = Color.parseColor("#141414"),
            shade1000 = Color.parseColor("#0C0C0C")
        )
    ),
    borderRadius = RtkBorderRadiusToken.Rounded,
    borderWidth = RtkBorderWidthToken.Thin
)
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/android/design-tokens/#page","headline":"RtkDesignTokens · Cloudflare Realtime docs","description":"API reference for RtkDesignTokens component (Android Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/android/design-tokens/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
