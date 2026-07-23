---
description: Create Snippets using the Terraform Cloudflare provider.
title: Configure Snippets using Terraform
image: https://developers.cloudflare.com/og-docs.png
---

[Skip to content](#main-content)

> Documentation Index
> Fetch the complete documentation index at: https://developers.cloudflare.com/rules/llms.txt
> Use this file to discover all available pages before exploring further.

# Configure Snippets using Terraform

Last updated May 5, 2026|Copy as Markdown|[View as Markdown](https://developers.cloudflare.com/rules/snippets/create-terraform/index.md)|[Agent setup](https://developers.cloudflare.com/agent-setup/)

You can create Snippets using the [Terraform Cloudflare provider ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest).

To get started with Terraform for Cloudflare configuration, refer to [Get started](https://developers.cloudflare.com/terraform/installing/).

## Example configuration

Note

Terraform code snippets below refer to the v4 SDK only.

The following example Terraform configuration creates a snippet and an associated snippet rule that defines when the snippet code will run. The snippet code is loaded from the `file1.js` file in your machine.

```tf
resource "cloudflare_snippet" "my_snippet" {
	zone_id  = "<ZONE_ID>"
	name = "my_test_snippet_1"
	main_module = "file1.js"
	files {
		name = "file1.js"
		content = file("file1.js")
	}
}

resource "cloudflare_snippet_rules" "cookie_snippet_rule" {
	zone_id  = "<ZONE_ID>"
	rules {
		enabled = true
		expression = "http.cookie eq \"a=b\""
		description = "Trigger snippet on specific cookie"
		snippet_name = "my_test_snippet_1"
	}
	depends_on = [cloudflare_snippet.my_snippet]
}
```

The name of a snippet can only contain the characters `a-z`, `0-9`, and `_` (underscore). The name must be unique in the context of the zone. You cannot change the snippet name after creating the snippet.

All `snippet_name` values in the `cloudflare_snippet_rules` resource must match the names of existing snippets.

## More resources

Refer to the [Terraform Cloudflare provider documentation ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs) for more information on the `cloudflare_snippet` and `cloudflare_snippet_rules` resources.

Was this helpful?

YesNo

## On this page

[![](https://developers.cloudflare.com/_astro/logo.DMYpXs3t.svg)Docs](https://developers.cloudflare.com/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/rules/snippets/create-terraform/#page","headline":"Configure Snippets using Terraform · Cloudflare Rules docs","description":"Create Snippets using the Terraform Cloudflare provider.","url":"https://developers.cloudflare.com/rules/snippets/create-terraform/","inLanguage":"en","image":"https://developers.cloudflare.com/og-docs.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Terraform"]}
```
