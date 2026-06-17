---
title: Manage hosted images with Workers
description: Use the Images binding to upload, list, retrieve, update, and delete hosted images from a Worker.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/images/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Manage hosted images with Workers

A [binding](https://developers.cloudflare.com/workers/runtime-apis/bindings/) connects your [Worker](https://developers.cloudflare.com/workers/) to external resources on the Developer Platform, like [Images](https://developers.cloudflare.com/images/), [R2 buckets](https://developers.cloudflare.com/r2/buckets/), or [KV namespaces](https://developers.cloudflare.com/kv/concepts/kv-namespaces/).

When managing hosted images, the Images binding lets your Worker upload, list, retrieve, update, and delete hosted images without calling the REST API directly. The `hosted` namespace exposes storage and management operations. This binding can also be used to [optimize hosted images](https://developers.cloudflare.com/images/optimization/binding/).

Bindings can be configured in the Cloudflare dashboard for your Worker or in the Wrangler configuration file in your project's directory.

Billing

Hosted image operations require a [paid Images plan with storage](https://developers.cloudflare.com/images/pricing/#images-paid). Calls count against your storage allowances in the same way as if you had used the REST API or the dashboard.

## Setup

To bind Images to your Worker, add the following to your Wrangler configuration file:

* [  wrangler.jsonc ](#tab-panel-8903)
* [  wrangler.toml ](#tab-panel-8904)

JSONC

```

{

  "images": {

    "binding": "IMAGES", // available in your Worker on env.IMAGES

  },

}


```

TOML

```

[images]

binding = "IMAGES"


```

Within your Worker code, you can manage hosted images using the `env.IMAGES.hosted` namespace.

## Methods

The `env.IMAGES.hosted` namespace lets you upload and list images across your account. To manage a specific image, call `.image(imageId)` to get a handle, then call a method on it.

### `.upload(image, options)`

Uploads a new image to your account. You can pass image bytes as a stream or an `ArrayBuffer`. Returns [ImageMetadata](#imagemetadata).

Accepts the following options as an `ImageUploadOptions` object:

* `id` ` string ` — A custom ID to assign to the image. If omitted, Cloudflare generates a UUID. Refer to [Upload to a custom path](https://developers.cloudflare.com/images/storage/upload-images/upload-custom-path/).
* `filename` ` string ` — The filename to associate with the image.
* `requireSignedURLs` ` boolean ` — Sets whether the image should require a signed URL to view. Defaults to `false`.
* `metadata` ` Record<string, unknown> ` — Arbitrary metadata to store alongside the image.
* `creator` ` string ` — A user-defined identifier for the image creator.
* `encoding` ` 'base64' ` — Set to `base64` if the provided bytes are base64-encoded. The binding will decode them before upload.

### `.list(options)`

Lists images in your account with pagination. Returns [ImageList](#imagelist).

Accepts the following options as an `ImageListOptions` object:

* `limit` ` number ` — The maximum number of images to return in a page.
* `cursor` ` string ` — The continuation token returned by the previous `list()` call. Omit on the first page.
* `sortOrder` ` 'asc' | 'desc' ` — The order to sort results in by `uploaded` timestamp. Defaults to `asc`.
* `creator` ` string ` — Filter results to images uploaded with this creator identifier.

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

* `requireSignedURLs` ` boolean ` — Whether signed URLs should be required to view the image. Cannot be set to `true` on an image that was uploaded with a [custom ID](https://developers.cloudflare.com/images/storage/upload-images/upload-custom-path/).
* `metadata` ` Record<string, unknown> ` — Replacement metadata for the image. This replaces the existing metadata rather than merging into it.
* `creator` ` string ` — A user-defined identifier for the image creator.

### `.image(imageId).delete()`

Deletes an image. Returns `true` if the image was deleted or `false` if no image with the given ID existed.

## Examples

### Upload an image from a request body

* [  JavaScript ](#tab-panel-8905)
* [  TypeScript ](#tab-panel-8906)

JavaScript

```

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

TypeScript

```

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

* [  JavaScript ](#tab-panel-8909)
* [  TypeScript ](#tab-panel-8910)

JavaScript

```

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

TypeScript

```

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

* [  JavaScript ](#tab-panel-8913)
* [  TypeScript ](#tab-panel-8914)

JavaScript

```

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

TypeScript

```

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

* [  JavaScript ](#tab-panel-8907)
* [  TypeScript ](#tab-panel-8908)

JavaScript

```

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

TypeScript

```

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

* [  JavaScript ](#tab-panel-8911)
* [  TypeScript ](#tab-panel-8912)

JavaScript

```

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

TypeScript

```

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

* [  JavaScript ](#tab-panel-8915)
* [  TypeScript ](#tab-panel-8916)

JavaScript

```

export default {

  async fetch(request, env) {

    const updated = await env.IMAGES.hosted.image("IMAGE_ID").update({

      metadata: { reviewed: true },

    });

    return Response.json(updated);

  },

};


```

TypeScript

```

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

* [  JavaScript ](#tab-panel-8917)
* [  TypeScript ](#tab-panel-8918)

JavaScript

```

export default {

  async fetch(request, env) {

    const deleted = await env.IMAGES.hosted.image("IMAGE_ID").delete();

    return new Response(deleted ? "Deleted" : "Not found", {

      status: deleted ? 200 : 404,

    });

  },

};


```

TypeScript

```

export default {

  async fetch(request, env) {

    const deleted = await env.IMAGES.hosted.image("IMAGE_ID").delete();

    return new Response(deleted ? "Deleted" : "Not found", {

      status: deleted ? 200 : 404,

    });

  },

};


```

### Ingest a remote image into Images storage

This example fetches an image from a remote URL, uploads it into your Images account, and returns the first variant URL.

* [  JavaScript ](#tab-panel-8919)
* [  TypeScript ](#tab-panel-8920)

JavaScript

```

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

TypeScript

```

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

* `id` ` string `  
   * The unique identifier for the image.
* `filename` ` string ` optional  
   * The original filename supplied at upload time.
* `uploaded` ` string ` optional  
   * The date and time the image was uploaded, as an ISO 8601 string.
* `requireSignedURLs` ` boolean `  
   * Whether signed URLs are required to access this image. Refer to [Serve private images](https://developers.cloudflare.com/images/optimization/hosted-images/serve-private-images/).
* `meta` ` Record<string, unknown> ` optional  
   * User-supplied metadata associated with the image.
* `variants` ` Array<string> `  
   * Fully-formed URLs for each variant configured on your account. Refer to [Create variants](https://developers.cloudflare.com/images/optimization/hosted-images/create-variants/).
* `draft` ` boolean ` optional  
   * Whether the image is in a draft state (no bytes uploaded yet). Drafts are typically only seen on accounts using [Direct Creator Uploads](https://developers.cloudflare.com/images/storage/upload-images/direct-creator-upload/).
* `creator` ` string ` optional  
   * A user-defined identifier for the image creator.

### ImageList

Returned by [list()](#listoptions).

* `images` ` Array<ImageMetadata> `  
   * The images in this page of results.
* `cursor` ` string ` optional  
   * A continuation token to pass to the next `list()` call. Only present when there are more results.
* `listComplete` ` boolean `  
   * `true` when there are no further pages, `false` otherwise.

## Error handling

Methods that fail throw an `ImagesError` — `.upload()`, `.list()`, `.update()` — with the following properties:

* `code` ` number `  
   * A numeric error code that identifies the failure mode.
* `message` ` string `  
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

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/images/storage/binding/#page","headline":"Manage hosted images with Workers · Cloudflare Images docs","description":"Use the Images binding to upload, list, retrieve, update, and delete hosted images from a Worker.","url":"https://developers.cloudflare.com/images/storage/binding/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-06-10","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/images/","name":"Cloudflare Images"}},{"@type":"ListItem","position":3,"item":{"@id":"/images/storage/","name":"Storage"}},{"@type":"ListItem","position":4,"item":{"@id":"/images/storage/binding/","name":"Manage hosted images with Workers"}}]}
```
