---
description: Expose a local Wrangler or Vite dev server over a public tunnel URL.
title: Share a local dev server
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

# Share a local dev server

Last updated Jun 25, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/workers/local-development/local-dev-tunnels/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

You can expose your local dev server over a [Cloudflare Tunnel](https://developers.cloudflare.com/tunnel/) when you need to share a preview, test a webhook, or access your app from another device.

This page covers tunnel support in [Wrangler](https://developers.cloudflare.com/workers/wrangler/commands/general/#dev) and the [Cloudflare Vite plugin](https://developers.cloudflare.com/workers/vite-plugin/).

## Start a tunnel

You can start a tunnel with Wrangler or the Cloudflare Vite plugin for the current session. This gives you either a random `*.trycloudflare.com` hostname via a [Quick tunnel](https://developers.cloudflare.com/tunnel/setup/#quick-tunnels-development), or a stable hostname via a [named tunnel](https://developers.cloudflare.com/tunnel/setup/#create-a-tunnel).

**Wrangler**

Run `wrangler dev`, then press `[t]` to start or close the tunnel. Wrangler will print the public tunnel URL or URLs for the current session.

To use a named tunnel, run:

npmyarnpnpm

```
npx wrangler dev --tunnel-name=my-tunnel
```

```
yarn wrangler dev --tunnel-name=my-tunnel
```

```
pnpm wrangler dev --tunnel-name=my-tunnel
```

Use `--tunnel` if you want the tunnel to open automatically when Wrangler starts.

npmyarnpnpm

```
npx wrangler dev --tunnel
```

```
yarn wrangler dev --tunnel
```

```
pnpm wrangler dev --tunnel
```

**Cloudflare Vite plugin**

Run `vite dev`, then press `t + Enter` to start or close the tunnel. Add `tunnel` to the plugin config if you want to configure a named tunnel or have the tunnel open automatically when Vite starts.

To use a named tunnel with stable hostnames:

```js
import { defineConfig } from "vite";
import { cloudflare } from "@cloudflare/vite-plugin";

export default defineConfig({
	plugins: [
		cloudflare({
			tunnel: { name: "my-tunnel" },
		}),
	],
});
```

```ts
import { defineConfig } from "vite";
import { cloudflare } from "@cloudflare/vite-plugin";

export default defineConfig({
	plugins: [
		cloudflare({
			tunnel: { name: "my-tunnel" },
		}),
	],
});
```

If you want the tunnel to open automatically when Vite starts, set `tunnel.autoStart` to `true`.

When using `vite preview`, Vite's preview host validation still applies:

* For Quick tunnel, add `.trycloudflare.com` to `preview.allowedHosts`.
* For named tunnel, add the resolved hostnames or a matching domain suffix such as `.my-domain.com` to `preview.allowedHosts`.

For example:

```js
import { defineConfig } from "vite";
import { cloudflare } from "@cloudflare/vite-plugin";

export default defineConfig({
	preview: {
		allowedHosts: [
			// For Quick tunnels:
			".trycloudflare.com",
			// For named tunnels:
			".my-domain.com",
		],
	},
	plugins: [
		cloudflare({
			tunnel: { name: "my-tunnel" },
		}),
	],
});
```

```ts
import { defineConfig } from "vite";
import { cloudflare } from "@cloudflare/vite-plugin";

export default defineConfig({
	preview: {
		allowedHosts: [
			// For Quick tunnels:
			".trycloudflare.com",
			// For named tunnels:
			".my-domain.com"
		],
	},
	plugins: [
		cloudflare({
			tunnel: { name: "my-tunnel" },
		}),
	],
});
```

## Security considerations

Anyone with the tunnel URL can reach your dev server, so review what your app exposes before enabling a tunnel.

* Pay special attention to ungated preview or admin endpoints.
* Review any [remote bindings](https://developers.cloudflare.com/workers/local-development/#remote-bindings) connected to real resources.
* Review any code that proxies requests to private or internal services.
* If you are using the Cloudflare Vite plugin with `vite dev`, HMR and module serving may expose source files, file paths, or project structure over the tunnel. If you only need to share a built preview, prefer `vite preview` for public sharing.
* Local dev-related routes, such as `/cdn-cgi/*`, remain restricted and are not exposed over the tunnel.
* If you need a stable hostname or stricter access control, use a named tunnel protected by Cloudflare Access.

## Related docs

* [Cloudflare Tunnel](https://developers.cloudflare.com/tunnel/)

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/workers/local-development/local-dev-tunnels/#page","headline":"Share a local dev server · Cloudflare Workers docs","description":"Expose a local Wrangler or Vite dev server over a public tunnel URL.","url":"https://developers.cloudflare.com/workers/local-development/local-dev-tunnels/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-06-25","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
