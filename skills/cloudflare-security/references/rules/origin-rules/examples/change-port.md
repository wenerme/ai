---
description: Create an origin rule to change the destination port.
title: Change the destination port
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/rules/llms.txt
> Use this file to discover all available pages before exploring further.

# Change the destination port

Create an origin rule to change the destination port.

Last updated Oct 13, 2025|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/rules/origin-rules/examples/change-port/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

The following origin rule overrides the destination port to `8081` for all requests where the URI path starts with `/team/calendar/`.

Text in Expression Editor:

```txt
starts_with(http.request.uri.path, "/team/calendar/")
```

Value after **Destination Port** \> **Rewrite to**:

```txt
8081
```

The following example sets the rules of an existing phase ruleset (`$RULESET_ID`) to a single origin rule — overriding the port of incoming requests — using the [Update a zone ruleset](https://developers.cloudflare.com/api/resources/rulesets/methods/update/) operation. The response will contain the complete definition of the ruleset you updated.

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
curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/rulesets/$RULESET_ID" \
	--request PUT \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
	--json '{
		"rules": [
				{
						"ref": "calendar_app_change_port",
						"expression": "starts_with(http.request.uri.path, \"/team/calendar/\")",
						"description": "Origin rule for the team calendar application",
						"action": "route",
						"action_parameters": {
								"origin": {
										"port": 8081
								}
						}
				}
		]
	}'
```

```json
{
	"result": {
		"id": "<RULESET_ID>",
		"name": "Origin Rules ruleset",
		"description": "Zone-level ruleset that will execute origin rules.",
		"kind": "zone",
		"version": "2",
		"rules": [
			{
				"ref": "calendar_app_change_port",
				"id": "<RULE_ID>",
				"version": "1",
				"action": "route",
				"action_parameters": {
					"origin": {
						"port": 8081
					}
				},
				"expression": "starts_with(http.request.uri.path, \"/team/calendar/\")",
				"description": "Origin rule for the team calendar application",
				"last_updated": "2022-06-03T14:42:04.219025Z",
				"ref": "<RULE_REF>"
			}
		],
		"last_updated": "2022-06-03T14:42:04.219025Z",
		"phase": "http_request_origin"
	},
	"success": true,
	"errors": [],
	"messages": []
}
```

Use the `ref` field to get stable rule IDs across updates when using Terraform. Adding this field prevents Terraform from recreating the rule on changes. For more information, refer to [Troubleshooting](https://developers.cloudflare.com/terraform/troubleshooting/rule-id-changes/#how-to-keep-the-same-rule-id-between-modifications) in the Terraform documentation.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/rules/origin-rules/examples/change-port/#page","headline":"Change the destination port · Cloudflare Rules docs","description":"Create an origin rule to change the destination port.","url":"https://developers.cloudflare.com/rules/origin-rules/examples/change-port/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2025-10-13","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
