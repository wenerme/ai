---
description: Upload video files under 200 MB to Cloudflare Stream using the dashboard or API.
title: Basic video uploads
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/stream/llms.txt
> Use this file to discover all available pages before exploring further.

# Basic video uploads

Last updated Apr 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/stream/uploading-videos/upload-video-file/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

## Basic Uploads

For files smaller than 200 MB, you can use simple form-based uploads.

## Upload through the Cloudflare dashboard

1. In the Cloudflare dashboard, go to the **Stream** page.
[Go to **Videos** ↗](https://dash.cloudflare.com/?to=/:account/stream/videos)
2. Drag and drop your video into the **Quick upload** area. You can also click to browse for the file on your machine.

After the video finishes uploading, the video appears in the list.

## Upload with the Stream API

Make a `POST` request with the `content-type` header set to `multipart/form-data` and include the media as an input with the name set to `file`.

```bash
curl --request POST \
--header "Authorization: Bearer <API_TOKEN>" \
--form file=@/Users/user_name/Desktop/my-video.mp4 \
https://api.cloudflare.com/client/v4/accounts/{account_id}/stream
```

Note

Note that cURL's `--form` flag automatically configures the `content-type` header and maps `my-video.mp4` to a form input called `file`.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/stream/uploading-videos/upload-video-file/#page","headline":"Basic video uploads · Cloudflare Stream docs","description":"Upload video files under 200 MB to Cloudflare Stream using the dashboard or API.","url":"https://developers.cloudflare.com/stream/uploading-videos/upload-video-file/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
