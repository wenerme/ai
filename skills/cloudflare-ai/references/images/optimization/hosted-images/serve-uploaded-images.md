---
description: Construct delivery URLs to serve images uploaded to Cloudflare Images using your account hash, image ID, and variant name.
title: Serve uploaded images
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/images/llms.txt
> Use this file to discover all available pages before exploring further.

# Serve uploaded images

Last updated Apr 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/images/optimization/hosted-images/serve-uploaded-images/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

To serve images uploaded to Cloudflare Images, you must have:

* Your Images account hash
* Image ID
* Variant or flexible variant name

Assuming you have at least one image uploaded to Images, you will find the basic URL format from the Images dashboard under Developer Resources.

![Developer Resources section within the Images product form the Cloudflare Dashboard.](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=2678,height=992,format=webp/_astro/image-delivery-url.D7G6zX-5.png)

A typical image delivery URL looks similar to the example below.

`https://imagedelivery.net/<ACCOUNT_HASH>/<IMAGE_ID>/<VARIANT_NAME>`

In the example, you need to replace `<ACCOUNT_HASH>` with your Images account hash, along with the `<IMAGE_ID>` and `<VARIANT_NAME>`, to begin serving images.

You can select **Preview** next to the image you want to serve to preview the image with an Image URL you can copy. The link will have a fully formed **Images URL** and will look similar to the example below.

In this example:

* `ZWd9g1K7eljCn_KDTu_MWA` is the Images account hash.
* `083eb7b2-5392-4565-b69e-aff66acddd00` is the image ID. You can also use Custom IDs instead of the generated ID.
* `public` is the variant name.

When a user requests an image, Cloudflare Images chooses the optimal format, which is determined by client headers and the image type.

## Optimize format

Cloudflare Images automatically transcodes uploaded PNG, JPEG and GIF files to the more efficient AVIF and WebP formats. This happens whenever the customer browser supports them. If the browser does not support AVIF, Cloudflare Images will fall back to WebP. If there is no support for WebP, then Cloudflare Images will serve compressed files in the original format.

Uploaded SVG files are served as [sanitized SVGs](https://developers.cloudflare.com/images/get-started/limits/#svg).

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/images/optimization/hosted-images/serve-uploaded-images/#page","headline":"Serve uploaded images · Cloudflare Images docs","description":"Construct delivery URLs to serve images uploaded to Cloudflare Images using your account hash, image ID, and variant name.","url":"https://developers.cloudflare.com/images/optimization/hosted-images/serve-uploaded-images/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
