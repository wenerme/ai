---
agent:
  instructions: "Use this search API to find relevant content across this site with keywords or natural-language queries, instead of crawling individual pages. Results are returned in Markdown."
  endpoint: "https://developers.cloudflare.com/.well-known/search?q={query}"
  method: "GET"
  documentation: "https://developers.cloudflare.com/ai-search/how-to/search-for-agents/"
description: API reference for rtk-transcript component (Angular Library)
title: rtk-transcript
image: https://developers.cloudflare.com/realtime/realtimekit/humans/ui-kit/api-reference/angular/rtk-transcript/og.png?v=59a8b0491b3060dc
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# rtk-transcript

A component which shows a transcript. You need to remove the element after you receive the `rtkTranscriptDismiss` event.

## Properties

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `t` | `RtkI18n` | ❌ | `useLanguage()` | Language |
| `transcript` | `Transcript & { renderedId?: string }` | ❌ | - | Message |

## Usage Examples

### Basic Usage

```html
<!-- component.html -->
<rtk-transcript></rtk-transcript>
```

### With Properties

```html
<!-- component.html -->
<rtk-transcript
 [t]="rtki18n"
 transcript="example">
</rtk-transcript>
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/humans/ui-kit/api-reference/angular/rtk-transcript/#page","headline":"rtk-transcript","description":"API reference for rtk-transcript component (Angular Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/humans/ui-kit/api-reference/angular/rtk-transcript/","inLanguage":"en","image":"https://developers.cloudflare.com/realtime/realtimekit/humans/ui-kit/api-reference/angular/rtk-transcript/og.png?v=59a8b0491b3060dc","dateModified":"2026-10-19","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
