---
description: Convert documents to Markdown using the Workers AI REST API endpoint.
title: REST API
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers-ai/llms.txt
> Use this file to discover all available pages before exploring further.

# REST API

Last updated Apr 21, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/workers-ai/features/markdown-conversion/usage/rest-api/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

You can also use the Markdown Conversion REST API to convert your documents into Markdown.

## Prerequisite: Get Workers AI API token

To use the Markdown Conversion service via the REST API, you need an API token with permissions for the [Workers AI](https://developers.cloudflare.com/workers-ai/) REST API. Refer to [Get started with the Workers AI REST API](https://developers.cloudflare.com/workers-ai/get-started/rest-api/) for instructions on obtaining an API token with the correct permissions.

## Transform

This endpoint lets you convert any file given to us into markdown.

```bash
curl https://api.cloudflare.com/client/v4/accounts/{ACCOUNT_ID}/ai/tomarkdown \
  -X POST \
  -H 'Authorization: Bearer {API_TOKEN}' \
  -F "files=@cat.jpeg" \
  -F "files=@somatosensory.pdf" \
  -F 'conversionOptions={ ... }'
```

Note

You can get your `ACCOUNT_ID` by going to [Workers & Pages on the dashboard](https://developers.cloudflare.com/fundamentals/account/find-account-and-zone-ids/#find-account-id-workers-and-pages).

### Parameters

`files` `File[]` required

The files you want to convert.

`conversionOptions` `ConversionOptions` optional

Options that allow you to control how your files are converted. Refer to [Conversion Options](https://developers.cloudflare.com/workers-ai/features/markdown-conversion/conversion-options/) for further details.

### Response

```json
{
	"success": true,
	"result": [
		{
			"id": "...",
			"name": "good.html",
			"mimeType": "text/html",
			"format": "markdown",
			"tokens": 49,
			"data": "# Image Embedded with a Data URI\n\nThis _image_ is directly encoded in the HTML:\n\n\n\nAn image description\n\n \n\nIt's a tiny 5x5 pixel PNG, scaled up to 50x50px.\n\n"
		},
		{
			"id": "...",
			"name": "bad.pdf",
			"mimeType": "application/pdf",
			"format": "error",
			"error": "Some error that prevented this image from being converted"
		}
	]
}
```

## Supported

This endpoint lets you programmatically retrieve the full set of rich formats that are supported for conversion.

```bash
curl https://api.cloudflare.com/client/v4/accounts/{ACCOUNT_ID}/ai/tomarkdown/supported \
  -H 'Authorization: Bearer {API_TOKEN}'
```

Note

You can get your `ACCOUNT_ID` by going to [Workers & Pages on the dashboard](https://developers.cloudflare.com/fundamentals/account/find-account-and-zone-ids/#find-account-id-workers-and-pages).

### Response

```json
{
  "success": true,
  "result": [
    {
      "extension": ".html",
      "mimeType": "text/html"
    },
    {
      "extension": ".pdf",
      "mimeType": "application/pdf"
    },
    ...
  ]
}
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers-ai/features/markdown-conversion/usage/rest-api/#page","headline":"REST API · Cloudflare Workers AI docs","description":"Convert documents to Markdown using the Workers AI REST API endpoint.","url":"https://developers.cloudflare.com/workers-ai/features/markdown-conversion/usage/rest-api/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
