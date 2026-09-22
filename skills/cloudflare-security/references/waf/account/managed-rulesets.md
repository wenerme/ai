---
description: Deploy and manage WAF managed rulesets at the account level.
title: Managed rulesets
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/waf/llms.txt
> Use this file to discover all available pages before exploring further.

# Managed rulesets

Last updated Apr 16, 2026|Copy as Markdown| [View as Markdown](https://developers.cloudflare.com/waf/account/managed-rulesets/index.md)| [Agent setup](https://developers.cloudflare.com/agent-setup/)

Note

This feature requires an Enterprise plan.

Cloudflare provides pre-configured managed rulesets that protect against web application exploits such as the following:

- Zero-day vulnerabilities
- Top-10 attack techniques
- Use of stolen/leaked credentials
- Extraction of sensitive data

Managed rulesets are [regularly updated](https://developers.cloudflare.com/waf/change-log/). Each rule has a default action that varies according to the severity of the rule. You can adjust the behavior of specific rules, choosing from several possible actions.

Rules of managed rulesets have associated tags (such as `wordpress`) that allow you to search for a specific group of rules and configure them in bulk.

## Account-level deployment

At the zone level, each [WAF managed ruleset](https://developers.cloudflare.com/waf/managed-rules/#available-managed-rulesets) can only be deployed once. At the account level, you can deploy each managed ruleset more than once. This allows you to apply the same ruleset with different configurations to different subsets of incoming traffic across the Enterprise zones in your account.

For example, you could deploy the [Cloudflare OWASP Core Ruleset](https://developers.cloudflare.com/waf/managed-rules/reference/owasp-core-ruleset/) multiple times with different [paranoia levels](https://developers.cloudflare.com/waf/managed-rules/reference/owasp-core-ruleset/concepts/#paranoia-level) and a different action (*Managed Challenge* action for PL3 and *Log* action for PL4). Higher paranoia levels enable additional rules that are more likely to produce false positives.

<details>

<summary>

Example: Deploy OWASP with two different configurations

</summary>

The following example deploys the <a href="https://developers.cloudflare.com/waf/managed-rules/reference/owasp-core-ruleset/">Cloudflare OWASP Core Ruleset</a> multiple times at the account level through the following <a href="https://developers.cloudflare.com/ruleset-engine/managed-rulesets/deploy-managed-ruleset/">execute rules</a>:

- First execute rule: Enable OWASP rules up to paranoia level 3 (PL3) and set the action to *Managed Challenge*.
- Second execute rule: Enable OWASP rules up to PL4 and set the action to *Log*.

This configuration gives you additional protection by enabling PL3 rules, but without blocking the requests, since higher paranoia levels are more prone to false positives.

The second rule logs any matches for PL4 rules, the most strict set of rules in the ruleset, so that it does not affect live traffic. You could use this configuration to understand which traffic would be affected by PL4 rules.

1. Deploy the Cloudflare OWASP Core Ruleset by following the <a href="https://developers.cloudflare.com/waf/account/managed-rulesets/deploy-dashboard/#deploy-a-managed-ruleset">dashboard instructions</a>, customizing the ruleset behavior using these settings:
   - **OWASP Anomaly Score Threshold**: *Medium - 40 and higher*
   - **OWASP Paranoia Level**: *PL3*
   - **OWASP Action**: *Managed Challenge*
2. Select **Deploy**.
3. Repeat the deployment procedure for the OWASP ruleset, but with following ruleset configuration:
   - **OWASP Anomaly Score Threshold**: *Medium - 40 and higher*
   - **OWASP Paranoia Level**: *PL4*
   - **OWASP Action**: *Log*

Once you finish your configuration, the **Deployed managed rulesets** list will show two *Execute* rules for the Cloudflare OWASP Core Ruleset.

The following <code>POST</code> request for the <a href="https://developers.cloudflare.com/api/resources/rulesets/methods/create/">Create an account ruleset</a> operation creates an <a href="https://developers.cloudflare.com/ruleset-engine/about/rulesets/#entry-point-ruleset">entry point ruleset</a> for the <code>http_request_firewall_managed</code> <a href="https://developers.cloudflare.com/ruleset-engine/about/phases/">phase</a> at the account level. The ruleset includes two rules deploying the Cloudflare OWASP Core Ruleset twice with different configurations.

<details>

<summary>

Required API token permissions

</summary>

At least one of the following <a href="https://developers.cloudflare.com/fundamentals/api/reference/permissions/">token permissions</a> is required:

- <code>Account WAF Write</code>
- <code>Account Rulesets Write</code>

</details>

*Create an account rulesetbash*

```bash
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/rulesets" \
	--request POST \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
	--json '{
		"name": "My ruleset",
		"description": "Entry point ruleset for WAF managed rulesets (account)",
		"kind": "root",
		"phase": "http_request_firewall_managed",
		"rules": [
				{
						"action": "execute",
						"action_parameters": {
								"id": "4814384a9e5d4991b9815dcfc25d2f1f",
								"overrides": {
										"categories": [
												{
														"category": "paranoia-level-4",
														"enabled": false
												}
										],
										"rules": [
												{
														"id": "6179ae15870a4bb7b2d480d4843b323c",
														"action": "managed_challenge"
												}
										]
								}
						},
						"expression": "cf.zone.plan eq \"ENT\"",
						"description": "Execute OWASP ruleset at PL3 with Managed Challenge action"
				},
				{
						"action": "execute",
						"action_parameters": {
								"id": "4814384a9e5d4991b9815dcfc25d2f1f",
								"overrides": {
										"rules": [
												{
														"id": "6179ae15870a4bb7b2d480d4843b323c",
														"action": "log"
												}
										]
								}
						},
						"expression": "cf.zone.plan eq \"ENT\"",
						"description": "Execute OWASP ruleset at PL4 with Log action"
				}
		]
	}'
```

</details>

## Customize the behavior of managed rulesets

To customize the behavior of managed rulesets, do one of the following:

- [Create exceptions](https://developers.cloudflare.com/waf/managed-rules/waf-exceptions/) to skip the execution of managed rulesets or some of their rules under certain conditions.
- [Configure overrides](https://developers.cloudflare.com/waf/account/managed-rulesets/deploy-dashboard/#configure-a-managed-ruleset) to change the rule action or disable one or more rules of managed rulesets. Overrides can affect an entire managed ruleset, specific tags, or specific rules in the managed ruleset.

Exceptions have priority over overrides.

Important

Ruleset overrides and tag overrides apply to both existing and *future* rules in the managed ruleset. If you want to override existing rules only, you must use rule overrides.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/waf/account/managed-rulesets/#page","headline":"Managed rulesets","description":"Deploy and manage WAF managed rulesets at the account level.","url":"https://developers.cloudflare.com/waf/account/managed-rulesets/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
