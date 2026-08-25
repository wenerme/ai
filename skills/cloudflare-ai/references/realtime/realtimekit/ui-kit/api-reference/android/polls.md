---
description: API reference for RtkPollsBottomSheet component (Android Library)
title: RtkPollsBottomSheet
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# RtkPollsBottomSheet

Last updated Apr 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/android/polls/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

A component which lists all available polls a user can access.

## Methods

| Method | Parameters                                     | Description                    |
| ------ | ---------------------------------------------- | ------------------------------ |
| show   | fragmentManager: FragmentManager, tag: String? | Display the polls bottom sheet |

## Usage Examples

### Basic Usage

```kotlin
val rtkPollsBottomSheet = RtkPollsBottomSheet()
rtkPollsBottomSheet.show(fragmentManager, "POLLS_TAG")
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/android/polls/#page","headline":"RtkPollsBottomSheet · Cloudflare Realtime docs","description":"API reference for RtkPollsBottomSheet component (Android Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/android/polls/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
