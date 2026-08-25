---
description: Create cache rules using the Rulesets API.
title: Create a rule via API
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/cache/llms.txt
> Use this file to discover all available pages before exploring further.

# Create a rule via API

Last updated Jun 27, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/cache/how-to/cache-rules/create-api/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Use the [Rulesets API](https://developers.cloudflare.com/ruleset-engine/rulesets-api/) to create a cache rule via API. To configure Cloudflare’s API refer to the [API documentation](https://developers.cloudflare.com/fundamentals/api/get-started/).

## Basic rule settings

When creating a cache rule via API, make sure you:

* Set the rule action to `set_cache_settings`.
* Define the parameters in the `action_parameters` field according to the [settings](https://developers.cloudflare.com/cache/how-to/cache-rules/settings/) you wish to override for matching requests.
* Deploy the rule to the `http_request_cache_settings` phase entry point ruleset.

## Procedure

1. Use the [List zone rulesets](https://developers.cloudflare.com/api/resources/rulesets/methods/list/) method to obtain the list of rules already present in the `http_request_cache_settings` phase entry point ruleset.
2. If the phase ruleset does not exist, create it using the [Create a zone ruleset](https://developers.cloudflare.com/api/resources/rulesets/methods/create/) operation. In the new ruleset properties, set the following values:
  * kind: `zone`
  * phase: `http_request_cache_settings`
3. Use the [Update a zone ruleset](https://developers.cloudflare.com/api/resources/rulesets/methods/update/) operation to add a cache rule to the list of ruleset rules. Alternatively, include the rule in the [Create a zone ruleset](https://developers.cloudflare.com/api/resources/rulesets/methods/create/) request mentioned in the previous step.
4. (Optional) To update an existing cache rule, use the [Update a zone ruleset rule](https://developers.cloudflare.com/api/resources/rulesets/methods/update/) operation. For an example, refer to the section below.

## Example requests

These examples are setting all the Cache Rules of a zone to a single rule, since using these examples directly will cause any existing rules to be deleted.

Example: Cache everything for example.com

```bash
curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/rulesets/$RULESET_ID" \
	--request PUT \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
	--json '{
		"rules": [
				{
						"expression": "(http.host eq \"example.com\")",
						"description": "cache everything for example.com",
						"action": "set_cache_settings",
						"action_parameters": {
								"cache": true
						}
				}
		]
	}'
```

Example: Extend read timeout for Android clients

```bash
curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/rulesets/$RULESET_ID" \
	--request PUT \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
	--json '{
		"rules": [
				{
						"expression": "(http.user_agent contains \"Android\")",
						"description": "extend read timeout for android clients",
						"action": "set_cache_settings",
						"action_parameters": {
								"cache": true,
								"read_timeout": 300
						}
				}
		]
	}'
```

Example: Disable Cache Reserve for frequently updated assets

```bash
curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/rulesets/$RULESET_ID" \
	--request PUT \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
	--json '{
		"rules": [
				{
						"expression": "(starts_with(http.request.uri, \"/feed/\"))",
						"description": "disable cache reserve for frequently updated assets",
						"action": "set_cache_settings",
						"action_parameters": {
								"cache": true,
								"cache_reserve": {
										"enabled": false
								}
						}
				}
		]
	}'
```

Example: Turn off default cache TTLs

```bash
curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/rulesets/$RULESET_ID" \
	--request PUT \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
	--json '{
		"rules": [
				{
						"expression": "(http.host eq \"example.com\")",
						"description": "turn off default cache ttls",
						"action": "set_cache_settings",
						"action_parameters": {
								"cache": true,
								"edge_ttl": {
										"mode": "bypass_by_default"
								}
						}
				}
		]
	}'
```

Example: Cache expected Vary responses

```bash
curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/rulesets/phases/http_request_cache_settings/entrypoint" \
	--request PUT \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
	--json '{
		"rules": [
				{
						"expression": "(http.host eq \"example.com\")",
						"description": "cache expected vary responses",
						"action": "set_cache_settings",
						"action_parameters": {
								"cache": true,
								"vary": {
										"default": {
												"action": "bypass"
										},
										"headers": {
												"accept": {
														"action": "normalize",
														"media_types": [
																"text/html",
																"application/json"
														]
												},
												"accept-language": {
														"action": "normalize",
														"languages": [
																"en",
																"fr",
																"de"
														]
												}
										}
								}
						}
				}
		]
	}'
```

Example: Update the position of an existing rule

```bash
curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/rulesets/$RULESET_ID/rules/$RULE_ID" \
	--request PATCH \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
	--json '{
		"expression": "(http.host eq \"example.com\")",
		"description": "cache everything for example.com",
		"action": "set_cache_settings",
		"action_parameters": {
				"cache": true
		},
		"enabled": true,
		"position": {
				"before": "da5e8e506c8e7877fe06cdf4c41add54"
		}
	}'
```

## Required API token permissions

The API token used in API requests to manage Cache Rules must have the following permissions:

* _Zone_ \> _Cache Rules_ \> _Edit_
* _Account Rulesets_ \> _Edit_
* _Account Filter Lists_ \> _Edit_

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cache/how-to/cache-rules/create-api/#page","headline":"Create a cache rule via API · Cloudflare Cache (CDN) docs","description":"Create cache rules using the Rulesets API.","url":"https://developers.cloudflare.com/cache/how-to/cache-rules/create-api/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-06-27","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
