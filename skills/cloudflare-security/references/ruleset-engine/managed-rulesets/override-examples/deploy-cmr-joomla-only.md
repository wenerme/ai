---
description: Deploy the Cloudflare Managed Ruleset with only Joomla rules enabled.
title: Enable only Joomla rules
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ruleset-engine/llms.txt
> Use this file to discover all available pages before exploring further.

# Enable only Joomla rules

Last updated Apr 16, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/ruleset-engine/managed-rulesets/override-examples/deploy-cmr-joomla-only/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Use the [Rulesets API](https://developers.cloudflare.com/ruleset-engine/rulesets-api/) to configure the execution of a managed ruleset and override its behavior. By default, enabled rules perform the actions defined by the managed ruleset issuer. This example uses overrides to ensure that only rules with a specific tag are enabled.

Follow the steps below to configure the execution of a managed ruleset with two overrides for enabling only the rules tagged with `joomla`.

1. [Add a rule](https://developers.cloudflare.com/ruleset-engine/basic-operations/deploy-rulesets/) to a phase entry point ruleset that executes a managed ruleset.
2. [Configure a ruleset override](https://developers.cloudflare.com/ruleset-engine/managed-rulesets/override-managed-ruleset/) that disables all rules in the managed ruleset.
3. Configure a tag override that enables only the rules with a given tag.

Tag overrides take precedence over ruleset overrides. Only the rules with the specified tag are enabled, and all other rules are disabled.

## Example 1

This example deploys the Cloudflare Managed Ruleset to a phase with only Joomla rules enabled. The `name`, `kind`, and `phase` fields are omitted from the request because they are immutable.

<details>

<summary>

Example: Enable only Joomla rules using category overrides at the zone level

</summary>

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
														"category": "joomla",
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

- <code>"id": "&lt;MANAGED_RULESET_ID&gt;"</code> adds a rule to the ruleset of a phase that will apply the Cloudflare Managed Ruleset to requests for the specified zone (<code>$ZONE_ID</code>).
- <code>"enabled": false</code> defines an override at the ruleset level that disables all rules in the managed ruleset.
- <code>"categories": [{"category": "joomla", "action": "block", "enabled": true}]</code> defines an override at the tag level that enables the Joomla rules and sets their action to <code>block</code>.

</details>

<details>

<summary>

Example: Enable only Joomla rules using category overrides at the account level

</summary>

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
														"category": "joomla",
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

- <code>"id": "&lt;MANAGED_RULESET_ID&gt;"</code> adds a rule to the ruleset of a phase that will apply the Cloudflare Managed Ruleset to requests for <code>example.com</code>.
- <code>"enabled": false</code> defines an override at the ruleset level that disables all rules in the managed ruleset.
- <code>"categories": [{"category": "joomla", "action": "block", "enabled": true}]</code> defines an override at the tag level that enables the Joomla rules and sets their action to <code>block</code>.

</details>

You can add more than one category override to a rule.

## Example 2

This example adds two overrides to the rule that executes a managed ruleset (`<MANAGED_RULESET_ID>`) in the `http_request_firewall_managed` phase. Note that the `name`, `kind`, and `phase` fields are omitted from the request because they are immutable.

<details>

<summary>

Example: Add more than one category override at the zone level

</summary>

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
														"category": "joomla",
														"action": "log",
														"enabled": true
												},
												{
														"category": "wordpress",
														"enabled": false
												}
										]
								}
						}
				}
		]
	}'
```

</details>

<details>

<summary>

Example: Add more than one category override at the account level

</summary>

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
														"category": "joomla",
														"action": "log",
														"enabled": true
												},
												{
														"category": "wordpress",
														"enabled": false
												}
										]
								}
						}
				}
		]
	}'
```

</details>

The order of the overrides in the ruleset determines if rules in the deployed managed ruleset are enabled or disabled. Overrides placed later in the list take precedence over earlier overrides.

Consider four rules from the managed ruleset in the code above that have different combinations of `category` tags. The following table shows the status of the rules after the overrides.

| Rule in managed ruleset | Tags | Rule status after overrides |
| --- | --- | --- |
| ManagedRule1 | `drupal`, `dos` | Disabled |
| ManagedRule2 | `drupal`, `dos`, `joomla` | Enabled |
| ManagedRule3 | `dos`, `joomla`, `wordpress` | Disabled |
| ManagedRule4 | `drupal`, `wordpress` | Disabled |
| ManagedRule5 | (no tags) | Disabled |

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ruleset-engine/managed-rulesets/override-examples/deploy-cmr-joomla-only/#page","headline":"Use category overrides to enable Joomla rules · Cloudflare Ruleset Engine docs","description":"Deploy the Cloudflare Managed Ruleset with only Joomla rules enabled.","url":"https://developers.cloudflare.com/ruleset-engine/managed-rulesets/override-examples/deploy-cmr-joomla-only/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
