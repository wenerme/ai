---
title: Share a local dev server
description: Expose a local Wrangler or Vite dev server over a public tunnel URL.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Share a local dev server

You can expose your local dev server over a [Cloudflare Quick Tunnel](https://developers.cloudflare.com/tunnel/setup/#quick-tunnels-development) when you need to share a preview, test a webhook, or access your app from another device. This provides a random `*.trycloudflare.com` hostname for the current dev session.

This page covers tunnel support in [Wrangler](https://developers.cloudflare.com/workers/wrangler/commands/general/#dev) and the [Cloudflare Vite plugin](https://developers.cloudflare.com/workers/vite-plugin/).

## Start a tunnel

**Wrangler**

Run `wrangler dev --tunnel`:

 npm  yarn  pnpm 

```
npx wrangler dev --tunnel
```

```
yarn wrangler dev --tunnel
```

```
pnpm wrangler dev --tunnel
```

Wrangler will print the public tunnel URL for the current dev session.

**Cloudflare Vite plugin**

Enable `tunnel` conditionally in the plugin config:

* [  JavaScript ](#tab-panel-8638)
* [  TypeScript ](#tab-panel-8639)

vite.config.js

```

import { defineConfig } from "vite";

import { cloudflare } from "@cloudflare/vite-plugin";


export default defineConfig({

  plugins: [

    cloudflare({

      tunnel: process.env.ENABLE_DEV_TUNNEL === "true",

    }),

  ],

});


```

Explain Code

vite.config.ts

```

import { defineConfig } from "vite";

import { cloudflare } from "@cloudflare/vite-plugin";


export default defineConfig({

  plugins: [

    cloudflare({

      tunnel: process.env.ENABLE_DEV_TUNNEL === "true",

    }),

  ],

});


```

Explain Code

Then enable the tunnel only for the sessions where you want a public URL:

Terminal window

```

ENABLE_DEV_TUNNEL=true vite dev # or "vite preview"


```

Once the tunnel opens:

* The public tunnel URL is printed in the terminal for the current dev session.
* The session expires after 1 hour by default.
* A reminder is logged every 10 minutes while the tunnel is open.
* You can extend the tunnel by 1 hour at a time, either by pressing `t` for Wrangler or `t + Enter` for Vite.
* The tunnel can be extended up to 3 hours of remaining time.

## Security considerations

Anyone with the tunnel URL can reach your dev server, so review what your app exposes before enabling a tunnel.

* Pay special attention to ungated preview or admin endpoints.
* Review any [remote bindings](https://developers.cloudflare.com/workers/development-testing/#remote-bindings) connected to real resources.
* Review any code that proxies requests to private or internal services.
* If you are using the Cloudflare Vite plugin with `vite dev`, HMR and module serving may expose source files, file paths, or project structure over the tunnel. If you only need to share a built preview, prefer `vite preview` for public sharing.
* Local dev-related routes, such as `/cdn-cgi/*`, remain restricted and are not exposed over the tunnel.
* If you need a stable hostname or stricter access control, use a named tunnel protected by Cloudflare Access.

## Related docs

* [Cloudflare Tunnel](https://developers.cloudflare.com/tunnel/)

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/development-testing/","name":"Development & testing"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/development-testing/local-dev-tunnels/","name":"Share a local dev server"}}]}
```
