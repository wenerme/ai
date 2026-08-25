---
description: Use the Node.js net module in Cloudflare Workers to create TCP socket connections to external servers.
title: net
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

# net

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/workers/runtime-apis/nodejs/net/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Note

For compatibility dates of `2026-08-04` or later, Workers enables both `nodejs_compat` and `nodejs_compat_v2` by default. These flags are not used for these compatibility dates. Existing projects do not need to remove them when updating their compatibility date. For earlier dates, add `nodejs_compat` to your [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/) to opt in. For instructions to turn off Node.js compatibility, refer to the [Node.js compatibility flag](https://developers.cloudflare.com/workers/configuration/compatibility-flags/#nodejs-compatibility-flag).

You can use [node:net ↗](https://nodejs.org/api/net.html) to create a direct connection to servers via a TCP sockets with [net.Socket ↗](https://nodejs.org/api/net.html#class-netsocket).

These functions use [connect](https://developers.cloudflare.com/workers/runtime-apis/tcp-sockets/#connect) functionality from the built-in `cloudflare:sockets` module.

```js
import net from "node:net";

const exampleIP = "127.0.0.1";

export default {
	async fetch(req) {
		const socket = new net.Socket();
		socket.connect(4000, exampleIP, function () {
			console.log("Connected");
		});

		socket.write("Hello, Server!");
		socket.end();

		return new Response("Wrote to server", { status: 200 });
	},
};
```

```ts
import net from "node:net";

const exampleIP = "127.0.0.1";

export default {
  async fetch(req): Promise<Response> {
    const socket = new net.Socket();
    socket.connect(4000, exampleIP, function () {
      console.log("Connected");
    });

    socket.write("Hello, Server!");
    socket.end();

    return new Response("Wrote to server", { status: 200 });

},
} satisfies ExportedHandler;
```

Additionally, other APIs such as [net.BlockList ↗](https://nodejs.org/api/net.html#class-netblocklist)and [net.SocketAddress ↗](https://nodejs.org/api/net.html#class-netsocketaddress) are available.

Note that the [net.Server ↗](https://nodejs.org/api/net.html#class-netserver) class is not supported by Workers.

The full `node:net` API is documented in the [Node.js documentation for node:net ↗](https://nodejs.org/api/net.html).

```plaintext

```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/runtime-apis/nodejs/net/#page","headline":"net · Cloudflare Workers docs","description":"Use the Node.js net module in Cloudflare Workers to create TCP socket connections to external servers.","url":"https://developers.cloudflare.com/workers/runtime-apis/nodejs/net/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
