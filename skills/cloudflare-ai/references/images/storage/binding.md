---
description: Use the Images binding to upload, list, retrieve, update, and delete hosted images from a Worker.
title: Manage hosted images with Workers
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/images/llms.txt
> Use this file to discover all available pages before exploring further.

# Manage hosted images with Workers

Last updated Sep 2, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/images/storage/binding/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

A [binding](https://developers.cloudflare.com/workers/runtime-apis/bindings/) connects your [Worker](https://developers.cloudflare.com/workers/) to external resources on the Developer Platform, like [Images](https://developers.cloudflare.com/images/), [R2 buckets](https://developers.cloudflare.com/r2/buckets/), or [KV namespaces](https://developers.cloudflare.com/kv/concepts/kv-namespaces/).

When managing hosted images, the Images binding lets your Worker upload, list, retrieve, update, and delete hosted images without calling the REST API directly. The `hosted` namespace exposes storage and management operations. This binding can also be used to [optimize hosted images](https://developers.cloudflare.com/images/optimization/binding/).

Bindings can be configured in the Cloudflare dashboard for your Worker or in the Wrangler configuration file in your project's directory.

Billing

Hosted image operations require a [paid Images plan with storage](https://developers.cloudflare.com/images/pricing/#images-paid). Calls count against your storage allowances in the same way as if you had used the REST API or the dashboard.

## Setup

To bind Images to your Worker, add the following to your Wrangler configuration file:

```jsonc
{
	"images": {
		"binding": "IMAGES", // available in your Worker on env.IMAGES
	},
}
```

```toml
[images]
binding = "IMAGES"
```

Within your Worker code, you can manage hosted images using the `env.IMAGES.hosted` namespace.

## Methods

The `env.IMAGES.hosted` namespace lets you upload and list images across your account. To manage a specific image, call `.image(imageId)` to get a handle, then call a method on it.

### `.upload(image, options)`

Uploads a new image to your account. You can pass image bytes as a stream or an `ArrayBuffer`. Returns [ImageMetadata](#imagemetadata).

Accepts the following options as an `ImageUploadOptions` object:

* `id` `string` — A custom ID to assign to the image. If omitted, Cloudflare generates a UUID. Refer to [Upload to a custom path](https://developers.cloudflare.com/images/storage/upload-images/upload-custom-path/).
* `filename` `string` — The filename to associate with the image.
* `requireSignedURLs` `boolean` — Sets whether the image should require a signed URL to view. Defaults to `false`.
* `metadata` `Record<string, unknown>` — Arbitrary metadata to store alongside the image.
* `creator` `string` — A user-defined identifier for the image creator.
* `encoding` `'base64'` — Set to `base64` if the provided bytes are base64-encoded. The binding will decode them before upload.

### `.createDirectUpload(options)`

Creates a [Direct Creator Upload](https://developers.cloudflare.com/images/storage/upload-images/direct-creator-upload/) URL that a client can upload an image to directly without exposing an API token. Returns [DirectUploadResult](#directuploadresult).

Accepts the following options as a `DirectUploadOptions` object:

* `id` `string` optional — A custom ID to assign to the image. If omitted, then Cloudflare automatically generates a UUID. Refer to [Upload to a custom path](https://developers.cloudflare.com/images/storage/upload-images/upload-custom-path/).
* `metadata` `Record<string, unknown>` optional — Arbitrary metadata to store alongside the image once it is uploaded.
* `requireSignedURLs` `boolean` optional — Sets whether the uploaded image should require a signed URL to view. Defaults to `false`.
* `creator` `string` optional — A user-defined identifier for the image creator.
* `expiresIn` `number` optional — How long the upload URL stays valid, in seconds. Must be between `120` and `21600`. Defaults to `1800`.

### `.list(options)`

Lists images in your account with pagination. Returns [ImageList](#imagelist).

Accepts the following options as an `ImageListOptions` object:

* `limit` `number` — The maximum number of images to return in a page.
* `cursor` `string` — The continuation token returned by the previous `list()` call. Omit on the first page.
* `sortOrder` `'asc' | 'desc'` — The order to sort results in by `uploaded` timestamp. Defaults to `asc`.
* `creator` `string` — Filter results to images uploaded with this creator identifier.
* `filter` `ImageListFilter` — Filter results by image properties. Accepts a `metadata` field to filter by custom metadata.

#### Filter by custom metadata

When you list images, you can pass `filter.metadata` to `.list()` to return images by their custom metadata fields.

Each entry in `filter.metadata` is a metadata field name, and its value sets the conditions that the field must meet. When you pass more than one entry, an image must match all of them to be returned.

Field names may contain only letters, numbers, underscores, and dots. If a metadata field name contains other characters, such as hyphens or spaces, then you cannot filter on it.

To filter on a nested field, separate the levels with dot notation, for example, `{ "config.region": "eu-west" }` matches `{ config: { region: "eu-west" } }`. Field paths can be up to five levels deep.

Accepts the following operators as an `ImageMetadataFilterOperators` object:

* `eq` `string | number | boolean` — Matches a field exactly.
* `in` `Array<string> | Array<number>` — Matches a field against any value in an array. An array accepts up to 10 values, and a string value cannot contain the pipe character (`|`).
* `gt` `number` — Matches a field that is greater than the value.
* `gte` `number` — Matches a field that is greater than or equal to the value.
* `lt` `number` — Matches a field that is less than the value.
* `lte` `number` — Matches a field that is less than or equal to the value.

A plain value is shorthand for an exact match, so `{ status: "active" }` is equivalent to `{ status: { eq: "active" } }`.

If an entry has multiple conditions, then an image must match every condition to be returned. To match a range, combine two operators on the same entry. For example, `{ priority: { gte: 2, lte: 5 } }` returns images with a `priority` from 2 to 5.

A single call accepts up to five conditions. Each operator counts as one condition, so a bounded range such as `{ priority: { gte: 2, lte: 5 } }` uses two.

A request that references an unsupported field name, uses an unsupported operator, or exceeds five conditions fails rather than returning unfiltered results.

```js
export default {
	async fetch(request, env) {
		const { images } = await env.IMAGES.hosted.list({
			filter: {
				metadata: {
					status: "active",
					priority: { gte: 2, lte: 5 },
				},
			},
		});

		return Response.json(images.map((image) => image.id));
	},
};
```

```ts
export default {
	async fetch(request, env) {
		const { images } = await env.IMAGES.hosted.list({
			filter: {
				metadata: {
					status: "active",
					priority: { gte: 2, lte: 5 },
				},
			},
		});

		return Response.json(images.map((image) => image.id));
	},
};
```

### `.image(imageId)`

Returns a handle for a single hosted image. The `imageId` can be the Cloudflare-generated UUID or a [custom ID](https://developers.cloudflare.com/images/storage/upload-images/upload-custom-path/).

The handle itself does not make a network request, so it is cheap to construct.

### `.image(imageId).details()`

Gets the metadata for an image. Returns [ImageMetadata](#imagemetadata) or `null` if no image with the given ID exists.

### `.image(imageId).bytes()`

Gets the raw bytes of an image. Returns `ReadableStream<Uint8Array>` or `null` if no image with the given ID exists. This streams the original uploaded file. Pass the image bytes to [.input()](https://developers.cloudflare.com/images/optimization/binding/) to optimize before serving, or use the URLs returned in [ImageMetadata.variants](#imagemetadata) or the [image delivery URL](https://developers.cloudflare.com/images/optimization/hosted-images/serve-uploaded-images/) to serve a predefined variant.

### `.image(imageId).update(options)`

Updates the metadata or access controls for an image. All fields are optional; only the specified fields will be changed. Returns [ImageMetadata](#imagemetadata) with the updated values.

Accepts the following options as an `ImageUpdateOptions` object:

* `requireSignedURLs` `boolean` — Whether signed URLs should be required to view the image. Cannot be set to `true` on an image that was uploaded with a [custom ID](https://developers.cloudflare.com/images/storage/upload-images/upload-custom-path/).
* `metadata` `Record<string, unknown>` — Replacement metadata for the image. This replaces the existing metadata rather than merging into it.
* `creator` `string` — A user-defined identifier for the image creator.

### `.image(imageId).delete()`

Deletes an image. Returns `true` if the image was deleted or `false` if no image with the given ID existed.

### `.image(imageId).signedUrl(options)`

Generates a signed [image delivery URL](https://developers.cloudflare.com/images/optimization/hosted-images/serve-private-images/) for an image that [requires signed URLs](https://developers.cloudflare.com/images/optimization/hosted-images/serve-private-images/). Returns a `string`.

Returning a signed URL lets a browser fetch a private image directly without proxying the bytes through your Worker. The URL is signed on the Cloudflare side, so your Worker never handles the account signing key.

Accepts the following options as an `ImageSignedUrlOptions` object:

* `variant` `string` — The [variant](https://developers.cloudflare.com/images/optimization/hosted-images/create-variants/) to serve.
* `expiresIn` `number` optional — How long the URL stays valid, in seconds. If omitted, then the URL does not expire.
* `keyName` `string` optional — The name of the [signing key](https://developers.cloudflare.com/images/optimization/hosted-images/serve-private-images/) to use. Defaults to `default`.

## Examples

### Upload an image from a request body

```js
export default {
	async fetch(request, env) {
		if (!request.body) {
			return new Response("Missing body", { status: 400 });
		}

		const image = await env.IMAGES.hosted.upload(request.body, {
			filename: "upload.jpg",
			metadata: { source: "worker" },
			requireSignedURLs: false,
		});

		return Response.json(image);
	},
};
```

```ts
export default {
	async fetch(request, env) {
		if (!request.body) {
			return new Response("Missing body", { status: 400 });
		}

		const image = await env.IMAGES.hosted.upload(request.body, {
			filename: "upload.jpg",
			metadata: { source: "worker" },
			requireSignedURLs: false,
		});

		return Response.json(image);
	},
};
```

### Upload a base64-encoded image

Set `encoding: "base64"` and the binding will decode the body for you before uploading.

```js
export default {
	async fetch(request, env) {
		if (!request.body) {
			return new Response("Missing body", { status: 400 });
		}

		const image = await env.IMAGES.hosted.upload(request.body, {
			encoding: "base64",
			filename: "upload.png",
		});

		return Response.json(image);
	},
};
```

```ts
export default {
	async fetch(request, env) {
		if (!request.body) {
			return new Response("Missing body", { status: 400 });
		}

		const image = await env.IMAGES.hosted.upload(request.body, {
			encoding: "base64",
			filename: "upload.png",
		});

		return Response.json(image);
	},
};
```

### List images with pagination

```js
export default {
	async fetch(request, env) {
		let cursor;
		const ids = [];

		do {
			const page = await env.IMAGES.hosted.list({ limit: 100, cursor });
			ids.push(...page.images.map((image) => image.id));
			cursor = page.cursor;
		} while (cursor);

		return Response.json({ count: ids.length, ids });
	},
};
```

```ts
export default {
	async fetch(request, env) {
		let cursor: string | undefined;
		const ids: string[] = [];

		do {
			const page = await env.IMAGES.hosted.list({ limit: 100, cursor });
			ids.push(...page.images.map((image) => image.id));
			cursor = page.cursor;
		} while (cursor);

		return Response.json({ count: ids.length, ids });
	},
};
```

### Get the details for a single image

```js
export default {
	async fetch(request, env) {
		const details = await env.IMAGES.hosted.image("IMAGE_ID").details();
		if (!details) {
			return new Response("Not found", { status: 404 });
		}
		return Response.json(details);
	},
};
```

```ts
export default {
	async fetch(request, env) {
		const details = await env.IMAGES.hosted.image("IMAGE_ID").details();
		if (!details) {
			return new Response("Not found", { status: 404 });
		}
		return Response.json(details);
	},
};
```

### Stream the original bytes for an image

```js
export default {
	async fetch(request, env) {
		const bytes = await env.IMAGES.hosted.image("IMAGE_ID").bytes();
		if (!bytes) {
			return new Response("Not found", { status: 404 });
		}
		return new Response(bytes);
	},
};
```

```ts
export default {
	async fetch(request, env) {
		const bytes = await env.IMAGES.hosted.image("IMAGE_ID").bytes();
		if (!bytes) {
			return new Response("Not found", { status: 404 });
		}
		return new Response(bytes);
	},
};
```

### Update image metadata

```js
export default {
	async fetch(request, env) {
		const updated = await env.IMAGES.hosted.image("IMAGE_ID").update({
			metadata: { reviewed: true },
		});
		return Response.json(updated);
	},
};
```

```ts
export default {
	async fetch(request, env) {
		const updated = await env.IMAGES.hosted.image("IMAGE_ID").update({
			metadata: { reviewed: true },
		});
		return Response.json(updated);
	},
};
```

### Delete an image

```js
export default {
	async fetch(request, env) {
		const deleted = await env.IMAGES.hosted.image("IMAGE_ID").delete();
		return new Response(deleted ? "Deleted" : "Not found", {
			status: deleted ? 200 : 404,
		});
	},
};
```

```ts
export default {
	async fetch(request, env) {
		const deleted = await env.IMAGES.hosted.image("IMAGE_ID").delete();
		return new Response(deleted ? "Deleted" : "Not found", {
			status: deleted ? 200 : 404,
		});
	},
};
```

### Generate a signed URL for a private image

Redirect the browser to a short-lived signed URL so it can fetch a private image directly without streaming the bytes through your Worker.

```js
export default {
	async fetch(request, env) {
		const url = await env.IMAGES.hosted.image("IMAGE_ID").signedUrl({
			variant: "private",
			expiresIn: 86_400,
		});

		return Response.redirect(url, 302);
	},
};
```

```ts
export default {
	async fetch(request, env) {
		const url = await env.IMAGES.hosted.image("IMAGE_ID").signedUrl({
			variant: "private",
			expiresIn: 86_400,
		});

		return Response.redirect(url, 302);
	},
};
```

### Create a Direct Creator Upload URL

Create a one-time upload URL and return it to a client, which can then upload an image straight to Cloudflare without your Worker handling the bytes or an API token.

```js
export default {
	async fetch(request, env) {
		const { id, uploadURL } = await env.IMAGES.hosted.createDirectUpload({
			metadata: { userId: "abc123" },
			requireSignedURLs: true,
			expiresIn: 600,
		});

		return Response.json({ id, uploadURL });
	},
};
```

```ts
export default {
	async fetch(request, env) {
		const { id, uploadURL } = await env.IMAGES.hosted.createDirectUpload({
			metadata: { userId: "abc123" },
			requireSignedURLs: true,
			expiresIn: 600,
		});

		return Response.json({ id, uploadURL });
	},
};
```

### Ingest a remote image into Images storage

This example fetches an image from a remote URL, uploads it into your Images account, and returns the first variant URL.

```js
export default {
	async fetch(request, env) {
		const upstream = await fetch("https://example.com/photo.jpg");
		if (!upstream.ok || !upstream.body) {
			return new Response("Upstream fetch failed", { status: 502 });
		}

		const image = await env.IMAGES.hosted.upload(upstream.body, {
			filename: "photo.jpg",
			metadata: { source: "example.com" },
		});

		return Response.json({
			id: image.id,
			variant: image.variants[0],
		});
	},
};
```

```ts
export default {
	async fetch(request, env) {
		const upstream = await fetch("https://example.com/photo.jpg");
		if (!upstream.ok || !upstream.body) {
			return new Response("Upstream fetch failed", { status: 502 });
		}

		const image = await env.IMAGES.hosted.upload(upstream.body, {
			filename: "photo.jpg",
			metadata: { source: "example.com" },
		});

		return Response.json({
			id: image.id,
			variant: image.variants[0],
		});
	},
};
```

## Type definitions

### ImageMetadata

Returned by operations that retrieve, create, or update an image.

* `id` `string`
  * The unique identifier for the image.
* `filename` `string` optional
  * The original filename supplied at upload time.
* `uploaded` `string` optional
  * The date and time the image was uploaded, as an ISO 8601 string.
* `requireSignedURLs` `boolean`
  * Whether signed URLs are required to access this image. Refer to [Serve private images](https://developers.cloudflare.com/images/optimization/hosted-images/serve-private-images/).
* `meta` `Record<string, unknown>` optional
  * User-supplied metadata associated with the image.
* `variants` `Array<string>`
  * Fully-formed URLs for each variant configured on your account. Refer to [Create variants](https://developers.cloudflare.com/images/optimization/hosted-images/create-variants/).
* `draft` `boolean` optional
  * Whether the image is in a draft state (no bytes uploaded yet). Drafts are typically only seen on accounts using [Direct Creator Uploads](https://developers.cloudflare.com/images/storage/upload-images/direct-creator-upload/).
* `creator` `string` optional
  * A user-defined identifier for the image creator.

### ImageList

Returned by [list()](#listoptions).

* `images` `Array<ImageMetadata>`
  * The images in this page of results.
* `cursor` `string` optional
  * A continuation token to pass to the next `list()` call. Only present when there are more results.
* `listComplete` `boolean`
  * `true` when there are no further pages, `false` otherwise.

### DirectUploadResult

Returned by [createDirectUpload()](#createdirectuploadoptions).

* `id` `string`
  * The ID that the uploaded image will have.
* `uploadURL` `string`
  * The one-time URL that a client uploads the image bytes to.

## Error handling

Methods that fail throw an `ImagesError` — `.upload()`, `.list()`, `.createDirectUpload()`, `.update()`, and `.signedUrl()` — with the following properties:

* `code` `number`
  * A numeric error code that identifies the failure mode.
* `message` `string`
  * A human-readable description of the error.

Methods that fetch a single image — [.details()](#imageimageiddetails), [.bytes()](#imageimageidbytes), and [.delete()](#imageimageiddelete) — return `null` or `false` for "not found" rather than throwing.

You may want to wrap operations that can throw in a `try...catch` block.

## Local development

When you run `wrangler dev`, operations for managing hosted images are served by a local mock that stores images in an embedded KV namespace. The mock supports every method documented on this page, so you can develop and test your Worker offline.

The mock is only suitable for local development. To exercise the real Images service from your local environment, run `wrangler dev --remote`.

## Related resources

* [Optimize with Workers](https://developers.cloudflare.com/images/optimization/binding/) — Use the binding to optimize images from a Worker.
* [Upload via the REST API](https://developers.cloudflare.com/images/storage/upload-images/methods/) — The equivalent HTTP API.
* [Manage hosted images](https://developers.cloudflare.com/images/storage/manage-images/) — Dashboard and API workflows for managing stored images.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/images/storage/binding/#page","headline":"Manage hosted images with Workers · Cloudflare Images docs","description":"Use the Images binding to upload, list, retrieve, update, and delete hosted images from a Worker.","url":"https://developers.cloudflare.com/images/storage/binding/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-09-02","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
