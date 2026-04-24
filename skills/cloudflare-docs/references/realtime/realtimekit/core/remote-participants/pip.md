---
title: Picture in Picture
description: Render RealtimeKit participant video as a floating Picture-in-Picture tile in the browser.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

### Agents toolkit

* Agent setup
* Copy as Markdown

Open the Markdown file in a new tab

Ask Claude about this page

Ask ChatGPT about this page

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/realtime/realtimekit/core/remote-participants/pip.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

# Picture in Picture

Picture-in-Picture API allows you to render `meeting.participants.active` participant's video as a floating tile outside of the current webpage's context.

Note

Supported in Chrome, Edge, and Chromium-based browsers only.

WebMobile

ReactWeb ComponentsAngular

Picture-in-Picture is not available on this platform.

## Check support

Picture-in-Picture API might not be supported in your browser. Always check for support before using the API.

JavaScript

```

const isSupported = meeting.participants.pip.isSupported();


```

## Enable Picture-in-Picture

JavaScript

```

await meeting.participants.pip.enable();


```

## Disable Picture-in-Picture

JavaScript

```

await meeting.participants.pip.disable();


```

## Check support

Picture-in-Picture API might not be supported in your browser. Always check for support before using the API.

```

const isSupported = meeting.participants.pip.isSupported();


```

## Enable Picture-in-Picture

```

await meeting.participants.pip.enable();


```

## Disable Picture-in-Picture

```

await meeting.participants.pip.disable();


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/core/","name":"Build using Core SDK"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/core/remote-participants/","name":"Remote Participants"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/core/remote-participants/pip/","name":"Picture in Picture"}}]}
```
