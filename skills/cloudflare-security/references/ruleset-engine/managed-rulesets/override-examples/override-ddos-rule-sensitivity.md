---
description: Adjust the sensitivity of an HTTP DDoS rule to Low.
title: Adjust the sensitivity of an HTTP DDoS rule to Low
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/ruleset-engine/llms.txt
> Use this file to discover all available pages before exploring further.

# Adjust the sensitivity of an HTTP DDoS rule to Low

Last updated Apr 16, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/ruleset-engine/managed-rulesets/override-examples/override-ddos-rule-sensitivity/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Follow the steps below to override the sensitivity of a specific rule of the Cloudflare HTTP DDoS Attack Protection managed ruleset.

1. [Add a rule](https://developers.cloudflare.com/ruleset-engine/basic-operations/deploy-rulesets/) to a phase to deploy the Cloudflare HTTP DDoS Attack Protection managed ruleset. You only need to deploy this specific ruleset when you wish to define one or more overrides, since it is enabled by default.
2. [Configure a rule override](https://developers.cloudflare.com/ruleset-engine/managed-rulesets/override-managed-ruleset/) that sets the `sensitivity_level` of a specific rule.

## Example

The following example uses the [Update a zone entry point ruleset](https://developers.cloudflare.com/ruleset-engine/rulesets-api/update/) operation to execute the two steps in a single `PUT` request.

- Set the rules in the `ddos_l7` phase entry point ruleset to a single rule that executes the Cloudflare HTTP DDoS Attack Protection managed ruleset (with ID `<HTTP_DDOS_RULESET_ID>`).
- Create an override for the rule with ID `<RULE_ID>` and set the rule sensitivity to `low`. All other rules use the default sensitivity defined by Cloudflare.

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
curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/rulesets/phases/ddos_l7/entrypoint" \
	--request PUT \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
	--json '{
		"rules": [
				{
						"action": "execute",
						"expression": "true",
						"action_parameters": {
								"id": "<HTTP_DDOS_RULESET_ID>",
								"overrides": {
										"rules": [
												{
														"id": "<RULE_ID>",
														"sensitivity_level": "low"
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
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ruleset-engine/managed-rulesets/override-examples/override-ddos-rule-sensitivity/#page","headline":"Adjust the sensitivity of an HTTP DDoS rule to Low","description":"Adjust the sensitivity of an HTTP DDoS rule to Low.","url":"https://developers.cloudflare.com/ruleset-engine/managed-rulesets/override-examples/override-ddos-rule-sensitivity/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
