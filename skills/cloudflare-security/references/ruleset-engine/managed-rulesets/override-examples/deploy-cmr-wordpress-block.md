---
description: Deploy the Cloudflare Managed Ruleset with WordPress rules set to Block.
title: Set WordPress rules to Block
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ruleset-engine/llms.txt
> Use this file to discover all available pages before exploring further.

# Set WordPress rules to Block

Last updated May 5, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/ruleset-engine/managed-rulesets/override-examples/deploy-cmr-wordpress-block/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Follow the steps below to create a rule that executes a managed ruleset and defines an override for rules with a specific tag.

1. [Add a rule](https://developers.cloudflare.com/ruleset-engine/basic-operations/deploy-rulesets/) to a phase entry point ruleset that executes a managed ruleset.
2. [Configure a tag override](https://developers.cloudflare.com/ruleset-engine/managed-rulesets/override-managed-ruleset/) that sets a specified action for all rules with a given tag.

## Zone-level example

This example uses the [Update a zone entry point ruleset](https://developers.cloudflare.com/ruleset-engine/rulesets-api/update/) operation to perform the following two steps in a single `PUT` request:

- Set the list of rules in the `http_request_firewall_managed` phase entry point ruleset to a single rule that executes the [Cloudflare Managed Ruleset](https://developers.cloudflare.com/waf/managed-rules/reference/cloudflare-managed-ruleset/).
- Override rules with the `wordpress` tag to set the action to `block`. All other rules use the default action provided by the ruleset issuer.

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

*Update a zone entry point rulesetbash*

```bash
curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/rulesets/phases/http_request_firewall_managed/entrypoint" \
	--request PUT \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
	--json '{
		"rules": [
				{
						"action": "execute",
						"expression": "true",
						"action_parameters": {
								"id": "<MANAGED_RULESET_ID>",
								"overrides": {
										"categories": [
												{
														"category": "wordpress",
														"action": "block"
												}
										]
								}
						}
				}
		]
	}'
```

## Account-level example

This example uses the [Update an account entry point ruleset](https://developers.cloudflare.com/ruleset-engine/rulesets-api/update/) operation to perform the following two steps in a single `PUT` request:

- Set the list of rules in the `http_request_firewall_managed` phase entry point ruleset to a single rule that executes the [Cloudflare Managed Ruleset](https://developers.cloudflare.com/waf/managed-rules/reference/cloudflare-managed-ruleset/) for the zone `example.com`.
- Override rules with the `wordpress` tag to set the action to `block`. All other rules use the default action provided by the ruleset issuer.

Note

At the account level, the rule expression of an `execute` rule must end with `and cf.zone.plan eq "ENT"` so that it only applies to zones on an Enterprise plan.

<details>

<summary>

Required API token permissions

</summary>

At least one of the following <a href="https://developers.cloudflare.com/fundamentals/api/reference/permissions/">token permissions</a> is required:

- <code>Mass URL Redirects Write</code>
- <code>Magic Firewall Write</code>
- <code>L4 DDoS Managed Ruleset Write</code>
- <code>Transform Rules Write</code>
- <code>Select Configuration Write</code>
- <code>Account WAF Write</code>
- <code>Account Rulesets Write</code>
- <code>Logs Write</code>

</details>

*Update an account entry point rulesetbash*

```bash
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/rulesets/phases/http_request_firewall_managed/entrypoint" \
	--request PUT \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
	--json '{
		"rules": [
				{
						"action": "execute",
						"expression": "cf.zone.name eq \"example.com\" and cf.zone.plan eq \"ENT\"",
						"action_parameters": {
								"id": "<MANAGED_RULESET_ID>",
								"overrides": {
										"categories": [
												{
														"category": "wordpress",
														"action": "block"
												}
										]
								}
						}
				}
		]
	}'
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ruleset-engine/managed-rulesets/override-examples/deploy-cmr-wordpress-block/#page","headline":"Set WordPress rules to Block","description":"Deploy the Cloudflare Managed Ruleset with WordPress rules set to Block.","url":"https://developers.cloudflare.com/ruleset-engine/managed-rulesets/override-examples/deploy-cmr-wordpress-block/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["WordPress"]}
```
