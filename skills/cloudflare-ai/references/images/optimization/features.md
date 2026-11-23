---
agent:
  instructions: "This site offers a search API that returns relevant content across the entire site. Use the search endpoint to find information instead of crawling individual pages."
  search: "https://developers.cloudflare.com/.well-known/search?q={query}"
description: Available Cloudflare Images optimization parameters for resizing, cropping, format conversion, and visual effects.
title: Features
image: https://developers.cloudflare.com/images/optimization/features/og.png?v=7aaa5e60f3daf043
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/images/llms.txt
> Use this file to discover all available pages before exploring further.

# Features

Cloudflare enables developers to optimize images at scale by dynamically generating different versions in real time.

The guide describes all of the parameters that can be used to resize, crop, manipulate, and apply visual effects to images.

## How to apply optimization

Use Cloudflare's image optimization capabilities through:

- **URL interface** — Apply parameters directly in the image URL to specify how images should be optimized when served to the browser.
- **Workers** — Bind the Images API directly to your Worker or set the `cf.image` options on a `fetch` subrequest to build programmatic image workflows.

### URL interface

Cloudflare uses a different URL structure depending on whether you are optimizing a [remote](https://developers.cloudflare.com/images/optimization/transformations/overview/) or a [hosted](https://developers.cloudflare.com/images/optimization/hosted-images/serve-uploaded-images/) image:

When optimizing images outside of Images, the default transformation URL uses the following structure:

```txt
https://<ZONE>/cdn-cgi/image/<OPTIONS>/<SOURCE-IMAGE>
```

<details>

<summary>

URL breakdown

</summary>

| Part | Description |
| --- | --- |
| <code>&lt;ZONE&gt;</code> | Your domain name at Cloudflare. Transformations can be requested on every Cloudflare zone that has transformations enabled. |
| <code>/cdn-cgi/image/</code> | A fixed prefix that identifies that this path is a request to optimize an image. To hide this part, you can set up <a href="https://developers.cloudflare.com/images/optimization/transformations/rewrite-rules/">Transform Rules</a> to serve images from a custom path. |
| <code>&lt;OPTIONS&gt;</code> | A comma-separated list of optimization parameters. For parameters that accept related settings, group those settings within parentheses, such as <code>gravity=(x=0.5,y=0.3)</code>. A valid URL must specify at least one parameter. |
| <code>&lt;SOURCE-IMAGE&gt;</code> | The original image that you want to transform. You can use an absolute path on the origin server or an absolute URL (that starts with <code>https://</code> or <code>http://</code>). |

</details>

For images stored in Cloudflare Images, use the delivery URL with a variant or custom options:

```txt
https://imagedelivery.net/<ACCOUNT_HASH>/<IMAGE-ID>/<VARIANT-OR-OPTIONS>
```

<details>

<summary>

URL breakdown

</summary>

| Part | Description |
| --- | --- |
| <code>imagedelivery.net</code> | A shared, Cloudflare-owned domain for optimizing images that are hosted in Images. As an alternative, you can also <a href="https://developers.cloudflare.com/images/optimization/hosted-images/serve-from-custom-domains/">serve images from your own domain</a>. |
| <code>&lt;ACCOUNT_HASH&gt;</code> | A unique identifier for your Cloudflare account. You can find your account hash in the <a href="https://dash.cloudflare.com/?to=/:account/images/hosted">Cloudflare dashboard ↗︎</a> under **Images** &gt; **Developer Resources**. |
| <code>&lt;IMAGE-ID&gt;</code> | The unique identifier for a hosted image. When you upload to Images, Cloudflare automatically generates an image ID. You can also set a <a href="https://developers.cloudflare.com/images/storage/upload-images/upload-custom-path/">custom ID</a> to use your own path structure. |
| <code>&lt;VARIANT-OR-OPTIONS&gt;</code> | Here, you can specify a <a href="https://developers.cloudflare.com/images/optimization/hosted-images/create-variants/">predefined variant</a> or a comma-separated list of optimization parameters. For parameters that accept related settings, group those settings within parentheses, such as <code>gravity=(x=0.5,y=0.3)</code>. A valid URL must specify either a predefined variant or at least one parameter. |

</details>

### Workers

When using [Images with Workers](https://developers.cloudflare.com/images/optimization/transformations/transform-via-workers/), you can:

- Apply custom logic to set the order for optimization operations. For example, by default, Images will apply `flip` before `rotate`; instead, you can use the Images binding to customize your optimization workflow to rotate the image before flipping it.
- Use a custom URL scheme instead of the default URL structure.
- Implement content negotiation to dynamically adapt image size, format, and quality based on the device and network condition.

---

## Parameters

### `anim`

Specifies whether to preserve animation frames from input files.

- `true` (default) — Outputs the animated image with all frames.
- `false` — Converts the first frame of an animated input to a still image.

Animated GIFs can have large file sizes and take longer to process. To reduce processing time, set `anim=false` when enlarging images or processing arbitrary user uploads. When used with `format=json`, this setting also returns a faster response by omitting the frame count.

```txt
anim=false
```

```js
cf: {image: {anim: false}}
```

| ![Original animation](https://developers.cloudflare.com/_astro/anim.B4kULVAW.gif) | ![anim=false output](https://developers.cloudflare.com/_astro/anim.Cxswk-aF.png) |
| --- | --- |
| **Original** | `anim=false` |

### `background`

Specifies an opaque or transparent color to fill blank or transparent pixels in the image. The default is `%23FFFFFF` (white).

Accepts a color value in the following formats:

- A HEX color code, formatted as `%23RRGGBB`.
- A CSS color name, e.g. `white` or `red`.
- An `rgb()` or `rgba()` CSS color function, e.g. `rgba(250,40,145,0.5)`.

The background color is visible in images with transparent pixels, including images that are resized with `fit=pad`.

```txt
background=%23ff0000
background=red
background=rgb(240,40,145)
```

```js
cf: {image: {background: "#RRGGBB"}}
cf: {image: {background: "rgba(240,40,145,0)"}}
```

| ![Original image](https://developers.cloudflare.com/_astro/original.DuemPfHh.jpg) | ![background=red output](https://developers.cloudflare.com/_astro/background-red.BDIBWvns.jpg) |
| --- | --- |
| **Original**<br> 1080 x 720 | **Output**<br> 1080 x 900 |

### `blur`

Applies a blur radius to the image. Accepts an integer from `0` (no blur) to `250` (maximum blur). The default is `0`.

This parameter should not be used to reliably obscure image content when optimizing via URL, as the URL can be modified to remove the blur parameter. Instead, you can [restrict access to the original image](https://developers.cloudflare.com/images/optimization/transformations/transform-via-workers/) through Workers.

```txt
blur=50
```

```js
cf: {image: {blur: 50}}
```

| ![Original image](https://developers.cloudflare.com/_astro/original.DuemPfHh.jpg) | ![blur=50 output](https://developers.cloudflare.com/_astro/blur-50.CHVCNtdi.jpg) |
| --- | --- |
| **Original** | `blur=50` |

### `border`

Adds a border around the image.

Accepts the following settings:

| Setting | Description | Accepted values |
| --- | --- | --- |
| `color` | Sets the color of the border. | Any valid CSS color |
| `width` | Sets a uniform border on all four sides. | Integer pixel count or percentage string, such as `50p` |
| `top`, `right`, `bottom`, `left` | Sets the border width for individual sides. | Integer pixel count or percentage string, such as `50p` |

The border is applied after the image has been resized. The border width automatically scales with the [`dpr`](https://developers.cloudflare.com/images/optimization/features#dpr) parameter to ensure sharpness on high-resolution screens.

```txt
border=(color=%23ffffff,width=10)
border=(color=%23ffffff,width=10p)
border=(color=rgba(0,0,0,0),top=5,right=10,bottom=5,left=10)
```

```js
cf: {
  image: {
    border: {
      color: "rgba(0,0,0,0)",
      top: 5,
      right: 10,
      bottom: 5,
      left: 10,
    },
  },
}

cf: {
  image: {
    border: {
      color: "#FFFFFF",
      width: "10p",
    },
  },
}
```

### `brightness`

Adjusts the image's overall luminance using a multiplier.

- `1` (default) — No change to the original brightness.
- `< 1.0` — Darkens the image, e.g. `0.5` is half as bright.
- `> 1.0` — Lightens the image, e.g. `2` is twice as bright.

```txt
brightness=0.5
```

```js
cf: {image: {brightness: 0.5}}
```

| ![Original image](https://developers.cloudflare.com/_astro/original.DuemPfHh.jpg) | ![brightness=0.5 output](https://developers.cloudflare.com/_astro/brightness-0.5.D3jxMNxf.jpg) | ![brightness=2 output](https://developers.cloudflare.com/_astro/brightness-2.D-IbGyod.jpg) |
| --- | --- | --- |
| **Original** | `brightness=0.5` | `brightness=2` |

### `compression`

Selects the output format that is quickest to compress. Accepts `fast`. The default is none.

The `compression=fast` option prioritizes encoding speed over output quality and file size, and will usually override the `format` parameter to choose JPEG over more efficient formats like AVIF or WebP. This slightly reduces latency on a cache miss, but may result in increased file size and lower image quality.

This option is not recommended, except in unusual circumstances like resizing uncacheable, dynamically-generated images.

```txt
compression=fast
```

```js
cf: {image: {compression: "fast"}}
```

### `contrast`

Adjusts the image's overall difference between the darkest and lightest parts using a multiplier.

- `1` (default) — No change to the original contrast.
- `< 1.0` — Decreases contrast, which makes shadows lighter and highlights darker.
- `> 1.0` — Increases contrast, which pushes shadows toward black and highlights toward white.

```txt
contrast=0.5
```

```js
cf: {image: {contrast: 0.5}}
```

| ![Original image](https://developers.cloudflare.com/_astro/original.DuemPfHh.jpg) | ![contrast=0.5 output](https://developers.cloudflare.com/_astro/contrast-0.5.BJSw_Q0N.jpg) | ![contrast=2 output](https://developers.cloudflare.com/_astro/contrast-2.yLjBBcQQ.jpg) |
| --- | --- | --- |
| **Original** | `contrast=0.5` | `contrast=2` |

### `dpr`

Scales the output resolution by a multiplier to match a user's specific screen density (for example, Retina or 4K). The default is `1`, which delivers the image at the exact width and height requested. The maximum supported value is `2`.

Modern devices have more physical pixels than CSS pixels. If you serve a 300px image in a 300px container on a high-DPR smartphone, then it will look blurry. Using `dpr=2` tells Cloudflare to send a 600px image for the same 300px container, which results in a clearer, crisper image.

The `dpr` parameter can be used with `srcset` to [serve responsive images](https://developers.cloudflare.com/images/optimization/make-responsive-images/).

```txt
dpr=1
```

```js
cf: {image: {dpr: 1}}
```

| ![dpr=1 output](https://developers.cloudflare.com/_astro/dpr-1.kw44tjdd.jpg) | ![dpr=2 output](https://developers.cloudflare.com/_astro/dpr-2.frEHI63e.jpg) |
| --- | --- |
| `width=300,height=200,dpr=1` | `width=300,height=200,dpr=2` |

### `draw`

Adds a text or image overlay. Overlays are drawn in the order they appear; the last overlay is the topmost layer.

Note

The URL interface supports `draw` only in transformation URLs for remote images.

To watermark a hosted image, configure the overlay in a [predefined variant](https://developers.cloudflare.com/images/optimization/hosted-images/create-variants/) or use the [Images binding in Workers](https://developers.cloudflare.com/images/optimization/binding/).

An overlay can be configured with the following settings:

| Setting | Applies to | Description |
| --- | --- | --- |
| `url` | Image | Sets the absolute URL of the overlay image. |
| `text` | Text | Sets the text string to render. |
| `font` | Text | Sets the font used to render the text. |
| `color` | Text | Sets the fill color for the text. |
| `size` | Text | Sets the font size in pixels. |
| `width`, `height` | Image | Sets the overlay dimensions in pixels or as percentage strings, such as `50p`. |
| `top`, `right`, `bottom`, `left` | Both | Positions the overlay as an offset, in pixels, to the specified edge. |
| `opacity` | Both | Sets the overlay opacity from `0.0` to `1.0`. |
| `repeat` | Both | Repeats the overlay horizontally, vertically, or in both directions. |
| `composite` | Both | Controls how the overlay blends with the base image. |

The `draw` parameter also accepts additional optimization settings, such as `width`, `height`, `blur`, and `rotate`.

```txt
draw=((url=/logo.png,bottom=5,right=5,width=50p))
```

```js
cf: {
  image: {
    draw: [
      {
        url: "https://example.com/logo.png",
        bottom: 5,
        right: 5,
        width: "50p",
      },
    ],
  },
}
```

For detailed setting descriptions and additional examples, refer to [Draw overlays and watermarks](https://developers.cloudflare.com/images/optimization/draw-overlays/).

For binding-specific methods and image sources, refer to [Optimize with Workers](https://developers.cloudflare.com/images/optimization/binding/).

### `fit`

Specifies how the image is fit to the target area. To select the upscaling algorithm on fit modes that enlarge an image, specify the `mode` and [`upscale`](#upscale) settings.

Fit is performed after setting the [`width`](#width) and [`height`](#height) dimensions of the image.

| Mode | Result | Preserve source aspect ratio | Upscales |
| --- | --- | --- | --- |
| `scale-down` (default) | Show entire image without cropping or upscaling | Yes | No |
| `contain` | Show entire image without cropping | Yes | Yes |
| `cover` | Fill the entire requested area, cropping if needed | No | Yes |
| `crop` | Fill the entire requested area, but never upscales | No | No |
| `aspect-crop` | Crop to match the target aspect ratio, but never upscales | No | No |
| `pad` | Fit within the target area, adding space for remaining area | Yes | No |
| `squeeze` | Scale to exact dimensions, distorting if needed | No | Yes |
| `scale-up` | Upscales while showing the entire image, but never downscales | Yes | Yes |

```txt
fit=contain
fit=(mode=contain,upscale=generate)
```

```js
cf: {image: {fit: "contain"}}
cf: {image: {fit: {mode: "contain", upscale: "generate"}}}
```

#### `scale-down`

Resizes the image to fit within the requested `width` and `height` dimensions while preserving its source aspect ratio, but never upscales the image. This is the default `fit` behavior.

When the original image is smaller than the target area, it is returned at its original dimensions. For example, a request to serve a 1080x720 image at 2000x2000 will return the image at 1080x720.

When larger, it downscales the image to fit the target area while matching the source aspect ratio.

In the example below, the 1080x720 image is resized to fit within the target 500x500 area. Since `scale-down` preserves the source aspect ratio (3:2), the final dimensions of the output image are 500x333.

| ![original image](https://developers.cloudflare.com/_astro/pete-landscape.C1O-FBM1.jpg) | ![target area](https://developers.cloudflare.com/_astro/1296x1296.BYEj6EvB.png) | ![fit=scale-down output](https://developers.cloudflare.com/_astro/pete-contain.B_qfOwMN.png) |
| --- | --- | --- |
| **Original**<br> 1080 x 720 (3:2) | **Requested**<br> 500 x 500 (1:1) | **Output**<br> 500 x 333 (3:2) |

#### `contain`

Resizes the image to be as large as possible within the requested `width` and `height` dimensions while preserving its source aspect ratio.

When the original image is larger than the target area, it downscales to fit the target area (like `scale-down`).

When smaller, it upscales instead (like `scale-up`). It can be configured with the [`upscale`](#upscale) setting to control the algorithm for enlarging an image. To avoid upscaling, use `scale-down`.

#### `cover`

Fills the entire target area, shrinking or enlarging the image if needed. The output area always matches the requested `width` and `height` dimensions exactly.

When the source and target aspect ratios differ, the image is resized to cover the full target area and any overflow is cropped. Use the [`gravity`](#gravity) parameter to control which part of the image is preserved during cropping.

It can be configured with the [`upscale`](#upscale) setting to control the algorithm for enlarging an image.

In the example below, the 1080×720 image is first resized to 750×500 (matching the requested height) to fit the target area, then cropped from the left and right edges to its final 500x500 dimensions.

| ![original image](https://developers.cloudflare.com/_astro/pete-landscape.C1O-FBM1.jpg) | ![target area](https://developers.cloudflare.com/_astro/1296x1296.BYEj6EvB.png) | ![fit=cover output](https://developers.cloudflare.com/_astro/pete-cover.ZWLczl5t.png) |
| --- | --- | --- |
| **Original**<br> 1080 x 720 (3:2) | **Requested**<br> 500 x 500 (1:1) | **Output**<br> 500 x 500 (1:1) |

When the original image is smaller than the target area, it upscales instead. To avoid upscaling, use `crop`.

#### `crop`

Resizes the image to fill the target area without upscaling.

When the original image is smaller than the target area, it keeps its original size and source aspect ratio (like `scale-down`).

In the example below, the original image (1080x720) is smaller than the target area (1296x1296), so it preserves its original size and source aspect ratio.

| ![original image](https://developers.cloudflare.com/_astro/pete-landscape.C1O-FBM1.jpg) | ![target area](https://developers.cloudflare.com/_astro/1296x1296.BYEj6EvB.png) | ![fit=crop output](https://developers.cloudflare.com/_astro/pete-landscape.C1O-FBM1.jpg) |
| --- | --- | --- |
| **Original**<br> 1080 x 720 (3:2) | **Requested**<br> 1296 x 1296 (1:1) | **Output**<br> 1080 x 720 (3:2) |

When the original image is larger than the target area, it behaves like `cover` (fills the target area and crops the rest) instead.

#### `aspect-crop`

Crops the image to match the target aspect ratio, scaling down if needed but never upscaling.

When the original image is larger than the target area, it downscales to the smallest size that still fills the target area, then is cropped to match the target aspect ratio (like `cover`).

When the original image is smaller than the target area, it keeps its original size but is cropped to match the target aspect ratio. Unlike `crop`, which preserves the original size and dimensions of smaller images, `aspect-crop` always enforces the target aspect ratio.

For example, a 612x613 image requested at 1920x1120 will not be upscaled. Instead, it stays at its original size and is cropped to 612x357, matching the 1920:1120 aspect ratio. Use the [`gravity`](#gravity) parameter to control which part of the image is preserved during cropping.

#### `pad`

Resizes the image to be as large as possible within the requested `width` and `height` dimensions while preserving its source aspect ratio. If the image does not fill the target area, then `pad` expands the final canvas to match the target area, but does not enlarge the original image within the canvas.

Works with the `background` parameter to fill any blank or transparent pixels. However, for web apps, you can often achieve the same visual result using the `contain` option with the CSS `object-fit: contain` property, which avoids encoding padding pixels into the image itself.

In the example below, the original image (1080x720) is smaller than the target area (1080x1080), so it creates space for the remaining pixels.

| ![original image](https://developers.cloudflare.com/_astro/pete-landscape.C1O-FBM1.jpg) | ![target area](https://developers.cloudflare.com/_astro/1296x1296.BYEj6EvB.png) | ![fit=pad output](https://developers.cloudflare.com/_astro/pete-pad.Ci9pnK3M.png) |
| --- | --- | --- |
| **Original**<br> 1080 x 720 (3:2) | **Requested**<br> 1080 x 1080 (1:1) | **Output**<br> 1080 x 1080 (1:1) |

#### `squeeze`

Resizes the image to match the requested width and height dimensions without cropping. This can distort the source image because `squeeze` does not preserve its aspect ratio.

| ![original image](https://developers.cloudflare.com/_astro/pete-landscape.C1O-FBM1.jpg) | ![fit=squeeze output](https://developers.cloudflare.com/_astro/pete-squeeze.BalgFHoW.jpg) |
| --- | --- |
| **Original**<br> 1080 x 720 | **Output**<br> 1080 x 540 |

| ![original image](https://developers.cloudflare.com/_astro/abstract.D7Gt8U3T.jpg) | ![fit=squeeze output](https://developers.cloudflare.com/_astro/abstract-squeeze.COdyKF4Z.jpg) |
| --- | --- |
| **Original**<br> 1080 x 1080 | **Output**<br> 1080 x 540 |

#### `scale-up`

Resizes the image to fit within the specified dimensions while preserving its source aspect ratio, but never downscales the image. This is the inverse of `scale-down`.

When the original image is larger than the target area, it is returned at its original dimensions.

When the original image is smaller than the target area, it is enlarged to fit within the target area. It can be configured with the [`upscale`](#upscale) setting to control the algorithm for enlarging an image.

#### `upscale`

Controls the algorithm used when an image needs to be enlarged. This setting is nested under [`fit`](#fit) with any mode that upscales, such as [`contain`](#contain), [`cover`](#cover), and [`scale-up`](#scale-up). It has no effect when `fit=scale-down` or when the target area is smaller than the source.

Accepts the following values:

- `interpolate` (default) — Uses bicubic interpolation, which may reduce image quality. This is the default behavior when `upscale` is not specified.
- `generate` — Uses AI upscaling ([ESRGAN ↗︎](https://github.com/xinntao/ESRGAN)) to produce sharper, more detailed results when enlarging images.

When `upscale=generate` is specified, the AI model runs a single pass at the nearest supported scale (2x or 4x), then adjusts to the exact target area. Scale factors beyond 4x are handled with AI upscaling to 4x, then bicubic interpolation for the remainder.

Note

`upscale=generate` has higher latency than `upscale=interpolate` due to GPU inference. Results are cached following the same [caching rules](https://developers.cloudflare.com/images/optimization/features/#caching) as other optimizations.

```txt
fit=(mode=contain,upscale=generate)
```

```js
cf: {image: {fit: {mode: "contain", upscale: "generate"}}}
```

#### `upscale`

Controls the algorithm used when an image needs to be enlarged. This setting is nested under [`fit`](#fit) with any mode that upscales, such as [`contain`](#contain), [`cover`](#cover), and [`scale-up`](#scale-up). It has no effect when `fit=scale-down` or when the target area is smaller than the source.

Accepts the following values:

- `interpolate` (default) — Uses bicubic interpolation, which may reduce image quality. This is the default behavior when `upscale` is not specified.
- `generate` — Uses AI upscaling ([ESRGAN ↗︎](https://github.com/xinntao/ESRGAN)) to produce sharper, more detailed results when enlarging images.

When `upscale=generate` is specified, the AI model runs a single pass at the nearest supported scale (2x or 4x), then adjusts to the exact target area. Scale factors beyond 4x are handled with AI upscaling to 4x, then bicubic interpolation for the remainder.

Note

`upscale=generate` has higher latency than `upscale=interpolate` due to GPU inference. Results are cached following the same [caching rules](https://developers.cloudflare.com/images/optimization/features/#caching) as other optimizations.

```txt
fit=(mode=contain,upscale=generate)
```

```js
cf: {image: {fit: {mode: "contain", upscale: "generate"}}}
```

### `flip`

Flips the image horizontally, vertically, or both.

Accepts the following values:

- `h` — Flips the image horizontally.
- `v` — Flips the image vertically.
- `hv` — Flips the image both horizontally and vertically.

Flip can be used with the [`rotate`](#rotate) parameter to set the orientation of the image. Flip is performed before rotation. For example, if you apply `flip=h,rotate=90`, then the image will be flipped horizontally, then rotated by 90 degrees.

```txt
flip=h
```

```js
cf: {image: {flip: "h"}}
```

| ![Original image](https://developers.cloudflare.com/_astro/original.DuemPfHh.jpg) | ![flip=h output](https://developers.cloudflare.com/_astro/flip-h.Qc63pcHu.jpg) | ![flip=v output](https://developers.cloudflare.com/_astro/flip-v.DuCcWsSK.jpg) |
| --- | --- | --- |
| **Original** | `flip=h` | `flip=v` |

### `format` | `f`

Specifies the output format for the image.

Accepts the following values:

- `auto` — Automatically serves the most efficient format that the requesting browser supports. When you serve a [hosted image](https://developers.cloudflare.com/images/optimization/hosted-images/create-variants/), this is the default `format` option.
- `avif` — Transcodes the image to AVIF, if possible. AVIF encoding can be an order of magnitude slower than encoding to other formats. If the image is too large to be quickly encoded to AVIF, then Cloudflare will fall back to WebP or JPEG.
- `webp` — Transcodes the image to Google WebP format. Use `quality=100` to return the WebP lossless format.
- `jpeg` — Transcodes the image in interlaced progressive JPEG format, in which data is compressed in multiple passes of progressively higher detail.
- `baseline-jpeg` — Transcode the image in baseline sequential JPEG format. It should be used in cases when target devices do not support progressive JPEG or other modern file formats.
- `json` — Outputs information about the image as a JSON object. This contains data such as image size (before and after resizing), the source image's MIME type, and file size.

```txt
format=auto
f=auto
```

```js
cf: {image: {format: "avif"}}
```

To use `format=auto` with a custom Worker, you need to parse the `Accept` header. Refer to [this example Worker](https://developers.cloudflare.com/images/optimization/transformations/transform-via-workers/#an-example-worker) for a complete overview of how to set up an image transformation Worker.

*Custom Worker for Image Resizing with format:autojs*

```js
const accept = request.headers.get("accept");
let image = {};

if (/image\/avif/.test(accept)) {
	image.format = "avif";
} else if (/image\/webp/.test(accept)) {
	image.format = "webp";
}

return fetch(url, { cf: { image } });
```

### `gamma`

Adjusts the exposure of an image using a multiplier. Gamma controls the midtone brightness without affecting the darkest or lightest parts of the image.

- `0` and `1` (default) — No change to the original gamma.
- `< 1.0` — Increases midtone brightness, making the image appear lighter overall.
- `> 1.0` — Decreases midtone brightness, making the image appear darker overall.

```txt
gamma=0.5
```

```js
cf: {image: {gamma: 0.5}}
```

| ![Original image](https://developers.cloudflare.com/_astro/original.DuemPfHh.jpg) | ![gamma=0.5 output](https://developers.cloudflare.com/_astro/gamma-0.5.Bcga364K.jpg) | ![gamma=2 output](https://developers.cloudflare.com/_astro/gamma-2.BrZb1hEC.jpg) |
| --- | --- | --- |
| **Original** | `gamma=0.5` | `gamma=2` |

### `gravity` | `g`

Specifies which part of the image to preserve when cropping with `fit=cover`, `fit=crop`, or `fit=aspect-crop`. If omitted, Cloudflare crops toward the center point of the source image.

Accepts `auto`, `face`, a side (`left`, `right`, `top`, `bottom`), or relative coordinates (`x` and `y`).

```txt
gravity=auto
gravity=face
gravity=left
gravity=(x=0.5,y=0.3)
g=auto
```

```js
cf: {image: {gravity: "auto"}}
cf: {image: {gravity: "face"}}
cf: {image: {gravity: "left"}}
cf: {image: {gravity: {x:0.5, y:0.3}}}
```

#### `auto`

Automatically sets the focal point by using a saliency algorithm to detect the most visually interesting pixels.

This is useful when you don't know the contents of the image ahead of time, such as with user-generated content. For large image libraries such as e-commerce product galleries, this feature eliminates the need to manually set a focal point for each image.

| ![original image](https://developers.cloudflare.com/_astro/coffee-base.B2l8XteX.jpg) | ![output without gravity=auto](https://developers.cloudflare.com/_astro/coffee-crop.BrOCyoCE.jpg) | ![output with gravity=auto](https://developers.cloudflare.com/_astro/coffee-auto.DAQPvZHc.jpg) |
| --- | --- | --- |
| **Original** | **Default crop** | `gravity=auto` |

#### `face`

Automatically sets the focal point based on faces in the image.

This can be combined with the [`zoom`](https://developers.cloudflare.com/images/optimization/features#zoom) parameter to specify how closely the image should be cropped toward the face.

| ![original image](https://developers.cloudflare.com/_astro/suad-kamardeen.O8gS5wPQ.jpeg) | ![output without gravity=face](https://developers.cloudflare.com/_astro/suad-kamardeen-crop.Btvf-dvP.jpeg) | ![output with gravity=face](https://developers.cloudflare.com/_astro/suad-kamardeen-face.3ZHIZdIY.jpeg) |
| --- | --- | --- |
| **Original** | **Default crop** | `gravity=face` |

*Photograph by [Suad Kamardeen (@suadkamardeen) on Unsplash ↗︎](https://unsplash.com/photos/woman-in-black-cardigan-standing-beside-pink-flowers-UO-82DJ3rcc)*

#### `left`, `right`, `top`, `bottom`

Sets the side of the image that should not be cropped.

In the example below, the 1080x720 image is cropped to a 1080x400 area, starting from its bottom edge:

| ![original image](https://developers.cloudflare.com/_astro/pete-landscape.C1O-FBM1.jpg) | ![output without gravity=auto](https://developers.cloudflare.com/_astro/pete-bottom.BD_YS29E.jpg) |
| --- | --- |
| **Original** | `gravity=bottom` |

#### `x`, `y`

Sets the focal point using relative `x` and `y` coordinates. Each setting accepts a decimal value from `0.0` to `1.0`. Cloudflare positions the relative coordinates of the output at the relative coordinates of the source image.

![Change the focal point using the relative coordinates](https://developers.cloudflare.com/cdn-cgi/image/onerror=redirect,width=1363,height=904,format=webp/_astro/xxy.pMA7L7Ny.png)

- **Horizontal value (X)** — `0.0` is the left edge and `1.0` is the right edge of the image.
- **Vertical value (Y)** — `0.0` is the top edge and `1.0` is the bottom edge of the image.

The example below crops a 900x900 image to 300x900 using (`x=0.33, y=0.5`) as the gravity point:

- Both the original image and target area will have gravity points set at 1/3 of the width from the left edge and 1/2 of the height from the top edge.
- The relative coordinates of the output gravity point are positioned at the relative coordinates of the original image. That is, the target area is positioned so that its gravity point sits at the same relative position in the original image (0.33, 0.5).
- The darkened parts of the image show the area outside of the requested output, which will be cropped.
- The final cropped result captures the 300x900 content that is around the gravity point ( `0.33, 0.5`).

| ![original image](https://developers.cloudflare.com/_astro/base.DwQU1Wiz.png) | ![align gravity points on original and target area](https://developers.cloudflare.com/_astro/rel-points.tebmJ081.png) | ![crop using new gravity point](https://developers.cloudflare.com/_astro/rel-alignment.u2L4c77x.png) | ![final output](https://developers.cloudflare.com/_astro/rel-output.1DSTik2r.png) |
| --- | --- | --- | --- |
| **Original**<br> | **Align**<br> | **Crop**<br> | **Output**<br> |

### `height` | `h`

Sets the height of the output image in pixels using a positive integer value. By default, Cloudflare uses the original height of the input image.

When `height` is set, the exact behavior depends on the [`fit`](#fit) parameter.

```txt
height=250
h=250
```

```js
cf: {image: {height: 250}}
```

### `metadata`

Controls how Images handles EXIF, XMP, and [IPTC-IIM](#iptc-iim) metadata in re-encoded output images.

Supports [Content Credentials ↗︎](https://contentcredentials.org/) (or C2PA) when the [**Preserve Content Credentials** setting](https://developers.cloudflare.com/images/optimization/preserve-content-credentials/) is enabled.

Accepts the following values:

- `copyright` (default) — Preserves C2PA metadata and the EXIF copyright tag, and discards all other EXIF, XMP, and IPTC-IIM metadata.
- `keep` — Preserves C2PA metadata, supported EXIF metadata except orientation, and supported XMP metadata. For JPEG sources, it also preserves supported IPTC-IIM metadata.
- `none` — Discards all C2PA, EXIF, XMP, and IPTC-IIM metadata.

The following rules apply:

- The `metadata` parameter is available through the URL interface, `cf.image` subrequests, and preset variants. The Images binding does not expose this parameter.
- When Images returns the source file unchanged, all embedded metadata, including Content Credentials, remains intact.
- Cloudflare does not create Content Credentials for sources that do not already contain them.
- Each of EXIF and XMP is capped at 64 KB after `metadata` mode filtering is applied. If the filtered metadata still exceeds this limit, it is dropped entirely rather than truncated.
- When supported by the source format, Cloudflare applies embedded color information and orientation before filtering output metadata.
- If [Polish](https://developers.cloudflare.com/images/polish/) is enabled, then all metadata may already be removed and this option will have no effect.

Support for extracting metadata from the source image (decode) and writing it to the output image (encode) varies by format:

| Format | Read from source | Write to output |
| --- | --- | --- |
| JPEG | C2PA, EXIF, XMP, IPTC-IIM | C2PA, EXIF, XMP, IPTC-IIM |
| PNG | C2PA, EXIF, XMP | C2PA, EXIF, XMP |
| WebP | C2PA, EXIF, XMP | C2PA, EXIF, XMP |
| AVIF | C2PA, EXIF, XMP | C2PA, EXIF |
| HEIC | C2PA, EXIF, XMP | Not an output format |
| GIF | C2PA | C2PA, XMP |
| TIFF | C2PA | Not an output format |

#### IPTC-IIM

The Information Interchange Model (IIM) is a legacy metadata standard developed by the International Press Telecommunications Council (IPTC). It stores attribution and rights information in JPEG images, including creator names, credits, sources, copyright notices, and special instructions.

With `metadata=keep`, Images preserves the original IPTC-IIM metadata in JPEG output. When Images converts a JPEG to PNG, WebP, or GIF, it maps supported IPTC-IIM fields to XMP:

| IPTC-IIM field | XMP destination |
| --- | --- |
| Copyright Notice | `dc:rights` |
| By-line | `dc:creator` |
| Credit | `photoshop:Credit` |
| Source | `photoshop:Source` |
| Special Instructions | `photoshop:Instructions` |

Invalid UTF-8 and other IPTC-IIM fields are not mapped. If the source already contains XMP, Images preserves that XMP without merging the IPTC-IIM fields. AVIF output does not preserve these mapped fields.

The default `metadata=copyright` value does not preserve IPTC-IIM Copyright Notice. Use `metadata=keep` to retain supported IPTC-IIM metadata.

```txt
metadata=none
```

```js
cf: {image: {metadata: "none"}}
```

### `onerror`

Redirects the end-user to the URL of the original source image when a fatal error prevents the image from being transformed. Accepts `redirect`. The default is none.

Note

This feature is available only when optimizing remote images through the URL interface. This is not supported for hosted images.

`onerror=redirect` works only if the source image is in the same zone (subdomains accepted).

This may be useful in cases where an image requires user authentication and the image cannot be fetched anonymously via Workers. However, this option is not recommended if the source image is very large.

```txt
onerror=redirect
```

### `quality` | `q`

Specifies the output quality of an image for JPEG, WebP, and AVIF formats. The default is `85`.

Accepts either a fixed value or a perceptual quality level:

- **Fixed quality** — Accepts a positive integer from `1` (low quality, small file size) to `100` (high quality, large file size).
- **Perceptual quality** — Accepts `high`, `medium-high`, `medium-low`, and `low`.

To override the specified quality when Cloudflare detects a slow connection, use the `level` setting for standard quality and the [`slow-connection`](#slow-connection) setting for the quality for slow connections.

When the output format is PNG, an explicit `quality` setting allows the use of PNG8 (palette) variant of the format.

```txt
quality=50
quality=low
quality=(level=80,slow-connection=40)
q=50
q=(v=80,sc=40)
```

```js
cf: {image: {quality: 50}}
cf: {image: {quality: "high"}}
```

#### `slow-connection`

Overrides `level` when Images detects a slow connection. Accepts the same fixed or perceptual values as `quality`. The default is none.

Note

This setting is available only when optimizing through the URL interface on Chromium-based browsers such as Chrome, Edge, and Opera.

To detect slow connections, enable any of the following client hints with an HTTP header:

```txt
accept-ch: rtt, save-data, ect, downlink
```

The `slow-connection` setting applies when the client hint is present and any of the following conditions are met:

- [rtt ↗︎](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/RTT): Greater than 150 ms.
- [save-data ↗︎](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Save-Data): Value is `on`.
- [ect ↗︎](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/ECT): Value is `slow-2g`, `2g`, or `3g`.
- [downlink ↗︎](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Downlink): Less than 5 Mbps.

### `rotate`

Rotates an image by a number of degrees. Accepts `90`, `180`, or `270`. The default is `0` (no rotation).

Rotation is performed before resizing; [`width`](#width) and [`height`](#height) options will refer to the axes after the image is rotated.

```txt
rotate=180
```

```js
cf: {image: {rotate: 180}}
```

| ![Original image](https://developers.cloudflare.com/_astro/original.DuemPfHh.jpg) | ![rotate=180 output](https://developers.cloudflare.com/_astro/rotate-180.Dx3iw1mv.jpg) |
| --- | --- |
| **Original** | `rotate=180` |

### `saturation`

Adjusts the color saturation of an image using a multiplier.

- `0` — Completely desaturates the image (grayscale).
- `< 1.0` — Reduces color intensity. For example, `0.5` is half as saturated.
- `1` (default) — No change to the original saturation.
- `> 1.0` — Increases color intensity. For example, `2` is twice as saturated.

```txt
saturation=0
saturation=2
```

```js
cf: {image: {saturation: 0}}
cf: {image: {saturation: 2}}
```

| ![Original image](https://developers.cloudflare.com/_astro/original.DuemPfHh.jpg) | ![saturation=0 output](https://developers.cloudflare.com/_astro/saturation-0.Cn9J5pmH.jpg) | ![saturation=2 output](https://developers.cloudflare.com/_astro/saturation-2.B7Pl0-wE.jpg) |
| --- | --- | --- |
| **Original** | `saturation=0` | `saturation=2` |

### `segment`

Automatically isolates the subject of an image by replacing the background with transparent pixels. Accepts `foreground`. The default is none.

This feature uses an open-source model called BiRefNet through [Workers AI](https://developers.cloudflare.com/workers-ai/). Read more about Cloudflare's [approach to responsible AI ↗︎](https://www.cloudflare.com/trust-hub/responsible-ai/).

Pricing

Parameters that use AI inference are billed as standard Images transformations. Each unique request counts toward your [Images Transformed](https://developers.cloudflare.com/images/pricing/#images-transformed) usage. There is no additional charge from [Workers AI](https://developers.cloudflare.com/workers-ai/platform/pricing/) or separate Neuron billing for these parameters.

```txt
segment=foreground
```

```js
cf: {image: {segment: "foreground"}}
```

| ![Original image](https://developers.cloudflare.com/_astro/original.DuemPfHh.jpg) | ![segment=foreground output](https://developers.cloudflare.com/_astro/segment-foreground.B6UYNLDs.png) |
| --- | --- |
| **Original** | `segment=foreground` |

### `sharpen`

Applies a sharpening filter to increase edge definition in an image. Supports both box and Gaussian filters using `mode`.

To apply a box-filter unsharp mask, set `sharpen` to a decimal value from `0` (no sharpening) to `10` (maximum sharpening). The recommended value for downscaled images is `1`. When `mode` is not specified, this is the default mask.

To configure a Gaussian-filter unsharp mask, set `mode` to `gaussian` and specify the following settings:

| Setting | Description | Accepted values |
| --- | --- | --- |
| `mode` | Applies a Gaussian sharpening filter. | `gaussian` |
| `amount` | Sets the sharpening strength to control how much isolated detail is added back. | Decimal from `0` to `10` |
| `sigma` | Controls how broadly the blur spreads. | Decimal greater than `0` and less than or equal to `5` |
| `threshold` (optional) | Sets the minimum difference required between the source and blurred pixels before sharpening is applied. If omitted, the default is `0`. | Integer from `0` to `255` |

A higher `sigma` value makes larger edges and object outlines more pronounced. A higher `threshold` limits sharpening to stronger edges. Pixels whose differences fall below the threshold are not sharpened.

```txt
sharpen=5
sharpen=(mode=box,amount=5)
sharpen=(mode=gaussian,amount=1,sigma=1.5,threshold=0)
```

```js
cf: {image: {sharpen: 5}}
cf: {image: {sharpen: {mode: "box", amount: 5}}}
cf: {image: {sharpen: {mode: "gaussian", amount: 1, sigma: 1.5, threshold: 0}}}
```

| ![Original image](https://developers.cloudflare.com/_astro/original.DuemPfHh.jpg) | ![sharpen=5 output](https://developers.cloudflare.com/_astro/sharpen-5.CyEreNja.jpg) |
| --- | --- |
| **Original** | `sharpen=5` |

### `trim`

Removes pixels around the sides of an image. You can trim an image based on its [border color](#trim-color), remove pixels from [individual sides](#trim-side), or preserve a [rectangular area](#trim-rectangle).

The `left` and `top` settings are used both to trim individual sides and to preserve a rectangle. Their meaning depends on the trim form:

- When trimming individual sides, `left` and `top` specify the amount removed from the corresponding edge.
- When preserving a rectangle, `left` and `top` specify the position of the rectangle’s upper-left corner. The `width` and `height` settings define the size of the preserved area.

Trim accounts for the [`dpr`](#dpr) setting and runs before resizing and rotation.

#### `color`

Automatically trims the sides of the image based on its border color. By default, Cloudflare detects the border color automatically.

To configure color detection, set `mode` to `color` and specify the following settings:

| Setting | Description | Accepted values |
| --- | --- | --- |
| `mode` | Applies border-color trimming. | `color` |
| `color` | Sets the border color to trim. If omitted, Images detects the color automatically. | Any valid CSS color |
| `tolerance` | Sets how closely pixels must match the border color. | Integer from `0` (no match required) to `255` (must match exactly) |
| `keep` | Sets the number of pixels from the original border to leave untrimmed. | Positive integer |

```txt
trim=color
trim=(mode=color,color=%23ffffff,tolerance=10,keep=5)
```

```js
cf: {
  image: {
    trim: "color",
  },
}

cf: {
  image: {
    trim: {
      mode: "color",
      color: "#ffffff",
      tolerance: 10,
      keep: 5,
    },
  },
}
```

#### `top`, `right`, `bottom`, `left`

Sets how much to remove from each side of the image. Each setting accepts a nonnegative integer pixel count or a percentage as a decimal between `0` and `1` or a string from `0p` through `100p`.

To trim 10% from the top and bottom and 20% from the left and right:

```txt
trim=(mode=area,top=10p,right=20p,bottom=10p,left=20p)
trim=(mode=area,top=0.1,right=0.2,bottom=0.1,left=0.2)
```

```js
// Trims 10% from the top and bottom, and 20% from the left and right
cf: {
  image: {
    trim: {
      mode: "area",
      top: "10p",
      right: "20p",
      bottom: "10p",
      left: "20p",
    },
  },
}
  cf: {
  image: {
    trim: {
      mode: "area",
      top: "0.1",
      right: "0.2",
      bottom: "0.1",
      left: "0.2",
    },
  },
}
```

To remove 800 pixels from the left side:

```txt
trim=(left=800)
```

```js
cf: {
  image: {
    trim: {
      left: 800,
    },
  },
}
```

#### `width`, `height`, `left`, `top`

Preserves a rectangular area of the image. `left` and `top` locate the area's upper-left corner within the source image. From that point, `width` sets how far the area extends to the right and `height` sets how far it extends down.

Each setting accepts an integer pixel count or a percentage string. `left` and `top` accept values from `0p` through `100p`. `width` and `height` accept values greater than `0p` through `100p`.

To remove 10 pixels from the left and top edges and preserve a 500x300 pixel area:

```txt
trim=(mode=area,left=10,top=10,width=500,height=300)
```

```js
cf: {
  image: {
    trim: {
      mode: "area",
      left: 10,
      top: 10,
      width: 500,
      height: 300,
    },
  },
}
```

### `width` | `w`

Sets the width of the output image in pixels using a positive integer value. By default, Cloudflare uses the original width of the input image.

When `width` is set, the exact behavior depends on the `fit` parameter.

Accepts the following values:

- A number in pixels (for example, `250`).
- `auto` — Automatically serves the image in the most optimal width based on available information about the browser and device. Supports `breakpoints` (client hints), `mobile` (user-agent detection), and `desktop` (user-agent detection) as settings.

```txt
width=250
w=250
```

```js
cf: {
  image: {
    width: 250,
  },
}
```

#### `width=auto`

When `width=auto` is set, Cloudflare resizes the image using information from client hints (sent by the browser) or by user-agent detection as a fallback.

To override the default widths, set `mode` to `auto` and specify any of the following settings:

| Setting | Description | Accepted values | Default |
| --- | --- | --- | --- |
| `mode` \| `m` | Applies automatic width selection. | `auto` | — |
| `breakpoints` \| `b` | Sets the available breakpoint widths, in pixels, when used with Client Hints. | List of integers | `320`, `768`, `960`, and `1200` |
| `mobile` \| `mb` | Sets the fallback width for mobile devices. | Integer | `768` |
| `desktop` \| `dt` | Sets the fallback width for desktop devices. | Integer | `1200` |

When optimizing remote images with `width=auto`, each unique width counts as a separate [billable transformation](https://developers.cloudflare.com/images/pricing/#images-transformed).

To learn how `width=auto` works, refer to our guide on [serving responsive images](https://developers.cloudflare.com/images/optimization/make-responsive-images/).

```txt
width=250
w=250
width=(mode=auto,mobile=600,desktop=1400,breakpoints=(400,800))
width=(m=auto,mb=600,dt=1400,bp=(400,800))
```

```js
cf: {
  image: {
    width: "250",
  },
}
```

### `zoom`

Specifies how closely the image is cropped toward detected faces when combined with the `gravity=face` option. Accepts a valid range between `0.0` (includes as much of the background as possible) and `1.0` (crops the image as closely to the face as possible). The default is `0`.

```txt
zoom=0.1
```

```js
cf: {image: {zoom: 0.5}}
```

## Recommended image sizes

Ideally, image sizes should match the exact size that they are displayed on the page. If the page contains thumbnails with markup such as `<img width="200" …>`, then images should be resized to `width=200`.

To [serve responsive images](https://developers.cloudflare.com/images/optimization/make-responsive-images/), you can use the HTML `srcset` attribute to let the provider pick the most optimal size. If you can't use the `<img srcset>` markup and have to hardcode specific maximum sizes, Cloudflare recommends the following sizes:

- Maximum of 1920 pixels for desktop browsers.
- Maximum of 960 pixels for tablets.
- Maximum of 640 pixels for mobile phones.

For example, `fit=scale-down,width=1920` sets a maximum size of 1920px and ensures that the image will not be enlarged unnecessarily.

You can detect device type by enabling the `CF-Device-Type` header [via Cache Rule](https://developers.cloudflare.com/cache/how-to/cache-rules/examples/cache-device-type/).

## Caching

When you optimize with Images, the original image will be fetched from the origin server and cached — following the usual rules of HTTP caching, `Cache-Control` header, etc.. Requests for multiple different image sizes are likely to reuse the cached original image without causing extra transfers from the origin server.

If [Custom Cache Keys](https://developers.cloudflare.com/cache/how-to/cache-keys/) are used for the origin image, the origin image might not be cached and might result in more calls to the origin.

Optimized images follow the same caching rules as the original image they were resized from, except the minimum cache time is one hour. If you need images to be updated more frequently, add `must-revalidate` to the `Cache-Control` header. The Images service supports cache revalidation, so we recommend serving images with the `Etag` header. Refer to the [Cache docs for more information](https://developers.cloudflare.com/cache/concepts/cache-control/#revalidation).

Cloudflare does not support purging optimized images individually. URLs starting with `/cdn-cgi/` cannot be purged. However, purging of the original image's URL will also purge all of its optimized versions.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/images/optimization/features/#page","headline":"Features","description":"Available Cloudflare Images optimization parameters for resizing, cropping, format conversion, and visual effects.","url":"https://developers.cloudflare.com/images/optimization/features/","inLanguage":"en","image":"https://developers.cloudflare.com/images/optimization/features/og.png?v=7aaa5e60f3daf043","dateModified":"2026-11-18","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
