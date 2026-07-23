---
description: Stop a RealtimeKit recording automatically or manually using the Stop Recording API.
title: Stop Recording
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# Stop Recording

Last updated Apr 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/realtime/realtimekit/recording-guide/stop-recording/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

RealtimeKit recordings can be stopped in any of the following ways:

1. **Automatic Stop (Empty meeting)**: A RealtimeKit recording will automatically stop if the meeting has no participants for a duration of 1 minute or more. This wait time can be customized by contacting RealtimeKit's support team to configure a custom value for your app.
2. **Automatic Stop (maxSeconds elapsed)**: A recording will automatically stop when it reaches the duration specified by the `max_seconds` parameter passed while starting the recording, regardless of whether participants are present in the meeting. If this parameter is not passed, it defaults to 24 hours (86400 seconds).
3. **Using Stop Recording API**: A recording can also be stopped by passing the recording ID and `stop` action to the [Stop Recording API](https://developers.cloudflare.com/api/resources/realtime%5Fkit/subresources/recordings/).

When a recording is stopped, it transitions to the `UPLOADING` state and then to the `UPLOADED` state after it has been transferred to RealtimeKit's storage and any external storage that has been set up.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/recording-guide/stop-recording/#page","headline":"Stop Recording · Cloudflare Realtime docs","description":"Stop a RealtimeKit recording automatically or manually using the Stop Recording API.","url":"https://developers.cloudflare.com/realtime/realtimekit/recording-guide/stop-recording/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
