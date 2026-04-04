---
title: Wrangler
description: Use Wrangler, a command-line tool, to deploy projects using Cloudflare's Workers Browser Rendering API.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/browser-rendering/reference/wrangler.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Wrangler

[Wrangler](https://developers.cloudflare.com/workers/wrangler/) is a command-line tool for building with Cloudflare developer products.

Use Wrangler to deploy projects that use the Workers Browser Rendering API.

## Install

To install Wrangler, refer to [Install and Update Wrangler](https://developers.cloudflare.com/workers/wrangler/install-and-update/).

## Bindings

[Bindings](https://developers.cloudflare.com/workers/runtime-apis/bindings/) allow your Workers to interact with resources on the Cloudflare developer platform. A browser binding will provide your Worker with an authenticated endpoint to interact with a dedicated Chromium browser instance.

To deploy a Browser Rendering Worker, you must declare a [browser binding](https://developers.cloudflare.com/workers/runtime-apis/bindings/) in your Worker's Wrangler configuration file.

Note

To enable built-in Node.js APIs and polyfills, add the nodejs\_compat compatibility flag to your [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/). This also enables nodejs\_compat\_v2 as long as your compatibility date is 2024-09-23 or later. [Learn more about the Node.js compatibility flag and v2](https://developers.cloudflare.com/workers/configuration/compatibility-flags/#nodejs-compatibility-flag).

* [  wrangler.jsonc ](#tab-panel-3256)
* [  wrangler.toml ](#tab-panel-3257)

JSONC

```

{

  "$schema": "./node_modules/wrangler/config-schema.json",

  // Top-level configuration

  "name": "browser-rendering",

  "main": "src/index.ts",

  "workers_dev": true,

  "compatibility_flags": [

    "nodejs_compat_v2"

  ],

  "browser": {

    "binding": "MYBROWSER"

  }

}


```

TOML

```

"$schema" = "./node_modules/wrangler/config-schema.json"

name = "browser-rendering"

main = "src/index.ts"

workers_dev = true

compatibility_flags = [ "nodejs_compat_v2" ]


[browser]

binding = "MYBROWSER"


```

After the binding is declared, access the DevTools endpoint using `env.MYBROWSER` in your Worker code:

JavaScript

```

const browser = await puppeteer.launch(env.MYBROWSER);


```

Run `npx wrangler dev` to test your Worker locally.

Use real headless browser during local development

To interact with a real headless browser during local development, set `"remote" : true` in the Browser binding configuration. Learn more in our [remote bindings documentation](https://developers.cloudflare.com/workers/development-testing/#remote-bindings).

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/browser-rendering/","name":"Browser Rendering"}},{"@type":"ListItem","position":3,"item":{"@id":"/browser-rendering/reference/","name":"Reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/browser-rendering/reference/wrangler/","name":"Wrangler"}}]}
```
