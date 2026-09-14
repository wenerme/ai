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

Last updated Oct 13, 2025|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/rules/origin-rules/examples/change-port/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

The following origin rule overrides the destination port to `8081` for all requests where the URI path starts with `/team/calendar/`.

Text in Expression Editor:

```txt
starts_with(http.request.uri.path, "/team/calendar/")
```

Value after **Destination Port** > **Rewrite to**:

```txt
8081
```

The following example sets the rules of an existing phase ruleset (`$RULESET_ID`) to a single origin rule — overriding the port of incoming requests — using the [Update a zone ruleset](https://developers.cloudflare.com/api/resources/rulesets/methods/update/) operation. The response will contain the complete definition of the ruleset you updated.

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

*Update a zone rulesetbash*

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

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/rules/origin-rules/examples/change-port/#page","headline":"Change the destination port · Cloudflare Rules docs","description":"Create an origin rule to change the destination port.","url":"https://developers.cloudflare.com/rules/origin-rules/examples/change-port/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2025-10-13","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
