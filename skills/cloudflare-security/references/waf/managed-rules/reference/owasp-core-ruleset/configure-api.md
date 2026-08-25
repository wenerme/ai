---
description: Configure the OWASP Core Ruleset using the API.
title: Configure via API
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/waf/llms.txt
> Use this file to discover all available pages before exploring further.

# Configure via API

Last updated Apr 16, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/waf/managed-rules/reference/owasp-core-ruleset/configure-api/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

To enable the Cloudflare OWASP Core Ruleset for a given zone using the API, create a rule with `execute` action in the entry point ruleset for the `http_request_firewall_managed` phase. For more information on deploying a managed ruleset, refer to [Deploy a managed ruleset](https://developers.cloudflare.com/ruleset-engine/managed-rulesets/deploy-managed-ruleset/).

To configure the Cloudflare OWASP Core Ruleset using the API, create [overrides](https://developers.cloudflare.com/ruleset-engine/managed-rulesets/override-managed-ruleset/) using the Rulesets API. You can perform the following configurations:

* [Set the paranoia level](#set-the-paranoia-level).
* [Configure the score threshold](#configure-the-score-threshold-and-the-action).
* [Specify the action to perform](#configure-the-score-threshold-and-the-action) when the threat score is greater than the threshold.

You can also disable specific rules in the managed ruleset using [rule overrides](https://developers.cloudflare.com/ruleset-engine/managed-rulesets/override-managed-ruleset/).

## Set the paranoia level

To enable all the rules up to a specific [paranoia level](https://developers.cloudflare.com/waf/managed-rules/reference/owasp-core-ruleset/concepts/#paranoia-level), create [tag overrides](https://developers.cloudflare.com/ruleset-engine/managed-rulesets/override-managed-ruleset/#work-with-overrides) that disable all the rules associated with higher paranoia levels.

The tags associated with the different paranoia levels are the following:

* `paranoia-level-1`
* `paranoia-level-2`
* `paranoia-level-3`
* `paranoia-level-4`

For example, to enable all the rules associated with Paranoia Level 2 (PL2), disable the rules associated with tags `paranoia-level-3` and `paranoia-level-4`. All rules associated with paranoia levels up to the desired paranoia level will be enabled (in this example, all the rules associated with PL1 and PL2).

### Example

This example sets the Cloudflare OWASP Core Ruleset's paranoia level for a zone to PL2\. To perform this configuration, you must disable the tags associated with levels PL3 and PL4 (`paranoia-level-3` and `paranoia-level-4`) using tag overrides.

1. Get the ID of the Cloudflare OWASP Core Ruleset using the [List account rulesets](https://developers.cloudflare.com/api/resources/rulesets/methods/list/) method, since WAF's managed rulesets exist at the account level. Alternatively, use the following ruleset ID directly: ...c25d2f1f.
```bash
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/rulesets" \
	--request GET \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```
```json
{
	"result": [
		{
			"id": "4814384a9e5d4991b9815dcfc25d2f1f",
			"name": "Cloudflare OWASP Core Ruleset",
			"description": "Cloudflare's implementation of the Open Web Application Security Project (OWASP) ModSecurity Core  Rule Set. We routinely monitor for updates from OWASP based on the latest version available from the official  code repository",
			"source": "firewall_managed",
			"kind": "managed",
			"version": "35",
			"last_updated": "2022-01-24T21:08:20.293196Z",
			"phase": "http_request_firewall_managed"
		}
		// (...)
	],
	"success": true,
	"errors": [],
	"messages": []
}
```
2. Get the ID of the rule that deploys the OWASP ruleset to your zone using the [Get a zone entry point ruleset](https://developers.cloudflare.com/api/resources/rulesets/subresources/phases/methods/get/). Search for a rule with `"action": "execute"` configured with the OWASP ruleset's ID in the `action_parameters` object (ID ...c25d2f1f). This rule will only exist if you have already deployed the OWASP ruleset.
```bash
curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/rulesets/phases/http_request_firewall_managed/entrypoint" \
	--request GET \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```
```json
{
	"result": {
		"id": "<ENTRY_POINT_RULESET_ID>",
		"name": "zone",
		"description": "",
		"source": "firewall_managed",
		"kind": "zone",
		"version": "3",
		"rules": [
			// (...)
			{
				"id": "<EXECUTE_RULE_ID>",
				"version": "1",
				"action": "execute",
				"action_parameters": {
					"id": "4814384a9e5d4991b9815dcfc25d2f1f",
					"version": "latest"
				},
				"expression": "true",
				"last_updated": "2022-02-04T16:27:58.930927Z",
				"ref": "<RULE_REF>",
				"enabled": true
			}
			// (...)
		],
		"last_updated": "2022-02-07T10:41:31.702744Z",
		"phase": "http_request_firewall_managed"
	},
	"success": true,
	"errors": [],
	"messages": []
}
```
3. Update the rule you identified using the [Update a zone ruleset rule](https://developers.cloudflare.com/api/resources/rulesets/methods/update/) operation, adding tag overrides that disable the rules with tags `paranoia-level-3` and `paranoia-level-4`.
```bash
curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/rulesets/$ENTRY_POINT_RULESET_ID/rules/$EXECUTE_RULE_ID" \
	--request PATCH \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
	--json '{
		"action": "execute",
		"action_parameters": {
				"id": "4814384a9e5d4991b9815dcfc25d2f1f",
				"overrides": {
						"categories": [
								{
										"category": "paranoia-level-3",
										"enabled": false
								},
								{
										"category": "paranoia-level-4",
										"enabled": false
								}
						]
				}
		},
		"expression": "true",
		"enabled": true
	}'
```

For more information on creating overrides, refer to [Override a managed ruleset](https://developers.cloudflare.com/ruleset-engine/managed-rulesets/override-managed-ruleset/).

## Configure the score threshold and the action

To define the [score threshold](https://developers.cloudflare.com/waf/managed-rules/reference/owasp-core-ruleset/concepts/#score-threshold), or to specify the [action](https://developers.cloudflare.com/ruleset-engine/rules-language/actions/) to perform when the threat score is greater than the threshold, create a [rule override](https://developers.cloudflare.com/ruleset-engine/managed-rulesets/override-managed-ruleset/#work-with-overrides) for the last rule in the managed ruleset that:

* Specifies the action to take in the `action` property. The available actions are: `js_challenge` (Non-Interactive Challenge), `managed_challenge` (Managed Challenge), `block` (default), `challenge` (Interactive Challenge), and `log`.
* Defines the desired anomaly score threshold (an integer value) in the `score_threshold` property.

### Example

This example configures the managed ruleset score threshold and the performed action by creating a rule override for the last rule of the managed ruleset.

1. Get the ID of the Cloudflare OWASP Core Ruleset using the [List account rulesets](https://developers.cloudflare.com/api/resources/rulesets/methods/list/) method, since WAF's managed rulesets exist at the account level. Alternatively, use the following ruleset ID directly: ...c25d2f1f.
```bash
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/rulesets" \
	--request GET \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```
```json
{
	"result": [
		{
			"id": "4814384a9e5d4991b9815dcfc25d2f1f",
			"name": "Cloudflare OWASP Core Ruleset",
			"description": "Cloudflare's implementation of the Open Web Application Security Project (OWASP) ModSecurity Core Rule Set. We routinely monitor for updates from OWASP based on the latest version available from the official code repository",
			"source": "firewall_managed",
			"kind": "managed",
			"version": "35",
			"last_updated": "2022-01-24T21:08:20.293196Z",
			"phase": "http_request_firewall_managed"
		}
		// (...)
	],
	"success": true,
	"errors": [],
	"messages": []
}
```
2. Get the ID of the [last rule](https://developers.cloudflare.com/waf/managed-rules/reference/owasp-core-ruleset/example/) in the Cloudflare OWASP Core Ruleset. Use the [Get an account ruleset](https://developers.cloudflare.com/api/resources/rulesets/methods/get/) method to obtain the list of rules in the ruleset. Alternatively, use the following rule ID directly: ...843b323c.
```bash
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/rulesets/$OWASP_RULESET_ID" \
	--request GET \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```
```json
{
	"result": {
		"id": "4814384a9e5d4991b9815dcfc25d2f1f",
		"name": "Cloudflare OWASP Core Ruleset",
		"description": "Cloudflare's implementation of the Open Web Application Security Project (OWASP) ModSecurity Core Rule Set. We routinely monitor for updates from OWASP based on the latest version available from the official code repository",
		"source": "firewall_managed",
		"kind": "managed",
		"version": "36",
		"rules": [
			// (...)
			{
				"id": "6179ae15870a4bb7b2d480d4843b323c",
				"version": "35",
				"action": "block",
				"score_threshold": 40,
				"description": "949110: Inbound Anomaly Score Exceeded",
				"last_updated": "2022-02-08T16:11:18.236676Z",
				"ref": "ad0beb2fce9f149e565ee78d6e659d47",
				"enabled": true
			}
		],
		"last_updated": "2022-02-08T16:11:18.236676Z",
		"phase": "http_request_firewall_managed"
	},
	"success": true,
	"errors": [],
	"messages": []
}
```
3. Get the ID of the rule that deploys the OWASP ruleset to your zone using the [Get a zone entry point ruleset](https://developers.cloudflare.com/api/resources/rulesets/subresources/phases/methods/get/) (in this example, `<EXECUTE_RULE_ID>`). Search for a rule with `"action": "execute"` configured with the OWASP ruleset's ID in the `action_parameters` object (ID ...c25d2f1f). This rule will only exist if you have already deployed the OWASP ruleset.
```bash
curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/rulesets/phases/http_request_firewall_managed/entrypoint" \
	--request GET \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```
```json
{
	"result": {
		"id": "<ENTRY_POINT_RULESET_ID>",
		"name": "zone",
		"description": "",
		"source": "firewall_managed",
		"kind": "zone",
		"version": "3",
		"rules": [
			// (...)
			{
				"id": "<EXECUTE_RULE_ID>",
				"version": "1",
				"action": "execute",
				"action_parameters": {
					"id": "4814384a9e5d4991b9815dcfc25d2f1f",
					"version": "latest"
				},
				"expression": "true",
				"last_updated": "2022-02-04T16:27:58.930927Z",
				"ref": "<RULE_REF>",
				"enabled": true
			}
			// (...)
		],
		"last_updated": "2022-02-07T10:41:31.702744Z",
		"phase": "http_request_firewall_managed"
	},
	"success": true,
	"errors": [],
	"messages": []
}
```
4. Update the rule you identified in the entry point ruleset using the [Update a zone ruleset rule](https://developers.cloudflare.com/api/resources/rulesets/methods/update/) operation, adding a rule override for the last rule in the OWASP ruleset (identified in step 2) with the following properties and values:

  * `"score_threshold": 60`
  * `"action": "managed_challenge"`
```bash
curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/rulesets/$ENTRY_POINT_RULESET_ID/rules/$EXECUTE_RULE_ID" \
	--request PATCH \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
	--json '{
		"action": "execute",
		"action_parameters": {
				"id": "4814384a9e5d4991b9815dcfc25d2f1f",
				"overrides": {
						"rules": [
								{
										"id": "6179ae15870a4bb7b2d480d4843b323c",
										"score_threshold": 60,
										"action": "managed_challenge"
								}
						]
				}
		},
		"expression": "true",
		"enabled": true
	}'
```

## More resources

For more API examples, refer to [Override examples](https://developers.cloudflare.com/ruleset-engine/managed-rulesets/override-examples/) in the Ruleset Engine documentation.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/waf/managed-rules/reference/owasp-core-ruleset/configure-api/#page","headline":"Configure via API · Cloudflare Web Application Firewall (WAF) docs","description":"Configure the OWASP Core Ruleset using the API.","url":"https://developers.cloudflare.com/waf/managed-rules/reference/owasp-core-ruleset/configure-api/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
