---
description: Update filters or rules with PUT API requests.
title: PUT examples
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/firewall/llms.txt
> Use this file to discover all available pages before exploring further.

# PUT examples

Last updated Apr 24, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/firewall/api/cf-firewall-rules/put/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

## Update multiple rules

This example updates several firewall rules using a single API call.

You can include up to 25 rules in the JSON object array (`-d` flag) to update as a batch. The batch is handled as a transaction.

```bash
curl --request PUT \
"https://api.cloudflare.com/client/v4/zones/{zone_id}/firewall/rules" \
--header "X-Auth-Email: <EMAIL>" \
--header "X-Auth-Key: <API_KEY>" \
--header "Content-Type: application/json" \
--data '[
  {
    "id": "<RULE_ID>",
    "paused": false,
    "description": "Challenge site",
    "action": "challenge",
    "priority": null,
    "filter": {
      "id": "<FILTER_ID>",
      "expression": "not http.request.uri.path matches \"^/api/.*$\"",
      "paused": false,
      "description": "not /api"
    }
  }
]'
```

Note

`PUT` does not update the filter specified. It only looks at the filter ID (`<FILTER_ID>`) to update the rule with a new filter.

To update the filter, use the [Filters API](https://developers.cloudflare.com/firewall/api/cf-filters/).

```json
{
	"result": [
		{
			"id": "<RULE_ID>",
			"paused": false,
			"description": "Challenge site",
			"action": "challenge",
			"priority": null,
			"filter": {
				"id": "<FILTER_ID>",
				"expression": "not http.request.uri.path matches \"^/api/.*$\"",
				"paused": false,
				"description": "not /api"
			}
		}
	],
	"success": true,
	"errors": [],
	"messages": []
}
```

## Update a single rule

This example updates the firewall rule with ID `{rule_id}`.

You must include the following fields in the request body:

* `id`
* `action`
* `filter.id`

All other fields are optional.

```bash
curl --request PUT \
"https://api.cloudflare.com/client/v4/zones/{zone_id}/firewall/rules/{rule_id}" \
--header "X-Auth-Email: <EMAIL>" \
--header "X-Auth-Key: <API_KEY>" \
--header "Content-Type: application/json" \
--data '{
  "id": "<RULE_ID>",
  "paused": false,
  "description": "Do not challenge login from office IPv6",
  "action": "allow",
  "priority": null,
  "filter": {
    "id": "<FILTER_ID>",
    "expression": "ip.src in {2400:cb00::/32 2803:f800::/32 2c0f:f248::/32 2a06:98c0::/29} and (http.request.uri.path ~ \"^.*/wp-login.php$\" or http.request.uri.path ~ \"^.*/xmlrpc.php$\")",
    "paused": false,
    "description": "Login from office"
  }
}'
```

```json
{
	"result": {
		"id": "<RULE_ID>",
		"paused": false,
		"description": "Do not challenge login from office IPv6",
		"action": "allow",
		"priority": null,
		"filter": {
			"id": "<FILTER_ID>",
			"expression": "ip.src in {2400:cb00::/32 2803:f800::/32 2c0f:f248::/32 2a06:98c0::/29} and (http.request.uri.path ~ \"^.*/wp-login.php$\" or http.request.uri.path ~ \"^.*/xmlrpc.php$\")",
			"paused": false,
			"description": "Login from office"
		}
	},
	"success": true,
	"errors": [],
	"messages": []
}
```

Note

`PUT` overwrites fields that are not explicitly passed in the request.

For example, if the request omits `description`, any previously existing `description` value will be erased.

To preserve existing values, issue a `GET` request and based on the response, determine which fields (and respective values) to include in your `PUT` request.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.te5VL_aD.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/firewall/api/cf-firewall-rules/put/#page","headline":"PUT examples - Firewall rules · Cloudflare Firewall Rules (deprecated) docs","description":"Update filters or rules with PUT API requests.","url":"https://developers.cloudflare.com/firewall/api/cf-firewall-rules/put/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-24","publisher":{"@type":"Organization","name":"Cloudflare","description":"One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure","url":"https://www.cloudflare.com/","sameAs":["https://github.com/cloudflare","https://www.linkedin.com/company/cloudflare","https://x.com/cloudflare"],"logo":{"@type":"ImageObject","url":"https://developers.cloudflare.com/logo.svg"},"address":{"@type":"PostalAddress","streetAddress":"101 Townsend St","addressLocality":"San Francisco","addressRegion":"CA","postalCode":"94107","addressCountry":"US"},"contactPoint":[{"@type":"ContactPoint","contactType":"Customer Support","url":"https://support.cloudflare.com/","availableLanguage":["English"]},{"@type":"ContactPoint","contactType":"Sales","url":"https://www.cloudflare.com/contact/","availableLanguage":["English"]}]},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
