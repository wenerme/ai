---
description: Learn how to configure Managed Transforms.
title: Configure Managed Transforms
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/rules/llms.txt
> Use this file to discover all available pages before exploring further.

#  Configure Managed Transforms

Last updated Apr 29, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/rules/transform/managed-transforms/configure/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

1. In the Cloudflare dashboard, go to the Rules **Settings** page.
[ Go to **Settings** ↗ ](https://dash.cloudflare.com/?to=/:account/:zone/rules/settings)
2. In the **Managed Transforms** tab, enable or disable the [desired Managed Transforms](https://developers.cloudflare.com/rules/transform/managed-transforms/reference/) by selecting the toggle next to each entry. Some Managed Transforms may not be available in your Cloudflare plan or product subscriptions.

**1\. Get list of available Managed Transforms**

Check the Managed Transform's current status and availability using the [List Managed Transforms](https://developers.cloudflare.com/api/resources/managed%5Ftransforms/methods/list/) operation.

The following example request obtains a list of available Managed Transforms, organized by request or response, with information about their current status (`enabled` field) and if you can update them, based on conflicts with other enabled Managed Transforms (`has_conflict` field).

Each Managed Transform item will optionally contain a `conflicts_with` array informing you about any Managed Transforms that will conflict with the current Managed Transform when enabled.

The response will only include available Managed Transforms according to your Cloudflare plan and product subscriptions.

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/) is required:
* `Response Compression Write`
* `Response Compression Read`
* `Config Settings Write`
* `Config Settings Read`
* `Dynamic URL Redirects Write`
* `Dynamic URL Redirects Read`
* `Cache Settings Write`
* `Cache Settings Read`
* `Custom Errors Write`
* `Custom Errors Read`
* `Origin Write`
* `Origin Read`
* `Managed headers Write`
* `Managed headers Read`
* `Zone Transform Rules Write`
* `Zone Transform Rules Read`
* `Mass URL Redirects Write`
* `Mass URL Redirects Read`
* `Magic Firewall Write`
* `Magic Firewall Read`
* `L4 DDoS Managed Ruleset Write`
* `L4 DDoS Managed Ruleset Read`
* `HTTP DDoS Managed Ruleset Write`
* `HTTP DDoS Managed Ruleset Read`
* `Sanitize Write`
* `Sanitize Read`
* `Transform Rules Write`
* `Transform Rules Read`
* `Select Configuration Write`
* `Select Configuration Read`
* `Bot Management Write`
* `Bot Management Read`
* `Zone WAF Write`
* `Zone WAF Read`
* `Account WAF Write`
* `Account WAF Read`
* `Account Rulesets Read`
* `Account Rulesets Write`
* `Logs Write`
* `Logs Read`
* `Logs Write`
* `Logs Read`

```bash
curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/managed_headers" \
	--request GET \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

```json
{
	"result": {
		"managed_request_headers": [
			{
				"enabled": false,
				"has_conflict": false,
				"id": "add_bot_protection_headers"
			},
			{
				"enabled": false,
				"has_conflict": false,
				"id": "add_client_certificate_headers"
			},
			{
				"enabled": false,
				"has_conflict": false,
				"id": "add_visitor_location_headers"
			},
			{
				"conflicts_with": ["remove_visitor_ip_headers"],
				"enabled": false,
				"has_conflict": false,
				"id": "add_true_client_ip_headers"
			},
			{
				"conflicts_with": ["add_true_client_ip_headers"],
				"enabled": false,
				"has_conflict": false,
				"id": "remove_visitor_ip_headers"
			},
			{
				"enabled": false,
				"has_conflict": false,
				"id": "add_waf_credential_check_status_header"
			},
			{
				"enabled": false,
				"has_conflict": false,
				"id": "add_waf_content_scan_status_header"
			}
		],
		"managed_response_headers": [
			{
				"enabled": false,
				"has_conflict": false,
				"id": "remove_x-powered-by_header"
			},
			{
				"enabled": false,
				"has_conflict": false,
				"id": "add_security_headers"
			}
		]
	},
	"success": true,
	"errors": [],
	"messages": []
}
```

**2\. Change the status of Managed Transforms**

Change the status of the [desired Managed Transforms](https://developers.cloudflare.com/rules/transform/managed-transforms/reference/) using the [Update status of Managed Transforms](https://developers.cloudflare.com/api/resources/managed%5Ftransforms/methods/edit/) operation.

Add the Managed Transforms you wish to change to the request body, and update their status in the `enabled` field. You cannot enable a Managed Transform that has a conflict with a currently enabled Managed Transform (that is, an item where `has_conflict` is `true`).

Make sure you include the Managed Transforms you are updating in the correct JSON object (`managed_request_headers` or `managed_response_headers`).

The response will include all the available Managed Transforms and their new status after the update.

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/) is required:
* `Response Compression Write`
* `Config Settings Write`
* `Dynamic URL Redirects Write`
* `Cache Settings Write`
* `Custom Errors Write`
* `Origin Write`
* `Managed headers Write`
* `Zone Transform Rules Write`
* `Mass URL Redirects Write`
* `Magic Firewall Write`
* `L4 DDoS Managed Ruleset Write`
* `HTTP DDoS Managed Ruleset Write`
* `Sanitize Write`
* `Transform Rules Write`
* `Select Configuration Write`
* `Bot Management Write`
* `Zone WAF Write`
* `Account WAF Write`
* `Account Rulesets Write`
* `Logs Write`
* `Logs Write`

```bash
curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/managed_headers" \
	--request PATCH \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
	--json '{
		"managed_request_headers": [
				{
						"id": "add_visitor_location_headers",
						"enabled": true
				}
		],
		"managed_response_headers": [
				{
						"id": "remove_x-powered-by_header",
						"enabled": true
				}
		]
	}'
```

```json
{
	"result": {
		"managed_request_headers": [
			{
				"enabled": false,
				"has_conflict": false,
				"id": "add_bot_protection_headers"
			},
			{
				"enabled": false,
				"has_conflict": false,
				"id": "add_client_certificate_headers"
			},
			{
				"enabled": true,
				"has_conflict": false,
				"id": "add_visitor_location_headers"
			},
			{
				"conflicts_with": ["remove_visitor_ip_headers"],
				"enabled": false,
				"has_conflict": false,
				"id": "add_true_client_ip_headers"
			},
			{
				"conflicts_with": ["add_true_client_ip_headers"],
				"enabled": false,
				"has_conflict": false,
				"id": "remove_visitor_ip_headers"
			},
			{
				"enabled": false,
				"has_conflict": false,
				"id": "add_waf_credential_check_status_header"
			},
			{
				"enabled": false,
				"has_conflict": false,
				"id": "add_waf_content_scan_status_header"
			}
		],
		"managed_response_headers": [
			{
				"enabled": true,
				"has_conflict": false,
				"id": "remove_x-powered-by_header"
			},
			{
				"enabled": false,
				"has_conflict": false,
				"id": "add_security_headers"
			}
		]
	},
	"success": true,
	"errors": [],
	"messages": []
}
```

Required API token permissions

All of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/) are required:

* `Managed headers Write`
* `Account Rulesets Read`

Configure the [cloudflare\_managed\_transforms ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/managed%5Ftransforms) resource:

```tf
resource "cloudflare_managed_transforms" "tf_example" {
  zone_id = var.cloudflare_zone_id

  managed_request_headers = [{
    id      = "add_visitor_location_headers"
    enabled = true
  }]

  managed_response_headers = [{
    id      = "remove_x-powered-by_header"
    enabled = true
  }]
}
```

```tf
resource "cloudflare_managed_headers" "tf_example" {
  zone_id = "<ZONE_ID>"

  managed_request_headers {
    id      = "add_visitor_location_headers"
    enabled = true
  }

  managed_response_headers {
    id      = "remove_x-powered-by_header"
    enabled = true
  }
}
```

Make sure you include the Managed Transforms you are updating in the correct object (`managed_request_headers` or `managed_response_headers`).

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/rules/transform/managed-transforms/configure/#page","headline":"Configure Managed Transforms · Cloudflare Rules docs","description":"Learn how to configure Managed Transforms.","url":"https://developers.cloudflare.com/rules/transform/managed-transforms/configure/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-29","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
