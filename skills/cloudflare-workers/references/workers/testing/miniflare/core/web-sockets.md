---
description: Miniflare will always upgrade Web Socket connections. The Worker must respond
with a status 101 Switching Protocols response including a webSocket. For
example, the Worker below implements an echo WebSocket server:
title: WebSockets
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

#  WebSockets

Last updated Jan 28, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/workers/testing/miniflare/core/web-sockets/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

* [WebSockets Reference](https://developers.cloudflare.com/workers/runtime-apis/websockets)
* [Using WebSockets](https://developers.cloudflare.com/workers/examples/websockets/)

## Server

Miniflare will always upgrade Web Socket connections. The Worker must respond with a status `101 Switching Protocols` response including a `webSocket`. For example, the Worker below implements an echo WebSocket server:

```js
export default {
	fetch(request) {
		const [client, server] = Object.values(new WebSocketPair());

		server.accept();
		server.addEventListener("message", (event) => {
			server.send(event.data);
		});

		return new Response(null, {
			status: 101,
			webSocket: client,
		});
	},
};
```

When using `dispatchFetch`, you are responsible for handling WebSockets by using the `webSocket` property on `Response`. As an example, if the above worker script was stored in `echo.mjs`:

```js
import { Miniflare } from "miniflare";

const mf = new Miniflare({
	modules: true,
	scriptPath: "echo.mjs",
});

const res = await mf.dispatchFetch("https://example.com", {
	headers: {
		Upgrade: "websocket",
	},
});
const webSocket = res.webSocket;
webSocket.accept();
webSocket.addEventListener("message", (event) => {
	console.log(event.data);
});

webSocket.send("Hello!"); // Above listener logs "Hello!"
```

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/testing/miniflare/core/web-sockets/#page","headline":"WebSockets · Cloudflare Workers docs","description":"Miniflare will always upgrade Web Socket connections. The Worker must respond\nwith a status 101 Switching Protocols response including a webSocket. For\nexample, the Worker below implements an echo WebSocket server:","url":"https://developers.cloudflare.com/workers/testing/miniflare/core/web-sockets/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-01-28","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
