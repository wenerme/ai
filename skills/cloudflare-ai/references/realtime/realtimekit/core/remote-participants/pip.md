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

Last updated Aug 24, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/realtime/realtimekit/core/remote-participants/pip/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

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

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/core/remote-participants/pip/#page","headline":"Picture in Picture · Cloudflare Realtime docs","description":"Render RealtimeKit participant video as a floating Picture-in-Picture tile in the browser.","url":"https://developers.cloudflare.com/realtime/realtimekit/core/remote-participants/pip/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-24","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
