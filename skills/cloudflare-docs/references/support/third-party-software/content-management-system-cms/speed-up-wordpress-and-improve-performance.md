---
title: Speed Up WordPress and Improve Performance
description: Optimize WordPress performance with Cloudflare CDN.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

### Agents toolkit

* Agent setup
* Copy as Markdown

Open the Markdown file in a new tab

Ask Claude about this page

Ask ChatGPT about this page

Was this helpful?

YesNo

# Speed Up WordPress and Improve Performance

Cloudflare's CDN services can help cache your content across our giant global network, but performance isn't just about moving static files closer to your visitor. Cloudflare does more than offer a CDN, Cloudflare's optimisation features allow you to enhance the performance of your WordPress site beyond what a traditional CDN can do.

### Caching Anonymous Page Views

![Creating a cache rule for anonymous page views.](https://developers.cloudflare.com/_astro/hc-import-screen_shot_2017_03_09_at_16_54_36_1_.hRrVrFif_ZM7aKC.webp) 

Cloudflare's "[Bypass Cache on Cookie](https://developers.cloudflare.com/cache/how-to/cache-rules/examples/bypass-cache-on-cookie/)" functionality allows non-logged-in pages to be fully cached by Cloudflare. This means your server can save time and resources by not having to regenerate pages where the HTML is effectively static, whilst not interfering with dynamic behaviour - as soon as a user logs-in to the WordPress dashboard or adds something to their WooCommerce, the Edge cache is bypassed.

### Optimise Images

Images can be incredibly costly to page load times; fortunately, Cloudflare can dramatically help improve image load times. You can find these features in the Cloudflare dashboard by going to **Speed** \> **Settings** \> **Image Optimization**.

After enabling [**Polish**](https://developers.cloudflare.com/images/polish/), you can dramatically improve image and web page load times by compressing images and stripping metadata. Lossless will strip most metadata (`EXIF` data, for example) but doesn't change the image detail. Lossy will strip most metadata and compresses images by approximately 48 percent.

### Enable HTTP/2

**HTTP/2** allows for a multitude of performance features including multiplexing, header compression. In order to enable HTTP/2 on your WordPress site, ensure that your site is loaded over HTTPS.

After **enabling SSL** you must also ensure that users are redirected to the HTTPS version so that it can be loaded over HTTP/2\. You can do this using an _Always use HTTPS_ **Page Rule**:

![Create a page rule to ensure your Wordpress website is correctly loaded over HTTP/2](https://developers.cloudflare.com/_astro/hc-import-screen_shot_2016_09_30_at_15_34_14.DNIz1oVk_1HU8mL.webp) 

Cloudflare's **WordPress plugin** allows you to push necessary assets to your users using HTTP/2 Server Push, dramatically reducing the amount of roundtrips required to load CSS and JavaScript. Refer to [How do I enable HTTP/2 Server Push in WordPress ↗](https://developers.cloudflare.com/support/third-party-software/content-management-system-cms/how-do-i-enable-http2-server-push-in-wordpress/) for a tutorial on setting it up.

### Minify Assets

If you are using Grunt or Gulp as part of a build process, you can implement minification in your builds.

Due to HTTP/2 multiplexing requests, we advise against concatenating CSS or JavaScript files together or installing anything on your server which may do this.

### Advanced Performance Tools

Enterprise users can utilise [Prefetching URLs From HTML Headers](https://developers.cloudflare.com/speed/optimization/content/prefetch-urls/) and [custom cache keys](https://developers.cloudflare.com/cache/how-to/cache-keys/) to enhance caching.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/support/","name":"Support"}},{"@type":"ListItem","position":3,"item":{"@id":"/support/third-party-software/","name":"Third-Party Software"}},{"@type":"ListItem","position":4,"item":{"@id":"/support/third-party-software/content-management-system-cms/","name":"Content Management System (CMS)"}},{"@type":"ListItem","position":5,"item":{"@id":"/support/third-party-software/content-management-system-cms/speed-up-wordpress-and-improve-performance/","name":"Speed Up WordPress and Improve Performance"}}]}
```
