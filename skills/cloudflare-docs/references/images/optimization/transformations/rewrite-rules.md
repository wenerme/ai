---
title: Set up rewrite rules
description: Use Transform Rules to rewrite URLs for Cloudflare Images transformations and serve images from custom paths.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/images/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Set up rewrite rules

You can use Transform Rules to rewrite URLs for every image that you transform through Images.

This page covers examples for the following scenarios:

* Serve images from custom paths
* Modify existing URLs to be compatible with transformations in Images
* Transform every image requested on your zone with Images

To create a rule:

1. In the Cloudflare dashboard, go to the **Rules Overview** page.  
[ Go to **Overview** ](https://dash.cloudflare.com/?to=/:account/:zone/rules/overview)
2. Select **Create rule** next to **URL Rewrite Rules**.

## Before you start

Every rule runs before and after the transformation request.

If the path for the request matches the path where the original images are stored on your server, this may cause the request to fetch the original image to loop.

To direct the request to the origin server, you can check for the string `image-resizing` in the `Via` header:

`...and (not (any(http.request.headers["via"][*] contains "image-resizing")))`

## Serve images from custom paths

By default, requests to transform images through Images are served from the `/cdn-cgi/image/` path. You can use Transform Rules to rewrite URLs.

### Basic version

Free and Pro plans support string matching rules (including wildcard operations) that do not require regular expressions.

This example lets you rewrite a request from `example.com/images` to `example.com/cdn-cgi/image/`:

Text in Expression Editor

```

(starts_with(http.request.uri.path, "/images")) and (not (any(http.request.headers["via"][*] contains "image-resizing")))


```

Text in Path > Rewrite to > Dynamic

```

concat("/cdn-cgi/image", substring(http.request.uri.path, 7))


```

### Advanced version

Note

This feature requires a Business or Enterprise plan to enable regex in Transform Rules. Refer to [Cloudflare Transform Rules Availability](https://developers.cloudflare.com/rules/transform/#availability) for more information.

There is an advanced version of Transform Rules supporting regular expressions.

This example lets you rewrite a request from `example.com/images` to `example.com/cdn-cgi/image/`:

Text in Expression Editor

```

(http.request.uri.path matches "^/images/.*$") and (not (any(http.request.headers["via"][*] contains "image-resizing")))


```

Text in Path > Rewrite to > Dynamic

```

regex_replace(http.request.uri.path, "^/images/", "/cdn-cgi/image/")


```

## Modify existing URLs to be compatible with transformations in Images

Note

This feature requires a Business or Enterprise plan to enable regex in Transform Rules. Refer to [Cloudflare Transform Rules Availability](https://developers.cloudflare.com/rules/transform/#availability) for more information.

This example lets you rewrite your URL parameters to be compatible with Images:

```

(http.request.uri matches "^/(.*)\\?width=([0-9]+)&height=([0-9]+)$")


```

Text in Path > Rewrite to > Dynamic

```

regex_replace(

  http.request.uri,

  "^/(.*)\\?width=([0-9]+)&height=([0-9]+)$",

  "/cdn-cgi/image/width=${2},height=${3}/${1}"

)


```

Leave the **Query** \> **Rewrite to** \> _Static_ field empty.

## Pass every image requested on your zone through Images

Note

This feature requires a Business or Enterprise plan to enable regular expressions in Transform Rules. Refer to [Cloudflare Transform Rules Availability](https://developers.cloudflare.com/rules/transform/#availability) for more information.

This example lets you transform every image that is requested on your zone with the `format=auto` option:

```

(http.request.uri.path.extension matches "(jpg)|(jpeg)|(png)|(gif)") and (not (any(http.request.headers["via"][*] contains "image-resizing")))


```

Text in Path > Rewrite to > Dynamic

```

regex_replace(http.request.uri.path, "/(.*)", "/cdn-cgi/image/format=auto/${1}")


```

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/images/","name":"Cloudflare Images"}},{"@type":"ListItem","position":3,"item":{"@id":"/images/optimization/","name":"Optimization"}},{"@type":"ListItem","position":4,"item":{"@id":"/images/optimization/transformations/","name":"Remote images (transformations)"}},{"@type":"ListItem","position":5,"item":{"@id":"/images/optimization/transformations/rewrite-rules/","name":"Set up rewrite rules"}}]}
```
