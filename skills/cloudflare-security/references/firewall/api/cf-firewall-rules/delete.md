---
description: Delete filters or rules with DELETE API requests.
title: DELETE examples
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/firewall/llms.txt
> Use this file to discover all available pages before exploring further.

# DELETE examples

Last updated Apr 24, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/firewall/api/cf-firewall-rules/delete/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

Note

The `DELETE` operation does not delete any filter related to the firewall rule. To delete the filter, use the [Filters API](https://developers.cloudflare.com/firewall/api/cf-filters/).

## Delete multiple rules

This example deletes firewall rules with IDs `{rule_id_1}` and `{rule_id_2}`.

```bash
curl --request DELETE \
"https://api.cloudflare.com/client/v4/zones/{zone_id}/firewall/rules?id={rule_id_1}&id={rule_id_2}" \
--header "X-Auth-Email: <EMAIL>" \
--header "X-Auth-Key: <API_KEY>"
```

```json
{
	"result": [
		{
			"id": "<RULE_ID_1>"
		},
		{
			"id": "<RULE_ID_2>"
		}
	],
	"success": true,
	"errors": [],
	"messages": []
}
```

## Delete a single rule

This example deletes the rule with ID `{rule_id}`.

```bash
curl --request DELETE \
"https://api.cloudflare.com/client/v4/zones/{zone_id}/firewall/rules/{rule_id}" \
--header "X-Auth-Email: <EMAIL>" \
--header "X-Auth-Key: <API_KEY>"
```

```json
{
	"result": [
		{
			"id": "<RULE_ID>"
		}
	],
	"success": true,
	"errors": [],
	"messages": []
}
```

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/firewall/api/cf-firewall-rules/delete/#page","headline":"DELETE examples - Firewall rules · Cloudflare Firewall Rules (deprecated) docs","description":"Delete filters or rules with DELETE API requests.","url":"https://developers.cloudflare.com/firewall/api/cf-firewall-rules/delete/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-04-24","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
