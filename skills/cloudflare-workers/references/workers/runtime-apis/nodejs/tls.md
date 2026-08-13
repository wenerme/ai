---
description: Use the Node.js tls module in Cloudflare Workers to create secure TLS connections to external services.
title: tls
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

# tls

Last updated Apr 23, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/workers/runtime-apis/nodejs/tls/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Note

For compatibility dates of `2026-08-04` or later, Workers enables both `nodejs_compat` and `nodejs_compat_v2` by default. These flags are not used for these compatibility dates. Existing projects do not need to remove them when updating their compatibility date. For earlier dates, add `nodejs_compat` to your [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/) to opt in. For instructions to turn off Node.js compatibility, refer to the [Node.js compatibility flag](https://developers.cloudflare.com/workers/configuration/compatibility-flags/#nodejs-compatibility-flag).

You can use [node:tls ↗](https://nodejs.org/api/tls.html) to create secure connections to external services using [TLS ↗](https://developer.mozilla.org/en-US/docs/Web/Security/Transport%5FLayer%5FSecurity) (Transport Layer Security).

```js
import { connect } from "node:tls";

// ... in a request handler ...
const connectionOptions = { key: env.KEY, cert: env.CERT };
const socket = connect(url, connectionOptions, () => {
	if (socket.authorized) {
		console.log("Connection authorized");
	}
});

socket.on("data", (data) => {
	console.log(data);
});

socket.on("end", () => {
	console.log("server ends connection");
});
```

The following APIs are available:

* [connect ↗](https://nodejs.org/api/tls.html#tlsconnectoptions-callback)
* [TLSSocket ↗](https://nodejs.org/api/tls.html#class-tlstlssocket)
* [checkServerIdentity ↗](https://nodejs.org/api/tls.html#tlscheckserveridentityhostname-cert)
* [createSecureContext ↗](https://nodejs.org/api/tls.html#tlscreatesecurecontextoptions)

All other APIs, including [tls.Server ↗](https://nodejs.org/api/tls.html#class-tlsserver) and [tls.createServer ↗](https://nodejs.org/api/tls.html#tlscreateserveroptions-secureconnectionlistener), are not supported and will throw a `Not implemented` error when called.

The full `node:tls` API is documented in the [Node.js documentation for node:tls ↗](https://nodejs.org/api/tls.html).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/runtime-apis/nodejs/tls/#page","headline":"tls · Cloudflare Workers docs","description":"Use the Node.js tls module in Cloudflare Workers to create secure TLS connections to external services.","url":"https://developers.cloudflare.com/workers/runtime-apis/nodejs/tls/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
