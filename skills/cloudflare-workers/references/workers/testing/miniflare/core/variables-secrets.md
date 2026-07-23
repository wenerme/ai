---
description: Variables and secrets are bound as follows:
title: Variables and Secrets
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt
> Use this file to discover all available pages before exploring further.

# Variables and Secrets

Last updated Jan 28, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/workers/testing/miniflare/core/variables-secrets/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

## Bindings

Variables and secrets are bound as follows:

```js
const mf = new Miniflare({
	bindings: {
		KEY1: "value1",
		KEY2: "value2",
	},
});
```

## Text and Data Blobs

Text and data blobs can be loaded from files. File contents will be read and bound as `string`s and `ArrayBuffer`s respectively.

```js
const mf = new Miniflare({
	textBlobBindings: { TEXT: "text.txt" },
	dataBlobBindings: { DATA: "data.bin" },
});
```

## Globals

Injecting arbitrary globals is not supported by [workerd ↗](https://github.com/cloudflare/workerd). If you're using a service Worker, bindings will be injected as globals, but these must be JSON-serializable.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/testing/miniflare/core/variables-secrets/#page","headline":"Variables and Secrets · Cloudflare Workers docs","description":"Variables and secrets are bound as follows:","url":"https://developers.cloudflare.com/workers/testing/miniflare/core/variables-secrets/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-01-28","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
