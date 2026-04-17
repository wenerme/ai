---
title: Features
description: Cloudflare enables developers to optimize images at scale by dynamically generating different versions in real time.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/images/optimization/features.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Features

Cloudflare enables developers to optimize images at scale by dynamically generating different versions in real time.

The guide describes all of the parameters that can be used to resize, crop, manipulate, and apply visual effects to images.

## How to apply optimization

Use Cloudflare's image optimization capabilities through:

* **URL interface** — Apply parameters directly in the image URL to specify how images should be optimized when served to the browser.
* **Workers** — Bind the Images API directly to your Worker or set the `cf.image` options on a `fetch` subrequest to build programmatic image workflows.

### URL interface

Cloudflare uses a different URL structure depending on whether you are optimizing a [remote](https://developers.cloudflare.com/images/optimization/transformations/overview/) or a [hosted](https://developers.cloudflare.com/images/optimization/hosted-images/serve-uploaded-images/) image:

* [ Remote image (transformation) ](#tab-panel-7134)
* [ Hosted image ](#tab-panel-7135)

When optimizing images outside of Images, the default transformation URL uses the following structure:

```

https://<ZONE>/cdn-cgi/image/<OPTIONS>/<SOURCE-IMAGE>


```

URL breakdown

| Part            | Description                                                                                                                                                                                                                                                    |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <ZONE>          | Your domain name at Cloudflare. Transformations can be requested on every Cloudflare zone that has transformations enabled.                                                                                                                                    |
| /cdn-cgi/image/ | A fixed prefix that identifies that this path is a request to optimize an image. To hide this part, you can set up [Transform Rules](https://developers.cloudflare.com/images/optimization/transformations/rewrite-rules/) to serve images from a custom path. |
| <OPTIONS>       | A list of optimization parameters, separated by a comma. A valid URL must specify at least one parameter.                                                                                                                                                      |
| <SOURCE-IMAGE>  | The original image that you want to transform. You can use an absolute path on the origin server or an absolute URL (that starts with https:// or http://).                                                                                                    |

For images stored in Cloudflare Images, use the delivery URL with a variant or custom options:

```

https://imagedelivery.net/<ACCOUNT_HASH>/<IMAGE-ID>/<VARIANT-OR-OPTIONS>


```

URL breakdown

| Part                 | Description                                                                                                                                                                                                                                                             |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| imagedelivery.net    | A shared, Cloudflare-owned domain for optimizing images that are hosted in Images. As an alternative, you can also [serve images from your own domain](https://developers.cloudflare.com/images/optimization/hosted-images/serve-from-custom-domains/).                 |
| <ACCOUNT\_HASH>      | A unique identifier for your Cloudflare account. You can find your account hash in the [Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/images/hosted) under **Images** \> **Developer Resources**.                                                   |
| <IMAGE-ID>           | The unique identifier for a hosted image. When you upload to Images, Cloudflare automatically generates an image ID. You can also set a [custom ID](https://developers.cloudflare.com/images/storage/upload-images/upload-custom-path/) to use your own path structure. |
| <VARIANT-OR-OPTIONS> | Here, you can specify a [predefined variant](https://developers.cloudflare.com/images/optimization/hosted-images/create-variants/) or a list of optimization parameters, separated by a comma. A valid URL must specify either a variant or at least one parameter.     |

### Workers

When using [Images with Workers](https://developers.cloudflare.com/images/optimization/transformations/transform-via-workers/), you can:

* Apply custom logic to set the order for optimization operations. For example, by default, Images will apply `flip` before `rotate`; instead, you can use the Images binding to customize your optimization workflow to rotate the image before flipping it.
* Use a custom URL scheme instead of the default URL structure.
* Implement content negotiation to dynamically adapt image size, format, and quality based on the device and network condition.

---

## Parameters

### `anim`

Specifies whether to preserve animation frames from input files.

* `true` (default) — Outputs the animated image with all frames.
* `false` — Converts the first frame of an animated input to a still image.

This setting is recommended when enlarging images or processing arbitrary user-uploaded content, as animated GIFs can have large file sizes and increase page load times. When using `format=json`, it is also useful to set `anim=false` to get a quicker response without the number of frames.

| ![Original animation](https://developers.cloudflare.com/_astro/anim.B4kULVAW.gif) | ![anim=false output](https://developers.cloudflare.com/_astro/anim.Cxswk-aF.png) |
| --------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| **Original**                                                                      | anim=false                                                                       |

* [ URL format ](#tab-panel-7090)
* [ Workers ](#tab-panel-7091)

```

anim=false


```

JavaScript

```

cf: {image: {anim: false}}


```

### `background`

Specifies an opaque or transparent color to fill blank or transparent pixels in the image. The default is `%23FFFFFF` (white).

Accepts the following properties:

* A HEX color code, formatted as `%23RRGGBB`.
* A CSS color name, e.g. `white` or `red`.
* An `rgb()` or `rgba()` CSS color function, e.g. `rgba(250,40,145,0.5)`.

The background color is visible in images with transparent pixels, including images that are resized with `fit=pad`.

| ![Original image](https://developers.cloudflare.com/_astro/original.DuemPfHh.jpg) | ![background=red output](https://developers.cloudflare.com/_astro/background-red.BDIBWvns.jpg) |
| --------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| **Original**1080 x 720                                                            | **Output**1080 x 900                                                                           |

* [ URL format ](#tab-panel-7092)
* [ Workers ](#tab-panel-7093)

```

background=%23ff0000

background=red

background=rgb%28240%2C40%2C145%29


```

JavaScript

```

cf: {image: {background: "#RRGGBB"}}

cf: {image: {background: "rgba(240,40,145,0)"}}


```

### `blur`

Applies a blur radius to the image. Accepts an integer from `0` (no blur) to `250` (maximum blur). The default is `0`.

This parameter should not be used to reliably obscure image content when optimizing via URL, as the URL can be modified to remove the blur parameter. Instead, you can [restrict access to the original image](https://developers.cloudflare.com/images/optimization/transformations/transform-via-workers/) through Workers.

| ![Original image](https://developers.cloudflare.com/_astro/original.DuemPfHh.jpg) | ![blur=50 output](https://developers.cloudflare.com/_astro/blur-50.CHVCNtdi.jpg) |
| --------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| **Original**                                                                      | blur=50                                                                          |

* [ URL format ](#tab-panel-7094)
* [ Workers ](#tab-panel-7095)

```

blur=50


```

JavaScript

```

cf: {image: {blur: 50}}


```

### `border`

Adds a border around the image.

Note

This feature is available only in Workers.

Accepts the following properties:

* `color` — Sets the color of the border. Accepts any valid CSS color value, for example `#FF0000`, `rgb(0,0,0)`, or `red`.
* `width` — Sets the uniform border, in pixels, on all four sides.
* `top`, `right`, `bottom`, `left` — Sets the border width, in pixels, for individual sides.

The border is applied after the image has been resized. The border width automatically scales with the [dpr](https://developers.cloudflare.com/images/optimization/features#dpr) parameter to ensure sharpness on high-resolution screens.

* [ Workers ](#tab-panel-7087)

JavaScript

```

cf: {image: {border: {color: "rgb(0,0,0,0)", top: 5, right: 10, bottom: 5, left: 10}}}

cf: {image: {border: {color: "#FFFFFF", width: 10}}}


```

### `brightness`

Adjusts the image's overall luminance using a multiplier.

* `1` (default) — No change to the original brightness.
* `< 1.0` — Darkens the image, e.g. `0.5` is half as bright.
* `> 1.0` — Lightens the image, e.g. `2` is twice as bright.

| ![Original image](https://developers.cloudflare.com/_astro/original.DuemPfHh.jpg) | ![brightness=0.5 output](https://developers.cloudflare.com/_astro/brightness-0.5.D3jxMNxf.jpg) | ![brightness=2 output](https://developers.cloudflare.com/_astro/brightness-2.D-IbGyod.jpg) |
| --------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| **Original**                                                                      | brightness=0.5                                                                                 | brightness=2                                                                               |

* [ URL format ](#tab-panel-7096)
* [ Workers ](#tab-panel-7097)

```

brightness=0.5


```

JavaScript

```

cf: {image: {brightness: 0.5}}


```

### `compression`

Selects the output format that is quickest to compress. Accepts `fast`. The default is none.

The `compression=fast` option prioritizes encoding speed over output quality and file size, and will usually override the `format` parameter to choose JPEG over more efficient formats like AVIF or WebP. This slightly reduces latency on a cache miss, but may result in increased file size and lower image quality.

This option is not recommended, except in unusual circumstances like resizing uncacheable, dynamically-generated images.

* [ URL format ](#tab-panel-7098)
* [ Workers ](#tab-panel-7099)

```

compression=fast


```

JavaScript

```

cf: {image: {compression: "fast"}}


```

### `contrast`

Adjusts the image's overall difference between the darkest and lightest parts using a multiplier.

* `1` (default) — No change to the original contrast.
* `< 1.0` — Decreases contrast, which makes shadows lighter and highlights darker.
* `> 1.0` — Increases contrast, which pushes shadows toward black and highlights toward white.

| ![Original image](https://developers.cloudflare.com/_astro/original.DuemPfHh.jpg) | ![contrast=0.5 output](https://developers.cloudflare.com/_astro/contrast-0.5.BJSw_Q0N.jpg) | ![contrast=2 output](https://developers.cloudflare.com/_astro/contrast-2.yLjBBcQQ.jpg) |
| --------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------- |
| **Original**                                                                      | contrast=0.5                                                                               | contrast=2                                                                             |

* [ URL format ](#tab-panel-7100)
* [ Workers ](#tab-panel-7101)

```

contrast=0.5


```

JavaScript

```

cf: {image: {contrast: 0.5}}


```

### `dpr`

Scales the output resolution by a multiplier to match a user's specific screen density (for example, Retina or 4K). The default is `1`, which delivers the image at the exact width and height requested. The maximum supported value is `2`.

Modern devices have more physical pixels than CSS pixels. If you serve a 300 px image in a 300 px container on a high-DPR smartphone, then it will look blurry. Using `dpr=2` tells Cloudflare to send a 600 px image for the same 300 px container, which results in a clearer, crisper image.

The `dpr` parameter can be used with `srcset` to [serve responsive images](https://developers.cloudflare.com/images/optimization/make-responsive-images/).

| ![dpr=1 output](https://developers.cloudflare.com/_astro/dpr-1.kw44tjdd.jpg) | ![dpr=2 output](https://developers.cloudflare.com/_astro/dpr-2.frEHI63e.jpg) |
| ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| width=300,height=200,dpr=1                                                   | width=300,height=200,dpr=2                                                   |

* [ URL format ](#tab-panel-7102)
* [ Workers ](#tab-panel-7103)

```

dpr=1


```

JavaScript

```

cf: {image: {dpr: 1}}


```

### `fit`

Specifies how the image is fit to the target area.

Fit is performed after setting the [width](https://developers.cloudflare.com/images/optimization/features/#width) and [height](https://developers.cloudflare.com/images/optimization/features/#height) dimensions of the image.

| Option            | Result                                                      | Match original aspect ratio | Upscales |
| ----------------- | ----------------------------------------------------------- | --------------------------- | -------- |
| contain (default) | Show entire image without cropping                          | Yes                         | Yes      |
| cover             | Fill the entire requested area, cropping if needed          | No                          | Yes      |
| crop              | Same as cover, but never upscales                           | No                          | No       |
| pad               | Fit within the target area, adding space for remaining area | Yes                         | Yes      |
| scale-down        | Same as contain, but never upscales                         | Yes                         | No       |
| squeeze           | Scale to exact dimensions, distorting if needed             | No                          | Yes      |

* [ URL format ](#tab-panel-7104)
* [ Workers ](#tab-panel-7105)

```

fit=scale-down


```

JavaScript

```

cf: {image: {fit: "scale-down"}}


```

#### `contain`

Resizes the image to be as large as possible within the target `width` and `height` dimensions while preserving its original aspect ratio. This is the default `fit` behavior.

In the example below, the 1080x720 image is resized to fit within the target 500x500 area. Since `contain` preserves original aspect ratio (3:2), the final dimensions of the output image are 500x333.

| ![original image](https://developers.cloudflare.com/_astro/pete-landscape.C1O-FBM1.jpg) | ![target area](https://developers.cloudflare.com/_astro/1296x1296.BYEj6EvB.png) | ![fit=contain output](https://developers.cloudflare.com/_astro/pete-contain.B_qfOwMN.png) |
| --------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| **Original**1080 x 720 (3:2)                                                            | **Requested**500 x 500 (1:1)                                                    | **Output**500 x 333 (3:2)                                                                 |

When the original image is smaller than the target area, it upscales instead, which may reduce image quality. To avoid upscaling, use `scale-down`.

#### `cover`

Fills the entire target area, shrinking or enlarging the image if needed. The output area always matches the requested `width` and `height` dimensions exactly.

When the original and target aspect ratios differ, the image is resized to cover the full target area and any overflow is cropped. Use the [gravity](https://developers.cloudflare.com/images/optimization/features/#gravity) parameter to control which part of the image is preserved during cropping.

In the example below, the 1080×720 image is first resized to 750×500 (matching the requested height) to fit the target area, then cropped from the left and right edges to its final 500x500 dimensions.

| ![original image](https://developers.cloudflare.com/_astro/pete-landscape.C1O-FBM1.jpg) | ![target area](https://developers.cloudflare.com/_astro/1296x1296.BYEj6EvB.png) | ![fit=cover output](https://developers.cloudflare.com/_astro/pete-cover.ZWLczl5t.png) |
| --------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| **Original**1080 x 720 (3:2)                                                            | **Requested**500 x 500 (1:1)                                                    | **Output**500 x 500 (1:1)                                                             |

When the original image is smaller than the target area, it upscales instead. To avoid upscaling, use `crop`.

#### `crop`

Resizes the image to fill the target area without upscaling.

When the original image is smaller than the target area, it is returned at its original dimensions and does not upscale.

In the example below, the original image (1080x720) is smaller than the target area (1296x1296), so it preserves its original size and aspect ratio.

| ![original image](https://developers.cloudflare.com/_astro/pete-landscape.C1O-FBM1.jpg) | ![target area](https://developers.cloudflare.com/_astro/1296x1296.BYEj6EvB.png) | ![fit=crop output](https://developers.cloudflare.com/_astro/pete-landscape.C1O-FBM1.jpg) |
| --------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| **Original**1080 x 720 (3:2)                                                            | **Requested**1296 x 1296 (1:1)                                                  | **Output**1080 x 720 (3:2)                                                               |

When the original image is larger than the target area, it behaves like `cover` (fills the target area and crops the rest) instead.

#### `pad`

Resizes the image to be as large as possible within the dimensions. If applicable, the output area will be expanded to match the `width` and `height` dimensions exactly.

Works with the `background` parameter to fill any blank or transparent pixels. However, for web apps, you can often achieve the same visual result using the `contain` option with the CSS `object-fit: contain` property, which avoids encoding padding pixels into the image itself.

In the example below, the original image (1080x720) is smaller than the target area (1080x1080), so it creates space for the remaining pixels.

| ![original image](https://developers.cloudflare.com/_astro/pete-landscape.C1O-FBM1.jpg) | ![target area](https://developers.cloudflare.com/_astro/1296x1296.BYEj6EvB.png) | ![fit=pad output](https://developers.cloudflare.com/_astro/pete-pad.Ci9pnK3M.png) |
| --------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| **Original**1080 x 720 (3:2)                                                            | **Requested**1080 x 1080 (1:1)                                                  | **Output**1080 x 1080 (1:1)                                                       |

#### `scale-down`

Resizes the image to fit within the specified dimensions while preserving its original aspect ratio, but never upscales the image.

When the original image is smaller than the target area, it behaves like `crop` (keeps original size and aspect ratio). When larger, it behaves like `contain` (downscaled to fill the target area).

#### `squeeze`

Resizes the image to exactly match the requested width and height, without cropping the edges or constraining the portions.

When the original and target aspect ratios differ, the image will be distorted to fit the target area.

| ![original image](https://developers.cloudflare.com/_astro/pete-landscape.C1O-FBM1.jpg) | ![fit=squeeze output](https://developers.cloudflare.com/_astro/pete-squeeze.BalgFHoW.jpg) |
| --------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| **Original**1080 x 720                                                                  | **Output**1080 x 540                                                                      |

| ![original image](https://developers.cloudflare.com/_astro/abstract.D7Gt8U3T.jpg) | ![fit=squeeze output](https://developers.cloudflare.com/_astro/abstract-squeeze.COdyKF4Z.jpg) |
| --------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| **Original**1080 x 1080                                                           | **Output**1080 x 540                                                                          |

### `flip`

Flips the image horizontally, vertically, or both.

Accepts the following values:

* `h` — Flips the image horizontally.
* `v` — Flips the image vertically.
* `hv` — Flips the image both horizontally and vertically.

Flip can be used with the `rotate` parameter to set the orientation of the image. Flip is performed before rotation. For example, if you apply `flip=h,rotate=90`, then the image will be flipped horizontally, then rotated by 90 degrees.

| ![Original image](https://developers.cloudflare.com/_astro/original.DuemPfHh.jpg) | ![flip=h output](https://developers.cloudflare.com/_astro/flip-h.Qc63pcHu.jpg) | ![flip=v output](https://developers.cloudflare.com/_astro/flip-v.DuCcWsSK.jpg) |
| --------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ |
| **Original**                                                                      | flip=h                                                                         | flip=v                                                                         |

* [ URL format ](#tab-panel-7106)
* [ Workers ](#tab-panel-7107)

```

flip=h


```

JavaScript

```

cf: {image: {flip: "h"}}


```

### `format` | `f`

Specifies the output format for the image.

Accepts the following values:

* `auto` — Automatically serves the most efficient format that the requesting browser supports. When you serve a [hosted image](https://developers.cloudflare.com/images/optimization/hosted-images/create-variants/), this is the default `format` option.
* `avif` — Transcodes the image to AVIF, if possible. AVIF encoding can be an order of magnitude slower than encoding to other formats. If the image is too large to be quickly encoded to AVIF, then Cloudflare will fall back to WebP or JPEG.
* `webp` — Transcodes the image to Google WebP format. Use `quality=100` to return the WebP lossless format.
* `jpeg` — Transcodes the image in interlaced progressive JPEG format, in which data is compressed in multiple passes of progressively higher detail.
* `baseline-jpeg` — Transcode the image in baseline sequential JPEG format. It should be used in cases when target devices do not support progressive JPEG or other modern file formats.
* `json` — Outputs information about the image as a JSON object. This contains data such as image size (before and after resizing), the source image's MIME type, and file size.

* [ URL format ](#tab-panel-7108)
* [ Workers ](#tab-panel-7109)

```

format=auto

f=auto


```

JavaScript

```

cf: {image: {format: "avif"}}


```

To use `format=auto` with a custom Worker, you need to parse the `Accept` header. Refer to [this example Worker](https://developers.cloudflare.com/images/optimization/transformations/transform-via-workers/#an-example-worker) for a complete overview of how to set up an image transformation Worker.

Custom Worker for Image Resizing with format:auto

```

const accept = request.headers.get("accept");

let image = {};


if (/image\/avif/.test(accept)) {

  image.format = "avif";

} else if (/image\/webp/.test(accept)) {

  image.format = "webp";

}


return fetch(url, { cf: { image } });


```

Explain Code

### `gamma`

Adjusts the exposure of an image using a multiplier. Gamma controls the midtone brightness without affecting the darkest or lightest parts of the image.

* `0` and `1` (default) — No change to the original gamma.
* `< 1.0` — Increases midtone brightness, making the image appear lighter overall.
* `> 1.0` — Decreases midtone brightness, making the image appear darker overall.

| ![Original image](https://developers.cloudflare.com/_astro/original.DuemPfHh.jpg) | ![gamma=0.5 output](https://developers.cloudflare.com/_astro/gamma-0.5.Bcga364K.jpg) | ![gamma=2 output](https://developers.cloudflare.com/_astro/gamma-2.BrZb1hEC.jpg) |
| --------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------- |
| **Original**                                                                      | gamma=0.5                                                                            | gamma=2                                                                          |

* [ URL format ](#tab-panel-7110)
* [ Workers ](#tab-panel-7111)

```

gamma=0.5


```

JavaScript

```

cf: {image: {gamma: 0.5}}


```

### `gravity` | `g`

Specifies how the image should be cropped when used with `fit=cover` and `fit=crop`. By default, Cloudflare will crop toward the center point of the original image.

Accepts `auto`, `face`, a side (`left`, `right`, `top`, `bottom`), and relative coordinates (`XxY`).

* [ URL format ](#tab-panel-7112)
* [ Workers ](#tab-panel-7113)

```

gravity=auto

g=auto

gravity=face

gravity=left

gravity=0.5x1


```

JavaScript

```

cf: {image: {gravity: "auto"}}

cf: {image: {gravity: "face"}}

cf: {image: {gravity: "left"}}

cf: {image: {gravity: {x:0.5, y:0.2}}}


```

#### `auto`

Automatically sets the focal point by using a saliency algorithm to detect the most visually interesting pixels.

This is useful when you don't know the contents of the image ahead of time, such as with user-generated content. For large image libraries such as e-commerce product galleries, this feature eliminates the need to manually set a focal point for each image.

| ![original image](https://developers.cloudflare.com/_astro/coffee-base.B2l8XteX.jpg) | ![output without gravity=auto](https://developers.cloudflare.com/_astro/coffee-crop.BrOCyoCE.jpg) | ![output with gravity=auto](https://developers.cloudflare.com/_astro/coffee-auto.DAQPvZHc.jpg) |
| ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| **Original**                                                                         | **Default crop**                                                                                  | gravity=auto                                                                                   |

#### `face`

Automatically sets the focal point based on faces in the image.

This can be combined with the [zoom](https://developers.cloudflare.com/images/optimization/features#zoom) parameter to specify how closely the image should be cropped toward the face.

| ![original image](https://developers.cloudflare.com/_astro/suad-kamardeen.O8gS5wPQ.jpeg) | ![output without gravity=face](https://developers.cloudflare.com/_astro/suad-kamardeen-crop.Btvf-dvP.jpeg) | ![output with gravity=face](https://developers.cloudflare.com/_astro/suad-kamardeen-face.3ZHIZdIY.jpeg) |
| ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| **Original**                                                                             | **Default crop**                                                                                           | gravity=face                                                                                            |

_Photograph by [Suad Kamardeen (@suadkamardeen) on Unsplash ↗](https://unsplash.com/photos/woman-in-black-cardigan-standing-beside-pink-flowers-UO-82DJ3rcc)_

#### `left`, `right`, `top`, `bottom`

Sets the side of the image that should not be cropped.

In the example below, the 1080x720 image is cropped to a 1080x400 area, starting from its bottom edge:

| ![original image](https://developers.cloudflare.com/_astro/pete-landscape.C1O-FBM1.jpg) | ![output without gravity=auto](https://developers.cloudflare.com/_astro/pete-bottom.BD_YS29E.jpg) |
| --------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| **Original**                                                                            | gravity=bottom                                                                                    |

#### `XxY`

Sets the focal point (X,Y) so that the relative coordinates of the output image are positioned at the relative coordinates of the original image. Accepts a coordinate pair formatted as `XxY`, where X and Y are decimal values between `0.0` and `1.0`.

![Change the focal point using the relative coordinates](https://developers.cloudflare.com/_astro/xxy.pMA7L7Ny_2dl5dr.webp) 
* **Horizontal value (X)** — `0.0` is the left edge and `1.0` is the right edge of the image.
* **Vertical value (Y)** — `0.0` is the top edge and `1.0` is the bottom edge of the image.

The example below crops a 900x900 image to 300x900 using a 0.33x0.5 gravity point:

* Both the original image and target area will have gravity points set at 1/3 of the width from the left edge and 1/2 of the height from the top edge.
* The relative coordinates of the output gravity point are positioned at the relative coordinates of the original image. That is, the target area is positioned so that its gravity point sits at the same relative position in the original image (0.33, 0.5).
* The darkened parts of the image show the area outside of the requested output, which will be cropped.
* The final cropped result captures the 300x900 content that is around the gravity point (0.33, 0.5).

| ![original image](https://developers.cloudflare.com/_astro/base.DwQU1Wiz.png) | ![align gravity points on original and target area](https://developers.cloudflare.com/_astro/rel-points.tebmJ081.png) | ![crop using new gravity point](https://developers.cloudflare.com/_astro/rel-alignment.u2L4c77x.png) | ![final output](https://developers.cloudflare.com/_astro/rel-output.1DSTik2r.png) |
| ----------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| **Original**                                                                  | **Align**                                                                                                             | **Crop**                                                                                             | **Output**                                                                        |

When optimizing through Workers, use an object `{x, y}` to specify coordinates. For example, `{fit: "cover", gravity: {x:0.5, y:0.2}}` will crop each side to preserve as much as possible around a point at 20% of the height of the original image.

### `height` | `h`

Sets the height of the output image in pixels using a positive integer value. By default, Cloudflare uses the original height of the input image.

When `height` is set, the exact behavior depends on the `fit` parameter.

* [ URL format ](#tab-panel-7114)
* [ Workers ](#tab-panel-7115)

```

height=250

h=250


```

JavaScript

```

cf: {image: {height: 250}}


```

### `metadata`

Controls the amount of invisible metadata (EXIF) that should be preserved for a JPEG image. For all other output formats (e.g. WebP or PNG), all metadata will always be discarded.

Color profiles and EXIF rotation are applied to the image even if the metadata is discarded.

Note

If [Polish](https://developers.cloudflare.com/images/polish/) is enabled, then all metadata may already be removed and this option will have no effect.

Accepts the following values:

* `copyright` (default) — Discards all metadata except EXIF copyright tag.
* `keep` — Preserves most of EXIF metadata, including GPS location, if present.
* `none` — Discards all invisible EXIF metadata.

* [ URL format ](#tab-panel-7116)
* [ Workers ](#tab-panel-7117)

```

metadata=none


```

JavaScript

```

cf: {image: {metadata: "none"}}


```

### `onerror`

Redirects the end-user to the URL of the original source image when a fatal error prevents the image from being transformed. Accepts `redirect`. The default is none.

Note

This feature is available only when optimizing remote images through the URL interface. This is not supported for hosted images.

This option works only if the image is in the same zone (subdomains are accepted). If the original image is from a different zone, then the option does not have any effect.

This may be useful in cases where an image requires user authentication and the image cannot be fetched anonymously via Workers. However, this option is not recommended if the source image is very large.

* [ URL format ](#tab-panel-7088)

```

onerror=redirect


```

### `quality` | `q`

Specifies the output quality of an image for JPEG, WebP, and AVIF formats, expressed as a fixed value or perceptual quality level. The default is `85`.

* **Fixed quality** — Accepts a positive integer from `1` (low quality, small file size) to `100` (high quality, large file size).
* **Perceptual quality** — Accepts `high`, `medium-high`, `medium-low`, and `low`.

When the output format is PNG, an explicit `quality` setting allows the use of PNG8 (palette) variant of the format.

* [ URL format ](#tab-panel-7118)
* [ Workers ](#tab-panel-7119)

```

quality=50

quality=low

q=50


```

JavaScript

```

cf: {image: {quality: 50}}

cf: {image: {quality: "high"}}


```

### `rotate`

Rotates an image by a number of degrees. Accepts `90`, `180`, or `270`. The default is `0` (no rotation).

Rotation is performed before resizing; `width` and `height` options will refer to the axes after the image is rotated.

| ![Original image](https://developers.cloudflare.com/_astro/original.DuemPfHh.jpg) | ![rotate=180 output](https://developers.cloudflare.com/_astro/rotate-180.Dx3iw1mv.jpg) |
| --------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| **Original**                                                                      | rotate=180                                                                             |

* [ URL format ](#tab-panel-7120)
* [ Workers ](#tab-panel-7121)

```

rotate=90


```

JavaScript

```

cf: {image: {rotate: 90}}


```

### `saturation`

Adjusts the color saturation of an image using a multiplier.

* `0` — Completely desaturates the image (grayscale).
* `< 1.0` — Reduces color intensity. For example, `0.5` is half as saturated.
* `1` (default) — No change to the original saturation.
* `> 1.0` — Increases color intensity. For example, `2` is twice as saturated.

| ![Original image](https://developers.cloudflare.com/_astro/original.DuemPfHh.jpg) | ![saturation=0 output](https://developers.cloudflare.com/_astro/saturation-0.Cn9J5pmH.jpg) | ![saturation=2 output](https://developers.cloudflare.com/_astro/saturation-2.B7Pl0-wE.jpg) |
| --------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ |
| **Original**                                                                      | saturation=0                                                                               | saturation=2                                                                               |

* [ URL format ](#tab-panel-7122)
* [ Workers ](#tab-panel-7123)

```

saturation=0.5


```

JavaScript

```

cf: {image: {saturation: 0.5}}


```

### `segment`

Automatically isolates the subject of an image by replacing the background with transparent pixels. Accepts `foreground`. The default is none.

This feature uses an open-source model called BiRefNet through [Workers AI](https://developers.cloudflare.com/workers-ai/). Read more about Cloudflare's [approach to responsible AI ↗](https://www.cloudflare.com/trust-hub/responsible-ai/).

| ![Original image](https://developers.cloudflare.com/_astro/original.DuemPfHh.jpg) | ![segment=foreground output](https://developers.cloudflare.com/_astro/segment-foreground.B6UYNLDs.png) |
| --------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| **Original**                                                                      | segment=foreground                                                                                     |

* [ URL format ](#tab-panel-7124)
* [ Workers ](#tab-panel-7125)

```

segment=foreground


```

JavaScript

```

cf: {image: {segment: "foreground"}}


```

### `sharpen`

Applies a sharpening filter to enhance edge definition in an image. Accepts a decimal value from `0` (no sharpening) to `10` (maximum sharpening). The default is `0`. The recommended value for downscaled images is `1`.

| ![Original image](https://developers.cloudflare.com/_astro/original.DuemPfHh.jpg) | ![sharpen=5 output](https://developers.cloudflare.com/_astro/sharpen-5.CyEreNja.jpg) |
| --------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| **Original**                                                                      | sharpen=5                                                                            |

* [ URL format ](#tab-panel-7126)
* [ Workers ](#tab-panel-7127)

```

sharpen=2


```

JavaScript

```

cf: {image: {sharpen: 2}}


```

### `slow-connection-quality` | `scq`

Overrides the `quality` value whenever a slow connection is detected. Accepts the same fixed or perceptual settings as [quality](https://developers.cloudflare.com/images/optimization/features/#quality). The default is none.

Note

This feature is available only when optimizing through the URL interface on Chromium-based browsers such as Chrome, Edge, and Opera.

To detect slow connections, enable any of the following client hints via HTTP in a header:

```

accept-ch: rtt, save-data, ect, downlink


```

`slow-connection-quality` applies when the client hint is present and any of the following conditions are met:

* [rtt ↗](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/RTT): Greater than 150ms.
* [save-data ↗](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Save-Data): Value is "on".
* [ect ↗](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/ECT): Value is one of `slow-2g|2g|3g`.
* [downlink ↗](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Downlink): Less than 5Mbps.

* [ URL format ](#tab-panel-7089)

```

slow-connection-quality=50

scq=50


```

### `trim`

Removes pixels around the sides of an image.

This feature can be used to trim an image by its border colors or by a specified number of pixels from its side(s).

Trim takes into account the [dpr](https://developers.cloudflare.com/images/optimization/features/#dpr) parameter and is performed before resizing and rotation.

#### `border`

Automatically trims the sides of the image based on its border color.

The `trim=border` option can be further adjusted using the following parameters:

* `trim.border.color` — Selects the border color to trim. Accepts any CSS color using CSS4 modern syntax. If omitted, the color is detected automatically.
* `trim.border.tolerance` — Sets how closely the detected pixels must match in color. Accepts an integer between `0` (doesn't need to match) and 255 (must match exactly).
* `trim.border.keep` — Specifies the number of pixels of the original border to leave untrimmed.

#### `top;right;bottom;left`

Specifies the number of pixels to remove from the sides of an image. Accepts four integers, separated by a semicolon, to set the trim on all four sides of an image at once.

Trim can also be applied to a specific side using the following parameters:

* `trim.top` — Specifies the number of pixels to remove from the top side of the image.
* `trim.left` — Specifies the number of pixels to remove from the left side of the image
* `trim.height` — Sets the height, in pixels, of the image from the top edge, then trims everything below the specified value.
* `trim.width` — Sets the width of the image from the left edge, then trims everything to the right of the specified value.

* [ URL format ](#tab-panel-7128)
* [ Workers ](#tab-panel-7129)

```

trim=border

trim.height=800

// This sets the height of the image to 800 pixels from the top of the image, then trims everything below that point


trim.left=800

// This removes 800 pixels from the left of the image


```

JavaScript

```

cf: {image: {trim: {top: 12,  right: 78, bottom: 34, left: 56, width:678, height:678}}}


```

### `width` | `w`

Sets the width of the output image in pixels using a positive integer value. By default, Cloudflare uses the original width of the input image.

When `width` is set, the exact behavior depends on the `fit` parameter.

Accepts the following values:

* A number in pixels (for example, `250`).
* `auto` — Automatically serves the image in the most optimal width based on available information about the browser and device. This method is supported only by Chromium browsers. For more information, refer to [Transform width parameter](https://developers.cloudflare.com/images/optimization/make-responsive-images/#transform-with-width-parameter).

* [ URL format ](#tab-panel-7130)
* [ Workers ](#tab-panel-7131)

```

width=250

w=250


```

JavaScript

```

cf: {image: {width: 250}}


```

Ideally, image sizes should match the exact dimensions at which they are displayed on the page. If the page contains thumbnails with markup such as `<img width="200">`, then you can resize the image by applying `width=200`.

[To serve responsive images](https://developers.cloudflare.com/images/optimization/make-responsive-images/#transform-with-html-srcset), you can use the HTML `srcset` element and apply width parameters.

### `zoom` | `face-zoom`

Specifies how closely the image is cropped toward detected faces when combined with the `gravity=face` option. Accepts a valid range between `0.0` (includes as much of the background as possible) and `1.0` (crops the image as closely to the face as possible). The default is `0`.

* [ URL format ](#tab-panel-7132)
* [ Workers ](#tab-panel-7133)

```

zoom=0.1


```

JavaScript

```

cf: {image: {zoom: 0.5}}


```

## Recommended image sizes

Ideally, image sizes should match the exact size that they are displayed on the page. If the page contains thumbnails with markup such as `<img width="200" …>`, then images should be resized to `width=200`.

To [serve responsive images](https://developers.cloudflare.com/images/optimization/make-responsive-images/), you can use the HTML `srcset` attribute to let the provider pick the most optimal size. If you can't use the `<img srcset>` markup and have to hardcode specific maximum sizes, Cloudflare recommends the following sizes:

* Maximum of 1920 pixels for desktop browsers.
* Maximum of 960 pixels for tablets.
* Maximum of 640 pixels for mobile phones.

For example, `fit=scale-down,width=1920` sets a maximum size of 1920 px and ensures that the image will not be enlarged unnecessarily.

You can detect device type by enabling the `CF-Device-Type` header [via Cache Rule](https://developers.cloudflare.com/cache/how-to/cache-rules/examples/cache-device-type/).

## Caching

When you optimize with Images, the original image will be fetched from the origin server and cached — following the usual rules of HTTP caching, `Cache-Control` header, etc.. Requests for multiple different image sizes are likely to reuse the cached original image without causing extra transfers from the origin server.

If [Custom Cache Keys](https://developers.cloudflare.com/cache/how-to/cache-keys/) are used for the origin image, the origin image might not be cached and might result in more calls to the origin.

Optimized images follow the same caching rules as the original image they were resized from, except the minimum cache time is one hour. If you need images to be updated more frequently, add `must-revalidate` to the `Cache-Control` header. The Images service supports cache revalidation, so we recommend serving images with the `Etag` header. Refer to the [Cache docs for more information](https://developers.cloudflare.com/cache/concepts/cache-control/#revalidation).

Cloudflare does not support purging optimized images individually. URLs starting with `/cdn-cgi/` cannot be purged. However, purging of the original image's URL will also purge all of its optimized versions.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/images/","name":"Cloudflare Images"}},{"@type":"ListItem","position":3,"item":{"@id":"/images/optimization/","name":"Optimization"}},{"@type":"ListItem","position":4,"item":{"@id":"/images/optimization/features/","name":"Features"}}]}
```
