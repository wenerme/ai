---
description: Use Wrangler, a command-line tool, to deploy projects using Cloudflare's Workers Browser Run API.
title: Wrangler
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/browser-run/llms.txt
> Use this file to discover all available pages before exploring further.

# Wrangler

Last updated May 30, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/browser-run/reference/wrangler/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

[Wrangler](https://developers.cloudflare.com/workers/wrangler/) is a command-line tool for building with Cloudflare developer products.

Use Wrangler to deploy projects that use the Workers Browser Run API.

## Install

To install Wrangler, refer to [Install and Update Wrangler](https://developers.cloudflare.com/workers/wrangler/install-and-update/).

## Bindings

[Bindings](https://developers.cloudflare.com/workers/runtime-apis/bindings/) allow your Workers to interact with resources on the Cloudflare developer platform. A browser binding will provide your Worker with an authenticated endpoint to interact with a dedicated Chromium browser instance.

To deploy a Browser Run Worker, you must declare a [browser binding](https://developers.cloudflare.com/workers/runtime-apis/bindings/) in your Worker's Wrangler configuration file.

Note

For compatibility dates of `2026-08-04` or later, Workers enables both `nodejs_compat` and `nodejs_compat_v2` by default. These flags are not used for these compatibility dates. Existing projects do not need to remove them when updating their compatibility date. For earlier dates, add `nodejs_compat` to your [Wrangler configuration file](https://developers.cloudflare.com/workers/wrangler/configuration/) to opt in. For instructions to turn off Node.js compatibility, refer to the [Node.js compatibility flag](https://developers.cloudflare.com/workers/configuration/compatibility-flags/#nodejs-compatibility-flag).

```jsonc
{
	"$schema": "./node_modules/wrangler/config-schema.json",
	// Top-level configuration
	"name": "browser-rendering",
	"main": "src/index.ts",
	"workers_dev": true,
	"compatibility_flags": ["nodejs_compat_v2"],
	"browser": {
		"binding": "MYBROWSER",
	},
}
```

```toml
"$schema" = "./node_modules/wrangler/config-schema.json"
name = "browser-rendering"
main = "src/index.ts"
workers_dev = true
compatibility_flags = [ "nodejs_compat_v2" ]

[browser]
binding = "MYBROWSER"
```

After the binding is declared, access the DevTools endpoint using `env.MYBROWSER` in your Worker code:

```javascript
const browser = await puppeteer.launch(env.MYBROWSER);
```

Quick Actions compatibility

The browser binding's `.quickAction()` method requires a compatibility date of `2026-03-24` or later. Ensure your `wrangler.json` includes:

```jsonc
{
  "compatibility_date": "2026-03-24"
}
```

Quick Actions require remote mode for local development

The `.quickAction()` method is not yet supported in local development mode. When using `wrangler dev`, you must run with `--remote` or set `"remote": true` in your browser binding configuration:

```jsonc
{
  "browser": {
    "binding": "MYBROWSER",
    "remote": true
  }
}
```

Without remote mode, calls to `.quickAction()` will fail with: `The RPC receiver does not implement the method "quickAction"`.

For Puppeteer, Playwright, or CDP-based Workers, run `npx wrangler dev` to test locally. For Quick Actions via `.quickAction()`, use `npx wrangler dev --remote` as noted above.

### Headful mode (experimental)

By default, local development runs Chrome in headless mode. To launch Chrome in visible (headful) mode for debugging, set the `X_BROWSER_HEADFUL` environment variable:

```sh
X_BROWSER_HEADFUL=true npx wrangler dev
```

This opens a browser window on screen so you can watch navigations, interactions, and rendering in real time. Headful mode is for local development only and does not affect deployed Workers. This feature is experimental and may change without notice.

Note

When using [@cloudflare/playwright](https://developers.cloudflare.com/browser-run/playwright/), two Chrome windows may appear. This is expected behavior due to how Playwright handles browser contexts via CDP.

Use real headless browser during local development

To interact with a real headless browser during local development, set `"remote" : true` in the Browser binding configuration. Learn more in our [remote bindings documentation](https://developers.cloudflare.com/workers/local-development/#remote-bindings).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/browser-run/reference/wrangler/#page","headline":"Wrangler · Cloudflare Browser Run docs","description":"Use Wrangler, a command-line tool, to deploy projects using Cloudflare's Workers Browser Run API.","url":"https://developers.cloudflare.com/browser-run/reference/wrangler/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-05-30","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
