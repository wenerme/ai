---
title: Serve uploaded images
description: Construct delivery URLs to serve images uploaded to Cloudflare Images using your account hash, image ID, and variant name.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/images/optimization/hosted-images/serve-uploaded-images.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Serve uploaded images

To serve images uploaded to Cloudflare Images, you must have:

* Your Images account hash
* Image ID
* Variant or flexible variant name

Assuming you have at least one image uploaded to Images, you will find the basic URL format from the Images dashboard under Developer Resources.

![Developer Resources section within the Images product form the Cloudflare Dashboard.](https://developers.cloudflare.com/_astro/image-delivery-url.D7G6zX-5_o6j6Y.webp) 

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

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/images/","name":"Cloudflare Images"}},{"@type":"ListItem","position":3,"item":{"@id":"/images/optimization/","name":"Optimization"}},{"@type":"ListItem","position":4,"item":{"@id":"/images/optimization/hosted-images/","name":"Hosted images"}},{"@type":"ListItem","position":5,"item":{"@id":"/images/optimization/hosted-images/serve-uploaded-images/","name":"Serve uploaded images"}}]}
```
