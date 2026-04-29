---
title: Draw overlays and watermarks
description: Add watermarks, logos, and overlay images on top of transformed images using Cloudflare Workers.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/images/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Draw overlays and watermarks

You can draw additional images on top of a resized image, with transparency and blending effects. This enables adding of watermarks, logos, signatures, vignettes, and other effects to resized images.

This feature is available only in [Workers](https://developers.cloudflare.com/images/optimization/transformations/transform-via-workers/). To draw overlay images, add an array of drawing commands to options of `fetch()` requests. The drawing options are nested in `options.cf.image.draw`, like in the following example:

JavaScript

```

fetch(imageURL, {

  cf: {

    image: {

      width: 800,

      height: 600,

      draw: [

        {

          url: "https://example.com/branding/logo.png", // draw this image

          bottom: 5, // 5 pixels from the bottom edge

          right: 5, // 5 pixels from the right edge

          fit: "contain", // make it fit within 100x50 area

          width: 100,

          height: 50,

          opacity: 0.8, // 20% transparent

        },

      ],

    },

  },

});


```

Explain Code

## Draw options

The `draw` property is an array. Overlays are drawn in the order they appear in the array (the last array entry is the topmost layer). Each item in the `draw` array is an object, which can have the following properties:

* `url`  
   * Absolute URL of the image file to use for the drawing. It can be any of the supported file formats. For drawing watermarks or non-rectangular overlays, Cloudflare recommends that you use PNG or WebP images.
* `width` and `height`  
   * Maximum size of the overlay image, in pixels. It must be an integer.
* `fit` and `gravity`  
   * Affects interpretation of `width` and `height`. Same as [for the main image](https://developers.cloudflare.com/images/optimization/features/).
* `opacity`  
   * Floating-point number between `0` (transparent) and `1` (opaque). For example, `opacity: 0.5` makes overlay semitransparent.
* `repeat`  
   * If set to `true`, the overlay image will be tiled to cover the entire area. This is useful for stock-photo-like watermarks.  
   * If set to `"x"`, the overlay image will be tiled horizontally only (form a line).  
   * If set to `"y"`, the overlay image will be tiled vertically only (form a line).
* `top`, `left`, `bottom`, `right`  
   * Position of the overlay image relative to a given edge. Each property is an offset in pixels. `0` aligns exactly to the edge. For example, `left: 10` positions left side of the overlay 10 pixels from the left edge of the image it is drawn over. `bottom: 0` aligns bottom of the overlay with bottom of the background image.  
   Setting both `left` and `right`, or both `top` and `bottom` is an error.  
   If no position is specified, the image will be centered.
* `background`  
   * Background color to add underneath the overlay image. Same as [for the main image](https://developers.cloudflare.com/images/optimization/features/).
* `rotate`  
   * Number of degrees to rotate the overlay image by. Same as [for the main image](https://developers.cloudflare.com/images/optimization/features/).

## Draw using the Images binding

When [interacting with Images through a binding](https://developers.cloudflare.com/images/optimization/transformations/bindings/), the Images API supports a `.draw()` method.

The accepted options for the overlaid image are `opacity`, `repeat`, `top`, `left`, `bottom`, and `right`.

JavaScript

```

// Fetch image and watermark

const img = await fetch("https://example.com/image.png");

const watermark = await fetch("https://example.com/watermark.png");


const response = (

  await env.IMAGES.input(img.body)

    .transform({ width: 1024 })

    .draw(watermark.body, { opacity: 0.25, repeat: true })

    .output({ format: "image/avif" })

).response();


return response;


```

Explain Code

To apply [parameters](https://developers.cloudflare.com/images/optimization/features/#parameters) to the overlaid image, you can pass a child `.transform()` function inside the `.draw()` request.

In the example below, the watermark is manipulated with `rotate` and `width` before being drawn over the base image with the `opacity` and `rotate` options.

JavaScript

```

// Fetch image and watermark

const response = (

  await env.IMAGES.input(img.body)

    .transform({ width: 1024 })

    .draw(watermark.body, { opacity: 0.25, repeat: true })

    .output({ format: "image/avif" })

).response();


```

## Examples

### Stock Photo Watermark

JavaScript

```

image: {

  draw: [

    {

      url: 'https://example.com/watermark.png',

      repeat: true, // Tiled over entire image

      opacity: 0.2, // and subtly blended

    },

  ],

}


```

### Signature

JavaScript

```

image: {

  draw: [

    {

      url: 'https://example.com/by-me.png', // Predefined logo/signature

      bottom: 5, // Positioned near bottom right corner

      right: 5,

    },

  ],

}


```

### Centered icon

JavaScript

```

image: {

  draw: [

    {

      url: 'https://example.com/play-button.png',

      // Center position is the default

    },

  ],

}


```

### Combined

Multiple operations can be combined in one image:

JavaScript

```

image: {

  draw: [

    { url: 'https://example.com/watermark.png', repeat: true, opacity: 0.2 },

    { url: 'https://example.com/play-button.png' },

    { url: 'https://example.com/by-me.png', bottom: 5, right: 5 },

  ],

}


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/images/","name":"Cloudflare Images"}},{"@type":"ListItem","position":3,"item":{"@id":"/images/optimization/","name":"Optimization"}},{"@type":"ListItem","position":4,"item":{"@id":"/images/optimization/transformations/","name":"Remote images (transformations)"}},{"@type":"ListItem","position":5,"item":{"@id":"/images/optimization/transformations/draw-overlays/","name":"Draw overlays and watermarks"}}]}
```
