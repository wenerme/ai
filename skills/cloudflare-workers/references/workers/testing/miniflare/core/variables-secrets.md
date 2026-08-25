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

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/testing/miniflare/core/variables-secrets/#page","headline":"Variables and Secrets · Cloudflare Workers docs","description":"Variables and secrets are bound as follows:","url":"https://developers.cloudflare.com/workers/testing/miniflare/core/variables-secrets/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-01-28","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
