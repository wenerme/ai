---
description: Delete a specific rule from a ruleset using the API.
title: Delete a rule in a ruleset
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ruleset-engine/llms.txt
> Use this file to discover all available pages before exploring further.

#  Delete a rule in a ruleset

Last updated Apr 16, 2026 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/ruleset-engine/rulesets-api/delete-rule/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

Deletes a single rule in a ruleset at the account or zone level.

Use one of the following API endpoints:

* [Delete an account ruleset rule](https://developers.cloudflare.com/api/resources/rulesets/subresources/rules/methods/delete/)
`DELETE /accounts/{account_id}/rulesets/{ruleset_id}/rules/{rule_id}`
* [Delete a zone ruleset rule](https://developers.cloudflare.com/api/resources/rulesets/subresources/rules/methods/delete/)
`DELETE /zones/{zone_id}/rulesets/{ruleset_id}/rules/{rule_id}`

If the delete operation succeeds, the API method call returns a `200 OK` HTTP status code with the complete ruleset in the response body.

## Example

The following example deletes rule `$RULE_ID_1` belonging to ruleset `$RULESET_ID`.

The response will include the complete ruleset after deleting the rule.

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/) is required:
* `Mass URL Redirects Write`
* `Magic Firewall Write`
* `L4 DDoS Managed Ruleset Write`
* `Transform Rules Write`
* `Select Configuration Write`
* `Account WAF Write`
* `Account Rulesets Write`
* `Logs Write`

```bash
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/rulesets/$RULESET_ID/rules/$RULE_ID_1" \
	--request DELETE \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

```json
{
	"result": {
		"id": "<RULESET_ID>",
		"name": "Custom Ruleset 1",
		"description": "My first custom ruleset",
		"kind": "custom",
		"version": "12",
		"rules": [
			{
				"id": "<RULE_ID_2>",
				"version": "2",
				"action": "js_challenge",
				"expression": "(ip.src.country in {\"GB\" \"FR\"} and cf.bot_management.score < 20 and not cf.bot_management.verified_bot)",
				"description": "challenge GB and FR based on bot score",
				"last_updated": "2021-07-22T12:54:58.144683Z",
				"ref": "<RULE_REF_2>",
				"enabled": true
			}
		],
		"last_updated": "2021-07-22T12:54:58.144683Z",
		"phase": "http_request_firewall_custom"
	},
	"success": true,
	"errors": [],
	"messages": []
}
```

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ruleset-engine/rulesets-api/delete-rule/#page","headline":"Delete a rule in a ruleset · Cloudflare Ruleset Engine docs","description":"Delete a specific rule from a ruleset using the API.","url":"https://developers.cloudflare.com/ruleset-engine/rulesets-api/delete-rule/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
