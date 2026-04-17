---
title: Activate Polish
description: Images in the cache must be purged or expired before seeing any changes in Polish settings.
image: https://developers.cloudflare.com/dev-products-preview.png
---

[Skip to content](#%5Ftop) 

Was this helpful?

YesNo

[ Edit page ](https://github.com/cloudflare/cloudflare-docs/edit/production/src/content/docs/images/polish/activate-polish.mdx) [ Report issue ](https://github.com/cloudflare/cloudflare-docs/issues/new/choose) 

Copy page

# Activate Polish

Images in the [cache must be purged](https://developers.cloudflare.com/cache/how-to/purge-cache/) or expired before seeing any changes in Polish settings.

Warning

Do not activate Polish and [image transformations](https://developers.cloudflare.com/images/optimization/transformations/overview) simultaneously. Image transformations already apply lossy compression, which makes Polish redundant.

1. In the Cloudflare dashboard, go to the **Account home** page.  
[ Go to **Account home** ](https://dash.cloudflare.com/?to=/:account/home)
2. Select the domain where you want to activate Polish.
3. Select **Speed** \> **Settings** \> **Image Optimization**.
4. Under **Polish**, select _Lossy_ or _Lossless_ from the drop-down menu. [_Lossy_](https://developers.cloudflare.com/images/polish/compression/#lossy) gives greater file size savings.
5. (Optional) Select **WebP**. Enable this option if you want to further optimize PNG and JPEG images stored in the origin server, and serve them as WebP files to browsers that support this format.

To ensure WebP is not served from cache to a browser without WebP support, disable any WebP conversion utilities at your origin web server when using Polish.

Note

To use this feature on specific hostnames - instead of across your entire zone - use a [configuration rule](https://developers.cloudflare.com/rules/configuration-rules/).

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/images/","name":"Cloudflare Images"}},{"@type":"ListItem","position":3,"item":{"@id":"/images/polish/","name":"Cloudflare Polish"}},{"@type":"ListItem","position":4,"item":{"@id":"/images/polish/activate-polish/","name":"Activate Polish"}}]}
```
