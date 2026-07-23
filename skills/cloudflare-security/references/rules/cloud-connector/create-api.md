---
description: Create Cloud Connector rules using the Cloudflare API.
title: Configure a Cloud Connector rule via API
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/rules/llms.txt
> Use this file to discover all available pages before exploring further.

# Configure a Cloud Connector rule via API

Last updated Apr 16, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/rules/cloud-connector/create-api/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

You can configure Cloud Connector rules using the [Cloudflare API](https://developers.cloudflare.com/fundamentals/api/).

## Required permissions

The [API token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/) used in API requests to manage Cloud Connector rules must have at least the following permission:

* _Zone_ \> _Cloud Connector_ \> _Write_

Note

A token with this permission is only valid for the Cloud Connector endpoints described in this page. You cannot use it to interact with the `http_cloud_connector` phase via [Rulesets API](https://developers.cloudflare.com/ruleset-engine/rulesets-api/).

## Endpoints

To obtain the complete endpoint, append the Cloud Connector endpoints listed below to the Cloudflare API base URL:

```txt
https://api.cloudflare.com/client/v4
```

The `{zone_id}` argument is the [zone ID](https://developers.cloudflare.com/fundamentals/account/find-account-and-zone-ids/) (a hexadecimal string). You can find this value in the Cloudflare dashboard.

The following table summarizes the available operations.

| Operation                                  | Verb + Endpoint                              |
| ------------------------------------------ | -------------------------------------------- |
| List Cloud Connector rules                 | GET /zones/{zone\_id}/cloud\_connector/rules |
| Create/update/delete Cloud Connector rules | PUT /zones/{zone\_id}/cloud\_connector/rules |

## Example API calls

### List of Cloud Connector rules

The following example returns a list of existing Cloud Connector rules:

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/) is required:
* `Cloud Connector Read`
* `Cloud Connector Write`

```bash
curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/cloud_connector/rules" \
	--request GET \
	--header "X-Auth-Email: $CLOUDFLARE_EMAIL" \
	--header "X-Auth-Key: $CLOUDFLARE_API_KEY"
```

```json
{
	"result": [
		{
			"id": "<RULE_1_ID>",
			"provider": "aws_s3",
			"expression": "http.request.uri.path wildcard \"/images/*\"",
			"description": "Connect to S3 bucket containing images",
			"enabled": true,
			"parameters": {
				"host": "examplebucketwithimages.s3.north-eu.amazonaws.com"
			}
		}
	],
	"success": true,
	"errors": [],
	"messages": []
}
```

### Create/update/delete Cloud Connector rules

Caution

To create a new rule and keep all existing rules, you must include them all in your request body. Omitting an existing rule in the request body will delete the corresponding Cloud Connector rule.

The following example request will replace all existing Cloud Connector rules with a single rule:

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/) is required:
* `Cloud Connector Write`

```bash
curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/cloud_connector/rules" \
	--request PUT \
	--header "X-Auth-Email: $CLOUDFLARE_EMAIL" \
	--header "X-Auth-Key: $CLOUDFLARE_API_KEY" \
	--json '[
		{
				"expression": "http.request.uri.path wildcard \"/images/*\"",
				"provider": "cloudflare_r2",
				"description": "Connect to R2 bucket containing images",
				"parameters": {
						"host": "mybucketcustomdomain.example.com"
				}
		}
	]'
```

The required body parameters for each rule are: `expression`, `provider`, and `parameters.host`.

The `provider` value must be one of the following: `cloudflare_r2`, `aws_s3`, `azure_storage`, and `gcp_storage`.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/rules/cloud-connector/create-api/#page","headline":"Configure a Cloud Connector rule via API · Cloudflare Rules docs","description":"Create Cloud Connector rules using the Cloudflare API.","url":"https://developers.cloudflare.com/rules/cloud-connector/create-api/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
