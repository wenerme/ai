---
description: Forwarding a Websocket request to a Container
title: Websocket to Container
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/containers/llms.txt
> Use this file to discover all available pages before exploring further.

# Websocket to Container

Forwarding a Websocket request to a Container

Last updated Apr 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/containers/examples/websocket/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

WebSocket requests are automatically forwarded to a container using the default `fetch`method on the `Container` class:

```js
import { Container, getContainer } from "@cloudflare/containers";

export class MyContainer extends Container {
	defaultPort = 8080;
	sleepAfter = "2m";
}

export default {
	async fetch(request, env) {
		// gets default instance and forwards websocket from outside Worker
		return getContainer(env.MY_CONTAINER).fetch(request);
	},
};
```

View a full example in the [Container class repository ↗](https://github.com/cloudflare/containers/tree/main/examples/websocket).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/containers/examples/websocket/#page","headline":"Websocket to Container · Cloudflare Containers docs","description":"Forwarding a Websocket request to a Container","url":"https://developers.cloudflare.com/containers/examples/websocket/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
