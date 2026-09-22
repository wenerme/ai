---
description: Deploy a managed ruleset with ruleset, tag, and rule overrides.
title: Deploy a managed ruleset with ruleset, tag, and rule overrides
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ruleset-engine/llms.txt
> Use this file to discover all available pages before exploring further.

# Deploy a managed ruleset with ruleset, tag, and rule overrides

Last updated Apr 16, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/ruleset-engine/managed-rulesets/override-examples/override-ruleset-tag-rule/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Customize the execution of managed rulesets with a combination of ruleset overrides, tag overrides, and rule overrides in your phase entry point ruleset.

1. [Add a rule](https://developers.cloudflare.com/ruleset-engine/basic-operations/deploy-rulesets/) to a phase entry point ruleset to execute a managed ruleset.
2. [Configure a ruleset override](https://developers.cloudflare.com/ruleset-engine/managed-rulesets/override-managed-ruleset/) that disables all rules in the managed ruleset.
3. [Configure a tag override](https://developers.cloudflare.com/ruleset-engine/managed-rulesets/override-managed-ruleset/) that sets an action for rules with a given tag.
4. [Configure a rule override](https://developers.cloudflare.com/ruleset-engine/managed-rulesets/override-managed-ruleset/) that sets an action for the rules you want to execute.

## Zone-level example

This example uses the [Update a zone entry point ruleset](https://developers.cloudflare.com/ruleset-engine/rulesets-api/update/) operation to execute the following in a single `PUT` request:

- Add a rule to the `http_request_firewall_managed` phase entry point ruleset that executes a managed ruleset.
- Use category overrides to enable rules with `wordpress` and `drupal` tags and set their actions to `log`.
- Add a rule override that enables a single rule.

In this example:

- `"id": "<MANAGED_RULESET_ID>"` defines the managed ruleset to execute for requests addressed to a zone ( `$ZONE_ID`).
- `"enabled": false` defines an override at the ruleset level to disable all rules in the managed ruleset.
- `"categories": [{"category": "wordpress", "action": "log", "enabled": true}, {"category": "drupal", "action": "log", "enabled": true}]` defines an override at the tag level to enable rules tagged with `wordpress` or `drupal` and sets their action to `log`.
- `"rules": [{"id": "<RULE_ID>", "action": "block", "enabled": true}]` defines an override at the rule level that enables one individual rule and sets the action to `block`.

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
										"enabled": false,
										"categories": [
												{
														"category": "wordpress",
														"action": "log",
														"enabled": true
												},
												{
														"category": "drupal",
														"action": "log",
														"enabled": true
												}
										],
										"rules": [
												{
														"id": "<RULE_ID>",
														"action": "block",
														"enabled": true
												}
										]
								}
						}
				}
		]
	}'
```

## Account-level example

This example uses the [Update an account entry point ruleset](https://developers.cloudflare.com/ruleset-engine/rulesets-api/update/) operation to execute the following in a single `PUT` request:

- Add a rule to the `http_request_firewall_managed` phase entry point ruleset that executes a managed ruleset for the zone `example.com`.
- Use category overrides to enable rules with `wordpress` and `drupal` tags and set their actions to `log`.
- Add a rule override that enables a single rule.

In this example:

- `"id": "<MANAGED_RULESET_ID>"` defines the managed ruleset to execute for requests addressed to `example.com`.
- `"enabled": false` defines an override at the ruleset level to disable all rules in the managed ruleset.
- `"categories": [{"category": "wordpress", "action": "log", "enabled": true}, {"category": "drupal", "action": "log", "enabled": true}]` defines an override at the tag level to enable rules tagged with `wordpress` or `drupal` and sets their action to `log`.
- `"rules": [{"id": "<RULE_ID>", "action": "block", "enabled": true}]` defines an override at the rule level that enables one individual rule and sets the action to `block`.

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
										"enabled": false,
										"categories": [
												{
														"category": "wordpress",
														"action": "log",
														"enabled": true
												},
												{
														"category": "drupal",
														"action": "log",
														"enabled": true
												}
										],
										"rules": [
												{
														"id": "<RULE_ID>",
														"action": "block",
														"enabled": true
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
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ruleset-engine/managed-rulesets/override-examples/override-ruleset-tag-rule/#page","headline":"Deploy a managed ruleset with ruleset, tag, and rule overrides","description":"Deploy a managed ruleset with ruleset, tag, and rule overrides.","url":"https://developers.cloudflare.com/ruleset-engine/managed-rulesets/override-examples/override-ruleset-tag-rule/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
