---
description: API reference for rtk-sidebar-ui component (Angular Library)
title: rtk-sidebar-ui
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# rtk-sidebar-ui

Last updated Apr 21, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/angular/rtk-sidebar-ui/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

## Properties

| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `currentTab` | `string` | ✅ | - | Default tab to open |
| `focusCloseButton` | `boolean` | ✅ | - | Option to focus close button when opened |
| `hideCloseAction` | `boolean` | ✅ | - | Hide Close Action |
| `hideHeader` | `boolean` | ✅ | - | Hide Main Header |
| `iconPack` | `{ people: string; people_checked: string; chat: string; poll: string; participants: string; rocket: string; call_end: string; share: string; mic_on: string; mic_off: string; video_on: string; video_off: string; share_screen_start: string; share_screen_stop: string; share_screen_person: string; clock: string; dismiss: string; send: string; search: string; more_vertical: string; chevron_down: string; chevron_up: string; chevron_left: string; chevron_right: string; settings: string; wifi: string; speaker: string; speaker_off: string; download: string; full_screen_maximize: string; full_screen_minimize: string; copy: string; attach: string; image: string; emoji_multiple: string; image_off: string; disconnected: string; wand: string; recording: string; subtract: string; stop_recording: string; warning: string; pin: string; pin_off: string; spinner: string; breakout_rooms: string; add: string; shuffle: string; edit: string; delete: string; back: string; save: string; web: string; checkmark: string; spotlight: string; join_stage: string; leave_stage: string; pip_off: string; pip_on: string; signal_1: string; signal_2: string; signal_3: string; signal_4: string; signal_5: string; start_livestream: string; stop_livestream: string; viewers: string; debug: string; info: string; devices: string; horizontal_dots: string; ai_sparkle: string; meeting_ai: string; captionsOn: string; captionsOff: string; play: string; pause: string; fastForward: string; minimize: string; maximize: string; }` | ✅ | - | Icon Pack |
| `t` | `RtkI18n1` | ❌ | `useLanguage()` | Language |
| `tabs` | `RtkSidebarTab1[]` | ✅ | - | Tabs |
| `view` | `RtkSidebarView1` | ✅ | - | View |

## Usage Examples

### Basic Usage

```html
<!-- component.html -->
<rtk-sidebar-ui></rtk-sidebar-ui>
```

### With Properties

```html
<!-- component.html -->
<rtk-sidebar-ui
 currentTab="example"
 [focusCloseButton]="true"
 [hideCloseAction]="true">
</rtk-sidebar-ui>
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/angular/rtk-sidebar-ui/#page","headline":"rtk-sidebar-ui","description":"API reference for rtk-sidebar-ui component (Angular Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/angular/rtk-sidebar-ui/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
