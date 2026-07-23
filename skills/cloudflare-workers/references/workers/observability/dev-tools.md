---
description: Use Chrome DevTools to debug, profile, and inspect Cloudflare Workers locally.
title: DevTools
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

# DevTools

Last updated Jun 25, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/workers/observability/dev-tools/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

## Using DevTools

When running your Worker locally using the [Wrangler CLI ↗](https://developers.cloudflare.com/workers/wrangler/) (`wrangler dev`) or using [Vite ↗](https://vite.dev/) with the [Cloudflare Vite plugin ↗](https://developers.cloudflare.com/workers/vite-plugin/), you automatically have access to [Cloudflare's implementation ↗](https://github.com/cloudflare/workers-sdk/tree/main/packages/chrome-devtools-patches) of [Chrome DevTools ↗](https://developer.chrome.com/docs/devtools/overview).

You can use Chrome DevTools to:

* View logs directly in the Chrome console
* [Debug code by setting breakpoints](https://developers.cloudflare.com/workers/observability/dev-tools/breakpoints/)
* [Profile CPU usage](https://developers.cloudflare.com/workers/observability/dev-tools/cpu-usage/)
* [Observe memory usage and debug memory leaks in your code that can cause out-of-memory (OOM) errors](https://developers.cloudflare.com/workers/observability/dev-tools/memory-usage/)

## Opening DevTools

### Wrangler

* Run your Worker locally, by running `wrangler dev`
* Press the `D` key from your terminal to open DevTools in a browser tab

### Vite

* Run your Worker locally by running `vite`
* In a new Chrome tab, open the debug URL that shows in your console (for example, `http://localhost:5173/__debug`)

### Dashboard editor & playground

Both the [Cloudflare dashboard ↗](https://dash.cloudflare.com/) and the [Worker's Playground ↗](https://workers.cloudflare.com/playground) include DevTools in the UI.

## Related resources

* [Local development](https://developers.cloudflare.com/workers/local-development/) \- Develop your Workers and connected resources locally via Wrangler and workerd, for a fast, accurate feedback loop.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/observability/dev-tools/#page","headline":"DevTools · Cloudflare Workers docs","description":"Use Chrome DevTools to debug, profile, and inspect Cloudflare Workers locally.","url":"https://developers.cloudflare.com/workers/observability/dev-tools/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-06-25","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
