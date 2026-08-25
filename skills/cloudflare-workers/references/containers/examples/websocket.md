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

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/containers/examples/websocket/#page","headline":"Websocket to Container · Cloudflare Containers docs","description":"Forwarding a Websocket request to a Container","url":"https://developers.cloudflare.com/containers/examples/websocket/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
