---
description: Add a custom image watermark to RealtimeKit recordings with configurable position and size.
title: Add Watermark
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# Add Watermark

Last updated Apr 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/realtime/realtimekit/recording-guide/add-watermark/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

RealtimeKit's watermark feature enables you to include an image as a watermark in your recording. To add watermark, configure the following parameters to video\_config in the [Start Recording API](https://developers.cloudflare.com/api/resources/realtime%5Fkit/subresources/recordings/methods/start%5Frecordings/).

| **Parameter** | **Description**                                                                                                                                                                |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| URL           | Specify the URL of the watermark image                                                                                                                                         |
| Position      | Specify the placement of the watermark, you have the flexibility to choose between left top, right top, left bottom, or right bottom. The default position is set to left top. |
| Size          | Specify the height and width of the watermark in pixels.                                                                                                                       |

```json
{
  "video_config": {
    "watermark": {
      "url": "https://test.io/images/client-logos-6.webp",
      "position": "left top",
      "size": {
        "height": 20,
        "width": 100
      }
    }
  }
}
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/recording-guide/add-watermark/#page","headline":"Add Watermark · Cloudflare Realtime docs","description":"Add a custom image watermark to RealtimeKit recordings with configurable position and size.","url":"https://developers.cloudflare.com/realtime/realtimekit/recording-guide/add-watermark/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
