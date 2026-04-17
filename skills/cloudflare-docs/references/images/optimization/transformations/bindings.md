---
title: Bind to Workers API
description: A binding connects your Worker to external resources on the Developer Platform, like Images, R2 buckets, or KV Namespaces.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/images/optimization/transformations/bindings.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Bind to Workers API

A [binding](https://developers.cloudflare.com/workers/runtime-apis/bindings/) connects your [Worker](https://developers.cloudflare.com/workers/) to external resources on the Developer Platform, like [Images](https://developers.cloudflare.com/images/optimization/transformations/transform-via-workers/), [R2 buckets](https://developers.cloudflare.com/r2/buckets/), or [KV Namespaces](https://developers.cloudflare.com/kv/concepts/kv-namespaces/).

You can bind the Images API to your Worker to transform, resize, and encode images without requiring them to be accessible through a URL.

For example, when you allow Workers to interact with Images, you can:

* Transform an image, then upload the output image directly into R2 without serving to the browser.
* Optimize an image stored in R2 by passing the blob of bytes representing the image, instead of fetching the public URL for the image.
* Resize an image, overlay the output over a second image as a watermark, then resize this output into a final result.

Bindings can be configured in the Cloudflare dashboard for your Worker or in the Wrangler configuration file in your project's directory.

Billing

Every call to the Images binding counts as one unique transformation. Refer to [Images pricing](https://developers.cloudflare.com/images/pricing/) for more information about transformation billing.

## Setup

The Images binding is enabled on a per-Worker basis.

You can define variables in the Wrangler configuration file of your Worker project's directory. These variables are bound to external resources at runtime, and you can then interact with them through this variable.

To bind Images to your Worker, add the following to the end of your Wrangler configuration file:

* [  wrangler.jsonc ](#tab-panel-7138)
* [  wrangler.toml ](#tab-panel-7139)

JSONC

```

{

  "images": {

    "binding": "IMAGES", // i.e. available in your Worker on env.IMAGES

  },

}


```

TOML

```

[images]

binding = "IMAGES"


```

Within your Worker code, you can interact with this binding by using `env.IMAGES.input()` to build an object that can manipulate the image (passed as a `ReadableStream`).

## Methods

### `.transform()`

* Defines how an image should be optimized and manipulated through [parameters](https://developers.cloudflare.com/images/optimization/features/#parameters) such as `width`, `height`, and `blur`.

### `.draw()`

* Allows [drawing an image](https://developers.cloudflare.com/images/optimization/transformations/draw-overlays/) over another image.
* The drawn image can be a stream, or another image returned from `.input()` that has been manipulated.
* The overlaid image can be manipulated using `opacity`, `repeat`, `top`, `left`, `bottom`, and `right`. To apply other parameters, you can pass a child `.transform()` function inside this method.

For example, to draw a resized watermark on an image:

* [  JavaScript ](#tab-panel-7140)
* [  TypeScript ](#tab-panel-7141)

JavaScript

```

// Fetch the watermark from Workers Assets, R2, KV etc

const watermark = getWatermarkStream();


// Fetch the main image

const image = getImageStream();


const response = (

  await env.IMAGES.input(image)

    .draw(env.IMAGES.input(watermark).transform({ width: 32, height: 32 }), {

      bottom: 32,

      right: 32,

    })

    .output({ format: "image/avif" })

).response();


return response;


```

Explain Code

TypeScript

```

// Fetch the watermark from Workers Assets, R2, KV etc

const watermark: ReadableStream = getWatermarkStream();


// Fetch the main image

const image: ReadableStream = getImageStream();


const response = (

  await env.IMAGES.input(image)

    .draw(env.IMAGES.input(watermark).transform({ width: 32, height: 32 }), {

      bottom: 32,

      right: 32,

    })

    .output({ format: "image/avif" })

).response();


return response;


```

Explain Code

### `.output()`

* You must define [a supported format](https://developers.cloudflare.com/images/get-started/limits/#output-formats) such as AVIF, WebP, or JPEG for the transformed image.
* This is required since there is no default format to fallback to.
* [Image quality](https://developers.cloudflare.com/images/optimization/features/#quality) can be altered by specifying `quality` on a 1-100 scale.
* [Animation preservation](https://developers.cloudflare.com/images/optimization/features/#anim) can be controlled with the `anim` parameter. Set `anim: false` to reduce animations to still images.

For example, to rotate, resize, and blur an image, then output the image as AVIF:

* [  JavaScript ](#tab-panel-7142)
* [  TypeScript ](#tab-panel-7143)

JavaScript

```

const info = await env.IMAGES.info(stream);

// Stream contains a valid image, and width/height is available on the info object


// You can determine the format based on the use case

const outputFormat = "image/avif";


const response = (

  await env.IMAGES.input(stream)

    .transform({ rotate: 90 })

    .transform({ width: 128 })

    .transform({ blur: 20 })

    .output({ format: outputFormat })

).response();


return response;


```

Explain Code

TypeScript

```

const info = await env.IMAGES.info(stream);

// Stream contains a valid image, and width/height is available on the info object


// You can determine the format based on the use case

const outputFormat = "image/avif";


const response = (

  await env.IMAGES.input(stream)

    .transform({ rotate: 90 })

    .transform({ width: 128 })

    .transform({ blur: 20 })

    .output({ format: outputFormat })

).response();


return response;


```

Explain Code

### `.info()`

* Outputs information about the image, such as `format`, `fileSize`, `width`, and `height`.

Note

Responses from the Images binding are not automatically cached. Workers lets you interact directly with the [Cache API](https://developers.cloudflare.com/workers/runtime-apis/cache/) to customize cache behavior. You can implement logic in your script to store transformations in Cloudflare's cache.

## Interact with your Images binding locally

The Images API can be used in local development through [Wrangler](https://developers.cloudflare.com/workers/wrangler/install-and-update/), the command-line interface for Workers. Using the Images binding in local development will not incur usage charges.

Wrangler supports two different versions of the Images API:

* A high-fidelity version that supports all features that are available through the Images API. This is the same version that Cloudflare runs globally in production.
* A low-fidelity offline version that supports only a subset of features, such as resizing and rotation.

To test the low-fidelity version of Images, you can run `wrangler dev`:

```

npx wrangler dev


```

Currently, this version supports only `width`, `height`, `rotate`, and `format`.

To test the high-fidelity remote version of Images, you can use the `--remote` flag:

```

npx wrangler dev --remote


```

When testing with the [Workers Vitest integration](https://developers.cloudflare.com/workers/testing/vitest-integration/), the low-fidelity offline version is used by default, to avoid hitting the Cloudflare API in tests.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/images/","name":"Cloudflare Images"}},{"@type":"ListItem","position":3,"item":{"@id":"/images/optimization/","name":"Optimization"}},{"@type":"ListItem","position":4,"item":{"@id":"/images/optimization/transformations/","name":"Remote images (transformations)"}},{"@type":"ListItem","position":5,"item":{"@id":"/images/optimization/transformations/bindings/","name":"Bind to Workers API"}}]}
```
