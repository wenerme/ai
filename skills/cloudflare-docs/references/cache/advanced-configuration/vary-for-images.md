---
title: Vary for images
description: Serve images in the best format for each visitor browser.
image: https://developers.cloudflare.com/core-services-preview.png
---

[Skip to content](#%5Ftop) 

# Vary for images

`Vary` is an HTTP response header that allows origins to serve variants of the same content that can be used depending on the browser sending the request.

Cloudflare sits in between the browser and the origin. When Cloudflare receives the origin’s response, the specific image variant is cached so that subsequent requests from browsers with the same image preferences can be served from cache. This also means that serving multiple image variants for the same asset will create distinct cache entries.

`Vary` for Images reduces the content-negotiation process by parsing a request’s `Accept` header, which is sent to the origin to deliver the correct content to the browser.

Vary for images is available for Pro, Business, and Enterprise customers.

## Availability

| Free         | Pro | Business | Enterprise |     |
| ------------ | --- | -------- | ---------- | --- |
| Availability | No  | Yes      | Yes        | Yes |

## File extensions

You can use vary for images on the file extensions below if the origin server sends the `Vary: Accept` response header. If the origin server sends `Vary: Accept` but does not serve the set variant, the response is not cached and displays `BYPASS` in the cache status in the response header. Additionally, the list of variant types the origin serves for each extension must be configured so that Cloudflare decides which variant to serve without contacting the origin server.

File extensions enabled for varying

* .avif
* .bmp
* .gif
* .jpg
* .jpeg
* .jp2
* .png
* .tif
* .tiff
* .webp

## Enable vary for images

Vary for Images is enabled through Cloudflare’s API by creating a variants rule. In the examples below, learn how to serve JPEG, WebP, and AVIF variants for `.jpeg` and `.jpg` extensions.

### Create a variants rule

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Zone Settings Write`
* `Zone Write`

Change variants setting

```

curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/cache/variants" \

  --request PATCH \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "value": {

        "jpeg": [

            "image/webp",

            "image/avif"

        ],

        "jpg": [

            "image/webp",

            "image/avif"

        ]

    }

  }'


```

Explain Code

### Modify to only allow WebP variants

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Zone Settings Write`
* `Zone Write`

Change variants setting

```

curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/cache/variants" \

  --request PATCH \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "value": {

        "jpeg": [

            "image/webp"

        ],

        "jpg": [

            "image/webp"

        ]

    }

  }'


```

Explain Code

### Delete the rule

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Zone Settings Write`
* `Zone Write`

Delete variants setting

```

curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/cache/variants" \

  --request DELETE \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"


```

### Get the rule

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Zone Settings Write`
* `Zone Settings Read`
* `Zone Read`
* `Zone Write`

Get variants setting

```

curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/cache/variants" \

  --request GET \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"


```

To learn more about purging varied images, refer to [Purge varied images](https://developers.cloudflare.com/cache/how-to/purge-cache/purge-varied-images/).

## Limitations

* For Vary for images to work, your image URLs must include the file extension in the path and not the query string. For example the URL `https://example.com/image.jpg` is compatible but `https://example.com/index.php?file=image.jpg` is not compatible.
* Your origin must return an image type matching the file extension in the URL when a HTTP client sends no `Accept` header, or an `Accept: */*` header. Otherwise, you will see `CF-Cache-Status: BYPASS` in the HTTP response headers.

```json
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cache/","name":"Cache / CDN"}},{"@type":"ListItem","position":3,"item":{"@id":"/cache/advanced-configuration/","name":"Advanced configuration"}},{"@type":"ListItem","position":4,"item":{"@id":"/cache/advanced-configuration/vary-for-images/","name":"Vary for images"}}]}
```
