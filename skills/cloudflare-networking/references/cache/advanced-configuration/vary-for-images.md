---
description: Serve images in the best format for each visitor browser.
title: Vary for images
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cache/llms.txt
> Use this file to discover all available pages before exploring further.

# Vary for images

Last updated Aug 14, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/cache/advanced-configuration/vary-for-images/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

The `Vary` HTTP response header tells Cloudflare that an origin can serve different versions of the same resource depending on the request headers. For images, this allows your origin to serve modern formats like WebP or AVIF to browsers that support them, while continuing to serve JPEG or PNG to others.

When Cloudflare receives a response with image variants, it caches each variant separately. Subsequent requests from browsers with the same image format preferences are served directly from cache without contacting your origin.

Vary for Images works by parsing the `Accept` header in each request to determine which image format the browser supports, then serving the matching cached variant.

Vary for images is available for Pro, Business, and Enterprise customers.

## Availability

|              | Free | Pro | Business | Enterprise |
| ------------ | ---- | --- | -------- | ---------- |
| Availability | No   | Yes | Yes      | Yes        |

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

Vary for Images is enabled through Cloudflare's API by creating a variants rule. In the examples below, learn how to serve JPEG, WebP, and AVIF variants for `.jpeg` and `.jpg` extensions.

### Create a variants rule

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/) is required:
* `Zone Settings Write`
* `Zone Write`

```bash
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

### Modify to only allow WebP variants

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/) is required:
* `Zone Settings Write`
* `Zone Write`

```bash
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

### Delete the rule

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/) is required:
* `Zone Settings Write`
* `Zone Write`

```bash
curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/cache/variants" \
	--request DELETE \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

### Get the rule

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/) is required:
* `Zone Settings Write`
* `Zone Settings Read`
* `Zone Read`
* `Zone Write`

```bash
curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/cache/variants" \
	--request GET \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

To learn more about purging varied images, refer to [Purge varied images](https://developers.cloudflare.com/cache/how-to/purge-cache/purge-varied-images/).

## Limitations

* For Vary for images to work, your image URLs must include the file extension in the path and not the query string. For example the URL `https://example.com/image.jpg` is compatible but `https://example.com/index.php?file=image.jpg` is not compatible.
* Your origin must return an image type matching the file extension in the URL when a HTTP client sends no `Accept` header, or an `Accept: */*` header. Otherwise, you will see `CF-Cache-Status: BYPASS` in the HTTP response headers.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cache/advanced-configuration/vary-for-images/#page","headline":"Vary for images · Cloudflare Cache (CDN) docs","description":"Serve images in the best format for each visitor browser.","url":"https://developers.cloudflare.com/cache/advanced-configuration/vary-for-images/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-14","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
