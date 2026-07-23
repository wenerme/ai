---
description: Use the Images binding to optimize, resize, and manipulate images directly in a Worker from any source.
title: Optimize with Workers
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/images/llms.txt
> Use this file to discover all available pages before exploring further.

# Optimize with Workers

Last updated Jul 8, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/images/optimization/binding/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

A [binding](https://developers.cloudflare.com/workers/runtime-apis/bindings/) connects your [Worker](https://developers.cloudflare.com/workers/) to external resources on the Developer Platform, like [Images](https://developers.cloudflare.com/images/), [R2 buckets](https://developers.cloudflare.com/r2/buckets/), or [KV namespaces](https://developers.cloudflare.com/kv/concepts/kv-namespaces/).

The Images binding lets you optimize and manipulate images directly in a Worker. Unlike the [URL interface](https://developers.cloudflare.com/images/optimization/transformations/overview/), which requires images to be accessible through a URL, the binding works with raw image bytes. You can pass images from any source, including [Images](https://developers.cloudflare.com/images/storage/upload-images/methods/), [R2](https://developers.cloudflare.com/r2/), a `fetch()` response, or a request body.

With the Images binding, you can:

* Optimize an image stored in Images or R2 by passing the bytes directly, instead of fetching through a public URL.
* Resize an image, overlay a watermark, then resize the combined output into a final result — all in a single chain of operations.
* Control the order of operations for optimization parameters. When you use the URL interface, the optimization parameters follow a fixed order of operations.

Bindings can be configured in the Cloudflare dashboard for your Worker or in the Wrangler configuration file in your project's directory.

Billing

Calls to the Images binding are billed as [unique transformations](https://developers.cloudflare.com/images/pricing/#images-transformed): each unique combination of source image and parameters is billed only once per calendar month, and repeat requests within the same month do not incur additional usage. Calls to [.info()](#infostream) are free.

Refer to [Images pricing](https://developers.cloudflare.com/images/pricing/) for more information about billing.

## Setup

The Images binding is enabled on a per-Worker basis.

You can define variables in the Wrangler configuration file of your Worker project's directory. These variables are bound to external resources at runtime, and you can then interact with them through this variable.

To bind Images to your Worker, add the following to the end of your Wrangler configuration file:

```jsonc
{
	"images": {
		"binding": "IMAGES", // i.e. available in your Worker on env.IMAGES
	},
}
```

```toml
[images]
binding = "IMAGES"
```

Within your Worker code, use `env.IMAGES.input()` to build an object that can manipulate the image (passed as a `ReadableStream`).

## Methods

Enable caching

Responses from the Images binding are not automatically cached. Every uncached call performs a full decode and re-encode of the source image, which adds unnecessary latency to every request.

We strongly recommend enabling [Workers Cache](https://developers.cloudflare.com/workers/cache/) so that repeat requests are served from cache without re-running your Worker or re-transforming the image. Add the following to your Wrangler configuration file:

```jsonc
{
	"cache": {
		"enabled": true,
	},
}
```

```toml
[cache]
enabled = true
```

Then set `Cache-Control` headers on your response to control how long transformed images are cached:

```js
const response = (
	await env.IMAGES.input(stream)
		.transform({ width: 800 })
		.output({ format: "image/webp" })
).response();

return new Response(response.body, {
	headers: {
		...Object.fromEntries(response.headers),
		"Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
	},
});
```

```ts
const response = (
	await env.IMAGES.input(stream)
		.transform({ width: 800 })
		.output({ format: "image/webp" })
).response();

return new Response(response.body, {
	headers: {
		...Object.fromEntries(response.headers),
		"Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
	},
});
```

### `.input(stream)`

Creates an optimization handle for an image. All operations begin with this method. Accepts image bytes up to 20 MB from any source, including [Images](https://developers.cloudflare.com/images/storage/upload-images/methods/), [R2](https://developers.cloudflare.com/r2/), a `fetch()` response, or a request body.

Returns a handle that you can use to chain `.transform()`, `.draw()`, and `.output()` calls.

```js
export default {
	async fetch(request, env) {
		const imageURL = "https://example.com/photo.jpg";

		const response = await fetch(imageURL);

		return (
			await env.IMAGES.input(response.body)
				.transform({ width: 800 })
				.output({ format: "image/webp" })
		).response();
	},
};
```

```ts
export default {
	async fetch(request, env) {
		const imageURL = "https://example.com/photo.jpg";

		const response = await fetch(imageURL);

		return (
			await env.IMAGES
				.input(response.body)
				.transform({ width: 800 })
				.output({ format: "image/webp" })
		).response();
	},
};
```

### `.transform(options)`

Applies optimization parameters to the image, such as `width`, `height`, or `blur`. You can chain multiple `.transform()` calls to control the order that parameters will be applied.

For the full list of parameters, refer to [Features](https://developers.cloudflare.com/images/optimization/features/).

The example below shows how you can resize an image that is [stored in Images](https://developers.cloudflare.com/images/storage/binding/) by getting the image bytes:

```js
// Get the raw bytes of a hosted image
const bytes = await env.IMAGES.hosted.image("IMAGE_ID").bytes();

// Resize and transcode the image
const response = (
	await env.IMAGES.input(bytes)
		.transform({ width: 400 })
		.output({ format: "image/webp" })
).response();

return response;
```

```ts
// Get the raw bytes of a hosted image
const bytes = await env.IMAGES.hosted.image("IMAGE_ID").bytes();

// Resize and transcode the image
const response = (
  await env.IMAGES.input(bytes)
    .transform({ width: 400 })
    .output({ format: "image/webp" })
).response();

return response;
```

### `.draw(image, options)`

Draws an overlay image over another image.

The overlay can be a stream of image bytes or another `.input()` chain. You can pass a child `.transform()` function inside this method to resize or manipulate the overlay before drawing it.

Accepts `opacity`, `repeat`, a side (`left`, `right`, `top`, `bottom`), and `composite`. For the full list of draw options and examples, refer to [Draw overlays and watermarks](https://developers.cloudflare.com/images/optimization/draw-overlays/#options).

### `.output(options)`

Generates the final image with the specified output options.

Accepts the following options:

* `format` — Encodes the image in [a supported format](https://developers.cloudflare.com/images/get-started/limits/#output-formats), such as AVIF, WebP, or JPEG. This method is required — there is no default output format.
* `quality` — Specifies the output [quality](https://developers.cloudflare.com/images/optimization/features/#quality--q) of an image for JPEG, WebP, and AVIF formats, expressed as a fixed value or perceptual quality level.
* `anim` — Specifies whether to [preserve animation frames](https://developers.cloudflare.com/images/optimization/features/#anim) from input files. Set `anim:false` to convert animations to still images.

```js
const response = (
	await env.IMAGES.input(stream)
		.transform({ rotate: 90 })
		.transform({ width: 128 })
		.transform({ blur: 20 })
		.output({ format: "image/avif" })
).response();

return response;
```

```ts
const response = (
	await env.IMAGES.input(stream)
		.transform({ rotate: 90 })
		.transform({ width: 128 })
		.transform({ blur: 20 })
		.output({ format: "image/avif" })
).response();

return response;
```

### `.info(stream)`

Outputs information about the image, such as `format`, `fileSize`, `width`, and `height`.

## Interact with your Images binding locally

The Images API can be used in local development through [Wrangler](https://developers.cloudflare.com/workers/wrangler/install-and-update/), the command-line interface for Workers. Using the Images binding in local development will not incur usage charges.

Wrangler supports two different versions of the Images API:

* A high-fidelity version that supports all features that are available through the Images API. This is the same version that Cloudflare runs globally in production.
* A low-fidelity offline version that supports only a subset of features, such as resizing and rotation.

To test the low-fidelity version of Images, you can run `wrangler dev`:

```txt
npx wrangler dev
```

Currently, this version supports only `width`, `height`, `rotate`, and `format`.

To test the high-fidelity remote version of Images, you can use the `--remote` flag:

```txt
npx wrangler dev --remote
```

When testing with the [Workers Vitest integration](https://developers.cloudflare.com/workers/testing/vitest-integration/), the low-fidelity offline version is used by default, to avoid hitting the Cloudflare API in tests.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/images/optimization/binding/#page","headline":"Optimize with Workers · Cloudflare Images docs","description":"Use the Images binding to optimize, resize, and manipulate images directly in a Worker from any source.","url":"https://developers.cloudflare.com/images/optimization/binding/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-07-08","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
