---
description: Learn how to turn off Auto Minify via API in Cloudflare.
title: Turn off Auto Minify via API
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/speed/llms.txt
> Use this file to discover all available pages before exploring further.

# Turn off Auto Minify via API

Last updated Apr 16, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/speed/optimization/content/troubleshooting/disable-auto-minify/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

If your site is still using deprecated features for [Auto Minify](https://developers.cloudflare.com/fundamentals/api/reference/deprecations/#2024-08-05), turn off Auto Minify via API.

## Before you begin

You will need an [API token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/) with the following permissions:

* _Zone_ \> _Zone Settings_ \> _Edit_
* _Zone_ \> _Zone Settings_ \> _Read_

## (Optional) Check zone status

To check your zone's Auto Minify status, send a `GET` request to the `/zones/{zone_id}/settings/minify` endpoint.

```bash
curl "https://api.cloudflare.com/client/v4/zones/{zone_id}/settings/minify" \
--header "Authorization: Bearer <API_TOKEN>"
```

```json
{
	"result": {
		"id": "minify",
		"value": { "css": "off", "html": "off", "js": "off" },
		"modified_on": null,
		"editable": true
	},
	"success": true,
	"errors": [],
	"messages": []
}
```

If any of the values in the highlighted line are `"on"`, then you need to turn them off.

## Turn off Auto Minify using the API

To turn off Auto Minify for your zone, send a `PATCH` request to the `/zones/{zone_id}/settings/minify` endpoint. The value for `success` in the response should be `true`.

```bash
curl --request PATCH \
"https://api.cloudflare.com/client/v4/zones/{zone_id}/settings/minify" \
--header "Authorization: Bearer <API_TOKEN>" \
--header "Content-Type: application/json" \
--data '{ "value": { "css": "off","html": "off","js": "off" } }'
```

```json
{
	"result": {
		"id": "minify",
		"value": { "js": "off", "css": "off", "html": "off" },
		"modified_on": "2024-11-15T19:32:20.882640Z",
		"editable": true
	},
	"success": true,
	"errors": [],
	"messages": []
}
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/speed/optimization/content/troubleshooting/disable-auto-minify/#page","headline":"Turn off Auto Minify via API · Cloudflare Speed docs","description":"Learn how to turn off Auto Minify via API in Cloudflare.","url":"https://developers.cloudflare.com/speed/optimization/content/troubleshooting/disable-auto-minify/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
