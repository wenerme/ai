---
title: Transform via URL
description: You can convert and resize images by requesting them via a specially-formatted URL. This way you do not need to write any code, only change HTML markup of your website to use the new URLs. The format is:
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/images/transform-images/transform-via-url.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Transform via URL

You can convert and resize images by requesting them via a specially-formatted URL. This way you do not need to write any code, only change HTML markup of your website to use the new URLs. The format is:

```

https://<ZONE>/cdn-cgi/image/<OPTIONS>/<SOURCE-IMAGE>


```

Here is a breakdown of each part of the URL:

* `<ZONE>`  
   * Your domain name on Cloudflare. Unlike other third-party image resizing services, image transformations do not use a separate domain name for an API. Every Cloudflare zone with image transformations enabled can handle resizing itself. In URLs used on your website this part can be omitted, so that URLs start with `/cdn-cgi/image/`.
* `/cdn-cgi/image/`  
   * A fixed prefix that identifies that this is a special path handled by Cloudflare's built-in Worker.
* `<OPTIONS>`  
   * A comma-separated list of options such as `width`, `height`, and `quality`.
* `<SOURCE-IMAGE>`  
   * An absolute path on the origin server, or an absolute URL (starting with `https://` or `http://`), pointing to an image to resize. The path is not URL-encoded, so the resizing URL can be safely constructed by concatenating `/cdn-cgi/image/options` and the original image URL. For example: `/cdn-cgi/image/width=100/https://s3.example.com/bucket/image.png`.

Here is an example of an URL with `<OPTIONS>` set to `width=80,quality=75` and a `<SOURCE-IMAGE>` of `uploads/avatar1.jpg`:

```

<img src="/cdn-cgi/image/width=80,quality=75/uploads/avatar1.jpg" />


```

Note

You can use image transformations to sanitize SVGs, but not to resize them. Refer to [Resize with Workers](https://developers.cloudflare.com/images/transform-images/transform-via-workers/) for more information.

## Options

You must specify at least one option. Options are comma-separated (spaces are not allowed anywhere). Names of options can be specified in full or abbreviated.

### `anim`

Whether to preserve animation frames from input files. Default is `true`. Setting it to `false` reduces animations to still images. This setting is recommended when enlarging images or processing arbitrary user content, because large GIF animations can weigh tens or even hundreds of megabytes. It is also useful to set `anim:false` when using `format:"json"` to get the response quicker without the number of frames.

* [ URL format ](#tab-panel-4836)
* [ Workers ](#tab-panel-4837)

```

anim=false


```

JavaScript

```

cf: {image: {anim: false}}


```

### `background`

Background color to add underneath the image. Applies to images with transparency (for example, PNG) and images resized with `fit=pad`. Accepts any CSS color using CSS4 modern syntax, such as `rgb(255 255 0)` and `rgba(255 255 0 100)`.

* [ URL format ](#tab-panel-4838)
* [ Workers ](#tab-panel-4839)

```

background=%23RRGGBB


OR


background=red


OR


background=rgb%28240%2C40%2C145%29


```

JavaScript

```

cf: {image: {background: "#RRGGBB"}}


OR


cf:{image: {background: "rgba(240,40,145,0)"}}


```

### `blur`

Blur radius between `1` (slight blur) and `250` (maximum). Be aware that you cannot use this option to reliably obscure image content, because savvy users can modify an image's URL and remove the blur option. Use Workers to control which options can be set.

* [ URL format ](#tab-panel-4840)
* [ Workers ](#tab-panel-4841)

```

blur=50


```

JavaScript

```

cf: {image: {blur: 50}}


```

### `border`

Adds a border around the image. The border is added after resizing. Border width takes `dpr` into account, and can be specified either using a single `width` property, or individually for each side.

* [ Workers ](#tab-panel-4834)

JavaScript

```

cf: {image: {border: {color: "rgb(0,0,0,0)", top: 5, right: 10, bottom: 5, left: 10}}}

cf: {image: {border: {color: "#FFFFFF", width: 10}}}


```

### `brightness`

Increase brightness by a factor. A value of `1.0` equals no change, a value of `0.5` equals half brightness, and a value of `2.0` equals twice as bright. `0` is ignored.

* [ URL format ](#tab-panel-4842)
* [ Workers ](#tab-panel-4843)

```

brightness=0.5


```

JavaScript

```

cf: {image: {brightness: 0.5}}


```

### `compression`

Slightly reduces latency on a cache miss by selecting a quickest-to-compress file format, at a cost of increased file size and lower image quality. It will usually override the `format` option and choose JPEG over WebP or AVIF. We do not recommend using this option, except in unusual circumstances like resizing uncacheable dynamically-generated images.

* [ URL format ](#tab-panel-4844)
* [ Workers ](#tab-panel-4845)

```

compression=fast


```

JavaScript

```

cf: {image: {compression: "fast"}}


```

### `contrast`

Increase contrast by a factor. A value of `1.0` equals no change, a value of `0.5` equals low contrast, and a value of `2.0` equals high contrast. `0` is ignored.

* [ URL format ](#tab-panel-4846)
* [ Workers ](#tab-panel-4847)

```

contrast=0.5


```

JavaScript

```

cf: {image: {contrast: 0.5}}


```

### `dpr`

Device Pixel Ratio. Default is `1`. Multiplier for `width`/`height` that makes it easier to specify higher-DPI sizes in `<img srcset>`.

* [ URL format ](#tab-panel-4848)
* [ Workers ](#tab-panel-4849)

```

dpr=1


```

JavaScript

```

cf: {image: {dpr: 1}}


```

### `fit`

Affects interpretation of `width` and `height`. All resizing modes preserve aspect ratio. Used as a string in Workers integration. Available modes are:

* `scale-down`  
Similar to `contain`, but the image is never enlarged. If the image is larger than given `width` or `height`, it will be resized. Otherwise its original size will be kept.
* `contain`  
Image will be resized (shrunk or enlarged) to be as large as possible within the given `width` or `height` while preserving the aspect ratio. If you only provide a single dimension (for example, only `width`), the image will be shrunk or enlarged to exactly match that dimension.
* `cover`  
Resizes (shrinks or enlarges) to fill the entire area of `width` and `height`. If the image has an aspect ratio different from the ratio of `width` and `height`, it will be cropped to fit.
* `crop`  
Image will be shrunk and cropped to fit within the area specified by `width` and `height`. The image will not be enlarged. For images smaller than the given dimensions, it is the same as `scale-down`. For images larger than the given dimensions, it is the same as `cover`. See also [trim](#trim)
* `pad`  
Resizes to the maximum size that fits within the given `width` and `height`, and then fills the remaining area with a `background` color (white by default). This mode is not recommended, since you can achieve the same effect more efficiently with the `contain` mode and the CSS `object-fit: contain` property.
* `squeeze`Resizes the image to the exact width and height specified. This mode does not preserve the original aspect ratio and will cause the image to appear stretched or squashed.

* [ URL format ](#tab-panel-4850)
* [ Workers ](#tab-panel-4851)

```

fit=scale-down


```

JavaScript

```

cf: {image: {fit: "scale-down"}}


```

### `flip`

Flips the image horizontally, vertically, or both. Can be used with the `rotate` parameter to set the orientation of an image.

Flipping is performed before rotation. For example, if you apply `flip=h,rotate=90,` then the image will be flipped horizontally, then rotated by 90 degrees.

Available options are:

* `h`: Flips the image horizontally.
* `v`: Flips the image vertically.
* `hv`: Flips the image vertically and horizontally.

* [ URL format ](#tab-panel-4852)
* [ Workers ](#tab-panel-4853)

```

flip=h


```

JavaScript

```

cf: {image: {flip: "h"}}


```

### `format`

The `auto` option will serve the WebP or AVIF format to browsers that support it. If this option is not specified, a standard format like JPEG or PNG will be used. Cloudflare will default to JPEG when possible due to the large size of PNG files.

Other supported options:

* `avif`: Generate images in AVIF format if possible (with WebP as a fallback).
* `webp`: Generate images in Google WebP format. Set the quality to `100` to get the WebP lossless format.
* `jpeg`: Generate images in interlaced progressive JPEG format, in which data is compressed in multiple passes of progressively higher detail.
* `baseline-jpeg`: Generate images in baseline sequential JPEG format. It should be used in cases when target devices don't support progressive JPEG or other modern file formats.
* `json`: Instead of generating an image, outputs information about the image in JSON format. The JSON object will contain data such as image size (before and after resizing), source image's MIME type, and file size.

**Alias:** `f`

* [ URL format ](#tab-panel-4854)
* [ URL format alias ](#tab-panel-4855)
* [ Workers ](#tab-panel-4856)

```

format=auto


```

```

f=auto


```

JavaScript

```

cf: {image: {format: "avif"}}


```

For the `format:auto` option to work with a custom Worker, you need to parse the `Accept` header. Refer to [this example Worker](https://developers.cloudflare.com/images/transform-images/transform-via-workers/#an-example-worker) for a complete overview of how to set up an image transformation Worker.

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

### `gamma`

Increase exposure by a factor. A value of `1.0` equals no change, a value of `0.5` darkens the image, and a value of `2.0` lightens the image. `0` is ignored.

* [ URL format ](#tab-panel-4857)
* [ Workers ](#tab-panel-4858)

```

gamma=0.5


```

JavaScript

```

cf: {image: {gamma: 0.5}}


```

### `gravity`

Specifies how an image should be cropped when used with `fit=cover` and `fit=crop`. Available options are `auto`, `face`, a side (`left`, `right`, `top`, `bottom`), and relative coordinates (`XxY` with a valid range of `0.0` to `1.0`):

* `auto`  
Selects focal point based on saliency detection (using maximum symmetric surround algorithm).
* `side`  
A side (`"left"`, `"right"`, `"top"`, `"bottom"`) or coordinates specified on a scale from `0.0` (top or left) to `1.0` (bottom or right), `0.5` being the center. The X and Y coordinates are separated by lowercase `x` in the URL format. For example, `0x1` means left and bottom, `0.5x0.5` is the center, `0.5x0.33` is a point in the top third of the image.  
For the Workers integration, use an object `{x, y}` to specify coordinates. It contains focal point coordinates in the original image expressed as fractions ranging from `0.0` (top or left) to `1.0` (bottom or right), with `0.5` being the center. `{fit: "cover", gravity: {x:0.5, y:0.2}}` will crop each side to preserve as much as possible around a point at 20% of the height of the source image.

Note

You must subtract the height of the image before you calculate the focal point.

* `face`  
Automatically sets the focal point based on detected faces in an image. This can be combined with the `zoom` parameter to specify how closely the image should be cropped towards the faces.  
The new focal point is determined by a minimum bounding box that surrounds all detected faces. If no faces are found, then the focal point will fall back to the center of the image.  
This feature uses an open-source model called RetinaFace through WorkersAI. Our model pipeline is limited only to facial detection, or identifying the pixels that represent a human face. We do not support facial identification or recognition. Read more about Cloudflare's [approach to responsible AI ↗](https://www.cloudflare.com/trust-hub/responsible-ai/).

**Alias:** `g`

* [ URL format ](#tab-panel-4859)
* [ URL format alias ](#tab-panel-4860)
* [ Workers ](#tab-panel-4861)

```

gravity=auto


OR


gravity=left


OR


gravity=0x1


OR


gravity=face


```

```

g=auto


OR


g=left


OR


g=0x1


OR


g=face


```

JavaScript

```

cf: {image: {gravity: "auto"}}


OR


cf: {image: {gravity: "right"}}


OR


cf: {image: {gravity: {x:0.5, y:0.2}}}


OR


cf: {image: {gravity: "face"}}


```

```

```

### `height`

Specifies maximum height of the image in pixels. Exact behavior depends on the `fit` mode (described below).

**Alias:** `h`

* [ URL format ](#tab-panel-4862)
* [ URL format alias ](#tab-panel-4863)
* [ Workers ](#tab-panel-4864)

```

height=250


```

```

h=250


```

JavaScript

```

cf: {image: {height: 250}}


```

### `metadata`

Controls amount of invisible metadata (EXIF data) that should be preserved. Color profiles and EXIF rotation are applied to the image even if the metadata is discarded. Content Credentials (C2PA metadata) may be preserved if the [setting is enabled](https://developers.cloudflare.com/images/transform-images/preserve-content-credentials).

Available options are `copyright`, `keep`, and `none`. The default for all JPEG images is `copyright`. WebP and PNG output formats will always discard EXIF metadata.

Note

* If [Polish](https://developers.cloudflare.com/images/polish/) is enabled, then all metadata may already be removed and this option will have no effect.
* Even when choosing to keep EXIF metadata, Cloudflare will modify JFIF data (potentially invalidating it) to avoid the known incompatibility between the two standards. For more details, refer to [JFIF Compatibility ↗](https://en.wikipedia.org/wiki/JPEG%5FFile%5FInterchange%5FFormat#Compatibility).

Options include:

* `copyright`  
Discards all EXIF metadata except copyright tag. If C2PA metadata preservation is enabled, then this option will preserve all Content Credentials.
* `keep`  
Preserves most of EXIF metadata, including GPS location if present. If C2PA metadata preservation is enabled, then this option will preserve all Content Credentials.
* `none`  
Discards all invisible EXIF and C2PA metadata. If the output format is WebP or PNG, then all metadata will be discarded.

* [ URL format ](#tab-panel-4865)
* [ Workers ](#tab-panel-4866)

```

metadata=none


```

JavaScript

```

cf: {image: {metadata: "none"}}


```

### `onerror`

Note

This setting only works directly with [image transformations](https://developers.cloudflare.com/images/transform-images/) and does not support resizing with Cloudflare Workers.

In case of a [fatal error](https://developers.cloudflare.com/images/reference/troubleshooting/#error-responses-from-resizing) that prevents the image from being resized, redirects to the unresized source image URL. This may be useful in case some images require user authentication and cannot be fetched anonymously via Worker. This option should not be used if there is a chance the source image is very large. This option is ignored if the image is from another domain, but you can use it with subdomains.

* [ URL format ](#tab-panel-4835)

```

onerror=redirect


```

### `quality`

Specifies quality for images in JPEG, WebP, and AVIF formats. The quality is in a 1-100 scale, but useful values are between `50` (low quality, small file size) and `90` (high quality, large file size). `85` is the default. When using the PNG format, an explicit quality setting allows use of PNG8 (palette) variant of the format. Use the `format=auto` option to allow use of WebP and AVIF formats.

We also allow setting one of the perceptual quality levels `high|medium-high|medium-low|low`

**Alias:** `q`

* [ URL format ](#tab-panel-4867)
* [ URL format alias ](#tab-panel-4868)
* [ Workers ](#tab-panel-4869)

```

quality=50


OR


quality=low


```

```

q=50


OR


q=medium-high


```

JavaScript

```

cf: {image: {quality: 50}}


OR


cf: {image: {quality: "high"}}


```

### `rotate`

Number of degrees (`90`, `180`, or `270`) to rotate the image by. `width` and `height` options refer to axes after rotation.

* [ URL format ](#tab-panel-4870)
* [ Workers ](#tab-panel-4871)

```

rotate=90


```

JavaScript

```

cf: {image: {rotate: 90}}


```

### `saturation`

Increases saturation by a factor. A value of `1.0` equals no change, a value of `0.5` equals half saturation, and a value of `2.0` equals twice as saturated. A value of `0` will convert the image to grayscale.

* [ URL format ](#tab-panel-4872)
* [ Workers ](#tab-panel-4873)

```

saturation=0.5


```

JavaScript

```

cf: {image: {saturation: 0.5}}


```

### `segment`

Automatically isolates the subject of an image by replacing the background with transparent pixels.

This feature uses an open-source model called BiRefNet through Workers AI. Read more about Cloudflare's [approach to responsible AI ↗](https://www.cloudflare.com/trust-hub/responsible-ai/).

* [ URL format ](#tab-panel-4874)
* [ Workers ](#tab-panel-4875)

```

segment=foreground


```

JavaScript

```

cf: {segment: "foreground"}


```

### `sharpen`

Specifies strength of sharpening filter to apply to the image. The value is a floating-point number between `0` (no sharpening, default) and `10` (maximum). `1` is a recommended value for downscaled images.

* [ URL format ](#tab-panel-4876)
* [ Workers ](#tab-panel-4877)

```

sharpen=2


```

JavaScript

```

cf: {image: {sharpen: 2}}


```

### `slow-connection-quality`

Allows overriding `quality` value whenever a slow connection is detected.

Available options are same as [quality](https://developers.cloudflare.com/images/transform-images/transform-via-url/#quality).

**Alias:** `scq`

* [ URL format ](#tab-panel-4878)
* [ URL format alias ](#tab-panel-4879)

```

slow-connection-quality=50


```

```

scq=50


```

Detecting slow connections is currently only supported on Chromium-based browsers such as Chrome, Edge, and Opera.

You can enable any of the following client hints via HTTP in a header

```

accept-ch: rtt, save-data, ect, downlink


```

slow-connection-quality applies whenever any of the following is true and the client hint is present:

* [rtt ↗](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/RTT): Greater than 150ms.
* [save-data ↗](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Save-Data): Value is "on".
* [ect ↗](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/ECT): Value is one of `slow-2g|2g|3g`.
* [downlink ↗](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Downlink): Less than 5Mbps.

### `trim`

Specifies a number of pixels to cut off on each side. Allows removal of borders or cutting out a specific fragment of an image. Trimming is performed before resizing or rotation. Takes `dpr` into account. For image transformations and Cloudflare Images, use as four numbers in pixels separated by a semicolon, in the form of `top;right;bottom;left` or via separate values `trim.width`,`trim.height`, `trim.left`,`trim.top`. For the Workers integration, specify an object with properties: `{top, right, bottom, left, width, height}`.

* [ URL format ](#tab-panel-4880)
* [ Workers ](#tab-panel-4881)

```

trim=20;30;20;0

trim.width=678

trim.height=678

trim.left=30

trim.top=40


```

JavaScript

```

cf: {image: {trim: {top: 12,  right: 78, bottom: 34, left: 56, width:678, height:678}}}


```

The API also supports automatic border removal based on color. This can be enabled by setting `trim=border` for automatic color detection, or customized with the parameters below.

`trim.border.color`The border color to trim. Accepts any CSS color using CSS4 modern syntax, such as `rgb(255 255 0)`. If omitted, the color is detected automatically.

`trim.border.tolerance`The matching tolerance for the color, on a scale of 0 to 255.

`trim.border.keep`The number of pixels of the original border to leave untrimmed.

* [ URL format ](#tab-panel-4882)
* [ Workers ](#tab-panel-4883)

```

trim=border


OR


trim.border.color=%23000000

trim.border.tolerance=5

trim.border.keep=10


```

JavaScript

```

cf: {image: {trim: "border"}}


OR


cf: {image: {trim: {border: {color: "#000000", tolerance: 5, keep: 10}}}}


```

### `width`

Specifies maximum width of the image. Exact behavior depends on the `fit` mode; use the `fit=scale-down` option to ensure that the image will not be enlarged unnecessarily.

Available options are a specified width in pixels or `auto`.

**Alias:** `w`

* [ URL format ](#tab-panel-4884)
* [ URL format alias ](#tab-panel-4885)
* [ Workers ](#tab-panel-4886)

```

width=250


```

```

w=250


```

JavaScript

```

cf: {image: {width: 250}}


```

Ideally, image sizes should match the exact dimensions at which they are displayed on the page. If the page contains thumbnails with markup such as `<img width="200">`, then you can resize the image by applying `width=200`.

[To serve responsive images](https://developers.cloudflare.com/images/transform-images/make-responsive-images/#transform-with-html-srcset), you can use the HTML `srcset` element and apply width parameters.

`auto` \- Automatically serves the image in the most optimal width based on available information about the browser and device. This method is supported only by Chromium browsers. For more information about this works, refer to [Transform width parameter](https://developers.cloudflare.com/images/transform-images/make-responsive-images/#transform-with-width-parameter).

### `zoom`

Specifies how closely the image is cropped toward the face when combined with the `gravity=face` option. Valid range is from `0` (includes as much of the background as possible) to `1` (crops the image as closely to the face as possible), decimals allowed. The default is `0`.

This controls the threshold for how much of the surrounding pixels around the face will be included in the image and takes effect only if face(s) are detected in the image.

* [ URL format ](#tab-panel-4887)
* [ URL format alias ](#tab-panel-4888)
* [ Workers ](#tab-panel-4889)

```

zoom=0.1


```

```

zoom=0.2

OR


face-zoom=0.2


```

JavaScript

```

cf: {image: {zoom: 0.5}}


```

## Recommended image sizes

Ideally, image sizes should match exactly the size they are displayed on the page. If the page contains thumbnails with markup such as `<img width="200" …>`, then images should be resized to `width=200`. If the exact size is not known ahead of time, use the [responsive images technique](https://developers.cloudflare.com/images/manage-images/create-variants/).

If you cannot use the `<img srcset>` markup, and have to hardcode specific maximum sizes, Cloudflare recommends the following sizes:

* Maximum of 1920 pixels for desktop browsers.
* Maximum of 960 pixels for tablets.
* Maximum of 640 pixels for mobile phones.

Here is an example of markup to configure a maximum size for your image:

```

/cdn-cgi/image/fit=scale-down,width=1920/<YOUR-IMAGE>


```

The `fit=scale-down` option ensures that the image will not be enlarged unnecessarily.

You can detect device type by enabling the `CF-Device-Type` header [via Cache Rule](https://developers.cloudflare.com/cache/how-to/cache-rules/examples/cache-device-type/).

## Caching

Resizing causes the original image to be fetched from the origin server and cached — following the usual rules of HTTP caching, `Cache-Control` header, etc.. Requests for multiple different image sizes are likely to reuse the cached original image, without causing extra transfers from the origin server.

Note

If Custom Cache Keys are used for the origin image, the origin image might not be cached and might result in more calls to the origin.

Resized images follow the same caching rules as the original image they were resized from, except the minimum cache time is one hour. If you need images to be updated more frequently, add `must-revalidate` to the `Cache-Control` header. Resizing supports cache revalidation, so we recommend serving images with the `Etag` header. Refer to the [Cache docs for more information](https://developers.cloudflare.com/cache/concepts/cache-control/#revalidation).

Cloudflare Images does not support purging resized variants individually. URLs starting with `/cdn-cgi/` cannot be purged. However, purging of the original image's URL will also purge all of its resized variants.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/images/","name":"Cloudflare Images"}},{"@type":"ListItem","position":3,"item":{"@id":"/images/transform-images/","name":"Transform images"}},{"@type":"ListItem","position":4,"item":{"@id":"/images/transform-images/transform-via-url/","name":"Transform via URL"}}]}
```
