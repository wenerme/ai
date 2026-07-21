---
description: Convert documents to Markdown using the Workers AI binding and toMarkdown method.
title: Workers Binding
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers-ai/llms.txt
> Use this file to discover all available pages before exploring further.

#  Workers Binding

Last updated Jul 13, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/workers-ai/features/markdown-conversion/usage/binding/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

Cloudflare’s serverless platform allows you to run code at the edge to build full-stack applications with [Workers](https://developers.cloudflare.com/workers/). A [binding](https://developers.cloudflare.com/workers/runtime-apis/bindings/) enables your Worker or Pages Function to interact with resources on the Cloudflare Developer Platform.

To use our Markdown Conversion service directly from your Workers, create an AI binding either in the Cloudflare dashboard (refer to [AI bindings](https://developers.cloudflare.com/pages/functions/bindings/#workers-ai) for instructions), or you can update your [Wrangler file](https://developers.cloudflare.com/workers/wrangler/configuration/). Add the following to your Wrangler file:

```jsonc
{
  "$schema": "./node_modules/wrangler/config-schema.json",
  "ai": {
    "binding": "AI"
  }
}
```

```toml
[ai]
binding = "AI" # i.e. available in your Worker on env.AI
```

## Examples

### Converting files

In this example, we fetch a PDF document and an image from R2 and feed them both to `env.AI.toMarkdown`. The result is a list of converted documents. Workers AI models are used automatically to detect and summarize the image.

```js
import { Env } from "./env";

export default {
	async fetch(request, env, ctx) {
		// https://pub-979cb28270cc461d94bc8a169d8f389d.r2.dev/somatosensory.pdf
		const pdf = await env.R2.get("somatosensory.pdf");

		// https://pub-979cb28270cc461d94bc8a169d8f389d.r2.dev/cat.jpeg
		const cat = await env.R2.get("cat.jpeg");

		return Response.json(
			await env.AI.toMarkdown([
				{
					name: "somatosensory.pdf",
					blob: new Blob([await pdf.arrayBuffer()], {
						type: "application/pdf",
					}),
				},
				{
					name: "cat.jpeg",
					blob: new Blob([await cat.arrayBuffer()], {
						type: "image/jpeg",
					}),
				},
			]),
		);
	},
};
```

```typescript
import { Env } from "./env";

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext) {
		// https://pub-979cb28270cc461d94bc8a169d8f389d.r2.dev/somatosensory.pdf
		const pdf = await env.R2.get("somatosensory.pdf");

		// https://pub-979cb28270cc461d94bc8a169d8f389d.r2.dev/cat.jpeg
		const cat = await env.R2.get("cat.jpeg");

		return Response.json(
			await env.AI.toMarkdown([
				{
					name: "somatosensory.pdf",
					blob: new Blob([await pdf.arrayBuffer()], {
						type: "application/pdf",
					}),
				},
				{
					name: "cat.jpeg",
					blob: new Blob([await cat.arrayBuffer()], {
						type: "image/jpeg",
					}),
				},
			]),
		);
	},
};
```

### Getting supported file formats

```js
import { Env } from "./env";

export default {
	async fetch(request, env, ctx) {
		return Response.json(await env.AI.toMarkdown().supported());
	},
};
```

```typescript
import { Env } from "./env";

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext) {
		return Response.json(await env.AI.toMarkdown().supported());
	},
};
```

## Methods

### async env.AI.toMarkdown()

Takes a document or list of documents in different formats and converts them to Markdown.

```js
const result = await env.AI.toMarkdown({
	name: "document.pdf",
	blob: new Blob([documentBuffer]),
});
```

```typescript
const result = await env.AI.toMarkdown({
	name: "document.pdf",
	blob: new Blob([documentBuffer]),
});
```

#### Parameter

* `files`: ` MarkdownDocument | MarkdownDocument[] `\- an instance of or an array of `MarkdownDocument`s.
* `conversionOptions`: ` ConversionOptions `\- options that control how conversion happens. See [Conversion Options](https://developers.cloudflare.com/workers-ai/features/markdown-conversion/conversion-options/) for further details.

#### Return values

* `results`: ` Promise<ConversionResult | ConversionResult[]> `\- An instance of or an array of `ConversionResult`s.

#### `MarkdownDocument` definition

* `name` ` string `

  * Name of the document to convert.
* `blob` ` Blob `

  * A new [Blob ↗](https://developer.mozilla.org/en-US/docs/Web/API/Blob/Blob) object with the document content.

#### `ConversionResult` definition

* `id` ` string `

  * ID associated to this object.
* `name` ` string `

  * Name of the converted document. Matches the input name.
* `format` ` 'markdown' | 'text' | 'error' `

  * The format of this `ConversionResult` object. Equals `text` when you set the [output.format](https://developers.cloudflare.com/workers-ai/features/markdown-conversion/conversion-options/#output) option to `text`.
* `mimetype` ` string `

  * The detected [mime type ↗](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/MIME%5Ftypes/Common%5Ftypes) of the document.
* `tokens` ` number `

  * The estimated number of tokens of the converted document. Not present if `format` is equal to `error`.
* `data` ` string `

  * The content of the converted document. Not present if `format` is equal to `error`.
* `error` ` string `

  * The error message explaining why this conversion failed. Only present if `format` is equal to `error`.

### async env.AI.toMarkdown().transform()

This method is similar to `env.AI.toMarkdown` except that it is exposed through a new handle. It takes the same arguments and returns the same values.

```js
const result = await env.AI.toMarkdown().transform({
	name: "document.pdf",
	blob: new Blob([documentBuffer]),
});
```

```typescript
const result = await env.AI.toMarkdown().transform({
	name: "document.pdf",
	blob: new Blob([documentBuffer]),
});
```

### async env.AI.toMarkdown().supported()

Returns a list of file formats that are currently supported for markdown conversion. See [Supported formats](https://developers.cloudflare.com/workers-ai/features/markdown-conversion/supported-formats/) for the full list of file formats that can be converted into Markdown.

```js
const formats = await env.AI.toMarkdown().supported();
```

```typescript
const formats = await env.AI.toMarkdown().supported();
```

#### Return values

* `results`: ` SupportedFormat[] `\- An array of all formats supported for markdown conversion.

#### `SupportedFormat` definition

* `extension` ` string `

  * Extension of files in this format.
* `mimeType` ` string `

  * The [mime type ↗](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/MIME%5Ftypes/Common%5Ftypes) of files of this format

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers-ai/features/markdown-conversion/usage/binding/#page","headline":"Workers Binding · Cloudflare Workers AI docs","description":"Convert documents to Markdown using the Workers AI binding and toMarkdown method.","url":"https://developers.cloudflare.com/workers-ai/features/markdown-conversion/usage/binding/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-07-13","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
