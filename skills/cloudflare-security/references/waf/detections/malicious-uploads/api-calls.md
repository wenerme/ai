---
description: Manage malicious upload detection using the Cloudflare API.
title: Common API calls
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/waf/llms.txt
> Use this file to discover all available pages before exploring further.

# Common API calls

Last updated Apr 16, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/waf/detections/malicious-uploads/api-calls/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

The following examples address common scenarios of using the Cloudflare API to manage and configure WAF content scanning.

If you are using Terraform, refer to [Terraform configuration examples](https://developers.cloudflare.com/waf/detections/malicious-uploads/terraform-examples/).

## General operations

The following API examples cover basic operations such as enabling and disabling WAF content scanning.

### Enable WAF content scanning

To enable content scanning, use a `POST` request similar to the following:

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/) is required:
* `Zone WAF Write`
* `Account WAF Write`

```bash
curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/content-upload-scan/enable" \
	--request POST \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

### Disable WAF content scanning

To disable content scanning, use a `POST` request similar to the following:

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/) is required:
* `Zone WAF Write`
* `Account WAF Write`

```bash
curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/content-upload-scan/disable" \
	--request POST \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

### Get WAF content scanning status

To obtain the current status of the content scanning feature, use a `GET` request similar to the following:

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/) is required:
* `Zone WAF Write`
* `Zone WAF Read`
* `Account WAF Write`
* `Account WAF Read`

```bash
curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/content-upload-scan/settings" \
	--request GET \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

## Custom expression operations

The following API examples cover operations on custom scan expressions for content scanning.

### Get existing custom scan expressions

To get a list of existing custom scan expressions, use a `GET` request similar to the following:

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/) is required:
* `Zone WAF Write`
* `Zone WAF Read`
* `Account WAF Write`
* `Account WAF Read`

```bash
curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/content-upload-scan/payloads" \
	--request GET \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

```json
{
	"result": [
		{
			"id": "<EXPRESSION_ID>",
			"payload": "lookup_json_string(http.request.body.raw, \"file\")"
		}
	],
	"success": true,
	"errors": [],
	"messages": []
}
```

### Add a custom scan expression

Use a `POST` request similar to the following:

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/) is required:
* `Zone WAF Write`
* `Account WAF Write`

```bash
curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/content-upload-scan/payloads" \
	--request POST \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
	--json '[
		{
				"payload": "lookup_json_string(http.request.body.raw, \"file\")"
		}
	]'
```

### Delete a custom scan expression

Use a `DELETE` request similar to the following:

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/) is required:
* `Zone WAF Write`
* `Account WAF Write`

```bash
curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/content-upload-scan/payloads/$EXPRESSION_ID" \
	--request DELETE \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/waf/detections/malicious-uploads/api-calls/#page","headline":"Common API calls for content scanning · Cloudflare Web Application Firewall (WAF) docs","description":"Manage malicious upload detection using the Cloudflare API.","url":"https://developers.cloudflare.com/waf/detections/malicious-uploads/api-calls/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
