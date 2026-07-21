---
description: Create a compression rule to turn off Brotli compression for all incoming requests of a given zone.
title: Disable Brotli compression
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content ](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/rules/llms.txt
> Use this file to discover all available pages before exploring further.

#  Disable Brotli compression

Create a compression rule to turn off Brotli compression for all incoming requests of a given zone.

Last updated Oct 13, 2025 | Copy as Markdown | [ View as Markdown ](https://developers.cloudflare.com/rules/compression-rules/examples/disable-all-brotli/index.md) | [ Agent setup ](https://developers.cloudflare.com/agent-setup/)

The following example rule will disable Brotli compression for all incoming requests of a given zone. The only available compression algorithm will be Gzip.

**When incoming requests match**

* All incoming requests

**Then**

* **Compression options**: Custom
* **Define a custom order for compression types**: `Gzip`

If the client does not support Gzip compression, the response will be uncompressed.

The following example sets the rules of an existing [entry point ruleset](https://developers.cloudflare.com/ruleset-engine/about/rulesets/#entry-point-ruleset) (with ID `{ruleset_id}`) for the `http_response_compression` phase to a single compression rule, using the [Update a zone ruleset](https://developers.cloudflare.com/api/resources/rulesets/methods/update/) operation:

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
curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/rulesets/$RULESET_ID" \
	--request PUT \
	--header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
	--json '{
		"rules": [
				{
						"ref": "always_use_gzip",
						"expression": "true",
						"action": "compress_response",
						"action_parameters": {
								"algorithms": [
										{
												"name": "gzip"
										}
								]
						}
				}
		]
	}'
```

Use the `ref` field to get stable rule IDs across updates when using Terraform. Adding this field prevents Terraform from recreating the rule on changes. For more information, refer to [Troubleshooting](https://developers.cloudflare.com/terraform/troubleshooting/rule-id-changes/#how-to-keep-the-same-rule-id-between-modifications) in the Terraform documentation.

Was this helpful?

YesNo

## On this page

[ ![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg) Docs ](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/rules/compression-rules/examples/disable-all-brotli/#page","headline":"Disable Brotli compression · Cloudflare Rules docs","description":"Create a compression rule to turn off Brotli compression for all incoming requests of a given zone.","url":"https://developers.cloudflare.com/rules/compression-rules/examples/disable-all-brotli/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2025-10-13","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
