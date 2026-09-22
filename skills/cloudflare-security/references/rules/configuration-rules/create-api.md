---
description: Create configuration rules using the Rulesets API.
title: Create a configuration rule via API
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/rules/llms.txt
> Use this file to discover all available pages before exploring further.

# Create a configuration rule via API

Last updated Aug 25, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/rules/configuration-rules/create-api/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Use the [Rulesets API](https://developers.cloudflare.com/ruleset-engine/rulesets-api/) to create configuration rules via API.

## Basic rule settings

When creating a configuration rule via API, make sure you:

- Set the rule action to `set_config`.
- Define the parameters in the `action_parameters` field according to the [settings](https://developers.cloudflare.com/rules/configuration-rules/settings/) you wish to override for matching requests.
- Deploy the rule to the `http_config_settings` phase at the zone level.

## Procedure

Follow this workflow to create a configuration rule for a given zone via API:

1. Use the [List zone rulesets](https://developers.cloudflare.com/api/resources/rulesets/methods/list/) operation to check if there is already a ruleset for the `http_config_settings` phase at the zone level.
2. If the phase ruleset does not exist, create it using the [Create a zone ruleset](https://developers.cloudflare.com/api/resources/rulesets/methods/create/) operation. In the new ruleset properties, set the following values:
   - **kind**: `zone`
   - **phase**: `http_config_settings`
3. Use the [Update a zone ruleset](https://developers.cloudflare.com/api/resources/rulesets/methods/update/) operation to add a configuration rule to the list of ruleset rules. Alternatively, include the rule in the [Create a zone ruleset](https://developers.cloudflare.com/api/resources/rulesets/methods/create/) request mentioned in the previous step.

Make sure your API token has the [required permissions](#required-api-token-permissions) to perform the API operations.

## Example requests

<details>

<summary>

Example: Add a rule that enables Email Obfuscation and Browser Integrity Check

</summary>

The following example sets the rules of an existing phase ruleset (<code>{ruleset_id}</code>) to a single configuration rule — enabling Email Obfuscation and Browser Integrity Check for the contacts page — using the <a href="https://developers.cloudflare.com/api/resources/rulesets/methods/update/">Update a zone ruleset</a> operation:

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
						"ref": "enable_email_obfuscation_bic",
						"expression": "starts_with(http.request.uri.path, \"/contact-us/\")",
						"description": "Obfuscates email addresses and enables BIC in contacts page",
						"action": "set_config",
						"action_parameters": {
								"email_obfuscation": true,
								"bic": true
						}
				}
		]
	}'
```

Use the <code>ref</code> field to get stable rule IDs across updates when using Terraform. Adding this field prevents Terraform from recreating the rule on changes. For more information, refer to <a href="https://developers.cloudflare.com/terraform/troubleshooting/rule-id-changes/#how-to-keep-the-same-rule-id-between-modifications">Troubleshooting</a> in the Terraform documentation.

</details>

<details>

<summary>

Example: Add a rule that turns on Under Attack mode for the admin area

</summary>

The following example sets the rules of an existing phase ruleset (<code>{ruleset_id}</code>) to a single configuration rule — turning on Under Attack mode for the administration area — using the <a href="https://developers.cloudflare.com/api/resources/rulesets/methods/update/">Update a zone ruleset</a> operation:

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
						"ref": "enable_under_attack_in_admin",
						"expression": "http.host eq \"admin.example.com\"",
						"description": "Turn on Under Attack mode for admin area",
						"action": "set_config",
						"action_parameters": {
								"security_level": "under_attack"
						}
				}
		]
	}'
```

Use the <code>ref</code> field to get stable rule IDs across updates when using Terraform. Adding this field prevents Terraform from recreating the rule on changes. For more information, refer to <a href="https://developers.cloudflare.com/terraform/troubleshooting/rule-id-changes/#how-to-keep-the-same-rule-id-between-modifications">Troubleshooting</a> in the Terraform documentation.

</details>

---

## Required API token permissions

The API token used in API requests to manage configuration rules must have at least the following permission:

- *Zone* > *Config Rules* > *Edit*

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/rules/configuration-rules/create-api/#page","headline":"Create a configuration rule via API","description":"Create configuration rules using the Rulesets API.","url":"https://developers.cloudflare.com/rules/configuration-rules/create-api/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-08-25","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
