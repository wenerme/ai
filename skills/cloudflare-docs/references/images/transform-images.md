---
title: Transform images
description: Transformations let you optimize and manipulate images stored outside of the Cloudflare Images product. Transformed images are served from one of your zones on Cloudflare.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/images/transform-images/index.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Transform images

Transformations let you optimize and manipulate images stored outside of the Cloudflare Images product. Transformed images are served from one of your zones on Cloudflare.

To transform an image, you must [enable transformations for your zone](https://developers.cloudflare.com/images/get-started/#enable-transformations-on-your-zone).

You can transform an image by using a [specially-formatted URL](https://developers.cloudflare.com/images/transform-images/transform-via-url/) or [through Workers](https://developers.cloudflare.com/images/transform-images/transform-via-workers/).

Learn about [pricing and limits for image transformation](https://developers.cloudflare.com/images/pricing/).

## Supported formats and limitations

### Supported input formats

* JPEG
* PNG
* GIF (including animations)
* WebP (including animations)
* SVG
* HEIC

Note

Cloudflare can ingest HEIC images for decoding, but they must be served in web-safe formats such as AVIF, WebP, JPG, or PNG.

### Supported output formats

* JPEG
* PNG
* GIF (including animations)
* WebP (including animations)
* SVG
* AVIF

### Supported features

Transformations can:

* Resize and generate JPEG and PNG images, and optionally AVIF or WebP.
* Save animations as GIF or animated WebP.
* Support ICC color profiles in JPEG and PNG images.
* Preserve JPEG metadata (metadata of other formats is discarded).
* Convert the first frame of GIF/WebP animations to a still image.

## SVG files

Cloudflare Images can deliver SVG files. However, as this is an [inherently scalable format ↗](https://www.w3.org/TR/SVG2/), Cloudflare does not resize SVGs.

As such, Cloudflare Images variants cannot be used to resize SVG files. Variants, named or flexible, are intended to transform bitmap (raster) images into whatever size you want to serve them.

You can, nevertheless, use variants to serve SVGs, using any named variant as a placeholder to allow your image to be delivered. For example:

```

https://imagedelivery.net/<ACCOUNT_HASH>/<SVG_ID>/public


```

Cloudflare recommends you use named variants with SVG files. If you use flexible variants, all your parameters will be ignored. In either case, Cloudflare applies SVG sanitizing to your files.

You can also use image transformations to sanitize SVG files stored in your origin. However, as stated above, transformations will ignore all transform parameters, as Cloudflare does not resize SVGs.

### Sanitized SVGs

Cloudflare sanitizes SVG files with `svg-hush` before serving them. This open-source tool developed by Cloudflare is intended to make SVGs as safe as possible. Because SVG files are XML documents, they can have links or JavaScript features that may pose a security concern. As such, `svg-hush` filters SVGs and removes any potential risky features, such as:

* **Scripting**: Prevents SVG files from being used for cross-site scripting attacks. Although browsers do not allow scripts in the `<img>` tag, they do allow scripting when SVG files are opened directly as a top-level document.
* **Hyperlinks to other documents**: Makes SVG files less attractive for SEO spam and phishing.
* **References to cross-origin resources**: Stops third parties from tracking who is viewing the image.

SVG files can also contain embedded images in other formats, like JPEG and PNG, in the form of [Data URLs ↗](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics%5Fof%5FHTTP/Data%5FURLs). Cloudflare treats these embedded images just like other images that we process, and optimizes them too. Cloudflare does not support SVG files embedded in SVG recursively, though.

Cloudflare still uses Content Security Policy (CSP) headers to disable unwanted features, but filtering acts as a defense-in-depth in case these headers are lost (for instance, if the image was saved as a file and served elsewhere).

`svg-hush` is open-source. It is written in Rust and can filter SVG files in a streaming fashion without buffering, so it is fast enough for filtering on the fly.

For more information about `svg-hush`, refer to [Cloudflare GitHub repository ↗](https://github.com/cloudflare/svg-hush).

### Format limitations

Since some image formats require longer computational times than others, Cloudflare has to find a proper balance between the time it takes to generate an image and to transfer it over the Internet.

Resizing requests might not be fulfilled with the format the user expects due to these trade-offs Cloudflare has to make. Images differ in size, transformations, codecs and all of these different aspects influence what compression codecs are used.

Cloudflare tries to choose the requested codec, but we operate on a best-effort basis and there are limits that our system needs to follow to satisfy all customers.

AVIF encoding, in particular, can be an order of magnitude slower than encoding to other formats. Cloudflare will fall back to WebP or JPEG if the image is too large to be encoded quickly.

#### Limits per format

Hard limits refers to the maximum image size to process. Soft limits refers to the limits existing when the system is overloaded.

| File format | Hard limits on the longest side (width or height) | Soft limits on the longest side (width or height) |
| ----------- | ------------------------------------------------- | ------------------------------------------------- |
| AVIF        | 1,200 pixels1                                     | 640 pixels                                        |
| Other       | 12,000 pixels                                     | N/A                                               |
| WebP        | N/A                                               | 2,560 pixels for lossy; 1920 pixels for lossless  |

1Hard limit is 1,600 pixels when `format=avif` is explicitly used with [image transformations](https://developers.cloudflare.com/images/transform-images/).

All images have to be less than 70 MB. The maximum image area is limited to 100 megapixels (for example, 10,000 x 10,000 pixels large).

GIF/WebP animations are limited to a total of 50 megapixels (the sum of sizes of all frames). Animations that exceed this will be passed through unchanged without applying any transformations. Note that GIF is an outdated format and has very inefficient compression. High-resolution animations will be slow to process and will have very large file sizes. For video clips, Cloudflare recommends using [video formats like MP4 and WebM instead](https://developers.cloudflare.com/stream/).

Important

SVG files are passed through without resizing. This format is inherently scalable and does not need resizing.

AVIF format is supported on a best-effort basis. Images that cannot be compressed as AVIF will be served as WebP instead.

#### Progressive JPEG

While you can use the `format=jpeg` option to generate images in an interlaced progressive JPEG format, we will fallback to the baseline JPEG format for small and large images specified when:

* The area calculated by width x height is less than 150 x 150.
* The area calculated by width x height is greater than 3000 x 3000.

For example, a 50 x 50 tiny image is always formatted by `baseline-jpeg` even if you specify progressive jpeg (`format=jpeg`).

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/images/","name":"Cloudflare Images"}},{"@type":"ListItem","position":3,"item":{"@id":"/images/transform-images/","name":"Transform images"}}]}
```
