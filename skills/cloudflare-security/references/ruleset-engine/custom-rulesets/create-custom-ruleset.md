---
description: Create a custom ruleset with the Rulesets API.
title: Create a custom ruleset
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ruleset-engine/llms.txt
> Use this file to discover all available pages before exploring further.

# Create a custom ruleset

Last updated Apr 16, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/ruleset-engine/custom-rulesets/create-custom-ruleset/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Use the [Create an account or zone ruleset](https://developers.cloudflare.com/api/resources/rulesets/methods/create/) operation to create a custom ruleset, making sure that you:

* Set the `kind` field to `custom`.
* Specify the name of the [phase](https://developers.cloudflare.com/ruleset-engine/reference/phases-list/) where you want to create the custom ruleset in the `phase` field.

You can also specify the list of rules to include in the custom ruleset in the `rules` array. To add rules after creating the custom ruleset, refer to [Add rules to a custom ruleset](https://developers.cloudflare.com/ruleset-engine/custom-rulesets/add-rules-ruleset/).

If you are using Terraform, refer to [WAF custom rules configuration using Terraform](https://developers.cloudflare.com/terraform/additional-configurations/waf-custom-rules/#create-and-deploy-a-custom-ruleset) for examples of creating and deploying custom rulesets.

If you are using the Cloudflare dashboard, refer to [Work with custom rulesets in the dashboard](https://developers.cloudflare.com/waf/account/custom-rulesets/create-dashboard/).

Note

Currently, zone-level custom rulesets are only available in the [http\_request\_firewall\_custom](https://developers.cloudflare.com/waf/custom-rules/custom-rulesets/#deploy-a-custom-ruleset-via-api) phase.

## Example A - Custom ruleset at the account level

The following request creates a new custom ruleset at the account level. The response will include the ID of the new custom ruleset in the `id` field.

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
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/rulesets" \
	--request POST \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
	--json '{
		"name": "Custom Ruleset 1",
		"description": "My First Custom Ruleset (account)",
		"kind": "custom",
		"phase": "http_request_firewall_custom"
	}'
```

```json
{
	"result": {
		"id": "f82ccda3d21f4a02825d3fe45b5e1c10",
		"name": "Custom Ruleset 1",
		"description": "My First Custom Ruleset (account)",
		"kind": "custom",
		"version": "1",
		"last_updated": "2025-08-09T10:27:30.636197Z",
		"phase": "http_request_firewall_custom"
	},
	"success": true,
	"errors": [],
	"messages": []
}
```

You can include a list of rules in the custom ruleset creation request. If you have not added any rules, refer to [Add rules to a custom ruleset](https://developers.cloudflare.com/ruleset-engine/custom-rulesets/add-rules-ruleset/) for more information.

## Example B - Custom ruleset at the zone level

The following request creates a new custom ruleset at the zone level. The response will include the ID of the new custom ruleset in the `id` field.

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
curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/rulesets" \
	--request POST \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
	--json '{
		"name": "Custom Ruleset 1",
		"description": "My First Custom Ruleset (zone)",
		"kind": "custom",
		"phase": "http_request_firewall_custom"
	}'
```

```json
{
	"result": {
		"id": "f82ccda3d21f4a02825d3fe45b5e1c10",
		"name": "Custom Ruleset 1",
		"description": "My First Custom Ruleset (zone)",
		"kind": "custom",
		"version": "1",
		"last_updated": "2025-08-09T10:27:30.636197Z",
		"phase": "http_request_firewall_custom"
	},
	"success": true,
	"errors": [],
	"messages": []
}
```

You can include a list of rules in the custom ruleset creation request. If you have not added any rules, refer to [Add rules to a custom ruleset](https://developers.cloudflare.com/ruleset-engine/custom-rulesets/add-rules-ruleset/) for more information.

Note

Currently, zone-level custom rulesets are only available in the [http\_request\_firewall\_custom](https://developers.cloudflare.com/waf/custom-rules/custom-rulesets/#deploy-a-custom-ruleset-via-api) phase.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ruleset-engine/custom-rulesets/create-custom-ruleset/#page","headline":"Create a custom ruleset · Cloudflare Ruleset Engine docs","description":"Create a custom ruleset with the Rulesets API.","url":"https://developers.cloudflare.com/ruleset-engine/custom-rulesets/create-custom-ruleset/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
