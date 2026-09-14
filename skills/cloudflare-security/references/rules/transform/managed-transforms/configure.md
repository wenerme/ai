---
description: Learn how to configure Managed Transforms.
title: Configure Managed Transforms
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/rules/llms.txt
> Use this file to discover all available pages before exploring further.

# Configure Managed Transforms

Last updated Apr 29, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/rules/transform/managed-transforms/configure/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

1. In the Cloudflare dashboard, go to the Rules **Settings** page. [Go to **Settings** ↗](https://dash.cloudflare.com/?to=/:account/:zone/rules/settings)
2. In the **Managed Transforms** tab, enable or disable the [desired Managed Transforms](https://developers.cloudflare.com/rules/transform/managed-transforms/reference/) by selecting the toggle next to each entry. Some Managed Transforms may not be available in your Cloudflare plan or product subscriptions.

**1. Get list of available Managed Transforms**

Check the Managed Transform's current status and availability using the [List Managed Transforms](https://developers.cloudflare.com/api/resources/managed_transforms/methods/list/) operation.

The following example request obtains a list of available Managed Transforms, organized by request or response, with information about their current status (`enabled` field) and if you can update them, based on conflicts with other enabled Managed Transforms (`has_conflict` field).

Each Managed Transform item will optionally contain a `conflicts_with` array informing you about any Managed Transforms that will conflict with the current Managed Transform when enabled.

The response will only include available Managed Transforms according to your Cloudflare plan and product subscriptions.

<details>

<summary>

Required API token permissions

</summary>

At least one of the following <a href="https://developers.cloudflare.com/fundamentals/api/reference/permissions/">token permissions</a> is required:

- <code>Response Compression Write</code>
- <code>Response Compression Read</code>
- <code>Config Settings Write</code>
- <code>Config Settings Read</code>
- <code>Dynamic URL Redirects Write</code>
- <code>Dynamic URL Redirects Read</code>
- <code>Cache Settings Write</code>
- <code>Cache Settings Read</code>
- <code>Custom Errors Write</code>
- <code>Custom Errors Read</code>
- <code>Origin Write</code>
- <code>Origin Read</code>
- <code>Managed headers Write</code>
- <code>Managed headers Read</code>
- <code>Zone Transform Rules Write</code>
- <code>Zone Transform Rules Read</code>
- <code>Mass URL Redirects Write</code>
- <code>Mass URL Redirects Read</code>
- <code>Magic Firewall Write</code>
- <code>Magic Firewall Read</code>
- <code>L4 DDoS Managed Ruleset Write</code>
- <code>L4 DDoS Managed Ruleset Read</code>
- <code>HTTP DDoS Managed Ruleset Write</code>
- <code>HTTP DDoS Managed Ruleset Read</code>
- <code>Sanitize Write</code>
- <code>Sanitize Read</code>
- <code>Transform Rules Write</code>
- <code>Transform Rules Read</code>
- <code>Select Configuration Write</code>
- <code>Select Configuration Read</code>
- <code>Bot Management Write</code>
- <code>Bot Management Read</code>
- <code>Zone WAF Write</code>
- <code>Zone WAF Read</code>
- <code>Account WAF Write</code>
- <code>Account WAF Read</code>
- <code>Account Rulesets Read</code>
- <code>Account Rulesets Write</code>
- <code>Logs Write</code>
- <code>Logs Read</code>
- <code>Logs Write</code>
- <code>Logs Read</code>

</details>

*List Managed Transformsbash*

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

**2. Change the status of Managed Transforms**

Change the status of the [desired Managed Transforms](https://developers.cloudflare.com/rules/transform/managed-transforms/reference/) using the [Update status of Managed Transforms](https://developers.cloudflare.com/api/resources/managed_transforms/methods/edit/) operation.

Add the Managed Transforms you wish to change to the request body, and update their status in the `enabled` field. You cannot enable a Managed Transform that has a conflict with a currently enabled Managed Transform (that is, an item where `has_conflict` is `true`).

Make sure you include the Managed Transforms you are updating in the correct JSON object (`managed_request_headers` or `managed_response_headers`).

The response will include all the available Managed Transforms and their new status after the update.

<details>

<summary>

Required API token permissions

</summary>

At least one of the following <a href="https://developers.cloudflare.com/fundamentals/api/reference/permissions/">token permissions</a> is required:

- <code>Response Compression Write</code>
- <code>Config Settings Write</code>
- <code>Dynamic URL Redirects Write</code>
- <code>Cache Settings Write</code>
- <code>Custom Errors Write</code>
- <code>Origin Write</code>
- <code>Managed headers Write</code>
- <code>Zone Transform Rules Write</code>
- <code>Mass URL Redirects Write</code>
- <code>Magic Firewall Write</code>
- <code>L4 DDoS Managed Ruleset Write</code>
- <code>HTTP DDoS Managed Ruleset Write</code>
- <code>Sanitize Write</code>
- <code>Transform Rules Write</code>
- <code>Select Configuration Write</code>
- <code>Bot Management Write</code>
- <code>Zone WAF Write</code>
- <code>Account WAF Write</code>
- <code>Account Rulesets Write</code>
- <code>Logs Write</code>
- <code>Logs Write</code>

</details>

*Update Managed Transformsbash*

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

<details>

<summary>

Required API token permissions

</summary>

All of the following <a href="https://developers.cloudflare.com/fundamentals/api/reference/permissions/">token permissions</a> are required:

- <code>Managed headers Write</code>
- <code>Account Rulesets Read</code>

</details>

Configure the [`cloudflare_managed_transforms` ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/managed_transforms) resource:

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

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/rules/transform/managed-transforms/configure/#page","headline":"Configure Managed Transforms · Cloudflare Rules docs","description":"Learn how to configure Managed Transforms.","url":"https://developers.cloudflare.com/rules/transform/managed-transforms/configure/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-29","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
