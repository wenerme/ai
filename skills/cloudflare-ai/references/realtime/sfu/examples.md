---
description: Explore embedded devices, cloud gaming, AI audio, and browser video rooms built with Realtime SFU.
title: Examples
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# Examples

Last updated Sep 22, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/realtime/sfu/examples/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Choose an application, run its example, and follow the SFU operations behind it. Each guide explains the topology, setup, adaptation points, and current limitations.

## Build an application

### [Embedded devices and remote control](https://developers.cloudflare.com/realtime/sfu/examples/embedded-devices/)

Stream audio and telemetry from an ESP32, with one browser controlling the device.

### [Cloud gaming](https://developers.cloudflare.com/realtime/sfu/examples/cloud-gaming/)

Publish a Container's audio and video, and return browser input through DataChannels.

### [AI audio pipelines](https://developers.cloudflare.com/realtime/sfu/examples/ai-audio/)

Connect speech-to-text and text-to-speech services through WebSocket adapters.

### [Custom video room](https://developers.cloudflare.com/realtime/sfu/examples/video-room/)

Start with two browser participants, then inspect presence, discovery, and media lifecycle.

The [video-room quickstart](https://developers.cloudflare.com/realtime/sfu/get-started/) is the default introduction to publishing and receiving media. The application examples are experimental; their guides identify integration work and known limitations.

## Learn a specific feature

| Example | What to try |
| --- | --- |
| [DataChannels ↗](https://github.com/cloudflare/realtime-examples/tree/main/echo-datachannels) | Establish two endpoints, acknowledge readiness, send replies, and compare delivery settings |
| [WebRTC video to JPEG ↗](https://github.com/cloudflare/realtime-examples/tree/main/video-to-jpeg) | Send a camera track through an adapter and receive JPEG frames over WebSocket |
| [SFU network visualization ↗](https://realtime-sfu.dev-demos.workers.dev) | Explore an illustration of endpoint connections and media routing |

The DataChannel example is intended for localhost. The JPEG example requires application authentication and authorization before public use.

## Source and status

Browse the [Realtime examples repository ↗](https://github.com/cloudflare/realtime-examples) for complete source, component guides, and declared checks. The catalog distinguishes maintained, experimental, and legacy examples. Legacy entries are historical or educational references with documented limitations.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/sfu/examples/#page","headline":"Examples","description":"Explore embedded devices, cloud gaming, AI audio, and browser video rooms built with Realtime SFU.","url":"https://developers.cloudflare.com/realtime/sfu/examples/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-09-22","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
