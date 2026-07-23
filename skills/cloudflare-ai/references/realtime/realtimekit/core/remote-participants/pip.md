---
description: Render RealtimeKit participant video as a floating Picture-in-Picture tile in the browser.
title: Picture in Picture
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt
> Use this file to discover all available pages before exploring further.

# Picture in Picture

Last updated Apr 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/realtime/realtimekit/core/remote-participants/pip/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Picture-in-Picture API allows you to render `meeting.participants.active` participant's video as a floating tile outside of the current webpage's context.

Note

Supported in Chrome, Edge, and Chromium-based browsers only.

WebMobile

ReactWeb ComponentsAngular

Picture-in-Picture is not available on this platform.

## Check support

Picture-in-Picture API might not be supported in your browser. Always check for support before using the API.

```js
const isSupported = meeting.participants.pip.isSupported();
```

## Enable Picture-in-Picture

```js
await meeting.participants.pip.enable();
```

## Disable Picture-in-Picture

```js
await meeting.participants.pip.disable();
```

## Check support

Picture-in-Picture API might not be supported in your browser. Always check for support before using the API.

```jsx
const isSupported = meeting.participants.pip.isSupported();
```

## Enable Picture-in-Picture

```jsx
await meeting.participants.pip.enable();
```

## Disable Picture-in-Picture

```jsx
await meeting.participants.pip.disable();
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/core/remote-participants/pip/#page","headline":"Picture in Picture · Cloudflare Realtime docs","description":"Render RealtimeKit participant video as a floating Picture-in-Picture tile in the browser.","url":"https://developers.cloudflare.com/realtime/realtimekit/core/remote-participants/pip/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
